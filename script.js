const drawList = (dataType, sectionId) => {
  let section = document.querySelector(`#${sectionId}`);
  console.log();
  section.innerHTML = "";
  dataType.forEach((element) => {
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

const drawListt = (dataType, section) => {
  console.log();
  section.innerHTML = "";
  dataType.forEach((element) => {
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

//   return card, title, description;
// };

const deleteCard = (dataType, dataTypeDeleted) => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;
  const todoSection = document.querySelector("#todo");
  const ed = card.id;

  console.log();

  dataType.forEach((el, i) => {
    if (el.title === title && el.description === description && el.idd == ed) {
      dataType.splice(i, 1);
      dataTypeDeleted.push({
        title: title,
        description: description,
        idd: ed,
      });
    }
  });
};

const editCard = (dataType, modalWrapper, sectionType) => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;
  const ed = card.id;

  const newTitile = document.querySelector("#title");
  const newDescription = document.querySelector("#description");
  const submitButton = document.querySelector("#submit");
  const todoSection = document.querySelector("#todo");

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
  const ed = card.id;

  dataTodo.forEach((el, i) => {
    if (el.title === title && el.description === description && el.idd == ed) {
      dataTodo.splice(i, 1);
      inProgress.push({ title: title, description: description, idd: ed });
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
    drawListt(data.todo, todoSection);
    form.reset();

    cardBloks.addEventListener("click", (event) => {
      //   let a = event.target.closest("#todo");
      const desc = event.target.closest(".desc");
      const d = document.querySelectorAll(".desc");
      //   const nextDesc = desc.next().find("div.desc").id;
      const lastDesk = d[d.length - 1].id;
      switch (event.target.classList.value) {
        case "deleteButton":
          deleteCard(data[desc.id], data.deleted);
          drawList(data[desc.id], desc.id);
          drawList(data.deleted, lastDesk);

          break;
        case "editButton":
          editCard(data[desc.id], modalWrapper, desc.id);

          editCard(data[desc.id], modalWrapper, desc.id);

          editCard(data[desc.id], modalWrapper, desc.id);

          break;
        case "nextButton":
          if (desc.id === "todo") {
            createNextCard(data.todo, data.inProgress);
            drawListt(data.inProgress, sectionInProgress);
            drawListt(data.todo, todoSection);
          } else if (desc.id === "inProgress") {
            createNextCard(data.inProgress, data.done);
            drawListt(data.inProgress, sectionInProgress);
            drawListt(data.done, sectionDone);
          }
        //   createNextCard(data[desc.id], data.inProgress);
        //    drawList(data.inProgress, sectionInProgress);
        //     drawList(data.todo, todoSection);

          break;
        case "clearAllButton":
          data.deleted = [];
          drawList(data[desc.id], desc.id);

          break;
        default:
          break;
      }
    });
  });
};

init();
