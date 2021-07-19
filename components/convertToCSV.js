const convertToCSV = data => {
  var csv = 'Name,Age,Sex,Points,Date,Time\n';
  Object.keys(data).forEach(user => {
    data[user].results.forEach(result => {
      csv += addUserData(user, data);
      csv += result.points + ',';
      csv += result.date + '\n';
    });
  });

  return csv;
};

const addUserData = (user, data) => {
  let csv = '';
  const values = data[user];
  csv += user + ',';
  csv += values.age + ',';
  csv += values.sex + ',';
  return csv;
};

export default convertToCSV;
