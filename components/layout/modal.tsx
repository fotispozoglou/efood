import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type ModalProps = {
  title ?: string;
  children : React.ReactNode;
  open : boolean;
  onClose : () => void;
};

export default function Modal({ title, children, open, onClose } : ModalProps) {

  if ( !open ) return null;

  return (
    <div className="fixed bg-black/80 w-screen h-screen top-0 left-0 p-5 flex">
      <div className="bg-white rounded-md w-full flex flex-col overflow-hidden flex-1">
        <div className="flex w-full bg-gray-50 shadow-gray-200 shadow-md">
          <span className="uppercase font-bold my-auto ml-2 h-max">{ title }</span>
          <FontAwesomeIcon
            icon={ faTimes }
            size="sm"
            onClick={ onClose }
            className="rounded-full p-2 w-5 h-5 cursor-pointer m-2 ml-auto"
          />
        </div>
        <div className="overflow-scroll p-4 relative">
        { children }
        </div>
      </div>
    </div>
  );

};