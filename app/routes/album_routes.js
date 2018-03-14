var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/albums/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('albums').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

app.put('/albums/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const album = { title: req.body.title, artists: req.body.artists, songs: req.body.songs};
    db.collection('albums').update(details, album, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(album);
      } 
    });
  }); 

  app.delete('/albums/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('albums').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('album ' + id + ' deleted!');
      } 
    });
  });

app.post('/albums', (req, res) => {
    const album = { title: req.body.title, artists: req.body.artists, songs: req.body.songs};
    db.collection('albums').insert(album, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
