# International Standing Order Consents - v4.0.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /international-standing-order-consents](#post-international-standing-order-consents)
    - [Status](#status)
  - [GET /international-standing-order-consents/{ConsentId}](#get-international-standing-order-consents-consentid)
    - [Status](#status-2)
  - [State Model](#state-model)
    - [Payment Order Consent](#payment-order-consent)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBRemittanceInformation2](#obremittanceinformation2)
    - [OBMandateRelatedInformation1](#obmandaterelatedinformation1)
    - [OBRegulatoryReporting1](#obregulatoryreporting1)
    - [OBUltimateCreditor1](#obultimatecreditor1)
    - [OBUltimateDebtor1](#obultimatedebtor1)
    - [OBPostalAddress7](#obpostaladdress7)
    - [OBProxy1](#obproxy1)
    - [OBInternationalStandingOrder4](#obinternationalstandingorder4)
      - [UML Diagram](#uml-diagram)
      - [Notes](#notes)
      - [Data Dictionary](#data-dictionary)
  - [International Standing Order Consent - Request](#international-standing-order-consent-request)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [International Standing Order Consent - Response](#international-standing-order-consent-response)
    - [UML Diagram](#uml-diagram-3)
    - [Notes](#notes-3)
    - [Data Dictionary](#data-dictionary-3)
- [Usage Examples](#usage-examples)
    - [POST /international-standing-order-consents](#post-international-standing-order-consents-2)
      - [Request](#request)
      - [Response](#response)

## Overview

The International Standing Order Consent resource is used by a PISP to register an intent to initiate an International Standing Order.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| international-standing-order-consents |POST |POST /international-standing-order-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteInternationalStandingOrderConsent6 |OBWriteInternationalStandingOrderConsentResponse7 |
| international-standing-order-consents |GET |GET /international-standing-order-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteInternationalStandingOrderConsentResponse7 |

### POST /international-standing-order-consents

The API endpoint allows the PISP to ask an ASPSP to create a new **international-standing-order-consent** resource.

* The POST action indicates to the ASPSP that an international standing order consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **international-standing-order-consent** resource and responds with a unique ConsentId to refer to the resource.

#### Status

The default Status is "AWAU" immediately after the international-standing-order-consent has been created.

| Status |
| --- |
| AWAU |


### GET /international-standing-order-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status. 

Refer to [External_Internal_CodeSets](https://github.com/OpenBankingUK/External_Internal_CodeSets) -> OB_Internal_CodeSet -> `OBInternalPermissions1Code`.

#### Status

Once the PSU authorises the payment-consent resource - the Status of the payment-consent resource will be updated with "AUTH".

If the PSU rejects the consent or the international-standing-order-consent has failed some other ASPSP validation, the Status will be set to "RJCT".

Once an international-standing-orders has been successfully created using the international-standing-order-consent, the Status of the international-standing-order-consent will be set to "COND".

The available StatusCodes for the international-standing-order-consent resource are:

| Status |
| --- |
| AWAU |
| RJCT |
| AUTH |
| COND |

### State Model

#### Payment Order Consent

The state model for the international-standing-order-consent resource follows the generic consent state model. 

![State model](./images/PO_Consent.png)

The definitions for the Status:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AWAU |The consent resource is awaiting PSU authorisation. |
| 2 |RJCT |The consent resource has been rejected. |
| 3 |AUTH |The consent resource has been successfully authorised. |
| 4 |COND |The consented action has been successfully completed. This does not reflect the status of the consented action. |

Changes to the Status, such as being rejected, should be captured in `StatusReason`, an array of `StatusReasonCode`, `StatusReasonDescription` and `Path`.  

| Field | Description |
|---|---|
| StatusReasonCode | Specifies the status reason in a code form. For a full description see `OBExternalStatusReason1Code` in `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets) |
| StatusReasonDescription | Description of why the code was returned |
|Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path. |

## Data Model

The data dictionary section gives the detail on the payload content for the International Standing Order API flows.

### Reused Classes

#### OBRemittanceInformation2

The OBRemittanceInformation2 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obremittanceinformation2) page.

#### OBMandateRelatedInformation1

The OBMandateRelatedInformation1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obmandaterelatedinformation1) page.

#### OBRegulatoryReporting1

The OBRegulatoryReporting1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obregulatoryreporting1) page.

#### OBUltimateCreditor1

The OBUltimateCreditor1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obultimatecreditor1) page.


#### OBUltimateDebtor1 

The OBUltimateDebtor1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obultimatedebtor1) page.

#### OBPostalAddress7 

The OBPostalAddress7 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obpostaladdress7) page

#### OBProxy1

The OBProxy1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obproxy1) page.

#### OBInternationalStandingOrder4

This section describes the OBInternationalStandingOrder4 class which is reused as the Initiation object in the international-standing-order-consent resource.

##### UML Diagram

![ OBInternationalStandingOrder4 ](./images/OBInternationalStandingOrder4.svg )

##### Notes

For the OBInternationalStandingOrder4 Initiation object:

* All elements in the Initiation payload that are specified by the PISP must not be changed via the ASPSP - as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the international-standing-order-consent request immediately.
* If the ASPSP establishes a problem with the international-standing-order-consent after the API call, the ASPSP must set the Status of the international-standing-order-consent resource to RJCT.
* The DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the international-standing-order-consent will be set to RJCT after PSU authentication.
* The CreditorAgent must at least have either of the pairs provided: SchemeName and Identification, or Name and PostalAddress.
* Account Identification field usage:
  * SchemeName is a free-text field which will be populated with identification schemes an ASPSP accepts.
  * Identification is a field which is populated with the Identification of the account, using the valid identification scheme provided.
* Valid UK Account Identification SchemeName values include, but are not restricted to:
  * "UK.OBIE.SortCodeAccountNumber" - The Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * "UK.OBIE.IBAN" - The Identification field **must** be populated with the full IBAN.
  * "UK.OBIE.PAN" - The Identification field **must** be populated with the full PAN. A PAN may be an instrument (e.g., a debit card) linked to a payment account, and may not be the only PAN linked to the payment account.
* The InstructedAmount object **must** be populated with the desired Amount and Currency of transfer, regardless of the currency of the DebtorAccount. I.e., a PSU may wish to transfer 100EUR from a GBP DebtorAccount (InstructedAmount will be 100EUR), or 100GBP in EUR (the InstructedAmount will be 100GBP).
* The CurrencyOfTransfer **must** be used to specify the currency the funds will be transferred. I.e., a PSU may wish to transfer 100USD from a GBP DebtorAccount to a Rupee INR CreditorAccount in India.
* The ChargeBearer field is used by the PISP to indicate the bearer of charges. An ASPSP must Reject the Initiation request if the requested charge allocation cannot be fulfilled.
* Permission field is restricted to "Create", however, may be extended to "Update" and "Delete" in a future iteration of the specification.

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBInternationalStandingOrder4 | |OBInternationalStandingOrder4 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for an international standing order. |OBInternationalStandingOrder4 | | |
| MandateRelatedInformation | 0..1 |OBInternationalStandingOrder4/MandateRelatedInformation ||OBMandateRelatedInformation1 | | |
| RemittanceInformation |0..1 |OBInternationalStandingOrder4/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation2 | | |
| Purpose |0..1 |OBInternationalStandingOrder4/Purpose |Specifies the external purpose code in the format of character string with a maximum length of 4 characters. The list of valid codes is an external code list published separately. External code sets can be downloaded from www.iso20022.org. |OBExternalPurpose1Code1 | | |
| ChargeBearer |0..1 |OBInternationalStandingOrder4/ChargeBearer |Specifies which party/parties will bear the charges associated with the processing of the payment transaction. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalChargeBearerType1Code| |
| CurrencyOfTransfer |1..1 |OBInternationalStandingOrder4/CurrencyOfTransfer |Specifies the currency of the to be transferred amount, which is different from the currency of the debtor's account. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DestinationCountryCode |0..1 |OBInternationalStandingOrder4/DestinationCountryCode |Country in which Credit Account is domiciled. Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| InstructedAmount |1..1 |OBInternationalStandingOrder4/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBInternationalStandingOrder4/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBInternationalStandingOrder4/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DebtorAccount |0..1 |OBInternationalStandingOrder4/DebtorAccount |Provides the details to identify the debtor account. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBInternationalStandingOrder4/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |1..1 |OBInternationalStandingOrder4/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBInternationalStandingOrder4/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBInternationalStandingOrder4/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBInternationalStandingOrder4/DebtorAccount/Proxy |Specifies an alternate assumed name for the identification of the account.  |OBProxy1 | | |
| UltimateDebtor |0..1 |OBInternationalStandingOrder4/UltimateDebtor|Ultimate party that owes an amount of money to the (ultimate) creditor. |OBUltimateDebtor1 | | |
| Creditor |0..1 |OBInternationalStandingOrder4/Creditor |Party to which an amount of money is due. |OBPartyIdentification43 | | |
| Name |0..1 |OBInternationalStandingOrder4/Creditor/Name |Name by which a party is known and which is usually used to identify that party. |Max350Text | | |
| LEI |0..1 | OBInternationalStandingOrder4/Creditor/LEI |Legal Entity Identification Legal entity identification as an alternate identification for a party. Legal Entity Identifier is a code allocated to a party as described in ISO 17442 "Financial Services - Legal Entity Identifier (LEI)". |Max20Text | |^[A-Z0-9]{18,18}[0-9]{2,2}$ |
| PostalAddress |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress7 | | |
| UltimateCreditor |0..1 |OBInternationalStandingOrder4/UltimateCreditor|Ultimate party to which an amount of money is due. | OBUltimateCreditor1 | | |
| CreditorAgent |0..1 |OBInternationalStandingOrder4/CreditorAgent |Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account. This is the servicer of the beneficiary account. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBInternationalStandingOrder4/CreditorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |For a full list of enumeration values refer to `Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBInternalFinancialInstitutionIdentification4Co
| Identification |0..1 |OBInternationalStandingOrder4/CreditorAgent/Identification |Unique and unambiguous identification of the servicing institution. |Max35Text | | |
| Name |0..1 |OBInternationalStandingOrder4/CreditorAgent/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| LEI |0..1 | OBInternationalStandingOrder4/CreditorAgent/LEI |Legal Entity Identification Legal entity identification as an alternate identification for a party. Legal Entity Identifier is a code allocated to a party as described in ISO 17442 "Financial Services - Legal Entity Identifier (LEI)". |Max20Text | |^[A-Z0-9]{18,18}[0-9]{2,2}$ |
| PostalAddress |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress7 | | |
| CreditorAccount |1..1 |OBInternationalStandingOrder4/CreditorAccount |Provides the details to identify the beneficiary account. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBInternationalStandingOrder4/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |1..1 |OBInternationalStandingOrder4/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBInternationalStandingOrder4/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max350Text | | |
| SecondaryIdentification |0..1 |OBInternationalStandingOrder4/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBInternationalStandingOrder4/CreditorAccount/Proxy |Specifies an alternate assumed name for the identification of the account.  |OBProxy1 | | |
| SupplementaryData |0..1 |OBInternationalStandingOrder4/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |
| RegulatoryReporting |0..10 |OBInternationalStandingOrder4/RegulatoryReporting |Information needed due to regulatory and statutory requirements. |RegulatoryReporting1 | | |



### International Standing Order Consent - Request

The OBWriteInternationalStandingOrderConsent6 object will be used for the call to:

* POST /international-standing-order-consents

#### UML Diagram

![ OBWriteInternationalStandingOrderConsent6 ](./images/OBWriteInternationalStandingOrderConsent6.svg )

#### Notes

The international-standing-order-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteInternationalStandingOrderConsent6 | |OBWriteInternationalStandingOrderConsent6 | |OBWriteInternationalStandingOrderConsent6 | | |
| Data |1..1 |OBWriteInternationalStandingOrderConsent6/Data | |OBWriteDataInternationalStandingOrderConsent6 | | |
| Permission |1..1 |OBWriteInternationalStandingOrderConsent6/Data/Permission |Specifies the Open Banking service request types. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets)  |OBInternalPermissions2Code| |
| ReadRefundAccount |0..1 |OBWriteInternationalStandingOrderConsent6/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalReadRefundAccount1Code | |
| Initiation |1..1 |OBWriteInternationalStandingOrderConsent6/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for an international standing order. |OBInternationalStandingOrder4 | | |
| Authorisation |0..1 |OBWriteInternationalStandingOrderConsent6/Data/Authorisation | |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteInternationalStandingOrderConsent6/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteInternationalStandingOrderConsent6/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |


### International Standing Order Consent - Response

The OBWriteInternationalStandingOrderConsentResponse7 object will be used for a response to a call to:

* POST /international-standing-order-consents
* GET /international-standing-order-consents/{ConsentId}

#### UML Diagram

![ OBWriteInternationalStandingOrderConsentResponse7 ](./images/OBWriteInternationalStandingOrderConsentResponse7.svg )

#### Notes

The international-standing-order-consent **response** contains the full **original** payload from the international-standing-order-consent **request** with the additional elements below:

* ConsentId.
* CreationDateTime the international-standing-order-consent resource was created.
* Status, StatusReason and StatusUpdateDateTime of the international-standing-order-consent resource.
* Permission field in the original request.
* ReadRefundAccount field in the original request.
* CutOffDateTime Behaviour is explained in Payment Initiation API Profile, Section - [Payment Restrictions -> CutOffDateTime Behaviour](../../profiles/payment-initiation-api-profile.md#cutoffdatetime-behaviour).
* Charges array which will be used by the ASPSP to indicate charges, and the ChargeBearer as relevant.
* Post successful PSU Authentication, an ASPSP may provide `Debtor/Name` in the Payment Order Consent Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteInternationalStandingOrderConsentResponse7 | |OBWriteInternationalStandingOrderConsentResponse7 | |OBWriteInternationalStandingOrderConsentResponse7 | | |
| Data |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data | |OBWriteDataInternationalStandingOrderConsentResponse7 | | |
| ConsentId |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Status |Specifies the status of consent resource in code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBExternalStatusReason1Code |
| StatusReason |0..* |OBWriteInternationalStandingOrderConsentResponse7/Data/StatusReason |An array of StatusReasonCode | OBStatusReason |
| StatusReasonCode |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/StatusReason/StatusReasonCode |Specifies the status reason in a code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)| OBInternalPermissions1Code |
| StatusReasonDescription |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/StatusReason/StatusReasonDescription |Description supporting the StatusReasonCode. | Max500Text |
| StatusUpdateDateTime |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| Permission |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Permission |Specifies the Open Banking service request types. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets)  |OBInternalPermissions2Code | |
| ReadRefundAccount |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalReadRefundAccount1Code | |
| CutOffDateTime |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| Charges |0..* |OBWriteInternationalStandingOrderConsentResponse7/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for an international standing order. |OBInternationalStandingOrder4 | | |
| Authorisation |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Authorisation | |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| LEI |0..1 | OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/LEI |Legal Entity Identification Legal entity identification as an alternate identification for a party. Legal Entity Identifier is a code allocated to a party as described in ISO 17442 "Financial Services - Legal Entity Identifier (LEI)". |Max20Text | |^[A-Z0-9]{18,18}[0-9]{2,2}$ |
| Risk |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

## Usage Examples

#### POST /international-standing-order-consents

##### Request

```
POST /international-standing-order-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date:  Mon, 01 Jan 2018 02:43:31 GMT
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
  "Authorisation": {
	  "AuthorisationType": "Any", 
      "CompletionDateTime": "2025-05-30T10:35:27Z",
  },
  "Initiation": {
    "ChargeBearer": "Shared",
    "Purpose": "CCRD",
    "CurrencyOfTransfer": "USD",
    "DestinationCountryCode": "GB",
    "MandateRelatedInformation": {
      "MandateIdentification": "Caravanners",
      "Classification": "FIXE",
      "CategoryPurposeCode": "BONU",
      "FirstPaymentDateTime": "2024-04-25T12:46:49.425Z",
      "RecurringPaymentDateTime": "2024-04-25T12:46:49.425Z",
      "FinalPaymentDateTime": "2024-04-25T12:46:49.425Z",
      "Frequency": {
        "Type": "WEEK",
        "CountPerPeriod": 1
      }
    },
    "Creditor": {
      "Name": "ACME Inc",
      "LEI": "8200007YHFDMEODY1965",
      "PostalAddress": {
        "AddressType": "BIZZ",
        "StreetName": "Bank Street",
        "BuildingNumber": "11",
        "Floor": "6",
        "PostCode": "Z78 4TY",
        "TownName": "London",
        "Country": "UK"
      }
    },
    "CreditorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "DE89370400440532013000",
      "SecondaryIdentification": "0002",
      "Name": "Tom Kirkman",
      "Proxy": {
        "Identification": "07700900000",
        "Code": "TELE",
        "Type": "Telephone"
      },
    },
    "CreditAgent": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "DE89370400440532013000",
      "LEI": "8200007YHFDMEODY1965",
      "Name": "Tom Kirkman",
      "PostalAddress": {
        "AddressType": "BIZZ",
        "StreetName": "Bank Street",
        "BuildingNumber": "11",
        "Floor": "6",
        "PostCode": "Z78 4TY",
        "TownName": "London",
        "Country": "UK"
      }
    },
    "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost"
      },
	  "InstructedAmount": {
        "Amount": "20",
        "Currency": "EUR"
	  },
    "MandateRelatedInformation": {
        "MandateIdentification": "Golfers",
        "Classification": "FIXE",
        "CategoryPurposeCode": "BONU",
        "FirstPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "RecurringPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "FinalPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "Reason": "Membership fees",
        "Frequency": { 
          "Type": "MNTH",
          "CountPerPeriod": 1
        }
      },
      "UltimateDebtor": {
        "SchemeName": "UK.OBIE.BICFI",
        "Identification": "2360549017905161589",
        "Name": "Ultimate Debtor",
        "LEI": "8200007YHFDMEODY1965",
        "PostalAddress": {
            "AddressType": "BIZZ",
            "StreetName": "Bank Street",
            "BuildingNumber": "11",
            "Floor": "6",
            "PostCode": "Z78 4TY",
            "TownName": "London",
            "Country": "UK"
        }
      },
      "UltimateCreditor": {
        "SchemeName": "UK.OBIE.BICFI",
        "Identification": "2360549017905161589",
        "Name": "Ultimate Creditor",
        "LEI": "60450004FECVJV7YN339",
        "PostalAddress": {
            "AddressType": "BIZZ",
            "StreetName": "Bank Street",
            "BuildingNumber": "11",
            "Floor": "6",
            "PostCode": "Z78 4TY",
            "TownName": "London",
            "Country": "UK"
            }
        },
      "RegulatoryReporting": [
          {
            "DebitCreditReportingIndicator": "CRED",
            "Authority": {
              "Name": "string",
              "CountryCode": "UG"
            },
            "Details": [
              {
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
                }
              }
          ]
        }
      ],
      "RemittanceInformation": {
          "Structured": [
            {
              "ReferredDocumentInformation": [
                {
                  "Code": "CINV",
                  "Issuer": "Issuer01",
                  "Number": "Number_01",
                  "RelatedDate": "2024-04-25T13:26:41.911Z",
                  "LineDetails": [
                    "string"
                  ]
                }
              ],
              "ReferredDocumentAmount": 1,
              "CreditorReferenceInformation": {
                "Code": "DISP",
                "Issuer": "Issuer01",
                "Reference": "REF_26518"
              },
              "Invoicer": "INVR51856",
              "Invoicee": "INVE5161856",
              "TaxRemittance": "Tax Remittance related information",
              "AdditionalRemittanceInformation": ["Free text for additional information"],
            }
          ],
          "Unstructured": "Internal ops code 5120101"
        }
    }
  },
  "SCASupportData": {
    "RequestedSCAExemptionType": "EcommerceGoods",
    "AppliedAuthenticationApproach": "SCA",
    "ReferencePaymentOrderId": "O-611265",
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty",
    "PaymentPurposeCode": "EPAY",
    "CategoryPurposeCode": "CASH", 
    "ExtendedPurpose": "Required when no 4 character code fits the purpose",
    "BeneficiaryPaymentDetailsPrepopulatedIndicator": false,
    "BeneficiaryAccountType": "Business",
    "MerchantCategoryCode": "7300", 
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

##### Response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
"Data": {
	"ConsentId": "ISOC-100",
	"CreationDateTime": "2018-01-01T06:06:06+00:00",
  "CutOffDateTime": "2017-06-05T16:00:13+00:00",
	"StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
  "ExpectedExecutionDateTime": "2018-06-05T15:15:22+00:00",
  "ExpectedSettlementDateTime": "2018-06-06T15:15:22+00:00",
	"Permission": "Create",
  "ReadRefundAccount": "Yes",
	"Status": "AWAU",
  "StatusReason": {
    "StatusReasonCode": "U036", 
    "StatusReasonDescription":"Waiting for completion of consent authorisation to be completed by user",
  },
  "Debtor":{
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "08080021325698",
      "Name": "ACME Inc",
      "SecondaryIdentification": "0002",
      "LEI": "8200007YHFDMEODY1965",
  },
  "Charges": [{
       "ChargeBearer": "Shared",
       "Type": "UK.OBIE.CHAPSOut",
       "Amount"  {
        "Amount": "0.88",
        "Currency": "GBP"
      }
  }],
  "Authorisation": {
    "AuthorisationType": "Any", 
    "CompletionDateTime": "2025-05-30T10:35:27Z",
  },
  "Initiation": {
    "ChargeBearer": "Shared",   
    "Purpose": "CCRD",
    "CurrencyOfTransfer": "USD",
    "DestinationCountryCode": "GB",
    "InstructedAmount": {
      "Amount": {
          "Amount": "165.88",
          "Currency": "USD"
        }
    },
    "ExchangeRateInformation": {
      "UnitCurrency": "GBP",
      "ContractIdentification": "0591968098186",
      "ExchangeRate": 1.22,
      "RateType": "Actual"
    },
    "Creditor": {
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "LEI": "8200007YHFDMEODY8412",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "StreetName": "Bank Street",
          "BuildingNumber": "11",
          "Floor": "6",
          "PostCode": "Z78 4TY",
          "TownName": "London",
          "Country": "UK"
      }
    },
    "CreditorAccount": {
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "08080021325698",
      "Name": "ACME Inc",
      "SecondaryIdentification": "0002",
      "Proxy": {
        "Identification": "+441632960540",
        "Code": "TELE",
        "Type": "Telephone"
      },
    },
    "CreditorAgent": {  
      "LEI": "IZ9Q00LZEVUKWCQY6X15",
      "SchemeName": "UK.OBIE.BICFI",
      "Identification": "80200112344562",
      "Name": "The Credit Agent", 
      "PostalAddress": { 
        "AddressType": "BIZZ",
        "StreetName": "Bank Street",
        "BuildingNumber": "11",
        "Floor": "6",
        "PostCode": "Z78 4TY",
        "TownName": "London",
        "Country": "UK"
    },
    "DebtorAccount":{
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "08080021325698",
      "Name": "ACME Inc",
      "SecondaryIdentification": "0002",
      "LEI": "8200007YHFDMEODY1965",
      "Proxy": {
        "Identification": "07700900000",
        "Code": "TELE",
        "Type": "Telephone"
      },
    },
    "UltimateDebtor": {
        "SchemeName": "UK.OBIE.BICFI",
        "Identification": "2360549017905161589",
        "Name": "Ultimate Debtor",
        "LEI": "8200007YHFDMEODY1965",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "StreetName": "Bank Street",
          "BuildingNumber": "11",
          "Floor": "6",
          "PostCode": "Z78 4TY",
          "TownName": "London",
          "Country": "UK"
        }
      },
      "UltimateCreditor": {
        "SchemeName": "UK.OBIE.BICFI",
        "Identification": "2360549017905161589",
        "Name": "Ultimate Creditor",
        "LEI": "60450004FECVJV7YN339",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "StreetName": "Bank Street",
          "BuildingNumber": "11",
          "Floor": "6",
          "PostCode": "Z78 4TY",
          "TownName": "London",
          "Country": "UK"
          }
        },
    "RegulatoryReporting": [{
      "DebitCreditReportingIndicator": "CRED",
      "Authority": {
        "Name": "string",
        "CountryCode": "UG"
      },
      "Details": [{
        "Type": "CRED",
        "Date": "2024-04-25T13:26:41.911Z",
        "Information": ["Reg info1", "Reg info2"],
        "Country": "QG",
        "Amount": {
          "Amount": "4.68702",
          "Currency": "JGM"
        }
      }]
    }],
   "RemittanceInformation": {
      "Structured": [{
          "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "string"
              ]
            }],
          "ReferredDocumentAmount": 1,
          "CreditorReferenceInformation": {
            "Code": "DISP",
            "Issuer": "Issuer01",
            "Reference": "REF_26518"
          },
          "Invoicer": "INVR51856",
          "Invoicee": "INVE5161856",
          "TaxRemittance": "Tax Remittance related information",
          "AdditionalRemittanceInformation": ["Free text for additional information"],
        }
      ],
      "Unstructured": "Internal ops code 5120101"
    },
	 "MandateRelatedInformation": {
      "MandateIdentification": "Golfers",
      "Classification": "FIXE",
      "CategoryPurposeCode": "BONU",
      "FirstPaymentDateTime": "2024-04-25T12:46:49.425Z",
      "RecurringPaymentDateTime": "2024-04-25T12:46:49.425Z",
      "FinalPaymentDateTime": "2024-04-25T12:46:49.425Z",
      "Reason": "Golf membership fees", 
      "Frequency": { 
        "Type": "MNTH",
        "CountPerPeriod": 1
      }
    },
    "DebtorAccount": {
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "11280001234567",
      "Name": "Andrea Frost",
      "SecondaryIdentification": "0002",
      "LEI": "8200007YHFDMEODY1965",
      "Proxy": {
        "Identification": "07700900000",
        "Code": "TELE",
        "Type": "Telephone"
      },
    },
    "CreditorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "DE89370400440532013000",
      "Name": "Tom Kirkman"
    },
  }
  },
  "SCASupportData": {
    "RequestedSCAExemptionType": "EcommerceGoods",
    "AppliedAuthenticationApproach": "SCA",
    "ReferencePaymentOrderId": "O-611265",
  },  
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty",
    "PaymentPurposeCode": "EPAY",
    "CategoryPurposeCode": "CASH", 
    "ExtendedPurpose": "Required when no 4 character code fits the purpose",
    "BeneficiaryPaymentDetailsPrepopulatedIndicator": false,
    "BeneficiaryAccountType": "Business",
    "MerchantCategoryCode": "7300", 
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
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-standing-order-consents/ISOC-100"
  },
  "Meta": {}
}
```
