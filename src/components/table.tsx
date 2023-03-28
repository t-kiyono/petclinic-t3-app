import type { DetailedHTMLProps, HTMLAttributes, TableHTMLAttributes } from "react";

type TableProps = DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
export function Table({ children, ...rest }: TableProps) {
  return (
    <table className="w-full mb-5 border-collapse" {...rest}>
      {children}
    </table>
  );
}

type TheadProps = DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
export function Thead({ children, ...rest }: TheadProps) {
  return (
    <thead className="
      [&>tr>th]:bg-th
      [&>tr>th]:text-off-white
      [&>tr>th]:align-bottom
      [&>tr>th]:border-t
      [&>tr>th]:border-t-solid
      [&>tr>th]:border-t-gray-dark
      [&>tr>th]:border-b-2
      [&>tr>th]:border-b-solid
      [&>tr>th]:border-b-gray-dark
      [&>tr>th]:p-2
      [&>tr>th]:text-left
    " {...rest}>
      {children}
    </thead>
  );
}

type TbodyProps = DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
export function Tbody({ children, ...rest }: TbodyProps) {
  return (
    <tbody className="
      [&>tr:nth-of-type(odd)]:bg-white
      [&>tr>th]:border-t
      [&>tr>th]:border-t-solid
      [&>tr>th]:border-t-gray-dark
      [&>tr>th]:p-2
      [&>tr>th]:leading-normal
      [&>tr>th]:align-top
      [&>tr>th]:text-left
      [&>tr>td]:border-t
      [&>tr>td]:border-t-solid
      [&>tr>td]:border-t-gray-dark
      [&>tr>td]:p-2
      [&>tr>td]:leading-normal
      [&>tr>td]:align-top
      [&>tr>td]:text-left
    " {...rest}>
      {children}
    </tbody>
  );
}
