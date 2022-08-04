import React from "react";
import { useGlobalContext } from "../Auths/Context";
import { useAuthValue } from '../Auths/Auth';
import { signOut } from 'firebase/auth';
import { auth } from '../Auths/Firebase';

const SetupForm = () => {
  const { currentUser } = useAuthValue();
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h4>Hello {currentUser?.email}</h4>
          <br></br>
          <h3>Setup Quiz</h3>
          {/* {amount} */}
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          {/* {category} */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="comics">Comics</option>
              <option value="history">History</option>
              <option value="politics">Politics</option>
            </select>
          </div>
          {/* {difficulty} */}
          <div className="form-control">
            <label htmlFor="difficulty">Select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button type="submit" onClick={handleSubmit} className="submit-btn">
            start
          </button>
          <button className="submit-btn" onClick={() => signOut(auth)}>
            log out
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
