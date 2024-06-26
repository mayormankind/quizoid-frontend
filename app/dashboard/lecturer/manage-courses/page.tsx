"use client"

import CourseCard from '@/components/dashboard/lecturer/CourseCard';
import ExamChoiceModal from '@/components/dashboard/lecturer/ExamChoiceModal';
import MultichoiceExamForm from '@/components/dashboard/lecturer/MultichoiceExamForm';
import TheoryExamForm from '@/components/dashboard/lecturer/TheoryExamForm';
import React, { useState } from 'react'


export default function ManageCourses(){
    
    interface Course {
      code: string;
      title: string;
      units: number;
      examExists: boolean;
    }
    
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
      },
    ];
    
    const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [examType, setExamType] = useState<'theory' | 'multichoice' | null>(null);

    const toggleDropdown = (courseCode: string) => {
        setDropdownOpen(prevState => ({ ...prevState, [courseCode]: !prevState[courseCode] }));
    };

    const handleCreateExam = (course: Course) => {
        if (course.examExists) {
            alert('Exam already exists for this course.');
            return;
        }
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const handleEditExam = (course: Course) => {
        if (!course.examExists) {
            alert('No exam exists for this course.');
            return;
        }
        alert(`Edit exam for ${course.code}`); // Replace with your logic to edit an exam
    };

    const handleDeleteExam = (course: Course) => {
        if (!course.examExists) {
            alert('No exam exists to delete for this course.');
            return;
        }
        alert(`Delete exam for ${course.code}`); // Replace with your logic to delete an exam
        course.examExists = false;
    };

    const handleSelectExamType = (type: 'theory' | 'multichoice') => {
        setExamType(type);
        setIsModalOpen(false);
    };

    const handleSubmitExam = (examData: any) => {
        alert(`Creating ${examType} exam for ${selectedCourse?.code}`);
        console.log(examData);
        // Replace with your logic to submit the exam data
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
        {examType === 'theory' && selectedCourse && (
          <TheoryExamForm courseCode={selectedCourse.code} onSubmit={handleSubmitExam} />
        )}
        {examType === 'multichoice' && selectedCourse && (
          <MultichoiceExamForm courseCode={selectedCourse.code} onSubmit={handleSubmitExam} />
        )}
      </div>
    );
  };
  