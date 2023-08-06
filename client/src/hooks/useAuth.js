import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
const useAuth = () => {

  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const login = (user) => {
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = async() => {
    await axios
        .get('/auth/logout')
        .then((res) => {
          const { message } = res.data;

          if(res.status === 200){
              dispatch({ type: 'LOGOUT' });
              toast.success(message);
              navigate(`/escapes/`);
          }
          else{
            toast.error(message);
          }
        })
        .catch((err) => {
            if(err.response){
                toast.error(err.response.data.error);
            }
            else{
                toast.error("An Error Occured!");
            }
        });
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
