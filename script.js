const returnVariable = () => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;
  const cardId = +card.id;
  const desc = event.target.closest(".desc");

  const deskId = desc.id;

  const desksIdMass = [...document.querySelectorAll(".desc")].map(
    (desk) => desk.id
  );

  const nextDeskId = desksIdMass.findIndex((id) => id === deskId) + 1;

  return { title, description, cardId, deskId, desksIdMass, nextDeskId };
};

const addCards = (data) => {
  const form = document.querySelector("#form");
  const inputTitle = document.querySelector("#inputTitle");
  const inputDescription = document.querySelector("#inputDescription");
  event.preventDefault(); // препятствует перезагрузке страницы при нажатии на кнопку в форме

  data.todo.push({
    title: inputTitle.value,
    description: inputDescription.value,
    id: Date.now(),
  });
  drawList(data, "todo");
  console.log("dataTodo", data.todo);
  form.reset();
};

const drawList = (data, sectionId) => {
  let section = document.querySelector(`#${sectionId}`);
  console.log();
  section.innerHTML = "";
  data[sectionId].forEach((element) => {
    section.innerHTML += `
              <div class="card" id="${element.id}">
              <span>Title:</span>
                  <span class="title">${element.title}</span>
                </br>
                <span>Description:</span>
                  <span class="description">${element.description}</span>
                  </br>
                  
                  ${
                    section.id === "todo" || section.id === "inProgress"
                      ? `<div>
                        <button class="editButton">Edit</button>
                        <button class="deleteButton">Delete</button>
                        <button class="nextButton">Next</button>
                      </div>`
                      : section.id === "done"
                      ? `<div>
                      <button class="editButton">Edit</button>
                      <button class="deleteButton">Delete</button>
                      
                    </div>`
                      : `<div>
                       <button class="return"> return </button> 
                      </div>`
                  }
                  
              </div>
          `;
  });
};

const deleteCard = (data) => {
  const { title, description, cardId, deskId, desksIdMass, nextDeskId } =
    returnVariable();

  console.log();

  data[deskId].forEach((el, i) => {
    if (el.id === cardId) {
      data[deskId].splice(i, 1);
      data.deleted.push({
        title: title,
        description: description,
        id: cardId,
      });
    }
  });
  drawList(data, deskId);
  drawList(data, "deleted");
};

const editCard = (data) => {
  const { title, description, cardId, deskId, desksIdMass, nextDeskId } =
    returnVariable();

  const modalInputTitleValue = document.querySelector("#title");
  const modalInputDescriptionValue = document.querySelector("#description");
  const submitButton = document.querySelector("#submit");
  const modalWrapper = document.querySelector(".wrapper");

  modalWrapper.style.display = "block";

  modalInputTitleValue.value = title;
  modalInputDescriptionValue.value = description;

  submitButton.addEventListener("click", (event) => {
    data[deskId].forEach((el, i) => {
      if (el.id === cardId) {
        data[deskId].splice(i, 1, {
          title: modalInputTitleValue.value,
          description: modalInputDescriptionValue.value,
          id: cardId,
        });
      }
      console.log("dataTodo", data.todo);
      console.log("dataInprog", data.inProgress);
      drawList(data, deskId);
      modalWrapper.style.display = "none";
    });
  });

  const closeButton = document.querySelector("#closeButton");
  closeButton.addEventListener("click", () => {
    modalWrapper.style.display = "none";
  });
};

const createNextCard = (data) => {
  const { title, description, cardId, deskId, desksIdMass, nextDeskId } =
    returnVariable();

  data[deskId].forEach((el, i) => {
    if (el.id === cardId) {
      data[deskId].splice(i, 1);
      data[desksIdMass[nextDeskId]].push({
        title: title,
        description: description,
        id: cardId,
      });
      console.log(data[desksIdMass[nextDeskId]]);
    }
  });

  drawList(data, [desksIdMass[nextDeskId]]);
  drawList(data, deskId);
};

const restoreCard = (data) => {
  const { title, description, cardId, deskId, desksIdMass, nextDeskId } =
    returnVariable();
  data[deskId].forEach((el, i) => {
    if (el.id === cardId) {
      data[deskId].splice(i, 1);
      data.todo.push({
        title: title,
        description: description,
        id: cardId,
      });
    }
  });

  drawList(data, "deleted");
  drawList(data, "todo");
  console.log(data.deleted);
};

const clearAllFromDeleted = (data) => {
  data.deleted = [];
  drawList(data, "deleted");
};

const init = () => {
  const addCardButton = document.querySelector("#addCardButton");
  const cardBlocks = document.querySelector(".cardBlocks");

  const data = {
    todo: [],
    inProgress: [],
    done: [],
    deleted: [],
  };

  addCardButton.addEventListener("click", (event) => {
    addCards(data);
  });

  cardBlocks.addEventListener("click", (event) => {
    switch (event.target.classList.value) {
      case "deleteButton":
        deleteCard(data);
        break;
      case "editButton":
        editCard(data);
        break;
      case "nextButton":
        createNextCard(data);
        break;
      case "return":
        restoreCard(data);
        break;
      case "clearAllButton":
        clearAllFromDeleted(data);
        break;
      default:
        break;
    }
  });
};

init();
