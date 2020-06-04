# Open Banking Read-Write API Version 3.1.6

The Read/Write Data API specification describes a collection of RESTful APIs that enable TPPs to access information and initiate payments for customers, by connecting to ASPSPs – securely, efficiently, and with customer consent.

The specification is structured as a series of profiles, resources and data models. The structure is intended to give ASPSPs a suite of functionality to meet their regulatory and commercial requirements. ASPSPs implementing aspects of the specification should select a version of the R/W Data API Profile, compatible functional profiles (such as Accounts and Transactions or Payments) and compatible resources.

Details of version compatibility can be found in **profiles** section and specific sub-sections of **resources and data models** section of the specification.

This specification should be read in conjunction with the Customer Experience Guidelines, Operational Guidelines and Management Information Requirements. Together these form the OBIE standard, which should enable any ASPSP which implements the specification to meet their obligations under both the CMA Order and PSD2/RTS.

The key difference between the CMA Order and PSD2/RTS requirements relate to which product types are implemented, and the timing for implementation. For example, the CMA Order requires the CMA9 to implement the standard for PCA and BCA accounts earlier (in some cases) than the PSD2/RTS timelines. The timings are defined in the Open Banking Roadmap (https://www.openbanking.org.uk/wp-content/uploads/Open-Banking-Revised-Roadmap-July-2018.pdf).

## Known Issues

The specification must be read in conjunction with the [Known Issues](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/47546479/Known+Specification+Issues).

## Swagger Specification

The Swagger Specification for R/W APIs can be downloaded from the following GitHub Repository:

[https://github.com/OpenBankingUK/read-write-api-specs](https://github.com/OpenBankingUK/read-write-api-specs)

## Change Log

### Version 3.1.6 - RC1
- Decision 222 - CASS [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/3c9e6820fd05efd49b670da759ad729af0278eb8)
  - Changes based on impact assessment 
  - Rolled back Option 2

- Decision 223 - Change length of Account/Name fields [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/99fe0a45334038c56f121ccfe4ed958e17e3b531)
- Errata
  - Fix the multiplicity for `CountrySubDivision` [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/3bdd9be8d204b0336f12a5c36158c803ec9270a4)
  - Clarify error message for invalid ISO Date [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/aa5974ee9a6535eb2585f34329aef54ad58f0497)
  - Clarify the use of `txn` for Event Notifications [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/aa5974ee9a6535eb2585f34329aef54ad58f0497)