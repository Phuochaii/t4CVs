import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Modal } from '@mui/material';
import Spinner from '../../../../pages/Spinner';
import { useNavigate } from 'react-router-dom';

export interface Role {
    check: (userId:string) => Promise<boolean>,
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
        check: async (userId) => {
            try {
                const result = await axios.get(`http://localhost:3000/user/check/${userId}`)
                    .then(res => res.data) as boolean;
                return result;
            } catch (e) {
                return false;
            }
        },
        redirectUrl: '/',
        RegisterProfile: () => {
            const { user } = useAuth0();
            const navigate = useNavigate();
            const {setRole} = useRoleContext();
            useEffect(() => {
                if(!user) {
                    console.log('RegisterProfile: user is null');
                    navigate(Roles.USER.loginUrl);
                    return;
                };
                const registerProfile = async () => {
                    try {
                        await axios.post(`http://localhost:3000/user/create`, {
                            id: user.sub,
                            fullname: user.name,
                            phone: user.phone_number,
                        });
                        setRole(Roles.USER)
                    } catch (error) {
                        alert('Register user profile failed!');
                        window.location.reload();
                    }
                }
                registerProfile();
            }, []);
            return <Modal open={true}>
                <Spinner/>
            </Modal>
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