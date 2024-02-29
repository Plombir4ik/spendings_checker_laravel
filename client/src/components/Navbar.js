import React, {useContext, useEffect} from "react"
import {NavLink, useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
import M from "materialize-css/dist/js/materialize.min.js";
import MenuIcon from "@material-ui/icons/Menu";


export const NavBar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logout = event => {
        auth.logout()
    }

    useEffect(() => {
        const sidenav = document.querySelector(".sidenav");
        M.Sidenav.init(sidenav, {});
    }, []);

    const [touched, touchedSet] = React.useState(false)

    return (
        <nav>
            <div class="nav-wrapper indigo darken-1" style={{padding: "0 2rem"}}>
                <a href="#" data-target="mobile-nav" className="sidenav-trigger">
                    <MenuIcon fontSize="large" style={{marginTop : '17px'}} />
                </a>
                <label class="brand-logo" style={{opacity: touched ? 0.5 : 1, transition: 'opacity 300ms ease'}}
                       onClick={() => navigate("/categories")}
                       onMouseDown={() => touchedSet(true)}
                       onMouseUp={() => touchedSet(false)}
                >
                    Spendings-checker
                </label>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to="/categories">Categories</NavLink></li>
                    <li><NavLink to="/transactions">Transactions</NavLink></li>
                    <li><NavLink to="/reports">Reports</NavLink></li>
                    <li><a href="/" onClick={logout}>Logout</a></li>
                </ul>
            </div>

            <ul className="sidenav" id="mobile-nav">
                <li>
                    <NavLink to="/categories" onClick={() => M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>
                        Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/transactions" onClick={() => M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>
                        Transactions
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/reports" onClick={() => M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>
                        Reports
                    </NavLink>
                </li>
                <li>
                    <a href="/" onClick={() => {M.Sidenav.getInstance(document.querySelector('.sidenav')).close(); logout();}}>
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    )
}