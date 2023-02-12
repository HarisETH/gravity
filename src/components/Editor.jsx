import React, { useRef, useState, useEffect, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";

import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { EditorView } from "codemirror";

// Design System Components

// import { Checkbox } from "antd";
// import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";

import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";

//themes
import { githubDark } from "@uiw/codemirror-themes-all";
import { dracula } from "@uiw/codemirror-themes-all";

//languages
import { javascript } from "@codemirror/lang-javascript";

const Editor = () => {
  const exportContent = useRef();
  const [lineStatus, setLineStatus] = useState(false);
  const [exportComponent, setExComp] = useState();

  const [editorTheme, setEditorTheme] = useState(githubDark);
  const [editorClass, setEditorClass] = useState();
  console.log(editorClass);

  const [selected, setSelected] = React.useState(new Set(["Github Dark"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  //html2image function
  const handleClick = () => {
    console.log(exportComponent);
    htmlToImage
      .toPng(exportComponent, { quality: 1, skipAutoScale: true })
      .then(function (dataUrl) {
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

  return (
    <section className="w-full px-4 flex flex-col gap-4 justify-center items-center py-20">
      {/* <div className="toolbar bg-gray-900 p-2 text-white rounded-md flex gap-10">
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
            defaultSelectedKeys: ["1"],
          }}
        >
          <button>Themes</button>
        </Dropdown>
      </div> */}
      <Navbar isBordered variant="floating" className="w-full">
        <Navbar.Content hideIn="xs" variant="highlight-rounded">
          <Checkbox
            size="sm"
            onChange={() => setLineStatus(!lineStatus)}
            className="text-white text-base"
          >
            Lines
          </Checkbox>

          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="Github Dark">
                <Button
                  onClick={() => setEditorTheme(githubDark)}
                  light
                  color="primary"
                  auto
                >
                  Github Dark{" "}
                </Button>
              </Dropdown.Item>
              <Dropdown.Item key="dracula">
                <Button
                  onClick={() => setEditorTheme(dracula)}
                  light
                  color="primary"
                  auto
                >
                  Dracula{" "}
                </Button>
              </Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>

          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>

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
        className=" border-black flex items-center justify-center rounded-lg p-0 w-min gradient-cover-one max-w-full resize-x overflow-auto"
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
