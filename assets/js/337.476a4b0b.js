(window.webpackJsonp=window.webpackJsonp||[]).push([[337],{1002:function(t,e,a){t.exports=a.p+"assets/img/OBReadScheduledPayment3.f7768237.svg"},1795:function(t,e,a){"use strict";a.r(e);var s=a(6),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"scheduled-payments-v3-1-8"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#scheduled-payments-v3-1-8"}},[t._v("#")]),t._v(" Scheduled Payments - v3.1.8 ")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#overview"}},[t._v("Overview")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#endpoints"}},[t._v("Endpoints")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#get-accountsaccountidscheduled-payments"}},[t._v("GET /accounts/{AccountId}/scheduled-payments")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#get-scheduled-payments"}},[t._v("GET /scheduled-payments")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#data-model"}},[t._v("Data Model")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#resource-definition"}},[t._v("Resource Definition")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#uml-diagram"}},[t._v("UML Diagram")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#notes"}},[t._v("Notes")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#permission-codes"}},[t._v("Permission Codes")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#data-dictionary"}},[t._v("Data Dictionary")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#usage-examples"}},[t._v("Usage Examples")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#specific-account"}},[t._v("Specific Account")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#get-account-specific-scheduled-payments-request"}},[t._v("Get Account Specific Scheduled Payments Request")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#response-get-accounts-specific-scheduled-payments-response"}},[t._v("Response: Get Accounts Specific Scheduled Payments Response")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#bulk"}},[t._v("Bulk")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#get-bulk-scheduled-payments-request"}},[t._v("Get Bulk Scheduled Payments Request")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#get-bulk-scheduled-payments-response"}},[t._v("Get Bulk Scheduled Payments Response")])])])])])])]),t._v(" "),s("h2",{attrs:{id:"overview"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),s("p",[t._v("The scheduled-payments resource is used by an AISP to retrieve the scheduled payments for a specific account identified by AccountId or to retrieve scheduled payments for all accounts that the PSU has consented to.")]),t._v(" "),s("p",[t._v("This resource description should be read in conjunction with a compatible Account Information Services API Profile.")]),t._v(" "),s("h2",{attrs:{id:"endpoints"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#endpoints"}},[t._v("#")]),t._v(" Endpoints")]),t._v(" "),s("p",[t._v("Endpoints for the resource and available methods.")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th"),t._v(" "),s("th",[t._v("Resource")]),t._v(" "),s("th",[t._v("HTTP Operation")]),t._v(" "),s("th",[t._v("Endpoint")]),t._v(" "),s("th",[t._v("Mandatory?")]),t._v(" "),s("th",[t._v("Scope")]),t._v(" "),s("th",[t._v("Grant Type")]),t._v(" "),s("th",[t._v("Idempotency Key")]),t._v(" "),s("th",[t._v("Parameters")]),t._v(" "),s("th",[t._v("Request Object")]),t._v(" "),s("th",[t._v("Response Object")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("1")]),t._v(" "),s("td",[t._v("scheduled-payments")]),t._v(" "),s("td",[t._v("GET")]),t._v(" "),s("td",[t._v("GET /accounts/{AccountId}/scheduled-payments")]),t._v(" "),s("td",[t._v("Conditional")]),t._v(" "),s("td",[t._v("accounts")]),t._v(" "),s("td",[t._v("Authorization Code")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td"),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadScheduledPayment3")])]),t._v(" "),s("tr",[s("td",[t._v("2")]),t._v(" "),s("td",[t._v("scheduled-payments")]),t._v(" "),s("td",[t._v("GET")]),t._v(" "),s("td",[t._v("GET /scheduled-payments")]),t._v(" "),s("td",[t._v("Optional")]),t._v(" "),s("td",[t._v("accounts")]),t._v(" "),s("td",[t._v("Authorization Code")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("Pagination")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadScheduledPayment3")])])])]),t._v(" "),s("h3",{attrs:{id:"get-accounts-accountid-scheduled-payments"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#get-accounts-accountid-scheduled-payments"}},[t._v("#")]),t._v(" GET /accounts/{AccountId}/scheduled-payments")]),t._v(" "),s("p",[t._v("An ASPSP may provide this endpoint for AISPs to retrieve the scheduled-payments for a specific AccountId (which is retrieved in the call to GET /accounts).")]),t._v(" "),s("h3",{attrs:{id:"get-scheduled-payments"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#get-scheduled-payments"}},[t._v("#")]),t._v(" GET /scheduled-payments")]),t._v(" "),s("p",[t._v("If an ASPSP has implemented the bulk retrieval endpoints, an AISP may optionally retrieve the scheduled-payments resources in bulk.")]),t._v(" "),s("p",[t._v("This will retrieve the scheduled-payments resources for all authorised accounts linked to the account-request.")]),t._v(" "),s("h2",{attrs:{id:"data-model"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-model"}},[t._v("#")]),t._v(" Data Model")]),t._v(" "),s("h3",{attrs:{id:"resource-definition"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#resource-definition"}},[t._v("#")]),t._v(" Resource Definition")]),t._v(" "),s("p",[t._v("A resource that contains a set of elements that describes the scheduled payments that have been set up on a specific account (AccountId). A scheduled payment is a single one-off payment scheduled for a future date.")]),t._v(" "),s("p",[t._v("An account (AccountId) may have no scheduled payments set up, or may have multiple scheduled payments set up.")]),t._v(" "),s("h3",{attrs:{id:"uml-diagram"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#uml-diagram"}},[t._v("#")]),t._v(" UML Diagram")]),t._v(" "),s("p",[s("img",{attrs:{src:a(1002),alt:" OBReadScheduledPayment3 "}})]),t._v(" "),s("h4",{attrs:{id:"notes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#notes"}},[t._v("#")]),t._v(" Notes")]),t._v(" "),s("ul",[s("li",[t._v("The "),s("strong",[t._v("Creditor")]),t._v(" "),s("strong",[t._v("Account")]),t._v(" and "),s("strong",[t._v("CreditorAgent")]),t._v(" blocks replicate what is used consistently throughout the Account Information APIs to identify an account.")]),t._v(" "),s("li",[t._v("For the /accounts/{AccountId}/scheduled-payments endpoint, the "),s("strong",[t._v("Creditor")]),t._v(" "),s("strong",[t._v("Account")]),t._v(" and "),s("strong",[t._v("CreditorAgent")]),t._v(" blocks represent the account that is receiving funds (so has been named the CreditorAccount, for consistency with the PISP use case).")]),t._v(" "),s("li",[t._v("A DateTime element has been used so that there is consistency across all API endpoints using dates. Where time elements do not exist in ASPSP systems, the time portion of the DateTime element will be defaulted to 00:00:00+00:00.")]),t._v(" "),s("li",[t._v("The Amount elements all have embedded Currency elements for consistency is ISO 20022, and across the other API endpoints.")])]),t._v(" "),s("h3",{attrs:{id:"permission-codes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#permission-codes"}},[t._v("#")]),t._v(" Permission Codes")]),t._v(" "),s("p",[t._v("The resource differs depending on the permissions (ReadScheduledPaymentsBasic and ReadScheduledPaymentsDetail) used to access resource. In the event that the resource is accessed with both ReadScheduledPaymentsBasic and ReadScheduledPaymentsDetail, the most detailed level (ReadScheduledPaymentsDetail) must be used.")]),t._v(" "),s("ul",[s("li",[t._v("These objects "),s("strong",[t._v("must not")]),t._v(" be returned "),s("strong",[t._v("without")]),t._v(" the "),s("strong",[t._v("ReadScheduledPaymentsDetail")]),t._v(" permission:\n"),s("ul",[s("li",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent")]),t._v(" "),s("li",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount")])])]),t._v(" "),s("li",[t._v("If the "),s("strong",[t._v("ReadScheduledPaymentsDetail")]),t._v(" is granted by the PSU:\n"),s("ul",[s("li",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent "),s("strong",[t._v("may")]),t._v(" be returned if applicable to the account and ASPSP (0..1)")]),t._v(" "),s("li",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount "),s("strong",[t._v("must")]),t._v(" be returned (1..1)")])])])]),t._v(" "),s("p",[t._v("If the ReadPAN permission is granted by the PSU - the ASPSP may choose to populate the OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/Identification with the unmasked PAN (if the PAN is being populated in the response).")]),t._v(" "),s("h3",{attrs:{id:"data-dictionary"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-dictionary"}},[t._v("#")]),t._v(" Data Dictionary")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Occurrence")]),t._v(" "),s("th",[t._v("XPath")]),t._v(" "),s("th",[t._v("EnhancedDefinition")]),t._v(" "),s("th",[t._v("Class")]),t._v(" "),s("th",[t._v("Codes")]),t._v(" "),s("th",[t._v("Pattern")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("OBReadScheduledPayment3")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadScheduledPayment3")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadScheduledPayment3")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Data")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBReadDataScheduledPayment3")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("ScheduledPayment")]),t._v(" "),s("td",[t._v("0..n")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("OBScheduledPayment3")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("AccountId")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/AccountId")]),t._v(" "),s("td",[t._v("A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.")]),t._v(" "),s("td",[t._v("Max40Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("ScheduledPaymentId")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/ScheduledPaymentId")]),t._v(" "),s("td",[t._v("A unique and immutable identifier used to identify the scheduled payment resource. This identifier has no meaning to the account owner.")]),t._v(" "),s("td",[t._v("Max40Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("ScheduledPaymentDateTime")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/ScheduledPaymentDateTime")]),t._v(" "),s("td",[t._v("The date on which the scheduled payment will be made.")]),t._v(" "),s("td",[t._v("ISODateTime")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("ScheduledType")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/ScheduledType")]),t._v(" "),s("td",[t._v("Specifies the scheduled payment date type requested")]),t._v(" "),s("td",[t._v("OBExternalScheduleType1Code")]),t._v(" "),s("td",[t._v("Arrival Execution")]),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Reference")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/Reference")]),t._v(" "),s("td",[t._v("Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.")]),t._v(" "),s("td",[t._v("Max35Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("DebtorReference")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/DebtorReference")]),t._v(" "),s("td",[t._v("A reference value provided by the PSU to the PISP while setting up the scheduled payment.")]),t._v(" "),s("td",[t._v("Max35Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("InstructedAmount")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/InstructedAmount")]),t._v(" "),s("td",[t._v("Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.")]),t._v(" "),s("td",[t._v("OBActiveOrHistoricCurrencyAndAmount")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Amount")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/InstructedAmount/Amount")]),t._v(" "),s("td",[t._v("A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.")]),t._v(" "),s("td",[t._v("OBActiveCurrencyAndAmount_SimpleType")]),t._v(" "),s("td"),t._v(" "),s("td",[s("code",[t._v("^\\d{1,13}$\\|^\\d{1,13}\\.\\d{1,5}$")])])]),t._v(" "),s("tr",[s("td",[t._v("Currency")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/InstructedAmount/Currency")]),t._v(" "),s("td",[t._v('A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".')]),t._v(" "),s("td",[t._v("ActiveOrHistoricCurrencyCode")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("^[A-Z]{3,3}$")])]),t._v(" "),s("tr",[s("td",[t._v("CreditorAgent")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent")]),t._v(" "),s("td",[t._v("Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account. This is the servicer of the beneficiary account.")]),t._v(" "),s("td",[t._v("OBBranchAndFinancialInstitutionIdentification5")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("SchemeName")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent/SchemeName")]),t._v(" "),s("td",[t._v("Name of the identification scheme, in a coded form as published in an external list.")]),t._v(" "),s("td",[t._v("OBExternalFinancialInstitutionIdentification4Code")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Identification")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent/Identification")]),t._v(" "),s("td",[t._v("Unique and unambiguous identification of the servicing institution.")]),t._v(" "),s("td",[t._v("Max35Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("CreditorAccount")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount")]),t._v(" "),s("td",[t._v("Provides the details to identify the beneficiary account.")]),t._v(" "),s("td",[t._v("OBCashAccount5")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("SchemeName")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/SchemeName")]),t._v(" "),s("td",[t._v("Name of the identification scheme, in a coded form as published in an external list.")]),t._v(" "),s("td",[t._v("OBExternalAccountIdentification4Code")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Identification")]),t._v(" "),s("td",[t._v("1..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/Identification")]),t._v(" "),s("td",[t._v("Beneficiary account identification.")]),t._v(" "),s("td",[t._v("Max256Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("Name")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/Name")]),t._v(" "),s("td",[t._v("The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.")]),t._v(" "),s("td",[t._v("Max350Text")]),t._v(" "),s("td"),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("SecondaryIdentification")]),t._v(" "),s("td",[t._v("0..1")]),t._v(" "),s("td",[t._v("OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/SecondaryIdentification")]),t._v(" "),s("td",[t._v("This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).")]),t._v(" "),s("td",[t._v("Max34Text")]),t._v(" "),s("td"),t._v(" "),s("td")])])]),t._v(" "),s("h2",{attrs:{id:"usage-examples"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usage-examples"}},[t._v("#")]),t._v(" Usage Examples")]),t._v(" "),s("h3",{attrs:{id:"specific-account"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#specific-account"}},[t._v("#")]),t._v(" Specific Account")]),t._v(" "),s("h4",{attrs:{id:"get-account-specific-scheduled-payments-request"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#get-account-specific-scheduled-payments-request"}},[t._v("#")]),t._v(" Get Account Specific Scheduled Payments Request")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("GET /accounts/22289/scheduled-payments HTTP/1.1\nAuthorization: Bearer Az90SAOJklae\nx-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT\nx-fapi-customer-ip-address: 104.25.212.99\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nAccept: application/json\n")])])]),s("h4",{attrs:{id:"response-get-accounts-specific-scheduled-payments-response"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response-get-accounts-specific-scheduled-payments-response"}},[t._v("#")]),t._v(" Response: Get Accounts Specific Scheduled Payments Response")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("HTTP/1.1 200 OK\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\n")])])]),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledPayment"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledPaymentId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"SP03"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledPaymentDateTime"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2017-05-05T00:00:00+00:00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledType"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Execution"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"InstructedAmount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"10.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"CreditorAccount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"SchemeName"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"UK.OBIE.SortCodeAccountNumber"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Identification"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"23605490179017"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Mr Tee"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/scheduled-payments/"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TotalPages"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"bulk"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bulk"}},[t._v("#")]),t._v(" Bulk")]),t._v(" "),s("h4",{attrs:{id:"get-bulk-scheduled-payments-request"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#get-bulk-scheduled-payments-request"}},[t._v("#")]),t._v(" Get Bulk Scheduled Payments Request")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("GET /scheduled-payments HTTP/1.1\nAuthorization: Bearer Az90SAOJklae\nx-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT\nx-fapi-customer-ip-address: 104.25.212.99\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nAccept: application/json\n")])])]),s("h4",{attrs:{id:"get-bulk-scheduled-payments-response"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#get-bulk-scheduled-payments-response"}},[t._v("#")]),t._v(" Get Bulk Scheduled Payments Response")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("HTTP/1.1 200 OK\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\n")])])]),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledPayment"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledPaymentId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"SP03"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledPaymentDateTime"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2017-05-05T00:00:00+00:00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledType"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Execution"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"InstructedAmount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"10.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"CreditorAccount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"SchemeName"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"UK.OBIE.SortCodeAccountNumber"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Identification"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"23605490179017"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Mr Tee"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"39570"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledPaymentId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"SP77"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledPaymentDateTime"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2017-04-05T00:00:00+00:00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ScheduledType"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Execution"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"InstructedAmount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Amount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"12.00"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Currency"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GBP"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"CreditorAccount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"SchemeName"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"UK.OBIE.SortCodeAccountNumber"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Identification"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"23605490179017"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Mr Tee"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v3.1/aisp/scheduled-payments/"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TotalPages"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);