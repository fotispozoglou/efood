"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import clsx from 'clsx';
import { faCheckCircle, faCircleNotch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useFormState, useFormStatus } from "react-dom";
import React from "react";
import { ActionFn, FormStateStatus } from "@/types/actions";

export type ButtonTheme = 'primary' | 'secondary';

export type IconButtonProps = {
  icon : IconProp;
  text : string;
  href : string;
  theme ?: ButtonTheme;
};

export function IconButton({ icon, text, href } : IconButtonProps) {

  return (
    <Link className="flex flex-row gap-2 p-2 px-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors w-max" href={ href }>
      <span className="uppercase text-sm font-bold">{ text }</span>
      <FontAwesomeIcon
        icon={ icon }
        className="fa-fw my-auto"
      />
    </Link>
  );

};

export type ButtonProps = {
  children: React.ReactNode;
  status : FormStateStatus;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, status, ...rest }: ButtonProps) {

  const { pending, data } = useFormStatus();

  return (
    <div className="flex flex-row">
      <button
        {...rest}
        className={clsx(
          'w-max p-2 px-4 bg-gray-100 hover:bg-gray-200 text-black rounded-md font-bold transition-colors',
          className,
        )}
        disabled={pending}
      >
        {
          pending && <FontAwesomeIcon icon={ faCircleNotch } className="animate-spin" />
        }
        {
          !pending && (
            <>
              {children}
            </>
          )
        }
      </button>
      { status === FormStateStatus.SUCCESS && <FontAwesomeIcon icon={ faCheckCircle } size="lg" className="text-green-600 ml-2 my-auto" /> }
      { status === FormStateStatus.ERROR && <FontAwesomeIcon icon={ faTimesCircle } size="lg" className="text-red-600 ml-2 my-auto" /> }
    </div>
  );

};

export type SubmitButtonProps = {
  children: React.ReactNode;
  status : FormStateStatus;
  loadingText ?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({ children, className, status, loadingText = "submitting", ...rest } : SubmitButtonProps) {

  const { pending, data } = useFormStatus();

  return (
    <div className="flex flex-row">
      <button type="submit"
        {...rest}
        className={clsx(
          'w-max p-2 px-4 bg-gray-100 hover:bg-gray-200 text-black rounded-md font-bold transition-colors',
          className,
        )}
        disabled={pending}
      >{ 
        pending && (
          <>
            <FontAwesomeIcon icon={ faCircleNotch } className="animate-spin mr-2" /> 
            { loadingText }
          </>
        )
      }
      { 
        !pending && children
      }
      </button>
      { !pending && status === FormStateStatus.SUCCESS && <FontAwesomeIcon icon={ faCheckCircle } size="lg" className="text-green-600 ml-2 my-auto" /> }
      { !pending && status === FormStateStatus.ERROR && <FontAwesomeIcon icon={ faTimesCircle } size="lg" className="text-red-600 ml-2 my-auto" /> }
    </div>
  );

};

export type ActionButtonProps = {
  action : ActionFn<any>; // ( state : any, data : FormData ) => any | Promise< any >;
  children : React.ReactNode;
  className ?: string;
  loadingText ?: string;
};

export function ActionButton({ action, children, className, loadingText } : ActionButtonProps) {

  const [ state, dispatch ] = useFormState( action, { status : FormStateStatus.UNINITIALIZED } );

  return (
    <form action={ dispatch }>
      <SubmitButton status={ state.status } className={ className } loadingText={ loadingText }>{ children }</SubmitButton>
      {/* <button type="submit" className={ className }>{ children }</button> */}
    </form>
  );

};