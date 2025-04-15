const baseURL = 'https://todos-production-34e1.up.railway.app'

async function getTodos() {
    try {
        const response = await fetch(`${baseURL}/tarefas`)

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error fetching todos:', error)
    }
}
async function createTodo(NomeTarefa) {
    try {
        const response = await fetch(`${baseURL}/tarefas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: NomeTarefa,
                concluido: false,
            })
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
    } catch (error) {
        console.log('Error creating todo:', error)
    }
}
async function showToDos() {
    const list = document.querySelector('ul')
    list.innerHTML = ''
    const data = await getTodos()

    data.map((todo) => {
        const li = document.createElement('li')
        li.innerHTML = `ID: ${todo.id} - Tarefa: ${todo.titulo} - Concluída: ${todo.concluida}`
        list.appendChild(li)
    })
}
showToDos()

async function deleteTodo(id) {
    try {
        const response = await fetch(`${baseURL}/tarefas/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error deleting todo:', error)
    }
}
async function updateTodo(id, NomeTarefa, status) {
    try {
        const response = await fetch(`${baseURL}/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: NomeTarefa,
                concluido: status,
            })
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error updating todo:', error)
    }
}
document.querySelector('button').addEventListener('click', async () => {
    const input = document.querySelector('input')
    const nomeTarefa = input.value

    await createTodo(nomeTarefa);
    getTodos();
})

updateTodo(30, 'Thiago deve 25 reais pro Matheus Jucá', false)