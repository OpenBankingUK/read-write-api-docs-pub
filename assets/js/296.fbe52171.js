(window.webpackJsonp=window.webpackJsonp||[]).push([[296],{1473:function(t,a,e){"use strict";e.r(a);var r=e(6),s=Object(r.a)({},(function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"products-v3-1-11"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#products-v3-1-11"}},[t._v("#")]),t._v(" Products - v3.1.11 ")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#overview"}},[t._v("Overview")])]),t._v(" "),r("li",[r("a",{attrs:{href:"#endpoints"}},[t._v("Endpoints")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#get-accountsaccountidproduct"}},[t._v("GET /accounts/{AccountId}/product")])]),t._v(" "),r("li",[r("a",{attrs:{href:"#get-products"}},[t._v("GET /products")])])])]),t._v(" "),r("li",[r("a",{attrs:{href:"#data-model"}},[t._v("Data Model")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#resource-definition"}},[t._v("Resource Definition")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#notes"}},[t._v("Notes")])])])]),t._v(" "),r("li",[r("a",{attrs:{href:"#uml-diagram"}},[t._v("UML Diagram")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#notes-1"}},[t._v("Notes")])])])]),t._v(" "),r("li",[r("a",{attrs:{href:"#permission-codes"}},[t._v("Permission Codes")])]),t._v(" "),r("li",[r("a",{attrs:{href:"#data-dictionary"}},[t._v("Data Dictionary")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#common-payload"}},[t._v("Common Payload")])]),t._v(" "),r("li",[r("a",{attrs:{href:"#pca--bca-extensions"}},[t._v("PCA & BCA Extensions")])])])])])]),t._v(" "),r("li",[r("a",{attrs:{href:"#usage-examples"}},[t._v("Usage Examples")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#specific-account"}},[t._v("Specific Account")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#get-accounts-product-request"}},[t._v("Get Accounts Product Request")])]),t._v(" "),r("li",[r("a",{attrs:{href:"#get-accounts-product-response"}},[t._v("Get Accounts Product Response")])])])]),t._v(" "),r("li",[r("a",{attrs:{href:"#bulk"}},[t._v("Bulk")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#get-products-request"}},[t._v("Get Products Request")])]),t._v(" "),r("li",[r("a",{attrs:{href:"#get-products-response"}},[t._v("Get Products Response")])])])])])])]),t._v(" "),r("h2",{attrs:{id:"overview"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),r("p",[t._v("The product resource is used by an AISP to retrieve the account product information for a specific AccountId.")]),t._v(" "),r("p",[t._v("The products resource is used by an AISP to retrieve the products for all authorised accounts linked to a specific account-request.")]),t._v(" "),r("p",[t._v("This resource description should be read in conjunction with a compatible Account Information Services API Profile.")]),t._v(" "),r("h2",{attrs:{id:"endpoints"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#endpoints"}},[t._v("#")]),t._v(" Endpoints")]),t._v(" "),r("p",[t._v("Endpoints for the resource and available methods.")]),t._v(" "),r("table",[r("thead",[r("tr",[r("th"),t._v(" "),r("th",[t._v("Resource")]),t._v(" "),r("th",[t._v("HTTP Operation")]),t._v(" "),r("th",[t._v("Endpoint")]),t._v(" "),r("th",[t._v("Mandatory?")]),t._v(" "),r("th",[t._v("Scope")]),t._v(" "),r("th",[t._v("Grant Type")]),t._v(" "),r("th",[t._v("Idempotency Key")]),t._v(" "),r("th",[t._v("Parameters")]),t._v(" "),r("th",[t._v("Request Object")]),t._v(" "),r("th",[t._v("Response Object")])])]),t._v(" "),r("tbody",[r("tr",[r("td",[t._v("1")]),t._v(" "),r("td",[t._v("products")]),t._v(" "),r("td",[t._v("GET")]),t._v(" "),r("td",[t._v("GET /accounts/{AccountId}/product")]),t._v(" "),r("td",[t._v("Conditional")]),t._v(" "),r("td",[t._v("accounts")]),t._v(" "),r("td",[t._v("Authorization Code")]),t._v(" "),r("td",[t._v("No")]),t._v(" "),r("td"),t._v(" "),r("td"),t._v(" "),r("td",[t._v("OBReadProduct2")])]),t._v(" "),r("tr",[r("td",[t._v("2")]),t._v(" "),r("td",[t._v("products")]),t._v(" "),r("td",[t._v("GET")]),t._v(" "),r("td",[t._v("GET /products")]),t._v(" "),r("td",[t._v("Optional")]),t._v(" "),r("td",[t._v("accounts")]),t._v(" "),r("td",[t._v("Authorization Code")]),t._v(" "),r("td",[t._v("No")]),t._v(" "),r("td",[t._v("Pagination")]),t._v(" "),r("td"),t._v(" "),r("td",[t._v("OBReadProduct2")])])])]),t._v(" "),r("h3",{attrs:{id:"get-accounts-accountid-product"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#get-accounts-accountid-product"}},[t._v("#")]),t._v(" GET /accounts/{AccountId}/product")]),t._v(" "),r("p",[t._v("An AISP may retrieve the account product information for a specific AccountId (which is retrieved in the call to GET /accounts).\nWhile this endpoint is marked as Conditional, it will be Mandatory for ASPSPs and account types covered in the CMA Order.")]),t._v(" "),r("h3",{attrs:{id:"get-products"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#get-products"}},[t._v("#")]),t._v(" GET /products")]),t._v(" "),r("p",[t._v("If an ASPSP has implemented the bulk retrieval endpoints for products an AISP may optionally retrieve the products information in bulk.\nThis endpoint will retrieve the products resources for all authorised accounts linked to a specific account-request.")]),t._v(" "),r("h2",{attrs:{id:"data-model"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#data-model"}},[t._v("#")]),t._v(" Data Model")]),t._v(" "),r("p",[t._v("The OBReadProduct2 object will be used for the call to:")]),t._v(" "),r("ul",[r("li",[t._v("GET /accounts/{AccountId}/product")]),t._v(" "),r("li",[t._v("GET /products")])]),t._v(" "),r("h3",{attrs:{id:"resource-definition"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#resource-definition"}},[t._v("#")]),t._v(" Resource Definition")]),t._v(" "),r("p",[t._v("A resource that contains a set of elements that describes the product details specific to the account (AccountId) which will include any pricing, fees, interest rates and product features for the account.\nAn account (AccountId) must only have a single product.")]),t._v(" "),r("h4",{attrs:{id:"notes"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#notes"}},[t._v("#")]),t._v(" Notes")]),t._v(" "),r("ul",[r("li",[t._v("The product resource must be available for all PSD2 in scope accounts (if the product information is also available to the logged in PSU).")]),t._v(" "),r("li",[t._v("Detailed product information is only available for BCA and PCA products.")]),t._v(" "),r("li",[t._v("High level product information for other products (other than BCA and PCA products) may be available via a reference to the Open Data APIs.")])]),t._v(" "),r("h3",{attrs:{id:"uml-diagram"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#uml-diagram"}},[t._v("#")]),t._v(" UML Diagram")]),t._v(" "),r("p",[r("img",{attrs:{src:e(470),alt:" OBReadProduct2.png "}})]),t._v(" "),r("h4",{attrs:{id:"notes-2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#notes-2"}},[t._v("#")]),t._v(" Notes")]),t._v(" "),r("ul",[r("li",[t._v("All PSD2 in-scope accounts are expected to return a response to the product resource. However, the BCA and PCA objects only apply to current account products (which are a CMA Order requirement).")]),t._v(" "),r("li",[t._v("Product/ProductIdentifier and Product/SecondaryProductIdentifier are renamed to Product/ProductId and Product/SecondaryProductId respectively.")]),t._v(" "),r("li",[t._v("The APIs are split in to 2 broad groups based on respective security requirements:-\n"),r("ul",[r("li",[t._v("Open Data includes an API which provides "),r("strong",[t._v("Marketed")]),t._v(" PCA/BCA/Other Information.")]),t._v(" "),r("li",[t._v('Read-Write (aka "Closed Data") includes an API which provides '),r("strong",[t._v("Operated")]),t._v(" PCA/BCA/Other Information.")])])]),t._v(" "),r("li",[t._v("Open Data Product information covers:- Core Product, Eligibility, Credit Interest, Overdraft, Features & Benefits and Other Fees & Charges.")]),t._v(" "),r("li",[t._v("In July 2017, as part of Open Data-Account Information design workshop, it was agreed that the Products endpoint should contain a reference to Open Data AND subset of Open Data model (Decision "),r("a",{attrs:{href:"https://openbanking.atlassian.net/wiki/spaces/WOR/pages/3654377/039",target:"_blank",rel:"noopener noreferrer"}},[t._v("039"),r("OutboundLink")],1),t._v(" - option 4).")]),t._v(" "),r("li",[t._v("Approach to supplying product information via the Account and Transaction Information API for v2.x:\n"),r("ul",[r("li",[t._v('An optional "Open Data Product ID" link to the Open Data APIs should be retained, so that marketed product information is made available (where this is available). This could be more than "Front book" if a bank has decided to retain marketed product information for "Back book" products on the Open Data API.')]),t._v(" "),r("li",[t._v('In addition to the "Open Data Product ID" link, we should focus on fields that are provided by price comparison websites today. Although overdraft rates are typically marked as "Negotiable" on PCWs, we feel that it would be useful to provide information about the actual overdraft rate(s) that the account holder is on, even if this cannot easily be used for comparison with other products.')]),t._v(" "),r("li",[t._v('If there is a reference to "Open Data Product ID", then the TPP may lookup product features from Open Data. If any element/fields of the products endpoint are populated, then this should override the default in Open Data (Decision\n'),r("a",{attrs:{href:"https://openbanking.atlassian.net/wiki/spaces/WOR/pages/3654377/039",target:"_blank",rel:"noopener noreferrer"}},[t._v("039"),r("OutboundLink")],1),t._v(" & "),r("a",{attrs:{href:"https://openbanking.atlassian.net/wiki/spaces/WOR/pages/32376202/100",target:"_blank",rel:"noopener noreferrer"}},[t._v("100"),r("OutboundLink")],1),t._v(").")]),t._v(" "),r("li",[t._v('The "Open Data Product ID" should be populated by the ASPSP in the '),r("strong",[t._v("products")]),t._v(" resource if there is a corresponding entry in the Open Data APIs.")]),t._v(" "),r("li",[t._v("Information supplied in the Account and Transaction Information API v2.x product section must come from account operating platforms.")]),t._v(" "),r("li",[t._v("ProductType enumeration matches to types available in Open Data APIs, ASPSPs may choose to provide any additional product type by closing value=Other in ProductType, and providing a brief type details in OtherProductType data fields, and reference to their Open Data product. At this moment, we don't have detailed Product Info structure for product types other than PCA/BCA.")])])])]),t._v(" "),r("h3",{attrs:{id:"permission-codes"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#permission-codes"}},[t._v("#")]),t._v(" Permission Codes")]),t._v(" "),r("p",[t._v("The resource requires the ReadProducts permission. The resource response payload does not differ depending on the permissions granted.")]),t._v(" "),r("h3",{attrs:{id:"data-dictionary"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#data-dictionary"}},[t._v("#")]),t._v(" Data Dictionary")]),t._v(" "),r("h4",{attrs:{id:"common-payload"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#common-payload"}},[t._v("#")]),t._v(" Common Payload")]),t._v(" "),r("p",[t._v("Data Dictionary for Common Payload between PCA, BCA and other product types.")]),t._v(" "),r("table",[r("thead",[r("tr",[r("th",[t._v("Name")]),t._v(" "),r("th",[t._v("Occurrence")]),t._v(" "),r("th",[t._v("XPath")]),t._v(" "),r("th",[t._v("EnhancedDefinition")]),t._v(" "),r("th",[t._v("Class")]),t._v(" "),r("th",[t._v("Codes")]),t._v(" "),r("th",[t._v("Pattern")])])]),t._v(" "),r("tbody",[r("tr",[r("td",[t._v("OBReadProduct2")]),t._v(" "),r("td"),t._v(" "),r("td",[t._v("OBReadProduct2")]),t._v(" "),r("td"),t._v(" "),r("td",[t._v("OBReadProduct2")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("Data")]),t._v(" "),r("td",[t._v("1..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data")]),t._v(" "),r("td"),t._v(" "),r("td",[t._v("OBReadDataProduct2")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("Product")]),t._v(" "),r("td",[t._v("0..n")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product")]),t._v(" "),r("td"),t._v(" "),r("td",[t._v("OBProduct2")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("ProductName")]),t._v(" "),r("td",[t._v("0..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/ProductName")]),t._v(" "),r("td",[t._v("The name of the product used for marketing purposes from a customer perspective. I.e. what the customer would recognise.")]),t._v(" "),r("td",[t._v("Max350Text")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("ProductId")]),t._v(" "),r("td",[t._v("0..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/ProductId")]),t._v(" "),r("td",[t._v("Identifier within the parent organisation for the product. Must be unique in the organisation.")]),t._v(" "),r("td",[t._v("Max40Text")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("AccountId")]),t._v(" "),r("td",[t._v("1..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/AccountId")]),t._v(" "),r("td",[t._v("A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.")]),t._v(" "),r("td",[t._v("Max40Text")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("SecondaryProductId")]),t._v(" "),r("td",[t._v("0..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/SecondaryProductId")]),t._v(" "),r("td",[t._v("Identifier within the parent organisation for the product. Must be unique in the organisation.")]),t._v(" "),r("td",[t._v("Max70Text")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("ProductType")]),t._v(" "),r("td",[t._v("1..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/ProductType")]),t._v(" "),r("td",[t._v('Descriptive code for the product category. If ProductType - "Other" is chosen, the object OtherProductType must be populated with name, and description.')]),t._v(" "),r("td",[t._v("OBExternalProductType1Code")]),t._v(" "),r("td",[t._v("BusinessCurrentAccount CommercialCreditCard Other PersonalCurrentAccount SMELoan")]),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("MarketingStateId")]),t._v(" "),r("td",[t._v("0..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/MarketingStateId")]),t._v(" "),r("td",[t._v("Unique and unambiguous identification of a Product Marketing State.")]),t._v(" "),r("td",[t._v("Max35Text")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("OtherProductType")]),t._v(" "),r("td",[t._v("0..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/OtherProductType")]),t._v(" "),r("td",[t._v('This field provides extension to the ProductType enumeration. If ProductType - "Other" is chosen, this field must be populated with name, and description for ASPSP specific product type.')]),t._v(" "),r("td",[t._v("OBOtherProductType1")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("Name")]),t._v(" "),r("td",[t._v("1..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/OtherProductType/Name")]),t._v(" "),r("td",[t._v('Name of "Other" product type.')]),t._v(" "),r("td",[t._v("Max350Text")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("Description")]),t._v(" "),r("td",[t._v("1..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/OtherProductType/Description")]),t._v(" "),r("td",[t._v('Description of "Other" product type.')]),t._v(" "),r("td",[t._v("Max350Text")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("BCA")]),t._v(" "),r("td",[t._v("0..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/BCA")]),t._v(" "),r("td"),t._v(" "),r("td",[t._v("OBBCAData1")]),t._v(" "),r("td"),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td",[t._v("PCA")]),t._v(" "),r("td",[t._v("0..1")]),t._v(" "),r("td",[t._v("OBReadProduct2/Data/Product/PCA")]),t._v(" "),r("td"),t._v(" "),r("td",[t._v("OBPCAData1")]),t._v(" "),r("td"),t._v(" "),r("td")])])]),t._v(" "),r("h4",{attrs:{id:"pca-bca-extensions"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#pca-bca-extensions"}},[t._v("#")]),t._v(" PCA & BCA Extensions")]),t._v(" "),r("p",[t._v("[BCA Product Data Model v3.1.2](./BCA Product Data Model.md)")]),t._v(" "),r("p",[t._v("[PCA Product Data Model v3.1.2](./PCA Product Data Model.md)")]),t._v(" "),r("p",[t._v("[Other Product Data Model v3.1.2](./Other Product Data Model.md)")]),t._v(" "),r("h2",{attrs:{id:"usage-examples"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#usage-examples"}},[t._v("#")]),t._v(" Usage Examples")]),t._v(" "),r("p",[t._v("Detailed usage examples for PCA, and BCA can be found in theMessage Implementation Guide section of PCA and BCA sub pages.")]),t._v(" "),r("h3",{attrs:{id:"specific-account"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#specific-account"}},[t._v("#")]),t._v(" Specific Account")]),t._v(" "),r("h4",{attrs:{id:"get-accounts-product-request"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#get-accounts-product-request"}},[t._v("#")]),t._v(" Get Accounts Product Request")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("GET /accounts/22289/product HTTP/1.1\nAuthorization: Bearer Az90SAOJklae\nx-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT\nx-fapi-customer-ip-address: 104.25.212.99\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nAccept: application/json\n")])])]),r("h4",{attrs:{id:"get-accounts-product-response"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#get-accounts-product-response"}},[t._v("#")]),t._v(" Get Accounts Product Response")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("HTTP/1.1 200 OK\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\n")])])]),r("div",{staticClass:"language-json extra-class"},[r("pre",{pre:!0,attrs:{class:"language-json"}},[r("code",[r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Product"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProductId"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"51B"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProductType"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"PersonalCurrentAccount"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProductName"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"321 Product"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"PCA"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         ....\n\t\t    "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t    "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/product"')]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TotalPages"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),r("h3",{attrs:{id:"bulk"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#bulk"}},[t._v("#")]),t._v(" Bulk")]),t._v(" "),r("h4",{attrs:{id:"get-products-request"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#get-products-request"}},[t._v("#")]),t._v(" Get Products Request")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("GET /products HTTP/1.1\nAuthorization: Bearer Az90SAOJklae\nx-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT\nx-fapi-customer-ip-address: 104.25.212.99\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nAccept: application/json\n")])])]),r("h4",{attrs:{id:"get-products-response"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#get-products-response"}},[t._v("#")]),t._v(" Get Products Response")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("HTTP/1.1 200 OK\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\n")])])]),r("div",{staticClass:"language-json extra-class"},[r("pre",{pre:!0,attrs:{class:"language-json"}},[r("code",[r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Product"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22289"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProductId"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"51B"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProductType"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"PersonalCurrentAccount"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProductName"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"321 Product"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"PCA"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" .. "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"AccountId"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"31820"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProductId"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"001"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProductType"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"BusinessCurrentAccount"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProductName"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"123 Product"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"BCA"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" .. "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v3.1/aisp/products/"')]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TotalPages"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=s.exports},470:function(t,a,e){t.exports=e.p+"assets/img/OBReadProduct2.e3e5fc0d.png"}}]);