import fetchFarcasterFollowers from './functions/fetch-farcaster-followers';
import fetchFarcasterFollowings from './functions/fetch-farcaster-followings';
import fetchLensFollowers from './functions/fetch-lens-followers';
import fetchLensFollowings from './functions/fetch-lens-followings';
import { OnChainRecommendedUser } from './interfaces/on-chain-recommended-user';
import calculatingScore from './score';
import sortByScore from './sort';

export const fetchOnChainGraphData = async (address: string): Promise<OnChainRecommendedUser[]> => {
  let recommendedUsers: OnChainRecommendedUser[] = [];

  // uncomment to enable poaps fetching
  // console.log(`Fetching Common Poaps Holders for ${address}...`);
  // recommendedUsers = await fetchPoapsData(address);

  console.log(`Fetching Farcaster Followings for ${address}...`);
  recommendedUsers = await fetchFarcasterFollowings(address, recommendedUsers);

  console.log(`Fetching Lens Followings for ${address}...`);
  recommendedUsers = await fetchLensFollowings(address, recommendedUsers);

  console.log(`Fetching Farcaster Followers for ${address}...`);
  recommendedUsers = await fetchFarcasterFollowers(address, recommendedUsers);

  console.log(`Fetching Lens Followers for ${address}...`);
  recommendedUsers = await fetchLensFollowers(address, recommendedUsers);

  console.log('Computing score...');
  const onChainGraphUsersWithScore = recommendedUsers.map((user) => calculatingScore(user)).filter(Boolean);

  console.log('Sorting recommended users by score...');
  return sortByScore(onChainGraphUsersWithScore);
};
