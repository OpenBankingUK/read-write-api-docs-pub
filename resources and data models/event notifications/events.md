# Events - v3.1.2

1. [Overview](#overview)
2. [Endpoints](#endpoints)
   1. [POST /events](#post-events)
3. [Data Model](#data-model)
   1. [Aggregated Polling - Request](#aggregated-polling---request)
      1. [UML Diagram](#uml-diagram)
      2. [Data Dictionary](#data-dictionary)
   2. [Aggregated Polling - Response](#aggregated-polling---response)
      1. [UML Diagram](#uml-diagram-1)
      2. [Data Dictionary](#data-dictionary-1)
   3. [OBEventNotification2](#obeventnotification2)
      1. [UML Diagram](#uml-diagram-2)
      2. [Notes](#notes)
      3. [Data Dictionary](#data-dictionary-2)
   4. [OBEventSubject1](#obeventsubject1)
      1. [UML Diagram](#uml-diagram-3)
      2. [Notes](#notes-1)
      3. [Data Dictionary](#data-dictionary-3)
   5. [OBEventResourceUpdate2](#obeventresourceupdate2)
      1. [UML Diagram](#uml-diagram-4)
      2. [Data Dictionary](#data-dictionary-4)
   6. [OBEventConsentAuthorizationRevoked1](#obeventconsentauthorizationrevoked1)
      1. [UML Diagram](#uml-diagram-5)
      2. [Notes](#notes-2)
      3. [Data Dictionary](#data-dictionary-5)
   7. [OBEventAccountAccessConsentLinkedAccountUpdate1](#obeventaccountaccessconsentlinkedaccountupdate1)
      1. [UML Diagram](#uml-diagram-6)
      2. [Notes](#notes-3)
      3. [Data Dictionary](#data-dictionary-6)
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

### OBEventNotification2

This section describes the OBEventNotification2 class which is used in the Real Time and Aggregated Event Notification API sub-specifications.

Note, the OBEventNotification2 object is aligned with the Security Event Token (https://tools.ietf.org/html/rfc8417). It acts as a wrapper for events contained within the events claim.

#### UML Diagram

![OBEventNotification2](./images/OBEventNotification2.gif)

#### Notes

- The `rid`, `rty` and `rlk` claims are prefixed with the OB namespace `http://openbanking.org.uk` in the data model. The namespace has been removed from the diagram for clarity.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBEventNotification2 |OBEventNotification2 | | |OBEventNotification2 | | |
| iss |1..1 |OBEventNotification2/iss |Issuer. |xs:anyURI | | |
| iat |1..1 |OBEventNotification2/iat |Issued At. |xs:int | | |
| jti |1..1 |OBEventNotification2/jti |JWT ID. |Max128Text | | |
| aud |1..1 |OBEventNotification2/aud |Audience. |Max128Text | | |
| sub |1..1 |OBEventNotification2/sub |Subject. |xs:anyURI | | |
| txn |1..1 |OBEventNotification2/txn |Transaction Identifier. |Max128Text | | |
| toe |1..1 |OBEventNotification2/toe |Time of Event. |xs:int | | |
| events |1..1 |OBEventNotification2/events |Events. |OBEvent2 | | |
| `urn:uk:org:openbanking:events:resource-update` |0..1 |`OBEventNotification2/events/urn:uk:org:openbanking:events:resource-update` |Resource-Update Event. |OBEventResourceUpdate2 | | |
| `urn:uk:org:openbanking:events:account-access-consent-linked-account-update` |0..1 |`OBEventNotification2/events/urn:uk:org:openbanking:events:account-access-consent-linked-account-update` |An event that indicates an account linked to a consent has move in/out of scope of the consent. |OBEventAccountAccessConsentLinkedAccountUpdate1 | | |
| `urn:uk:org:openbanking:events:consent-authorization-revoked` |0..1 |`OBEventNotification2/events/urn:uk:org:openbanking:events:consent-authorization-revoked` |An event that indicates a consent resource has had its authorisation revoked. |OBEventConsentAuthorizationRevoked1 | | |

### OBEventSubject1

This section describes the OBEventSubject1 class which is used in the OBEventResourceUpdate2, OBEventConsentAuthorizationRevoked1 and OBEventAccountAccessConsentLinkedAccountUpdate1 classes.

#### UML Diagram

![OBEventSubject1](./images/OBEventSubject1.gif)

#### Notes

- The `rid`, `rty` and `rlk` claims are prefixed with the OB namespace `http://openbanking.org.uk` in the data model. The namespace has been removed from the diagram for clarity.

- The array of resource links (`http://openbanking.org.uk/rlk`) **must** contain links to all supported versions of the resource.

#### Data Dictionary

| Name |Occurrence |XPath |Enhanced Definition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBEventSubject1 | | | |OBEventSubject1 | | |
| subject_type |1..1 |OBEventSubject1/subject_type |Subject type for the updated resource. |Max128Text |http://openbanking.org.uk/rid_http://openbanking.org.uk/rty | |
| http://openbanking.org.uk/rid |1..1 |OBEventSubject1/http://openbanking.org.uk/rid |Resource Id for the updated resource. |Max128Text | | |
| http://openbanking.org.uk/rty |1..1 |OBEventSubject1/http://openbanking.org.uk/rty |Resource Type for the updated resource. |Max128Text | | |
| http://openbanking.org.uk/rlk |1..n |OBEventSubject1/http://openbanking.org.uk/rlk |Resource links to other available versions of the resource. |OBEventLink1 | | |
| version |1..1 |OBEventSubject1/http://openbanking.org.uk/rlk/version |Resource version. |Max10Text | | |
| link |1..1 |OBEventSubject1/http://openbanking.org.uk/rlk/link |Resource link. |xs:anyURI | | |

### OBEventResourceUpdate2

This section describes the OBEventResourceUpdate2 class which is used in the OBEventNotification2 resource.

#### UML Diagram

![resource-update](./images/resource-update.gif)

#### Data Dictionary

| Name |Occurrence |XPath |Enhanced Definition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| `urn:uk:org:openbanking:events:resource-update` | | |An event that indicates a resource has been updated. |OBEventResourceDescriptor1 | | |
| subject |1..1 |`urn:uk:org:openbanking:events:resource-update/subject` |The subject of the event. |OBEventSubject1 | | |

### OBEventConsentAuthorizationRevoked1

This section describes the OBEventConsentAuthorizationRevoked1 class which is used in the OBEventNotification2 resource.

#### UML Diagram

![OBEventConsentAuthorizationRevoked1](./images/OBEventConsentAuthorizationRevoked1.gif)

#### Notes

For the OBEventConsentAuthorizationRevoked1 object:  

- The subject claim **must** be populated if the Event Notification does not include a `urn:uk:org:openbanking:events:resource-update` event.

#### Data Dictionary

| Name |Occurrence |XPath |Enhanced Definition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| `urn:uk:org:openbanking:events:consent-authorization-revoked` | | |An event that indicates a consent resource has had its authorisation revoked. |OBEventConsentAuthorizationRevoked1 | | |
| reason |0..1 |`urn:uk:org:openbanking:events:consent-authorization-revoked/reason` |Reason for the Consent Authorization Revoked event. |OBExternalEventConsentAuthorizationRevokedReason1Code | | |
| subject |0..1 |`urn:uk:org:openbanking:events:consent-authorization-revoked/subject` |The subject of the event. |OBEventSubject1 | | |

### OBEventAccountAccessConsentLinkedAccountUpdate1

This section describes the OBEventAccountAccessConsentLinkedAccountUpdate1 class which is used in the OBEventNotification2 resource.

#### UML Diagram

![OBEventAccountAccessConsentLinkedAccountUpdate1](./images/OBEventAccountAccessConsentLinkedAccountUpdate1.gif)

#### Notes

For the OBEventAccountAccessConsentLinkedAccountUpdate object: 

- The http://openbanking.org.uk/rty claim **must** be populated with "account-access-consent".

#### Data Dictionary

| Name |Occurrence |XPath |Enhanced Definition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| `urn:uk:org:openbanking:events:account-access-consent-linked-account-update` | | |An event that indicates an account linked to a consent has move in/out of scope of the consent. |OBEventAccountAccessConsentLinkedAccountUpdate1 | | |
| reason |0..1 |`urn:uk:org:openbanking:events:account-access-consent-linked-account-update/reason` |Reason for the Account Access Consent Linked Account Update event. |OBExternalEventAccountAccessConsentLinkedAccountUpdateReason1Code | | |
| subject |1..1 |`urn:uk:org:openbanking:events:account-access-consent-linked-account-update/subject` |The subject of the event. |OBEventSubject1 | | |

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