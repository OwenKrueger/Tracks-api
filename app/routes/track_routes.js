var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/tracks/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('tracks').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

app.put('/tracks/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const track = { text: req.body.body, title: req.body.title };
    db.collection('tracks').update(details, track, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(track);
      } 
    });
  }); 

  app.delete('/tracks/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('tracks').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('track ' + id + ' deleted!');
      } 
    });
  });

app.post('/tracks', (req, res) => {
    //const track = { text: req.body.body, title: req.body.title };
    const track = { title: req.body.title, artists: req.body.artists, album: req.body.album};
    console.log(track);
    db.collection('tracks').insert(track, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
