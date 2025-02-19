# Funds Confirmation Consent - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /funds-confirmation-consents](#post-funds-confirmation-consents)
    - [Funds Confirmation Consent Status](#funds-confirmation-consent-status)
    - [Status Flow](#status-flow)
  - [GET /funds-confirmation-consents/{ConsentId}](#get-funds-confirmation-consentsconsentid)
    - [Funds Confirmation Consent Status](#funds-confirmation-consent-status-2)
  - [DELETE /funds-confirmation-consents/{ConsentId}](#delete-funds-confirmation-consentsconsentid)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBProxy1](#obproxy1)
  - [Funds Confirmation Consent - Request](#funds-confirmation-consent---request)
    - [UML Diagram](#uml-diagram)
    - [Data Dictionary](#data-dictionary)
  - [Funds Confirmation Consent - Response](#funds-confirmation-consent---response)
    - [UML Diagram](#uml-diagram-2)
    - [Data Dictionary](#data-dictionary-2)
  - [Data Payload - Enumerations](#data-payload-enumerations)
- [Usage Examples](#usage-examples)
  - [POST - Funds Confirmation Consent](#post---funds-confirmation-consent)
    - [Example with all permitted fields](#example-with-all-permitted-fields)
      - [Request](#request)
      - [Response](#response)
  - [GET - Funds Confirmation Consent](#get---funds-confirmation-consent)
    - [Example with all permitted fields](#example-with-all-permitted-fields-2)
      - [Request](#request-2)
      - [Response](#response-2)
    - [Example with PAN as Account Identification](#example-with-pan-as-account-identification)
      - [Request](#request-3)
      - [Response](#response-3)
  - [DELETE - Funds Confirmation Consent](#delete---funds-confirmation-consent)
    - [Example with all permitted fields](#example-with-all-permitted-fields-3)
      - [Request](#request-4)
      - [Response](#response-4)

## Overview

The Funds Confirmation Consent resource is used by an CBPII to register an intent to confirm funds.

This resource description should be read in conjunction with a compatible Confirmation of Funds API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| funds-confirmation-consent |POST |POST /funds-confirmation-consents |Mandatory |fundsconfirmations |Client Credentials |No |No |OBFundsConfirmationConsent1 |OBFundsConfirmationConsentResponse1 |
| funds-confirmation-consent |GET |GET /funds-confirmation-consents/{ConsentId} |Mandatory |fundsconfirmations |Client Credentials |No |No |NA |OBFundsConfirmationConsentResponse1 |
| funds-confirmation-consent |DELETE |DELETE /funds-confirmation-consents/{ConsentId} |Mandatory |fundsconfirmations |Client Credentials |No |No |NA |NA |

### POST /funds-confirmation-consents

The API allows the CBPII to ask an ASPSP to create a new **funds-confirmation-consent** resource.

* This endpoint allows the CBPII to propose a consent to be agreed between the ASPSP and PSU, to authorise the CBPII access to confirm funds are available.
* The ASPSP creates the **funds-confirmation-consent** resource and responds with a unique ConsentId to refer to the resource.
* Prior to calling the operation, the CBPII must have an access token issued by the ASPSP using a client credentials grant.

#### Funds Confirmation Consent Status

The PSU **must** authenticate with the ASPSP and agree the **funds-confirmation-consent** with the ASPSP, for the **funds-confirmation-consent** to be successfully setup.

The **funds-confirmation-consent** resource that is created successfully must have one of the following Status code-list enumerations:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AWAU |The Funds Confirmation Consent is awaiting agreement. |

After consent has been agreed the **funds-confirmation-consent** resource may have these following statuses.

|  |Status |Status Description |
| --- |--- |--- |
| 1 |RJCT |The Funds Confirmation Consent has been rejected. |
| 2 |AUTH |The Funds Confirmation Consent has been successfully agreed. |
| 3| CANC | The Funds Confirmation Consent has been cancelled |
| 4| EXPD | The Funds Confirmation Consent has expired |

Changes to the Status, such as being rejected, should be captured in `StatusReason`, an array of `StatusReasonCode`, `StatusReasonDescription` and `Path`.  

| Field | Description |
|---|---|
| StatusReasonCode | Code directly relating to the reason for the current Status. See [the codelists](https://github.com/OpenBankingUK/External_internal_CodeSets) for appropriate values. |
| StatusReasonDescription | Description of why the code was returned |
|Path| Recommended but optional reference to JSON path if relevant to the code |

#### Status Flow

This is the state diagram for Status.

![ Consent Authorisation.jpg ](./images/AIS_Consent.png)


### GET /funds-confirmation-consents/{ConsentId}

A CBPII may optionally retrieve a **funds-confirmation-consent** resource that they have created to check its status. 

Prior to calling the operation, the CBPII must have an access token issued by the ASPSP using a client credentials grant.

ASPSP may mask the Identification field partially in the GET response.

ASPSPs may return masked PAN as per their online system e.g. 5555 **** **** 4444, **** **** **** 4444 etc.

#### Funds Confirmation Consent Status

Once the PSU agrees the consent outlined in the **funds-confirmation-consent** resource, the Status of the **funds-confirmation-consent** resource will be updated with "AUTH".

The available Status code-list enumerations for the **funds-confirmation-consent** resource are:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AWAU |The Funds Confirmation Consent is awaiting agreement. |
| 2 |RJCT |The Funds Confirmation Consent has been rejected. |
| 3 |AUTH |The Funds Confirmation Consent has been successfully agreed. |
| 4 | CANC | The Funds Confirmation Consent has been cancelled |
| 5 | EXPD | The Funds Confirmation Consent has expired |


### DELETE /funds-confirmation-consents/{ConsentId}

If the PSU revokes consent to confirm funds with the CBPII, the CBPII **must** delete the **funds-confirmation-consent** resource.

* This is done by making a call to DELETE the **funds-confirmation-consent** resource as soon as is practically possible.
* Prior to calling the operation, the CBPII must have an access token issued by the ASPSP using a client credentials grant.

## Data Model

This data dictionary section gives the detail on the payload content.


### Reused Classes

#### OBProxy1  

The OBProxy1 class is defined in the [confirmation-of-funds-api-profile](../../profiles/confirmation-of-funds-api-profile.md#obproxy1) page.

### Funds Confirmation Consent - Request

The OBFundsConfirmationConsent1 object will be used for the following:

* Request to POST /funds-confirmation-consents

#### UML Diagram

![OBFundsConfirmationConsent1](./images/OBFundsConfirmationConsent1.svg)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBFundsConfirmationConsent1 | |OBFundsConfirmationConsent1 | |OBFundsConfirmationConsent1 | | |
| Data |1..1 |OBFundsConfirmationConsent1/Data | |OBFundsConfirmationConsentData1 | | |
| ExpirationDateTime |0..1 |OBFundsConfirmationConsent1/Data/ExpirationDateTime |Specified date and time the funds confirmation authorisation will expire. If this is not populated, the authorisation will be open ended. |ISODateTime | | |
| DebtorAccount |1..1 |OBFundsConfirmationConsent1/Data/DebtorAccount |Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBFundsConfirmationConsent1/Data/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |1..1 |OBFundsConfirmationConsent1/Data/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBFundsConfirmationConsent1/Data/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBFundsConfirmationConsent1/Data/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBFundsConfirmationConsent1/Data/DebtorAccount/Proxy |Specifies an alternate assumed name for the identification of the account. |OBProxy1 | | |

### Funds Confirmation Consent - Response

The OBFundsConfirmationConsentResponse1 object will be used for the following:

* Response to POST /funds-confirmation-consents
* Call to GET /funds-confirmation-consents/{ConsentId}

#### UML Diagram

![OBFundsConfirmationConsentResponse1](./images/OBFundsConfirmationConsentResponse1.svg)

Notes:

The OBFundsConfirmationConsentResponse1 object contains the same information as the OBFundsConfirmation1, but with additional fields:

* ConsentId - to uniquely identify the funds-confirmation-consent resource.
* Status.
* StatusReason
* StatusUpdateDateTime.
* CreationDateTime.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBFundsConfirmationConsentResponse1 | |OBFundsConfirmationConsentResponse1 | |OBFundsConfirmationConsentResponse1 | | |
| Data |1..1 |OBFundsConfirmationConsentResponse1/Data | |OBFundsConfirmationConsentDataResponse1 | | |
| ConsentId |1..1 |OBFundsConfirmationConsentResponse1/Data/ConsentId |Unique identification as assigned to identify the funds confirmation consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBFundsConfirmationConsentResponse1/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| ExpirationDateTime |0..1 |OBFundsConfirmationConsentResponse1/Data/ExpirationDateTime |Specified date and time the funds confirmation authorisation will expire. If this is not populated, the authorisation will be open ended. |ISODateTime | | |
| Status |1..1 |OBFundsConfirmationConsentResponse1/Data/Status |Specifies the status of consent resource in code form. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets). |OBInternalConsentStatus1Code ||
| StatusReason |0..* |OBFundsConfirmationConsentResponse1/Data/StatusReason |Array of StatusReasonCodes. | OBStatusReason |||
| StatusReasonCode |0..1 |OBFundsConfirmationConsentResponse1/Data/StatusReason/StatusReasonCode |Specifies the status reason in a code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBExternalStatusReason1Code||
| StatusReasonDescription |0..1 |OBFundsConfirmationConsentResponse1/Data/StatusReason/StatusReasonDescription |Description supporting the StatusReasonCode. | Max500text|||
| Path |0..1 |OBFundsConfirmationConsentResponse1/Data/StatusReason/Path |Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path. |Max500text|||
| StatusUpdateDateTime |1..1 |OBFundsConfirmationConsentResponse1/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| DebtorAccount |1..1 |OBFundsConfirmationConsentResponse1/Data/DebtorAccount |Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBFundsConfirmationConsentResponse1/Data/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |1..1 |OBFundsConfirmationConsentResponse1/Data/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBFundsConfirmationConsentResponse1/Data/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBFundsConfirmationConsentResponse1/Data/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Proxy |0..1 |OBFundsConfirmationConsentResponse1/Data/DebtorAccount/Proxy |Specifies an alternate assumed name for the identification of the account. |OBProxy1 | | |

### Data Payload - Enumerations

A full list of enumerations for both OBL and ISO 20022 used in the payloads can be found [here](https://github.com/OpenBankingUK/External_internal_CodeSets)


## Usage Examples

### POST - Funds Confirmation Consent

#### Example with all permitted fields

##### Request

Post Funds Confirmation Consent

```
POST /funds-confirmation-consents HTTP/1.1
Content-Type: application/json
Authorization: Bearer 1t1satruthun1v3rs4lly
Accept: application/json; charset=utf-8
x-fapi-auth-date: Mon, 13 Nov 2017 19:49:37 GMT    
x-fapi-customer-ip-address: 92.11.92.11
x-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3
```

```json
{
  "Data": {
    "DebtorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "GB76LOYD30949301273801",
      "SecondaryIdentification": "Roll 56988",
      "Name": "Jane Smith",
      "Proxy": {
          "Identification": "+441632960540",
          "Code": "TELE",
          "Type": "Telephone"
        }
    },
    "ExpirationDateTime": "2017-05-02T00:00:00+00:00"
  }
}
```

##### Response

Post Funds Confirmation Consent Response

```
HTTP/1.1 201 Created
Content-Type: application/json
x-fapi-interaction-id: hook5i13-ntIg-4th3-rP41-3ro535touch3
```

```json
{
  "Data": {
    "ConsentId": "88379",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
    "Status": "AWAU",
    "StatusReason": [
      {
      "StatusReasonCode": "83",
      "StatusReasonDescription":"Pending completion next working day",
      }
    ],
    "StatusUpdateDateTime": "2017-05-02T00:00:00+00:00",
    "ExpirationDateTime": "2017-05-02T00:00:00+00:00",
    "DebtorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "GB76LOYD30949301273801",
      "SecondaryIdentification": "Roll 56988",
      "Name": "Jane Smith",
      "Proxy": {
        "Identification": "+441632960540",
        "Code": "TELE",
        "Type": "Telephone"
      },
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/cbpii/funds-confirmation-consents/88379"
  },
  "Meta": {}
}
```

### GET - Funds Confirmation Consent

#### Example with all permitted fields

##### Request

GET Funds Confirmation Consent Request

```
GET /funds-confirmation-consents/88379 HTTP/1.1
Authorization: Bearer Jhingapulaav
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

##### Response

GET Funds Confirmation Consent Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "88379",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
    "Status": "AWAU",
    "StatusUpdateDateTime": "2017-05-02T00:00:00+00:00",
    "ExpirationDateTime": "2017-05-02T00:00:00+00:00",
    "DebtorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "GB76LOYD30949301273801",
      "SecondaryIdentification": "Roll 56988",
      "Name": "Jane Smith",
      "Proxy": {
        "Identification": "+441632960540",
        "Code": "TELE",
        "Type": "Telephone"
      },
    },
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/cbpii/funds-confirmation-consents/88379"
  },
  "Meta": {}
}
```
#### Example with PAN as Account Identification

##### Request

GET Funds Confirmation Consent Request

```
GET /funds-confirmation-consents/88999 HTTP/1.1
Authorization: Bearer a27393fd-12af-4aba-908d-faf042b2a7d9
x-fapi-interaction-id: 80e03097-b808-4557-b5f4-aa820c772e3c
Accept: application/json
```

##### Response

GET Funds Confirmation Consent Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 80e03097-b808-4557-b5f4-aa820c772e3c
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "88999",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
    "Status": "AWAU",
    "StatusReason": [
      {
      "StatusReasonCode": "83",
      "StatusReasonDescription":"Pending completion next working day",
      }
    ],
    "StatusUpdateDateTime": "2017-05-02T00:00:00+00:00",
    "ExpirationDateTime": "2017-05-02T00:00:00+00:00",
    "DebtorAccount": {
      "Name": "Jane Smith",
      "SchemeName": "UK.OBIE.PAN",
      "SecondaryIdentification": "008419",
      "Identification": "4444********1111",
      "Proxy":{
          "Identification": "441234012348",
          "Code": "TELE",
          "Type": "Telephone"
        }
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/cbpii/funds-confirmation-consents/88999"
  },
  "Meta": {}
}
```

### DELETE - Funds Confirmation Consent

#### Example with all permitted fields

##### Request

DELETE Funds Confirmation Consent Request

```
DELETE /funds-confirmation-consents/88379 HTTP/1.1
Authorization: Bearer Sarsonkasaag
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
```

##### Response

DELETE Funds Confirmation Consent Response

```
HTTP/1.1 204 No Content
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
```
