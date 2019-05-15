sap.ui.define(["sap/ui/core/mvc/Controller","sap/f/library","sap/m/MessageBox","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/Sorter"],function(e,t,s,i,o,n){"use strict";return e.extend("Project.Project.controller.Clients",{onInit:function(){},onAddButtonPress:function(){this.dataSheetDialog=sap.ui.xmlfragment("Project.Project.view.Fragments.AddDataSheet",this);var e=this.dataSheetDialog.getContent()[0].getContent();for(var t=0;t<e.length;t++){if(e[t].getId()==="addSellerName"||e[t].getId()==="addSellerNameText"){e[t].setVisible(this.name==="seller")}if(e[t].getId()==="addCustomerNameText"||e[t].getId()==="addCustomerFirstName"||e[t].getId()==="addCustomerLastName"||e[t].getId()==="addCustomerTypeText"||e[t].getId()==="addCustomerType"){e[t].setVisible(this.name==="customer")}}this.dataSheetDialog.setModel(this.getView().getModel());this.getView().addDependent(this.dataSheetDialog);this.dataSheetDialog.open()},onAddCloseButtonPress:function(){this.dataSheetDialog.close();this.dataSheetDialog.destroy()},onAddConfirmButtonPress:function(){this.create()},onNavigationButtonPress:function(e){var s=e.getSource().getBindingContext().getPath(),i=s.split("/").slice(-1).pop();var o=-1;if(this.name==="customer"){o=JSON.parse(this.oCustomerModel.getJSON())[i].id;this.loRouter.navTo("Customer",{layout:t.LayoutType.MidColumnFullScreen,customer:o})}else if(this.name==="seller"){o=JSON.parse(this.oSellerModel.getJSON())[i].id;this.loRouter.navTo("Seller",{layout:t.LayoutType.MidColumnFullScreen,seller:o})}},onSearch:function(e){var t=[];var s=e.getSource().getValue();if(s&&s.length>0){if(this.name==="customer"){t=new i({filters:[new i("lastName",o.Contains,s),new i("firstName",o.Contains,s)],and:false})}else if(this.name==="seller"){t=new i({filters:[new i("name",o.Contains,s)],and:false})}}this.oList.getBinding("items").filter(t,"Application")},onSettingsButtonPress:function(){if(!this.settingsDialog){if(this.name==="customer"){this.settingsDialog=sap.ui.xmlfragment("Project.Project.view.Fragments.CustomersSettings",this)}else if(this.name==="seller"){this.settingsDialog=sap.ui.xmlfragment("Project.Project.view.Fragments.SellersSettings",this)}this.settingsDialog.setModel(this.getView().getModel());this.getView().addDependent(this.settingsDialog)}this.settingsDialog.open()},handleConfirm:function(e){var t=e.getParameters(),s=this.oList.getBinding("items"),o,a,r=[],l=[];o=t.sortItem.getKey();a=t.sortDescending;r.push(new n(o,a));s.sort(r);t.filterItems.forEach(function(e){var t=e.getKey();var s=new i("customerType","EQ",t);l.push(s)});s.filter(l)},create:function(){}})});