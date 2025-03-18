document.getElementById("dob").addEventListener("input", function () {
    let dob = new Date(this.value);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    let monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    this.setCustomValidity(age < 18 || age > 55 ? "Age must be between 18 and 55." : "");
});

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let terms = document.getElementById("terms").checked;
    let userData = { name, email, password, dob, terms };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
});

function displayUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";
    users.forEach(user => {
        let row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.terms}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

document.addEventListener("DOMContentLoaded", displayUsers);
