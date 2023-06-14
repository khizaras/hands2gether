import React, { useEffect } from 'react';
import { Router } from "@gatsbyjs/reach-router";
import { useDispatch } from 'react-redux';
import 'antd/dist/reset.css';
import H2GLoginPage from './login';
import H2GAdminPage from './admin';
import Hands2GetherSite from './site';
import { useSelector } from 'react-redux';
import { getCategories } from './api/categories';
import { updateCategories } from './store/reducers/categories';

import { getLocation } from './api/location';
import { updateGeolocation } from './store/reducers/auth';

const App = (props) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const user = useSelector(state => state.user)

    useEffect(() => {
        getCategories().then((categories) =>dispatch(updateCategories(categories)));
        getLocation().then((location) => dispatch(updateGeolocation(location)));
    }, []);



    return (
        <Router>
            <Hands2GetherSite path="/" user={user} />
            <H2GLoginPage path="/login/*" />
            <H2GAdminPage path="/admin/*" />
        </Router>

    )
}

export default App