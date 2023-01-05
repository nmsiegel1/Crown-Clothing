import { useState} from "react"

import { signInWithGooglePopup, signAuthUserInWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.componet";

import './sign-in.styles.scss'

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
		await signInWithGooglePopup()

	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signAuthUserInWithEmailAndPassword(email, password)
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