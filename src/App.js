import { Route, Routes } from 'react-router-dom';
import Account from './components/Account';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import { AuthContextProvider } from './authContext/AuthContext';

function App() {
	return (
		<div>
			<h1 className="text-3xl ml-5 text-pink-700 font-bold underline">
				Firebase Auth & Context 
			</h1>
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					{/* <Route path="/" element={<Home />} /> */}
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route
						path="/account"
						element={
							<Protected>
								<Account />
							</Protected>
						}
					/>
				</Routes>
			</AuthContextProvider>
		</div>
	);
}

export default App;


// https://youtu.be/cZAnibwI9u8