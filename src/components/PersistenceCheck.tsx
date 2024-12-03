import { useEffect, useState } from 'react';

const PersistenceCheck = () => {
  const [isPersisted, setIsPersisted] = useState(true);

  // Check if localStorage is available
  useEffect(() => {
    const checkPersistence = () => {
      try {
        const testKey = 'test_persistence';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        setIsPersisted(true);
      } catch (e) {
        setIsPersisted(false);
      }
    };

    // Initial check
    checkPersistence();

    // Listen for storage changes
    window.addEventListener('storage', checkPersistence);
    return () => window.removeEventListener('storage', checkPersistence);
  }, []);

  // Only show warning if persistence is not available
  if (!isPersisted) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 fixed bottom-4 right-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Warning: Local storage is not available. Your saved candidates may not persist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PersistenceCheck; 