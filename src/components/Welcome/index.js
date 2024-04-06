import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebaseConfig';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [userSession, setUserSession] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserSession(user);
				setLoading(false);
			} else {
				navigate('/');
			}
		});

		return () => {
			unsubscribe();
		};
	}, [navigate]);

	return loading ? (
		<div className="loader-container">
			<div className="loader"></div>
			<p className="loaderText">Loading ...</p>
		</div>
	) : (
		<div className="quizz-bg">
			<div className="container">
				<Logout />
				<Quiz />
			</div>
		</div>
	);
};

export default Welcome;
