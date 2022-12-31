import { Link, Outlet } from "react-router-dom"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import './navigation.styles.scss'

const NavBar = () => {
	return (
		<>
			<div className="navigation">
				<Link className="logo-container" to='/'>
					<CrwnLogo className="logo"/>
				</Link>
				<div className="links-container">
					<Link className="nav-links-container" to='/shop'>
						SHOP
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	)
}

export default NavBar