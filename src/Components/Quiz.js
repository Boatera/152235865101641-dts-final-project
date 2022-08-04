import React from "react";
import { useAuthValue } from '../Auths/Auth';
import { useGlobalContext } from "../Auths/Context";
import { signOut } from 'firebase/auth';
import { auth } from '../Auths/Firebase';
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";

const Quiz = () => {
    const { currentUser } = useAuthValue();
    const {
        waiting,
        loading,
        questions,
        index,
        correct,
        home,
        checkAnswer,
    } = useGlobalContext();
    if (waiting) {
        return <SetupForm />;
    }
    if (loading) {
        return <Loading />;
    }
    const { question, incorrect_answers, correct_answer } = questions[index];

    let answers = [...incorrect_answers];
    const tempIndex = Math.floor(Math.random() * 4);
    if (tempIndex === 3) {
        answers.push(correct_answer);
    } else {
        answers.push(answers[tempIndex]);
        answers[tempIndex] = correct_answer;
    }

    return (
        <main>
            <Modal />
            <section className="quiz">
                <div className="p-group">
                    <p className="uname">
                        {currentUser?.email}
                    </p>
                    <p className="correct-answers">
                        correct answers:{correct}/{index}
                    </p>
                </div>
                <article className="container">
                    <h2 dangerouslySetInnerHTML={{ __html: question }} />
                    <div className="btn-container">
                        {answers.map((answer, index) => {
                            return (
                                <button
                                    key={index}
                                    className="answer-btn"
                                    onClick={() => {
                                        checkAnswer(correct_answer === answer);
                                    }}
                                    dangerouslySetInnerHTML={{ __html: answer }}
                                />
                            );
                        })}
                    </div>
                </article>
                <div className="btn-group">
                    <button className="home-btn" onClick={home}>
                        home
                    </button>
                    <button className="logout-btn" onClick={() => signOut(auth)}>
                        log out
                    </button>
                </div>
            </section>
        </main>
    )
}

export default Quiz;
