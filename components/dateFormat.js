const formatDate = date => {
  let formattedDate = '';
  formattedDate += pad(date.getDate());
  formattedDate += '.';
  formattedDate += pad(date.getMonth() + 1);
  formattedDate += '.';
  formattedDate += date.getFullYear();
  formattedDate += ' ';
  formattedDate += pad(date.getHours());
  formattedDate += ':';
  formattedDate += pad(date.getMinutes());
  formattedDate += ':';
  formattedDate += pad(date.getSeconds());
  return formattedDate;
};

const pad = (value) =>  ('0' + value).slice(-2)
export default formatDate;
