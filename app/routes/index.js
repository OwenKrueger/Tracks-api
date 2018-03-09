const noteRoutes = require('./note_routes');
const trackRoutes = require('./track_routes');
const artistRoutes = require('./artist_routes');
const albumRoutes = require('./album_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  trackRoutes(app, db);
  artistRoutes(app, db);
  albumRoutes(app, db);
  // Other route groups could go here, in the future
};
