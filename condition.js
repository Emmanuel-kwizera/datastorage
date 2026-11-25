let attendees = ["Isma", "Sharifa", "Mahboub", "Naomih"];
let ticketTiers = ["VVIP", "Regular", "Press", "Regular"];
let isTicketActive = [true, false, true, true];
let bagWeights = [6, 4, 9, 5];

let verifiedClearance = ["Isma", "Sharifa", "Naomih"];

function checkStadiumEntry(personName, extraBagWeight){
  
  let index = attendees.indexOf(personName)
  let totalWeight = bagWeights[index] + extraBagWeight

  if(index === -1){
    console.log("Denied: Name not found in ticket registry."
)
  }else if(!verifiedClearance.includes(personName)){
    console.log("Security Alert: Unverified person removed from queue.")
  }else if(!isTicketActive[index]){
    console.log("Denied: Please activate your ticket at Booth A first.")
  }else if(totalWeight > 10){
    console.log("Denied: Total bag weight exceeds the 10kg limit."
)
  }else if(ticketTiers[index] !== "Regular"){
    bagWeight[index] = totalWeight
    console.log("Priority Access: Welcome to the VVIP / Press Lounge!")
  }else{
    bagWeight[index] = totalWeight
    console.log("Standard Access: Welcome to General Seating!"
)
  }
}


checkStadiumEntry("Sharifa", 5)
// console.log(attendees)
