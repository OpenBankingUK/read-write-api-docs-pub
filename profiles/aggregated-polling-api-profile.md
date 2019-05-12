# Aggregated Polling Profile <!-- omit in toc -->



## Overview

This specification defines the APIs for an ASPSP to aggregate and deliver multiple signed event notifications to TPPs though the use of polling. It is intended as an alternative or complement to Real Time Notification in that:

* It can be used as the sole method to collect event notifications by a TPP.
* It offers a means to catch-up following a period where the TPP's Real Time Notification endpoint has been offline. 

The payload of the event notifications will be encoded according to the `OBEventNotification2` model.

Implementation of the Aggregated Polling API is **optional** for ASPSPs.

## Basics

### Overview

The steps below provide a general outline of an aggregated notification flow for all resources in the R/W APIs.

#### Steps

Step 1: Initial Polling

This is the first time a TPP calls the ASPSP to poll for events:

* A TPP calls an ASPSP to poll for events.
* The ASPSP responds with an array of awaiting events encoded as signed event notifications.

Step 2a: Acknowledge Only

Following the initial poll the TPP has the option to only acknowledge receipt if they do not wish to receive further events at a given time:

* A TPP calls an ASPSP to acknowledge the event notifications that have been successfully processed.
* If required, the TPP also sends indicators of event notifications which they could not process due to an error.
* The ASPSP responds positively but sends no further events.

Step 2b: Poll and Acknowledge

Following the initial poll the TPP can then repeatedly poll the ASPSP, acknowledging successfully processed event notifications and requesting more:

* A TPP calls an ASPSP to acknowledge the event notifications that have been successfully processed with appropriate parameters to receive more.
* If required, the TPP also sends event notifications which they could not process due to an error.
* The ASPSP responds positively and responds with an array of awaiting event notifications encoded as signed event notifications.

#### Sequence Diagram

![Aggregated Polling](images/AggregatedPolling.png)

<details>
  <summary>Diagram source</summary>
  
  ```
participant TPP
participant ASPSP Authorisation Server
participant ASPSP Event Polling Service

note over TPP, ASPSP Event Polling Service
Step 1: Initial Polling
end note

TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token

TPP -> ASPSP Event Polling Service: Poll for events
ASPSP Event Polling Service -> TPP: HTTP 200 (Zero or more events)

note over TPP, ASPSP Event Polling Service
Step 2a: Acknowledge Only
end note

TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token

TPP -> ASPSP Event Polling Service: Acknowledge events
ASPSP Event Polling Service -> TPP: HTTP 200 (Zero events)

note over TPP, ASPSP Event Polling Service
Step 2b: Poll and Acknowledge
end note

TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token

TPP <-> ASPSP Event Polling Service: Establish TLS 1.2 MA
TPP -> ASPSP Event Polling Service: Acknowledge events
ASPSP Event Polling Service -> TPP: HTTP 200 (Zero or more events)

option footer=bar
```
 
</details>

### Acknowledgement by the TPP

draft-ietf-secevent-http-poll-01 specifies that recipients of event notifications must acknowledge them. This is manifested in one of two ways:

* Through positive acknowledgement in that the event notification has been received and successfully processed.
* Through negative acknowledgement where the event notification has been received but the TPP encountered an error in processing.

ASPSPs can evict positively acknowledged event notifications from their stores. It is implicit that TPPs are responsible for retaining a record of event notifications appropriate to their needs once positively acknowledged.

### Event Recycling Frequency

ASPSPs are responsible for documenting the frequency at which JWT Identifiers will be recycled and reused in their developer portal.

### Polling Frequency

ASPSPs are responsible for documenting the interval at which TPPs should call the polling endpoint and any further restrictions in their developer portal.

### Polling Parameters

TPPs can send two parameters to indicate the polling behaviours:

* The maximum number of events to be transmitted by the ASPSP.
* Whether the ASPSP should return a response immediately, or allow the TPP to maintain a connection to support long polling.

