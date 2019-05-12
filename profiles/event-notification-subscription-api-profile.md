# Event Notification Subscription Profile <!-- omit in toc -->



## Overview

The Event Notification Subscription API Specification describes the flows and payloads to allow TPPs to subscribe to events with an ASPSP.

The ASPSP API endpoints described here allow a TPP to:

* Register an event subscription with an ASPSP to subscribe to event notifications.
  * A subscription can enable real time event notifications via a HTTP callback from the ASPSP, and aggregated polling by the TPP.
* Specify a list of event types to be notified on. 
* Optionally read, update or delete a registered event subscription.

## Basics

### Overview

The steps and sequence diagram below provide a general outline of a notification flow for all resources in the R/W APIs.

#### Steps

Step 1: Setup Event Notification Subscription

* This flow begins with a TPP creating an **event-subscription** resource with an ASPSP.

Step 2: Retrieve/Update/Delete Event Notification Subscription

* The TPP may optionally read/update/delete the **event-subscription** resource.

#### Sequence Diagram

![Event Subscriptions](images/EventSubscriptions.png)

<details>
  <summary>Diagram source</summary>
  
  ```
participant TPP
participant ASPSP Authorisation Server
participant ASPSP Resource Server
participant ASPSP Notification Service
    
note over TPP, ASPSP Notification Service
Step 1: Setup Event Subscription
end note

TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token
TPP <-> ASPSP Resource Server: Establish TLS 1.2 MA
TPP -> ASPSP Resource Server: POST /event-subscriptions
ASPSP Resource Server -> TPP: HTTP 201 (Created),  EventSubscriptionId

note over TPP, ASPSP Notification Service
Step 2: Retrieve/Update/Delete Event Subscription
end note

TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token
TPP <-> ASPSP Resource Server: Establish TLS 1.2 MA
alt Retrive
TPP -> ASPSP Resource Server: GET /event-subscriptions
ASPSP Resource Server -> TPP: HTTP 200 (OK)
else Update
TPP -> ASPSP Resource Server: PUT /event-subscriptions/{EventSubscriptionId}
ASPSP Resource Server -> TPP: HTTP 200 (OK)
else Delete
TPP -> ASPSP Resource Server: DELETE /event-subscriptions/{EventSubscriptionId}
ASPSP Resource Server -> TPP: HTTP 204 (OK)
end alt
option footer=bar
``` 
 
</details>

### Subscriptions for Real Time Event Notifications and Aggregated Polling

ASPSPs may choose to offer Real Time Notifications, Aggregated Polling or a combination of both. TPPs will subscribe to the different notification mechanisms using the **event-subscription** resource.

#### Real Time Event Notifications

TPPs must register an event subscription with a CallbackUrl for TPP hosted services to receive real time event notifications from an ASPSP (providing an ASPSP supports this functionality).

The CallbackUrl **must** end with the Event Notification API specification version number, followed by ‘/event-notifications'.

For example: 

* URL: https://tpp.com/open-banking/v3.1/event-notifications

#### Aggregated Polling

TPPs must register an event subscription to enable aggregated polling on an ASPSP (providing an ASPSP supports this functionality).

### Release Management

This section overviews the release management and versioning strategy for the Event Notification API.

#### Event-Subscription Resource

TPPs **must** register for event-subscriptions with the version of Event Notification API they have implemented. The version field of the **event-subscription** resource is used for this purpose.

##### POST

* A TPP **must only** create an **event-subscription** on one version

##### GET

* A TPP **must not** access a event-subscription on an older version, via the EventSubscriptionId for an event-subscription created in a newer version.
  * E.g., a event-subscription created in v4, accessed via v3.
* An ASPSP **must** allow an event-subscription resource to be accessed in a newer version.
* An ASPSP **must** ensure event-subscription fields are unchanged when accessed in a different version.

##### PUT

* A TPP **must not** update an event-subscription on an older version via a EventSubscriptionId created in a newer version.
  * E.g., A event-subscription is created in v4, and a PUT request on v3.
* An ASPSP **must** support updating an event-subscription from a previous version via a EventSubscriptionId created in a newer version.
  * E.g., A event-subscription is created in v3, and a PUT request on v4.

