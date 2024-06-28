# Scheduled Payments - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [GET /accounts/{AccountId}/scheduled-payments](#get-accountsaccountidscheduled-payments)
  - [GET /scheduled-payments](#get-scheduled-payments)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBProxy1](#obproxy1)
    - [OBPostalAddress7](#obpostaladdress7)
  - [Resource Definition](#resource-definition)
  - [UML Diagram](#uml-diagram)
    - [Notes](#notes)
  - [Permission Codes](#permission-codes)
  - [Data Dictionary](#data-dictionary)
- [Usage Examples](#usage-examples)
  - [Specific Account](#specific-account)
    - [Get Account Specific Scheduled Payments Request](#get-account-specific-scheduled-payments-request)
    - [Response: Get Accounts Specific Scheduled Payments Response](#response-get-accounts-specific-scheduled-payments-response)
  - [Bulk](#bulk)
    - [Get Bulk Scheduled Payments Request](#get-bulk-scheduled-payments-request)
    - [Get Bulk Scheduled Payments Response](#get-bulk-scheduled-payments-response)

## Overview

The scheduled-payments resource is used by an AISP to retrieve the scheduled payments for a specific account identified by AccountId or to retrieve scheduled payments for all accounts that the PSU has consented to.

This resource description should be read in conjunction with a compatible Account Information Services API Profile.

## Endpoints

Endpoints for the resource and available methods.

|  |Resource |HTTP Operation |Endpoint |Mandatory? |Scope |Grant Type |Idempotency Key |Parameters |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| 1 |scheduled-payments |GET |GET /accounts/{AccountId}/scheduled-payments |Conditional |accounts |Authorization Code |No | Pagination| |OBReadScheduledPayment3 |
| 2 |scheduled-payments |GET |GET /scheduled-payments |Optional |accounts |Authorization Code |No |Pagination | |OBReadScheduledPayment3 |

### GET /accounts/{AccountId}/scheduled-payments

An ASPSP may provide this endpoint for AISPs to retrieve the scheduled-payments for a specific AccountId (which is retrieved in the call to GET /accounts).

### GET /scheduled-payments

If an ASPSP has implemented the bulk retrieval endpoints, an AISP may optionally retrieve the scheduled-payments resources in bulk.

This will retrieve the scheduled-payments resources for all authorised accounts linked to the account-request.

## Data Model

### Reused Classes

#### OBProxy1
The OBProxy1 class is defined in the [account-and-transaction-api-profile](../../profiles/account-and-transaction-api-profile.md#obproxy1) page.

#### OBPostalAddress7
The OBPostalAddress7 class is defined in the [account-and-transaction-api-profile](../../profiles/account-and-transaction-api-profile.md#obpostaladdress7) page.

### Resource Definition

A resource that contains a set of elements that describes the scheduled payments that have been set up on a specific account (AccountId). A scheduled payment is a single one-off payment scheduled for a future date.

An account (AccountId) may have no scheduled payments set up, or may have multiple scheduled payments set up.

### UML Diagram

![ OBReadScheduledPayment3 ](./images/OBReadScheduledPayment3.svg )

#### Notes

* The **Creditor** **Account** and **CreditorAgent** blocks replicate what is used consistently throughout the Account Information APIs to identify an account.
* For the /accounts/{AccountId}/scheduled-payments endpoint, the **Creditor** **Account** and **CreditorAgent** blocks represent the account that is receiving funds (so has been named the CreditorAccount, for consistency with the PISP use case).
* A DateTime element has been used so that there is consistency across all API endpoints using dates. Where time elements do not exist in ASPSP systems, the time portion of the DateTime element will be defaulted to 00:00:00+00:00.
* The Amount elements all have embedded Currency elements for consistency is ISO 20022, and across the other API endpoints.

### Permission Codes

The resource differs depending on the permissions (ReadScheduledPaymentsBasic and ReadScheduledPaymentsDetail) used to access resource. In the event that the resource is accessed with both ReadScheduledPaymentsBasic and ReadScheduledPaymentsDetail, the most detailed level (ReadScheduledPaymentsDetail) must be used.

* These objects **must not** be returned **without** the **ReadScheduledPaymentsDetail** permission:
    * OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent
    * OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount
* If the **ReadScheduledPaymentsDetail** is granted by the PSU:
    * OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent **may** be returned if applicable to the account and ASPSP (0..1)
    * OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount **must** be returned (1..1)

If the ReadPAN permission is granted by the PSU - the ASPSP may choose to populate the OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/Identification with the unmasked PAN (if the PAN is being populated in the response).

### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBReadScheduledPayment3 | |OBReadScheduledPayment3 | |OBReadScheduledPayment3 | | |
| Data |1..1 |OBReadScheduledPayment3/Data | |OBReadDataScheduledPayment3 | | |
| ScheduledPayment |0..* |OBReadScheduledPayment3/Data/ScheduledPayment | |OBScheduledPayment3 | | |
| AccountId |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/AccountId |A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner. |Max40Text | | |
| ScheduledPaymentId |0..1 |OBReadScheduledPayment3/Data/ScheduledPayment/ScheduledPaymentId |A unique and immutable identifier used to identify the scheduled payment resource. This identifier has no meaning to the account owner. |Max40Text | | |
| ScheduledPaymentDateTime |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/ScheduledPaymentDateTime |The date on which the scheduled payment will be made. |ISODateTime | | |
| ScheduledType |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/ScheduledType |Specifies the scheduled payment date type requested |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets).|OBInternalScheduleType1Code | |
| Reference |0..1 |OBReadScheduledPayment3/Data/ScheduledPayment/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. |Max35Text | | |
| DebtorReference |0..1 |OBReadScheduledPayment3/Data/ScheduledPayment/DebtorReference |A reference value provided by the PSU to the PISP while setting up the scheduled payment. |Max35Text | | |
| InstructedAmount |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| CreditorAgent |0..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent |Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account. This is the servicer of the beneficiary account. |OBBranchAndFinancialInstitutionIdentification5 | | |
| SchemeName |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |For a full list of enumeration values refer to `Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBInternalFinancialInstitutionIdentification4Co |
| PostalAddress |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent/PostalAddress | Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress7 | | |
| LEI |0..1 | OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent/LEI |Legal entity identification as an alternate identification for a party. Legal Entity Identifier is a code allocated to a party as described in ISO 17442 "Financial Services - Legal Entity Identifier (LEI)".|Max20Text | |[A-Z0-9]{18,18}[0-9]{2,2}|
| Identification |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAgent/Identification |Unique and unambiguous identification of the servicing institution. |Max35Text | | |
| CreditorAccount |0..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount |Provides the details to identify the beneficiary account. |OBCashAccount5 | | |
| Proxy |0..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/Proxy | Specifies an alternate assumed name for the identification of the account.  |OBProxy1 | | |
| SchemeName |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |1..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/Identification |Beneficiary account identification. |Max256Text | | |
| Name |0..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBReadScheduledPayment3/Data/ScheduledPayment/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |

## Usage Examples

### Specific Account

#### Get Account Specific Scheduled Payments Request

```
GET /accounts/22289/scheduled-payments HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Response: Get Accounts Specific Scheduled Payments Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ScheduledPayment": [
      {
        "AccountId": "22289",
        "ScheduledPaymentId": "SP03",
        "ScheduledPaymentDateTime": "2017-05-05T00:00:00+00:00",
        "ScheduledType": "Execution",
        "InstructedAmount": {
          "Amount": "10.00",
          "Currency": "GBP"
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
          }
        },
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "23605490179017",
          "SecondaryIdentification": "23605445279017",
          "Name": "Mr Tee",
          "Proxy": {
            "Identification": "441234012345",
            "Code": "TELE",
            "Type":"Telephone"
          }
        },
        "Reference": "REF561988",
        "DebtorReference" : "REF51561806",
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/aisp/accounts/22289/scheduled-payments/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### Bulk

#### Get Bulk Scheduled Payments Request

```
GET /scheduled-payments HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Bulk Scheduled Payments Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ScheduledPayment": [
      {
		"AccountId": "22289",
        "ScheduledPaymentId": "SP03",
        "ScheduledPaymentDateTime": "2017-05-05T00:00:00+00:00",
        "ScheduledType": "Execution",
        "InstructedAmount": {
          "Amount": "10.00",
          "Currency": "GBP"
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
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "23605490179017",
          "SecondaryIdentification": "23605445279017",
          "Name": "Mr Tee",
          "Proxy": {
            "Identification": "441234012345",
            "Code": "TELE",
            "Type":"Telephone"
          }
        },
        "Reference": "REF561988",
        "DebtorReference" : "51561899806",
      }
      },
      {
        "AccountId": "39570",
        "ScheduledPaymentId": "SP77",
        "ScheduledPaymentDateTime": "2017-04-05T00:00:00+00:00",
        "ScheduledType": "Execution",
        "InstructedAmount": {
          "Amount": "12.00",
          "Currency": "GBP"
        },
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "23605490179017",
          "Name": "Mr Tee",
          "Proxy": {
            "Identification": "441234012345",
            "Code": "TELE",
            "Type":"Telephone"
          }
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/aisp/scheduled-payments/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```
