import { AppState, Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { App } from "@capacitor/app";
import { useEffect } from "react";
import { Browser } from "@capacitor/browser";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    console.log("test");

    App.addListener("appUrlOpen", async ({ url }) => {
      if (
        url.includes("state") &&
        (url.includes("code") || url.includes("error"))
      ) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  }, [handleRedirectCallback]);

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("unable to initialise auth");
  }

  const onRedirectCallback = (appState?: AppState) => {
    console.log("redirect callback");

    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      useRefreshTokens={true}
      useRefreshTokensFallback={false}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      // onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
