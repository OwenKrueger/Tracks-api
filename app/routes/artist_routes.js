var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/artists/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('artists').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

app.put('/artists/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const artist = { name: req.body.name };
    db.collection('artists').update(details, artist, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(artist);
      } 
    });
  }); 

  app.delete('/artists/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('artists').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('artist ' + id + ' deleted!');
      } 
    });
  });

app.post('/artists', (req, res) => {
    const artist = { name: req.body.name };
    db.collection('artists').insert(artist, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};