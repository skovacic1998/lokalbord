import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type SetStateAction } from "react";
import { CELL_HEIGHT, CELL_WIDTH, constrainView, fitBoard, fitScale, initialBoardView, type BoardView, type ViewportSize } from "@/lib/board";
import type { Event } from "@/lib/events";

type Point = { x: number; y: number };
type Gesture = { distance: number; cx: number; cy: number };
type Drag = Point & { moved: boolean; posterId: string | null };

const PAN_STEPS: Record<string, Point> = {
  ArrowLeft: { x: 80, y: 0 },
  ArrowRight: { x: -80, y: 0 },
  ArrowUp: { x: 0, y: 80 },
  ArrowDown: { x: 0, y: -80 },
};

function getGesture(points: Map<number, Point>): Gesture {
  const [a, b] = [...points.values()];
  return {
    distance: Math.hypot(a.x - b.x, a.y - b.y),
    cx: (a.x + b.x) / 2,
    cy: (a.y + b.y) / 2,
  };
}

export function useBoardNavigation(onPosterSelect: (id: string) => void) {
  const [view, setView] = useState<BoardView>({ x: 0, y: 0, scale: 1 });
  const [ready, setReady] = useState(false);
  const viewportRef = useRef<HTMLElement>(null);
  const viewportSize = useRef<ViewportSize>({ width: 0, height: 0 });
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<Gesture | null>(null);
  const drag = useRef<Drag | null>(null);

  function updateView(update: SetStateAction<BoardView>) {
    setView((previous) => constrainView(
      typeof update === "function" ? update(previous) : update,
      viewportSize.current,
    ));
  }

  function clampScale(scale: number) {
    return constrainView({ x: 0, y: 0, scale }, viewportSize.current).scale;
  }

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const rect = element!.getBoundingClientRect();
      const px = e.clientX - rect.left - rect.width / 2;
      const py = e.clientY - rect.top - rect.height / 2;

      updateView((previous) => {
        const delta = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? rect.height : 1);
        const scale = clampScale(previous.scale * Math.exp(-delta * (e.ctrlKey ? 0.01 : 0.001)));
        const factor = scale / previous.scale;
        return {
          scale,
          x: px - (px - previous.x) * factor,
          y: py - (py - previous.y) * factor,
        };
      });
    }

    let initialized = false;
    const observer = new ResizeObserver(([entry]) => {
      const previousSize = viewportSize.current;
      const size = { width: entry.contentRect.width, height: entry.contentRect.height };
      if (!size.width || !size.height) return;
      const first = !initialized;
      initialized = true;
      viewportSize.current = size;
      setView((previous) => first
        ? initialBoardView(size)
        : Math.abs(previous.scale - fitScale(previousSize)) < 0.0001
          ? fitBoard(size)
        : constrainView(previous, size));
      setReady(true);
    });
    observer.observe(element);
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      observer.disconnect();
      element.removeEventListener("wheel", onWheel);
    };
  }, []);

  function pointerDown(e: PointerEvent<HTMLElement>) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointers.current.set(e.pointerId, { x: e.clientX - rect.left, y: e.clientY - rect.top });

    const target = e.target as HTMLElement;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      moved: false,
      posterId: target.closest<HTMLElement>("[data-poster-id]")?.dataset.posterId ?? null,
    };
    e.currentTarget.setPointerCapture(e.pointerId);

    if (pointers.current.size === 2) {
      gesture.current = getGesture(pointers.current);
      drag.current.moved = true;
    }
  }

  function pointerMove(e: PointerEvent<HTMLElement>) {
    const previousPoint = pointers.current.get(e.pointerId);
    if (!previousPoint) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    pointers.current.set(e.pointerId, point);

    if (drag.current && Math.hypot(e.clientX - drag.current.x, e.clientY - drag.current.y) > 5) {
      drag.current.moved = true;
    }

    if (pointers.current.size >= 2) {
      const next = getGesture(pointers.current);
      if (gesture.current && gesture.current.distance > 0) {
        const old = gesture.current;
        updateView((previous) => {
          const scale = clampScale(previous.scale * next.distance / old.distance);
          const factor = scale / previous.scale;
          const ox = old.cx - rect.width / 2;
          const oy = old.cy - rect.height / 2;
          return {
            scale,
            x: next.cx - rect.width / 2 - (ox - previous.x) * factor,
            y: next.cy - rect.height / 2 - (oy - previous.y) * factor,
          };
        });
      }
      gesture.current = next;
    } else {
      updateView((previous) => ({
        ...previous,
        x: previous.x + point.x - previousPoint.x,
        y: previous.y + point.y - previousPoint.y,
      }));
    }
  }

  function pointerUp(e: PointerEvent<HTMLElement>) {
    const previous = drag.current;
    const openId = pointers.current.size === 1 && previous && !previous.moved
      ? previous.posterId
      : null;
    pointers.current.delete(e.pointerId);
    gesture.current = null;
    drag.current = null;
    if (openId) onPosterSelect(openId);
  }

  function resetView() {
    updateView(fitBoard(viewportSize.current));
  }

  function pointerCancel() {
    pointers.current.clear();
    gesture.current = null;
    drag.current = null;
  }

  function focusEvent(event: Pick<Event, "col" | "row">) {
    const scale = 1.05;
    updateView({ scale, x: -event.col * CELL_WIDTH * scale, y: -event.row * CELL_HEIGHT * scale });
  }

  function zoom(factor: number) {
    updateView((previous) => ({ ...previous, scale: clampScale(previous.scale * factor) }));
  }

  function keyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.target !== e.currentTarget) return;
    if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      zoom(1.3);
    }
    if (e.key === "-") {
      e.preventDefault();
      zoom(1 / 1.3);
    }
    if (e.key === "0") {
      e.preventDefault();
      resetView();
    }

    const step = PAN_STEPS[e.key];
    if (step) {
      e.preventDefault();
      updateView((previous) => ({ ...previous, x: previous.x + step.x, y: previous.y + step.y }));
    }
  }

  return {
    view,
    ready,
    viewportRef,
    resetView,
    focusEvent,
    pointerDown,
    pointerMove,
    pointerUp,
    pointerCancel,
    keyDown,
  };
}

export type BoardNavigation = ReturnType<typeof useBoardNavigation>;
