const members = data.results[0].members;

// GLANCE TABLE


function getNumberMembers() {

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
            republicans = republicansVotes + members[i].votes_with_party_pct;
            republicans++
        } else if (members[i].party.includes("D")) {
            democratsVotes = +members[i].votes_with_party_pct;
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
    document.getElementById('total').innerHTML = total;
    document.getElementById('republicansVotes').innerHTML = (republicansVotes / republicans).toFixed(2) + "%";
    document.getElementById('democratsVotes').innerHTML = (democratsVotes / democrats).toFixed(2) + "%";
    document.getElementById('independentsVotes').innerHTML = (independentsVotes / independents).toFixed(2) + "%";
    document.getElementById('totalVotes').innerHTML = (totalVotes / total).toFixed(2) + "%";
    "votes_with_party_pct"
}

getNumberMembers();

// ATTENDANCE TABLE 

function getData() {
    let array = []

    for (let i = 0; i < members.length; i++) {
        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }
        let fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        let missedVotes = members[i].missed_votes;
        let missedVotesPCT = members[i].missed_votes_pct;

        array.push({fullName, missedVotes, missedVotesPCT})

    }
    return array.sort(function (a, b) {
        return b.missedVotes - a.missedVotes
    })
}

const dataEngagement = getData();

  
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
const leastEngagedMembers = getEngagement(dataEngagement);
const mostEngagedMembers = getEngagement(dataEngagement.reverse())

function engagementTable(tableId, members) {
    let table = document.getElementById(tableId);
    if(table) {
    for (let i = 0; i < members.length; i++) {

        let name = members[i].fullName;
        let missedVotes = members[i].missedVotes;
        let votes = members[i].missedVotesPCT;
        
        let row = document.createElement('tr')
        row.insertCell().innerHTML = name;
        row.insertCell().innerHTML = missedVotes;
        row.insertCell().innerHTML = votes;
        table.append(row);
    }
}
}


engagementTable("least-table",leastEngagedMembers);
engagementTable ("most-table", mostEngagedMembers);
