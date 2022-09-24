import React from 'react';
import SignIn from './SignIn';

import { auth } from "../firebase/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import LogOut from './LogOut';
const style = {
	nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
	heading: `text-white text-3xl`,
};
const Navbar = () => {
	const [user] = useAuthState(auth);
	console.log(user);
	return (
		<div className={style.nav}>
			<h1 className={style.heading}>Chat App</h1>
			      {user ? <LogOut /> : <SignIn />}

		</div>
	);
};

export default Navbar;
