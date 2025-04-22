const baseURL = "https://todos-production-34e1.up.railway.app";

async function getTodos() {
  try {
    const response = await fetch(`${baseURL}/tarefas`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching todos:", error);
  }
}
async function createTodo(NomeTarefa) {
  try {
    const response = await fetch(`${baseURL}/tarefas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: NomeTarefa,
        concluido: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log("Error creating todo:", error);
  }
}
async function showToDos() {
  const list = document.querySelector("ul");
  list.innerHTML = "";
  const data = await getTodos();

  data.forEach((todo) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.concluida;

    checkbox.addEventListener("change", async () => {
      await updateTodo(todo.id, todo.titulo, checkbox.checked);
      console.log(todo);
      showToDos();
    });

    const span = document.createElement("span");
    span.textContent = `ID: ${todo.id} - Tarefa: ${todo.titulo}`;

    const button = document.createElement("button");
    button.textContent = "Editar";

    button.addEventListener("click", async () => {
      const newTitle = prompt("Digite o novo título:", todo.titulo);
      if (newTitle) {
        await updateTodo(todo.id, newTitle, todo.concluida);
        showToDos();
      }
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
  });
}

showToDos();

async function deleteTodo(id) {
  try {
    const response = await fetch(`${baseURL}/tarefas/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error deleting todo:", error);
  }
}
async function updateTodo(id, NomeTarefa, status) {
  try {
    const response = await fetch(`${baseURL}/tarefas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: NomeTarefa,
        concluida: status,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error updating todo:", error);
  }
}
document.querySelector("button").addEventListener("click", async () => {
  const input = document.querySelector("input");
  const nomeTarefa = input.value;

  await createTodo(nomeTarefa);
  getTodos();
});
