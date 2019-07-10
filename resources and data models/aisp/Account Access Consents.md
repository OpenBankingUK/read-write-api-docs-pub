# Account Access Consents - v3.1.2

1. [Overview](#overview)
2. [Endpoints](#endpoints)
   1. [POST /account-access-consents](#post-account-access-consents)
      1. [Account Access Consent Status](#account-access-consent-status)
      2. [Status Flow](#status-flow)
   2. [GET /account-access-consents/{ConsentId}](#get-account-access-consentsconsentid)
      1. [Account Access Consent Status](#account-access-consent-status-1)
   3. [DELETE /account-access-consents/{ConsentId}](#delete-account-access-consentsconsentid)
3. [Data Model](#data-model)
   1. [Account Access Consents - Request](#account-access-consents---request)
      1. [UML Diagram](#uml-diagram)
      2. [Notes](#notes)
      3. [Data Dictionary](#data-dictionary)
   2. [Account Access Consents - Response](#account-access-consents---response)
      1. [UML Diagram](#uml-diagram-1)
      2. [Notes](#notes-1)
      3. [Data Dictionary](#data-dictionary-1)
4. [Usage Examples](#usage-examples)
   1. [Setup Account Access Consent - All Permissions Granted](#setup-account-access-consent---all-permissions-granted)
      1. [Post Account Access Consents Request](#post-account-access-consents-request)
      2. [Post Account Access Consents Response](#post-account-access-consents-response)
   2. [Status - AwaitingAuthorisation](#status---awaitingauthorisation)
      1. [Get Account Access Consents Request](#get-account-access-consents-request)
      2. [Get Account Access Consents Response](#get-account-access-consents-response)
   3. [Status - Authorised](#status---authorised)
      1. [Get Account Access Consents Request](#get-account-access-consents-request-1)
      2. [Get Account Access Consents Response](#get-account-access-consents-response-1)
   4. [Delete Account Access Consent](#delete-account-access-consent)
      1. [Delete Account Access Consents Request](#delete-account-access-consents-request)
      2. [Delete Account Access Consents Response](#delete-account-access-consents-response)
   5. [Setup Account Access Consent with Limited Permissions](#setup-account-access-consent-with-limited-permissions)
      1. [Post Account Access Consent Request](#post-account-access-consent-request)
      2. [Post Account Access Consent Response](#post-account-access-consent-response)

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

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AwaitingAuthorisation |The account access consent is awaiting authorisation. |

After authorisation has taken place the account-access-consent resource may have these following statuses.

|  |Status |Status Description |
| --- |--- |--- |
| 1 |Rejected |The account access consent has been rejected. |
| 2 |Authorised |The account access consent has been successfully authorised. |
| 3 |Revoked |The account access consent has been revoked via the ASPSP interface. |

#### Status Flow

This is the state diagram for the Status.

![ Consent Authorisation.jpg ]( images/AccountAccessConsents/ConsentAuthorisation.jpg )

### GET /account-access-consents/{ConsentId}

An AISP may optionally retrieve an account-access-consent resource that they have created to check its status. 

Prior to calling the API, the AISP must have an access token issued by the ASPSP using a client credentials grant.

The usage of this API endpoint will be subject to an ASPSP's fair usage policies.

#### Account Access Consent Status

Once the PSU authorises the account-access-consent resource - the Status of the account-access-consent resource will be updated with "Authorised".

The available Status code-list enumerations for the account-access-consent resource are:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |Rejected |The account access consent has been rejected. |
| 2 |AwaitingAuthorisation |The account access consent is awaiting authorisation. |
| 3 |Authorised |The account access consent has been successfully authorised. |
| 4 |Revoked |The account access consent has been revoked via the ASPSP interface. |


### DELETE /account-access-consents/{ConsentId}

If the PSU revokes consent to data access with the AISP, the AISP  **must**  delete the account-access-consent resource with the ASPSP before confirming consent revocation with the PSU.

* This is done by making a call to DELETE the account-access-consent resource.
* Prior to calling the API, the AISP must have an access token issued by the ASPSP using a client credentials grant.

## Data Model

### Account Access Consents - Request

The OBReadConsent1 object will be used for the call to:

* POST /account-access-consents

#### UML Diagram

![ OBReadConsent1.gif ]( images/AccountAccessConsents/OBReadConsent1.gif )

#### Notes

* The fields in the OBReadConsent1 object are described in the Consent Elements section.
* No fields have been identified for the Risk section.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |
| --- |--- |--- |--- |--- |--- |
| OBReadConsent1 | |OBReadConsent1 | |OBReadConsent1 | |
| Data |1..1 |OBReadConsent1/Data | |OBReadData1 | |
| Permissions |1..n |OBReadConsent1/Data/Permissions |Specifies the Open Banking account access data types. This is a list of the data clusters being consented by the PSU, and requested for authorisation with the ASPSP. |OBExternalPermissions1Code |ReadAccountsBasic ReadAccountsDetail ReadBalances ReadBeneficiariesBasic ReadBeneficiariesDetail ReadDirectDebits ReadOffers ReadPAN ReadParty ReadPartyPSU ReadProducts ReadScheduledPaymentsBasic ReadScheduledPaymentsDetail ReadStandingOrdersBasic ReadStandingOrdersDetail ReadStatementsBasic ReadStatementsDetail ReadTransactionsBasic ReadTransactionsCredits ReadTransactionsDebits ReadTransactionsDetail |
| ExpirationDateTime |0..1 |OBReadConsent1/Data/ExpirationDateTime |Specified date and time the permissions will expire. If this is not populated, the permissions will be open ended. |ISODateTime | |
| TransactionFromDateTime |0..1 |OBReadConsent1/Data/TransactionFromDateTime |Specified start date and time for the transaction query period. If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction. |ISODateTime | |
| TransactionToDateTime |0..1 |OBReadConsent1/Data/TransactionToDateTime |Specified end date and time for the transaction query period. If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction. |ISODateTime | |
| Risk |1..1 |OBReadConsent1/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info. |OBRisk2 | |

### Account Access Consents - Response

The OBReadConsentResponse1 object will be used for the call to:

* GET /account-access-consents/{ConsentId}

And response to:

* POST /account-access-consents

#### UML Diagram

![ OBReadConsentResponse1.gif ]( images/AccountAccessConsents/OBReadConsentResponse1.gif )

#### Notes

* The OBReadConsentResponse1 object contains the same information as the OBReadConsent1, but with additional fields:
    * ConsentId - to uniquely identify the account-access-consent resource.
    * Status.
    * CreationDateTime.
    * StatusUpdateDateTime.
* No fields have been identified for the Risk section.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |
| --- |--- |--- |--- |--- |--- |
| OBReadConsentResponse1 | |OBReadConsentResponse1 | |OBReadConsentResponse1 | |
| Data |1..1 |OBReadConsentResponse1/Data | |OBReadDataConsentResponse1 | |
| ConsentId |1..1 |OBReadConsentResponse1/Data/ConsentId |Unique identification as assigned to identify the account access consent resource. |Max128Text | |
| CreationDateTime |1..1 |OBReadConsentResponse1/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | |
| Status |1..1 |OBReadConsentResponse1/Data/Status |Specifies the status of consent resource in code form. |OBExternalRequestStatus1Code |Authorised AwaitingAuthorisation Rejected Revoked |
| StatusUpdateDateTime |1..1 |OBReadConsentResponse1/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | |
| Permissions |1..n |OBReadConsentResponse1/Data/Permissions |Specifies the Open Banking account access data types. This is a list of the data clusters being consented by the PSU, and requested for authorisation with the ASPSP. |OBExternalPermissions1Code |ReadAccountsBasic ReadAccountsDetail ReadBalances ReadBeneficiariesBasic ReadBeneficiariesDetail ReadDirectDebits ReadOffers ReadPAN ReadParty ReadPartyPSU ReadProducts ReadScheduledPaymentsBasic ReadScheduledPaymentsDetail ReadStandingOrdersBasic ReadStandingOrdersDetail ReadStatementsBasic ReadStatementsDetail ReadTransactionsBasic ReadTransactionsCredits ReadTransactionsDebits ReadTransactionsDetail |
| ExpirationDateTime |0..1 |OBReadConsentResponse1/Data/ExpirationDateTime |Specified date and time the permissions will expire. If this is not populated, the permissions will be open ended. |ISODateTime | |
| TransactionFromDateTime |0..1 |OBReadConsentResponse1/Data/TransactionFromDateTime |Specified start date and time for the transaction query period. If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction. |ISODateTime | |
| TransactionToDateTime |0..1 |OBReadConsentResponse1/Data/TransactionToDateTime |Specified end date and time for the transaction query period. If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction. |ISODateTime | |
| Risk |1..1 |OBReadConsentResponse1/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info. |OBRisk2 | |

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
  },
  "Risk": {}
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
    "Status": "AwaitingAuthorisation",
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
  "Risk": {},
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/account-access-consents/urn-alphabank-intent-88379"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### Status - AwaitingAuthorisation

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
    "Status": "AwaitingAuthorisation",
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
  "Risk": {},
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/account-access-consents/urn-alphabank-intent-88379"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

### Status - Authorised

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
    "Status": "Authorised",
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
  "Risk": {},
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
  },
  "Risk": {}
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
    "Status": "AwaitingAuthorisation",
    "StatusUpdateDateTime": "2017-05-02T00:00:00+00:00",
    "CreationDateTime": "2017-05-02T00:00:00+00:00",
    "Permissions": [
      "ReadAccountsBasic",
      "ReadBalances"
    ],
    "ExpirationDateTime": "2017-08-02T00:00:00+00:00",
    "TransactionFromDateTime": "2017-05-03T00:00:00+00:00",
    "TransactionToDateTime": "2017-12-03T00:00:00+00:00"
  },
  "Risk": {},
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/account-access-consents/urn-alphabank-intent-88379"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```