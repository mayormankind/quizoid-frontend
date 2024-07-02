"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const CourseResults =()=> {
    const params = useParams();
    const router = useRouter();
    const { code } = params;
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        if (code) {
            setResults([
                { matricNo: 'CSC/20/1267', name: 'Ishola Isaiah', score: 85 },
                { matricNo: 'CSC/20/1265', name: 'Micheal Odumeje', score: 90 },
                { matricNo: 'CSC/20/1262', name: 'Aalafin Omode', score: 78 },
                { matricNo: 'CSC/20/1260', name: 'Mark Isaac', score: 78 },
                { matricNo: 'CSC/20/1263', name: 'Adetoye Samuel', score: 78 },
            ]);
            // fetch(`/api/results/${code}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         setResults(data);
            //         setLoading(false);
            //     })
            //     .catch(err => {
            //         setError('Failed to load results');
            //         setLoading(false);
            //     });
        }
    }, [code]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Student Results', 14, 20);
        autoTable( doc,{
            startY: 30,
            head: [['Matric No.', 'Name', 'Score']],
            body: results.map((result) => [result.matricNo, result.name, result.score]),
        });
        doc.save(`${code}_results.pdf`);
    };

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <div className="relative w-full h-full bg-white rounded-xl p-4">
            <span className='text-gray-300 hover:border-b border-gray-800 hover:text-red-600' onClick={()=>router.push('/dashboard/lecturer/view-results')}>back</span>
            <div className="flex items-center justify-between gap-4 mb-2">
                <h2 className="text-2xl font-bold mb-4">Results for {code}</h2>
                <button onClick={downloadPDF} className="bg-green-500 text-white py-2 px-4 rounded">Download PDF</button>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mb-4">
                <thead className="bg-gray-50">
                    <tr className="uppercase text-left text-xs text-gray-500 tracking-wider">
                        <th className="px-6 py-3 font-medium">Matric No.</th>
                        <th className="px-6 py-3 font-medium">Name</th>
                        <th className="px-6 py-3 font-medium">Score</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td className="px-6 py-3">{result.matricNo}</td>
                            <td className="px-6 py-3">{result.name}</td>
                            <td className="px-6 py-3">{result.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseResults;