import { GitHubUser } from "../../interfaces/github.types";
import Badge from "../Badge/Badge";

interface CandidateCardProps {
  candidate: GitHubUser;
  onAction: (candidate: GitHubUser) => void;
  actionLabel: string;
  actionStyle: string;
  onViewDetails?: () => void;
}

const CandidateCard = ({
  candidate,
  onAction,
  actionLabel,
  actionStyle,
  onViewDetails,
}: CandidateCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <img
          src={candidate.avatar_url}
          alt={`${candidate.login}'s avatar`}
          className="w-16 h-16 rounded-full"
        />

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                {candidate.name || candidate.login}
              </h3>
              <p className="text-gray-600">@{candidate.login}</p>
            </div>
            {candidate.hireable && (
              <Badge color="green">Available for hire</Badge>
            )}
          </div>
          {candidate.company != null && (
            <p className="text-gray-600">
              <span className="font-medium">Company:</span> {candidate.company}
            </p>
          )}

          {/* Location */}
          {candidate.location && (
            <div className="mt-1 flex items-center text-gray-600">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{candidate.location}</span>
            </div>
          )}

          {/* Stats */}
          <div className="mt-3 flex space-x-4 text-sm text-gray-500">
            <span>{candidate.public_repos} repositories</span>
            <span>{candidate.followers} followers</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex space-x-3">
        <button
          onClick={() => onAction(candidate)}
          className={`flex-1 py-2 px-4 rounded-lg text-white ${actionStyle}`}
        >
          {actionLabel}
        </button>
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
