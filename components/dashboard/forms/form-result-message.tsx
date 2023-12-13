"use client";

export type FormResultMessageProps = {
  message ?: string;
};

export default function FormResultMessage({ message } : FormResultMessageProps) {

  if ( !message ) return null;

  return (
    <div className="flex">
      <span>{ message }</span>
    </div>
  );

};