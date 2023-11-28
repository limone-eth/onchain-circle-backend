
export interface FormattedRecommendedUser {
  addresses: string[];
  ens?: string;
  farcaster?: {
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  lens?: {
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  
  xmtp?: boolean;
  score: number;
  follows?: {
    followingOnFarcaster: boolean;
    followingOnLens: boolean;
    followedOnFarcaster: boolean;
    followedOnLens: boolean;
  };
  poaps?: {
    name: string;
    image?: string;
    eventId: string;
  }[];
}