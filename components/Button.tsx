import {
	ButtonHTMLAttributes,
	forwardRef,
	ForwardRefRenderFunction,
} from "react";
import { LucideIcon } from "lucide-react";

import { cnMerge } from "@/utils/cnMerge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	LeftIcon?: LucideIcon;
	RightIcon?: LucideIcon;
	iconClassName?: string;
}

const BaseButton: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
	{ children, className, iconClassName, LeftIcon, RightIcon, ...rest },
	ref
) => {
	return (
		<button
			className={cnMerge(
				`duration-250 flex items-center justify-center gap-x-1 rounded-lg border border-primary bg-primary p-2 font-medium text-white outline-none transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-200 enabled:hover:bg-primary/90 disabled:opacity-60`,
				className
			)}
			ref={ref}
			{...rest}
		>
			{LeftIcon ? (
				<LeftIcon className={cnMerge("h-4 w-4", iconClassName)} />
			) : null}
			{children}
			{RightIcon ? (
				<RightIcon className={cnMerge("h-4 w-4", iconClassName)} />
			) : null}
		</button>
	);
};

export const Button = forwardRef(BaseButton);
