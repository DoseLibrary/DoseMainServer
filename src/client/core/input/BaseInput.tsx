/**
 * Represents the props for the BaseInput component.
 */
export interface BaseInputProps {
  /**
   * The placeholder text for the input field.
   */
  placeholder?: string;

  /**
   * The current value of the input field.
   */
  value?: string;

  /**
   * The event handler for the onChange event of the input field.
   */
  onChange?: (e: string) => void;

  /**
   * The type of the input field.
   */
  type?: 'text' | 'password' | 'email' | 'number';

  /**
   * The CSS class name for the input field.
   */
  className?: string;

  /**
   * Specifies whether the input field is disabled or not.
   */
  disabled?: boolean;

  /**
   * The label text for the input field.
   */
  label?: string;

  /**
   * The description text for the input field.
   */
  description?: string;

  /**
   * Specifies whether the input field is required or not.
   */
  required?: boolean;

  /**
   * The size of the input field.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * The icon for the input field.
   */
  icon?: React.ReactNode;
}

export const BaseInput = ({
  placeholder = '',
  value = '',
  onChange = () => { },
  type = 'text',
  className = '',
  disabled = false,
  label = '',
  description = '',
  required = false,
  size = 'md',
  icon = null
}: BaseInputProps) => {
  const widths = {
    sm: 'w-40',
    md: 'w-60',
    lg: 'w-80'
  };
  const inputWidth = widths[size] || widths.md; // default to md

  return (
    <div>
      <label className="flex flex-col ">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={`
        border
        border-gray-300
        rounded-md
        p-2
        focus:border-blue-300
        focus:border-2
        focus:outline-none
        focus:ring-0
        box-border
        text-black
        ${inputWidth}
        h-10
        ${className}
      `}
        />
        {required && <span className="text-red-500 absolute -top-3 text-xl">*</span>}
        {icon && <div className="absolute inset-y-0 right-0 flex items-center pr-3">{icon}</div>}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-300">{description}</p>
    </div>
  )
}