import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
	className?: string;
	isLoading?: boolean;
}
const Button: FC<ButtonProps> = ({
	children,
	className,
	isLoading,
	...rest
}) => {
	return (
		<button
			{...rest}
			disabled={isLoading}
			className={`flex gap-4 place-items-center place-content-center border-gray-600 border-2 p-2 px-8 rounded-lg min-w-36 ${
				!isLoading && 'hover:border-b-4 hover:border-white'
			} transition-all ${className}`}>
			{isLoading && (
				<div className='w-4 h-4 animate-spin border-2 border-r-0 rounded-full'></div>
			)}
			{children}
		</button>
	);
};
export default Button;
