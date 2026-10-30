// ============================================
// HEART PAGE - INTERACTIVE DIAGRAM
// ============================================

// Heart part information
const heartInfo = {
    'right-atrium': {
        title: 'Right Atrium',
        description: 'This chamber receives oxygen-poor blood from your body through the vena cava. Think of it as the "receiving room" for tired blood that needs fresh oxygen!',
        facts: [
            'Receives blood from the body',
            'Contracts to push blood down',
            'Has thinner walls than ventricles'
        ]
    },
    'right-ventricle': {
        title: 'Right Ventricle',
        description: 'The right ventricle pumps oxygen-poor blood to your lungs where it picks up fresh oxygen. It\'s like a delivery truck taking blood to the oxygen station!',
        facts: [
            'Pumps blood to lungs',
            'Has thicker walls for pumping',
            'Works with right atrium'
        ]
    },
    'left-atrium': {
        title: 'Left Atrium',
        description: 'This chamber receives oxygen-rich blood from your lungs. It\'s the "collection point" for freshly oxygenated blood ready to energize your body!',
        facts: [
            'Receives oxygenated blood from lungs',
            'Smaller than left ventricle',
            'Contracts after right atrium'
        ]
    },
    'left-ventricle': {
        title: 'Left Ventricle',
        description: 'The strongest chamber! It pumps oxygen-rich blood to your entire body through the aorta. This powerful pump has the thickest walls because it has the biggest job!',
        facts: [
            'Pumps blood to entire body',
            'Thickest, strongest chamber',
            'Creates blood pressure'
        ]
    },
    'aorta': {
        title: 'Aorta',
        description: 'The body\'s main highway! This is the largest artery that carries oxygen-rich blood from the left ventricle to the rest of your body.',
        facts: [
            'Largest blood vessel',
            'Carries oxygenated blood',
            'Branches throughout body'
        ]
    }
};

// Brain part information
const brainInfo = {
    'frontal': {
        title: 'Frontal Lobe',
        description: 'The frontal lobe is like your brain\'s CEO! It helps you make decisions, solve problems, plan for the future, and controls your personality and emotions.',
        facts: [
            'Controls decision-making',
            'Manages personality and behavior',
            'Handles problem-solving',
            'Controls voluntary movements'
        ]
    },
    'parietal': {
        title: 'Parietal Lobe',
        description: 'This region processes touch, temperature, and pain. It helps you understand where your body is in space and processes sensory information from all over your body!',
        facts: [
            'Processes touch and pressure',
            'Spatial awareness',
            'Integrates sensory information',
            'Helps with math and reading'
        ]
    },
    'temporal': {
        title: 'Temporal Lobe',
        description: 'Your temporal lobe is the brain\'s hearing center! It processes sounds, helps you understand language, and stores memories.',
        facts: [
            'Processes hearing and sound',
            'Stores memories',
            'Recognizes faces',
            'Understands language'
        ]
    },
    'occipital': {
        title: 'Occipital Lobe',
        description: 'The occipital lobe is your vision headquarters! Everything you see is processed here, from colors to shapes to movement.',
        facts: [
            'Processes visual information',
            'Recognizes colors and shapes',
            'Detects movement',
            'Creates visual memories'
        ]
    },
    'cerebellum': {
        title: 'Cerebellum',
        description: 'The cerebellum is your balance and coordination expert! It helps you walk smoothly, catch a ball, and perform any movement that requires precision.',
        facts: [
            'Controls balance',
            'Coordinates movements',
            'Helps with motor learning',
            'Fine-tunes muscle actions'
        ]
    },
    'brainstem': {
        title: 'Brain Stem',
        description: 'The brain stem is your survival center! It controls essential automatic functions like breathing, heart rate, and sleep cycles - things you don\'t have to think about!',
        facts: [
            'Controls breathing',
            'Regulates heart rate',
            'Manages sleep cycles',
            'Connects brain to spinal cord'
        ]
    }
};

