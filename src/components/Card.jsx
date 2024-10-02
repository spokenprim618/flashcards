import React, { useState } from 'react';

export default function Card() {
    const questions = [
        "Was Optimus a librarian?",
        "Who is the leader of the Autobots?",
        "What is the name of the Decepticon second-in-command who transforms into a jet?",
        "Which Autobot is known for transforming into a yellow Chevrolet Camaro?",
        "What is the name of the Autobot medic who transforms into an ambulance?"
    ];
    const answers = [
        "yes",
        "Optimus Prime",
        "Starscream",
        "Bumblebee",
        "Ratchet"
    ];
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [participantAnswer, setParticipantAnswer] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [animationDirection, setAnimationDirection] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [visibilityCorrect, setVisibilityCorrect] = useState("hidden");
    const [visibilityFalse, setVisibilityFalse] = useState("hidden");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (participantAnswer.toLowerCase() === answers[currentQuestionIndex].toLowerCase()) {
            setIsAnswerCorrect(true);
        } if(participantAnswer.toLowerCase() != answers[currentQuestionIndex].toLowerCase()) {
            setIsAnswerCorrect(false);
        }
       if (isAnswerCorrect==true){
        setIsFlipped(true); // Flip the card after submitting
        setShowResult(true); // Show result immediately after submit
        setVisibilityCorrect("visible")
       }if(isAnswerCorrect==false){
        setIsFlipped(true); // Flip the card after submitting
        setShowResult(true); // Show result immediately after submit
        setVisibilityFalse("visible")
       }

    
    };

    const handleNext = () => {
        if(isFlipped==false){
            setAnimationDirection("swipe-next-front");
            console.log("jkhr")
        }else if(isFlipped==true){
            setAnimationDirection('swipe-next-back'); // Set animation direction for swipe animation
            console.log("jkhr")
        }
        setTimeout(() => {
            const newIndex = currentQuestionIndex + 1;
        if (newIndex < questions.length) {
            setCurrentQuestionIndex(newIndex);
            setParticipantAnswer('');
            setIsAnswerCorrect(null);
            setVisibilityFalse("hidden");
            setVisibilityCorrect("hidden");
            setTimeout(() => {
                setIsFlipped(false)
                setAnimationDirection(null); // Reset animation direction after delay
            }, 300); // Reset after 0.6 seconds (600 milliseconds)
        }
        }, 500);
        
    };

    const handlePrevious = () => {
        if(isFlipped==false){
            setAnimationDirection("swipe-previous-front")
            console.log("jkhr")
        }else if(isFlipped==true){
            setAnimationDirection('swipe-previous-back'); // Set animation direction for swipe animat
            console.log("jkhr")
        }
        setTimeout(() => {
            const newIndex = currentQuestionIndex - 1;
        if (newIndex >= 0) {
            setCurrentQuestionIndex(newIndex);
            setParticipantAnswer('');
            setIsAnswerCorrect(null);
            setVisibilityFalse("hidden");
            setVisibilityCorrect("hidden");
            setTimeout(() => {
                setIsFlipped(false)
                setAnimationDirection(null); // Reset animation direction after delay
            }, 300); // Reset after 0.6 seconds (600 milliseconds)
        }
        }, 500);
        
    };

    const tryAgain = () =>{
        setIsFlipped(false)
       
    }

    return (
        <div className='quiz-container'>
            <div className={`quiz-card ${animationDirection}`}>
                <div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
                    <div className='front'>
                        <h1>{questions[currentQuestionIndex]}</h1>
                        <form className='form' onSubmit={handleSubmit}>
                            <label htmlFor="answer">Your answer:</label>
                            <input
                                type="text"
                                id="answer"
                                name="answer"
                                value={participantAnswer}
                                onChange={(e) => setParticipantAnswer(e.target.value)}
                            />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div className={`back ${showResult ? 'show-result' : ''}`}>
                    <div className="correct" style={{visibility:`${visibilityCorrect}`}}>
                        <h1> You are correct</h1>
                        <h1>{answers[currentQuestionIndex]}</h1>
                            </div>
                    <div className='incorrect' style={{visibility:`${visibilityFalse}`}}>
                        <h1>You are incorrect. </h1>
                        <button className={`again ${isFlipped ? 'is-flipped' : ''}`} onClick={tryAgain}> Try again</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="navigation">
                <button className="prev" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
                <div className="radio-buttons">
                    {questions.map((_, index) => (
                        <input
                            key={index}
                            type="radio"
                            name="question"
                            checked={currentQuestionIndex === index}
                            onChange={() => setCurrentQuestionIndex(index)}
                        />
                    ))}
                </div>
                <button className="next" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
            </div>
        </div>
    );
}

      {/*
      break this down further like cards will be its own
      this will have cards 
      the cards will flip top bottom
      cards will have a swipe animation
      cards will go forwards and back
      cards will have input for the persons answer
      the input will need to handle correct or incorrect
      the css will change whether you got the question wrong or right on the answer side of cards
      a reward confetti thing would be fun
      it will be about transformers
      the error would have to be a prop where it will dynamically give whether true or false and then style 
      accordingly*/}
