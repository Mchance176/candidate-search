interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  location?: string;
}

interface GitHubError {
  message: string;
  documentation_url?: string;
}

/**
 * Fetches a random list of GitHub users
 * @returns Promise<GitHubUser[]>
 * @throws Error if the API request fails
 */
const searchGithub = async (): Promise<GitHubUser[]> => {
  try {
    // Generate a random starting point to get different users each time
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log('Fetching users since ID:', start);

    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=30`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = data as GitHubError;
      console.error('GitHub API Error:', error);
      throw new Error(error.message || 'Failed to fetch GitHub users');
    }

    console.log(`Successfully fetched ${data.length} users`);
    return data as GitHubUser[];
  } catch (error) {
    console.error('Error in searchGithub:', error);
    if (error instanceof Error) {
      throw new Error(`GitHub API Error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching users');
  }
};

/**
 * Fetches detailed information for a specific GitHub user
 * @param username The GitHub username to fetch details for
 * @returns Promise<GitHubUser>
 * @throws Error if the API request fails
 */
const searchGithubUser = async (username: string): Promise<GitHubUser> => {
  try {
    console.log('Fetching details for user:', username);

    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = data as GitHubError;
      console.error('GitHub API Error:', error);
      throw new Error(error.message || `Failed to fetch user: ${username}`);
    }

    console.log('Successfully fetched user details for:', username);
    return data as GitHubUser;
  } catch (error) {
    console.error('Error in searchGithubUser:', error);
    if (error instanceof Error) {
      throw new Error(`GitHub API Error: ${error.message}`);
    }
    throw new Error(`An unexpected error occurred while fetching user: ${username}`);
  }
};

/**
 * Rate limit information from GitHub API
 */
interface RateLimitResponse {
  resources: {
    core: {
      limit: number;
      used: number;
      remaining: number;
      reset: number;
    };
  };
}

/**
 * Checks the current rate limit status for the GitHub API
 * @returns Promise<RateLimitResponse>
 * @throws Error if the API request fails
 */
const checkRateLimit = async (): Promise<RateLimitResponse> => {
  try {
    const response = await fetch(
      'https://api.github.com/rate_limit',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = data as GitHubError;
      console.error('Rate Limit API Error:', error);
      throw new Error(error.message || 'Failed to check rate limit');
    }

    console.log('Rate limit info:', {
      remaining: data.resources.core.remaining,
      reset: new Date(data.resources.core.reset * 1000).toLocaleTimeString(),
    });

    return data as RateLimitResponse;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    if (error instanceof Error) {
      throw new Error(`Rate Limit Error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while checking rate limit');
  }
};

export { searchGithub, searchGithubUser, checkRateLimit };
export type { GitHubUser, GitHubError, RateLimitResponse };