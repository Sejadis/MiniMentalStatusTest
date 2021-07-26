const convertToCSV = data => {
  let csv = 'Name,Age,Sex,Points,Date,Time,1,2,3,4,5,6,7,8,9,10,11\n';
  Object.keys(data).forEach(user => {
    data[user].results.forEach(result => {
      csv += addUserData(user, data);
      csv += result.points.totalPoints + ',';
      csv += result.date.replace(' ', ',') + ',';
      for (let i = 0; i < 11; i++) {
        csv += result.points[i] + ',';
      }
      csv = csv.replace(/,$/, '\n');
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
