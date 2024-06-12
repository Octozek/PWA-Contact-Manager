const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Ensure this line is correct

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes.js')(app);

app.listen(PORT, function () {
  console.log(`Now listening on port: ${PORT}`);
});
