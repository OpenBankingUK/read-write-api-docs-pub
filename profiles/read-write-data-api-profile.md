# Open Banking Read-Write API Profile  - v3.1.6 <!-- omit in toc -->

   1. [Overview](#overview)
      1. [Document Structure](#document-structure)
      2. [Design Principles](#design-principles)
         1. [RESTful APIs](#restful-apis)
         2. [Standards](#standards)
         3. [ISO 20022](#iso-20022)
         4. [Extensibility](#extensibility)
         5. [Idempotency](#idempotency)
         6. [Message Signing](#message-signing)
         7. [Message Encryption](#message-encryption)
         8. [Agnostic to Payment Schemes](#agnostic-to-payment-schemes)
         9. [Status Codes](#status-codes)
         10. [Unique Identifiers (Id Fields)](#unique-identifiers-id-fields)
         11. [Categorisation of Implementation Requirements](#categorisation-of-implementation-requirements)
            1. [Mandatory](#mandatory)
            2. [Conditional](#conditional)
            3. [Optional](#optional)
   2. [Basics](#basics)
      1. [Actors](#actors)
      2. [Character Encoding](#character-encoding)
      3. [Date Formats](#date-formats)
      4. [Resource URI Path Structure](#resource-uri-path-structure)
      5. [Headers](#headers)
         1. [Request Headers](#request-headers)
         2. [Response Headers](#response-headers)
      6. [HTTP Status Codes](#http-status-codes)
         1. [400 (Bad Request) v/s 404 (Not Found)](#400-bad-request-vs404not-found)
         2. [403 (Forbidden)](#403-forbidden)
         3. [401 (Unauthorized)](#401-unauthorized)
         4. [429 (Too Many Requests)](#429-too-many-requests)
      7. [Pre-Conditions](#pre-conditions)
         1. [Pre-conditions for TPPs](#pre-conditions-for-tpps)
         2. [Pre-conditions for ASPSPs](#pre-conditions-for-aspsps)
      8. [Idempotency](#idempotency-1)
      9. [Message Signing](#message-signing-1)
         1. [Overview](#overview-1)
         2. [Key Stores](#key-stores)
         3. [Specification](#specification)
         4. [Process for Signing a Payload](#process-for-signing-a-payload)
            1. [Step 1: Identify the Private Key and Corresponding Signing Certificate to be Used for Signing](#step-1-identify-the-private-key-and-corresponding-signing-certificate-to-be-used-for-signing)
            2. [Step 2: Form the JOSE Header](#step-2-form-the-jose-header)
            3. [Step 3: Compute the JWS](#step-3-compute-the-jws)
            4. [Step 4: Add the JWS as a HTTP Header](#step-4-add-the-jws-as-a-http-header)
         5. [Process for Verifying a Signature](#process-for-verifying-a-signature)
            1. [Step 1: Extract the components from the JWS](#step-1-extract-the-components-from-the-jws)
            2. [Step 2: Validate the JOSE Header and Certificate](#step-2-validate-the-jose-header-and-certificate)
            3. [Step 3: Verify the Signature](#step-3-verify-the-signature)
         6. [Sample JOSE Header](#sample-jose-header)
      10. [Message Encryption](#message-encryption-1)
         1. [Overview](#overview-2)
         2. [Message Signing and Encryption](#message-signing-and-encryption)
         3. [Key Stores](#key-stores-1)
         4. [Encrypting Non-JSON Data](#encrypting-non-json-data)
      11. [Filtering](#filtering)
      12. [Pagination](#pagination)
      13. [Archiving](#archiving)
      14. [Supplementary Data](#supplementary-data)
   3. [Security & Access Control](#security--access-control)
      1. [Scopes & Grant Types](#scopes--grant-types)
      2. [Length of Authorization Code, Access Token and Refresh Token](#length-of-authorization-code-access-token-and-refresh-token)
      3. [Consent Authorisation](#consent-authorisation)
         1. [Error Condition](#error-condition)
         2. [Token Expiry Time](#token-expiry-time)
         3. [Exemptions from Strong Customer Authentication](#exemptions-from-strong-customer-authentication)
      4. [Supported Grant Types](#supported-grant-types)
         1. [Grant Types for identifying the TPP](#grant-types-for-identifying-the-tpp)
            1. [Client Credentials Grant](#client-credentials-grant)
         2. [Grant Types for identifying the TPP and PSU](#grant-types-for-identifying-the-tpp-and-psu)
            1. [Authorization Code Grant & Hybrid Grant](#authorization-code-grant--hybrid-grant)
            2. [id_token_hint](#id_token_hint)
            3. [jwt_bearer](#jwt_bearer)
         3. [CIBA](#ciba)
            1. [Identifying the PSU](#identifying-the-psu)
               1. [Identifying the consent to be authorised](#identifying-the-consent-to-be-authorised)
               2. [Identifying the PSU Using a User Id](#identifying-the-psu-using-a-user-id)
               3. [Identifying the PSU Using an Ephemeral User Id](#identifying-the-psu-using-an-ephemeral-user-id)
               4. [Identifying the PSU Using an Intent Id](#identifying-the-psu-using-an-intent-id)
               5. [Identifying the PSU Using a Previously Issued Id Token](#identifying-the-psu-using-a-previously-issued-id-token)
      5. [Changes to an Intent's Authorized State](#changes-to-an-intents-authorized-state)
         1. [Effect of Token Expiry on an Intent's Authorized State](#effect-of-token-expiry-on-an-intents-authorized-state)
      6. [Consent Re-authentication](#consent-re-authentication)
         1. [Ability to re-authenticate an Authorised consent at any point of time](#ability-to-re-authenticate-an-authorised-consent-at-any-point-of-time)
         2. [Low Friction User Experience](#low-friction-user-experience)
         3. [Use of Refresh Token](#use-of-refresh-token)
         4. [Consent re-authentication through TPP](#consent-re--authentication-through-TPP)
   4. [Data Model](#data-model)
      1. [Enumerations](#enumerations)
      2. [Common Payload Structure](#common-payload-structure)
         1. [Request Structure](#request-structure)
            1. [Data](#data)
            2. [Risk](#risk)
         2. [Response Structure](#response-structure)
         3. [Error Response Structure](#error-response-structure)
            1. [UML Diagram](#uml-diagram)
            2. [Data Dictionary](#data-dictionary)
         4. [Optional Fields](#optional-fields)
         5. [Links](#links)
         6. [Meta](#meta)
   5. [Usage Examples](#usage-examples)
      1. [Pagination Flows](#pagination-flows)
         1. [Request](#request)
         2. [Paginated Resource Response](#paginated-resource-response)
         3. [Request Next Page of Results](#request-next-page-of-results)
         4. [Paginated Resource Response](#paginated-resource-response-1)
      2. [Error Flows](#error-flows)
         1. [Missing or Expired Access Token](#missing-or-expired-access-token)
         2. [Incomplete or Malformed Request Payload](#incomplete-or-malformed-request-payload)
         3. [Missing or Invalid Access Token Scope](#missing-or-invalid-access-token-scope)
         4. [Sudden Burst of API Requests](#sudden-burst-of-api-requests)
         5. [Failed Authorisation Consent](#failed-authorisation-consent)
         6. [JSON Error Response](#json-error-response)
            1. [Request](#request-1)
            2. [Response](#response)

## Overview

The Read/Write Data API Profile provides a description of the elements that are common across all the Read/Write Data APIs.

This profile should be used in conjunction with compatible functional profiles (such as Accounts and Transactions or Payments) and compatible resources.

### Document Structure

This document consists of the following parts:

* **Overview**: Provides an overview of the profile and the key decisions and principles.
* **Basics**: The section begins with an introduction to how the APIs are used.
* **Security & Access Control**: Specifies the means for TPPs and PSUs to authenticate themselves and provide consent.
* **Data Model**: Describes the data model for the API payloads.
* **Usage Examples**: Usage examples for Pagination and Error Flows.

### Design Principles

#### RESTful APIs

The API adheres to RESTful API concepts where possible and sensible to do so.

However, the priority is to have an API that is simple to understand and easy to use. In instances where following RESTful principles would be convoluted and complex, the principles have not been followed.

References:

* The highest level Data Description Language used is the JSON Schema : <http://json-schema.org/>
* Best Practice has also been taken from the Data Description Language for APIs; JSON API : <http://jsonapi.org/>
* The Interface Description Language used is the Swagger Specification version 2.0 (also known as Open API) : <http://swagger.io/> <https://github.com/OAI/OpenAPI-Specification>

#### Standards

The OBIE principles for developing API standards:

* OBIE will adopt existing standards where relevant/appropriate to minimise re-inventing the wheel.
* The Standards currently being reviewed include ISO20022 and FAPI.
* OBIE will favour developer/user experience over and above adoption of existing Standards, in order to create a more future proof Standard.
* OBIE will work with other relevant bodies to align with, contribute to and/or adopt other Standards work, especially relating to creation of Standards around APIs and JSON payloads.

#### ISO 20022

The CMA Order requires the CMA9 Banks to be aligned with the Regulatory and Technical Standards (RTS) under PSD2.

A previous draft of the EBA RTS required that the interface "shall use ISO 20022 elements, components or approved message definitions". In keeping with that requirement, the API payloads are designed using the ISO 20022 message elements and components where available.

The principles we have applied to re-use of ISO message elements and components are:

* Where relevant, the API payloads have been **flattened** so that they are more developer friendly. This has been a request from the developer community, and the stakeholders involved in the design workshop.
* Only elements that are required for the functioning of the API endpoint will be included in the API payload. API endpoints are defined for specific use-cases (not to be generically extensible for all use-cases).
* We will modify ISO 20022 elements where the existing standard does not cater for an API context (such as filtering, pagination etc.). An example is having latitude and longitude in decimal format, as this is how developers will work with latitude and longitude; or using simple types (e.g., a single date-time field) instead of a complex type (e.g., a choice field with a nesting of date and time).

#### Extensibility

It is intended that the API flows will be extended to cater for more complex use-cases in subsequent releases, and we have kept this in mind during the design.

#### Idempotency

Idempotency is difficult to implement consistently and leverage consistently.

As a result, idempotency is used sparingly in the Open Banking API specifications; with a preference to allow TPPs to simply re-submit a request under failure conditions.

APIs have been defined to be idempotent, where not doing so would cause a poor PSU user-experience or increase false positive risk indicators.

#### Message Signing

Digital signatures will facilitate non-repudiation for Open Banking APIs.

The approach for message signing is documented in [Basics / Message Signing](#message-signing-1).

The applicability of signatures to individual requests and responses is documented on the page for each of the resources. However, implementers of the standards can **optionally** add signatures to all response and request payloads.

#### Message Encryption

Message Encryption is an **optional** feature of the Open Banking APIs to facilitate additional protection of inflight data.

The approach for message encryption is documented in [Basics / Message Encryption](#message-encryption-1).

Applicability to individual requests and responses is not defined in the standards. Application will be based on agreement between implementors of the standards.

#### Agnostic to Payment Schemes

The API will be designed so that it is agnostic to the underlying payment scheme that is responsible for carrying out the payment.

As a result, we will not design field lengths and payloads to only match the Faster Payments message, and will instead rely on the field lengths and definitions in ISO 20022. Due diligence has been carried out to ensure that the API has the necessary fields to function with Bacs payments - as per the agreed scope.

We will provide further mapping guidance to ensure that differences are understood between the Open Banking Payment API standard, and FPS and Bacs schemes where applicable.

#### Status Codes

The API uses two status codes that serve two different purposes:

* The HTTP Status Code reflects the outcome of the API call (the HTTP operation on the resource). Granular Functional Error Codes are specified as part of API [Error Response Structure](#error-response-structure), after consultation with Security and Fraud Working Group.
* A Status field in some of the resource payloads reflects the status of resources.

#### Unique Identifiers (Id Fields)

A REST resource should have a unique identifier (e.g. a primary key) that may be used to identify the resource. These unique identifiers are used to construct URLs to identify and address specific resources.

However, considering that some of the resources described in these specifications do not have a primary key in the system of record, the Id field will be optional for some resources.

An ASPSP that chooses to populate optional Id fields must ensure that the values are unique and immutable.

#### Categorisation of Implementation Requirements

Where a requirement is being implemented by either an ASPSP and/or a TPP, a different categorisation is applied. The functionality, endpoints and fields within each resource are categorised as 'Mandatory', 'Conditional' or 'Optional'.

ASPSPs **must** make documentation available to TPPs (e.g. on their developer portals) to which 'Conditional' / 'Optional' endpoints and fields are implemented for any given implementation of the specification.

##### Mandatory

Functionality, endpoints and fields marked as Mandatory are required in all cases for regulatory compliance and/or for the API to function and deliver essential customer outcomes.

For functionalities and endpoints: 
* An ASPSP **must** implement an endpoint that is marked Mandatory.
* An ASPSP **must** implement functionality that is marked Mandatory.

For fields:

* A TPP **must** specify the value of a Mandatory field.
* An ASPSP **must** process a Mandatory field when provided by the TPP in an API request.
* An ASPSP **must** include meaningful values for Mandatory fields in an API response.

##### Conditional

Functionality, endpoints and fields marked as Conditional may be required in some cases for regulatory compliance (for example, if these are made available to the PSU in the ASPSP's existing Online Channel, or if ASPSPs (or a subset of ASPSPs) have been mandated by a regulatory requirement).

For functionalities and endpoints:

* An ASPSP **must** implement functionality and endpoints marked as Conditional if these are required for regulatory compliance.

For fields:

* All fields that are not marked as Mandatory are Conditional.
* A TPP **may** specify the value of a Conditional field.
* An ASPSP **must** process a Conditional field when provided by the TPP in an API request, and **must** respond with an error if it cannot support a particular value of a Conditional field.
* An ASPSP **must** include meaningful values for Conditional fields in an API response if these are required for regulatory compliance.

##### Optional

Functionality and endpoints marked as Optional are not necessarily required for regulatory compliance but may be implemented to enable desired customer outcomes.

For functionalities and endpoints:

* An ASPSP **may** implement an Optional endpoint.
* An ASPSP **may** implement Optional functionality.

For fields:

* There are no Optional fields.
* For any endpoints which are implemented by an ASPSP, the fields are either Mandatory or Conditional.

## Basics

### Actors

| Actor                                         | Abbreviation | Type         | Specialises | Description                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------- | ------------ | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Payment Service User**                          | PSU          | Person       | N/A         | A natural or legal person making use of a payment service as a payee, payer or both (PSD2 Article 4(10)).                                                                                                                                                                                                                                                                                                                 |
| **Payment Service Provider**                      | PSP          | Legal Entity | N/A         | A legal entity (and some natural persons) that provide payment services as defined by PSD2 Article 4(11).                                                                                                                                                                                                                                                                                                                 |
| **Account Servicing Payment Service Provider**    | ASPSP        | Legal Entity | PSP         | An ASPSP is a PSP that provides and maintains a payment account for a payment services user (PSD 2 Article 4(15).<br><br>The CMA 9 are all ASPSPs.                                                                                                                                                                                                                                                                            |
| **Third Party Providers / Trusted Third Parties** | TPP          | Legal Entity | PSP         | A party other than an ASPSP that provides payment related services.<br><br>The term is not actually defined in PSD2, but is generally deemed to include all payment service providers that are 3rd parties (the ASPSP and the PSU to whom the account belongs being the first two parties).<br><br>References to a "TPP" in the specification relate to a piece of registered software with an ASPSP (with a specific client_id). |
| **Payment Initiation Service Provider**           | PISP         | Legal Entity | TPP         | A TPP that provides Payment Initiation Services.<br><br>PSD2 does not offer a formal definition. Article 4(18) quite circularly defines a PISP as a PSP that provides Payment Initiation Services.                                                                                                                                                                                                                            |
| **Account Information Service Provider**          | AISP         | Legal Entity | TPP         | A TPP that provides Account Information Services.<br><br>Again, PSD2 defines AISPs in Article 4(19) circularly as a PSP that provides account information services                                                                                                                                                                                                                                                            |
| **Card Based Payment Instrument Issuer**          | CBPII        | Legal Entity | TPP         | A TPP that issues card based payment instruments to PSUs and requires access to the Confirmation of Funds API.                                                                                                                                                                                                                                                                                                            |

### Character Encoding

The API requests and responses **must** use a UTF-8 character encoding. This is the default character encoding for JSON (RFC 7158 - [Section 8.1](https://tools.ietf.org/html/rfc7158#section-8.1))

However, an ASPSP's downstream system may not accept some UTF-8 characters, such as emoji characters (e.g. "Happy Birthday 🎂🎂!" may not be an acceptable Payment Reference). If the ASPSP rejects the message with a UTF-8 character that cannot be processed, the ASPSP **must** respond with an HTTP 400 (Bad Request) status code.

### Date Formats

An ASPSP must accept all valid [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) date formats including its permitted variations (e.g. variations in how the timezone is defined, dates with or with a seconds or milliseconds part etc.) in the requests.

All dates in the JSON payloads are represented in [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) date-time format. All date-time fields in responses **must** include the timezone. For Example:

```
2017-04-05T10:43:07+00:00
2018-07-03T14:43:41Z
```

All dates in the query string are represented in [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) date-time format and **must not** include the timezone. For example:

```
2017-04-05T10:43:07
2017-04-05
```

All dates in the HTTP headers are represented as [RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.1.1.1) Full Dates. An example is below:

```
Sun, 10 Sep 2017 19:43:31 GMT
```

All dates in the JWT claims are expressed as a JSON number, representing the number of seconds from 1970-01-01T0:0:0Z as measured in GMT until the date/time.

```
//Sun, 12 Feb 2018 14:45:00 GMT
1518446700
```

### Resource URI Path Structure

The path of the URI must follow the structure below (from the OB API Release Management document).

* [participant-path-prefix]/open-banking/[version]/[resource-group]/[resource]/[resource-id]/[sub-resource]

This consists of the following elements:
* [participant-path-prefix]<br>An optional ASPSP specific path prefix.
* open-banking<br>The constant string "open-banking".
* [version]<br>The version of the APIs expressed as /v[major-version].[minor-version]/.
* [resource-group]<br>The resource-group identifies the group of endpoints, according to the PSD2 role used to access the API (as "aisp", "pisp" or "cbpii").
* [resource]/[resource-id]<br>Details the resource.
* [sub-resource]<br>Details the sub-resource.

An ASPSP must use the same participant-path-prefix and host name for all its resources.

Examples:

* <https://superbank.com/apis/open-banking/v3.1/pisp/domestic-payments>
* <https://superbank.com/apis/open-banking/v3.1/aisp/account-access-consents>
* <https://superbank.com/apis/open-banking/v3.1/aisp/accounts>
* <https://superbank.com/apis/open-banking/v3.1/aisp/accounts/1234>
* <https://superbank.com/apis/open-banking/v3.1/aisp/accounts/1234/transactions>
* <https://superbank.com/apis/open-banking/v3.1/cbpii/funds-confirmation-consents>

For brevity, the APIs are referred to by their resource names in these documents and in all examples.

### Headers

#### Request Headers

|Header Value              |Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |POST Requests|GET Requests|DELETE Requests|PUT Requests|
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|------------|---------------|------------|
|x-fapi-auth-date          |The time when the PSU last logged in with the TPP.  The value is supplied as a HTTP-date as in section 7.1.1.1 of [RFC7231], e.g., `x-fapi-auth-date: Tue, 11 Sep 2012 19:43:31 GMT`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |Optional     |Optional    |Optional       |Do not use  |
|x-fapi-customer-ip-address|The PSU's IP address if the PSU is currently logged in with the TPP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |Optional     |Optional    |Optional       |Do not use  |
|x-fapi-interaction-id     |An RFC4122 UID used as a correlation Id.<br><br>If provided, the ASPSP **must** "play back" this value in the x-fapi-interaction-id response header.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |Optional     |Optional    |Optional       |Optional    |
|Authorization             |Standard HTTP Header; Allows Credentials to be provided to the Authorisation / Resource Server depending on the type of resource being requested. For OAuth 2.0 / OIDC, this comprises of either the Basic / Bearer Authentication Schemes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |Mandatory    |Mandatory   |Mandatory      |Mandatory   |
|Content-Type              |Standard HTTP Header; Represents the format of the payload being provided in the request.<br><br>This **must** be set to `application/json`, except for the endpoints that support Content-Type other than `application/json` (e.g POST /file-payment-consents/{ConsentId}/file), the ASPSP must specify the available options on their developer portals.<br><br>This **must** be set to `application/jose+jwe` for encrypted requests.<br><br>The TPP **may** provide additional information (e.g. a 'q' value and charset).<br><br>If set to any other value, the ASPSP **must** respond with a 415 Unsupported Media Type.                                                                                                                                                                                                                                                                                                                                  |Mandatory    |Do not use  |Do not use     |Mandatory   |
|Accept                    |Standard HTTP Header; Determine the Content-Type that is required from the Server.<br><br>If the TPP expects an unencrypted response, it **must** indicate that the only a JSON response is accepted (e.g by setting the value to `application/json`) as a content header for all endpoints that respond with JSON.<br><br>If the TPP expects an encrypted response, it **must** indicate that the only a JWT response is accepted (e.g by setting the value to `application/jose+jwe`) as a content header for all endpoints that respond with JSON.<br><br>For endpoints that do not respond with JSON (e.g GET ../statements/{StatementId}/file), the ASPSP must specify the available options on their developer portals.<br><br>The TPP **may** provide additional information (e.g. a 'q' value and charset).<br><br>If set to an unacceptable value the ASPSP **must** respond with a 406 (Not Acceptable).<br><br>If not specified, the default is application/json.|Optional     |Optional    |Do not use     |Optional    |
|x-idempotency-key         |Custom HTTP Header; Unique request identifier to support idempotency.<br><br>Mandatory for POST requests to idempotent resource end-points.<br><br>Must not be specified for other requests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |Optional     |Do not use  |Do not use     |Do not use  |
|x-jws-signature           |Header containing a detached JWS signature of the body of the payload.<br><br>Refer to resource specific documentation on when this header must be specified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |API specific |API specific|API specific   |Mandatory   |
|x-customer-user-agent     |The header indicates the user-agent that the PSU is using.<br><br>The TPP **may** populate this field with the user-agent indicated by the PSU.<br><br>If the PSU is using a TPP mobile app, the TPP **must** ensure that the user-agent string is different from browser based user-agent strings.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |Optional     |Optional    |Optional       |Optional    |


Whether the PSU is present or not-present is identified via the x-fapi-customer-ip-address header. If the PSU IP address is supplied, it is inferred that the PSU is present during the interaction.

The implications to this are:

* ASPSPs will need to rely on the AISPs assertion.
* As agreed at TDA (18/05), it will be up to the ASPSPs to interpret the 4-times customer not present rule, to be within the “spirit” of the RTS requirement.
* This is dependent on GDPR considerations on the AISP passing a PSU's IP address to an ASPSP.

#### Response Headers

|Header Value              |Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |Mandatory?  |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
|Content-Type              |Standard HTTP Header; Represents the format of the payload returned in the response.<br><br>The ASPSP **must** return `Content-Type: application/json`  as a content header for all unencrypted endpoints, except the GET ../statements/{StatementId}/file and ../file-payment-consents/{ConsentId}/file endpoints, where it is up to the ASPSP to specify available options.<br><br>The ASPSP **must** return `Content-type: application/jwe` for all encrypted end-points.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |Mandatory   |
|x-jws-signature           |Header containing a detached JWS signature of the body of the payload.<br><br>Refer to resource specific documentation on when this header **must** be returned. Where a signed response is indicated in the documentation this header **should** be returned for error responses where a response body is returned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |API specific|
|x-fapi-interaction-id     |An RFC4122 UID used as a correlation Id.<br><br>The ASPSP **must** set the response header `x-fapi-interaction-id` to the value received from the corresponding fapi client request header or to a [RFC4122](https://tools.ietf.org/html/rfc4122) UUID value if the request header was not provided to track the interaction. The header **must** be returned for both successful and error responses.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |Mandatory   |
|Retry-After               |Header indicating the time (in seconds) that the TPP should wait before retrying an operation.<br><br>The ASPSP **should** include this header along with responses with the HTTP status code of 429 (Too Many Requests).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |Optional    |


### HTTP Status Codes

The following are the HTTP response codes for the different HTTP methods, across all Read/Write API endpoints.

|Situation                 |HTTP Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |Notes       |Returned by POST|Returned by GET|Returned by DELETE|Returned by PUT|
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|----------------|---------------|------------------|---------------|
|Request completed successfully|200 OK                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |PUT will be specified to return the updated resource. A 200 status code is therefore appropriate.|No              |Yes            |No                |Yes            |
|Normal execution. The request has succeeded.|201 Created                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |The operation results in the creation of a new resource.|Yes             |No             |No                |No             |
|Delete operation completed successfully|204 No Content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |            |No              |No             |Yes               |No             |
|Request has malformed, missing or non-compliant JSON body, URL parameters or header fields.|400 Bad Request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |The requested operation will not be carried out.|Yes             |Yes            |Yes               |Yes            |
|Authorization header missing or invalid token|401 Unauthorized                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |The operation was refused access.<br><br>Re-authenticating the PSU may result in an appropriate token that may be used.|Yes             |Yes            |Yes               |Yes            |
|Token has incorrect scope or a security policy was violated.|403 Forbidden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |The operation was refused access.<br><br>Re-authenticating the PSU may result in an appropriate token that may be used.|Yes             |Yes            |Yes               |Yes            |
|The TPP tried to access the resource with a method that is not supported.|405 Method Not Allowed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |            |Yes             |Yes            |Yes               |Yes            |
|The request contained an Accept header other than permitted media types and a character set other than UTF-8|406 Not Acceptable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |            |Yes             |Yes            |Yes               |Yes            |
|The operation was refused because the payload is in a format not supported by this method on the target resource.|415 Unsupported Media Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |            |Yes             |No             |No                |Yes            |
|The operation was refused as too many requests have been made within a certain timeframe.|429 Too Many Requests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |ASPSPs **may** throttle requests when they are made in excess of their fair usage policy.<br><br>ASPSPs **must** document their fair usage policies in their developer portals.<br><br>The ASPSP **must** respond with this status if it throttles the request.<br><br>The ASPSP **should** include a Retry-After header in the response indicating how long the TPP must wait before retrying the operation.|Yes             |Yes            |Yes               |Yes            |
|Something went wrong on the API gateway or micro-service|500 Internal Server Error                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |The operation failed.|Yes             |Yes            |Yes               |Yes            |
|Service version deprecation|503 Service Unavailable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |Where an API is deprecated and no longer operationally supported by an ASPSP, its URI path may still be active and accept API requests. In this context it is recommended that a 503 Service Unavailable be returned so that the TPP is aware of the API version being offline.|Yes             |Yes            |Yes               |Yes            |


An ASPSP **MAY** return other standard HTTP status codes (e.g. from gateways and other edge devices) as described in [RFC 7231 - Section 6](https://tools.ietf.org/html/rfc7231#section-6).

ASPSPs **must** respond with error response in the OAuth/OIDC flow with mandatory alignment of the error codes to those specified in OpenID Connect Core Specification [Section 3.1.2.6](https://openid.net/specs/openid-connect-core-1_0.html#AuthError).

ASPSPs **must** respond with Open Banking [Error Response Structure](#error-response-structure) for all errors during API Calls.

#### 400 (Bad Request) v/s 404 (Not Found)

When a TPP tries to request a resource URL with a resource Id that does not exist, the ASPSP **must** respond with a 400 (Bad Request) rather than a 404 (Not Found).

e.g., if a TPP tries to GET /domestic-payments/22289 where 22289 is not a valid DomesticPaymentId, the ASPSP must respond with a 400.

When a TPP tries to request a resource URL that results in no business data being returned (e.g. a request to retrieve standing order on an account that does not have standing orders) the ASPSP **must** respond with a 200 (OK) and set the array to be empty.

If the TPP tries to access a URL for a resource that is not defined by these specifications (e.g. GET /card-accounts), the ASPSP **may** choose to respond with a 404 (Not Found).

If an ASPSP has not implemented an API endpoint, it **must** respond with a 404 (Not Found) for requests to that URL.

The table below illustrates some examples of expected behaviour:

|Situation                 |Request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |Response    |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
|A TPP attempts to retrieve a payment with a DomesticPaymentId that does not exist|GET /domestic-payments/1001                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |400 (Bad Request)|
|A TPP attempts to retrieve a resource that is not defined|GET /bulk                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |404 (Not Found)|
|A TPP attempts to retrieve a resource that is in the specification, but not implemented by the ASPSP. e.g., an ASPSP has chosen not to implement the status API endpoint for domestic-scheduled-payments|GET /domestic-scheduled-payments/1002                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |404 (Not Found)|
|A TPP attempts to retrieve standing orders for an AccountId that exists, but does not have any standing orders|GET /accounts/1000/standing-orders                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |<pre>200 OK<br>{<br> "Data": {<br>     "StandingOrder": []<br>   },<br>   "Links": {<br>     "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/1000/standing-orders/"<br>   },<br>   "Meta": {<br>     "TotalPages": 1<br>   }<br>}</pre>|


#### 403 (Forbidden)

When a TPP tries to access a resource that it does not have permission to access, the ASPSP **must** return a 403 (Forbidden) with an optional body with Error Response.

The situation could arise when:

* The TPP uses an access token that does not have the appropriate scope to access the requested resource.
* The TPP attempted to access a resource with an Id that it does not have access to. e.g., an attempt to access GET /domestic-payments/1001 where a payment resource with Id 1001 belongs to another TPP.
* The TPP tries to access an account/transaction resource and the TPP does not have a consent authorisation with the right Permissions to access the requested resource. e.g., an attempt to access GET /standing-orders when the ReadStandingOrdersBasic permission was not included in the consent authorisation.
* The TPP tries to access an account/transaction resource and the TPP does not have a consent authorisation for the AccountId. e.g., an attempt to access GET /accounts/2001 or GET /accounts/2001/transactions when the PSU has not selected AccountId 2001 for authorisation.
* The TPP attempts to access a Resource and the ASPSP decides to re-authenticate the PSU. The ASPSP must respond back with an appropriate error code to indicate re-authentication is required.

#### 401 (Unauthorized)

When the TPP uses an expired access token, the ASPSP **must** return a 401 (Unauthorized) **without** any error response.

The situation could arise when an ASPSP has chosen to expire an Access Token for any of the following reasons:

1. The consent has expired (the Expiration Date Time has lapsed)
2. Suspicious usage of the Access Token or suspected fraud
3. Implementation of 90 Day SCA

This error can potentially be remedied by asking the PSU to re-authenticate or authenticate with the right permissions.

#### 429 (Too Many Requests)

When a TPP tries to access a resource too frequently the ASPSP **may** return a 429 (Too Many Requests).  This is a non functional requirement and is down to individual ASPSPs to decide throttling limits. 

This situation could arise when:

* A TPP decides to implement "Real Time Payment Status" functionality for its users and implements this badly by polling a GET endpoint or an Idempotent POST endpoint in excess of the ASPSP's fair usage policy to provide pseudo "real-time" Status updates to the user.
* A TPP decides to use the Single Immediate Payment endpoint as if it were a batch payment facility and sends a large number of payment requests in a very short space of time such that it exceeds the ASPSP's fair usage policy. 

### Pre-Conditions

The following pre-conditions must be satisfied in order to use these APIs:

#### Pre-conditions for TPPs

1. The TPP must have completed onboarding on the Open Banking Directory.
2. The TPP must have registered one or more software statements with the Open Banking Directory.
   * To use the Payment Initiation APIs, the software statement must have "payments" as one of the permitted scopes.
   * To use the Account/Transaction APIs, the software statement must have "accounts" as one of the permitted scopes.
   * To use the Confirmation of Funds APIs, the software statement must have "fundsconfirmations" as one of the permitted scopes.
3. The TPP must have valid network and signing certificates issued by Open Banking.
4. The TPP must have completed registration with each of the ASPSPs that it wants to transact with and have been issued with a client-id.

#### Pre-conditions for ASPSPs

1. The ASPSP must have completed onboarding on the Open Banking Directory.
2. The ASPSP must have valid network and signing certificates issued by Open Banking.

### Idempotency

An idempotency key is used to guard against the creation of duplicate resources when using the **POST** API endpoints (where indicated). 

If an idempotency key is required for an API endpoint:

* The x-idempotency-key provided in the header **must** be at most 40 characters in size. If a larger x-idempotency-key length is provided, the ASPSP **must** reject the request with a status code is 400 (Bad Request).
* The TPP **must not** change the request body while using the same x-idempotency-key. If the TPP changes the request body, the ASPSP **must not** modify the end resource. The ASPSP **may** treat this as a fraudulent action.
* The ASPSP **must** treat a request as idempotent if it had received the first request with the same x-idempotency-key from the same TPP in the **preceding 24 hours**. 
* The ASPSP **must not** create a new resource for a POST request if it is determined to be an idempotent request.
* The ASPSP **must** respond to the request with the current status of the resource (or a status which is at least as current as what is available on existing online channels) and a HTTP status code of 201 (Created).
* The TPP **must not** use the idempotent behaviour to poll the status of resources.
* The ASPSP **may** use the message signature, along with the x-idempotency-key to ensure that the request body has not changed.

If an idempotency key is not required for an API endpoint:

* The ASPSP **must** ignore the idempotency key if provided.

### Message Signing

#### Overview

This section provides an overview of how message signing is implemented for the Open Banking Read/Write APIs.

The APIs require TLS 1.2 Mutual Authentication and this may be used as a means of non-repudiation. However, it would be difficult to maintain digital records and evidence of non-repudiation if the API only relied on TLS 1.2.

A solution for non-repudiation that does not rely on TLS, would be achieved by providing a JWS with detached content (as defined in [RFC 7515 - Appendix F](https://tools.ietf.org/html/rfc7515)) in the HTTP header of each API request.

The HTTP body would form an un-encoded payload as defined in [RFC 7797](https://tools.ietf.org/html/rfc7797).

The JWS would be signed using an algorithm that supports asymmetric keys.

A request would be signed by a TPP's private key and a response would be signed by the ASPSP's private key.

Not all API requests and responses are signed. Whether message signing is mandatory, supported or not supported is documented along with each API.

#### Key Stores

A Trust Anchor that is trusted by the ASPSPs and TPPs is responsible for providing a store of public keys for each of the parties. 

The Trust Anchor could be a centralised directory (such as the Open Banking Directory) that hosts the public part of a key pair generated any of the parties.

Alternatively the Trust Anchor could be a CA (or a set of CAs) that provide digital certificates (such as a QTSP providing eIDAS certificates)

The Trust Anchor must provide a means for any of the parties to retrieve public keys to verify messages.

#### Specification

The TPP **must** sign the HTTP body of each API request that requires message signing.

The ASPSP **must** sign the HTTP body of each API response that requires message signing.

The ASPSP **should** verify the signature of API requests that it receives before carrying out the request. If the signature fails validation, the ASPSP **must** respond with a 400 (Bad Request).

The ASPSP **must** reject any API requests that should be signed but do not contain a signature in the HTTP header with a 400 (Bad Request) error.

The TPP **should** verify the signature of API responses that it receives.

The signer **must** sign the message with PS256.

#### Process for Signing a Payload

##### Step 1: Identify the Private Key and Corresponding Signing Certificate to be Used for Signing

The signer **must** use a private key that has a corresponding public key that is lodged with the Trust Anchor.

The signing key **must** be valid at the time of creating the JWS.

##### Step 2: Form the JOSE Header

The JOSE header for the signature must contain the following fields

| Claim                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alg`                           | The algorithm that will be used for signing the JWS.<br><br>The list of valid algorithms is here https://tools.ietf.org/html/rfc7518#section-3.1.<br><br>This value must be `PS256`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typ`                           | This is an optional claim.<br><br>If it is specified, it must be set to the value `JOSE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `cty`                           | This is an optional claim for JSON payloads<br><br>If it is specified, it must be set to the value `json` or `application/json` for json payloads.<br><br>For non-json payloads (e.g. for PDF files), the mime type of the payload must be specified in this claim.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `kid`                           | This is a mandatory claim.<br><br>It must match a value that can be used to look up the key in a key store hosted by the Trust Anchor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `http://openbanking.org.uk/iat` | This **must** be a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in GMT until the date/time. <br><br>This is a private header parameter name. (See [RFC 7515 - Private Header Parameter Names](https://tools.ietf.org/html/rfc7515#section-4.3))                                                                                                                                                                                                                                                                                                                                                                                 |
| `http://openbanking.org.uk/iss` | This **must** be a string that identifies the PSP.<br><br>If the issuer is using a certificate this value **must** match the **subject** of the signing certificate.<br><br>If the issuer is using a signing key lodged with a Trust Anchor, the value is defined by the Trust Anchor and should uniquely identify the PSP.<br><br>For example, when using the Open Banking Directory, the value must be:<br><br><ul><li>When issued by a TPP, of the form <code v-pre>{{org-id}}/{{software-statement-id}}</code>,</li><li>When issued by an ASPSP of the form <code v-pre>{{org-id}}</code></li></ul><br><br>Where:<ul><li>org-id is the open-banking issued organization id</li><li>software-statement-id is the open-banking issued software-statement-id </li></ul>|
| `http://openbanking.org.uk/tan` | This **must** be a string that consists of a domain name that is registered to and identifies the Trust Anchor that hosts the public counter-part of the key used for signing.<br><br>For example, when using the Open Banking Directory, the value must be `openbanking.org.uk`                                                                                                                                                                                                                                                                                                                                                                                     |
| `crit`                          | This **must** be a string array consisting of the values `http://openbanking.org.uk/iat`, `http://openbanking.org.uk/iss`, `http://openbanking.org.uk/tan`<br><br>This indicates that the JWS signature validator must understand and process the three additional claims.                                                                                                                                                                                                                                                                                                                                                                                    |

##### Step 3: Compute the JWS

The signer must compute the signature as a detached JWS as defined in [RFC 7515, Appendix F](https://tools.ietf.org/html/rfc7515)

> "One way to do this is to create a JWS
   in the normal fashion using a representation of the content as the
   payload but then delete the payload representation from the JWS and
   send this modified object to the recipient rather than the JWS."
   <br>...<br>
   Note that this method needs no support from JWS libraries, as
   applications can use this method by modifying the inputs and outputs
   of standard JWS libraries.   

##### Step 4: Add the JWS as a HTTP Header 

The signer **must** include an HTTP header called **x-jws-signature** with its value set to the signature computed in Step 3.

```
x-jws-signature: V2hhdCBoYXRoIGdvZCB3cm91Z2h0ID8=..QnkgR2VvcmdlLCBzaGUncyBnb3QgaXQhIEJ5IEdlb3JnZSBzaGUncyBnb3QgaXQhIE5vdyBvbmNlIGFnYWluLCB3aGVyZSBkb2VzIGl0IHJhaW4/
```

#### Process for Verifying a Signature

##### Step 1: Extract the components from the JWS

The verifier **must** extract and decode the JOSE header and signature from the JWS provided in the x-jws-signature.

##### Step 2: Validate the JOSE Header and Certificate

The verifier **must** validate the JOSE header to ensure that it is a valid JSON object with only the claims specified in [Process for Signing a Payload](#process-for-signing-a-payload) - Step 2.

The verifier **must** validate that the `typ` header if specified has the value JOSE.

The verifier **must** validate that the `cty` header to ensure that the payload is of the expected mime type.

The verifier **must** ensure that the specified `alg` is one of the algorithms specified by OBIE.

The verifier **must** ensure that the specified `kid` is valid and a public key with the specified key Id can be retrieved from the Trust Anchor.

The verifier **must** ensure that the `http://openbanking.org.uk/iat` claim has a date-time value set in the past.

The verifier **must** ensure that PSP bound to the `http://openbanking.org.uk/iss` claim matches the expected PSP.

The verifier **must** ensure that `http://openbanking.org.uk/tan` claim contains the DNS name of a Trust Anchor that it trusts.

The verifier **must** ensure that the `crit` claim does not contain additional critical elements.

##### Step 3: Verify the Signature

The verifier must verify the signature, as defined in [RFC 7515, Appendix F](https://tools.ietf.org/html/rfc7515#appendix-F).

>To use the modified object, the recipient
   reconstructs the JWS by re-inserting the payload representation into
   the modified object and uses the resulting JWS in the usual manner.
   Note that this method needs no support from JWS libraries, as
   applications can use this method by modifying the inputs and outputs
   of standard JWS libraries.

#### Sample JOSE Header

```json
{
    "alg": "RS512",
    "kid": "90210ABAD",
    "http://openbanking.org.uk/iat": 1501497671,
    "http://openbanking.org.uk/iss": "C=UK, ST=England, L=London, O=Acme Ltd.",
    "http://openbanking.org.uk/tan": "openbanking.org.uk",
    "crit": [ "http://openbanking.org.uk/iat", "http://openbanking.org.uk/iss", "http://openbanking.org.uk/tan"]
}
```

### Message Encryption

#### Overview

This section provides an overview of how message encryption is implemented for the Open Banking Read/Write APIs.

Message encryption is implemented through [JSON Web Encryption](https://tools.ietf.org/html/rfc7516) (JWE).

The approach differs from message signing in that:

* The entire request or response payload is delivered in the form of an encrypted JWT.
* The definition of a given request or response in the Swagger specification represents the decrypted payload.
* The JWE will not be represented in its encrypted form in the Swagger specifications.
* Sending or expecting to receive an encrypted payload is denoted by setting the `Accept` or `Content-type` header to `application/jose+jwe`.

Message encryption is optional for ASPSPs to implement. If an ASPSP does not support should reject any requests with a `Content-type` or `Accept` headers that indicate that message encryption is required.

#### Message Signing and Encryption

Where message signing and encryption is required the convention is for a JWE to be encapsulated in a JWS.

Where message signing and encryption is required by implementors they should continue to use the detached signature method described above for consistency with the standards.

The use of the type `application/jose+jwe` header indicates the JWT is encrypted and not signed.

The exception to this approach is the Event Notification API, which uses a native JWS. The native JWS should continue to be used and encapsulate the JWE.

#### Key Stores

A Trust Anchor that is trusted by the ASPSPs and TPPs is responsible for providing a store of public keys for each of the parties.

The Trust Anchor could be a centralised directory (such as the Open Banking Directory) that hosts the public part of a key pair generated by any of the parties. Alternatively implementors can self-host key stores containing their public keys and publicise their location through appropriate means.

The Trust Anchor must provide a means for any of the parties to retrieve public keys to encrypt messages.

Message encryption is predicated on the sender encrypting the payload using the public part of a key matched by a private key held by the recipient. Both the sender and recipient must know which key they should use to encrypt and decrypt the message.

In order to provide a simple implementation of communicating key usage the following guidelines are provided:

* JSON Web Key Sets (JWKS) should be provided by implementors that for simplicity are dedicated to the operation of the Read/Write APIs.
* The recipient should aim to host a single public key used for encryption in their JWKS.
* The public key will be the only one in the JWKS that has the `use` claim set to `enc` and `keys_ops` claim set to `encrypt`.
* When keys are rotated there may be period where more than one key exists that is intended for encryption. The recipient should therefore:
  * Update the claims above when the key is rotated so that one and only one carries the attributes at any one time.
  * If updating claims in place is not possible the recipient must publicise the key identifier (`kid`) of the public key to be used for encryption using a means agreed between implementors.
* The sender must indicate the the public key used for encryption through the `kid` claim in the JOSE Header of the JWE.

If following these guidelines is not possible the recipient must publicise the key identifier (`kid`) of the public key to be used for encryption using a means agreed between implementors.

#### Encrypting Non-JSON Data

For endpoints that implement non-JSON payloads JWE may be used to encryption the payload. The JWE must indicate the underlying content type through the `cty` header:

```json
{
  "alg": "ES256",
  "cty": "application/octet-stream"
}
```

### Filtering

An ASPSP must provide limited support of filtering on GET operations that return multiple records.

The filter parameters, are always specific to particular field(s) of the resource, and follow the rules/formats defined under the resource's data dictionary.

In case of DateTime type filter parameters, values must be specified in ISO8601 format. If the DateTime contains a timezone, the ASPSP must ignore the timezone component.

The filter values will be assumed to refer to the same timezone as the timezone in which the resource is maintained.

### Pagination

An ASPSP **MAY** provide a paginated response for GET operations that return multiple records.

In such a situation, the ASPSP **MUST**:

* If a subsequent page of resource records exists, the ASPSP must provide a link to the next page of resources in the **Links.Next** field of the response. The absence of a next link would indicate that the current page is the last page of results.
* If a previous page of resource records exists, the ASPSP must provide a link to the previous page of resources in the **Links.Prev** field of the response. The absence of a prev link would indicate that the current page is the first page of results.

For a paginated responses, the ASPSP **SHOULD** ensure that the number of records on a page are within reasonable limits, a minimum of 25 records (except on the last page where there are no further records) and a maximum of 1000 records.

Additionally, the ASPSP **MAY** provide:

* A link to the first page of results in the **Links.First** field.
* A link to the last page of results in the **Links.Last** field.
* The total number of pages in the **Meta.TotalPages** field.

As with all other responses, the ASPSP **MUST** include a "self" link to the resource in the **Links.Self** field as described in the Links sections.

This standard does not specify how the pagination parameters are passed by the ASPSP and each ASPSP may employ their own mechanisms to paginate the response.

If the original request from the AISP included filter parameters, the paginated response must return only results that match the filter.

ASPSPs are not expected to implement pagination with transaction isolation. The underlying data-set may change between two subsequent requests. This may result in situations where the same transaction is returned on more than one page.

### Archiving

Archiving of resources will be for ASPSPs to define based on their internal Legal and Regulatory requirements.

In addition:

* ASPSPs **must** only delete expired intent-ids 24 hours after creation
* ASPSPs **may** archive these expired intent-ids

### Supplementary Data

A number of resources in the specification include a section for Supplementary Data. This is intended to allow ASPSPs to accept or provide information in a request or response that is not catered for by other sections of the resource definition.

The Supplementary Data section is defined as an empty JSON object in the specification.

Wherever used, an ASPSP **must** define and document (on their developer portal) their own structure, usage and (mandatory/optional) requirements for Supplementary Data.

An ASPSP **must not** use Supplementary Data if an element already exists in the OBIE standard that fulfils the requirement.

## Security & Access Control

### Scopes & Grant Types

To access each of the APIs, the API must be called with an access token in the HTTP `Authorization` header.

The scopes required with these access tokens and the grant type used to get the access token are specified in the specific API documentation.

### Length of Authorization Code, Access Token and Refresh Token

* In accordance with the OAuth 2.0 Framework, TPPs **must** expect that the length of the authorization code, access token and refresh token, where applicable, may change over time as ASPSPs make changes to what is stored in them and how they are encoded. TPPs **should** expect that they will grow and shrink over time.

* TPPs **must** use a variable length data type without a specific maximum size to store these attributes.

* ASPSPs **must** give TPPs at least three month's notice of any material increase to token lengths being issued, as this could cause a breaking issue for TPPs.

* An ASPSP, prior to any increase in the length of Authorization Code, Access Token and Refresh Tokens, **must** consider the limits enforced by the common tools available in the market to publish and consume Authorization Code, Access Token and Refresh Tokens. Violation of these limits may break the TPPs, using those browsers/tools.

### Consent Authorisation

OAuth 2.0 scopes are coarse grained and the set of available scopes are defined at the point of client registration. There is no standard method for specifying and enforcing fine grained scopes (e.g. a scope to enforce payments of a specified amount on a specified date).

An *intent* is used to define the fine-grained permissions that are granted by the PSU to the TPP.

The act of providing authorisation of an intent by a PSU to an ASPSP is called *consent authorisation*.

The Open Banking Read/Write APIs use a variety of intents such as account-access-consent, funds-confirmation-consents and the payment order consents.

A TPP requests an ASPSP to create intent by using a client credentials grant. The ASPSP creates the intent and responds with the intent-id. The TPP then redirects the PSU to the ASPSP to authorise consent for the intent, passing in an intent-id as a parameter.

This is done through an authorization grant flow and results in the issuance of an access token tied to the authorised intent.

An access token is bound to a single PSU and an intent.

#### Error Condition

If the PSU does not complete a successful consent authorisation (e.g. if the PSU is not authenticated successfully), the authorization code grant ends with a redirection to the TPP with an error response as described in OpenID Connect Core Specification [Section 3.1.2.6](https://openid.net/specs/openid-connect-core-1_0.html#AuthError). The PSU is redirected to the TPP with an error parameter indicating the error that occurred.

#### Token Expiry Time

The expiry time for issued access tokens and refresh tokens must be deterministic for the TPP.

In order to achieve this:

* The ASPSP **must** indicate the lifetime in seconds of the access token in the `expires_in` field of the JSON object returned by the token end-point. (See https://tools.ietf.org/html/rfc6749#section-4.2.2)
* If the ASPSP issues a refresh token, the ASPSP **must** indicate the date-time at which the refresh token will expire in a claim named `http://openbanking.org.uk/refresh_token_expires_at` in the Id token (returned by the token end-point or userinfo end-point). Its value MUST be a number containing a NumericDate value, as specified in https://tools.ietf.org/html/rfc7519#section-2
* NumericDate is a JSON numeric value representing the number of seconds from 1970-01-01T00:00:00Z UTC until the specified UTC date-time, ignoring leap seconds.
* If the ASPSP does not issue a refresh token, the ASPSP **must not** populate the `http://openbanking.org.uk/refresh_token_expires_at` claim in the Id token
* If the ASPSP issues a refresh token that does not expire, the ASPSP **must** populate the claim named `http://openbanking.org.uk/refresh_token_expires_at` in the Id token with a value representing the number of seconds to 03:14:07 UTC on 19 January 2038 (end of UNIX epoch)

#### Exemptions from Strong Customer Authentication

The PSD2 [RTS](http://ec.europa.eu/finance/docs/level-2-measures/psd2-rts-2017-7782_en.pdf) specifies the conditions under which a payment services provider is exempt from carrying out strong customer authentication.

This specification does not provide any direction or guidance on the application of these exemptions.

### Supported Grant Types

OAuth2.0 and OIDC provide support for a variety of methods for the Authorization Server to issue an access token to the Client. These methods are called Grants.

Some of these Grant Types only identify the client, but not the resource owner. It is sufficient to provide the client's identity.

On the other hand, other grant types identify the client and resource owner. The resource owner must be authenticated to issue access tokens through such a grant type.

The Open Banking Read/Write specification supports a sub-set of these grants as well as the FAPI Profile CIBA grant.

The security profile describes these grants in detail.

#### Grant Types for identifying the TPP

##### Client Credentials Grant

Some of the APIs can be accessed using an access token issued through a Client Credentials Grant. These APIs do not execute in the context of a consent or of a PSU and it is sufficient to identify and authenticate the TPP in order to call these APIs.

The Client Credentials Grant is documented in [Section 4.4 of the OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749#section-4.4)

#### Grant Types for identifying the TPP and PSU

##### Authorization Code Grant & Hybrid Grant

APIs that require the PSU as well as TPP to be identified and authenticated can only be accessed using an access token issued through an Authorization Code Grant, Hybrid Grant or CIBA.

The Hybrid Grant (See [Section 3.3. of the OIDC Specification](http://openid.net/specs/openid-connect-core-1_0.html#HybridFlowAuth)) can be used to redirect a PSU to the ASPSP's authorization pages in order to authenticate the PSU and generate and authorization code. The TPP can then exchange this authorization code for an access token by calling the ASPSP's token end-point and authenticating itself.

Earlier versions of this specification referenced the use of The Authorization Code Grant (see [Section 4.1 of the OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749#section-4.1) and [Section 3.1 of the OIDC Specification](http://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)) as  another redirect based mechanism for authenticating PSUs. The FAPI security profile states states that the hybrid flow should be used. ASPSPs should not implement this flow, but should use the Hybrid Grant instead.

 The [FAPI read & Write API Security Profile](https://openid.net/specs/openid-financial-api-part-2-ID2.html) specify a more stringent set of requirements that ASPSPs and TPPs must adhere to.

Earlier versions of this specification referenced the use of [The UK Open Banking Security Profile](https://bitbucket.org/openid/obuk/src/4630771db004da59992fb201641f5c4ff2c881f1/uk-openbanking-security-profile.md?at=master&fileviewer=file-view-default). It should be noted that the UK Open Banking Security Profile is no longer supported by OBIE. ASPSPs should not implement this profile, but should use FAPI instead.

##### id_token_hint

When an access token is generated through an authorization code grant (or hybrid flow), an OIDC Authorization Server will also issue and `id_token` along with the access token.

The `id_token` is a signed JWT that consists of a number of claims that identify the resource owner. In the Open Banking context, the `id_token` always identifies the `intent_id` that was authorised which can be mapped onto a single PSU.

As the `id_token` is signed by the ASPSP and bound to a specific TPP (through the `aud` claim), the `id_token` could be leveraged to *identify* the PSU in subsequent authorisation requests. OIDC caters for this by allowing the `id_token` to be passed into an authorization code grant request as the `id_token_hint` query parameter (as documented [here](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)).

##### jwt_bearer

An ASPSP may rely on a TPP to carry out consent authorization and SCA on its behalf. In such a situation, the TPP takes on the responsibility of authenticating the PSU using credentials issued by the TPP.

Once the PSU has been authenticated, the TPP can directly call the ASPSP's token end-point with a grant type of `urn:ietf:params:oauth:grant-type:jwt-bearer`. The TPP passes in an assertion of the PSU identity through a signed JWT.

The ASPSP returns an access token directly to the TPP without any further user interaction.

The jwt-bearer grant type is an extension to OpenID Connect and covered in [RFC 7523](https://tools.ietf.org/html/rfc7523)

#### CIBA
The [Client Initiated Back-channel Authentication flow](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html) is part of the OpenID specifications.

FAPI has published [Financial-grade API: Client Initiated Backchannel Authentication Profile](https://openid.net/specs/openid-financial-api-ciba-ID1.html).

ASPSPs that implement CIBA **must** adhere to the profile.

An ASPSP **may** optionally implement the CIBA flow to allow PSUs to authenticate themselves using a decoupled *authentication device* that is distinct from the *consumption device* on which they consume the TPP application.

##### Identifying the PSU

ASPSPs that implement CIBA must support one or more of the following methods of identifying the PSU that is to be authenticated:

* **User Id**: Using a static identifier that is shared by the ASPSP and the PSU. This could include a static identifier issued by the ASPSP (e.g., a user name, card number, account number) or a public identifier that allows the ASPSP to uniquely identify the PSU (e.g., an email address or phone number)
* **Ephemeral User Id**: Using a dynamically generated, single use identifier issued by the ASPSP to the PSU. This could be a single use token generated on the PSU's authentication device or communicated to the PSU by any other means.
* **Intent Id**: Using an intent Id generated from a POST to a consent resource with the ASPSP (e.g., a POST to /domestic-payment-consents results in a ConsentId being generated) The ASPSP then uses this information to bind the consent to a particular PSU.
* **Id Token**: Using a previously issued `id_token` that identifies the PSU. The ASPSP **may** limit the use of the `id_token` to the TPP to which it was issued.

An ASPSP **must** document on their developer portal, the methods of identifying a PSU the ASPSP supports.

If the ASPSP does not support a specific method of identifying a PSU, the ASPSP **must** return an authentication error with the error field set to `invalid_request`.


###### Identifying the consent to be authorised
For the OBIE APIs, all authentication journeys take place in the context of a consent.

CIBA does not define a standard mechanism for transmitting an identifier for the consent to the ASPSP. Additionally, FAPI-CIBA specifically states that the Authorization server:
> should not use the login_hint or login_hint_token to convey "intent ids" or any other authorization metadata

It goes on to suggest that additional contextual information should be passed in using one of the alternatives defined in the "Lodging Intent" pattern.

Prior to creating the issuing the `bc-authorize` request the TPP must create a consent.
The generated consent id must be passed in the request object as a parameter called `openbanking-intent-id`.
This allows the access token that is eventually generated to be bound to a specific consent.

The ASPSP must allow at most one `bc_authorize` request at any time to be associated with a given consent.

###### Identifying the PSU Using a User Id

To identify a PSU through a user Id, the TPP **must** issue a `login_hint_token` in the `bc_authorize` request that contain at least one of the following claims with a value identifying the end-user:
  * sub
  * email
  * phone_number

If the ASPSP support identification of the user through a static identifier, it **must** document on its developer portal the claims that it supports as a static identifier.

```json
// using login name
{
  "sub": "scott"
}

// using email address
{
  "email": "scott@oracle.com"
}

// using phone number
{
  "phone_number": "00448903748394"
}
```

The following is a non-normative example shows a call to `bc-authorize` using a login name as an identifier and MTLS for authenticating the client.
```
POST /bc-authorize HTTP/1.1
   Host: server.example.com
   Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
   Content-Type: application/x-www-form-urlencoded

   client_id=9a77c8ec-fbf6-11e9-8f0b-362b9e155667
   request=<jwt>
```

where the JWT represents the following payload:

```
{
  "alg": "PS256",
  "kid": "9f5625be-fbf8-11e9-aad5-362b9e155667"
}
.
{
  "aud": "https://issuer.alphabank.co.uk",
  "iss": "9a77c8ec-fbf6-11e9-8f0b-362b9e155667",
  "exp": "1572537993",
  "iat": "1572537963",
  "nbf": "1572537963",
  "jti": "77ad3a98-fbf8-11e9-8f0b-362b9e155667",
  "scope": "payments",
  "client_notification_token": "c3c03478-fbf6-11e9-aad5-362b9e155667",
  "login_hint_token": "<jwt>",
  "openbanking-intent-id": "aac-a319ff12-fbf9-11e9-8f0b-362b9e155667"
}
```
where the `login_hint_token` JWT represents the following payload:

```
{
  "alg": "none"
}
.
{
  "sub": "scott"
}
.
```

###### Identifying the PSU Using an Ephemeral User Id
To identify a PSU through an ephemeral user Id, the TPP **must** issue a `login_hint_token` in the `bc_authorize` request that contains the custom claim `ephemeral_sub` set to the ephemeral user id

```json
{
  "ephemeral_sub": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

###### Identifying the PSU Using an Intent Id

To identify a PSU through an intent Id, the client only passes in the consent id as described in the previous section.

A `login_hint_token` **must not** be included in the request.

In order to initiate authentication, the TPP must lodge a `bc_authorize` request and then display a QR code representing the `intent_id`.

The PSU would authenticate themselves on the ASPSP's banking app and then scan the QR code.

This will allow the ASPSP to identify the PSU that is authenticating the consent and work out the associated `auth_req_id`

###### Identifying the PSU Using a Previously Issued Id Token

To identify a PSU through a previously issued `id_token` the TPP must issue an `id_token_hint` containing the id_token in the `bc_authorize` request.
A `login_hint_token` **must not** be included in the request.


### Changes to an Intent's Authorized State

A PSU may revoke any of their long-lived consents through the TPP, and only Funds Confirmation Consent through the ASPSP. This only applies to long-lived consents:

* When a PSU does not complete the consent-authorisation flow, the ASPSP must mark the consent as `Rejected`.
* When the PSU revokes their consent with the TPP, the TPP must make a `DELETE` request to the consent resource. The ASPSP **must** delete the resource (possibly as a "soft" delete) and respond to subsequent `GET` requests with an Http Status of `400`.

In each of the above cases, the consent states are terminal i.e. the ASPSP **must not** allow any further state changes. The ASPSP **must not** permit any authorisation code grants to be initiated with such a consent.

#### Effect of Token Expiry on an Intent's Authorized State

An ASPSP may issue an access token and refresh token for a long-lived consent. These tokens may expire before the consent expires. In such a situation, the state of the intent does not change and the ASPSP **must not** modify the state of the intent.

### Consent Re-authentication

#### Ability to re-authenticate an Authorised consent at any point of time

A TPP **may** request a PSU to re-authenticate a consent at *any point of time* for a long-lived consent that is in the `Authorised` state. This includes before and after the underlying tokens have expired.

An ASPSP **must** accept a request from a TPP to re-authenticate a consent at any point of time for a long-lived consent that is in the Authorised state. This includes before and after the underlying tokens have expired.

Once a consent re-authentication is successful, the TPP **must not** use access tokens and refresh tokens that were previously issued for the same consent.

When an ASPSP issues a new access token and refresh token as a result of consent re-authentication, it **may** invalidate the previously issued access tokens and refresh tokens for the same consent.

#### Low Friction User Experience

A PSU's consent re-authentication user experience **must** be aligned with the low friction user experience defined in the guidelines.

#### Use of Refresh Token

An ASPSP **may** issue a refresh token along with an access token as a result of consent re-authentication.

When an access token expires, the TPP **may** attempt to get a new access and refresh token as defined in [Section 6 of the OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749#section-6).

#### Consent re-authentication through TPP

An ASPSP may rely on re-authentication and SCA to be carried out by an AISP on its behalf. It may be necessary to have a contract in place between the two parties that specifies the TPP responsibilities, the method of SCA, resolving disputes etc.

A TPP that has contracts with multiple ASPSPs for carrying out re-authentication and SCA on their behalf could provide a PSU a very streamlined user journey by strongly authenticating the user once and subsequently using that single SCA to renew access tokens with multiple ASPSPs.

The solution leverages RFC 7523's 'Using JWTs as Authorization Grants' as a means of passing in a "trusted" JWT that identifies the PSU to the TPP. This is referred to as the jwt-bearer grant type.

##### Discovery of support for jwt-bearer grant-type.

ASPSPs that support this capability should advertise this as a supported grant_type on their .well-known end-point.
The formal grant name for jwt-bearer is `urn:ietf:params:oauth:grant-type:jwt-bearer`.

##### Client registration
TPPs that would like to use this capability must register their clients with `urn:ietf:params:oauth:grant-type:jwt-bearer` as a supported grant_type.
An ASPSP may determine selective access to this grant type only to TPPs that have a contract with the ASPSP to carry out authentication on their behalf.
An ASPSP may support the registration of such clients through dynamic client registration.

##### PSU identifiers

The standard assumes that the PSU may one set of identifiers to identify itself to the ASPSP and another distinct set of identifiers to identify itself to the TPP.
The standard does not assume that the ASPSP and TPP must share the PSU's password as this is inherently a poor security practice.

##### Using jwt-bearer for re-authentication

In order to use a jwt-bearer for re-authentication, the TPP must have created a consent and authorised it using some other grant-type.

As a result of that step, the ASPSP would have a consent that is bound to a specific PSU. The intent-id can then be used as a proxy to identify the PSU.

In order to carry out re-authentication, the TPP can take a PSU through SCA in the context of the consent that is to be re-authenticated.

The TPP should then call the ASPSP's token end-point with a grant type of `urn:ietf:params:oauth:grant-type:jwt-bearer` as defined in RFC 7523.

The TPP must follow the following additional criteria for the JWT header:
- Set the `alg` of the JWS header to PS256
- Specify the `kid` of the signing key in the JWS header. The `kid` be resolvable as a signing key on the client's registered JWKS.
- Not use any other method of key resolution

The TPP must follow the following additional criteria for the JWT body:
- set `iss` to its own client_id
- set `sub` to the intent_id that is to be re-authorised.
- set `aud` to the token endpoint url
- specify all the other mandatory claims in Section 2.2 Pt 3

##### Vector of Trust

The ASPSP may optionally require the TPP to send it contextual information on the SCA that was carried out.

ASPSPs and TPPs may adopt RFC 8485 - Vectors of Trust.

RFC 7523 allows additional custom claims to be passed in the JWT body. The TPP may use the claim `vot` to pass in vectors of trust that provides a description of the sca applied.

ASPSPs that require the `vot` claim to be included in the jwt-bearer should document the required details on their developer portal.

##### Example

The following is a non-normative example of a call made to a token end-point to initiate a jwt-bearer grant

```
POST /token HTTP/1.1
Content-Type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer
&scope=Accounts
&assertion=eyJhbGciOiJFUzI1NiIsImtpZCI6IjE2In0.......
```

where the `assertion` is a JWS of the format

```
{
  "alg": "PS256",
  "kid": "8ug4r-r4y-br4nd0the3k1ng-andi"
}
.
{
  "iss": "{client-id}",
  "sub": "{intent-id}",
  "aud": "https://auth.bancosupreme.co.uk/token",
  "exp": "1573456067",
  "nbf": "1573455767",
  "iat": "1573455767",
  "jti": "85570316-0451-11ea-9a9f-362b9e155667",
  "vot": "..."
}
```

## Data Model

### Enumerations

OBIE Specifications include various fields of Enumerated data types, where either the values are fixed to a OBIE defined set of alternatives (i.e. Static Enumerations), or flexible with an initial OBIE defined set of alternatives, and ASPSPs can use/extend these alternatives (i.e. Namespaced Enumerations).

While Static Enumerations are listed on each API Specification page, Namespaced Enumerations are captured on the Namespaced Enumerations page.

### Common Payload Structure

This section gives an overview of the top level structure for the API payloads for the Open Banking Read/Write APIs.

The data contained within the Data section is documented with each individual API endpoint.

#### Request Structure

The top level request structure for Open Banking Read/Write APIs:

```json
{
  "Data": {
    ...
  },
  "Risk": {
    ...
  }
}
```

##### Data

The `Data` section contains the request data for the specific API request.

The structure of this element differs for each API endpoint.

##### Risk

The `Risk` section contains risk indicators for the specific API request as provided by the TPP.

The risk indicators contained in this element may be different for each API endpoint.

#### Response Structure

The top level response structure for Open Banking Read/Write APIs:

```json
{
  "Data": {
    ...
  },
  "Risk": {
    ...
  },
  "Links": {
    ...
  },
  "Meta": {
    ...
  }
}
```

In line with the principle of RESTful APIs, the full resource must be replayed as part of the response.

Two additional top-level sections are included in the response for:
* Links
* Meta

#### Error Response Structure

The error response structure for Open Banking Read/Write APIs:

```json
{
  "Code": "...",
  "Id": "...",
  "Message": "...",
  "Errors": [
    {
      "ErrorCode": "...",
      "Message": "...",
      "Path": "...",
      "Url": "..."
    }
  ]
}
```

##### UML Diagram

![](./images/OBErrorResponse1.gif)

##### Data Dictionary

|Name                      |Occurrence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |XPath       |EnhancedDefinition                                                                                                                                                      |Class                    |Codes|Pattern|
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|-----|-------|
|OBErrorResponse1          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |OBErrorResponse1|An array of detail error codes, and messages, and URLs to documentation to help remediation.                                                                            |OBErrorResponse1         |     |       |
|Code                      |1..1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |OBErrorResponse1/Code|High level textual error code, to help categorise the errors.                                                                                                           |Max40Text                |     |       |
|Id                        |0..1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |OBErrorResponse1/Id|A unique reference for the error instance, for audit purposes, in case of unknown/unclassified errors.                                                                  |Max40Text                |     |       |
|Message                   |1..1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |OBErrorResponse1/Message|Brief Error message, e.g., 'There is something wrong with the request parameters provided'                                                                              |Max500Text               |     |       |
|Errors                    |1..n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |OBErrorResponse1/Errors|                                                                                                                                                                        |OBError1                 |     |       |
|ErrorCode                 |1..1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |OBErrorResponse1/Errors/ErrorCode|Low level textual error code, e.g., UK.OBIE.Field.Missing                                                                                                               |OBErrorResponseError1Code|     |       |
|Message                   |1..1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |OBErrorResponse1/Errors/Message|A description of the error that occurred. e.g., 'A mandatory field isn't supplied' or 'RequestedExecutionDateTime must be in future'<br><br>OBIE doesn't standardise this field|Max500Text               |     |       |
|Path                      |0..1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |OBErrorResponse1/Errors/Path|Recommended but optional reference to the JSON Path of the field with error, e.g., Data.Initiation.InstructedAmount.Currency                                            |Max500Text               |     |       |
|Url                       |0..1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |OBErrorResponse1/Errors/Url|URL to help remediate the problem, or provide more information, or to API Reference, or help etc                                                                        |xs:anyURI                |     |       |


#### Optional Fields

In objects where the value for an optional field is not specified, the field **must** be excluded from the JSON payload.

In objects where an array field is defined as having 0..n values, the array field **must be** included in the payload with an empty array.

```
{
  "Name": "",             // Incorrect. Exclude the Name field from the payload.
  "Age": 0,               // Incorrect. 0 should not be used to indicate an undefined age.
  "CreditorAccount": {},  // Incorrect. Exclude the CreditorAccount field.
  "Balances": []          // Correct. This is the method of indicating an empty array. Do not suppress the Balance field.
}
```

#### Links

The Links section is mandatory and will always contain absolute URIs to related resources, 

The "Self" member is mandatory.

For example:

```json
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/58923"
  }
```

Where an API provides a paginated response, the `Links` element may also contain the members `First`, `Prev`, `Next` and `Last` as described in the section Basics / Pagination.

For example:

```json
  "Links": {
    "Self": "http://example.com/articles?page[number]=3&page[size]=1",
    "First": "http://example.com/articles?page[number]=1&page[size]=1",
    "Prev": "http://example.com/articles?page[number]=2&page[size]=1",
    "Next": "http://example.com/articles?page[number]=4&page[size]=1",
    "Last": "http://example.com/articles?page[number]=13&page[size]=1"
  }
```

#### Meta

The Meta section is mandatory, but may be empty.  An optional member is "TotalPages" which is specified as an integer (int32) and shows how many pages of results (for pagination) are available.

For example:

```json
  "Meta": {
    "TotalPages": 13
  }
```

## Usage Examples

The usage examples for the individual APIs are documented in their respective pages.

This section provides usage examples for some repeating patterns that are used by multiple resources.

### Pagination Flows

The example below illustrates how an ASPSP may return a paginated response. 

#### Request

```
GET /accounts/22289/transactions HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Paginated Resource Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    ...
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/transactions/",
    "Last": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/transactions?pg=20",    
	"First": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/transactions/",    
	"Next": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/transactions?pg=2"
  },
  "Meta": {
    "TotalPages": 20,
	"FirstAvailableDateTime": "2017-05-03T00:00:00+00:00",
	"LastAvailableDateTime": "2017-12-03T00:00:00+00:00"
  }
}
```
The TPP may follow the links provided in the Links section of the payload to navigate to the first, last, next and previous pages:

#### Request Next Page of Results

```
GET /accounts/22289/transactions?pg=2 HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Paginated Resource Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    ...
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/transactions?pg=2",
    "Last": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/transactions?pg=20",    
	"First": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/transactions/",    
	"Next": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/transactions?pg=3",
	"Prev": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/transactions?pg=1"
  },
  "Meta": {
    "TotalPages": 20,
	"FirstAvailableDateTime": "2017-05-03T00:00:00+00:00",
	"LastAvailableDateTime": "2017-12-03T00:00:00+00:00"
  }
}
```

### Error Flows

This section provides some examples of error scenarios and the expected outputs.

#### Missing or Expired Access Token

This flow assumes that the following Steps have been completed successfully:

* Step 1: Request Account Information
* Step 2: Setup Account Request
* Step 3: Authorise Consent

The AISP attempts to provide an expired or missing access token to the ASPSP in an attempt to Request Data

![](./images/MissingOrExpiredAccessToken.png)


<details>
  <summary>Diagram source</summary>

```
participant PSU
participant AISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

alt Request data with a missing or expired access-token
AISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
AISP -> ASPSP Resource Server: GET /accounts
ASPSP Resource Server -> AISP: HTTP 401 (Unauthorized)

AISP -> ASPSP Resource Server: GET /accounts/{AccountId}/transactions
ASPSP Resource Server -> AISP: HTTP 401 (Unauthorized)

end alt
```

</details>

#### Incomplete or Malformed Request Payload

This flow assumes that the following Steps have been completed successfully:

* Step 1: Request Account Information
* Step 2: Setup Account Request
* Step 3: Authorise Consent

The AISP provides a malformed request to the ASPSP in an attempt to setup an Account Request.

![](./images/IncompleteOrMalformedRequestPayload.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant AISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server


alt AISP attempts to setup an account request with a malformed payload
AISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
AISP -> ASPSP Resource Server: POST /account-requests
ASPSP Resource Server -> AISP: HTTP 400 (Bad Request)

end alt
```

</details>


#### Missing or Invalid Access Token Scope

This flow assumes that the following Steps have been completed successfully:

* Step 1: Request Account Information
* Step 2: Setup Account Request
* Step 3: Authorise Consent

The AISP provides a (valid) access token which does not have a valid scope (or link to the correct Permissions) to Request Data

![](./images/MissingOrInvalidAccessTokenScope.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant AISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server


alt Request data with a missing or invalid access-token scope
AISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
AISP -> ASPSP Resource Server: GET /accounts
ASPSP Resource Server -> AISP: HTTP 403 (Forbidden)


AISP -> ASPSP Resource Server: GET /accounts/{AccountId}/transactions
ASPSP Resource Server -> AISP: HTTP 403 (Forbidden)


end alt
```

</details>

#### Sudden Burst of API Requests

This flow assumes that the following Steps have been completed successfully:

* Step 1: Request Account Information
* Step 2: Setup Account Request
* Step 3: Authorise Consent

The AISP provides a (valid) access token which is used to generate a burst of multiple requests to retrieve an Accounts resource.

The ASPSP may optionally choose to return a 429 Response

![](./images/TooManyRequests.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant AISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server


alt AISP attempts to retrieve an Account Resource
AISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
    loop Burst of multiple GET requests
        AISP -> ASPSP Resource Server: GET /accounts/{AccountId}
        opt
            ASPSP Resource Server -> AISP: HTTP 429 (Too Many Requests)
        end
    end
end
```

</details>

#### Failed Authorisation Consent

This flow assumes that the following Steps have been completed successfully:

* Step 1: Request Account Information
* Step 2: Setup Account Request

The Step 3: Authorise Consent Flow fails to succeed due to the PSU providing invalid credentials to the ASPSP, resulting in no Authorization Code being generated.

![](./images/FailedAuthorisationConsent.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant AISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU, ASPSP Resource Server
    Step 1: Request account information
end note
PSU -> AISP: Get account/transaction information

note over PSU, ASPSP Resource Server
    Step 2: Setup account request
end note
AISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
AISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> AISP: access-token
AISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
AISP -> ASPSP Resource Server: POST /account-requests
ASPSP Resource Server -> AISP: HTTP 201 (Created), AccountRequestId
AISP -> PSU: HTTP 302 (Found), Redirect (AccountRequestId)

note over PSU, ASPSP Resource Server
Step 3: Failed authorise consent
end note
PSU -> ASPSP Authorisation Server: Follow redirect (AccountRequestId)
PSU -> ASPSP Authorisation Server: Invalid Credentials
ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (error)
PSU -> AISP: Follow redirect (error)
AISP -> PSU : Error Response
```

</details>

#### JSON Error Response

##### Request

```
POST /domestic-payment-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "Initiation": {
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "MyImaginaryScheme",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "EcommerceGoods",
    "MerchantCategoryCode": "5967",
    "MerchantCustomerIdentification": "053598653254",
    "DeliveryAddress": {
      "AddressLine": [
        "Flat 7",
        "Acacia Lodge"
      ],
      "StreetName": "Acacia Avenue",
      "BuildingNumber": "27",
      "PostCode": "GU31 2ZZ",
      "TownName": "Sparsholt",
      "CountySubDivision": [
        "Wessex"
      ],
      "Country": "UK"
    }
  }
}
```

##### Response

```
HTTP/1.1 400 Bad Request
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Code": "400 BadRequest",
  "Id": "2b5f0fb2-730b-11e8-adc0-fa7ae01bbebc",
  "Message": "Invalid request parameters.",
  "Errors": [
    {
      "ErrorCode": "UK.OBIE.Field.Missing",
      "Message": "Instructed identification is missing",
      "Path": "Data.Initiation.InstructionIdentification",
      "Url": "<url to the api reference for Payment Inititaion API>"
    },
    {
      "ErrorCode": "UK.OBIE.Unsupported.Scheme",
      "Message": "Scheme name supplied is not supported",
      "Path": "Data.Initiation.CreditorAccount.SchemeName",
      "Url": "<url to the online documentation referring supported scheme names>"
    }
  ]
}
```
