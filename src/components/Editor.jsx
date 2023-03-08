import React, { useRef, useState, useEffect, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import * as Icon from "react-feather";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { EditorView } from "codemirror";
// Design System Components
import SelectDemo from "./SelectRadix";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
// import { Checkbox } from "@nextui-org/react";
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

import * as Label from '@radix-ui/react-label';
import classnames from "classnames";
import DropDown from "./DropDown";
import * as Toolbar from "@radix-ui/react-toolbar";
///

import * as Checkbox from "@radix-ui/react-checkbox";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagicWandIcon,
  PaddingIcon,
} from "@radix-ui/react-icons";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import * as Select from "@radix-ui/react-select";

//languages
import { javascript } from "@codemirror/lang-javascript";

const Editor = () => {
  const exportContent = useRef();
  const [lineStatus, setLineStatus] = useState(false);
  const [exportComponent, setExComp] = useState();

  const [editorTheme, setEditorTheme] = useState(githubDark);
  const [editorClass, setEditorClass] = useState();
  const [values, setValues] = React.useState("center");
  const [selected, setSelected] = useState(new Set(["Github Dark"]));

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const [value, setValuee] = React.useState('Github Dark');
  const [namer,setNamer] = useState('Github Dark')
  // const [themer, setThemer] = useState(githubDark);
  // Dropdown Array
  const [checked, setChecked] = useState("4");
  const [bgGradientTheme, setbgGradientTheme] = useState("modern");



  const menuItems = [
    { key: "githubDark", name: "Github Dark", mainword: githubDark },
    { key: "dracula", name: "Dracula", mainword: dracula },
    { key: "tokyoNight", name: "Tokyo Night", mainword: tokyoNight },
    { key: "abcdef", name: "ABCDEF", mainword: abcdef },
    { key: "aura", name: "Aura", mainword: aura },
    { key: "androidstudio", name: "Android Studio", mainword: androidstudio },
    { key: "sublime", name: "Sublime", mainword: sublime },
    { key: "duotone", name: "Duotone", mainword: duotone },
    { key: "nord", name: "Nord", mainword: nord },
    { key: "vscodeDark", name: "VS Code Dark", mainword: vscodeDark },
    { key: "githubLight", name: "Github Light", mainword: githubLight },
  ];
  const toggleGroupItemClasses =
    "hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[30px] outline-none border-none  w-[30px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10  border-none flex focus:border-none  focus:outline-none";


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

  const [navLight, setNavLight] = useState('');
  const [navbtns, setnavbtns] = useState('bg-gray-200')
  //Line numbers and getting constant by class names
  useEffect(() => {
    const editorExportClass = document.getElementsByClassName("cm-editor");
    let exportComp = document.getElementById("capture");
    setExComp(exportComp);

    if (editorTheme === githubLight) {
      // document.getElementsByClassName("cm-editor").style.background = "#000";
      console.log('ghlight');
      setNavLight('light')
      setnavbtns('bg-black')
    }else{
      setNavLight('')
      setnavbtns('bg-gray-200')

    }

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
  }, [lineStatus, editorTheme, []]);

  //theme dropdown db

  return (
    <section className="w-full px-4 flex h-full flex-col gap-4 justify-center items-center py-20">
      

      <Toolbar.Root className="w-5/6 sticky top-10 z-50 justify-between items-center font-lexend bg-slate-50  border border-gray-200 gap-4 dark:bg-gray-800 dark:border-gray-700 blur-md bg-opacity-60  rounded-md flex py-3 px-6 ">
        <div className="flex gap-6 items-center">
        <div className="c1 flex items-center justify-center gap-1">
          <Checkbox.Root className="h-4 w-4 flex items-center justify-center rounded border bg-white">
            <Checkbox.Indicator className="flex justify-center items-center">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="text-xs" htmlFor="c1">
            Lines
          </label>
        </div>

        

        <div className="div">
        <Select.Root defaultValue="Github_Dark"   value={value} onValueChange={(value) => {
        setValuee(value.name)
        setEditorTheme(value.mainword)
        console.log(value);
      }}>
        <Select.Trigger className="SelectTrigger" id="sampleSelectMenu">
          <Select.Value className="text-xs" aria-label={value.name}>
            {value}
          </Select.Value>
          <Select.Icon>
            <ChevronDownIcon className="ChevronIcon" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content
          position="popper"
          side="bottom"
          className="SelectContent mt-2"
        >
          <Select.ScrollUpButton className="SelectScrollButtonStyles">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <Select.Label className="SelectLabel">Countries</Select.Label>
              {/* {countriesArray.map((address) => (
                      <Select.Item value={address} className="SelectItem text-xl">
                        <Select.ItemIndicator className="SelectItemIndicator">
                          <CheckIcon />
                        </Select.ItemIndicator>
                        <Select.ItemText>{address}</Select.ItemText>
                      </Select.Item>
                    ))} */}
              {/* <Select.Item  className="SelectItem text-xl" value="france">
                <Select.ItemText>Github Dark</Select.ItemText>
                <Select.ItemIndicator>…</Select.ItemIndicator>
              </Select.Item>


              <Select.Item  className="SelectItem text-xl" value="united-kingdom">
                <Select.ItemText>Aura</Select.ItemText>
                <Select.ItemIndicator>…</Select.ItemIndicator>
              </Select.Item>


              <Select.Item  className="SelectItem text-xl" value="spain">
                <Select.ItemText>ABCDEF</Select.ItemText>
                <Select.ItemIndicator>…</Select.ItemIndicator>
              </Select.Item> */}

              {menuItems.map((item) => (
                <Select.Item value={item}   className="SelectItem text-xl"
                onClick={() => {
                  console.log(item);
                }} >
               
               
                
                 {item.name} 
                </Select.Item>
              ))}


            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButtonStyles">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
        </div>
        </div>

        

        <div className="flex gap-6 items-center">
        <ToggleGroup.Root
          className="inline-flex bg-mauve6 rounded  space-x-px"
          type="single"
          defaultValue="8"
          aria-label="Text alignment"
          value={values}
          onValueChange={(values) => {
            if (values) setValues(values);
          }}
          onChange={setChecked}

        >
          <ToggleGroup.Item
            className={`${toggleGroupItemClasses} text-[11px] `}
            value="4"
            aria-label="Left aligned"
          >
            4
          </ToggleGroup.Item>

          <ToggleGroup.Item
            className={`${toggleGroupItemClasses} text-[11px]  `}
            value="8"
            aria-label="Center aligned"
          >
            8
          </ToggleGroup.Item>

          <ToggleGroup.Item
            className={`${toggleGroupItemClasses} text-[11px]  `}
            value="12"
            aria-label="Right aligned"
          >
            12
          </ToggleGroup.Item>

          <ToggleGroup.Item
            className={`${toggleGroupItemClasses} text-[11px] `}
            value="16"
            aria-label="Right aligned"
          >
            16
          </ToggleGroup.Item>
        </ToggleGroup.Root>

        

        <SelectDemo></SelectDemo>


        <button type="button" class="text-white cursor-pointer flex items-center gap-2  text-md bg-blue-700 border-none hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg  px-3 py-2 tracking-wide dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">  Export <MagicWandIcon /> </button>

        </div>
      </Toolbar.Root>

      <div
        className={`border-black self-center justify-self-center flex flex-col mt-24 items-center p-10 justify-center rounded-lg p-${values}   overflow-hidden font-fira  w-min gradient-${bgGradientTheme} max-w-full lg:max-w-4xl  overflow-auto`}
        id="capture"
        ref={exportContent}
      >
        <div className={`w-full h-8 rounded-t-lg navtitle  flex items-center px-2 relative ${navLight}`}>
          <div className="buttons-title flex items-center gap-1 ">
            <div className={`h-2.5 w-2.5 ${navbtns} opacity-20  rounded-full`}></div>
            <div className={`h-2.5 w-2.5 ${navbtns} opacity-20  rounded-full`}></div>
            <div className={`h-2.5 w-2.5 ${navbtns} opacity-20  rounded-full`}></div>
          </div>
          {/* <p contentEditable spellCheck="false" className="text-white opacity-40 text-xs text-center outline-none absolute w-full jetbrain">Untitled.code</p> */}
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
