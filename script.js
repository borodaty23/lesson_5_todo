const drawList = (dataType, section) => {
  section.innerHTML = "";
  dataType.forEach((element) => {
    section.innerHTML += `
              <div class="card">
              <span>Title:</span>
                  <span class="title">${element.title}</span>
                </br>
                <span>Description:</span>
                  <span class="description">${element.description}</span>
                  </br>
                  <button class = "editButton">Edit</button>
                  <button class="deleteButton">Delete</button>
                  <button class="nextButton">Next</button>
                  
              </di>
          `;
  });
};

// const returnVariable = (card, title, description) => {
//   const card = event.target.closest(".card");
//   const title = card.querySelector(".title").textContent;
//   const description = card.querySelector(".description").textContent;

//   return card, title, description;
// };

const deleteCard = (dataType) => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;
  const todoSection = document.querySelector("#todo");

  console.log(dataType);

  dataType.forEach((el, i) => {
    if (el.title === title && el.description === description) {
      dataType.splice(i, 1);
    }
  });
};

const editCard = (dataType, modalWrapper, sectionType) => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;

  const newTitile = document.querySelector("#title");
  const newDescription = document.querySelector("#description");
  const submitButton = document.querySelector("#submit");
  const todoSection = document.querySelector("#todo");

  modalWrapper.style.display = "block";

  newTitile.value = title;
  newDescription.value = description;

  submitButton.addEventListener("click", (event) => {
    dataType.forEach((el, i) => {
      if (el.title === title && el.description === description) {
        dataType.splice(i, 1, {
          title: newTitile.value,
          description: newDescription.value,
        });
      }
      drawList(dataType, sectionType);

      modalWrapper.style.display = "none";
    });
  });

  const closeButton = document.querySelector("#closeButton");
  closeButton.addEventListener("click", () => {
    modalWrapper.style.display = "none";
  });
};

const createNextCard = (dataTodo, inProgress) => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;
  const todoSection = document.querySelector("#todo");

  dataTodo.forEach((el, i) => {
    if (el.title === title && el.description === description) {
      inProgress.push({ title: title, description: description });
      dataTodo.splice(i, 1);
      console.log(inProgress);
    }
  });
};

const init = () => {
  const modalWrapper = document.querySelector(".wrapper");
  const todoList = document.querySelector(".todoList");
  const form = document.querySelector("#form");
  const inputTitle = document.querySelector("#inputTitle");
  const inputDescription = document.querySelector("#inputDescription");
  const addCardButton = document.querySelector("#addCardButton");
  const sectionInProgress = document.querySelector("#inProgress");
  const todoSection = document.querySelector("#todo");
  const cardBloks = document.querySelector(".cardBloks");

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

    cardBloks.addEventListener("click", (event) => {
      let a = event.target.closest("#todo");
      switch (event.target.classList.value) {
        case "deleteButton":
          if (a === todoSection) {
            deleteCard(data.todo);
            drawList(data.todo, todoSection);
          } else {
            deleteCard(data.inProgress);
            drawList(data.inProgress, sectionInProgress);
          }
          break;
        case "editButton":
          if (a === todoSection) {
            editCard(data.todo, modalWrapper, todoSection);
          } else {
            editCard(data.inProgress, modalWrapper, sectionInProgress);
          }
          break;
        case "nextButton":
          createNextCard(data.todo, data.inProgress);
          drawList(data.inProgress, sectionInProgress);
          drawList(data.todo, todoSection);

          break;
        default:
          break;
      }
    });

    drawList(data.todo, todoSection);
  });
};

init();
