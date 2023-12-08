"use client";

import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useState } from "react";

export type NavGroupProps = {
  title : string;
  children : React.ReactNode;
};

export default function NavGroup({ title, children } : NavGroupProps) {

  const [ expanded, setExpanded ] = useState( false );

  function handleToggleExpanded() {

    setExpanded( expanded => !expanded );

  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2 hover:cursor-pointer" onClick={ handleToggleExpanded }>
        <span>{ title }</span>
        <FontAwesomeIcon
          icon={ faCaretRight }
          className={`!w-4 !h-4 my-auto ml-auto transition-transform ${ expanded ? 'rotate-90' : '' }`}
        />
      </div>
      <div className={clsx('flex flex-col h-0 overflow-hidden', { '!h-max': expanded })}>
        { children }
      </div>
    </div>
  );

};