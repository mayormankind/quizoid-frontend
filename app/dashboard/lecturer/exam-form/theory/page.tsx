"use client";

import TheoryExamForm from '@/components/dashboard/lecturer/TheoryExamForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';


const TheoryExamPage = ()=> {
    const router = useRouter();

    const params = useSearchParams();
    const code = params.get('code');
    const action = params.get('action');

    const handleSubmit = (data: any) => {
        // Handle the submit logic here
        toast.success(`Creating multi-choice exam for ${code}`);
        console.log(data);
        router.push('/dashboard/lecturer/manage-courses');
    };

    return <TheoryExamForm courseCode={code as string} action={action as string} onSubmit={handleSubmit} />;
};

export default TheoryExamPage;
