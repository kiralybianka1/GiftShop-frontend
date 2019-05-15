sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
], function (Controller, JSONModel, MessageBox, Filter, FilterOperator, Sorter) {
	"use strict";

	return Controller.extend("Project.Project.controller.Other", {
		onInit: function () {
			this.oCategoryModel = new JSONModel();
			//this.oCategoryModel.loadData(jQuery.sap.getModulePath("Project.Project.localService/mockdata", "/categories.json"), null, false);
			this.oCategoryModel.loadData("http://localhost:8080/GiftShop/api/categories", "", false);
			this.categories = this.oCategoryModel.getData();

			this.getView().setModel(this.oCategoryModel);

			var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			var that = this;

			this.oTable = this.byId("categoryList");
			this.oReadOnlyTemplate = this.byId("categoryList").removeItem(0);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
			this.oEditableTemplate = new sap.m.CustomListItem({
				content: [
					new sap.m.VBox({
						items: [
							new sap.ui.core.Icon({
								src: "sap-icon://customer-view",
								size: "2.625rem",
								color: "Default",
								tooltip: "{i18n>Category}"
							}).addStyleClass("sapUiTinyMarginBottom"),
							new sap.m.Title({
								text: i18n.getText("Name")
							}),
							new sap.m.Input({
								value: "{name}"
							}),
							new sap.m.Title({
								text: i18n.getText("CategoryTax")
							}),
							new sap.m.Input({
								value: "{taxRate}"
							})
						]
					}),
					new sap.m.OverflowToolbar({
						design: "Solid",
						content: [
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({
								icon: "sap-icon://edit",
								type: "Accept",
								press: function (oEvent) {
									that.onEditCategoryButtonPress(oEvent);
								}
							})
						]
					}).addStyleClass("sapContrast")
				]
			});

		},

		rebindTable: function (oTemplate, sKeyboardMode) {
			this.oTable.bindItems({
				path: "/",
				template: oTemplate,
				key: "id"
			}).setKeyboardMode(sKeyboardMode);
		},

		//MODIFY --> editable input fields
		onEditButtonPress: function (oEvent) {
			this.getView().byId("idModifyCategory").setVisible(false);
			this.getView().byId("idBackCategory").setVisible(true);
			this.getView().byId("idAddCategory").setVisible(false);
			this.rebindTable(this.oEditableTemplate, "Edit");
		},

		//BACK from modify
		onBack: function () {
			this.getView().byId("idModifyCategory").setVisible(true);
			this.getView().byId("idBackCategory").setVisible(false);
			this.getView().byId("idAddCategory").setVisible(true);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
			window.location.reload();
		},

		//SEARCH
		onSearch: function (oEvent) {
			var SearchState = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				SearchState = new Filter({
					filters: [new Filter("name", FilterOperator.Contains, sQuery)]
				});
			}
			this.getView().byId("categoryList").getBinding("items").filter(SearchState, "Application");
		},

		//SETTINGS
		onSettingsButtonPressed: function () {
			if (!this.settingsDialog) {
				this.settingsDialog = sap.ui.xmlfragment("Project.Project.view.Fragments.CategorySettings", this);
				this.settingsDialog.setModel(this.oCategoryModel, "category");
				this.getView().addDependent(this.settingsDialog);
			}
			this.settingsDialog.open();
		},

		//SETTINGSCONFIRM
		handleConfirm: function (oEvent) {
			//SORT
			var mParams = oEvent.getParameters(),
				oBinding = this.getView().byId("categoryList").getBinding("items"),
				sPathSort,
				bDescending,
				aSorters = [],
				aFilters = [];

			sPathSort = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPathSort, bDescending));
			oBinding.sort(aSorters);
		},

		//MODIFY
		onEditCategoryButtonPress: function (oEvent) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var context = oEvent.getSource().getBindingContext();

			var id = parseInt(context.getProperty(null, context).id, 10);
			var name = context.getProperty(null, context).name;
			var taxRate = context.getProperty(null, context).taxRate;

			var ok = this.checkCategoryData(name, taxRate);
			if (ok) {
				var data = {
					"id": id,
					"name": name,
					"taxRate": parseInt(taxRate, 10)
				};

				var that = this;
				MessageBox.confirm(
					i18n.getText("ConfirmCategoryModify"), {
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						onClose: function (sAnswer) {
							if (sAnswer === MessageBox.Action.YES) {
								that.modifyCategory(data);
							}
						}
					}
				);
			} else {
				MessageBox.error(i18n.getText("CategoryModifyErrorMessage"));
			}
		},

		//CHECK TO DELETE
		checkCategoryDelete: function (id) {
			this.oProductsModel = new JSONModel();
			this.oProductsModel.loadData("http://localhost:8080/GiftShop/api/products", "", false);
			this.products = this.oProductsModel.getData();
			for (var i = 0; i < this.products.length; i++) {
				if (parseInt(this.products[i].category.id, 10) === id) {
					return false;
				}
			}
			return true;
		},

		//DELETE
		onDeleteButtonPress: function (oEvent) {
			var context = oEvent.getSource().getBindingContext();
			var id = context.getProperty(null, context).id;
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var that = this;
			var ok = this.checkCategoryDelete(id);
			if (ok) {
				MessageBox.confirm(
					i18n.getText("ConfirmDelete"), {
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						onClose: function (sAnswer) {
							if (sAnswer === MessageBox.Action.YES) {
								that.deleteCategory(id);
							}
						}
					}
				);
			} else {
				MessageBox.error(i18n.getText("CategoryDeleteErrorMessage"));
			}
		},

		//ADD
		onAddButtonPress: function (oEvent) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var that = this;
			this.resizableDialog = new sap.m.Dialog({
				title: i18n.getText("NewCategory"),
				contentWidth: "400px",
				contentHeight: "200px",
				resizable: true,
				content: new sap.ui.layout.form.SimpleForm({
					editable: true,
					layout: "ResponsiveGridLayout",
					content: [
						new sap.m.Title({
							text: i18n.getText("Name")
						}),
						new sap.m.Input({
							id: "newCategoryName",
							type: "Text",
							required: true
						}),
						new sap.m.Title({
							text: i18n.getText("CategoryTax")
						}),
						new sap.m.Input({
							id: "newCategoryTax",
							type: "Number",
							required: true
						})
					]
				}),
				beginButton: new sap.m.Button({
					text: i18n.getText("Add"),
					press: function () {
						that.createCategory();
					}.bind(this)
				}),
				endButton: new sap.m.Button({
					text: i18n.getText("Close"),
					press: function () {
						this.resizableDialog.close();
						this.resizableDialog.destroy();
					}.bind(this)
				})
			});
			this.getView().addDependent(this.resizableDialog);

			this.resizableDialog.open();
		},

		//CHECK DATA
		checkCategoryData: function (name, taxRate) {
			if (name === "" || Number.isNaN(taxRate) || taxRate === "") {
				return false;
			}
			if (Number(taxRate) < 0 || Number(taxRate) > 100) {
				return false;
			}
			return true;
		},

		//BACKEND

		modifyCategory: function (data) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			jQuery.ajax({
				type: "PUT",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/categories",
				dataType: "json",
				data: JSON.stringify(data)
			});

			MessageBox.success(
				i18n.getText("CategoryModifySuccess"), {
					onClose: function (sAnswer) {
						window.location.reload();
					}
				}
			);
		},

		createCategory: function () {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var name = sap.ui.getCore().byId("newCategoryName").getValue();
			var taxRate = sap.ui.getCore().byId("newCategoryTax").getValue();
			var ok = this.checkCategoryData(name, taxRate);
			if (ok) {
				var data = {
					"name": name,
					"taxRate": taxRate
				};
				jQuery.ajax({
					type: "POST",
					contentType: "application/json",
					url: "http://localhost:8080/GiftShop/api/categories",
					dataType: "json",
					data: JSON.stringify(data)
				});
				this.resizableDialog.destroy();
				MessageBox.success(
					i18n.getText("CategoryAddSuccess"), {
						onClose: function (sAnswer) {
							window.location.reload();
						}
					}
				);
			} else {
				MessageBox.error(i18n.getText("CategoryAddErrorMessage"));
			}
		},

		deleteCategory: function (id) {
			var i18n = this.getView().getModel("i18n").getResourceBundle();
			var id = parseInt(id, 10);
			var data = {
				"id": id
			};
			jQuery.ajax({
				type: "DELETE",
				contentType: "application/json",
				url: "http://localhost:8080/GiftShop/api/categories/" + id,
				dataType: "json",
				data: JSON.stringify(data)
			});

			MessageBox.success(
				i18n.getText("CategoryDeleteSuccess"), {
					onClose: function (sAnswer) {
						window.location.reload();
					}
				}
			);
		}
	});
});