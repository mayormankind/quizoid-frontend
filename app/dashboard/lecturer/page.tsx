"use client";

import React, { useState } from 'react';
import Modal from '../../components/Modal';
import FileUploadForm from '@/app/components/FileUpload';
import LecturerForm from '@/app/components/lecturerForm';


export default function LecturerPage() {
  const [showModal, setShowModal] = useState(false);

  return (
 
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lecturer Details</h1>
          <button 
            onClick={() => setShowModal(true)} 
            className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded"
          >
            Upload File
          </button>
        </div>
        <LecturerForm />
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <FileUploadForm />
        </Modal>
      </div>

  );
}
