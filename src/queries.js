import { gql } from "@apollo/client";

// ******** Meka Merge ********
// Must be level 0
export const GET_MEKA_MERGE_TOKENS_UNSTAKE = gql`
  query GetUnstakedMekaMergeTokens($owner: String!) {
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
  query GetStakedMekaMergeTokens($owner: String!) {
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
  query GetUnstakedRoboOogasUpgrade($owner: String!) {
    spaceOogas(subgraphError: allow, where: { owner: $owner, oogaType: 0 }) {
      id
      level
      oogaType
      owner
    }
  }
`;

export const GET_ROBO_OOGAS_STAKED_UPGRADE_TOKENS = gql`
  query GetStakedRoboOogasUpgrade($owner: String!) {
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
  query GetUnstakeRoboOogas($owner: String!) {
    spaceOogas(subgraphError: allow, where: { owner: $owner, oogaType: 0 }) {
      id
      oogaType
      owner
    }
  }
`;

export const GET_UNSTAKE_MEKA_APES = gql`
  query GetUnstakeMekaApes($owner: String!) {
    spaceOogas(subgraphError: allow, where: { owner: $owner, oogaType: 1 }) {
      id
      oogaType
      owner
    }
  }
`;

export const GET_STAKED_APE = gql`
  query GetStakedApe($owner: String!) {
    spaceOogas(subgraphError: allow, where: { staker: $owner }) {
      id
      oogaType
      owner
      level
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

// ******** Game Statistics ********

export const GET_LEADERBOARD = gql`
  query GetLeaderboard {
    owners(
      subgraphError: allow
      orderBy: ooGear
      orderDirection: desc
      first: 420
    ) {
      id
      ooGear
    }
    gameStatus(subgraphError: allow, id: "gamestatus") {
      id
      mekaApesMinted
      mekaApesStaked
      roboOogasMinted
      roboOogasStaked
      roboOogasGifted
      mekaApesGifted
    }
  }
`;
