sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageBox","sap/ui/core/routing/History"],function(t,e,o,r){"use strict";return t.extend("Project.Project.controller.Product",{onInit:function(){var t=this.getOwnerComponent();this.oRouter=t.getRouter();this.oModel=t.getModel();this.oRouter.getRoute("Products").attachPatternMatched(this._onProductMatched,this);this.oRouter.getRoute("Product").attachPatternMatched(this._onProductMatched,this);this.oCategoryModel=new e;this.oCategoryModel.loadData("http://localhost:8080/GiftShop/api/categories","",false);this.categories=JSON.parse(this.oCategoryModel.getJSON());this.getView().setModel(this.oCategoryModel,"category")},_onProductMatched:function(t){this._product=t.getParameter("arguments").product||this._product||"0";this.oProductsModel=new e;this.oProductsModel.loadData("http://localhost:8080/GiftShop/api/products","",false);this.products=this.oProductsModel.getData();for(var o=0;o<this.products.length;o++){if(parseInt(this._product,10)===parseInt(this.products[o].id,10)){this.product=this.products[o]}}this.Model=new e;this.Model.setData(this.product);this.getView().setModel(this.Model)},handleIconTabBarSelect:function(t){if(t.getParameter("key")==="modify"){this.getView().byId("footer").setVisible(true)}else{this.getView().byId("footer").setVisible(false)}},onSaveButtonPress:function(t){this.modify()},onCancelButtonPress:function(){window.location.reload()},onNavBack:function(){var t=r.getInstance();var e=t.getPreviousHash();if(e!==undefined){window.history.go(-1)}else{var o=sap.ui.core.UIComponent.getRouterFor(this);o.navTo("Products",true)}},checkProductDelete:function(){this.oOrdersModel=new e;this.oOrdersModel.loadData("http://localhost:8080/GiftShop/api/orders","",false);this.orders=this.oOrdersModel.getData();for(var t=0;t<this.orders.length;t++){for(var o=0;o<this.orders[t].orderProductList.length;o++){if(parseInt(this.orders[t].orderProductList[o].product.id,10)===parseInt(this._product,10)){return false}}}return true},onDeleteButtonPress:function(t){var e=this.getView().getModel("i18n").getResourceBundle();var r=this.checkProductDelete();if(r){var i=this;o.confirm(e.getText("ConfirmDelete"),{actions:[o.Action.YES,o.Action.NO],id:"idConfirmDeleteMessageBox",onClose:function(t){if(t===o.Action.YES){i.deleteProduct()}}})}else{o.error(e.getText("ProductDeleteErrorMessage"),{id:"idProductDeleteErrorMessageBox"})}},onExit:function(){this.oRouter.getRoute("Products").detachPatternMatched(this._onProductMatched,this);this.oRouter.getRoute("Product").detachPatternMatched(this._onProductMatched,this)},checkProductData:function(t){var e=this.getView().getModel("i18n").getResourceBundle();if(t.name===""||t.description===""||Number.isNaN(t.netPrice)||Number.isNaN(t.quantity)||t.stockId===""||t.category===""){o.error(e.getText("ProductModifyErrorMessage_Empty"),{id:"idProductModifyErrorMessageBox"});return false}if(Number(t.netPrice)<1||Number(t.netPrice)>1e5){o.error(e.getText("ProductModifyErrorMessage_NetPrice"),{id:"idProductModifyErrorMessageBox"});return false}if(Number(t.quantity)<0||Number(t.quantity)>1e5||!Number.isInteger(t.quantity)){o.error(e.getText("ProductModifyErrorMessage_Quantity"),{id:"idProductModifyErrorMessageBox"});return false}if(t.stockId.length!==7){o.error(e.getText("ProductModifyErrorMessage_StockID"),{id:"idProductModifyErrorMessageBox"});return false}return true},deleteProduct:function(){var t=parseInt(this.product.id,10);var e={id:t};jQuery.ajax({type:"DELETE",contentType:"application/json",url:"http://localhost:8080/GiftShop/api/products/"+t,dataType:"json",data:JSON.stringify(e)});var o=sap.ui.core.UIComponent.getRouterFor(this);o.navTo("Products",true);window.location.reload()},modify:function(){var t=this.getView().getModel("i18n").getResourceBundle();for(var e=0;e<this.categories.length;e++){if(parseInt(this.categories[e].id,10)===parseInt(this.getView().byId("categorySelect").getSelectedKey(),10)){var r=this.categories[e]}}var i={id:parseInt(this.product.id,10),name:this.getView().byId("name").getValue(),description:this.getView().byId("description").getValue(),netPrice:this.getView().byId("netPrice").getValue(),stockId:this.getView().byId("stockId").getValue(),quantity:parseInt(this.getView().byId("quantity").getValue(),10),category:{id:r.id,name:r.name,taxRate:r.taxRate}};var s=this.checkProductData(i);if(s){jQuery.ajax({type:"PUT",contentType:"application/json",url:"http://localhost:8080/GiftShop/api/products",dataType:"json",data:JSON.stringify(i)});o.success(t.getText("ProductModifySuccess"),{id:"idProductModifySuccesMessageBox",onClose:function(t){window.location.reload()}});this.getView().byId("idIconTabBarNoIcons").setSelectedKey("info")}}})});