# Open Banking Read-Write API Version 3.1.9

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

### Version 3.1.9 - Draft 1
- __Decision 238 - Pagination Parameters__ [View Diff](https://openbanking.atlassian.net/wiki/spaces/WOR/pages/2120550261/238)

- __Errata__ identified on [Known Issues Page](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/47546479/Known+Specification+Issues)
  - CDRW-3937 - Clarification on processing of events when accounts linked to VRP is changed
  - OBSD-23244 - Correction of how `RemittanceInformation` should be populated
  - OBSD-23512 - Added missing transaction code of `Rejected` to static enum list
  - OBSD-23823 - Clarification on actions to be taken by ASPSP when access is revoked at TPP
  - OBSD-24689 - Corrected incorrect class reference to `OBDomesticVRPRequestDetailResponse`
  - OBSD-24907 - Corrected VRP example dates