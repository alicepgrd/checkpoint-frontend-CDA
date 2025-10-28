import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      name
      code
      emoji
      continent { id name }
    }
  }
`;

export const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      id
      name
      code
      emoji
      continent { id name }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents { id name }
  }
`;
