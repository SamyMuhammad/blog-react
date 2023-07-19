import { useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import ApiConfig from "../Services/ApiConfig";

export const useAuth = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ signedIn: false, user: null, token: '' });
    const { setAuthData } = useContext(AuthContext);

    useEffect(() => {
        setAuthData(userData);
    }, [userData.signedIn]);

    function getAuthCookieExpiration() {
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));  // 7 days
        return date;
    }

    function setAsLogged(data) {
        const cookie = new Cookies();
        cookie.set('auth_token', data.token, { path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false });
        setUserData({ signedIn: true, user: data.user, token: data.token });
        setAuthData({ signedIn: true, user: data.user, token: data.token });

        axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;

        navigate('/');
    }

    function setLogout() {
        const cookie = new Cookies();
        cookie.remove('auth_token', { path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false });
        setUserData({ signedIn: false, user: null, token: '' });
        navigate(0);
    }

    function loginUserOnStartup() {
        const cookie = new Cookies();
        if (cookie.get('auth_token')) {
            ApiConfig.getUser().then(response => {
                setUserData({ signedIn: true, user: response.data.data, token: userData.token });
            }).catch(error => {
                setUserData({ signedIn: false, user: null, token: '' });
                setLogout();
            });
        } else {
            setUserData({ signedIn: false, user: null, token: '' });
        }
    }

    return {
        userData,
        setAsLogged,
        setLogout,
        loginUserOnStartup
    }
};