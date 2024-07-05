"use client"

import { useRouter } from 'next/navigation';
import CourseCard from '@/components/dashboard/lecturer/CourseCard';
import ExamChoiceModal from '@/components/dashboard/lecturer/ExamChoiceModal';
import React, { useState, useEffect } from 'react';
import { createExam, getExams, updateExam, getExamsByLecturerID, deleteExam } from '@/api/exam';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';


interface Course {
  code: string;
  title: string;
  unit: number;
  examExists?: boolean;
  examType?: 'theory' | 'multichoice';
}

export default function ManageCourses(){
  const { user } = useUser();
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BASE_API_URL;

    const [ courses, setCourses ] = useState<Course[]>(user?.details.courses);
    
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


    const handleDeleteExam = async (course: Course) => {

      if (!course.examExists) {
        alert('No exam exists to delete for this course.');
        return;
      }
      try {
        await deleteExam(course.code);
        setCourses(prevCourses => prevCourses.map(c => c.code === course.code ? { ...c, examExists: false } : c));
        alert(`Deleted exam for ${course.code}`);
      } catch (error) {
        console.error(error);
      }
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
              <th className="px-6 py-3 font-medium">Unit</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {user?.details.courses.length === 0 && <p className='m-auto'>No registered courses here. Contact your admin!</p>}
            {/* {courses.map((course) => ( */}
            {user?.details.courses.map((course:any) => (
              <CourseCard course={course} key={course.code} handleCreateExam={handleCreateExam} handleEditExam={handleEditExam} handleDeleteExam={handleDeleteExam} toggleDropdown={toggleDropdown} dropdownOpen={dropdownOpen}/>
            ))}
          </tbody>
        </table>
        <ExamChoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectExamType={handleSelectExamType}/>
      </div>
    );
  };