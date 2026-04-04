import type { Metadata } from "next";
import Layout from "../src/Layout";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Jay Han",
  description: "Frontend & App Developer Portfolio",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <Layout />
      </body>
    </html>
  );
}
