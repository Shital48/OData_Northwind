sap.ui.define([
    "sap/ui/core/mvc/Controller" 
  ], 
  
  /** 
   * @param {typeof sap.ui.core.mvc.Controller} Controller  
   */

  function (Controller) {
    "use strict";
  
    return Controller.extend("masterdetail.masterdetail.controller.View2", {
  
        onInit: function () {
            this.onReadAll();
        },
        onReadAll: function(){
            var that=this;
            var oModel=this.getOwnerComponent().getModel();
            oModel.read("/Order_Details",{
                success:function(odata){
                    
                    console.log("Fetched data for table and list:", odata.results);  // Log the results
                     
                    var jModel = new sap.ui.model.json.JSONModel();
                    jModel.setData({ results: odata.results });  // Set the data under 'results'
                    that.getView().setModel(jModel); // Set model to the view itself, so both Table and List can use it
                },
                error:function(oError){
                    console.log(oError);
                }

            });
        }
    }); 
         
}); 
