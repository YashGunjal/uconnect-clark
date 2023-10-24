export function Capitalize(str) {
  if ((str == "") | (str == undefined)) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
