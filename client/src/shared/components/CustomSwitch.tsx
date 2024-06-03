import { Switch as BaseSwitch, SwitchProps } from '@mui/base/Switch';
import React from 'react';
import clsx from 'clsx';

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>((props, ref) => {
  return (
    <BaseSwitch
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `group relative inline-block w-10 h-6 m-2.5 ${
                ownerState.disabled
                  ? 'cursor-not-allowed opacity-40'
                  : 'cursor-pointer'
              }`,
              resolvedSlotProps?.className,
            ),
          };
        },
        input: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'cursor-pointer absolute w-full h-full top-0 left-0 opacity-0 z-10 border-none',
              resolvedSlotProps?.className,
            ),
          };
        },
        track: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.track,
            ownerState,
          );

          return {
            ...resolvedSlotProps,
            className: clsx(
              `absolute block w-full h-full transition rounded-full border border-solid outline-none border-slate-400 dark:border-gray-700 group-[.base--focusVisible]:shadow-outline-switch
              ${
                ownerState.checked
                  ? 'bg-green-500'
                  : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-500 dark:hover:bg-slate-800'
              } `,
              resolvedSlotProps?.className,
            ),
          };
        },
        thumb: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.thumb,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `block w-4 cursor-pointer h-4 top-1 rounded-2xl border border-solid outline-none border-slate-400 dark:border-gray-700 transition shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:shadow-[0_1px_2px_rgb(0_0_0_/_0.25)] ${
                ownerState.checked
                  ? 'left-[18px] bg-white shadow-[0_0_0_rgb(0_0_0_/_0.3)]'
                  : 'left-[4px] bg-white'
              }  relative transition-all`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

export default Switch;
