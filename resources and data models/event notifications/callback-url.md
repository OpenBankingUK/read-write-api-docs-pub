# Callback URL - v3.1.2

1. [Overview](#overview)
2. [Endpoints](#endpoints)
      1. [POST /callback-urls](#post-callback-urls)
      2. [GET /callback-urls](#get-callback-urls)
      3. [PUT /callback-urls/{CallbackUrlId}](#put-callback-urlscallbackurlid)
      4. [DELETE /callback-urls/{CallbackUrlId}](#delete-callback-urlscallbackurlid)
3. [Data Model](#data-model)
   1. [Callback Url - Request](#callback-url---request)
      1. [UML Diagram](#uml-diagram)
      2. [Data Dictionary](#data-dictionary)
   2. [Callback Url - Response](#callback-url---response)
      1. [UML](#uml)
      2. [Data Dictionary](#data-dictionary-1)
   3. [Callback Urls - Response](#callback-urls---response)
      1. [UML](#uml-1)
      2. [Data Dictionary](#data-dictionary-2)
4. [Usage Examples](#usage-examples)
   1. [Create Callback Url](#create-callback-url)
      1. [POST Callback Url Request](#post-callback-url-request)
      2. [POST Callback Url Response](#post-callback-url-response)
   2. [Get Callback Urls](#get-callback-urls)
      1. [GET Callback Url Request](#get-callback-url-request)
      2. [GET Callback Url Response](#get-callback-url-response)

## Overview

The Callback URL resource is used by a TPP to subscribe to events with an ASPSP.

This resource description should be read in conjunction with a compatible Callback URL Profile.

## Endpoints

A TPP will set up and maintain its call back details (URL and version number) using the callback-url resource.

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| callback-url |POST |POST /callback-urls |Optional |accounts<br>payments<br>fundsconfirmations |Client Credentials |Signed Request<br><br>Signed Response |No |OBCallbackUrl1 |OBCallbackUrlResponse1 |
| callback-url |GET |GET /callback-urls |Mandatory (if resource POST implemented) |accounts<br>payments<br>fundsconfirmations |Client Credentials |Signed Response |No |n/a |OBCallbackUrlsResponse1 |
| callback-url |PUT |PUT /callback-urls/{CallbackUrlId} |Mandatory (if resource POST implemented) |accounts<br>payments<br>fundsconfirmations |Client Credentials |Signed Request<br><br>Signed Response |No |OBCallbackUrlResponse1 |OBCallbackUrlResponse1 |
| callback-url |DELETE |DELETE /callback-urls/{CallbackUrlId} |Mandatory (if resource POST implemented) |accounts<br>payments<br>fundsconfirmations |Client Credentials |n/a |No |n/a |n/a |


#### POST /callback-urls

The API endpoint allows the TPP to ask an ASPSP to create a new **callback-url** resource.

* The POST action allows the TPP to register a callback URL for an ASPSP to send event notifications to.
* The ASPSP creates the **callback-url** resource and responds with a unique CallbackUrlId to refer to the resource.
* An ASPSP **must** respond with a 409 error if a callback-url exists for that TPP.

#### GET /callback-urls

The API endpoint allows the TPP to ask an ASPSP to retrieve its **callback-url** resource.

* The ASPSP retrieves the **callback-url** resource and responds with the resource.

#### PUT /callback-urls/{CallbackUrlId}

The API endpoint allows the TPP to ask an ASPSP to update a **callback-url** resource.

* The PUT action allows the TPP to update a callback URL for an ASPSP to send event notifications to.
* The ASPSP updates the **callback-url** resource and responds with the updated resource.

#### DELETE /callback-urls/{CallbackUrlId}

The API endpoint allows the TPP to ask an ASPSP to delete a **callback-url** resource.

* The ASPSP deletes the **callback-url** resource.

## Data Model

### Callback Url - Request

The OBCallbackurl1 object will be used for the call to:

* POST /callback-urls

#### UML Diagram

![OBCallbackUrl1](images/OBCallbackUrl1.gif)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBCallbackUrl1 |OBCallbackUrl1 |OBCallbackUrl1 | | | | |
| Data |1..1 |OBCallbackUrl1/Data |OBCallbackUrlData1 | | | |
| Url |1..1 |OBCallbackUrl1/Data/Url |Callback URL for a TPP hosted service. Will be used by ASPSPs, in conjunction with the resource name, to construct a URL to send event notifications to. |xs:anyURI | | |
| Version |1..1 |OBCallbackUrl1/Data/Version |Version for the event notification. |Max10Text | | |

### Callback Url - Response

The OBCallbackUrlResponse1 object will be used for a response to a call to:

* POST /callback-urls
* PUT /callback-urls/{CallbackUrlId}

The OBCallbackUrlResponse1 object will also be used for the call to:

* PUT /callback-urls

#### UML

![OBCallbackUrlResponse1](images/OBCallbackUrlResponse1.gif)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBCallbackUrlResponse1 |OBCallbackUrlResponse1 |OBCallbackUrlResponse1 | | | | |
| Data |1..1 |OBCallbackUrlResponse1/Data |OBCallbackUrlResponseData1 | | | |
| CallbackUrlId |1..1 |OBCallbackUrlResponse1/Data/CallbackUrlId |Unique identification as assigned by the ASPSP to uniquely identify the callback URL resource. |Max40Text | | |
| Url |1..1 |OBCallbackUrlResponse1/Data/Url |Callback URL for a TPP hosted service. Will be used by ASPSPs, in conjunction with the resource name, to construct a URL to send event notifications to. |xs:anyURI | | |
| Version |1..1 |OBCallbackUrlResponse1/Data/Version |Version for the event notification. |Max10Text | | |



### Callback Urls - Response

The OBCallbackUrlsResponse1 object will be used for a response to a call to:

* GET /callback-urls

#### UML

![OBCallbackUrlsResponse1](images/OBCallbackUrlsResponse1.gif)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBCallbackUrlsResponse1 |OBCallbackUrlsResponse1 |OBCallbackUrlsResponse1 | | | | |
| Data |1..1 |OBCallbackUrlsResponse1/Data |OBCallbackUrlsResponseData1 | | | |
| CallbackUrl |0..n |OBCallbackUrlsResponse1/Data/CallbackUrl |OBCallbackUrlResponseData1 | | | |
| CallbackUrlId |1..1 |OBCallbackUrlsResponse1/Data/CallbackUrl/CallbackUrlId |Unique identification as assigned by the ASPSP to uniquely identify the callback url resource. |Max40Text | | |
| Url |1..1 |OBCallbackUrlsResponse1/Data/CallbackUrl/Url |Callback URL for a TPP hosted service. Will be used by ASPSPs, in conjunction with the resource name, to construct a URL to send event notifications to. |xs:anyURI | | |
| Version |1..1 |OBCallbackUrlsResponse1/Data/CallbackUrl/Version |Version for the event notification. |Max10Text | | |

## Usage Examples

### Create Callback Url

#### POST Callback Url Request

```
POST /callback-urls HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-interaction-id: 86ebcd82-8e38-4f2d-a79c-965b41d15865
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
	"Url": "https://tpp.com/open-banking/v3.1/event-notifications",
	"Version": "3.1"
  }
}
```

#### POST Callback Url Response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 86ebcd82-8e38-4f2d-a79c-965b41d15865
Content-Type: application/json
```

```json
{
	"Data": {
		"CallbackUrlId": "CB-101",
		"Url": "https://tpp.com/open-banking/v3.1/event-notifications",
		"Version": "3.1"
	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/callback-urls/CB-101"
	},
	"Meta": {}
}
```

### Get Callback Urls

#### GET Callback Url Request

```
GET /callback-urls HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-interaction-id: 86ebcd82-8e38-4f2d-a79c-965b41d15865
Accept: application/json
```

#### GET Callback Url Response

```
GET/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 86ebcd82-8e38-4f2d-a79c-965b41d15865
Content-Type: application/json
```

```json
{
	"Data": {
		"CallbackUrl": [{
			"CallbackUrlId": "CB-101",
			"Url": "https://tpp.com/open-banking/v3.1/event-notifications",
			"Version": "3.1"
		}]
	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/callback-urls/"
	},
	"Meta": {}
}
```