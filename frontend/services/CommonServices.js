import DataService from "./DataService"

var CommonServices = {
    getDepartmentList: async function() {
        // const response = await DataService.get("api/states")
        // return response.data
        return ([
            { id: "1", name: "SPS" },
            { id: "2", name: "SOM" },
            { id: "3", name: "Arts" }])
    },

}
export default CommonServices;


// {1:"SPS", 2:"SOM"}