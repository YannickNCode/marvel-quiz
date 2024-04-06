import '../../App.css';
import ErrorPage from '../ErrorPage';
import Footer from '../Footer';
import ForgetPassword from '../ForgetPassword';
import Header from '../Header';
import Landing from '../Landing';
import Login from '../Login';
import Signup from '../Signup';
import Welcome from '../Welcome';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Header />

			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/forgetpassword" element={<ForgetPassword />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>

			<Footer />
		</Router>
	);
}

export default App;
