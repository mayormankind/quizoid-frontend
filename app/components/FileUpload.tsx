"use client";
import React, { useState } from 'react';

export default function FileUploadForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    // Handle file upload logic
    console.log("on");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium">Upload Excel File</label>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button 
        type="submit" 
        className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded"
      >
        Upload
      </button>
    </form>
  );
}
