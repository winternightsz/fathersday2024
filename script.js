document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const keyboard = document.getElementById('keyboard');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const notificacao = document.getElementById('notificacao');
    const notificationMessagens = document.getElementById('notification-messagens');
    const closeNotificationBtn = document.getElementById('close-notification');
    const notificationGif = document.getElementById('notification-gif');


    let currentRow = 0;
    let currentCol = 0;
    const maxAttempts = 6;
    let secretWord = '';
    let gameEnded = false;

    const wordsList = [
        "zebra", "zabro", "zerar", "zinco", "zonzo", "zumba", "zorro", "zelar", "zerou", "zumba", 
        "valor", "vapor", "velho", "verde", "vinho", "vital", "viver", "volta", "vulgo", "visto", 
        "campo", "canto", "ceder", "cerro", "cinto", "clara", "cobre", "cobra", "corpo", "curva", 
        "andar", "antes", "apaga", "ativa", "aviao", "aviso", "achar", "acima", "ajuda", "alem"  
    ];

    const keys = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
        'z', 'x', 'c', 'v', 'b', 'n', 'm',
        'enter', 'backspace'
    ];

    closeNotificationBtn.addEventListener('click', () => {
        notificacao.classList.remove('opacity-100');
        notificacao.classList.add('opacity-0');
    });

    function startGame() {
        secretWord = wordsList[Math.floor(Math.random() * wordsList.length)];
        console.log('Palavra Secreta:', secretWord);  // Para testes, remova ou comente isso em produção
        createBoard();
        createKeyboard();
    }

    function createBoard() {
        for (let i = 0; i < maxAttempts * 5; i++) {
            const box = document.createElement('div');
            box.className = 'letter-box w-14 h-14 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center border-4 border-gray-500 rounded-md text-xl sm:text-2xl font-bold uppercase bg-gray-700 text-white cursor-pointer';
            box.addEventListener('click', () => selectBox(i));
            board.appendChild(box);
        }
    }

    function selectBox(index) {
        const rowStart = currentRow * 5;
        const rowEnd = rowStart + 5;
        if (index >= rowStart && index < rowEnd) {
            currentCol = index - rowStart;
            document.querySelectorAll('.letter-box').forEach((box, idx) => {
                if (idx >= rowStart && idx < rowEnd) {
                    box.classList.remove('border-gray-800');
                }
            });
            document.querySelectorAll('.letter-box')[index].classList.add('border-gray-800');
        }
    }

    function createKeyboard() {
        keys.forEach(key => {
            const keyElement = document.createElement('button');
            keyElement.textContent = key === 'backspace' ? '⌫' : key;
            keyElement.className = 'key bg-gray-600 text-white font-bold uppercase rounded hover:bg-gray-500 flex items-center justify-center';
            keyElement.setAttribute('data-key', key);
    
            // Verifica se a tecla é 'enter' ou 'backspace' para aplicar `col-span-2`
            if (key === 'enter' || key === 'backspace') {
                keyElement.classList.add('col-span-2', 'w-full', 'h-full');
            } else {
                keyElement.classList.add('w-8', 'h-10', 'sm:w-10', 'sm:h-12', 'md:w-12', 'md:h-14');
            }
    
            keyElement.addEventListener('click', () => handleKeyPress(key));
            keyboard.appendChild(keyElement);
        });
    }
    

    function handleKeyPress(key) {
        if (gameEnded) return;

        if (key === 'enter') {
            checkWord();
        } else if (key === 'backspace') {
            deleteLetter();
        } else {
            addLetter(key);
        }
    }

    function addLetter(letter) {
        if (currentCol < 5 && currentRow < maxAttempts) {
            const index = currentRow * 5 + currentCol;
            const letterBox = document.querySelectorAll('.letter-box')[index];
            letterBox.textContent = letter;
            currentCol++;
            if (currentCol < 5) {
                selectBox(currentRow * 5 + currentCol);  // Move cursor to next box automatically
            }
        }
    }

    function deleteLetter() {
        if (currentCol > 0) {
            currentCol--;
            const index = currentRow * 5 + currentCol;
            const letterBox = document.querySelectorAll('.letter-box')[index];
            letterBox.textContent = '';
            selectBox(index);  // Move cursor to the deleted box
        }
    }

    function checkWord() {
        const rowStart = currentRow * 5;
        const rowEnd = rowStart + 5;
    
        // Verifica se todas as 5 caixas estão preenchidas
        const isRowComplete = Array.from(document.querySelectorAll('.letter-box'))
            .slice(rowStart, rowEnd)
            .every(box => box.textContent !== '');
    
        if (!isRowComplete) {
            showNotification('Complete a palavra!');
            return;
        }
    
        const guess = Array.from(document.querySelectorAll('.letter-box'))
            .slice(rowStart, rowEnd)
            .map(box => box.textContent.toLowerCase())
            .join('');
    
        if (!wordsList.includes(guess)) {
            showNotification('Palavra não encontrada!');
            return;
        }
    
        const letterCount = {}; // Para contar a frequência das letras na palavra secreta
    
        // Primeiro, contamos as letras na palavra secreta
        for (const letter of secretWord) {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        }
    
        // Verificar letras na posição correta (verde)
        for (let i = 0; i < 5; i++) {
            const index = currentRow * 5 + i;
            const letterBox = document.querySelectorAll('.letter-box')[index];
            const letter = guess[i];
            const keyElement = document.querySelector(`.key[data-key="${letter}"]`);
    
            if (letter === secretWord[i]) {
                letterBox.classList.add('bg-green-500');
                keyElement.classList.add('bg-green-500');
                letterCount[letter]--; // Reduz a contagem desta letra
            }
        }
    
        // Verificar letras que estão na palavra secreta mas em posição errada (amarelo) ou não estão na palavra (marrom)
        for (let i = 0; i < 5; i++) {
            const index = currentRow * 5 + i;
            const letterBox = document.querySelectorAll('.letter-box')[index];
            const letter = guess[i];
            const keyElement = document.querySelector(`.key[data-key="${letter}"]`);
    
            if (!letterBox.classList.contains('bg-green-500')) { // Se a letra não está correta na posição
                if (secretWord.includes(letter) && letterCount[letter] > 0) {
                    letterBox.classList.add('bg-yellow-500');
                    if (!keyElement.classList.contains('bg-green-500')) {
                        keyElement.classList.add('bg-yellow-500');
                    }
                    letterCount[letter]--; // Reduz a contagem desta letra
                } else {
                    letterBox.classList.add('bg-gray-800'); // Usamos uma cor cinza escura para letras que não existem
                    if (!keyElement.classList.contains('bg-green-500') && !keyElement.classList.contains('bg-yellow-500')) {
                        keyElement.classList.add('bg-gray-800');
                    }
                }
            }
    
            // Remove hover effect after key has been used
            keyElement.classList.remove('hover:bg-gray-500');
        }
    
        if (guess === secretWord) {
            showNotification('Parabéns! Você acertou a palavra!');
            showNotificationMessage('FELIZ DIA DOS PAIS!');
            gameEnded = true;
        } else {
            currentRow++;
            currentCol = 0;
    
            if (currentRow === maxAttempts) {
                showNotification('Fim de jogo! A palavra era: ' + secretWord);
                showNotificationMessage('FELIZ DIA DOS PAIS!');
                gameEnded = true;
            } else {
                // Remove borda amarela da linha anterior
                Array.from(document.querySelectorAll('.letter-box'))
                    .slice(rowStart, rowEnd)
                    .forEach(box => box.classList.remove('border-gray-800'));
    
                // Move para a primeira caixa da próxima linha
                selectBox(currentRow * 5);
            }
        }
    }
    

    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.classList.remove('opacity-0');
        notification.classList.add('opacity-100');

        setTimeout(() => {
            notification.classList.remove('opacity-100');
            notification.classList.add('opacity-0');
        }, 2000); // O pop-up desaparece após 2 segundos
    }

    function showNotificationMessage(message) {
        notificationMessagens.textContent = message;        
        notificacao.classList.remove('opacity-0');
        notificacao.classList.add('opacity-100');
    } 


    startGame();
});
