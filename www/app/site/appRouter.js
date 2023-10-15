import express from 'express';
import app from './../index.js'

let _appRouter = () => {

    return {
        addGetController: (...params) => {
            let prefixPath;
            !params.prefixPath ? prefixPath="/api" : prefixPath = params.prefixPath
            params.prefixPath && delete params["prefixPath"]
            var router = new express.Router()
           
            router.get(...params);
            
            app.use(prefixPath, router)
        },
        addPutController: (...params) => {
            let prefixPath;
            !params.prefixPath ? prefixPath="/api" : prefixPath = params.prefixPath
            params.prefixPath && delete params["prefixPath"]
            var router = new express.Router()
            router.put(...params);
            app.use(prefixPath, router)
        },
        addPostController: (...params) => {
            let prefixPath;
            !params.prefixPath ? prefixPath="/api" : prefixPath = params.prefixPath
            params.prefixPath && delete params["prefixPath"]
            var router = new express.Router()
            router.post(...params);
            app.use(prefixPath, router)
        },
        
        /**
         * This function has been created to create a post route which accepts multiple number of middleware
         * functions. Any number of middleware functions can be passed inside the middleware array
         * @param {*} path 
         * @param {*} middleware 
         * @param {*} fn 
         * @param {*} prefixPath 
         */
        addPostControllerWithMiddleware: (path,middleware = [], fn, prefixPath = '/api') => {
            var router = new express.Router()
            if (middleware === []) {
                router.post(path, fn);
            }
            else{
                router.post(path, middleware, fn);
            }
            app.use(prefixPath, router)
        },
        addDeleteController: (path,verfiyFn, fn = null, prefixPath = '/api') => {
            var router = new express.Router()
            if (fn ===null) {
                router.delete(path, verfiyFn);
            }
            else{
                router.delete(path, verfiyFn, fn);
            }
            app.use(prefixPath, router)
        },
    };


}

const appRouter = _appRouter();
export default appRouter;