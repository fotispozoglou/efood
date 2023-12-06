import { useState } from "react";
import Select, { GroupBase, SelectComponentsConfig, StylesConfig } from "react-select";
import Errors from "./errors";

export type BaseOption = {
  id : string | number;
  name : string;
}

export type SelectInputProps< OptionType extends BaseOption, Multi extends boolean > = {
  name : string;
  label : string;
  defaultValue ?: OptionType;
  errors : string[];
  components?: SelectComponentsConfig<OptionType, Multi, GroupBase<OptionType>>;
  options : OptionType[];
  isMulti: Multi;
  menuIsOpen ?: boolean;
  styles ?: StylesConfig< OptionType, Multi >;
  selectClassName ?: string;
  className ?: string;
};

export default function SelectInput< OptionType extends BaseOption, Multi extends boolean >( {
  name,
  label,
  defaultValue,
  errors,
  components,
  options,
  menuIsOpen,
  isMulti,
  styles,
  selectClassName,
  className
}: SelectInputProps< OptionType, Multi > ) {

  const [ defaultOption ] = useState( options.find( option => option.id === defaultValue?.id ) );

  return (
    <div className={`flex flex-col w-full ${ className }`}>
      <label htmlFor={ name } className="text-sm font-bold pb-1">{ label }</label>
      <Select
        name={ name }
        instanceId={ name }
        options={ options }
        isMulti={ isMulti }
        defaultValue={ defaultOption || options[0] }
        getOptionLabel={item => item.name}
        getOptionValue={item => String(item.id)}
        components={ components }
        menuIsOpen={ menuIsOpen ? menuIsOpen : undefined }
        styles={ styles }
        className={`${ selectClassName }`}
      />
      <Errors errors={ errors } />
    </div>
  );

};