import type { Metadata } from "next";
import Layout from "../src/Layout";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Jay Han",
  description: "Frontend & App Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
