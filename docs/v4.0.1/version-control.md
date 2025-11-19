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
   

### Removed

- Removed incorrect `OBInternalPermissions1Code` codeset references from the following locations:
  - [GET /domestic-payment-consents/{ConsentId}](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-payment-consents.html#get-domestic-payment-consents-consentid)
  - [GET /domestic-standing-order-consents/{ConsentId}](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#get-domestic-standing-order-consents-consentid)
  - [GET /file-payment-consents/{ConsentId}/file](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/file-payment-consents.html#get-file-payment-consents-consentid-file)
  - [GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/international-scheduled-payment-consents.html#get-international-scheduled-payment-consents-consentid-funds-confirmation)
  - [GET /international-standing-order-consents/{ConsentId}](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/international-standing-order-consents.html#get-international-standing-order-consents-consentid)
- Removed invalid reference to `OBExternalConsentProprietaryCode` codeset in [GET /domestic-standing-order-consents/{ConsentId}](https://openbankinguk.github.io/spec-pages-preview/v4.0.1/resources-and-data-models/pisp/domestic-standing-order-consents.html#get-domestic-standing-order-consents-consentid)
