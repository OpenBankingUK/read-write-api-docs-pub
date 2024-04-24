# International Standing Order Consents - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /international-standing-order-consents](#post-international-standing-order-consents)
    - [StatusCode](#statuscode)
  - [GET /international-standing-order-consents/{ConsentId}](#get-international-standing-order-consents-consentid)
    - [StatusCode](#statuscode-2)
  - [State Model](#state-model)
    - [Payment Order Consent](#payment-order-consent)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
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

#### StatusCode

The default StatusCode is "AWAU" immediately after the international-standing-order-consent has been created.

| StatusCode |
| --- |
| AWAU |


### GET /international-standing-order-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status. 

#### StatusCode

Once the PSU authorises the payment-consent resource - the StatusCode of the payment-consent resource will be updated with "AUTH".

If the PSU rejects the consent or the international-standing-order-consent has failed some other ASPSP validation, the StatusCode will be set to "RJCT".

Once an international-standing-orders has been successfully created using the international-standing-order-consent, the StatusCode of the international-standing-order-consent will be set to "COND".

The available StatusCodes for the international-standing-order-consent resource are:

| StatusCode |
| --- |
| AWAU |
| RJCT |
| AUTH |
| COND |

### State Model

#### Payment Order Consent

The state model for the international-standing-order-consent resource follows the generic consent state model. 

![State model](./images/PO_Consent.png)

The definitions for the StatusCode:

|  |StatusCode |Status Description |
| --- |--- |--- |
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

The data dictionary section gives the detail on the payload content for the International Standing Order API flows.

### Reused Classes

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
  * "UK.OB.SortCodeAccountNumber" - The Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * "UK.OB.IBAN" - The Identification field **must** be populated with the full IBAN.
  * "UK.OB.PAN" - The Identification field **must** be populated with the full PAN. A PAN may be an instrument (e.g., a debit card) linked to a payment account, and may not be the only PAN linked to the payment account.
* The InstructedAmount object **must** be populated with the desired Amount and Currency of transfer, regardless of the currency of the DebtorAccount. I.e., a PSU may wish to transfer 100EUR from a GBP DebtorAccount (InstructedAmount will be 100EUR), or 100GBP in EUR (the InstructedAmount will be 100GBP).
* The CurrencyOfTransfer **must** be used to specify the currency the funds will be transferred. I.e., a PSU may wish to transfer 100USD from a GBP DebtorAccount to a Rupee INR CreditorAccount in India.
* The ChargeBearer field is used by the PISP to indicate the bearer of charges. An ASPSP must Reject the Initiation request if the requested charge allocation cannot be fulfilled.
* Permission field is restricted to "Create", however, may be extended to "Update" and "Delete" in a future iteration of the specification.

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBInternationalStandingOrder4 | |OBInternationalStandingOrder4 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for an international standing order. |OBInternationalStandingOrder4 | | |
| MandateRelatedInformation | 0..1 |OBInternationalStandingOrder4/MandateRelatedInformation ||OBMandateRelatedInformation | | |
| MandateIdentification | 0..1 |OBInternationalStandingOrder4/MandateRelatedInformation/MandateIdentification ||Max35Text | | |
| Classification | 0..1 |OBInternationalStandingOrder4/MandateRelatedInformation/Classification|FIXE<br>USGB<br>VARI|OBClassification1Code | | |
| CategoryPurposeCode | 0..1 |OBInternationalStandingOrder4/MandateRelatedInformation/CategoryPurposeCode ||OBCategoryPurpose1Code | | |
| FirstPaymentDate | 0..1 |OBInternationalStandingOrder4/MandateRelatedInformation/FirstPaymentDate |The date on which the first payment for a Standing Order schedule will be made. |ISODate | | |
| FinalPaymentDate | 0..1 |OBInternationalStandingOrder4/MandateRelatedInformation/FinalPaymentDate |The date on which the final payment for a Standing Order schedule will be made. |ISODate | | |
| Frequency | 0..1 |OBInternationalStandingOrder4/MandateRelatedInformation/Frequency |A code indicating the frequency of payment for the Standing Order. Values:<br>ADHO<br>YEAR<br>DALI<br>INDA<br>MNTH<br>QURT<br>MIAN<br>WEEK |OBFrequencyPeriodType | | |
| PeriodType | 1..1 |OBInternationalStandingOrder4/MandateRelatedInformation/PeriodType |A code indicating the period type for the Standing Order. Values:<br>ADHO<br>YEAR<br>DALI<br>INDA<br>MNTH<br>QURT<br>MIAN<br>WEEK |OBFrequencyPeriodType | | |
| CountPerPeriod | 1..1 |OBInternationalStandingOrder4/MandateRelatedInformation/CountPerPeriod | |int32 | |
| PointInTimeType | 1..1 |OBInternationalStandingOrder4/MandateRelatedInformation/PointInTimeType |A code indicating the point in time for payment of the Standing Order. Values:<br>ADHO<br>YEAR<br>DALI<br>INDA<br>MNTH<br>QURT<br>MIAN<br>WEEK |OBFrequencyPeriodType | | |
| PointInTime | 1..1 |OBInternationalStandingOrder4/MandateRelatedInformation/PointInTime |ISODateTime | | |
| Reason| 0..1 |OBInternationalStandingOrder4/MandateRelatedInformation/Reason | |Max256Text | |
| RemittanceInformation |0..1 |OBInternationalStandingOrder4/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation1 | | |
| Structured |0..* |OBInternationalStandingOrder4/RemittanceInformation/Structured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an structured form. |OBRemittanceInformationStructured | | |
| ReferredDocumentInformation |0..* |OBInternationalStandingOrder4/RemittanceInformation/Structured/ReferredDocumentInformation |Provides the identification and the content of the referred document |OBReferredDocumentInformation | | |
| Code |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/ReferredDocumentInformation/Code |Type of remittance document, as published in an external document type code set.  For a full description see `ExternalDocumentType1Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets) |ExternalDocumentType1Code | | |
| Issuer |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/ReferredDocumentInformation/Issuer |Identification of the issuer of the reference document line identification type |Max35Text | | |
| LineDetails |0..* |OBInternationalStandingOrder4/RemittanceInformation/Structured/ReferredDocumentInformation/LineDetails |Set of elements used to provide the content of the referred document line |OBDocumentLineInformation2 | | |
| Number |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/ReferredDocumentInformation/Number |Identification of the type specified for the referred document line. |Max35Text | | |
| RelatedDate |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/ReferredDocumentInformation/RelatedDate |Date associated with the referred document line |ISODateTime | | |
| ReferredDocumentAmount |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/ReferredDocumentAmount |Provides details on the amounts of the referred document |OBReferredDocumentAmount| | |
| CreditorReferenceInformation |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/CreditorReferenceInformation|Reference information provided by the creditor to allow the identification of the underlying documents |OBCreditorReferenceInformation| | |
| Code |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/CreditorReferenceInformation/Code |Type of creditor reference, as published in an external creditor reference type code set. For a full description see `ExternalCreditorReferenceType1Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets) |ExternalCreditorReferenceType1Code| | |
| Issuer |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/CreditorReferenceInformation/Issuer |Entity that assigns the credit reference type |Max35Text | | |
| Reference |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/CreditorReferenceInformation/Reference |EUnique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.<br>Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.<br> If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. |Max35Text | | |
| Invoicer |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/Invoicer | Identification of the organisation issuing the invoice, when it is different from the creditor or ultimate creditor. |OBInvoicer| | |
| Invoicee |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/Invoicee |Identification of the party to whom an invoice is issued, when it is different from the debtor or ultimate debtor |OBInvoicee| | |
| TaxRemittance |0..1 |OBInternationalStandingOrder4/RemittanceInformation/Structured/TaxRemittance |Provides remittance information about a payment made for tax-related purposes |Max140Text| | |
| AdditionalRemittanceInformation |0..3|OBInternationalStandingOrder4/RemittanceInformation/Structured/AdditionalRemittanceInformation |Additional information, in free text form, to complement the structured remittance information |OBAdditionalRemittanceInformation| | |
| Unstructured |0..* |OBInternationalStandingOrder4/RemittanceInformation/Unstructured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text | | |
| NumberOfPayments |0..1 |OBInternationalStandingOrder4/NumberOfPayments |Number of the payments that will be made in completing this frequency sequence including any executed since the sequence start date. |Max35Text | | |
| Purpose |0..1 |OBInternationalStandingOrder4/Purpose |Specifies the external purpose code in the format of character string with a maximum length of 4 characters. The list of valid codes is an external code list published separately. External code sets can be downloaded from www.iso20022.org. |OBExternalPurpose1Code1 | | |
| ChargeBearer |0..1 |OBInternationalStandingOrder4/ChargeBearer |Specifies which party/parties will bear the charges associated with the processing of the payment transaction. |OBChargeBearerType1Code |BorneByCreditor BorneByDebtor FollowingServiceLevel Shared | |
| CurrencyOfTransfer |1..1 |OBInternationalStandingOrder4/CurrencyOfTransfer |Specifies the currency of the to be transferred amount, which is different from the currency of the debtor's account. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DestinationCountryCode |0..1 |OBInternationalStandingOrder4/DestinationCountryCode |Country in which Credit Account is domiciled. Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| InstructedAmount |1..1 |OBInternationalStandingOrder4/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBInternationalStandingOrder4/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBInternationalStandingOrder4/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DebtorAccount |0..1 |OBInternationalStandingOrder4/DebtorAccount |Provides the details to identify the debtor account. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBInternationalStandingOrder4/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternationalStandingOrder4/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBInternationalStandingOrder4/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBInternationalStandingOrder4/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBInternationalStandingOrder4/DebtorAccount/Proxy |The external proxy account type |OBProxyAccount | | |
| Identification |1..1 |OBInternationalStandingOrder4/DebtorAccount/Proxy/Identification| Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Type |0..1 |OBInternationalStandingOrder4/DebtorAccount/Proxy/Type| Specifies the external proxy account type |MaxText70 | | |
| Code |1..1 |OBInternationalStandingOrder4/DebtorAccount/Proxy/Code| Specifies the external proxy account type code, as published in the proxy account type external code set.<br> For more information see `ExternalProxyAccountType1Code` [here](https:/github.com/OpenBankingUK/External_Interal_CodeSets) |OBExternalProxyAccountType1Code | | |
| Creditor |0..1 |OBInternationalStandingOrder4/Creditor |Party to which an amount of money is due. |OBPartyIdentification43 | | |
| Name |0..1 |OBInternationalStandingOrder4/Creditor/Name |Name by which a party is known and which is usually used to identify that party. |Max350Text | | |
| LEI |0..1 | OBInternationalStandingOrder4/Creditor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
| PostalAddress |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/AddressType |Identifies the nature of the postal address. <br>For a full description see `OBAddressType2Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets). | OBAddressType2Code | | |
| Department |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/StreetName |Name of a street or thoroughfare. |Max140Text | | |
| BuildingNumber |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| BuildingName |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/BuildingName |Name of a referenced building. |Max140Text | | |
| Floor |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/Floor|Number that identifies the level within a building. |Max70Text | | |
| UnitNumber|0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/UnitNumber|Number that identifies the unit of a specific address |Max16Text | | |
| Room |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/Room|Information that locates and identifies a room to form part of an address. |Max70Text | | |
| TownLocationName |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/TownLocationName |Name of a built-up area, with defined boundaries, and a local government. |Max140Text | | |
| DistrictName |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/DistrictName |Number that of the regional area, known as a district, which forms part of an address. |Max140Text | | |
| CareOf |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/CareOf |The 'care of' address is used whenever sending mail to a person or organisation who does not actually live or work at the address. They will receive the mail for the individual. |Max140Text | | |
| PostCode |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| PostBox |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/PostBox |Numbered box in a post office, assigned to a person or organisation, where letters are kept until called for |Max16Text | | |
| TownName |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max140Text | | |
| CountrySubDivision |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternationalStandingOrder4/Creditor/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternationalStandingOrder4/Creditor/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | | |
| CreditorAgent |0..1 |OBInternationalStandingOrder4/CreditorAgent |Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account. This is the servicer of the beneficiary account. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBInternationalStandingOrder4/CreditorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |0..1 |OBInternationalStandingOrder4/CreditorAgent/Identification |Unique and unambiguous identification of the servicing institution. |Max35Text | | |
| Name |0..1 |OBInternationalStandingOrder4/CreditorAgent/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| LEI |0..1 | OBInternationalStandingOrder4/CreditorAgent/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
| PostalAddress |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/AddressType |Identifies the nature of the postal address. <br>For a full description see `OBAddressType2Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets). | OBAddressType2Code | | |
| Department |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/StreetName |Name of a street or thoroughfare. |Max140Text | | |
| BuildingNumber |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| BuildingName |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/BuildingName |Name of a referenced building. |Max140Text | | |
| Floor |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/Floor|Number that identifies the level within a building. |Max70Text | | |
| UnitNumber|0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/UnitNumber|Number that identifies the unit of a specific address |Max16Text | | |
| Room |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/Room|Information that locates and identifies a room to form part of an address. |Max70Text | | |
| TownLocationName |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/TownLocationName |Name of a built-up area, with defined boundaries, and a local government. |Max140Text | | |
| DistrictName |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/DistrictName |Number that of the regional area, known as a district, which forms part of an address. |Max140Text | | |
| CareOf |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/CareOf |The 'care of' address is used whenever sending mail to a person or organisation who does not actually live or work at the address. They will receive the mail for the individual. |Max140Text | | |
| PostCode |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| PostBox |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/PostBox |Numbered box in a post office, assigned to a person or organisation, where letters are kept until called for |Max16Text | | |
| TownName |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max140Text | | |
| CountrySubDivision |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternationalStandingOrder4/CreditorAgent/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | | |
| CreditorAccount |1..1 |OBInternationalStandingOrder4/CreditorAccount |Provides the details to identify the beneficiary account. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBInternationalStandingOrder4/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternationalStandingOrder4/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBInternationalStandingOrder4/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max350Text | | |
| SecondaryIdentification |0..1 |OBInternationalStandingOrder4/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBInternationalStandingOrder4/CreditorAccount/Proxy |The external proxy account type |OBProxyAccount | | |
| Identification |1..1 |OBInternationalStandingOrder4/CreditorAccount/Proxy/Identification| Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Type |0..1 |OBInternationalStandingOrder4/CreditorAccount/Proxy/Type| Specifies the external proxy account type |MaxText70 | | |
| Code |1..1 |OBInternationalStandingOrder4/CreditorAccount/Proxy/Code| Specifies the external proxy account type code, as published in the proxy account type external code set.<br> For more information see `ExternalProxyAccountType1Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets) |OBExternalProxyAccountType1Code | | |
| Proprietary |1..1 |OBInternationalStandingOrder4/CreditorAccount/Proxy/Proprietary| The owner of the proxy account |MaxText70 | | |
| SupplementaryData |0..1 |OBInternationalStandingOrder4/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |
| RegulatoryReporting |0..10 |OBInternationalStandingOrder4/RegulatoryReporting |Information needed due to regulatory and statutory requirements. |RegulatoryReporting3 | | |
| DebitCreditReportingIndicator |0..1 |OBInternationalStandingOrder4/RegulatoryReporting/DebitCreditReportingIndicator | Identifies whether the regulatory reporting information applies to the debit side, to the credit side or to both debit and credit sides of the transaction. |RegulatoryReportingType1Code |CRED DEBT BOTH | |
| Authority |0..1 |OBInternationalStandingOrder4/RegulatoryReporting/Authority |Entity requiring the regulatory reporting information. |RegulatoryAuthority2 | | |
| Name |0..1 |OBInternationalStandingOrder4/RegulatoryReporting/Authority/Name |Name of the entity requiring the regulatory reporting information. |Max140Text | | |
| CountryCode |0..1 |OBInternationalStandingOrder4/RegulatoryReporting/Authority/Country |Country of the entity that requires the regulatory reporting information. |CountryCode | | |
| Details |0..* |OBInternationalStandingOrder4/RegulatoryReporting/Details |Set of elements used to provide details on the regulatory reporting information. |StructuredRegulatoryReporting3 | | |
| Type |0..1 |OBInternationalStandingOrder4/RegulatoryReporting/Details/Type |Specifies the type of the information supplied in the regulatory reporting details. |Max35Text | | |
| Date |0..1 |OBInternationalStandingOrder4/RegulatoryReporting/Details/Date |Date related to the specified type of regulatory reporting details. |ISODateTime | | |
| Country |0..1 |OBInternationalStandingOrder4/RegulatoryReporting/Details/Country |Country related to the specified type of regulatory reporting details. |CountryCode | | ^[A-Z]{2,2}$ |
| Code |0..1 |OBInternationalStandingOrder4/RegulatoryReporting/Details/Code |Specifies the nature, purpose, and reason for the transaction to be reported for regulatory and statutory requirements in a coded form. |Max10Text | | |
| Amount |0..1 |OBInternationalStandingOrder4/RegulatoryReporting/Details/Amount |Amount of money to be reported for regulatory and statutory requirements. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBInternationalStandingOrder4/RegulatoryReporting/Details/Amount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. | | | |
| Currency |1..1 |OBInternationalStandingOrder4/RegulatoryReporting/Details/Amount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | | ^[A-Z]{3,3}$ |
| Information |0..* |OBInternationalStandingOrder4/RegulatoryReporting/Details/Information |Additional details that cater for specific domestic regulatory requirements. |Max35Text | | |
| UltimateCreditor |0..1 |OBInternationalStandingOrder4/UltimateCreditor|Set of elements used to identify a person or an organisation. | OBPartyIdentification43 | | |
| SchemeName |0..1 |OBInternationalStandingOrder4/UltimateCreditor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBInternationalStandingOrder4/UltimateCreditor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBInternationalStandingOrder4/UltimateCreditor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| LEI |0..1 | OBInternationalStandingOrder4/UltimateCreditor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
| UltimateDebtor |0..1 |OBInternationalStandingOrder4/UltimateDebtor|Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBInternationalStandingOrder4/UltimateDebtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBInternationalStandingOrder4/UltimateDebtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBInternationalStandingOrder4/UltimateDebtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| LEI |0..1 | OBInternationalStandingOrder4/UltimateDebtor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |

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
| Permission |1..1 |OBWriteInternationalStandingOrderConsent6/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| ReadRefundAccount |0..1 |OBWriteInternationalStandingOrderConsent6/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
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
* StatusCode, StatusReason and StatusUpdateDateTime of the international-standing-order-consent resource.
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
| StatusCode |0..1 |OBReadConsentResponse1/Data/StatusCode |Specifies the status of consent resource in code form. |ExternalStatusReason1Code |AUTH AWAU RJCT COND |
| StatusReason |0..* |OBReadConsentResponse1/Data/StatusReason |Specifies the status reason. | OBStatusReason |
| StatusReasonCode |0..1 |OBReadConsentResponse1/Data/StatusReason/*/StatusReasonCode |Specifies the status reason in a code form. For a full description see `ExternalStatusReason1Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets). | ExternalStatusReason1Code |
| StatusReasonDescription |0..1 |OBReadConsentResponse1/Data/StatusReason/*/StatusReasonDescription |Description supporting the StatusReasonCode. |
| StatusUpdateDateTime |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| Permission |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| ReadRefundAccount |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
| CutOffDateTime |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| Charges |0..n |OBWriteInternationalStandingOrderConsentResponse7/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for an international standing order. |OBInternationalStandingOrder4 | | |
| Authorisation |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Authorisation | |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| LEI |0..1 | OBWriteInternationalStandingOrderConsentResponse7/Data/Debtor/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
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
    "Initiation": {
	  "MandateRelatedInformation": {
        "Frequency": "DAIL",
        "PeriodType": "DAIL",
        "FirstPaymentDate": "2018-06-06",
        "LastPaymentDate": "2020-03-20",
        "CountPerPeriod": 1,
        "PointInTimeType": "DAIL",
        "PointInTime": "T06:06:06+00:00"
      },
	  "DebtorAccount": {
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OB.IBAN",
        "Identification": "DE89370400440532013000",
        "Name": "Tom Kirkman"
      },
	  "InstructedAmount": {
        "Amount": "20",
        "Currency": "EUR"
	  },
	  "CurrencyOfTansfer":"EUR"
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
	"StatusCode": "AWAU",
	"StatusUpdateDateTime": "2018-01-01T06:06:06+00:00",
	"Permission": "Create",
  "ReadRefundAccount": "Yes",
    "Initiation": {
	  "MandateRelatedInformation": {
        "Frequency": "DAIL",
        "PeriodType": "DAIL",
        "FirstPaymentDate": "2018-06-06",
        "LastPaymentDate": "2020-03-20",
        "CountPerPeriod": 1,
        "PointInTimeType": "DAIL",
        "PointInTime": "T06:06:06+00:00"
      },
      "DebtorAccount": {
        "SchemeName": "UK.OB.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OB.IBAN",
        "Identification": "DE89370400440532013000",
        "Name": "Tom Kirkman"
      },
	  "InstructedAmount": {
        "Amount": "20",
        "Currency": "EUR"
	  },
	  "CurrencyOfTansfer":"EUR"
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-standing-order-consents/ISOC-100"
  },
  "Meta": {}
}
```
