import moment from "moment"
export function acceptedDateFormat(date){
    return moment(new Date(date)).format(
        "DD-MMM-YYYY"
      )
}