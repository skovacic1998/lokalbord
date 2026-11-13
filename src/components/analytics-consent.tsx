"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const measurementId = "G-5FZ6JF79WL";
const consentKey = "lokalbord-analytics-consent";

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean;
  }
}

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(consentKey);
    setChoice(stored);
    setReady(true);
    if (stored === "accepted") loadAnalytics();
  }, []);

  function loadAnalytics() {
    window[`ga-disable-${measurementId}`] = false;
    if (window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "granted" });
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  function choose(value: "accepted" | "rejected") {
    localStorage.setItem(consentKey, value);
    setChoice(value);
    setEditing(false);
    if (value === "accepted") {
      loadAnalytics();
    } else {
      window[`ga-disable-${measurementId}`] = true;
      if (window.gtag) window.gtag("consent", "update", { analytics_storage: "denied" });
      document.cookie = "_ga=; Max-Age=0; path=/";
      document.cookie = `_ga_${measurementId.slice(2)}=; Max-Age=0; path=/`;
    }
  }

  if (!ready) return null;
  return (
    <>
      <button className="cookie-settings" onClick={() => setEditing(true)}>Postavke kolačića</button>
      {(!choice || editing) && (
        <aside className="cookie-banner" aria-label="Postavke kolačića">
          <p>Uz tvoju privolu koristimo Google Analytics kako bismo saznali koliko ljudi posjećuje Lokalbord. Više u <Link href="/politika-privatnosti">politici privatnosti</Link>.</p>
          <div>
            <button onClick={() => choose("accepted")}>Prihvati</button>
            <button onClick={() => choose("rejected")}>Odbij</button>
          </div>
        </aside>
      )}
    </>
  );
}
