# Callback URL Profile <!-- omit in toc -->



## Overview

The Callback URL API Specification described here allows a TPP to:

* Register a callback URL with an ASPSP to receive event notifications.
* Optionally read, update or delete a registered callback URL.

## Basics

### Overview

The steps and sequence diagram below provide a general outline of a notification flow for all resources in the R/W APIs.

#### Steps

Step 1: Setup Event Notification Configuration

* This flow begins with a TPP creating a **callback-url** resource with an ASPSP.
* The callback URL must be specified at this stage.

Step 2: Event Notification Required

* When an event occurs on a resource that requires a notification, the ASPSP identifies the **callback-url** associated with the TPP owning the affected resource.
* The ASPSP sends the event notification to the callback URL, detailing the nature of the event and identifying the affected resource.
* The TPP initiates a client credential grant and retrieves the resource using the details contained in the event notification.

Step 3: Retrieve/Update/Delete Event Notification Configuration

* The TPP may optionally read/update/delete the **callback-url** resource.

#### Sequence Diagram

![Event Notification Overview](images/EventNotificationOverview.png)

<details>
  <summary>Diagram source</summary>
  
  ```
participant TPP
participant ASPSP Authorisation Server
participant ASPSP Resource Server
participant ASPSP Notification Service
     
note over TPP, ASPSP Notification Service
Step 1: Setup Event Notification Configuration
end note
 
TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token
TPP <-> ASPSP Resource Server: Establish TLS 1.2 MA
TPP -> ASPSP Resource Server: POST /callback-urls
ASPSP Resource Server -> TPP: HTTP 201 (Created),  CallbackUrlId
 
note over TPP, ASPSP Notification Service
 Step 2: Event Notification Required
end note
 
 
 
note left of ASPSP Notification Service
- Create EventNotification
- Sign EventNotification
end note
 
loop Retry Until Successful (as per retry policy)
ASPSP Notification Service -> TPP: POST /event-notifications, EventNotification, signature
alt success
TPP -> ASPSP Notification Service: HTTP 202 Accepted
else failure
TPP -> ASPSP Notification Service: HTTP 500/400
end alt
end loop
 
note right of TPP
TPP verifies signature
 
URL for resource contained in the
EventNotification rlk (resource links) claim
end note
 
TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token
 
TPP <-> ASPSP Resource Server: Establish TLS 1.2 MA
TPP -> ASPSP Resource Server: GET Resource
ASPSP Resource Server -> TPP: HTTP 200 (OK),  Resource
 
note over TPP, ASPSP Notification Service
Step 3: Retrieve/Update/Delete Event Notification Configuration
end note
 
TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token
TPP <-> ASPSP Resource Server: Establish TLS 1.2 MA
alt Retrive
TPP -> ASPSP Resource Server: GET /callback-urls
ASPSP Resource Server -> TPP: HTTP 200 (OK)
else Update
TPP -> ASPSP Resource Server: PUT /callback-urls/{CallbackUrlId}
ASPSP Resource Server -> TPP: HTTP 200 (OK)
else Delete
TPP -> ASPSP Resource Server: DELETE /callback-urls/{CallbackUrlId}
ASPSP Resource Server -> TPP: HTTP 204 (OK)
end alt
option footer=bar
``` 
 
</details>

### Callback URL

TPPs must register a URL for TPP hosted services to receive event notifications from an ASPSP. The URL **must** end with the Event Notification API specification version number, followed by ‘/event-notifications'.

For example: 

* URL: https://tpp.com/open-banking/v3.1/event-notifications

### Release Management

This section overviews the release management and versioning strategy for the Callback URL API.

#### Callback-URL Resource

TPPs **must** register for event-notification callbacks with the version of Event Notification API they have implemented. The version element of the Callback-URL resource is used for this purpose.

##### POST

* A TPP **must only** create a callback-url on one version

##### GET

* A TPP **must not** access a callback-url on an older version, via the CallbackUrlId for a callback-url created in a newer version.
  * E.g., a callback-url created in v4, accessed via v3.
* An ASPSP **must** allow a callback-url resource to be accessed in a newer version.
* An ASPSP **must** ensure callback-url fields are unchanged when accessed in a different version.

##### PUT

* A TPP **must not** update a callback-url on an older version via a CallbackUrlId created in a newer version.
  * E.g., A callback-url is created in v4, and a PUT request on v3.
* An ASPSP **must** support updating a callback-url from a previous version via a CallbackUrlId created in a newer version.
  * E.g., A callback-url is created in v3, and a PUT request on v4.

##### DELETE

* A TPP **must not** delete a callback-url on an older version via a CallbackUrlId created in a newer version.
  * E.g. A callback-url is created in v4, and request DELETE on v3.
* An ASPSP **must** support deleting a callback-url from a previous version via a CallbackUrlId created in a newer version.
  * E.g., A callback-url is created in v3, and request DELETE on v4.

### Callback-URL per TPP

An ASPSP will maintain at most, a single Callback-URL resource per TPP.

## Endpoints

A TPP will set up and maintain its call back details (URL and version number) using the callback-url resource.
| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| callback-url |POST |POST /callback-urls |Optional |accounts<br>payments<br>fundsconfirmations |Client Credentials |Signed Request<br>Signed Response |No |OBCallbackUrl1 |OBCallbackUrlResponse1 |
| callback-url |GET |GET /callback-urls |Mandatory (if resource POST implemented) |accounts<br>payments<br>fundsconfirmations |Client Credentials |Signed Response |No |n/a |OBCallbackUrlsResponse1 |
| callback-url |PUT |PUT /callback-urls/{CallbackUrlId} |Mandatory (if resource POST implemented) |accounts<br>payments<br>fundsconfirmations |Client Credentials |Signed Request<br>Signed Response |No |OBCallbackUrlResponse1 |OBCallbackUrlResponse1 |
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