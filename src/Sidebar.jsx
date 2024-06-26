import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Sidebar = ({active,setActive}) => {
    const [sidebar,setSidbar] = useState(false)
    const handleLogOut = ()=>{
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
  return (
    <>
    <div  className='md:flex relative flex-col items-center justify-around hidden mt-2  w-1/5   bg-white'  style={{minHeight:'calc(100vh - 100px)'}}>
        <div className='fixed w-1/6 flex items-center flex-col  m-2 top-40 bg-white' style={{minHeight:'calc(100vh - 100px)'}} >
        <ul className='w-fit  flex flex-col gap-y-5 items-center justify-center py-5'>
            <li onClick={()=>setActive({nav:'Request',data:{}})}
                className={`${active === 'Request' ? 'text-white bg-gray-400' : 'text-white bg-green-500'} text-center text-xl py-2 px-3 w-full cursor-pointer hover:opacity-65 transition-all rounded-lg`}>الدخول</li>
            <li onClick={()=>setActive({nav:'Order',data:{}})}
                className={`${active === 'Order' ? 'text-white bg-gray-400' : 'text-white bg-green-500'} text-center text-xl py-2 px-3 w-full cursor-pointer hover:opacity-65 transition-all rounded-lg`}>الطلبات</li>
        </ul>

        </div>
   
    </div>
    
    <div className=' md:hidden w-full absolute '>
       
            {sidebar ? 
            <>
                <IoMdClose onClick={()=>setSidbar(false)} className='cursor-pointer text-white rounded-full p-1 text-4xl -mt-12 mr-2 bg-gray-300'/>
                <div className='relative  sm:w-1/3 w-2/3 bg-white bg-opacity-80 flex items-center justify-around flex-col ' style={{height:'calc(100vh - 150px)'}}>
                    <ul className='w-full flex flex-col gap-y-5 items-center justify-center py-5 my-6 rounded-l-lg '>
                        <li onClick={()=>setActive({nav:'Request',data:{}})}
                            className={`${active === 'Request' ? 'text-white bg-gray-400' : 'text-white bg-green-500'} text-center text-xl py-2 px-3 w-4/5 cursor-pointer hover:opacity-65 transition-all rounded-lg`}>الدخول</li>
                        <li onClick={()=>setActive({nav:'Order',data:{}})}
                            className={`${active === 'Order' ? 'text-white bg-gray-400' : 'text-white bg-green-500'} text-center text-xl py-2 px-3 w-4/5 cursor-pointer hover:opacity-65 transition-all rounded-lg`}>الطلبات</li>

                    </ul>

                 </div>
            </>
            :  
                <IoMdMenu onClick={()=>setSidbar(true)} 
                          className='cursor-pointer text-white rounded-full p-1 text-4xl -mt-12 mr-2 bg-gray-300'/>
            }

   
    </div>
   
    </>
  )
}

export default Sidebar
