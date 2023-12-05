import Errors from "./errors";

export type InputProps = {
  name : string;
  type : string;
  label : string;
  placeholder : string;
  value : string;
  className ?: string;
  errors ?: string[];
};

export default function Input(props : InputProps) {

  return (
    <div className={`flex flex-col ${ props.className }`} onClick={e => e.stopPropagation()}>
      <label htmlFor={ props.name } className="text-sm font-bold">{ props.label }</label>
      <input
        type={ props.type }
        name={ props.name }
        placeholder={ props.placeholder }
        defaultValue={ props.value }
        className="p-2 bg-gray-50 rounded-md border outline-none"
      />
      <Errors errors={ props.errors || [] } />
    </div>
  );

};