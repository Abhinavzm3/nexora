import React from 'react'

const OtherUser = () => {
  return (
    <div>
    <div className='gap-2 flex items-center hover:bg-zinc-200 rounded-sm p-2 cursor-pointer'>
        <div className='avatar online'>
            <div className='w-12 rounded-full'>
                <img src="https://www.google.com//url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw0oc80Q96KU1W_ipXLimkkt&ust=1734277482933000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCr8pDTp4oDFQAAAAAdAAAAABAE" alt="img"></img>
            </div>
        </div>
        <div className='flex-col flex'>
            <div className='flex gap-2 flex-1'>
                <p>Abhinav</p>
            </div>
        </div>

    </div>
    <div className='divider my-0 py-0 h-1'></div>

  
</div>
  )
}

export default OtherUser
