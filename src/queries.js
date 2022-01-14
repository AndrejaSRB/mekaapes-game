import { gql } from "@apollo/client";

// Must be level 0
export const GET_MEKA_MERGE_TOKENS = gql`
  query GetMekaMergeTokens($owner: String!) {
    spaceOogas(
      subgraphError: allow
      where: { owner: $owner, level: 1, oogaType: 1 }
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

export const GET_ROBO_OOGAS_UPGRADE_TOKENS = gql`
  query GetRoboOogasUpgrade($owner: String!) {
    spaceOogas(
      subgraphError: allow
      where: { owner: $owner, oogaType: 0 }
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
