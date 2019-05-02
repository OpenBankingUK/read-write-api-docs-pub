# Open Banking Read-Write API

## Overview
The Read/Write Data API specification describes a collection of RESTful APIs that enable TPPs to access information and initiate payments for customers, by connecting to ASPSPs – securely, efficiently, and with customer consent.

The specification is structured as a series of profiles, resources and data models. The structure is intended to give ASPSPs a suite of functionality to meet their regulatory and commercial requirements. ASPSPs implementing aspects of the specification should select a version of the R/W Data API Profile, compatible functional profiles (such as Accounts and Transactions or Payments) and compatible resources.

Details of version compatibility can be found on each individual profile or resource page under the Profile Compatibility section.

- [Profiles](./profiles/readme.md)
  - [v3.1.2](./profiles/v3.1.2/readme.md)
    - [Read/Write Data API Profile - v3.1.2](./profiles/v3.1.2/read-write data api profile - v3.1.2/readme.md)
    - [Account and Transaction API Profile - v3.1.2](./profiles/v3.1.2/account and transaction api profile - v3.1.2/readme.md)
    - [Payment Initiation API Profile - v3.1.2](./profiles/v3.1.2/payment initiation api profile - v3.1.2/readme.md)
    - [Confirmation of Funds API Profile - v3.1.2](./profiles/v3.1.2/confirmation of funds api profile - v3.1.2/readme.md)
    - [Event Notification API Profile - v3.1.2](./profiles/v3.1.2/event notification api profile - v3.1.2/readme.md)
- [Resources and Data Models](./profiles/resources and data models/readme.md)
  - [AISP](./profiles/resources and data models/aisp/readme.md)
  - [PISP](./profiles/resources and data models/pisp/readme.md)
  - [CBPII](./profiles/resources and data models/cbpii/readme.md)
  - [Event Notifications](./profiles/resources and data models/event notifications/readme.md)
- [References](./references/readme.md)
  - [Domestic Payment Message Formats - v3.1.2](./references/domest-payment-message-formats-v3.1.2.md)
  - [Namespaced Enumerations - v3.1.2](./references/namespaced-enumerations-v3.1.2.md)

This specification should be read in conjunction with the Customer Experience Guidelines and Management Information Requirements. Together these form the OBIE standard, which should enable any ASPSP which implements the specification to meet their obligations under both the CMA Order and PSD2/RTS.

The key difference between the CMA Order and PSD2/RTS requirements relate to which product types are implemented, and the timing for implementation. For example, the CMA Order requires the CMA9 to implement the standard for PCA and BCA accounts earlier (in some cases) than the PSD2/RTS timelines. The timings are defined in the Open Banking Roadmap (https://www.openbanking.org.uk/wp-content/uploads/Open-Banking-Revised-Roadmap-July-2018.pdf).

## Known Issues
The specification must be read in conjunction with the Known Issues.

## Swagger Specification
The Swagger Specification for R/W APIs can be downloaded from the following GitHub Repository
