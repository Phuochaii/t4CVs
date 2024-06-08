import { useAuth0 } from "@auth0/auth0-react";
import { AUTH0_BACKEND_AUDIENCE } from "../services/authen/infrastructure/config";
import { createContext, useContext, useState } from "react";

type TokenContextInterface = {
  token?: string;
  setToken: () => void;
};
const TokenContext = createContext<TokenContextInterface>({
  setToken: () => {},
});

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | undefined>(undefined);

  if (!isAuthenticated) return undefined;
  getAccessTokenSilently({
    authorizationParams: {
      audience: AUTH0_BACKEND_AUDIENCE,
    },
    cacheMode: "off",
  })
    .then((res) => {
      setToken(res);
    })
    .catch((error) => {
      console.log(error);
      alert('Get token failed!');
    });
  const value = {
    setToken: setToken,
    token: token,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}
export const useTokenContext = () => useContext(TokenContext);
