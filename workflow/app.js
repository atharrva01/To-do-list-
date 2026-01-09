let curr_name = localStorage.getItem("currentUser");
if (!curr_name) {
  alert("No active user");
}
document.querySelector("#username").textContent = curr_name 
let form = document.querySelector("form")
let user_input = document.querySelector("#user_input")
let main_div = document.querySelector(".footer");

function isValidTask(text) {
  return text.length >= 3;
}

function searchTask(currentUser) {
  const searchInput = document.querySelector("#search_bar");

  searchInput.addEventListener("input", function (e) {
    const query = e.target.value.toLowerCase();

    const allData = JSON.parse(localStorage.getItem("data")) || {};
    const userTasks = allData[currentUser] || [];

    const filteredTasks = userTasks.filter((task) => task.task.includes(query));

    renderFilteredTasks(filteredTasks);
  });
}

function renderFilteredTasks(tasks) {
  main_div.innerHTML = "";

  if (tasks.length === 0) {
    const noMatch = document.createElement("h4");
    noMatch.textContent = "No matching tasks found.";
    main_div.appendChild(noMatch);
    return;
  }

  tasks.forEach((a) => {
    let h3 = document.createElement("h3");
    h3.textContent = a.task;

    let h5 = document.createElement("h5");
    h5.textContent = a.completion ? "completed" : "not completed";

    let task_div = document.createElement("div");

    let edit_btn = document.createElement("button");
    edit_btn.textContent = "Edit Task";

    let remove_btn = document.createElement("button");
    remove_btn.textContent = "Remove Task";

    let complete_btn = document.createElement("button");
    complete_btn.textContent = a.completion
      ? "Mark as not complete"
      : "Mark as complete";

    task_div.append(h3, h5, edit_btn, remove_btn, complete_btn);
    main_div.appendChild(task_div);

    remove_btn.onclick = () => removeTask(curr_name, a.id);
    complete_btn.onclick = () => complete_task(curr_name, a.id);
    edit_btn.onclick = () => {
      displayTask(curr_name);
    };
  });
}


function saveTask(username, taskText) {
    const allData = JSON.parse(localStorage.getItem("data")) || {};
    if (!allData[username]) {
        allData[username] = [];
    }

    const new_task_obj = {
      id: Date.now(),
      task: taskText.toLowerCase(),
      completion: false,
      createdAt: Date.now(),
    };
    allData[username].push(new_task_obj);

    localStorage.setItem("data", JSON.stringify(allData));
}

function removeTask(currentUser, taskID) {
    const allData = JSON.parse(localStorage.getItem("data")) || {};
  if (allData[currentUser]) {
    allData[currentUser] = allData[currentUser].filter((a) => a.id !== taskID);
  }
  localStorage.setItem("data", JSON.stringify(allData));

  displayTask(currentUser);
}

function complete_task(currentUser, taskID) {
    const allData = JSON.parse(localStorage.getItem("data")) || {};
    if (allData[currentUser]) {
        allData[currentUser] = allData[currentUser].map(a => {
            if (a.id === taskID) {
                a.completion = !a.completion
            }
            return a 
        })
    }
    localStorage.setItem("data", JSON.stringify(allData))
    
    displayTask(currentUser);
}

function editTask(currentUser, taskID , new_task ) {
    const allData = JSON.parse(localStorage.getItem("data")) || {}
    allData[currentUser] = allData[currentUser].map(a => {
        if (a.id === taskID) {
            a.task = new_task
        }
        return a
    })
    localStorage.setItem("data" , JSON.stringify(allData))
    displayTask(currentUser);
}

function displayTask(currentUser) {
    const allData = JSON.parse(localStorage.getItem("data")) || {};
    const userTasks = allData[currentUser] || [];


    userTasks.sort((a, b) => {
      const timeA = a.createdAt ?? a.id;
      const timeB = b.createdAt ?? b.id;
      return timeA - timeB;
    });


    let total_tasks = document.querySelector("#total-task");
    total_tasks.textContent = `Total Tasks: ${userTasks.length}`;

    let completed_task = document.querySelector("#completed-task");
    let completed_tasks = userTasks.filter(a => a.completion === true)
    completed_task.textContent = `Completed Tasks:- ${completed_tasks.length}`

    main_div.innerHTML = ""
    
    if (userTasks.length === 0) {
      document.querySelector("#search_bar").style.display = "none";
      document.querySelector("#no-tasks").style.display = "initial";
    } else {
        document.querySelector("#no-tasks").style.display = "none";
        document.querySelector("#search_bar").style.display = "initial";

        userTasks.forEach(a => {
            let h3 = document.createElement("h3")
            h3.textContent = a.task; 
            let h5 = document.createElement("h5")
            
            let task_div = document.createElement("div")
            let edit_task_btn = document.createElement("button")
            edit_task_btn.textContent = "Edit Task"
            let remove_task_btn = document.createElement("button")
            remove_task_btn.textContent = "Remove Task"
            let complete_task_btn = document.createElement("button")
            

            if (a.completion === true) {
                h5.textContent = "completed";
                complete_task_btn.textContent = "Mark as not complete";
            } else {
                h5.textContent = "Not completed";
                complete_task_btn.textContent = "Mark as complete";
            }
            
            task_div.appendChild(h3)
            task_div.appendChild(h5)
            task_div.appendChild(edit_task_btn)
            task_div.appendChild(remove_task_btn)
            task_div.appendChild(complete_task_btn)
            main_div.appendChild(task_div)

            remove_task_btn.addEventListener("click", function (e) {
                removeTask(curr_name, a.id);
                
            })
            
            complete_task_btn.addEventListener("click", function (e) {
                complete_task(curr_name, a.id)
            })

            edit_task_btn.addEventListener("click", function (e) {

                let newUser_input = document.createElement("input")
                
                newUser_input.value = a.task
                let submit_btn = document.createElement("button")
                submit_btn.textContent = "save edited text"

                task_div.replaceChild(newUser_input, h3)
                task_div.appendChild(submit_btn)

                task_div.removeChild(edit_task_btn);
                task_div.removeChild(remove_task_btn);
                task_div.removeChild(complete_task_btn);
                task_div.removeChild(h5);

                submit_btn.addEventListener("click", function () {
                  let new_task = newUser_input.value.trim().toLowerCase();
                    if (isValidTask(new_task)) {
                        document.querySelector(".error").style.display = "none";
                        editTask(curr_name, a.id, new_task);
                                              
                    } else {
                        document.querySelector(".error").style.display = "block";
                        return;
                    }
                })
            })
            
        })
    }

}

displayTask(curr_name);

form.addEventListener("submit", function (e) {
    e.preventDefault()
    let task = user_input.value.trim();
    if (!isValidTask(task)) {
        document.querySelector(".error").style.display = "block"
        return;
    };
    document.querySelector(".error").style.display = "none";
    saveTask(curr_name, task)
    displayTask(curr_name)
    user_input.value = ""
})

searchTask(curr_name);
