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

### Version 3.1.6 - Draft1
- __Update version numbers__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/tbc)

### Version 3.1.5 - RC1

- __Decision 220 - TransactionReference Length increased__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/ad5e5c8c599b2f6611d45e1c956240f811a92fa6)
- __Errata - Refund Account/Name cardinality was incorrect__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/788eb1f5261177a49e8afaee7f9e52a19c5bda52)
- __Errata - Amount pattern allowed to supply amount with fractional digits__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/cfdba4047b9cbea9982051e9b821fc48adb916eb)

### Version 3.1.5 - Draft1

- __Decision 214 - Changes to the transactions AIS end-point to address mutability of booked transactions__ 
[View Diff 1](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/af8a0c56dab25b6bf2c35ee7ee11e9a6ca47e2a8) 
[View Diff 2](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/b984c28655b3a7646ba8995312b64bd4ffeba236)

- __Decision 216 - implemented option#3 - introduced Debtor name in response of the payment order consent and payment order__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/10a6a5d608f1abc970527cb38426336995f00436))

- __Decision 217 - Guidance for ASPSPs to provide an expected booking date for Credit Card Transactions__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/e763fe34669c5968708504e7c9d3a9299ec1f27e)

- __Decision 219 - Provision for returning beneficiaries other than trusted beneficiaries__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/26f3ec03e28a59d2823a7c8fe6180c8b44f2029e)

- __Errata__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/e763fe34669c5968708504e7c9d3a9299ec1f27e)
  - Broken links in Usage Examples Readme
  - UML diagrams for for International payments - Reusable classes corrected.
