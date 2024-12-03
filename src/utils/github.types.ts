import type { 
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
export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface FilterOptions {
  location?: string;
  minRepos?: number;
  availableForHire?: boolean;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

export interface RateLimitResponse {
  resources: {
    core: {
      limit: number;
      remaining: number;
      reset: number;
    };
    search: {
      limit: number;
      remaining: number;
      reset: number;
    };
    graphql: {
      limit: number;
      remaining: number;
      reset: number;
    };
    integration_manifest: {
      limit: number;
      remaining: number;
      reset: number;
    };
    code_scanning_upload: {
      limit: number;
      remaining: number;
      reset: number;
    };
  };
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
}

export interface RateLimitError extends Error {
  resetTime: Date;
}