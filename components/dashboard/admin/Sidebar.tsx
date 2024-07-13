import React from 'react'
import Link from 'next/link';
import { RiLogoutBoxLine, RiQuestionAnswerLine, RiSettingsLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { toast } from 'react-toastify'



export default function Sidebar() {
  
  const { user, logout } = useUser();
  const router = useRouter();

  const handleSignOut = () =>{
    toast.success('You have signed out sucessfully');
    router.push('/auth/admin/login');
    logout();
    console.log('You have signed out chief');
  }

  const Id = user?.details.adminID;


  return (
    <div className="h-screen w-64 bg-white shadow-md">
      <div className="p-5">
        <h3 className="text-xl font-bold text-green-500">{user?.name}</h3>
        <p className='py-3 text-sm'>Admin ID: {Id}</p>
      </div>
      <nav className="p-5 flex flex-col justify-between">
        <ul>
          <li className="p-4">
            <Link href="/dashboard" className='text-green-500 font-bold text-center'>
              Students
            </Link>
          </li>
          <li className="p-4">
            <Link href="/dashboard/lecturer">
             Lecturer
            </Link>
          </li>
          <li className="p-4">
            <Link href="/dashboard/exam">
             Edit Exam
            </Link>
          </li>
           <li className="p-4">
            <Link href="/dashboard/results">
             Results
            </Link>
          </li>
        </ul>
        <li className={'flex text-red-500 items-center p-4 gap-4 hover:bg-green-50'} onClick={handleSignOut}>
          <i className='text-[17px]'><RiLogoutBoxLine/></i>
          <h2 className="">Logout</h2>
        </li>
      </nav>
    </div>
  );
};


