# Event Notification API Profile - v3.1.6 <!-- omit in toc -->

- [Overview](#overview)
  - [Design Principles](#design-principles)
    - [Security Event Token Alignment](#security-event-token-alignment)
    - [Event Notification Message Signing](#event-notification-message-signing)
    - [SET Aggregation Alignment](#set-aggregation-alignment)
- [Basics](#basics)
  - [Overview](#overview-1)
    - [Steps](#steps)
    - [Sequence Diagram](#sequence-diagram)
  - [Event Types and Extensibility](#event-types-and-extensibility)
  - [Event-Notification Backwards Compatibility](#event-notification-backwards-compatibility)

## Overview

The Event Notification API Profile describes the flows and common functionality to allow a TPP to receive event notifications.

The Event Notification Subscription API Profile and the Callback URL API Profile provide alternative mechanisms for TPPs to register for event notifications.

- The Event Notification Subscription API allows TPPs to register to receive all or specific event types via the Real Time Event Notification API and/or the Aggregated Polling API. 
- The Callback URL API allows TPPs to register to receive a `urn:uk:org:openbanking:events:resource-update` event notification via the Real Time Event Notification API.

Usage of the Event Notification Subscription API is recommended over the Callback URL API for notification registrations.
Note, should an ASPSP choose to provide both APIs for event notification registrations, any registration made using the Event Notification Subscription API supersedes a registration made using the Callback URL API.

This profile should be read in conjunction with the other API profiles which detail the circumstances under which an event notification may be delivered.

Implementation of real-time push Notifications is **optional** for both ASPSPs and TPPs.

### Design Principles

#### Security Event Token Alignment

Event notifications are aligned with the Security Event Token standard, a proposed IETF standard for exchanging information about security events. See [https://tools.ietf.org/html/rfc8417](https://tools.ietf.org/html/rfc8417). An event notification is structured as a JWT, indicating an event has occurred through a set of claims.

A resource-update event (`urn:uk:org:openbanking:events:resource-update`) is used to communicate that a specific resource has been updated. It contains identifiers for the resource and links to retrieve it.

#### Event Notification Message Signing

Event Notifications are signed for non-repudiation using the approach defined in the R/W API specification, with the following difference:

- The JWT's signature (JWS) is sent in the HTTP body of the request, as opposed to a detached JWS sent in the HTTP header.

#### SET Aggregation Alignment

Aggregated polling of Security Event Tokens is aligned with the draft "Poll-Based Security Event Token (SET) Delivery Using HTTP" standard (draft-ietf-secevent-http-poll-01) as defined here: [https://datatracker.ietf.org/doc/draft-ietf-secevent-http-poll/](https://datatracker.ietf.org/doc/draft-ietf-secevent-http-poll/).

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
