import React, { useEffect } from 'react';
import { Router } from "@gatsbyjs/reach-router";
import { useDispatch } from 'react-redux';
import 'antd/dist/reset.css';
import H2GLoginPage from './login';
import H2GAdminPage from './admin';
import Hands2GetherSite from './site';

const App = (props) => {
    const dispatch = useDispatch();
    return (
        <Router>
            <Hands2GetherSite path="/" />
            <H2GLoginPage path="/login/*" />
            <H2GAdminPage path="/admin/*" />
        </Router>

    )
}

export default App