import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigation } from 'react-router-dom';
import classes from './Layout.module.css';

/**
 * Showing a spinner only when the specified timeout is reached.
 */
const useLoaderTimeout = (timeout: number): boolean => {
  const navigation = useNavigation();
  const [isCurrentlyTimeout, setIsCurrentlyTimeout] = useState(() => false);

  useEffect(() => {
    if (!!navigation.location?.pathname && navigation.state === 'loading') {
      const timeoutId = setTimeout(() => {
        setIsCurrentlyTimeout(true);
      }, timeout);
      return () => {
        clearTimeout(timeoutId);
        setIsCurrentlyTimeout(false);
      };
    }
  }, [navigation.location?.pathname, navigation.state]);

  return isCurrentlyTimeout;
};

const Layout = () => {
  const navigation = useNavigation();

  const shouldShowSpinner = useLoaderTimeout(1500);

  return (
    <>
      <nav className={classes.nav}>
        <Link to="">Home</Link>
        <Link to="posts">Posts</Link>
        <Link to="slow">Slow</Link>
      </nav>
      <pre>location: {navigation.location?.pathname}</pre>
      <pre>search: {navigation.location?.search}</pre>
      <pre>navigation.state: {navigation.state}</pre>
      {shouldShowSpinner ? <div>Loading...</div> : <Outlet />}
    </>
  );
};

export default Layout;
