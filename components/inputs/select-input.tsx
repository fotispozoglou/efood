import { useState } from "react";
import Select, { GroupBase, SelectComponentsConfig, StylesConfig } from "react-select";
import Errors from "./errors";

export type BaseOption = {
  id : string | number;
  name : string;
};

type TrueT = true;
type FalseT = false;

export type SelectInputProps< OptionType extends BaseOption, Multi extends TrueT | FalseT > =
{
  isMulti : Multi;
  defaultValue ?: any;
  components ?: SelectComponentsConfig<OptionType, Multi, GroupBase<OptionType>>;
  styles ?: StylesConfig< OptionType, Multi >;
  name : string;
  label : string;
  errors : string[];
  options : OptionType[];
  menuIsOpen ?: boolean;
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

  return (
    <div className={`flex flex-col w-full ${ className }`}>
      <label htmlFor={ name } className="text-sm font-bold pb-1">{ label }</label>
      <Select
        name={ name }
        instanceId={ name }
        options={ options }
        isMulti={ isMulti }
        defaultValue={ defaultValue }
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