import React, { useRef, useState, useEffect } from "react";
import exportImage from "@/utils/exportImage";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-themes-all";
import { dracula } from "@uiw/codemirror-themes-all";


const Editor = () => {
  const exportContent = useRef();
  const [lineStatus, setLineStatus] = useState(false);

  

  useEffect(() => {
    const lineNumberElementOne =
      document.getElementsByClassName("cm-lineNumbers");
    Array.from(lineNumberElementOne).forEach((el) => {
      console.log(el);

      if (lineStatus) {
        // console.log("good tho");
        el.classList.add('lineActive')
      } else {
        // console.log("bad th0");
        el.classList.remove('lineActive')
      }
    });
  }, [lineStatus, []]);

  const [editorTheme, setEditorTheme]= useState(githubDark)

  return (
    <section className="w-full px-4 flex flex-col gap-4">
      <div className="toolbar bg-gray-900 p-2 text-white rounded-md flex gap-10">
        <button onClick={() => setLineStatus(!lineStatus)}>Lines</button>
        <button onClick={() => setEditorTheme(dracula)}>Dark theme</button>
        <button onClick={() => setEditorTheme('light')}>Light theme</button>
        <button onClick={() => setEditorTheme(githubDark)}>Default</button>
      </div>
      <div className=" border-black  " ref={exportContent}>
        <CodeMirror
          className="editor-box"
          value="console.log('hello world!');"
          extensions={[javascript({ jsx: true })]}
          theme={editorTheme}
        />
      </div>
      <button onClick={() => exportImage(exportContent.current, "test")}>
        Export
      </button>
    </section>
  );
};

export default Editor;
