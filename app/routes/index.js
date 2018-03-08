const noteRoutes = require('./note_routes');
const trackRoutes = require('./track_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  trackRoutes(app, db);
  // Other route groups could go here, in the future
};
