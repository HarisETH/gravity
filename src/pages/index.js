// React Imports

import Head from 'next/head'
import Image from 'next/image'



// Component Imports

import Editor from '@/components/Editor'

//API Imports

      //CodeMirror

import CodeMirror from '@uiw/react-codemirror'




export default function Home() {
  return (
    <>
      <Head>
        <title>Gravity - LightWeight Code Screenshot Exporter</title>
        <meta name="description" content="Code Screenshot exporter light as a feather fast as light" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex bg-gray-900 flex-col items-center justify-start pt-10 min-h-screen w-full  '>
        
        <Editor />
      </main>
    </>
  )
}

// installed codemirror base, themes, languages