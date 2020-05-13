# Payment Initiation API Profile - v3.1.6 <!-- omit in toc -->

- [Overview](#overview)
  - [Document Overview](#document-overview)
  - [Resources](#resources)
  - [Design Principles](#design-principles)
    - [Scheme Agnostic](#scheme-agnostic)
    - [Status Codes](#status-codes)
- [Basics](#basics)
  - [Overview](#overview-1)
    - [Steps](#steps)
    - [Sequence Diagram](#sequence-diagram)
  - [Payment Restrictions](#payment-restrictions)
    - [CutOffDateTime Behaviour](#cutoffdatetime-behaviour)
      - [Reject the Payment-Order](#reject-the-payment-order)
      - [Accept the Payment-Order](#accept-the-payment-order)
  - [Release Management](#release-management)
    - [Payment-Order Consent](#payment-order-consent)
      - [POST](#post)
      - [GET](#get)
    - [Payment-Order Consent (Confirm Funds)](#payment-order-consent-confirm-funds)
      - [GET](#get-1)
    - [Payment-Order Resource](#payment-order-resource)
      - [POST](#post-1)
      - [GET](#get-2)
- [Security & Access Control](#security--access-control)
  - [Scopes](#scopes)
  - [Grants Types](#grants-types)
  - [Consent Authorisation](#consent-authorisation)
    - [Multiple Authorisation](#multiple-authorisation)
    - [Error Condition](#error-condition)
    - [Consent Revocation](#consent-revocation)
    - [Changes to Selected Account](#changes-to-selected-account)
    - [Consent Re-authentication](#consent-re-authentication)
  - [Risk Scoring Information](#risk-scoring-information)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBRisk1](#obrisk1)
      - [UML Diagram](#uml-diagram)
      - [Data Dictionary](#data-dictionary)
    - [OBCharge2](#obcharge2)
      - [UML Diagram](#uml-diagram-1)
      - [Data Dictionary](#data-dictionary-1)
    - [OBAuthorisation1](#obauthorisation1)
      - [UML Diagram](#uml-diagram-2)
      - [Data Dictionary](#data-dictionary-2)
    - [OBMultiAuthorisation1](#obmultiauthorisation1)
      - [UML Diagram](#uml-diagram-3)
      - [Data Dictionary](#data-dictionary-3)
    - [OBDomesticRefundAccount1](#obdomesticrefundaccount1)
      - [UML Diagram](#uml-diagram-4)
      - [Data Dictionary](#data-dictionary-4)
    - [OBInternationalRefundAccount1](#obinternationalrefundaccount1)
      - [UML Diagram](#uml-diagram-5)
      - [Data Dictionary](#data-dictionary-5)
    - [OBWritePaymentDetails1](#obwritepaymentdetails1)
      - [UML Diagram](#uml-diagram-6)
      - [Data Dictionary](#data-dictionary-6)
    - [OBSCASupportData1](#obscasupportdata1)
      - [UML Diagram](#uml-diagram-7)
      - [Data Dictionary](#data-dictionary-7)
  - [Identifier Fields](#identifier-fields)
    - [Merchant Flow](#merchant-flow)
    - [Party to Party Flow](#party-to-party-flow)
  - [Enumerations](#enumerations)
    - [Static Enumerations](#static-enumerations)
    - [ISO Enumerations](#iso-enumerations)
    - [Namespaced Enumerations](#namespaced-enumerations)
- [Alternative and Error Flows](#alternative-and-error-flows)
  - [Idempotent Payment Order Consent](#idempotent-payment-order-consent)
  - [Idempotent Payment Order](#idempotent-payment-order)
  - [Multi-Auth Payment Order Consent](#multi-auth-payment-order-consent)
  - [Reject the Payment Order Consent Creation After CutOffDateTime](#reject-the-payment-order-consent-creation-after-cutoffdatetime)
  - [Reject the Payment Order Creation After CutOffDateTime](#reject-the-payment-order-creation-after-cutoffdatetime)

## Overview

The Payment Initiation API Profile describes the flows and common functionality for the Payment Initiation API, which allows a Payment Initiation Service Provider ('PISP') to:

- Register an intent to **stage** a payment-order consent.
- Optionally confirm available funds for a payment-order
  - Domestic immediate, international immediate and international scheduled (immediate debit) payments only.
- Subsequently **submit** the payment-order for processing.
- Optionally retrieve the status of a payment-order **consent** or payment-order **resource**.

This profile should be read in conjunction with a compatible Read/Write Data API Profile which provides a description of the elements that are common across all the Read/Write Data APIs, and compatible individual resources.

### Document Overview

This document consists of the following parts:

 **Overview:** Provides an overview of the profile.

 **Basics:** Identifies the flows, restrictions and release management.

 **Security & Access Control:** Specifies the means for PISPs and PSUs to authenticate themselves and provide consent.

 **Data Model:** Documents mappings and enumerations that apply to all the end-points.

 **Alternative Flows:** Documents rules for alternative flows.

### Resources

Each of the Payment Initiation API resources are documented in the  [Resources and Data Models/PISP](../resources-and-data-models/pisp/README.md) area of the specification. Each resource is documented with:

- Endpoints
  - The API endpoints available for the resource.
- Data Model
  - Resource definition.
  - UML diagram.
  - Permissions as they relate to accessing the resource.
  - Data dictionary - which defines fields, re-usable classes, mandatory (1..1) or conditional (0..1) as defined in the Design Principles section, and enumerations.
- Usage Examples

### Design Principles

#### Scheme Agnostic

The API has been be designed so that it is agnostic to the underlying payment scheme that is responsible for carrying out the payment.

In doing so, this means we will not design field lengths and payloads to only match the Faster Payments message, and will instead rely on the field lengths and definitions in ISO 20022. Due diligence has been carried out to ensure that the API has the necessary fields to function with Bacs payments as per the agreed scope.

Further mapping guidance has been provided to ensure that differences are understood between the Open Banking Payment API standard, and other message formats in the Domestic Payment Message Formats sub-page.

#### Status Codes

The API uses two status codes that serve two different purposes:

- The HTTP Status Code reflects the outcome of the API call (the HTTP operation on the resource).
- The Status field for the payment-order consent reflects the status of the PSU consent authorisation.
- The Status field for the payment-order resource reflects the status of the payment-order initiation or execution.

## Basics

### Overview

The figure below provides a **general** outline of a payment flow for all payment-order types using the Payment APIs. The payment-order types covered in this profile include:

- Domestic payments.
- Domestic scheduled payments.
- Domestic standing orders.
- International payments.
- International scheduled payments.

The payment-order consent and payment-order resource in the following flow generalises for the different payment-order types. e.g. for a domestic payment, the payment-order consent resource is domestic-payment-consents; and the payment-order resource is domestic-payments.

![Payments Flow](./images/PaymentStatusModelTriangle.png)

#### Steps

Step 1: Agree Payment-Order Initiation

- This flow begins with a PSU consenting to a payment being made. The consent is between the PSU and the PISP.
- The debtor account details can optionally be specified at this stage.

Step 2: Setup Payment-Order Consent

- The PISP connects to the ASPSP that services the PSU's payment account and creates a new **payment-order consent** resource. This informs the ASPSP that one of its PSUs intends to make a **payment-order**. The ASPSP responds with an identifier for the payment-order consent resource (the ConsentId, which is the intent identifier).
- This step is carried out by making a **POST** request to the **payment-order consent** resource.

Step 3: Authorise Consent

- The PISP requests the PSU to authorise the consent. The ASPSP may carry this out by using a *redirection flow* or a *decoupled flow*.
  - In a redirection flow, the PISP redirects the PSU to the ASPSP.
    - The redirect includes the ConsentId generated in the previous step.
    - This allows the ASPSP to correlate the payment order consent that was setup.
    - The ASPSP authenticates the PSU.
    - The PSU selects the debtor account at this stage (if it has not been previously specified in Step 1).
    - The ASPSP updates the state of the payment order consent resource internally to indicate that the consent has been authorised.
    - Once the consent has been authorised, the PSU is redirected back to the PISP.
  - In a decoupled flow, the ASPSP requests the PSU to authorise consent on an  *authentication device* that is separate from the  *consumption device* on which the PSU is interacting with the PISP.
    - The decoupled flow is initiated by the PISP calling a back-channel authorisation request.
    - The request contains a 'hint' that identifies the PSU paired with the consent to be authorised.
    - The ASPSP authenticates the PSU
    - The PSU selects the debtor account at this stage (if it has not been previously specified in Step 1)
    - The ASPSP updates the state of the payment order consent resource internally to indicate that the consent has been authorised.
    - Once the consent has been authorised, the ASPSP can make a callback to the PISP to provide an access token.

Step 4: Confirm Funds (Domestic and International Single Immediate Payments Only)

- Once the PSU is authenticated and authorised the **payment-order-consent** , the PISP can check whether funds are available to make the payment.
- This is carried out by making a **GET** request, calling the **funds-confirmation** operator on the **payment-order-consent** resource.

Step 5: Create Payment-Order

- The PISP creates a **payment-order** resource to indicate that the payment created in the steps above should be submitted for processing.
- This is carried out by making a **POST** request to the appropriate **payment-order** resource.
- The ASPSP returns the identifier for the payment-order resource to the PISP.

Step 6: Get Consent/Payment-Order/Payment-Details Status

- The PISP can check the status of the payment-order consent (with the ConsentId) or payment-order resource (with the payment-order resource identifier) or payment-details(with the payment-order resource identifier) .
- This is carried out by making a **GET** request to the **payment-order consent** or **payment-order** or **payment-details** resource.

#### Sequence Diagram

![](./images/Payments-Flow.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU, ASPSP Resource Server
Step 1: Agree Payment-Order Initiation
end note
PSU -> PISP: Agree payment-order initiation request

note over PSU, ASPSP Resource Server
 Setup Payment-Order Consent
end note
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> PISP: access-token
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /payment-order-consents
state over ASPSP Resource Server: Consent Status: AwaitingAuthorisation
ASPSP Resource Server -> PISP: HTTP 201 (Created),  ConsentId

note over PSU, ASPSP Resource Server
 Step 3: Authorize Consent
end note
alt Redirection (Using authorization code grant)
        PISP -> PSU: HTTP 302 (Found), Redirect (ConsentId)
        PSU -> ASPSP Authorisation Server: Follow redirect (ConsentId)
        PSU <-> ASPSP Authorisation Server: authenticate
        PSU <-> ASPSP Authorisation Server: SCA if required
        PSU <-> ASPSP Authorisation Server: Select debtor account if required
        state over ASPSP Resource Server: Consent Status: Authorised
        ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (authorization-code)
        PSU -> PISP: Follow redirect (authorization-code)
        PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
        PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
        ASPSP Authorisation Server -> PISP: access-token
else Decoupled (Using CIBA)
        PISP -> ASPSP Authorisation Server: POST /bc-authorize (login_hint_token)
        ASPSP Authorisation Server -> PISP: OK

        PSU -> ASPSP Authorisation Server: Authorise (Consent Id)
        PSU <-> ASPSP Authorisation Server: authenticate
        PSU <-> ASPSP Authorisation Server: SCA if required
        PSU <-> ASPSP Authorisation Server: select accounts
        state over ASPSP Resource Server: Consent Status: Authorised

        alt Using callback
                ASPSP Authorisation Server -> PISP: Callback (authorization-code)
                PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
                PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
                ASPSP Authorisation Server -> PISP: access-token
        else Using polling
                PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
                PISP -> ASPSP Authorisation Server: Poll at /token using auth-req-id
                ASPSP Authorisation Server -> PISP: access-token
        end alt
end alt


note over PSU, ASPSP Resource Server
Step 4: Confirm Funds (Domestic and International Single Immediate Payments Only)
end note

opt
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: GET /payment-order-consents/{ConsentId}/funds-confirmation
ASPSP Resource Server -> PISP: HTTP 200 (OK) funds-confirmation resource

end opt

note over PSU, ASPSP Resource Server
Step 5: Create Payment-Order
end note
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /payment-orders
state over ASPSP Resource Server: Consent Status: Consumed
alt Immediate Payment
state over ASPSP Resource Server: Payment Status: Pending
state over ASPSP Resource Server: Payment Status: AcceptedSettlementInProcess
state over ASPSP Resource Server: Payment Status: AcceptedSettlementComplete
else Standing Order or Future Dated Payment
state over ASPSP Resource Server: Payment Status: InitiationPending
state over ASPSP Resource Server: Payment Status: InitiationCompleted
end alt
ASPSP Resource Server -> PISP: HTTP 201 (Created), Payment-Order Id

note over PSU, ASPSP Resource Server
Step 6: Get Payment-Order-Consent/Payment-Order/Payment-details Status
end note

opt payment-order-consent
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: GET /payment-order-consents/{ConsentId}
ASPSP Resource Server -> PISP: HTTP 200 (OK) payment-order-consent resource
end opt

opt payment-order
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: GET /payment-orders/{Payment-Order Id}
ASPSP Resource Server -> PISP: HTTP 200 (OK) payment-order resource
end opt

opt payment-details
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: GET /payment-orders/{Payment-Order Id}/payment-details
ASPSP Resource Server -> PISP: HTTP 200 (OK) payment-details resource
end opt

option footer=bar

```

</details>

### Payment Restrictions

The standard does not provide a uniform set of restrictions for payment-order types that can be supported through this API.

For example, but not limited to:

- The maximum InstructedAmount allowable.
- The domestic-standing-order Frequency patterns supported.
- The maximum future date on a scheduled-payment.

Each ASPSP **must** determine appropriate restrictions that they support based on their individual practices, standards and limitations. These restrictions should be documented on ASPSP developer portals.

An ASPSP **must** reject the payment-order **consent** if the ASPSP is unable to handle the request.

#### CutOffDateTime Behaviour

An ASPSP **may** return the specific CutOffDateTime when responding to a payment-order consent request.

An ASPSP **must** document the behaviour for a payment receipt before and after the CutOffDateTime for a payment-order has elapsed.

Two strategies for handling behaviour are:

- Reject the payment-order (and steps associated with the creation of payment-order) if received after the applicable CutOffDateTime
- Accept the payment-order (and steps associated with the creation of payment-order) if received after the applicable CutOffDateTime

#####  Reject the Payment-Order

In this scenario, the behaviour of payment-order execution is explicit to the PISP and PSU.

- An ASPSP **must** reject the payment-order **consent** if the CutOffDateTime for a specific payment-order type has elapsed.
- An ASPSP **must** reject an authorization request when the underlying intent object is associated with a CutoffDateTime that has elapsed. The ASPSP **must not** issue an access token in such a situation. The ASPSP **must** set the status of the payment-order consent resource to “Rejected”.
- An ASPSP **must** reject the payment-order **resource** if the CutOffDateTime for a specific payment-order type, has been established and has elapsed.
- A PISP **must** ensure that the PSU consent authorisation is completed and the payment-order resource is created before the CutOffDateTime elapses.

For a payment-order **consent** or a payment-order **resource** that has been rejected due to the elapsed CutoffDateTime, the PISP **may** decide to create a corresponding schedule payment endpoint to create a new payment-order consent. E.g. if a PISP attempts to make a BACS payment after 16:00, it would be rejected. The PISP may use the /domestic-scheduled-payment-consents endpoint to create a consent for the same payment for the next working day.

##### Accept the Payment-Order

In this scenario, the behaviour of the payment-order execution is not explicit to the PISP and PSU, and the payment-order will be executed on the next available working day.

- An ASPSP **must** accept the payment-order **consent** if the CutOffDateTime for a specific payment-order type has elapsed.
- An ASPSP **must** accept an authorization request when the underlying intent object is associated with a CutoffDateTime that has elapsed.
- An ASPSP **must** accept the payment-order **resource** if the CutOffDateTime for a specific payment-order type, has been established and has elapsed.
- An ASPSP **may** update the payment-order consent or payment-order **resource** with the CutOffDateTime, ExpectedExecutionDateTime and ExpectedSettlementDateTime, to communicate expected execution behaviour  if the CutOffDateTime has elapsed.

### Release Management

This section overviews the release management and versioning strategy for the Payment Initiation API. It applies to all Payment Order Consent and Payment Order resources, specified in the Endpoints section.

#### Payment-Order Consent

##### POST

- A PISP **must not** create a payment-order consent ConsentId on a newer version and use it to create a payment-order resource in a previous version
  - E.g., A ConsentId created in v3, must not be used to create a v1 PaymentSubmissionId
- A PISP **must not** create a payment-order consent ConsentId on a previous version and use it to create a payment-order resource in a newer version
  - E.g., A PaymentId created in v1, must not be used to create a v3 DomesticPaymentId

##### GET

- A PISP **must not** access a payment-order ConsentId created in a newer version, via a previous version endpoint
  - E.g., A ConsentId created in v3 accessed via a v1 PaymentId
- An ASPSP **may** choose to make ConsentIds accessible across versions
  - E.g., for a PaymentId created in v1, an ASPSP may or may not make it available via v3, as this is a short-lived consent

#### Payment-Order Consent (Confirm Funds)

##### GET

- A PISP **must not** confirm funds using a payment-order-consent ConsentId created in a different version.
  - E.g. A ConsentId created in v3, must not be used to confirm funds on a v1 endpoint.

#### Payment-Order Resource

##### POST

- A PISP **must** use a payment-order consent ConsentId within the same version to create the payment-order resource (in that version)
  - E.g., A v3 payment-order **consent** can only be used to create a payment-order **resource** in v3.
- An ASPSP **must not** allow a PISP to use a ConsentId from a previous version to create a Payment Order in a newer version, and vice versa

##### GET

- A PISP **must** refer to the ASPSP's online Developer Portal for guidelines on accessibility of a payment-order resource in a newer version

- A PISP **must** not access the payment-order resource types introduced in a newer version, on an older version endpoint:
  - E.g., an international-payment created in v3, that is accessed via the v1 payment-submissions endpoint.
- A PISP **must** not access the payment-order resource created in a newer version on an older version endpoint:
  - E.g., for a domestic-payment resource created in v3, access via the v1 payment-submissions endpoint is not permitted.
- An ASPSP **must** document the behaviour on the accessibility of a payment-order resource in a newer version on the ASPSP's online Developer Portal.
- An ASPSP **must** allow access to the payment-order resource created in a previous version on a newer version endpoint (depending on an ASPSP's legal requirement for data retention):
  - E.g., a payment-submission created in v1, must be accessible as a v3 domestic-payment, with sensible defaults for additional fields introduced in v3 (e.g., if an ASPSP must make payment resources available for 7 years).
- In the case where a payment-order type is the same, but the structure has changed in a newer version, sensible defaults may be used, with the ASPSP's Developer Portal clearly specifying the behaviour.
  - E.g., a new field StatusUpdateDateTime was introduced in v3, an ASPSPs must populate this with the last status update time (as the StatusUpdateDateTime is a mandatory field).

## Security & Access Control

### Scopes

The access tokens required for accessing the Payment APIs must have at least the following scope:

```
payments: Generic payment scope
```

### Grants Types

PISPs **must** use a client credentials grant to obtain a token to make POST requests to the payment-order **consent** endpoints. In the specification, this grant type is referred to as "Client Credentials".

PISPs **must** use an authorization code grant using a redirect or decoupled flow to obtain a token to make POST requests to the payment-order **resource** endpoints. This token may also be used to confirm funds on a payment-order **consent** resource. In the specification, this grant type is referred to as "Authorization Code".

PISPs **must** use a client credentials grant to obtain a token to make GET requests (excluding confirming funds).

### Consent Authorisation

OAuth 2.0 scopes are coarse-grained and the set of available scopes are defined at the point of client registration. There is no standard method for specifying and enforcing fine-grained scopes e.g., a scope to enforce payments of a specified amount on a specified date.

A  *consent authorisation* is used to define the fine-grained scope that is granted by the PSU to the PISP.

The PISP **must** begin a payment-order request by creating a **payment-order consent** resource through a **POST** operation. These resources indicate the  _consent_ that the PISP claims it has been given by the PSU. At this stage, the consent is not yet authorised as the ASPSP has not yet verified this claim with the PSU.

The ASPSP responds with a ConsentId. This is the intent-id that is used when initiating the authorization code grant (as described in the Trust Framework).

As part of the authorization code grant:

- The ASPSP authenticates the PSU.
- The ASPSP plays back the consent (registered by the PISP) back to the PSU to get consent authorisation. The PSU may accept or reject the consent in its entirety (but not selectively).
- If the consent did not indicate a debtor account the ASPSP presents the PSU with a list of accounts from which the PSU may select one.

Once these steps are complete, the consent is considered to have been authorised by the PSU.

#### Multiple Authorisation

In a multiple authorisation context, the same consent authorisation steps are followed for the first PSU to authorise or stage the payment-order consent.

In the payment-order consent:

- A PISP **may** request an AuthorisationType for the payment-order (i.e., Single or Any). If a value is not provided, an ASPSP will interpret the AuthorisationType as 'Any'.
- A PISP **may** request a CompletionDateTime for the payment-order authorisation to be complete. If a value is not provided, an ASPSP will interpret the CompletionDateTime as unbounded.
- An ASPSP **must** reject the payment-order consent if the AuthorisationType requested by the PISP does not match the DebtorAccount in the request.
- An ASPSP **must** set the status of the payment-order consent to Rejected, if the AuthorisationType requested by the PISP cannot be satisfied, after PSU Authentication:
  - The ASPSP must respond back with an OAuth error response fields  _**error**_ specified as invalid_request and _**error_description**_ containing an appropriate message.
- An ASPSP **must** restrict the selection of DebtorAccount (in the ASPSP online channel) to accounts that match the AuthorisationType requested by the PISP.

In the payment-order resource:

- An ASPSP **must** respond with the MultiAuthorisation object if the payment-order requires multiple authorisations. The MultiAuthorisation object indicates to the PISP that the payment-order requires multiple authorisations.
- The ASPSP **must** populate the MultiAuthorisation object with the Status of the multiple authorisaitons.
- The ASPSP **may** populate the MultiAuthorisation object with additional details of the multiple authorisation journey including:
  - The number of required authorisations (total required at the start of the multi authorisation journey).
  - The number of authorisations complete.
  - The date and time of the last authorisation update.
  - The date and time that the authorisation flow must be completed.

Once the final authorisation is received by the ASPSP, the ASPSP **may** notify the PISP that the payment-order resource has been fully Authorised using an Event Notification (as described in the Event Notification API Profile and Resources).

#### Error Condition

If the PSU does not complete a successful consent authorisation (e.g., if the PSU has not authenticated successfully), the authorization code grant ends with a redirection to the TPP with an error response as described in [RFC 6749 Section 4.1.2.1](https://tools.ietf.org/html/rfc6749#section-4.1.2.1). The PSU is redirected to the TPP with an error parameter indicating the error that occurred.

#### Consent Revocation

A PSU cannot revoke a payment-order consent once it has been authorized.

This is required to comply with Article 80 of PSD2.

#### Changes to Selected Account

For a payment-order consent, the selected debtor account cannot be changed once the consent has been authorized.

#### Consent Re-authentication

Payment consents are short-lived and cannot be re-authenticated by the PSU.

### Risk Scoring Information

During the design workshops, ASPSPs articulated a need to perform risk scoring on the payments initiated via the Payment API.

Information for risk scoring and assessment will come via:

- FAPI HTTP headers. These are defined in [Section 6.3](http://openid.net/specs/openid-financial-api-part-1-wd-02.html#client-provisions) of the FAPI specification and in the Headers section above.
- Additional fields identified by the industry as business logic security concerns which will be passed in the Risk section of the payload in the JSON object.

These are the set of additional fields in the risk section of the payload for v1.0 which will be specified by the PISP:

- PaymentContextCode.
- MerchantCategoryCode.
- MerchantCustomerIdentification.
- DeliveryAddress.

The PaymentContextCode describes the payment context and can have these values:

- BillPayment.
- EcommerceGoods.
- EcommerceServices.
- Other.
- PartyToParty.

Payments for EcommerceGoods and EcommerceServices will be expected to have a MerchantCategoryCode and MerchantCustomerIdentification populated. Payments for EcommerceGoods will also have the DeliveryAddress populated.

These fields are documented further in the Data Payload section.

## Data Model

### Reused Classes

#### OBRisk1

This section describes the Risk1 class which is reused in the payment-order consent and payment-order resources.

##### UML Diagram

![](./images/OBRisk1.gif)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBRisk1 | |OBRisk1 |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |
| PaymentContextCode |0..1 |OBRisk1/PaymentContextCode |Specifies the payment context |OBExternalPaymentContext1Code |BillPayment<br>EcommerceGoods<br>EcommerceServices<br>Other PartyToParty | |
| MerchantCategoryCode |0..1 |OBRisk1/MerchantCategoryCode |Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction. |Min3Max4Text | | |
| MerchantCustomerIdentification |0..1 |OBRisk1/MerchantCustomerIdentification |The unique customer identifier of the PSU with the merchant. |Max70Text | | |
| DeliveryAddress |0..1 |OBRisk1/DeliveryAddress |Information that locates and identifies a specific address, as defined by postal services or in free format text. |PostalAddress18 | | |
| AddressLine |0..2 |OBRisk1/DeliveryAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, that is presented in free format text. |Max70Text | | |
| StreetName |0..1 |OBRisk1/DeliveryAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBRisk1/DeliveryAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBRisk1/DeliveryAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |1..1 |OBRisk1/DeliveryAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..2 |OBRisk1/DeliveryAddress/CountrySubDivision |Identifies a subdivision of a country, for instance state, region, county. |Max35Text | | |
| Country |1..1 |OBRisk1/DeliveryAddress/Country |Nation with its own government, occupying a particular territory. |CountryCode |^[A-Z]{2,2}$ | |

#### OBCharge2

This section describes the OBCharge2 class - which is reused in the response payloads in the payment-order consent and payment-order resources.

##### UML Diagram

![](./images/OBCharge2.png)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBCharge2 | |OBCharge2 |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| ChargeBearer |1..1 |OBCharge2/ChargeBearer |Specifies which party/parties will bear the charges associated with the processing of the payment transaction. |OBChargeBearerType1Code |BorneByCreditor<br>BorneByDebtor<br>FollowingServiceLevel<br>Shared | |
| Type |1..1 |OBCharge2/Type |Charge type, in a coded form. |OBExternalPaymentChargeType1Code | | |
| Amount |1..1 |OBCharge2/Amount |Amount of money associated with the charge type. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBCharge2/Amount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$\|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBCharge2/Amount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |`^[A-Z]{3,3}$` |

#### OBAuthorisation1

This section describes the OBAuthorisation1 class which is used in the payment-order consent request and payment-order consent response payloads.

##### UML Diagram

![](./images/OBAuthorisation1.gif)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBAuthorisation1 | |OBAuthorisation1 |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| AuthorisationType |1..1 |OBAuthorisation1/AuthorisationType |Type of authorisation flow requested. |OBExternalAuthorisation1Code |Any<br>Single | |
| CompletionDateTime |0..1 |OBAuthorisation1/CompletionDateTime |Date and time at which the requested authorisation flow must be completed. |ISODateTime | | |

#### OBMultiAuthorisation1

This section describes the OBMultiAuthorisation1 class which used in the response payloads of payment-order resources.

##### UML Diagram

![](./images/OBMultiAuthorisation1.gif)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBMultiAuthorisation1 | |OBMultiAuthorisation1 |The multiple authorisation flow response from the ASPSP. |OBMultiAuthorisation1 | | |
| Status |1..1 |OBMultiAuthorisation1/Status |Specifies the status of the authorisation flow in code form. |OBExternalStatus2Code |Authorised<br>AwaitingFurtherAuthorisation<br>Rejected | |
| NumberRequired |0..1 |OBMultiAuthorisation1/NumberRequired |Number of authorisations required for payment order (total required at the start of the multi authorisation journey). |Number | | |
| NumberReceived |0..1 |OBMultiAuthorisation1/NumberReceived |Number of authorisations received. |Number | | |
| LastUpdateDateTime |0..1 |OBMultiAuthorisation1/LastUpdateDateTime |Last date and time at the authorisation flow was updated. |ISODateTime | | |
| ExpirationDateTime |0..1 |OBMultiAuthorisation1/ExpirationDateTime |Date and time at which the requested authorisation flow must be completed. |ISODateTime | | |

#### OBDomesticRefundAccount1

This section describes the OBDomesticRefundAccount1 class which is used in the response payloads of Domestic Payment, Domestic Scheduled Payment and Domestic Standing Order.

##### UML Diagram

![](./images/OBDomesticRefundAccount1.png)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBDomesticRefundAccount1 |1..1 |OBDomesticRefundAccount1 |Unambiguous identification of the refund account to which a refund will be made as a result of the transaction. |OBDomesticRefundAccount1 | | |
| Account |1..1 |OBWritePaymentDetails1/Account |Provides the details to identify an account. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBDomesticRefundAccount1/Account/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomesticRefundAccount1/Account/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBDomesticRefundAccount1/Account/Name |Name of the account, as assigned by the account servicing institution. Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max70Text | | |
| SecondaryIdentification |0..1 |OBDomesticRefundAccount1/Account/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |


#### OBInternationalRefundAccount1

This section describes the OBInternationalRefundAccount1 class which is used in the response payloads of International Payment, International Scheduled Payment and International Standing Order.

##### UML Diagram

![](./images/OBInternationalRefundAccount1.png)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBInternationalRefundAccount1 |1..1 |OBInternationalRefundAccount1 |Unambiguous identification of the refund account to which a refund will be made as a result of the transaction. |OBInternationalRefundAccount1 | | |
| Creditor |0..1 |OBInternationalRefundAccount1/Creditor |Party to which an amount of money is due. |OBPartyIdentification43 | | |
| Name |0..1 |OBInternationalRefundAccount1/Creditor/Name |Name by which a party is known and which is usually used to identify that party. |Max140Text | | |
| PostalAddress |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternationalRefundAccount1/Creditor/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternationalRefundAccount1/Creditor/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| Agent |0..1 |OBInternationalRefundAccount1/Agent |Financial institution servicing an account for the creditor. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBInternationalRefundAccount1/Agent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |0..1 |OBInternationalRefundAccount1/Agent/Identification |Unique and unambiguous identification of a financial institution or a branch of a financial institution. |Max35Text | | |
| Name |0..1 |OBInternationalRefundAccount1/Agent/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| PostalAddress |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternationalRefundAccount1/Agent/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternationalRefundAccount1/Agent/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| Account |1..1 |OBInternationalRefundAccount1/Account |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBInternationalRefundAccount1/Account/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternationalRefundAccount1/Account/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBInternationalRefundAccount1/Account/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max70Text | | |
| SecondaryIdentification |0..1 |OBInternationalRefundAccount1/Account/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |


#### OBWritePaymentDetails1

This section describes the OBWritePaymentDetails1 class which used in the response payloads of payment-detail sub resources.

##### UML Diagram

![](./images/OBWritePaymentDetails1.png)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWritePaymentDetails1 |1..1 |OBWritePaymentDetails1 |Payment status details. |OBWritePaymentDetails1 | | |
| PaymentTransactionId |1..1 |OBWritePaymentDetails1/PaymentTransactionId |Unique identifier for the transaction within an servicing institution. This identifier is both unique and immutable. |Max210Text | | |
| Status |1..1 |OBWritePaymentDetails1/Status |Status of a transfer, as assigned by the transaction administrator. |OBTransactionIndividualExtendedISOStatus1Code |Accepted<br>AcceptedCancellationRequest<br>AcceptedCreditSettlementCompleted<br>AcceptedCustomerProfile<br>AcceptedFundsChecked<br>AcceptedSettlementCompleted<br>AcceptedSettlementInProcess<br>AcceptedTechnicalValidation<br>AcceptedWithChange<br>AcceptedWithoutPosting<br>Cancelled<br>NoCancellationProcess<br>PartiallyAcceptedCancellationRequest<br>PartiallyAcceptedTechnicalCorrect<br>PaymentCancelled<br>Pending<br>PendingCancellationRequest<br>Received<br>Rejected<br>RejectedCancellationRequest | |
| StatusUpdateDateTime |1..1 |OBWritePaymentDetails1/StatusUpdateDateTime |Date and time at which the status was assigned to the transfer. |ISODateTime | | |
| StatusDetail |0..1 |OBWritePaymentDetails1/StatusDetail |Payment status details as per underlying Payment Rail. |OBPaymentStatusDetail1 | | |
| LocalInstrument |0..1 |OBWritePaymentDetails1/StatusDetail/LocalInstrument |User community specific instrument.<br><br>Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code | | |
| Status |1..1 |OBWritePaymentDetails1/StatusDetail/Status |Status of a transfer, as assigned by the transaction administrator. |Max128Text | | |
| StatusReason |0..1 |OBWritePaymentDetails1/StatusDetail/StatusReason |Reason Code provided for the status of a transfer. |OBTransactionIndividualStatusReason1Code |Cancelled<br>PendingFailingSettlement<br>PendingSettlement<br>Proprietary<br>ProprietaryRejection<br>Suspended<br>Unmatched | |
| StatusReasonDescription |0..1 |OBWritePaymentDetails1/StatusDetail/StatusReasonDescription |Reason provided for the status of a transfer. |Max256Text | | |

#### OBSCASupportData1

This section describes the OBSCASupportData1 class, which is used across all  _payment order consent_  request resources, enabling PISPs to provide Supporting Data when requesting ASPSP for SCA Exemption.

##### UML Diagram

![](./images/OBSCASupportData1.gif)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBSCASupportData1 | |SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| RequestedSCAExemptionType |0..1 |SCASupportData/RequestedSCAExemptionType |This field allows a PISP to request specific SCA Exemption for a Payment Initiation |OBExternalSCAExemptionType1Code |BillPayment<br>ContactlessTravel<br>EcommerceGoods<br>EcommerceServices<br>Kiosk<br>Parking<br>PartyToParty | |
| AppliedAuthenticationApproach |0..1 |SCASupportData/AppliedAuthenticationApproach |Specifies a character string with a maximum length of 40 characters.<br><br>Usage: This field indicates whether the PSU was subject to SCA performed by the TPP |OBExternalAppliedAuthenticationApproach1Code |CA<br>SCA | |
| ReferencePaymentOrderId |0..1 |SCASupportData/ReferencePaymentOrderId |Specifies a character string with a maximum length of 140 characters.<br><br>Usage: If the payment is recurring, then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence. |Max128Text | | |

### Identifier Fields

This section describes the identifiers used through the Payment API flows, the direction of flow through the system, and how they are used.

The standard definitions for the elements in the API payloads are described in the Data Payload section. However, this table gives further detail on the business meaning, and how they are used.

| Generated |Identifier |Business Description |
| --- |--- |--- |
| Merchant/PISP Sent in API Payload |EndToEndIdentification |The EndToEndIdentification reference is a reference that can be populated by the debtor (or merchant in the ecommerce space). This reference is important to the debtor (could be an internal reference Id against the transaction), it Is NOT the reference information that will be primarily populated on the statement of the creditor (beneficiary). |
| Merchant/PISP Sent in API Payload |InstructionIdentification |The PISP generates the InstructionIdentification which is a unique transaction Id and passes it to the ASPSP (this is mandatory), but this does not have to go any further in the payment flow. The flow of this identifier needs to align with payment scheme rules.<br><br>The expectation is that this is unique indefinitely across all time periods. The PISP can ensure this is indefinitely unique by including a date or date time element to the field, or by inserting a unique Id. |
| Merchant/PISP Sent in API Payload |RemittanceInformation |The RemittanceInformation is the reference information that the creditor (or beneficiary) will need to reconcile (e.g. Invoice 123). |
| ASPSP / API System |ConsentId |A unique identification as assigned by the ASPSP to uniquely identify the payment-order consent resource. |
| ASPSP / API System |Payment Order Id |Anique identification as assigned by the ASPSP to uniquely identify the payment-order resource.<br><br><li>DomesticPaymentId</li><li>DomesticScheduledPaymentId</li><li>DomesticStandingOrderId</li><li>InternationalPaymentId</li><li>InternationalScheduledPaymentId</li> |
| ASPSP / Payment Scheme |Scheme Payment ID |This is generated by the ASPSP to uniquely identify a payment through a processing scheme. In the case of FPS, this is the FPID. |

The tables below identify the actor that initially creates each of the message identifiers and their transmission and visibility to other actors.

These flows are indicative and will be dependent on what payment schemes or agencies are able to support.

Key:

- O indicates the actor that creates the identifier.
- **=>** downstream direction of flow
- **<=** upstream direction of flow

#### Merchant Flow

| Identifier |PSU |Merchant |PISP |ASPSP Originating Bank |Payment Scheme |Beneficiary |
| --- |--- |--- |--- |--- |--- |--- |
| EndToEndIdentification | |O |=> |=> |=> |=> |
| RemittanceInformation | |O |=> |=> |=> |=> |
| InstructionIdentification | | |O |=> | | |
| ConsentId | | |<= |O | | |
| Payment Order Id | | |<= |O | | |
| Scheme Payment ID (e.g., FPID) | | | |O |=> |=> |

#### Party to Party Flow

| Identifier |PSU |Merchant |PISP |ASPSP Originating Bank |Payment Scheme |Beneficiary |
| --- |--- |--- |--- |--- |--- |--- |
| EndToEndIdentification | | |O |=> |=> |=> |
| RemittanceInformation |O | |=> |=> |=> |=> |
| InstructionIdentification | | |O |=> | | |
| ConsentId | | |<= |O | | |
| Payment Order Id | | |<= |O | | |
| Scheme Payment ID (e.g., FPID) | | | |O |=> |=> |

### Enumerations

#### Static Enumerations

This section gives the definitions for enumerations used in the Payment APIs.

| Code Class |Name |Definition |
| --- |--- |--- |
| OBExternalPaymentContext1Code |BillPayment |The context of the payment initiation is a bill payment. |
| OBExternalPaymentContext1Code |EcommerceGoods |The context of the payment initiation is for goods via an ecommerce channel. |
| OBExternalPaymentContext1Code |EcommerceServices |The context of the payment initiation is for services via an ecommerce channel. |
| OBExternalPaymentContext1Code |PartyToParty |The context of the payment initiation is a party to party payment. |
| OBExternalPaymentContext1Code |Other |The context of the payment initiation is of an other type. |
| OBTransactionIndividualStatus1Code |AcceptedSettlementCompleted |Settlement on the debtor's account has been completed.<br><br>Usage : this can be used by the first agent to report to the debtor that the transaction has been completed. Warning : this status is provided for transaction status reasons, not for financial information. It can only be used after bilateral agreement.<br><br>PISPs **must not** use this status as confirmation that settlement is complete on the creditor's account. |
| OBTransactionIndividualStatus1Code |AcceptedSettlementInProcess |All preceding checks such as technical validation and customer profile were successful and therefore the payment initiation has been accepted for execution. |
| OBTransactionIndividualStatus1Code |Pending |Payment initiation or individual transaction included in the payment initiation is pending. Further checks and status update will be performed. |
| OBTransactionIndividualStatus1Code |Rejected |Payment initiation or individual transaction included in the payment initiation has been rejected. |
| OBTransactionIndividualStatus1Code |AcceptedWithoutPosting |Payment instruction included in the credit transfer is accepted without being posted to the creditor customer's account. |
| OBTransactionIndividualStatus1Code |AcceptedCreditSettlementCompleted |Settlement on the creditor's account has been completed. |
| OBExternalConsentStatus1Code |AwaitingAuthorisation |The consent resource is awaiting PSU authorisation. |
| OBExternalConsentStatus1Code |Rejected |The consent resource has been rejected. |
| OBExternalConsentStatus1Code |Authorised |The consent resource has been successfully authorised. |
| OBExternalConsentStatus1Code |Consumed |The consented action has been successfully completed. This does not reflect the status of the consented action. |
| OBChargeBearerType1Code |BorneByCreditor |All transaction charges are to be borne by the creditor. |
| OBChargeBearerType1Code |BorneByDebtor |All transaction charges are to be borne by the debtor. |
| OBChargeBearerType1Code |FollowingServiceLevel |Charges are to be applied following the rules agreed in the service level and/or scheme. |
| OBChargeBearerType1Code |Shared |In a credit transfer context, means that transaction charges on the sender side are to be borne by the debtor, transaction charges on the receiver side are to be borne by the creditor. In a direct debit context, means that transaction charges on the sender side are to be borne by the creditor, transaction charges on the receiver side are to be borne by the debtor. |
| OBExternalAuthorisation1Code |Any |Any authorisation type is requested. |
| OBExternalAuthorisation1Code |Multiple |Multiple authorisation type is requested. |
| OBExternalAuthorisation1Code |Single |Single authorisation type is requested. |
| OBExternalStatus1Code |InitiationCompleted |The payment-order initiation has been completed. |
| OBExternalStatus1Code |InitiationFailed |The payment-order initiation has failed. |
| OBExternalStatus1Code |InitiationPending |The payment-order initiation is pending. |
| OBExternalStatus2Code |Authorised |The multiple authorisation flow has been fully authorised. |
| OBExternalStatus2Code |AwaitingFurtherAuthorisation |The multiple authorisation flow is awaiting further authorisation. |
| OBExternalStatus2Code |Rejected |The multiple authorisation flow has been rejected. |
| OBExternalStatus3Code |InitiationCompleted |The payment-order initiation has been completed. |
| OBExternalStatus3Code |InitiationFailed |The payment-order initiation has failed. |
| OBExternalStatus3Code |InitiationPending |The payment-order initiation is pending. |
| OBExternalStatus3Code |Cancelled |Payment initiation has been successfully cancelled after having received a request for cancellation. |
| OBExchangeRateType2Code |Actual |Exchange rate is the actual rate. |
| OBExchangeRateType2Code |Agreed |Exchange rate is the agreed rate between the parties. |
| OBExchangeRateType2Code |Indicative |Exchange rate is the indicative rate. |
| OBPriority2Code |Normal |Priority is normal. |
| OBPriority2Code |Urgent |Priority is urgent. |
| OBAddressTypeCode |Business |Address is the business address. |
| OBAddressTypeCode |Correspondence |Address is the address where correspondence is sent. |
| OBAddressTypeCode |DeliveryTo |Address is the address to which delivery is to take place. |
| OBAddressTypeCode |MailTo |Address is the address to which mail is sent. |
| OBAddressTypeCode |POBox |Address is a postal office (PO) box. |
| OBAddressTypeCode |Postal |Address is the complete postal address. |
| OBAddressTypeCode |Residential |Address is the home address. |
| OBAddressTypeCode |Statement |Address is the address where statements are sent. |
| OBTransactionIndividualExtendedISOStatus1Code |Accepted |Request is accepted. |
| OBTransactionIndividualExtendedISOStatus1Code |AcceptedCancellationRequest |Cancellation is accepted. |
| OBTransactionIndividualExtendedISOStatus1Code |AcceptedCreditSettlementCompleted |Settlement on the creditor's account has been completed. |
| OBTransactionIndividualExtendedISOStatus1Code |AcceptedCustomerProfile |Preceding check of technical validation was successful. Customer profile check was also successful. |
| OBTransactionIndividualExtendedISOStatus1Code |AcceptedFundsChecked |Preceding check of technical validation and customer profile was successful and an automatic funds check was positive. |
| OBTransactionIndividualExtendedISOStatus1Code |AcceptedSettlementCompleted |Settlement on the debtor's account has been completed.<br><br>Usage : this can be used by the first agent to report to the debtor that the transaction has been completed.<br><br>Warning : this status is provided for transaction status reasons, not for financial information. It can only be used after bilateral agreement |
| OBTransactionIndividualExtendedISOStatus1Code |AcceptedSettlementInProcess |All preceding checks such as technical validation and customer profile were successful and therefore the payment initiation has been accepted for execution. |
| OBTransactionIndividualExtendedISOStatus1Code |AcceptedTechnicalValidation |Authentication and syntactical and semantical validation are successful |
| OBTransactionIndividualExtendedISOStatus1Code |AcceptedWithChange |Instruction is accepted but a change will be made, such as date or remittance not sent. |
| OBTransactionIndividualExtendedISOStatus1Code |AcceptedWithoutPosting |Payment instruction included in the credit transfer is accepted without being posted to the creditor customer’s account. |
| OBTransactionIndividualExtendedISOStatus1Code |Cancelled |Request is cancelled. |
| OBTransactionIndividualExtendedISOStatus1Code |NoCancellationProcess |No cancellation process. |
| OBTransactionIndividualExtendedISOStatus1Code |PartiallyAcceptedCancellationRequest |Cancellation is partially accepted. |
| OBTransactionIndividualExtendedISOStatus1Code |PartiallyAcceptedTechnicalCorrect |Authentication and syntactical and semantical validation are successful. |
| OBTransactionIndividualExtendedISOStatus1Code |PaymentCancelled |Transaction has been cancelled. |
| OBTransactionIndividualExtendedISOStatus1Code |Pending |Payment initiation or individual transaction included in the payment initiation is pending. Further checks and status update will be performed. |
| OBTransactionIndividualExtendedISOStatus1Code |PendingCancellationRequest |Cancellation request is pending. |
| OBTransactionIndividualExtendedISOStatus1Code |Received |Payment initiation has been received by the receiving agent. |
| OBTransactionIndividualExtendedISOStatus1Code |Rejected |Payment initiation or individual transaction included in the payment initiation has been rejected. |
| OBTransactionIndividualExtendedISOStatus1Code |RejectedCancellationRequest |Cancellation request is rejected |
| OBTransactionIndividualStatusReason1Code |Cancelled |Reason why the payment status is cancelled |
| OBTransactionIndividualStatusReason1Code |PendingFailingSettlement |Reason why the payment status is pending (failing settlement). |
| OBTransactionIndividualStatusReason1Code |PendingSettlement |Reason why the payment status is pending (settlement). |
| OBTransactionIndividualStatusReason1Code |Proprietary |Defines a free text proprietary reason. |
| OBTransactionIndividualStatusReason1Code |ProprietaryRejection |Defines the reason that has been used by the Local Instrument system to reject the transaction |
| OBTransactionIndividualStatusReason1Code |Suspended |Reason why the payment status is suspended. |
| OBTransactionIndividualStatusReason1Code |Unmatched |Reason why the payment status is unmatched. |
| OBExternalSCAExemptionType1Code |BillPayment |Bill Payment |
| OBExternalSCAExemptionType1Code |ContactlessTravel |Contactless Travel |
| OBExternalSCAExemptionType1Code |EcommerceGoods |Ecommerce Goods |
| OBExternalSCAExemptionType1Code |EcommerceServices |Ecommerce Services |
| OBExternalSCAExemptionType1Code |Kiosk |Kisok |
| OBExternalSCAExemptionType1Code |Parking |Parking |
| OBExternalSCAExemptionType1Code |PartyToParty |Party To Party |
| OBExternalAppliedAuthenticationApproach1Code |CA |Single Factor Strong Customer Authentication |
| OBExternalAppliedAuthenticationApproach1Code |SCA |Multi Factor Strong Customer Authentication |
| OBReadRefundAccount1Code |Yes |Yes |
| OBReadRefundAccount1Code |No |No |

#### ISO Enumerations

These following ISO Enumerations are used in the Payment APIs.

| ISO Data Type |Fields |ISO Enumeration Values URL |
| --- |--- |--- |
| Min3Max4Text |MerchantCategoryCode |https://www.iso.org/standard/33365.html |
| ActiveOrHistoricCurrencyCode |Currency |https://www.iso20022.org/external_code_list.page |
| CountryCode |Country |https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements |

#### Namespaced Enumerations

The enumerated values specified by Open Banking are documented in Swagger specification and Namespaced Enumerations page.

## Alternative and Error Flows

### Idempotent Payment Order Consent

Note: this flow has been generalised for all payment-order types.

![](./images/Idempotent-Payment-Order-Consent.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU, ASPSP Resource Server
Step 2: Setup Payment Order Consent (generalised for all payment orders)
end note
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> PISP: token
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /payment-order-consents (x-idempotency-key={pisp-guid-1})
ASPSP Resource Server -> ASPSP Resource Server: Create new resource (ConsentId=1001)
alt unexpected failure
PISP -> ASPSP Resource Server: POST /payment-order-consents (x-idempotency-key={pisp-guid-1})
note right of ASPSP Resource Server
    The resource server recognizes that
    this is the same request as earlier.
    A new resource is not created.
    The ConsentId remains the same (e.g. 1001) as above.
    The status of the resource may be different if it has changed.

    This operation can be retried multiple times if required.
end note
end alt

ASPSP Resource Server -> PISP: HTTP 201(Created), ConsentId=1001
PISP -> PSU: Redirect (ConsentId)

option footer=bar
```

</details>

### Idempotent Payment Order

Note: this flow has been generalised for all payment-order types.

![](./images/IdempotentPaymentOrder.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU, ASPSP Resource Server
 Step 4: Create payment-order (generalised for all payment orders)
end note
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /payment-orders ConsentId = 1001, x-idempotency-key={pisp-guid-2}

alt PISP attempts to POST to /payment-orders with same ConsentId
PISP -> ASPSP Resource Server: POST /payment-orders ConsentId = 1001, x-idempotency-key={pisp-guid-2}
ASPSP Resource Server -> PISP: HTTP 201 (Created), PaymentOrderId

note right of ASPSP Resource Server
    The resource server recognizes that this
    is the same request as earlier.
    A new resource is not created.
    The PaymentOrderId remains the same as above.
    The status of the resource may be different if it has changed.

    The operation can be retried multiple times if required.
end note
end alt
option footer=bar
```

</details>

### Multi-Auth Payment Order Consent

![](./images/Multi-Auth-Payment-Order-Consent.png)

<details>
  <summary>Diagram source</summary>

```
autonumber

participant PSU Initial Authoriser
participant PSU Final Authoriser
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU Initial Authoriser, ASPSP Resource Server
Step 1: Agree domestic payment Initiation
end note
PSU Initial Authoriser -> PISP: Agree domestic payment initiation request

note over PSU Initial Authoriser, ASPSP Resource Server
 Step 2: Setup Payment-Order Consent
end note
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Initiate Client Credential Grant
ASPSP Authorisation Server -> PISP: access-token
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-payment-consents
state over ASPSP Resource Server: Consent Status: AwaitingAuthorisation
ASPSP Resource Server -> PISP: HTTP 201 (Created),ConsentId
PISP -> PSU Initial Authoriser: HTTP 302 (Found),Redirect (ConsentId)

note over PSU Initial Authoriser, ASPSP Resource Server
 Step 3: Authorize Consent - Initial Authoriser
end note
PSU Initial Authoriser -> ASPSP Authorisation Server: Follow redirect (ConsentId)
PSU Initial Authoriser <-> ASPSP Authorisation Server: Authenticate (SCA if required) and Authorise consent
state over ASPSP Resource Server: Consent Status: Authorised
ASPSP Authorisation Server -> PSU Initial Authoriser: HTTP 302 (Found), Redirect (authorization-code)
PSU Initial Authoriser -> PISP: Follow redirect (authorization-code)
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
ASPSP Authorisation Server -> PISP: access-token

note over PSU Initial Authoriser, ASPSP Resource Server
Step 4: Create Payment-Order
end note
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-payments
ASPSP Resource Server -> PISP: HTTP 201 (Created) DomesticPaymentId
state over ASPSP Resource Server: Consent Status: Consumed
state over ASPSP Resource Server: Payment Status: Pending
state over ASPSP Resource Server: MultiAuthorisation Status: AwaitingFurtherAuthorisation

note over PSU Initial Authoriser, ASPSP Resource Server
 Step 5: Authorize Consent - Final Authoriser
end note

PSU Final Authoriser -> ASPSP Authorisation Server: Authenticate (SCA if required) and Authorise consent

state over ASPSP Resource Server: MultiAuthorisation Status: Authorised
state over ASPSP Resource Server: Payment Status: AcceptedSettlementInProcess
state over ASPSP Resource Server: Payment Status: AcceptedSettlementComplete

    alt If PISP has registered a URL for event notification
        ASPSP Resource Server -> PISP: POST /event-notifications
        PISP -> ASPSP Resource Server: HTTP 200 (OK)
        PISP -> ASPSP Resource Server: GET /domestic-payments/{DomesticPaymentId}
        ASPSP Resource Server -> PISP: HTTP 200 (OK) domestic-payment resource
    else PISP may poll payment order status
        loop
            PISP -> ASPSP Resource Server: GET /domestic-payments/{DomesticPaymentId}
            ASPSP Resource Server -> PISP: HTTP 200 (OK) domestic-payment resource
        end
    end

option footer=bar
```
</details>

### Reject the Payment Order Consent Creation After CutOffDateTime

This example illustrates a scenario where an ASPSP choses to Reject the Payment-Order consent/resource request, after the CutoffTime. We have a CHAPS payment-order consent created after the CutOffDateTime, and ASPSP rejects the Consent, and the PISP chooses to place a Scheduled Payment-Order consent.

![](./images/CHAPS-SIP-AfterCutoffTime.png)

<details>
  <summary>Diagram source</summary>

```
autonumber
participant PSU
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU, ASPSP Resource Server
Step 1: Agree Domestic Payment-Order initiation
end note
PSU <-> PISP: Initiate a funds transfer
PSU -> PISP: Select debtor and creditor accounts

note over PSU, ASPSP Resource Server
Step 2: Setup Domestic Payment Consent
end note
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> PISP: access-token
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-payment-consents
note over PISP, ASPSP Resource Server
CHAPS Payment cutoff time expired, so consent initiation is rejected
end note
ASPSP Resource Server -> PISP: HTTP 400 (BAD_REQUEST)
PISP -> PSU: Try setting up a Scheduled Payment

note over PSU, ASPSP Resource Server
Step 3: Setup Domestic Scheduled Payment Consent
end note

note over PSU, ASPSP Resource Server
Step 4: Authorize consent
end note

note over PSU, ASPSP Resource Server
Step 5: Create Domestic Scheduled Payment-Order
end note

note over PSU, ASPSP Resource Server
Step 6: Get Domestic Scheduled Payment-Order status
end note
option footer=bar
```

</details>

### Reject the Payment Order Creation After CutOffDateTime

This example illustrates a scenario where an ASPSP choses to Reject the Payment-Order consent/resource request, after the CutoffTime. We have a CHAPS payment-order Consent created and the Authorisation completed before the CutOffDateTime, but the Payment-Order submission happened after the CutOffDateTime, so the ASPSP has rejected it.

![](./images/CHAPS-SIPO-AfterCutoffTime-2.png)

<details>
  <summary>Diagram source</summary>

```
autonumber
participant PSU
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU, ASPSP Resource Server
Step 1: Agree Domestic Payment-Order initiation
end note
PSU <-> PISP: Initiate a funds transfer
PSU -> PISP: Select debtor and creditor accounts

note over PSU, ASPSP Resource Server
Step 2: Setup Domestic Payment-Order Consent
end note
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> PISP: access-token
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-payment-consents
ASPSP Resource Server -> PISP: HTTP 201 (Created), ConsentId
PISP -> PSU: HTTP 302 (Found), Redirect (ConsentId)

note over PSU, ASPSP Resource Server
Step 3: Authorize consent
end note
PSU -> ASPSP Authorisation Server: Follow redirect (ConsentId)
PSU <-> ASPSP Authorisation Server: authenticate
PSU <-> ASPSP Authorisation Server: SCA if required
ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (authorization-code)
PSU -> PISP: Follow redirect (authorization-code)
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
ASPSP Authorisation Server -> PISP: access-token

note over PSU, ASPSP Resource Server
Step 4: Create Domestic Payment-Order
end note
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
note over PISP, ASPSP Authorisation Server
Delay in Redirection or
User spent too long to Authorise or
PISP took too long to submit Payment Order,
leading to Expiry of CHAPS Cutoff Time
end note

PISP -> ASPSP Resource Server: POST /domestic-payments
ASPSP Resource Server -> PISP: HTTP 400 (BAD_REQUEST)
PISP -> PSU: Try setting up a Scheduled Payment

note over PSU, ASPSP Resource Server
Step 5: Setup Domestic Scheduled Payment Consent
end note

option footer=bar
```

</details>
