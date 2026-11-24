import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsConsent } from "@/components/analytics-consent";

export const metadata: Metadata = {
  title: "Lokalbord — događaji na jednom mjestu",
  description: "Digitalna oglasna ploča za događaje u tvom gradu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { var theme = localStorage.getItem('lokalbord-theme'); if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme; } catch (e) {}` }} />
      </head>
      <body>{children}<AnalyticsConsent /></body>
    </html>
  );
}
