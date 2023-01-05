import { useState } from "react"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.componet";

import './sign-up.styles.scss'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

const SignUp = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword} = formFields


	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}
	const handleSubmit = async (event) => {
		event.preventDefault();

		if(password !== confirmPassword) {
			alert("passwords do not match")
			return
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);

			await createUserDocumentFromAuth(user, { displayName })
			resetFormFields()

		} catch (error) {
			if(error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use')
			} else {
			console.log("user creation encountered an error", error)
			}
		}
	}

	const handleChange = (event) => {
		const { name, value} = event.target

		setFormFields({ ...formFields, [name]: value})
	}

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="displayName"
					name="displayName"
					onChange={handleChange}
					required
					type='text'
					value={displayName}
				/>
				<FormInput
					label="email"
					name="email"
					onChange={handleChange}
					required
					type="email"
					value={email}
				/>
				<FormInput
					label="password"
					name="password"
					onChange={handleChange}
					required
					type="password"
					value={password}
				/>
				<FormInput
					label="confirmPassword"
					name="confirmPassword"
					onChange={handleChange}
					required
					type="password"
					value={confirmPassword}
				/>
				<Button type="submit">Sign up</Button>
			</form>
		</div>
	)
}

export default SignUp