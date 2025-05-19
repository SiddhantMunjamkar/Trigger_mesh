 import { ReactNode } from "react"
 
 type SecondaryButtonProps = {
     children: ReactNode;
     onClick: () => void;
     size?: "big" | "small";
 };
 
 export const SecondaryButton = ({ children, onClick, size = "small" }: SecondaryButtonProps) => {
     return (
         <div
             onClick={onClick}
             className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-7 pt-2" : "px-18 py-2"} cursor-pointer hover:shadow-md border border-black text-black rounded-full `}
         >
             {children}
         </div>
     );
 };