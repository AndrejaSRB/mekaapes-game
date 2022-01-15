import { gql } from "@apollo/client";

// ******** Meka Merge ********
// Must be level 0
export const GET_MEKA_MERGE_TOKENS_UNSTAKE = gql`
  query GetMekaMergeTokens($owner: String!) {
    spaceOogas(
      subgraphError: allow
      where: { owner: $owner, level: 0, oogaType: 1 }
    ) {
      id
      level
      oogaType
      owner
    }
  }
`;

export const GET_MEKA_MERGE_TOKENS_STAKED = gql`
  query GetMekaMergeTokens($owner: String!) {
    spaceOogas(
      subgraphError: allow
      where: { staker: $owner, level: 0, oogaType: 1 }
    ) {
      id
      level
      oogaType
      owner
    }
  }
`;

// ******** Robo Upgrade ********
export const GET_ROBO_OOGAS_UNSTAKED_UPGRADE_TOKENS = gql`
  query GetRoboOogasUpgrade($owner: String!) {
    spaceOogas(subgraphError: allow, where: { owner: $owner, oogaType: 0 }) {
      id
      level
      oogaType
      owner
    }
  }
`;

export const GET_ROBO_OOGAS_STAKED_UPGRADE_TOKENS = gql`
  query GetRoboOogasUpgrade($owner: String!) {
    spaceOogas(subgraphError: allow, where: { staker: $owner, oogaType: 0 }) {
      id
      level
      oogaType
      owner
    }
  }
`;

// ******** Factory ********
// Missing all my staked apes
export const GET_UNSTAKE_ROBO_OOGAS = gql`
  query GetRoboOogasUpgrade($owner: String!) {
    spaceOogas(subgraphError: allow, where: { owner: $owner, oogaType: 0 }) {
      id
      oogaType
      owner
    }
  }
`;

export const GET_UNSTAKE_MEKA_APES = gql`
  query GetRoboOogasUpgrade($owner: String!) {
    spaceOogas(
      subgraphError: allow
      where: { owner: $owner, oogaType: 1, isStaked: false }
    ) {
      id
      isStaked
      oogaType
      owner
    }
  }
`;

// ******** Evolve ********

export const GET_BABY_OOGAS = gql`
  query GetBabyOogas($owner: String!) {
    babyOogas(where: { owner: $owner }, subgraphError: allow) {
      evolvedTo
      id
      owner
    }
  }
`;
