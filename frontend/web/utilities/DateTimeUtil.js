import moment from "moment";
export function acceptedDateFormat(date) {
  return moment(new Date(date)).format("DD-MMM-YYYY");
}

export function dateTimeFormat(date) {
  return moment(new Date(date)).format("MMMM Do YYYY, h:mm:ss a");
}
