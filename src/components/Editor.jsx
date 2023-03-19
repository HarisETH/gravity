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
import {
  MixerHorizontalIcon,
  Cross2Icon,
  ArrowDownIcon,
} from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";

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

import * as Label from "@radix-ui/react-label";
import classnames from "classnames";
import DropDown from "./DropDown";
import * as Toolbar from "@radix-ui/react-toolbar";
///

import * as AspectRatio from "@radix-ui/react-aspect-ratio";
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
  const [value, setValuee] = React.useState("Github Dark");
  const [namer, setNamer] = useState("Github Dark");
  // const [themer, setThemer] = useState(githubDark);
  // Dropdown Array
  const [checked, setChecked] = useState("4");
  const [bgGradientTheme, setbgGradientTheme] = useState("modern");

  const [asp, setAsp] = useState("");

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

  const toggleGroupItemClasse =
    "hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[30px] outline-none border-none  w-[30px] items-center justify-center bg-white text-xs text-lexend leading-4 first:rounded-l last:rounded-r focus:z-10  border-none flex focus:border-none  focus:outline-none";

  //padding function

  //html2image function
  const handleClick = () => {
    console.log(exportComponent);
    htmlToImage
      .toPng(exportComponent, { quality: 1, skipAutoScale: true })
      .then(function (dataUrl) {
        download(dataUrl, "gravity.png");
      });
  };

  const [navLight, setNavLight] = useState("");
  const [navbtns, setnavbtns] = useState("bg-gray-200");
  //Line numbers and getting constant by class names
  useEffect(() => {
    const editorExportClass = document.getElementsByClassName("cm-editor");
    let exportComp = document.getElementById("capture");
    setExComp(exportComp);

    if (editorTheme === githubLight) {
      // document.getElementsByClassName("cm-editor").style.background = "#000";
      console.log("ghlight");
      setNavLight("light");
      setnavbtns("bg-black");
    } else {
      setNavLight("");
      setnavbtns("bg-gray-200");
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
    <section className="w-full px-4 flex h-full flex-col gap-4 justify-center items-center min-h-max glassmorphism">
      <div className="py-10 flex flex-col items-center  text-gray-800 gap-2 justify-self-start ">
        <h1 className="text-6xl font-lexend font-bold tracking-wide text-gradient">
          Gravity
        </h1>
        <p className=" opacity-60 font-lexend tracking-normal">
          A light-weight Code formatter just for YOU
        </p>
      </div>

      <Toolbar.Root className="w-5/6 sticky top-10 z-50 justify-between items-center font-lexend bg-slate-50  border border-gray-200 gap-4 dark:bg-gray-800 dark:border-gray-700 blur-md bg-opacity-60 justify-self-cente  rounded-md flex py-3 px-6 mb-16">
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
            <Select.Root
              defaultValue="Github_Dark"
              
              value={value}
              onValueChange={(value) => {
                setValuee(value.name);
                setEditorTheme(value.mainword);
                console.log(value);
              }}
            >
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
                    <Select.Label className="SelectLabel">
                      Themes
                    </Select.Label>
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
                      <Select.Item
                        value={item}
                        className="SelectItem text-xl"
                        onClick={() => {
                          console.log(item);
                        }}
                      >
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
            className="inline-flex bg-mauve6 rounded font-lexend  space-x-px"
            type="single"
            defaultValue="p-8"
            aria-label="Text alignment"
            // value={values}
            onValueChange={(values) => {
              if (values) setValues(values);
            }}
            onChange={setChecked}
          >
            <ToggleGroup.Item
              className={`${toggleGroupItemClasses} text-[11px] `}
              value="p-4"
              aria-label="Left aligned"
            >
              4
            </ToggleGroup.Item>

            <ToggleGroup.Item
              className={`${toggleGroupItemClasses} text-[11px]  `}
              value="p-8"
              aria-label="Center aligned"
            >
              8
            </ToggleGroup.Item>

            <ToggleGroup.Item
              className={`${toggleGroupItemClasses} text-[11px]  `}
              value="p-12"
              aria-label="Right aligned"
            >
              12
            </ToggleGroup.Item>

            <ToggleGroup.Item
              className={`${toggleGroupItemClasses} text-[11px] `}
              value="p-16"
              aria-label="Right aligned"
            >
              16
            </ToggleGroup.Item>
          </ToggleGroup.Root>

          <SelectDemo></SelectDemo>

          <div className="flex items-center">
            <button
              onClick={handleClick}
              type="button"
              class="text-white cursor-pointer flex items-center gap-2  text-md bg-blue-700 border-none hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg  px-3 py-2 tracking-wide dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {" "}
              Export{" "}
            </button>

            <Popover.Root>
              <Popover.Trigger asChild>
                <button
                  className="rounded-md py-3 px-1 inline-flex items-center justify-center bg-transparent text-violet11  hover:bg-stone-100 hover:bg-opacity-10 border-none cursor-default outline-none"
                  aria-label="Update dimensions"
                >
                  <ChevronDownIcon />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="rounded p-3 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]  will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade border-none"
                  sideOffset={5}
                >
                  <div className="flex flex-col  items-center gap-2.5 font-lexend">
                    <p className="text-mauve12 text-[15px] leading-[19px] font-lexend font-medium  px-2 py-2 self-start">
                      Customs
                    </p>
                    <fieldset className="flex gap-5 items-center border-none">
                      <label className="text-[13px] text-violet11 w-[75px]">
                        Sizing
                      </label>
                      <ToggleGroup.Root
                        className="inline-flex bg-mauve6 rounded shadow-[0_2px_10px] shadow-blackA7 space-x-px"
                        type="single"
                        defaultValue="aspect-[]"
                        value={asp}
                        onValueChange={setAsp}
                        aria-label="Text alignment"
                      >
                        <ToggleGroup.Item
                          className={toggleGroupItemClasse}
                          value="aspect-[9/16]"
                          aria-label="Left aligned"
                        >
                          9:16
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                          className={toggleGroupItemClasse}
                          value="aspect-[1]"
                          aria-label="Center aligned"
                        >
                          1:1
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                          className={toggleGroupItemClasse}
                          value="aspect-[16/9]"
                          aria-label="Right aligned"
                        >
                          16:9
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                          className={toggleGroupItemClasse}
                          value="aspect-[]"
                          aria-label="Right aligned"
                        >
                          auto
                        </ToggleGroup.Item>
                      </ToggleGroup.Root>
                    </fieldset>

                    
                  </div>
                  <Popover.Close
                    className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
                    aria-label="Close"
                  >
                    <Cross2Icon />
                  </Popover.Close>
                  <Popover.Arrow className="fill-white" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      </Toolbar.Root>

      <div className="div flex justify-center items-center w-full justify-self-end self-end pb-10">
        <div
          className={`border-black  ${asp}  items-center flex flex-col justify-self-end self-end p-10 justify-center rounded-lg ${values}  h-full  font-fira  w-min gradient-${bgGradientTheme} max-w-lg lg:max-w-2xl  overflow-auto`}
          id="capture"
          ref={exportContent}
        >
          <div
            className={`w-full h-8  rounded-t-lg navtitle  flex items-center px-2 relative ${navLight}`}
          >
            <div className="buttons-title flex items-center gap-1 ">
              <div
                className={`h-2.5 w-2.5 ${navbtns} opacity-20  rounded-full`}
              ></div>
              <div
                className={`h-2.5 w-2.5 ${navbtns} opacity-20  rounded-full`}
              ></div>
              <div
                className={`h-2.5 w-2.5 ${navbtns} opacity-20  rounded-full`}
              ></div>
            </div>
            {/* <p contentEditable spellCheck="false" className="text-white opacity-40 text-xs text-center outline-none absolute w-full jetbrain">Untitled.code</p> */}
          </div>
          <CodeMirror
            className={`editor-box outline-none select-none w-max  max-h-fit text-xs max-w-full  `}
            value={`const Gravity = 'gravity.io.day'
Meet Gravity at $${``}{Gravity}
        

Built with 💗 and ⚡ by @hariskumar_eth`}
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
            theme={editorTheme}
            lineWrapping={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Editor;
