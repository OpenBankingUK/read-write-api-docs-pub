# Domestic Standing Order Consents - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /domestic-standing-order-consents](#post-domestic-standing-order-consents)
    - [Status](#status)
  - [GET /domestic-standing-order-consents/{ConsentId}](#get-domestic-standing-order-consents-consentid)
    - [Status](#status-2)
  - [State Model](#state-model)
    - [Payment Order Consent](#payment-order-consent)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBDomesticStandingOrder3](#obdomesticstandingorder3)
      - [UML Diagram](#uml-diagram)
      - [Notes](#notes)
        - [Frequency Examples](#frequency-examples)
      - [Data Dictionary](#data-dictionary)
  - [Domestic Standing Order Consent - Request](#domestic-standing-order-consent-request)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [Domestic Standing Order Consent - Response](#domestic-standing-order-consent-response)
    - [UML Diagram](#uml-diagram-3)
    - [Notes](#notes-3)
    - [Data Dictionary](#data-dictionary-3)
- [Usage Examples](#usage-examples)
    - [Create Domestic Standing Order Consent](#create-domestic-standing-order-consent)
      - [POST /domestic-standing-order-consents](#post-domestic-standing-order-consents-2)
      - [POST /domestic-standing-order-consents response](#post-domestic-standing-order-consents-response)
  - [Get a Domestic Standing Order Consent](#get-a-domestic-standing-order-consent)
    - [GET /domestic-standing-order-consents/{ConsentId}](#get-domestic-standing-order-consents-consentid-2)
    - [GET /domestic-standing-order-consents response](#get-domestic-standing-order-consents-response)

## Overview

The Domestic Standing Order Consent resource is used by a PISP to register an intent to initiate a Domestic Standing Order.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-standing-order-consents |POST |POST /domestic-standing-order-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteDomesticStandingOrderConsent5 |OBWriteDomesticStandingOrderConsentResponse6 |
| domestic-standing-order-consents |GET |GET /domestic-standing-order-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticStandingOrderConsentResponse6 |

### POST /domestic-standing-order-consents

The API endpoint allows the PISP to ask an ASPSP to create a new **domestic-standing-order-consent** resource.

* The POST action indicates to the ASPSP that a domestic standing order consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **domestic-standing-order-consent** resource and responds with a unique ConsentId to refer to the resource.

#### Status

The default Status is "AWAU" immediately after the domestic-standing-order-consent has been created.

| Status |
| --- |
| AWAU |

### GET /domestic-standing-order-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status.

#### Status

Once the PSU authorises the payment-consent resource , the Status of the payment-consent resource will be updated with "AUTH".

If the PSU rejects the consent or the domestic-standing-order-consent has failed some other ASPSP validation, the Status will be set to "RJCT".

Once a domestic-standing-order has been successfully created using the domestic-standing-order-consent, the Status of the domestic-standing-order-consent will be set to "COND".

The available Status codes for the domestic-standing-order-consent resource are:

| StatusCode |
| --- |
| AWAU |
| RJCT |
| AUTH |
| COND |



### State Model

#### Payment Order Consent

The state model for the domestic-standing-order-consent resource follows the generic consent state model.

![State model](./images/PO_Consent.png)


The definitions for the Status:

|  |StatusCode |Status Description |
| --- |------ |------------------ |
| 1 |AWAU |The consent resource is awaiting PSU authorisation. |
| 2 |RJCT |The consent resource has been rejected. |
| 3 |AUTH |The consent resource has been successfully authorised. |
| 4 |COND |The consented action has been successfully completed. This does not reflect the status of the consented action. |

Changes to the StatusCode, such as being rejected, should be captured in `StatusReason`, an array of `StatusReasonCode`, `StatusReasonDescription` and `Path`.  

| Field | Description |
|---|---|
| StatusReasonCode | Code directly relating to the reason for the current Status. See [the codelists](https://github.com/OpenBankingUK/External_Interal_CodeSets) for appropriate values. |
| StatusReasonDescription | Description of why the code was returned |
|Path| Recommended but optional reference to JSON path if relevant to the code |
## Data Model

The Data Dictionary section gives the detail on the payload content for the Domestic Standing Order API flows.

### Reused Classes

#### OBDomesticStandingOrder3

This section describes the OBDomesticStandingOrder3 class, which is reused as the Initiation object in the domestic-standing-order-consent resource.

##### UML Diagram

![Domestic Standing Order](./images/OBDomesticStandingOrder3.svg)

##### Notes

For the OBDomesticStandingOrder3 Initiation object: 

* All elements in the Initiation payload that are specified by the PISP must not be changed via the ASPSP, as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the domestic-standing-order-consent request immediately.
* If the ASPSP establishes a problem with the domestic-standing-order-consent after the API call, the ASPSP can set the Status of the domestic-standing-order-consent resource to Rejected
* DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the domestic-standing-order-consent will be set to Rejected after PSU authentication.
* Account Identification field usage:
  * Where "UK.OB.SortCodeAccountNumber" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * Where the "UK.OB.IBAN" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the full IBAN.
* The Permission field is restricted to "Create", however, may be extended to "Update" and "Delete" in a future iteration of the specification.
* Either the NumberOfPayments or FinalPaymentDateTime must be specified (not both) if the domestic standing order is not open ended.
* The structure allows a PISP to specify a domestic standing order with a different payment amount and date combinations: for the first payment, the recurring payment, and the final payment. The recurring payment (and date) must only be populated if different from the first payment (and date).
* If the PISP requests a Frequency that is not supported by the ASPSP the ASPSP **must** respond with a 400 HTTP status code.

###### Frequency Examples

|Frequency|Detail|
|---|---|
|ADHO| Adhoc|
|INDA| Intra day|
|DAIL| Daily|
|WEEK| Weekly|
|FRTN| Fortnightly|
|MNTH| Monthy|
|QURT| Quarterly|
|MIAN| Semi Annual|
|YEAR| Annual|


##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBDomesticStandingOrder3 | |OBDomesticStandingOrder3 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| MandateRelatedInformation | 0..1 |OBDomesticStandingOrder3/MandateRelatedInformation ||OBMandateRelatedInformation | | |
| MandateIdentification | 0..1 |OBDomesticStandingOrder3/MandateRelatedInformation/MandateIdentification ||Max35Text | | |
| Classification | 0..1 |OBDomesticStandingOrder3/MandateRelatedInformation/Classification|FIXE<br>USGB<br>VARI|OBClassification1Code | | |
| CategoryPurposeCode | 0..1 |OBDomesticStandingOrder3/MandateRelatedInformation/CategoryPurposeCode ||OBCategoryPurpose1Code | | |
| FirstPaymentDate | 0..1 |OBDomesticStandingOrder3/MandateRelatedInformation/FirstPaymentDate |The date on which the first payment for a Standing Order schedule will be made. |ISODate | | |
| FinalPaymentDate | 0..1 |OBDomesticStandingOrder3/MandateRelatedInformation/FinalPaymentDate |The date on which the final payment for a Standing Order schedule will be made. |ISODate | | |
| Frequency | 0..1 |OBDomesticStandingOrder3/MandateRelatedInformation/Frequency |A code indicating the frequency of payment for the Standing Order. Values:<br>ADHO<br>YEAR<br>DALI<br>INDA<br>MNTH<br>QURT<br>MIAN<br>WEEK |OBFrequencyPeriodType | | |
| PeriodType | 1..1 |OBDomesticStandingOrder3/MandateRelatedInformation/PeriodType |A code indicating the period type for the Standing Order. Values:<br>ADHO<br>YEAR<br>DALI<br>INDA<br>MNTH<br>QURT<br>MIAN<br>WEEK |OBFrequencyPeriodType | | |
| CountPerPeriod | 1..1 |OBDomesticStandingOrder3/MandateRelatedInformation/CountPerPeriod | |int32 | |
| PointInTimeType | 1..1 |OBDomesticStandingOrder3/MandateRelatedInformation/PointInTimeType |A code indicating the point in time for payment of the Standing Order. Values:<br>ADHO<br>YEAR<br>DALI<br>INDA<br>MNTH<br>QURT<br>MIAN<br>WEEK |OBFrequencyPeriodType | | |
| PointInTime | 1..1 |OBDomesticStandingOrder3/MandateRelatedInformation/PointInTime |ISODateTime | | |
| Reason| 0..1 |OBDomesticStandingOrder3/MandateRelatedInformation/Reason | |Max256Text | |
| RemittanceInformation |0..1 |OBDomesticStandingOrder3/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation1 | | |
| Structured |0..* |OBDomesticStandingOrder3/RemittanceInformation/Structured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an structured form. |OBRemittanceInformationStructured | | |
| ReferredDocumentInformation |0..* |OBDomesticStandingOrder3/RemittanceInformation/Structured/ReferredDocumentInformation | |OBReferredDocumentInformation | | |
| ReferredDocumentAmount |0..1 |OBDomesticStandingOrder3/RemittanceInformation/Structured/ReferredDocumentAmount | |OBReferredDocumentAmount| | |
| CreditorReferenceInformation |0..1 |OBDomesticStandingOrder3/CreditorReferenceInformation/Structured/ReferredDocumentAmount | |OBCreditorReferenceInformation| | |
| Invoicer |0..1 |OBDomesticStandingOrder3/CreditorReferenceInformation/Structured/Invoicer | |OBInvoicer| | |
| Invoicee |0..1 |OBDomesticStandingOrder3/CreditorReferenceInformation/Structured/Invoicee | |OBInvoicee| | |
| TaxRemittance |0..1 |OBDomesticStandingOrder3/CreditorReferenceInformation/Structured/TaxRemittance | |OBTaxRemittance| | |
| AdditionalRemittanceInformation |0..3|OBDomesticStandingOrder3/CreditorReferenceInformation/Structured/AdditionalRemittanceInformation | |OBAdditionalRemittanceInformation| | |
| Unstructured |0..* |OBDomesticStandingOrder3/RemittanceInformation/Unstructured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text | | |
| NumberOfPayments |0..1 |OBDomesticStandingOrder3/NumberOfPayments |Number of the payments that will be made in completing this frequency sequence including any executed since the sequence start date. |Max35Text | | |
| RecurringPaymentDateTime |0..1 |OBDomesticStandingOrder3/RecurringPaymentDateTime |The date on which the first recurring payment for a Standing Order schedule will be made. Usage: This must be populated only if the first recurring date is different to the first payment date. |ISODateTime | | |
| Amount |1..1 |OBDomesticStandingOrder3/FirstPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBDomesticStandingOrder3/FirstPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| RecurringPaymentAmount |0..1 |OBDomesticStandingOrder3/RecurringPaymentAmount |The amount of the recurring Standing Order |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticStandingOrder3/RecurringPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBDomesticStandingOrder3/RecurringPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| FinalPaymentAmount |0..1 |OBDomesticStandingOrder3/FinalPaymentAmount |The amount of the final Standing Order |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticStandingOrder3/FinalPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBDomesticStandingOrder3/FinalPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DebtorAccount |0..1 |OBDomesticStandingOrder3/DebtorAccount |Provides the details to identify the debtor account. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBDomesticStandingOrder3/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomesticStandingOrder3/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBDomesticStandingOrder3/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBDomesticStandingOrder3/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBDomesticStandingOrder3/DebtorAccount/Proxy |The external proxy account type |OBProxyAccount | | |
| Identification |1..1 |OBDomesticStandingOrder3/DebtorAccount/Proxy/Identification| Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Type |0..1 |OBDomesticStandingOrder3/DebtorAccount/Proxy/Type| Specifies the external proxy account type |MaxText70 | | |
| Code |1..1 |OBDomesticStandingOrder3/DebtorAccount/Proxy/Code| Specifies the external proxy account type code, as published in the proxy account type external code set.<br> For more information see `ExternalProxyAccountType1Code` [here](https:/github.com/OpenBankingUK/External_Interal_CodeSets) |OBExternalProxyAccountType1Code | | |
| Proprietary |1..1 |OBDomesticStandingOrder3/DebtorAccount/Proxy/Proprietary| The owner of the proxy account |MaxText70 | | |
| CreditorAccount |1..1 |OBDomesticStandingOrder3/CreditorAccount |Identification assigned by an institution to identify an account. This identification is known by the account owner. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBDomesticStandingOrder3/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomesticStandingOrder3/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBDomesticStandingOrder3/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max350Text | | |
| Proxy |0..1 |OBDomesticStandingOrder3/CreditorAccount/Proxy |The external proxy account type |OBProxyAccount | | |
| Identification |1..1 |OBDomesticStandingOrder3/CreditorAccount/Proxy/Identification| Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Type |0..1 |OBDomesticStandingOrder3/CreditorAccount/Proxy/Type| Specifies the external proxy account type |MaxText70 | | |
| Code |1..1 |OBDomesticStandingOrder3/CreditorAccount/Proxy/Code| Specifies the external proxy account type code, as published in the proxy account type external code set.<br> For more information see `ExternalProxyAccountType1Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets) |OBExternalProxyAccountType1Code | | |
| Proprietary |1..1 |OBDomesticStandingOrder3/CreditorAccount/Proxy/Proprietary| The owner of the proxy account |MaxText70 | | |
| SecondaryIdentification |0..1 |OBDomesticStandingOrder3/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| SupplementaryData |0..1 |OBDomesticStandingOrder3/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |
| UltimateCreditor |0..1 |OBDomesticStandingOrder3/UltimateCreditor|Set of elements used to identify a person or an organisation. | OBPartyIdentification43 | | |
| SchemeName |0..1 |OBDomesticStandingOrder3/UltimateCreditor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBDomesticStandingOrder3/UltimateCreditor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBDomesticStandingOrder3/UltimateCreditor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| LEI |0..1 | OBDomesticStandingOrder3/UltimateCreditor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
| UltimateDebtor |0..1 |OBDomesticStandingOrder3/UltimateDebtor|Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBDomesticStandingOrder3/UltimateDebtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBDomesticStandingOrder3/UltimateDebtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBDomesticStandingOrder3/UltimateDebtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| LEI |0..1 | OBDomesticStandingOrder3/UltimateDebtor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |

### Domestic Standing Order Consent - Request

The OBWriteDomesticStandingOrderConsent5 object will be used for the call to:

* POST /domestic-standing-order-consents

#### UML Diagram

![Domestic Standing Order Consent - Request](./images/OBWriteDomesticStandingOrderConsent5.svg)

#### Notes

The domestic-standing-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticStandingOrderConsent5 | |OBWriteDomesticStandingOrderConsent5 | |OBWriteDomesticStandingOrderConsent5 | | |
| Data |1..1 |OBWriteDomesticStandingOrderConsent5/Data | |OBWriteDataDomesticStandingOrderConsent5 | | |
| Permission |1..1 |OBWriteDomesticStandingOrderConsent5/Data/Permission |Specifies the Open Banking service request types. 
| ReadRefundAccount |0..1 |OBWriteDomesticStandingOrderConsent5/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
|OBExternalPermissions2Code |Create | |
| Initiation |1..1 |OBWriteDomesticStandingOrderConsent5/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| Authorisation |0..1 |OBWriteDomesticStandingOrderConsent5/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticStandingOrderConsent5/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteDomesticStandingOrderConsent5/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Standing Order Consent - Response

The OBWriteDomesticStandingOrderConsentResponse6 object will be used for a response to a call to:

* POST /domestic-standing-order-consents
* GET /domestic-standing-order-consents/{ConsentId}

#### UML Diagram

![Domestic Standing Order Consent - Response](./images/OBWriteDomesticStandingOrderConsentResponse6.svg)

#### Notes

The domestic-standing-order-consent **response** contains the full **original** payload from the domestic-standing-order-consent **request,** with the following additional elements:

* ConsentId.
* CreationDateTime the domestic-standing-order-consent resource was created.
* Status, StatusReason and StatusUpdateDateTime of the domestic-standing-order-consent resource.
* Permission field in the original request.
* ReadRefundAccount field in the original request.
* CutOffDateTime Behaviour is explained in Payment Initiation API Profile, Section - [Payment Restrictions -> CutOffDateTime Behaviour](../../profiles/payment-initiation-api-profile.md#cutoffdatetime-behaviour).
* Charges array - for the breakdown of applicable ASPSP charges.
* Post successful PSU Authentication, an ASPSP may provide `Debtor/Name` in the Payment Order Consent Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticStandingOrderConsentResponse6 | |OBWriteDomesticStandingOrderConsentResponse6 | |OBWriteDomesticStandingOrderConsentResponse6 | | |
| Data |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data | |OBWriteDataDomesticStandingOrderConsentResponse6 | | |
| ConsentId |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| StatusCode |0..1 |OBReadConsentResponse1/Data/StatusCode |Specifies the status of consent resource in code form. |
ExternalStatusReason1Code |AUTH AWAU RJCT COND |
| StatusReason |0..* |OBReadConsentResponse1/Data/StatusReason |Specifies the status reason. | OBStatusReason |
| StatusReasonCode |0..1 |OBReadConsentResponse1/Data/StatusReason/*/StatusReasonCode |Specifies the status reason in a code form. For a full description see `ExternalStatusReason1Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets). | ExternalStatusReason1Code |
| StatusReasonDescription |0..1 |OBReadConsentResponse1/Data/StatusReason/*/StatusReasonDescription |Description supporting the StatusReasonCode. |
| StatusUpdateDateTime |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| Permission |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| ReadRefundAccount |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
| CutOffDateTime |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| Charges |0..n |OBWriteDomesticStandingOrderConsentResponse6/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| Authorisation |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| LEI |0..1 | OBWriteDomesticStandingOrderConsentResponse6/Data/Debtor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
| Risk |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

## Usage Examples

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
  "ReadRefundAccount": "Yes",
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
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Bob Clements"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
	"StatusCode": "AWAU",
	"StatusUpdateDateTime": "1976-06-06T06:06:06+00:00",
	"Permission": "Create",
  "ReadRefundAccount": "Yes",
    "Initiation": {
	  "MandateRelatedInformation": {
      "Frequency": "DAIL"
    }
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
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Bob Clements"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-standing-order-consents/SOC-100"
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
	"StatusCode": "AUTH",
	"StatusUpdateDateTime": "1976-06-06T06:06:06+00:00",
	"Permission": "Create",
    "Initiation": {
      "MandateRelatedInformation": {
        "Frequency": "DAIL",
        "PeriodType": "DAIL",
        "FirstPaymentDate": "1976-06-06",
        "LastPaymentDate": "1981-03-20",
        "CountPerPeriod": 1,
        "PointInTimeType": "DAIL",
        "PointInTime": "T06:06:06+00:00"
      },
	  "Reference": "Pocket money for Damien",
	  "FirstPaymentAmount": {
        "Amount": "6.66",
        "Currency": "GBP"
	  },
	  "RecurringPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
	  "FinalPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
      "DebtorAccount": {
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Bob Clements"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-standing-order-consents/SOC-100"
  },
  "Meta": {}
}
```
