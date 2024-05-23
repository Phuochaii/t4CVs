import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Modal } from '@mui/material';
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
        check: async (userId) => {
            try {
                const result = await axios.get(`http://localhost:3000/employer/check/${userId}`)
                    .then(res => res.data) as boolean;
                return result;
            } catch (e) {
                return false
            }
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
            try {
                const result = await axios.get(`http://localhost:3000/user/check`,{
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
                    .then(res => res.data) as boolean;
                return result;
            } catch (e) {
                return false;
            }
        },
        redirectUrl: '/',
        RegisterProfile: () => {
            const { user, isLoading, getAccessTokenSilently,isAuthenticated } = useAuth0();
            const navigate = useNavigate();
            const {setRole} = useRoleContext();
            const {name, phone_number} = user || {};
            useEffect(() => {
                if(isLoading) return;
                if(!isAuthenticated) {
                    navigate(Roles.USER.loginUrl);
                    return;
                };
            }, [isLoading, isAuthenticated]);
            useEffect(() => {
                if(!name || !phone_number) return;
                const registerProfile = async () => {
                    try {
                        const token = await getAccessTokenSilently({
                            cacheMode: 'off'
                        });
                        console.log('token:', token);
                        await axios.post(`http://localhost:3000/user/create`, {
                            fullname: name,
                            phone: phone_number,
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
            }, [name, phone_number, getAccessTokenSilently, setRole]);
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