import axios from 'axios';
import type { GitHubUser, Repository, SearchResponse, RateLimit } from '../interfaces/github.types';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Create axios instance with default config
const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

// Add response interceptor for rate limit handling
githubApi.interceptors.response.use(
  (response) => {
    // Store remaining rate limit in localStorage
    if (response.headers['x-ratelimit-remaining']) {
      localStorage.setItem('github-rate-limit-remaining', 
        response.headers['x-ratelimit-remaining']);
      localStorage.setItem('github-rate-limit-reset',
        response.headers['x-ratelimit-reset']);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 403 && error.response?.data?.message?.includes('rate limit')) {
      const resetTime = new Date(Number(error.response.headers['x-ratelimit-reset']) * 1000);
      throw new Error(`Rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
    }
    throw error;
  }
);

// Check rate limit before making requests
const checkRateLimit = async (): Promise<RateLimit> => {
  try {
    const response = await githubApi.get('/rate_limit');
    return response.data;
  } catch (error) {
    console.error('Failed to check rate limit:', error);
    throw new Error('Failed to check API rate limit');
  }
};

// Search for GitHub users
const searchGithub = async (filters?: {
  location?: string;
  language?: string;
  followers?: number;
  repos?: number;
}): Promise<GitHubUser[]> => {
  try {
    // Build search query
    let query = 'type:user';
    if (filters?.location) query += ` location:${filters.location}`;
    if (filters?.language) query += ` language:${filters.language}`;
    if (filters?.followers) query += ` followers:>=${filters.followers}`;
    if (filters?.repos) query += ` repos:>=${filters.repos}`;

    const response = await githubApi.get<SearchResponse>('/search/users', {
      params: {
        q: query,
        sort: 'followers',
        order: 'desc',
        per_page: 10,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('Failed to search GitHub users:', error);
    throw new Error('Failed to search for candidates');
  }
};

// Get detailed user information
const searchGithubUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await githubApi.get<GitHubUser>(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user ${username}:`, error);
    throw new Error(`Failed to fetch user details for ${username}`);
  }
};

// Get user repositories
const getGithubRepos = async (username: string): Promise<Repository[]> => {
  try {
    const response = await githubApi.get<Repository[]>(`/users/${username}/repos`, {
      params: {
        sort: 'stars',
        direction: 'desc',
        per_page: 5,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch repos for ${username}:`, error);
    throw new Error(`Failed to fetch repositories for ${username}`);
  }
};

// Get user's recent activity
const getUserActivity = async (username: string) => {
  try {
    const response = await githubApi.get(`/users/${username}/events/public`, {
      params: {
        per_page: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch activity for ${username}:`, error);
    throw new Error(`Failed to fetch recent activity for ${username}`);
  }
};

export {
  checkRateLimit,
  searchGithub,
  searchGithubUser,
  getGithubRepos,
  getUserActivity,
};