##### DELETE

* A TPP **must not** delete an event-subscription on an older version via a EventSubscriptionId created in a newer version.
  * E.g. An event-subscription is created in v4, and request DELETE on v3.
* An ASPSP **must** support deleting an event-subscription from a previous version via a EventSubscriptionId created in a newer version.
  * E.g., An event-subscription is created in v3, and request DELETE on v4.

### Event-Subscription per TPP

An ASPSP will maintain at most, a single **event-subscription** resource per TPP.

## Endpoints

A TPP will set up and maintain its event subscription details (URL, event types and version number) using the event-subscription resource.

### Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| event-subscription |POST |POST /event-subscriptions |Optional |accounts<br>payments<br>fundsconfirmations |Client Credentials |Signed Request<br>Signed Response |No |OBEventSubscription1 |OBEventSubscriptionResponse1 |
| event-subscription |GET |GET /event-subscriptions |Mandatory (if resource POST implemented) |accounts<br>payments<br>fundsconfirmations |Client Credentials |Signed Response |No |n/a |OBEventSubscriptionsResponse1 |
| event-subscription |PUT |PUT /event-subscriptions/{EventSubscriptionId} |Mandatory (if resource POST implemented) |accounts<br>payments<br>fundsconfirmations |Client Credentials |Signed Request<br>Signed Response |No |OBEventSubscriptionResponse1 |OBEventSubscriptionResponse1 |
| event-subscription |DELETE |DELETE /event-subscriptions/{EventSubscriptionId} |Mandatory (if resource POST implemented) |accounts<br>payments<br>fundsconfirmations |Client Credentials |n/a |No |n/a |n/a |


#### POST /event-subscriptions 

The API endpoint allows the TPP to ask an ASPSP to create a new **event-subscription** resource.

* The POST action allows the TPP to register an event subscription for a TPP to access event notifications.
* The ASPSP creates the **event-subscription** resource and responds with a unique EventSubscriptionId to refer to the resource.
* An ASPSP **must** respond with a 409 error if an event-subscription exists for that TPP.

#### GET /event-subscriptions

The API endpoint allows the TPP to ask an ASPSP to retrieve its **event-subscription** resource.

* The ASPSP retrieves the **event-subscription** resource and responds with the resource.

#### PUT /event-subscriptions/{EventSubscriptionId}

The API endpoint allows the TPP to ask an ASPSP to update an **event-subscription** resource.

* The PUT action allows the TPP to update an event subscription for a TPP to access event notifications.
* The ASPSP updates the **event-subscription** resource and responds with the updated resource.

#### DELETE /event-subscriptions/{EventSubscriptionId}

The API endpoint allows the TPP to ask an ASPSP to delete an **event-subscription** resource.

* The ASPSP deletes the **event-subscription** resource.

## Data Model

### Event Subscription - Request

The OBEventSubscription1 object will be used for the call to:

* POST /event-subscriptions

#### UML Diagram

![OBEventSubscription1](images/OBEventSubscription1.gif)

#### Notes

For the OBEventSubscription1 object:

* EventTypes usage:
  * TPPs may provide a list of event types to subscribe to specific events.
  * TPPs may omit this field to subscribe to all supported events.


#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBEventSubscription1 | |OBEventSubscription1 | |OBEventSubscription1 | | |
| Data |1..1 |OBEventSubscription1/Data | |OBEventSubscriptionData1 | | |
| CallbackUrl |0..1 |OBEventSubscription1/Data/CallbackUrl |Callback URL for a TPP hosted service. Will be used by ASPSPs, in conjunction with the resource name, to construct a URL to send event notifications to. |xs:anyURI | | |
| Version |1..1 |OBEventSubscription1/Data/Version |Version for the event notification. |Max10Text | | |
| EventTypes |0..n |OBEventSubscription1/Data/EventTypes |Array of event types the subscription applies to. |OBEventType1Code | | |


### Event Subscription - Response

The OBEventSubscriptionResponse1 object will be used for a response to a call to:

* POST /event-subscriptions
* PUT /event-subscriptions/{EventSubscriptionId}

