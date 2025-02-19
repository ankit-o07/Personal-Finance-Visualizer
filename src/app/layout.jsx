import Layout from "@/components/Layout";
import "./globals.css"; 
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}