// Custom error type for rate limits
interface RateLimitError extends Error {
  resetTime: Date;
}

// GitHub API types
interface GitHubSearchResponse {
  items: GitHubUser[];
  total_count: number;
}

interface FilterOptions {
  location?: string;
  minRepos?: number;
  availableForHire?: boolean;
}

// Check GitHub API rate limit
export const checkRateLimit = async () => {
  const response = await fetch('https://api.github.com/rate_limit', {
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  });
  return response.json();
};

// Search GitHub users with filters
export const searchGithub = async (filters: FilterOptions = {}) => {
  try {
    // Check rate limit before search
    const rateLimit = await checkRateLimit();
    if (rateLimit.resources.core.remaining < 1) {
      const resetTime = new Date(rateLimit.resources.core.reset * 1000);
      const error = new Error('GitHub API rate limit exceeded') as RateLimitError;
      error.resetTime = resetTime;
      throw error;
    }

    // Build query string
    let query = 'type:user';
    if (filters.location) query += ` location:${filters.location}`;
    if (filters.minRepos) query += ` repos:>=${filters.minRepos}`;

    // Make API request
    const response = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=100`,
      {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data: GitHubSearchResponse = await response.json();
    return data.items;
  } catch (error) {
    throw error;
  }
};

// Get detailed user info
export const searchGithubUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  return response.json();
};