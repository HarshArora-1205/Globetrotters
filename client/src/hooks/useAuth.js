import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const login = (user) => {
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  if (!state || !dispatch) {
    throw new Error('useAuth must be used within an AuthProvider!');
  }

  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    login,
    logout,
  };
};

export default useAuth;
