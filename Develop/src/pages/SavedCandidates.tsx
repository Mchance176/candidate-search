import { useCandidateContext } from '../context/CandidateContext';
import CandidateCard from '../components/Candidate/CandidateCard';

const SavedCandidates = () => {
  const { savedCandidates, removeCandidate } = useCandidateContext();

  if (savedCandidates.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Saved Candidates</h1>
        <p className="text-gray-600">No candidates have been saved yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Saved Candidates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedCandidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id}
            candidate={candidate}
            onAction={() => removeCandidate(candidate.id)}
            actionLabel="Remove"
            actionStyle="bg-red-500 hover:bg-red-600"
          />
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;
