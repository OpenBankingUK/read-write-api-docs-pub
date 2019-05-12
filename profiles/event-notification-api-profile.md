# Event Notification API Profile <!-- omit in toc -->

1. [Overview](#overview)
   1. [Design Principles](#design-principles)
      1. [Security Event Token Alignment](#security-event-token-alignment)
      2. [Event Notification Message Signing](#event-notification-message-signing)
      3. [SET Aggregation Alignment](#set-aggregation-alignment)
2. [Basics](#basics)
   1. [Overview](#overview-1)
      1. [Steps](#steps)
      2. [Sequence Diagram](#sequence-diagram)
   2. [Event Types and Extensibility](#event-types-and-extensibility)
   3. [Event-Notification Backwards Compatibility](#event-notification-backwards-compatibility)
3. [Data Model](#data-model)
   1. [Reused Classes](#reused-classes)
      1. [OBEventNotification2](#obeventnotification2)
      2. [UML Diagram](#uml-diagram)
      3. [Data Dictionary](#data-dictionary)
      4. [OBEventSubject1](#obeventsubject1)
      5. [OBEventResourceUpdate2](#obeventresourceupdate2)
      6. [OBEventConsentAuthorizationRevoked1](#obeventconsentauthorizationrevoked1)
      7. [OBEventAccountAccessConsentLinkedAccountUpdate1](#obeventaccountaccessconsentlinkedaccountupdate1)

## Overview

The Event Notification API Profile describes the flows and payloads to allow ASPSPs to deliver event notifications to TPPs. The profile has four sub-specifications:

[TODO]

The Event Notification Subscription API and the Callback URL API provide alternative mechanisms for TPPs to register for event notifications.

- The Event Notification Subscription API allows TPPs to register to receive all or specific event types via the Real Time Event Notification API and/or the Aggregated Polling API.
- The Callback URL API allows TPPs to register to receive a `urn:uk:org:openbanking:events:resource-update` event notification via the Real Time Event Notification API.

Note, should an ASPSP choose to provide both APIs for event notification registrations, any registration made using the Event Notification Subscription API supersedes a registration made using the Callback URL API.

This specification should be read in conjunction with the Payments, Accounts, and Confirmation of Funds API specifications. These specifications detail the circumstances under which an event notification may be delivered.

Implementation of the Event Notification API Specification, and its individual sub-specifications, is **optional** for both ASPSPs and TPPs. 

### Design Principles

#### Security Event Token Alignment

Event notifications are aligned with the Security Event Token standard, a proposed IETF standard for exchanging information about security events. See https://tools.ietf.org/html/rfc8417. An event notification is structured as a JWT, indicating an event has occurred through a set of claims.

A resource-update event (`urn:uk:org:openbanking:events:resource-update`) is used to communicate that a specific resource has been updated. It contains identifiers for the resource and links to retrieve it.

#### Event Notification Message Signing

Event Notifications are signed for non-repudiation using the approach defined in the R/W API specification, with the following difference:

- The JWT's signature (JWS) is sent in the HTTP body of the request, as opposed to a detached JWS sent in the HTTP header.

#### SET Aggregation Alignment

Aggregated polling of Security Event Tokens is aligned with the draft "Poll-Based Security Event Token (SET) Delivery Using HTTP" standard (draft-ietf-secevent-http-poll-01) as defined here: https://datatracker.ietf.org/doc/draft-ietf-secevent-http-poll/.

draft-ietf-secevent-http-poll-01 imposes the following constraints on the underlying SETs:

- They are JSON Web Signatures.
- They must implement the `jti` claim (JWT Identifier).

JSON API is not implemented for consistency with draft-ietf-secevent-http-poll-01.

## Basics

### Overview

The steps and sequence diagram below provide a general outline of a notification flow for all resources in the R/W APIs.

In this outline TPP registration for event notifications is performed using the Event Notification Subscription API.

#### Steps

Step 1: Setup Event Notification Subscription

- This flow begins with a TPP creating an **event-subscription** resource with an ASPSP. This may optionally contain a callback url, and a series of event types.

Step 2: Deliver Event Notification

- An event corresponding to one of an ASPSP's event types occurs on a resource.

Step 2a: ASPSP Sends Real Time Event Notification

- A TPP must have provided a callback URL with the event-subscription resource in order to receive the real time event notification.
- The ASPSP sends a signed event notification to the callback URL, detailing the nature of the event and identifying the affected resource.
- The TPP may optionally initiate a client credential grant to retrieve the resource using the details contained in the event notification.

Step 2b: TPP Requests Event Notifications

- A TPP may request event notifications using aggregated polling.

Step 3: Retrieve/Update/Delete Event Notification Subscription

- A TPP may Retrieve/Update/Delete the event notification subscription.

#### Sequence Diagram

![](./images/EventNotifications(Full).png)

<details>
  <summary>Diagram source</summary>

```
participant TPP
participant ASPSP Authorisation Server
participant ASPSP Resource Server
participant ASPSP Notification Service
participant ASPSP Event Polling Service

note over TPP, ASPSP Event Polling Service
Step 1: Setup Event Notification Subscription
end note

TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token
TPP <-> ASPSP Resource Server: Establish TLS 1.2 MA
TPP -> ASPSP Resource Server: POST /event-subscriptions
ASPSP Resource Server -> TPP: HTTP 201 (Created),  EventSubscriptionId

note over TPP, ASPSP Event Polling Service
 Step 2: Deliver Event Notification
end note


alt 2a. ASPSP Sends Real Time Event Notification

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
end note

opt If TPP requires full resource

note right of TPP
URL for resource contained in the
EventNotification rlk (resource links) claim
end note

TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token

TPP <-> ASPSP Resource Server: Establish TLS 1.2 MA
TPP -> ASPSP Resource Server: GET Resource
ASPSP Resource Server -> TPP: HTTP 200 (OK),  Resource

end opt

else 2b. TPP Requests Event Notifications

TPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
TPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> TPP: access-token

TPP <-> ASPSP Event Polling Service: Establish TLS 1.2 MA
TPP -> ASPSP Event Polling Service: Acknowledge events
ASPSP Event Polling Service -> TPP: HTTP 200 (Zero or more events)

end

note over TPP, ASPSP Event Polling Service
Step 3: Retrieve/Update/Delete Event Notification Configuration
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

### Event Types and Extensibility

The specification defines a number of namespaced event types corresponding to individual event notifications.

ASPSPs **may** define their own custom Events (together with a corresponding namespaced event type) consistent with the principles and conventions outlined in the specification.

ASPSPs **must** document all supported events types on their developer documentation.

### Event-Notification Backwards Compatibility

TPPs may have implemented the event-notification resource defined in v3.1 or v3.1.1 of the Event Notification API Specification. A TPP implementation limited to this resource would only be able to receive event-notifications for the `urn:uk:org:openbanking:events:resource-update` event. In order to receive backwards compatible v3.1.2 event-notifications, TPPs **must** restrict the events they receive to the `urn:uk:org:openbanking:events:resource-update` event using one of the following methods:

- Registering via the callback-url resource, implicitly limiting event types to `urn:uk:org:openbanking:events:resource-update`.
- Registering via the event-subscription resource with the Version set to 3.1.1, implicitly limiting events to `urn:uk:org:openbanking:events:resource-update`.
- Registering via the event-subscription resource. The Version element should be set to 3.1.2 and the EventTypes array limited to the value UK.OBIE.Resource-Update, explicitly limiting events to `urn:uk:org:openbanking:events:resource-update`.

## Data Model

### Reused Classes

#### OBEventNotification2

This section describes the OBEventNotification2 class which is used in the Real Time and Aggregated Event Notification API sub-specifications.

Note, the OBEventNotification2 object is aligned with the Security Event Token (https://tools.ietf.org/html/rfc8417). It acts as a wrapper for events contained within the events claim.

#### UML Diagram

![OBEventNotification2](./images/OBEventNotification2.gif)

##### Notes

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

#### OBEventSubject1

This section describes the OBEventSubject1 class which is used in the OBEventResourceUpdate2, OBEventConsentAuthorizationRevoked1 and OBEventAccountAccessConsentLinkedAccountUpdate1 classes.

##### UML Diagram

![OBEventSubject1](./images/OBEventSubject1.gif)

##### Notes

- The `rid`, `rty` and `rlk` claims are prefixed with the OB namespace `http://openbanking.org.uk` in the data model. The namespace has been removed from the diagram for clarity.

- The array of resource links (`http://openbanking.org.uk/rlk`) **must** contain links to all supported versions of the resource.

##### Data Dictionary

| Name |Occurrence |XPath |Enhanced Definition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBEventSubject1 | | | |OBEventSubject1 | | |
| subject_type |1..1 |OBEventSubject1/subject_type |Subject type for the updated resource. |Max128Text |http://openbanking.org.uk/rid_http://openbanking.org.uk/rty | |
| http://openbanking.org.uk/rid |1..1 |OBEventSubject1/http://openbanking.org.uk/rid |Resource Id for the updated resource. |Max128Text | | |
| http://openbanking.org.uk/rty |1..1 |OBEventSubject1/http://openbanking.org.uk/rty |Resource Type for the updated resource. |Max128Text | | |
| http://openbanking.org.uk/rlk |1..n |OBEventSubject1/http://openbanking.org.uk/rlk |Resource links to other available versions of the resource. |OBEventLink1 | | |
| version |1..1 |OBEventSubject1/http://openbanking.org.uk/rlk/version |Resource version. |Max10Text | | |
| link |1..1 |OBEventSubject1/http://openbanking.org.uk/rlk/link |Resource link. |xs:anyURI | | |

#### OBEventResourceUpdate2

This section describes the OBEventResourceUpdate2 class which is used in the OBEventNotification2 resource.

##### UML Diagram

![resource-update](./images/resource-update.gif)

##### Data Dictionary

| Name |Occurrence |XPath |Enhanced Definition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| `urn:uk:org:openbanking:events:resource-update` | | |An event that indicates a resource has been updated. |OBEventResourceDescriptor1 | | |
| subject |1..1 |`urn:uk:org:openbanking:events:resource-update/subject` |The subject of the event. |OBEventSubject1 | | |

#### OBEventConsentAuthorizationRevoked1

This section describes the OBEventConsentAuthorizationRevoked1 class which is used in the OBEventNotification2 resource.

##### UML Diagram

![OBEventConsentAuthorizationRevoked1](./images/OBEventConsentAuthorizationRevoked1.gif)

##### Notes

For the OBEventConsentAuthorizationRevoked1 object:  

- The subject claim **must** be populated if the Event Notification does not include a `urn:uk:org:openbanking:events:resource-update` event.

##### Data Dictionary

| Name |Occurrence |XPath |Enhanced Definition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| `urn:uk:org:openbanking:events:consent-authorization-revoked` | | |An event that indicates a consent resource has had its authorisation revoked. |OBEventConsentAuthorizationRevoked1 | | |
| reason |0..1 |`urn:uk:org:openbanking:events:consent-authorization-revoked/reason` |Reason for the Consent Authorization Revoked event. |OBExternalEventConsentAuthorizationRevokedReason1Code | | |
| subject |0..1 |`urn:uk:org:openbanking:events:consent-authorization-revoked/subject` |The subject of the event. |OBEventSubject1 | | |

#### OBEventAccountAccessConsentLinkedAccountUpdate1

This section describes the OBEventAccountAccessConsentLinkedAccountUpdate1 class which is used in the OBEventNotification2 resource.

##### UML Diagram

![OBEventAccountAccessConsentLinkedAccountUpdate1](./images/OBEventAccountAccessConsentLinkedAccountUpdate1.gif)

##### Notes

For the OBEventAccountAccessConsentLinkedAccountUpdate object: 

- The http://openbanking.org.uk/rty claim **must** be populated with "account-access-consent".

##### Data Dictionary

| Name |Occurrence |XPath |Enhanced Definition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| `urn:uk:org:openbanking:events:account-access-consent-linked-account-update` | | |An event that indicates an account linked to a consent has move in/out of scope of the consent. |OBEventAccountAccessConsentLinkedAccountUpdate1 | | |
| reason |0..1 |`urn:uk:org:openbanking:events:account-access-consent-linked-account-update/reason` |Reason for the Account Access Consent Linked Account Update event. |OBExternalEventAccountAccessConsentLinkedAccountUpdateReason1Code | | |
| subject |1..1 |`urn:uk:org:openbanking:events:account-access-consent-linked-account-update/subject` |The subject of the event. |OBEventSubject1 | | |