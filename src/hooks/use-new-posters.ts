import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { Event } from "@/lib/events";

const storageKey = "lokalbord:kutina:board-visit";
const visitTimeout = 30 * 60_000;

type BoardVisit = {
  lastActiveAt: number;
  previousIds: string[];
  currentIds: string[];
};

function readVisit(): BoardVisit | null {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    const visit = JSON.parse(raw);
    const validIds = (ids: unknown) =>
      Array.isArray(ids) && ids.every((id) => typeof id === "string");
    if (Number.isFinite(visit?.lastActiveAt) && validIds(visit.previousIds) && validIds(visit.currentIds)) {
      return visit;
    }
  } catch {
    // An unreadable snapshot is treated as a first visit.
  }
  return null;
}

export function useNewPosters(events: Event[], boardVisible: boolean, refresh: () => void) {
  const [newIds, setNewIds] = useState<ReadonlySet<string>>(() => new Set());
  const lastActivity = useRef<number | null>(null);

  const recordVisit = useEffectEvent(() => {
    const now = Date.now();
    const ids = events.map((event) => event.id);
    try {
      const visit = readVisit();
      const continuing = visit && now - visit.lastActiveAt < visitTimeout;
      const previousIds = continuing ? visit.previousIds : visit?.currentIds ?? ids;
      const currentIds = continuing ? [...new Set([...visit.currentIds, ...ids])] : ids;
      localStorage.setItem(storageKey, JSON.stringify({ lastActiveAt: now, previousIds, currentIds }));
      const previous = new Set(previousIds);
      setNewIds(new Set(ids.filter((id) => !previous.has(id))));
    } catch {
      // Storage can be disabled. The board still works without stickers.
      setNewIds(new Set());
    }
  });

  useEffect(() => {
    if (!boardVisible) return;
    let lastWrite = 0;
    function onActivity() {
      if (document.hidden || new URLSearchParams(window.location.search).has("event")) return;
      const now = Date.now();
      const last = lastActivity.current;
      lastActivity.current = now;
      if (last !== null && now - last >= visitTimeout) {
        // A tab left open overnight needs a fresh board before recording the visit.
        refresh();
        return;
      }
      if (now - lastWrite >= 1000) {
        recordVisit();
        lastWrite = now;
      }
    }
    onActivity();
    document.addEventListener("visibilitychange", onActivity);
    window.addEventListener("pageshow", onActivity);
    window.addEventListener("pointerdown", onActivity);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("wheel", onActivity, { passive: true });
    return () => {
      document.removeEventListener("visibilitychange", onActivity);
      window.removeEventListener("pageshow", onActivity);
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("wheel", onActivity);
    };
  }, [boardVisible, refresh]);

  return newIds;
}
