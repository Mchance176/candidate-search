interface CandidateStatsProps {
  repos: number;
  followers: number;
  contributions?: number;
}

const CandidateStats = ({ repos, followers, contributions }: CandidateStatsProps) => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <div className="text-center">
        <span className="block text-2xl font-bold text-gray-700">{repos}</span>
        <span className="text-sm text-gray-500">Repositories</span>
      </div>
      <div className="text-center">
        <span className="block text-2xl font-bold text-gray-700">{followers}</span>
        <span className="text-sm text-gray-500">Followers</span>
      </div>
      {contributions && (
        <div className="text-center">
          <span className="block text-2xl font-bold text-gray-700">{contributions}</span>
          <span className="text-sm text-gray-500">Contributions</span>
        </div>
      )}
    </div>
  );
};

export default CandidateStats; 