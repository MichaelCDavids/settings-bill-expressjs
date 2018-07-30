"use strict";
let express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
let settingBill = require('./settings-bill-factory');

const Moment = require('moment');
let moment = Moment();

let app = express(); //instance of express
let PORT = process.env.PORT || 3007;



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(express.static('public'));

let settingsInstance = settingBill();


//configuring express-handlebars module 
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers : {
    "newDate" : function(){
      return Moment(this.Time).fromNow()
    }
  }
}));
app.set('view engine', 'handlebars');



app.get('/', function (req, res) {
  let total = {
    call:settingsInstance.allCalls(),
    sms:settingsInstance.allSms(),
    total:settingsInstance.allTotal()
  }
res.render('home',{billTotal:total});
});

app.post('/settings',function(req,res){
  
  let callCost = req.body.callCostSetting;
  let smsCost = req.body.smsCostSetting;
  let warningLevel = req.body.warningLevelSetting;
  let criticalLevel = req.body.criticalLevelSetting;
  
  settingsInstance.updateCallValue(callCost);
  settingsInstance.updateSmsValue(smsCost);
  settingsInstance.updateWarningValue(warningLevel);
  settingsInstance.updateCriticalValue(criticalLevel);

  let entered = {
    call : callCost,
    sms : smsCost,
    warning: warningLevel,
    critical : criticalLevel
  }

  let total = {
    call:settingsInstance.allCalls(),
    sms:settingsInstance.allSms(),
    total:settingsInstance.allTotal(),
    color : settingsInstance.getColor()
  }

  res.render('home',{billTotal:total,keep:entered});
});

app.post('/action',function(req,res){
  let billType = req.body.billItemTypeWithSettings;
    settingsInstance.calculateSettingsBill(billType);
    
    let entered = {
      call : settingsInstance.CallValue(),
      sms : settingsInstance.SmsValue(),
      warning: settingsInstance.WarningValue(),
      critical : settingsInstance.CriticalValue()
    }

    let total = {
      call:settingsInstance.allCalls(),
      sms:settingsInstance.allSms(),
      total:settingsInstance.allTotal(),
      color : settingsInstance.getColor()
    }
  res.render('home',{billTotal:total,keep:entered});
});

app.get('/actions', function (req, res) {
  let allRecords = settingsInstance.Records();
  res.render('actions',{records : allRecords});
});

app.get('/actions/:type', function (req, res) {
  let actionType = req.params.type
  let allRecords = settingsInstance.Records(actionType);
  console.log(allRecords);
  res.render('actions',{records : allRecords});
});






app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});

