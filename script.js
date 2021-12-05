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
                  
              </di>
          `;
  });
};

const deleteCard = (dataType) => {
  const card = event.target.closest(".card");
  const title = card.querySelector(".title").textContent;
  const description = card.querySelector(".description").textContent;

  drawList(dataType);
  console.log(title, description);

  dataType.forEach((el, i) => {
    if (el.title === title && el.description === description) {
      dataType.splice(i, 1);

      console.log(dataType);
    }
  });
};

const editCard = (dataType, modalWrapper) => {
  const cardTwo = event.target.closest(".card");
  const titleTwo = cardTwo.querySelector(".title").textContent;
  const descriptionTwo = cardTwo.querySelector(".description").textContent;

  const newTitile = document.querySelector("#title");
  const newDescription = document.querySelector("#description");
  const NewButton = document.querySelector("#submit");

  modalWrapper.style.display = "block";

  newTitile.value = titleTwo;
  newDescription.value = descriptionTwo;

  NewButton.addEventListener("click", (event) => {
    dataType.forEach((el, i) => {
      if (el.title === titleTwo && el.description === descriptionTwo) {
        dataType.splice(i, 1, {
          title: newTitile.value,
          description: newDescription.value,
        });
      }

      drawList(dataType);
      modalWrapper.style.display = "none";
    });
  });

  const closeButton = document.querySelector("#closeButton");
  closeButton.addEventListener("click", () => {
    modalWrapper.style.display = "none";
  });
};

// const deleteCard = (dataType, todoList, modalWrapper) => {
//   todoList.addEventListener("click", (event) => {
//     switch (event.target.classList.value) {
//       case "deleteButton":
//         const card = event.target.closest(".card");
//         const title = card.querySelector(".title").textContent;
//         const description = card.querySelector(".description").textContent;

//         drawList(dataType);
//         console.log(title, description);

//         dataType.forEach((el, i) => {
//           if (el.title === title && el.description === description) {
//             dataType.splice(i, 1);

//             console.log(dataType);
//           }
//         });

//         break;
//       case "editButton":
//         const cardTwo = event.target.closest(".card");
//         const titleTwo = cardTwo.querySelector(".title").textContent;
//         const descriptionTwo =
//           cardTwo.querySelector(".description").textContent;

//         const newTitile = document.querySelector("#title");
//         const newDescription = document.querySelector("#description");
//         const NewButton = document.querySelector("#submit");

//         modalWrapper.style.display = "block";

//         newTitile.value = titleTwo;
//         newDescription.value = descriptionTwo;

//         NewButton.addEventListener("click", (event) => {
//           dataType.forEach((el, i) => {
//             if (el.title === titleTwo && el.description === descriptionTwo) {
//               dataType.splice(i, 1, {
//                 title: newTitile.value,
//                 description: newDescription.value,
//               });
//             }

//             drawList(dataType);
//             modalWrapper.style.display = "none";
//           });

//         });

//         const closeButton = document.querySelector("#closeButton");
//         closeButton.addEventListener("click", () => {
//           modalWrapper.style.display = "none";
//         });

//         break;
//       default:
//         break;
//     }
//   });
// };

const init = () => {
  const modalWrapper = document.querySelector(".wrapper");
  const todoList = document.querySelector(".todoList");
  const form = document.querySelector("#form");
  const inputTitle = document.querySelector("#inputTitle");
  const inputDescription = document.querySelector("#inputDescription");
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

    todoList.addEventListener("click", (event) => {
      switch (event.target.classList.value) {
          
        case "deleteButton":
          //   const card = event.target.closest(".card");
          //   const title = card.querySelector(".title").textContent;
          //   const description = card.querySelector(".description").textContent;

          //   drawList(data.todo);
          //   console.log(title, description);

          //   data.todo.forEach((el, i) => {
          //     if (el.title === title && el.description === description) {
          //       data.todo.splice(i, 1);

          //       console.log(data.todo);
          //     }
          //   });

          deleteCard(data.todo);

          break;
        case "editButton":
          editCard(data.todo, modalWrapper);
          //   const cardTwo = event.target.closest(".card");
          //   const titleTwo = cardTwo.querySelector(".title").textContent;
          //   const descriptionTwo =
          //     cardTwo.querySelector(".description").textContent;

          //   const newTitile = document.querySelector("#title");
          //   const newDescription = document.querySelector("#description");
          //   const NewButton = document.querySelector("#submit");

          //   modalWrapper.style.display = "block";

          //   newTitile.value = titleTwo;
          //   newDescription.value = descriptionTwo;

          //   NewButton.addEventListener("click", (event) => {
          //     data.todo.forEach((el, i) => {
          //       if (el.title === titleTwo && el.description === descriptionTwo) {
          //         data.todo.splice(i, 1, {
          //           title: newTitile.value,
          //           description: newDescription.value,
          //         });
          //       }

          //       drawList(data.todo);
          //       modalWrapper.style.display = "none";
          //     });
          //   });

          //   const closeButton = document.querySelector("#closeButton");
          //   closeButton.addEventListener("click", () => {
          //     modalWrapper.style.display = "none";
          //   });

          break;
        default:
          break;
      }
    });

    drawList(data.todo);
    // deleteCard(data.todo, todoList, modalWrapper);
  });
};

init();
