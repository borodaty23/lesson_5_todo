const drawList = (data, sectionId) => {
  let section = document.querySelector(`#${sectionId}`);
  console.log();
  section.innerHTML = "";
  data[sectionId].forEach((element) => {
    section.innerHTML += `
              <div class="card" id="${element.idd}">
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
                      : `<div> </div>`
                  }
                  
              </div>
          `;
  });
};

// const returnVariable = (card, title, description) => {
//   const card = event.target.closest(".card");
//   const title = card.querySelector(".title").textContent;
//   const description = card.querySelector(".description").textContent;

//   return {card, title, description};
// };

const deleteCard = (data, nextData) => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;
  const todoSection = document.querySelector("#todo");
  const ed = card.id;

  console.log();

  data.forEach((el, i) => {
    if (el.title === title && el.description === description && el.idd == ed) {
      data.splice(i, 1);
      nextData.push({
        title: title,
        description: description,
        idd: ed,
      });
    }
  });
};

const editCard = (dataType, modalWrapper, sectionType, data) => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;
  const ed = card.id;

  const newTitile = document.querySelector("#title");
  const newDescription = document.querySelector("#description");
  const submitButton = document.querySelector("#submit");

  modalWrapper.style.display = "block";

  newTitile.value = title;
  newDescription.value = description;

  submitButton.addEventListener("click", (event) => {
    dataType.forEach((el, i) => {
      if (
        el.title === title &&
        el.description === description &&
        el.idd == ed
      ) {
        dataType.splice(i, 1, {
          title: newTitile.value,
          description: newDescription.value,
          idd: ed,
        });
      }
      console.log("dataTodo", data.todo);
      console.log("dataInprog", data.inProgress);
      drawList(data, sectionType);
      modalWrapper.style.display = "none";
    });
  });

  const closeButton = document.querySelector("#closeButton");
  closeButton.addEventListener("click", () => {
    modalWrapper.style.display = "none";
  });
};

const createNextCard = (data, nextData) => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;
  const ed = +card.id;

  data.forEach((el, i) => {
    if (el.title === title && el.description === description && el.idd === ed) {
      data.splice(i, 1);
      nextData.push({ title: title, description: description, idd: ed });
      console.log(nextData);
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
  const sectionDeleted = document.querySelector("#delete");
  const sectionDone = document.querySelector("#done");

  const data = {
    todo: [],
    inProgress: [],
    done: [],
    deleted: [],
  };

  addCardButton.addEventListener("click", (event) => {
    event.preventDefault(); // препятствует перезагрузке страницы при нажатии на кнопку в форме

    data.todo.push({
      title: inputTitle.value,
      description: inputDescription.value,
      idd: Date.now(),
    });
    drawList(data, "todo");
    console.log("dataTodo", data.todo);
    form.reset();

    cardBloks.addEventListener("click", (event) => {
      const desc = event.target.closest(".desc");

      const deskId = event.target.closest(".desc").id;

      const desksIdMass = [...document.querySelectorAll(".desc")].map(
        (desk) => desk.id
      );

      const nextDeskId = desksIdMass.findIndex((id) => id === deskId) + 1;

      switch (event.target.classList.value) {
        case "deleteButton":
          deleteCard(data[deskId], data.deleted);
          drawList(data, deskId);
          drawList(data, "deleted");

          break;
        case "editButton":
          editCard(data[deskId], modalWrapper, deskId, data);

          break;
        case "nextButton":
          // if (desc.id === "todo") {
          //   createNextCard(data.todo, data.inProgress);
          //   drawListt(data.inProgress, sectionInProgress);
          //   drawListt(data.todo, todoSection);
          // } else if (desc.id === "inProgress") {
          //   createNextCard(data.inProgress, data.done);
          //   drawListt(data.inProgress, sectionInProgress);
          //   drawListt(data.done, sectionDone);
          // }
          console.log(deskId);
          createNextCard(data[deskId], data[desksIdMass[nextDeskId]]);
          drawList(data, [desksIdMass[nextDeskId]]);
          drawList(data, deskId);

          break;
        case "clearAllButton":
          data.deleted = [];
          drawList(data, "deleted");

          break;
        default:
          break;
      }
    });
  });
};

init();
