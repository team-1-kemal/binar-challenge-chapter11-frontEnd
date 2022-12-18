import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setJwt } from '../redux/jwtSlice';

export function ComponentWrapper({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const tokenJwt = localStorage.getItem('token');
    if (tokenJwt == null) {
      return;
    }
    dispatch(setJwt(tokenJwt));
  }, []);
  return <>{children}</>;
}
