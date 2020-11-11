# Open Banking Read-Write API Version 3.1.7

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

### Version 3.1.7 - Draft1

- __Decision 225 - Debtor account details following payment initiation__ [View Diff](tbc)
- __Decion 226 - Optional fields for accounts that have been switched out__ [View Diff](tbc)
- __Miscelleneous fixes to address Known Issues__ [View Diff](tbc)
  - OBSD-16647 - Fixed incorrect class name for `CreditorAccount` in `domestic-standing-order-consents`
  - OBSD-16818 - Corrected the `txn` specification for `events` to replace the reference to `x-fapi-transaction-id` with `x-fapi-interaction-id`
  - OBSD-16778 - Added description for post endpoints in `file-payments`
  - OBSD-15322 - Updated the account name field sizes for `parties` so that they are consistent
  - Add additional examples for message signing
  - OBSD-17345 - Corrected the description and length of `ReferencePaymentOrderId`
  - OBSD-17586 - In the Accounts resource, corrected `UK.CASS.NotSwitced` in description to `UK.CASS.NotSwitched`
  - OBSD-18538 - Inconsistent description of "CreationDate" in payment resources.
  - OBSD-18590 - Incorrect example for usage of `CountrySubDivision`
- __Update version numbers__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs/commit/ab83f6bdd7b9e64a3599ede6f89ffeff70984462)
