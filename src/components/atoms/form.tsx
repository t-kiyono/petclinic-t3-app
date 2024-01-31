import type { DetailedHTMLProps, InputHTMLAttributes, LabelHTMLAttributes, PropsWithChildren, SelectHTMLAttributes } from "react";
import { forwardRef } from "react";

export function FormGroup({ children, reverse }: PropsWithChildren<{reverse?: boolean}>) {
  return (
    <div className={`flex mb-4 h-9 ${reverse ? "flex-row-reverse" : ""}`}>
      {children}
    </div>
  );
}

type FormLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
export function FormLabel({ children, ...rest }: FormLabelProps) {
  return (
    <div className="w-1/6 h-full font-bold px-4 text-right">
      <label className="leading-9 align-middle" {...rest}>{children}</label>
    </div>
  );
}

export function FormItem({ children }: PropsWithChildren) {
  return (
    <div className="w-10/12 px-4">
      {children}
    </div>
  );
}

type FormInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { ...rest } = props;
  return (
    <input ref={ref} className="inline-block w-full py-1.5 px-3 text-sm text-gray bg-white border-solid border border-gray-light" {...rest} />
  );
});
FormInput.displayName = "FormInput";

type FormSelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <select ref={ref} className="h-9 border-solid border border-gray-light" {...rest}>
      {children}
    </select>
  );
});
FormSelect.displayName = "FormSelect";

export function FormErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="text-red-600">
      {children}
    </div>
  );
}
