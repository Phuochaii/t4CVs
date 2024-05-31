import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../../../../pages/Spinner';
import { useNavigate } from 'react-router-dom';
import { AUTH0_BACKEND_AUDIENCE } from '../infrastructure/config';

export interface Role {
    check: (token:string) => Promise<boolean>,
    redirectUrl: string,
    RegisterProfile: () => JSX.Element,
    loginUrl: string,
}
  
export const Roles: { [key in "HR" | "USER"]: Role } = {
    HR: {
        check: async (token) => {
            const result = await axios.get(`http://localhost:3000/employer/check`,{
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
                .then(res => res.data as boolean)
                .catch(() => false);
            return result;
        },
        RegisterProfile: () => {
            const navigate = useNavigate();
            useEffect(() => {
                navigate('/hr-profile-register');
            }, [navigate]);
            return <Spinner/>
        },
        redirectUrl: '/hr/news',
        loginUrl: '/hr-login',
    },
    USER: {
        check: async (token) => {
            const result = await axios.get(`http://localhost:3000/user/check`,{
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
                .then(res => res.data as boolean)
                .catch(() => false);
            return result;
        },
        redirectUrl: '/',
        RegisterProfile: () => {
            const { user, isLoading, getAccessTokenSilently, isAuthenticated } = useAuth0();
            const navigate = useNavigate();
            const {setRole} = useRoleContext();
            useEffect(() => {
                if(isLoading) return;
                if(!isAuthenticated) {
                    navigate(Roles.USER.loginUrl);
                    return;
                };
                if(!user) return console.error('isAuthenticated is true but user is null!');
                const registerProfile = async () => {
                    try {
                        const token = await getAccessTokenSilently({
                            authorizationParams: {
                                audience: AUTH0_BACKEND_AUDIENCE,
                            },
                            cacheMode: 'off'
                        });
                        console.log('token:', token);
                        await axios.post(`http://localhost:3000/user/create`, {
                            fullname: user.name,
                            phone: user.phone_number,
                        },{
                            headers: {
                                authorization: `Bearer ${token}`,
                            }
                        });
                        setRole(Roles.USER)
                    } catch (error) {
                        console.error(error);
                        alert('Register user profile failed!');
                        window.location.reload();
                    }
                }
                registerProfile();
            }, [isLoading, isAuthenticated]);
            return <Spinner/>
        },
        loginUrl: '/user-login',
    },
}

type RoleContextInterface = {
    role?: Role | null,
    setRole: (role: Role | null | undefined) => void,
};
const RoleContext = createContext<RoleContextInterface>({
    setRole: () => { },
});
export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<Role | undefined | null>(undefined);
    const value = {
        role,
        setRole,
    };
    return (
        <RoleContext.Provider value={value}>
            {children}
        </RoleContext.Provider>
    );
}
export const useRoleContext = () => useContext(RoleContext);