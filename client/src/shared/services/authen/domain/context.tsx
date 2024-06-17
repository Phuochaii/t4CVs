import { useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Spinner from '../../../../pages/Spinner';
import { useNavigate } from 'react-router-dom';
import {
  AUTH0_BACKEND_AUDIENCE,
  AUTH0_CLIENT_ID,
} from '../infrastructure/config';
import {
  isUser,
  getProfile as getUserProfile,
  createUser,
} from '../../../../modules/user-module';
import {
  getProfile as getHrProfile,
  isHr,
} from '../../../../modules/hr-module';
import {
  getProfile as getAdminProfile,
  isAdmin,
} from '../../../../modules/admin-module';

type Profile = {
  name: string;
  picture?: string;
};
export interface Role {
  check: (token: string) => Promise<boolean>;
  redirectUrl: string;
  RegisterProfile: () => JSX.Element;
  loginUrl: string;
  registerApiUrl: string;
  getProfile: (token: string) => Promise<Profile>;
}

export const Roles: { [key in 'HR' | 'USER' | 'ADMIN']: Role } = {
  HR: {
    check: async (token) => {
      return await isHr(token);
    },
    RegisterProfile: () => {
      const navigate = useNavigate();
      useEffect(() => {
        navigate('/hr-profile-register');
      }, [navigate]);
      return <Spinner />;
    },
    redirectUrl: '/hr/news',
    loginUrl: '/hr-login',
    registerApiUrl: 'https://https-proxy-ten.vercel.app/employer/account',
    getProfile: async (token) => {
      const profile = await getHrProfile(token);
      return {
        name: profile.fullname,
        picture: profile.image,
      };
    },
  },
  USER: {
    check: async (token) => {
      return await isUser(token);
    },
    redirectUrl: '/',
    RegisterProfile: () => {
      console.log('Register user profile');
      const { user, getAccessTokenSilently, isAuthenticated, isLoading } =
        useAuth0();
      const navigate = useNavigate();
      const { role, setRole } = useProfileContext();
      useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) {
          navigate(Roles.USER.loginUrl);
          return;
        }
        if (!user)
          return console.error("isAuthenticated is true but user is null!");
        const registerProfile = async () => {
          try {
            const token = await getAccessTokenSilently({
              authorizationParams: {
                audience: AUTH0_BACKEND_AUDIENCE,
              },
              cacheMode: "off",
            });

            await createUser({
              fullname: user.name as string,
              phone: user.phone_number,
              image: user.picture,
              token,
            });
            setRole(Roles.USER);
          } catch (error) {
            console.error(error);
          }
        };
        registerProfile();
      }, [isAuthenticated, isLoading]);
      return <Spinner />;
    },
    loginUrl: "/user-login",
    registerApiUrl: "https://https-proxy-ten.vercel.app/user/account",
    getProfile: async (token) => {
      const profile = await getUserProfile(token);
      return {
        name: profile.fullname,
        picture: profile.image,
      };
    },
  },
  ADMIN: {
    check: async (token) => {
      return await isAdmin(token).catch(() => false);
    },
    getProfile: async (token) => {
      return await getAdminProfile(token);
    },
    RegisterProfile: () => {
      const { logout } = useAuth0();
      useEffect(() => {
        alert(
          `You're are not admin! Please login with admin account to access this page.`
        );
        logout({
          clientId: AUTH0_CLIENT_ID,
          logoutParams: {
            returnTo: `${window.location.origin}${Roles.ADMIN.loginUrl}`,
          },
        });
      }, [logout]);
      return <Spinner />;
    },
    loginUrl: "/admin-login",
    redirectUrl: "/admin/overview",
    registerApiUrl: "https://https-proxy-ten.vercel.app/admin/account",
  },
};

type ProfileContextInterface = {
  profile?: Profile;
  setProfile: (user: Profile) => void;
  role?: Role | null;
  setRole: (role: Role | null | undefined) => void;
  token?:string;
};
const ProfileContext = createContext<ProfileContextInterface>({
  setProfile: () => {},
  setRole: () => {},
});
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [role, setRole] = useState<Role | undefined | null>(undefined);
  const [token, setToken] = useState<string | undefined | null>(undefined);
  const getProfile = async (role: Role | undefined | null) => {
    if (!isAuthenticated || !role) return undefined;
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: AUTH0_BACKEND_AUDIENCE,
        },
        cacheMode: "off",
      });
      setToken(token);
      const profile = await role.getProfile(token);
      return profile;
    } catch (error) {
      console.error(error);
      alert("Get user profile failed!");
      window.location.reload();
    }
  };
  const value = {
    token,
    profile,
    setProfile,
    role,
    setRole: async (role: Role | null | undefined) => {
      const profile = await getProfile(role);
      if (profile) setProfile(profile);
      setRole(role);
    },
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
export const useProfileContext = () => useContext(ProfileContext);
