import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
	// find if cart items contain productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	// if found increment quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
			? { ...cartItem, quantity: cartItem.quantity + 1 }
			: cartItem
		);
	}
	// return new array with modified cart items/new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
	// find cart item to remove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);
	// check if quantity is equal to 1, then remove item from cart
	if(existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
	}
	// if it isnt, return back cart items with reduced quanity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
		);
	}
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0

})

export const CartProvider = ({children}) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartIetms] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [cartTotal, setCartTotal] = useState(0)

	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
		setCartCount(newCartCount)
	}, [cartItems])

	useEffect(() => {
		const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
		setCartTotal(newCartTotal)
	}, [cartItems])

	const addItemToCart = (productToAdd) => {
		setCartIetms(addCartItem(cartItems, productToAdd))
	}

	const removeItemFromCart = (cartItemToRemove) => {
		setCartIetms(removeCartItem(cartItems, cartItemToRemove))
	}

	const clearItemFromCart = (cartItemToClear) => {
		setCartIetms(clearCartItem(cartItems, cartItemToClear))
	}

	const value = {isCartOpen, setIsCartOpen, removeItemFromCart, clearItemFromCart, addItemToCart, cartItems, cartCount, cartTotal}
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}