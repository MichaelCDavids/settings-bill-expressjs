"use strict";
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Moment = require('moment');
const settingBill = require('./settings-bill-factory');
const SettingsRoutes = require("./settings-routes");

const app = express();

const settingsInstance = settingBill();
const settingsRoutes = SettingsRoutes(settingsInstance);


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.use(express.static('public'));

//configuring express-handlebars module 
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    "newDate": function () {
      return Moment(this.Time).fromNow()
    }
  }
}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', settingsRoutes.index);
app.post('/settings', settingsRoutes.settings);
app.post('/action', settingsRoutes.action);
app.get('/actions', settingsRoutes.actions);
app.get('/actions/:type', settingsRoutes.actionsType);

let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});