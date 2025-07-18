import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { remove, push, getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


const firebaseConfig = {
    databaseURL: "https://crud-project-13a7f-default-rtdb.firebaseio.com/ ",
    apiKey: "AIzaSyAZyiq8GT8n4WGjjaMSQ_tdX7mhN9z4KmU",
    authDomain: "crud-project-13a7f.firebaseapp.com",
    projectId: "crud-project-13a7f",
    storageBucket: "crud-project-13a7f.firebasestorage.app",
    messagingSenderId: "916527280829",
    appId: "1:916527280829:web:8bc038702e380f060cbdd4"
}

const app = initializeApp(firebaseConfig)
const dataBase = getDatabase(app)
const userList = ref(dataBase, 'Users')

const elementId1 = document.querySelector('#id1')

const elementName = document.querySelector('#name')
const elementAge = document.querySelector('#age')
const elementEmail = document.querySelector('#email')
const elementForm = document.querySelector('#form1')
const elementTblBody = document.querySelector('#tbl-body')

elementForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!elementName.value.trim() || !elementAge.value.trim() || !elementEmail.value.trim()) {
        alert('Please fill all details')
        return;
    }
    if (elementId1.value) {
        set(ref(dataBase, "Users/" + elementId1.value), {
            name: elementName.value.trim(),
            age: elementAge.value.trim(),
            email: elementEmail.value.trim()
        })
        clearValue();
        return
    }


    const newUser = {
        name: elementName.value.trim(),
        age: elementAge.value.trim(),
        email: elementEmail.value.trim()
    }
    push(userList, newUser)
    clearValue();
})

function clearValue() {
    elementName.value = ""
    elementAge.value = ""
    elementEmail.value = ""
    elementId1.value = ""
}

onValue(userList, function (elementValue) {
    if (elementValue.exists()) {
        let userArray = Object.entries(elementValue.val())
        elementTblBody.innerHTML = ""
        for (let i = 0; i < userArray.length; i++) {
            let currentUser = userArray[i]
            let currentUserID = currentUser[0]
            let currentUserValue = currentUser[1]

            elementTblBody.innerHTML += `<tr>
      <th scope="row">${i + 1}</th>
      <td>${currentUserValue.name}</td>
      <td>${currentUserValue.age}</td>
      <td>@${currentUserValue.email}</td>
      <td><button class='btn-edit'  data-id=${currentUserID}><i class="fa-solid fa-file-edit btn-edit"></i></button></td>
      <td><button class='btn-delete' data-id=${currentUserID}><i class="fa-solid  fa-trash" ></i></button></td>
      </tr>`
        }
    }
    else {
        elementTblBody.innerHTML = "<tr><td colspan='6'>No Records found</td></tr>"
    }
})

document.addEventListener("click", function (e) {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.dataset.id
        const tdElements = e.target.closest("tr").children
        elementId1.value = tdElements[0].textContent
        elementName.value = tdElements[1].textContent
        elementAge.value = tdElements[2].textContent
        elementEmail.value = tdElements[3].textContent
        // console.log('Edit', id)
    }
  else if (e.target.closest('.btn-delete')) {
    const deleteBtn = e.target.closest('.btn-delete');
    const id = deleteBtn.dataset.id;
    if (confirm("Confirmation for Delete the Record!")) {
        const data = ref(dataBase, `Users/${id}`);
        remove(data);
    }
}

})