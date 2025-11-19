# Version control

## v4.0.1 - 2025-11-19

### Added

- Add `OBRemittanceInformation2` definition and Data Dictionary to [AIS Standing Orders page](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/aisp/standing-orders.html#obremittanceinformation2)

### Changed

- Updated the relevant `OBInternalConsentStatus1Code` codeset references throughout PIS response data dictionaries, to
  use the new `OBInternalConsentStatus2Code` or `OBInternalConsentStatus3Code` codesets. Find the PIS data dictionaries
  updated below:
  - [Domestic Payment Consent](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary-3)
  - [Domestic Scheduled Payment Consent](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-scheduled-payment-consents.html#data-dictionary-3)
  - [Domestic Standing Order Consent](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#data-dictionary-3)
  - [File Payment Consent](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/file-payment-consents.html#data-dictionary-3)
  - [International Payment Consent](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/international-payment-consents.html#data-dictionary-4)
  - [International Scheduled Payment Consent](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/international-scheduled-payment-consents.html#data-dictionary-4)
  - [International Standing Order Consent](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/international-standing-order-consents.html#data-dictionary-3)
- Remap `ReferredDocumentAmount` from `Int32` to `OBActiveCurrencyAndAmount_SimpleType` in `OBRemittanceInformation2` 
  located in [PIS](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/profiles/payment-initiation-api-profile.html#data-dictionary-9),
  [VRP](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/profiles/vrp-profile.html#obremittanceinformation2-data-dictionary),
  and [AIS (Standing Orders)](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/aisp/standing-orders.html#data-dictionary)
-Replaced ‘ReceivedCreditTransfer’ and ‘DomesticCreditTransfer’ with ‘RCDT’ and ‘DMCT’ in usage examples in [Transactions - v4.0.1](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/aisp/Transactions.html#get-account-transactions-response-1)
-Replaced AWAU with AWAF for Multiple Authorisation in File Payments in (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/file-payments.html#uml-diagram)
- Added clarification to PointInTime in Data Dictionary to note that negative numbers are permitted (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/profiles/payment-initiation-api-profile.html)

### Removed

- Removed incorrect `OBInternalPermissions1Code` codeset references from the following locations:
  - [GET /domestic-payment-consents/{ConsentId}](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-payment-consents.html#get-domestic-payment-consents-consentid)
  - [GET /domestic-standing-order-consents/{ConsentId}](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#get-domestic-standing-order-consents-consentid)
  - [GET /file-payment-consents/{ConsentId}/file](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/file-payment-consents.html#get-file-payment-consents-consentid-file)
  - [GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/international-scheduled-payment-consents.html#get-international-scheduled-payment-consents-consentid-funds-confirmation)
  - [GET /international-standing-order-consents/{ConsentId}](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/international-standing-order-consents.html#get-international-standing-order-consents-consentid)
- Removed Risk from the DomesticConsent Data Dictionary (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary-2)

  ### Fixed

- Corrected the dates shown in the Examples of Periodic Limits (Examples 2 and 3) (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/vrp/domestic-vrp-consents.html)
- Added \ to the Pattern for Phone and Mobile in Data Dictionary, added text to Overview re conditional Parties endpoints and fields and corrected text re conditional endpoints to say ‘If ASPSP has implemented the /accounts/{AccountId]/parties endpoint, the APSP must return details on the account owner(s)/holder(s) and operator(s) (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/aisp/Parties.html#data-dictionary-2)
- Corrected Access Revocation text to reflect that status of account-access-consent should be changed, not must be changed, Corrected typo in Release Management from ‘create don’ to ‘created on’, Corrected typo (missing a ‘with’) on Release Management (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/profiles/account-and-transaction-api-profile.html#access-revocation)
- Corrected class from OBWritePaymentDetailsResponse1 to OBWritePamentDetails1, corrected Codeset for ExternalPaymentTrasnsactionStatus1Code from ISO_External_CodeSet to OB_Internal_CodeSet (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-payments.html)
- Fixed PaymentContextCode in 2 examples from ‘TransferToSell’ to ‘TransferToSelf’ (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/references/usage-examples/domestic-payments-usage-examples.html)
- Fixed link to Permissions information across Transactions, Accounts and Accounts & Transactions (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/aisp/)
- Corrected the wording in Permissions table re ReadPAN (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/profiles/account-and-transaction-api-profile.html#permissions)
- Added additional text to POST/domestic-payments to clarify approach to status changes (applied to Domestic Payments, Domestic Scheduled Payments, Domestic Standing Orders, International Payments, International Scheduled Payments, International Standing Orders (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-payments.html)
- Corrected MandateRelatedInformation to be 1..1 and confirm that frequency detail is mandatory (https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html)

  - 
