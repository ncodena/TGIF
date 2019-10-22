window.onscroll = function() {scrollFunction()};

const key = "a8pl8KzuwKgro4HqqUgj2pZ00fsE1DmhRqBm1FPG"
const currentPage = window.location.pathname.split("/").pop()
const senateUrl = 'https://api.propublica.org/congress/v1/115/senate/members.json'
const houseUrl = 'https://api.propublica.org/congress/v1/115/house/members.json'

let members;


if (currentPage == "senate-starter-page.html") {
    members = getData(senateUrl)

} else if (currentPage == "house-starter-page.html") {
    members = getData(houseUrl)
}

async function getData(url) {
    members = await fetch(url, {
            method: "GET",
            headers: {
                "X-API-KEY": key
            },
            dataType: "jsonp"
        })
        .then(dataReturnedByPreviousAwaitFunction => dataReturnedByPreviousAwaitFunction.json())
        .then(dataFormatted => dataFormatted.results[0].members)
        .catch(error => console.log(error))
    await (executeOnceDataIsFetched())
}

function getFilteredStates(selectId, members) {
    let select = document.getElementById(selectId);
    // Display array with the unique values
    let statesArray = []
    for (let i = 0; i < members.length; i++) {
        if (!statesArray.includes(members[i].state)) {
            statesArray.push(members[i].state)
        }
    }
    statesArray.sort()
    for (let i = 0; i < statesArray.length; i++) {
        // the members array has been replaced by the statesArray with the unique values
        // let state = members[i].state; //not working anymore since we created the new array
        let option = document.createElement("option")
        option.value = statesArray[i];
        option.innerHTML = statesArray[i];
        select.appendChild(option);
    }
}

function filterData() {
    let arrayOfCheckedBoxes = document.querySelectorAll("input[type=checkbox]")
    let checkedCheckboxes = getOnlyTheCheckedOnes(arrayOfCheckedBoxes)
    let selectedInput = document.getElementById('states-dropdown')
    let selectedState = getSelectedState(selectedInput.options)
    let filteredMembers = getFilteredMembers(checkedCheckboxes, selectedState)
    creatTable("main-table", filteredMembers)
}

function getFilteredMembers(selectedParty, selectedState) {

    let getFilteredMembers = [];
    for (let i = 0; i < members.length; i++) {
        let party = members[i].party;
        let state = members[i].state;
        if (selectedParty.includes(party) && (selectedState == state || selectedState == "all")){
            getFilteredMembers.push(members[i])
        }
        
    }
    return getFilteredMembers;
}

// ADD THE EVENT LISTENERS TO FILTER
document.getElementById("democrat").addEventListener("click", filterData);
document.getElementById("republican").addEventListener("click", filterData);
document.getElementById("independent").addEventListener("click", filterData);
document.getElementById("states-dropdown").addEventListener("change", filterData)


// filterData()
function getOnlyTheCheckedOnes(checkboxes) {
    // console.log("i am inside chetChekced function")
    let checked = [];
    for (let j = 0; j < checkboxes.length; j++) {
        // console.log(checkboxes[j])
        if (checkboxes[j].checked) checked.push(checkboxes[j].value);
    }
    return checked;
}

function getSelectedState(statesArray) {
    // console.log(statesArray)
    for (let i = 0; i < statesArray.length; i++) {
        if (statesArray[i].selected) {
            return statesArray[i].value
        }
    }
    return false
}


function creatTable(tableId, members) {

    let table = document.getElementById(tableId);
    // console.log("me acabas de llamar")
    // console.log(table, tableId)
    table.innerHTML = "";

    let th = document.createElement("tr")
    th.insertCell().innerHTML = "NAME"
    th.insertCell().innerHTML = "PARTY"
    th.insertCell().innerHTML = "STATE"
    th.insertCell().innerHTML = "YEARS IN OFFICE"
    th.insertCell().innerHTML = "% VOTES W/PARTY"

    table.appendChild(th)

    for (let i = 0; i < members.length; i++) {
        // console.log("inside function for loop")
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
        // console.log(row)
        table.appendChild(row);
    }
}

function loadingDisplay (){
    let toRemove = document.getElementById("hiddenContent");
    toRemove.classList.remove("hiddenContainer")

    let loaderRemoval = document.getElementById("loader");
    loaderRemoval.classList.remove("lds-spinner")
}
function readingButton() {
    let dots = document.getElementById("dots");
    let moreText = document.getElementById("more");
    let btnText = document.getElementById("myBtn");
  
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

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("myHeader").style.fontSize = "30px";
  } else {
    document.getElementById("myHeader").style.fontSize = "90px";
  }
}

function executeOnceDataIsFetched() {
    getFilteredStates("states-dropdown", members)
    creatTable("main-table", members);
    loadingDisplay()
    readingButton()
}
