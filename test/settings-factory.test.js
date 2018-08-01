var factory = require('../settings-bill-factory');
var assert = require('assert');

describe('The calculateSettingsBill Function',function(){
    
    it('should calculate the total for a call', function(){

        // global
        var settingBill = factory()
    
        // settings button
        settingBill.newCall(5);
        settingBill.newSms(2.50);
        settingBill.newWarning(30);
        settingBill.newCritical(50);

    
        // add button
        settingBill.calculateSettingsBill('call');
        


        assert.equal(settingBill.allCalls(), 5);
        assert.equal(settingBill.allSms(), 0);
        assert.equal(settingBill.allTotal(), 5);
    
      });
      it('should calculate the total for mulitple calls', function(){

        var settingBill = factory()
    
        settingBill.newCall(5);
        settingBill.newSms(2.50);
        settingBill.newWarning(30);
        settingBill.newCritical(50);
    
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
    
        assert.equal(settingBill.allCalls(), 15);
        assert.equal(settingBill.allSms(), 0);
        assert.equal(settingBill.allTotal(), 15);
    
      });

});



describe('The getColor Function',function(){
    
    
    it('It should return warning if total phone bill is greater than the warning level', function(){

        var settingBill = factory()
    
        settingBill.newCall(5);
        settingBill.newSms(2.50);
        settingBill.newWarning(30);
        settingBill.newCritical(50);
    
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
    
        assert.equal(settingBill.getColor(), 'warning');
    
      });
    
    
    it('It should return danger if total phone bill is greater than the critical level',function(){

        var settingBill = factory()
    
        settingBill.newCall(5);
        settingBill.newSms(2.50);
        settingBill.newWarning(30);
        settingBill.newCritical(50);
    
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
        settingBill.calculateSettingsBill('call');
    
        assert.equal(settingBill.getColor(), 'danger');
    });
});