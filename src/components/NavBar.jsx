import { FaTwitter, FaHome, FaBell, FaSearch, FaEnvelope, FaBookmark, FaBriefcase, FaUsers, FaUser , FaEllipsisH, FaFeatherAlt, FaMoon, FaSun } from "react-icons/fa";
import "../stylesheets/NavBar.css";
import { Link } from "react-router-dom";
import { useContextOfTheme } from "./ThemeContext";
import { useContext } from "react";

export const NavBar = ()=> {

    const { dark, setDark } = useContextOfTheme();

    return(
        <nav className="nav">
            <div className="nav__general-container">
                <ul className="nav__list">
                    <li className="nav__item">
                        <FaTwitter className="nav-icon twitter-icon"/>
                    </li>
                    <li className="nav__item">
                        <Link to="/" className="link"> <FaHome  className="nav-icon"/> </Link>
                    </li>
                    <li className="nav__item">
                        <FaBell className="nav-icon"/>
                    </li>
                    <li className="nav__item">
                        <FaSearch className="nav-icon"/>
                    </li>
                    <li className="nav__item">
                        <FaEnvelope className="nav-icon"/>
                    </li>
                    <li className="nav__item">
                        <FaBookmark className="nav-icon"/>
                    </li>
                    <li className="nav__item">
                        <FaBriefcase className="nav-icon"/>
                    </li>
                    <li className="nav__item">
                        <FaUsers className="nav-icon"/>
                    </li>
                    {
                        dark  ? (
                        <li className="nav__item"onClick={()=> setDark(!dark)}>
                            <FaMoon className="nav-icon"/>
                        </li>
                        ) : (
                        <li className="nav__item"onClick={()=> setDark(!dark)}>
                            <FaSun className="nav-icon"/>
                        </li>
                        )
 
                    }
                    <li className="nav__item">
                        <FaUser className="nav-icon"/>
                    </li>
                    <li className="nav__item">
                        <FaEllipsisH className="nav-icon"/>
                    </li>
                    <li className="nav__item post-icon">
                        <Link to="/post"><FaFeatherAlt className="nav-icon" id="postIcon"/></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}