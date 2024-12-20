interface BadgeProps {
    children: React.ReactNode;
    color?: 'green' | 'blue' | 'red' | 'gray';
  }
  
  const Badge = ({ children, color = 'gray' }: BadgeProps) => {
    const colorClasses = {
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800',
      red: 'bg-red-100 text-red-800',
      gray: 'bg-gray-100 text-gray-800'
    };
  
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
        {children}
      </span>
    );
  };
  
  export default Badge;