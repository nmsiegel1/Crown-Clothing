import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { LogoContainer, NavigationContainer, NavLink, NavLinks,  } from "./navigation.styles"
import { selectCurrentUser } from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

const NavBar = () => {
	const currentUser = useSelector(selectCurrentUser)
	const isCartOpen = useSelector(selectIsCartOpen)

	return (
		<>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrwnLogo className="logo"/>
				</LogoContainer>
				<NavLinks>
					<NavLink to='/shop'>
						SHOP
					</NavLink>
					{
						currentUser ? (
							<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
					 ) : ( <NavLink to='/auth'>
						SIGN IN
					</NavLink>
						)
					}
					<CartIcon />
				</NavLinks>
					{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</>
	)
}

export default NavBar