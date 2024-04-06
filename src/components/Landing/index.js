import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	const [btn, setBtn] = useState(false);

	const refWolverine = useRef(null);

	useEffect(() => {
		refWolverine.current.classList.add('startingImg');

		setTimeout(() => {
			refWolverine.current.classList.remove('startingImg');
			setBtn(true);
		}, 1000);
	}, []);

	const addClass = (className) => {
		refWolverine.current.classList.add(className);
	};

	const removeClass = (className) => {
		refWolverine.current.classList.remove(className);
	};

	const handleMouseOver = (className) => {
		addClass(className);
	};

	const handleMouseOut = () => {
		removeClass('leftImg');
		removeClass('rightImg');
	};

	const displayBtn = btn && (
		<>
			<div
				onMouseOver={() => handleMouseOver('leftImg')}
				onMouseOut={handleMouseOut}
				className="leftBox"
			>
				<Link to="/signup" className="btn-welcome">
					Inscription
				</Link>
			</div>
			<div
				onMouseOver={() => handleMouseOver('rightImg')}
				onMouseOut={handleMouseOut}
				className="rightBox"
			>
				<Link to="/login" className="btn-welcome">
					Connexion
				</Link>
			</div>
		</>
	);

	return (
		<main ref={refWolverine} className="welcomePage">
			{displayBtn}
		</main>
	);
};

export default Landing;
