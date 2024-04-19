# Standing Orders - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [GET /accounts/{AccountId}/standing-orders](#get-accountsaccountidstanding-orders)
  - [GET /standing-orders](#get-standing-orders)
- [Data Model](#data-model)
  - [Resource Definition](#resource-definition)
  - [UML Diagram](#uml-diagram)
  - [Notes](#notes)
  - [Frequency Examples](#frequency-examples)
  - [Permission Codes](#permission-codes)
  - [Data Dictionary](#data-dictionary)
- [Usage Examples](#usage-examples)
  - [Specific Account](#specific-account)
    - [Get Accounts Standing Orders Request](#get-accounts-standing-orders-request)
    - [Get Accounts Standing Orders Response](#get-accounts-standing-orders-response)
  - [Bulk](#bulk)
    - [Get Standing Orders Request](#get-standing-orders-request)
    - [Get Standing Orders Response](#get-standing-orders-response)

## Overview

The standing-orders resource is used by an AISP to retrieve the standing orders for a specific AccountId or to retrieve the standing orders in bulk for all the accounts that the PSU has consented to.

This resource description should be read in conjunction with a compatible Account Information Services API Profile.

## Endpoints

Endpoints for the resource and available methods.

|  |Resource |HTTP Operation |Endpoint |Mandatory? |Scope |Grant Type |Idempotency Key |Parameters |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| 1 |standing-orders |GET |GET /accounts/{AccountId}/standing-orders |Conditional |accounts |Authorization Code |No |Pagination | |OBReadStandingOrder6 |
| 2 |standing-orders |GET |GET /standing-orders |Optional |accounts |Authorization Code |No |Pagination | |OBReadStandingOrder6 |

### GET /accounts/{AccountId}/standing-orders

An AISP may retrieve the standing-order resource for a specific AccountId (which is retrieved in the call to GET /accounts).

### GET /standing-orders

If an ASPSP has implemented the bulk retrieval endpoints, an AISP may optionally retrieve the standing-order resources in bulk.
This will retrieve the resources for all authorised accounts linked to the account-request.

## Data Model

The OBReadStandingOrder6 object will be used for the call to:

* GET /accounts/{AccountId}/standing-orders
* GET /standing-orders

### Resource Definition

A resource that contains a set of elements that describes the list of standing-orders that have been set up on a specific account (AccountId).
An account (AccountId) may have no standing orders set up, or may have multiple standing orders set up.

### UML Diagram

![ OBReadStandingOrder6 ](./images/OBReadStandingOrder6.svg)

### Notes

* The **Creditor Account** and **CreditorAgent** blocks replicate what is used consistently throughout the Account Information APIs to identify an account.
* For the /accounts/{AccountId}/standing-orders endpoint, the **Creditor Account** and **CreditorAgent** blocks represent the account that is receiving funds (so has been named the CreditorAccount for consistency with the PISP use case).
* A DateTime element has been used so that there is consistency across all API endpoints using dates. Where time elements do not exist in ASPSP systems, the time portion of the DateTime element will be defaulted to 00:00:00+00:00.
* The Amount elements all have embedded Currency elements for consistency is ISO 20022, and across the other API endpoints.
* ASPSPs must give TPPs at least three month's notice, prior to implementing any change in the code-lists of the fields, if such a change impacts the ability of TPPs to continue with the provision of their service.
  
### Frequency Examples

| Frequency |Example |Details |
| --- |--- |--- |
| NotKnown |NotKnown |Not known |
| EvryDay |EvryDay |Every day |
| EvryWorkgDay |EvryWorkgDay |Every working day |
| IntrvlDay |IntrvlDay:15 |Every 15 Calendar day. |
| IntrvlWkDay |IntrvlWkDay:01:03 |Every week, on the 3rd day of the week |
| IntrvlWkDay |IntrvlWkDay:02:03 |Every 2nd week, on the 3rd day of the week |
| WkInMnthDay |WkInMnthDay:02:03 |Every month, on the 2nd week of the month, and on the third day of the week |
| IntrvlMnthDay |IntrvlMnthDay:01:-01 |Every month, on the last day of the month |
| IntrvlMnthDay |IntrvlMnthDay:06:15 |Every 6th month, on the 15th day of the month |
| QtrDay |QtrDay:ENGLISH |Paid on the 25th March, 24th June, 29th September and 25th December |

### Permission Codes

The resource differs depending on the permissions (ReadStandingOrdersBasic and ReadStandingOrdersDetail) used to access resource. In the event the resource is accessed with both ReadStandingOrdersBasic and ReadStandingOrdersDetail, the most detailed level (ReadStandingOrdersDetail) must be used.

* These objects **must not** be returned **without** the **ReadStandingOrdersDetail** permission:
    * OBReadStandingOrder6/Data/StandingOrder/CreditorAgent
    * OBReadStandingOrder6/Data/StandingOrder/CreditorAccount
* If the **ReadStandingOrdersDetail** is granted by the PSU:     
    * OBReadStandingOrder6/Data/StandingOrder/CreditorAgent **may** be returned if applicable to the account and ASPSP (0..1)
    * OBReadStandingOrder6/Data/StandingOrder/CreditorAccount **must** be returned (1..1)

If the ReadPAN permission is granted by the PSU, the ASPSP may choose to populate the OBReadStandingOrder6/Data/StandingOrder/CreditorAccount/Identification with the unmasked PAN (if the PAN is being populated in the response).

### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBReadStandingOrder6 | |OBReadStandingOrder6 | |OBReadStandingOrder6 | | |
| Data |1..1 |OBReadStandingOrder6/Data | |OBReadDataStandingOrder5 | | |
| StandingOrder |0..n |OBReadStandingOrder6/Data/StandingOrder | |OBStandingOrder5 | | |
| AccountId |1..1 |OBReadStandingOrder6/Data/StandingOrder/AccountId |A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner. |Max40Text | | |
| StandingOrderId |0..1 |OBReadStandingOrder6/Data/StandingOrder/StandingOrderId |A unique and immutable identifier used to identify the standing order resource. This identifier has no meaning to the account owner. |Max40Text | | |
| MandateRelatedInformation | 0..1 |OBReadStandingOrder6/Data/MandateRelatedInformation ||OBMandateRelatedInformation | | |
| MandateIdentification | 0..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/MandateIdentification ||Max35Text | | |
| Classification | 0..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/Classification|FIXE<br>USGB<br>VARI|OBClassification1Code | | |
| CategoryPurposeCode | 0..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/CategoryPurposeCode ||OBCategoryPurpose1Code | | |
| FirstPaymentDate | 0..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/FirstPaymentDate |The date on which the first payment for a Standing Order schedule will be made. |ISODate | | |
| FinalPaymentDate | 0..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/FinalPaymentDate |The date on which the final payment for a Standing Order schedule will be made. |ISODate | | |
| Frequency | 0..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/Frequency |A code indicating the frequency of payment for the Standing Order. Values:<br>ADHO<br>YEAR<br>DALI<br>INDA<br>MNTH<br>QURT<br>MIAN<br>WEEK |OBFrequencyPeriodType | | |
| PeriodType | 1..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/PeriodType |A code indicating the period type for the Standing Order. Values:<br>ADHO<br>YEAR<br>DALI<br>INDA<br>MNTH<br>QURT<br>MIAN<br>WEEK |OBFrequencyPeriodType | | |
| CountPerPeriod | 1..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/CountPerPeriod | |int32 | |
| PointInTimeType | 1..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/PointInTimeType |A code indicating the point in time for payment of the Standing Order. Values:<br>ADHO<br>YEAR<br>DALI<br>INDA<br>MNTH<br>QURT<br>MIAN<br>WEEK |OBFrequencyPeriodType | | |
| PointInTime | 1..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/PointInTime |ISODateTime | | |
| Reason| 0..1 |OBReadStandingOrder6/Data/MandateRelatedInformation/Reason | |Max256Text | |
| Reference |0..1 |OBReadStandingOrder6/Data/StandingOrder/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. |Max35Text | | |
| NextPaymentDateTime |0..1 |OBReadStandingOrder6/Data/StandingOrder/NextPaymentDateTime |The date on which the next payment for a Standing Order schedule will be made. |ISODate | | |
|LastPaymentDateTime| 0..1| OBReadStandingOrder6/Data/StandingOrder/LastPaymentDateTime |The date on which the last (most recent) payment for a Standing Order schedule was made. |ISODateTime | | |
| NumberOfPayments |0..1 | OBReadStandingOrder6/Data/StandingOrder/NumberOfPayments| Number of the payments that will be made in completing this frequency sequence including any executed since the sequence start date. |Max35Text | | |
| StandingOrderStatusCode |0..1 |OBReadStandingOrder6/Data/StandingOrder/StandingOrderStatusCode |Specifies the status of the standing order in code form. |OBExternalStandingOrderStatus1Code |Active Inactive | |
| FirstPaymentAmount |0..1 |OBReadStandingOrder6/Data/StandingOrder/FirstPaymentAmount |The amount of the first Standing Order |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadStandingOrder6/Data/StandingOrder/FirstPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadStandingOrder6/Data/StandingOrder/FirstPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| NextPaymentAmount |0..1 |OBReadStandingOrder6/Data/StandingOrder/NextPaymentAmount |The amount of the next Standing Order. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadStandingOrder6/Data/StandingOrder/NextPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadStandingOrder6/Data/StandingOrder/NextPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
|LastPaymentAmount|0..1|OBReadStandingOrder6/Data/StandingOrder/LastPaymentAmount|The amount of the last (most recent) Standing Order instruction.|OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadStandingOrder6/Data/StandingOrder/LastPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadStandingOrder6/Data/StandingOrder/LastPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| FinalPaymentAmount |0..1 |OBReadStandingOrder6/Data/StandingOrder/FinalPaymentAmount |The amount of the final Standing Order |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadStandingOrder6/Data/StandingOrder/FinalPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadStandingOrder6/Data/StandingOrder/FinalPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| CreditorAgent |0..1 |OBReadStandingOrder6/Data/StandingOrder/CreditorAgent |Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account. This is the servicer of the beneficiary account. |OBBranchAndFinancialInstitutionIdentification5 | | |
| LEI |0..1 | OBReadStandingOrder6/Data/StandingOrder/CreditorAgent/LEI |Legal Entity Identification by which a party is known and which is usually used to identify that party. |Max20Text | | |
| SchemeName |1..1 |OBReadStandingOrder6/Data/StandingOrder/CreditorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |1..1 |OBReadStandingOrder6/Data/StandingOrder/CreditorAgent/Identification |Unique and unambiguous identification of the servicing institution. |Max35Text | | |
| CreditorAccount |0..1 |OBReadStandingOrder6/Data/StandingOrder/CreditorAccount |Provides the details to identify the beneficiary account. |OBCashAccount5 | | |
| SchemeName |1..1 |OBReadStandingOrder6/Data/StandingOrder/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBReadStandingOrder6/Data/StandingOrder/CreditorAccount/Identification |Beneficiary account identification. |Max256Text | | |
| Name |0..1 |OBReadStandingOrder6/Data/StandingOrder/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBReadStandingOrder6/Data/StandingOrder/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| SupplementaryData |0..1 |OBReadStandingOrder6/Data/StandingOrder/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

## Usage Examples

### Specific Account

#### Get Accounts Standing Orders Request

```
GET /accounts/22289/standing-orders HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Accounts Standing Orders Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "StandingOrder": [
      {
        "AccountId": "22289",
        "StandingOrderId": "Ben3",
        "MandateRelatedInformation": {
            "Frequency": "WEEK",
            "PeriodType": "WEEK",
            "CountPerPeriod": 1,
            "PointInTimeType": "WEEK",
            "PointInTime": "2017-08-13T00:00:00+00:00"
        },
        "Reference": "Towbar Club 2 - We Love Towbars",
        "FirstPaymentAmount": {
          "Amount": "0.57",
          "Currency": "GBP"
        },
        "NextPaymentDateTime": "2017-08-13T00:00:00+00:00",
        "NextPaymentAmount": {
          "Amount": "0.56",
          "Currency": "GBP"
        },
        "FinalPaymentAmount": {
          "Amount": "0.56",
          "Currency": "GBP"
        },
        "StandingOrderStatusCode": "Active",
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "80200112345678",
          "Name": "Mrs Juniper"
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/standing-orders/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### Bulk

#### Get Standing Orders Request

```
GET /standing-orders HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Standing Orders Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "StandingOrder": [
      {
        "AccountId": "22289",
        "StandingOrderId": "Ben3",
        "MandateRelatedInformation": {
            "Frequency": "DAIL",
            "PeriodType": "DAIL",
            "FirstPaymentDate": "2017-08-12",
            "LastPaymentDate": "2027-08-12",
            "CountPerPeriod": 1,
            "PointInTimeType": "DAIL",
            "PointInTime": "T00:00:00+00:00"
        },
        "Reference": "Towbar Club 2 - We Love Towbars",
        "FirstPaymentAmount": {
          "Amount": "0.57",
          "Currency": "GBP"
        },
        "NextPaymentDateTime": "2017-08-13T00:00:00+00:00",
        "NextPaymentAmount": {
          "Amount": "0.56",
          "Currency": "GBP"
        },
        "FinalPaymentAmount": {
          "Amount": "0.56",
          "Currency": "GBP"
        },
        "StandingOrderStatusCode": "Active",
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "80200112345678",
          "Name": "Mrs Juniper"
        }
      },
      {
        "AccountId": "22289",
        "StandingOrderId": "Ben5",
        "MandateRelatedInformation": {
            "Frequency": "MNTH",
            "PeriodType": "MNTH",
            "FirstPaymentDate": "2017-06-12",
            "LastPaymentDate": "2018-06-12",
            "CountPerPeriod": 1,
            "PointInTimeType": "MNTH",
            "PointInTime": "T00:00:00+00:00"
        },
        "Reference": "Golf - We Love Golf",
        "FirstPaymentAmount": {
          "Amount": "23.00",
          "Currency": "GBP"
        },
        "NextPaymentDateTime": "2017-07-12T00:00:00+00:00",
        "NextPaymentAmount": {
          "Amount": "23.00",
          "Currency": "GBP"
        },
        "FinalPaymentAmount": {
          "Amount": "23.00",
          "Currency": "GBP"
        },
        "StandingOrderStatusCode": "Active",
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "23605490179017",
          "Name": "Mr Tee"
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/standing-orders/"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```
