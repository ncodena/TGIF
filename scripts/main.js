//TABLES

const members = data.results[0].members;
let checkboxes = document.querySelectorAll("input[type = checkbox]");
let selectedInput = document.getElementById("states-dropdown");

creatTable("main-table", members);
function creatTable(tableId, members) {

    let table = document.getElementById(tableId);
    table.innerHTML= "";
    for (let i = 0; i < members.length; i++) {
        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }
        let fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        let party = members[i].party;
        let state = members[i].state;
        let seniority = members[i].seniority;
        let votes = members[i].votes_with_party_pct;

        let row = document.createElement('tr')
        row.insertCell().innerHTML = fullName;
        row.insertCell().innerHTML = party;
        row.insertCell().innerHTML = state;
        row.insertCell().innerHTML = seniority;
        row.insertCell().innerHTML = votes;
        table.append(row);
    }
}

// BUTTON
function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }

//FILTER


//To create a function which filter the members

function getFilteredMembers(){
    let getFilteredMembers = [];
    for (let i = 0; i< members.length; i++){
        let party = members[i].party;
        let state = members[i].state;
        if(getChecked().includes(party) && (selectedInput.value == state || selectedInput.value == "all"))
        getFilteredMembers.push(members[i]);
    }
    return getFilteredMembers; 
}

//To get the checked elements from the value


function getChecked(){
    let checked = [];
    for (let j = 0; j< checkboxes.length; j++){
        let checkbox = checkboxes[j];
        if(checkbox.checked)
        checked.push(checkbox.value);
    }
    return checked;
}
//Create the filtered table

function getFilteredTable(){
    let newFilteredMembers = getFilteredMembers();
    creatTable("main-table", newFilteredMembers);
}
//Event/action
// checkboxes.forEach(checkbox => {
//     checkbox.addEventListener("click", getFilteredTable);
// })

document.getElementById("democrat").addEventListener("click", getFilteredTable);
document.getElementById("republican").addEventListener("click", getFilteredTable);
document.getElementById("independent").addEventListener("click", getFilteredTable);
selectedInput.addEventListener("change", getFilteredTable)

//   //1. array of all the states, get the unique values, then sort it. Dropdown menu.
getFilteredStates("states-dropdown")

function getFilteredStates(selectId){
    let select = document.getElementById(selectId);
    // select.innerHTML="";
    // Display array with the unique values

    let statesArray = []
    for (let i = 0; i< members.length; i++){
        if (!statesArray.includes(members[i].state)){
            statesArray.push(members[i].state)
        }
    }

statesArray.sort();
    for (let i = 0; i< statesArray.length; i++){ // the members array has been replaced by the statesArray with the unique values
        // let state = members[i].state; //not working anymore since we created the new array
        let option = document.createElement("option")
        option.value= statesArray[i];
        option.innerHTML = statesArray[i];
        select.appendChild(option);
    }
}
//   //2. add the functionality of filter inside my filter function.
