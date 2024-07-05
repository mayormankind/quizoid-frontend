import React from 'react'

export default function page() {
  return (
    <div className='w-full h-screen bg-gray-200 flex flex-col gap-8'>
        <div className="flex justify-between gap-4 sticky top-0">
            <h2>Hello there, Olaoye Seyi</h2>
            <p>Level: <span>700 level</span></p>
        </div>
        <div className="flex w-full max-w-6xl m-auto h-fit p-8 bg-white">
            <h2>Introduction to Computing (CSC 101)</h2>
            <p>Ensure to answer all question in this section. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et perferendis, iusto qui voluptate debitis nobis fuga magnam aliquam porro dicta, asperiores ipsam repellat! Laboriosam voluptates, iusto mollitia blanditiis a id?</p>
            <div className="flex items-center gap-8">
                <p>Allotted time: <span className='text-green-400'>40 minutes</span></p>
                <p>Total questions: <span className='text-green-400'>60 questions</span></p>
            </div>
            <button className='bg-green-500 text-white'>Start Exam</button>
        </div>
    </div>
  )
}
