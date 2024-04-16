# International Payment Consents - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /international-payment-consents](#post-international-payment-consents)
    - [Status](#status)
- [GET /international-payment-consents/{ConsentId}](#get-international-payment-consents-consentid)
    - [Status](#status-2)
  - [GET /international-payment-consents/{ConsentId}/funds-confirmation](#get-international-payment-consents-consentid-funds-confirmation)
  - [State Model](#state-model)
    - [Payment Order Consent](#payment-order-consent)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBInternational3](#obinternational3)
      - [UML Diagram](#uml-diagram)
      - [Notes](#notes)
      - [Data Dictionary](#data-dictionary)
    - [OBExchangeRate2](#obexchangerate2)
      - [Data Dictionary](#data-dictionary-2)
  - [International Payment Consent - Request](#international-payment-consent-request)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-3)
  - [International Payment Consent - Response](#international-payment-consent-response)
    - [UML Diagram](#uml-diagram-3)
    - [Notes](#notes-3)
    - [Data Dictionary](#data-dictionary-3)
  - [International Payment Consent Confirmation of Funds - Response](#international-payment-consent-confirmation-of-funds-response)
    - [UML Diagram](#uml-diagram-4)
    - [Notes](#notes-4)
    - [Data Dictionary](#data-dictionary-4)
- [Usage Examples](#usage-examples)
  - [POST /international-payment-consents](#post-international-payment-consents-2)
    - [Request](#request)
    - [Response](#response)
  - [GET / international-payment-consents/{ConsentId}/funds-confirmation](#get-international-payment-consents-consentid-funds-confirmation-2)
    - [Request](#request-2)
    - [Response](#response-2)

## Overview

The International Payment Consent resource is used by a PISP to register an intent to initiate an International Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| international-payment-consents |POST |POST /international-payment-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteInternationalConsent5 |OBWriteInternationalConsentResponse6 |
| international-payment-consents |GET |GET /international-payment-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteInternationalConsentResponse6 |
| international-payment-consents |GET |GET /international-payment-consents/{ConsentId}/funds-confirmation |Mandatory (if resource POST implemented) |payments |Authorization Code |Signed Response |No |NA |OBWriteFundsConfirmationResponse1 |

### POST /international-payment-consents

The API endpoint allows the PISP to ask an ASPSP to create a new **international-payment-consent** resource.

* The POST action indicates to the ASPSP that a payment consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **international-payment-consent** resource and responds with a unique ConsentId to refer to the resource.

#### Status

The default Status is "AwaitingAuthorisation" immediately after the international-payment-consent has been created.

| Status |
| --- |
| AwaitingAuthorisation |

## GET /international-payment-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status.

#### Status

Once the PSU authorises the payment-consent resource, the Status of the payment-consent resource will be updated with "Authorised".

If the PSU rejects the consent or the international-payment-consent has failed some other ASPSP validation, the Status will be set to "Rejected".

Once an international-payment has been successfully created using the international-payment-consent, the Status of the international-payment-consent will be set to "Consumed".

The available Status codes for the international-payment-consent resource are:

| Status |
| --- |
| AwaitingAuthorisation |
| Rejected |
| Authorised |
| Consumed |

### GET /international-payment-consents/{ConsentId}/funds-confirmation

The API endpoint allows the PISP to ask an ASPSP to confirm funds on an **international-payment-consent** resource.

* An ASPSP can only respond to a funds confirmation request if the **international-payment-consent** resource has an `Authorised` status. If the status is not `Authorised`, an ASPSP **must** respond with a 400 (Bad Request) and a `UK.OBIE.Resource.InvalidConsentStatus` error code.
* Confirmation of funds requests do not affect the status of the **international-payment-consent** resource.

### State Model

#### Payment Order Consent

The state model for the international-payment-consent resource follows the generic consent state model. However, does not use the "Revoked" status, as the consent for an international-payment is not a long-lived consent.

![Payment Order Consent State Model](./images/image2018-5-18_10-24-21.png)

The definitions for the Status:

| | Status | Status Description |
| --- |------ |------------------ |
| 1 |AwaitingAuthorisation |The consent resource is awaiting PSU authorisation. |
| 2 |Rejected |The consent resource has been rejected. |
| 3 |Authorised |The consent resource has been successfully authorised. |
| 4 |Consumed |The consented action has been successfully completed. This does not reflect the status of the consented action. |

## Data Model

The data dictionary section gives the detail on the payload content for the International Payment API flows.

### Reused Classes

#### OBInternational3

This section describes the OBInternational3 class which is reused as the Initiation object in the international-payment-consent resource.

##### UML Diagram

![OB International Reusable class](./images/OBInternational3.svg)

##### Notes

For the OBInternational3 Initiation object: 

* All elements in the Initiation payload that are specified by the PISP, must not be changed via the ASPSP as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the international-payment-consent request immediately.
* If the ASPSP establishes a problem with the international-payment-consent after the API call, the ASPSP must set the Status of the international-payment-consent resource to Rejected.
* DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the international-payment-consent will be set to Rejected after PSU authentication.
* CreditorAgent must at least have either of the pairs provided: Scheme Name and Identification or Name and Postal Address.
* Account Identification field usage:
  * Where "UK.OBIE.SortCodeAccountNumber" is specified as the SchemeName in the Account Identification Section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * Where the "UK.OBIE.IBAN" is specified as the SchemeName in the Account Identification Section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the full IBAN.
* LocalInstrument is the requested payment scheme for execution. This is a free-text field.
* InstructionPrioirty may be used by the ASPSP to determine the payment scheme for execution.
* The InstructedAmount object must be populated with the desired Amount and Currency of transfer, regardless of the currency of the DebtorAccount or CreditorAccount. I.e., a PSU may wish to transfer 100EUR from a GBP DebtorAccount (InstructedAmount will be 100EUR), or 100GBP to an EUR CreditorAccount (the InstructedAmount will be 100GBP).
* The CurrencyOfTransfer is used to specify the currency the funds will be transferred. I.e., a PSU may wish to transfer 100USD from a GBP DebtorAccount to a Rupee INR CreditorAccount in India.
* The ChargeBearer field is used by the PISP to indicate the bearer of charges. An ASPSP must reject the request if the requested charge allocation cannot be fulfilled.

The OBInternational3/ExchangeRateInformation object must conform to these behaviours:

* A PISP must specify the DebtorAccount currency in the UnitCurrency field if the PISP is requesting a specific RateType so the ASPSP can respond with an exchange rate quote prior to PSU authorisation.
* A PISP may indicate an exchange rate request using the RateType with these enumerations:
  * Actual.
  * Agreed.
  * Indicative.
* A PISP must specify ExchangeRate and ContractIdentification when requesting an **Agreed** RateType. If an invalid ContractIdentification and ExchangeRate are requested together, an ASPSP must reject the request.
  * For an "Agreed" RateType a requested exchange rate is populated in the ExchangeRate field, against the UnitCurrency. I.e, if the UnitCurrency is GBP and CurrencyOfTransfer is USD, then ExchangeRate will be 1.34 (USD to 1 GBP).
  * For an "Agreed" RateType the exchange rate contract identifier is populated in the ContractIdentification field.
* A PISP must not specify ExchangeRate and/or ContractIdentification when requesting an **Actual** RateType.
* A PISP must not specify ExchangeRate and/or ContractIdentification when requesting an **Indicative** RateType.

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBInternational3 | |OBInternational3 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single international payment. |OBInternational3 | | |
| InstructionIdentification |1..1 |OBInternational3/InstructionIdentification |Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction. |Max35Text | | |
| EndToEndIdentification |1..1 |OBInternational3/EndToEndIdentification |Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field. |Max35Text | | |
| LocalInstrument |0..1 |OBInternational3/LocalInstrument |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code | | |
| InstructionPriority |0..1 |OBInternational3/InstructionPriority |Indicator of the urgency or order of importance that the instructing party would like the instructed party to apply to the processing of the instruction. |OBPriority2Code |Normal Urgent | |
| Purpose |0..1 |OBInternational3/Purpose |Specifies the external purpose code in the format of character string with a maximum length of 4 characters. The list of valid codes is an external code list published separately. External code sets can be downloaded from www.iso20022.org. |OBExternalPurpose1Code1 | | |
| ExtendedPurpose |0..1 |OBInternational3/ExtendedPurpose |Specifies the purpose of an international payment, when there is no corresponding 4 character code available in the ISO20022 list of Purpose Codes. |Max140Text | | |
| ChargeBearer |0..1 |OBInternational3/ChargeBearer |Specifies which party/parties will bear the charges associated with the processing of the payment transaction. |OBChargeBearerType1Code |BorneByCreditor BorneByDebtor FollowingServiceLevel Shared | |
| CurrencyOfTransfer |1..1 |OBInternational3/CurrencyOfTransfer |Specifies the currency of the to be transferred amount, which is different from the currency of the debtor's account. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DestinationCountryCode |0..1 |OBInternational3/DestinationCountryCode |Country in which Credit Account is domiciled. Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| InstructedAmount |1..1 |OBInternational3/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBInternational3/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBInternational3/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| ExchangeRateInformation |0..1 |OBInternational3/ExchangeRateInformation |Provides details on the currency exchange rate and contract. |OBExchangeRate1 | | |
| UnitCurrency |1..1 |OBInternational3/ExchangeRateInformation/UnitCurrency |Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| ExchangeRate |0..1 |OBInternational3/ExchangeRateInformation/ExchangeRate |The factor used for conversion of an amount from one currency to another. This reflects the price at which one currency was bought with another currency. |BaseOneRate | | |
| RateType |1..1 |OBInternational3/ExchangeRateInformation/RateType |Specifies the type used to complete the currency exchange. |OBExchangeRateType2Code |Actual Agreed Indicative | |
| ContractIdentification |0..1 |OBInternational3/ExchangeRateInformation/ContractIdentification |Unique and unambiguous reference to the foreign exchange contract agreed between the initiating party/creditor and the debtor agent. |Max256Text | | |
| DebtorAccount |0..1 |OBInternational3/DebtorAccount |Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBInternational3/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternational3/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBInternational3/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBInternational3/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Creditor |0..1 |OBInternational3/Creditor |Party to which an amount of money is due. |OBPartyIdentification43 | | |
| LEI |0..1 |OBInternational3/Creditor/LEI |Name by which a party is known and which is usually used to identify that party. |OBLegalEntityIdentity| | |
| Accounts |0..n |OBInternational3/Creditor/LEI/Data/Account |Unambiguous identification of the account to which credit and debit entries are made. |OBAccount6 | | |
| AccountId |1..1 |OBInternational3/Creditor/LEI/AccountsAccountId |A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner. |Max40Text | | |
| Status |0..1 |OBInternational3/Creditor/LEI/AccountsStatus |Specifies the status of account resource in code form. |OBAccountStatus1Code |Enabled Disabled Deleted ProForma Pending | |
| StatusUpdateDateTime |0..1 |OBInternational3/Creditor/LEI/AccountsStatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| Currency |0..1 |OBInternational3/Creditor/LEI/AccountsCurrency |Identification of the currency in which the account is held. Usage: Currency should only be used in case one and the same account number covers several currencies and the initiating party needs to identify which currency needs to be used for settlement on the account. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| AccountCategory |0..1 |OBInternational3/Creditor/LEI/AccountsAccountCategory |Specifies the type of account (personal or business). |OBInternalAccountType1Code |Business Personal | |
| AccountTypeCode |0..1 |OBInternational3/Creditor/LEI/AccountsAccountTypeCode |Specifies the sub type of account (product family group). |OBExternalAccountSubType1Code |CACC <br>CARD <br>CASH <br>CHAR <br>CISH <br>COMM <br>CPAC <br>LLSV <br>LOAN <br>MGLD <br>MOMA <br>NFCA <br>NREX <br>ODFT <br>ONDP <br>OTHR <br>SACC <br>SLRY <br>SVGS <br>TAXE <br>TRAN <br>TRAS <br>VACC <br>MORT <br>WALT  | |
| Description |0..1 |OBInternational3/Creditor/LEI/AccountsDescription |Specifies the description of the account type. |Max35Text | | |
| Nickname |0..1 |OBInternational3/Creditor/LEI/AccountsNickname |The nickname of the account, assigned by the account owner in order to provide an additional means of identification of the account. |Max70Text | | |
| OpeningDate |0..1 |OBInternational3/Creditor/LEI/AccountsOpeningDate | Date on which the account and related basic services are effectively operational for the account owner. | ISODate | | |
| MaturityDate |0..1 |OBInternational3/Creditor/LEI/AccountsMaturityDate | Maturity date for the account. | ISODate | | |
| SwitchStatus |0..1 |OBInternational3/Creditor/LEI/AccountsSwitchStatus | The switch status for the account. | OBExternalSwitchStatusCode | | |
| Account |0..n |OBInternational3/Creditor/LEI/AccountsAccount |Provides the details to identify an account. |OBCashAccount5 | | |
| SchemeName |1..1 |OBInternational3/Creditor/LEI/AccountsAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternational3/Creditor/LEI/AccountsAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBInternational3/Creditor/LEI/AccountsAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBInternational3/Creditor/LEI/AccountsAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| StatementFrequencyAndFormat |0..* |OBInternational3/Creditor/LEI/AccountsStatementFrequencyAndFormat |The frequency and format of the statements delivered for the account |StatementFrequencyAndFormat | | |
| DeliveryAddress |0..1 |OBInternational3/Creditor/LEI/AccountsDeliveryAddress |The address the statement is delivered to| | |
| Frequency |0..1 |OBInternational3/Creditor/LEI/AccountsStatementFrequencyAndFormat/Frequency |YEAR <br>DAIL <br>INDA <br>MNTH <br>QURT <br>MIAN <br>TEND <br>MOVE <br>WEEK  |OBFrequency2 | | |
| CommunicationMethod |0..1 |OBInternational3/Creditor/LEI/AccountsStatementFrequencyAndFormat/CommunicationMethod |EMAL <br>FAXI <br>FILE <br>ONLI <br>POST |OBCommunicationMethod | | |
| Format |0..1 |OBInternational3/Creditor/LEI/AccountsStatementFrequencyAndFormat/Format |DPDF <br>DXML <br>SDSH <br>WORD <br>XSLT |OBFileFormat | | |
| Servicer |0..1 |OBInternational3/Creditor/LEI/AccountsServicer |Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account. |OBBranchAndFinancialInstitutionIdentification5 | | |
| Name |0..1 |OBInternational3/Creditor/LEI/AccountsServicer/Name |Name of Service User. |Max140Text | | |
| SchemeName |1..1 |OBInternational3/Creditor/LEI/AccountsServicer/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |1..1 |OBInternational3/Creditor/LEI/AccountsServicer/Identification |Unique and unambiguous identification of the servicing institution. |Max35Text | | |
|Beneficiaries |0..* |OBInternational3/Creditor/LEI/Beneficiaries |Financial institution servicing an account for the creditor. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/Identification |Unique and unambiguous identification of a financial institution or a branch of a financial institution. |Max35Text | | |
| Name |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| PostalAddress |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| Parties | 0.* |OBInternational3/Creditor/LEI/Parties | |OBInternational3/Creditor/LEI/Parties | | |
| PartyId |1..1 |OBInternational3/Creditor/LEI/Parties/PartyId |A unique and immutable identifier used to identify the customer resource. This identifier has no meaning to the account owner. |Max40Text | | |
| PartyNumber |0..1 |OBInternational3/Creditor/LEI/Parties/PartyNumber |Number assigned by an agent to identify its customer. |Max35Text | | |
| PartyType |0..1 |OBInternational3/Creditor/LEI/Parties/PartyType |Party type |OBExternalPartyType1Code |Delegate Joint Sole | |
| Name |0..1 |OBInternational3/Creditor/LEI/Parties/Name |Name by which a party is known and which is usually used to identify that party. |Max350Text | | |
| FullLegalName |0..1 |OBInternational3/Creditor/LEI/Parties/FullLegalName |The full legal name of the party. |Max350Text | | |
| LegalStructure |0..1 |OBInternational3/Creditor/LEI/Parties/LegalStructure |Legal standing of the party. |OBExternalLegalStructureType1Code | | |
| BeneficialOwnership |0..1 |OBInternational3/Creditor/LEI/Parties/BeneficialOwnership |A flag to indicate a party's beneficial ownership of the related account. |xs:boolean | | |
| AccountRole |0..1 |OBInternational3/Creditor/LEI/Parties/AccountRole |A party's role with respect to the related account. |OBExternalAccountRole1Code | | |
| EmailAddress |0..1 |OBInternational3/Creditor/LEI/Parties/EmailAddress |Address for electronic mail (e-mail). |Max256Text | | |
| Phone |0..1 |OBInternational3/Creditor/LEI/Parties/Phone |Collection of information that identifies a phone number as defined by telecom services. |PhoneNumber | |\+[0-9]{1,3}-[0-9()+\-]{1,30} |
| Mobile |0..1 |OBInternational3/Creditor/LEI/Parties/Mobile |Collection of information that identifies a mobile phone number as defined by telecom services. |PhoneNumber | |\+[0-9]{1,3}-[0-9()+\-]{1,30} |
| Relationships |0..1 |OBInternational3/Creditor/LEI/Parties/Relationships |The Party's relationships with other resources. |OBPartyRelationships1 | | |
| Account |0..1 |OBInternational3/Creditor/LEI/Parties/Relationships/Account |Relationship to the Account resource. |OBRelationship1 | | |
| Related |1..1 |OBInternational3/Creditor/LEI/Parties/Relationships/Account/Related |Absolute URI to the related resource. |xs:anyURI | | |
| Id |1..1 |OBInternational3/Creditor/LEI/Parties/Relationships/Account/Id |Unique identification as assigned by the ASPSP to uniquely identify the related resource. |Max40Text | | |
| Address |0..n |OBInternational3/Creditor/LEI/Parties/Address |Postal address of a party. |OBPostalAddress8 | | |
| AddressType |0..1 |OBInternational3/Creditor/LEI/Parties/Address/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| AddressLine |0..5 |OBInternational3/Creditor/LEI/Parties/Address/AddressLine |Information that locates and identifies a specific address, as defined by postal services, that is presented in free format text. |Max70Text | | |
| StreetName |0..1 |OBInternational3/Creditor/LEI/Parties/Address/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternational3/Creditor/LEI/Parties/Address/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternational3/Creditor/LEI/Parties/Address/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternational3/Creditor/LEI/Parties/Address/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternational3/Creditor/LEI/Parties/Address/CountrySubDivision |Identifies a subdivision of a country eg, state, region, county. |Max35Text | | |
| Country |1..1 |OBInternational3/Creditor/LEI/Parties/Address/Country |Nation with its own government, occupying a particular territory. |CountryCode | |^[A-Z]{2,2}$ |
| LEI |0..1 |OBInternational3/Creditor/LEI |Name by which a party is known and which is usually used to identify that party. |OBLegalEntityIdentity| | |
| Accounts |0..n |OBInternational3/Creditor/LEI/Data/Account |Unambiguous identification of the account to which credit and debit entries are made. |OBAccount6 | | |
| AccountId |1..1 |OBInternational3/Creditor/LEI/AccountsAccountId |A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner. |Max40Text | | |
| Status |0..1 |OBInternational3/Creditor/LEI/AccountsStatus |Specifies the status of account resource in code form. |OBAccountStatus1Code |Enabled Disabled Deleted ProForma Pending | |
| StatusUpdateDateTime |0..1 |OBInternational3/Creditor/LEI/AccountsStatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| Currency |0..1 |OBInternational3/Creditor/LEI/AccountsCurrency |Identification of the currency in which the account is held. Usage: Currency should only be used in case one and the same account number covers several currencies and the initiating party needs to identify which currency needs to be used for settlement on the account. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| AccountCategory |0..1 |OBInternational3/Creditor/LEI/AccountsAccountCategory |Specifies the type of account (personal or business). |OBInternalAccountType1Code |Business Personal | |
| AccountTypeCode |0..1 |OBInternational3/Creditor/LEI/AccountsAccountTypeCode |Specifies the sub type of account (product family group). |OBExternalAccountSubType1Code |CACC <br>CARD <br>CASH <br>CHAR <br>CISH <br>COMM <br>CPAC <br>LLSV <br>LOAN <br>MGLD <br>MOMA <br>NFCA <br>NREX <br>ODFT <br>ONDP <br>OTHR <br>SACC <br>SLRY <br>SVGS <br>TAXE <br>TRAN <br>TRAS <br>VACC <br>MORT <br>WALT  | |
| Description |0..1 |OBInternational3/Creditor/LEI/AccountsDescription |Specifies the description of the account type. |Max35Text | | |
| Nickname |0..1 |OBInternational3/Creditor/LEI/AccountsNickname |The nickname of the account, assigned by the account owner in order to provide an additional means of identification of the account. |Max70Text | | |
| OpeningDate |0..1 |OBInternational3/Creditor/LEI/AccountsOpeningDate | Date on which the account and related basic services are effectively operational for the account owner. | ISODate | | |
| MaturityDate |0..1 |OBInternational3/Creditor/LEI/AccountsMaturityDate | Maturity date for the account. | ISODate | | |
| SwitchStatus |0..1 |OBInternational3/Creditor/LEI/AccountsSwitchStatus | The switch status for the account. | OBExternalSwitchStatusCode | | |
| Account |0..n |OBInternational3/Creditor/LEI/AccountsAccount |Provides the details to identify an account. |OBCashAccount5 | | |
| SchemeName |1..1 |OBInternational3/Creditor/LEI/AccountsAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternational3/Creditor/LEI/AccountsAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBInternational3/Creditor/LEI/AccountsAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBInternational3/Creditor/LEI/AccountsAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| StatementFrequencyAndFormat |0..* |OBInternational3/Creditor/LEI/AccountsStatementFrequencyAndFormat |The frequency and format of the statements delivered for the account |StatementFrequencyAndFormat | | |
| DeliveryAddress |0..1 |OBInternational3/Creditor/LEI/AccountsDeliveryAddress |The address the statement is delivered to| | |
| Frequency |0..1 |OBInternational3/Creditor/LEI/AccountsStatementFrequencyAndFormat/Frequency |YEAR <br>DAIL <br>INDA <br>MNTH <br>QURT <br>MIAN <br>TEND <br>MOVE <br>WEEK  |OBFrequency2 | | |
| CommunicationMethod |0..1 |OBInternational3/Creditor/LEI/AccountsStatementFrequencyAndFormat/CommunicationMethod |EMAL <br>FAXI <br>FILE <br>ONLI <br>POST |OBCommunicationMethod | | |
| Format |0..1 |OBInternational3/Creditor/LEI/AccountsStatementFrequencyAndFormat/Format |DPDF <br>DXML <br>SDSH <br>WORD <br>XSLT |OBFileFormat | | |
| Servicer |0..1 |OBInternational3/Creditor/LEI/AccountsServicer |Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account. |OBBranchAndFinancialInstitutionIdentification5 | | |
| Name |0..1 |OBInternational3/Creditor/LEI/AccountsServicer/Name |Name of Service User. |Max140Text | | |
| SchemeName |1..1 |OBInternational3/Creditor/LEI/AccountsServicer/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |1..1 |OBInternational3/Creditor/LEI/AccountsServicer/Identification |Unique and unambiguous identification of the servicing institution. |Max35Text | | |
|Beneficiaries |0..* |OBInternational3/Creditor/LEI/Beneficiaries |Financial institution servicing an account for the creditor. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/Identification |Unique and unambiguous identification of a financial institution or a branch of a financial institution. |Max35Text | | |
| Name |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| PostalAddress |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternational3/Creditor/LEI/Beneficiaries/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| Parties | 0.* |OBInternational3/Creditor/LEI/Parties | |OBInternational3/Creditor/LEI/Parties | | |
| PartyId |1..1 |OBInternational3/Creditor/LEI/Parties/PartyId |A unique and immutable identifier used to identify the customer resource. This identifier has no meaning to the account owner. |Max40Text | | |
| PartyNumber |0..1 |OBInternational3/Creditor/LEI/Parties/PartyNumber |Number assigned by an agent to identify its customer. |Max35Text | | |
| PartyType |0..1 |OBInternational3/Creditor/LEI/Parties/PartyType |Party type |OBExternalPartyType1Code |Delegate Joint Sole | |
| Name |0..1 |OBInternational3/Creditor/LEI/Parties/Name |Name by which a party is known and which is usually used to identify that party. |Max350Text | | |
| FullLegalName |0..1 |OBInternational3/Creditor/LEI/Parties/FullLegalName |The full legal name of the party. |Max350Text | | |
| LegalStructure |0..1 |OBInternational3/Creditor/LEI/Parties/LegalStructure |Legal standing of the party. |OBExternalLegalStructureType1Code | | |
| BeneficialOwnership |0..1 |OBInternational3/Creditor/LEI/Parties/BeneficialOwnership |A flag to indicate a party's beneficial ownership of the related account. |xs:boolean | | |
| AccountRole |0..1 |OBInternational3/Creditor/LEI/Parties/AccountRole |A party's role with respect to the related account. |OBExternalAccountRole1Code | | |
| EmailAddress |0..1 |OBInternational3/Creditor/LEI/Parties/EmailAddress |Address for electronic mail (e-mail). |Max256Text | | |
| Phone |0..1 |OBInternational3/Creditor/LEI/Parties/Phone |Collection of information that identifies a phone number as defined by telecom services. |PhoneNumber | |\+[0-9]{1,3}-[0-9()+\-]{1,30} |
| Mobile |0..1 |OBInternational3/Creditor/LEI/Parties/Mobile |Collection of information that identifies a mobile phone number as defined by telecom services. |PhoneNumber | |\+[0-9]{1,3}-[0-9()+\-]{1,30} |
| Relationships |0..1 |OBInternational3/Creditor/LEI/Parties/Relationships |The Party's relationships with other resources. |OBPartyRelationships1 | | |
| Account |0..1 |OBInternational3/Creditor/LEI/Parties/Relationships/Account |Relationship to the Account resource. |OBRelationship1 | | |
| Related |1..1 |OBInternational3/Creditor/LEI/Parties/Relationships/Account/Related |Absolute URI to the related resource. |xs:anyURI | | |
| Id |1..1 |OBInternational3/Creditor/LEI/Parties/Relationships/Account/Id |Unique identification as assigned by the ASPSP to uniquely identify the related resource. |Max40Text | | |
| Address |0..n |OBInternational3/Creditor/LEI/Parties/Address |Postal address of a party. |OBPostalAddress8 | | |
| AddressType |0..1 |OBInternational3/Creditor/LEI/Parties/Address/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| AddressLine |0..5 |OBInternational3/Creditor/LEI/Parties/Address/AddressLine |Information that locates and identifies a specific address, as defined by postal services, that is presented in free format text. |Max70Text | | |
| StreetName |0..1 |OBInternational3/Creditor/LEI/Parties/Address/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternational3/Creditor/LEI/Parties/Address/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternational3/Creditor/LEI/Parties/Address/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternational3/Creditor/LEI/Parties/Address/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternational3/Creditor/LEI/Parties/Address/CountrySubDivision |Identifies a subdivision of a country eg, state, region, county. |Max35Text | | |
| Country |1..1 |OBInternational3/Creditor/LEI/Parties/Address/Country |Nation with its own government, occupying a particular territory. |CountryCode | |^[A-Z]{2,2}$ |
| RemittanceInformation |0..1 |OBInternational3/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation1 | | |
| Unstructured |0..1 |OBInternational3/RemittanceInformation/Unstructured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text | | |
| Reference |0..1 |OBInternational3/RemittanceInformation/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped. |Max35Text | | |
| SupplementaryData |0..1 |OBInternational3/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

#### OBExchangeRate2

This section describes the OBExchangeRate2 class, which is used in the response payloads in the international-payment-consent resource.

![Exchange Rate Model](./images/OBExchangeRate2.svg)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBExchangeRate2 | |OBExchangeRate2 |Further detailed information on the exchange rate that has been used in the payment transaction. |OBExchangeRate2 | | |
| UnitCurrency |1..1 |OBExchangeRate2/UnitCurrency |Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP. |ActiveOrHistoricCurrencyCode |^[A-Z]{3,3}$ | |
| ExchangeRate |1..1 |OBExchangeRate2/ExchangeRate |The factor used for conversion of an amount from one currency to another. This reflects the price at which one currency was bought with another currency. |BaseOneRate | | |
| RateType |1..1 |OBExchangeRate2/RateType |Specifies the type used to complete the currency exchange. |OBExchangeRateType2Code |Actual Agreed Indicative | |
| ContractIdentification |0..1 |OBExchangeRate2/ContractIdentification |Unique and unambiguous reference to the foreign exchange contract agreed between the initiating party/creditor and the debtor agent. |Max256Text | | |
| ExpirationDateTime |0..1 |OBExchangeRate2/ExpirationDateTime |Specified date and time the exchange rate agreement will expire. |ISODateTime | | |

### International Payment Consent - Request

The OBWriteInternationalConsent5 object will be used for the call to:

* POST /international-payment-consents

#### UML Diagram

![International Payment Consent - Request](./images/OBWriteInternationalConsent5.svg)

#### Notes 

The international-payment-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk

Exchange rate behaviour:

* An ASPSP **must** respond to an **Agreed** RateType request. 
* An ASPSP **may** respond to an **Actual** RateType request or **may** reject the request. 
* An ASPSP **may** respond to an **Indicative** RateType request or **may** reject the request. 
* An ASPSP **must** reject the international-payment-consent request if the specified Initiation/ExchangeRateInformation cannot be fulfilled.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteInternationalConsent5 | |OBWriteInternationalConsent5 | |OBWriteInternationalConsent5 | | |
| Data |1..1 |OBWriteInternationalConsent5/Data | |OBWriteDataInternationalConsent5 | | |
| ReadRefundAccount |0..1 |OBWriteInternationalConsent5/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
| Initiation |1..1 |OBWriteInternationalConsent5/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single international payment. |OBInternational3 | | |
| Authorisation |0..1 |OBWriteInternationalConsent5/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteInternationalConsent5/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteInternationalConsent5/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### International Payment Consent - Response

The OBWriteInternationalConsentResponse6 object will be used for a response to a call to:

* POST /international-payment-consents
* GET /international-payment-consents/{ConsentId}

#### UML Diagram

![International Payment Consent - Response](./images/OBWriteInternationalConsentResponse6.svg)

#### Notes 

The international-payment-consent **response** contains the full **original** payload from the international-payment-consent **request** with the additional elements below:

* ConsentId.
* CreationDateTime the international-payment-consent resource was created.
* Status and StatusUpdateDateTime of the international-payment-consent resource.
* CutOffDateTime Behaviour is explained in Payment Initiation API Profile, Section - [Payment Restrictions -> CutOffDateTime Behaviour](../../profiles/payment-initiation-api-profile.md#cutoffdatetime-behaviour).
* ExpectedExecutionDateTime for the international-payment resource if created before CutOffDateTIme - the expected DateTime the payment is executed against the Debtor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* ExpectedSettlementDateTime for the international-payment resource if created before CutOffDateTIme - the expected DateTime the payment will be received at the Creditor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* Charges array which will be used by the ASPSP to indicate charges, and the ChargeBearer as relevant.
* Post successful PSU Authentication, an ASPSP may provide `Debtor/Name` in the Payment Order Consent Response, even when the Payer didn't provide the Debtor Account via PISP.
* ExchangeRateInformation (the ASPSP response) - this object will be used to communicate exchange rate information back to the PISP. It must be consistent with what is requested in the Initiation object from the PISP.

Exchange rate behaviour:

* For an **Agreed** RateType - if an ASPSP chooses to respond with Data/ExchangeRateInformation object:
  * An ASPSP may respond with the same requested exchange rate in the Data/ExchangeRateInformation object.
  * An ASPSP must not populate Data/ExchangeRateInformation/ExpirationDateTime.
* For an **Actual** RateType - if an ASPSP chooses to respond with Data/ExchangeRateInformation object:
  * An ASPSP must respond with an actual quote in the Data/ExchangeRateInformation object.
  * An ASPSP must respond with an actual ExchangeRate quote.
  * An ASPSP must respond with an ExpirationDateTime.
  * An ASPSP must reject the international-payment request if the PISP does not submit the international-payment within the ExchangeRateInformation/ExpirationDateTime.
* For an **Indicative** RateType - if an ASPSP chooses to respond with Data/ExchangeRateInformation object:
  * An ASPSP must respond with an indicative quote in the Data/ExchangeRateInformation object.
  * An ASPSP must respond with an indicative ExchangeRate quote.
  * An ASPSP must not populate Data/ExchangeRateInformation/ExpirationDateTime for the exchange rate, as it is the market rate on the date of execution (date on which the DebtorAccount is debited).

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteInternationalConsentResponse6 | |OBWriteInternationalConsentResponse6 | |OBWriteInternationalConsentResponse6 | | |
| Data |1..1 |OBWriteInternationalConsentResponse6/Data | |OBWriteDataInternationalConsentResponse6 | | |
| ConsentId |1..1 |OBWriteInternationalConsentResponse6/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteInternationalConsentResponse6/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteInternationalConsentResponse6/Data/Status |Specifies the status of consent resource in code form. |OBExternalConsentStatus1Code |Authorised AwaitingAuthorisation Consumed Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteInternationalConsentResponse6/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| ReadRefundAccount |0..1 |OBWriteInternationalConsentResponse6/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
| CutOffDateTime |0..1 |OBWriteInternationalConsentResponse6/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteInternationalConsentResponse6/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteInternationalConsentResponse6/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..n |OBWriteInternationalConsentResponse6/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| ExchangeRateInformation |0..1 |OBWriteInternationalConsentResponse6/Data/ExchangeRateInformation |Further detailed information on the exchange rate that has been used in the payment transaction. |OBExchangeRate2 | | |
| Initiation |1..1 |OBWriteInternationalConsentResponse6/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single international payment. |OBInternational3 | | |
| Authorisation |0..1 |OBWriteInternationalConsentResponse6/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteInternationalConsentResponse6/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteInternationalConsentResponse6/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |BWriteInternationalConsentResponse6/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |BWriteInternationalConsentResponse6/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |BWriteInternationalConsentResponse6/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |BWriteInternationalConsentResponse6/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Risk |1..1 |OBWriteInternationalConsentResponse6/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### International Payment Consent Confirmation of Funds - Response

The OBWriteFundsConfirmationResponse1 object will be used for a response to a call to:

* GET /international-payment-consents/{ConsentId}/funds-confirmation

#### UML Diagram

![International Payment Consent Confirmation of Funds - Response](./images/OBWriteFundsConfirmationResponse1.svg)

#### Notes 

The confirmation of funds response contains the result of a funds availability check, or SupplementaryData.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteFundsConfirmationResponse1 | |OBWriteFundsConfirmationResponse1 | |OBWriteFundsConfirmationResponse1 | | |
| Data |1..1 |OBWriteFundsConfirmationResponse1/Data | |OBWriteDataFundsConfirmationResponse1 | | |
| FundsAvailableResult |0..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult |Result of a funds availability check. |OBFundsAvailableResult1 | | |
| FundsAvailableDateTime |1..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailableDateTime |Date and time at which the funds availability check was generated. |ISODateTime | | |
| FundsAvailable |1..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailable |Flag to indicate the availability of funds given the Amount in the consent request. |xs:boolean | | |
| SupplementaryData |0..1 |OBWriteFundsConfirmationResponse1/Data/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

## Usage Examples

### POST /international-payment-consents

#### Request

```
POST /international-payment-consents HTTP/1.1
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
    "ReadRefundAccount": "Yes",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructionPriority": "Normal",
      "CurrencyOfTransfer": "USD",
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
  "ConsentId": "58923",
  "Status": "AwaitingAuthorisation",
  "CutOffDateTime": "2017-06-05T16:00:13+00:00",
  "CreationDateTime": "2017-06-05T15:15:13+00:00",
  "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
  "ReadRefundAccount": "Yes",
  "Initiation": {
   "InstructionIdentification": "ACME412",
   "EndToEndIdentification": "FRESCO.21302.GFX.20",
   "InstructionPriority": "Normal",
   "CurrencyOfTransfer": "USD",
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
   },
   "ExchangeRateInformation": {
    "UnitCurrency": "GBP",
    "RateType": "Actual"
   }
  },
  "ExchangeRateInformation": {
   "UnitCurrency": "GBP",
   "ExchangeRate": 1.1,
   "RateType": "Actual",
   "ExpirationDateTime": "2017-06-05T15:45:13+00:00"
  }
 },
 "Risk": {
  "PaymentContextCode": "TransferToThirdParty"
 },
 "Links": {
  "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-payment-consents/58923"
 },
 "Meta": {}
}
```

### GET / international-payment-consents/{ConsentId}/funds-confirmation

#### Request

```
GET /international-payment-consents/58923/funds-confirmation HTTP/1.1
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
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-payment-consents/58923/funds-confirmation"
	},
	"Meta": {}
}
```
