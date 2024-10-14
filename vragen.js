const quiz1Questions = [
    { question: "Wat is het grootste orgaan van het menslijk lichaam?", answers: ["Huid", "Hart", "Lever", "Longen"], correct: 0 },
    { question: "Welke planeet staat het dichtst bij de zon?", answers: ["Mercurius", "Venus", "Mars", "Jupiter"], correct: 0 },
    { question: "Wat is de hoofdstad van Frankrijk?", answers: ["Berlijn", "Rome", "Parijs", "Madrid"], correct: 2 },
    { question: "Welke kleur krijg je als je rood en blauw mengt?", answers: ["Groen", "Oranje", "Bruin", "Paars"], correct: 3 },
    { question: "Welke van de volgende dieren is een zoogdier?", answers: ["Walvis", "Kikker", "Schildpad", "Adelaar"], correct: 0 },
    { question: "Hoeveel minuten zitten er in een uur?", answers: ["70", "60", "30", "90"], correct: 1 },
    { question: "Wat is het symbool voor waterstof in het periodiek systeem?", answers: ["H", "W", "O", "He"], correct: 0 },
    { question: "Welke taal wordt voornamelijk gesproken in Brazilië?", answers: ["Spaans", "Frans", "Engels", "Portugees"], correct: 3 },
];
 
const quiz2Questions = [
    { question: "Welke kleur krijg je als je geel en blauw mengt?", answers: ["Groen", "Paars", "Oranje", "Bruin"], correct: 0 },
    { question: "Hoeveel planeten heeft ons zonnestelsel (exclusief dwergplaneten)?", answers: ["10", "8", "6", "9"], correct: 1 },
    { question: "Welke vorm heeft een stopbord doorgaans?", answers: ["Vierkant", "Achthoek", "Cirkel", "Driehoek"], correct: 2 },
    { question: "Wat is de grootste oceaan op aarde?", answers: ["Atlantische Oceaan", "Indische Oceaan", "Zuidelijke Oceaan", "Stille Oceaan"], correct: 3 },
    { question: "Welke van de volgende getallen is een priemgetal?", answers: ["17", "12", "21", "15"], correct: 0 },
    { question: "Welke gas is het meest voorkomend in de aardeatmosfeer?", answers: ["Waterstof", "Stikstof", "Zuurstof", "Koolstofdioxide"], correct: 1 },
    { question: "Welke van de volgende dieren legt eieren?", answers: ["Konijn", "Kat", "Kip", "Hond"], correct: 2 },
    { question: "Wat is het grootste continent op aarde?", answers: ["Zuid-Amerika", "Afrika", "Europa", "Azië"], correct: 3 },
];
 
const impulseTexts = [
    "Wat als ik nu wegren?",
    "Ik wil een snack halen...",
    "Zou ik dit object kunnen omgooien?",
    "Misschien kan ik gewoon even dansen.",
    "Wat als ik nu gewoon iets randoms roep?",
    "Zal ik nu even mijn telefoon checken?",
];
 
const adhdWords = [
    "Afleiding",
    "Overprikkeling",
    "Focus",
    "Chaos",
    "Rusteloos",
    "Drukte",
];
 
const adhdImages = [
    '/img/img1.png', 
    '/img/img2.png',
    '/img/img3.png',
    '/img/img4.png',
    '/img/img5.png',
];
 
const usedQuestionsQuiz1 = [];
const usedQuestionsQuiz2 = [];
 
let correctCountQuiz1 = 0;
let correctCountQuiz2 = 0;
let currentQuiz = null;
let startTime1, startTime2, endTime1, endTime2;
let adhdInterval;
 
document.getElementById('startQuiz1Btn').addEventListener('click', () => startQuiz(quiz1Questions, 1));
document.getElementById('startQuiz2Btn').addEventListener('click', () => startQuiz(quiz2Questions, 2));
document.getElementById('retryBtn').addEventListener('click', () => location.reload());
 
function startQuiz(questions, quizNumber) {
    resetQuiz();
    if (quizNumber === 1) {
        startTime1 = new Date();
    } else if (quizNumber === 2) {
        startTime2 = new Date();
        applyDistractionStyling();
        adhdInterval = setInterval(displayAdhdElements, 3000);
    }
 
    currentQuiz = { questions, quizNumber };
    showQuestion();
}
 
function resetQuiz() {
    correctCountQuiz1 = 0;
    correctCountQuiz2 = 0;
    currentQuiz = null;
    document.getElementById('questionBox').style.display = 'none';
    removeDistractionStyling();
    clearInterval(adhdInterval);
    usedQuestionsQuiz1.length = 0;
    usedQuestionsQuiz2.length = 0; 
    const impulseElements = document.querySelectorAll('.impulse-text, .adhd-text, .adhd-image');
    impulseElements.forEach(el => el.remove());
}
 
function applyDistractionStyling() {
    document.body.style = 'background-image: none';
    document.body.style.animation = 'backgroundFlash 3s infinite';
    document.getElementById('questionText').classList.add('question-gradient');
}
 
