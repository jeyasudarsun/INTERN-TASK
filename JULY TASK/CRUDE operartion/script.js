var selectedRow = null;
function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
function clearFields() {
    document.querySelector('#firstname').value = "";
    document.querySelector('#lastname').value = "";
    document.querySelector('#Rollno').value = "";
}
document.querySelector('#student-form').addEventListener("submit", (e) => {
    e.preventDefault();

    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const rollno = document.querySelector('#Rollno').value;

    if (firstname === "" || lastname === "" || rollno === "") {
        showAlert("Please fill all fields", "danger");
    }
    else {
        if (selectedRow === null) {
            const list = document.querySelector('#student-list');
            const row = document.createComment("tr");

            row.innerHTML = `
                <td>${firstname}</td>
                <td>${lastname}</td>
                <td>${rollno}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = row;
            showAlert("Student Added Successfully", "success");
        }
        else {
            selectedRow.children[0].textContent = firstname;
            selectedRow.children[1].textContent = lastname;
            selectedRow.children[2].textContent = rollno;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
        clearFields();
    }
});

document.querySelector('#student-list').addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector('#firstname').value = selectedRow.children[0].textContent;
        document.querySelector('#lastname').value = selectedRow.children[1].textContent;
        document.querySelector('#Rollno').value = selectedRow.children[2].textContent;
    }
});

document.querySelector('#student-list').addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Deleted Successfully", "danger");
    }
});