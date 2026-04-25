import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          🩺 MedAI
        </Link>

        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/brain-tumor" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Brain Tumor
          </NavLink>
          <NavLink to="/skin-cancer" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Skin Cancer
          </NavLink>
          <NavLink to="/pneumonia" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Pneumonia
          </NavLink>
          <NavLink to="/symptoms" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Symptoms
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar