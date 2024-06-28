(window.webpackJsonp=window.webpackJsonp||[]).push([[443],{1388:function(e,t,r){e.exports=r.p+"assets/img/FilePaymentStatusv4-draft9.fa61f911.png"},2285:function(e,t,r){"use strict";r.r(t);var n=r(6),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"file-payments-api-profile-v4-0"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#file-payments-api-profile-v4-0"}},[e._v("#")]),e._v(" File Payments API Profile - v4.0 ")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#overview"}},[e._v("Overview")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#document-overview"}},[e._v("Document Overview")])])])]),e._v(" "),n("li",[n("a",{attrs:{href:"#basics"}},[e._v("Basics")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#overview-2"}},[e._v("Overview")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#steps"}},[e._v("Steps")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#sequence-diagram"}},[e._v("Sequence Diagram")])])])])])])]),e._v(" "),n("h2",{attrs:{id:"overview"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),n("p",[e._v("The File Payments API Profile describes the flows for File Payments, which allows a Payment Initiation Service Provider ('PISP') to:")]),e._v(" "),n("ul",[n("li",[e._v("Register an intent to "),n("strong",[e._v("stage")]),e._v(" a file-payment consent.")]),e._v(" "),n("li",[e._v("Subsequently "),n("strong",[e._v("submit")]),e._v(" the file-payment for processing.")]),e._v(" "),n("li",[e._v("Optionally retrieve the status of a file-payment "),n("strong",[e._v("consent")]),e._v(" or file-payment "),n("strong",[e._v("resource")]),e._v(".")])]),e._v(" "),n("p",[e._v("This profile should be read in conjunction with a compatible Read/Write Data API Profile, a compatible Payment Initiation API Profile and compatible individual resources.")]),e._v(" "),n("h3",{attrs:{id:"document-overview"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#document-overview"}},[e._v("#")]),e._v(" Document Overview")]),e._v(" "),n("p",[e._v("This document consists of the following parts:")]),e._v(" "),n("p",[n("strong",[e._v("Overview:")]),e._v(" Provides an overview of the profile.")]),e._v(" "),n("p",[n("strong",[e._v("Basics:")]),e._v(" Identifies the flows.")]),e._v(" "),n("h2",{attrs:{id:"basics"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#basics"}},[e._v("#")]),e._v(" Basics")]),e._v(" "),n("h3",{attrs:{id:"overview-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#overview-2"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),n("p",[e._v("File Payments allow a file of payments to be uploaded to an ASPSP for payment initiation.")]),e._v(" "),n("p",[e._v("The high-level flow for file-payments follow the flow for all other payment-order types (as described in the "),n("RouterLink",{attrs:{to:"/v4.0/profiles/payment-initiation-api-profile.html#overview-2"}},[e._v("Basics > Overview")]),e._v(" Section of Payment Initiation API Profile) however, with an additional step to upload the file. The step for staging the payment-order consent is broken into two steps:")],1),e._v(" "),n("ul",[n("li",[e._v("POST metadata of the file-payment for payment initiation.")]),e._v(" "),n("li",[e._v("POST the file of the file-payment for payment initiation.")])]),e._v(" "),n("h4",{attrs:{id:"steps"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#steps"}},[e._v("#")]),e._v(" Steps")]),e._v(" "),n("p",[e._v("Step 1: Agree File Payment-Order Initiation.")]),e._v(" "),n("p",[e._v("Step 2a: Setup File Payment-Order Consent (Metadata):")]),e._v(" "),n("ul",[n("li",[e._v("The PISP connects to the ASPSP that services the PSU's payment account and creates a new "),n("strong",[e._v("file-payment-consent")]),e._v(" resource. This JSON message contains the Metadata of the file payments file. The ASPSP responds with a ConsentId.")]),e._v(" "),n("li",[e._v("This step is carried out by making a "),n("strong",[e._v("POST")]),e._v(" request to the "),n("strong",[e._v("file-payment-consent")]),e._v(" resource.")])]),e._v(" "),n("p",[e._v("Step 2b: Setup File Payment-Order Consent (Upload File):")]),e._v(" "),n("ul",[n("li",[e._v("The PISP uploads the payment file to the "),n("strong",[e._v("file-payment-consent")]),e._v(" endpoint with ConsentId obtained in Step 2a.")]),e._v(" "),n("li",[e._v("ASPSP verifies the payment file against the hash of payment file received in the "),n("strong",[e._v("file-payment-consent")]),e._v(" Metadata in Step 2a.")]),e._v(" "),n("li",[e._v("ASPSP responds with 200 OK.")]),e._v(" "),n("li",[e._v("This step completes the "),n("strong",[e._v("file-payment-consent")]),e._v(" creation.")])]),e._v(" "),n("p",[e._v("Step 3: Authorise Consent.")]),e._v(" "),n("p",[e._v("Step 4: Create Payment-Order.")]),e._v(" "),n("p",[e._v("Step 5: Get Consent/Payment-Order/Payment-Details Status:")]),e._v(" "),n("ul",[n("li",[e._v("A PISP may optionally request the Status of the file-payment-consent.")]),e._v(" "),n("li",[e._v("A PISP may optionally request File uploaded to file-payment-consent, for verification.")]),e._v(" "),n("li",[e._v("A PISP may optionally request the Status of the file-payment.")]),e._v(" "),n("li",[e._v("A PISP may optionally request a report in a file format, on the status of the individual payments in file-payments, if the ASPSP makes this available.")]),e._v(" "),n("li",[e._v("A PISP may optionally request the detail status of the individual payments in file-payments, if the ASPSP makes this available.")])]),e._v(" "),n("h4",{attrs:{id:"sequence-diagram"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sequence-diagram"}},[e._v("#")]),e._v(" Sequence Diagram")]),e._v(" "),n("p",[n("img",{attrs:{src:r(1388),alt:"File Payment Initiation - High Level Flow"}})]),e._v(" "),n("details",[n("Summary",[e._v("Diagram source")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("participant PSU #lightyellow\nparticipant PISP #lightblue\nparticipant ASPSP Authorisation Server #lightcyan\nparticipant ASPSP Resource Server #lightcyan\n\nnote over PSU, ASPSP Resource Server #lightyellow:Step 1: Agree File Payment Initiation\n\nPSU -> PISP: Agree file-payment initiation request\n\nnote over PSU, ASPSP Resource Server #lightyellow:Setup Payment-Order Consent\n\nPISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA\nPISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant\nASPSP Authorisation Server -> PISP: access-token\nPISP <-> ASPSP Resource Server: Establish TLS 1.2 MA\nPISP -> ASPSP Resource Server: POST /file-payment-consents\n\nrbox over ASPSP Resource Server #lightgreen: Consent Status: AWUP \nASPSP Resource Server -> PISP: HTTP 201 (Created),  ConsentId\n\n\nnote over PSU, ASPSP Resource Server #lightyellow:Step 3: Authorize Consent\n\nalt Redirection (Using authorization code grant)\n        PISP -> PSU: HTTP 302 (Found), Redirect (ConsentId)\n        PSU -> ASPSP Authorisation Server: Follow redirect (ConsentId)\n        PSU <-> ASPSP Authorisation Server: authenticate\n        PSU <-> ASPSP Authorisation Server: SCA if required\n        PSU <-> ASPSP Authorisation Server: Select debtor account if required\n        rbox over ASPSP Resource Server #lightgreen: Consent Status: AUTH\n        ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (authorization-code)\n        PSU -> PISP: Follow redirect (authorization-code)\n        PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA\n        PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token\n        ASPSP Authorisation Server -> PISP: access-token\nelse Decoupled (Using CIBA)\n        PISP -> ASPSP Authorisation Server: POST /bc-authorize (login_hint_token)\n        ASPSP Authorisation Server -> PISP: OK\n\n        PSU -> ASPSP Authorisation Server: Authorise (Consent Id)\n        PSU <-> ASPSP Authorisation Server: authenticate\n        PSU <-> ASPSP Authorisation Server: SCA if required\n        PSU <-> ASPSP Authorisation Server: select accounts\n        rbox over ASPSP Resource Server #lightgreen: Consent Status: AUTH\n\n        alt Using callback\n                ASPSP Authorisation Server -> PISP: Callback (authorization-code)\n                PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA\n                PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token\n                ASPSP Authorisation Server -> PISP: access-token\n        else Using polling\n                PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA\n                PISP -> ASPSP Authorisation Server: Poll at /token using auth-req-id\n                ASPSP Authorisation Server -> PISP: access-token\n        end alt\nend alt\n\n\nnote over PSU, ASPSP Resource Server #lightyellow:Step 4: Confirm Funds (Domestic and International Single Immediate Payments Only)\n\nopt\nPISP <-> ASPSP Resource Server: Establish TLS 1.2 MA\nPISP -> ASPSP Resource Server: GET /payment-order-consents/{ConsentId}/funds-confirmation\nASPSP Resource Server -> PISP: HTTP 200 (OK) funds-confirmation resource\n\nend opt\n\nnote over PSU, ASPSP Resource Server #lightyellow:Step 5: Create Payment-Order\n\nPISP <-> ASPSP Resource Server: Establish TLS 1.2 MA\nPISP -> ASPSP Resource Server: POST /payment-orders\nrbox over ASPSP Resource Server #lightgreen: Consent Status: COND\nalt Immediate Payment\nrbox over ASPSP Resource Server #lightgreen: Payment Status: RCVD\nend alt\nASPSP Resource Server -> PISP: HTTP 201 (Created), Payment-Order Id\n\nnote over PSU, ASPSP Resource Server #lightyellow:Step 6: Get Payment-Order-Consent/Payment-Order/Payment-details Status\n\nopt payment-order-consent\nPISP <-> ASPSP Resource Server: Establish TLS 1.2 MA\nPISP -> ASPSP Resource Server: GET /payment-order-consents/{ConsentId}\nalt Immediate\nrbox over ASPSP Resource Server #lightgreen: Payment Status: AWAU\nrbox over ASPSP Resource Server #lightgreen: Payment Status: AUTH\nrbox over ASPSP Resource Server #lightgreen: Payment Status: RJCT\nend alt\nASPSP Resource Server -> PISP: HTTP 200 (OK) payment-order-consent resource\nend opt\n\nopt payment-order\nPISP <-> ASPSP Resource Server: Establish TLS 1.2 MA\nPISP -> ASPSP Resource Server: GET /payment-orders/{Payment-Order Id}\nalt Immediate\nrbox over ASPSP Resource Server #lightgreen: Payment Status: RCVD\nrbox over ASPSP Resource Server #orange: Payment Status: PDNG\nrbox over ASPSP Resource Server #orange: Payment Status: ACTC or PATC\nrbox over ASPSP Resource Server #orange: Payment Status: ACCP\nrbox over ASPSP Resource Server #orange: Payment Status: ACFC\nrbox over ASPSP Resource Server #lightgreen: Payment Status: ACSP\nrbox over ASPSP Resource Server #orange: Payment Status: ACWC\nrbox over ASPSP Resource Server #lightgreen: Payment Status: ACSC\nrbox over ASPSP Resource Server #orange: Payment Status: BLCK\nrbox over ASPSP Resource Server #lightgreen: Payment Status: ACWP\nrbox over ASPSP Resource Server #lightgreen: Payment Status: ACCC\nrbox over ASPSP Resource Server #lightgreen: Payment Status: RJCT\nend alt\nalt Additional for FDP and SO \nrbox over ASPSP Resource Server #orange: Payment Status: CANC\nend alt\nASPSP Resource Server -> PISP: HTTP 200 (OK) payment-order resource\nend opt\n\nopt payment-details\nPISP <-> ASPSP Resource Server: Establish TLS 1.2 MA\nPISP -> ASPSP Resource Server: GET /payment-orders/{Payment-Order Id}/payment-details\nalt Immediate\nrbox over ASPSP Resource Server #lightgreen: Payment Status: RCVD\nrbox over ASPSP Resource Server #orange: Payment Status: PDNG\nrbox over ASPSP Resource Server #orange: Payment Status: ACTC or PATC\nrbox over ASPSP Resource Server #orange: Payment Status: ACCP\nrbox over ASPSP Resource Server #orange: Payment Status: ACFC\nrbox over ASPSP Resource Server #lightgreen: Payment Status: ACSP\nrbox over ASPSP Resource Server #orange: Payment Status: ACWC\nrbox over ASPSP Resource Server #orange: Payment Status: ACSC\nrbox over ASPSP Resource Server #orange: Payment Status: BLCK\nrbox over ASPSP Resource Server #lightgreen: Payment Status: ACWP\nrbox over ASPSP Resource Server #lightgreen: Payment Status: ACCC\nrbox over ASPSP Resource Server #lightgreen: Payment Status: RJCT\nend alt\nalt Additional for FDP and SO \nrbox over ASPSP Resource Server #orange: Payment Status: CANC\nend alt\nASPSP Resource Server -> PISP: HTTP 200 (OK) payment-details resource\nend opt\n\n\n\n")])])])],1)])}),[],!1,null,null,null);t.default=o.exports}}]);