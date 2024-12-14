import React from 'react'

const SendInput = () => {
  return (
    <div>
        <form className='my-3 px-4'>
            <div className='w-full relative'>
                <input type="text" 
                placeholder='send a message.....'
                className='border text-sm border-zinc-500
                 rounded-lg block w-full bg-gray-600 text-white'/>
                 <button className='absolute flex items-center'
            </div>
        </form>
      
    </div>
  )
}

export default SendInput
