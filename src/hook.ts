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

  return keycloak;
}
