import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { LOAD_BOOTSTRAP } from 'redux/actions/app';

const WithAuthentication = (WrappedComponent) => {
  const RequiresAuthentication = (props) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const Layout = WrappedComponent.layout;

    React.useEffect(() => {
      dispatch({ type: LOAD_BOOTSTRAP });
    }, []);

    // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
    return userInfo ? (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    ) : (
      <div></div>
    );
  };

  return RequiresAuthentication;
};

WithAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default WithAuthentication;
