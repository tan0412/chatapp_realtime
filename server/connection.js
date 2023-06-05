const mongoose = require('mongoose');

// Connection URI
const uri = 'mongodb+srv://tan2000:1234@cluster0.cvvbxwf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas');
});