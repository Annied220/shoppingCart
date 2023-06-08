import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://playground-8a5cc-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


onValue(shoppingListInDB, function(snapshot) {
    
    if (snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val())

        clearShoppingList()
    
        for (let i = 0 ; i < shoppingListArray.length ; i++) {
    
            let currentArray = shoppingListArray[i];
            let currentArrayId = currentArray[0];
            let currentArrayValue = currentArray[1]
    
            renders(currentArray)
        }
    } else {
        shoppingListEl.innerHTML ="Vợ ơi, nay mình đi chợ mua gì?"
    }

   

    
})


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    // console.log(`${inputValue} added to database`)

    clearInputField()



})

function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}


function clearInputField() {
    inputFieldEl.value = "";
}

// function renders(shoppingList) {
//     let listItems = "";
//     for ( let i = 0 ; i < shoppingList.length; i++) {
//         listItems = `<li>${shoppingList[i]}</li>`
//     }
//     shoppingListEl.innerHTML = listItems;
// }

function renders(item) {

    let itemID = item[0];
    let itemValue = item[1];

    //Use createElement method
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let locateItemById = ref(database, `shoppingList/${item[0]}`)

        remove(locateItemById)
    })

    shoppingListEl.append(newEl)
}

