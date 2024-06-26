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
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1 p-4 bg-whitesmoke">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}

