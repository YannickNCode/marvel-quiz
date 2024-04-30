import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, user } from '../Firebase/firebaseConfig';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = () => {
	const navigate = useNavigate();
	const [userSession, setUserSession] = useState(null);
	const [userData, setUserData] = useState({});

	useEffect(() => {
		const listener = onAuthStateChanged(auth, (user) => {
			user ? setUserSession(user) : navigate('/');
		});

		if (!!userSession) {
			const colRef = user(userSession.uid);
			getDoc(colRef)
				.then((snapshot) => {
					if (snapshot.exists()) {
						const docData = snapshot.data();
						setUserData(docData);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}

		return listener();
	}, [userSession]);

	return userSession === null ? (
		<>
			<div className="loader"></div>
			<p className="loaderText">Loading ...</p>
		</>
	) : (
		<div className="quiz-bg">
			<div className="container">
				<Logout />
				<Quiz userData={userData} />
			</div>
		</div>
	);
};

export default Welcome;
