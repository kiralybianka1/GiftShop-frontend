sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter"
], function (Controller, MessageBox, History, JSONModel, Filter, Sorter) {
	"use strict";

	return Controller.extend("Project.Project.controller.Client", {
		onInit: function () {},

		_onProductMatched: function (oEvent) {},

		//TAB
		handleIconTabBarSelect: function (oEvent) {
			if (oEvent.getParameter("key") === "modify") {
				this.getView().byId("footer").setVisible(true);
			} else {
				this.getView().byId("footer").setVisible(false);
			}
		},

		//SAVE
		onSaveButtonPress: function (oEvent) {
			this.modify();
		},

		//CANCEL
		onCancelButtonPress: function () {
			window.location.reload();
		},

		//BACK
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				if (this.name === "customer") {
					oRouter.navTo("Customers", true);
				} else if (this.name === "seller") {
					oRouter.navTo("Sellers", true);
				}
			}
		},

		//EMAIL
		onEmailButtonPress: function (oEvent) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			if (this.name === "customer") {
				sap.m.URLHelper.triggerEmail(this.customer.email,
					i18n.getText("EmailSubject"),
					i18n.getText("EmailBody") + " " + this.customer.firstName + " " + this.customer.lastName + "!");
			} else if (this.name === "seller") {
				sap.m.URLHelper.triggerEmail(this.seller.email,
					i18n.getText("EmailSubject"),
					i18n.getText("EmailBody") + " " + this.seller.name + "!");
			}
		},

		//MANAGEMENT DELETE
		onManagementDeleteButtonPress: function (oEvent) {
			var context = oEvent.getSource().getBindingContext();
			var id = context.getProperty(null, context).id;
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var that = this;
			MessageBox.confirm(
				i18n.getText("ConfirmDelete"), {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.YES) {
							that.deleteManagement(id);
						}
					}
				}
			);
		},

		//MANAGEMENT PRODUCTS
		onManagementListItemPress: function (oEvent) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var context = oEvent.getSource().getBindingContext();
			var clickedManagement = context.getProperty(null, context);
			var Model = new JSONModel();
			Model.setData(clickedManagement);
			var title, items;
			if (this.name === "customer") {
				title = i18n.getText("CustomerOrderProducts");
				items = {
					path: "/orderProductList/",
					template: new sap.m.StandardListItem({
						title: "{product/name}",
						info: "{quantity}" + " " + i18n.getText("QuantityType")
					})
				};
			} else if (this.name === "seller") {
				title = i18n.getText("SellerAcProducts");
				items = {
					path: "/acedProducts/",
					template: new sap.m.StandardListItem({
						title: "{product/name}",
						info: "{quantity}" + " " + i18n.getText("QuantityType")
					})
				};
			}

			this.resizableDialog = new sap.m.Dialog({
				title: title,
				contentWidth: "550px",
				contentHeight: "300px",
				resizable: true,
				content: new sap.m.List({
					items: items
				}),
				beginButton: new sap.m.Button({
					text: i18n.getText("Close"),
					press: function () {
						this.resizableDialog.close();
						this.resizableDialog.destroy();
					}.bind(this)
				})
			});
			this.resizableDialog.setModel(Model);
			this.getView().addDependent(this.resizableDialog);

			this.resizableDialog.open();
		},

		//MANAGEMENT SETTINGS
		onSettingsButtonPress: function () {
			if (!this.settingsDialog) {
				if (this.name === "customer") {
					this.settingsDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.CustomerSettings", this);
				} else if (this.name === "seller") {
					this.settingsDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.SellerSettings", this);
				}
				this.settingsDialog.setModel(this.getView().getModel());
				this.getView().addDependent(this.settingsDialog);
			}
			this.settingsDialog.open();
		},

		//CONFIRM SETTINGS
		handleConfirm: function (oEvent) {
			//SORT
			var mParams = oEvent.getParameters(),
				sPathSort,
				bDescending,
				aSorters = [],
				aFilters = [];

			var oBinding;
			if (this.name === "customer") {
				oBinding = this.getView().byId("customersOrderList").getBinding("items");
			} else if (this.name === "seller") {
				oBinding = this.getView().byId("sellersAcList").getBinding("items");
			}

			sPathSort = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPathSort, bDescending));
			oBinding.sort(aSorters);
			//FILTER
			mParams.filterItems.forEach(function (oItem) {
				var key = oItem.getKey();
				if (key === "fulfilled") {
					aFilters.push(new Filter("fulfillDate", "NE", null));
				} else {
					aFilters.push(new Filter("fulfillDate", "EQ", null));
				}
			});
			oBinding.filter(aFilters);
		},

		onExit: function () {},

		//BACKEND
		delete: function () {},
		deleteManagement: function (id) {},
		modify: function () {}

	});
});