![react-keycloak-client](/docs/images/banner.jpg "react-keycloak-client")

# React Keycloak Client

React Keycloak Client provides an integration with Keycloak authentication and authorization server for React applications. This package enables connecting to a Keycloak server and handling user authentication and authorization.

## Installation

You can install the package via npm or yarn:

```
npm install react-keycloak-client
```

or

```
yarn add react-keycloak-client
```

## Usage

1. First, add the `KeycloakProvider` component to your application's root component:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { KeycloakProvider } from "react-keycloak-client";

ReactDOM.render(
  <KeycloakProvider
    client={{
      url: "https://example.domain/auth",
      realm: "exRealm",
      clientId: "exClient",
    }}
    initOptions={{
      onLoad: "login-required",
      checkLoginIframe: false,
    }}
    autoRefreshToken
    onToken={(tokens) => {
      localStorage.setItem("kc-tokens", JSON.stringify(tokens));
    }}
    onLoadingComponent={<div>Loading...</div>}
  >
    <App />
  </KeycloakProvider>,
  document.getElementById("root")
);
```

2. Then, you can access Keycloak-protected components. For example:

```jsx
import React from "react";
import { useKeycloak } from "react-keycloak-client";

const Profile = () => {
  const keycloak = useKeycloak();

  if (!keycloak.initialized) return <div>Loading...</div>;

  if (keycloak.authenticated) {
    return (
      <div>
        <p>Welcome, {keycloak.profile.username}!</p>
        <button onClick={() => keycloak.logout()}>Logout</button>
      </div>
    );
  } else {
    return <div>You are not logged in.</div>;
  }
};

export default Profile;
```

## API Reference

This package provides the following main components and hooks:

### Components

- **KeycloakProvider**: Provides your application's Keycloak connection.

### Hooks

- **useKeycloak**: Provides access to the Keycloak object.

## Contributing

Please contribute by visiting the GitHub repository: [react-keycloak-client GitHub Repository](https://github.com/gokhangunduz/react-keycloak-client)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
