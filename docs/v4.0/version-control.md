# Version control


v4.0 - 27th June 2024

| Area | Changes |
| --- | --- |
| All | <ul><li>[Enum/codeset repository](https://github.com/OpenBankingUK/External_Internal_CodeSets) created on GitHub. OBL enums have been removed from namespaced enumeration page and participants should refer to this respository for values. Note, OBExternal* enum names have been updated to OBInternal*</li><li>New optional `StatusReason` array containing 0..*:<ul><li>`StatusReasonCode`</li><li>`Path`</li><li>`StatusReasonDescription`</li></ul></li><li>Sequence diagrams and consent status models updated with ISO values</li><li>Usage examples updated</li></ul> |
| All | Alignment with ISO 20022:<br><ul><li>ISO code names replaced by code value (e.g. `AcceptedWithoutPosting` is now `ACWP`)</li><li>Address fields aligned to ISO definition and rationalised into single address definition `OBPostalAddress7`.</li><li>`LEI` added to Creditor/Debtor/CreditorAgent objects</li><li>`UltimateCreditor` and `UltimateDebtor` added</li><li>`MandateRelatedInformation` added to DirectDebit and StandingOrder, this object replaces some fields from v3.1.11</li><li>`RemittanceInformation` object updated to ISO format, this replaces ‘reference’ in payment requests. The object name has been updated to `OBRemittanceInformation2`.</li><li>`CreditorAccount` & `CreditorAgent` now have the same (optional) fields across API endpoints</li><li>`Proxy` added to CreditorAccount/DebtorAccount (across AISP, PISP & CBPII)</li></ul> |
| AISP |ISO 20022 changes<br><ul><li>`AccountType` (OBExternalAccountType1Code) renamed to `AccountCategory` (OBInternalAccountType1Code)<li>`AccountSubType` renamed to `AccountTypeCode`</li><li>`MORT` (Mortgage) and `WALT` (Wallet) added to OBExternalAccountSubType1Code</li><li>`Name` added to Servicer in OBReadAccount6</li><li>`StatementFrequencyAndFormat` added to Account in OBReadAccount6</li><li>`PaymentPurposeCode` added to Transaction in OBReadTransaction6</li><li>`CategoryPurposeCode` added to Transaction in OBReadTransaction6</li></ul> |
| PISP | ISO20022 changes<br><ul><li>`CategoryPurposeCode` added to Risk object</li><li>`RemittanceInformation` added to payments</li><li>`RegulatoryReporting` added to payments</li></ul> |
| Errors | <ul><li>Simplified error object, top level `Code` and `Message` have been marked as optional and __deprecated__.</li><li>Error codes now in ISO 20022 code value format (4 chars) in the `OBExternalStatusReason1Code` enum</li><li>Additional guidance on errors experienced in the redirect flow or from PSU initiated changes</li></ul> |
| VRP | <ul><li>`ContractPresentIndicator` typo fixed</li><li>Added guidance on dynamic reference information for VRP payments</li><li>StatusReason now uses ExternalStatusReason1Code</li><li>To assist with version migration:<ul><li>Introduced optional HTTP PUT/PATCH verbs for consents</li><li>Added payload version header</li></ul></li></ul> |
| Payments | <ul><li>Updated payment message types information to include ISO 20022 changes, CHAPS migration and CBPR+</li><li>Richer payment status information aligned to ISO 20022 `ExternalTransactionStatus1code`</li></ul></li></ul>|
| Various | All [3.1.11 KI’s](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/47546479/Known+Specification+Issues) addressed |
| AISP | <ul><li>Added new `ExtendedProprietaryBankTransactionCodes` array to Transactions (TDA decision 264)</li><li>Permission code table updated with `UltimateCreditor`, `UltimateDebtor` and `StatementFrequencyAndFormat`</li></ul> |
| Various|`Frequency` in `OBMandateRelatedInformation1` object made mandatory |
| PISP| `CreditorAgent` added to <ul><li>Domestic Payment Consent</li><li>Domestic Payment</li><li>File payment Consents</li><li>File payment</li></ul> | 
| Security Profile | The Security Profile has been updated to [FAPI 1 Advanced](https://openid.net/specs/openid-financial-api-part-2-1_0.html) |



v4.0 - 4th September 2024

<table>
 <tr>
  <td>
  <p><b>Path/Area</b></p>
  </td>
  <td>
  <p><b>Issue</b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/aisp/account-access-consents.html#data-dictionary-2">OBReadConsentResponse1</a></p>
  </td>
  <td>
  <p>Status is listed as <span class=3DGramE>0..</span>1 in data
  dictionary but correctly shown as 1..1 in UML</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/aisp/account-access-consents.html#data-dictionary-2">OBReadConsentResponse1</a></p>
  </td>
  <td>
  <p>Codeset class listed as OBInternalPermissions1Code instead
  of OBInternalConsentStatus1Code</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/aisp/Accounts.html#data-dictionary">OBReadAccount6/Data/Account/StatementFrequencyAndFormat/Format</a></p>
  </td>
  <td>
  <p>Codeset repo value from row above has duplicated down</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/aisp/Transactions.html#data-dictionary">OBReadTransaction6/Data/Transaction/PaymentPurposeCode</a></p>
  </td>
  <td>
  <p>Codeset repo link has duplicated across rows and link is
  unclickable</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/aisp/standing-orders.html#data-dictionary">OBReadStandingOrder6/Data/StandingOrder/NextPaymentDateTime</a></p>
  </td>
  <td>
  <p>Class type text has truncated and is showing as ISODate</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/aisp/standing-orders.html#data-dictionary">OBReadStandingOrder6</a></p>
  </td>
  <td>
  <p>RemittanceInformation missing from AISP Standing Order
  Data Dictionary</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:7'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/aisp/Offers.html#data-dictionary">OBReadOffer1/Data/Offer/OfferType</a></p>
  </td>
  <td>
  <p>Codeset should be OBExternalOfferType1Code in data
  dictionary</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:8'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/cbpii/funds-confirmation-consent.html#data-dictionary-2">OBFundsConfirmationConsentResponse1/Data/Status</a></p>
  </td>
  <td>
  <p>Status is listed as <span class=3DGramE>0..</span>1 in data
  dictionary</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:9'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/cbpii/funds-confirmation-consent.html#uml-diagram-2">OBFundsConfirmationConsentResponse1</a></p>
  </td>
  <td>
  <p>UML diagram showing cached version with ‘StatusCode’ from
  original draft release</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:10'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/cbpii/funds-confirmation-consent.html#data-dictionary-2">OBFundsConfirmationConsentResponse1</a></p>
  </td>
  <td>
  <p>OBInternalPermissions1Code has duplicated across rows</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:11'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/cbpii/funds-confirmation-consent.html#data-dictionary-2">OBFundsConfirmationConsentResponse1/Data/StatusReason/StatusReasonDescription</a></p>
  </td>
  <td>
  <p>Field length is missing from table</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:12'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/vrp/domestic-vrp-consents.html#obdomesticvrpconsentrequest">OBDomesticVRPConsentRequest</a></p>
  </td>
  <td>
  <p>Data element occurrence showing as <span class=3DGramE>0..</span>1
  in data dictionary but correctly shown as 1..1 in UML</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:13'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/vrp/domestic-vrp-consents.html#obdomesticvrpconsentresponse">OBDomesticVRPConsentResponse</a></p>
  </td>
  <td>
  <p>StatusReason/Path not showing in data dictionary<o:p></o:p></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:14'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/vrp/domestic-vrps.html#obdomesticvrpresponse">OBDomesticVRPResponse</a></p>
  </td>
  <td>
  <p>Data.StatusReason. StatusReasonDescription max length is
  listed as 256 instead of 500.</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:15'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary">OBDomestic2/CreditorAgent/SchemeName</a></p>
  </td>
  <td>
  <p>Table is missing link to codeset repo</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:16'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary">OBDomestic2/CreditorAgent/LEI</a></p>
  </td>
  <td>
  <p>Missing from table but present in UML</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:17'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary-3">OBWriteDomesticConsentResponse5/Data/Status</a></p>
  </td>
  <td>
  <p>Codeset listed is legacy value</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:18'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary-3">OBWriteDomesticConsentResponse5/Data/StatusReason/StatusReasonCode</a><o:p></o:p></p>
  </td>
  <td>
  <p>Codeset should be OBExternalStatusReason1Code in data
  dictionary</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:19'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/profiles/payment-initiation-api-profile.html#data-dictionary-8">SCASupportData/RequestedSCAExemptionType</a></p>
  </td>
  <td>
  <p>Description should be “This field allows a PISP to request
  specific SCA Exemption for a Payment Initiation”</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:20'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/domestic-payment-consents.html#get-domestic-payment-consents-consentid-funds-confirmation">GET
  /domestic-payment-consents/{ConsentId}/funds-confirmation description</a><o:p></o:p></p>
  </td>
  <td>
  <p>Paragraph refers to ‘Authorised’ and for consistency
  should be be updated to ‘AUTH’</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:21'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/domestic-payments.html#data-dictionary-2">OBWriteDomesticResponse5/Data/StatusReason/StatusReasonCode</a></p>
  </td>
  <td>
  <p>Codeset should point to OBExternalStatusReason1Code<o:p></o:p></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:22'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/profiles/payment-initiation-api-profile.html#data-dictionary-4">OBMultiAuthorisation1/Status</a></p>
  </td>
  <td>
  <p>Codeset should point to OBExternalStatus2Code<o:p></o:p></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:23'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/profiles/vrp-profile.html#consent-re-authentication">domestic-vrp-consents</a><o:p></o:p></p>
  </td>
  <td>
  <p><s>Wording needs updating to clarify use of CANC</s><o:p></o:p></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:24'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/domestic-standing-order-consents.html#post-domestic-standing-order-consents-2">Create
  Domestic Standing Order Consent example</a></p>
  </td>
  <td>
  <p>JSON example frequency information needs updating <o:p></o:p></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:25'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/domestic-payment-consents.html#data-dictionary">OBDomestic2
  DebtorAccount and Debtor share base class</a></p>
  </td>
  <td>
  <p>Class definitions need updating to reflect different
  fields, swaggers have in-line definitions</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:26'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/vrp/domestic-vrp-consents.html#obdomesticvrpinitiation">OBDomesticVRPInitiation
  and&nbsp;OBDomesticVRPInstruction contain CreditorAgent</a></p>
  </td>
  <td>
  <p>This was removed in KI v319_KI9 but was not removed from
  spec pages.</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:27'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/profiles/payment-initiation-api-profile.html#data-dictionary-9">OBRemittanceInformation2/Unstructured&nbsp;</a></p>
  </td>
  <td>
  <p>Data dictionary class column should be updated to clarify
  this is an array of Max140Text values.&nbsp;</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:28'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/domestic-payments.html#uml-diagram-3">OBWritePaymentDetails1</a>
  </p>
  </td>
  <td>
  <p>UML shows incorrect cardinality for Data and
  PaymentDetails.</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:29'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/pisp/file-payments.html#get-file-payments-filepaymentid">GET
  /file-payments/{FilePaymentId}</a></p>
  </td>
  <td>
  <p><s>Table for POST /file-payments has duplicated down, and is showing instead of the correct table.</s></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:30'>
  <td>
  <p><a
  href="https://openbankinguk.github.io/spec-preview-268/v4.0/resources-and-data-models/vrp/domestic-vrp-consents.html#state-model-vrp-consents">VRP
  State model description</a></p>
  </td>
  <td>
  <p>StatusCode is misspelled</p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:31;mso-yfti-lastrow:yes'>
  <td>
  <p>ToC links - various</p>
  </td>
  <td>
  <p>Some links are not taking you to relevant section on the
  page when clicked (note, these have been broken since v3)</p>
  </td>
 </tr>
</table>






