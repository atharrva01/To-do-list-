let form = document.querySelector("form")
let task = document.querySelector("#task")

let tasks_div = document.querySelector(".tasks")

form.addEventListener("submit", function (detl) {
    detl.preventDefault()
    if (task.value.length < 3) {
        document.querySelector("#error-msg").style.display = "initial";
    } else {
        
        document.querySelector("#error-msg").style.display = "none";
    
        let per_task = document.createElement("div")
        let h3 = document.createElement("h3")
        let edit_btn = document.createElement("button")
        edit_btn.textContent = "Edit task"
    
        let remove_btn = document.createElement("button")
        remove_btn.textContent = "Remove Task"

        h3.textContent = task.value;
    
        per_task.appendChild(h3)
        per_task.appendChild(edit_btn)
        per_task.appendChild(remove_btn)

        tasks_div.appendChild(per_task)

        remove_btn.addEventListener("click", function () {
            tasks_div.removeChild(per_task);
            alert("task removed success")
        })

        edit_btn.addEventListener("click", function () {
            let new_inp = document.createElement("input")
            new_inp.value = h3.textContent
            per_task.replaceChild(new_inp, h3);
            edit_btn.style.display = "none"
            remove_btn.style.display = "none"
            let sub = document.createElement("button")
            sub.textContent = "save edited task"
            per_task.appendChild(sub)

            sub.addEventListener("click", function () {
                h3.textContent = new_inp.value
                per_task.replaceChild(h3, new_inp)
                edit_btn.style.display = "initial";
                remove_btn.style.display = "initial";
                sub.style.display = "none"
            })
        })
    }
})