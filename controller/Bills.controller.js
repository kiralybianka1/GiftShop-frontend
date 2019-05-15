sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"Project/Project/model/invoicePriceFormatter",
	"sap/m/MessageBox"
], function (Controller, JSONModel, invoicePriceFormatter, MessageBox) {
	"use strict";

	return Controller.extend("Project.Project.controller.Bills", {
		formatter: invoicePriceFormatter,

		onInit: function () {
			this.oOrderInvoiceModel = new JSONModel();
			this.oOrderInvoiceModel.loadData("http://localhost:8080/GiftShop/api/orderinvoices", "", false);

			this.oSellerInvoiceModel = new JSONModel();
			this.oSellerInvoiceModel.loadData("http://localhost:8080/GiftShop/api/sellerinvoices", "", false);

			this.oSellerModel = new JSONModel();
			this.oSellerModel.loadData("http://localhost:8080/GiftShop/api/sellers", "", false);
			this.sellers = JSON.parse(this.oSellerModel.getJSON());

			this.getView().byId("sellerSelect").setModel(this.oSellerModel);
			this.getView().setModel(this.oOrderInvoiceModel, "orderI");
			this.getView().setModel(this.oSellerInvoiceModel, "acI");

			this.getView().byId("panel").getToolbar().getContent()[4].setVisible(false); //Table --> visible=false
			this.getView().byId("panel").getToolbar().getContent()[5].setVisible(false); //Setting button --> visible=false

			this.getView().byId("invoiceDate").setDateValue(new Date());
		},

		//TAB
		handleIconTabBarSelect: function (oEvent) {
			this.getView().byId("footer").setVisible(oEvent.getParameter("key") === "add");
		},

		//ITEM PRESS
		onItemPress: function (oEvent) {
			var properties = oEvent.getSource().getProperties();
			for (var i = 0; i < properties.length; i++) {
				var visible = properties[i].getVisible();
				properties[i].setVisible(!visible);
			}
		},

		//CHECK
		checkSellerInvoiceData: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			if (this.getView().byId("sellerSelect").getSelectedItem() === null) {
				MessageBox.error(i18n.getText("SellerInvoiceAddErrorMessage_EmptySeller"));
				return false;
			}
			var totalPrice = this.getView().byId("totalPrice").getValue();
			if (totalPrice === "" || Number.isNaN(totalPrice)) {
				MessageBox.error(i18n.getText("SellerInvoiceAddErrorMessage_EmptyPrice"));
				return false;
			}
			if (Number(totalPrice) < 1 || Number(totalPrice) > 100000000) {
				MessageBox.error(i18n.getText("SellerInvoiceAddErrorMessage_Price"));
				return false;
			}
			return true;
		},

		//ADD
		onAddButtonPress: function () {
			if (this.checkSellerInvoiceData()) {
				this.create();
			}
		},

		//BACKEND
		create: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var seller = null;
			for (var i = 0; i < this.sellers.length; i++) {
				if (parseInt(this.sellers[i].id, 10) === parseInt(this.getView().byId("sellerSelect").getSelectedKey(), 10)) {
					seller = this.sellers[i];
				}
			}
			var data = {
				"seller": seller,
				"invoiceDate": this.getView().byId("invoiceDate").getValue().replace(/\. /g, '-').replace(/\./g, ''),
				"totalPrice": this.getView().byId("totalPrice").getValue()
			};

			jQuery.ajax({
				type: "POST",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/sellerinvoices",
				dataType: "json",
				data: JSON.stringify(data)
			});

			MessageBox.success(
				i18n.getText("SellerInvoiceAddSuccess"), {
					onClose: function (sAnswer) {
						window.location.reload();
					}
				}
			);
		}
	});
});