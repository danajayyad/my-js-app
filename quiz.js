const questions = [
    {
        id: 1,
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        id: 2,
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        id: 3,
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        id: 4,
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Hydrogen"],
        answer: "Oxygen"
    },
    {
        id: 5,
        question: "Which country hosted the 2016 Summer Olympics?",
        options: ["Brazil", "China", "UK", "Russia"],
        answer: "Brazil"
    },
    {
        id: 6,
        question: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        answer: "Mount Everest"
    },

    {
        id: 7,
        question: "Which video game franchise features characters like Mario and Luigi?",
        options: ["Legend of Zelda", "Super Mario", "Sonic the Hedgehog", "Minecraft"],
        answer: "Super Mario"
    }
];

localStorage.setItem('questions', JSON.stringify(questions));
let currenctQues = 0;
let correct = 0;
let wrongAnswers = 0;



function displayQuestion() {
    const container = document.getElementById('main-section');
    container.innerHTML = '';
    const questions = JSON.parse(localStorage.getItem('questions'));

    const current = questions[currenctQues];
    const question = current.question;
    const options = current.options;

    const card = document.createElement('div');
    card.className = 'card d-flex flex-column justify-content-center align-items-center p-5';
    const ques = document.createElement('h5');
    ques.className = 'mb-5';
    ques.textContent = question;


    card.appendChild(ques);

    options.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary m-2 w-100';
        btn.textContent = o;
        btn.onclick = () => checkAnswer(current, o);
        card.appendChild(btn);
    });




    container.appendChild(card);



}



function checkAnswer(question, option) {
    if (option === question.answer) {
        correct++
    } else if (option !== question.answer) {
        wrongAnswers++;
    } 

    currenctQues++;
    if (currenctQues < questions.length) {

        displayQuestion()
    }
    else {
        displayScore();
    }

}


function displayScore() {
    const questions = JSON.parse(localStorage.getItem('questions'));
    const container = document.getElementById('main-section');
    container.innerHTML = '';
    container.innerHTML = ` <h3 class="mb-5"> Check your Quiz Summary</h3>
    <table class = "table table-bordered text-center mb-5">
        <thead>
            <tr> 
                <th>Score</th>
                <th>Correct</th>
                <th>Wrong</th>
            </tr>   
        </thead>
        <tbody>
             <tr> 
                <td>${(correct / questions.length * 100).toFixed(2)}</td>
                <td>${correct}</td> 
                <td>${wrongAnswers}</td>
            </tr>
        </tbody>
    </table>
    <h5 class="mt-5 mb-5 fw-bold">Check all Correct Answer:</h5>
    `;

    questions.forEach(q => {

        const div = document.createElement('div');
        div.className = 'd-flex flex-column mb-5';
        div.innerHTML = `
        <h6 class="mb-3">Question: ${q.question}</h6>
        <h6 class="text-success">Correct answer: ${q.answer}</h6>`
        container.appendChild(div);

        
    });

}