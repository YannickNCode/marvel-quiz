import React, { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';

class Quiz extends Component {
	state = {
		levelNames: ['debutant', 'confirme', 'expert'],
		quizLevel: 0,
		maxQuestions: 10,
		storedQuestions: [],
		question: null,
		options: [],
		idQuestion: 0,
	};

	loadQuestions = (level) => {
		const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
		if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
			const newArray = fetchedArrayQuiz.map(
				({ answer, ...keepRest }) => keepRest
			);

			this.setState({
				storedQuestions: newArray,
			});
		} else {
			console.log('Pas assez de question');
		}
	};

	componentDidMount() {
		this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.storedQuestions !== prevState.storedQuestions) {
			this.setState({
				question: this.state.storedQuestions[this.state.idQuestion].question,
				option: this.state.storedQuestions[this.state.idQuestion].option,
			});
		}
	}

	render() {
		const displayOptions = this.state.options.map((option, index) => {
			return (
				<p key={index} className="answerOptions">
					{option}
				</p>
			);
		});

		return (
			<div>
				<Levels />
				<ProgressBar />
				<h2>{this.state.question}</h2>
				{displayOptions}
				<button className="btnSubmit">Suivant</button>
			</div>
		);
	}
}

export default Quiz;
