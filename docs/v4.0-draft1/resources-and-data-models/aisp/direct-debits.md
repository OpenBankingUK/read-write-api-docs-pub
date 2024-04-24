# Direct Debits - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [GET /accounts/{AccountId}/direct-debits](#get-accountsaccountiddirect-debits)
  - [GET /direct-debits](#get-direct-debits)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBMandateRelatedInformation1](#OBMandateRelatedInformation1)
  - [Resource Definition](#resource-definition)
  - [UML Diagram](#uml-diagram)
  - [Permission Codes](#permission-codes)
  - [Data Dictionary](#data-dictionary)
- [Usage Examples](#usage-examples)
  - [Specific Account](#specific-account)
    - [Get Accounts Direct Debits Request](#get-accounts-direct-debits-request)
    - [Get Accounts Direct Debits Response](#get-accounts-direct-debits-response)
  - [Bulk](#bulk)
    - [Get Direct Debits Request](#get-direct-debits-request)
    - [Get Direct Debits Response](#get-direct-debits-response)

## Overview

The direct-debits resource is used by an AISP to retrieve the direct debits for a specific account identified by AccountId or to retrieve direct debits for all accounts that the PSU has consented to.

This resource description should be read in conjunction with a compatible Account Information Services API Profile.

## Endpoints

Endpoints for the resource and available methods.

|  |Resource |HTTP Operation |Endpoint |Mandatory? |Scope |Grant Type |Idempotency Key |Parameters |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| 1 |direct-debits |GET |GET /accounts/{AccountId}/direct-debits |Conditional |accounts |Authorization Code |No | Pagination| |OBReadDirectDebit2 |
| 2 |direct-debits |GET |GET /direct-debits |Optional |accounts |Authorization Code |No |Pagination | |OBReadDirectDebit2 |

### GET /accounts/{AccountId}/direct-debits

An ASPSP must provide this endpoint for AISPs to retrieve the direct-debits for a specific account identified by AccountId.

### GET /direct-debits

An ASPSP may provide this endpoint for AISPs to retrieve direct-debits for all accounts that the PSU has consented to. This will retrieve the direct-debit resources for all authorised accounts linked to the account-request.

## Data Model

### Reused Classes

#### OBMandateRelatedInformation1

The OBMandateRelatedInformation1 class is defined in the [account-and-transaction-api-profile](../../profiles/account-and-transaction-api-profile.md#OBMandateRelatedInformation1) page.

__Note:__ OBMandateRelatedInformation1/MandateIdentification should contain the Direct Debit reference. For AUDDIS service users provide Core Reference. For non AUDDIS service users provide Core reference if possible or last used reference

### Resource Definition

A resource that contains a set of elements that describes the list of direct debits that have been set up on a specific account (AccountId).
An account (AccountId) may have no direct debits set up, or may have multiple direct debits set up.

### UML Diagram

![ OBReadDirectDebit2 ](./images/OBReadDirectDebit2.svg)

### Permission Codes

The resource requires the ReadDirectDebits permission. The resource response payload does not differ depending on the permissions granted.

### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBReadDirectDebit2 | |OBReadDirectDebit2 | |OBReadDirectDebit2 | | |
| Data |1..1 |OBReadDirectDebit2/Data | |OBReadDataDirectDebit2 | | |
| DirectDebit |0..n |OBReadDirectDebit2/Data/DirectDebit |Account to or from which a cash entry is made. |OBDirectDebit2| | |
| AccountId |1..1 |OBReadDirectDebit2/Data/DirectDebit/AccountId |A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner. |Max40Text | | |
| DirectDebitId |0..1 |OBReadDirectDebit2/Data/DirectDebit/DirectDebitId |A unique and immutable identifier used to identify the direct debit resource. This identifier has no meaning to the account owner. |Max40Text | | |
| DirectDebitStatusCode |0..1 |OBReadDirectDebit2/Data/DirectDebit/DirectDebitStatusCode |Specifies the status of the direct debit in code form. |OBExternalDirectDebitStatus1Code |Active Inactive | |
| Name |1..1 |OBReadDirectDebit2/Data/DirectDebit/Name |Name of Service User. |Max70Text | | |
| PreviousPaymentDateTime |0..1 |OBReadDirectDebit2/Data/DirectDebit/PreviousPaymentDateTime |Date of most recent direct debit collection. |ISODateTime | | |
| PreviousPaymentAmount |0..1 |OBReadDirectDebit2/Data/DirectDebit/PreviousPaymentAmount |The amount of the most recent direct debit collection. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadDirectDebit2/Data/DirectDebit/PreviousPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadDirectDebit2/Data/DirectDebit/PreviousPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| MandateRelatedInformation | 0..1 |OBReadDirectDebit2/Data/DirectDebit/MandateRelatedInformation |Provides further details of the mandate signed between the creditor and the debtor.|OBMandateRelatedInformation1 | | |


## Usage Examples

### Specific Account

#### Get Accounts Direct Debits Request

```
GET /accounts/22289/direct-debits HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Accounts Direct Debits Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DirectDebit": [
      {
        "AccountId": "22289",
        "DirectDebitId": "DD03",
        "MandateRelatedInformation": {
            "MandateIdentification": "Caravanners",
            "Frequency": {
              "PeriodType": "WEEK",
              "CountPerPeriod": 1,
              "PointInTime": "00"
          }
        },
        "DirectDebitStatusCode": "Active",
        "Name": "Towbar Club 3 - We Love Towbars",
        "PreviousPaymentDateTime": "2017-04-05T10:43:07+00:00",
        "PreviousPaymentAmount": {
          "Amount": "0.57",
          "Currency": "GBP"
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/direct-debits/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### Bulk

#### Get Direct Debits Request

```
GET /direct-debits HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Direct Debits Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DirectDebit": [
      {
        "AccountId": "22289",
        "DirectDebitId": "DD03",
        "MandateRelatedInformation": {
            "MandateIdentification": "Caravanners",
            "Frequency": {
              "PeriodType": "MNTH",
              "CountPerPeriod": 1,
              "PointInTime": "00"
          }
        },
        "DirectDebitStatusCode": "Active",
        "Name": "Towbar Club 3 - We Love Towbars",
        "PreviousPaymentDateTime": "2017-04-05T10:43:07+00:00",
        "PreviousPaymentAmount": {
          "Amount": "0.57",
          "Currency": "GBP"
        }
      },
      {
        "AccountId": "31820",
        "DirectDebitId": "DD77",
        "MandateRelatedInformation": {
          "MandateIdentification": "Golfers",
          "Frequency": { 
            "PeriodType": "MNTH",
            "CountPerPeriod": 1,
            "PointInTime": "00"
          }
        },
        "DirectDebitStatusCode": "Active",
        "Name": "Golf Club",
        "PreviousPaymentDateTime": "2017-05-06T09:00:00+00:00",
        "PreviousPaymentAmount": {
          "Amount": "22.30",
          "Currency": "GBP"
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/direct-debits/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```
