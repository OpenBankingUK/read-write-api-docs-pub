# Version control


v4.0.0 - 25th June 2024

| Area | Changes |
| --- | --- |
| All | <ul><li>[Enum/codeset repository](https://github.com/OpenBankingUK/External_Internal_CodeSets) created on GitHub. OBL enums have been removed from namespaced enumeration page and participants should refer to this respository for values.</li><li>New optional `StatusReason` array containing 0..*:<ul><li>`StatusReasonCode`</li><li>`Path`</li><li>`StatusReasonDescription`</li></ul></li><li>Sequence diagrams updated with ISO values</li><li>Usage examples updated</li></ul> |
| All | Alignment with ISO 20022:<br><ul><li>ISO code names replaced by code value (e.g. `AcceptedWithoutPosting` is now `ACWP`)</li><li>Address fields aligned to ISO definition and rationalised into single address definition.</li><li>`LEI` added to Creditor/Debtor/CreditorAgent objects</li><li>`UltimateCreditor` and `UltimateDebtor` added</li><li>`MandateRelatedInformation` added to DirectDebit and StandingOrder replacing some fields from v3.1.11</li><li>`RemittanceInformation` object updated to ISO format, this replaces ‘reference’ in payment requests. The object name has been updated to `OBRemittanceInformation2`.</li><li>CreditorAccount & CreditorAgent now have same (optional) fields across API endpoints</li><li>Proxy added to CreditorAccount/DebtorAccount (across AISP, PISP & CBPII)</li><li>OBAddress updated to align with ISO 20022 definition and object name updated to `OBPostalAddress7`</li></ul> |
| AISP |ISO 20022 changes<br><ul><li>`AccountType` (OBExternalAccountType1Code) renamed to `AccountCategory` (OBInternalAccountType1Code)<li>`AccountSubType` renamed to `AccountTypeCode`</li><li>`MORT` (Mortgage) and `WALT` (Wallet) added to OBExternalAccountSubType1Code</li><li>`Name` added to Servicer in OBReadAccount6</li><li>`StatementFrequencyAndFormat` added to Account in OBReadAccount6</li><li>`PaymentPurposeCode` added to Transaction in OBReadTransaction6</li><li>`CategoryPurposeCode` added to Transaction in OBReadTransaction6</li></ul> |
| PISP | ISO20022 changes<br><ul><li>`CategoryPurposeCode` added to Risk object</li><li>`RemittanceInformation` added to payments</li><li>`RegulatoryReporting` added to payments</li></ul> |
| Errors | <ul><li>Simplified error object, top level `Code` and `Message` have been marked as optional and __deprecated__.</li><li>Error codes now in ISO 20022 code value format (4 chars)</li><li>Additional guidance on errors experienced in the redirect flow or from PSU initiated changes</li></ul> |
| VRP | <ul><li>`ContractPresentIndicator` typo fixed</li><li>Added guidance on dynamic reference information for VRP payments</li></ul> |
| Payments | <ul><li>Updated payment message types information to include ISO 20022 changes, CHAPS migration and CBPR+</li><li>Richer payment status information aligned to ISO 20022 ExternalTransactionStatus1code</li></ul></li></ul>|
| Various | All [3.1.11 KI’s](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/47546479/Known+Specification+Issues) addressed |
| AISP | <ul><li>Added new `ExtendedProprietaryBankTransactionCodes` array to Transactions (TDA decision 264)</li><li>Permission code table updated with UltimateCreditor & UltimateDebtor</li></ul> |
| VRP| To assist with version migration:<ul><li>Introduced optional HTTP PUT/PATCH verbs for consents</li><li>Added payload version header</li></ul>|
| Various|`Frequency` in `OBMandateRelatedInformation1` object made mandatory |
| PSIP| `CreditorAgent` added to Domestic Payment Consent/Domestic Payment/File payment Consents/File payment | 












