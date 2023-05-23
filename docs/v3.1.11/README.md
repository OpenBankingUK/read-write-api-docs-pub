# Open Banking Read-Write API Version 3.1.11

The Read/Write Data API specification describes a collection of RESTful APIs that enable TPPs to access information and initiate payments for customers, by connecting to ASPSPs – securely, efficiently, and with customer consent.

The specification is structured as a series of profiles, resources and data models. The structure is intended to give ASPSPs a suite of functionality to meet their regulatory and commercial requirements. ASPSPs implementing aspects of the specification should select a version of the R/W Data API Profile, compatible functional profiles (such as Accounts and Transactions or Payments) and compatible resources.

Details of version compatibility can be found in **profiles** section and specific sub-sections of **resources and data models** section of the specification.

This specification should be read in conjunction with the Customer Experience Guidelines, Operational Guidelines and Management Information Requirements. Together these form the OBL standard, which should enable any ASPSP which implements the specification to meet their obligations under both the CMA Order and PSD2/RTS.

## Known Issues

The specification must be read in conjunction with the [Known Issues](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/47546479/Known+Specification+Issues).

## Swagger Specification

The Swagger Specification for R/W APIs can be downloaded from the following GitHub Repository:

[https://github.com/OpenBankingUK/read-write-api-specs](https://github.com/OpenBankingUK/read-write-api-specs)

## Change Log
<!-- ### Version 3.1.11 - DRAFT 1 - FINAL -->

<!-- ### Version 3.1.11 - DRAFT 1 - Release Candidate 1 -->

### Version 3.1.11 - Draft 1
- CDRW-4134 - v3110_KI1 - Add VRPType to VRPRequest
- CDRW-4133 - v3110_KI2 - Correct VRPType in examples
- CDRW-4152 - v3110_KI3 - fix incorrect field to BeneficiaryPrepopulatedIndicator in specs
- CDRW-4154 - v3110_KI4 - fix incorrect field to ContractPresentIndicator IN PROGRESS
- CDRW-4155 - v3110_KI5 - fix regular expression pattern in the specs
- CDRW-4156 - v3110_KI6 - Swagger misses UK.OBIE.Rules.ResourceAlreadyExists for 409
- CDRW-4158 - v3110_KI7 - Update usage examples of accounts balances to fit OBReadBalance1 object definition
- CDRW-4165 - v3110_KI8 - Add missing OBVRPStatusReasonCode enumeration - VRP
- CDRW-4164 - v3110_KI9 - OB-301-VRP-100650 update asserted status code
- [Decision 256](https://openbanking.atlassian.net/wiki/spaces/WOR/pages/2561933359/256) - enhance the idempotency section of the specs
- [Decision 258](https://openbanking.atlassian.net/wiki/spaces/WOR/pages/2594308097/258) - update OBReadStatement2, OBReadBalance1 
- CDRW-4196 - v3110_KI13 - "UK.OBIE.Rules.FailsControlParameters" missing from OBErrorResponseError1Code enumeration in specs