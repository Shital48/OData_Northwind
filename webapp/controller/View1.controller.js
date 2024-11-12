sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/thirdparty/jquery",
    "sap/ui/Device",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (MessageToast, Controller, JSONModel, jquery, Device, Filter, FilterOperator, FilterType) {
        "use strict";

        return Controller.extend("masterdetail.masterdetail.controller.View1", {
            onInit: function () {
            },
            onPressNavToDetail: function (oEvent) {
                var pID = oEvent.getSource().getBindingContext().getProperty("ProductID");
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products("+pID+")", {
                    success: function (odata) {
                        console.log(odata);
                        that.getView().byId("SimpleFormDisplay354").setModel(new JSONModel(odata));
                        that.getSplitContObj().to(that.createId("detail2"));
                    }, error: function (error) {
                        console.log(error)
                    }
                })


            },

            onBackProducts: function () {
                this.getSplitContObj().backDetail();
            },

            onListItemPress: function (oEvent) {
                var sToPageId = oEvent.getParameter("listItem").getBindingContext().getProperty("OrderID");

                var oFilter = new Filter("OrderID", FilterOperator.EQ, sToPageId);

                this.getView().byId("idProductsTable").getBinding("items").filter(oFilter, FilterType.Application);
                this.getSplitContObj().to(this.createId("detail"));
            },
          
            getSplitContObj: function () {
                var result = this.byId("SplitContDemo");
                if (!result) {
                    // Log.error("SplitApp object can't be found");
                }
                return result;
            }
        });
    });
