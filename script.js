let form = document.querySelector("form")
let user_name = document.querySelector("#name")

form.addEventListener("submit", function (e) {
    e.preventDefault()
    if (user_name.value.trim().length >= 3) {
        localStorage.setItem("currentUser", user_name.value.trim())
        window.location.href = "./screens/app.html"
        document.querySelector("#error-msg").style.display = "none";
    } else {
        document.querySelector("#error-msg").style.display = "initial";
    }
})

