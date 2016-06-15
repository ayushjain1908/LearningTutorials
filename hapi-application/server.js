var Hapi = require('hapi');
var server = new Hapi.Server();
var Inert = require('inert');
var Vision = require('vision');
var CardStore = require('./lib/cardStore');
var UserStore = require('./lib/userStore');
CardStore.initialize();
UserStore.initialize();
server.connection({
  port : 3000
});

server.register(Inert,function(err){
  if(err)
    throw err;
});
server.register(Vision,function(err){
  if(err)
    throw err;
});
server.views({
  engines : {
    html : require('handlebars')
  },
  path : './templates'
});

// server.register({
//   register : require('good'),
//   options : {
//     opsInterval : 5000,
//     reporters : [
//       {
//         reporter  : require('good-file'),
//         events : {ops : '*'},
//         config : {
//             path : './logs',
//             prefix : 'hapi-process',
//             rotate : 'daily'
//       }
//     },
//     {
//        reporter : require('good-file'),
//        events : {response : '*'},
//        config : {
//            path : './logs',
//            prefix : 'hapi-requests',
//            rotate : 'daily'
//       }
//    },
//    {
//       reporter : require('good-file'),
//       events : {error : '*'},
//       config : {
//           path : './logs',
//           prefix : 'hapi-error',
//           rotate : 'daily'
//      }
//    }
//   ]
//  }
// },function(err){
//   console.log(err);
// });
server.register(require('hapi-auth-cookie'),function(err){
  if(err){
    console.log(err);
  }
  server.auth.strategy('default','cookie',{
    password : 'myPassword',
    redirectTo : '/login',
    isSecure : false
  });
  server.auth.default('default');
})
server.ext('onRequest', function(request,reply){
  console.log('Request Recieved : ' + request.path);
  reply.continue();
});

server.ext('onPreResponse',function(request,reply){
  if(request.response.isBoom){
    return reply.view('error',request.response);
  }
  reply.continue();
})

server.route(require('./lib/routes'));
server.start(function(){
  console.log('Hapi Server running at ' + server.info.uri);
});
