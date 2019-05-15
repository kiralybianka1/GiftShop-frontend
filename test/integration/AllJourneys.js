sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney", 
	"./MenuJourney", 
	"./ProductsJourney",
	"./CustomersJourney",
	"./SellersJourney", 
	"./OrdersJourney", 
	
	"./ProductsCRUDJourney",
	"./CustomersCRUDJourney",
	"./OrdersCRUDJourney"
	
	 
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "Project.Project.view.",
		autoWait: true
	});
});