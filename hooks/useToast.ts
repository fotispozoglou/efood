import { BaseFormState, FormStateStatus } from "@/types/actions";
import { useEffect } from "react";
import { toast } from "react-toastify";

export type UseToastParams< FormStateType extends BaseFormState< unknown > > = {
  state : FormStateType;
};

function useToast< FormStateType extends BaseFormState< unknown > >({ state } : UseToastParams< FormStateType >) {

  useEffect(() => {

    if ( state.status != FormStateStatus.UNINITIALIZED ) {

      if ( state.status === FormStateStatus.SUCCESS ) {
        
        toast.success( state.message );

      }

      if ( state.status === FormStateStatus.ERROR ) {
        
        toast.error( state.message );

      }

    }

  }, [ state ]);

};

export default useToast;