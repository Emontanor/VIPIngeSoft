import { Link, useNavigate } from "react-router-dom";
import { rolePermissions } from "./logicas/role_management";

const Header = ({ role = "user" ,view }) => {

    const navigate = useNavigate();
    const handleSignOut = () => {
    navigate("/");
    };

    const getButtonClass = (name) => {
    return `header-btn ${view === name ? "active" : ""}`;
    };

    const permissions = rolePermissions[role]?.canAcces || [];

    return (
        <header className="report-header go-front">
            <div className="header-buttons">
                { permissions.includes("statitics") && (
                    <Link to="/statistics">
                        <button className="header-btn"
                        disabled={view === "statistics"}
                        >See the statistics</button>
                    </Link>
                )}   
                { permissions.includes("report") && (    
                    <Link to="/report">
                        <button className="header-btn"
                        disabled={view === "report"}
                        >Make a report</button>
                    </Link>
                )}
                { permissions.includes("map") && (
                    <Link to = "/map">
                        <button className="header-btn"
                        disabled={view === "map"}
                        >See the map</button>
                    </Link>
                )}
                <button className="header-btn" onClick={handleSignOut} disabled = {false}>
                    Sign Out
                </button>

            </div>
            <div className="logo-wrapper">
                <span className="logo">CACVi-UN</span>
            </div>
        </header>
    );
}

export default Header;