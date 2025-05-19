import { ReactNode } from "react"

type PrimaryButtonProps = {
    children: ReactNode;
    onClick: () => void;
    size?: "big" | "small";
};

export const PrimaryButton = ({ children, onClick, size = "small" }: PrimaryButtonProps) => {
    return (
        <div
            onClick={onClick}
            className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-18 py-2"} cursor-pointer hover:shadow-md bg-amber-700 text-white rounded-full text-center flex justify-center flex-col`}
        >
            {children}
        </div>
    );
};