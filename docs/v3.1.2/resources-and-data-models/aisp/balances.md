# Balances - v3.1.2

1. [Overview](#overview)
2. [Endpoints](#endpoints)
   1. [GET /accounts/{AccountId}/balances](#get-accountsaccountidbalances)
   2. [GET /balances](#get-balances)
3. [Data Model](#data-model)
   1. [Resource Definition](#resource-definition)
   2. [UML Diagram](#uml-diagram)
   3. [Notes](#notes)
   4. [Permission Codes](#permission-codes)
   5. [Data Dictionary](#data-dictionary)
4. [Usage Examples](#usage-examples)
   1. [Specific Account](#specific-account)
      1. [Get Account Balances Request](#get-account-balances-request)
      2. [Get Account Balances Response](#get-account-balances-response)
   2. [Bulk](#bulk)
      1. [Get Balances Request](#get-balances-request)
      2. [Get Balances Response](#get-balances-response)

## Overview

The balances resource is used by an AISP to retrieve in bulk or single account balance information for a specific AccountId for that the PSU has authorised to access.

This resource description should be read in conjunction with a compatible Account Information Services API Profile.

## Endpoints

|  |Resource |HTTP Operation |Endpoint |Mandatory? |Scope |Grant Type |Idempotency Key |Parameters |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| 1 |balances |GET |GET /accounts/{AccountId}/balances |Mandatory |accounts |Authorization Code |No | | |OBReadBalance1 |
| 2 |balances |GET |GET /balances |Optional |accounts |Authorization Code |No |Pagination | |OBReadBalance1 |

### GET /accounts/{AccountId}/balances

An AISP may retrieve the account balance information resource for a specific AccountId (which is retrieved in the call to GET /accounts).

### GET /balances

If an ASPSP has implemented the bulk retrieval endpoints, an AISP may optionally retrieve the account information resources in bulk.
This will retrieve the resources for all authorised accounts linked to the account-request.

## Data Model

The OBReadBalance1 object will be used for the call to: 

* GET /accounts/{AccountId}/balances
* GET /balances

### Resource Definition

This resource represents the net increases and decreases in an account (AccountId) at a specific point in time.

An account (AccountId) may have multiple balance types (these follow the standard ISO 20022 balance type enumerations). If an ASPSP includes a credit line in an available balance, then the balance representation will have a section for the credit line amount and type.

### UML Diagram

![ OBReadBalance1.gif ]( images/Balances/OBReadBalance1.gif )

### Notes

* Multiple balances may be returned (each with a different value for Type) for an account. This is for ASPSPs that show multiple balances in their online channels.
* The CreditLine section may be repeated as multiple credit lines may be included in an available balance.
* A DateTime element has been used instead of a complex choice element of Date and DateTime. Where time elements do not exist in ASPSP systems, the time portion of the DateTime element will be defaulted to 00:00:00+00:00.

### Permission Codes

The resource requires the ReadBalances permission. The resource response payload does not differ depending on the permissions granted.

### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBReadBalance1 | |OBReadBalance1 | |OBReadBalance1 | | |
| Data |1..1 |OBReadBalance1/Data | |OBReadDataBalance1 | | |
| Balance |1..n |OBReadBalance1/Data/Balance |Set of elements used to define the balance details. |OBCashBalance1 | | |
| AccountId |1..1 |OBReadBalance1/Data/Balance/AccountId |A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner. |Max40Text | | |
| CreditDebitIndicator |1..1 |OBReadBalance1/Data/Balance/CreditDebitIndicator |Indicates whether the balance is a credit or a debit balance. Usage: A zero balance is considered to be a credit balance. |OBCreditDebitCode |Credit Debit | |
| Type |1..1 |OBReadBalance1/Data/Balance/Type |Balance type, in a coded form. |OBBalanceType1Code |ClosingAvailable ClosingBooked ClosingCleared Expected ForwardAvailable Information InterimAvailable InterimBooked InterimCleared OpeningAvailable OpeningBooked OpeningCleared PreviouslyClosedBooked | |
| DateTime |1..1 |OBReadBalance1/Data/Balance/DateTime |Indicates the date (and time) of the balance. |ISODateTime | | |
| Amount |1..1 |OBReadBalance1/Data/Balance/Amount |Amount of money of the cash balance. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadBalance1/Data/Balance/Amount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |^\d{1,13}\.\d{1,5}$ |
| Currency |1..1 |OBReadBalance1/Data/Balance/Amount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| CreditLine |0..n |OBReadBalance1/Data/Balance/CreditLine |Set of elements used to provide details on the credit line. |OBCreditLine1 | | |
| Included |1..1 |OBReadBalance1/Data/Balance/CreditLine/Included |Indicates whether or not the credit line is included in the balance of the account. Usage: If not present, credit line is not included in the balance amount of the account. |xs:boolean | | |
| Type |0..1 |OBReadBalance1/Data/Balance/CreditLine/Type |Limit type, in a coded form. |OBExternalLimitType1Code |Available Credit Emergency Pre-Agreed Temporary | |
| Amount |0..1 |OBReadBalance1/Data/Balance/CreditLine/Amount |Amount of money of the credit line. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadBalance1/Data/Balance/CreditLine/Amount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |^\d{1,13}\.\d{1,5}$ |
| Currency |1..1 |OBReadBalance1/Data/Balance/CreditLine/Amount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |

## Usage Examples

### Specific Account

#### Get Account Balances Request


```
GET /accounts/22289/balances HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Account Balances Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "Balance": [
      {
        "AccountId": "22289",
        "Amount": {
          "Amount": "1230.00",
          "Currency": "GBP"
        },
        "CreditDebitIndicator": "Credit",
        "Type": "InterimAvailable",
        "DateTime": "2017-04-05T10:43:07+00:00",
        "CreditLine": [
          {
            "Included": true,
            "Amount": {
              "Amount": "1000.00",
              "Currency": "GBP"
            },
            "Type": "Pre-Agreed"
          }
        ]
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/balances/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### Bulk

#### Get Balances Request

```
GET /balances HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Balances Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "Balance": [
      {
        "AccountId": "22289",
        "Amount": {
          "Amount": "1230.00",
          "Currency": "GBP"
        },
        "CreditDebitIndicator": "Credit",
        "Type": "InterimAvailable",
        "DateTime": "2017-04-05T10:43:07+00:00",
        "CreditLine": [
          {
            "Included": true,
            "Amount": {
              "Amount": "1000.00",
              "Currency": "GBP"
            },
            "Type": "Pre-Agreed"
          }
        ]
      },
      {
        "AccountId": "31820",
        "Amount": {
          "Amount": "57.36",
          "Currency": "GBP"
        },
        "CreditDebitIndicator": "Debit",
        "Type": "InterimBooked",
        "DateTime": "2017-05-02T14:22:09+00:00"
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/balances/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```