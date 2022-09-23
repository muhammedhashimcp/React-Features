import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/authContext'


const Account = () => {
const navigate= useNavigate()
	const { user, logout } = UserAuth()
	const handleSignOut =async () => {
		try {
			await logout()
			navigate('/')
			console.log("You are logged out");
		} catch (error) {
			console.log(error);
		}
	}
  return (
		<div className="w-[300px] m-auto">
			<h1 className="text-center text-2xl font-bold pt-12">Account</h1>
			<div>
			  <p>Welcome ,{ user?.email}</p>
			</div>
			<button onClick={handleSignOut} className="border py-2 px-5 mt-18">
				Logout
			</button>
		</div>
  );
}

export default Account
