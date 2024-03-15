"use client";

import Keycloak, { KeycloakInitOptions } from "keycloak-js";
import { ReactElement, createContext, useEffect, useState } from "react";

export const KeycloakContext: any = createContext<any>(null);

interface IKeycloakContext {
  children: ReactElement | ReactElement[];
  client: {
    url: string;
    realm: string;
    clientId: string;
  };
  initOptions: KeycloakInitOptions;
  autoRefreshToken?: boolean;
  onLoadingComponent?: ReactElement;
  onToken?: (token: {
    idToken: string;
    refreshToken: string;
    token: string;
  }) => void;
}

export default ({
  children,
  client: userClient,
  initOptions,
  autoRefreshToken = true,
  onLoadingComponent,
  onToken,
}: IKeycloakContext) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);

  useEffect(() => {
    const client = new Keycloak({
      url: userClient.url,
      realm: userClient.realm,
      clientId: userClient.clientId,
    });

    client.onTokenExpired = function () {
      autoRefreshToken && handleUpdateToken();
    };

    client
      .init(initOptions)
      .then((auth) => {
        auth && handleOnToken();
        handleClientUpdater();
      })
      .catch((err) => {
        console.error(err);
      });

    function handleUpdateToken() {
      client.updateToken().then((refreshed) => {
        refreshed && handleOnToken();
        refreshed && handleClientUpdater();
      });
    }

    function handleClientUpdater() {
      setKeycloak(client);
    }

    function handleOnToken() {
      onToken &&
        onToken({
          idToken: client.idToken!,
          refreshToken: client.refreshToken!,
          token: client.token!,
        });
    }
  }, []);

  return (
    // @ts-ignore
    <KeycloakContext.Provider
      value={{
        keycloak,
      }}
    >
      {(() => {
        if (onLoadingComponent && !keycloak?.authenticated) {
          return onLoadingComponent;
        }
        return children;
      })()}
    </KeycloakContext.Provider>
  );
};
