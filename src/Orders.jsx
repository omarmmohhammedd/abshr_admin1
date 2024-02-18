import React from 'react'

const Orders = ({setActive,ordersData}) => {
  
  return (
    <div className='w-full   my-2 '>
    <div className='flex flex-col w-full justify-start bg-white items-center p-3  rounded-md rounded-r-none gap-y-2' style={{minHeight:'calc(100vh - 100px)'}}>
       <div className='flex gap-x-3 items-center justify-center w-11/12 text-center py-1 rounded-lg' style={{border:'1px solid #eee'}}>
                <span className='w-1/12  text-xs text-center text-green-600 flex justify-center items-center ' style={{borderLeft:'1px solid #eee '}}> م</span>
                <span className='w-3/12 text-xs text-center text-green-600 flex justify-center items-center md:text-xl' style={{borderLeft:'1px solid #eee '}}> مستخدم</span>
                <span className='w-3/12 text-xs text-center text-green-600 flex justify-center items-center md:text-xl' style={{borderLeft:'1px solid #eee '}}>خدمه</span>
                <span className='w-2/12 text-xs text-center text-green-600 flex justify-center items-center md:text-xl' style={{borderLeft:'1px solid #eee '}}>نوع الخدمه</span>
                <span className='w-1/12 text-xs text-center text-green-600 hidden lg:flex justify-center items-center md:text-xl' style={{borderLeft:'1px solid #eee '}} >بنك</span>
                <span className='w-1/12 text-xs text-center text-green-600 flex justify-center items-center md:text-xl' >رمز</span>
      </div>
      <div className='w-11/12 bg-white rounded-lg ' style={{border:'1px solid #eee'}}>
      {
        ordersData.map((order,i)=>{
          return (
            <div className='flex gap-x-3 items-center justify-center w-full text-center py-1 hover:opacity-40 cursor-pointer' style={{border:'1px solid #eee'}} onClick={()=>setActive({nav:'OrderData',data:{id:order._id}})}>
        <span className='w-1/12 text-xs  text-center text-green-600 flex justify-center items-center md:text-lg ' style={{borderLeft:'1px solid #eee '}}>{i+1}</span>
        <span className=' w-3/12 text-xs text-center !overflow-hidden hover:overflow-visible flex justify-center items-center orderitem' style={{borderLeft:'1px solid #eee '}}>{order.username}</span>
        <span className=' w-3/12 text-xs text-center !overflow-hidden hover:overflow-visible flex justify-center items-center  orderitem' style={{borderLeft:'1px solid #eee '}}>{order.service}</span>
        <span className=' w-2/12 text-xs text-center !overflow-hidden hover:overflow-visible flex justify-center items-center orderitem' style={{borderLeft:'1px solid #eee '}}>{order.type}</span>
        <span className=' w-1/12 text-xs text-center text-black hover:text-green-600 hidden lg:flex justify-center items-center cursor-pointer md:text-xs orderitem' style={{borderLeft:'1px solid #eee '}}>{order.bank ? order.bank : '-'}</span>
        <span className=' w-1/12 text-xs text-center text-black hover:text-green-600 flex justify-center items-center cursor-pointer md:text-base orderitem'>{order.otp ? order.otp : '-'}</span>
            </div>
          )
        })
      }
      </div>
      </div>
    </div>
  )
}

export default Orders