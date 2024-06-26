"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ExamForm() {
    const router = useRouter();
    const { code, action } = router.query;

    const [course, setCourse] = useState(null);
    const [examData, setExamData] = useState({
        title: '',
        description: '',
        questions: [],
    });

    useEffect(() => {
        if (action === 'edit' && code) {
            // Fetch the existing exam data for the course and set it to examData
            // This is just an example, replace it with actual fetching logic
            setExamData({
                title: 'Sample Exam Title',
                description: 'Sample Exam Description',
                questions: ['Sample Question 1', 'Sample Question 2'],
            });
        }
    }, [action, code]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (action === 'create') {
            // Logic to create a new exam
            console.log('Creating exam for course:', code, examData);
        } else if (action === 'edit') {
            // Logic to edit an existing exam
            console.log('Editing exam for course:', code, examData);
        }
        router.push('/dashboard/lecturer/manage-courses');
    };

    return (
        <div className="w-full h-full bg-white rounded-xl p-4">
            <h2 className="text-2xl font-bold">{action === 'create' ? 'Create Exam' : 'Edit Exam'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                <label>
                    Title:
                    <input
                        type="text"
                        value={examData.title}
                        onChange={(e) => setExamData({ ...examData, title: e.target.value })}
                        className="border p-2 rounded"
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={examData.description}
                        onChange={(e) => setExamData({ ...examData, description: e.target.value })}
                        className="border p-2 rounded"
                    />
                </label>
                <label>
                    Questions:
                    <textarea
                        value={examData.questions.join('\n')}
                        onChange={(e) => setExamData({ ...examData, questions: e.target.value.split('\n') })}
                        className="border p-2 rounded"
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {action === 'create' ? 'Create Exam' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
