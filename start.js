#!/usr/bin/env node
const { exec } = require("child_process");

async function start() {
    
    console.log("Running Servers");

    await new Promise(async resolve => {
        exec("npm run serve", {cwd: './www'})
            .stdout.on('data', 
                function(data) {
                    console.log(data); 
                    resolve();
                }
            )
        }
    );
    await new Promise(async resolve => {
        exec("pm2 logs", {cwd: './www'})
            .stdout.on('data', 
                function(data) {
                    console.log(data); 
                    resolve();
                }
            )
        }
    );

    // await new Promise(async resolve => {
    //         exec("npm run start-web", {cwd: './frontend'})
    //         .stdout.on('data', 
    //             function(data) {
    //                 console.log(data); 
    //                 resolve();
    //             }
    //         )
    // });
}

try {
start();
}
catch(e) {
    console.log(e);
}