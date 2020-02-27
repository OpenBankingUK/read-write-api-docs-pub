# Open Banking Read-Write API

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

### Version 3.1.5 - Draft1

- __Decision 214 - Changes to the transactions AIS end-point to address mutability of booked transactions__ [View Diff](TBC)

- __Decision 216 - implemented option#3 - introduced Debtor name in response of the payment order consent and payment order__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs/commit/10a6a5d608f1abc970527cb38426336995f00436))

- __Decision 217 - Guidance for ASPSPs to provide an expected booking date for Credit Card Transactions - No Swagger change)__ [View Diff](TBC)

- __Decision 219​ - Provision for returning beneficiaries other than trusted beneficiaries__ [View Diff](TBC)

- __Errata__ [View Diff](TBC)
  - Broken links in Usage Examples Readme
  - UML diagrams for for International payments - Reusable classes corrected.
