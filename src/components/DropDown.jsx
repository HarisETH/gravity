import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
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
const countriesArray = {
  ghdark: "Github Dark",
  aura: "Aura",
  // "Spain",
  // "Hungary",
  // "Netherlands",
  // "Italy",
  // "Germany",
  // "Japan",
  // "Denmark"
};

const menuItems = [
  { key: "githubDark", name: "Github Dark", mainword: githubDark },
  { key: "dracula", name: "dracula", mainword: dracula },
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

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const countries = { france: "🇫🇷", "united-kingdom": "🇬🇧", spain: "🇪🇸" };

const DropDown = () => {
  const [selectDemoValue, setSelectDemoValue] = useState("");
  const [value, setValuee] = React.useState('Github Dark');
  const [themer, setThemer] = useState('githubDark');

  const handleOption = (valuee) => {
    setValuee(valuee);
  };
  return (
    <div>
      <Select.Root defaultValue="Github_Dark"   value={value} onValueChange={(value) => {
        setValuee(value)
        setThemer(value)
        console.log(value);
      }}>
        <Select.Trigger className="SelectTrigger" id="sampleSelectMenu">
          <Select.Value className="text-xs" aria-label={selectDemoValue}>
            {themer}
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
                <Select.Item value={item.key}  className="SelectItem text-xl"
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
  );
};

export default DropDown;
