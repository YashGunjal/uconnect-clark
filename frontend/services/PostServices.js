import DataService from "./DataService"

var PostServices = {
    getPostbySubject: async function(subjectId) {
        const response = await DataService.get(`api/v1/post/get/${subjectId}`)
        return response.data

    },

}
export default PostServices;


// {1:"SPS", 2:"SOM"}