Given the implications of long polling (described [here](https://tools.ietf.org/html/rfc6202#page-4)) supporting long polling is **optional**.

ASPSPs are responsible for documenting in their developer portal any upper bound for the maximum number of events parameter and their support for long polling.

### Security

#### Authentication

ASPSPs must secure their aggregated polling endpoint using MA-TLS.

draft-ietf-secevent-http-poll-01 allows for the use signed event notifications for authentication. The conditions under which this is permissible are not met by the Read/Write API standards, so this approach should not be implemented.

#### Scopes

The access tokens required for accessing the Aggregated Polling API must have at least the following scope:

```
eventpolling: Ability to poll for, acknowledge and receive Security Event Tokens
```

#### Grants Types

Consumers **must** use a client credentials grant to obtain a token to make POST requests to the **events** endpoint. In the specification, this grant type is referred to as "Client Credentials".

## Endpoints
| Resource |HTTP Operation |Endpoint |Mandatory? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| events |POST |POST /events |Optional |eventpolling |Client Credentials |N/A |No |OBEventPolling1 |OBEventPollingResponse1 |


### POST /events

The endpoint allows a TPP to poll for and acknowledge and receive event notifications.

* The POST method allows the TPP to transmit their polling parameters and event notification acknowledgements.
* The ASPSP responds accordingly, sending event notifications as indicated by the TPPs polling parameters.

## Data Model

### Aggregated Polling - Request

The `OBEventPolling1` will be used as the request payload for:

* POST /events

#### UML Diagram

![OBEventPolling1]( images/OBEventPolling1.gif )

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBEventPolling1 |1..1 |OBEventPolling1 | |OBEventPolling1 | | |
| maxEvents |0..1 |OBEventPolling1/maxEvents |Maximum number of events to be returned. A value of zero indicates the ASPSP should not return events even if available |xs:int | | |
| returnImmediately |0..1 |OBEventPolling1/returnImmediately |Indicates whether an ASPSP should return a response immediately or provide a long poll |xs:boolean | | |
| ack |0..n |OBEventPolling1/ack |An array of `jti` values indicating event notifications positively acknowledged by the TPP |Max128Text | | |
| setErrs |0..1 |OBEventPolling1/setErrs |An object that encapsulates all negative acknowledgements transmitted by the TPP |xs:anyType | | |
| `<jti>` |0..n |`OBEventPolling1/setErrs/<jti>` |A event notification error object entitled using the `jti` of the event notification |OBEventError1 | | |
| err |1..1 |`OBEventPolling1/setErrs/<jti>/err` |A value from the IANA "Security Event Token Delivery Error Codes" registry that identifies the error as defined [here](https://tools.ietf.org/id/draft-ietf-secevent-http-push-03.html#error_codes) |Max40Text | | |
| description |1..1 |`OBEventPolling1/setErrs/<jti>/description` |A human-readable string that provides additional diagnostic information |Max256Text | | |


### Aggregated Polling - Response

The `OBEventPollingResponse1` will be used as the response payload for:

* POST /events

#### UML Diagram

![OBEventPollingResponse1](images/OBEventPollingResponse1.gif)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBEventPollingResponse1 |1..1 |OBEventPollingResponse1 | |OBEventPollingResponse1 | | |
| moreAvailable |1..1 |OBEventPollingResponse1/moreAvailable |A JSON boolean value that indicates if more unacknowledged event notifications are available to be returned. |xs:boolean | | |
| sets |1..1 |OBEventPollingResponse1/sets |A JSON object that contains zero or more nested JSON attributes. If there are no outstanding event notifications to be transmitted, the JSON object SHALL be empty. |xs:anyType | | |
| `<jti>` |0..n |`OBEventPollingResponse1/sets/<jti>` |An object named with the `jti` of the event notification to be delivered. The value is the event notification, expressed as a `string`. The payload of the event should be defined in the `OBEventNotification2` format. |xs:string | | |

## Examples

Note for the sake of readability the SETs shown in examples are shorted.

### Poll Only

#### POST /events

Poll Only Request

```
POST /event HTTP/1.1

Authorization: Bearer 7b99f6c331e841dab811176e25d57ca7
Content-Type: application/json
x-fapi-interaction-id: 1af4c0e6b5da49f6b1aebf439e87c199
```

```json 
{
  "returnImmediately": true
}
```

#### POST /events response

Poll Only Response

```
POST /event HTTP/1.1

Content-Type: application/json
x-fapi-interaction-id: 1af4c0e6b5da49f6b1aebf439e87c199
```

```json
{
  "sets": {
    "b6a68c1db7fc4c178fd7d8a41b9ef85c": "eyJhbG...NEysZ4",
    "2644f8cbc8294325ad103ddfc4a5b15d": "eyJhbG...Qssw5c",
    "1fd954d5fb964afb97deee232bb88d1f": "eyJhbG...9kogfI"
  },
  "moreAvailable": false
}
```

### Acknowledge Only

#### POST /events

Acknowledge Only Request

```
POST /event HTTP/1.1

Authorization: Bearer 7b99f6c331e841dab811176e25d57ca7
Content-Type: application/json
x-fapi-interaction-id: 295f6c6c7b2045b2a3e91e4f1c31d681
 
{
  "maxEvents": 0,
  "ack": [ "b6a68c1db7fc4c178fd7d8a41b9ef85c" ]
}
```

#### POST /events response

Acknowledge Only Response

```
POST /event HTTP/1.1

Content-Type: application/json
x-fapi-interaction-id: 295f6c6c7b2045b2a3e91e4f1c31d681
```

```json
{
  "sets": { }
}
```

### Poll and Acknowledge

#### POST /events

Poll and Acknowledge With Errors Request

```
POST /event HTTP/1.1

Authorization: Bearer 7b99f6c331e841dab811176e25d57ca7
Content-Type: application/json
x-fapi-interaction-id: 3fc0df586e45404abd5bbf1b23ce343d
```

```json
{
  "returnImmediately": true,
  "maxEvents": 1,
  "ack": [ "2644f8cbc8294325ad103ddfc4a5b15d" ],
  "setErrs": {
    "1fd954d5fb964afb97deee232bb88d1f": {
      "err": "jwtIss",
      "description": "Issuer is invalid or could not be verified"
    }
  }
}
```

#### POST /events response

Poll and Acknowledge With Errors Response

```
POST /event HTTP/1.1

Content-Type: application/json
x-fapi-interaction-id: 3fc0df586e45404abd5bbf1b23ce343d
```

```json
{
  "sets": {
    "25fd4432da4e4e609033a733aea68a54": "eyJhbG...8o8PLY"
  },
  "moreAvailable": true
}
```