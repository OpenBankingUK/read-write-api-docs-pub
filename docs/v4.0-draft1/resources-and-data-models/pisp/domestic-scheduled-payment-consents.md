# Domestic Scheduled Payment Consents  - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /domestic-scheduled-payment-consents](#post-domestic-scheduled-payment-consents)
    - [StatusCode](#statuscode)
  - [GET /domestic-scheduled-payment-consents/{ConsentId}](#get-domestic-scheduled-payment-consents-consentid)
    - [StatusCode](#statuscode-2)
  - [State Model](#state-model)
    - [Payment Order Consent](#payment-order-consent)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBDomesticScheduled2](#obdomesticscheduled2)
      - [UML Diagram](#uml-diagram)
      - [Notes](#notes)
      - [Data Dictionary](#data-dictionary)
  - [Domestic Scheduled Payment Consent - Request](#domestic-scheduled-payment-consent-request)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [Domestic Scheduled Payment Consent - Response](#domestic-scheduled-payment-consent-response)
    - [UML Diagram](#uml-diagram-3)
    - [Notes](#notes-3)
    - [Data Dictionary](#data-dictionary-3)
- [Usage Examples](#usage-examples)
    - [Create a Domestic Scheduled Payment Consent](#create-a-domestic-scheduled-payment-consent)
      - [POST /domestic-scheduled-payment-consents Request](#post-domestic-scheduled-payment-consents-request)
      - [POST /domestic-scheduled-payment-consents Response](#post-domestic-scheduled-payment-consents-response)

## Overview

The Domestic Scheduled Payment Consent resource is used by a PISP to register an intent to initiate a Domestic Scheduled Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-scheduled-payment-consents |POST |POST /domestic-scheduled-payment-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteDomesticScheduledConsent4 |OBWriteDomesticScheduledConsentResponse5 |
| domestic-scheduled-payment-consents |GET |GET /domestic-scheduled-payment-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticScheduledConsentResponse5 |

### POST /domestic-scheduled-payment-consents

The API endpoint allows the PISP to ask an ASPSP to create a new **domestic-scheduled-payment-consent** resource.

* The POST action indicates to the ASPSP that a domestic scheduled payment consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **domestic-scheduled-payment-consent** resource and responds with a unique ConsentId to refer to the resource.

#### StatusCode

* The default StatusCode is "AWAU" immediately after the domestic-scheduled-payment-consent has been created.

| StatusCode |
| ------ |
| AWAU |

### GET /domestic-scheduled-payment-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status.

#### StatusCode

Once the PSU authorises the payment-consent resource, the StatusCode of the payment-consent resource will be updated with "AUTH".

If the PSU rejects the consent or the domestic-scheduled-payment-consent has failed some other ASPSP validation, the StatusCode will be set to "RJCT".

Once a domestic-scheduled-payment has been successfully created using the domestic-scheduled-payment-consent, the StatusCode of the domestic-scheduled-payment-consent will be set to "COND".

The available StatusCodes for the domestic-scheduled-payment-consent resource are:

| StatusCode |
| ------ |
| AWAU |
| RJCT |
| AUTH |
| COND |


### State Model

#### Payment Order Consent

The state model for the domestic-scheduled-payment-consent resource follows the generic consent state model. 

![State model](./images/PO_Consent.png)

The definitions for the StatusCode:
|  | StatusCode |Status Description |
| ---| ------ |------------------ |
| 1 |AWAU |The consent resource is awaiting PSU authorisation. |
| 2 |RJCT |The consent resource has been rejected. |
| 3 |AUTH |The consent resource has been successfully authorised. |
|4 |COND|The consented action has been successfully completed. This does not reflect the status of the consented action.|

Changes to the StatusCode, such as being rejected, should be captured in `StatusReason`, an array of `StatusReasonCode`, `StatusReasonDescription` and `Path`.  

| Field | Description |
|---|---|
| StatusReasonCode | Code directly relating to the reason for the current Status. See [the codelists](https://github.com/OpenBankingUK/External_Internal_CodeSets) for appropriate values. |
| StatusReasonDescription | Description of why the code was returned |
|Path| Recommended but optional reference to JSON path if relevant to the code |

## Data Model

The data dictionary section gives the detail on the payload content for the Domestic Scheduled Payment API flows.

### Reused Classes

#### OBDomesticScheduled2

This section describes the OBDomesticScheduled2 class which is reused as the Initiation object in the domestic-scheduled-payment-consent resource.

##### UML Diagram

![OBDomesticScheduled2](./images/OBDomesticScheduled2.svg)

##### Notes

For the OBDomesticScheduled2 Initiation object:  

* All elements in the Initiation payload that are specified by the PISP must not be changed via the ASPSP, as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the domestic-scheduled-payment-consent consent request immediately.
* If the ASPSP establishes a problem with the domestic-scheduled-payment-consent after the API call, the ASPSP must set the Status of the domestic-scheduled-payment-consent resource to Rejected.
* DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the domestic-scheduled-payment-consent will be set to Rejected after PSU authentication.
Account Identification field usage:
  * Where "UK.OB.SortCodeAccountNumber" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * Where the "UK.OB.IBAN" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the full IBAN.
  * Neither the InstructionIdentification nor EndToEndIdentification will be used as the domestic-payment-consent resource identifier (ConsentId) as the ConsentId **must** be uniquely generated by the ASPSP.
* Permission field is restricted to "Create", however, may be extended to "Update" and "Delete" in a future iteration of the specification.
* LocalInstrument is the requested payment scheme for execution. This is a free-text field.
* RequestedExecutionDateTime allows a PISP to specify the date for an ASPSP to execute the domestic scheduled payment.

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBDomesticScheduled2 | |OBDomesticScheduled2 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| InstructionIdentification |1..1 |OBDomesticScheduled2/InstructionIdentification |Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction. |Max35Text | | |
| EndToEndIdentification |0..1 |OBDomesticScheduled2/EndToEndIdentification |Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field. |Max35Text | | |
| LocalInstrument |0..1 |OBDomesticScheduled2/LocalInstrument |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code | | |
| RequestedExecutionDateTime |1..1 |OBDomesticScheduled2/RequestedExecutionDateTime |Date at which the initiating party requests the clearing agent to process the payment. Usage: This is the date on which the debtor's account is to be debited. |ISODateTime | | |
| InstructedAmount |1..1 |OBDomesticScheduled2/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticScheduled2/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBDomesticScheduled2/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DebtorAccount |0..1 |OBDomesticScheduled2/DebtorAccount |Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBDomesticScheduled2/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomesticScheduled2/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBDomesticScheduled2/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBDomesticScheduled2/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBDomesticScheduled2/DebtorAccount/Proxy |The external proxy account type |OBProxyAccount | | |
| Identification |1..1 |OBDomesticScheduled2/DebtorAccount/Proxy/Identification| Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Type |0..1 |OBDomesticScheduled2/DebtorAccount/Proxy/Type| Specifies the external proxy account type |MaxText70 | | |
| Code |1..1 |OBDomesticScheduled2/DebtorAccount/Proxy/Code| Specifies the external proxy account type code, as published in the proxy account type external code set.<br> For more information see `ExternalProxyAccountType1Code` [here](https:/github.com/OpenBankingUK/External_Internal_CodeSets) |OBExternalProxyAccountType1Code | | |
| Proprietary |1..1 |OBDomesticScheduled2/DebtorAccount/Proxy/Proprietary| The owner of the proxy account |MaxText70 | | |
| CreditorAccount |1..1 |OBDomesticScheduled2/CreditorAccount |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBDomesticScheduled2/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomesticScheduled2/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBDomesticScheduled2/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max350Text | | |
| SecondaryIdentification |0..1 |OBDomesticScheduled2/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBDomesticScheduled2/CreditorAccount/Proxy |The external proxy account type |OBProxyAccount | | |
| Identification |1..1 |OBDomesticScheduled2/CreditorAccount/Proxy/Identification| Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Type |0..1 |OBDomesticScheduled2/CreditorAccount/Proxy/Type| Specifies the external proxy account type |MaxText70 | | |
| Code |1..1 |OBDomesticScheduled2/CreditorAccount/Proxy/Code| Specifies the external proxy account type code, as published in the proxy account type external code set.<br> For more information see `ExternalProxyAccountType1Code` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets) |OBExternalProxyAccountType1Code | | |
| Proprietary |1..1 |OBDomesticScheduled2/CreditorAccount/Proxy/Proprietary| The owner of the proxy account |MaxText70 | | |
| CreditorPostalAddress |0..1 |OBDomesticScheduled2/CreditorPostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBDomesticScheduled2/CreditorPostalAddress/AddressType |BIZZ<br>DLVY<br>MLTO<br>PBOX<br>ADDR<br>HOME<br>CORR<br>STAT | ||
| Department |0..1 |OBDomesticScheduled2/CreditorPostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBDomesticScheduled2/CreditorPostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBDomesticScheduled2/CreditorPostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBDomesticScheduled2/CreditorPostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| BuildingName |0..1 |OBDomesticScheduled2/CreditorPostalAddress/BuildingName |Name of a referenced building. |Max70Text | | |
| Floor |0..1 |OBDomesticScheduled2/CreditorPostalAddress/Floor|Number that identifies the level within a building. |Max16Text | | |
| UnitNumber|0..1 |OBDomesticScheduled2/CreditorPostalAddress/UnitNumber|Number that identifies the unit of a specific address |Max16Text | | |
| Room |0..1 |OBDomesticScheduled2/CreditorPostalAddress/Room|Information that locates and identifies a room to form part of an address. |Max70Text | | |
| TownLocationName |0..1 |OBDomesticScheduled2/CreditorPostalAddress/TownLocationName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| DistrictName |0..1 |OBDomesticScheduled2/CreditorPostalAddress/DistrictName |Number that of the regional area, known as a district, which forms part of an address. |Max35Text | | |
| CareOf |0..1 |OBDomesticScheduled2/CreditorPostalAddress/CareOf |The 'care of' address is used whenever sending mail to a person or organisation who does not actually live or work at the address. They will receive the mail for the individual. |Max70Text | | |
| PostCode |0..1 |OBDomesticScheduled2/CreditorPostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBDomesticScheduled2/CreditorPostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBDomesticScheduled2/CreditorPostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBDomesticScheduled2/CreditorPostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBDomesticScheduled2/CreditorPostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | | |
| RemittanceInformation |0..1 |OBDomesticScheduled2/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation1 | | |
| Structured |0..* |OBDomesticScheduled2/RemittanceInformation/Structured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an structured form. |OBRemittanceInformationStructured | | |
| ReferredDocumentInformation |0..* |OBDomesticScheduled2/RemittanceInformation/Structured/ReferredDocumentInformation | |OBReferredDocumentInformation | | |
| ReferredDocumentAmount |0..1 |OBDomesticScheduled2/RemittanceInformation/Structured/ReferredDocumentAmount | |OBReferredDocumentAmount| | |
| CreditorReferenceInformation |0..1 |OBDomesticScheduled2/CreditorReferenceInformation/Structured/ReferredDocumentAmount | |OBCreditorReferenceInformation| | |
| Invoicer |0..1 |OBDomesticScheduled2/CreditorReferenceInformation/Structured/Invoicer | |OBInvoicer| | |
| Invoicee |0..1 |OBDomesticScheduled2/CreditorReferenceInformation/Structured/Invoicee | |OBInvoicee| | |
| TaxRemittance |0..1 |OBDomesticScheduled2/CreditorReferenceInformation/Structured/TaxRemittance | |OBTaxRemittance| | |
| AdditionalRemittanceInformation |0..3|OBDomesticScheduled2/CreditorReferenceInformation/Structured/AdditionalRemittanceInformation | |OBAdditionalRemittanceInformation| | |
| Unstructured |0..* |OBDomesticScheduled2/RemittanceInformation/Unstructured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text | | 
| SupplementaryData |0..1 |OBDomesticScheduled2/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |
| RegulatoryReporting |0..10 |OBDomesticScheduled2/RegulatoryReporting |Information needed due to regulatory and statutory requirements. |RegulatoryReporting3 | | |
| DebitCreditReportingIndicator |0..1 |OBDomesticScheduled2/RegulatoryReporting/DebitCreditReportingIndicator | Identifies whether the regulatory reporting information applies to the debit side, to the credit side or to both debit and credit sides of the transaction. |RegulatoryReportingType1Code |CRED DEBT BOTH | |
| Authority |0..1 |OBDomesticScheduled2/RegulatoryReporting/Authority |Entity requiring the regulatory reporting information. |RegulatoryAuthority2 | | |
| Name |0..1 |OBDomesticScheduled2/RegulatoryReporting/Authority/Name |Name of the entity requiring the regulatory reporting information. |Max140Text | | |
| Country |0..1 |OBDomesticScheduled2/RegulatoryReporting/Authority/Country |Country of the entity that requires the regulatory reporting information. |CountryCode | | |
| Details |0..* |OBDomesticScheduled2/RegulatoryReporting/Details |Set of elements used to provide details on the regulatory reporting information. |StructuredRegulatoryReporting3 | | |
| Type |0..1 |OBDomesticScheduled2/RegulatoryReporting/Details/Type |Specifies the type of the information supplied in the regulatory reporting details. |Max35Text | | |
| Date |0..1 |OBDomesticScheduled2/RegulatoryReporting/Details/Date |Date related to the specified type of regulatory reporting details. |ISODateTime | | |
| Country |0..1 |OBDomesticScheduled2/RegulatoryReporting/Details/Country |Country related to the specified type of regulatory reporting details. |CountryCode | | ^[A-Z]{2,2}$ |
| Code |0..1 |OBDomesticScheduled2/RegulatoryReporting/Details/Code |Specifies the nature, purpose, and reason for the transaction to be reported for regulatory and statutory requirements in a coded form. |Max10Text | | |
| Amount |0..1 |OBDomesticScheduled2/RegulatoryReporting/Details/Amount |Amount of money to be reported for regulatory and statutory requirements. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticScheduled2/RegulatoryReporting/Details/Amount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. | | | |
| Currency |1..1 |OBDomesticScheduled2/RegulatoryReporting/Details/Amount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | | ^[A-Z]{3,3}$ |
| Information |0..* |OBDomesticScheduled2/RegulatoryReporting/Details/Information |Additional details that cater for specific domestic regulatory requirements. |Max35Text | | |
| UltimateCreditor |0..1 |OBDomesticScheduled2/UltimateCreditor|Set of elements used to identify a person or an organisation. | OBPartyIdentification43 | | |
| SchemeName |0..1 |OBDomesticScheduled2/UltimateCreditor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBDomesticScheduled2/UltimateCreditor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBDomesticScheduled2/UltimateCreditor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| LEI |0..1 | OBDomesticScheduled2/UltimateCreditor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
| UltimateDebtor |0..1 |OBDomesticScheduled2/UltimateDebtor|Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBDomesticScheduled2/UltimateDebtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBDomesticScheduled2/UltimateDebtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBDomesticScheduled2/UltimateDebtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| LEI |0..1 | OBDomesticScheduled2/UltimateDebtor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |

### Domestic Scheduled Payment Consent - Request

The OBWriteDomesticScheduledConsent4 object will be used for the call to:

* POST /domestic-scheduled-payment-consents

#### UML Diagram

![Domestic Scheduled Payment Consent - Request](./images/OBWriteDomesticScheduledConsent4.svg)

#### Notes

The domestic-scheduled-payment-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticScheduledConsent4 | |OBWriteDomesticScheduledConsent4 | |OBWriteDomesticScheduledConsent4 | | |
| Data |1..1 |OBWriteDomesticScheduledConsent4/Data | |OBWriteDataDomesticScheduledConsent4 | | |
| Permission |1..1 |OBWriteDomesticScheduledConsent4/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| ReadRefundAccount |0..1 |OBWriteDomesticScheduledConsent4/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
| Initiation |1..1 |OBWriteDomesticScheduledConsent4/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| Authorisation |0..1 |OBWriteDomesticScheduledConsent4/Data/Authorisation |Type of authorisation flow requested. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticScheduledConsent4/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteDomesticScheduledConsent4/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Scheduled Payment Consent - Response

The OBWriteDomesticScheduledConsentResponse5 object will be used for a response to a call to:

* POST /domestic-scheduled-payment-consents
* GET /domestic-scheduled-payment-consents/{ConsentId}

#### UML Diagram

![Domestic Scheduled Payment Consent - Response](./images/OBWriteDomesticScheduledConsentResponse5.svg)

#### Notes

The domestic-scheduled-payment-consent **response** contains the full **original** payload from the domestic-scheduled-payment-consent **request** with these additional elements:

* ConsentId.
* CreationDateTime the domestic-scheduled-payment-consent resource was created.
* StatusCode, StatusReason and StatusUpdateDateTime of the domestic-scheduled-payment-consent resource.
* Permission field in the original request.
* ReadRefundAccount field in the original request.
* CutOffDateTime Behaviour is explained in the Payment Initiation API Profile, Section - [Payment Restrictions -> CutOffDateTime Behaviour](../../profiles/payment-initiation-api-profile.md#cutoffdatetime-behaviour).
* ExpectedExecutionDateTime for the domestic-scheduled-payment resource if created before CutOffDateTIme - the expected DateTime the payment is executed against the Debtor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* ExpectedSettlementDateTime for the domestic-scheduled-payment resource if created before CutOffDateTIme - the expected DateTime the payment will be received at the Creditor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* Charges array - for the breakdown of applicable ASPSP charges.
* Post successful PSU Authentication, an ASPSP may provide `Debtor/Name` in the Payment Order Consent Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticScheduledConsentResponse5 | |OBWriteDomesticScheduledConsentResponse5 | |OBWriteDomesticScheduledConsentResponse5 | | |
| Data |1..1 |OBWriteDomesticScheduledConsentResponse5/Data | |OBWriteDataDomesticScheduledConsentResponse5 | | |
| ConsentId |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| StatusCode |0..1 |OBReadConsentResponse1/Data/StatusCode |Specifies the status of consent resource in code form. |
ExternalStatusReason1Code |AUTH AWAU RJCT COND |
| StatusReason |0..* |OBReadConsentResponse1/Data/StatusReason |Specifies the status reason. | OBStatusReason |
| StatusReasonCode |0..1 |OBReadConsentResponse1/Data/StatusReason/*/StatusReasonCode |Specifies the status reason in a code form. For a full description see `ExternalStatusReason1Code` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). | ExternalStatusReason1Code |
| StatusReasonDescription |0..1 |OBReadConsentResponse1/Data/StatusReason/*/StatusReasonDescription |Description supporting the StatusReasonCode. |
| StatusUpdateDateTime |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/StatusUpdateDateTime |Date and time at which the consent resource status was updated. |ISODateTime | | |
| Permission |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| ReadRefundAccount |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | 
| CutOffDateTime |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..n |OBWriteDomesticScheduledConsentResponse5/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| Authorisation |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Authorisation |Type of authorisation flow requested. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| LEI |0..1 | OBWriteDomesticScheduledConsentResponse5/Data/Debtor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
| Risk |1..1 |OBWriteDomesticScheduledConsentResponse5/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

## Usage Examples

#### Create a Domestic Scheduled Payment Consent

##### POST /domestic-scheduled-payment-consents Request

```
POST /domestic-scheduled-payment-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature:
TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
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
      "InstructionIdentification": "89f0a53a91ee47f6a383536f851d6b5a",
      "RequestedExecutionDateTime": "2018-08-06T00:00:00+00:00",
      "InstructedAmount": {
        "Amount": "200.00",
        "Currency": "GBP"
      },
      "DebtorAccount": {
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Tom Kirkman"
      },
      "RemittanceInformation": {
        "Unstructured": "Internal ops code 5120103"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  }
}
```

##### POST /domestic-scheduled-payment-consents Response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "7290",
    "Permission": "Create",
    "ReadRefundAccount": "Yes",
    "StatusCode": "AWAU",
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
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Tom Kirkman"
      },
      "RemittanceInformation": {
        "Unstructured": "Internal ops code 5120103"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-scheduled-payment-consents/7290"
  },
  "Meta": {}
}
```
