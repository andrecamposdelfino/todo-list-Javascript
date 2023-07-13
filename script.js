

//getItem para pegar
const storage = localStorage.getItem("tasks") || "[]"
let dados = JSON.parse(storage)


const inputAdd = document.querySelector(".input-add")
const btnAdd = document.querySelector(".btn-add")
const tasks = document.querySelector(".tasks")


// função para adicionar as tarefas
function addTaskToList () {
    const tarefa = inputAdd.value
    let item =  {
            id:crypto.randomUUID(),
            name:tarefa,
            checked:false
        }
    

    // adicionando a tarefa
    dados.push(item)
    console.log(dados)

    //adicionando no local storage
    localStorage.setItem("tasks", JSON.stringify(dados))
    alert("Tarefa adicionada com sucesso!!")
    console.log(dados)
    inputAdd.value = ""
    inputAdd.focus()
    populateTasks()

}


// função para chamar as tarefas
function populateTasks(){

    let tasksItem = ""
    
    dados.forEach(task => {
        
        tasksItem += `
            <li>
                <label for="${task.id}">
                    <input type="checkbox" id="${task.id}" ${task.checked ? "checked" : ""} onChange="changeTask("${task.id}")>
                    <span>${task.name}</span>
                </label>
                <i class="bx bx-trash" onclick="deleteTask('${task.id}')"></i>
            </li>

        `
    })
   
    tasks.innerHTML = tasksItem

}

//

function changeTask(id){
    const checkbox = document.getElementById(id)
    let newList = dados.map(item => {
        if(item.id === id){
            item.checked = checkbox.checked
            console.log(item.checked)
        }
        return item
    })
    dados = newList
    localStorage.setItem("tasks", JSON.stringify(dados))
    populateTasks()
}

// função para deletar
function deleteTask(id){
    //atualizando a lista com todos os items menos os com o id passado
    const newList = dados.filter(item => item.id !== id)
    dados = newList
    populateTasks()
    localStorage.setItem("tasks", JSON.stringify(dados))
}

// eventos 
inputAdd.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        addTaskToList()
    }
})

btnAdd.addEventListener("click", addTaskToList)
populateTasks()
console.log(dados)

