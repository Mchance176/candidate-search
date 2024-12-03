import React, { useEffect, useState } from 'react';
import { checkRateLimit } from '../../api/API'; 

const TokenVerification: React.FC = () => {
  const [status, setStatus] = useState('Checking token...');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (!token) {
          setStatus('❌ Token missing');
          return;
        }
        
        const rateLimit = await checkRateLimit();
        setStatus(`✅ Token valid (${rateLimit.resources.core.remaining} requests remaining)`);
      } catch (error) {
        setStatus(`❌ ${error instanceof Error ? error.message : 'Token verification failed'}`);
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="text-sm text-gray-600 p-2 bg-gray-100 rounded">
      Token Status: {status}
    </div>
  );
};

export default TokenVerification;