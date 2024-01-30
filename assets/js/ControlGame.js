import { shuffle, lerJSON } from "./utils.js";
import validateteLetter from "./validate-letter.js";

class ControlGame {

    static END_GAME = 5; //total de tentativas 

    constructor() {
        //controle do jogo
        this._correctLetters = 0; //controla as letras acertadas
        this._mistakesCount = 0; //controla os erros
        this._word = ''; //palavra vigente do jogo
        this._scrambledWord = ''; //versão da palavra embaralhada

        //os elementos dom da página
        this.scrambledWordPanel = document.querySelector('[data-scrambled-word]'); //painel onde mostra a letra embaralhada
        this.mistakesLetters = document.querySelector('[data-mistakes-letters]'); //relação das letras erradas
        this.triesScoreboard = document.querySelector('[data-tries-scoreboard]'); //placar de erros Ex: Tries (0/5)
        this.triesCircles = document.querySelectorAll(`[data-tries-circle]`); //grupo de bolinhas que mostra os erros
        this.inputField = document.querySelector('[data-input-field]');
    }

    /**
     * @description pontua mais uma letra acertada
     * @returns {void}
     */
    addCorrectLetters(){
        this._correctLetters += 1;
    }

    /**
     * @description adiciona mais um erro ao controlador de tentativas
     * @returns {void}
     */
    addOneMoreMistakesCount() {
        this._mistakesCount = this._mistakesCount + 1;
    }

    /**
     * @description adiciona mais uma letra errada na página
     * @param {string} newLetter
     */
    addOneMoreMistakesLetters(newLetter) {
        this.mistakesLetters = this._formatterMistakesLetters(this.mistakesLetters, newLetter);
    }

    /**
     * @description adiciona a palvra embaralhada no painel da página.
     * @returns {void}
     */
    addScrambledWord() {
        this.scrambledWordPanel.textContent = this._scrambledWord;
    }

    /**
     * @description adiciona o comportamento em todos os campos input.
     * @returns {void}
     */
    addBehaviorIninputLetters() {
        // console.log('>>>>>>>>>>>>>>> passou aki')
        const inputLetters = document.querySelectorAll('[data-input-number-letter]');
        inputLetters.forEach(inputLetter => {
            inputLetter.addEventListener('keydown', validateteLetter);
        });
    }

    /**
     * @description cria um novo jogo.
     * @returns {void}
     */
    async createNewGame() {
        this.resetGame();
        this.createNewWord();
    }

    /**
     * @description altera os campos de texto (inputs)no painel de acordo com a nova palavra
     * @returns {void}
     */
    async createNewWord() {
        //resetando os inputs (campos)
        this.resetInputField();

        //preparando a nova palavra
        await this.generateNewWord();

        //inserindo a palavra no dom
        this.addScrambledWord();

        //criando os inputs para cada letra da palavra
        this.createInputLetters();

        //add o comportamento nos campos
        this.addBehaviorIninputLetters();
    }

    /**
     * @description gera as tags input do html e insere no painel 
     * @returns {void}
     */
    createInputLetters() {
        this._word.split('').forEach((letter, index) => {
            const inputString = `
            <input 
                type="text" maxlength="1" class="words_form__input" 
                data-input-number-letter="${index + 1}" 
                data-input-letter="${letter}"
            >`;

            this.inputField.innerHTML += inputString;
        });
    }

    /**
     * @description gera uma nova palvra para o jogo. 
     */
    async generateNewWord(){
        const { letters: letterList } = await lerJSON("./assets/json/letters.json"); //lê o json onde está todas as palavras
        const shufflelettersList = shuffle(letterList); //embaralha a lista de palavras
        this._word = shufflelettersList[0]; //como a lista está embaralhado, ele sempre vai pegar uma palavra diferente
        this._scrambledWord = shuffle(shufflelettersList[0].split('')).join(''); //palavra elegida embaralhada
    }

    /**
     * @description identifica se partida acabou. Para isso, o usuário pode errar até 6 vezes
     * @returns {boolean} verifica se a quantidade de chances foi atingida, maior ou igual que 5 vezes
     */
    isGameOver() {
        return this._mistakesCount >= ControlGame.END_GAME;
    }

    /**
     * @description identifica se usuário ganhou. Para isso, o usuário precisa pontuar a quantidade de letras da palavra.
     * @returns {boolean} verifica se a pontuação é igual ao número de letras da palavra.
     */
    isGameWin() {
        return this._correctLetters === this._word.length;
    }

    /**
     * @description limpa todos os campos de texto (input). O método é utilizado para receber os campos de texto da nova palavra.
     * @returns {void}
     */
    resetInputField() {
        this.inputField.innerHTML = '';
    }

    /**
     * @description Zera a representação de erro na tela (bolinhas). Basicamente, o método remove a classe em css que pinta a bolinha de rosa
     * @returns {void}
     */
    resetTriesCircles() {
        this.triesCircles.forEach(triesCircle => triesCircle.classList.remove("--error"));
    }

    /**
     * @description Reseta o jogo. Ou seja, limpa os campos e zera o placar de erros.
     * @returns {void}
     */
    async resetGame() {
        //resetando a parte mistake
        this.setMistakesText('');
        this.setMistakesCount(0);
        this.setCorrectLetters(0);

        //resetando o contador de tentativas
        this.updateTriesScoreboard();

        //resetando as bolinhas de tentativas
        this.resetTriesCircles();
    }

    /**
     * @description insere um no valor ao atributo "_correctLetters".
     * @param {number} newValue 
     * @returns {void}
     */
    setCorrectLetters(newValue) {
        this._correctLetters = newValue;
    }

    /**
     * @description insere um no valor ao atributo "_mistakesCount".
     * @param {number} newValue 
     * @returns {void}
     */
    setMistakesCount(newNumber) {
        this._mistakesCount = newNumber;
    }

    /**
     * @description insere um novo texto ao DOM que mostra as letras erradas no painel.
     * @param {string} newValue 
     * @returns {void}
     */
    setMistakesText(newText) {
        this.mistakesLetters = newText;
    }

    /**
     * @description atualiza a quantidade de erros no painel.
     * @returns {void}
     */
    updateTriesScoreboard() {
        this.triesScoreboard.textContent = this._mistakesCount;
    }

    /**
     * @description adiona uma nova bolinha de erro no painel.
     * @returns {void}
     */
    updateTriesCircleScoreboard() {
        this.triesCircles[this._mistakesCount - 1].classList.add("--error");
    }

    /**
     * @description formata o resultado das tentativas
     * @param {string} currentInputValue 
     * @param {string} newLetter 
     * @returns {string} sequência de letras seguidas de vígula e espaço
     * @example a, b, e, f 
     */
    _formatterMistakesLetters(currentInputValue, newLetter) {
        return (currentInputValue + newLetter)
            .replace(/[,\W]/g, '') //remove as virgulas e espaços existentes
            .split('') //quebra a string em um array
            .join(', '); //junta em string de novo separado de vírgula e espaço
    }
}

export default ControlGame;