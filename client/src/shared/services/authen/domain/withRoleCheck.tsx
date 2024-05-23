import { FC, useEffect } from 'react';
import { Role, useRoleContext } from './context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../pages/Spinner';
import { useAuth0 } from '@auth0/auth0-react';
import { Modal } from '@mui/material';
import { AUTH0_BACKEND_AUDIENCE } from '../infrastructure/config';

export const withRoleCheck = (role: Role) => (WrappedComponent: FC) => {
  const AuthHOC: FC = (props) => {
    const navigate = useNavigate();
    const {isLoading, getAccessTokenSilently, isAuthenticated} = useAuth0();
    const {role: currentRole, setRole} = useRoleContext();
    
    useEffect(() => {
      if(isLoading) return;
      if(!isAuthenticated){
        navigate(role.loginUrl);
        return;
      }
      console.log(currentRole)
      if(currentRole !== undefined) return;
      const checkRole = async () => {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: AUTH0_BACKEND_AUDIENCE
            },
            cacheMode: 'off'
          });
          const result = await role.check(token);
          if(result) {
            setRole(role);
            return;
          }
          setRole(null);
        } catch (e) {
          console.error(e);
          setRole(null);
        }
      }
      checkRole();
    }, [isAuthenticated, currentRole, setRole, role, navigate, isLoading]);
    if(isLoading || !isAuthenticated || currentRole === undefined) {
      return <Spinner/>;
    }
    if(currentRole === null || currentRole !== role) {
      const RegisterProfile = role.RegisterProfile
      return <RegisterProfile />;
    }
    
    if(currentRole === role) {
      return <WrappedComponent {...props} />;
    }
    return <Spinner/>;
  };

  return () => <AuthHOC/>;
}
