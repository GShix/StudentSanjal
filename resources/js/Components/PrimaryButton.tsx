import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-[#b99a45] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#1a1a1a] focus:bg-gray-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#c7ae6a] focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
