import React from 'react'
import "./Spinner.css"

const Spinner = ({ message }) => {
  return (
    <div className='w-screen h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-4'>
      <div className='spinner'></div>
      {message && <p className="text-lg font-semibold text-slate-700">{message}</p>}
    </div>
  )
}

export default Spinner
