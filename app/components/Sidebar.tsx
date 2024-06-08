import React from 'react'
import Link from 'next/link';
export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white shadow-md">
      <div className="p-10">
        <h1 className="text-xl font-bold text-green-500">Favour webflux</h1>
      </div>
      <nav className="p-5">
        <ul>
          <li className="p-4">
            <Link href="/" className='text-green-500 font-bold text-center'>
              Students
            </Link>
          </li>
          <li className="p-4">
            <Link href="/about">
             Lecturer
            </Link>
          </li>
          <li className="p-4">
            <Link href="/contact">
             Edit Exam
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

