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

  app.get('/alltracks', (req, res) => {
    db.collection('tracks').find((err, cursor) => {
      let items = [];
      
      cursor.each(function(err, item) {
      
        if(item){
          items.push(item)
        }
        if(!item){
          res.send(items)
        }
      });
    });
  });

app.put('/tracks/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const track = { title: req.body.title, artists: req.body.artists, album: req.body.album};
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
    const track = { title: req.body.title, artists: req.body.artists, album: req.body.album};
    db.collection('tracks').insert(track, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};