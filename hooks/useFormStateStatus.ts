import { BaseFormState } from "@/types/actions";
import { useFormState } from "react-dom";

export type UseFormStateStatusParams< FormStateType extends BaseFormState< unknown > > = {
  action : ( prevState: FormStateType, formData: FormData ) => FormStateType | Promise<FormStateType>;
  initialState : Awaited<FormStateType>;
};

export default function useFormStateStatus< FormStateType extends BaseFormState< unknown > >({
  action,
  initialState
} : UseFormStateStatusParams< FormStateType >) {

  const [ state, dispatch ] = useFormState< FormStateType, FormData >( action, initialState );

  

  return {
    state,
    dispatch
  };

};