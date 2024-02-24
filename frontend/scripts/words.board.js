const words = [
  "aberration",
  "benevolent",
  "cacophony",
  "deleterious",
  "ebullient",
  "facetious",
  "garrulous",
  "harangue",
  "iconoclast",
  "juxtapose",
  "kaleidoscope",
  "labyrinthine",
  "mellifluous",
  "nefarious",
  "obfuscate",
  "paradox",
  "quintessential",
  "recalcitrant",
  "serendipity",
  "taciturn",
  "ubiquitous",
  "voracious",
  "wanderlust",
  "xenophobic",
  "yesterday",
  "zeppelin",
  "alacrity",
  "belligerent",
  "capitulate",
  "denouement",
  "effervescent",
  "fathom",
  "gregarious",
  "haphazard",
  "insidious",
  "jubilant",
  "kowtow",
  "lugubrious",
  "magnanimous",
  "nonchalant",
  "obfuscate",
  "peregrinate",
  "quizzical",
  "resilient",
  "sycophant",
  "trepidation",
  "ubiquitous",
  "veracity",
  "winsome",
  "xenial",
  "yearn",
  "zealous",
  "alleviate",
  "benign",
  "catalyst",
  "disparate",
  "ephemeral",
  "fortuitous",
  "grandiose",
  "hackneyed",
  "impeccable",
  "juxtaposition",
  "kismet",
  "languid",
  "mellifluous",
  "nonplussed",
  "oblivion",
  "pervasive",
  "quandary",
  "redolent",
  "sycophantic",
  "tacit",
  "ubiquity",
  "verisimilitude",
  "wily",
  "xenophobia",
  "yield",
  "zenith",
  "altruistic",
  "benevolence",
  "cacophony",
  "debilitate",
  "ebullient",
  "facetious",
  "garrulous",
  "hackneyed",
  "immaculate",
  "juxtapose",
  "kaleidoscope",
  "labyrinth",
  "magnanimous",
  "nefarious",
  "obfuscate",
  "paragon",
  "quintessential",
  "recalcitrant",
  "serendipity",
  "trepidation",
  "ubiquitous",
  "veracious",
  "wanderlust",
  "xenophobic",
  "yearn",
  "zealot",
  "alacrity",
  "belligerent",
  "catalyst",
  "denigrate",
  "effervescent",
  "fathom",
  "gregarious",
  "harangue",
  "iconoclast",
  "jubilant",
  "kowtow",
  "lugubrious",
  "mellifluous",
  "nonchalant",
  "obfuscate",
  "paradigm",
  "quizzical",
  "resilient",
  "sycophant",
  "trepidation",
  "ubiquitous",
  "veracity",
  "winsome",
  "xenial",
  "yearn",
  "zealous",
  "alleviate",
  "benign",
  "catalyst",
  "disparate",
  "ephemeral",
  "fortuitous",
  "grandiose",
  "hackneyed",
  "impeccable",
  "juxtaposition",
  "kismet",
  "languid",
  "mellifluous",
  "nonplussed",
  "oblivion",
  "pervasive",
  "quandary",
  "redolent",
  "sycophantic",
  "tacit",
  "ubiquity",
  "verisimilitude",
  "wily",
  "xenophobia",
  "yield",
  "zenith",
];

const game = document.querySelector('.game');
        const startGame_btn = document.querySelector('.btn');
        const difficultyModal = document.getElementById('modal');
        const difficultyButtons = document.querySelectorAll('.difficulty-btn');
        const goBackButtons = document.querySelectorAll('.go-back-btn');
        const text_element = document.querySelector('.text');
        const input_element = document.querySelector('.input');
        const word_element = document.querySelector('.word');
        const score_element = document.querySelector('.score');
        const time_left_element = document.querySelector('.time-left');
        const wpm_element = document.querySelector('.wpm');
        const game_ended_element = document.querySelector('.game-ended');
        const game_ended_btn = document.querySelector('.game-ended-btn');

        let current = 0;
        let score = 0;
        let time_left = 30;
        let time_length = 30;
        let interval;

        startGame_btn.addEventListener('click', () => {
            difficultyModal.classList.remove('hidden');
        });

        difficultyButtons.forEach(button => {
            button.addEventListener('click', function () {
                const timerValue = parseInt(this.getAttribute('data-timer'));
                startGame(timerValue);
                difficultyModal.classList.add('hidden');
            });
        });

        goBackButtons.forEach(button => {
            button.addEventListener('click', goBack);
        });

        function goBack() {
            difficultyModal.classList.add('hidden');
            game.classList.add('hidden');
            startGame_btn.classList.remove('hidden');
        }

        function startGame(timerValue) {
            startGame_btn.classList.add('hidden');
            game.classList.remove('hidden');
            input_element.focus();
            getNextWord();
            set_time(timerValue);
        }

        input_element.addEventListener('keyup', (e) => {
            if (e.code == 'Enter') {
                const typedWord = input_element.value.trim().toLowerCase();
                const targetWord = word_element.innerText;

                if (typedWord === targetWord) {
                    createSpanElement(input_element.value, 'correct');
                    score++;
                } else {
                    createSpanElement(input_element.value, 'incorrect');
                }

                score_element.innerText = score;
                input_element.value = '';
                getNextWord();
            }
        });

        function getNextWord() {
            const randomIndex = Math.floor(Math.random() * words.length);
            word_element.innerText = words[randomIndex];
        }

        function createSpanElement(typed_text, background) {
            const span = document.createElement('span');
            span.innerText = typed_text;
            span.classList.add(background);
            text_element.appendChild(span);
        }

        function set_time(timerValue) {
            time_left = timerValue;
            time_length = timerValue;
            interval = setInterval(start_interval, 1000);
        }

        function start_interval() {
            time_left--;
            time_left_element.innerText = time_left;

            let passed_time = time_length - time_left;
            wpm_element.innerText = (score / (passed_time / 60)).toFixed(2);

            if (time_left == 0) {
                game_ended();
            }
        }

        function game_ended() {
            document.querySelector('.input-section').classList.add('hidden');
            game_ended_element.classList.remove('hidden');
            game_ended_element.innerHTML = `Game Over! Your Score: <span class="score">${score}</span>`;
            clearInterval(interval);
        }

        game_ended_btn.addEventListener('click', () => window.location.reload());