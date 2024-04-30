import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';
import { QuizMarvel } from '../quizMarvel';

toast.configure();

class Quiz extends Component {
	state = {
		levelNames: ['debutant', 'confirme', 'expert'],
		quizLevel: 0,
		maxQuestions: 10,
		storedQuestions: [],
		question: null,
		options: [],
		idQuestion: 0,
		btnDisabled: true,
		userAnswer: null,
		score: 0,
		showWelcomeMsg: false,
		quizEnd: false,
	};

	storedDataRef = React.createRef();

	loadQuestions = (level) => {
		const fetchedArrayQuiz = QuizMarvel[0].quizz['debutant'];
		if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
			this.storedDataRef.current = fetchedArrayQuiz;

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

	showWelcomeMsg = (pseudo) => {
		if (!this.state.showWelcomeMsg) {
			this.setState({
				showWelcomeMsg: true,
			});

			toast.warn(`Bienvenue ${pseudo}`, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
			});
		}
	};

	componentDidMount() {
		this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
	}

	nextQuestion = () => {
		if (this.state.idQuestion === this.state.maxQuestions - 1) {
			this.gameOver();
		} else {
			this.setState((prevState) => ({
				idQuestion: prevState.idQuestion + 1,
			}));
		}

		const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

		if (this.state.userAnswer === goodAnswer) {
			this.setState((prevState) => ({
				score: prevState.score + 1,
			}));

			toast.success('Bravo, bonne réponse', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				bodyClassName: 'toastify-color',
			});
		} else {
			toast.error('Dommage, mauvaise réponse', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				bodyClassName: 'toastify-color',
			});
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.storedQuestions !== prevState.storedQuestions) {
			this.setState({
				question: this.state.storedQuestions[this.state.idQuestion].question,
				option: this.state.storedQuestions[this.state.idQuestion].option,
			});
		}

		if (this.state.idQuestion !== prevState.idQuestion) {
			this.setState({
				question: this.state.storedQuestions[this.state.idQuestion].question,
				option: this.state.storedQuestions[this.state.idQuestion].option,
				userAnswer: null,
				btnDisabled: true,
			});
		}

		if (this.props.userData.pseudo) {
			this.showWelcomeMsg(this.props.userData.pseudo);
		}
	}

	submitAnswer = (selectedAnswer) => {
		this.setState({
			userAnswer: selectedAnswer,
			btnDisabled: false,
		});
	};

	gameOver = () => {
		this.setState({
			quizEnd: true,
		});
	};

	render() {
		const displayOptions = this.state.options.map((option, index) => {
			return (
				<p
					key={index}
					onClick={() => this.submitAnswer(option)}
					className={`answerOptions ${
						this.state.userAnswer === option ? 'selected' : null
					}`}
				>
					{option}
				</p>
			);
		});

		return this.state.quizEnd ? (
			<QuizOver />
		) : (
			<>
				<Levels />
				<ProgressBar
					idQuestion={this.state.idQuestion}
					maxQuestions={this.state.maxQuestions}
				/>

				<h2>{this.state.question}</h2>

				{displayOptions}

				<button
					className="btnSubmit"
					disabled={this.state.btnDisabled}
					onClick={this.nextQuestion}
				>
					{this.state.idQuestion < this.state.maxQuestions - 1
						? 'Suivant'
						: 'Terminer'}
				</button>
			</>
		);
	}
}

export default Quiz;
