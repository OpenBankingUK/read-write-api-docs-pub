# Domestic Payments - v3.1.10 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /domestic-payments](#post-domestic-payments)
    - [Status](#status)
  - [GET /domestic-payments/{DomesticPaymentId}](#get-domestic-payments-domesticpaymentid)
    - [Status](#status-2)
  - [GET /domestic-payments/{DomesticPaymentId}/payment-details](#get-domestic-payments-domesticpaymentid-payment-details)
    - [Status](#status-3)
  - [State Model](#state-model)
    - [Payment Order](#payment-order)
      - [Multiple Authorisation](#multiple-authorisation)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBDomestic2](#obdomestic2)
  - [Domestic Payment - Request](#domestic-payment-request)
    - [UML Diagram](#uml-diagram)
    - [Notes](#notes)
    - [Data Dictionary](#data-dictionary)
  - [Domestic Payment - Response](#domestic-payment-response)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [Domestic Payment Order - Payment Details - Response](#domestic-payment-order-payment-details-response)
    - [UML Diagram](#uml-diagram-3)
    - [Data Dictionary](#data-dictionary-3)
- [Usage Examples](#usage-examples)
  - [POST /domestic-payments](#post-domestic-payments-2)
    - [Request](#request)
    - [Response](#response)
  - [GET /domestic-payments/{DomesticPaymentId}](#get-domestic-payments-domesticpaymentid-2)
    - [Request](#request-2)
    - [Response](#response-2)

## Overview

The Domestic Payments resource is used by a PISP to initiate a Domestic Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-payments |POST |POST /domestic-payments |Mandatory |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteDomestic2 |OBWriteDomesticResponse5 |
| domestic-payments |GET |GET /domestic-payments/{DomesticPaymentId} |Mandatory |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticResponse5 |
| payment-details |GET |GET /domestic-payments/{DomesticPaymentId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

### POST /domestic-payments

Once the domestic-payment-consent has been authorised by the PSU, the PISP can proceed to submitting the domestic-payment for processing:

* This is done by making a POST request to the **domestic-payments** endpoint.
* This request is an instruction to the ASPSP to begin the domestic single immediate payment journey. The domestic payment must be submitted immediately, however, there are some scenarios where the domestic payment may not be executed immediately (e.g., busy periods at the ASPSP).
* The PISP **must** ensure that the Initiation and Risk sections of the domestic-payment match the corresponding Initiation and Risk sections of the domestic-payment-consent resource. If the two do not match, the ASPSP must not process the request and **must** respond with a 400 (Bad Request).
* Any operations on the domestic-payment resource will not result in a status change for the domestic-payment resource.

#### Status

A domestic-payment can only be created if its corresponding domestic-payment-consent resource has the status of "Authorised". 

The domestic-payment resource that is created successfully must have one of the following PaymentStatusCode code-set enumerations:

| Status |
| ------ |
| Pending |
| Rejected |
| AcceptedSettlementInProcess |
| AcceptedSettlementCompleted |
| AcceptedWithoutPosting |
| AcceptedCreditSettlementCompleted |

### GET /domestic-payments/{DomesticPaymentId}

A PISP can retrieve the domestic-payment to check its status.

#### Status

The domestic-payment resource must have one of the following PaymentStatusCode code-set enumerations:

| Status |
| ------ |
| Pending |
| Rejected |
| AcceptedSettlementInProcess |
| AcceptedSettlementCompleted |
| AcceptedWithoutPosting |
| AcceptedCreditSettlementCompleted |

### GET /domestic-payments/{DomesticPaymentId}/payment-details

A PISP can retrieve the Details of the underlying payment transaction via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

#### Status

The domestic-payment - payment-details must have one of the following PaymentStatusCode code-set enumerations:

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

The state model for the domestic-payment resource follows the behaviour and definitions for the ISO 20022 PaymentStatusCode code-set.

![Payment Order Status](./images/PaymentStatusLifeCycle.png)

The definitions for the status:

|  |Status |Payment Status Description |
|--|------ |-------------------------- |
| 1 |Pending |Payment initiation or individual transaction included in the payment initiation is pending. Further checks and status update will be performed. |
| 2 |Rejected |Payment initiation or individual transaction included in the payment initiation has been rejected. |
| 3 |AcceptedSettlementInProcess |All preceding checks such as technical validation and customer profile were successful and therefore the payment initiation has been accepted for execution. |
| 4 |AcceptedSettlementCompleted |Settlement on the debtor's account has been completed. |
| 5 |AcceptedWithoutPosting |Payment instruction included in the credit transfer is accepted without being posted to the creditor customer’s account. |
| 6 |AcceptedCreditSettlementCompleted |Settlement on the creditor's account has been completed.|

##### Multiple Authorisation

If the payment-order requires multiple authorisations - the Status of the multiple authorisations will be updated in the MultiAuthorisation object.

![Multi Authorisation Status](./images/image2018-6-29_16-36-34.png)

The definitions for the status:

|  |Status |Status Description |
|-- |------ |------------------ |
| 1 |AwaitingFurtherAuthorisation |The payment-order resource is awaiting further authorisation. |
| 2 |Rejected |The payment-order resource has been rejected by an authoriser. |
| 3 |Authorised |The payment-order resource has been successfully authorised by all required authorisers.|

## Data Model

The data dictionary section gives the detail on the payload content for the Domestic Payment API flows.

### Reused Classes

#### OBDomestic2

The OBDomestic2 class is defined in the [domestic-payment-consents](./domestic-payment-consents.md#obdomestic2) page.

### Domestic Payment - Request

The OBWriteDomestic2 object will be used for a call to:

* POST /domestic-payments

#### UML Diagram

![OBWriteDomestic2](./images/OBWriteDomestic2.svg)

#### Notes

The domestic-payment **request** object contains the:

* ConsentId.
* The full Initiation and Risk objects from the domestic-payment-consent  request.

The **Initiation** and **Risk** sections of the domestic-payment request **must** match the **Initiation** and **Risk** sections of the corresponding domestic-payment-consent request.

#### Data Dictionary

 | Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomestic2 | |OBWriteDomestic2 | |OBWriteDomestic2 | | |
| Data |1..1 |OBWriteDomestic2/Data | |OBWriteDataDomestic2 | | |
| ConsentId |1..1 |OBWriteDomestic2/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteDomestic2/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment. |OBDomestic2 | | |
| Risk |1..1 |OBWriteDomestic2/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Payment - Response

The OBWriteDomesticResponse5 object will be used for a response to a call to:

* POST /domestic-payments
* GET /domestic-payments/{DomesticPaymentId}

#### UML Diagram

![OBWriteDomesticResponse5](./images/OBWriteDomesticResponse5.svg)

#### Notes

The domestic-payment **response** object contains the:

* DomesticPaymentId.
* ConsentId.
* CreationDateTime the domestic-payment resource was created.
* Status and StatusUpdateDateTime of the domestic-payment resource.
* ExpectedExecutionDateTime for the domestic-payment resource.
* ExpectedSettlementDateTime for the domestic-payment resource.
* Refund account details, if requested by PISP as part of the domestic-payment-consents resource.
* Charges array for the breakdown of applicable ASPSP charges.
* The Initiation object from the domestic-payment-consent.
* The MultiAuthorisation object if the domestic-payment resource requires multiple authorisations.
* An ASPSP should conditionally provide `Debtor/Name` in the Payment Order Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticResponse5 | |OBWriteDomesticResponse5 | |OBWriteDomesticResponse5 | | |
| Data |1..1 |OBWriteDomesticResponse5/Data | |OBWriteDataDomesticResponse5 | | |
| DomesticPaymentId |1..1 |OBWriteDomesticResponse5/Data/DomesticPaymentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteDomesticResponse5/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticResponse5/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteDomesticResponse5/Data/Status |Specifies the status of the payment information group. |OBTransactionIndividualStatus1Code |AcceptedCreditSettlementCompleted AcceptedWithoutPosting AcceptedSettlementCompleted AcceptedSettlementInProcess Pending Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteDomesticResponse5/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteDomesticResponse5/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteDomesticResponse5/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Refund |0..1 |OBWriteDomesticResponse5/Data/Refund |Unambiguous identification of the refund account to which a refund will be made as a result of the transaction. |OBDomesticRefundAccount1 | | |
| Charges |0..n |OBWriteDomesticResponse5/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticResponse5/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment. |OBDomestic2 | | |
| MultiAuthorisation |0..1 |OBWriteDomesticResponse5/Data/MultiAuthorisation |The multiple authorisation flow response from the ASPSP. |OBMultiAuthorisation1 | | |
| Debtor |0..1 |OBWriteDomesticResponse5/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteDomesticResponse5/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBWriteDomesticResponse5/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteDomesticResponse5/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteDomesticResponse5/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |

### Domestic Payment Order - Payment Details - Response

The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:

* GET /domestic-payments/{DomesticPaymentId}/payment-details

#### UML Diagram

![OBWritePaymentDetailsResponse1](./images/OBWritePaymentDetailsResponse1.svg)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| PaymentStatus |0..unbounded |OBWritePaymentDetailsResponse1/Data/PaymentStatus |Payment status details. |OBWritePaymentDetails1 | | |

## Usage Examples

Note, further usage examples are available [here](../../references/usage-examples/README.md).

### POST /domestic-payments

#### Request

```
POST /domestic-payments HTTP/1.1
Authorization: Bearer Jhingapulaav
x-idempotency-key: FRESNO.1317.GFX.22
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "ConsentId": "58923",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "EcommerceMerchantInitiatedPayment",
    "ContractPresentInidicator": false,
    "PaymentPurposeCode": "EPAY",
    "BeneficiaryPaymentDetailsPrepopulatedIndicator": false,
    "BeneficiaryAccountType": "Business",
    "MerchantCustomerIdentification": "053598653254",
    "DeliveryAddress": {
      "AddressLine": [
        "Flat 7",
        "Acacia Lodge"
      ],
      "StreetName": "Acacia Avenue",
      "BuildingNumber": "27",
      "PostCode": "GU31 2ZZ",
      "TownName": "Sparsholt",
      "CountrySubDivision": "Wessex",
      "Country": "UK"
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
    "DomesticPaymentId": "58923-001",
    "ConsentId": "58923",
    "Status": "AcceptedSettlementInProcess",
    "CreationDateTime": "2017-06-05T15:15:22+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
    "Refund": {
      "Account": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325677",
        "Name": "NTPC Inc"
      }
    },
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/58923-001"
  },
  "Meta": {}
}
```
### GET /domestic-payments/{DomesticPaymentId}

#### Request

```
GET /domestic-payments/58923-001 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Response

```
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DomesticPaymentId": "58923-001",
    "ConsentId": "58923",
    "Status": "AcceptedSettlementInProcess",
    "CreationDateTime": "2017-06-05T15:15:22+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:22+00:00",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    },
    "Debtor": {
      "Name": "D Jones"
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/58923-001"
  },
  "Meta": {}
}
```
