# Events <!-- omit in toc -->

1. [Overview](#overview)
   1. [Profile Compatibility](#profile-compatibility)
2. [Endpoints](#endpoints)
   1. [POST /events](#post-events)
3. [Data Model](#data-model)
   1. [Aggregated Polling - Request](#aggregated-polling---request)
      1. [UML Diagram](#uml-diagram)
      2. [Data Dictionary](#data-dictionary)
   2. [Aggregated Polling - Response](#aggregated-polling---response)
      1. [UML Diagram](#uml-diagram-1)
      2. [Data Dictionary](#data-dictionary-1)
4. [Usage Examples](#usage-examples)
   1. [Poll Only](#poll-only)
      1. [POST Events Request](#post-events-request)
      2. [POST Events Response](#post-events-response)
   2. [Acknowledge Only](#acknowledge-only)
      1. [POST Events Request](#post-events-request-1)
      2. [POST Events Response](#post-events-response-1)
   3. [Poll and Acknowledge With Errors](#poll-and-acknowledge-with-errors)
      1. [POST Events Request](#post-events-request-2)
      2. [POST Events Response](#post-events-response-2)

## Overview

The Events resource is used by a TPP to retrieve multiple signed event notifications from an ASPSP.

This resource description should be read in conjunction with a compatible Aggregated Polling Profile.

### Profile Compatibility

For a list of profiles compatible with this resource, please see the [Compatibility Matrix]()

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

![OBEventPolling1](images/OBEventPolling1.gif)

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

## Usage Examples

Note for the sake of readability the SETs shown in examples are shorted.

### Poll Only

#### POST Events Request

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

#### POST Events Response

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

#### POST Events Request

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

#### POST Events Response

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

### Poll and Acknowledge With Errors

#### POST Events Request

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

#### POST Events Response

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