// Initialize Heart Diagram
function initHeartDiagram() {
    const heartParts = document.querySelectorAll('.heart-part');
    const infoCard = document.getElementById('heart-info');

    if (!heartParts.length || !infoCard) return;

    heartParts.forEach(part => {
        part.addEventListener('click', () => {
            const partId = part.id;
            const info = heartInfo[partId];

            if (info) {
                let factsHTML = '';
                info.facts.forEach(fact => {
                    factsHTML += `
                        <div class="fact-item">
                            <span class="bullet">•</span>
                            <span>${fact}</span>
                        </div>
                    `;
                });

                infoCard.innerHTML = `
                    <h2>${info.title}</h2>
                    <p>${info.description}</p>
                    <h3>Key Facts:</h3>
                    ${factsHTML}
                `;
            }
        });
    });
}

// Initialize Brain Diagram
function initBrainDiagram() {
    const brainParts = document.querySelectorAll('.brain-part');
    const infoCard = document.getElementById('brain-info');

    if (!brainParts.length || !infoCard) return;

    brainParts.forEach(part => {
        part.addEventListener('click', () => {
            const partId = part.id;
            const info = brainInfo[partId];

            if (info) {
                let factsHTML = '';
                info.facts.forEach(fact => {
                    factsHTML += `
                        <div class="fact-item">
                            <span class="bullet">•</span>
                            <span>${fact}</span>
                        </div>
                    `;
                });

                infoCard.innerHTML = `
                    <h2>${info.title}</h2>
                    <p>${info.description}</p>
                    <h3>Key Facts:</h3>
                    ${factsHTML}
                `;
            }
        });
    });
}

// ============================================
// BLOOD FLOW GAME
// ============================================

function initBloodFlowGame() {
    const flowSteps = document.querySelectorAll('.flow-step');
    const flowMessage = document.getElementById('flow-message');
    const resetButton = document.getElementById('reset-flow');

    if (!flowSteps.length || !flowMessage) return;

    let currentStep = 1;
    let gameComplete = false;

    flowSteps.forEach(step => {
        step.addEventListener('click', () => {
            if (gameComplete) return;

            const order = parseInt(step.dataset.order);

            if (order === currentStep) {
                step.classList.remove('pending');
                step.classList.add('correct');
                currentStep++;

                if (currentStep > 6) {
                    flowMessage.textContent = '🎉 Perfect! You understand blood flow!';
                    flowMessage.style.color = '#10b981';
                    gameComplete = true;
                    resetButton.style.display = 'inline-block';
                } else {
                    flowMessage.textContent = '✓ Correct! Keep going!';
                    flowMessage.style.color = '#10b981';
                }
            } else {
                step.classList.add('incorrect');
                flowMessage.textContent = '❌ Not quite! Try again.';
                flowMessage.style.color = '#ef4444';

                setTimeout(() => {
                    step.classList.remove('incorrect');
                    flowMessage.textContent = '';
                }, 1000);
            }
        });
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            currentStep = 1;
            gameComplete = false;
            flowMessage.textContent = '';
            resetButton.style.display = 'none';

            flowSteps.forEach(step => {
                step.classList.remove('correct', 'incorrect');
                step.classList.add('pending');
            });
        });
    }
}

// ============================================
// MEMORY GAME
// ============================================

function initMemoryGame() {
    const grid = document.getElementById('memory-grid');
    if (!grid) return;

    const emojis = ['🧠', '❤️', '👁️', '👂', '👃', '✋', '🦴', '💪'];
    const cards = [...emojis, ...emojis];

    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let canFlip = true;

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    // Create card elements
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card hidden';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.textContent = emoji;

        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });

    function flipCard(card) {
        if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        card.classList.remove('hidden');
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            canFlip = false;
            moves++;
            document.getElementById('moves-count').textContent = moves;

            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            document.getElementById('pairs-count').textContent = matchedPairs;

            flippedCards = [];
            canFlip = true;

            if (matchedPairs === 8) {
                setTimeout(showWinMessage, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card1.classList.add('hidden');
                card2.classList.remove('flipped');
                card2.classList.add('hidden');
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }

    function showWinMessage() {
        const gameResult = document.getElementById('game-result');
        const winMessage = document.getElementById('win-message');

        winMessage.textContent = `You won in ${moves} moves!`;
        gameResult.style.display = 'block';
    }

    function resetGame() {
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        canFlip = true;

        document.getElementById('moves-count').textContent = '0';
        document.getElementById('pairs-count').textContent = '0';
        document.getElementById('game-result').style.display = 'none';

        cards.sort(() => Math.random() - 0.5);

        cards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card hidden';
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            card.textContent = emoji;

            card.addEventListener('click', () => flipCard(card));
            grid.appendChild(card);
        });
    }

    const playAgainBtn = document.getElementById('play-again-btn');
    const restartBtn = document.getElementById('restart-memory-btn');

    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', resetGame);
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', resetGame);
    }
}

