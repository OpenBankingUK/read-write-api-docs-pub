(window.webpackJsonp=window.webpackJsonp||[]).push([[300],{1450:function(t,a,n){t.exports=n.p+"assets/img/OBFundsConfirmation1.e9e01775.svg"},1451:function(t,a,n){t.exports=n.p+"assets/img/OBFundsConfirmationResponse1.b8b55207.svg"},2325:function(t,a,n){"use strict";n.r(a);var s=n(6),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"funds-confirmation-v4-0"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#funds-confirmation-v4-0"}},[t._v("#")]),t._v(" Funds Confirmation - v4.0 ")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#overview"}},[t._v("Overview")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#endpoints"}},[t._v("Endpoints")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#post-funds-confirmations"}},[t._v("POST /funds-confirmations")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#data-model"}},[t._v("Data Model")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#funds-confirmation---request"}},[t._v("Funds Confirmation - Request")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#uml-diagram"}},[t._v("UML Diagram")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#data-dictionary"}},[t._v("Data Dictionary")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#funds-confirmation---response"}},[t._v("Funds Confirmation - Response")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#uml-diagram-2"}},[t._v("UML Diagram")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#data-dictionary-2"}},[t._v("Data Dictionary")])])])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#usage-examples"}},[t._v("Usage Examples")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#funds-confirmation"}},[t._v("Funds Confirmation")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#example-with-all-permitted-fields"}},[t._v("Example with all permitted fields")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#request"}},[t._v("Request")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#response"}},[t._v("Response")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#example-with-a-usd-account"}},[t._v("Example with a USD account")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#request-2"}},[t._v("Request")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#response-2"}},[t._v("Response")])])])])])])])])]),t._v(" "),s("h2",{attrs:{id:"overview"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),s("p",[t._v("The Funds Confirmation resource is used by an CBPII to request to confirm funds are available.")]),t._v(" "),s("p",[t._v("This resource description should be read in conjunction with a compatible Confirmation of Funds API Profile.")]),t._v(" "),s("h2",{attrs:{id:"endpoints"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#endpoints"}},[t._v("#")]),t._v(" Endpoints")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Resource")]),t._v(" "),s("th",[t._v("HTTP Operation")]),t._v(" "),s("th",[t._v("Endpoint")]),t._v(" "),s("th",[t._v("Mandatory ?")]),t._v(" "),s("th",[t._v("Scope")]),t._v(" "),s("th",[t._v("Grant Type")]),t._v(" "),s("th",[t._v("Message Signing")]),t._v(" "),s("th",[t._v("Idempotency Key")]),t._v(" "),s("th",[t._v("Request Object")]),t._v(" "),s("th",[t._v("Response Object")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("funds-confirmation")]),t._v(" "),s("td",[t._v("POST")]),t._v(" "),s("td",[t._v("POST /funds-confirmations")]),t._v(" "),s("td",[t._v("Mandatory")]),t._v(" "),s("td",[t._v("fundsconfirmations")]),t._v(" "),s("td",[t._v("Authorization Code")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("OBFundsConfirmation1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1")])])])]),t._v(" "),s("h3",{attrs:{id:"post-funds-confirmations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#post-funds-confirmations"}},[t._v("#")]),t._v(" POST /funds-confirmations")]),t._v(" "),s("p",[t._v("If the CBPII would like to confirm funds with the ASPSP, it should create a new "),s("strong",[t._v("funds-confirmation")]),t._v(" resource, and check the funds available flag in the response.")]),t._v(" "),s("ul",[s("li",[t._v("The ASPSP creates the "),s("strong",[t._v("funds-confirmation")]),t._v(" resource and responds with a unique FundsConfirmationId to refer to the resource, and a flag confirming if funds are available.")]),t._v(" "),s("li",[t._v("The CBPII "),s("strong",[t._v("must")]),t._v(" use a token issued via an authorization code grant and specify the ConsentId in the request payload.")]),t._v(" "),s("li",[t._v("This CBPII "),s("strong",[t._v("must")]),t._v(" use a currency of the account.")])]),t._v(" "),s("h2",{attrs:{id:"data-model"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-model"}},[t._v("#")]),t._v(" Data Model")]),t._v(" "),s("p",[t._v("This data dictionary section gives the detail on the payload content.")]),t._v(" "),s("h3",{attrs:{id:"funds-confirmation-request"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#funds-confirmation-request"}},[t._v("#")]),t._v(" Funds Confirmation - Request")]),t._v(" "),s("p",[t._v("The OBFundsConfirmation1 object will be used for the following:")]),t._v(" "),s("ul",[s("li",[t._v("Request to POST /funds-confirmations")])]),t._v(" "),s("h4",{attrs:{id:"uml-diagram"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#uml-diagram"}},[t._v("#")]),t._v(" UML Diagram")]),t._v(" "),s("p",[s("img",{attrs:{src:n(1450),alt:"OBFundsConfirmation1"}})]),t._v(" "),s("p",[t._v("Notes:")]),t._v(" "),s("ul",[s("li",[t._v("Funds can only be confirmed against the currency of the account, ASPSP must reject the request when Amount is in a different currency than the currency of the underlying account.")])]),t._v(" "),s("h4",{attrs:{id:"data-dictionary"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-dictionary"}},[t._v("#")]),t._v(" Data Dictionary")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Occurrence")]),t._v(" "),s("th",[t._v("XPath")]),t._v(" "),s("th",[t._v("EnhancedDefinition")]),t._v(" "),s("th",[t._v("Class")]),t._v(" "),s("th",[t._v("Codes")]),t._v(" "),s("th",[t._v("Pattern")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("OBFundsConfirmation1")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBFundsConfirmation1")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBFundsConfirmation1")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Data")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmation1/Data")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBFundsConfirmationData1")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("ConsentId")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmation1/Data/ConsentId")]),t._v(" "),s("td",[t._v("Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource.")]),t._v(" "),s("td",[t._v("Max128Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Reference")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmation1/Data/Reference")]),t._v(" "),s("td",[t._v("Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.")]),t._v(" "),s("td",[t._v("Max35Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("InstructedAmount")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmation1/Data/InstructedAmount")]),t._v(" "),s("td",[t._v("Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.")]),t._v(" "),s("td",[t._v("OBActiveOrHistoricCurrencyAndAmount")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Amount")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmation1/Data/InstructedAmount/Amount")]),t._v(" "),s("td",[t._v("A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.")]),t._v(" "),s("td",[t._v("OBActiveCurrencyAndAmount_SimpleType")]),t._v(" "),s("td"),t._v(" "),s("td",[s("code",[t._v("^\\d{1,13}$|^\\d{1,13}\\.\\d{1,5}$")])])]),t._v(" "),s("tr",[s("td",[t._v("Currency")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmation1/Data/InstructedAmount/Currency")]),t._v(" "),s("td",[t._v('A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".')]),t._v(" "),s("td",[t._v("ActiveOrHistoricCurrencyCode")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("^[A-Z]{3,3}$")])])])]),t._v(" "),s("h3",{attrs:{id:"funds-confirmation-response"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#funds-confirmation-response"}},[t._v("#")]),t._v(" Funds Confirmation - Response")]),t._v(" "),s("p",[t._v("The OBFundsConfirmationResponse1 object will be used for the following:")]),t._v(" "),s("ul",[s("li",[t._v("Response to POST /funds-confirmations")])]),t._v(" "),s("h4",{attrs:{id:"uml-diagram-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#uml-diagram-2"}},[t._v("#")]),t._v(" UML Diagram")]),t._v(" "),s("p",[s("img",{attrs:{src:n(1451),alt:"OBFundsConfirmationResponse1"}})]),t._v(" "),s("p",[t._v("Notes:")]),t._v(" "),s("p",[t._v("The OBFundsConfirmationResponse1 object contains the same information as the OBFundsConfirmation1, but with additional fields:")]),t._v(" "),s("ul",[s("li",[t._v("FundsConfirmationId - to uniquely identify the funds-confirmation resource.")]),t._v(" "),s("li",[t._v("FundsAvailable - to indicate the result of a confirmation of funds check.")]),t._v(" "),s("li",[t._v("CreationDateTime - to indicate when the resource was created.")])]),t._v(" "),s("h4",{attrs:{id:"data-dictionary-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-dictionary-2"}},[t._v("#")]),t._v(" Data Dictionary")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Occurrence")]),t._v(" "),s("th",[t._v("XPath")]),t._v(" "),s("th",[t._v("EnhancedDefinition")]),t._v(" "),s("th",[t._v("Class")]),t._v(" "),s("th",[t._v("Codes")]),t._v(" "),s("th",[t._v("Pattern")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("OBFundsConfirmationResponse1")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Data")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1/Data")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBFundsConfirmationDataResponse1")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("FundsConfirmationId")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1/Data/FundsConfirmationId")]),t._v(" "),s("td",[t._v("Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation resource.")]),t._v(" "),s("td",[t._v("Max40Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("ConsentId")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1/Data/ConsentId")]),t._v(" "),s("td",[t._v("Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource.")]),t._v(" "),s("td",[t._v("Max128Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("CreationDateTime")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1/Data/CreationDateTime")]),t._v(" "),s("td",[t._v("Date and time at which the resource was created.")]),t._v(" "),s("td",[t._v("ISODateTime")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("FundsAvailable")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1/Data/FundsAvailable")]),t._v(" "),s("td",[t._v("Flag to indicate the result of a confirmation of funds check.")]),t._v(" "),s("td",[t._v("xs:boolean")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Reference")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1/Data/Reference")]),t._v(" "),s("td",[t._v("Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.")]),t._v(" "),s("td",[t._v("Max35Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("InstructedAmount")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1/Data/InstructedAmount")]),t._v(" "),s("td",[t._v("Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.")]),t._v(" "),s("td",[t._v("OBActiveOrHistoricCurrencyAndAmount")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Amount")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1/Data/InstructedAmount/Amount")]),t._v(" "),s("td",[t._v("A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.")]),t._v(" "),s("td",[t._v("OBActiveCurrencyAndAmount_SimpleType")]),t._v(" "),s("td"),t._v(" "),s("td",[s("code",[t._v("^\\d{1,13}$|^\\d{1,13}\\.\\d{1,5}$")])])]),t._v(" "),s("tr",[s("td",[t._v("Currency")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBFundsConfirmationResponse1/Data/InstructedAmount/Currency")]),t._v(" "),s("td",[t._v('A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".')]),t._v(" "),s("td",[t._v("ActiveOrHistoricCurrencyCode")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("^[A-Z]{3,3}$")])])])]),t._v(" "),s("h2",{attrs:{id:"usage-examples"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usage-examples"}},[t._v("#")]),t._v(" Usage Examples")]),t._v(" "),s("h3",{attrs:{id:"funds-confirmation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#funds-confirmation"}},[t._v("#")]),t._v(" Funds Confirmation")]),t._v(" "),s("h4",{attrs:{id:"example-with-all-permitted-fields"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example-with-all-permitted-fields"}},[t._v("#")]),t._v(" Example with all permitted fields")]),t._v(" "),s("h5",{attrs:{id:"request"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#request"}},[t._v("#")]),t._v(" Request")]),t._v(" "),s("p",[t._v("Post Funds Confirmation Request")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("POST /funds-confirmations HTTP/1.1\nContent-Type: application/json\nAuthorization: Bearer 1t1satruthun1v3rs4lly\nAccept: application/json; charset=utf-8\nx-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3\n")])])]),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ConsentId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"88379"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Reference"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Purchase01"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"InstructedAmount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"20.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h5",{attrs:{id:"response"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[t._v("#")]),t._v(" Response")]),t._v(" "),s("p",[t._v("Post Funds Confirmation Response")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("HTTP/1.1 201 Created\nContent-Type: application/json\nx-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3\n")])])]),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FundsConfirmationId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"123456"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ConsentId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"88379"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"CreationDateTime"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2017-05-02T00:00:00+00:00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FundsAvailable"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Reference"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Purchase01"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"InstructedAmount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"20.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v4.0/cbpii/funds-confirmations/123456"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h4",{attrs:{id:"example-with-a-usd-account"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example-with-a-usd-account"}},[t._v("#")]),t._v(" Example with a USD account")]),t._v(" "),s("p",[t._v("A funds confirmation check can be made in a currency other than GBP as long as the InstructedAmount is in the currency of the payment account.")]),t._v(" "),s("p",[t._v("In this example, a USD funds check is made on a USD payment account.")]),t._v(" "),s("h5",{attrs:{id:"request-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#request-2"}},[t._v("#")]),t._v(" Request")]),t._v(" "),s("p",[t._v("Post Funds Confirmation Request")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("POST /funds-confirmations HTTP/1.1\nContent-Type: application/json\nAuthorization: Bearer 1t1satruthun1v3rs4lly\nAccept: application/json; charset=utf-8\nx-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3\n")])])]),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ConsentId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"912304"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Reference"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Purchase02"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"InstructedAmount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"20.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"USD"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h5",{attrs:{id:"response-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response-2"}},[t._v("#")]),t._v(" Response")]),t._v(" "),s("p",[t._v("Post Funds Confirmation Response")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("HTTP/1.1 201 Created\nContent-Type: application/json\nx-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3\n")])])]),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FundsConfirmationId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"836403"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ConsentId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"912304"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"CreationDateTime"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2017-06-02T00:00:00+00:00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FundsAvailable"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Reference"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Purchase02"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"InstructedAmount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"20.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"USD"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v4.0/cbpii/funds-confirmations/836403"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);