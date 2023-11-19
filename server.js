'use strict';
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const path = require('path')
const init = async () => {

    const server = Hapi.server({
        host : 'localhost',
        port : 444

    });

 await server.register([{
    plugin: Inert
 }]);


    server.route({
        method : 'GET',
        path : '/',
        handler : (request,h) =>{
            return  h.file ('./test.html');
        },
        options:{
            files:{
                relativeTo: path.join(__dirname,'static')
            }
        }
    });

    server.route({
        method : 'GET',
        path : '/articles/{id}',
        handler : (request,h) =>{
            return `test ${request.params.id}`;
        }
    });


    await server.start();
    console.log(`Server started on: ${server.info.uri}`);

} 

process.on('unhandledRejection',(err) => {
    console.log(err);
    process.exit(1);
});

init();
