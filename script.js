const drawList = (dataType) => {
  const todoSection = document.querySelector("#todo");

  todoSection.innerHTML = "";

  dataType.forEach((element) => {
    todoSection.innerHTML += `
              <div class="card">
              <span>Title:</span>
                  <span class="title">${element.title}</span>
                </br>
                <span>Description:</span>
                  <span class="description">${element.description}</span>
                  </br>
                  <button class = "editButton">Edit</button>
                  <button class="deleteButton">Delete</button>
              </div>
          `;
  });
};

const deleteCard = (dataType, toList) => {
  toList.addEventListener("click", (event) => {
    switch (event.target.classList.value) {
      case "deleteButton":
        const card = event.target.closest(".card");
        const title = card.querySelector(".title").textContent;
        const description = card.querySelector(".description").textContent;

        console.log(title, description);

        dataType.forEach((el, i) => {
          if (el.title === title && el.description === description) {
            dataType.splice(i, 1);
            card.remove();
            console.log(dataType);
          }
        });

        break;
      case "editButton":
        console.log(event.target);
        break;
      default:
        break;
    }
  });
};

const init = () => {
  const todoList = document.querySelector(".todoList");
  const form = document.querySelector("#form");
  const inputTitle = document.querySelector("#inputTitle");
  const inputDescriptio = document.querySelector("#inputDescriptio");
  const addCardButton = document.querySelector("#addCardButton");

  const data = {
    todo: [],
    inProgress: [],
    done: [],
  };

  addCardButton.addEventListener("click", (event) => {
    event.preventDefault(); // препятствует перезагрузке страницы при нажатии на кнопку в форме

    data.todo.push({
      title: inputTitle.value,
      description: inputDescription.value,
    });

    form.reset();

    drawList(data.todo);
    deleteCard(data.todo, todoList);
  });
};

init();
