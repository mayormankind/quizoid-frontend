"use client"

import { useRouter } from 'next/navigation';
import CourseCard from '@/components/dashboard/lecturer/CourseCard';
import ExamChoiceModal from '@/components/dashboard/lecturer/ExamChoiceModal';
import React, { useState } from 'react'


interface Course {
  code: string;
  title: string;
  units: number;
  examExists: boolean;
  examType?: 'theory' | 'multichoice';
}

export default function ManageCourses(){
    
    const router = useRouter();

    const courses: Course[] = [
      {
        code: 'CSC404',
        title: 'Artificial Intelligence and Machine Learning',
        units: 3,
        examExists: false,
      },
      {
        code: 'CSC405',
        title: 'Artificial Intelligence and Machine Learning',
        units: 3,
        examExists: false,
      },
      {
        code: 'IFS402',
        title: 'Web Arcitecture and Oragnazation',
        units: 2,
        examExists: true,
        examType: 'theory',
      },
    ];
    
    const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const toggleDropdown = (courseCode: string)=> {
        setDropdownOpen(prevState => ({ ...prevState, [courseCode]: !prevState[courseCode] }));
    };

    const handleCreateExam = (course: Course)=> {
        if (course.examExists) {
            alert('Exam already exists for this course.');
            return;
        }
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const handleEditExam = (course: Course)=> {
        if (!course.examExists) {
            alert('No exam exists for this course.');
            return;
        }
        if (course.examType) {
          router.push(`/dashboard/lecturer/exam-form/${course.examType}?code=${course.code}&action=edit`);
        } else {
          alert('Exam type is not specified for this course.');
        }
    };

    const handleDeleteExam = (course: Course)=> {
        if (!course.examExists) {
            alert('No exam exists to delete for this course.');
            return;
        }
        alert(`Delete exam for ${course.code}`); // Replace with your logic to delete an exam
        course.examExists = false;
    };

    
    const handleSelectExamType = (type: 'theory' | 'multichoice') => {
      if (selectedCourse) {
          router.push(`/dashboard/lecturer/exam-form/${type}?code=${selectedCourse.code}&action=create`);
      }
      setIsModalOpen(false);
    };
  
    
  
    return (
      <div className='w-full h-full bg-white rounded-xl p-4'>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="uppercase text-left text-xs text-gray-500 tracking-wider">
              <th className="px-6 py-3 font-medium">Course Code</th>
              <th className="px-6 py-3 font-medium">Course Title</th>
              <th className="px-6 py-3 font-medium">Units</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <CourseCard course={course} key={course.code} handleCreateExam={handleCreateExam} handleEditExam={handleEditExam} handleDeleteExam={handleDeleteExam} toggleDropdown={toggleDropdown} dropdownOpen={dropdownOpen}/>
            ))}
          </tbody>
        </table>
        <ExamChoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectExamType={handleSelectExamType}/>
      </div>
    );
  };
  