# Account Access Consents - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /account-access-consents](#post-account-access-consents)
    - [Account Access Consent Status](#account-access-consent-status)
    - [Status Flow](#status-flow)
  - [GET /account-access-consents/{ConsentId}](#get-account-access-consentsconsentid)
    - [Account Access Consent Status](#account-access-consent-status-1)
  - [DELETE /account-access-consents/{ConsentId}](#delete-account-access-consentsconsentid)
- [Data Model](#data-model)
  - [Account Access Consents - Request](#account-access-consents---request)
    - [UML Diagram](#uml-diagram)
    - [Notes](#notes)
    - [Data Dictionary](#data-dictionary)
  - [Account Access Consents - Response](#account-access-consents---response)
    - [UML Diagram](#uml-diagram-1)
    - [Notes](#notes-1)
    - [Data Dictionary](#data-dictionary-1)
- [Usage Examples](#usage-examples)
  - [Setup Account Access Consent - All Permissions Granted](#setup-account-access-consent---all-permissions-granted)
    - [Post Account Access Consents Request](#post-account-access-consents-request)
    - [Post Account Access Consents Response](#post-account-access-consents-response)
  - [StatusCode - AWAU](#statuscode---awau)
    - [Get Account Access Consents Request](#get-account-access-consents-request)
    - [Get Account Access Consents Response](#get-account-access-consents-response)
  - [StatusCode - AUTH](#statuscode---auth)
    - [Get Account Access Consents Request](#get-account-access-consents-request-1)
    - [Get Account Access Consents Response](#get-account-access-consents-response-1)
  - [Delete Account Access Consent](#delete-account-access-consent)
    - [Delete Account Access Consents Request](#delete-account-access-consents-request)
    - [Delete Account Access Consents Response](#delete-account-access-consents-response)
  - [Setup Account Access Consent with Limited Permissions](#setup-account-access-consent-with-limited-permissions)
    - [Post Account Access Consent Request](#post-account-access-consent-request)
    - [Post Account Access Consent Response](#post-account-access-consent-response)

## Overview

The Account Access Consents API is used by an AISP to request an ASPSP to create a new account-access-consent resource, retrieve the status of account-access-consent resource and delete the account-access-consent resource.

This resource description should be read in conjunction with a compatible Account Information Services API Profile.

## Endpoints

|  |Resource |HTTP Operation |Endpoint |Mandatory? |Scope |Grant Type |Idempotency Key |Parameters |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| 1 |account-access-consents |POST |POST /account-access-consents |Mandatory |accounts |Client Credentials |No | |OBReadConsent1 |OBReadConsentResponse1 |
| 2 |account-access-consents |GET |GET /account-access-consents/{ConsentId} |Mandatory |accounts |Client Credentials |No | | |OBReadConsentResponse1 |
| 3 |account-access-consents |DELETE |DELETE /account-access-consents/{ConsentId} |Mandatory |accounts |Client Credentials |No | | | |

### POST /account-access-consents

The API allows the AISP to ask an ASPSP to create a new account-access-consent resource.

* This API effectively allows the AISP to send a copy of the consent to the ASPSP to authorise access to account and transaction information.
* An AISP is not able to pre-select a set of accounts for account-access-consent authorisation. This is because the behaviour of the pre-selected accounts, after authorisation, is not clear from a Legal perspective.
* An ASPSP creates the account-access-consent resource and responds with a unique ConsentId to refer to the resource.
* Prior to calling the API, the AISP must have an access token issued by the ASPSP using a client credentials grant.


#### Account Access Consent Status

The PSU  **must**  authenticate with the ASPSP and authorise the account-access-consent for the account-access-consent to be successfully setup.
The account-access-consent resource that is created successfully must have the following Status code-list enumeration:

|  |StatusCode |Status Description |
| --- |--- |--- |
| 1 |AWAU |The account access consent is awaiting authorisation. |

After authorisation has taken place the account-access-consent resource may have these following statuses.

|  |StatusCode |Status Description |
| --- |--- |--- |
| 1 |RJCT |The account access consent has been rejected. |
| 2 |AUTH |The account access consent has been successfully authorised. |


#### Status Flow

This is the state diagram for the StatusCode.

![ Consent Authorisation.jpg ](./images/AIS_Consent.png )

### GET /account-access-consents/{ConsentId}

An AISP may optionally retrieve an account-access-consent resource that they have created to check its status.

Prior to calling the API, the AISP must have an access token issued by the ASPSP using a client credentials grant.

The usage of this API endpoint will be subject to an ASPSP's fair usage policies.

#### Account Access Consent Status

Once the PSU authorises the account-access-consent resource - the StatusCode of the account-access-consent resource will be updated with "AUTH".

The available StatusCode code-list enumerations for the account-access-consent resource are:

|  |StatusCode |Status Description |
| --- |--- |--- |
| 1 |RJCT |The account access consent has been rejected. |
| 2 |AWAU |The account access consent is awaiting authorisation. |
| 3 |AUTH |The account access consent has been successfully authorised. |
| 4| CANC | PSU has cancelled access given to the TPP using the ASPSPs access dashboard.  OR ASPSP has revoked the access token or the token has been suspended. |
| 5| EXPD | The consent has passed its expiry date. The ASPSP then marks the consent as ‘Expired’ | 

Changes to the StatusCode, such as being rejected, should be captured in `StatusReason`, an array of `StatusReasonCode`, `StatusReasonDescription` and `Path`.  

| Field | Description |
|---|---|
| StatusReasonCode | Specifies the status reason in a code form. For a full description see `ExternalStatusReason1Code` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets)  |
| StatusReasonDescription | Description of why the code was returned |
|Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path.  |


### DELETE /account-access-consents/{ConsentId}

If the PSU revokes consent to data access with the AISP, the AISP  **must**  delete the account-access-consent resource with the ASPSP as soon as is practically possible.

* This is done by making a call to DELETE the account-access-consent resource.
* Prior to calling the API, the AISP must have an access token issued by the ASPSP using a client credentials grant.

TPP should also clear the Account Access Consent resources, from ASPSP's system, which are:
* Expired, i.e. ExpirationDateTime is lapsed, or ExpirationDateTime is not lapsed, but PSU doesn't want to refresh/re-authenticate it, and
* Consent Resource may never be referenced by the PSU in AISP or ASPSP domain.

## Data Model

### Account Access Consents - Request

The OBReadConsent1 object will be used for the call to:

* POST /account-access-consents

#### UML Diagram

![ OBReadConsent1 ](./images/OBReadConsent1.svg )

#### Notes

* The fields in the OBReadConsent1 object are described in the Consent Elements section.
* No fields have been identified for the Risk section and it has been removed from v4 onwards.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |
| --- |--- |--- |--- |--- |--- |
| OBReadConsent1 | |OBReadConsent1 | |OBReadConsent1 | |
| Data |1..1 |OBReadConsent1/Data | |OBReadData1 | |
| Permissions |1..n |OBReadConsent1/Data/Permissions |Specifies the Open Banking account access data types. This is a list of the data clusters being consented by the PSU, and requested for authorisation with the ASPSP. |OBExternalPermissions1Code |ReadAccountsBasic, ReadAccountsDetail, ReadBalances, ReadBeneficiariesBasic, ReadBeneficiariesDetail, ReadDirectDebits, ReadOffers, ReadPAN, ReadParty, ReadPartyPSU, ReadProducts, ReadScheduledPaymentsBasic, ReadScheduledPaymentsDetail, ReadStandingOrdersBasic, ReadStandingOrdersDetail, ReadStatementsBasic, ReadStatementsDetail, ReadTransactionsBasic, ReadTransactionsCredits, ReadTransactionsDebits, ReadTransactionsDetail |
| ExpirationDateTime |0..1 |OBReadConsent1/Data/ExpirationDateTime |Specified date and time the permissions will expire. If this is not populated, the permissions will be open ended. |ISODateTime | |
| TransactionFromDateTime |0..1 |OBReadConsent1/Data/TransactionFromDateTime |Specified start date and time for the transaction query period. If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction. |ISODateTime | |
| TransactionToDateTime |0..1 |OBReadConsent1/Data/TransactionToDateTime |Specified end date and time for the transaction query period. If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction. |ISODateTime | |

### Account Access Consents - Response

The OBReadConsentResponse1 object will be used for the call to:

* GET /account-access-consents/{ConsentId}

And response to:

* POST /account-access-consents

#### UML Diagram

![ OBReadConsentResponse1 ](./images/OBReadConsentResponse1.svg )

#### Notes

* The OBReadConsentResponse1 object contains the same information as the OBReadConsent1, but with additional fields:
    * ConsentId - to uniquely identify the account-access-consent resource.
    * StatusCode.
    * StatusReason.
    * CreationDateTime.
    * StatusUpdateDateTime.
* No fields have been identified for the Risk section and it has been removed from v4 onwards.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |
| --- |--- |--- |--- |--- |--- |
| OBReadConsentResponse1 | |OBReadConsentResponse1 | |OBReadConsentResponse1 | |
| Data |1..1 |OBReadConsentResponse1/Data | |OBReadDataConsentResponse1 | |
| ConsentId |1..1 |OBReadConsentResponse1/Data/ConsentId |Unique identification as assigned to identify the account access consent resource. |Max128Text | |
| CreationDateTime |1..1 |OBReadConsentResponse1/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | |
| StatusCode |0..1 |OBReadConsentResponse1/Data/StatusCode |Specifies the status of consent resource in code form. For a full description see `OBExternalConsentProprietaryCode` [here](https://github.com/OpenBankingUK/External_internal_CodeSets). |OBExternalConsentProprietaryCode | |
| StatusReason |0..* |OBReadConsentResponse1/Data/StatusReason |Specifies the status reason. | OBStatusReason |
| StatusReasonCode |0..1 |OBReadConsentResponse1/Data/StatusReason/StatusReasonCode |Specifies the status reason in a code form. For a full description see `ExternalStatusReason1Code` [here](https://github.com/OpenBankingUK/External_internal_CodeSets). | ExternalStatusReason1Code |
| StatusReasonDescription |0..1 |OBReadConsentResponse1/Data/StatusReason/StatusReasonDescription |Description supporting the StatusReasonCode. |Max500Text | |
| Path |0..1 |OBReadConsentResponse1/Data/StatusReason/Path |Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path.  |Max500Text | |
| StatusUpdateDateTime |1..1 |OBReadConsentResponse1/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | |
| Permissions |1..n |OBReadConsentResponse1/Data/Permissions |Specifies the Open Banking account access data types. This is a list of the data clusters being consented by the PSU, and requested for authorisation with the ASPSP. |OBExternalPermissions1Code | |
| ExpirationDateTime |0..1 |OBReadConsentResponse1/Data/ExpirationDateTime |Specified date and time the permissions will expire. If this is not populated, the permissions will be open ended. |ISODateTime | |
| TransactionFromDateTime |0..1 |OBReadConsentResponse1/Data/TransactionFromDateTime |Specified start date and time for the transaction query period. If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction. |ISODateTime | |
| TransactionToDateTime |0..1 |OBReadConsentResponse1/Data/TransactionToDateTime |Specified end date and time for the transaction query period. If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction. |ISODateTime | |

## Usage Examples

### Setup Account Access Consent - All Permissions Granted

#### Post Account Access Consents Request

```
POST /account-access-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "Permissions": [
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadBeneficiariesDetail",
      "ReadDirectDebits",
      "ReadProducts",
      "ReadStandingOrdersDetail",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail",
      "ReadOffers",
      "ReadPAN",
      "ReadParty",
      "ReadPartyPSU",
      "ReadScheduledPaymentsDetail",
      "ReadStatementsDetail"
    ],
    "ExpirationDateTime": "2017-05-02T00:00:00+00:00",
    "TransactionFromDateTime": "2017-05-03T00:00:00+00:00",
    "TransactionToDateTime": "2017-12-03T00:00:00+00:00"
  }
}
```

#### Post Account Access Consents Response

```
HTTP/1.1 201 Created
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "urn-alphabank-intent-88379",
    "StatusCode": "AWAU",
    "StatusUpdateDateTime": "2017-05-02T00:00:00+00:00",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
    "StatusReason": {
      "StatusReasonCode": "U036", 
      "StatusReasonDescription":"Waiting for completion of consent authorisation to be completed by user",
    },
    "Permissions": [
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadBeneficiariesDetail",
      "ReadDirectDebits",
      "ReadProducts",
      "ReadStandingOrdersDetail",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail",
      "ReadOffers",
      "ReadPAN",
      "ReadParty",
      "ReadPartyPSU",
      "ReadScheduledPaymentsDetail",
      "ReadStatementsDetail"
    ],
    "ExpirationDateTime": "2017-08-02T00:00:00+00:00",
    "TransactionFromDateTime": "2017-05-03T00:00:00+00:00",
    "TransactionToDateTime": "2017-12-03T00:00:00+00:00"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/account-access-consents/urn-alphabank-intent-88379"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### StatusCode - AWAU

This is an example of a GET request which is made  **before**  the account access consent resource is authorised.

#### Get Account Access Consents Request

```
GET /account-access-consents/urn-alphabank-intent-88379 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Account Access Consents Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```
```json
{
  "Data": {
    "ConsentId": "urn-alphabank-intent-88379",
    "StatusCode": "AWAU",
   "StatusReason": {
      "StatusReasonCode": "U036", 
      "StatusReasonDescription":"Waiting for completion of consent authorisation to be completed by user",
    },
    "StatusReasonDescription":"Waiting for completion of consent authorisation to be completed by user",
    "StatusUpdateDateTime": "2017-05-02T00:00:00+00:00",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
    "Permissions": [
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadBeneficiariesDetail",
      "ReadDirectDebits",
      "ReadProducts",
      "ReadStandingOrdersDetail",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail",
      "ReadOffers",
      "ReadPAN",
      "ReadParty",
      "ReadPartyPSU",
      "ReadScheduledPaymentsDetail",
      "ReadStatementsDetail"
    ],
    "ExpirationDateTime": "2017-08-02T00:00:00+00:00",
    "TransactionFromDateTime": "2017-05-03T00:00:00+00:00",
    "TransactionToDateTime": "2017-12-03T00:00:00+00:00"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/account-access-consents/urn-alphabank-intent-88379"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### StatusCode - AUTH

This is an example of a GET request which is made  **after**  the account access consent resource is authorised.

#### Get Account Access Consents Request

```
GET /account-access-consents/urn-alphabank-intent-88379 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Account Access Consents Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```
```json
{
  "Data": {
    "ConsentId": "urn-alphabank-intent-88379",
    "StatusCode": "AUTH",
    "StatusReason": {
      "StatusReasonCode": "U038", 
      "StatusReasonDescription":"Consent has been completed successfully"
    },
    "StatusUpdateDateTime": "2017-05-02T00:05:00+00:00",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
    "Permissions": [
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadBeneficiariesDetail",
      "ReadDirectDebits",
      "ReadProducts",
      "ReadStandingOrdersDetail",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail",
      "ReadOffers",
      "ReadPAN",
      "ReadParty",
      "ReadPartyPSU",
      "ReadScheduledPaymentsDetail",
      "ReadStatementsDetail"
    ],
    "ExpirationDateTime": "2017-08-02T00:00:00+00:00",
    "TransactionFromDateTime": "2017-05-03T00:00:00+00:00",
    "TransactionToDateTime": "2017-12-03T00:00:00+00:00"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/account-access-consents/urn-alphabank-intent-88379"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### StatusCode - RJCT

This is an example of a GET request which is made  **after**  the account access consent resource has been rejected.

#### Get Account Access Consents Request

```
GET /account-access-consents/urn-alphabank-intent-88379 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Account Access Consents Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```
```json
{
  "Data": {
    "ConsentId": "urn-alphabank-intent-88379",
    "StatusCode": "REJT",
    "StatusReason": {
      "StatusReasonCode": "U038", 
      "StatusReasonDescription":"Data.LocalInstrument is invalid.  Expected ExternalLocalInstrument1Code value, received SEPE",
      "Path": "Data.LocalInstrument"
    },
    "StatusUpdateDateTime": "2017-05-02T00:05:00+00:00",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
    "Permissions": [
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadBeneficiariesDetail",
      "ReadDirectDebits",
      "ReadProducts",
      "ReadStandingOrdersDetail",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail",
      "ReadOffers",
      "ReadPAN",
      "ReadParty",
      "ReadPartyPSU",
      "ReadScheduledPaymentsDetail",
      "ReadStatementsDetail"
    ],
    "ExpirationDateTime": "2017-08-02T00:00:00+00:00",
    "TransactionFromDateTime": "2017-05-03T00:00:00+00:00",
    "TransactionToDateTime": "2017-12-03T00:00:00+00:00"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/account-access-consents/urn-alphabank-intent-88379"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### Delete Account Access Consent

The DELETE /account-access-consents call allows an AISP to delete a previously created account-access-consent (whether it is currently authorised or not). The PSU may want to remove their consent via the AISP instead of revoking authorisation with the ASPSP.

This API call allows the PSU to revoke consent with the AISP, and for that consent to be reflected in authorisation with the ASPSP.

#### Delete Account Access Consents Request

```
DELETE /account-access-consents/urn-alphabank-intent-88379 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
```

#### Delete Account Access Consents Response

```
HTTP/1.1 204 No Content
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
```

### Setup Account Access Consent with Limited Permissions

#### Post Account Access Consent Request

```
POST /account-access-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "Permissions": [
      "ReadAccountsBasic",
      "ReadBalances"
    ],
    "ExpirationDateTime": "2017-05-02T00:00:00+00:00",
    "TransactionFromDateTime": "2017-05-03T00:00:00+00:00",
    "TransactionToDateTime": "2017-12-03T00:00:00+00:00"
  }
}
```

#### Post Account Access Consent Response

```
HTTP/1.1 201 Created
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```
```json
{
  "Data": {
    "ConsentId": "urn-alphabank-intent-88379",
    "StatusCode": "AWAU",
    "StatusUpdateDateTime": "2017-05-02T00:00:00+00:00",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
    "StatusCode": "AWAU",
    "StatusReason": {
      "StatusReasonCode": "U036", 
      "StatusReasonDescription":"Waiting for completion of consent authorisation to be completed by user",
    },
    "Permissions": [
      "ReadAccountsBasic",
      "ReadBalances"
    ],
    "ExpirationDateTime": "2017-08-02T00:00:00+00:00",
    "TransactionFromDateTime": "2017-05-03T00:00:00+00:00",
    "TransactionToDateTime": "2017-12-03T00:00:00+00:00"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/account-access-consents/urn-alphabank-intent-88379"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```
