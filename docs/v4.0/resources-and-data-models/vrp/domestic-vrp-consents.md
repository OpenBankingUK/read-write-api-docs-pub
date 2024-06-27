# Domestic VRP consents - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /domestic-vrp-consents](#post-domestic-vrp-consents)
  - [GET /domestic-vrp-consents/{ConsentId}](#get-domestic-vrp-consentsconsentid)
  - [DELETE /domestic-vrp-consents/{ConsentId}](#delete-domestic-vrp-consentsconsentid)
  - [POST /domestic-vrp-consents/{ConsentId}/funds-confirmation](#post-domestic-vrp-consentsconsentidfunds-confirmation)
  - [PUT /domestic-vrp-consents/{consentId}](#put-domestic-vrp-consentsconsentid)
  - [PATCH /domestic-vrp-consents/{consentId}](#patch-domestic-vrp-consentsconsentid)
- [State Model - VRP consents](#state-model---vrp-consents)
- [Data Model](#data-model)
- [Reused Classes](#reused-classes)
    - [OBProxy1](#obproxy1)
    - [OBPostalAddress7](#obpostaladdress7)
    - [OBRemittanceInformation2](#obremittanceinformation2)
    - [OBUltimateCreditor1](#obultimatecreditor1)
    - [OBUltimateDebtor1](#obultimatedebtor1)
    - [OBRegulatoryReporting1](#obregulatoryreporting1)
  - [OBCashAccountDebtorWithName](#obcashaccountdebtorwithname)
  - [OBCashAccountCreditor3](#obcashaccountcreditor3)
  - [OBBranchAndFinancialInstitutionIdentification6](#obbranchandfinancialinstitutionidentification6)
  - [OBDomesticVRPInitiation](#obdomesticvrpinitiation)
  - [OBDomesticVRPControlParameters](#obdomesticvrpcontrolparameters)
    - [Examples of Periodic Limits](#examples-of-periodic-limits)
      - [Example 1](#example-1)
      - [Example 2](#example-2)
      - [Example 3](#example-3)
      - [Example 4](#example-4)
  - [OBRisk1](#obrisk1)
  - [OBDomesticVRPConsentRequest](#obdomesticvrpconsentrequest)
  - [OBDomesticVRPConsentResponse](#obdomesticvrpconsentresponse)
  - [OBVRPFundsConfirmationRequest](#obvrpfundsconfirmationrequest)
  - [OBVRPFundsConfirmationResponse](#obvrpfundsconfirmationresponse)
- [Usage Examples](#usage-examples)
  
## Overview

The Domestic VRP Consents resource is used by a TPP to register a consent to initiate one or more of domestic payments within the control parameters agreed with the PSU.

This resource description should be read in conjunction with a compatible Variable Recurring Payments API Profile.

The PISP must call the end-point with the appropriate scope that they have been assigned.
The ASPSP may use the scope to limit to functionality to sweeping or non-sweeping usage of the VRP.

## Endpoints

| Resource | Operation |Endpoint |Mandatory  |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
|domestic-vrp-consents |POST |POST /domestic-vrp-consents |Mandatory | payments |Client Credentials |Signed Request Signed Response |Yes | OBDomesticVRPConsentRequest |OBDomesticVRPConsentResponse |
|domestic-vrp-consents |GET |GET /domestic-vrp-consents/{ConsentId} |Mandatory | payments |Client Credentials |Signed Response |No |NA |OBDomesticVRPConsentResponse |
|domestic-vrp-consents |DELETE |DELETE /domestic-vrp-consents/{ConsentId} |Mandatory | payments |Client Credentials | NA |No |NA |None |
|domestic-vrp-consents |POST |POST /domestic-vrp-consents/{ConsentId}/funds-confirmation |Mandatory | payments |Authorization Code |Signed Request Signed Response |No |OBVRPFundsConfirmationRequest |OBVRPFundsConfirmationResponse |
| domestic-vrp-consents | PUT | PUT  /domestic-vrp-consents/{ConsentId} | Optional | payments | Client Credentials | Signed Request Signed Response | Yes |  OBDomesticVRPConsentRequest | OBDomesticVRPConsentResponse |
| domestic-vrp-consents | PATCH | PATCH /domestic-vrp-consents/{ConsentId} | Optional | payments | Client Credentials | Signed Request Signed Response | Yes | OBDomesticVRPConsentRequest | OBDomesticVRPConsentResponse |

### POST /domestic-vrp-consents

The API endpoint allows the TPP to ask an ASPSP to create a new `domestic-vrp-consents` resource.

The request payload may contain Debtor Accounts, but the PSU may not have been identified by the ASPSP.

The endpoint allows the TPP to send a copy of the consent (between PSU and TPP) to the ASPSP for the PSU to authorise.

The ASPSP creates the resource and responds with a unique ConsentId to refer to the resource.

The default/initial Status of the resource is set to `AWAU`.

If the parameters specified by the TPP in this resource are not valid, or fail any rules, the ASPSP must return a 400 Bad Request. In such a situation a resource is not created.

The ASPSP **must** allow a PSU to have multiple VRP consents for a given account. This could include multiple consents with the same PISP.

The ASPSP **must** reject a consent request that has `Data.ControlParameters.SupplementaryData` that it cannot process.

Remittance Information __MAY__ be provided in the Initiation section when a VRP Consent is setup. This means the same Remittance Information __MUST__ be provided by the PISP in the Initiation and Instruction section of each VRP Payment.

An ASPSP may choose to support Dynamic references for VRP, in which case the following guidance should be used:
If each VRP Payment requires dynamic Remittance Information for each VRP Payment then the Remittance Information at the VRP Consent level __MUST NOT__ be captured.
The Remittance Information in the Initiation section provided at the VRP Payment level __MUST__ match the Initiation section provided at the VRP Consent level.

Examples:

| Remittance Information | Initiation section<br>(VRP Consent) | Initiation section<br>(VRP Payment) | Instruction section<br>(VRP Payment) |
| --- | --- | --- | --- |
| Creditor Information/Reference | Credit Card No | Credit Card No| Credit Card No |
| Creditor Information/Reference | Empty | Empty | Dynamic reference for each payment |
| Creditor Information/Reference | Empty | Empty | Dynamic Invoice number for each payment |




### GET /domestic-vrp-consents/{ConsentId}

A TPP can retrieve a VRP consent resource that they have created to check its status at any point of time using this API.

### DELETE /domestic-vrp-consents/{ConsentId}

A TPP can delete a VRP consent resource that they have created by calling this API.

### POST /domestic-vrp-consents/{ConsentId}/funds-confirmation

This API endpoint allows the TPP to ask an ASPSP to confirm funds on the `DebtorAccount` associated with the `domestic-vrp-consent`.

An ASPSP can only respond to a funds confirmation request if the resource has a Status of `AUTH`.

If resource has any other Status, the ASPSP must respond with a 400 (Bad Request) and a `U009` (UK.OB.Resource.InvalidConsentStatus) error code.

### PUT /domestic-vrp-consents/{consentId}
This endpoint is only used for migration of consent data across API Standard versions. The ASPSP can choose to implement one or both of the PUT/PATCH endpoints and TPPs should refer to the ASPSP developer portal for information on availability.    

This endpoint should not be used to modify content of an existing consent created on the same version.  The ASPSP __must__ reject request if a TPP attempts to modify an existing resource which does not require migration to the new format.

The request body should contain the correct schema for the current version of the API specification with any associated enumeration values that have moved to short code format.  Values originally supplied in the consent such as account information, control parameters, dates or monetary values __must not__ change and the ASPSP __must__ reject any requests which modify these values.

Successful submission must return the updated consent resource body.

### PATCH /domestic-vrp-consents/{consentId}
This endpoint is only used for migration of consent data across Standard versions. The ASPSP can choose to implement one or both of the PUT/PATCH endpoints and TPPs should refer to the ASPSP developer portal for information on availability.    

This endpoint should not be used to modify content of an existing consent created on the same version.  The ASPSP __must__ reject request if a TPP attempts to modify an existing resource which does not require migration to the new format.

The request body should contain an array of JSON Patch operations, as per [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902), adressing only the changed schema and any associated enumeration values that have moved to short code format, matching the current API specification.  Values originally supplied in the consent such as account information, control parameters, dates or monetary values __must not__ change and the ASPSP __must__ reject any requests which modify these values.

PATCH operations are atomic, all requested changes are successfully applied or none are. Errors should reflect the underlying cause and indicate which field caused the failure if relevant.

The following examples shows a series of patch operations that updates the ContractPresentIndicator field name and updates the AddressType value to the ISO code value.
``` json
[
 { "op": "remove", "path": "/Risk/ContractPresentInidicator" },
 { "op": "add", "path": "/Risk/ContractPresentIndicator", "value": "true" },
 { "op": "replace", "path": "/Data/Initiation/CreditorPostalAddress/AddressType", "value": "HOME" }
 { "op": "replace", "path": "/Risk/DeliveryAddress/AddressType", "value": "HOME" }
]
```

Successful submission must return the full updated consent resource body.



## State Model - VRP consents

The state model for the VRP consents resource follows the generic consent state model. However, it does not use the `COND` Status.

![VRP Consent State model](./images/PIS-VRP_PO_Consent.png)


All `domestic-vrp-consents` start off with a Status of `AWAU`

Once the PSU authorises the resource - the StausCode will be set to `AUTH`.

If the PSU rejects the consent, the StautsCode will be set to `RJCT`.

The available StatusCodes for the VRP consents resource are:

- AWAU
- RJCT
- AUTH
- CANC
- EXPD

The definitions for the Status:

|     | Status                |  Description                                                            |
|-----|-----------------------|-------------------------------------------------------------------------------|
| 1   | AWAU | The consent resource is awaiting PSU authorisation.                           |
| 2   | RJCT              | The consent resource has been rejected.                                       |
| 3   | AUTH            | The consent resource has been successfully authorised.  
| 4| CANC| The consent resource has been canceled.                      |
| 5| EXPD| The consent resource has expired.|


Changes to the Status, such as being rejected, should be captured in `StatusReason`, an array of `StatusReasonCode`, `StatusReasonDescription` and `Path`.  

| Field | Description |
|---|---|
| StatusReasonCode | Code directly relating to the reason for the current Status. See `OBExternalStatusReason1Code` in [OB_Internal_CodeSet](https://github.com/OpenBankingUK/External_internal_CodeSets) for appropriate values. |
| StatusReasonDescription | Description of why the code was returned |
|Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path. |

## Data Model

The data dictionary section gives the detail on the payload content for the VRP consent API flows.

### Reused Classes

#### OBProxy1  

The OBProxy1 class is defined in the [vrp-profile](../../profiles/vrp-profile.md#obproxy1) page.

#### OBPostalAddress7 

The OBPostalAddress7 class is defined in the [vrp-profile](../../profiles/vrp-profile.md#obpostaladdress7) page.

#### OBRemittanceInformation2

The OBRemittanceInformation2 class is defined in the [vrp-profile](../../profiles/vrp-profile.md#obremittanceinformation2) page.

#### OBUltimateCreditor1

The OBUltimateCreditor1 class is defined in the [vrp-profile](../../profiles/vrp-profile.md#obultimatecreditor1) page.

#### OBUltimateDebtor1 

The OBUltimateDebtor1 class is defined in the [vrp-profile](../../profiles/vrp-profile.md#obultimatedebtor1) page.

#### OBRegulatoryReporting1

The OBRegulatoryReporting1 class is defined in the [vrp-profile](../../profiles/vrp-profile.md#obregulatoryreporting1) page.

### OBCashAccountDebtorWithName

![OBCashAccountDebtorWithName](./images/OBCashAccountDebtorWithName.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __SchemeName__ (1..1) | `SchemeName` | Name of the identification scheme, in a coded form as published in an external list. | Namespaced Enumeration `OBInternalAccountIdentification4Code`<br><br>For more information see `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)
| __Identification__ (1..1) | `Identification` | Identification assigned by an institution to identify an account. This identification is known by the account owner. | Max256Text
| __Name__ (1..1) | `Name` | Name of the account, as assigned by the account servicing institution.  Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account. | Max70Text  
| __SecondaryIdentification__ (0..1) | `SecondaryIdentification` | This is secondary identification of the account, as assigned by the account servicing institution.  This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination) | Max34Text
| __Proxy__ (0..1) |`Proxy` |Specifies an alternate assumed name for the identification of the account. |[OBProxy1](../../profiles/vrp-profile.md#obproxy1)|

### OBCashAccountCreditor3

![OBCashAccountCreditor3](./images/OBCashAccountCreditor3.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __SchemeName__ (1..1) | `SchemeName` | Name of the identification scheme, in a coded form as published | 
| __Identification__ (1..1) | `Identification` |Identification assigned by an institution to identify an account. This identification is known by the account owner.   |Max256Text|
| __Name__ (1..1) | `Name` |Name of the account, as assigned by the account servicing institution, in consent with the account owner in order to provide an additional means of identification of the account.  Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number. OB: No name validation is expected for confirmation of payee.|Max70Text  |
| __SecondaryIdentification__ (0..1) | `SecondaryIdentification` |This is secondary identification of the account, as assigned by the account servicing institution.  This can be used by building societies to additionally identify accounts with a roll number__ (in addition to a sort code and account number combination).             |Max34Text|
| __Proxy__ (0..1) |`Proxy` |Specifies an alternate assumed name for the identification of the account. |[OBProxy1](../../profiles/vrp-profile.md#obproxy1)|

### OBBranchAndFinancialInstitutionIdentification6

![OBBranchAndFinancialInstitutionIdentification6](./images/OBBranchAndFinancialInstitutionIdentification6.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __SchemeName__ (0..1) | `SchemeName` |Name of the identification scheme, in a coded form as published in an external list. |OBInternalFinancialInstitutionIdentification4Code
| __Identification__ (0..1) | `Identification` |Unique and unambiguous identification of a financial institution or a branch of a financial institution.  | Max35Text  
| __Name__ (0..1) | `Name` | Name by which an agent is known and which is usually used to identify that agent. | Max140Text
| __LEI__ (0..1) | `LEI` | Legal entity identification as an alternate identification for a party. <br>Legal Entity Identifier is a code allocated to a party as described in ISO 17442 "Financial Services - Legal Entity Identifier (LEI)". | Max20Text |
| __PostalAddress__ (0..1) | `PostalAddress` |Information that locates and identifies a specific address, as defined by postal services.| [OBPostalAddress7](../../profiles/vrp-profile.md#obpostaladdress7) |


### OBDomesticVRPInitiation

![OBDomesticVRPInitiation](./images/OBDomesticVRPInitiation.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __DebtorAccount__ (0..1) | `DebtorAccount` | Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. | [OBCashAccountDebtorWithName](#OBCashAccountDebtorWithName) |
| __UltimateDebtor__ (0..1) | `UltimateDebtor` | Ultimate party that owes an amount of money to the (ultimate) creditor. |[OBUltimateDebtor1](../../profiles/vrp-profile.md#obultimatedebtor1) |
| __CreditorAgent__ (0..1) | `CreditorAgent` | Financial institution servicing an account for the creditor.     | OBBranchAndFinancialInstitutionIdentification6 |
| __CreditorAccount__ (0..1) | `CreditorAccount`   |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.       |OBCashAccountCreditor3 |
| __CreditorPostalAddress__ | `CreditorPostalAddress` | Information that locates and identifies a specific address, as defined by postal services or in free format text. | [OBPostalAddress7](../../profiles/vrp-profile.md#obpostaladdress7)|
| __UltimateCreditor__ (0..1) | `UltimateCreditor` | Ultimate party to which an amount of money is due. |[OBUltimateCreditor1](../../profiles/vrp-profile.md#obultimatecreditor1) |
| __RemittanceInformation__ (0..1) | `RemittanceInformation`   | Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. | [OBRemittanceInformation2](../../profiles/vrp-profile.md#obremittanceinformation2) |
|__RegulatoryReporting__ (0..10)| `RegulatoryReporting` | Information needed due to regulatory and statutory requirements. | [OBRegulatoryReporting1](../../profiles/vrp-profile.md#obregulatoryreporting1) |




### OBDomesticVRPControlParameters

The VRP consent is a common class used in `domestic-payment-consents` requests and responses

![OBDomesticVRPControlParameters](./images/OBDomesticVRPControlParameters.svg)

| Name                                | Path                                                   | Definition                                                                                                                                                                                                                                                                       | Type                                                |
|-------------------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| __ValidFromDateTime__ (0..1)        | `ValidFromDateTime`                                    | Start date time for which the consent remains valid. <br>The time element of the date should be disregarded in computing the date range and pro-rating.                                                                                                                          | ISODateTime                                         |
| __ValidToDateTime__ (0..1)          | `ValidToDateTime`                                      | End date time for which the consent remains valid.     <br>The time element of the date should be disregarded in computing the date range and pro-rating.                                                                                                                        | ISODateTime                                         |
| __MaximumIndividualAmount__ (1..1)  | `ControlParameters. MaximumIndividualAmount`           | Maximum amount that can be specified in a payment instruction under this VRP consent                                                                                                                                                                                             | ActiveOrHistoricCurrencyAndAmount                   |
| __Amount__ (1..1)                   | `ControlParameters. MaximumIndividualAmount. Amount`   | A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.                                                                                                                                                   |                                                     |
| __Currency__ (1..1)                 | `ControlParameters. MaximumIndividualAmount. Currency` | A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".                                           | ActiveOrHistoricCurrencyCode                        |
| __PeriodicLimits__ (1..*)           | `ControlParameters. PeriodicLimits`                    | Maximum amount that can be specified in all payment instructions in a given period under this VRP consent. If the `PeriodAlignment` is `Calendar`, the limit is pro-rated in the first period to the remaining number of days                                                    |                                                     |
| __PeriodType__ (1..1)               | `ControlParameters. PeriodicLimits. PeriodType`        | Period type for this period limit                                                                                                                                                                                                                                                | Day, Week, Fortnight, Month, Half-year, Year        |
| __PeriodAlignment__ (1..1)          | `ControlParameters. PeriodicLimits. PeriodAlignment`   | Specifies whether the period starts on the date of consent creation or lines up with a calendar. As the ISO calendar does not support or provide any guidance on when a fortnight should start, hence for a `PeriodType` of `Fortnight` the `PeriodAlignment` must be `Consent`. | Consent, Calendar                                   |
| __Amount__ (1..1)                   | `ControlParameters. PeriodicLimits. Amount`            | A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.                                                                                                                                                   |                                                     |
| __Currency__ (1..1)                 | `ControlParameters. PeriodicLimits. Currency`          | A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".                                           | ActiveOrHistoricCurrencyCode                        |
| __VRPType__ (1..*)                  | `ControlParameters. VRPType`                           | The types of payments that can be made under this VRP consent. This can be used to indicate whether this include sweeping payment or other ecommerce payments.                                                                                                                   | OBVRPConsentType - Namespaced Enumeration           |
| __PSUAuthenticationMethods__ (1..*) | `ControlParameters. PSUAuthenticationMethods`          | Indicates that the PSU authentication methods supported.                                                                                                                                                                                                                         | OBVRPAuthenticationMethods - Namespaced Enumeration |
| __PSUInteractionTypes__ (0..*)      | `ControlParameters. PSUInteractionTypes`               | Indicates interaction type, currently if customer is present or not present. If not provided the default is `"OffSession"` (the customer is not present) when the individual VRP payment is made.                                                                                                                                                                                                                      | OBVRPInteractionTypes                               |
| __SupplementaryData__ (0..1)        | `ControlParameters. SupplementaryData`                 | Additional information that can not be captured in the structured fields and/or any other specific block                                                                                                                                                                         | *                                                   |

#### Examples of Periodic Limits

##### Example 1
``` json

// created on 06-Jun-2021
{
  "PeriodType": "Month",
  "PeriodAlignment": "Calendar",
  "Amount": "300.00",
  "Currency": "GBP"
}
```

| Period | Start | End | Applicable Limit
|--------|-------|------|-----|
| 1      | 06-Jun-2021 | 30-Jun-2021 | 250.00 GBP |
| 2      | 01-Jul-2021 | 31-Jul-2021 | 300.00 GBP |
| 3      | 01-Aug-2021 | 31-Aug-2021 | 300.00 GBP |

##### Example 2

``` json
// created on 05-Jun-2021
{
  "PeriodType": "Month",
  "PeriodAlignment": "Consent",
  "Amount": "500.00",
  "Currency": "GBP"
}
```

| Period | Start | End | Applicable Limit
|--------|-------|------|----|
| 1      | 05-Jun-2021 | 04-Jul-2021 | 500.00 GBP |
| 2      | 05-Jul-2021 | 04-Jul-2021 | 500.00 GBP |
| 3      | 05-Aug-2021 | 04-Sep-2021 | 500.00 GBP |

##### Example 3

``` json
// created on 05-Jun-2021
{
  "PeriodType": "Year",
  "PeriodAlignment": "Calendar",
  "Amount": "500.00",
  "Currency": "GBP"
}
```

| Period | Start | End | Applicable Limit
|--------|-------|------|-----|
| 1      | 06-Jun-2021 | 31-Dec-2021 | 286.30 GBP (500 x 209 / 365) |
| 2      | 01-Jan-2022 | 31-Dec-2022 | 500.00 GBP |
| 3      | 01-Jan-2023 | 31-Dec-2023 | 500.00 GBP |

##### Example 4

``` json
// created on 05-Jun-2021
{
  "PeriodType": "Year",
  "PeriodAlignment": "Consent",
  "Amount": "500.00",
  "Currency": "GBP"
}
```

| Period | Start | End | Applicable Limit
|--------|-------|------|-----|
| 1      | 05-Jun-2021 | 04-Jun-2022 | 500.00 GBP |
| 2      | 05-Jun-2022 | 04-Jun-2023 | 500.00 GBP |
| 3      | 05-Jun-2023 | 04-Jun-2024 | 500.00 GBP |


### OBRisk1

The Risk block is a common class used in requests and responses

![OBRisk1](./images/OBRisk1.svg)

##### Data Dictionary

| Name                             | Occurrence | XPath                                      | EnhancedDefinition                                                                                                                                                                                                             | Class                              | Codes                                                                                                                                                                                                                                                                                                                   | Pattern |
|----------------------------------|------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| OBRisk1                          |            | OBRisk1                                    | The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.                                                                                         | OBRisk1                            |                                                                                                                                                                                                                                                                                                                         |         |
| PaymentContextCode               | 0..1       | OBRisk1/PaymentContextCode                 | Specifies the payment context |Specifies the payment context | For a full list of enumeration values refer to `OB_Internal_CodeSet`[here](https://github.com/OpenBankingUK/External_Internal_CodeSets/).   |OBInternalPaymentContext1Code |         |
| CategoryPurposeCode                | 0..1       | OBRisk1/CategoryPurposeCode                  | For a full list of enumeration values refer to `OB_EXternal_CodeSet`[here](https://github.com/OpenBankingUK/External_Internal_CodeSets/). |ExternalCategoryPurpose1Code |                                                                                                                                                                                                     |         |
| MerchantCategoryCode             | 0..1       | OBRisk1/MerchantCategoryCode               | Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.                                                                                      | Min3Max4Text                       |                                                                                                                                                                                                                                                                                                                         |         |
| MerchantCustomerIdentification   | 0..1       | OBRisk1/MerchantCustomerIdentification     | The unique customer identifier of the PSU with the merchant.                                                                                                                                                                   | Max70Text                          |                                                                                                                                                                                                                                                                                                                         |         |
| ContractPresentIndicator        | 0..1       | OBRisk1/ContractPresentIndicator          | Indicates if Payee has a contractual relationship with the PISP.                                                                                                                                                               | Boolean                            |                                                                                                                                                                                                                                                                                                                         |         |
| BeneficiaryPrepopulatedIndicator | 0..1       | OBRisk1/BeneficiaryPrepopulatedIndicator   | Indicates if PISP has immutably prepopulated payment details in for the PSU.                                                                                                                                                   | Boolean                            |                                                                                                                                                                                                                                                                                                                         |         |
| PaymentPurposeCode |0..1 |OBRisk1/PaymentPurposeCode | For a full description see `ExternalPurpose1Code` [here](https://github.com/OpenBankingUK/External_internal_CodeSets) |For a full list of enumeration values refer to `External_CodeSet` [here].  |ExternalPurpose1Code | |
| BeneficiaryAccountType           | 0..1       | OBRisk1/BeneficiaryAccountType             | To be provided if the AccountType is known.                                                                                                                                                                                    | For a full list of enumeration values refer to `OB_Internal_CodeSet`[here](https://github.com/OpenBankingUK/External_Internal_CodeSets/). | OBInternalExtendedAccountType1Code                                                                                                      |         |
| DeliveryAddress                  | 0..1       | OBRisk1/DeliveryAddress                    | Information that locates and identifies a specific address, as defined by postal services or in free format text.                                                                                                              | OBPostalAddress6               |                                                                                        

### OBDomesticVRPConsentRequest

![OBDomesticVRPConsentRequest](./images/OBDomesticVRPConsentRequest.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __Data__ (0..1) | `Data`|
| __Data. ReadRefundAccount__ (0..1) | `Data. ReadRefundAccount` | Indicates whether the `RefundAccount` object should be included in the response | Yes No|
| __ControlParameters__ (1..1) | `Data. ControlParameters` | The control parameters under which this VRP must operate | [OBDomesticVRPControlParameters](#OBDomesticVRPControlParameters)|
| __Initiation__ (1..1) | `Data. Initiation` | The parameters of the VRP consent that should remain unchanged for each payment under this VRP | [OBDomesticVRPInitiation](#OBDomesticVRPInitiation)|
| __Risk__ (1..1) | `Risk` | The consent payload is sent by the initiating party to the ASPSP. It is used to request a consent to move funds from the debtor account to a creditor. | [OBRisk1](#OBRisk1)|

### OBDomesticVRPConsentResponse

![OBDomesticVRPConsentResponse](./images/OBDomesticVRPConsentResponse.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __Data__ (1..1) | `Data`
| __ConsentId__  (1..1)| `Data. ConsentId` | Unique identification as assigned by the ASPSP to uniquely identify the consent resource.      | Max128Text|
| __ReadRefundAccount__ (0..1) | `Data. ReadRefundAccount` | Indicates whether the `RefundAccount` object should be included in the response | Yes No|
| __CreationDateTime__ (1..1)| `Data. CreationDateTime` | Date and time at which the resource was created.|ISODateTime|
| __StatusCode__ (1..1) | `Data. Status` | Specifies the status of resource in code form.  |AUTH AWAU RJCT CANC EXPD |
| __StatusUpdateDateTime__ (1..1)| `Data. StatusUpdateDateTime` |Date and time at which the resource status was updated.  | ISODateTime  |
| __StatusReason__ (0..*) | `Data. StatusReason` | An array of StatusReasonCode |OBStatusReason |
| __StatusReasonCode__ (0..1) | `Data. StatusReason. StatusReasonCode` | Specifies the status reason in a code form. For a full description see ` OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets).  |OBExternalStatusReason1Code |
| __StatusReasonDescription__ (0..1) | `Data. StatusReason. StatusReasonDescription` | Description supporting the StatusReasonCode.  |Max500text|
| __ControlParameters__ (1..1) | `Data. ControlParameters` | The control parameters under which this VRP must operate | [OBDomesticVRPControlParameters](#OBDomesticVRPControlParameters)
| __Initiation__ (1..1) | `Data. Initiation` | The parameters of the VRP consent that should remain unchanged for each payment under this VRP |  [OBDomesticVRPInitiation](#OBDomesticVRPInitiation)
| __DebtorAccount__ (0..1) | `Data.DebtorAccount` | The DebtorAccount details as specified by the PSU when account selection happens at the ASPSP.<br><br>__Note:__  The details must be provided in the consent response (OBDomesticVRPConsentResponse) by the ASPSP to enable the PISP to associate it with future VRP payments that are made using the VRP Consent. | OBCashAccountDebtorWithName|
| __Risk__ (1..1) | `Risk` | The consent payload is sent by the initiating party to the ASPSP. It is used to request a consent to move funds from the debtor account to a creditor. | [OBRisk1](#OBRisk1)|



### OBVRPFundsConfirmationRequest

The OBVRPFundsConfirmationRequest object must be used to request funds availability for a specific amount in the Debtor Account included in the VRP consents.

![OBVRPFundsConfirmationRequest](./images/OBVRPFundsConfirmationRequest.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __Data__ (1..1) | `Data`
| __ConsentId__ (1..1) | `Data. ConsentId` |Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource.      | Max128Text
| __Reference__ (0..1) | `Data. Reference` | Unique reference, as assigned by the PISP, to unambiguously refer to the request related to the payment transaction. This must be the same value as the `Reference` field in the consent. |Max35Text
| __InstructedAmount__ (1..1) | `Data. InstructedAmount` | Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.      |OBActiveOrHistoricCurrencyAndAmount
| __Amount__ (1..1) | `Data. InstructedAmount. Amount`| A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
| __Currency__ (1..1) | `Data. InstructedAmount. Currency`       |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode `^[A-Z]{3,3}$`

### OBVRPFundsConfirmationResponse

The OBVRPFundsConfirmationResponse object will be used for a response to a call to:

- POST /domestic-vrp-consents/{ConsentId}/funds-confirmation

![OBVRPFundsConfirmationResponse](./images/OBVRPFundsConfirmationResponse.svg)

The confirmation of funds response contains the result of a funds availability check.

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __Data__ (1..1)  | `Data` |
| __FundsConfirmationId__ (1..1)  | `Data. FundsConfirmationId`  |Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation resource.|Max40Text
| __ConsentId__ (1..1)  | `Data. ConsentId`   |Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource.   |Max128Text
| __CreationDateTime__ (1..1)  | `Data. CreationDateTime`     |Date and time at which the resource was created. |ISODateTime
| __Reference__ (0..1)  | `Data. Reference`   |Unique reference, as assigned by the PISP, to unambiguously refer to the request related to the payment transaction.   |Max35Text
| __FundsAvailableResult__ (1..1)  | `Data. FundsAvailableResult` |Result of a funds availability check.     |OBPAFundsAvailableResult1
| __FundsAvailableDateTime__  (1..1)  | `Data. FundsAvailableResult. FundsAvailableDateTime`       |Date and time at which the funds availability check was generated.     |ISODateTime
| __FundsAvailable__ (1..1)  | `Data. FundsAvailableResult. FundsAvailable`      |Availaility result, clearly indicating the availability of funds given the Amount in the request.   | Available  NotAvailable      |   |
| __InstructedAmount__ (1..1)  | `Data. InstructedAmount`     |Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.   |OBActiveOrHistoricCurrencyAndAmount
| __Amount__ (1..1)  | `Data. InstructedAmount. Amount`     |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
| __Currency__ (1..1)  | `Data. InstructedAmount. Currency`   |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".      |ActiveOrHistoricCurrencyCode

## Usage Examples

See [Usage Examples](../../references/usage-examples/vrp-usage-examples.md)
