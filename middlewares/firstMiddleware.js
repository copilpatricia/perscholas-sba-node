module.exports = function(req, res, next) {
  const currentDate = new Date();

const currentHour = currentDate.getHours();
const currentMinute = currentDate.getMinutes();

console.log(`Time when you made a request - ${currentHour}:${currentMinute}`);
  next();
} 