import DataService from "./DataService"

var SubjectServices = {
    getCoursesAndSubjects: async function(departmentId) {
        const response = await DataService.get(`api/v1/subject/getcourseandsubjects/${departmentId}`)
        return response.data

    },

}
export default SubjectServices;


// {1:"SPS", 2:"SOM"}