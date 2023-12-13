import { isRedirectError } from "next/dist/client/components/redirect";

export const catchAsyncAction = ( func : any ) : ( ...params : any ) => any => {

  return ( ...params : any[] ) => {

    return func( ...params ).catch((e : any) => {

      if(isRedirectError(e)) throw e;

      if ( e instanceof Error ) {

        return { message: e.message };

      }

      console.error( e.message );
      console.error( e.stack );

      return { message: "server error" };

    });

  };

};