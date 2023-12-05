export type ErrorsProps = {
  errors ?: string[];
};

export default function Errors( props : ErrorsProps ) {

  return (
      <>
      {
        ( props.errors && props.errors.length > 0 ) ? (
          <p className="text-red-500 text-xs italic mt-2">{props.errors.join(', ')}</p>
        ) : null
      }
      </>
  );

}