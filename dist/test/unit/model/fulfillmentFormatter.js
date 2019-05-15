sap.ui.define(["Project/Project/model/fulfillmentFormatter"],function(t){"use strict";QUnit.module("Teljesítési dátum állapot fromázó");function e(e){var l=t.fulfillState(e.fulfillDate);e.assert.strictEqual(l,e.expected,"Az állapot helyes volt.")}QUnit.test("A megrendelések teljesítésének dátuma a teljesítettség alapján van formázva. Ha van teljesítési dátum a megrendelés zöld színű. Ehhez a várt visszatérési érték: 'Low'.",function(t){e.call(this,{assert:t,fulfillDate:"2019-01-01",expected:"Low"})});QUnit.test("A megrendelések teljesítésének dátuma a teljesítettség alapján van formázva. Ha nincs teljesítési dátum a megrendelés piros színű. Ehhez a várt visszatérési érték: 'High'.",function(t){e.call(this,{assert:t,fulfillDate:null,expected:"High"})})});