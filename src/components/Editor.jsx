import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-themes-all';

const Editor = () => {
  return (
    <div className='w-full px-4 border-black  '>
        <CodeMirror
        
      value="console.log('hello world!');"
      height="200px"
      extensions={[javascript({ jsx: true })]}
      theme={githubDark}
    />
    </div>
  )
}

export default Editor