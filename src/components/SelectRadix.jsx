import React from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

const SelectDemo = () => (
  <Select.Root defaultValue='apple'>
    <Select.Trigger
      className="inline-flex items-center border-none justify-center rounded px-[15px] text-[13px] leading-none h-6 gap-[5px] SelectTrigger text-violet11 shadow-[0_2px_10px] data-[placeholder]:text-violet9  outline-none"
      aria-label="Food"
    >
      <Select.Value className='h-4' />
      <Select.Icon className="text-violet11">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content position="popper" side="bottom"  className="overflow-hidden SelectContent mt-2  rounded-md ">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <SelectItem value="apple">
                <div className="h-4 w-4 gradient-aqua rounded-full"></div>
            </SelectItem>
            <SelectItem value="banana">
                <div className="h-4 w-4 gradient-modern rounded-full"></div>
            </SelectItem>
            <SelectItem value="blueberry">
                <div className="h-4 w-4 bg-red-400 rounded-full"></div>
            </SelectItem>
            

          </Select.Group>

        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={classnames(
        'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectDemo;