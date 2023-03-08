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
  const [checked, setChecked] = useState("8");
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
                  <Button
                    onPress={() => {
                      setEditorTheme(item.mainword);
                      console.log(item.mainword);
                    }}
                    light
                    color="secondary"
                    auto
                  >
                    {item.name}
                  </Button>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
            
          </Dropdown>

          {/*  */}
        </Navbar.Content>

        <Navbar.Content>
          <Popover placement="bottom-right">
            <Popover.Trigger>
              <Button auto flat color="secondary">
                <Icon.Settings></Icon.Settings>
              </Button>
            </Popover.Trigger>

            <Popover.Content className="px-4 pr-8 flex justify-end items-end py-4 gap-2 w-max">
              <Radio.Group
                className="text-sm flex items-start"
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

              <hr className="my-2" />
              <Radio.Group
                className="text-sm flex  items-start"
                orientation="vertical"
                label="Theme"
                value={bgGradientTheme}
                onChange={setbgGradientTheme}
                defaultValue="aqua"
                size="xs"
              >
                <Radio value="aqua">Aqua</Radio>
                <Radio value="modern">Modern</Radio>
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

      <Toolbar.Root className="w-3/4 justify-between items-center font-lexend bg-slate-50  border border-gray-200 gap-4 dark:bg-gray-800 dark:border-gray-700 blur-md bg-opacity-60  rounded-md flex p-3 ">
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
          defaultValue="center"
          aria-label="Text alignment"
          value={values}
          onValueChange={(values) => {
            if (values) setValues(values);
          }}
        >
          <ToggleGroup.Item
            className={`${toggleGroupItemClasses} text-[11px] `}
            value="left"
            aria-label="Left aligned"
          >
            4
          </ToggleGroup.Item>

          <ToggleGroup.Item
            className={`${toggleGroupItemClasses} text-[11px]  `}
            value="center"
            aria-label="Center aligned"
          >
            8
          </ToggleGroup.Item>

          <ToggleGroup.Item
            className={`${toggleGroupItemClasses} text-[11px]  `}
            value="right"
            aria-label="Right aligned"
          >
            12
          </ToggleGroup.Item>

          <ToggleGroup.Item
            className={`${toggleGroupItemClasses} text-[11px] `}
            value="right-most"
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
        className={`border-black flex flex-col items-center p-10 justify-center rounded-lg p-${checked}  overflow-hidden font-fira  w-min gradient-${bgGradientTheme} max-w-full  overflow-auto`}
        id="capture"
        ref={exportContent}
      >
        <div className={`w-full  h-8 rounded-t-lg navtitle  flex items-center px-2 relative ${navLight}`}>
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
