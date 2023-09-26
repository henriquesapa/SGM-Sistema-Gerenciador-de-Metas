import { forwardRef, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import { cnMerge } from "@/utils/cnMerge";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ error, className, label, name, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-y-0.5">
        {label || error ? (
          <div className="flex gap-x-2.5">
            {label ? <label htmlFor={name}>{label}</label> : null}
            {error ? (
              <p className="my-auto text-sm text-red-600">{error.message}</p>
            ) : null}
          </div>
        ) : null}
        <textarea
          className={cnMerge(
            `min-h-[5rem] rounded-lg border border-primary-500/60 bg-zinc-50 px-2 py-1 outline-none placeholder:text-zinc-400 focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-200 disabled:opacity-60 ${className}`,
            {
              "border-red-600/95 focus:ring-red-500": error,
            }
          )}
          id={name}
          name={name}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
