import clsx from 'clsx';
import React, { ReactNode } from 'react';

type Props = {
  className?: string;
    disabled?: boolean;
    active?: boolean;
    children?: ReactNode;
    onClick?: () => void;
}

export const Button = ({
  className, disabled = false, children, onClick, active,
}: Props) => {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };
  return (
    <div
      className={clsx('border-4 py-2 px-4 border-black bg-gray-200', {
        'hover:bg-gray-300 active:bg-gray-400': !disabled,
        'bg-gray-400 opacity-40': disabled && !active,
        'bg-blue-500': active,
        'cursor-pointer': !disabled,
      }, className)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
