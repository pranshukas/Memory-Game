import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
    { src: "/images/helmet-1.png", matched: false },
    { src: "/images/potion-1.png", matched: false },
    { src: "/images/ring-1.png", matched: false },
    { src: "/images/scroll-1.png", matched: false },
    { src: "/images/shield-1.png", matched: false },
    { src: "/images/sword-1.png", matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);

    // Shuffle Cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCards);
        setTurns(0);
    };

    // handle choices
    const handleChoice = (card) => {
        choiceOne ? setChoiceOne(card) : setChoiceTwo(card);
    };

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCard) => {
                    return prevCard.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                resetTurn();
            }
        }
    }, [choiceOne, choiceTwo]);

    // Reset Choices and increment Turn
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurn) => prevTurn + 1);
    };

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
                ))}
            </div>
        </div>
    );
}

export default App;
