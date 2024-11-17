import { useCandidateContext } from '../context/CandidateContext';
import CandidateCard from '../components/Candidate/CandidateCard';
import ConfirmationModal from '../components/Modal/ConfirmationModal';
import { useState } from 'react';

const SavedCandidates = () => {
  const { savedCandidates, removeCandidate } = useCandidateContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateToRemove, setCandidateToRemove] = useState<number | null>(null);

  const handleRemoveClick = (candidateId: number) => {
    setCandidateToRemove(candidateId);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (candidateToRemove) {
      removeCandidate(candidateToRemove);
      setCandidateToRemove(null);
    }
  };

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
            onAction={() => handleRemoveClick(candidate.id)}
            actionLabel="Remove"
            actionStyle="bg-red-500 hover:bg-red-600"
          />
        ))}
      </div>
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Candidate"
        message="Are you sure you want to remove this candidate?"
      />
    </div>
  );
};

export default SavedCandidates;
