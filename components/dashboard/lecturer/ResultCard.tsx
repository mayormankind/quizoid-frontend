import React from 'react'

export default function ResultCard(props:any) {
  return (
    <tr key={props.course.code}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.course.code}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.course.title}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.course.students}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button className='text-white p-2 rounded-xl bg-green-500' onClick={()=>alert(`result for ${props.course.code} is being displayed`)}>View Results</button>
        </td>
    </tr>
  )
}
