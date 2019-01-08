var log = require('libs/log')(module);
var config = require('config');
var async = require('async');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var sessionStore = require('libs/sessionStore');
var HttpError = require('error').HttpError;
var User = require('models/user').User;

function loadSession(sid, callback) {
  sessionStore.load(sid, function(err, session) {
    if (arguments.lenght == 0) {
      // no arguments => no session
      return callback(null, null);
    } else {
      return callback(null, session);
    }
  });
}

function loadUser(session, callback) {
  if (!session.user) {
    log.debug('Session %s is anonymus', session.id);
    return callback(null, null);
  }

  log.debug('retrieving user ', session.user);

  User.findById(session.user, function(err, user) {
    if (err) return callback(err);

    if (!user) {
      return callback(null, null);
    }
    log.debug('user findById result: ' + user);
    callback(null, user);
  });
}

module.exports = function(server) {
  var secret = config.get('session:secret');
  var sessionKey = config.get('session:key');

  var io = require('socket.io').listen(server);
  io.set('origins', 'localhost:*');
  io.set('logger', log);

  io.use(function(socket, next) {
    var handshakeData = socket.request;

    async.waterfall(
      [
        function(callback) {
          var parser = cookieParser(secret);
          parser(handshakeData, {}, function(err) {
            if (err) return callback(err);

            var sid = handshakeData.signedCookies[sessionKey];

            loadSession(sid, callback);
          });
        },
        function(session, callback) {
          if (!session) {
            return callback(new HttpError(401, 'No session'));
          }

          socket.handshake.session = session;
          loadUser(session, callback);
        },
        function(user, callback) {
          if (!user) {
            return callback(new HttpError(403, 'Anonymous session may not connect'));
          }
          callback(null, user);
        },
      ],
      function(err, user) {
        if (err) {
          if (err instanceof HttpError) {
            return next(new Error('not authorized'));
          }
          next(err);
        }

        socket.handshake.user = user;
        next();
      },
    );
  });

  io.sockets.on('connection', function(socket) {
    var username = socket.handshake.user.username;

    socket.broadcast.emit('join', username);

    socket.on('message', function(text, cb) {
      socket.broadcast.emit('message', username, text);
      cb() && cb();
    });

    socket.on('disconnect', function() {
      socket.broadcast.emit('leave', username);
    });
  });

  return io;
};
