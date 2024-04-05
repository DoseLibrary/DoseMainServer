interface CardProps {
  /**
   * The title of the card.
   */
  title: string;

  /**
   * The subtitle of the card.
   */
  subtitle?: string;

  /**
   * The content of the card.
   */
  children?: React.ReactNode;

  /**
   * The CSS class name for the card.
   */
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, subtitle, className }: CardProps) => {
  return (
    <div className={`p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white ${className}`}>
      <h2 className="text-xl font-bold dark:text-white">{title}</h2>
      <p className="text-gray-500 dark:text-gray-300">{subtitle}</p>
      <hr className="my-4" />
      {children}
    </div>
  );
};