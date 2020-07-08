const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './img/drink.jpg',
        text: "Estou com sede"
    },
    {
        image: './img/food.jpg',
        text: "Estou com fome"
    },
    {
        image: './img/tired.jpg',
        text: "Estou cansado"
    },
    {
        image: './img/hurt.jpg',
        text: "Estou ferido"
    },
    {
        image: './img/happy.jpg',
        text: "Estou feliz"
    },
    {
        image: './img/angry.jpg',
        text: "Estou bravo"
    },
    {
        image: './img/sad.jpg',
        text: "Estou triste"
    },
    {
        image: './img/scared.jpg',
        text: "Estou com medo"
    },
    {
        image: './img/outside.jpg',
        text: 'Quero ir lá fora'
    },
    {
        image: './img/home.jpg',
        text: 'Quero ir pra casa'
    },
    {
        image: './img/school.jpg',
        text: 'Quero ir para a escola'
    },
    {
        image: './img/grandma.jpg',
        text: 'Quero ir pra casa da vovó'
    }
];

data.forEach(createBox);

//Create speech boxes
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
      <img src="${image}" alt="${text}" />
      <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

// Set text
function setTextMessage(text) {
    message.text = text;
}

// Speak text
function speakText() {
    speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();