import DataService from "./DataService"

var CommonServices = {
    getDepartmentList: async function() {
        // const response = await DataService.get("api/getDepartments")
        // return response.data
        // Mock API call blelow
        return ([
            { id: "1", name: "SPS" },
            { id: "2", name: "SOM" },
            { id: "3", name: "Arts" }])
    },

}
export default CommonServices;
