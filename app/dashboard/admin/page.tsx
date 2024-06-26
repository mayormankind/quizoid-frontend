"use client";

import { useState } from 'react';
import * as XLSX from 'xlsx';

const studentsData = [
  { name: 'Favour Olaoye', matricNumber: '20205714', email: 'olaoyesf.20@funaab.edu.ng', level: '100', department: 'Computer Science' },
  { name: 'Olayemi Moses', matricNumber: '20203161', email: 'jane@example.com', level: '200', department: 'Mathematics' },
  { name: 'Obadimu Ismail', matricNumber: '20203161', email: 'alice@example.com', level: '300', department: 'Computer Science' },
  { name: 'Adeyemi Bidemi', matricNumber: '20205719', email: 'bob@example.com', level: '400', department: 'Statistics' },
  { name: 'Olayemi Moses', matricNumber: '20203161', email: 'jane@example.com', level: '200', department: 'Mathematics' },
  { name: 'Obadimu Ismail', matricNumber: '20203161', email: 'alice@example.com', level: '300', department: 'Computer Science' },
  { name: 'Olayemi Moses', matricNumber: '20203161', email: 'jane@example.com', level: '200', department: 'Mathematics' },
  { name: 'Obadimu Ismail', matricNumber: '20203161', email: 'alice@example.com', level: '300', department: 'Computer Science' },
  // Add more student data here
];

export default function StudentsPage() {
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState(studentsData);

  const filteredStudents = students.filter(student => {
    return (
      (department ? student.department === department : true) &&
      (level ? student.level === level : true)
    );
  });

  const handleFileUpload = (event : any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e : any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      const newStudents = sheetData.slice(1).map((row : any)  => { 
        ({
        name: row[2],
        matricNumber: row[1],
        email: row[4],
        level: row[2],
        department: row[0],
      })});

      setStudents(prevStudents => [...prevStudents, ...newStudents]);
      setShowModal(false); // Close the modal after upload
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-500">All Students</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Student
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-green-500 mb-2">Department:</label>
        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          className="p-3 border border-gray-300 rounded"
        >
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Statistics">Statistics</option>
          {/* Add more departments as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-green-500 mb-2">Level:</label>
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="p-3 border border-gray-300 rounded"
        >
          <option value="">All Levels</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          {/* Add more levels as needed */}
        </select>
      </div>

      <table className="min-w-full bg-white m-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Matric Number</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Level</th>
            <th className="py-2 px-4 border-b text-left">Department</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-left">{student.name}</td>
              <td className="py-2 px-4 border-b text-left">{student.matricNumber}</td>
              <td className="py-2 px-4 border-b text-left">{student.email}</td>
              <td className="py-2 px-4 border-b text-left">{student.level}</td>
              <td className="py-2 px-4 border-b text-left">{student.department}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-md font-bold mb-5">Upload Students Data</h2>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="mb-4 border bg-white text-black p-3 mr-3"
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
