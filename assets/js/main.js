const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');
// const btnApagar = document.querySelector('.btn-apagar');


function criaLi() {
    const li = document.createElement('li');
    return li;
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    criaBotaoApagar(li);
    limpaInput();
    salvaTarefas();
}

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const apagar = document.createElement('button');
    apagar.setAttribute('class', 'btn-apagar');
    apagar.innerText = 'X';
    li.appendChild(apagar);
}

function salvaTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaTarefas = [];

    for(let tarefa of liTarefas) {
        const liText = tarefa.innerText.replace('X', '').trim();
        listaTarefas.push(liText);
    }

    const tarefasJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    for(let tarefa of tarefas){
        criaTarefa(tarefa);
    }
    console.log(tarefas);
}

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    
    criaTarefa(inputTarefa.value);
});


inputTarefa.addEventListener('keypress', function(evento) {
    if(evento.keyCode === 13 && inputTarefa.value){
        criaTarefa(inputTarefa.value);
    }
})

document.addEventListener('click', function(e) {
    const elemento = e.target;

    if(elemento.classList.contains('btn-apagar')) {
       elemento.parentElement.remove();
       salvaTarefas();
    }
})

adicionaTarefasSalvas();