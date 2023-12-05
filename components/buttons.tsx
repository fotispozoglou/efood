"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import clsx from 'clsx';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useFormStatus } from "react-dom";

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
  loading ?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...rest }: ButtonProps) {

  const { pending } = useFormStatus();

  return (
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
        !pending && children
      }
    </button>
  );
}