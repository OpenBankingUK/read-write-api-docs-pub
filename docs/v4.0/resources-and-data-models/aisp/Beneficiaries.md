# Beneficiaries - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [GET /accounts/{AccountId}/beneficiaries](#get-accountsaccountidbeneficiaries)
  - [GET /beneficiaries](#get-beneficiaries)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBProxy1 ](#obproxy1)
    - [OBPostalAddress7](#obpostaladdress7)
  - [Resource Definition](#resource-definition)
  - [UML Diagram](#uml-diagram)
  - [Notes](#notes)
  - [Permission Codes](#permission-codes)
  - [Data Dictionary](#data-dictionary)
  - [Reused Classes](#reused-classes)
    - [OBPostalAddress7](#obpostaladdress7)
- [Usage Examples](#usage-examples)
  - [Specific Account](#specific-account)
    - [Get Account Beneficiaries Request](#get-account-beneficiaries-request)
    - [Get Account Beneficiaries Response](#get-account-beneficiaries-response)
  - [Bulk](#bulk)
    - [Get Beneficiaries Request](#get-beneficiaries-request)
    - [Get Beneficiaries Response](#get-beneficiaries-response)
    - [Get Account Beneficiaries Response with BeneficiaryType](#get-account-beneficiaries-response-with-beneficiarytype)

## Overview

The beneficiaries resource is used by an AISP to retrieve the account beneficiaries information for a specific AccountId or to retrieve the beneficiaries information in bulk for account(s) that the PSU has authorised to access.

This resource description should be read in conjunction with a compatible Account Information Services API Profile.

## Endpoints

Endpoints for the resource and available methods.

|  |Resource |HTTP Operation |Endpoint |Mandatory? |Scope |Grant Type |Idempotency Key |Parameters |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| 1 |beneficiaries |GET |GET /accounts/{AccountId}/beneficiaries |Conditional |accounts |Authorization Code |No | Pagination| |OBReadBeneficiary5 |
| 2 |beneficiaries |GET |GET /beneficiaries |Optional |accounts |Authorization Code |No |Pagination | |OBReadBeneficiary5 |

### GET /accounts/{AccountId}/beneficiaries

An AISP may retrieve the account beneficiaries information resource for a specific AccountId (which is retrieved in the call to GET /accounts).

### GET /beneficiaries

If an ASPSP has implemented the bulk retrieval endpoints for beneficiaries, an AISP may optionally retrieve the beneficiaries' information in bulk.
This endpoint will retrieve the beneficiaries resource for all authorised accounts linked to a specific account-request.

## Data Model

The OBReadBeneficiary5 object will be used for the call to:

* GET /accounts/{AccountId}/beneficiaries
* GET /beneficiaries

### Reused Classes

#### OBProxy1  

The OBProxy1 class is defined in the [account-and-transaction-api-profile](../../profiles/account-and-transaction-api-profile.md#obproxy1) page.

#### OBPostalAddress7
The OBPostalAddress7 class is defined in the [account-and-transaction-api-profile](../../profiles/account-and-transaction-api-profile.md#obpostaladdress7) page.

### Resource Definition

A resource that contains a set of elements that describes the list of beneficiaries linked to a specific account (AccountId).

The beneficiaries may be Trusted Beneficiaries as well as other types of beneficiaries as indicated by the `BeneficiaryType` flag.

An account (AccountId) may have no beneficiaries set up, or may have multiple beneficiaries set up.

In the case an ASPSP manages beneficiaries at a customer level (logged in user), instead of account level:

* If a PSU selects multiple accounts for authorisation, then their beneficiaries apply consistently to all selected accounts (i.e., in the bulk endpoint /beneficiaries).
* If a different PSU selects the same accounts, a different set of beneficiaries could be returned.

This is the expected behaviour of the beneficiaries endpoints, in the case an ASPSP manages beneficiaries at a customer level:

* The bulk endpoint /beneficiaries will return the unique list of beneficiaries against the PSU. In this case, the AccountId in the OBReadBeneficiary5 payload would be set to NULL / empty (even if the PSU only has one account).
* The selected account endpoint /accounts/{AccountId}/beneficiaries will return the beneficiaries that **may** be accessible to the AccountId, based on the PSU. In this case, the AccountId will be populated in the payload.

### UML Diagram

![ OBReadBeneficiary5 ](./images/OBReadBeneficiary5.svg )

### Notes

* The CreditorAccount is used consistently throughout the Account Information APIs to identify an account
* Due to internationalisation requirements:
  * The CreditorAgent object may be used to represent either (1) the BIC (with UK.OBIE.BICFI in the SchemeName field and the BIC in the Identification field), or (2) the Name and Address details for the financial institution.
  * The CreditorAccount/Identification field may be used to represent a non-UK specific branch and account numbering scheme with "UK.OBIE.SortCodeAccountNumber" being populated in the CreditorAccount/SchemeName.
* For the /accounts/{AccountId}/beneficiaries endpoint, the CreditorAccount and CreditorAgent blocks represent the account of the beneficiary that is receiving funds (so has been named the CreditorAccount for consistency with the PISP use case).
* The beneficiaries may be Trusted Beneficiaries as well as other types of beneficiaries as indicated by the BeneficiaryType property. When the BeneficiaryType property is not specified, the consumer should refer to the ASPSP's developer portal.

### Permission Codes

The resource differs depending on the permissions (ReadBeneficiariesBasic and ReadBeneficiariesDetail) used to access the resource. In the event that the resource is accessed with both ReadBeneficiariesBasic and ReadBeneficiariesDetail, the most detailed level (ReadBeneficiariesDetail) must be used.

* These objects **must not** be returned **without** the **ReadBeneficiariesDetail** permission:
  * OBReadBeneficiary5/Data/Beneficiary/CreditorAgent
  * OBReadBeneficiary5/Data/Beneficiary/CreditorAccount
* If the **ReadBeneficiariesDetail** is granted by the PSU:
  * OBReadBeneficiary5/Data/Beneficiary/CreditorAgent **may** be returned if applicable to the account and ASPSP (0..1)
  * OBReadBeneficiary5/Data/Beneficiary/CreditorAccount **must** be returned (1..1)

If the ReadPAN permission is granted by the PSU, the ASPSP may choose to populate the OBReadBeneficiary5/Data/Beneficiary/CreditorAccount/Identification with the unmasked PAN (if the PAN is being populated in the response).

### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBReadBeneficiary5 | |OBReadBeneficiary5 | |OBReadBeneficiary5 | | |
| Data |1..1 |OBReadBeneficiary5/Data | |OBReadDataBeneficiary5 | | |
| Beneficiary |0..* |OBReadBeneficiary5/Data/Beneficiary | |OBBeneficiary5 | | |
| AccountId |0..1 |OBReadBeneficiary5/Data/Beneficiary/AccountId |A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner. |Max40Text | | |
| BeneficiaryId |0..1 |OBReadBeneficiary5/Data/Beneficiary/BeneficiaryId |A unique and immutable identifier used to identify the beneficiary resource. This identifier has no meaning to the account owner. |Max40Text | | |
| BeneficiaryType |0..1 |OBReadBeneficiary5/Data/Beneficiary/BeneficiaryType ||For a full list of enumeration values refer to `Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets) |OBInternalBeneficiaryType1Code | |
| Reference |0..1 |OBReadBeneficiary5/Data/Beneficiary/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. |Max35Text | | |
| SupplementaryData |0..1 |OBReadBeneficiary5/Data/Beneficiary/SupplementaryData |Additional information that cannot be captured in the structured fields and/or any other specific block|OBSupplementaryData1 | | |
| CreditorAgent |0..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAgent |Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account. This is the servicer of the beneficiary account. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |For a full list of enumeration values refer to `Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBInternalFinancialInstitutionIdentification4Co
| LEI |0..1 | OBReadBeneficiary5/Data/Beneficiary/CreditorAgent/LEI |Legal entity identification as an alternate identification for a party. Legal Entity Identifier is a code allocated to a party as described in ISO 17442 "Financial Services - Legal Entity Identifier (LEI)".|Max20Text | |[A-Z0-9]{18,18}[0-9]{2,2}|
| Identification |0..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAgent/Identification |Unique and unambiguous identification of the servicing institution. |Max35Text | | |
| Name |0..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAgent/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| PostalAddress |0..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAgent/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress7 | | |
| CreditorAccount |0..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAccount |Provides the details to identify the beneficiary account. |OBCashAccount5 | | |
| SchemeName |1..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |1..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBReadBeneficiary5/Data/Beneficiary/CreditorAccount/Proxy | Specifies an alternate assumed name for the identification of the account.  | OBProxy1 | | |

### Reused Classes

#### OBPostalAddress7 

The OBPostalAddress7 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obpostaladdress7) page

## Usage Examples

### Specific Account

#### Get Account Beneficiaries Request

```
GET /accounts/22289/beneficiaries HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

 #### Get Account Beneficiaries Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "Beneficiary": [
      {
        "AccountId": "22289",
        "BeneficiaryId": "Ben1",
        "BeneficiaryType": "Ordinary",
        "Reference": "Towbar Club",
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
          "Identification": "80200112345678",
          "SecondaryIdentification": "ID_0002",
          "Name": "Mrs Juniper",
          "Proxy": {
            "Identification": "2360549017905188",
            "Code": "TELE"
          }
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/aisp/accounts/22289/beneficiaries/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### Bulk

#### Get Beneficiaries Request

```
GET /beneficiaries HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Beneficiaries Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "Beneficiary": [
      {
        "AccountId": "22289",
        "BeneficiaryId": "Ben1",
        "BeneficiaryType": "Ordinary",
        "Reference": "Towbar Club",
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
          "Identification": "80200112345678",
          "SecondaryIdentification": "ID_0002",
          "Name": "Mrs Juniper",
          "Proxy": {
            "Identification": "2360549017905188",
            "Code": "TELE"
          }
        }
      },
      {
        "AccountId": "31820",
        "BeneficiaryId": "Ben37",
        "Reference": "Golf Club",
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
          "Identification": "87562298675421",
          "Name": "Mr Large",
          "SecondaryIdentification": "87562298675897", 
          "Proxy": {
            "Identification": "2360549017905188",
            "Code": "TELE",
            "Type": "Telephone", 
          }
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/aisp/beneficiaries/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

#### Get Account Beneficiaries Response with BeneficiaryType

```json
{
  "Data": {
    "Beneficiary": [
      {
        "AccountId": "22289",
        "BeneficiaryId": "Ben1",
        "BeneficiaryType": "Ordinary",
        "Reference": "Towbar Club",
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
          "Identification": "80200112345678",
          "Name": "Mrs Juniper"
        }
      },
      {
        "AccountId": "22289",
        "BeneficiaryId": "Ben2",
        "BeneficiaryType": "Trusted",
        "Reference": "Champagne Club",
        "CreditorAgent": { 
          "LEI": "6PLS00H77T87PEZOTK71"
        },
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "80200112345678",
          "SecondaryIdentification": "87562298675897",
          "Name": "Mr Tully",
          "Proxy": {
            "Identification": "2360549017905188",
            "Code": "TELE",
            "Type": "Telephone", 
          }
        }
      },
      {
        "AccountId": "22289",
        "BeneficiaryId": "Ben3",
        "Reference": "O2-234823781",
        "CreditorAgent": { 
          "LEI": "X3F8005BLKBSWLCX4E37"
        },
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "SecondaryIdentification": "ID_0002",
          "Identification": "80200112345678",
          "Name": "Mr Tully",
          "Proxy": {
            "Identification": "2360549017905188",
            "Code": "TELE",
            "Type": "Telephone", 
          }
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/aisp/accounts/22289/beneficiaries/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```