function removeDistractionStyling() {
    document.body.style.animation = '';
    document.body.style = 'background-image: url(./img/wp.jpg)';
    document.getElementById('questionText').classList.remove('question-gradient');
}
 
function showQuestion() {
    const questionList = currentQuiz.questions;
    const usedQuestions = currentQuiz.quizNumber === 1 ? usedQuestionsQuiz1 : usedQuestionsQuiz2;
 
    // Kies een vraag die nog niet gebruikt is
    const availableQuestions = questionList.filter((_, index) => !usedQuestions.includes(index));
 
    if (availableQuestions.length === 0) {
        alert('Alle vragen zijn beantwoord!');
        return;
    }
 
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    const questionIndex = questionList.indexOf(selectedQuestion);
 
    usedQuestions.push(questionIndex);
 
    document.getElementById('questionText').textContent = selectedQuestion.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
 
    selectedQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn-secondary m-2';
        button.textContent = answer;
        button.onclick = () => checkAnswer(index, selectedQuestion.correct);
        answersDiv.appendChild(button);
    });
 
    document.getElementById('questionBox').style.display = 'block';
}
 
function checkAnswer(selected, correct) {
    if (selected === correct) {
        if (currentQuiz.quizNumber === 1) {
            correctCountQuiz1++;
            if (correctCountQuiz1 === 4) {
                endTime1 = new Date();
                showNextQuiz();
                return;
            }
        } else {
            correctCountQuiz2++;
            if (correctCountQuiz2 % 2 === 0) {
                displayImpulseText(); // Toon impulsieve tekst na elke 2 correcte antwoorden
            }
            if (correctCountQuiz2 === 4) {
                endTime2 = new Date();
                checkCompletion();
                return;
            }
        }
        alert('Goed!');
    } else {
        alert('Fout, een nieuwe vraag wordt getoond.');
        if (currentQuiz.quizNumber === 2) {
            displayImpulseText(); // Toon impulsieve tekst na een fout antwoord
        }
    }
    showQuestion(); // Toon een nieuwe vraag na elk antwoord (goed of fout)
}
 
function displayImpulseText() {
    const randomText = impulseTexts[Math.floor(Math.random() * impulseTexts.length)];
    const impulseElement = document.createElement('div');
    impulseElement.className = 'impulse-text';
    impulseElement.textContent = randomText;
 
    impulseElement.style.position = 'absolute';
    impulseElement.style.top = `${Math.random() * 80}vh`;
    impulseElement.style.left = `${Math.random() * 80}vw`;
    impulseElement.style.zIndex = '999'; // Zorg ervoor dat de impulsieve tekst boven andere elementen ligt
    impulseElement.style.animation = 'fadeIn 1s forwards, fadeOut 10s forwards';
 
    document.body.appendChild(impulseElement);
 
    // Verwijder de impulsieve tekst na 10 seconden om het scherm schoon te houden
    setTimeout(() => {
        impulseElement.remove();
    }, 10000);
}
 
function showNextQuiz() {
    alert('Vragenlijst 1 voltooid! Start nu Vragenlijst 2.');
    document.getElementById('questionBox').style.display = 'none';
}
 
function checkCompletion() {
    if (endTime1 && endTime2) {
        showEndScreen();
    }
}
 
function showEndScreen() {
    const time1 = ((endTime1 - startTime1) / 1000).toFixed(2);
    const time2 = ((endTime2 - startTime2) / 1000).toFixed(2);
    document.getElementById('timer1Result').textContent = `${time1} seconden`;
    document.getElementById('timer2Result').textContent = `${time2} seconden`;
 
    removeDistractionStyling();
 
    document.getElementById('endScreen').style.display = 'flex';
}
 
function displayImpulseText() {
    const randomText = impulseTexts[Math.floor(Math.random() * impulseTexts.length)];
    const impulseElement = document.createElement('div');
    impulseElement.className = 'impulse-text';
    impulseElement.textContent = randomText;
 
    impulseElement.style.top = `${Math.random() * 80}vh`;
    impulseElement.style.left = `${Math.random() * 80}vw`;
 
    document.body.appendChild(impulseElement);
}
 
function displayAdhdElements() {
    // Willekeurig woord weergeven
    const randomWord = adhdWords[Math.floor(Math.random() * adhdWords.length)];
    const wordElement = document.createElement('div');
    wordElement.className = 'adhd-text';
    wordElement.textContent = randomWord;
 
    wordElement.style.position = 'absolute';
    wordElement.style.top = `${Math.random() * 80}vh`;
    wordElement.style.left = `${Math.random() * 80}vw`;
 
    document.body.appendChild(wordElement);
 
    // Willekeurige afbeelding weergeven
    const randomImageSrc = adhdImages[Math.floor(Math.random() * adhdImages.length)];
    const imageElement = document.createElement('img');
    imageElement.className = 'adhd-image';
    imageElement.src = randomImageSrc;
    imageElement.style.width = '100px';
    imageElement.style.height = '100px';
    imageElement.style.position = 'absolute';
    imageElement.style.top = `${Math.random() * 80}vh`;
    imageElement.style.left = `${Math.random() * 80}vw`;
 
    document.body.appendChild(imageElement);
}