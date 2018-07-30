const Moment = require('moment');
let moment = Moment();

module.exports = function(){
  var callValue = 0;
  var smsValue = 0;
  var warningValue = 0;
  var criticalValue = 0;
  var radioSettingCallsTotal = 0;
  var radioSettingsSmsTotals = 0;
  var radioSettingsAllTotals = 0;

  var records = [];

  function billCalculator(billTypeSettings){
    

    if(getTotalBill()<getCritical()){
      let record =  {
        itemType : billTypeSettings,
        Time : new Date()
      }
      
      if(billTypeSettings === 'call'){
          radioSettingCallsTotal += callValue;
          radioSettingsAllTotals += callValue;
          record.cost = callValue.toFixed(2);
  
      }else if( billTypeSettings === 'sms' ){
        radioSettingsSmsTotals += smsValue;
        radioSettingsAllTotals += smsValue;
        record.cost = smsValue.toFixed(2);
      }
  
      records.unshift(record)
    }
  }
  //Functions for the Tests
  function callCost(x){
    return callValue = x;
  }
  function smsCost(x){
    return smsValue = x;
  }
  function setWarningLevel(x){
    return warningValue = x;
  }
  function setCriticalLevel(x){
    return criticalValue = x;
  }
  function isCriticalLevelReached(){
    if(radioSettingsAllTotals>=criticalValue){
      return true;
    }else{
      return false;
    }
  }

  //Updating Values
  function updateCall(value){
    callValue = parseFloat(value);
    return callValue;
  }
  function updateSms(value){
    smsValue = parseFloat(value);
    return smsValue;
  }
  function updateWarning(value){
    warningValue = parseFloat(value);
    return warningValue;
  }
  function updateCritical(value){
    criticalValue = parseFloat(value);
    return criticalValue;
  }



  function getCallBill(){
    return radioSettingCallsTotal.toFixed(2);
  }
  function getSmsBill(){
    return radioSettingsSmsTotals.toFixed(2);
  }
  function getTotalBill(){
    return radioSettingsAllTotals.toFixed(2);
  }




  function getCallValue(){
    return callValue;
  }
  function getSmsValue(){
    return smsValue;
  }
  function getWarning(){
    return warningValue
  }
  function getCritical(){
    return criticalValue
  }


  function getRecords(type){
    if(type === "" || type === undefined){
      return records;
    }else{
      return records.filter(item => item.itemType === type);
    }
    
    
  }

  function colorChange(){
    if(getTotalBill()>=getWarning() && getTotalBill() < getCritical()){
      return "warning";
    } else if(getTotalBill()>=getCritical()){
      return "danger";
    }
  }


  return{

    updateCallValue : updateCall,
    updateSmsValue : updateSms,
    updateWarningValue : updateWarning,
    updateCriticalValue : updateCritical,

    calculateSettingsBill : billCalculator,

    //Used for testing
    newCall :callCost,
    newSms : smsCost,
    newWarning : setWarningLevel,
    newCritical : setCriticalLevel,
    reachedCriticalLevel : isCriticalLevelReached,

    CallValue: getCallValue,
    SmsValue: getSmsValue,
    WarningValue :getWarning,
    CriticalValue :getCritical,

    //
    allCalls : getCallBill,
    allSms : getSmsBill,
    allTotal : getTotalBill,


    //Express 
    Records : getRecords,
    getColor : colorChange
  }

}
