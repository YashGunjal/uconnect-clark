import DataService from "./DataService"

var CommentServices = {
    addCommentTopost: async function(data) {
        let response = await DataService.post("api/v1/comment/add", data);
        return response.data
    },
    addLikeOnComment: async function (data){
        let response = await DataService.post("api/v1/comment/addlike", data);
        return response
    }

}
export default CommentServices;
