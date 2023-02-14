import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import PropTypes from "prop-types";
import PageChange from "components/PageChange/PageChange.js";
import Admin from "layouts/Admin.js";
import {LOAD_BOOTSTRAP} from "../../redux/actions/app";

const WithAuthentication = WrappedComponent => {
  const RequiresAuthentication = props => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo)
    const route = useRouter()
    const Layout = WrappedComponent.layout
    useEffect(() => {
      dispatch({type: LOAD_BOOTSTRAP})
    }, [])

     // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
    return userInfo? <Layout><WrappedComponent {...props} /></Layout> : <div></div>;
  };

  return RequiresAuthentication;
};

WithAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired
};

export default WithAuthentication;