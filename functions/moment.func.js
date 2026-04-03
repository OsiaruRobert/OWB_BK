// 1. Get current day and time
export function getCurrentDateTime() {
  return new Date();
}

// 2. Get date 5 minutes from now
export function getFiveMinutesFromNow() {
  return new Date(Date.now() + 2 * 60 * 1000);
}

// 3. Get difference in minutes between two dates
export function getDifferenceInMinutes(date1, date2) {
  console.log(date2,"-",date1)
  console.log("currentTime","-","Expiretime")
  
  const diffInMs = date2 - date1;
  return Math.floor(diffInMs / (1000 * 60));
}

// Alternative: Get difference with direction (positive/negative)
export function getSignedDifferenceInMinutes(date1, date2) {
  console.log(date1,date2)
  const diffInMs = date2 - date1;
  return Math.floor(diffInMs / (1000 * 60));
}






export function getDifferenceInMinutesS(date1, date2, decimalPlaces = 2) {
    const diffInMs = Math.abs(new Date(date1) - new Date(date2));
    const diffInMinutes = diffInMs / (1000 * 60);
    return Number(diffInMinutes.toFixed(decimalPlaces));
}



