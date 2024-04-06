import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebaseConfig';

const Logout = () => {
	const navigate = useNavigate();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (checked) {
			signOut(auth)
				.then(() => {
					navigate('/');
				}, 1000)
				.catch((error) => {});
		}
	}, [checked, navigate]);

	const handleChange = (e) => {
		setChecked(e.target.checked);
	};

	return (
		<div className="logoutContainer">
			<label className="switch">
				<input onChange={handleChange} type="checkbox" checked={checked} />
				<span className="slider round"></span>
			</label>
		</div>
	);
};

export default Logout;
