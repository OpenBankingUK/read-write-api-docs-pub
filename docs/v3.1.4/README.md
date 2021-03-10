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

### Version 3.1.4 - RC1

- __Decision 212 - implementing Decision A and C, aliging the conditionality of Aggregated Polling and Realtime notification with trustee letter__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/85addb6bd4ef06f78c600a28d4ef2be5c3a5ab1f)
- __Errata - Event Notification Specification usage examples and clarifications__  [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/85addb6bd4ef06f78c600a28d4ef2be5c3a5ab1f)
- __Feedback changes__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/85addb6bd4ef06f78c600a28d4ef2be5c3a5ab1f)

### Version 3.1.4 - Draft 4

- __Reducing the negative impact of 90 days re-authentication option 3__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/3c7cbfb09126aad6c4ba500c50aa455ada7ece88)
- __P7 - Refunds__ [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/aa393c8ffa87b5f045a718b6f9482cfbc0b74f14)
- __Decision 191 - PAN Masking for CoF API - ASPSPs may return masked PAN as per their online system__
- __Decision 195 - Define PAN Masking pattern and extend to POST CoF consent response__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/3dbd7b6e5704c12ce6fee203c0de314076345bad)
- __Decision 199 - Update spec to suggest only Access Revocation is possible from ASPSP's dashboard (further clarification)__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/26ae9af161a9462ec5ed91e9ee0bc48d78883a0a)
- __Decision 204 - Changes to CIBA profile (Updates based on feedback)__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/e746aacb05963f1a4066f58c4d1fc39744d42297)
- __Decision 207 - Publish guidance on the length of Authorization Code, Refresh Token and Access Token__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/5f71b4eb8d287150050e532491c495742b8b580c)
- __Decision 208 - Publish guidance on avoiding creation of duplicate consent resources__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/abb1aeef82726aba6e11dbe17929fb6444cd1514)
- __Decision 210 - Adding new fields in Standing Order specs and make the Frequency field Conditional__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/f2fded02cad1bcbc49ec0f6b7a09392b03ca9e1d)
- __Decision 211 - Publish Error guidance for scenario when ASPSPs reject the request due to the size of the field value supplied__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/85668d956134fa53a576157fa305b14eaa6200b8)

### Version 3.1.4 - Draft 3

- __Decision 199 - Update spec to suggest only Access Revocation is possible from ASPSP's dashboard__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/c1bdea6379220fad35f49e2f8f4326b022928572)
- __Decision 209 - Add RepresentativeAPR field in PCA/BCA Product endpoints__
  [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/5c2d12b6aa1f1abd4a8e8da618e1a01675c50684)

### Version 3.1.4 - Draft 2

- __Decision 201 - Support for High Cost Credit (HCC) requirements__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/bfc668834060eb212360fe7fe892b0e9c389394c)
  - Clarify that Credit Line should NOT be included in AvailableBalance
- __Decision 203 - Changes to Dynamic Client Registration due to CIBA__
  [View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/c77293e1f0542b5c437de6831d4aeac7a7f86c26)
- __Decision 204 - Changes to CIBA profile__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/89ea24c373591f6f90b2c7795b1c9a0dfb108a99)
- __Decision 205 - Aggregated Polling (Miscelleneous)__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/c9757fcb35e9d2d6d88e45c9de62df9bd5533aaa)
  - Scope for Event notifications
    - Changed scope for `event-notifications` API to be either of accounts or fundsconfirmations
  - Optionality of PUT requests
    - Changed the optionality of `PUT /callback-urls`
  - Optionality of DELETE requests
    - Changed the optionality of `DELETE /callback-urls`
- __Decision 206 - Optionality of acknowledgements for aggregated polling__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/538e1995407c4178336a9c9fcd18d9e364a05e51)
  - Clarified behaviour that is expected when ASPSPs do not want to process acknowledgements for aggregated polling
- __Add a Change Log__
  - Added a Change Log with commit links to be able to view differences between versions
  > The diff links below are experimental for this draft and may function correctly
Feedback on their utility is welcome.
- __Implement changes for Waiver 7__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/f0ca9da113626f7fec980b384ed1d54fbe5e0a24)
  - Removed the requirement for the `b64` claim in signatures
- __Fix Known Issues__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/ba4abc36b60b89da48b980586be2d72e0bdb9c35)
- __Housekeeping - Fix markdown errors and file naming__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/c36a270434203b3727afed34a74e6567dd7d8163)
- __DCR 3.1 (Migrate from Confluence)__
[View Diff](https://github.com/OpenBankingUK/read-write-api-docs-pub/commit/ba47bcaea2235bbe6f9eb873ae4b9a553666d78a)
