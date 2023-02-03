import React, { useRef, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-themes-all";
import { dracula } from "@uiw/codemirror-themes-all";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { EditorView } from "codemirror";

const Editor = () => {
  const exportContent = useRef();
  const [lineStatus, setLineStatus] = useState(false);

  const [exportComponent, setExComp] = useState();

  const handleClick = () => {
    console.log(exportComponent);
    htmlToImage.toPng(exportComponent).then(function (dataUrl) {
      download(dataUrl, "reffer.png");
    });
  };

  useEffect(() => {
    const editorExportClass = document.getElementsByClassName("cm-editor");
    let exportComp = document.getElementById("capture");
    setExComp(exportComp);

    // console.log(editorExportClass);
    setEditorClass(editorExportClass[0]);
    const lineNumberElementOne =
      document.getElementsByClassName("cm-lineNumbers");
    Array.from(lineNumberElementOne).forEach((el) => {
      console.log(el);

      if (lineStatus) {
        el.classList.add("lineActive");
      } else {
        el.classList.remove("lineActive");
      }
    });
  }, [lineStatus, []]);

  const [editorTheme, setEditorTheme] = useState(githubDark);
  const [editorClass, setEditorClass] = useState();
  console.log(editorClass);
  return (
    <section className="w-full px-4 flex flex-col gap-4">
      <div className="toolbar bg-gray-900 p-2 text-white rounded-md flex gap-10">
        <button onClick={() => setLineStatus(!lineStatus)}>Lines</button>
        <button onClick={() => setEditorTheme(dracula)}>Dark theme</button>
        <button onClick={() => setEditorTheme("light")}>Light theme</button>
        <button onClick={() => setEditorTheme(githubDark)}>Default</button>
      </div>
      <div
        className=" border-black flex items-center justify-center rounded-md m-10 p-0 w-min gradient-cover-one max-w-3xl resize-x overflow-auto"
        id="capture"
        ref={exportContent}
      >
        <CodeMirror
          className="editor-box p-10 outline-none select-none w-max  text-sm "
          value="console.log('hello world!');"
          extensions={
            [javascript({ jsx: true }),
              EditorView.lineWrapping
            
            ]
            
          }
          theme={editorTheme}
          lineWrapping={true}
        />
      </div>

      <button onClick={handleClick}>Download</button>
    </section>
  );
};

export default Editor;
