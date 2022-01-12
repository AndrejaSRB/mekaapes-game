import { gql } from "@apollo/client";

// Must be level 0 and unstaked
export const GET_MEKA_MERGE_TOKENS = gql`
  query GetMekaMergeTokens($owner: String!) {
    spaceOogas(
      subgraphError: allow
      where: { owner: $owner, level: 0, isStaked: false, oogaType: 2 }
    ) {
      evolvedFrom
      id
      isStaked
      level
      oogaType
      owner
    }
  }
`;

export const GET_BABY_OOGAS = gql`
  query GetBabyOogas($owner: String!) {
    babyOogas(where: { owner: $owner }, subgraphError: allow) {
      evolvedTo
      id
      owner
    }
  }
`;
