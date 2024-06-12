import React from 'react'
import Link from 'next/link';
export default function Sidebar() {
  const Id = "webflux@funaab-ict"; 
  return (
    <div className="h-screen w-64 bg-white shadow-md">
      <div className="p-5">
        <h3 className="text-xl font-bold text-green-500">Favour webflux</h3>
        <p className='py-3 text-sm'>Admin ID: {Id}</p>
      </div>
      <nav className="p-5">
        <ul>
          <li className="p-4">
            <Link href="/dashboard" className='text-green-500 font-bold text-center'>
              Students
            </Link>
          </li>
          <li className="p-4">
            <Link href="/dashboard/lecturer">
             Lecturer
            </Link>
          </li>
          <li className="p-4">
            <Link href="/dashboard/exam">
             Edit Exam
            </Link>
          </li>
           <li className="p-4">
            <Link href="/dashboard/results">
             Results
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};


