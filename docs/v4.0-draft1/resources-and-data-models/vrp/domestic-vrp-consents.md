# Domestic VRP consents - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /domestic-vrp-consents](#post-domestic-vrp-consents)
  - [GET /domestic-vrp-consents/{ConsentId}](#get-domestic-vrp-consentsconsentid)
  - [DELETE /domestic-vrp-consents/{ConsentId}](#delete-domestic-vrp-consentsconsentid)
  - [POST /domestic-vrp-consents/{ConsentId}/funds-confirmation](#post-domestic-vrp-consentsconsentidfunds-confirmation)
- [State Model - VRP consents](#state-model---vrp-consents)
- [Data Model](#data-model)
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

The default/initial StatusCode of the resource is set to `AWAU`.

If the parameters specified by the TPP in this resource are not valid, or fail any rules, the ASPSP must return a 400 Bad Request. In such a situation a resource is not created.

The ASPSP **must** allow a PSU to have multiple VRP consents for a given account. This could include multiple consents with the same PISP.

The ASPSP **must** reject a consent request that has `Data.ControlParameters.SupplementaryData` that it cannot process.

### GET /domestic-vrp-consents/{ConsentId}

A TPP can retrieve a VRP consent resource that they have created to check its status at any point of time using this API.

### DELETE /domestic-vrp-consents/{ConsentId}

A TPP can delete a VRP consent resource that they have created by calling this API.

### POST /domestic-vrp-consents/{ConsentId}/funds-confirmation

This API endpoint allows the TPP to ask an ASPSP to confirm funds on the `DebtorAccount` associated with the `domestic-vrp-consent`.

An ASPSP can only respond to a funds confirmation request if the resource has a StatusCode of `AUTH`.

If resource has any other Status, the ASPSP must respond with a 400 (Bad Request) and a `UK.OB.Resource.InvalidConsentStatus` error code.

### PUT /domestic-vrp-consents/{consentId}
This endpoint is only used for migration of consent data across API Standard versions. The ASPSP can choose to implement one or both of the PUT/PATCH endpoints and TPPs should refer to the ASPSP developer portal for information on availability.    

This endpoint should not be used to modify content of an existing consent created on the same version.  The ASPSP __must__ reject request if a TPP attempts to modify an existing resource which does not require migration to the new format.

The request body should contain the correct schema for the current version of the API specification with any associated enumeration values that have moved to short code format.  Values originally supplied in the consent such as account information, control parameters, dates or monetary values __must not__ change and the ASPSP __must__ reject any requests which modify these values.

Successful submission must return the updated consent resource body.

### PATCH /domestic-vrp-consents/{consentId}
This endpoint is only used for migration of consent data across Standard versions. The ASPSP can choose to implement one or both of the PUT/PATCH endpoints and TPPs should refer to the ASPSP developer portal for information on availability.    

This endpoint should not be used to modify content of an existing consent created on the same version.  The ASPSP __must__ reject request if a TPP attempts to modify an existing resource which does not require migration to the new format.

The request body should contain a partial JSON body containing only the changed schema and any associated enumeration values that have moved to short code format, matching the current API specification.  Values originally supplied in the consent such as account information, control parameters, dates or monetary values __must not__ change and the ASPSP __must__ reject any requests which modify these values.

Successful submission must return the full updated consent resource body.



## State Model - VRP consents

The state model for the VRP consents resource follows the generic consent state model. However, it does not use the `COND` StatusCode.

![VRP Consent State model](./images/PIS-VRP_PO_Consent.png)


All `domestic-vrp-consents` start off with a StatusCode of `AWAU`

Once the PSU authorises the resource - the StausCode will be set to `AUTH`.

If the PSU rejects the consent, the StautsCode will be set to `RJCT`.

The available StatusCodes for the VRP consents resource are:

- AWAU
- RJCT
- AUTH
- CANC
- EXPD

The definitions for the StatusCode:

|     | StatusCode                |  Description                                                            |
|-----|-----------------------|-------------------------------------------------------------------------------|
| 1   | AWAU | The consent resource is awaiting PSU authorisation.                           |
| 2   | RJCT              | The consent resource has been rejected.                                       |
| 3   | AUTH            | The consent resource has been successfully authorised.  
| 4| CANC| The consent resource has been canceled.                      |
| 5| EXPD| The consent resource has expired.|

## Data Model

The data dictionary section gives the detail on the payload content for the VRP consent API flows.

### OBCashAccountDebtorWithName

![OBCashAccountDebtorWithName](./images/OBCashAccountDebtorWithName.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __SchemeName__ (1..1) | `SchemeName` | Name of the identification scheme, in a coded form as published in an external list. | Namespaced Enumeration OBExternalAccountIdentification4Code
| __Identification__ (1..1) | `Identification` | Identification assigned by an institution to identify an account. This identification is known by the account owner. | Max256Text
| __Name__ (1..1) | `Name` | Name of the account, as assigned by the account servicing institution.  Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account. | Max70Text  
| __SecondaryIdentification__ (0..1) | `SecondaryIdentification` | This is secondary identification of the account, as assigned by the account servicing institution.  This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination) | Max34Text

### OBCashAccountCreditor3

![OBCashAccountCreditor3](./images/OBCashAccountCreditor3.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __SchemeName__ (1..1) | `SchemeName` | Name of the identification scheme, in a coded form as published | 
| __Identification__ (1..1) | `Identification` |Identification assigned by an institution to identify an account. This identification is known by the account owner.   |Max256Text
| __Name__ (1..1) | `Name` |Name of the account, as assigned by the account servicing institution, in consent with the account owner in order to provide an additional means of identification of the account.  Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number. OB: No name validation is expected for confirmation of payee.|Max70Text  
| __SecondaryIdentification__ (0..1) | `SecondaryIdentification` |This is secondary identification of the account, as assigned by the account servicing institution.  This can be used by building societies to additionally identify accounts with a roll number__ (in addition to a sort code and account number combination).             |Max34Text
| __Proxy__ (0..1) |OBInternationalStandingOrder4/CreditorAccount/Proxy |The external proxy account type |OBProxyAccount
| __Identification__ (1..1) |OBInternationalStandingOrder4/CreditorAccount/Proxy/Identification| Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text 
| __Type__ (0..1) |OBInternationalStandingOrder4/CreditorAccount/Proxy/Type| Specifies the external proxy account type |MaxText70 
| __Code__ 1..1 |OBInternationalStandingOrder4/CreditorAccount/Proxy/Code| Specifies the external proxy account type code, as published in the proxy account type external code set.<br> For more information see `ExternalProxyAccountType1Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets) |OBExternalProxyAccountType1Code 
| __Proprietary__ (1..1) |OBInternationalStandingOrder4/CreditorAccount/Proxy/Proprietary| The owner of the proxy account |MaxText70 

### OBBranchAndFinancialInstitutionIdentification6

![OBBranchAndFinancialInstitutionIdentification6](./images/OBBranchAndFinancialInstitutionIdentification6.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __SchemeName__ (0..1) | `SchemeName` |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code
| __Identification__ (0..1) | `Identification` |Unique and unambiguous identification of a financial institution or a branch of a financial institution.  | Max35Text  
| __Name__ (0..1) | `Name` | Name by which an agent is known and which is usually used to identify that agent. | Max140Text
| __PostalAddress__ (0..1) | `PostalAddress` |Information that locates and identifies a specific address, as defined by postal services.| OBPostalAddress6
| __AddressType__ (0..1) | `PostalAddress. AddressType` |Identifies the nature of the postal address. |OBAddressTypeCode  |BIZZ DLVY MLTO PBOX ADDR HOME CORR STAT |
| __Department__ (0..1) | `PostalAddress. Department` |Identification of a division of a large organisation or building. | Max70Text  
| __SubDepartment__ (0..1) | `PostalAddress. SubDepartment` |Identification of a sub-division of a large organisation or building. |Max70Text
| __StreetName__ (0..1) | `PostalAddress. StreetName`   |Name of a street or thoroughfare.    |Max70Text  
| __BuildingNumber__ (0..1) | `PostalAddress. BuildingNumber` |Number that identifies the position of a building on a street.   |Max16Text  
| __BuildingName__ (0..1) |`PostalAddress. BuildingName`  |Name of a referenced building. |Max70Text
| __Floor__ (0..1) |`PostalAddress. Floor`|Number that identifies the level within a building. |Max16Text 
| __UnitNumber__(0..1) |`PostalAddress. UnitNumber`|Number that identifies the unit of a specific address |Max16Text 
| __Room__ (0..1)| `PostalAddress. Room`|Information that locates and identifies a room to form part of an address. |Max70Text 
| __TownLocationName__ (0..1)|`PostalAddress. TownLocationName` |Name of a built-up area, with defined boundaries, and a local government. |Max35Text 
| __DistrictName__ (0..1) |`PostalAddress. DistrictName`|Number that of the regional area, known as a district, which forms part of an address. |Max35Text 
| __CareOf__ (0..1 )|`PostalAddress. CareOf` |The 'care of' address is used whenever sending mail to a person or organisation who does not actually live or work at the address. They will receive the mail for the individual. |Max70Text 
| __PostCode__ (0..1) | `PostalAddress. PostCode` |Identifier consisting of a group of letters and. or numbers that is added to a postal address to assist the sorting of mail.    |Max16Text  
| __TownName__ (0..1) | `PostalAddress. TownName` |Name of a built-up area, with defined boundaries, and a local government. |Max35Text  
| __CountrySubDivision__ (0..1) | `PostalAddress. CountrySubDivision` |Identifies a subdivision of a country such as state, region, county.      |Max35Text  
| __Country__ (0..1) | `PostalAddress. Country` | Nation with its own government.      |CountryCode
| __AddressLine__  (0..7) | `PostalAddress. AddressLine` |Information that locates and identifies a specific address, as defined by postal services, presented in free format text.      |Max70Text  

### OBDomesticVRPInitiation

![OBDomesticVRPInitiation](./images/OBDomesticVRPInitiation.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __DebtorAccount__ (0..1) | `DebtorAccount` | Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. | [OBCashAccountDebtorWithName](#OBCashAccountDebtorWithName)
| __CreditorAgent__ (0..1) | `CreditorAgent` | Financial institution servicing an account for the creditor.     | OBBranchAndFinancialInstitutionIdentification6
| __CreditorAccount__ (0..1) | `CreditorAccount`   |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.       |OBCashAccountCreditor3
| __RemittanceInformation__ (0..1) | `RemittanceInformation`   | Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. | OBRemittanceInformation1
| __Structured__ (0..*) |`RemittanceInformation. Structured` |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an structured form. |OBRemittanceInformationStructured
| __ReferredDocumentInformation__ (0..*) |`RemittanceInformation . Structured. ReferredDocumentInformation` |Provides the identification and the content of the referred document |OBReferredDocumentInformation
| __ReferredDocumentAmount__ (0..1) |`RemittanceInformation. . Structured. ReferredDocumentAmount` |Provides details on the amounts of the referred document |OBReferredDocumentAmount| 
| __CreditorReferenceInformation__ (0..1) |`RemittanceInformation. Structured. ReferredDocumentAmount`  |Reference information provided by the creditor to allow the identification of the underlying documents |OBCreditorReferenceInformation
| __Invoicer__ (0..1) |`RemittanceInformation. Structured. Invoicer`  |Identification of the organisation issuing the invoice, when it is different from the creditor or ultimate creditor. |OBInvoicer
| __Invoicee__ (0..1) |`RemittanceInformation. Structured. Invoicee`  |Identification of the party to whom an invoice is issued, when it is different from the debtor or ultimate debtor  |OBInvoicee|
| __TaxRemittance__ (0..1) |`RemittanceInformation. Structured. TaxRemittance` |Provides remittance information about a payment made for tax-related purposes |OBTaxRemittance|
| __AdditionalRemittanceInformation__ (0..3)|`RemittanceInformation. Structured. AdditionalRemittanceInformation`|Additional information, in free text form, to complement the structured remittance information |OBAdditionalRemittanceInformation
| __Unstructured__ |0..* |`RemittanceInformation. Unstructured.` |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text

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
| __PSUAuthenticationMethods__ (1..M) | `ControlParameters. PSUAuthenticationMethods`          | Indicates that the PSU authentication methods supported.                                                                                                                                                                                                                         | OBVRPAuthenticationMethods - Namespaced Enumeration |
| __PSUInteractionTypes__ (0..M)      | `ControlParameters. PSUInteractionTypes`               | Indicates interaction type, currently if customer is present or not present.                                                                                                                                                                                                                         | OBVRPInteractionTypes                               |
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
| PaymentContextCode               | 0..1       | OBRisk1/PaymentContextCode                 | Specifies the payment context | OBExternalPaymentContext1Code      | <br>BillingGoodsAndServicesInAdvance <br>BillingGoodsAndServicesInArrears <br>EcommerceMerchantInitiatedPayment <br>FaceToFacePointOfSale <br>TransferToSelf <br>TransferToThirdParty |         |
| CategoryPurposeCode                | 0..1       | OBRisk1/CategoryPurposeCode                  |Enumeration to outline the purpose to the underlying purpose of the payment<br> BONU<br>CASH<br>CBLK<br>CCRD<br>CGWV<br>CIPC <br>CONC<br>CORT<br>DCRD<br>DIVI<br>DVPM<br>EPAY<br>FCDT <br>FCIN<br>FCOL<br>GOVT<br>GP2P<br>HEDG <br>ICCP <br>IDCP <br>INTC<br>INTE<br>LBOX<br>LOAN<br>MP2B<br>MP2P<br>OTHR <br>PENS<br>RPRE<br>RRCT<br>RVPM<br>SALA<br>SECU<br>SSBE <br>SUPP<br>SWEP<br>TAXS<br>TOPG<br>TRAD<br>TREA<br>VATX <br>VOST<br>WHLD<br>ZABA| OBCategoryPurposeCode                       |                                                                                                                                                                                                                                                                                                                         |         |
| ExtendedPurpose |0..1 |OBRisk1/ExtendedPurpose |Specifies the purpose of an __international payment__, when there is no corresponding 4 character code available in the ISO20022 list of Purpose Codes. |Max140Text | | |
| MerchantCategoryCode             | 0..1       | OBRisk1/MerchantCategoryCode               | **`@DEPRECATED`** Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.                                                                                      | Min3Max4Text                       |                                                                                                                                                                                                                                                                                                                         |         |
| MerchantCustomerIdentification   | 0..1       | OBRisk1/MerchantCustomerIdentification     | The unique customer identifier of the PSU with the merchant.                                                                                                                                                                   | Max70Text                          |                                                                                                                                                                                                                                                                                                                         |         |
| ContractPresentIndicator        | 0..1       | OBRisk1/ContractPresentIndicator          | Indicates if Payee has a contractual relationship with the PISP.                                                                                                                                                               | Boolean                            |                                                                                                                                                                                                                                                                                                                         |         |
| BeneficiaryPrepopulatedIndicator | 0..1       | OBRisk1/BeneficiaryPrepopulatedIndicator   | Indicates if PISP has immutably prepopulated payment details in for the PSU.                                                                                                                                                   | Boolean                            |                                                                                                                                                                                                                                                                                                                         |         |
| PaymentPurposeCode |0..1 |OBRisk1/PaymentPurposeCode | For a full description see `ExternalPurpose1Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets) |OBExternalPaymentPurpose1Code | | |
| BeneficiaryAccountType           | 0..1       | OBRisk1/BeneficiaryAccountType             | To be provided if the AccountType is known.                                                                                                                                                                                    | OBExternalExtendedAccountType1Code | Personal<br>JointPersonal<br>PersonalSavingsAccount<br>Business<br>BusinessSavingsAccount<br>Charity<br>Collection<br>Corporate<br>Government<br>Ewallet<br>Investment<br>ISA<br>Premier<br>Wealth<br>Pension<br>                                                                                                       |         |
| DeliveryAddress                  | 0..1       | OBRisk1/DeliveryAddress                    | Information that locates and identifies a specific address, as defined by postal services or in free format text.                                                                                                              | OBPostalAddress6               |                                                                                                                                                                                                                                                                                                                         |         |
| AddressType |0..1 |OBRisk1/DeliveryAddress AddressType |BIZZ<br>DLVY<br>MLTO<br>PBOX<br>ADDR<br>HOME<br>CORR<br>STAT | ||
| Department |0..1 |OBRisk1/DeliveryAddress Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBRisk1/DeliveryAddress SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBRisk1/DeliveryAddress StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBRisk1/DeliveryAddress BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| BuildingName |0..1 |OBRisk1/DeliveryAddress BuildingName |Name of a referenced building. |Max70Text | | |
| Floor |0..1 |OBRisk1/DeliveryAddress Floor|Number that identifies the level within a building. |Max16Text | | |
| UnitNumber|0..1 |OBRisk1/DeliveryAddress UnitNumber|Number that identifies the unit of a specific address |Max16Text | | |
| Room |0..1 |OBRisk1/DeliveryAddress Room|Information that locates and identifies a room to form part of an address. |Max70Text | | |
| TownLocationName |0..1 |OBRisk1/DeliveryAddress TownLocationName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| DistrictName |0..1 |OBRisk1/DeliveryAddress DistrictName |Number that of the regional area, known as a district, which forms part of an address. |Max35Text | | |
| CareOf |0..1 |OBRisk1/DeliveryAddress CareOf |The 'care of' address is used whenever sending mail to a person or organisation who does not actually live or work at the address. They will receive the mail for the individual. |Max70Text | | |

### OBDomesticVRPConsentRequest

![OBDomesticVRPConsentRequest](./images/OBDomesticVRPConsentRequest.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __Data__ (0..1) | `Data`
| __Data. ReadRefundAccount__ (0..1) | `Data. ReadRefundAccount` | Indicates whether the `RefundAccount` object should be included in the response | Yes No
| __ControlParameters__ (1..1) | `Data. ControlParameters` | The control parameters under which this VRP must operate | [OBDomesticVRPControlParameters](#OBDomesticVRPControlParameters)
| __Initiation__ (1..1) | `Data. Initiation` | The parameters of the VRP consent that should remain unchanged for each payment under this VRP | [OBDomesticVRPInitiation](#OBDomesticVRPInitiation)
| __Risk__ (1..1) | `Risk` | The consent payload is sent by the initiating party to the ASPSP. It is used to request a consent to move funds from the debtor account to a creditor. | OBRisk

### OBDomesticVRPConsentResponse

![OBDomesticVRPConsentResponse](./images/OBDomesticVRPConsentResponse.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __Data__ (1..1) | `Data`
| __ConsentId__  (1..1)| `Data. ConsentId` | Unique identification as assigned by the ASPSP to uniquely identify the consent resource.      | Max128Text
| __Data. ReadRefundAccount__ (0..1) | `Data. ReadRefundAccount` | Indicates whether the `RefundAccount` object should be included in the response | Yes No
| __CreationDateTime__ (1..1)| `Data. CreationDateTime` | Date and time at which the resource was created.|ISODateTime
| __StatusCode__ (0..1) | `Data. StatusCode` | Specifies the status of resource in code form.  |AUTH AWAU RJCT COND
| __StatusUpdateDateTime__ (1..1)| `Data. StatusUpdateDateTime` |Date and time at which the resource status was updated.  | ISODateTime  
| __StatusReason__ (0..*) | `Data. StatusReason` | Specifies the status reason.  |OBStatusReason
| __StatusReasonCode__ (0..1) | `Data. StatusReason. *. StatusReasonCode` | Specifies the status reason in a code form. For a full description see `ExternalStatusReason1Code` [here](https://github.com/OpenBankingUK/External_Interal_CodeSets).  |ExternalStatusReason1Code
| __StatusReasonDescription__ (0..1) | `Data. StatusReason. *. StatusReasonDescription` | Description supporting the StatusReasonCode.  |String
| __ControlParameters__ (1..1) | `Data. ControlParameters` | The control parameters under which this VRP must operate | [OBDomesticVRPControlParameters](#OBDomesticVRPControlParameters)
| __Initiation__ (1..1) | `Data. Initiation` | The parameters of the VRP consent that should remain unchanged for each payment under this VRP |  [OBDomesticVRPInitiation](#OBDomesticVRPInitiation)
| __UltimateCreditor__ (0..1) | `Data. Initiation. UltimateCreditor` |Set of elements used to identify a person or an organisation. | OBPartyIdentification43 | | |
| __SchemeName__ (0..1) | `Data. Initiation. UltimateCreditor. SchemaName` |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| __Identification__ (0..1) | `Data. Initiation. UltimateCreditor. Identification` |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| __Name__ (0..1) | `Data. Initiation. UltimateCreditor. Name` |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| __LEI__ (0..1) | `Data. Initiation. UltimateCreditor. LEI` | Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
| __UltimateDebtor__ (0..1) | `Data. Initiation. UltimateDebtor` |Set of elements used to identify a person or an organisation. | OBPartyIdentification43 | | |
| __SchemeName__ (0..1) | `Data. Initiation. UltimateDebtor. SchemaName` |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| __Identification__ (0..1) | `Data. Initiation. UltimateDebtor. Identification` |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| __Name__ (0..1) | `Data. Initiation. UltimateDebtor. Name` |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| __LEI__ (0..1) | `Data. Initiation. UltimateDebtor. LEI` | Legal Entity Identification 
| __DebtorAccount__ (0..1) | `Data.DebtorAccount` | The approved DebtorAccount that the payment can be made from. THe value must be populated for GET responses once the consent is approved. | OBCashAccountDebtorWithName
| __Risk__ (1..1) | `Risk` | The consent payload is sent by the initiating party to the ASPSP. It is used to request a consent to move funds from the debtor account to a creditor. | OBRisk

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
