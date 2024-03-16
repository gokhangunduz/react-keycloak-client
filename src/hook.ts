"use client";

import { useContext } from "react";
import { KeycloakContext } from "./context";
import Keycloak from "keycloak-js";

export function useKeycloak() {
  const {
    keycloak,
  }: {
    keycloak: Keycloak;
  } = useContext(KeycloakContext);

  if (!keycloak) {
    throw new Error(
      "KeycloakProvider is not defined or an attempt was made to use a hook outside the defined area. Use the useKeycloak hook in the nested objects of the components/pages where KeycloakProvider is defined. KeycloakProvider is similar to react-context structure. For more information about React-Context: https://react.dev/reference/react/createContext"
    );
  }

  return keycloak;
}
