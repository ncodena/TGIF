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


// // PARTY LOYALTY TABLE

// const partyVotes = getPartyVotes(members)
// const dataLoyalty = getLoyalData();
// // const leastPMembers = 
// // const mostPMembers =


// engagementTableLoyalty("least-tableLoyalty",leastEngagedMembers);
// engagementTableLoyalty("most-tableLoyalty",mostEngagedMembers);











// // SENATE ATTENDANCE LEAST/MOST LOYAL TABLES



// // PARTY LOYALTY

// function getPartyVotes (allMembers){

//     let partyVotes = []

//     for (let i = 0;  i < allMembers.length; i++) {
//     let gettingVotes = (members[i].votes_with_party_pct / 100) * members[i].total_votes;
//     partyVotes.push(gettingVotes)
//     }
//     return partyVotes
// }
// console.log("partyVotes: ", partyVotes)
// function getLoyalData() {
//     let arrayData = []

//     for (let i = 0; i < members.length; i++) {
//         if (members[i].middle_name == null) {
//             members[i].middle_name = "";
//         }
//         let fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
//         let partyVotes = partyVotes;
//         let partyVotesPCT = members[i].votes_with_party_pct;
//         arrayData.push({fullName, partyVotes, partyVotesPCT})
//     }
//     console.log(arrayData)
    
//     return arrayData.sort(function (a, b) {
//         return b.partyVotes - a.partyVotes
//     })
// }

// function getLoyalty(allMembers) {
//     let arrayLoyals = [];
//     let tenPercent = (10 * allMembers.length) / 100;
//     for (let i = 0; i < allMembers.length; i++) {
//         if (i < tenPercent) {
//             arrayLoyals.push(allMembers[i])
//         } else if (arrayLoyals[arrayLoyals.length - 1].partyVotes == allMembers[i].missedVotes) {
//             arrayLoyals.push(allMembers[i])
//         } else {
//             break;
//         }
//     }
//     return arrayLoyals;
// }



// //     let tenPercent = (10 * allMembers.length) / 100;
// //     for (let i = 0; i < allMembers.length; i++) {
// //         if (i < tenPercent) {
// //             partyVotes.push(allMembers[i])
// //         } else if (partyVotes[partyVotes.length - 1].gettingVotes == allMembers[i].gettingVotes) {
// //             partyVotes.push(allMembers[i])
// //         } else {
// //         break;
// //         }
// //     }
// //     console.log(partyVotes)
// //     return partyVotes;    
// // }

// // SENATE PARTY LOYALTY LEAST/MOST LOYAL TABLES

// function engagementTableLoyalty(tableId, members) {
//     let table = document.getElementById(tableId);
//     if(table) {
//     for (let i = 0; i < members.length; i++) {

//         let name = members[i].fullName;
//         let partyVotes = members[i].partyVotes;
//         let partyVotesPCT = members[i].partyVotesPCT;
        
//         let row = document.createElement('tr')
//         row.insertCell().innerHTML = name;
//         row.insertCell().innerHTML = partyVotes;
//         row.insertCell().innerHTML = partyVotesPCT;
//         table.append(row);
//     }
// }
// }
