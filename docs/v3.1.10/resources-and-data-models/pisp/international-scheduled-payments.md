# International Scheduled Payments - v3.1.10 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /international-scheduled-payments](#post-international-scheduled-payments)
    - [Status](#status)
  - [GET /international-scheduled-payments/{InternationalScheduledPaymentId}](#get-international-scheduled-payments-internationalscheduledpaymentid)
    - [Status](#status-2)
  - [GET /international-scheduled-payments/{InternationalScheduledPaymentId}/payment-details](#get-international-scheduled-payments-internationalscheduledpaymentid-payment-details)
    - [Status](#status-3)
  - [State Model](#state-model)
    - [Payment Order](#payment-order)
      - [Multiple Authorisation](#multiple-authorisation)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBInternationalScheduled3](#obinternationalscheduled3)
    - [OBExchangeRate2](#obexchangerate2)
  - [International Scheduled Payment - Request](#international-scheduled-payment-request)
    - [UML Diagram](#uml-diagram)
    - [Notes](#notes)
    - [Data Dictionary](#data-dictionary)
  - [International Scheduled Payment - Response](#international-scheduled-payment-response)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [International Schedule Payment Order - Payment Details - Response](#international-schedule-payment-order-payment-details-response)
    - [UML Diagram](#uml-diagram-3)
    - [Data Dictionary](#data-dictionary-3)

## Overview

The International Scheduled Payments resource is used by a PISP to initiate an International Scheduled Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| international-scheduled-payments |POST |POST /international-scheduled-payments |Conditional |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteInternationalScheduled3 |OBWriteInternationalScheduledResponse6 |
| international-scheduled-payments |GET |GET /international-scheduled-payments/{InternationalScheduledPaymentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteInternationalScheduledResponse6 |
| payment-details |GET |GET /international-scheduled-payments/{InternationalScheduledPaymentId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

### POST /international-scheduled-payments

Once the international-scheduled-payment-consent has been authorised by the PSU, the PISP can proceed to submit the international-scheduled-payment for processing:

* This is done by making a POST request to the **international-scheduled-payments** endpoint.
* This request is an instruction to the ASPSP to begin the international scheduled payment journey. The PISP must submit the international scheduled payment immediately, however, there are some scenarios where the ASPSP may not warehouse the international scheduled payment immediately (e.g. busy periods at the ASPSP).
* The PISP **must** ensure that the Initiation and Risk sections of the international-scheduled-payment match the corresponding Initiation and Risk sections of the international-scheduled-payment-consent resource. If the two do not match, the ASPSP **must not** process the request and **must** respond with a 400 (Bad Request).
* Any operations on the international-scheduled-payment resource will not result in a Status change for the international-scheduled-payment resource.

#### Status

An international-scheduled-payment can only be created if its corresponding international-scheduled-payment-consent resource has the status of "Authorised". 

The international-scheduled-payment resource that is created successfully must have one of the following Status codes:

| Status |
| --- |
| InitiationPending |
| InitiationFailed |
| InitiationCompleted |

### GET /international-scheduled-payments/{InternationalScheduledPaymentId}

A PISP can retrieve the international-scheduled-payment to check its status.

#### Status

The international-scheduled-payment resource must have one of the following Status codes:

| Status |
| --- |
| InitiationPending |
| InitiationFailed |
| InitiationCompleted |
| Cancelled |

### GET /international-scheduled-payments/{InternationalScheduledPaymentId}/payment-details

A PISP can retrieve the Details of the underlying payment transaction via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

#### Status

The international-scheduled-payments - payment-details must have one of the following PaymentStatusCode code-set enumerations:

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

The state model for the international-scheduled-payment resource describes the initiation status only. I.e., not the subsequent execution of the international-scheduled-payment.

![ ScheduledPaymentOrderStatus ](./images/ScheduledPaymentOrderStatus.png )

The definitions for the Status:

|  |Status |Payment Status Description |
| --- |--- |--- |
| 1 |InitiationPending |The initiation of the payment order is pending. |
| 2 |InitiationFailed |The initiation of the payment order has failed. |
| 3 |InitiationCompleted |The initiation of the payment order is complete. |
| 4 |Cancelled |Payment initiation has been successfully cancelled after having received a request for cancellation. |

##### Multiple Authorisation

If the payment-order requires multiple authorisations, the Status of the multiple authorisations will be updated in the MultiAuthorisation object.

![ image2018-6-29_16-36-34 ](./images/image2018-6-29_16-36-34.png )

The definitions for the Status:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AwaitingFurtherAuthorisation |The payment-order resource is awaiting further authorisation. |
| 2 |Rejected |The payment-order resource has been rejected by an authoriser. |
| 3 |Authorised |The payment-order resource has been successfully authorised by all required authorisers. |

## Data Model

The data dictionary section gives the detail on the payload content for the International Scheduled Payment API flows.

### Reused Classes

#### OBInternationalScheduled3

The OBInternationalScheduled3 class is defined in the [international-scheduled-payment-consents](./international-scheduled-payment-consents.md#obinternationalscheduled3) page.

#### OBExchangeRate2

The OBExchangeRate2 class is defined in the [international-scheduled-payment-consents](./international-scheduled-payment-consents.md#obexchangerate2) page.

### International Scheduled Payment - Request

The OBWriteInternationalScheduled3 object will be used for a call to:

* POST /international-scheduled-payments

#### UML Diagram

![ OBWriteInternationalScheduled3 ](./images/OBWriteInternationalScheduled3.svg )

#### Notes

The international-scheduled-payment **request** object contains the: 

* ConsentId.
* The full Initiation and Risk objects from the international-scheduled-payment-consent request.
* The **Initiation** and **Risk** sections of the international-scheduled-payment request **must** match the **Initiation** and **Risk** sections of the corresponding international-scheduled-payment-consent request.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteInternationalScheduled3 |OBWriteInternationalScheduled3 | |OBWriteInternationalScheduled3 | | | |
| Data |1..1 |OBWriteInternationalScheduled3/Data | |OBWriteDataInternationalScheduled3 | | |
| ConsentId |1..1 |OBWriteInternationalScheduled3/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteInternationalScheduled3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled international payment. |OBInternationalScheduled3 | | |
| Risk |1..1 |OBWriteInternationalScheduled3/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### International Scheduled Payment - Response

The OBWriteInternationalScheduledResponse6 object will be used for a response to a call to:

* POST /international-scheduled-payments
* GET /international-scheduled-payments/{InternationalScheduledPaymentId}

#### UML Diagram

![ OBWriteInternationalScheduledResponse6 ](./images/OBWriteInternationalScheduledResponse6.svg )

#### Notes

The international-scheduled-payment **response** object contains the:

* InternationalScheduledPaymentId.
* ConsentId.
* CreationDateTime the international-scheduled-payment resource was created.
* Status and StatusUpdateDateTime of the international-scheduled-payment resource.
* ExpectedExecutionDateTime for the international-scheduled-payment resource.
* ExpectedSettlementDateTime for the international-scheduled-payment resource.
* Refund account details, if requested by PISP as part of the international-scheduled-payment-consents resource.
* The Charges and ExchangeRateInformation in the international-scheduled-payment-consent response from the ASPSP.
* The Initiation object from the international-payment-consent.
* The MultiAuthorisation object if the international-scheduled-payment resource requires multiple authorisations.
* An ASPSP should conditionally provide `Debtor/Name` in the Payment Order Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteInternationalScheduledResponse6 | |OBWriteInternationalScheduledResponse6 | |OBWriteInternationalScheduledResponse6 | | |
| Data |1..1 |OBWriteInternationalScheduledResponse6/Data | |OBWriteDataInternationalScheduledResponse6 | | |
| InternationalScheduledPaymentId |1..1 |OBWriteInternationalScheduledResponse6/Data/InternationalScheduledPaymentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the international scheduled payment resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteInternationalScheduledResponse6/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteInternationalScheduledResponse6/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteInternationalScheduledResponse6/Data/Status |Specifies the status of the payment order resource. |OBExternalStatus1Code |InitiationCompleted InitiationFailed InitiationPending Cancelled | |
| StatusUpdateDateTime |1..1 |OBWriteInternationalScheduledResponse6/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteInternationalScheduledResponse6/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteInternationalScheduledResponse6/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Refund |0..1 |OBWriteInternationalScheduledResponse6/Data/Refund |Unambiguous identification of the refund account to which a refund will be made as a result of the transaction. |OBInternationalRefundAccount1 | | |
| Charges |0..n |OBWriteInternationalScheduledResponse6/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| ExchangeRateInformation |0..1 |OBWriteInternationalScheduledResponse6/Data/ExchangeRateInformation |Further detailed information on the exchange rate that has been used in the payment transaction. |OBExchangeRate2 | | |
| Initiation |1..1 |OBWriteInternationalScheduledResponse6/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled international payment. |OBInternationalScheduled3 | | |
| MultiAuthorisation |0..1 |OBWriteInternationalScheduledResponse6/Data/MultiAuthorisation | |OBMultiAuthorisation1 | | |
| Debtor |0..1 |OBWriteInternationalScheduledResponse6/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteInternationalScheduledResponse6/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBWriteInternationalScheduledResponse6/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteInternationalScheduledResponse6/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteInternationalScheduledResponse6/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |

### International Schedule Payment Order - Payment Details - Response

The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:

* GET /international-scheduled-payments/{InternationalScheduledPaymentId}/payment-details

#### UML Diagram

![OBWritePaymentDetailsResponse1](./images/OBWritePaymentDetailsResponse1.svg)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| PaymentStatus |0..unbounded |OBWritePaymentDetailsResponse1/Data/PaymentStatus |Payment status details. |OBWritePaymentDetails1 | | |