The OBEventSubscriptionResponse1 object will also be used for the call to:

* PUT /event-subscriptions

#### UML

![OBEventSubscriptionResponse1](images/OBEventSubscriptionResponse1.gif)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBEventSubscriptionResponse1 | |OBEventSubscriptionResponse1 | |OBEventSubscriptionResponse1 | | |
| Data |1..1 |OBEventSubscriptionResponse1/Data | |OBEventSubscriptionResponseData1 | | |
| EventSubscriptionId |1..1 |OBEventSubscriptionResponse1/Data/EventSubscriptionId |Unique identification as assigned by the ASPSP to uniquely identify the callback URL resource. |Max40Text | | |
| CallbackUrl |0..1 |OBEventSubscriptionResponse1/Data/CallbackUrl |Callback URL for a TPP hosted service. Will be used by ASPSPs, in conjunction with the resource name, to construct a URL to send event notifications to. |xs:anyURI | | |
| Version |1..1 |OBEventSubscriptionResponse1/Data/Version |Version for the event notification. |Max10Text | | |
| EventTypes |0..n |OBEventSubscriptionResponse1/Data/EventTypes |Array of event types the subscription applies to. |OBEventType1Code | | |

### Event Subscriptions - Response

The OBEventSubscriptionsResponse1 object will be used for a response to a call to:

* GET /event-subscriptions

#### UML

![OBEventSubscriptionsResponse1](images/OBEventSubscriptionsResponse1.gif)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBEventSubscriptionsResponse1 | |OBEventSubscriptionsResponse1 | |OBEventSubscriptionsResponse1 | | |
| Data |1..1 |OBEventSubscriptionsResponse1/Data | |OBEventSubscriptionsResponseData1 | | |
| EventSubscription |0..n |OBEventSubscriptionsResponse1/Data/EventSubscription | |OBEventSubscriptionResponseData1 | | |
| EventSubscriptionId |1..1 |OBEventSubscriptionsResponse1/Data/EventSubscription/EventSubscriptionId |Unique identification as assigned by the ASPSP to uniquely identify the callback url resource. |Max40Text | | |
| Url |0..1 |OBEventSubscriptionsResponse1/Data/EventSubscription/Url |Callback URL for a TPP hosted service. Will be used by ASPSPs, in conjunction with the resource name, to construct a URL to send event notifications to. |xs:anyURI | | |
| Version |1..1 |OBEventSubscriptionsResponse1/Data/EventSubscription/Version |Version for the event notification. |Max10Text | | |
| EventTypes |0..n |OBEventSubscriptionsResponse1/Data/EventSubscription/EventTypes |Array of event types the subscription applies to. |OBEventType1Code | | |


## Usage Examples

### Create Event Subscription

#### POST Event Subscription Request

```
POST /event-subscriptions HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-interaction-id: 86ebcd82-8e38-4f2d-a79c-965b41d15865
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
	"CallbackUrl": "https://tpp.com/open-banking/v3.1/event-notifications",
	"Version": "3.1"
  }
}
```

#### POST Event Subscription Response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 86ebcd82-8e38-4f2d-a79c-965b41d15865
Content-Type: application/json
```

```json
{
	"Data": {
		"EventSubscriptionId": "CB-101",
		"CallbackUrl": "https://tpp.com/open-banking/v3.1/event-notifications",
		"Version": "3.1"
	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/event-subscriptions/CB-101"
	},
	"Meta": {}
}
```

### Get Event Subscriptions

#### GET Event Subscription Request

```
GET /event-subscriptions HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-interaction-id: 86ebcd82-8e38-4f2d-a79c-965b41d15865
Accept: application/json
```

#### GET Event Subscription Response

```
GET/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 86ebcd82-8e38-4f2d-a79c-965b41d15865
Content-Type: application/json
```

```json
{
	"Data": {
		"EventSubscription": [{
			"EventSubscriptionId": "CB-101",
			"CallbackUrl": "https://tpp.com/open-banking/v3.1/event-notifications",
			"Version": "3.1"
		}]
	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/event-subscriptions/"
	},
	"Meta": {}
}
```