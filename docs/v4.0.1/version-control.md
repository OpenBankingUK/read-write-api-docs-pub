# Version control

For v4.0.1 the following approach has been adopted for identifying changes:

- [Known Issues](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/47546479/Known+Specification+Issues) - these are tagged with the KI identifier, e.g. [v40_KI45]
- [Change Requests](https://openbanking.atlassian.net/wiki/spaces/WOR/pages/3872948225/2025-09-11+EAG+for+v4.x.x+Standards+release+Workshop+4#Discussion-material) - these are tagged with the CR number used in the consultations, e.g. [CR4a]
- EAG/Consultation items - Items included in the consultations are tagged with an identifier representing the consultation period they were introduced, e.g. [v4.0.1 RC 1]
- Feedback remediation - Technical errata and other minor corrections identified by participants or OBL during the Advanced Information period for Release Candidates 1 and 2 with an appropriate identifier for internal OBL traceability e.g. [CDRW-5006]

**Consultations:**

- [v4.x.x Consultation 1](https://openbanking.atlassian.net/wiki/spaces/WOR/pages/3880550401/Feedback+-+V4.x.x+Consultation+1)
- [v4.0.1 Draft 1](https://openbanking.atlassian.net/wiki/spaces/WOR/pages/4096950276/Feedback+-+v4.0.1+Draft+1)
- [v4.0.1 Release Candidate 1](https://openbanking.atlassian.net/wiki/spaces/WOR/pages/4203282434/Feedback+-+v4.0.1+Release+Candidate+1)
- [v4.0.1 Release Candidate 2](https://openbanking.atlassian.net/wiki/spaces/WOR/pages/4309942273/Feedback+-+v4.0.1+Release+Candidate+2)

## v4.0.1 - Unreleased

### Changed

- [CDRW-4965] Guidance on Timezone inclusion in the [Filtering section](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Transactions.html#filtering) of the Transactions page has been updated from "Timezone may be included in the filter request, but must be ignored by the ASPSP." to "Timezone **must not** be included in the filter request."
- [CDRW-5040] - added some missing bold formatting to `must` in the [Date Formats](https://openbankinguk.github.io/read-write-api-site3/v4.0/profiles/read-write-data-api-profile.html#date-formats) and [Resource URI Path Structure](https://openbankinguk.github.io/read-write-api-site3/v4.0/profiles/read-write-data-api-profile.html#resource-uri-path-structure) sections.
- [CDRW-5050] Improved formatting of regex patterns by wrapping in backticks for code formatting visual:
  - `v4.0.1/profiles/account-and-transaction-api-profile`
  - `v4.0.1/profiles/payment-initiation-api-profile`
- [CDRW-5051] Improved blank space encoding and table cell spacing:
  - `v4.0.1/profiles/account-and-transaction-api-profile`
  - `v4.0.1/profiles/payment-initiation-api-profile`
- [CDRW-4913] Improved JSON syntax of example in `v4.0.1/profiles/account-and-transaction-api-profile`

### Fixed

- [CDRW-5044] Corrected spelling errors across multiple documentation files:
  - Fixed "infromation" to "information" in Accounts
  - Fixed "duplicaton" to "duplication" in Transactions
  - Fixed "Occurence" to "Occurrence" in table headers (5 instances across confirmation-of-funds-api-profile, account-and-transaction-api-profile, payment-initiation-api-profile, Parties, and domestic-payment-message-formats)
  - Fixed "Retrive" to "Retrieve" in sequence diagrams (3 instances across event-notification-subscription-api-profile, event-notification-api-profile, and callback-url-api-profile)
  - Fixed "Segmeent" to "Segment" in other-product-data-model
  - Fixed "cant" to "cannot" in other-product-data-model
- [CDRW-5049] Fix incorrect `OBActiveCurrencyAndAmount_SimpleType` regexes from `^\d{1,13}$\|^\d{1,13}\.\d{1,5}$` -> `^\d{1,13}$|^\d{1,13}\.\d{1,5}$` (removed incorrect `\`).
- [CDRW-5052] Fixed broken GitHub url link in table `docs/v4.0.1/profiles/payment-initiation-api-profile`
- [CDRW-5050] Added missing ^...$ wrappers to regex
  - `v4.0.1/profiles/account-and-transaction-api-profile`
  - `v4.0.1/profiles/payment-initiation-api-profile`
  - `v4.0.1/profiles/vrp-profile`
[CDRW-5065] Transactions filtering example incorrectly showed `&` as `&amp;`

## v4.0.1 Release Candidate 2 - 2026-02-04

### Added

- [v40_KI45] Added LWMH, LXMH, & TWYR to Frequency Examples in PIS Domestic Standing Order consents & AIS Standing Orders
- [v40_KI45] Added Frequency Examples table to PIS International Standing Order Consents
- [CDRW-4937] Added example of query string `date-time` where only the Date is required.
- [CDRW-5038] Added text to [Date Formats](https://openbankinguk.github.io/read-write-api-site3/v4.0/profiles/read-write-data-api-profile.html#date-formats) section advising on decimal precision limit of 5, as agreed in TDA Decision 284
- [CDRW-5039] Added new [Days of the Week](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#days-of-the-week) section to Date Formats advising of ISO-8601 alignment and providing a table of week days and ordinal values as discussed at TDA on 2026-03-04

## Fixed

- [CDRW-5056] Fixed list formatting in [transaction permissions code](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Transactions.html#permission-codes)
- [CDRW-5016 & CDRW-5015] Fixed the table of contents links on all the v4.0.1 pages.
- [v40_KI48] OBReadStatement2/Data/Statement/StatementInterest/RateType was incorrectly listed as using `OBInternalStatementInterestType1Code`, this has been corrected to `OBInternalStatementInterestRateType1Code`

### Changed

- [CDRW-4948] Description for `OBReadStatement2/Data/Statement/StatementFee/RateType` changed to "This code indicates the specific type of fee rate (e.g., AER, EAR)"
- [CDRW-4948] Description for `OBReadStatement2/Data/Statement/StatementInterest/RateType` changed to "This code specifies the type of interest (e.g., BOE Base Rate, Fixed Rate, Gross)"
- [CDRW-4937] Amended description of query string `date-time` usage to clarify how to represent values where only the `Date` component is required.

## v4.0.1 Release Candidate 1 - 2026-01-05

### Changed

- [CDRW-5054] Updated [Payment Initiation Release Management](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#release-management) section to consistently reference ConsentId in the consent section.
- [CDRW-5055] Moved the initial File Payment status information to the [`POST /file-payments`](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payments.html#post-file-payments) section.

## v4.0.1 Draft 1 - 2025-11-20

### Added

- [CDRW-5057] Added `OBRemittanceInformation2` definition and Data Dictionary to [AIS Standing Orders page](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/standing-orders.html#obremittanceinformation2)
- [v4.x.x Consultation 1] Added a note regarding the use of `ExternalPaymentTransactionStatus1Code` values in `payment-details` endpoints in
  [PIS](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#data-dictionary-7)
  and [Domestic VRPs](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/vrp/domestic-vrps.html#obdomesticvrpdetails)
- [v4.x.x Consultation 1] Optional [Rate Limit Headers](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#rate-limit-headers) added.
- [v40_KI29] `NumberOfPayments` has been restored to the following classes and guidance advising that _TPPs should refer to ASPSP
  developer portals for further information on whether `NumberOfPayments` is supported_ has been added to the pages
  above the data dictionaries:
  - [OBReadStandingOrder6/Data/StandingOrder/NumberOfPayments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/standing-orders.html#data-dictionary-2)
  - [OBDomesticStandingOrder3/NumberOfPayments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#data-dictionary)
  - [OBInternationalStandingOrder4/NumberOfPayments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-standing-order-consents.html#data-dictionary)
- [v40_KI28] The following text has been added to `OBMandateRelatedInformation1/Frequency/Type` on the
  [Account and Transaction API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/account-and-transaction-api-profile) and [Payment Initiation API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile) pages:<br>
  > For compatibility with v3, an ASPSP may choose to optionally support legacy v3 regex patterns in this field.
  >
  > TPPs should refer to ASPSP developer portals for further information on whether legacy values are supported, 
  > alongside any additional information relevant to MandateRelatedInformation usage.
- [V4_KI1] `OBCashAccountDebtorWithName` has been added to:
  - [Account and Transaction API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/account-and-transaction-api-profile.html#obcashaccountdebtorwithname)
  - [Payment Initiation API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#obcashaccountdebtorwithname)
  - [Confirmation of Funds API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/confirmation-of-funds-api-profile.html#obcashaccountdebtorwithname)
- [CR7] [Clarification on the usage of the term 'optional fields'](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#optional) in reference to Conditional fields.
- [v4.x.x Consultation 1] An overarching [Events Release Management](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/event-notification-api-profile.html#release-management) section has been introduced to the Event Notification API Profile
- [v4.x.x Consultation 1] `OBReferredDocumentInformation` has been split out from `OBRemittanceInformation2` and added to the following pages:
  - [Payment Initiation API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#obreferreddocumentinformation)
  - [AIS - Standing Orders](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/standing-orders.html#obreferreddocumentinformation)
  - [Variable Recurring Payments API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/vrp-profile.html#obreferreddocumentinformation)
- [v4.x.x Consultation 1] Added additional guidance to [POST /file-payment-consents/{ConsentId}/file](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payment-consents.html#post-file-payment-consents-consentid-file):
  - ASPSPs should document accepted file types on their developer portal.
  - ASPSPs who accept the UK.OBIE.PaymentInitiation.4.0 file type should specify which payload schemas they accept as payload structures vary across payment types.
    - E.g. An ASPSP accepting domestic, international and domestic standing orders via file payment should explicitly specify support for these 3 payload schemas on their developer portal.
- [v4.x.x Consultation 1] Added a [Release Management](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/vrp-profile.html#release-management) section to the Variable Recurring Payments API Profile
- [CR2] Introduced a new [OBIntermediaryAgent](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/account-and-transaction-api-profile.html#obintermediaryagent) class which can appear up to 3 times in payload as `IntermediaryAgent1`, `IntermediaryAgent2` and`IntermediaryAgent3`.
  - This is used in [OBReadTransaction6/Data/Transaction](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Transactions.html#data-dictionary)
  - Returning these fields requires use of the `ReadTransactionDetail` permission and the [Permission Codes table](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Transactions.html#permission-codes)
    has been updated accordingly.
- [CR9] Added the following guidance to the [Transactions notes](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Transactions.html#notes):
  - TPPs should refer to ASPSP developer portals for information on whether individual Bacs transactions are available in the Transactions endpoint.
- [v4.x.x Consultation 1] Added the following note to [File Payments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payment-consents.html#notes):
  - TPPs should refer to ASPSP developer portals for information on which File Payment endpoints are available, specification of accepted file format(s) and information on File Payment statuses.
- [CR7] Clarified how [Mandatory](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#mandatory)
  and [Conditional](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#conditional)
  fields are represented in the Data Dictionaries.
  - Mandatory fields are represented as 1..1 or 1..* in the Data Dictionary Occurrence column and UML diagrams.
  - Conditional fields are represented as 0..1 or 0..* in the Data Dictionary Occurrence column and UML diagrams
- [CR8] Added guidance to the [Transaction page](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Transactions.html#notes) for returning Counterparty information in the `TransactionInformation` field.
- [v4.x.x Consultation 1] `ReadStandingOrdersBasic` and `ReadStandingOrdersDetail` added to overarching [Permission Codes list](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/account-and-transaction-api-profile.html#permissions)

### Changed

- [v4.0.1 Draft 1] Updated the relevant `OBInternalConsentStatus1Code` codeset references throughout PIS response data dictionaries, to
  use separated codesets:
  - Changed to `OBInternalConsentStatus2Code` in:
    - [Domestic Payment Consent](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary-3)
    - [Domestic Scheduled Payment Consent](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-scheduled-payment-consents.html#data-dictionary-3)
    - [Domestic Standing Order Consent](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#data-dictionary-3)
    - [International Payment Consent](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-payment-consents.html#data-dictionary-4)
    - [International Scheduled Payment Consent](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-scheduled-payment-consents.html#data-dictionary-4)
    - [International Standing Order Consent](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-standing-order-consents.html#data-dictionary-3)
  - Changed to `OBInternalConsentStatus3Code` in:
    - [File Payment Consent](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payment-consents.html#data-dictionary-3)
- [v4.x.x Consultation 1] Remap `ReferredDocumentAmount` from `Int32` to `OBActiveCurrencyAndAmount_SimpleType` in `OBRemittanceInformation2` 
  located in [PIS](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#data-dictionary-9),
  [VRP](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/vrp-profile.html#obremittanceinformation2-data-dictionary),
  and [AIS (Standing Orders)](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/standing-orders.html#data-dictionary)
- [v4.0.1 Draft 1] Updated the relevant `ExternalPaymentTransactionStatus1Code` codeset references to use separate codesets:
  - Changed to `ExternalPaymentTransactionStatus2Code` in:
    - [Domestic Scheduled Payments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-scheduled-payments.html#data-dictionary-2)
    - [International Scheduled Payments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-scheduled-payments.html#data-dictionary-2)
  - Changed to `ExternalPaymentTransactionStatus3Code` in:
    - [Domestic Payments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-payments.html#data-dictionary-2)
    - [International Payments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-payments.html#data-dictionary-2)
  - Changed to `ExternalPaymentTransactionStatus4Code` in:
    - [File Payments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payments.html#data-dictionary-2)
  - Changed to `ExternalPaymentTransactionStatus5Code` in:
    - [Domestic VRPs](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/vrp/domestic-vrps.html#obdomesticvrpdetails)
- [v4.x.x Consultation 1] [Event Notification Resources](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/event-notifications/)
  are now listed under the [Event Notification API](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/event-notification-api-profile.html)
  section.
- [v4.x.x Consultation 1] [Meta](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#meta)
  has been reclassified as __conditional__.
- [v4.x.x Consultation 1] [Links](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#links)
  has been reclassified as __conditional__.
- [v4.x.x Consultation 1] The [Multiple Authorisation](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#multiple-authorisation) text has been updated to include the full set of values for `AuthorisationType` (Single, <ins>Multiple</ins> or Any).
- [v4.x.x Consultation 1] TPPs and ASPSPs __must__ now verify [payload signatures](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#specification) - previously this was _should_.
- [V4_KI1] VRP instance of `OBCashAccountDebtorWithName/Name` max size has increased from 70 to 350 to align with other areas of
  the spec and is no longer `mandatory`.
- [V4_KI1] The following classes have been updated to use `OBCashAccountDebtorWithName` instead of `OBCashAccount6`:
  - [OBReadTransaction6/Data/Transaction/DebtorAccount](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Transactions.html#data-dictionary)
  - [OBFundsConfirmationConsent1/Data/DebtorAccount](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/cbpii/funds-confirmation-consent.html#data-dictionary-2)
  - [OBDomestic2/DebtorAccount](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary)
  - [OBDomesticScheduled2/DebtorAccount](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-scheduled-payment-consents.html#data-dictionary)
  - [OBDomesticStandingOrder3/DebtorAccount](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#data-dictionary)
  - [OBFile2/DebtorAccount](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payment-consents.html#data-dictionary)
  - [OBInternational3/DebtorAccount](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-payment-consents.html#data-dictionary)
  - [OBInternationalScheduled3/DebtorAccount](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-scheduled-payment-consents.html#data-dictionary)
  - [OBInternationalStandingOrder4/DebtorAccount](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-standing-order-consents.html#data-dictionary)
- [CR7] The 'Optional Fields' section describing changes to payloads when a field has no value has been renamed to
  [Conditional Fields](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#conditional-fields)
- [v4.x.x Consultation 1] `OBRemittanceInformation2/Structured/ReferredDocumentInformation` updated from `Array` to 
  `Array of OBReferredDocumentInformation` on the following pages:
  - [Payment Initiation API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#obremittanceinformation2)
  - [AIS - Standing Orders](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/standing-orders.html#obremittanceinformation2)
  - [Variable Recurring Payments API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/vrp-profile.html#obremittanceinformation2)
- [v4.0.1 Draft 1] `OBReferredDocumentInformation/LineDetails` (previously displayed as part of the `OBRemittanceInformation2` class) has been updated to have a maximum string length of 2048 characters on the following pages:
  - [Payment Initiation API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#obreferreddocumentinformation)
  - [AIS - Standing Orders](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/standing-orders.html#obreferreddocumentinformation)
  - [Variable Recurring Payments API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/vrp-profile.html#obreferreddocumentinformation)
- [v40_KI11] Removed incorrect File Payment Status codes and replaced with [guidance that the initial Status __must__ be `PDNG`](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payments.html#status)
- [v40_KI47] Replaced incorrect File Payment [State Model diagram](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payments.html#initiation).
- [v40_KI47] Updated File Payment [Multiple Authorisation state model guidance](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payments.html#multiple-authorisation) to use correct status codes.
- [v4.x.x Consultation 1] Corrected both the [Domestic](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-scheduled-payments.html#payment-order) and [International](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-scheduled-payments.html#payment-order) Scheduled Payment state diagrams.
- [CDRW-4476] Updated [ISO 20022 text](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/read-write-data-api-profile.html#iso-20022) to replace references to draft standards with final standards such as the`Regulatory Technical Standards on strong customer authentication`
- [v40_KI20] Replaced 'ReceivedCreditTransfer' and 'DomesticCreditTransfer' with 'RCDT' and 'DMCT' in usage examples 
  ([Transactions - v4.0.1](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Transactions.html#get-account-transactions-response-1))
- [v40_KI16] Replaced AWAU with AWAF for Multiple Authorisation in File Payments ([File Payments - v4.0.1](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payments.html#uml-diagram))
- [CDRW-4828] Added clarification to PointInTime in the Data Dictionary to note that negative numbers are permitted
  ([Payment Initiation API Profile - v4.0.1](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#data-dictionary-10))

### Removed

- [CDRW-4758] Removed incorrect `OBInternalPermissions1Code` codeset references from the following locations:
  - [GET /domestic-payment-consents/{ConsentId}](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-payment-consents.html#get-domestic-payment-consents-consentid)
  - [GET /domestic-standing-order-consents/{ConsentId}](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#get-domestic-standing-order-consents-consentid)
  - [GET /file-payment-consents/{ConsentId}/file](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payment-consents.html#get-file-payment-consents-consentid-file)
  - [GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-scheduled-payment-consents.html#get-international-scheduled-payment-consents-consentid-funds-confirmation)
  - [GET /international-standing-order-consents/{ConsentId}](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-standing-order-consents.html#get-international-standing-order-consents-consentid)
- [v4.0.1 Draft 1] Removed invalid reference to `OBExternalConsentProprietaryCode` codeset in [GET /domestic-standing-order-consents/{ConsentId}](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#get-domestic-standing-order-consents-consentid)
- [CDRW-4888] Removed `Signed Response` from the [Endpoints Table](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/file-payment-consents.html#endpoints) for `POST /file-payment-consents/{ConsentId}/file`.
- [V4_KI40] The Release Management section has been removed from both [Callback URL API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/callback-url-api-profile.html) and [Event Notification Subscription API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/event-notification-subscription-api-profile.html).
  [V4_KI40] The top level [Event Notification API Profile Release Management](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/event-notification-api-profile.html#release-management) should be used instead.
- [v40_KI37] Removed Risk from the DomesticConsent Data Dictionary ([Domestic Payments Consents - v4.0.1](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary-2))

### Fixed

- [CDRW-4902] Fixed incorrect codeset reference for `StatusReasonCode` from `OBInternalPermissions1Code` to 
  `OBExternalStatusReason1Code` in the response data dictionaries for the following locations:
  - [Domestic Standing Orders](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-standing-orders.html#data-dictionary-2)
  - [International Payments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-payments.html#data-dictionary-2)
  - [International Scheduled Payment Consents](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-scheduled-payment-consents.html#data-dictionary-4)
  - [International Scheduled Payments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-scheduled-payments.html#data-dictionary-2)
  - [International Standing Order Consents](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-standing-order-consents.html#data-dictionary-3)
  - [International Standing Orders](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/international-standing-orders.html#data-dictionary-2)
- [CDRW-4894] `OBActiveCurrencyAndAmount_SimpleType` regex pattern was not displaying correctly for the following fields on
  [Payment Initiation API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile)
  and [Variable Recurring Payments API Profile](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/vrp-profile).
  - OBCharge2/Amount/Amount
  - OBRemittanceInformation2/Structured/ReferredDocumentAmount
  - OBRegulatoryReporting1/Details/Amount/Amount
- [v40_KI35] Corrected the dates shown in the Examples of Periodic Limits (Examples 2 and 3) [VRP Example 2](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/vrp/domestic-vrp-consents.html#example-2) and [VRP Example 3](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/vrp/domestic-vrp-consents.html#example-3)
- [v40_KI19 and others] Addressed various typos:
  - Added \ to the Pattern for Phone and Mobile in the [Data Dictionary](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Parties.html#data-dictionary)
  - Added text to Overview re conditional Parties endpoints and fields, explaining what ASPSPs **must** do if they have implemented the /accounts/{AccountId}/parties'
    endpoint [Overview](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Parties.html#overview)
  - Corrected typo in Release Management from 'create don' to 'created on' [Release Management](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/account-and-transaction-api-profile.html#get)
  - Corrected typo (missing a 'with') on [Release Management](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/account-and-transaction-api-profile.html#get)
  - Corrected class from OBWritePaymentDetailsResponse1 to [OBWritePaymentDetails1](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/payment-initiation-api-profile.html#obwritepaymentdetails1)
  - Corrected Codeset for ExternalPaymentTransactionStatus1Code from ISO_External_CodeSet to OB_Internal_CodeSet [Data Dictionary](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-payments.html#data-dictionary-2)
- [v4.x.x Consultation 1] Fixed PaymentContextCode in 2 examples from 'TransferToSell' to 'TransferToSelf' [Usage Examples](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/references/usage-examples/vrp-usage-examples.html#response-7)
- [CDRW-4714] Fixed the link to Permissions information across [Transactions](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Transactions.html#permission-codes), [Accounts](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/Accounts.html#permission-codes) and [Accounts & Transactions](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/account-and-transaction-api-profile.html#permissions)
  ([AISP Resources and Data Models - v4.0.1](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/aisp/))
- [v4.x.x Consultation 1] Corrected the wording in the Permissions table re ReadPAN [Permissions Table](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/profiles/account-and-transaction-api-profile.html#permissions)
- [CDRW-4806] Added additional text to POST/domestic-payments to clarify the approach to status changes (applied to Domestic Payments, Domestic Scheduled Payments, Domestic Standing Orders, International Payments, International Scheduled Payments, International Standing Orders) Example wording from [Post/domestic-payments](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-payments.html#post-domestic-payments) with same wording used for each of the payment types:
  - Original:
    - Any operations on the domestic-payment resource will not result in a status change for the domestic-payment resource.
  - Revised:
    - Any further HTTP operations on the domestic-payment resource will not result in a status change for the domestic-payment resource.
    - The Status will be updated by the ASPSP in line with payment processing.
- [v40_KI10] Corrected MandateRelatedInformation to be 1..1 and confirm that frequency detail is mandatory [Data Dictionary](https://openbankinguk.github.io/read-write-api-site3/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#data-dictionary)
