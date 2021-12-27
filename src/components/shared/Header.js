import { AppBar, Toolbar, Typography, makeStyles, Button,} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import GLogin from "../login/GLogin";
import GLogout from "../login/GLogout";

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
        href: "/me",
    },
    {
        label: "Contact Us",
        href: "/contact",
    },
    {
        label: "Log out",
        href: "/logout"
    }
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

    const displayDesktop = () => {
        return (
            <Toolbar>
                {main_logo}
                <div>{getMenuButtons()}</div>
                <GLogin/>
                <GLogout/>
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