# Open Banking Read-Write API Version 3.1.10

The Read/Write Data API specification describes a collection of RESTful APIs that enable TPPs to access information and initiate payments for customers, by connecting to ASPSPs – securely, efficiently, and with customer consent.

The specification is structured as a series of profiles, resources and data models. The structure is intended to give ASPSPs a suite of functionality to meet their regulatory and commercial requirements. ASPSPs implementing aspects of the specification should select a version of the R/W Data API Profile, compatible functional profiles (such as Accounts and Transactions or Payments) and compatible resources.

Details of version compatibility can be found in **profiles** section and specific sub-sections of **resources and data models** section of the specification.

This specification should be read in conjunction with the Customer Experience Guidelines, Operational Guidelines and Management Information Requirements. Together these form the OBIE standard, which should enable any ASPSP which implements the specification to meet their obligations under both the CMA Order and PSD2/RTS.

## Known Issues

The specification must be read in conjunction with the [Known Issues](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/47546479/Known+Specification+Issues).

## Swagger Specification

The Swagger Specification for R/W APIs can be downloaded from the following GitHub Repository:

[https://github.com/OpenBankingUK/read-write-api-specs](https://github.com/OpenBankingUK/read-write-api-specs)

## Change Log
### Version 3.1.10 - FINAL
- CDRW-4132 - v3.1.10 - Minor EAG feedback driven changes

### Version 3.1.10 - Release Candidate 1
- CDRW-4116 - v319_KI12 - include Payments in the scope of event notification
- CDRW-4118 - v319_KI14 - VRP - add PSUInteractionTypes array and PSUInteractionType field (make non required)
- CDRW-4122 - TDA-245 - Article 10a SCA exemption changes - as approved
- CDRW-4122 - TDA-249 - Article 10a SCA exemption changes - as approved
- CDRW-4123 - TDA-246 - Transaction Risk Indicators - as proposed
- CDRW-4124 - v3.1.10 - Correct cardinality of array fields in SVG - additional corrections

### Version 3.1.10 - Draft 1
- CDRW-4102 - v319_KI1  - AISP - update permissions field (AISP: OBReadConsent1)
- CDRW-4103 - v319_KI2  - VRP  - update Instructed amount field
- CDRW-4105 - v319_KI3  - VRP  - Remove revoked status from VRP Consent
- CDRW-4106 - v319_KI4  - VRP  - Remove revoked and expired status from VRP Consent
- CDRW-4107 - v319_KI5  - VRP  - Consents - Clarify access vs Consent revocation
- CDRW-4108 - v319_KI6  - VRP  - OBDomesticVRPConsentResponse make DebtorAccount conditional
- CDRW-4109 - v319_KI7  - VRP  - make MaximumIndividualAmount and PeriodicLimits required
- CDRW-4110 - v319_KI8  - VRP  - Clarification on additional control parameters for non-sweeping
- CDRW-4111 - v319_KI9  - VRP  - remove CreditorAgent and rename PostalAddress under OBDomesticVRPInstruction as CreditorPostalAddress
- CDRW-4112 - v319_KI10 -        Change to make Reference field optional in CoF check as it is optional in the VRP consent request
- CDRW-4114 - v319_KI5a - VRP  - Consents - Clarify access vs Consent revocation - new Event type
- CDRW-4115 - v319_KI11 - VRP  - flatten amount and currency in examples
- CDRW-4116 - v319_KI12 -        include Payments in the scope of event notification
- CDRW-4117 - v319_KI13 -        fix Event Notification link
- CDRW-4118 - v319_KI14 - VRP - add PSUInteractionTypes array and PSUInteractionType field
- CDRW-4125 - v319_KI15 - VRP - Decision 242 - Implement StatusReason and StatusReasonDescription fields
- CDRW-4126 - v319_KI16 - VRP - Decision 243 - Change resource-group to pisp

- CDRW-4122 - v3.1.10 - Article 10a SCA exemption changes

- CDRW-4123 - v3.1.10 - Transaction Risk Indicators
- CDRW-4124 - v3.1.10 - Correct cardinality of array fields in SVG
