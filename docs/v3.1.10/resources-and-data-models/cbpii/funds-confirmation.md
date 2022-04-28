# Funds Confirmation - v3.1.10 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /funds-confirmations](#post-funds-confirmations)
- [Data Model](#data-model)
  - [Funds Confirmation - Request](#funds-confirmation---request)
    - [UML Diagram](#uml-diagram)
    - [Data Dictionary](#data-dictionary)
  - [Funds Confirmation - Response](#funds-confirmation---response)
    - [UML Diagram](#uml-diagram-2)
    - [Data Dictionary](#data-dictionary-2)
- [Usage Examples](#usage-examples)
  - [Funds Confirmation](#funds-confirmation)
    - [Example with all permitted fields](#example-with-all-permitted-fields)
      - [Request](#request)
      - [Response](#response)
    - [Example with a USD account](#example-with-a-usd-account)
      - [Request](#request-2)
      - [Response](#response-2)

## Overview

The Funds Confirmation resource is used by an CBPII to request to confirm funds are available.

This resource description should be read in conjunction with a compatible Confirmation of Funds API Profile.

## Endpoints
| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| funds-confirmation |POST |POST /funds-confirmations |Mandatory |fundsconfirmations |Authorization Code |No |No |OBFundsConfirmation1 |OBFundsConfirmationResponse1 |


### POST /funds-confirmations

If the CBPII would like to confirm funds with the ASPSP, it should create a new **funds-confirmation** resource, and check the funds available flag in the response.

* The ASPSP creates the **funds-confirmation** resource and responds with a unique FundsConfirmationId to refer to the resource, and a flag confirming if funds are available.
* The CBPII **must** use a token issued via an authorization code grant and specify the ConsentId in the request payload.
* This CBPII **must** use a currency of the account.

## Data Model

This data dictionary section gives the detail on the payload content.

### Funds Confirmation - Request

The OBFundsConfirmation1 object will be used for the following:

* Request to POST /funds-confirmations

#### UML Diagram

![OBFundsConfirmation1](./images/OBFundsConfirmation1.svg)

Notes:

* Funds can only be confirmed against the currency of the account, ASPSP must reject the request when Amount is in a different currency than the currency of the underlying account.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBFundsConfirmation1 | |OBFundsConfirmation1 | |OBFundsConfirmation1 | | |
| Data |1..1 |OBFundsConfirmation1/Data | |OBFundsConfirmationData1 | | |
| ConsentId |1..1 |OBFundsConfirmation1/Data/ConsentId |Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource. |Max128Text | | |
| Reference |1..1 |OBFundsConfirmation1/Data/Reference |Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction. |Max35Text | | |
| InstructedAmount |1..1 |OBFundsConfirmation1/Data/InstructedAmount |Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBFundsConfirmation1/Data/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$\|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBFundsConfirmation1/Data/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |

### Funds Confirmation - Response

The OBFundsConfirmationResponse1 object will be used for the following:

* Response to POST /funds-confirmations

#### UML Diagram

![OBFundsConfirmationResponse1](./images/OBFundsConfirmationResponse1.svg)

Notes:

The OBFundsConfirmationResponse1 object contains the same information as the OBFundsConfirmation1, but with additional fields:

* FundsConfirmationId - to uniquely identify the funds-confirmation resource.
* FundsAvailable - to indicate the result of a confirmation of funds check.
* CreationDateTime - to indicate when the resource was created.

#### Data Dictionary
| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBFundsConfirmationResponse1 | |OBFundsConfirmationResponse1 | |OBFundsConfirmationResponse1 | | |
| Data |1..1 |OBFundsConfirmationResponse1/Data | |OBFundsConfirmationDataResponse1 | | |
| FundsConfirmationId |1..1 |OBFundsConfirmationResponse1/Data/FundsConfirmationId |Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation resource. |Max40Text | | |
| ConsentId |1..1 |OBFundsConfirmationResponse1/Data/ConsentId |Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBFundsConfirmationResponse1/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| FundsAvailable |1..1 |OBFundsConfirmationResponse1/Data/FundsAvailable |Flag to indicate the result of a confirmation of funds check. |xs:boolean | | |
| Reference |1..1 |OBFundsConfirmationResponse1/Data/Reference |Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction. |Max35Text | | |
| InstructedAmount |1..1 |OBFundsConfirmationResponse1/Data/InstructedAmount |Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBFundsConfirmationResponse1/Data/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$\|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBFundsConfirmationResponse1/Data/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |

## Usage Examples

### Funds Confirmation

#### Example with all permitted fields

##### Request

Post Funds Confirmation Request

```
POST /funds-confirmations HTTP/1.1
Content-Type: application/json
Authorization: Bearer 1t1satruthun1v3rs4lly
Accept: application/json; charset=utf-8
x-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3
```

```json
{
  "Data": {
    "ConsentId": "88379",
	"Reference": "Purchase01",
    "InstructedAmount": {
       "Amount": "20.00",
       "Currency": "GBP"
    }
  }
}
```

##### Response

Post Funds Confirmation Response

```
HTTP/1.1 201 Created
Content-Type: application/json
x-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3
```

```json
{
  "Data": {
    "FundsConfirmationId": "123456",
    "ConsentId": "88379",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
	"FundsAvailable": true,
	"Reference": "Purchase01",
    "InstructedAmount": {
       "Amount": "20.00",
       "Currency": "GBP"
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/cbpii/funds-confirmations/123456"
  },
  "Meta": {}
}
```

#### Example with a USD account

A funds confirmation check can be made in a currency other than GBP as long as the InstructedAmount is in the currency of the payment account.

In this example, a USD funds check is made on a USD payment account.

##### Request

Post Funds Confirmation Request

```
POST /funds-confirmations HTTP/1.1
Content-Type: application/json
Authorization: Bearer 1t1satruthun1v3rs4lly
Accept: application/json; charset=utf-8
x-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3
```

```json
{
  "Data": {
    "ConsentId": "912304",
	"Reference": "Purchase02",
    "InstructedAmount": {
       "Amount": "20.00",
       "Currency": "USD"
    }
  }
}
```

##### Response

Post Funds Confirmation Response

```
HTTP/1.1 201 Created
Content-Type: application/json
x-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3
```

```json
{
  "Data": {
    "FundsConfirmationId": "836403",
    "ConsentId": "912304",
    "CreationDateTime": "2017-06-02T00:00:00+00:00",
	"FundsAvailable": true,
	"Reference": "Purchase02",
    "InstructedAmount": {
       "Amount": "20.00",
       "Currency": "USD"
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/cbpii/funds-confirmations/836403"
  },
  "Meta": {}
}
```
