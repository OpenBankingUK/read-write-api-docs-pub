(window.webpackJsonp=window.webpackJsonp||[]).push([[405],{1323:function(t,e,a){"use strict";a.r(e);var s=a(6),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"direct-debits-v3-1-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#direct-debits-v3-1-2"}},[t._v("#")]),t._v(" Direct Debits - v3.1.2")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#overview"}},[t._v("Overview")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#endpoints"}},[t._v("Endpoints")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#get-accountsaccountiddirect-debits"}},[t._v("GET /accounts/{AccountId}/direct-debits")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#get-direct-debits"}},[t._v("GET /direct-debits")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#data-model"}},[t._v("Data Model")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#resource-definition"}},[t._v("Resource Definition")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#uml-diagram"}},[t._v("UML Diagram")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#permission-codes"}},[t._v("Permission Codes")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#data-dictionary"}},[t._v("Data Dictionary")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#usage-examples"}},[t._v("Usage Examples")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#specific-account"}},[t._v("Specific Account")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#get-accounts-direct-debits-request"}},[t._v("Get Accounts Direct Debits Request")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#get-accounts-direct-debits-response"}},[t._v("Get Accounts Direct Debits Response")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#bulk"}},[t._v("Bulk")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#get-direct-debits-request"}},[t._v("Get Direct Debits Request")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#get-direct-debits-response"}},[t._v("Get Direct Debits Response")])])])])])])]),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[t._v("The direct-debits resource is used by an AISP to retrieve the direct debits for a specific account identified by AccountId or to retrieve direct debits for all accounts that the PSU has consented to.")]),t._v(" "),a("p",[t._v("This resource description should be read in conjunction with a compatible Account Information Services API Profile.")]),t._v(" "),a("h2",{attrs:{id:"endpoints"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#endpoints"}},[t._v("#")]),t._v(" Endpoints")]),t._v(" "),a("p",[t._v("Endpoints for the resource and available methods.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th"),t._v(" "),a("th",[t._v("Resource")]),t._v(" "),a("th",[t._v("HTTP Operation")]),t._v(" "),a("th",[t._v("Endpoint")]),t._v(" "),a("th",[t._v("Mandatory?")]),t._v(" "),a("th",[t._v("Scope")]),t._v(" "),a("th",[t._v("Grant Type")]),t._v(" "),a("th",[t._v("Idempotency Key")]),t._v(" "),a("th",[t._v("Parameters")]),t._v(" "),a("th",[t._v("Request Object")]),t._v(" "),a("th",[t._v("Response Object")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("1")]),t._v(" "),a("td",[t._v("direct-debits")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[t._v("GET /accounts/{AccountId}/direct-debits")]),t._v(" "),a("td",[t._v("Conditional")]),t._v(" "),a("td",[t._v("accounts")]),t._v(" "),a("td",[t._v("Authorization Code")]),t._v(" "),a("td",[t._v("No")]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBReadDirectDebit1")])]),t._v(" "),a("tr",[a("td",[t._v("2")]),t._v(" "),a("td",[t._v("direct-debits")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[t._v("GET /direct-debits")]),t._v(" "),a("td",[t._v("Optional")]),t._v(" "),a("td",[t._v("accounts")]),t._v(" "),a("td",[t._v("Authorization Code")]),t._v(" "),a("td",[t._v("No")]),t._v(" "),a("td",[t._v("Pagination")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBReadDirectDebit1")])])])]),t._v(" "),a("h3",{attrs:{id:"get-accounts-accountid-direct-debits"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-accounts-accountid-direct-debits"}},[t._v("#")]),t._v(" GET /accounts/{AccountId}/direct-debits")]),t._v(" "),a("p",[t._v("An ASPSP must provide this endpoint for AISPs to retrieve the direct-debits for a specific account identified by AccountId.")]),t._v(" "),a("h3",{attrs:{id:"get-direct-debits"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-direct-debits"}},[t._v("#")]),t._v(" GET /direct-debits")]),t._v(" "),a("p",[t._v("An ASPSP may provide this endpoint for AISPs to retrieve direct-debits for all accounts that the PSU has consented to. This will retrieve the direct-debit resources for all authorised accounts linked to the account-request.")]),t._v(" "),a("h2",{attrs:{id:"data-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-model"}},[t._v("#")]),t._v(" Data Model")]),t._v(" "),a("h3",{attrs:{id:"resource-definition"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#resource-definition"}},[t._v("#")]),t._v(" Resource Definition")]),t._v(" "),a("p",[t._v("A resource that contains a set of elements that describes the list of direct debits that have been set up on a specific account (AccountId).\nAn account (AccountId) may have no direct debits set up, or may have multiple direct debits set up.")]),t._v(" "),a("h3",{attrs:{id:"uml-diagram"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#uml-diagram"}},[t._v("#")]),t._v(" UML Diagram")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/DirectDebits/OBReadDirectDebit1.gif",alt:" OBReadDirectDebit1.gif "}})]),t._v(" "),a("h3",{attrs:{id:"permission-codes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#permission-codes"}},[t._v("#")]),t._v(" Permission Codes")]),t._v(" "),a("p",[t._v("The resource requires the ReadDirectDebits permission. The resource response payload does not differ depending on the permissions granted.")]),t._v(" "),a("h3",{attrs:{id:"data-dictionary"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-dictionary"}},[t._v("#")]),t._v(" Data Dictionary")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Occurrence")]),t._v(" "),a("th",[t._v("XPath")]),t._v(" "),a("th",[t._v("EnhancedDefinition")]),t._v(" "),a("th",[t._v("Class")]),t._v(" "),a("th",[t._v("Codes")]),t._v(" "),a("th",[t._v("Pattern")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("OBReadDirectDebit1")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBReadDirectDebit1")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBReadDirectDebit1")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Data")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBReadDataDirectDebit1")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("DirectDebit")]),t._v(" "),a("td",[t._v("0..n")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit")]),t._v(" "),a("td",[t._v("Account to or from which a cash entry is made.")]),t._v(" "),a("td",[t._v("OBDirectDebit1")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("AccountId")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit/AccountId")]),t._v(" "),a("td",[t._v("A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.")]),t._v(" "),a("td",[t._v("Max40Text")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("DirectDebitId")]),t._v(" "),a("td",[t._v("0..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit/DirectDebitId")]),t._v(" "),a("td",[t._v("A unique and immutable identifier used to identify the direct debit resource. This identifier has no meaning to the account owner.")]),t._v(" "),a("td",[t._v("Max40Text")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("MandateIdentification")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit/MandateIdentification")]),t._v(" "),a("td",[t._v("Direct Debit reference. For AUDDIS service users provide Core Reference. For non AUDDIS service users provide Core reference if possible or last used reference.")]),t._v(" "),a("td",[t._v("Max35Text")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("DirectDebitStatusCode")]),t._v(" "),a("td",[t._v("0..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit/DirectDebitStatusCode")]),t._v(" "),a("td",[t._v("Specifies the status of the direct debit in code form.")]),t._v(" "),a("td",[t._v("OBExternalDirectDebitStatus1Code")]),t._v(" "),a("td",[t._v("Active Inactive")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Name")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit/Name")]),t._v(" "),a("td",[t._v("Name of Service User.")]),t._v(" "),a("td",[t._v("Max70Text")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("PreviousPaymentDateTime")]),t._v(" "),a("td",[t._v("0..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit/PreviousPaymentDateTime")]),t._v(" "),a("td",[t._v("Date of most recent direct debit collection.")]),t._v(" "),a("td",[t._v("ISODateTime")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("PreviousPaymentAmount")]),t._v(" "),a("td",[t._v("0..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit/PreviousPaymentAmount")]),t._v(" "),a("td",[t._v("The amount of the most recent direct debit collection.")]),t._v(" "),a("td",[t._v("OBActiveOrHistoricCurrencyAndAmount")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Amount")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit/PreviousPaymentAmount/Amount")]),t._v(" "),a("td",[t._v("A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.")]),t._v(" "),a("td",[t._v("OBActiveCurrencyAndAmount_SimpleType")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("^\\d{1,13}.\\d{1,5}$")])]),t._v(" "),a("tr",[a("td",[t._v("Currency")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBReadDirectDebit1/Data/DirectDebit/PreviousPaymentAmount/Currency")]),t._v(" "),a("td",[t._v('A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".')]),t._v(" "),a("td",[t._v("ActiveOrHistoricCurrencyCode")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("^[A-Z]{3,3}$")])])])]),t._v(" "),a("h2",{attrs:{id:"usage-examples"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usage-examples"}},[t._v("#")]),t._v(" Usage Examples")]),t._v(" "),a("h3",{attrs:{id:"specific-account"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#specific-account"}},[t._v("#")]),t._v(" Specific Account")]),t._v(" "),a("h4",{attrs:{id:"get-accounts-direct-debits-request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-accounts-direct-debits-request"}},[t._v("#")]),t._v(" Get Accounts Direct Debits Request")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("GET /accounts/22289/direct-debits HTTP/1.1\nAuthorization: Bearer Az90SAOJklae\nx-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT\nx-fapi-customer-ip-address: 104.25.212.99\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nAccept: application/json\n")])])]),a("h4",{attrs:{id:"get-accounts-direct-debits-response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-accounts-direct-debits-response"}},[t._v("#")]),t._v(" Get Accounts Direct Debits Response")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("HTTP/1.1 200 OK\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\n")])])]),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"DirectDebit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"DirectDebitId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"DD03"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MandateIdentification"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Caravanners"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"DirectDebitStatusCode"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Active"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Towbar Club 3 - We Love Towbars"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"PreviousPaymentDateTime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2017-04-05T10:43:07+00:00"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"PreviousPaymentAmount"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.57"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/direct-debits/"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TotalPages"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"bulk"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bulk"}},[t._v("#")]),t._v(" Bulk")]),t._v(" "),a("h4",{attrs:{id:"get-direct-debits-request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-direct-debits-request"}},[t._v("#")]),t._v(" Get Direct Debits Request")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("GET /direct-debits HTTP/1.1\nAuthorization: Bearer Az90SAOJklae\nx-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT\nx-fapi-customer-ip-address: 104.25.212.99\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nAccept: application/json\n")])])]),a("h4",{attrs:{id:"get-direct-debits-response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-direct-debits-response"}},[t._v("#")]),t._v(" Get Direct Debits Response")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("HTTP/1.1 200 OK\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\n")])])]),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"DirectDebit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"DirectDebitId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"DD03"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MandateIdentification"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Caravanners"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"DirectDebitStatusCode"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Active"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Towbar Club 3 - We Love Towbars"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"PreviousPaymentDateTime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2017-04-05T10:43:07+00:00"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"PreviousPaymentAmount"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.57"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"31820"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"DirectDebitId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"DD77"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MandateIdentification"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Golfers"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"DirectDebitStatusCode"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Active"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Golf Club"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"PreviousPaymentDateTime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2017-05-06T09:00:00+00:00"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"PreviousPaymentAmount"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22.30"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v3.1/aisp/direct-debits/"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TotalPages"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=r.exports}}]);