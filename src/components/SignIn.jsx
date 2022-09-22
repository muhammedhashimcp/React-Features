import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/authContext';

const SignIn = () => {
	const navigate = useNavigate();
	const { googleSignIn, user } = UserAuth();
	const handleGoogleSignIn = async () => {
		try {
			console.log(
				'🚀 ~ file: SignIn.jsx ~ line 15 ~ handleGoogleSignIn ~ handleGoogleSignIn '
			);
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (user != null) {
			navigate('/account');
		}
	}, [user]);
	return (
		<div>
			<h1 className="text-center text-3xl font-bold py-8">Sign in</h1>
			<div className="max-w-[240px] m-auto py-4">
				<GoogleButton onClick={handleGoogleSignIn} />
			</div>
		</div>
	);
};

export default SignIn;
