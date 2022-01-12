import { gql } from "@apollo/client";

export const TEST_QUERY = gql`
  query GetOogas {
    spaceOogas {
      id
      oogaType
      level
      isStaked
    }
  }
`;

export const GET_BABY_OOGAS = gql`
  query GetBabyOogas($owner: String!) {
    babyOogas(where: {owner: $owner}) {
      evolvedTo
      id
      owner
    }
  }
`;
