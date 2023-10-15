import axios from 'axios';
import getConfig from './../constants/Config';

axios.defaults.withCredentials = true

function generateUrl(relativeUrl) {
    return [getConfig().REACT_BASE_URL, '/', relativeUrl].join('');
}
// using https://axios-http.com/docs/api_intro

var DataService = {
    get: function (relativeUrl, config ) {
        config={
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
                'Access-Control-Allow-Credentials': true,
              },
        }
        try {
            return axios.get(generateUrl(relativeUrl), config);
        }
        catch (error) {
            console.error(error);
        }
    },
    post: function (relativeUrl, data, config = {}) {
        config={
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
                'Access-Control-Allow-Credentials': true,
              },
        }
        try {
            return axios.post(generateUrl(relativeUrl), data, config);
        }
        catch (error) {
            console.error(error);
        }
    },
    
    postMultipart: function (relativeUrl, data, config = {}) {
        config={
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
                'Access-Control-Allow-Credentials': true,
              },
        }
        try {
            return axios.post(generateUrl(relativeUrl), data, config);
        }
        catch (error) {
            console.error(error);
        }
    },

    put: function (relativeUrl, data, config = {}) {
        config={
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
                'Access-Control-Allow-Credentials': true,
              },
        }
        try {
            return axios.put(generateUrl(relativeUrl), data, config);
        }
        catch (error) {
            console.error(error);
        }
    },

    delete: function (relativeUrl, data = false, config = {}) {
        config={
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
                'Access-Control-Allow-Credentials': true,
              },
        }
        try {
            if (data)
                return axios.delete(generateUrl(relativeUrl), {data:data}, config);
            else return axios.delete(generateUrl(relativeUrl), config)
        }
        catch (error) {
            console.error(error);
        }
    }
}
export default DataService;