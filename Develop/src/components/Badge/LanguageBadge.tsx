interface LanguageBadgeProps {
  language: string;
  color?: string;
}

const LanguageBadge = ({ language, color = "bg-blue-100" }: LanguageBadgeProps) => {
  return (
    <span className={`${color} text-blue-800 text-xs px-2 py-1 rounded-full`}>
      {language}
    </span>
  );
};

export default LanguageBadge; 