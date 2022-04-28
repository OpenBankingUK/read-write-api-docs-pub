(window.webpackJsonp=window.webpackJsonp||[]).push([[343],{1089:function(e,t,n){e.exports=n.p+"assets/img/FilePaymentStatusv4-draft7.4513fe82.png"},1836:function(e,t,n){"use strict";n.r(t);var a=n(6),i=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"file-payments-api-profile-v3-1-9"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#file-payments-api-profile-v3-1-9"}},[e._v("#")]),e._v(" File Payments API Profile - v3.1.9 ")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#overview"}},[e._v("Overview")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#document-overview"}},[e._v("Document Overview")])])])]),e._v(" "),a("li",[a("a",{attrs:{href:"#basics"}},[e._v("Basics")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#overview-1"}},[e._v("Overview")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#steps"}},[e._v("Steps")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#sequence-diagram"}},[e._v("Sequence Diagram")])])])])])])]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("The File Payments API Profile describes the flows for File Payments, which allows a Payment Initiation Service Provider ('PISP') to:")]),e._v(" "),a("ul",[a("li",[e._v("Register an intent to "),a("strong",[e._v("stage")]),e._v(" a file-payment consent.")]),e._v(" "),a("li",[e._v("Subsequently "),a("strong",[e._v("submit")]),e._v(" the file-payment for processing.")]),e._v(" "),a("li",[e._v("Optionally retrieve the status of a file-payment "),a("strong",[e._v("consent")]),e._v(" or file-payment "),a("strong",[e._v("resource")]),e._v(".")])]),e._v(" "),a("p",[e._v("This profile should be read in conjunction with a compatible Read/Write Data API Profile, a compatible Payment Initiation API Profile and compatible individual resources.")]),e._v(" "),a("h3",{attrs:{id:"document-overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#document-overview"}},[e._v("#")]),e._v(" Document Overview")]),e._v(" "),a("p",[e._v("This document consists of the following parts:")]),e._v(" "),a("p",[a("strong",[e._v("Overview:")]),e._v(" Provides an overview of the profile.")]),e._v(" "),a("p",[a("strong",[e._v("Basics:")]),e._v(" Identifies the flows.")]),e._v(" "),a("h2",{attrs:{id:"basics"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#basics"}},[e._v("#")]),e._v(" Basics")]),e._v(" "),a("h3",{attrs:{id:"overview-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview-2"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("File Payments allow a file of payments to be uploaded to an ASPSP for payment initiation.")]),e._v(" "),a("p",[e._v("The high-level flow for file-payments follow the flow for all other payment-order types (as described in the "),a("RouterLink",{attrs:{to:"/v3.1.9/profiles/payment-initiation-api-profile.html#overview-1"}},[e._v("Basics > Overview")]),e._v(" Section of Payment Initiation API Profile) however, with an additional step to upload the file. The step for staging the payment-order consent is broken into two steps:")],1),e._v(" "),a("ul",[a("li",[e._v("POST metadata of the file-payment for payment initiation.")]),e._v(" "),a("li",[e._v("POST the file of the file-payment for payment initiation.")])]),e._v(" "),a("h4",{attrs:{id:"steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#steps"}},[e._v("#")]),e._v(" Steps")]),e._v(" "),a("p",[e._v("Step 1: Agree File Payment-Order Initiation.")]),e._v(" "),a("p",[e._v("Step 2a: Setup File Payment-Order Consent (Metadata):")]),e._v(" "),a("ul",[a("li",[e._v("The PISP connects to the ASPSP that services the PSU's payment account and creates a new "),a("strong",[e._v("file-payment-consent")]),e._v(" resource. This JSON message contains the Metadata of the file payments file. The ASPSP responds with a ConsentId.")]),e._v(" "),a("li",[e._v("This step is carried out by making a "),a("strong",[e._v("POST")]),e._v(" request to the "),a("strong",[e._v("file-payment-consent")]),e._v(" resource.")])]),e._v(" "),a("p",[e._v("Step 2b: Setup File Payment-Order Consent (Upload File):")]),e._v(" "),a("ul",[a("li",[e._v("The PISP uploads the payment file to the "),a("strong",[e._v("file-payment-consent")]),e._v(" endpoint with ConsentId obtained in Step 2a.")]),e._v(" "),a("li",[e._v("ASPSP verifies the payment file against the hash of payment file received in the "),a("strong",[e._v("file-payment-consent")]),e._v(" Metadata in Step 2a.")]),e._v(" "),a("li",[e._v("ASPSP responds with 200 OK.")]),e._v(" "),a("li",[e._v("This step completes the "),a("strong",[e._v("file-payment-consent")]),e._v(" creation.")])]),e._v(" "),a("p",[e._v("Step 3: Authorise Consent.")]),e._v(" "),a("p",[e._v("Step 4: Create Payment-Order.")]),e._v(" "),a("p",[e._v("Step 5: Get Consent/Payment-Order/Payment-Details Status:")]),e._v(" "),a("ul",[a("li",[e._v("A PISP may optionally request the Status of the file-payment-consent.")]),e._v(" "),a("li",[e._v("A PISP may optionally request File uploaded to file-payment-consent, for verification.")]),e._v(" "),a("li",[e._v("A PISP may optionally request the Status of the file-payment.")]),e._v(" "),a("li",[e._v("A PISP may optionally request a report in a file format, on the status of the individual payments in file-payments, if the ASPSP makes this available.")]),e._v(" "),a("li",[e._v("A PISP may optionally request the detail status of the individual payments in file-payments, if the ASPSP makes this available.")])]),e._v(" "),a("h4",{attrs:{id:"sequence-diagram"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sequence-diagram"}},[e._v("#")]),e._v(" Sequence Diagram")]),e._v(" "),a("p",[a("img",{attrs:{src:n(1089),alt:"File Payment Initiation - High Level Flow"}})]),e._v(" "),a("details",[a("Summary",[e._v("Diagram source")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("participant PSU\nparticipant PISP\nparticipant ASPSP Authorisation Server\nparticipant ASPSP Resource Server\n\nnote over PSU, ASPSP Resource Server\nStep 1: Agree File Payment-Order Initiation\nend note\n\nnote over PSU, ASPSP Resource Server\nStep 2: Setup Agree File Payment-Order Consent\nend note\nPISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant\nASPSP Authorisation Server -> PISP: access-token\nnote right of PISP\n   Step 2a: Setup File Payment-Order Consent (Metadata, including Hash)\nend note\nPISP -> ASPSP Resource Server: POST /file-payment-consents\nstate over ASPSP Resource Server: Consent Status: AwaitingUpload\nASPSP Resource Server -> PISP: HTTP 201 (Created),  ConsentId\nnote right of PISP\n   Step 2b: Upload File using Consent Id\nend note\nPISP -> ASPSP Resource Server: POST /file-payment-consents/{ConsentId}/file\nstate over ASPSP Resource Server: Consent Status: AwaitingAuthorisation\nASPSP Resource Server -> PISP: HTTP 200 (OK)\nPISP -> PSU: HTTP 302 (Found), Redirect (ConsentId)\n\nnote over PSU, ASPSP Resource Server\nStep 3: Authorize File Payment-Order Consent\nend note\nnote over PSU, ASPSP Resource Server\nStep 4: Create File Payment-Order\nend note\n\nnote over PSU, ASPSP Resource Server\nStep 5: Get File Payment Consent Status/ Payment File/ File Payment Status/ Payment Report File/ File Payment-Payment Details Status\nend note\n\nopt File Payment consent\nPISP -> ASPSP Resource Server: GET /file-payment-consents/{ConsentId}\nASPSP Resource Server -> PISP: HTTP 200 (OK) file-payment-consent resource\nend opt\n\nopt File uloaded with File Payment consent\nPISP -> ASPSP Resource Server: GET file-payment-consents/{ConsentId}/file\nASPSP Resource Server -> PISP: HTTP 200 (OK) file resource\nend opt\n\nopt File Payment status\nPISP -> ASPSP Resource Server: GET /file-payments/{FilePaymentId}\nASPSP Resource Server -> PISP: HTTP 200 (OK) file-payment resource\nend opt\n\nopt File Payment report file\nPISP -> ASPSP Resource Server: GET /file-payments/{FilePaymentId}/report-file\nASPSP Resource Server -> PISP: HTTP 200 (OK) file resource\nend opt\n\nopt Payment Status File Payment\nPISP -> ASPSP Resource Server: GET /file-payments/{FilePaymentId}/payment-details\nASPSP Resource Server -> PISP: HTTP 200 (OK) file resource\nend opt\n\noption footer=bar\n")])])])],1)])}),[],!1,null,null,null);t.default=i.exports}}]);