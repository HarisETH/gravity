import React from 'react'
import GitHubButton from 'react-github-btn'
import { Button, Spacer } from "@nextui-org/react";


const Header = () => {
  return (
    <div className='py-10 flex flex-col items-center gap-2'>
        <h1 className='text-6xl font-lexend font-bold text-white tracking-wide text-gradient'>Gravity</h1>
<p className='text-slate-50 opacity-60 font-lexend tracking-normal'>A light-weight Code formatter just for YOU</p>
    </div>
  )
}

export default Header