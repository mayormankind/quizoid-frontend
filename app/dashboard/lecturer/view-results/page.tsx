"use client"

import ResultCard from '@/components/dashboard/lecturer/ResultCard';
import React from 'react'


export default function StudentResults(){
    const courses = [
      {
        code: 'CSC404',
        title: 'Artificial Intelligence and Machine Learning',
        students: 67,
      },
      {
        code: 'CSC405',
        title: 'Artificial Intelligence and Machine Learning',
        students: 60,
      },
      {
        code: 'IFS402',
        title: 'Web Arcitecture and Oragnazation',
        students: 54,
      },
    ];
  
    return (
      <div className='w-full h-full bg-white rounded-xl p-4'>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="uppercase text-left text-xs text-gray-500 tracking-wider">
              <th className="px-6 py-3 font-medium">Course Code</th>
              <th className="px-6 py-3 font-medium">Course Title</th>
              <th className="px-6 py-3 font-medium">Students</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <ResultCard course={course} key={course.code}/>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  