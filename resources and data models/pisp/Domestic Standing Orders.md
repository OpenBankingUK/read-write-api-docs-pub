# Domestic Standing Orders <!-- omit in toc -->

1. [Overview](#overview)
   1. [Profile Compatibility](#profile-compatibility)
2. [Endpoints](#endpoints)
   1. [POST /domestic-standing-order-consents](#post-domestic-standing-order-consents)
      1. [Status](#status)
   2. [GET /domestic-standing-order-consents/{ConsentId}](#get-domestic-standing-order-consentsconsentid)
      1. [Status](#status-1)
   3. [POST /domestic-standing-orders](#post-domestic-standing-orders)
      1. [Status](#status-2)
   4. [GET /domestic-standing-orders/{DomesticStandingOrderId}](#get-domestic-standing-ordersdomesticstandingorderid)
      1. [Status](#status-3)
   5. [GET /domestic-standing-orders/{DomesticStandingOrderId}/payment-details](#get-domestic-standing-ordersdomesticstandingorderidpayment-details)
      1. [Status](#status-4)
   6. [State Model](#state-model)
      1. [Payment Order Consent](#payment-order-consent)
      2. [Payment Order](#payment-order)
         1. [Multiple Authorisation](#multiple-authorisation)
3. [Data Model](#data-model)
   1. [Reused Classes](#reused-classes)
      1. [OBDomesticStandingOrder3](#obdomesticstandingorder3)
         1. [UML Diagram](#uml-diagram)
         2. [Notes](#notes)
            1. [Frequency Examples](#frequency-examples)
         3. [Data Dictionary](#data-dictionary)
   2. [Domestic Standing Order Consent - Request](#domestic-standing-order-consent---request)
      1. [UML Diagram](#uml-diagram-1)
      2. [Notes](#notes-1)
      3. [Data Dictionary](#data-dictionary-1)
   3. [Domestic Standing Order Consent - Response](#domestic-standing-order-consent---response)
      1. [UML Diagram](#uml-diagram-2)
      2. [Notes](#notes-2)
      3. [Data Dictionary](#data-dictionary-2)
   4. [Domestic Standing Order - Request](#domestic-standing-order---request)
      1. [UML Diagram](#uml-diagram-3)
      2. [Notes](#notes-3)
      3. [Data Dictionary](#data-dictionary-3)
   5. [Domestic Standing Order - Response](#domestic-standing-order---response)
      1. [UML Diagram](#uml-diagram-4)
      2. [Notes](#notes-4)
      3. [Data Dictionary](#data-dictionary-4)
   6. [Domestic Standing Order - Payment Details - Response](#domestic-standing-order---payment-details---response)
      1. [UML Diagram](#uml-diagram-5)
      2. [Data Dictionary](#data-dictionary-5)
4. [Usage Examples](#usage-examples)
      1. [Create Domestic Standing Order Consent](#create-domestic-standing-order-consent)
         1. [POST /domestic-standing-order-consents](#post-domestic-standing-order-consents-1)
         2. [POST /domestic-standing-order-consents response](#post-domestic-standing-order-consents-response)
   1. [Create a Domestic Standing Order](#create-a-domestic-standing-order)
      1. [POST /domestic-standing-orders request](#post-domestic-standing-orders-request)
      2. [POST /domestic-standing-orders response](#post-domestic-standing-orders-response)
   2. [Get a Domestic Standing Order Consent](#get-a-domestic-standing-order-consent)
      1. [GET /domestic-standing-order-consents/{ConsentId}](#get-domestic-standing-order-consentsconsentid-1)
      2. [GET /domestic-standing-order-consents response](#get-domestic-standing-order-consents-response)

## Overview

The Domestic Standing Order resources (domestic-standing-order-consents and domestic-standing-orders) are used by a PISP to initiate a Domestic Standing Order.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

### Profile Compatibility

For a list of profiles compatible with this resource, please see the [Compatibility Matrix]().

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-standing-order-consents |POST |POST /domestic-standing-order-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteDomesticStandingOrderConsent4 |OBWriteDomesticStandingOrderConsentResponse4 |
| domestic-standing-order-consents |GET |GET /domestic-standing-order-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticStandingOrderConsentResponse4 |
| domestic-standing-orders |POST |POST /domestic-standing-orders |Conditional |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteDomesticStandingOrder3 |OBWriteDomesticStandingOrderResponse4 |
| domestic-standing-orders |GET |GET /domestic-standing-orders/{DomesticStandingOrderId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticStandingOrderResponse4 |
| payment-details |GET |GET /domestic-standing-orders/{DomesticStandingOrderId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

### POST /domestic-standing-order-consents

The API endpoint allows the PISP to ask an ASPSP to create a new **domestic-standing-order-consent** resource.

* The POST action indicates to the ASPSP that a domestic standing order consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **domestic-standing-order-consent** resource and responds with a unique ConsentId to refer to the resource.

#### Status

The default Status is "AwaitingAuthorisation" immediately after the domestic-standing-order-consent has been created.

| Status |
| --- |
| AwaitingAuthorisation |

### GET /domestic-standing-order-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status. 

#### Status

Once the PSU authorises the payment-consent resource , the Status of the payment-consent resource will be updated with "Authorised".

If the PSU rejects the consent or the domestic-standing-order-consent has failed some other ASPSP validation, the Status will be set to "Rejected".

Once a domestic-standing-order has been successfully created using the domestic-standing-order-consent, the Status of the domestic-standing-order-consent will be set to "Consumed".

The available Status codes for the domestic-standing-order-consent resource are:

| Status |
| --- |
| AwaitingAuthorisation |
| Rejected |
| Authorised |
| Consumed |

### POST /domestic-standing-orders

Once the domestic-standing-order-consent has been authorised by the PSU, the PISP can proceed to submitting the domestic-standing-order for processing:

* This is done by making a POST request to the **domestic-standing-orders** endpoint.
* This request is an instruction to the ASPSP to begin the domestic standing order journey. The PISP must submit the domestic standing order immediately, however, there are some scenarios where the ASPSP may not warehouse the domestic standing order immediately (e.g. busy periods at the ASPSP).
* The PISP **must** ensure that the Initiation and Risk sections of the domestic-standing-order match the corresponding Initiation and Risk sections of the domestic-standing-order-consent resource. If the two do not match, the ASPSP **must not** process the request and **must** respond with a 400 (Bad Request).
* Any operations on the domestic-standing-order resource will not result in a Status change for the domestic-standing-order resource.

#### Status

A domestic-standing-order can only be created if its corresponding domestic-standing-order-consent resource has the status of "Authorised". 

The domestic-standing-order resource that is created successfully must have one of the following Status codes:

| Status |
| --- |
| InitiationPending |
| InitiationFailed |
| InitiationCompleted |

### GET /domestic-standing-orders/{DomesticStandingOrderId}

A PISP can retrieve the domestic-standing-order to check its status.

#### Status

The domestic-standing-order resource must have one of the following Status codes:

| Status |
| InitiationPending |
| InitiationFailed |
| InitiationCompleted |
| Cancelled |

### GET /domestic-standing-orders/{DomesticStandingOrderId}/payment-details

A PISP can retrieve the Details of the underlying payment transaction via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

#### Status

The domestic-standing-orders - payment-details must have one of the following PaymentStatusCode code-set enumerations:

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

#### Payment Order Consent

The state model for the domestic-standing-order-consent resource follows the generic consent state model. However, does not use the "Revoked" status, as the consent for a domestic-standing-order is not a long-lived consent.

![Payment Order Consent](images/image2018-5-18_10-24-21.png)

The definitions for the Status:

|  |Status |Status Description |
| --- |------ |------------------ |
| 1 |AwaitingAuthorisation |The consent resource is awaiting PSU authorisation. |
| 2 |Rejected |The consent resource has been rejected. |
| 3 |Authorised |The consent resource has been successfully authorised. |
| 4 |Consumed |The consented action has been successfully completed. This does not reflect the status of the consented action. |

#### Payment Order

The state model for the domestic-standing-order resource describes the initiation status only. I.e., not the subsequent execution of the domestic-standing-order.

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

![Multiple Authorisation](images/image2018-6-29_16-36-34.png)

The definitions for the Status:

|  | Status |Status Description |
| --- |------ |------------------ |
| 1 |AwaitingFurtherAuthorisation |The payment-order resource is awaiting further authorisation. |
| 2 |Rejected |The payment-order resource has been rejected by an authoriser. |
| 3 |Authorised |The payment-order resource has been successfully authorised by all required authorisers. |

## Data Model

The Data Dictionary section gives the detail on the payload content for the Domestic Standing Order API flows.

### Reused Classes

#### OBDomesticStandingOrder3

This section describes the OBDomesticStandingOrder3 class, which is reused as the Initiation object in the domestic-standing-order-consent and domestic-standing-order resources.

##### UML Diagram

![Domestic Standing Order](images/OBDomesticStandingOrder3.png)

##### Notes

For the OBDomesticStandingOrder3 Initiation object: 

* All elements in the Initiation payload that are specified by the PISP must not be changed via the ASPSP, as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the domestic-standing-order-consent request immediately.
* If the ASPSP establishes a problem with the domestic-standing-order-consent after the API call, the ASPSP can set the Status of the domestic-standing-order-consent resource to Rejected
* DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the domestic-standing-order-consent will be set to Rejected after PSU authentication.
* Account Identification field usage:
  * Where "UK.OBIE.SortCodeAccountNumber" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * Where the "UK.OBIE.IBAN" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the full IBAN.
* The Permission field is restricted to "Create", however, may be extended to "Update" and "Delete" in a future iteration of the specification.
* Either the NumberOfPayments or FinalPaymentDateTime must be specified (not both) if the domestic standing order is not open ended.
* The structure allows a PISP to specify a domestic standing order with a different payment amount and date combinations: for the first payment, the recurring payment, and the final payment. The recurring payment (and date) must only be populated if different from the first payment (and date).
* If the PISP requests a Frequency that is not supported by the ASPSP the ASPSP **must** respond with a 400 HTTP status code.

###### Frequency Examples

| Frequency |Example |Details |
| --------- |------- |------- |
| EvryDay |EvryDay |Every day. |
| EvryWorkgDay |EvryWorkgDay |Every working day. |
| IntrvlDay |IntrvlDay:15 |Every 15 Calendar day. |
| IntrvlWkDay |IntrvlWkDay:01:03 |Every week, on the 3rd day of the week. |
| IntrvlWkDay |IntrvlWkDay:02:03 |Every 2nd week, on the 3rd day of the week. |
| WkInMnthDay |WkInMnthDay:02:03 |Every month, on the 2nd week of the month, and on the third day of the week. |
| IntrvlMnthDay |IntrvlMnthDay:01:-01 |Every month, on the last day of the month. |
| IntrvlMnthDay |IntrvlMnthDay:06:15 |Every 6th month, on the 15th day of the month. |
| QtrDay |QtrDay:ENGLISH |Paid on the 25th March, 24th June, 29th September and 25th December. |


##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBDomesticStandingOrder3 | |OBDomesticStandingOrder3 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| Frequency |1..1 |OBDomesticStandingOrder3/Frequency |Individual Definitions: EvryDay - Every day EvryWorkgDay - Every working day IntrvlDay - An interval specified in number of calendar days (02 to 31) IntrvlWkDay - An interval specified in weeks (01 to 09), and the day within the week (01 to 07) WkInMnthDay - A monthly interval, specifying the week of the month (01 to 05) and day within the week (01 to 07) IntrvlMnthDay - An interval specified in months (between 01 to 06, 12, 24), specifying the day within the month (-05 to -01, 01 to 31) QtrDay - Quarterly (either ENGLISH, SCOTTISH, or RECEIVED). ENGLISH = Paid on the 25th March, 24th June, 29th September and 25th December. SCOTTISH = Paid on the 2nd February, 15th May, 1st August and 11th November. RECEIVED = Paid on the 20th March, 19th June, 24th September and 20th December. Individual Patterns: EvryDay (ScheduleCode) EvryWorkgDay (ScheduleCode) IntrvlDay:NoOfDay (ScheduleCode + NoOfDay) IntrvlWkDay:IntervalInWeeks:DayInWeek (ScheduleCode + IntervalInWeeks + DayInWeek) WkInMnthDay:WeekInMonth:DayInWeek (ScheduleCode + WeekInMonth + DayInWeek) IntrvlMnthDay:IntervalInMonths:DayInMonth (ScheduleCode + IntervalInMonths + DayInMonth) QtrDay: + either (ENGLISH, SCOTTISH or RECEIVED) ScheduleCode + QuarterDay The regular expression for this element combines five smaller versions for each permitted pattern. To aid legibility - the components are presented individually here: EvryDay EvryWorkgDay IntrvlDay:((0[2-9])|([1-2][0-9])|3[0-1]) IntrvlWkDay:0[1-9]:0[1-7] WkInMnthDay:0[1-5]:0[1-7] IntrvlMnthDay:(0[1-6]|12|24):(-0[1-5]|0[1-9]|[12][0-9]|3[01]) QtrDay:(ENGLISH|SCOTTISH|RECEIVED) Full Regular Expression: ^(EvryDay)$|^(EvryWorkgDay)$|^(IntrvlDay:((0[2-9])|([1-2][0-9])|3[0-1]))$|^(IntrvlWkDay:0[1-9]:0[1-7])$|^(WkInMnthDay:0[1-5]:0[1-7])$|^(IntrvlMnthDay:(0[1-6]|12|24):(-0[1-5]|0[1-9]|[12][0-9]|3[01]))$|^(QtrDay:(ENGLISH|SCOTTISH|RECEIVED))$ |Max35Text | |^(EvryDay)$|^(EvryWorkgDay)$|^(IntrvlWkDay:0[1-9]:0[1-7])$|^(WkInMnthDay:0[1-5]:0[1-7])$|^(IntrvlMnthDay:(0[1-6]|12|24):(-0[1-5]|0[1-9]|[12][0-9]|3[01]))$|^(QtrDay:(ENGLISH|SCOTTISH|RECEIVED))$ |
| Reference |0..1 |OBDomesticStandingOrder3/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. |Max35Text | | |
| NumberOfPayments |0..1 |OBDomesticStandingOrder3/NumberOfPayments |Number of the payments that will be made in completing this frequency sequence including any executed since the sequence start date. |Max35Text | | |
| FirstPaymentDateTime |1..1 |OBDomesticStandingOrder3/FirstPaymentDateTime |The date on which the first payment for a Standing Order schedule will be made. |ISODateTime | | |
| RecurringPaymentDateTime |0..1 |OBDomesticStandingOrder3/RecurringPaymentDateTime |The date on which the first recurring payment for a Standing Order schedule will be made. Usage: This must be populated only if the first recurring date is different to the first payment date. |ISODateTime | | |
| FinalPaymentDateTime |0..1 |OBDomesticStandingOrder3/FinalPaymentDateTime |The date on which the final payment for a Standing Order schedule will be made. |ISODateTime | | |
| FirstPaymentAmount |1..1 |OBDomesticStandingOrder3/FirstPaymentAmount |The amount of the first Standing Order |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticStandingOrder3/FirstPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |^\d{1,13}\.\d{1,5}$ |
| Currency |1..1 |OBDomesticStandingOrder3/FirstPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| RecurringPaymentAmount |0..1 |OBDomesticStandingOrder3/RecurringPaymentAmount |The amount of the recurring Standing Order |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticStandingOrder3/RecurringPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |^\d{1,13}\.\d{1,5}$ |
| Currency |1..1 |OBDomesticStandingOrder3/RecurringPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| FinalPaymentAmount |0..1 |OBDomesticStandingOrder3/FinalPaymentAmount |The amount of the final Standing Order |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticStandingOrder3/FinalPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |^\d{1,13}\.\d{1,5}$ |
| Currency |1..1 |OBDomesticStandingOrder3/FinalPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DebtorAccount |0..1 |OBDomesticStandingOrder3/DebtorAccount |Provides the details to identify the debtor account. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBDomesticStandingOrder3/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomesticStandingOrder3/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBDomesticStandingOrder3/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max70Text | | |
| SecondaryIdentification |0..1 |OBDomesticStandingOrder3/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| CreditorAccount |1..1 |OBDomesticStandingOrder3/CreditorAccount |Identification assigned by an institution to identify an account. This identification is known by the account owner. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |1..1 |OBDomesticStandingOrder3/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |1..1 |OBDomesticStandingOrder3/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBDomesticStandingOrder3/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max70Text | | |
| SecondaryIdentification |0..1 |OBDomesticStandingOrder3/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| SupplementaryData |0..1 |OBDomesticStandingOrder3/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

### Domestic Standing Order Consent - Request

The OBWriteDomesticStandingOrderConsent4 object will be used for the call to:

* POST /domestic-standing-order-consents

#### UML Diagram

![Domestic Standing Order Consent - Request](images/OBWriteDomesticStandingOrderConsent4.gif)

#### Notes

The domestic-standing-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticStandingOrderConsent4 | |OBWriteDomesticStandingOrderConsent4 | |OBWriteDomesticStandingOrderConsent4 | | |
| Data |1..1 |OBWriteDomesticStandingOrderConsent4/Data | |OBWriteDataDomesticStandingOrderConsent4 | | |
| Permission |1..1 |OBWriteDomesticStandingOrderConsent4/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| Initiation |1..1 |OBWriteDomesticStandingOrderConsent4/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| Authorisation |0..1 |OBWriteDomesticStandingOrderConsent4/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticStandingOrderConsent4/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteDomesticStandingOrderConsent4/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Standing Order Consent - Response

The OBWriteDomesticStandingOrderConsentResponse4 object will be used for a response to a call to:

* POST /domestic-standing-order-consents
* GET /domestic-standing-order-consents/{ConsentId}

#### UML Diagram

![Domestic Standing Order Consent - Response](images/OBWriteDomesticStandingOrderConsentResponse4.gif)

#### Notes

The domestic-standing-order-consent **response** contains the full **original** payload from the domestic-standing-order-consent **request,** with the following additional elements:

* ConsentId.
* CreationDateTime the domestic-standing-order-consent resource was created.
* Status and StatusUpdateDateTime of the domestic-standing-order-consent resource.
* Permission field in the original request.
* CutOffDateTime Behaviour is explained in Payment Initiation API Profile, Section - [Payment Restrictions -> CutOffDateTime Behaviour](../../profiles/payment-initiation-api-profile.md#cutoffdatetime-behaviour).
* Charges array - for the breakdown of applicable ASPSP charges.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticStandingOrderConsentResponse4 | |OBWriteDomesticStandingOrderConsentResponse4 | |OBWriteDomesticStandingOrderConsentResponse4 | | |
| Data |1..1 |OBWriteDomesticStandingOrderConsentResponse4/Data | |OBWriteDataDomesticStandingOrderConsentResponse4 | | |
| ConsentId |1..1 |OBWriteDomesticStandingOrderConsentResponse4/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticStandingOrderConsentResponse4/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteDomesticStandingOrderConsentResponse4/Data/Status |Specifies the status of consent resource in code form. |OBExternalConsentStatus1Code |Authorised AwaitingAuthorisation Consumed Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteDomesticStandingOrderConsentResponse4/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| Permission |1..1 |OBWriteDomesticStandingOrderConsentResponse4/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| CutOffDateTime |0..1 |OBWriteDomesticStandingOrderConsentResponse4/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| Charges |0..n |OBWriteDomesticStandingOrderConsentResponse4/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticStandingOrderConsentResponse4/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| Authorisation |0..1 |OBWriteDomesticStandingOrderConsentResponse4/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticStandingOrderConsentResponse4/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteDomesticStandingOrderConsentResponse4/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Standing Order - Request

The OBWriteDomesticStandingOrder3 object will be used for a call to:

* POST /domestic-standing-orders

#### UML Diagram

![Domestic Standing Order - Request](images/OBWriteDomesticStandingOrder3.png)

#### Notes

The domestic-standing-order **request** object contains the: 

* ConsentId.
* The full Initiation and Risk objects from the domestic-standing-order-consent request.
* The **Initiation** and **Risk** sections of the domestic-standing-order request **must** match the **Initiation** and **Risk** sections of the corresponding domestic-standing-order-consent request.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticStandingOrder3 | |OBWriteDomesticStandingOrder3 | |OBWriteDomesticStandingOrder3 | | |
| Data |1..1 |OBWriteDomesticStandingOrder3/Data | |OBWriteDataDomesticStandingOrder3 | | |
| ConsentId |1..1 |OBWriteDomesticStandingOrder3/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteDomesticStandingOrder3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| Risk |1..1 |OBWriteDomesticStandingOrder3/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Standing Order - Response

The OBWriteDomesticStandingOrderResponse4 object will be used for a response to a call to:

* POST /domestic-standing-orders
* GET /domestic-standing-orders/{DomesticStandingOrderId}

#### UML Diagram

![Domestic Standing Order - Response](images/OBWriteDomesticStandingOrderResponse4.png)

#### Notes

The domestic-standing-order **response** object contains the: 

* DomesticStandingOrderId.
* ConsentId.
* CreationDateTime the domestic-standing-order resource was created.
* Status and StatusUpdateDateTime of the domestic-standing-order resource.
* Charges array - for the breakdown of applicable ASPSP charges.
* The Initiation object from the domestic-standing-order-consent.
* The MultiAuthorisation object if the domestic-standing-order resource requires multiple authorisations.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticStandingOrderResponse4 | |OBWriteDomesticStandingOrderResponse4 | |OBWriteDomesticStandingOrderResponse4 | | |
| Data |1..1 |OBWriteDomesticStandingOrderResponse4/Data | |OBWriteDataDomesticStandingOrderResponse4 | | |
| DomesticStandingOrderId |1..1 |OBWriteDomesticStandingOrderResponse4/Data/DomesticStandingOrderId |OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic standing order resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteDomesticStandingOrderResponse4/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticStandingOrderResponse4/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteDomesticStandingOrderResponse4/Data/Status |Specifies the status of the payment order resource. |OBExternalStatus1Code |InitiationCompleted InitiationFailed InitiationPending Cancelled | |
| StatusUpdateDateTime |1..1 |OBWriteDomesticStandingOrderResponse4/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| Charges |0..n |OBWriteDomesticStandingOrderResponse4/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticStandingOrderResponse4/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| MultiAuthorisation |0..1 |OBWriteDomesticStandingOrderResponse4/Data/MultiAuthorisation | |OBMultiAuthorisation1 | | |

### Domestic Standing Order - Payment Details - Response

The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:

* GET /domestic-standing-orders/{DomesticStandingOrderId}/payment-details

#### UML Diagram

![Domestic Standing Order - Payment Details - Response](images/OBWritePaymentDetailsResponse1.png)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| PaymentStatus |0..unbounded |OBWritePaymentDetailsResponse1/Data/PaymentStatus |Payment status details. |OBWritePaymentDetails1 | | |

## Usage Examples

This set of flows and payload examples are for creating and retrieving a domestic standing order through a PISP:

![Domestic Standing Order - Sequence Diagram](images/DomesticStandingOrder.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU, ASPSP Resource Server
Step 1: Agree a Domestic Standing Order Initiation
end note
PSU -> PISP: Agree a standing order initiation

note over PSU, ASPSP Resource Server
Step 2: Setup a Domestic Standing Order consent
end note
PISP &lt;-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> PISP: access-token
PISP &lt;-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-standing-order-consents
ASPSP Resource Server -> PISP: HTTP 201 (Created), ConsentId
PISP -> PSU: HTTP 302 (Found), Redirect (ConsentId)

note over PSU, ASPSP Resource Server
Step 3: Authorize consent
end note
PSU -> ASPSP Authorisation Server: Follow redirect (ConsentId)
PSU &lt;-> ASPSP Authorisation Server: authenticate
PSU &lt;-> ASPSP Authorisation Server: SCA if required
ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (authorization-code)
PSU -> PISP: Follow redirect (authorization-code)
PISP &lt;-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
ASPSP Authorisation Server -> PISP: access-token

opt
note over PSU, ASPSP Resource Server
Step 4: Get status of Domestic Standing Order consent
end note
PISP &lt;-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: GET /domestic-standing-order-consents/{ConsentId}
ASPSP Resource Server -> PISP: HTTP 200 (OK), consent resource
end opt

note over PSU, ASPSP Resource Server
Step 5: Create Domestic Standing Order
end note
PISP &lt;-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-standing-orders
ASPSP Resource Server -> PISP: HTTP 201 (Created), DomesticStandingOrder resource
```
</details>

#### Create Domestic Standing Order Consent

##### POST /domestic-standing-order-consents

```
POST /domestic-standing-order-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
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
	"Permission": "Create",
    "Initiation": {
	  "Frequency": "EvryDay",
	  "Reference": "Pocket money for Damien",
	  "FirstPaymentDateTime": "1976-06-06T06:06:06+00:00",
	  "FirstPaymentAmount": {
        "Amount": "6.66",
        "Currency": "GBP"
	  },
	  "RecurringPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
	  "FinalPaymentDateTime": "1981-03-20T06:06:06+00:00",
	  "FinalPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Bob Clements"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "PartyToParty"
  }
}
```

##### POST /domestic-standing-order-consents response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
	"ConsentId": "SOC-100",
	"CreationDateTime": "1976-01-01T06:06:06+00:00",
	"Status": "AwaitingAuthorisation",
	"StatusUpdateDateTime": "1976-06-06T06:06:06+00:00",
	"Permission": "Create",
    "Initiation": {
	  "Frequency": "EvryDay",
	  "Reference": "Pocket money for Damien",
	  "FirstPaymentDateTime": "1976-06-06T06:06:06+00:00",
	  "FirstPaymentAmount": {
        "Amount": "6.66",
        "Currency": "GBP"
	  },
	  "RecurringPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
	  "FinalPaymentDateTime": "1981-03-20T06:06:06+00:00",
	  "FinalPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Bob Clements"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "PartyToParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-standing-order-consents/SOC-100"
  },
  "Meta": {}
}

```
### Create a Domestic Standing Order

#### POST /domestic-standing-orders request

```
POST /domestic-standing-orders HTTP/1.1
Authorization: Bearer eYJQLMQLMQLM
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
	"ConsentId": "SOC-100",
    "Initiation": {
	  "Frequency": "EvryDay",
	  "Reference": "Pocket money for Damien",
	  "FirstPaymentDateTime": "1976-06-06T06:06:06+00:00",
	  "FirstPaymentAmount": {
        "Amount": "6.66",
        "Currency": "GBP"
	  },
	  "RecurringPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
	  "FinalPaymentDateTime": "1981-03-20T06:06:06+00:00",
	  "FinalPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Bob Clements"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "PartyToParty"
  }
}

```

#### POST /domestic-standing-orders response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
	"DomesticStandingOrderId": "SO-SOC-100",
	"ConsentId": "SOC-100",
	"CreationDateTime": "1976-01-01T06:06:06+00:00",
	"Status": "InitiationCompleted",
	"StatusUpdateDateTime": "1976-06-06T06:06:06+00:00",
    "Initiation": {
	  "Frequency": "EvryDay",
	  "Reference": "Pocket money for Damien",
	  "FirstPaymentDateTime": "1976-06-06T06:06:06+00:00",
	  "FirstPaymentAmount": {
        "Amount": "6.66",
        "Currency": "GBP"
	  },
	  "RecurringPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
	  "FinalPaymentDateTime": "1981-03-20T06:06:06+00:00",
	  "FinalPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Bob Clements"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "PartyToParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-standing-orders/SO-SOC-100"
  },
  "Meta": {}
}
```

### Get a Domestic Standing Order Consent

#### GET /domestic-standing-order-consents/{ConsentId}

```
GET /domestic-standing-order-consents/SOC-100 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### GET /domestic-standing-order-consents response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
	"ConsentId": "SOC-100",
	"CreationDateTime": "1976-01-01T06:06:06+00:00",
	"Status": "Authorised",
	"StatusUpdateDateTime": "1976-06-06T06:06:06+00:00",
	"Permission": "Create",
    "Initiation": {
	  "Frequency": "EvryDay",
	  "Reference": "Pocket money for Damien",
	  "FirstPaymentDateTime": "1976-06-06T06:06:06+00:00",
	  "FirstPaymentAmount": {
        "Amount": "6.66",
        "Currency": "GBP"
	  },
	  "RecurringPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
	  "FinalPaymentDateTime": "1981-03-20T06:06:06+00:00",
	  "FinalPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Bob Clements"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "PartyToParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-standing-order-consents/SOC-100"
  },
  "Meta": {}
}
```