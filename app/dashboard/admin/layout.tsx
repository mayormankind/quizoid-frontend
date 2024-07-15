"use client";

import { ContentProvider } from "@/components/dashboard/admin/ContentContext";
import Sidebar from "@/components/dashboard/admin/Sidebar";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className={inter.className}>
                <ContentProvider>
                    <div className="flex h-screen">
                        <Sidebar />
                        <div className="flex-1 p-4 bg-whitesmoke h-full">
                            {children}
                        </div>
                    </div>
                </ContentProvider>
            </body>
        </html>
    );
}

