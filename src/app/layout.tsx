import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lokalbord — događaji na jednom mjestu",
  description: "Digitalna oglasna ploča za događaje u tvom gradu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr">
      <body>{children}</body>
    </html>
  );
}
