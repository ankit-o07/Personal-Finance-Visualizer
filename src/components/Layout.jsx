"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent , SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="bg-blue-600 text-white w-64 p-4">
        <SheetTitle className="space-y-4 text-white my-8">Navigation</SheetTitle>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="block py-2 px-3 hover:bg-blue-500 rounded">
                  Home 
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="block py-2 px-3 hover:bg-blue-500 rounded">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/transactions" className="block py-2 px-3 hover:bg-blue-500 rounded">
                  Transactions
                </Link>
              </li>
              <li>
                <Link href="/categories" className="block py-2 px-3 hover:bg-blue-500 rounded">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/budget" className="block py-2 px-3 hover:bg-blue-500 rounded">
                  Budgeting
                </Link>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      
      <div className="flex flex-col flex-1">
        
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <Button variant="outline" onClick={() => setIsSidebarOpen(true)}>
            ☰ Menu
          </Button>
          <Link href="/" className="text-lg font-bold hover:underline">
             Personal Finance Visualizer
          </Link>
        </header>

        
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
