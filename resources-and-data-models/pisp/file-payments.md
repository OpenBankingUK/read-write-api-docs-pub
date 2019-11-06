# File Payments - v3.1.2

1. [Overview](#overview)
2. [Endpoints](#endpoints)
   1. [GET /file-payments/{FilePaymentId}](#get-file-paymentsfilepaymentid)
      1. [Status](#status)
   2. [GET /file-payments/{FilePaymentId}/report-file](#get-file-paymentsfilepaymentidreport-file)
   3. [GET /file-payments/{FilePaymentId}/payment-details](#get-file-paymentsfilepaymentidpayment-details)
      1. [Status](#status-1)
   4. [State Model](#state-model)
      1. [Payment Order](#payment-order)
      2. [Multiple Authorisation](#multiple-authorisation)
3. [Data Model](#data-model)
   1. [Reused Classes](#reused-classes)
      1. [OBFile2](#obfile2)
   2. [File Payment - Request](#file-payment---request)
      1. [UML Diagram](#uml-diagram)
      2. [Notes](#notes)
      3. [Data Dictionary](#data-dictionary)
   3. [File Payment - Response](#file-payment---response)
      1. [UML Diagram](#uml-diagram-1)
      2. [Notes](#notes-1)
      3. [Data Dictionary](#data-dictionary-1)
   4. [File Payment - Payment Details - Response](#file-payment---payment-details---response)
      1. [UML Diagram](#uml-diagram-2)
      2. [Data Dictionary](#data-dictionary-2)
4. [Usage Examples](#usage-examples)
   1. [POST /file-payments](#post-file-payments)
      1. [Request](#request)
      2. [Response](#response)

## Overview

The File Payment resource is used by a PISP to initiate a File Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| file-payments |POST |POST /file-payments |Conditional |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteFile2 |OBWriteFileResponse2 |
| file-payments |GET |GET /file-payments/{FilePaymentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteFileResponse2 |
| file-payments |GET |GET /file-payments/{FilePaymentId}/report-file |Conditional |payments |Client Credentials |Signed Response |No |NA |File |
| payment-details |GET |GET /file-payments/{FilePaymentId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

### GET /file-payments/{FilePaymentId}

A PISP can retrieve the file-payment to check its status.

#### Status

The file-payments resource must have one of the following Status codes:

| Status |
| --- |
| InitiationPending |
| InitiationFailed |
| InitiationCompleted |


### GET /file-payments/{FilePaymentId}/report-file

The API endpoint allows the PISP to download a payment report file from an ASPSP.

* This endpoint enables ASPSP to return a report on the processing results of Payments in the file
* The file is sent in the HTTP response body.
* The file structure may match a payment execution report for the corresponding FileType in the file-payment-consent request.
* HTTP headers (e.g. Content-Type) are used to describe the file.

### GET /file-payments/{FilePaymentId}/payment-details

A PISP can retrieve the Details of the underlying payment transaction(s) via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

#### Status

The file-payments - payment-details must have one of the following PaymentStatusCode code-set enumerations:

| Status |
| --- |
| Accepted |
| AcceptedCancellationRequest |
| AcceptedTechnicalValidation |
| AcceptedCustomerProfile |
| AcceptedFundsChecked |
| AcceptedWithChange |
| Pending |
| Rejected |
| AcceptedSettlementInProcess |
| AcceptedSettlementCompleted |
| AcceptedWithoutPosting |
| AcceptedCreditSettlementCompleted |
| Cancelled |
| NoCancellationProcess |
| PartiallyAcceptedCancellationRequest |
| PartiallyAcceptedTechnicalCorrect |
| PaymentCancelled |
| PendingCancellationRequest |
| Received |
| RejectedCancellationRequest |

### State Model

#### Payment Order

The state model for the file-payments resource describes the initiation status only. I.e., not the subsequent execution of the file-payments.

![ image2018-5-18_13-3-8.png ]( images/image2018-5-18_13-3-8.png )

The definitions for the Status:

|  |Status |Payment Status Description |
| --- |--- |--- |
| 1 |InitiationPending |The initiation of the payment order is pending. |
| 2 |InitiationFailed |The initiation of the payment order has failed. |
| 3 |InitiationCompleted |The initiation of the payment order is complete. |

#### Multiple Authorisation

If the payment-order requires multiple authorisations the Status of the multiple authorisations will be updated in the MultiAuthorisation object.

![ image2018-6-29_16-36-34.png ]( images/image2018-6-29_16-36-34.png )

The definitions for the Status:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AwaitingFurtherAuthorisation |The payment-order resource is awaiting further authorisation. |
| 2 |Rejected |The payment-order resource has been rejected by an authoriser. |
| 3 |Authorised |The payment-order resource has been successfully authorised by all required authorisers. |

## Data Model

The data dictionary section gives the detail on the payload content for the File Payment API flows.

### Reused Classes

#### OBFile2

The OBFile2 class is defined in the [file-payment-consents](./file-payment-consents.md#OBFile2) page.

### File Payment - Request

The OBWriteFile2 object will be used for a call to:

* POST /file-payments

#### UML Diagram

![OBWriteFile2]( images/OBWriteFile2.gif )

#### Notes 

The file-payment **request** object contains the: 

* ConsentId.
* The full Initiation object from the file-payment-consent request.

The **Initiation** section of the file-payment request **must** match the **Initiation** section of the corresponding file-payment-consent request.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteFile2 | |OBWriteFile2 | |OBWriteFile2 | | |
| Data |1..1 |OBWriteFile2/Data | |OBWriteDataFile2 | | |
| ConsentId |1..1 |OBWriteFile2/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteFile2/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file. |OBFile2 | | |

### File Payment - Response

The OBWriteFileResponse2 object will be used for a response to a call to:

* POST /file-payments
* GET /file-payments/{FilePaymentId}

#### UML Diagram

![OBWriteFileResponse2]( images/OBWriteFileResponse2.gif )

#### Notes 

The file-payment **response** object contains the: 

* FilePaymentId.
* ConsentId.
* CreationDateTime the file-payment resource was created.
* Status and StatusUpdateDateTime of the file-payment resource.
* Charges array is used for the breakdown of applicable ASPSP charges.
* The Initiation object from the file-payment-consent.
* The MultiAuthorisation object if the file-payment resource requires multiple authorisations.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteFileResponse2 | |OBWriteFileResponse2 | |OBWriteFileResponse2 | | |
| Data |1..1 |OBWriteFileResponse2/Data | |OBWriteDataFileResponse2 | | |
| FilePaymentId |1..1 |OBWriteFileResponse2/Data/FilePaymentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the file payment resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteFileResponse2/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteFileResponse2/Data/CreationDateTime |Date and time at which the message was created. |ISODateTime | | |
| Status |1..1 |OBWriteFileResponse2/Data/Status |Specifies the status of the payment order resource. |OBExternalStatus1Code |InitiationCompleted InitiationFailed InitiationPending | |
| StatusUpdateDateTime |1..1 |OBWriteFileResponse2/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| Charges |0..n |OBWriteFileResponse2/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteFileResponse2/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file. |OBFile2 | | |
| MultiAuthorisation |0..1 |OBWriteFileResponse2/Data/MultiAuthorisation |The multiple authorisation flow response from the ASPSP. |OBMultiAuthorisation1 | | |

### File Payment - Payment Details - Response

The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:

* GET /file-payments/{FilePaymentId}/payment-details

#### UML Diagram

![OBWritePaymentDetailsResponse1]( images/OBWritePaymentDetailsResponse1.png )

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| PaymentStatus |0..unbounded |OBWritePaymentDetailsResponse1/Data/PaymentStatus |Payment status details. |OBWritePaymentDetails1 | | |

## Usage Examples

### POST /file-payments

#### Request

```
POST /file-payments HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 UTC
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "ConsentId":"512345",
    "Initiation": {
      "FileType": "UK.OBIE.pain.001.001.08",
      "FileHash": "m5ah/h1UjLvJYMxqAoZmj9dKdjZnsGNm+yMkJp/KuqQ",
      "FileReference": "GB2OK238",
      "NumberOfTransactions": "100",
      "ControlSum": 3459.30
    }
  }
}
```

#### Response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId" : "512345",
	"FilePaymentId":"FP1-512345",
    "Status": "InitiationPending",
    "CreationDateTime": "2018-06-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2018-06-05T15:15:13+00:00",
    "Initiation": {
      "FileType": "UK.OBIE.pain.001.001.08",
      "FileHash": "m5ah/h1UjLvJYMxqAoZmj9dKdjZnsGNm+yMkJp/KuqQ",
      "FileReference": "GB2OK238",
      "NumberOfTransactions": "100",
      "ControlSum": 3459.30
    }
  },
  "Links":{
     "Self":"https://api.alphabank.com/open-banking/v4.0/pisp/file-payments/FP1-512345"
  },
  "Meta":{}
}
```