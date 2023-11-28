import { OnChainRecommendedUser } from "./interfaces/on-chain-recommended-user";

const sortByScore = (recommendations: OnChainRecommendedUser[]) =>
  recommendations.sort((a, b) => (b._score || 0) - (a._score || 0));

export default sortByScore;
