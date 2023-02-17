import React, { useRef, useState, useEffect, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import * as Icon from "react-feather";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { EditorView } from "codemirror";
// Design System Components

import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";
import { Radio } from "@nextui-org/react";
import { Switch, Grid } from "@nextui-org/react";
import { Popover } from "@nextui-org/react";

//themes
import { githubDark } from "@uiw/codemirror-themes-all";
import { dracula } from "@uiw/codemirror-themes-all";
import { githubLight } from "@uiw/codemirror-themes-all";
import { tokyoNight } from "@uiw/codemirror-themes-all";
import { vscodeDark } from "@uiw/codemirror-themes-all";

import { nord } from "@uiw/codemirror-themes-all";
import { duotone } from "@uiw/codemirror-themes-all";
import { sublime } from "@uiw/codemirror-themes-all";
import { androidstudio } from "@uiw/codemirror-themes-all";
import { aura } from "@uiw/codemirror-themes-all";
import { abcdef } from "@uiw/codemirror-themes-all";

//languages
import { javascript } from "@codemirror/lang-javascript";

const Editor = () => {
  const exportContent = useRef();
  const [lineStatus, setLineStatus] = useState(false);
  const [exportComponent, setExComp] = useState();

  const [editorTheme, setEditorTheme] = useState(githubDark);
  const [editorClass, setEditorClass] = useState();

  const [selected, setSelected] = useState(new Set(["Github Dark"]));

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  // Dropdown Array
  const [checked, setChecked] = useState('8');


  const menuItems = [
    { key: "Github_Dark", name: "Github Dark", mainword: githubDark },
    { key: "dracula", name: "dracula", mainword: dracula },
    { key: "tokyoNight", name: "Tokyo Night", mainword: tokyoNight },
    { key: "ABCDEF", name: "ABCDEF", mainword: abcdef },
    { key: "Aura", name: "Aura", mainword: aura },
    { key: "Android Studio", name: "Android Studio", mainword: androidstudio },
    { key: "Sublime", name: "Sublime", mainword: sublime },
    { key: "Duotone", name: "Duotone", mainword: duotone },
    { key: "Nord", name: "Nord", mainword: nord },
    { key: "VS Code Dark", name: "VS Code Dark", mainword: vscodeDark },
    { key: "Github Light", name: "Github Light", mainword: githubLight },
    
  ];



  //padding function

 
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
          <p className="text-sm self-center font-medium text-purple-600 jetbrain mr-2">
            Lines
          </p>
          <Switch
            size="xs"
            onChange={() => setLineStatus(!lineStatus)}
            className="text-white text-base shadow-lg"
            label="Lines"
            shadow
            color="secondary"
          ></Switch>

          <Dropdown>
            {/* 1 */}
            <Dropdown.Button
              flat
              color="secondary"
              css={{ tt: "capitalize" }}
              className="bg-transparent"
            >
              {selectedValue}
            </Dropdown.Button>

            {/* 2 */}
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              items={menuItems}
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
                           


              {/*  */}
              
              {(item) => (
                <Dropdown.Item key={item.key}>
                  <Button onPress={() => {
                    setEditorTheme(item.mainword)
                    console.log(item.mainword)
                  }}
                  light
                  color="secondary"
                  auto>{item.name}</Button>
                </Dropdown.Item>
              )}





            </Dropdown.Menu>
            {/* githubLight
tokyoNight
vscodeDark

nord
duotone
sublime
androidstudio
aura
abcdef */}
          </Dropdown>

          

          {/*  */}
        </Navbar.Content>

        <Navbar.Content>
          <Popover placement="bottom-right" >
            <Popover.Trigger>
              <Button auto flat color="secondary">
                <Icon.Settings></Icon.Settings>
              </Button>
            </Popover.Trigger>


            <Popover.Content className="pl-6 pr-6 flex justify-end items-end py-4 w-max">
			<Radio.Group
            className="text-sm flex items-end"
            orientation="vertical"
            label="Padding"
            value={checked}
            onChange={setChecked}
            defaultValue="8"
            size="xs"
          >
            <Radio value="8">8</Radio>
            <Radio value="16">16</Radio>
            <Radio value="24">24</Radio>
            <Radio value="32">32</Radio>
          </Radio.Group>
            </Popover.Content>
          </Popover>

          <Navbar.Item className="p-0 w-fit">
            <Button
              onPress={handleClick}
              className="bg-purple-600 p-0.5 px-4"
              shadow
              color="secondary"
              auto
            >
              Export
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>

      <div
        className={`border-black flex flex-col items-center p-10 justify-center rounded-lg p-${checked} w-min gradient-cover-one max-w-full  overflow-auto`}
        id="capture"
        ref={exportContent}
      >
        <div className="w-full h-8 rounded-t-lg navtitle flex items-center px-2 relative">
          <div className="buttons-title flex items-center gap-1 ">
          <div className="h-2 w-2 bg-gray-200 opacity-20  rounded-full"></div>
          <div className="h-2 w-2 bg-gray-200 opacity-20   rounded-full"></div>
          <div className="h-2 w-2 bg-gray-200 opacity-20   rounded-full"></div>
          </div>
          <p contentEditable spellCheck="false" className="text-white opacity-40 text-xs text-center outline-none absolute w-full jetbrain">Untitled.code</p>
        </div>
        <CodeMirror
          className={`editor-box outline-none select-none w-max  max-h-fit text-xs max-w-full  `}
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
