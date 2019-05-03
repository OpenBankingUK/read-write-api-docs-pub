
1. [Overview](#overview)
   1. [Profile Compatibility](#profile-ompatibility)
      1. [Account and Transaction API Profile](#account-aransaction-APIProfile)
2. [Endpoints](#Endpoints)
   1. [POST /account-access-consents](#POSTaccount-access-consents)
      1. [Account Access Consent Status](#Account-Access-ConsentStatus)
      2. [Status Flow](#Status-Flow)
   2. [GET /account-access-consents/{ConsentId}](#GET-account-access-consents-ConsentId)
      1. [Account Access Consent Status](#Account-Access-ConsentStatus1)
   3. [DELETE /account-access-consents/{ConsentId}](#DELETEaccount-accessconsents-ConsentId)
3. [Data Model](#DataModel)
3.1 [Account Access Consents - Request](#Account-Access-Consents-Request)
3.1.1 [UML Diagram](#UMLDiagram-Account-Access-ConsentsRequest)
3.1.2 [Data Dictionary](#DataDictionary-Account-Access-ConsentsRequest)
3.2 [Account Access Consents - Response](#Account-Access-ConsentsResponse1)
3.2.1 [UML Diagram](#UMLDiagram-Account-Access-ConsentsResponse1)
3.2.2 [Data Dictionary](#DataDictionary-Account-Access-ConsentsResponse1)
4. [Usage Examples](#UsageExamples)
4.1 [Setup Account Access Consent - All Permissions Granted](#SetupAccount-Access-Consent)
4.2 [Status - AwaitingAuthorisation](#StatusAwaiting-Authorisation)
4.3 [Status - Authorised](#StatusAuthorised)
4.4 [Delete Account Access Consent](#DeleteAccount-Access-Consent2)
4.5 [Setup Account Access Consent with Limited Permissions](#SetupAccount-Limited-Permissions)


## Overview
The Account Access Consents resource is used by an AISP to register an intent to retrieve account information to inform the ASPSP.

This resource description should be read in conjunction with a compatible Accounts and Transactions API Profile.

## Profile Compatibility
Account and Transaction API Profile
The Account Access Consents v3.1.2 resource is compatible with the following Account and Transaction API Profiles:
[Account and Transaction API Profile - v3.1.2 RC1][AccountTransactionAPIProfileV312RC1]

## Endpoints
| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Idempotency Key |Parameter |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| account-access-consents |POST |POST /account-access-consents |Mandatory |accounts |Client Credentials |No | |OBReadConsent1 |OBReadConsentResponse1 |
|account-access-consents  |GET |GET /account-access-consents/{ConsentId} |Mandatory |accounts |Client Credentials |No | | |OBReadConsentResponse1 |
|account-access-consents  |DELETE |DELETE /account-access-consents/{ConsentId} |Mandatory |accounts |Client Credentials |No | | | |

### POST /account-access-consents
The API allows the AISP to ask an ASPSP to create a new account-access-consent resource.
* This API effectively allows the AISP to send a copy of the consent to the ASPSP to authorise access to account and transaction information.
* An AISP is not able to pre-select a set of accounts for account-access-consent authorisation. This is because the behaviour of the pre-selected accounts, after authorisation, is not clear from a Legal perspective. 
* An ASPSP creates the account-access-consent resource and responds with a unique ConsentId to refer to the resource.
* Prior to calling the API, the AISP must have an access token issued by the ASPSP using a client credentials grant.

#### Account Access Consent Status
The PSU must authenticate with the ASPSP and authorise the account-access-consent for the account-access-consent to be successfully setup.
The account-access-consent resource that is created successfully must have the following Status code-list enumeration:

|  | Status |Status Description |
| -------- | -------- |-------------- |
| 1 | AwaitingAuthorisation |The account access consent is awaiting authorisation. |
After authorisation has taken place the account-access-consent resource may have these following statuses.

|  | Status |Status Description |
| -------- | -------- |-------------- |
| 1 | Rejected |The account access consent has been rejected.|
| 2 | Authorised |The account access consent has been successfully authorised.|
| 3 | Revoked |The account access consent has been revoked via the ASPSP interface.|
#### Status Flow
This is the state diagram for the Status.
![Status](images/PostAccountAccessConsetStatusFlow.png "Account Access Consent Status")

### GET /account-access-consents/{ConsentId}
An AISP may optionally retrieve an account-access-consent resource that they have created to check its status. 
Prior to calling the API, the AISP must have an access token issued by the ASPSP using a client credentials grant.
The usage of this API endpoint will be subject to an ASPSP's fair usage policies.
#### Account Access Consent Status
Once the PSU authorises the account-access-consent resource - the Status of the account-access-consent resource will be updated with "Authorised".
The available Status code-list enumerations for the account-access-consent resource are:

### DELETE /account-access-consents/{ConsentId}
If the PSU revokes consent to data access with the AISP, the AISP **must** delete the account-access-consent resource with the ASPSP before confirming consent revocation with the PSU.
* This is done by making a call to DELETE the account-access-consent resource.
* Prior to calling the API, the AISP must have an access token issued by the ASPSP using a client credentials grant.

## Data Model
### Account Access Consents - Request
The OBReadConsent1 object will be used for the call to:
* POST /account-access-consents

#### UML Diagram
![UML Diagram$](images/OBReadConsent1_DataModel.gif"UML Diagram")
Notes:
* The fields in the OBReadConsent1 object are described in the Consent Elements section.
* No fields have been identified for the Risk section.

#### Data Dictionary

### Account Access Consents - Response
The OBReadConsentResponse1 object will be used for the call to:
* GET /account-access-consents/{ConsentId}
And response to:
* POST /account-access-consents

#### UML Diagram
![UML Diagram$](images/OBReadConsentResponse1_DataModel.gif"UML Diagram")
Notes:
* The OBReadConsentResponse1 object contains the same information as the OBReadConsent1, but with additional fields:
    * ConsentId - to uniquely identify the account-access-consent resource.
    * Status.
    * CreationDateTime.
    * StatusUpdateDateTime.
* No fields have been identified for the Risk section.

#### Data Dictionary
TBC
## Usage Examples
### Setup Account Access Consent - All Permissions Granted
#### Request
```json

   [AccountTransactionAPIProfileV312RC1]: <https://openbanking.atlassian.net/wiki/spaces/OBT/pages/1052508498/Account+and+Transaction+API+Profile+-+v3.1.2+RC1>
