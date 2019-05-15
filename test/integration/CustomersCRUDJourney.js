	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/Navigation",
		"./pages/Signin",
		"./pages/Menu",
		"./pages/Customers",
		"./pages/Customer"
	], function (opaTest) {
		"use strict";

		QUnit.module("Vásárló (műveletek) tesztelés");

		opaTest("Látnom kell a bejelentkezési oldalt. Be kell jelentkeznem, majd a menüben ki kell választanom a 'Vásárlók' fület. Ez után a vásárlók oldal jelenik meg.", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();
			Given.onTheSigninPage.iPressOnSignIn();
			Given.onTheMenuPage.iPressOnCustomers();
			
			// Assertions
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Üresen hagyott kötelező mezők: " +
				//"[Vezetéknév:Lastname, Keresztnév:, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:1, Ajtó:2, Kapucsengő:2, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]"
				"[Keresztnév:]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(1);
			When.onTheCustomersPage.iAddTheDoor(2);
			When.onTheCustomersPage.iAddTheDoorbell(2);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A bankszámlaszám nem megfelelő (a minimális hossz 24 karakter): " +
				//"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:1, Ajtó:2, Kapucsengő:2, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-]"
				"[Bankszámlaszám:11111111-11111111-]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(1);
			When.onTheCustomersPage.iAddTheDoor(2);
			When.onTheCustomersPage.iAddTheDoorbell(2);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Az email formátuma nem megfelelő: " +
				//"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:1, Ajtó:2, Kapucsengő:2, Telefon:+3630303030, Email:emailemail.email, Bankszámlaszám:11111111-11111111-11111111]"
				"[Email:emailemail.email]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(1);
			When.onTheCustomersPage.iAddTheDoor(2);
			When.onTheCustomersPage.iAddTheDoorbell(2);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("emailemail.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A telefonszám formátuma nem megfelelő: " +
				//"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:1, Ajtó:2, Kapucsengő:2, Telefon:+123123, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]"
				"[Telefon:+123123]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(1);
			When.onTheCustomersPage.iAddTheDoor(2);
			When.onTheCustomersPage.iAddTheDoorbell(2);
			When.onTheCustomersPage.iAddThePhone("+123123");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Az emelet száma nem megfelelő (nem -20 és +50 közötti egész szám)" +
				//"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:-25, Ajtó:2, Kapucsengő:2, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-111111111]"
				"[Emelet:-25]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(-25);
			When.onTheCustomersPage.iAddTheDoor(2);
			When.onTheCustomersPage.iAddTheDoorbell(2);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Az emelet száma nem megfelelő (nem -20 és +50 közötti egész szám) " +
				//"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:55, Ajtó:2, Kapucsengő:2, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]"
				"[Emelet:55]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(55);
			When.onTheCustomersPage.iAddTheDoor(2);
			When.onTheCustomersPage.iAddTheDoorbell(2);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Az ajtó száma nem megfelelő (nem 0 és 1000 közötti egész szám) " +
				//"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:1, Ajtó:1001, Kapucsengő:2, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]"
				"[Ajtó:1001]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(1);
			When.onTheCustomersPage.iAddTheDoor(1001);
			When.onTheCustomersPage.iAddTheDoorbell(2);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Az ajtó száma nem megfelelő (nem 0 és 1000 közötti egész szám) " +
				//"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:1, Ajtó:-1, Kapucsengő:2, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]"
				"[Ajtó:-1]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(1);
			When.onTheCustomersPage.iAddTheDoor(-1);
			When.onTheCustomersPage.iAddTheDoorbell(2);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A kapucsengő száma nem megfelelő (nem 0 és 1000 közötti egész szám) " +
				//"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:1, Ajtó:2, Kapucsengő:-1, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]"
				"[Kapucsengő:-1]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(1);
			When.onTheCustomersPage.iAddTheDoor(2);
			When.onTheCustomersPage.iAddTheDoorbell(-1);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A kapucsengő száma nem megfelelő (nem 0 és 1000 közötti egész szám) " +
				//"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:1, Ajtó:2, Kapucsengő:1001, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]"
				"[Kapucsengő:1001]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(1);
			When.onTheCustomersPage.iAddTheDoor(2);
			When.onTheCustomersPage.iAddTheDoorbell(1001);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheErrorAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomersPage.iPressOnAddCustomerClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helyes kitöltésekor a felugró ablakban sikeres hozzáadás üzenetet  kell látnom." +
				"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:1, Ajtó:2, Kapucsengő:2, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor(1);
			When.onTheCustomersPage.iAddTheDoor(2);
			When.onTheCustomersPage.iAddTheDoorbell(2);
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheSuccessAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressSuccessTheMessageBoxClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		
		opaTest("HOZZÁADÁS:Az űrlap helyes kitöltésekor a felugró ablakban sikeres hozzáadás üzenetet kell látnom. Az emelet, ajtó, kapucsengő mezők kitöltése nem kötelező." +
				"[Vezetéknév:Lastname, Keresztnév:Firstname, Ország:Country, Irányítószám:1000, Város:City, Utca:Street, Házszám:1/A, Emelet:, Ajtó:, Kapucsengő:, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]", function (Given, When, Then) {
			When.onTheCustomersPage.iPressOnAddCustomer();
			
			When.onTheCustomersPage.iAddTheFirstName("Firstname");
			When.onTheCustomersPage.iAddTheLastName("Lastname");
			When.onTheCustomersPage.iAddTheCountry("Country");
			When.onTheCustomersPage.iAddTheZip(1000);
			When.onTheCustomersPage.iAddTheCity("City");
			When.onTheCustomersPage.iAddTheStreet("Street");
			When.onTheCustomersPage.iAddTheHouseNumber("1/A");
			When.onTheCustomersPage.iAddTheFloor();
			When.onTheCustomersPage.iAddTheDoor();
			When.onTheCustomersPage.iAddTheDoorbell();
			When.onTheCustomersPage.iAddThePhone("+3630303030");
			When.onTheCustomersPage.iAddTheEmail("email@email.email");
			When.onTheCustomersPage.iAddTheBankAccount("11111111-11111111-11111111");

			When.onTheCustomersPage.iPressOnConfirmAdd();

			Then.onTheCustomersPage.iShouldSeeTheSuccessAddCustomerDialog();
			
			When.onTheCustomersPage.iShouldPressSuccessTheMessageBoxClose();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
			
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Üresen hagyott kötelező mezők: " +
				"[Keresztnév:]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheFirstName("");
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom.  A bankszámlaszám nem megfelelő (a minimális hossz 24 karakter): " +
				"[Bankszámlaszám:11111111-11111111-]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheBankAccount("11111111-11111111-");
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Az email formátuma nem megfelelő: " +
				"[Email:emailemail.email]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheEmail("emailemail.email");
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A telefonszám formátuma nem megfelelő: " +
				"[Telefon:+123123]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyThePhone("+123123");
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom.  Az emelet száma nem megfelelő (nem -20 és +50 közötti egész szám): " +
				"[Emelet:-25]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheFloor(-25);
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom.  Az emelet száma nem megfelelő (nem -20 és +50 közötti egész szám): " +
				"[Emelet:55]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheFloor(55);
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Az ajtó száma nem megfelelő (nem 0 és 1000 közötti egész szám): " +
				"[Ajtó:-1]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheDoor(-1);
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. Az ajtó száma nem megfelelő (nem 0 és 1000 közötti egész szám): " +
				"[Ajtó:1001]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheDoor(1001);
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A kapucsengő száma nem megfelelő (nem 0 és 1000 közötti egész szám): " +
				"[Kapucsengő:-1]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheDoorbell(-1);
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		opaTest("MÓDOSÍTÁS:Az űrlap helytelen kitöltésekor a felugró ablakban hibaüzenetet kell látnom. A kapucsengő száma nem megfelelő (nem 0 és 1000 közötti egész szám): " +
				"[Kapucsengő:1001]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheDoorbell(1001);
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		
		opaTest("MÓDOSÍTÁS:Az űrlap helyes kitöltésekor a felugró ablakban sikeres módosítás üzenetet kell látnom." +
				"[ Keresztnév:Firstname Modify, Emelet:1, Ajtó:2, Kapucsengő:2, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheFirstName("Firstname Modify");
			When.onTheCustomerPage.iModifyTheFloor(1);
			When.onTheCustomerPage.iModifyTheDoor(2);
			When.onTheCustomerPage.iModifyTheDoorbell(2);
			When.onTheCustomerPage.iModifyThePhone("+3630303030");
			When.onTheCustomerPage.iModifyTheEmail("email@email.email");
			When.onTheCustomerPage.iModifyTheBankAccount("11111111-11111111-11111111");
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheSuccessModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressSuccessTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		
		opaTest("MÓDOSÍTÁS:Az űrlap helyes kitöltésekor a felugró ablakban sikeres módosítás üzenetet kell látnom.Az emelet, ajtó, kapucsengő mezők kitöltése nem kötelező." +
				"[ Keresztnév:Firstname Modify, Emelet:, Ajtó:, Kapucsengő:, Telefon:+3630303030, Email:email@email.email, Bankszámlaszám:11111111-11111111-11111111]", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(0).
			and.iPressATableItemAtPosition(0);
			When.onTheCustomerPage.iPressOnModifyTab();
			
			Then.onTheCustomerPage.iShouldSeeTheApp();
			
			When.onTheCustomerPage.iModifyTheFirstName("Firstname Modify");
			When.onTheCustomerPage.iModifyTheFloor();
			When.onTheCustomerPage.iModifyTheDoor();
			When.onTheCustomerPage.iModifyTheDoorbell();
			When.onTheCustomerPage.iModifyThePhone("+3630303030");
			When.onTheCustomerPage.iModifyTheEmail("email@email.email");
			When.onTheCustomerPage.iModifyTheBankAccount("11111111-11111111-11111111");
			When.onTheCustomerPage.iPressOnModifyCustomer();
			
			Then.onTheCustomerPage.iShouldSeeTheSuccessModifyCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressSuccessTheMessageBoxClose();
			When.onTheCustomerPage.iPressOnInfoTab();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		
		opaTest("TÖRLÉS:A törlés nem megengedett, ha egy vagy annál több megrendelés tartozik a vásárlóhoz. Ekkor a felugró ablakban hibaüzenetet kell látnunk.", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(5).
			and.iPressATableItemAtPosition(5);
			When.onTheCustomerPage.iPressOnDelete();
			
			Then.onTheCustomerPage.iShouldSeeTheErrorDeleteCustomerDialog();
			
			When.onTheCustomerPage.iShouldPressTheDeleteErrorMessageBoxClose();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
		});	
		
		opaTest("TÖRLÉS:A törlés akkor megengedett, ha nem tartozik megrendelés a vásárlóhoz.", function (Given, When, Then) {
			When.onTheCustomersPage.iRememberTheItemAtPosition(1).
			and.iPressATableItemAtPosition(1);
			When.onTheCustomerPage.iPressOnDelete();
			When.onTheCustomerPage.iConfirmTheDelete();
			//Then.onTheCustomerPage.iShouldSeeTheErrorDeleteCustomerDialog();
			
			//When.onTheCustomerPage.iShouldPressTheDeleteErrorMessageBoxClose();
			When.onTheCustomerPage.iPressOnBack();
			
			Then.onTheCustomersPage.iShouldSeeTheApp();
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