import React, { useState } from 'react';
import { RiAddFill } from 'react-icons/ri';

interface TheoryExamFormProps {
    courseCode: string;
    action: string;
    onSubmit: (data: any) => void;
}

const TheoryExamForm: React.FC<TheoryExamFormProps> = ({ courseCode, action, onSubmit }) => {
    const [examData, setExamData] = useState({
        instruction: '',
        questions: [''],
    });

    const handleQuestionChange = (index: number, value: string) => {
        const questions = [...examData.questions];
        questions[index] = value;
        setExamData({ ...examData, questions });
    };

    const addQuestion = () => {
        setExamData({ ...examData, questions: [...examData.questions, ''] });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(examData);
    };

    return (
        <div className="w-full h-full bg-white rounded-xl p-4">
            <h2 className="text-2xl font-bold">Create Theory Exam for {courseCode}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                <label>
                    Instruction:
                    <input
                        type="text"
                        value={examData.instruction}
                        onChange={(e) => setExamData({ ...examData, instruction: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <div>
                    <h3>Questions:</h3>
                    {examData.questions.map((question, index)=> (
                        <div className='mt-3'>
                            <label>Question {index + 1}</label>
                            <input key={index} type="text" value={question} onChange={(e) => handleQuestionChange(index, e.target.value)} className="border p-2 rounded mt-2 w-full"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addQuestion} className="mt-2 text-blue-500 flex gap-4 items-center">
                        <i className='w-[18px]'><RiAddFill/></i>
                        Add Question
                    </button>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {action === 'create' ? 'Create Exam' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default TheoryExamForm;