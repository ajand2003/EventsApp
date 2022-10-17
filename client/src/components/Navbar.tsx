
import {NavLink} from 'react-router-dom';
function Navbar() {
  return (
    <header>
        <nav className='navbar'>
        <div className="navbar__container">
            <div className="navbar__toggle" id="mobile-menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className="navbar__menu">
              <li className="navbar__item">
              <NavLink
                    className={(navData) => (navData.isActive ? 'active' : 'navbar__links')}
                    to="/"> 
                Home
              </NavLink>
              </li>
              <li className="navbar__item">
              <NavLink
                    className={(navData) => (navData.isActive ? 'active' : 'navbar__links')}
                    to="/calendar"> 
                Calendar
              </NavLink>
              </li>
              <li className="navbar__item">
              <NavLink
                    className={(navData) => (navData.isActive ? 'active' : 'navbar__links')}
                    to="/map"> 
                Map
              </NavLink>
              </li>
          </ul>
        </div>
    </nav>
    </header>
  )
}

export default Navbar