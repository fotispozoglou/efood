"use client";

import React from "react";

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number,
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce);

    return () => clearTimeout(timeout)
  }, [value]);

  return (
    <input {...props} value={value} placeholder="Search" onChange={e => setValue(e.target.value)} />
  );

};

// https://codesandbox.io/p/devbox/tanstack-table-example-filters-nrosmi?file=%2Fsrc%2Fmain.tsx%3A399%2C35