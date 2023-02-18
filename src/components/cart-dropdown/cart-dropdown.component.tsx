import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import Button from '../button/button.component'
import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import CartItem from '../cart-item/cart-item.component'

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()

  const closeCart = () => dispatch(setIsCartOpen(false))

	const goToCheckoutHandler = () => {
    navigate('/checkout')
    closeCart()
	}

	return (
	  <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
	)

}

export default CartDropdown