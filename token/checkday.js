module.exports.checkDay = async() => {
    const today = new Date();
const dayOfWeek = today.getDay(); 

if (dayOfWeek !== 0 && dayOfWeek !== 6) {
  // It's not Saturday (0) or Sunday (6)
  console.log("It's a weekday!");
} else {
  console.log("It's Saturday or Sunday.");
}

  }