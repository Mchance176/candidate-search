interface CandidateCardProps {
  candidate: {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    location?: string;
    email?: string;
    company?: string;
    bio?: string;
  };
  onAction: (candidate: any) => void;
  actionLabel: string;
  actionStyle?: string;
}

const CandidateCard = ({ 
  candidate, 
  onAction, 
  actionLabel,
  actionStyle = "bg-green-500 hover:bg-green-600"
}: CandidateCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col items-center">
        <img 
          src={candidate.avatar_url} 
          alt={candidate.login}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-xl font-semibold">{candidate.name || candidate.login}</h3>
        {candidate.location && (
          <p className="text-gray-600 mt-1">
            <span className="mr-2">📍</span>
            {candidate.location}
          </p>
        )}
        {candidate.email && (
          <p className="text-gray-600 mt-1">
            <span className="mr-2">📧</span>
            {candidate.email}
          </p>
        )}
        {candidate.company && (
          <p className="text-gray-600 mt-1">
            <span className="mr-2">🏢</span>
            {candidate.company}
          </p>
        )}
        {candidate.bio && (
          <p className="text-gray-700 mt-3 text-center line-clamp-2">{candidate.bio}</p>
        )}
        <a 
          href={candidate.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 mt-2"
        >
          View GitHub Profile
        </a>
        <button
          onClick={() => onAction(candidate)}
          className={`${actionStyle} text-white px-6 py-2 rounded-full mt-4 transition-colors duration-200`}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default CandidateCard; 