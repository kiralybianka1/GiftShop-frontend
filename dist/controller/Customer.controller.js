sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","./Client","Project/Project/model/fulfillmentFormatter","sap/m/MessageBox"],function(e,t,r,o,s){"use strict";return r.extend("Project.Project.controller.Customer",{formatter:o,name:"customer",onInit:function(){var e=this.getOwnerComponent();this.oRouter=e.getRouter();this.oModel=e.getModel();this.oRouter.getRoute("Customers").attachPatternMatched(this._onProductMatched,this);this.oRouter.getRoute("Customer").attachPatternMatched(this._onProductMatched,this)},_onProductMatched:function(e){this._customer=e.getParameter("arguments").customer||this._customer||"0";this.oCustomerModel=new t;this.oCustomerModel.loadData("http://localhost:8080/GiftShop/api/customers","",false);this.customers=this.oCustomerModel.getData();for(var r=0;r<this.customers.length;r++){if(parseInt(this._customer,10)===parseInt(this.customers[r].id,10)){this.customer=this.customers[r]}}var o=new t;o.setData(this.customer);this.getView().setModel(o);this.oCustomerOrdersModel=new t;this.oCustomerOrdersModel.loadData("http://localhost:8080/GiftShop/api/customers/"+this._customer+"/orders","",false);this.orders=this.oCustomerOrdersModel.getData();this.getView().byId("customersOrderList").setModel(this.oCustomerOrdersModel);var s=this.getView().byId("customersOrderList").getItems();for(r=0;r<s.length;r++){if(s[r].getPriority()==="Low"){s[r].setShowButtons(false)}}},onExit:function(){this.oRouter.getRoute("Customers").detachPatternMatched(this._onProductMatched,this);this.oRouter.getRoute("Customer").detachPatternMatched(this._onProductMatched,this)},checkCustomerData:function(e){var t=this.getView().getModel("i18n").getResourceBundle();if(e.firstName===""||e.lastName===""||e.address.country===""||Number.isNaN(e.address.zipCode)||e.address.city===""||e.address.street===""||e.address.houseNumber===""||e.customerType===""){s.error(t.getText("CustomersModifyErrorMessage_Empty"),{id:"idCustomerModifyErrorMessageBox"});return false}if(e.accountNumber.length<24){s.error(t.getText("CustomersModifyErrorMessage_AccountNumber"),{id:"idCustomerModifyErrorMessageBox"});return false}var r=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;if(!e.email.match(r)){s.error(t.getText("CustomersModifyErrorMessage_Email"),{id:"idCustomerModifyErrorMessageBox"});return false}var o=/((?:\+?3|0)6)(?:-|\(|\s)?(\d{1,2})(?:-|\)|\s)?(\d{3})(?:-|\)|\s)?(\d{3,4}|)/;if(!e.phone.match(o)){s.error(t.getText("CustomersModifyErrorMessage_Phone"),{id:"idCustomerModifyErrorMessageBox"});return false}if(!Number.isNaN(e.address.floor)){if(Number(e.address.floor)<-20||Number(e.address.floor)>20){s.error(t.getText("CustomersModifyErrorMessage_Floor"),{id:"idCustomerModifyErrorMessageBox"});return false}}if(!Number.isNaN(e.address.door)){if(Number(e.address.door)<0||Number(e.address.door)>1e3){s.error(t.getText("CustomersModifyErrorMessage_Door"),{id:"idCustomerModifyErrorMessageBox"});return false}}if(!Number.isNaN(e.address.doorbell)){if(Number(e.address.doorbell)<0||Number(e.address.doorbell)>1e3){s.error(t.getText("CustomersModifyErrorMessage_Doorbell"),{id:"idCustomerModifyErrorMessageBox"});return false}}return true},checkCustomerDelete:function(){if(this.orders.length>0){return false}return true},onDeleteButtonPress:function(){var e=this.getView().getModel("i18n").getResourceBundle();var t=this.checkCustomerDelete();if(t){var r=this;s.confirm(e.getText("ConfirmDelete"),{actions:[s.Action.YES,s.Action.NO],id:"idConfirmDeleteMessageBox",onClose:function(e){if(e===s.Action.YES){r.deleteClient()}}})}else{s.error(e.getText("CustomersDeleteErrorMessage"),{id:"idCustomerDeleteErrorMessageBox"})}},deleteClient:function(){var e=this.getView().getModel("i18n").getResourceBundle();var t=parseInt(this.customer.id,10);var r={id:t};jQuery.ajax({type:"DELETE",contentType:"application/json",url:"http://localhost:8080/GiftShop/api/customers/"+t,dataType:"json",data:JSON.stringify(r),success:function(e,t,r){}});var o=sap.ui.core.UIComponent.getRouterFor(this);o.navTo("Customers",true);window.location.reload()},deleteManagement:function(e){var t=this.getView().getModel("i18n").getResourceBundle();var r={id:e};jQuery.ajax({type:"DELETE",contentType:"application/json",url:"http://localhost:8080/GiftShop/api/orders/"+e,dataType:"json",data:JSON.stringify(r)});s.success(t.getText("OrderDeleteSuccess"),{onClose:function(e){window.location.reload()}})},modify:function(){var e=this.getView().getModel("i18n").getResourceBundle();var t={id:parseInt(this.customer.id,10),firstName:this.getView().byId("firstName").getValue(),lastName:this.getView().byId("lastName").getValue(),address:{id:parseInt(this.customer.address.id,10),country:this.getView().byId("country").getValue(),zipCode:this.getView().byId("zip").getValue(),city:this.getView().byId("city").getValue(),street:this.getView().byId("street").getValue(),houseNumber:this.getView().byId("houseNumber").getValue(),floor:parseInt(this.getView().byId("floor").getValue(),10),door:parseInt(this.getView().byId("door").getValue(),10),doorbell:parseInt(this.getView().byId("doorbell").getValue(),10)},phone:this.getView().byId("phone").getValue(),email:this.getView().byId("email").getValue(),customerType:this.getView().byId("type").getSelectedKey(),accountNumber:this.getView().byId("bankAccount").getValue()};var r=this.checkCustomerData(t);if(r){jQuery.ajax({type:"PUT",contentType:"application/json",url:"http://localhost:8080/GiftShop/api/customers",dataType:"json",data:JSON.stringify(t)});var o=this;s.success(e.getText("CustomerModifySuccess"),{id:"idCustomerModifySuccessMessageBox",onClose:function(e){window.location.reload();o.getView().byId("idIconTabBarNoIcons").setSelectedKey("info")}})}}})});