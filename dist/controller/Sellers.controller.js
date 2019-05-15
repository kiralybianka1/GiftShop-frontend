sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","./Clients","sap/m/MessageBox","sap/ui/core/Fragment"],function(e,r,t,s,o){"use strict";return t.extend("Project.Project.controller.Sellers",{name:"seller",onInit:function(){this.oSellerModel=new r;this.oSellerModel.loadData("http://localhost:8080/GiftShop/api/sellers","",false);this.sellers=JSON.parse(this.oSellerModel.getJSON());this.oList=this.getView().byId("sellersList");this.oList.setModel(this.oSellerModel);this.loRouter=sap.ui.core.UIComponent.getRouterFor(this)},onOpenViewSettings:function(e){var r="filter";if(e.getSource()instanceof sap.m.Button){var t=e.getSource().getId();if(t.match("sort")){r="sort"}}if(!this.byId("idSellersSettings")){o.load({id:this.getView().getId(),name:"Project.Project.view.Fragments.SellersSettings",controller:this}).then(function(e){e.setModel(this.getView().getModel());this.getView().addDependent(e);e.open(r)}.bind(this))}else{this.byId("idSellersSettings").open(r)}},checkSellerData:function(e){var r=this.getView().getModel("i18n").getResourceBundle();if(e.name===""||e.address.country===""||Number.isNaN(e.address.zipCode)||e.address.city===""||e.address.street===""||e.address.houseNumber===""){s.error(r.getText("SellersAddErrorMessage_Empty"));return false}if(e.accountNumber.length<24){s.error(r.getText("SellersAddErrorMessage_AccountNumber"));return false}var t=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;if(!e.email.match(t)){s.error(r.getText("SellersAddErrorMessage_Email"));return false}var o=/((?:\+?3|0)6)(?:-|\(|\s)?(\d{1,2})(?:-|\)|\s)?(\d{3})(?:-|\)|\s)?(\d{3,4}|)/;if(!e.phone.match(o)){s.error(r.getText("SellersAddErrorMessage_Phone"));return false}if(!Number.isNaN(e.address.floor)){if(Number(e.address.floor)<-20||Number(e.address.floor)>50){s.error(r.getText("SellersAddErrorMessage_Floor"));return false}}if(!Number.isNaN(e.address.door)){if(Number(e.address.door)<0||Number(e.address.door)>1e3){s.error(r.getText("SellersAddErrorMessage_Door"));return false}}if(!Number.isNaN(e.address.doorbell)){if(Number(e.address.doorbell)<0||Number(e.address.doorbell)>1e3){s.error(r.getText("SellersAddErrorMessage_Doorbell"));return false}}return true},create:function(){var e=this.getView().getModel("i18n").getResourceBundle();var r=sap.ui.getCore();var t={name:r.byId("addSellerName").getValue(),address:{country:r.byId("addCountry").getValue(),zipCode:r.byId("addZip").getValue(),city:r.byId("addCity").getValue(),street:r.byId("addStreet").getValue(),houseNumber:r.byId("addHouseNumber").getValue(),floor:parseInt(r.byId("addFloor").getValue(),10),door:parseInt(r.byId("addDoor").getValue(),10),doorbell:parseInt(r.byId("addDoorbell").getValue(),10)},phone:r.byId("addPhone").getValue(),email:r.byId("addEmail").getValue(),accountNumber:r.byId("addBankAccount").getValue()};var o=this.checkSellerData(t);if(o){jQuery.ajax({type:"POST",contentType:"application/json",url:"http://localhost:8080/GiftShop/api/sellers",dataType:"json",data:JSON.stringify(t)});this.dataSheetDialog.destroy();s.success(e.getText("SellerAddSuccess"),{onClose:function(e){window.location.reload()}})}}})});