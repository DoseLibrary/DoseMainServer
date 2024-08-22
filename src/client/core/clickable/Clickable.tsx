interface ClickableProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export const Clickable = ({ children, className, onClick }: ClickableProps) => {
  return (
    <div onClick={onClick} className={`
      cursor-pointer
      ${className}
    `}>
      {children}
    </div>
  );
}