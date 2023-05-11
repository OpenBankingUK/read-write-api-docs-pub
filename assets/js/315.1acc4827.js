(window.webpackJsonp=window.webpackJsonp||[]).push([[315],{1709:function(t,e,a){"use strict";a.r(e);var s=a(6),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"offers-v3-1-7"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#offers-v3-1-7"}},[t._v("#")]),t._v(" Offers - v3.1.7 ")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#overview"}},[t._v("Overview")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#endpoints"}},[t._v("Endpoints")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#get-accountsaccountidoffers"}},[t._v("GET /accounts/{AccountId}/offers")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#get-offers"}},[t._v("GET /offers")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#data-model"}},[t._v("Data Model")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#resource-definition"}},[t._v("Resource Definition")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#uml-diagram"}},[t._v("UML Diagram")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#notes"}},[t._v("Notes")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#permission-codes"}},[t._v("Permission Codes")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#data-dictionary"}},[t._v("Data Dictionary")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#usage-examples"}},[t._v("Usage Examples")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#specific-account"}},[t._v("Specific Account")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#get-offers-request"}},[t._v("Get Offers Request")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#response-get-offers-response"}},[t._v("Response: Get Offers Response")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#bulk"}},[t._v("Bulk")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#request-get-offers-request"}},[t._v("Request: Get Offers Request")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#response-get-offers-response-1"}},[t._v("Response: Get Offers Response")])])])])])])]),t._v(" "),s("h2",{attrs:{id:"overview"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),s("p",[t._v("The offers resource is used by an AISP to retrieve the offers available for a specific AccountId or to retrieve the offers detail in bulk for all accounts that the PSU has consented to.")]),t._v(" "),s("p",[t._v("This resource description should be read in conjunction with a compatible Account Information Services API Profile.")]),t._v(" "),s("h2",{attrs:{id:"endpoints"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#endpoints"}},[t._v("#")]),t._v(" Endpoints")]),t._v(" "),s("p",[t._v("Endpoints for the resource and available methods.")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th"),t._v(" "),s("th",[t._v("Resource")]),t._v(" "),s("th",[t._v("HTTP Operation")]),t._v(" "),s("th",[t._v("Endpoint")]),t._v(" "),s("th",[t._v("Mandatory?")]),t._v(" "),s("th",[t._v("Scope")]),t._v(" "),s("th",[t._v("Grant Type")]),t._v(" "),s("th",[t._v("Idempotency Key")]),t._v(" "),s("th",[t._v("Parameters")]),t._v(" "),s("th",[t._v("Request Object")]),t._v(" "),s("th",[t._v("Response Object")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("1")]),t._v(" "),s("td",[t._v("offers")]),t._v(" "),s("td",[t._v("GET")]),t._v(" "),s("td",[t._v("GET /accounts/{AccountId}/offers")]),t._v(" "),s("td",[t._v("Conditional")]),t._v(" "),s("td",[t._v("accounts")]),t._v(" "),s("td",[t._v("Authorization Code")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td"),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadOffer1")])]),t._v(" "),s("tr",[s("td",[t._v("2")]),t._v(" "),s("td",[t._v("offers")]),t._v(" "),s("td",[t._v("GET")]),t._v(" "),s("td",[t._v("GET /offers")]),t._v(" "),s("td",[t._v("Optional")]),t._v(" "),s("td",[t._v("accounts")]),t._v(" "),s("td",[t._v("Authorization Code")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("Pagination")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadOffer1")])])])]),t._v(" "),s("h3",{attrs:{id:"get-accounts-accountid-offers"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#get-accounts-accountid-offers"}},[t._v("#")]),t._v(" GET /accounts/{AccountId}/offers")]),t._v(" "),s("p",[t._v("An AISP  "),s("strong",[t._v("may")]),t._v("  retrieve the offers resource for a specific AccountId (which is retrieved in the call to GET /accounts).")]),t._v(" "),s("h3",{attrs:{id:"get-offers"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#get-offers"}},[t._v("#")]),t._v(" GET /offers")]),t._v(" "),s("p",[t._v("If an ASPSP has implemented the bulk retrieval endpoints, an AISP  "),s("strong",[t._v("may")]),t._v("  optionally retrieve the offers in bulk.\nThis will retrieve the resources for all authorised accounts linked to the account-request.")]),t._v(" "),s("h2",{attrs:{id:"data-model"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-model"}},[t._v("#")]),t._v(" Data Model")]),t._v(" "),s("p",[t._v("The OBReadOffer1 object will be used for the call to:")]),t._v(" "),s("ul",[s("li",[t._v("GET /accounts/{AccountId}/offers")]),t._v(" "),s("li",[t._v("GET /offers")])]),t._v(" "),s("h3",{attrs:{id:"resource-definition"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#resource-definition"}},[t._v("#")]),t._v(" Resource Definition")]),t._v(" "),s("p",[t._v("A resource that contains a set of elements that describes the list of offers available to a specific account (AccountId).")]),t._v(" "),s("ul",[s("li",[t._v("Generic features (and pricing) for the account product will be not be available via the "),s("strong",[t._v("offers")]),t._v(" resources. These generic features will be available via the "),s("strong",[t._v("product")]),t._v(" resource.")]),t._v(" "),s("li",[t._v("The outcome of any offer (or product feature) uptake will not be reported via the "),s("strong",[t._v("offers")]),t._v(" resource. The benefits, interest, cash-back for any account will be available via the "),s("strong",[t._v("statements")]),t._v(" resource (if this is available to PSUs in the existing ASPSP online channel).")])]),t._v(" "),s("p",[t._v("An account (AccountId) may have no offers available, or may have multiple offers available.")]),t._v(" "),s("h3",{attrs:{id:"uml-diagram"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#uml-diagram"}},[t._v("#")]),t._v(" UML Diagram")]),t._v(" "),s("p",[s("img",{attrs:{src:a(862),alt:" OBReadOffer1 "}})]),t._v(" "),s("h3",{attrs:{id:"notes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#notes"}},[t._v("#")]),t._v(" Notes")]),t._v(" "),s("ul",[s("li",[t._v("Offers (or promotions) for a specific AccountId, which may be viewable in the ASPSP online banking interface, may have a complicated offer structure (which cannot be expressed using a flat Amount, Fee, Rate, or Value structure). In this case, the ASPSP must use the Description field to describe the nature of the offer in free-text")])]),t._v(" "),s("h3",{attrs:{id:"permission-codes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#permission-codes"}},[t._v("#")]),t._v(" Permission Codes")]),t._v(" "),s("p",[t._v("The resource requires the ReadOffers permission. The resource response payload does not differ depending on the permissions granted.")]),t._v(" "),s("h3",{attrs:{id:"data-dictionary"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-dictionary"}},[t._v("#")]),t._v(" Data Dictionary")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Occurrence")]),t._v(" "),s("th",[t._v("XPath")]),t._v(" "),s("th",[t._v("EnhancedDefinition")]),t._v(" "),s("th",[t._v("Class")]),t._v(" "),s("th",[t._v("Codes")]),t._v(" "),s("th",[t._v("Pattern")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("OBReadOffer1")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadOffer1")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadOffer1")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Data")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadDataOffer1")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Offer")]),t._v(" "),s("td",[t._v("0..n")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBOffer1")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("AccountId")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/AccountId")]),t._v(" "),s("td",[t._v("A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.")]),t._v(" "),s("td",[t._v("Max40Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("OfferId")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/OfferId")]),t._v(" "),s("td",[t._v("A unique and immutable identifier used to identify the offer resource. This identifier has no meaning to the account owner.")]),t._v(" "),s("td",[t._v("Max40Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("OfferType")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/OfferType")]),t._v(" "),s("td",[t._v("Offer type, in a coded form.")]),t._v(" "),s("td",[t._v("OBExternalOfferType1Code")]),t._v(" "),s("td",[t._v("BalanceTransfer LimitIncrease MoneyTransfer Other PromotionalRate")]),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Description")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Description")]),t._v(" "),s("td",[t._v("Further details of the offer.")]),t._v(" "),s("td",[t._v("Max500Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("StartDateTime")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/StartDateTime")]),t._v(" "),s("td",[t._v("Date and time at which the offer starts.")]),t._v(" "),s("td",[t._v("ISODateTime")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("EndDateTime")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/EndDateTime")]),t._v(" "),s("td",[t._v("Date and time at which the offer ends.")]),t._v(" "),s("td",[t._v("ISODateTime")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Rate")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Rate")]),t._v(" "),s("td",[t._v("Rate associated with the offer type.")]),t._v(" "),s("td",[t._v("Max10Text")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("^(-?\\d{1,3}){1}(.\\d{1,4}){0,1}$")])]),t._v(" "),s("tr",[s("td",[t._v("Value")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Value")]),t._v(" "),s("td",[t._v("Value associated with the offer type.")]),t._v(" "),s("td",[t._v("Number")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Term")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Term")]),t._v(" "),s("td",[t._v("Further details of the term of the offer.")]),t._v(" "),s("td",[t._v("Max500Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("URL")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/URL")]),t._v(" "),s("td",[t._v("URL (Uniform Resource Locator) where documentation on the offer can be found")]),t._v(" "),s("td",[t._v("Max256Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Amount")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Amount")]),t._v(" "),s("td",[t._v("Amount of money associated with the offer type.")]),t._v(" "),s("td",[t._v("OBActiveOrHistoricCurrencyAndAmount")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Amount")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Amount/Amount")]),t._v(" "),s("td",[t._v("A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.")]),t._v(" "),s("td",[t._v("OBActiveCurrencyAndAmount_SimpleType")]),t._v(" "),s("td"),t._v(" "),s("td",[s("code",[t._v("^\\d{1,13}$\\|^\\d{1,13}\\.\\d{1,5}$")])])]),t._v(" "),s("tr",[s("td",[t._v("Currency")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Amount/Currency")]),t._v(" "),s("td",[t._v('A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".')]),t._v(" "),s("td",[t._v("ActiveOrHistoricCurrencyCode")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("^[A-Z]{3,3}$")])]),t._v(" "),s("tr",[s("td",[t._v("Fee")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Fee")]),t._v(" "),s("td",[t._v("Fee associated with the offer type.")]),t._v(" "),s("td",[t._v("OBActiveOrHistoricCurrencyAndAmount")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Amount")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Fee/Amount")]),t._v(" "),s("td",[t._v("A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.")]),t._v(" "),s("td",[t._v("OBActiveCurrencyAndAmount_SimpleType")]),t._v(" "),s("td"),t._v(" "),s("td",[s("code",[t._v("^\\d{1,13}$\\|^\\d{1,13}\\.\\d{1,5}$")])])]),t._v(" "),s("tr",[s("td",[t._v("Currency")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadOffer1/Data/Offer/Fee/Currency")]),t._v(" "),s("td",[t._v('A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".')]),t._v(" "),s("td",[t._v("ActiveOrHistoricCurrencyCode")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("^[A-Z]{3,3}$")])])])]),t._v(" "),s("h2",{attrs:{id:"usage-examples"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usage-examples"}},[t._v("#")]),t._v(" Usage Examples")]),t._v(" "),s("h3",{attrs:{id:"specific-account"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#specific-account"}},[t._v("#")]),t._v(" Specific Account")]),t._v(" "),s("h4",{attrs:{id:"get-offers-request"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#get-offers-request"}},[t._v("#")]),t._v(" Get Offers Request")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("GET /accounts/22289/offers HTTP/1.1\nAuthorization: Bearer Az90SAOJklae\nx-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT\nx-fapi-customer-ip-address: 104.25.212.99\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nAccept: application/json\n")])])]),s("h4",{attrs:{id:"response-get-offers-response"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response-get-offers-response"}},[t._v("#")]),t._v(" Response: Get Offers Response")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("HTTP/1.1 200 OK\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\n")])])]),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Offer"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Offer1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferType"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"LimitIncrease"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Description"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Credit limit increase for the account up to £10000.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"10000.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Offer2"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferType"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"BalanceTransfer"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Description"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Balance transfer offer up to £2000"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2000.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("      \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/offers/"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TotalPages"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"bulk"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bulk"}},[t._v("#")]),t._v(" Bulk")]),t._v(" "),s("h4",{attrs:{id:"request-get-offers-request"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#request-get-offers-request"}},[t._v("#")]),t._v(" Request: Get Offers Request")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("GET /offers HTTP/1.1\nAuthorization: Bearer Az90SAOJklae\nx-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT\nx-fapi-customer-ip-address: 104.25.212.99\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nAccept: application/json\n")])])]),s("h4",{attrs:{id:"response-get-offers-response-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response-get-offers-response-2"}},[t._v("#")]),t._v(" Response: Get Offers Response")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("HTTP/1.1 200 OK\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\n")])])]),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Offer"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Offer1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferType"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"LimitIncrease"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Description"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Credit limit increase for the account up to £10000.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"10000.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Offer2"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferType"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"BalanceTransfer"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Description"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Balance transfer offer up to £2000"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2000.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"32515"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Offer3"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OfferType"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"LimitIncrease"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Description"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Credit limit increase for the account up to £50000.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"50000.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("   \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v3.1/aisp/offers/"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TotalPages"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=r.exports},862:function(t,e,a){t.exports=a.p+"assets/img/OBReadOffer1.d1615ca6.svg"}}]);