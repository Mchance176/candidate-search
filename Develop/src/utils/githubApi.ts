export interface RateLimitError extends Error {
  resetTime: Date;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubSearchResponse {
  items: GitHubUser[];
  total_count: number;
}

export interface FilterOptions {
  location?: string;
  minRepos?: number;
  availableForHire?: boolean;
}

export interface RateLimitResponse {
  resources: {
    core: {
      limit: number;
      remaining: number;
      reset: number;
    };
  };
}