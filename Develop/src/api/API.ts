import type { 
  RateLimitError, 
  GitHubUser, 
  GitHubSearchResponse, 
  FilterOptions,
  RateLimitResponse 
} from '../interfaces/github.types';

// Get token from environment
const getToken = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (!token) {
    throw new Error('GitHub token is not configured. Please check your .env file.');
  }
  return token;
};

// Centralized headers management
const getHeaders = () => {
  const token = getToken();
  return {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${token}`
  };
};

// Check GitHub API rate limit
export const checkRateLimit = async (): Promise<RateLimitResponse> => {
  try {
    const response = await fetch('https://api.github.com/rate_limit', {
      headers: getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Rate limit check failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Rate limit check failed:', error);
    throw error;
  }
};

// Search GitHub users with filters
export const searchGithub = async (filters: FilterOptions = {}): Promise<GitHubUser[]> => {
  try {
    // Build query string
    const queryParts = ['type:user'];
    if (filters.location) queryParts.push(`location:${filters.location}`);
    if (filters.minRepos) queryParts.push(`repos:>=${filters.minRepos}`);
    if (filters.availableForHire) queryParts.push('available_for_hire:true');

    const query = queryParts.join(' ');

    // Make API request
    const response = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=100`,
      { headers: getHeaders() }
    );

    if (!response.ok) {
      throw new Error(`GitHub search failed: ${response.status}`);
    }

    const data: GitHubSearchResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};

// Get detailed user info
export const searchGithubUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      { headers: getHeaders() }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user ${username}: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch user ${username}:`, error);
    throw error;
  }
};

// Debug logging in development
if (import.meta.env.DEV) {
  console.log('Environment Check:', {
    token: import.meta.env.VITE_GITHUB_TOKEN ? 'Present' : 'Missing',
    tokenValue: import.meta.env.VITE_GITHUB_TOKEN?.substring(0, 4) || 'none',
    mode: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    envVars: import.meta.env
  });
}