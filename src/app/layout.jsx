import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Footer from "@/components/layout/footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Bien restituido",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TooltipProvider>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
