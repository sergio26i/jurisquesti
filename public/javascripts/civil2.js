const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//coloque as perguntas na array availableQuestions
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

//defina o numero da questão e da questao e das opcoes
function getNewQuestion(){ 
    //defina o numero da questao
    questionNumber.innerHTML = "Questão " + (questionCounter + 1) + " de " + quiz.length;


    //defina o texto da Questao
    //selecione pergunta aleatoria
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //pegar a posicao do 'questionindex' da array availableQuestion;
    const index1 = availableQuestions.indexOf(questionIndex);
     //remover o 'questionIndex' da array availableQuestion, para que a pergunta não se repita
    availableQuestions.splice(index1,1);
      
     //colocar as opcoes
     //pegar o length das opcoes
    const optionLen = currentQuestion.options.length
    //empurrar opcoes para a array availableOptions
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    //criar as opcoes no html
    for(let i=0; i<optionLen; i++){
        //opcao aleatoria
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //pegar a posicao de 'optonIndex' da array de availableOptions
        const index2 = availableOptions.indexOf(optonIndex);
        //remover a 'optonindex' da array de availableOptions, para que a opcao nao se repita
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay =animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }

questionCounter++;

}
    
//pegar o resultado da questão da tentativa atual
function getResult(element){
    const id = parseInt(element.id);
    //obtenha a resposta comparando o ID da opcao clicada
    if(id === currentQuestion.answer){
        //colocar a cor verde na opcao correta
        element.classList.add("correct");
        //adicionar o indicador para a marcacao correta
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        //colocar a cor vermelha na opcao incorreta
        element.classList.add("wrong");
        //adicionar o indicador para a marcacao errada
        updateAnswerIndicator("wrong");

        //caso a resposta esteja incorreta mostrar a opcao correta ao adicionar a cor verde na opcao correta
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }

    }
    attempt++
    unclickableOptions();
}

//deixe todas as opcoes sem poder clicar uma vez que o usuario seleciona uma opcao (RESTRINGIR O USUARIO AO MUDAR DE OPCAO OUTRA VEZ)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }

}
function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
       answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    //ocultar o quiz box
    quizBox.classList.add("hide");
    //mostrar o resultado do box
    resultBox.classList.remove("hide");
    quizResult();
}
//pegar o resultado do quiz
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length*100);
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    //ocultar o resultBox
    resultBox.classList.add("hide");
    //mostrar o quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome() {
    //Ocultar o result Box
    resultBox.classList.add("hide");
    //Mostrar o home box
    homeBox.classList.remove("hide");
    resetQuiz();
}

// #### PONTO DE INÍCIO ####

function startQuiz() {

    //Esconder o home box
    homeBox.classList.add("hide");
    //mostrar o quiz Box
    quizBox.classList.remove("hide");
    //primeiro nos colocaremos todas as questoes na array availableQuestions
    setAvailableQuestions();
    //segundo nos chamaremos o getNewQuestion(); function
    getNewQuestion();
    //Para criar os indicadores de respostas
    answersIndicator();
}

window.onload = function() {
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}