import DataService from "./DataService"

var PostServices = {
    getPostbySubject: async function(subjectId) {
        const response = await DataService.get(`api/v1/post/get/${subjectId}`)
        return response.data

    },
    addPost: async function(data) {
        //sample data {subjectId:" "(int) , postContent: " "}
        let response = await DataService.post("api/v1/post/add", data);
        return response.data

    },

}
export default PostServices;


// {1:"SPS", 2:"SOM"}