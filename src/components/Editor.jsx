import React, { useRef, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-themes-all";
import { dracula } from "@uiw/codemirror-themes-all";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { EditorView } from "codemirror";


// Design System Components

import { Checkbox } from "antd";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";

//themes

//languages

const Editor = () => {
  const exportContent = useRef();
  const [lineStatus, setLineStatus] = useState(false);
  const [exportComponent, setExComp] = useState();

  const [editorTheme, setEditorTheme] = useState(githubDark);
  const [editorClass, setEditorClass] = useState();
  console.log(editorClass);

  //html2image function
  const handleClick = () => {
    console.log(exportComponent);
    htmlToImage.toPixelData(exportComponent, {quality: 1,  skipAutoScale:true}).then(function (dataUrl) {
      download(dataUrl, "reffer.png");
    });

   
    
  };


  //Line numbers and getting constant by class names
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

  
//theme dropdown db
  const items = [
    {
      key: "1",
      label: (
        <button onClick={() => setEditorTheme(dracula)}>Dark theme</button>
      ),
    },
    {
      key: "2",
      label: "Item 2",
    },
    {
      key: "3",
      label: "Item 3",
    },
  ];

  return (
    <section className="w-full px-4 flex flex-col gap-4 justify-center items-center py-20">
      <div className="toolbar bg-gray-900 p-2 text-white rounded-md flex gap-10">
        <Checkbox
          onChange={() => setLineStatus(!lineStatus)}
          className="text-white"
        >
          Lines
        </Checkbox>
        <button onClick={() => setEditorTheme(dracula)}>Dark theme</button>
        <button onClick={() => setEditorTheme("light")}>Light theme</button>
        <button onClick={() => setEditorTheme(githubDark)}>Default</button>
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["3"],
          }}
        >
          <button>Themes -3 </button>
        </Dropdown>
      </div>
      <Space wrap>
        <Button
          onClick={handleClick}
          type="primary"
          className="text-white bg-blue-600"
        >
          Export Code
        </Button>
      </Space>
      <div
        className=" border-black flex items-center justify-center rounded-md p-0 w-min gradient-cover-one max-w-full resize-x overflow-auto"
        id="capture"
        ref={exportContent}
      >
        <CodeMirror
          className="editor-box p-10 outline-none select-none w-max max-h-fit text-xs max-w-full"
          value="console.log('hello world!');"
          extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
          theme={editorTheme}
          lineWrapping={true}
        />
      </div>

      
    </section>
  );
};

export default Editor;