// ============================================
// QUIZ SYSTEM
// ============================================

function initHeartQuiz() {
    const submitButton = document.getElementById('submit-quiz');
    if (!submitButton) return;

    const quizOptions = document.querySelectorAll('.quiz-option');
    const selectedAnswers = new Array(5).fill(null);

    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            const questionNum = parseInt(option.dataset.question);

            // Remove selected class from all options in this question
            document.querySelectorAll(`[data-question="${questionNum}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });

            // Add selected class to clicked option
            option.classList.add('selected');
            selectedAnswers[questionNum] = option.dataset.correct === 'true';
        });
    });

    submitButton.addEventListener('click', () => {
        if (selectedAnswers.includes(null)) {
            alert('Please answer all questions before submitting!');
            return;
        }

        let score = selectedAnswers.filter(answer => answer === true).length;

        quizOptions.forEach(option => {
            if (option.classList.contains('selected')) {
                if (option.dataset.correct === 'true') {
                    option.classList.add('correct');
                } else {
                    option.classList.add('incorrect');
                }
            }
            option.style.pointerEvents = 'none';
        });

        const resultsDiv = document.getElementById('quiz-results');
        const scoreText = document.getElementById('score-text');
        const scoreMessage = document.getElementById('score-message');

        scoreText.textContent = `You scored ${score}/5!`;

        if (score === 5) {
            scoreMessage.textContent = 'Perfect! You\'re a heart expert! 🏆';
        } else if (score >= 3) {
            scoreMessage.textContent = 'Great job! Keep learning! 👏';
        } else {
            scoreMessage.textContent = 'Good try! Review and try again! 💪';
        }

        resultsDiv.style.display = 'block';
        submitButton.style.display = 'none';

        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    });
}

function initBrainQuiz() {
    const submitButton = document.getElementById('submit-quiz-brain');
    if (!submitButton) return;

    const quizOptions = document.querySelectorAll('.quiz-option');
    const selectedAnswers = new Array(5).fill(null);

    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            const questionNum = parseInt(option.dataset.question);

            // Remove selected class from all options in this question
            document.querySelectorAll(`[data-question="${questionNum}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });

            // Add selected class to clicked option
            option.classList.add('selected');
            selectedAnswers[questionNum] = option.dataset.correct === 'true';
        });
    });

    submitButton.addEventListener('click', () => {
        if (selectedAnswers.includes(null)) {
            alert('Please answer all questions before submitting!');
            return;
        }

        let score = selectedAnswers.filter(answer => answer === true).length;

        quizOptions.forEach(option => {
            if (option.classList.contains('selected')) {
                if (option.dataset.correct === 'true') {
                    option.classList.add('correct');
                } else {
                    option.classList.add('incorrect');
                }
            }
            option.style.pointerEvents = 'none';
        });

        const resultsDiv = document.getElementById('quiz-results-brain');
        const scoreText = document.getElementById('score-text-brain');
        const scoreMessage = document.getElementById('score-message-brain');

        scoreText.textContent = `You scored ${score}/5!`;

        if (score === 5) {
            scoreMessage.textContent = 'Amazing! You\'re a brain genius! 🧠';
        } else if (score >= 3) {
            scoreMessage.textContent = 'Well done! Your brain is working great! 🌟';
        } else {
            scoreMessage.textContent = 'Keep exploring and learning! 💡';
        }

        resultsDiv.style.display = 'block';
        submitButton.style.display = 'none';

        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Heart page
    initHeartDiagram();
    initBloodFlowGame();
    initHeartQuiz();

    // Brain page
    initBrainDiagram();
    initMemoryGame();
    initBrainQuiz();
});