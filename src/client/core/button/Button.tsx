import type React from 'react';


export interface ButtonProps {
  /**
   * What background color to use
  */
  type?: 'primary' | 'secondary' | 'warning' | 'remove' | 'success';
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
  * Button contents
  */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Optional class name
   */
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  type = 'primary',
  label,
  className,
  ...props
}: ButtonProps) => {

  const sizeClasses = {
    small: 'text-sm px-4 py-2',
    medium: 'text-base px-6 py-3',
    large: 'text-xl px-8 py-4',
  };
  const btnSize = sizeClasses[size];

  const typeClasses = {
    primary: 'bg-blue-500 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900',
    secondary: 'bg-gray-500 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-800',
    warning: 'bg-yellow-500 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-800',
    remove: 'bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800',
    success: 'bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-800',
  };
  const color = typeClasses[type];

  return (
    <button
      type="button"
      className={`
        ${color}
        ${btnSize}
        text-white 
        rounded-lg
        ${className}
      `}
      {...props}
    >
      {label}
    </button>
  );
};
