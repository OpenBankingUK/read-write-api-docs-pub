# International Scheduled Payment Consents - v3.1.10 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /international-scheduled-payment-consents](#post-international-scheduled-payment-consents)
    - [Status](#status)
  - [GET /international-scheduled-payment-consents/{ConsentId}](#get-international-scheduled-payment-consents-consentid)
    - [Status](#status-2)
  - [GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation](#get-international-scheduled-payment-consents-consentid-funds-confirmation)
  - [State Model](#state-model)
    - [Payment Order Consent](#payment-order-consent)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBInternationalScheduled3](#obinternationalscheduled3)
      - [UML Diagram](#uml-diagram)
      - [Notes](#notes)
      - [Data Dictionary](#data-dictionary)
    - [OBExchangeRate2](#obexchangerate2)
      - [Data Dictionary](#data-dictionary-2)
  - [International Scheduled Payment Consent - Request](#international-scheduled-payment-consent-request)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-3)
  - [International Scheduled Payment Consent - Response](#international-scheduled-payment-consent-response)
    - [UML Diagram](#uml-diagram-4)
    - [Notes](#notes-3)
    - [Data Dictionary](#data-dictionary-4)
  - [International Scheduled Payment Consent Confirmation of Funds - Response](#international-scheduled-payment-consent-confirmation-of-funds-response)
    - [UML Diagram](#uml-diagram-4)
    - [Notes](#notes-4)
    - [Data Dictionary](#data-dictionary-5)
- [Usage Examples](#usage-examples)
  - [POST /international-scheduled-payment-consents](#post-international-scheduled-payment-consents-2)
    - [Request](#request)
    - [Response](#response)
  - [GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation](#get-international-scheduled-payment-consents-consentid-funds-confirmation-2)
    - [Request](#request-2)
    - [Response](#response-2)

## Overview

The International Scheduled Payment Consent resource is used by a PISP to register an intent to initiate an International Scheduled Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| international-scheduled-payment-consents |POST |POST /international-scheduled-payment-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteInternationalScheduledConsent5 |OBWriteInternationalScheduledConsentResponse6 |
| international-scheduled-payment-consents |GET |GET /international-scheduled-payment-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteInternationalScheduledConsentResponse6 |
| international-scheduled-payment-consents |GET |GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation |Mandatory (if immediate debit supported) |payments |Authorization Code |Signed Response |No |NA |OBWriteFundsConfirmationResponse1 |

### POST /international-scheduled-payment-consents

The API endpoint allows the PISP to ask an ASPSP to create a new **international-scheduled-payment-consent** resource.

* The POST action indicates to the ASPSP that an international scheduled payment consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **international-scheduled-payment-consent** resource and responds with a unique ConsentId to refer to the resource.

#### Status

The default Status is "AwaitingAuthorisation" immediately after the international-scheduled-payment-consent has been created.

| Status |
| --- |
| AwaitingAuthorisation |

### GET /international-scheduled-payment-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status. 

#### Status

Once the PSU authorises the payment-consent resource, the Status of the payment-consent resource will be updated with "Authorised".

If the PSU rejects the consent or the international-scheduled-payment-consent has failed some other ASPSP validation, the Status will be set to "Rejected".

Once an international-scheduled-payment has been successfully created using the international-scheduled-payment-consent, the Status of the international-scheduled-payment-consent will be set to "Consumed".

The available Status codes for the international-scheduled-payment-consent resource are:

| Status |
| --- |
| AwaitingAuthorisation |
| Rejected |
| Authorised |
| Consumed |

### GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation

The API endpoint allows the PISP to ask an ASPSP to confirm funds on an **international-scheduled-payment-consent** resource, where the payment is for immediate debit.

* An ASPSP can only respond to a funds confirmation request if the **international-scheduled-payment-consent** resource has an `Authorised` status. If the status is not `Authorised`, an ASPSP **must** respond with a 400 (Bad Request) and a `UK.OBIE.Resource.InvalidConsentStatus` error code.
* Confirmation of funds requests do not affect the status of the **international-scheduled-payment-consent** resource.

### State Model

#### Payment Order Consent

The state model for the international-scheduled-payment-consent resource follows the generic consent state model. However, does not use the "Revoked" status, as the consent for an international-scheduled-payment is not a long-lived consent.

![image2018-5-18_10-24-21](./images/image2018-5-18_10-24-21.png)

The definitions for the Status:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AwaitingAuthorisation |The consent resource is awaiting PSU authorisation. |
| 2 |Rejected |The consent resource has been rejected. |
| 3 |Authorised |The consent resource has been successfully authorised. |
| 4 |Consumed |The consented action has been successfully completed. This does not reflect the status of the consented action. |

## Data Model

The data dictionary section gives the detail on the payload content for the International Scheduled Payment API flows.

### Reused Classes

#### OBInternationalScheduled3

This section describes the OBInternationalScheduled3 class which is reused as the Initiation object in the international-scheduled-payment-consent resource.

##### UML Diagram

![OBInternationalScheduled3](./images/OBInternationalScheduled3.svg)

##### Notes

For the OBInternationalScheduled3 Initiation object:

* All elements in the Initiation payload, that are specified by the PISP must not be changed via the ASPSP as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the international-scheduled-payment-consent consent request immediately.
* If the ASPSP establishes a problem with the international-scheduled-payment-consent after the API call, the ASPSP must set the Status of the international-scheduled-payment-consent resource to Rejected.
* DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the international-scheduled-payment-consent will be set to Rejected after PSU authentication.
* CreditorAgent must at least have either of the pairs provided: SchemeName and Identification, or Name and PostalAddress.
* Account Identification field usage:
  * SchemeName is a free-text field which will be populated with identification schemes an ASPSP accepts.
  * Identification is a field which is populated with the Identification of the account, using the valid identification scheme provided.
* Valid UK Account Identification SchemeName values include, but are not restricted to:
  * "UK.OBIE.SortCodeAccountNumber" - Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * "UK.OBIE.IBAN" - The Identification field **must** be populated with the full IBAN.
  * "UK.OBIE.PAN" - The Identification field **must** be populated with the full PAN. A PAN may be an instrument (e.g., a debit card) linked to a payment account, and may not be the only PAN linked to the payment account.
  * "UK.OBIE.Paym" - The Identification field **must** be populated with the Paym proxy value.
* LocalInstrument is the requested payment scheme for execution. This is a free-text field.
* InstructionPrioirty **may** be used by the ASPSP to determine the payment scheme for execution. 
* The InstructedAmount object **must** be populated with the desired Amount and Currency of transfer, regardless of the currency of the DebtorAccount. I.e., a PSU may wish to transfer 100EUR from a GBP DebtorAccount (the InstructedAmount will be 100EUR), or 100GBP in EUR (the InstructedAmount will be 100GBP).
* The CurrencyOfTransfer **must** be used to specify the currency the funds will be transferred. I.e., a PSU may wish to transfer 100USD from a GBP DebtorAccount to a Rupee INR CreditorAccount in India.
* The ChargeBearer field is used by the PISP to indicate the bearer of charges. An ASPSP must Reject the Initiation request if the requested charge allocation cannot be fulfilled.
* Permission field is restricted to "Create" however, may be extended to "Update" and "Delete" in a future iteration of the specification.
* RequestedExecutionDateTime allows a PISP to specify the date for an ASPSP to execute the international scheduled payment.

The ExchangeRateInformation object must conform to these behaviours:

* A PISP must specify the DebtorAccount currency in the UnitCurrency field if the PISP is requesting a specific RateType so the ASPSP can respond with an exchange rate quote prior to PSU authorisation.
* A PISP may indicate an exchange rate request using the RateType with these enumerations: 
  * Actual.
  * Agreed.
  * Indicative.
* A PISP must specify ExchangeRate and ContractIdentification when requesting an **Agreed** RateType. If an invalid ContractIdentification and ExchangeRate are requested together, an ASPSP must reject the request.
	* For an "Agreed" RateType - a requested exchange rate is populated in the ExchangeRate field, against the UnitCurrency. I.e, if the UnitCurrency is GBP and CurrencyOfTransfer is USD, then ExchangeRate will be 1.34 (USD to 1 GBP).
  * For an "Agreed" RateType - the exchange rate contract identifier is populated in the ContractIdentification field.
* A PISP must not specify ExchangeRate and/or ContractIdentification when requesting an **Actual** RateType.
* A PISP must not specify ExchangeRate and/or ContractIdentification when requesting an **Indicative** RateType.

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBInternationalScheduled3 | |OBInternationalScheduled3 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled international payment. |OBInternationalScheduled3 | | |
| InstructionIdentification |1..1 |OBInternationalScheduled3/InstructionIdentification |Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction. |Max35Text | | |
| EndToEndIdentification |0..1 |OBInternationalScheduled3/EndToEndIdentification |Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field. |Max35Text | | |
| LocalInstrument |0..1 |OBInternationalScheduled3/LocalInstrument |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code | | |
| InstructionPriority |0..1 |OBInternationalScheduled3/InstructionPriority |Indicator of the urgency or order of importance that the instructing party would like the instructed party to apply to the processing of the instruction. |OBPriority2Code |Normal Urgent | |
| Purpose |0..1 |OBInternationalScheduled3/Purpose |Specifies the external purpose code in the format of character string with a maximum length of 4 characters. The list of valid codes is an external code list published separately. External code sets can be downloaded from www.iso20022.org. |OBExternalPurpose1Code1 | | |
| ExtendedPurpose |0..1 |OBInternationalScheduled3/ExtendedPurpose |Specifies the purpose of an international payment, when there is no corresponding 4 character code available in the ISO20022 list of Purpose Codes. |Max140Text | | |
| ChargeBearer |0..1 |OBInternationalScheduled3/ChargeBearer |Specifies which party/parties will bear the charges associated with the processing of the payment transaction. |OBChargeBearerType1Code |BorneByCreditor BorneByDebtor FollowingServiceLevel Shared | |
| RequestedExecutionDateTime |1..1 |OBInternationalScheduled3/RequestedExecutionDateTime |Date at which the initiating party requests the clearing agent to process the payment. Usage: This is the date on which the debtor's account is to be debited. |ISODateTime | | |
| CurrencyOfTransfer |1..1 |OBInternationalScheduled3/CurrencyOfTransfer |Specifies the currency of the to be transferred amount, which is different from the currency of the debtor's account. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DestinationCountryCode |0..1 |OBInternationalScheduled3/DestinationCountryCode |Country in which Credit Account is domiciled. Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| InstructedAmount |1..1 |OBInternationalScheduled3/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBInternationalScheduled3/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$\|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBInternationalScheduled3/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| ExchangeRateInformation |0..1 |OBInternationalScheduled3/ExchangeRateInformation |Provides details on the currency exchange rate and contract. |OBExchangeRate1 | | |
| UnitCurrency |1..1 |OBInternationalScheduled3/ExchangeRateInformation/UnitCurrency |Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| ExchangeRate |0..1 |OBInternationalScheduled3/ExchangeRateInformation/ExchangeRate |The factor used for conversion of an amount from one currency to another. This reflects the price at which one currency was bought with another currency. |BaseOneRate | | |
| RateType |1..1 |OBInternationalScheduled3/ExchangeRateInformation/RateType |Specifies the type used to complete the currency exchange. |OBExchangeRateType2Code |Actual Agreed Indicative | |
| ContractIdentification |0..1 |OBInternationalScheduled3/ExchangeRateInformation/ContractIdentification |Unique and unambiguous reference to the foreign exchange contract agreed between the initiating party/creditor and the debtor agent. |Max256Text | | |
| DebtorAccount |0..1 |OBInternationalScheduled3/DebtorAccount |Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBInternationalScheduled3/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternationalScheduled3/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBInternationalScheduled3/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBInternationalScheduled3/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Creditor |0..1 |OBInternationalScheduled3/Creditor |Party to which an amount of money is due. |OBPartyIdentification43 | | |
| Name |0..1 |OBInternationalScheduled3/Creditor/Name |Name by which a party is known and which is usually used to identify that party. |Max350Text | | |
| PostalAddress |0..1 |OBInternationalScheduled3/Creditor/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternationalScheduled3/Creditor/PostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBInternationalScheduled3/Creditor/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternationalScheduled3/Creditor/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternationalScheduled3/Creditor/PostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternationalScheduled3/Creditor/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternationalScheduled3/Creditor/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternationalScheduled3/Creditor/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternationalScheduled3/Creditor/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternationalScheduled3/Creditor/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternationalScheduled3/Creditor/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| CreditorAgent |0..1 |OBInternationalScheduled3/CreditorAgent |Financial institution servicing an account for the creditor. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBInternationalScheduled3/CreditorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |0..1 |OBInternationalScheduled3/CreditorAgent/Identification |Unique and unambiguous identification of a financial institution or a branch of a financial institution. |Max35Text | | |
| Name |0..1 |OBInternationalScheduled3/CreditorAgent/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| PostalAddress |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternationalScheduled3/CreditorAgent/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternationalScheduled3/CreditorAgent/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| CreditorAccount |1..1 |OBInternationalScheduled3/CreditorAccount |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBInternationalScheduled3/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternationalScheduled3/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBInternationalScheduled3/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max350Text | | |
| SecondaryIdentification |0..1 |OBInternationalScheduled3/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| RemittanceInformation |0..1 |OBInternationalScheduled3/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation1 | | |
| Unstructured |0..1 |OBInternationalScheduled3/RemittanceInformation/Unstructured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text | | |
| Reference |0..1 |OBInternationalScheduled3/RemittanceInformation/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped. |Max35Text | | |
| SupplementaryData |0..1 |OBInternationalScheduled3/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

#### OBExchangeRate2

This section describes the OBExchangeRate2 class which is reused in the response payloads in the international-scheduled-payment-consent resource.

![OBExchangeRate2](./images/OBExchangeRate2.svg)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBExchangeRate2 | |OBExchangeRate2 |Further detailed information on the exchange rate that has been used in the payment transaction. |OBExchangeRate2 | | |
| UnitCurrency |1..1 |OBExchangeRate2/UnitCurrency |Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP. |ActiveOrHistoricCurrencyCode |^[A-Z]{3,3}$ | |
| ExchangeRate |1..1 |OBExchangeRate2/ExchangeRate |The factor used for conversion of an amount from one currency to another. This reflects the price at which one currency was bought with another currency. |BaseOneRate | | |
| RateType |1..1 |OBExchangeRate2/RateType |Specifies the type used to complete the currency exchange. |OBExchangeRateType2Code |Actual Agreed Indicative | |
| ContractIdentification |0..1 |OBExchangeRate2/ContractIdentification |Unique and unambiguous reference to the foreign exchange contract agreed between the initiating party/creditor and the debtor agent. |Max256Text | | |
| ExpirationDateTime |0..1 |OBExchangeRate2/ExpirationDateTime |Specified date and time the exchange rate agreement will expire. |ISODateTime | | |

### International Scheduled Payment Consent - Request

The OBWriteInternationalScheduledConsent5 object will be used for the call to:

* POST /international-scheduled-payment-consents

#### UML Diagram

![OBWriteInternationalScheduledConsent5](./images/OBWriteInternationalScheduledConsent5.svg )

#### Notes

The international-scheduled-payment-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk

Exchange rate behaviour:

* An ASPSP **must** respond to an **Agreed** RateType request. 
* An ASPSP **may** respond to an **Actual** RateType request or **may** reject the request. 
* An ASPSP **may** respond to an **Indicative** RateType request or **may** reject the request. 
* An ASPSP **must** reject the international-scheduled-payment-consent request if the specified Initiation/ExchangeRateInformation cannot be fulfilled.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteInternationalScheduledConsent5 | |OBWriteInternationalScheduledConsent5 | |OBWriteInternationalScheduledConsent5 | | |
| Data |1..1 |OBWriteInternationalScheduledConsent5/Data | |OBWriteDataInternationalScheduledConsent5 | | |
| Permission |1..1 |OBWriteInternationalScheduledConsent5/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| ReadRefundAccount |0..1 |OBWriteInternationalScheduledConsent5/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
| Initiation |1..1 |OBWriteInternationalScheduledConsent5/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled international payment. |OBInternationalScheduled3 | | |
| Authorisation |0..1 |OBWriteInternationalScheduledConsent5/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteInternationalScheduledConsent5/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteInternationalScheduledConsent5/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### International Scheduled Payment Consent - Response

The OBWriteInternationalScheduledConsentResponse6 object will be used for a response to a call to:

* POST /international-scheduled-payment-consents
* GET /international-scheduled-payment-consents/{ConsentId}

#### UML Diagram

![ OBWriteInternationalScheduledConsentResponse6 ](./images/OBWriteInternationalScheduledConsentResponse6.svg )

####  Notes

The international-scheduled-payment-consent **response** contains the full **original** payload from the international-scheduled-payment-consent **request** with the additional elements below:

* ConsentId.
* CreationDateTime the international-scheduled-payment-consent resource was created.
* Status and StatusUpdateDateTime of the international-scheduled-payment-consent resource.
* Permission field in the original request.
* CutOffDateTime Behaviour is explained in Payment Initiation API Profile, Section - [Payment Restrictions -> CutOffDateTime Behaviour](../../profiles/payment-initiation-api-profile.md#cutoffdatetime-behaviour).
* ExpectedExecutionDateTime for the international-scheduled-payment resource, if created before CutOffDateTIme, the expected DateTime the payment is executed against the Debtor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* ExpectedSettlementDateTime for the international-scheduled-payment resource, if created before CutOffDateTIme, the expected DateTime the payment will be received at the Creditor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* Charges array which will be used by the ASPSP to indicate charges, and the ChargeBearer as relevant.
* Post successful PSU Authentication, an ASPSP may provide `Debtor/Name` in the Payment Order Consent Response, even when the Payer didn't provide the Debtor Account via PISP.
* ExchangeRateInformation (the ASPSP response) - this object will be used to communicate exchange rate information back to the PISP. It must be consistent with what is requested in the Initiation object from the PISP.

Exchange rate behaviour:

* For an **Agreed** RateType - if an ASPSP chooses to respond with Data/ExchangeRateInformation object:
  * An ASPSP may respond with the same requested exchange rate in the Data/ExchangeRateInformation object.
  * An ASPSP must not populate Data/ExchangeRateInformation/ExpirationDateTime.
* For an **Actual** RateType - if an ASPSP chooses to respond with Data/ExchangeRateInformation object:
  * An ASPSP must respond with an actual ExchangeRate quote in the Data/ExchangeRateInformation object.
  * An ASPSP must respond with an ExpirationDateTime
  * An ASPSP must reject the international-payment request if the PISP does not submit the international-payment within the ExchangeRateInformation/ExpirationDateTime
  * An ASPSP may choose to debit the DebtorAccount with the agreed exchange rate on the date the international-scheduled-payment is created and settle on the RequestedExecutionDateTime
* For an **Indicative** RateType - if an ASPSP chooses to respond with Data/ExchangeRateInformation object:
  * An ASPSP must respond with an indicative quote in the Data/ExchangeRateInformation object.
  * An ASPSP must respond with an indicative ExchangeRate quote
  * An ASPSP must not populate Data/ExchangeRateInformation/ExpirationDateTime for the exchange rate, as it is the market rate on the date of execution (date on which the DebtorAccount is debited)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteInternationalScheduledConsentResponse6 | |OBWriteInternationalScheduledConsentResponse6 | |OBWriteInternationalScheduledConsentResponse6 | | |
| Data |1..1 |OBWriteInternationalScheduledConsentResponse6/Data | |OBWriteDataInternationalScheduledConsentResponse6 | | |
| ConsentId |1..1 |OBWriteInternationalScheduledConsentResponse6/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteInternationalScheduledConsentResponse6/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteInternationalScheduledConsentResponse6/Data/Status |Specifies the status of consent resource in code form. |OBExternalConsentStatus1Code |Authorised AwaitingAuthorisation Consumed Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteInternationalScheduledConsentResponse6/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| Permission |1..1 |OBWriteInternationalScheduledConsentResponse6/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| ReadRefundAccount |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
| CutOffDateTime |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..n |OBWriteInternationalScheduledConsentResponse6/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| ExchangeRateInformation |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/ExchangeRateInformation |Further detailed information on the exchange rate that has been used in the payment transaction. |OBExchangeRate2 | | |
| Initiation |1..1 |OBWriteInternationalScheduledConsentResponse6/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled international payment. |OBInternationalScheduled3 | | |
| Authorisation |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/Authorisation |The multiple authorisation flow response from the ASPSP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteInternationalScheduledConsentResponse6/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Risk |1..1 |OBWriteInternationalScheduledConsentResponse6/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### International Scheduled Payment Consent Confirmation of Funds - Response

The OBWriteFundsConfirmationResponse1 object will be used for a response to a call to:

* GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation

#### UML Diagram

![ OBWriteConfirmFundsResponse1 ](./images/OBWriteFundsConfirmationResponse1.svg )

####  Notes

The confirmation of funds response contains the result of a funds availability check, or SupplementaryData.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteFundsConfirmationResponse1 | |OBWriteFundsConfirmationResponse1 | |OBWriteFundsConfirmationResponse1 | | |
| Data |1..1 |OBWriteFundsConfirmationResponse1/Data | |OBWriteDataFundsConfirmationResponse1 | | |
| FundsAvailableResult |0..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult |Result of a funds availability check. |OBFundsAvailableResult1 | | |
| FundsAvailableDateTime |1..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailableDateTime |Date and time at which the funds availability check was generated. |ISODateTime | | |
| FundsAvailable |1..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailable |Flag to indicate the availability of funds given the Amount in the consent request. |xs:boolean | | |
| SupplementaryData |0..1 |OBWriteFundsConfirmationResponse1/Data/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

## Usage Examples

### POST /international-scheduled-payment-consents

#### Request

```
POST /international-scheduled-payment-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
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
    "Permission":"Create",
	"ReadRefundAccount": "Yes",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "RequestedExecutionDate": "2018-08-06T00:00:00+00:00",
      "InstructedAmount": {
        "Amount": {
           "Amount": "165.88",
           "Currency": "USD"
         }
      },
      "CurrencyOfTransfer":"USD",
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      },
	  "ExchangeRateInformation": {
		"UnitCurrency": "GBP",
	  	"RateType": "Actual"
	  }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
		"Permission": "Create",
		"ReadRefundAccount": "Yes",
		"ConsentId": "58923",
		"Status": "AwaitingAuthorisation",
		"CutOffDateTime": "2017-06-05T16:00:13+00:00",
		"CreationDateTime": "2017-06-05T15:15:13+00:00",
		"StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
		"Initiation": {
			"InstructionIdentification": "ACME412",
			"EndToEndIdentification": "FRESCO.21302.GFX.20",
            "RequestedExecutionDate": "2018-08-06T00:00:00+00:00",	     
			"InstructedAmount": {
		        "Amount": {
    		       "Amount": "165.88",
		           "Currency": "USD"
        		 }
		      },
			"CurrencyOfTransfer":"USD",
			"CreditorAccount": {
				"SchemeName": "UK.OBIE.SortCodeAccountNumber",
				"Identification": "08080021325698",
				"Name": "ACME Inc",
				"SecondaryIdentification": "0002"
			},
			"RemittanceInformation": {
				"Reference": "FRESCO-101",
				"Unstructured": "Internal ops code 5120101"
			},
		  	"ExchangeRateInformation": {
				"UnitCurrency": "GBP",
	  			"RateType": "Actual"
	  		}
		},
		"ExchangeRateInformation": {
			"UnitCurrency": "GBP",
			"ExchangeRate": "1.10",
			"RateType": "Actual",
			"ExpirationDateTime": "2017-06-05T15:45:13+00:00"
		}
	},
	"Risk": {
		"PaymentContextCode": "TransferToThirdParty"

	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-scheduled-payment-consents/58923"
	},
	"Meta": {}
}
```


### GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation

#### Request

```
GET /international-scheduled-payment-consents/58923/funds-confirmation HTTP/1.1
Authorization: Bearer Jhingapulaav
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
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
		"FundsAvailableResult": {
			"FundsAvailableDateTime": "2017-06-05T15:15:23+00:00",
			"FundsAvailable": true
		}
	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-scheduled-payment-consents/58923/funds-confirmation"
	},
	"Meta": {}
}
```
