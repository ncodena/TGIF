let members;
let senateUrl = 'https://api.propublica.org/congress/v1/115/senate/members.json'
let houseUrl = 'https://api.propublica.org/congress/v1/115/house/members.json'
let key = "a8pl8KzuwKgro4HqqUgj2pZ00fsE1DmhRqBm1FPG"

// API related stuff

if (location.pathname.includes("house")) {
    getData(houseUrl)
} else {
    getData(senateUrl)
}
async function getData(url) {
    members = await fetch(url, {
            method: "GET",
            headers: {
                "X-API-KEY": key
            },
            dataType: "jsonp"
        })
        .then(data => data.json())
        .then(data => data.results[0].members)
        .catch(error => console.log(error))
    await (executeOnceDataIsFetched())
}

function executeOnceDataIsFetched() {


    members = members.filter(
        function (member) {
            return member.votes_with_party_pct >= 0 && member.missed_votes != null
        }
    )
    getNumberMembers("glance-table")
    const dataEngagement = getDataMembers();
    const leastEngagedMembers = getEngagement(dataEngagement);
    const mostEngagedMembers = getEngagement(dataEngagement.reverse())
    engagementTable("least-table", leastEngagedMembers);
    engagementTable("most-table", mostEngagedMembers);

    const dataLoyalty = getLoyaltyData();
    const mostLoyal = getLoyalty(dataLoyalty)
    const leastLoyal = getLoyalty(dataLoyalty.reverse())
    engagementTableLoyalty("least-tableLoyalty", leastLoyal);
    engagementTableLoyalty("most-tableLoyalty", mostLoyal);
    loadingDisplay()
    // call it here
}

// create a function that removes the "invisible" class from the table div
//         and applies the "invisible" class to the loader

function loadingDisplay() {
    let toRemove = document.getElementById("hiddenContent");
    toRemove.classList.remove("hiddenContainer")

    let loaderRemoval = document.getElementById("loader");
    loaderRemoval.classList.remove("lds-spinner")

    let toAddFooter = document.getElementById("footer");
    toAddFooter.classList.remove("hiddenFooter")
}

// GLANCE TABLE

function getNumberMembers(glanceTableId) {

    let democrats = 0;
    let democratsVotes = 0;
    let republicans = 0;
    let republicansVotes = 0;
    let independents = 0;
    let independentsVotes = 0;
    let total = 0;
    let totalVotes = 0;

    for (let i = 0; i < members.length; i++) {
        if (members[i].party.includes("R")) {
            republicansVotes += members[i].votes_with_party_pct;
            republicans++
        } else if (members[i].party.includes("D")) {
            democratsVotes += members[i].votes_with_party_pct;
            democrats++
        } else {
            independentsVotes += members[i].votes_with_party_pct;
            independents++
        }
        total++;
        totalVotes += members[i].votes_with_party_pct;
    }
    document.getElementById('republicans').innerHTML = republicans;
    document.getElementById('democrats').innerHTML = democrats;
    document.getElementById('independents').innerHTML = independents;
    console.log(independents)
    document.getElementById('total').innerHTML = total;
    document.getElementById('republicansVotes').innerHTML = (republicansVotes / republicans).toFixed(2) + "%";
    document.getElementById('democratsVotes').innerHTML = (democratsVotes / democrats).toFixed(2) + "%";
    document.getElementById('independentsVotes').innerHTML = 0 + "%"
    console.log(independentsVotes)
    document.getElementById('totalVotes').innerHTML = (totalVotes / total).toFixed(2) + "%";
    "votes_with_party_pct"


}

// ATTENDANCE TABLE 
function getDataMembers() {
    let array = []

    for (let i = 0; i < members.length; i++) {
        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }
        let fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        let missedVotes = members[i].missed_votes;
        let missedVotesPCT = members[i].missed_votes_pct;
        // if(missedVotes != null){
        array.push({
            fullName,
            missedVotes,
            missedVotesPCT
        })
        // }
    }
    return array.sort(function (a, b) {
        return b.missedVotes - a.missedVotes
    })
}
// GET ENGAGEMENT FUNCTION
function getEngagement(allMembers) {
    let array = [];
    let tenPercent = (10 * allMembers.length) / 100;
    for (let i = 0; i < allMembers.length; i++) {
        if (i < tenPercent) {
            array.push(allMembers[i])
        } else if (array[array.length - 1].missedVotes == allMembers[i].missedVotes) {
            array.push(allMembers[i])
        } else {
            break;
        }
    }
    return array;
}

// GET ENGAGEMENT TABLE
function engagementTable(tableId, members) {
    let table = document.getElementById(tableId);
    if (table) {
        let th = document.createElement("tr")
        th.insertCell().innerHTML = "NAME"
        th.insertCell().innerHTML = "NUMBER OF MISSED VOTES"
        th.insertCell().innerHTML = "% MISSED"

        table.appendChild(th)
        for (let i = 0; i < members.length; i++) {

            let name = members[i].fullName;
            let missedVotes = members[i].missedVotes;
            let votes = members[i].missedVotesPCT;

            let row = document.createElement('tr')
            row.insertCell().innerHTML = name;
            row.insertCell().innerHTML = missedVotes;
            row.insertCell().innerHTML = votes + "%";
            table.append(row);
        }
    }
}

// PARTY LOYALTY
function getLoyaltyData() {
    let arrayData = []

    for (let i = 0; i < members.length; i++) {
        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }
        let fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        let partyVotes = ((members[i].votes_with_party_pct / 100) * members[i].total_votes).toFixed()
        let partyVotesPCT = members[i].votes_with_party_pct
        arrayData.push({
            fullName,
            partyVotes,
            partyVotesPCT
        })

    }
    // console.log(arrayData)
    return arrayData.sort(function (a, b) {
        return b.partyVotesPCT - a.partyVotesPCT
    })

}

function getLoyalty(allMembers) {
    let arrayLoyals = [];
    let tenPercent = (10 * allMembers.length) / 100;
    for (let i = 0; i < allMembers.length; i++) {
        if (i < tenPercent) {
            arrayLoyals.push(allMembers[i])
        } else if (arrayLoyals[arrayLoyals.length - 1].partyVotes == allMembers[i].missedVotes) {
            arrayLoyals.push(allMembers[i])
        } else {
            break;
        }
    }
    return arrayLoyals;
}

function engagementTableLoyalty(tableId, members) {
    let table = document.getElementById(tableId);
    if (table) {
        let th = document.createElement("tr")
        th.insertCell().innerHTML = "NAME"
        th.insertCell().innerHTML = "NUMBER OF PARTY VOTES"
        th.insertCell().innerHTML = "% PARTY VOTES"

        table.appendChild(th)
        for (let i = 0; i < members.length; i++) {

            let name = members[i].fullName;
            let partyVotes = members[i].partyVotes;
            let partyVotesPCT = members[i].partyVotesPCT;

            let row = document.createElement('tr')
            row.insertCell().innerHTML = name;
            row.insertCell().innerHTML = partyVotes;
            row.insertCell().innerHTML = partyVotesPCT + "%";
            table.append(row);
        }
    }
}