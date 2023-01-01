import { useState } from "react"

import { createUserDocumentFromAuth, signInWithGooglePopup, signAuthUserInWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.componet";
import './sign-in.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
	email: '',
	password: '',
}

const SignIn = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password,} = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup()
		await createUserDocumentFromAuth(user)
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await signAuthUserInWithEmailAndPassword(email, password)
			console.log(response)
			resetFormFields()

		} catch (error) {
			switch(error.code) {
				case 'auth/wrong-password':
					alert('Incorrect password, please try again')
					break;
				case 'auth/user-not-found':
					alert('No user associated with this email')
					break;
				default:
					console.log(error)
			}
		}
	}

	const handleChange = (event) => {
		const { name, value} = event.target

		setFormFields({ ...formFields, [name]: value})
	}

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
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
				<div className="buttons-container">
				<Button type="submit">Sign In</Button>
				<Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
				</div>
			</form>
		</div>
	)
}

export default SignIn