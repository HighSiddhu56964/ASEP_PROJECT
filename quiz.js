window.onload = function() {
    // Quiz Data (Finance Questions)
    const quizData = [
        {
            question: "What is the best way to build an emergency fund?",
            options: ["Save leftovers from income", "Deposit a fixed amount monthly", "Use credit cards", "Wait for a bonus"],
            answer: 1
        },
        {
            question: "Which expense should be prioritized first?",
            options: ["Netflix Subscription", "Groceries", "New Smartphone", "Designer Clothes"],
            answer: 1
        },
        {
            question: "What is a good savings rule?",
            options: ["Spend first, save later", "Save at least 20% of income", "Only save when there's extra", "Save after paying all debts"],
            answer: 1
        },
        {
            question: "What does a credit score measure?",
            options: ["Income level", "Spending habits", "Loan repayment history", "Bank balance"],
            answer: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    // DOM Elements
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const scoreBox = document.getElementById("score-box");
    const scoreEl = document.getElementById("score");
    const quizBox = document.getElementById("quiz-box");

    // Load Question
    function loadQuestion() {
        if (currentQuestion >= quizData.length) {
            showScore();
            return;
        }

        const currentQuiz = quizData[currentQuestion];
        questionEl.textContent = currentQuiz.question;
        
        optionsEl.innerHTML = "";
        currentQuiz.options.forEach((option, index) => {
            const optionEl = document.createElement("div");
            optionEl.classList.add("option");
            optionEl.textContent = option;
            optionEl.onclick = () => checkAnswer(index, optionEl);
            optionsEl.appendChild(optionEl);
        });

        nextBtn.style.display = "none"; // Hide Next button
    }

    // Check Answer
    function checkAnswer(selectedIndex, optionEl) {
        const correctIndex = quizData[currentQuestion].answer;

        if (selectedIndex === correctIndex) {
            score++;
            optionEl.style.backgroundColor = "#4caf50"; // Green for correct
        } else {
            optionEl.style.backgroundColor = "#e74c3c"; // Red for wrong
        }

        // Disable all options after selection
        const allOptions = document.querySelectorAll(".option");
        allOptions.forEach(option => option.style.pointerEvents = "none");

        nextBtn.style.display = "block"; // Show Next button
    }

    // Next Question
    nextBtn.addEventListener("click", () => {
        currentQuestion++;
        loadQuestion();
    });

    // Show Score
    function showScore() {
        quizBox.style.display = "none";
        scoreBox.style.display = "block";
        scoreEl.textContent = `You scored ${score} / ${quizData.length}`;
        
        if (score > quizData.length / 2) {
            celebrate();
        }
    }

    // Confetti Celebration Effect
    function celebrate() {
        const confettiCount = 100;
        const confettiColors = ["#ff0", "#ff4500", "#00ff00", "#00ffff", "#ff00ff"];
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    // Restart Quiz
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        scoreBox.style.display = "none";
        quizBox.style.display = "block";
        loadQuestion();
    }

    // Initialize Quiz
    loadQuestion();
};

// CSS for confetti effect
const style = document.createElement("style");
style.innerHTML = `
.confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    opacity: 0.7;
    top: 0;
    animation: fall linear infinite;
}
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(720deg);
    }
}
`;
document.head.appendChild(style);
