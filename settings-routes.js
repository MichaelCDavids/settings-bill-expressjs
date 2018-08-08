module.exports = function SettingsRoutes(settingsInstance) {
    
    function index(req, res) {
        let total = {
            call: settingsInstance.allCalls(),
            sms: settingsInstance.allSms(),
            total: settingsInstance.allTotal(),
            color: settingsInstance.getColor()
        }
        let entered = {
            call: settingsInstance.CallValue(),
            sms: settingsInstance.SmsValue(),
            warning: settingsInstance.WarningValue(),
            critical: settingsInstance.CriticalValue()
        }
        res.render('home', {
            billTotal: total,
            keep: entered
        });

    }
    
    function settings (req,res){
  
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
      }

      function action (req,res){
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
      }

      function actions (req, res) {
        let allRecords = settingsInstance.Records();
        res.render('actions',{records : allRecords});
      }
      
      function actionsType (req, res) {
        let actionType = req.params.type
        let allRecords = settingsInstance.Records(actionType);
        res.render('actions',{records : allRecords});
      }

    return {
        index,
        settings,
        action,
        actions,
        actionsType
    }
}