import { gql } from "@apollo/client/core";

import { fetchAllPagesQuery } from "../../index";
import { PoapRecommendedUser, OnChainRecommendedUser } from "../interfaces/on-chain-recommended-user";
import formatPoapsData from "../utils/format-poaps";

interface PoapEvent {
  eventId: string;
  isVirtualEvent: boolean;
}

interface Poap {
  eventId: string;
  poapEvent: PoapEvent;
}

interface PoapDataResponse {
  Poaps: {
    Poap: Poap[];
  };
}

export interface PoapHolder {
  eventId: string;
  poapEvent: {
    eventName: string;
    contentValue: {
      image: {
        extraSmall: string;
      };
    };
  };
  attendee: {
    owner: PoapUser;
  };
}

export interface PoapUser extends OnChainRecommendedUser {
  poaps?: {
    name: string;
    image: string;
    eventId: string;
  }[];
}

interface PoapHoldersDataResponse {
  Poaps: {
    Poap: PoapHolder[];
  };
}

const userPoapsEventIdsQuery = gql`
  query MyQuery($address: Identity!) {
    Poaps(input: { filter: { owner: { _eq: $address } }, blockchain: ALL }) {
      Poap {
        eventId
        poapEvent {
          isVirtualEvent
        }
      }
    }
  }
`;

const poapsByEventIdsQuery = gql`
  query MyQuery($eventIds: [String!]) {
    Poaps(input: { filter: { eventId: { _in: $eventIds } }, blockchain: ALL }) {
      Poap {
        eventId
        poapEvent {
          eventName
          contentValue {
            image {
              extraSmall
            }
          }
        }
        attendee {
          owner {
            addresses
            domains {
              name
              isPrimary
            }
            socials {
              dappName
              blockchain
              profileName
              profileImage
              profileTokenId
              profileTokenAddress
            }
            xmtp {
              isXMTPEnabled
            }
          }
        }
      }
    }
  }
`;

export const fetchPoapHolders = async (eventId: string) =>
  fetchAllPagesQuery<PoapHoldersDataResponse>(poapsByEventIdsQuery, { eventIds: [eventId] });

const fetchPoapsData = async (
  address: string,
  existingUsers: OnChainRecommendedUser[] = []
): Promise<PoapRecommendedUser[]> => {
  const poapEventsResponse = await fetchAllPagesQuery<PoapDataResponse>(userPoapsEventIdsQuery, { address });
  const poapEventIds = poapEventsResponse.flatMap(
    r => r.Poaps.Poap?.filter(poap => !poap.poapEvent.isVirtualEvent).map(poap => poap.eventId) ?? []
  );
  if (poapEventIds?.length === 0) {
    return [];
  }
  const poapHoldersResponse = await fetchAllPagesQuery<PoapHoldersDataResponse>(poapsByEventIdsQuery, {
    eventIds: poapEventIds
  });

  return formatPoapsData(
    poapHoldersResponse.flatMap(r => r.Poaps.Poap),
    existingUsers
  );
};

export default fetchPoapsData;
