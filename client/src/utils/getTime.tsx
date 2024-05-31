import moment from "moment";

const getDate = (date: any) => {
  const formattedDate = moment(date).format("DD-MM-YYYY");
  return formattedDate;
};

const getTime = (date: any) => {
  const formattedDate = moment(date).format("HH:mm");
  return formattedDate;
};

export { getDate, getTime };
