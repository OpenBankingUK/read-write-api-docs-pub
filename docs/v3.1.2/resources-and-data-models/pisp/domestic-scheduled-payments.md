# Domestic Scheduled Payments  - v3.1.2

1. [Overview](#overview)
2. [Endpoints](#endpoints)
   1. [POST /domestic-scheduled-payments](#post-domestic-scheduled-payments)
      1. [Status](#status)
   2. [GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}](#get-domestic-scheduled-paymentsdomesticscheduledpaymentid)
      1. [Status](#status-1)
   3. [GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details](#get-domestic-scheduled-paymentsdomesticscheduledpaymentidpayment-details)
      1. [Status](#status-2)
   4. [State Model](#state-model)
      1. [Payment Order](#payment-order)
         1. [Multiple Authorisation](#multiple-authorisation)
3. [Data Model](#data-model)
   1. [Reused Classes](#reused-classes)
      1. [OBDomesticScheduled2](#obdomesticscheduled2)
   2. [Domestic Scheduled Payment - Request](#domestic-scheduled-payment---request)
      1. [UML Diagram](#uml-diagram)
      2. [Notes](#notes)
      3. [Data Dictionary](#data-dictionary)
   3. [Domestic Scheduled Payment - Response](#domestic-scheduled-payment---response)
      1. [UML Diagram](#uml-diagram-1)
      2. [Notes](#notes-1)
      3. [Data Dictionary](#data-dictionary-1)
   4. [Domestic Schedule Payment Order - Payment Details - Response](#domestic-schedule-payment-order---payment-details---response)
      1. [UML Diagram](#uml-diagram-2)
      2. [Data Dictionary](#data-dictionary-2)
4. [Usage Examples](#usage-examples)
      1. [Create a Domestic Scheduled Payment](#create-a-domestic-scheduled-payment)
         1. [POST /domestic-scheduled-payments Request](#post-domestic-scheduled-payments-request)
         2. [POST /domestic-scheduled-payments Response](#post-domestic-scheduled-payments-response)

## Overview

The Domestic Scheduled Payments resource is used by a PISP to initiate a Domestic Scheduled Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-scheduled-payments |POST |POST /domestic-scheduled-payments |Conditional |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteDomesticScheduled2 |OBWriteDomesticScheduledResponse3 |
| domestic-scheduled-payments |GET |GET /domestic-scheduled-payments/{DomesticScheduledPaymentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticScheduledResponse3 |
| payment-details |GET |GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

### POST /domestic-scheduled-payments

Once the domestic-scheduled-payment-consent has been authorised by the PSU, the PISP can proceed to submitting the domestic-scheduled-payment for processing:

* This is done by making a POST request to the **domestic-scheduled-payments** endpoint.
* This request is an instruction to the ASPSP to begin the domestic scheduled payment journey. The PISP must submit the domestic scheduled payment immediately, however, there are some scenarios where the ASPSP may not warehouse the domestic scheduled payment immediately (e.g., busy periods at the ASPSP)
* The PISP **must** ensure that the Initiation and Risk sections of the domestic-scheduled-payment match the corresponding Initiation and Risk sections of the domestic-scheduled-payment-consent resource. If the two do not match, the ASPSP **must not** process the request and **must** respond with a 400 (Bad Request).
* Any operations on the domestic-scheduled-payment resource will not result in a Status change for the domestic-scheduled-payment resource.

#### Status

A domestic-scheduled-payment can only be created if its corresponding domestic-scheduled-payment-consent resource has the status of "Authorised". 

The domestic-scheduled-payment resource that is created successfully must have one of the following Status codes:

| Status |
| ------ |
| InitiationPending |
| InitiationFailed |
| InitiationCompleted |

### GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}

A PISP can retrieve the domestic-scheduled-payment to check its status.

#### Status

The domestic-scheduled-payment resource must have one of the following Status codes:

| Status |
| ------ |
| InitiationPending |
| InitiationFailed |
| InitiationCompleted |
| Cancelled |

### GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details

A PISP can retrieve the Details of the underlying payment transaction via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

#### Status

The domestic-scheduled-payments - payment-details must have one of the following PaymentStatusCode code-set enumerations:

| Status |
| ------ |
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

The state model for the domestic-scheduled-payment resource describes the initiation status only. I.e., not the subsequent execution of the domestic-scheduled-payment.

![Payment Order](images/DomesticScheduledStatusModel.png)

The definitions for the Status:

|  |Status |Payment Status Description |
| --- |------ |-------------------------- |
| 1 |InitiationPending |The initiation of the payment order is pending. |
| 2 |InitiationFailed |The initiation of the payment order has failed. |
| 3 |InitiationCompleted |The initiation of the payment order is complete. |
| 4 |Cancelled |Payment initiation has been successfully cancelled after having received a request for cancellation. |

##### Multiple Authorisation

If the payment-order requires multiple authorisations, the Status of the multiple authorisations will be updated in the MultiAuthorisation object.

![Multi Authorisation](images/image2018-6-29_16-36-34.png)

The definitions for the Status:

|  |Status |Status Description |
| --- |------ |------------------ |
| 1 |AwaitingFurtherAuthorisation |The payment-order resource is awaiting further authorisation. |
| 2 |Rejected |The payment-order resource has been rejected by an authoriser. |
| 3 |Authorised |The payment-order resource has been successfully authorised by all required authorisers. |

## Data Model

The data dictionary section gives the detail on the payload content for the Domestic Scheduled Payment API flows.

### Reused Classes

#### OBDomesticScheduled2

The OBDomesticScheduled2 class is defined in the [domestic-scheduled-payment-consents](./domestic-scheduled-payment-consents.md#obdomesticscheduled2) page.

### Domestic Scheduled Payment - Request

The OBWriteDomesticScheduled2 object will be used for a call to:

* POST /domestic-scheduled-payments

#### UML Diagram

![Domestic Scheduled Payment - Request](images/OBWriteDomesticScheduled2.gif)

#### Notes

The domestic-scheduled-payment **request** object contains the: 

* ConsentId.
* The full Initiation and Risk objects from the domestic-scheduled-payment-consent request.
  
The **Initiation** and **Risk** sections of the domestic-scheduled-payment request **must** match the **Initiation** and **Risk** sections of the corresponding domestic-scheduled-payment-consent request.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticScheduled2 | |OBWriteDomesticScheduled2 | |OBWriteDomesticScheduled2 | | |
| Data |1..1 |OBWriteDomesticScheduled2/Data | |OBWriteDataDomesticScheduled2 | | |
| ConsentId |1..1 |OBWriteDomesticScheduled2/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteDomesticScheduled2/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| Risk |1..1 |OBWriteDomesticScheduled2/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Scheduled Payment - Response

The OBWriteDomesticScheduledResponse3 object will be used for a response to a call to:

* POST /domestic-scheduled-payments
* GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}

#### UML Diagram

![Domestic Scheduled Payment - Response](images/OBWriteDomesticScheduledResponse3.png)

#### Notes

The domestic-scheduled-payment **response** object contains the: 

* DomesticScheduledPaymentId.
* ConsentId.
* CreationDateTime the domestic-scheduled-payment resource was created.
* Status and StatusUpdateDateTime of the domestic-scheduled-payment resource.
* ExpectedExecutionDateTime for the domestic-scheduled-payment resource.
* ExpectedSettlementDateTime for the domestic-scheduled-payment resource.
* Charges array - for the breakdown of applicable ASPSP charges.
* The Initiation object from the domestic-scheduled-payment-consent.
* The MultiAuthorisation object if the domestic-scheduled-payment resource requires multiple authorisations.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticScheduledResponse3 | |OBWriteDomesticScheduledResponse3 | |OBWriteDomesticScheduledResponse3 | | |
| Data |1..1 |OBWriteDomesticScheduledResponse3/Data | |OBWriteDataDomesticScheduledResponse3 | | |
| DomesticScheduledPaymentId |1..1 |OBWriteDomesticScheduledResponse3/Data/DomesticScheduledPaymentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic schedule payment resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteDomesticScheduledResponse3/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticScheduledResponse3/Data/CreationDateTime |Date and time at which the message was created. |ISODateTime | | |
| Status |1..1 |OBWriteDomesticScheduledResponse3/Data/Status |Specifies the status of the payment order resource. |OBExternalStatus3Code |InitiationCompleted InitiationFailed InitiationPending Cancelled | |
| StatusUpdateDateTime |1..1 |OBWriteDomesticScheduledResponse3/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteDomesticScheduledResponse3/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteDomesticScheduledResponse3/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..n |OBWriteDomesticScheduledResponse3/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticScheduledResponse3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| MultiAuthorisation |0..1 |OBWriteDomesticScheduledResponse3/Data/MultiAuthorisation |The multiple authorisation flow response from the ASPSP. |OBMultiAuthorisation1 | | |

### Domestic Schedule Payment Order - Payment Details - Response

The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:

* GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details

#### UML Diagram

![Domestic Schedule Payment Order - Payment Details - Response](images/OBWritePaymentDetailsResponse1.png)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| PaymentStatus |0..unbounded |OBWritePaymentDetailsResponse1/Data/PaymentStatus |Payment status details. |OBWritePaymentDetails1 | | |

## Usage Examples

#### Create a Domestic Scheduled Payment

##### POST /domestic-scheduled-payments Request

```text
POST /domestic-scheduled-payments HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESNO.1317.GFX.22
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "ConsentId": "7290",
    "Initiation": {
      "InstructionIdentification": "89f0a53a91ee47f6a383536f851d6b5a",
      "RequestedExecutionDateTime": "2018-08-06T00:00:00+00:00",
      "InstructedAmount": {
        "Amount": "200.00",
        "Currency": "GBP"
      },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Tom Kirkman"
      },
      "RemittanceInformation": {
        "Reference": "DSR-037",
        "Unstructured": "Internal ops code 5120103"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "PartyToParty"
  }
}
```

##### POST /domestic-scheduled-payments Response

```text
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DomesticScheduledPaymentId": "7290-003",
    "ConsentId": "7290",
    "Status": "InitiationPending",
    "CreationDateTime": "2018-05-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2018-05-05T15:15:13+00:00",
    "Initiation": {
      "InstructionIdentification": "89f0a53a91ee47f6a383536f851d6b5a",
      "RequestedExecutionDateTime": "2018-08-06T00:00:00+00:00",
      "InstructedAmount": {
        "Amount": "200.00",
        "Currency": "GBP"
      },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Tom Kirkman"
      },
      "RemittanceInformation": {
        "Reference": "DSR-037",
        "Unstructured": "Internal ops code 5120103"
      }
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-scheduled-payments/7290-003"
  },
  "Meta": {}
}
```