	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/Navigation",
		"./pages/Signin",
		"./pages/Menu"
	], function (opaTest) {
		"use strict";

		QUnit.module("Navigation Journey");

		opaTest("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem.", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();
			Given.onTheSigninPage.iPressOnSignIn();
			
			// Assertions
			Then.onTheMenuPage.iShouldSeeTheApp();
		});

		opaTest("Kijelentkezhetek.", function (Given, When, Then) {
			//Actions
			When.onTheMenuPage.iPressOnSignOut();

			// Assertions
			Then.onTheAppPage.iShouldSeeTheApp();

			// Cleanup
			Then.iTeardownMyApp();
		});	
	});