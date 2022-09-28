(window.webpackJsonp=window.webpackJsonp||[]).push([[518],{1441:function(t,e,a){"use strict";a.r(e);var s=a(6),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"file-payments-v3-1-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#file-payments-v3-1-2"}},[t._v("#")]),t._v(" File Payments - v3.1.2")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#overview"}},[t._v("Overview")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#endpoints"}},[t._v("Endpoints")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#get-file-paymentsfilepaymentid"}},[t._v("GET /file-payments/{FilePaymentId}")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#status"}},[t._v("Status")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#get-file-paymentsfilepaymentidreport-file"}},[t._v("GET /file-payments/{FilePaymentId}/report-file")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#get-file-paymentsfilepaymentidpayment-details"}},[t._v("GET /file-payments/{FilePaymentId}/payment-details")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#status-1"}},[t._v("Status")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#state-model"}},[t._v("State Model")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#payment-order"}},[t._v("Payment Order")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#multiple-authorisation"}},[t._v("Multiple Authorisation")])])])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#data-model"}},[t._v("Data Model")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#reused-classes"}},[t._v("Reused Classes")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#obfile2"}},[t._v("OBFile2")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#file-payment---request"}},[t._v("File Payment - Request")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#uml-diagram"}},[t._v("UML Diagram")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#notes"}},[t._v("Notes")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#data-dictionary"}},[t._v("Data Dictionary")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#file-payment---response"}},[t._v("File Payment - Response")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#uml-diagram-1"}},[t._v("UML Diagram")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#notes-1"}},[t._v("Notes")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#data-dictionary-1"}},[t._v("Data Dictionary")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#file-payment---payment-details---response"}},[t._v("File Payment - Payment Details - Response")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#uml-diagram-2"}},[t._v("UML Diagram")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#data-dictionary-2"}},[t._v("Data Dictionary")])])])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#usage-examples"}},[t._v("Usage Examples")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#post-file-payments"}},[t._v("POST /file-payments")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#request"}},[t._v("Request")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#response"}},[t._v("Response")])])])])])])]),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[t._v("The File Payment resource is used by a PISP to initiate a File Payment.")]),t._v(" "),a("p",[t._v("This resource description should be read in conjunction with a compatible Payment Initiation API Profile.")]),t._v(" "),a("h2",{attrs:{id:"endpoints"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#endpoints"}},[t._v("#")]),t._v(" Endpoints")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Resource")]),t._v(" "),a("th",[t._v("HTTP Operation")]),t._v(" "),a("th",[t._v("Endpoint")]),t._v(" "),a("th",[t._v("Mandatory ?")]),t._v(" "),a("th",[t._v("Scope")]),t._v(" "),a("th",[t._v("Grant Type")]),t._v(" "),a("th",[t._v("Message Signing")]),t._v(" "),a("th",[t._v("Idempotency Key")]),t._v(" "),a("th",[t._v("Request Object")]),t._v(" "),a("th",[t._v("Response Object")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("file-payments")]),t._v(" "),a("td",[t._v("POST")]),t._v(" "),a("td",[t._v("POST /file-payments")]),t._v(" "),a("td",[t._v("Conditional")]),t._v(" "),a("td",[t._v("payments")]),t._v(" "),a("td",[t._v("Authorization Code")]),t._v(" "),a("td",[t._v("Signed Request Signed Response")]),t._v(" "),a("td",[t._v("Yes")]),t._v(" "),a("td",[t._v("OBWriteFile2")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2")])]),t._v(" "),a("tr",[a("td",[t._v("file-payments")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[t._v("GET /file-payments/{FilePaymentId}")]),t._v(" "),a("td",[t._v("Mandatory (if resource POST implemented)")]),t._v(" "),a("td",[t._v("payments")]),t._v(" "),a("td",[t._v("Client Credentials")]),t._v(" "),a("td",[t._v("Signed Response")]),t._v(" "),a("td",[t._v("No")]),t._v(" "),a("td",[t._v("NA")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2")])]),t._v(" "),a("tr",[a("td",[t._v("file-payments")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[t._v("GET /file-payments/{FilePaymentId}/report-file")]),t._v(" "),a("td",[t._v("Conditional")]),t._v(" "),a("td",[t._v("payments")]),t._v(" "),a("td",[t._v("Client Credentials")]),t._v(" "),a("td",[t._v("Signed Response")]),t._v(" "),a("td",[t._v("No")]),t._v(" "),a("td",[t._v("NA")]),t._v(" "),a("td",[t._v("File")])]),t._v(" "),a("tr",[a("td",[t._v("payment-details")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[t._v("GET /file-payments/{FilePaymentId}/payment-details")]),t._v(" "),a("td",[t._v("Optional")]),t._v(" "),a("td",[t._v("payments")]),t._v(" "),a("td",[t._v("Client Credentials")]),t._v(" "),a("td",[t._v("Signed Response")]),t._v(" "),a("td",[t._v("No")]),t._v(" "),a("td",[t._v("NA")]),t._v(" "),a("td",[t._v("OBWritePaymentDetailsResponse1")])])])]),t._v(" "),a("h3",{attrs:{id:"get-file-payments-filepaymentid"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-file-payments-filepaymentid"}},[t._v("#")]),t._v(" GET /file-payments/{FilePaymentId}")]),t._v(" "),a("p",[t._v("A PISP can retrieve the file-payment to check its status.")]),t._v(" "),a("h4",{attrs:{id:"status"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[t._v("#")]),t._v(" Status")]),t._v(" "),a("p",[t._v("The file-payments resource must have one of the following Status codes:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Status")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("InitiationPending")])]),t._v(" "),a("tr",[a("td",[t._v("InitiationFailed")])]),t._v(" "),a("tr",[a("td",[t._v("InitiationCompleted")])])])]),t._v(" "),a("h3",{attrs:{id:"get-file-payments-filepaymentid-report-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-file-payments-filepaymentid-report-file"}},[t._v("#")]),t._v(" GET /file-payments/{FilePaymentId}/report-file")]),t._v(" "),a("p",[t._v("The API endpoint allows the PISP to download a payment report file from an ASPSP.")]),t._v(" "),a("ul",[a("li",[t._v("This endpoint enables ASPSP to return a report on the processing results of Payments in the file")]),t._v(" "),a("li",[t._v("The file is sent in the HTTP response body.")]),t._v(" "),a("li",[t._v("The file structure may match a payment execution report for the corresponding FileType in the file-payment-consent request.")]),t._v(" "),a("li",[t._v("HTTP headers (e.g. Content-Type) are used to describe the file.")])]),t._v(" "),a("h3",{attrs:{id:"get-file-payments-filepaymentid-payment-details"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-file-payments-filepaymentid-payment-details"}},[t._v("#")]),t._v(" GET /file-payments/{FilePaymentId}/payment-details")]),t._v(" "),a("p",[t._v("A PISP can retrieve the Details of the underlying payment transaction(s) via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.")]),t._v(" "),a("h4",{attrs:{id:"status-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status-2"}},[t._v("#")]),t._v(" Status")]),t._v(" "),a("p",[t._v("The file-payments - payment-details must have one of the following PaymentStatusCode code-set enumerations:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Status")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("Accepted")])]),t._v(" "),a("tr",[a("td",[t._v("AcceptedCancellationRequest")])]),t._v(" "),a("tr",[a("td",[t._v("AcceptedTechnicalValidation")])]),t._v(" "),a("tr",[a("td",[t._v("AcceptedCustomerProfile")])]),t._v(" "),a("tr",[a("td",[t._v("AcceptedFundsChecked")])]),t._v(" "),a("tr",[a("td",[t._v("AcceptedWithChange")])]),t._v(" "),a("tr",[a("td",[t._v("Pending")])]),t._v(" "),a("tr",[a("td",[t._v("Rejected")])]),t._v(" "),a("tr",[a("td",[t._v("AcceptedSettlementInProcess")])]),t._v(" "),a("tr",[a("td",[t._v("AcceptedSettlementCompleted")])]),t._v(" "),a("tr",[a("td",[t._v("AcceptedWithoutPosting")])]),t._v(" "),a("tr",[a("td",[t._v("AcceptedCreditSettlementCompleted")])]),t._v(" "),a("tr",[a("td",[t._v("Cancelled")])]),t._v(" "),a("tr",[a("td",[t._v("NoCancellationProcess")])]),t._v(" "),a("tr",[a("td",[t._v("PartiallyAcceptedCancellationRequest")])]),t._v(" "),a("tr",[a("td",[t._v("PartiallyAcceptedTechnicalCorrect")])]),t._v(" "),a("tr",[a("td",[t._v("PaymentCancelled")])]),t._v(" "),a("tr",[a("td",[t._v("PendingCancellationRequest")])]),t._v(" "),a("tr",[a("td",[t._v("Received")])]),t._v(" "),a("tr",[a("td",[t._v("RejectedCancellationRequest")])])])]),t._v(" "),a("h3",{attrs:{id:"state-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#state-model"}},[t._v("#")]),t._v(" State Model")]),t._v(" "),a("h4",{attrs:{id:"payment-order"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#payment-order"}},[t._v("#")]),t._v(" Payment Order")]),t._v(" "),a("p",[t._v("The state model for the file-payments resource describes the initiation status only. I.e., not the subsequent execution of the file-payments.")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/image2018-5-18_13-3-8.png",alt:" image2018-5-18_13-3-8.png "}})]),t._v(" "),a("p",[t._v("The definitions for the Status:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th"),t._v(" "),a("th",[t._v("Status")]),t._v(" "),a("th",[t._v("Payment Status Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("1")]),t._v(" "),a("td",[t._v("InitiationPending")]),t._v(" "),a("td",[t._v("The initiation of the payment order is pending.")])]),t._v(" "),a("tr",[a("td",[t._v("2")]),t._v(" "),a("td",[t._v("InitiationFailed")]),t._v(" "),a("td",[t._v("The initiation of the payment order has failed.")])]),t._v(" "),a("tr",[a("td",[t._v("3")]),t._v(" "),a("td",[t._v("InitiationCompleted")]),t._v(" "),a("td",[t._v("The initiation of the payment order is complete.")])])])]),t._v(" "),a("h4",{attrs:{id:"multiple-authorisation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#multiple-authorisation"}},[t._v("#")]),t._v(" Multiple Authorisation")]),t._v(" "),a("p",[t._v("If the payment-order requires multiple authorisations the Status of the multiple authorisations will be updated in the MultiAuthorisation object.")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/image2018-6-29_16-36-34.png",alt:" image2018-6-29_16-36-34.png "}})]),t._v(" "),a("p",[t._v("The definitions for the Status:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th"),t._v(" "),a("th",[t._v("Status")]),t._v(" "),a("th",[t._v("Status Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("1")]),t._v(" "),a("td",[t._v("AwaitingFurtherAuthorisation")]),t._v(" "),a("td",[t._v("The payment-order resource is awaiting further authorisation.")])]),t._v(" "),a("tr",[a("td",[t._v("2")]),t._v(" "),a("td",[t._v("Rejected")]),t._v(" "),a("td",[t._v("The payment-order resource has been rejected by an authoriser.")])]),t._v(" "),a("tr",[a("td",[t._v("3")]),t._v(" "),a("td",[t._v("Authorised")]),t._v(" "),a("td",[t._v("The payment-order resource has been successfully authorised by all required authorisers.")])])])]),t._v(" "),a("h2",{attrs:{id:"data-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-model"}},[t._v("#")]),t._v(" Data Model")]),t._v(" "),a("p",[t._v("The data dictionary section gives the detail on the payload content for the File Payment API flows.")]),t._v(" "),a("h3",{attrs:{id:"reused-classes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reused-classes"}},[t._v("#")]),t._v(" Reused Classes")]),t._v(" "),a("h4",{attrs:{id:"obfile2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#obfile2"}},[t._v("#")]),t._v(" OBFile2")]),t._v(" "),a("p",[t._v("The OBFile2 class is defined in the "),a("RouterLink",{attrs:{to:"/v3.1.3/resources-and-data-models/pisp/file-payment-consents.html#OBFile2"}},[t._v("file-payment-consents")]),t._v(" page.")],1),t._v(" "),a("h3",{attrs:{id:"file-payment-request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#file-payment-request"}},[t._v("#")]),t._v(" File Payment - Request")]),t._v(" "),a("p",[t._v("The OBWriteFile2 object will be used for a call to:")]),t._v(" "),a("ul",[a("li",[t._v("POST /file-payments")])]),t._v(" "),a("h4",{attrs:{id:"uml-diagram"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#uml-diagram"}},[t._v("#")]),t._v(" UML Diagram")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/OBWriteFile2.gif",alt:"OBWriteFile2"}})]),t._v(" "),a("h4",{attrs:{id:"notes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#notes"}},[t._v("#")]),t._v(" Notes")]),t._v(" "),a("p",[t._v("The file-payment "),a("strong",[t._v("request")]),t._v(" object contains the:")]),t._v(" "),a("ul",[a("li",[t._v("ConsentId.")]),t._v(" "),a("li",[t._v("The full Initiation object from the file-payment-consent request.")])]),t._v(" "),a("p",[t._v("The "),a("strong",[t._v("Initiation")]),t._v(" section of the file-payment request "),a("strong",[t._v("must")]),t._v(" match the "),a("strong",[t._v("Initiation")]),t._v(" section of the corresponding file-payment-consent request.")]),t._v(" "),a("h4",{attrs:{id:"data-dictionary"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-dictionary"}},[t._v("#")]),t._v(" Data Dictionary")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Occurrence")]),t._v(" "),a("th",[t._v("XPath")]),t._v(" "),a("th",[t._v("EnhancedDefinition")]),t._v(" "),a("th",[t._v("Class")]),t._v(" "),a("th",[t._v("Codes")]),t._v(" "),a("th",[t._v("Pattern")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("OBWriteFile2")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBWriteFile2")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBWriteFile2")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Data")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFile2/Data")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBWriteDataFile2")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("ConsentId")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFile2/Data/ConsentId")]),t._v(" "),a("td",[t._v("OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.")]),t._v(" "),a("td",[t._v("Max128Text")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Initiation")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFile2/Data/Initiation")]),t._v(" "),a("td",[t._v("The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file.")]),t._v(" "),a("td",[t._v("OBFile2")]),t._v(" "),a("td"),t._v(" "),a("td")])])]),t._v(" "),a("h3",{attrs:{id:"file-payment-response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#file-payment-response"}},[t._v("#")]),t._v(" File Payment - Response")]),t._v(" "),a("p",[t._v("The OBWriteFileResponse2 object will be used for a response to a call to:")]),t._v(" "),a("ul",[a("li",[t._v("POST /file-payments")]),t._v(" "),a("li",[t._v("GET /file-payments/{FilePaymentId}")])]),t._v(" "),a("h4",{attrs:{id:"uml-diagram-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#uml-diagram-2"}},[t._v("#")]),t._v(" UML Diagram")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/OBWriteFileResponse2.gif",alt:"OBWriteFileResponse2"}})]),t._v(" "),a("h4",{attrs:{id:"notes-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#notes-2"}},[t._v("#")]),t._v(" Notes")]),t._v(" "),a("p",[t._v("The file-payment "),a("strong",[t._v("response")]),t._v(" object contains the:")]),t._v(" "),a("ul",[a("li",[t._v("FilePaymentId.")]),t._v(" "),a("li",[t._v("ConsentId.")]),t._v(" "),a("li",[t._v("CreationDateTime the file-payment resource was created.")]),t._v(" "),a("li",[t._v("Status and StatusUpdateDateTime of the file-payment resource.")]),t._v(" "),a("li",[t._v("Charges array is used for the breakdown of applicable ASPSP charges.")]),t._v(" "),a("li",[t._v("The Initiation object from the file-payment-consent.")]),t._v(" "),a("li",[t._v("The MultiAuthorisation object if the file-payment resource requires multiple authorisations.")])]),t._v(" "),a("h4",{attrs:{id:"data-dictionary-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-dictionary-2"}},[t._v("#")]),t._v(" Data Dictionary")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Occurrence")]),t._v(" "),a("th",[t._v("XPath")]),t._v(" "),a("th",[t._v("EnhancedDefinition")]),t._v(" "),a("th",[t._v("Class")]),t._v(" "),a("th",[t._v("Codes")]),t._v(" "),a("th",[t._v("Pattern")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("OBWriteFileResponse2")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBWriteFileResponse2")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBWriteFileResponse2")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Data")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2/Data")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBWriteDataFileResponse2")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("FilePaymentId")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2/Data/FilePaymentId")]),t._v(" "),a("td",[t._v("OB: Unique identification as assigned by the ASPSP to uniquely identify the file payment resource.")]),t._v(" "),a("td",[t._v("Max40Text")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("ConsentId")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2/Data/ConsentId")]),t._v(" "),a("td",[t._v("OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.")]),t._v(" "),a("td",[t._v("Max128Text")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("CreationDateTime")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2/Data/CreationDateTime")]),t._v(" "),a("td",[t._v("Date and time at which the message was created.")]),t._v(" "),a("td",[t._v("ISODateTime")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Status")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2/Data/Status")]),t._v(" "),a("td",[t._v("Specifies the status of the payment order resource.")]),t._v(" "),a("td",[t._v("OBExternalStatus1Code")]),t._v(" "),a("td",[t._v("InitiationCompleted InitiationFailed InitiationPending")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("StatusUpdateDateTime")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2/Data/StatusUpdateDateTime")]),t._v(" "),a("td",[t._v("Date and time at which the resource status was updated.")]),t._v(" "),a("td",[t._v("ISODateTime")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Charges")]),t._v(" "),a("td",[t._v("0..n")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2/Data/Charges")]),t._v(" "),a("td",[t._v("Set of elements used to provide details of a charge for the payment initiation.")]),t._v(" "),a("td",[t._v("OBCharge2")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Initiation")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2/Data/Initiation")]),t._v(" "),a("td",[t._v("The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file.")]),t._v(" "),a("td",[t._v("OBFile2")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("MultiAuthorisation")]),t._v(" "),a("td",[t._v("0..1")]),t._v(" "),a("td",[t._v("OBWriteFileResponse2/Data/MultiAuthorisation")]),t._v(" "),a("td",[t._v("The multiple authorisation flow response from the ASPSP.")]),t._v(" "),a("td",[t._v("OBMultiAuthorisation1")]),t._v(" "),a("td"),t._v(" "),a("td")])])]),t._v(" "),a("h3",{attrs:{id:"file-payment-payment-details-response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#file-payment-payment-details-response"}},[t._v("#")]),t._v(" File Payment - Payment Details - Response")]),t._v(" "),a("p",[t._v("The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:")]),t._v(" "),a("ul",[a("li",[t._v("GET /file-payments/{FilePaymentId}/payment-details")])]),t._v(" "),a("h4",{attrs:{id:"uml-diagram-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#uml-diagram-3"}},[t._v("#")]),t._v(" UML Diagram")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/OBWritePaymentDetailsResponse1.png",alt:"OBWritePaymentDetailsResponse1"}})]),t._v(" "),a("h4",{attrs:{id:"data-dictionary-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-dictionary-3"}},[t._v("#")]),t._v(" Data Dictionary")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Occurrence")]),t._v(" "),a("th",[t._v("XPath")]),t._v(" "),a("th",[t._v("EnhancedDefinition")]),t._v(" "),a("th",[t._v("Class")]),t._v(" "),a("th",[t._v("Codes")]),t._v(" "),a("th",[t._v("Pattern")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("OBWritePaymentDetailsResponse1")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBWritePaymentDetailsResponse1")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBWritePaymentDetailsResponse1")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Data")]),t._v(" "),a("td",[t._v("1..1")]),t._v(" "),a("td",[t._v("OBWritePaymentDetailsResponse1/Data")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("OBWriteDataPaymentOrderStatusResponse1")]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("PaymentStatus")]),t._v(" "),a("td",[t._v("0..unbounded")]),t._v(" "),a("td",[t._v("OBWritePaymentDetailsResponse1/Data/PaymentStatus")]),t._v(" "),a("td",[t._v("Payment status details.")]),t._v(" "),a("td",[t._v("OBWritePaymentDetails1")]),t._v(" "),a("td"),t._v(" "),a("td")])])]),t._v(" "),a("h2",{attrs:{id:"usage-examples"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usage-examples"}},[t._v("#")]),t._v(" Usage Examples")]),t._v(" "),a("h3",{attrs:{id:"post-file-payments"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#post-file-payments"}},[t._v("#")]),t._v(" POST /file-payments")]),t._v(" "),a("h4",{attrs:{id:"request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#request"}},[t._v("#")]),t._v(" Request")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("POST /file-payments HTTP/1.1\nAuthorization: Bearer 2YotnFZFEjr1zCsicMWpAA\nx-idempotency-key: FRESCO.21302.GFX.20\nx-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==\nx-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 UTC\nx-fapi-customer-ip-address: 104.25.212.99\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\nAccept: application/json\n")])])]),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ConsentId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"512345"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Initiation"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FileType"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"UK.OBIE.pain.001.001.08"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FileHash"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"m5ah/h1UjLvJYMxqAoZmj9dKdjZnsGNm+yMkJp/KuqQ"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FileReference"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GB2OK238"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"NumberOfTransactions"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"100"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ControlSum"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3459.30")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[t._v("#")]),t._v(" Response")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("HTTP/1.1 201 Created\nx-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K\nx-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d\nContent-Type: application/json\n")])])]),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Data"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ConsentId"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"512345"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FilePaymentId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"FP1-512345"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Status"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"InitiationPending"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"CreationDateTime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2018-06-05T15:15:13+00:00"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"StatusUpdateDateTime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2018-06-05T15:15:13+00:00"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Initiation"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FileType"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"UK.OBIE.pain.001.001.08"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FileHash"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"m5ah/h1UjLvJYMxqAoZmj9dKdjZnsGNm+yMkJp/KuqQ"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"FileReference"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GB2OK238"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"NumberOfTransactions"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"100"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ControlSum"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3459.30")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Links"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Self"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.alphabank.com/open-banking/v4.0/pisp/file-payments/FP1-512345"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Meta"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);