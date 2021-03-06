import { AppBar, Toolbar, Typography, makeStyles, Button,} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const headersData = [
    {
        label: "Analyze",
        href: "/",
    },
    {
        label: "Trending",
        href: "/trending",
    },
    {
        label: "Profile",
        href: localStorage.getItem('token') ? "/me" : "/login",
    },
    {
        label: "Contact Us",
        href: "/contact",
    },
    ];

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#400CCC",
        paddingRight: "79px",
        paddingLeft: "118px",
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
}));

function Header() {
    const { header, logo, menuButton } = useStyles();

    const logout = () => {
        localStorage.removeItem('token')
        window.location.href = "/"
    }

    const displayDesktop = () => {
        return (
            <Toolbar>
                {main_logo}
                <div>{getMenuButtons()}</div>
                {
                    (localStorage.getItem('token') ?
                        <Button onClick={logout}
                            {...
                                {
                                    key: "Logout",
                                    color: "inherit",
                                    to: "logout",
                                    component: RouterLink,
                                    className: menuButton,
                                }}
                        >Log out</Button>
                        :
                        <Button
                            {...
                                {
                                    key: "Login",
                                    color: "inherit",
                                    to: "login",
                                    component: RouterLink,
                                    className: menuButton,
                                }}
                        >Log in</Button>)
                }
            </Toolbar>
        );
    };

    const main_logo = (
        <Typography variant="h6" component="h1" className={logo}>
            Hashtag Analyzer
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                        className: menuButton,
                    }}
                >
                    {label}
                </Button>
            );
        });
    };

    return (
        <header>
            <AppBar className={header}>{displayDesktop()}</AppBar>
        </header>
    );
}

export default Header;