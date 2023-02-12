import React, { useRef, useState, useEffect, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";

import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { EditorView } from "codemirror";

// Design System Components


import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";

//themes
import { githubDark } from "@uiw/codemirror-themes-all";
import { dracula } from "@uiw/codemirror-themes-all";
import { githubLight } from "@uiw/codemirror-themes-all";
import { tokyoNight } from "@uiw/codemirror-themes-all";
import { vscodeDark } from "@uiw/codemirror-themes-all";

//languages
import { javascript } from "@codemirror/lang-javascript";

const Editor = () => {
  const exportContent = useRef();
  const [lineStatus, setLineStatus] = useState(false);
  const [exportComponent, setExComp] = useState();

  const [editorTheme, setEditorTheme] = useState(githubDark);
  const [editorClass, setEditorClass] = useState();

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

            {/* 1 */}
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }} className="bg-transparent">
              {selectedValue}
            </Dropdown.Button>

            {/* 2 */}
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              {/*  */}
              <Dropdown.Item key="Github Dark">
                <Button
                  onPress={() => setEditorTheme(githubDark)}
                  light
                  color="secondary"
                  auto
                >
                  Github Dark{" "}
                </Button>
              </Dropdown.Item>
              {/*  */}

              <Dropdown.Item key="dracula">
                <Button
                  onPress={() => setEditorTheme(dracula)}
                  light
                  color="secondary"
                  auto
                >
                  Dracula{" "}
                </Button>
              </Dropdown.Item>

              <Dropdown.Item key="Tokyo Night">
                <Button
                  onPress={() => setEditorTheme(tokyoNight)}
                  light
                  color="secondary"
                  auto
                >
                  Tokyo Night{" "}
                </Button>
              </Dropdown.Item>

              <Dropdown.Item key="Github Light">
                <Button
                  onPress={() => setEditorTheme(githubLight)}
                  light
                  color="secondary"
                  auto
                >
                  Github Light{" "}
                </Button>
              </Dropdown.Item>


              <Dropdown.Item key="VS Code Dark">
                <Button
                  onPress={() => setEditorTheme(vscodeDark)}
                  light
                  color="secondary"
                  auto
                >
                  VS Code Dark{" "}
                </Button>
              </Dropdown.Item>

              
            </Dropdown.Menu>
{/* githubLight
tokyoNight
vscodeDark */}


          </Dropdown>

          {/*  */}

          

          
        </Navbar.Content>

        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>

          <Navbar.Item className="p-0 w-fit">
          <Button onPress={handleClick} className="bg-purple-600 p-0.5 px-4" shadow color="secondary" auto>
        Export
      </Button>
          </Navbar.Item>

        </Navbar.Content>
      </Navbar>

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
