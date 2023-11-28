
export interface FollowLens {
  followingOnLens: boolean;
  followedOnLens: boolean;
}

export interface FollowFarcaster {
  followingOnFarcaster: boolean;
  followedOnFarcaster: boolean;
}

export interface FollowTalentProtocol {
  followingOnTalentProtocol: boolean;
  followedOnTalentProtocol: boolean;
}

export interface OnChainRecommendedUser {
  addresses?: string[];
  domains?: {
    name: string;
    isPrimary: boolean;
  }[];
  socials?: {
    dappName: string;
    blockchain: string;
    profileName: string;
    profileImage: string;
    profileTokenId: string;
    profileTokenAddress: string;
  }[];
  xmtp?: {
    isXMTPEnabled?: boolean;
  };
  _score?: number;
}

export interface PoapRecommendedUser extends OnChainRecommendedUser {
  poaps?: {
    name: string;
    image?: string;
    eventId: string;
  }[];
}

export interface FarcasterFollowerAddress extends OnChainRecommendedUser {
  mutualFollowing?: {
    Follower: {
      followingAddress: {
        socials: {
          profileName: string;
        };
      };
    }[];
  };
  follows?: FollowFarcaster;
}

export interface FarcasterFollowingAddress extends OnChainRecommendedUser {
  mutualFollowing?: {
    Following: {
      followerAddress: {
        socials: {
          profileName: string;
        };
      };
    }[];
  };
  follows?: FollowFarcaster;
}

export interface LensFollowerAddress extends OnChainRecommendedUser {
  mutualFollowing?: {
    Following: {
      followingAddress: {
        socials: {
          profileName: string;
        };
      };
    }[];
  };
  follows?: FollowLens;
}

export interface LensFollowingAddress extends OnChainRecommendedUser {
  mutualFollowing?: {
    Following: {
      followerAddress: {
        socials: {
          profileName: string;
        };
      };
    }[];
  };
  follows?: FollowLens;
}
