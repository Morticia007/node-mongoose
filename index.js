const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(() => {
  console.log('Connected correctly to server');

  const newCampsite = new Campsite({
    name: 'React Lake Campground-2',
    description: 'test-2',
  });

  newCampsite
    .save()
    .then((campsite) => {
      console.log('logging the campsite that was just saved', campsite);
      return Campsite.find();
    })
    .then((campsites) => {
      console.log('deleting the following campsites', campsites);
      return Campsite.deleteMany();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
      mongoose.connection.close();
    });
});
