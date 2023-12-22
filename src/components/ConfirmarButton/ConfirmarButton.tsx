import { ReactNode } from "react";
import "./ConfirmarButton.css"


type ConfirmarButtonProps = {
    children:ReactNode;
    onClick: ()=>void;
}

const ConfirmarButton = ({children,onClick}:ConfirmarButtonProps) => {
  return (
    <button className="confirmar-button" onClick={onClick}>
        {children}
    </button>
  )
}

export default ConfirmarButton