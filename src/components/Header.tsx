
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1>Super Kanban</h1>

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/todo">Todo</NavLink>
                <NavLink to="/doing">Doing</NavLink>
                <NavLink to="/done">Done</NavLink>
            </nav>
        </header>
    );
}
