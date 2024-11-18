// Define props interface for stats display
interface CandidateStatsProps {
  repos: number;           // Number of public repositories
  followers: number;       // Number of followers
  contributions?: number;  // Optional contribution count
}

const CandidateStats = ({ repos, followers, contributions }: CandidateStatsProps) => {
  return (
    // Stats container with border on top
    <div className="flex justify-around w-full mt-4 border-t pt-4">
      {/* Repository Count */}
      <div className="text-center">
        <span className="block text-2xl font-bold text-gray-700">{repos}</span>
        <span className="text-sm text-gray-500">Repositories</span>
      </div>

      {/* Follower Count */}
      <div className="text-center">
        <span className="block text-2xl font-bold text-gray-700">{followers}</span>
        <span className="text-sm text-gray-500">Followers</span>
      </div>

      {/* Contributions (only shown if available) */}
      {contributions !== undefined && (
        <div className="text-center">
          <span className="block text-2xl font-bold text-gray-700">{contributions}</span>
          <span className="text-sm text-gray-500">Contributions</span>
        </div>
      )}
    </div>
  );
};

export default CandidateStats;