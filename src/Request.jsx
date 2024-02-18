import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverRoute, token } from './App'
import { FaDoorOpen } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { AiFillDelete } from 'react-icons/ai';
import { TailSpin } from 'react-loader-spinner';

const Request = ({socket,setLoading,refetch,requests,loading}) => {


  const accept = async(request)=>{
    try {
      setLoading({start:true,id:request._id})
      socket.emit('allow',({username:request.username,password:request.password,mode:'request',session:request}))
      refetch()
    } catch (error) {
      
    }finally{
      setLoading({})
    }


  }
  const deleteRequest = async(request)=>{
    try {
      setLoading({start:true,id:request._id})
       await axios.delete(serverRoute+`/request/${request._id}`,{headers:{'Authorization':`Bearer ${token}`}}).then(async()=>   await refetch())
    } catch (error) {
      
    }finally{
      setLoading({})
    }
  }
  
  return (
    <div className='w-full   my-2 ' >
    <div className='flex flex-col w-full justify-start bg-white items-center p-3  rounded-md rounded-r-none gap-y-2' style={{minHeight:'calc(100vh - 100px)'}}>
       <div className='flex gap-x-3 items-center justify-center w-11/12 text-center py-1 rounded-lg' style={{border:'1px solid #eee'}}>
                <span className='w-1/12  text-xs text-center text-green-600 flex justify-center items-center ' style={{borderLeft:'1px solid #eee '}}> م</span>
                <span className='w-2/6 text-xs text-center text-green-600 flex justify-center items-center md:text-xl' style={{borderLeft:'1px solid #eee '}}> مستخدم</span>
                <span className='w-2/6 text-xs text-center text-green-600 flex justify-center items-center md:text-xl' style={{borderLeft:'1px solid #eee '}}>باسورد</span>
                <span className='w-1/12 text-xs text-center text-green-600 flex justify-center items-center md:text-xl' style={{borderLeft:'1px solid #eee '}}>حاله</span>
                <span className='w-2/12 text-xs text-center text-green-600 flex justify-center items-center md:text-xl' >دخول</span>
      </div>
      <div className='w-11/12 bg-white rounded-lg ' style={{border:'1px solid #eee'}}>
      {
        requests.length ? requests.map((request,i)=>{
          return (
            <div className='flex gap-x-3 items-center justify-center w-full text-center py-1 ' style={{border:'1px solid #eee'}} >
        <span className='w-1/12 text-xs  text-center text-green-600 flex justify-center items-center md:text-lg' style={{borderLeft:'1px solid #eee '}}>{i+1}</span>
        <span className=' w-2/6 text-xs text-center overflow-hidden hover:overflow-visible flex justify-center items-center' style={{borderLeft:'1px solid #eee '}}>{request.username}</span>
        <span className=' w-2/6 text-xs text-center overflow-hidden hover:overflow-visible flex justify-center items-center' style={{borderLeft:'1px solid #eee '}}>{request.password}</span>
        <span className=' w-1/12 text-xs text-center flex justify-center items-center md:text-2xl' style={{borderLeft:'1px solid #eee '}}>{request.status ? <IoMdCheckmark className='text-green-600'/> : <FaXmark className='text-red-600'/>}</span>
        <span className=' w-2/12 text-xs text-center text-black hover:text-green-600 flex justify-center items-center cursor-pointer md:text-2xl'>
          {loading.start ?loading.id == request._id ?
                <TailSpin
                  height="20"
                  width="20"
                  color="green"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}/> :
                   request.status ?
                   <AiFillDelete className='text-red-500 cursor-pointer' onClick={()=>deleteRequest(request)}/>:
                   <FaDoorOpen onClick={()=>accept(request)}/>:
                   request.status ?
                   <AiFillDelete className='text-red-500 cursor-pointer' onClick={()=>deleteRequest(request)}/>:
                    <FaDoorOpen onClick={()=>accept(request)}/>
                   }</span>
            </div>
          )
        })
      :<div className='text-red-500 w-full text-center flex items-center justify-center' style={{minHeight:'50vh'}}> لا توجد طلبات حاليا !</div>}
      </div>
      </div>
    </div>
  )
}

export default Request