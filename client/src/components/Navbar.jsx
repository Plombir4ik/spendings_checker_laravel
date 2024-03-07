import React, {useContext, useEffect} from "react"
import {NavLink, useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
import M from "materialize-css/dist/js/materialize.min.js";
import MenuIcon from "@material-ui/icons/Menu";


export const Navbar = () => {
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
                <label class="brand-logo" style={{opacity: touched ? 0.5 : 1, transition: 'opacity 300ms ease', cursor: "pointer"}}
                       onClick={() => navigate("/categories")}
                       onMouseDown={() => touchedSet(true)}
                       onMouseUp={() => touchedSet(false)}
                >
                    Spendings-checker
                </label>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to="/categories" style={{fontSize: "20px", marginRight : '5px'}}>Категорії</NavLink></li>
                    <li><NavLink to="/transactions" style={{fontSize: "20px", marginRight : '5px'}}>Транзакції</NavLink></li>
                    <li><NavLink to="/reports" style={{fontSize: "20px", marginRight : '5px'}}>Звіти</NavLink></li>
                    <li><a href="/" onClick={logout} style={{fontSize: "20px", marginRight : '5px'}}>Вийти</a></li>
                </ul>
            </div>

            <ul className="sidenav" id="mobile-nav">
                <li>
                    <NavLink to="/categories" style={{fontSize: "20px", marginTop : '5px'}} onClick={() => M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>
                        Категорії
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/transactions" style={{fontSize: "20px", marginTop : '5px'}} onClick={() => M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>
                        Транзакції
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/reports" style={{fontSize: "20px", marginTop : '5px'}} onClick={() => M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>
                        Звіти
                    </NavLink>
                </li>
                <li>
                    <a href="/" style={{fontSize: "20px", marginTop : '5px'}} onClick={() => {M.Sidenav.getInstance(document.querySelector('.sidenav')).close(); logout();}}>
                        Вийти
                    </a>
                </li>
            </ul>
        </nav>
    )
}