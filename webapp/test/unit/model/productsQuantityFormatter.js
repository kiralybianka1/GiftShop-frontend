sap.ui.define([
	"Project/Project/model/productsQuantityFormatter"
], function (productsQuantityFormatter) {
	"use strict";

	QUnit.module("Termék mennyiség formázó");

	function productsQuantityTestCase(oOptions) {
		// Act
		var sState = productsQuantityFormatter.quantityState(oOptions.quantity);

		// Assert
		oOptions.assert.strictEqual(sState, oOptions.expected, "Az állapot helyes volt.");
	}

	QUnit.test("Ha a termék mennyisége kevesebb mint 50, akkor a mennyiség piros színnel jelenik meg. Ehhez a várt visszatérési érték: 'Error'.", function (assert) {
		productsQuantityTestCase.call(this, {
			assert: assert,
			quantity: 30,
			expected: "Error"
		});
	});

	QUnit.test("Ha a termék mennyisége pontosan 50, akkor a mennyiség piros színnel jelenik meg. Ehhez a várt visszatérési érték: 'Error'.", function (assert) {
		productsQuantityTestCase.call(this, {
			assert: assert,
			quantity: 50,
			expected: "Error"
		});
	});

	QUnit.test("Ha a termék mennyisége 50 és 100 közé esik, akkor a mennyiség sárga színnel jelenik meg. Ehhez a várt visszatérési érték: 'Critical'.", function (assert) {
		productsQuantityTestCase.call(this, {
			assert: assert,
			quantity: 80,
			expected: "Critical"
		});
	});

	QUnit.test("Ha a termék mennyisége pontosan 100, akkor a mennyiség sárga színnel jelenik meg. Ehhez a várt visszatérési érték: 'Critical'.", function (assert) {
		productsQuantityTestCase.call(this, {
			assert: assert,
			quantity: 100,
			expected: "Critical"
		});
	});

	QUnit.test("Ha a termék mennyisége több mint 50, akkor a mennyiség zöld színnel jelenik meg. Ehhez a várt visszatérési érték: 'Good'.", function (assert) {
		productsQuantityTestCase.call(this, {
			assert: assert,
			quantity: 120,
			expected: "Good"
		});
	});

});