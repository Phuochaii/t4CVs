import ReactDOM from 'react-dom/client';
import App from "./App";
import "./index.css";
import "./shared/i18n/index.ts";
import "./shared/hooks/useTheme.tsx";
import history from "./shared/utils/history.ts";
import { getConfig } from "./config.ts";
import { Auth0Provider } from "@auth0/auth0-react";
import { ProfileProvider } from "./shared/services/authen/domain/context.tsx";
import { ToastContainer } from 'react-toastify';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname,
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
  useRefreshTokensFallback: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider {...providerConfig} >
      <ProfileProvider>
      <App />
      <ToastContainer />
    </ProfileProvider>
  </Auth0Provider>
);

// createRoot(document.getElementById('root')!).render(<App />);
