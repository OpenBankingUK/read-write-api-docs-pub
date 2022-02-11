# Domestic Payment Message Formats - v3.1.10 <!-- omit in toc -->

- [ISO 20022](#iso-20022)
- [ISO 8583](#iso-8583)
  - [Mapping](#mapping)
  - [Notes](#notes)
- [BACS STD18](#bacs-std18)
  - [Mapping](#mapping-1)
  - [Notes](#notes-1)
- [MT103](#mt103)
  - [Mapping](#mapping-2)
  - [Notes](#notes-2)

## ISO 20022

The Initiation section of the Payment API payloads is based on the ISO 20022 pain.001 XML standard and we have used ISO 20022 message elements or components where possible. However, has been adapted for APIs based as per our design principles.

Deviations from the pain.001 XML standard are:

* The pain.001 header section and trailer sections have been removed as these are not required for a RESTful API
* Only required fields have been included in the Initiation objects. This has meant:
  * The separate CreditTransferTransactionInformation section in pain.001 which is a repeating group for multi-credit payments, has been removed and flattened.
  * PaymentInformationIdentification not required - we also have a InstructionIdentification.
  * PaymentMethod is not required as this is always immediate execution for the ASPSP.
  * RequestedExecutionDate is not required as this is always as soon as possible - which may differ between FPS and Bacs payments.
  * Debtor / DebtorAccount are optional as the debtor details are not always known to the PISP submitting the payment setup or submit.
* The Payment Initiation team has requested a flatter structure for the payload:
  * InstructionIdentification and EndToEndIdentification moved to the top level (instead of embedding within Payment Order Identification).
  * DebtorAccount and CreditorAccount are simplified to only include the SchemeName and Identification.

## ISO 8583

The ISO 8583 message format is used for the Faster Payments Scheme (FPS).

Execution:

* The processing of payments via the FPS scheme is business as usual processing - i.e., no change.
* FPS scheme requirements (are not formally part of the Open Banking API Specification, but are included for guidance):
  * The field 61.1 PAYMENT SUB-TYPE will be set by the FPS Institution with a **A** {\**} prefix for any FPS transaction initiated by a PISP. Values within {**} will ordinarily be “00” unless the PISP initiated payment requires usage of other facilities (as indicated by the usage of an FPS sub-type code).
  * There is also a requirement from the FPS scheme to identify the PISP via the field 122 REGULATORY REPORTING

This is the mapping from the Payment API Initiation section to the relevant FPS scheme fields with the use of the "UK.OBIE.SortCodeAccountNumber" account identification SchemeName.

All required fields in the ISO 8583 message can be generated from the Initiation section of the payload or from the ASPSP, for domestic-payments and domestic-scheduled-payments.

In the size column, highlighted in **bold** are the fields which are smaller in size than the corresponding ISO 20022 field.

In the case that a PISP sets up a payment-order consent with a larger field size (e.g., EndToEndIdentification, or InstructedAmount) than the eventual scheme field size - it will be up to the ASPSP to decide whether to reject the payment-order consent or truncate the field.

### Mapping

| Name |XPath |Occurrence |Class |ISO8583 BIT |Field Name |Mandatory |Size |
| --- |--- |--- |--- |--- |--- |--- |--- |
| EndToEndIdentification |Initiation/EndToEndIdentification |1..1 |Max35Text |62 |END TO END REFERENCE |O |**31** |
| Amount |Initiation/InstructedAmount/Amount |1..1 |TotalDigits: 18, FractionDigits: 5 |6 |AMOUNT |M |**14** |
| Identification |Initiation/DebtorAccount/Identification |1..1 |Max256Text |42 43 |ORIGINATING CREDIT INSTITUTION <br><br>ORIGINATING CUSTOMER ACCOUNT NUMBER |M <br>M |**11** <br><br>**34** |
| Identification |Initiation/CreditorAccount/Identification |1..1 |Max256Text |95 35 |BENEFICIARY CREDIT INSTITUTION <br><br>BENEFICIARY CUSTOMER ACCOUNT NUMBER |M M |**11** <br><br>**34** |
| Name |Initiation/CreditorAccount/Name |1..1 |Max350Text |118 |BENEFICIARY CUSTOMER ACCOUNT NAME |O |**40** |
| SecondaryIdentification |Initiation/CreditorAccount/SecondaryIdentification |0..1 |Max34Text |120 |REFERENCE INFORMATION |O |**18** |
| Unstructured |Initiation/RemittanceInformation/Unstructured |0..1 |Max140Text |121 |REMITTANCE INFORMATION |O |140 |
| Reference |Initiation/RemittanceInformation/Reference |0..1 |Max35Text |120 |REFERENCE INFORMATION |O |**18** |

### Notes

* If the Initiation/CreditorAccount/SecondaryIdentification field is populated - this field must be mapped to field 120 REFERENCE INFORMATION as this will be used for the Creditor Agent to identify the account (i.e., the roll numbers in the building society context).
* However, if the Initiation/CreditorAccount/SecondaryIdentification is **not** populated then field 120 REFERENCE INFORMATION must be populated with the Initiation/RemittanceInformation/Reference field.
* If both Initiation/CreditorAccount/SecondaryIdentification and Initiation/RemittanceInformation/Reference are populated by the PISP, only the SecondaryIdentification will be mapped to field 120 REFERENCE INFORMATION. Whether the Initiation/RemittanceInformation/Reference is used in any other ASPSP systems is for the ASPSP to decide.
* Field 116 ORIGINATING CUSTOMER ACCOUNT NAME must be populated from the ASPSP's system of record
* Where the Initiation/DebtorAccount/SchemeName field is populated with "UK.OBIE.SortCodeAccountNumber", the Initiation/DebtorAccount/Identification field will be populated with a 14 digit field comprised of a 6 digit Sort Code (mapped to field 42 ORIGINATING CREDIT INSTITUTION) and 8 digit Account Number (mapped to field 43 ORIGINATING CUSTOMER ACCOUNT NUMBER)
* Where the Initiation/CreditorAccount/SchemeName field is populated with "UK.OBIE.SortCodeAccountNumber", the Initiation/CreditorAccount/Identification field will be populated with a 14 digit field comprised of a 6 digit Sort Code (mapped to field 95 BENEFICIARY CREDIT INSTITUTION) and 8 digit Account Number (mapped to field 35 BENEFICIARY CUSTOMER ACCOUNT NUMBER)
* CreditorPostalAddress is not supported in FPS.

## BACS STD18

The BACS STD18 message format is used for the BACS scheme.

Execution:

* The processing of payments via the Bacs scheme is business as usual processing i.e., no change
* Expectation is that a Bank Grade user will be able to bulk up payments generated via the Payment API and create the appropriate file and submission structure (as per usual processing). None of these details will need to be generated via the Payment API.
* The mapping below uses theBacs Electronic Funds Transfer, File Structures (PN5011) document and the section on 2.6.1 CREDIT AND DEBIT PAYMENT INSTRUCTIONS (BANK GRADE USERS)

This is the mapping from the Payment API Initiation section to the relevant Bacs scheme fields with the use of the "UK.OBIE.SortCodeAccountNumber" account identification SchemeName.

All required fields in the BACS STD18 message can all be generated from the Initiation section of the payload or from the ASPSP for domestic-payments and domestic-scheduled-payments.

In the size column, highlighted in **bold** are the fields which are smaller in size than the corresponding ISO 20022 field.

In the case that a PISP sets up a payment-order consent with a larger field size (e.g., EndToEndIdentification, or InstructedAmount) than the eventual scheme field size, it will be up to the ASPSP to decide whether to reject the payment-order consent or truncate the field.

### Mapping

| Name |XPath |Occurrence |Class |STD18 Field |Field Name |Mandatory ? |Size |
| --- |--- |--- |--- |--- |--- |--- |--- |
| Amount |Initiation/InstructedAmount/Amount |1..1 |TotalDigits: 18, FractionDigits: 5 |8 |amount in pence |M |**11** |
| Identification |Initiation/DebtorAccount/Identification |1..1 |Max256Text |5 6 |originating sorting code <br><br>originating account number |M M |**6** <br><br>**8** |
| Identification |Initiation/CreditorAccount/Identification |1..1 |Max256Text |1 2 |destination sorting code <br><br>destination a/c number |M M |**6** <br><br>**8** |
| Name |Initiation/CreditorAccount/Name |1..1 |Max350Text |11 |destination account name |M |**18** |
| SecondaryIdentification |Initiation/CreditorAccount/SecondaryIdentification |0..1 |Max34Text |10 |service user’s reference |M |**18** |
| Reference |Initiation/RemittanceInformation/Reference |0..1 |Max35Text |10 |service user’s reference |M |**18** |

### Notes

* If the Initiation/CreditorAccount/SecondaryIdentification field is populated, this must be mapped to field 10 service user's reference as this will be used for the Creditor Agent to identify the account (i.e., the roll numbers in the building society context).
* However, if the /CreditorAccount/SecondaryIdentification is **not** populated then 10 service user's reference must be populated with the Initiation/RemittanceInformation/Reference field.
* If both Initiation/CreditorAccount/SecondaryIdentification and Initiation/RemittanceInformation/Reference are populated by the PISP, only the SecondaryIdentification will be mapped to field 10 service user's reference. Whether the Initiation/RemittanceInformation/Reference is used in any other ASPSP systems is for the ASPSP to decide.
* Field 9 service user's name must be populated from the ASPSP's system of record.
* Where the Initiation/DebtorAccount/SchemeName field is populated with "UK.OBIE.SortCodeAccountNumber", the Initiation/DebtorAccount/Identification field will be populated with a 14 digit field comprised of a 6 digit Sort Code (mapped to field 5 originating sorting code) and 8 digit Account Number (mapped to field 6 originating account number).
* Where the Initiation/CreditorAccount/SchemeName field is populated with "UK.OBIE.SortCodeAccountNumber", the Initiation/CreditorAccount/Identification field will be populated with a 14 digit field comprised of a 6 digit Sort Code (mapped to field 1 destination sorting code) and 8 digit Account Number (mapped to field 2 destination a/c number)
* CreditorPostalAddress is not supported in BACS.

## MT103

The MT103 message format is used for the CHAPS scheme.
Execution:
* The processing of payments via the CHAPS scheme is business as usual processing - i.e., no change

This is the mapping from the Initiation section to the relevant CHAPS scheme fields with the use of the "UK.OBIE.SortCodeAccountNumber" account identification SchemeName.

All required fields in the CHAPS MT103 message can all be generated from the Initiation section of the payload or from the ASPSP for domestic-payments and domestic-scheduled-payments.

In the size column, highlighted in bold are the fields which are smaller in size than the corresponding ISO 20022 field.

In the case that a PISP sets up a payment-order consent with a larger field size (e.g., EndToEndIdentification, or InstructedAmount) than the eventual scheme field size, it will be up to the ASPSP to decide whether to reject the payment-order consent or truncate the field.

### Mapping

| Name |XPath |Occurrence |Class |MT103 Field |Field Name |Mandatory |Size |
| --- |--- |--- |--- |--- |--- |--- |--- |
| Amount |Initiation/InstructedAmount/Amount |1..1 |TotalDigits: 18, FractionDigits: 5 |32A |Value Date / Currency / Interbank Settled Amount |M |**15n** |
| Currency |Initiation/InstructedAmount/Currency |1..1 |ActiveOrHistoricCurrencyCode "GBP" |32A |Value Date / Currency / Interbank Settled Amount |M |3x |
| Identification |Initiation/DebtorAccount/Identification |1..1 |Max256Text |50K |Ordering Customer |M |**34x** |
| Identification |Initiation/CreditorAccount/Identification |1..1 |Max256Text |57 <br><br>59 |Account With Institution <br><br>Beneficiary Customer |M <br><br>M |**6n** <br><br>**8n** |
| Name |Initiation/CreditorAccount/Name |1..1 |Max350Text |59 |Beneficiary Customer |M |**35x** |
| StreetName |Initiation/CreditorPostalAddress/StreetName |0..1 |Max70Text |59 |Beneficiary Customer |O |**35x** |
| BuildingNumber |Initiation/CreditorPostalAddress/BuildingNumber |0..1 |Max16Text |59 |Beneficiary Customer |O |35x |
| PostCode |Initiation/CreditorPostalAddress/PostCode |0..1 |Max16Text |59 |Beneficiary Customer |O |35x |
| EndToEndIdentification |Initiation/EndToEndIdentification |1..1 |Max35Text |70 |Beneficiary Reference |M |35x |
| Reference |Initiation/RemittanceInformation/Reference |0..1 |Max35Text |70 |Beneficiary Reference |O |35x |
| Unstructured |Initiation/RemittanceInformation/Unstructured |0..1 |Max140Text |70 |Beneficiary Reference |O |**2*35x** |

### Notes

* The Value Date must be a valid BoE business day. It must be a valid date expressed as YYMMDD and is populated by the ASPSP.
* Details for field 50K (Ordering Customer) relating to the Debtor's Name and Address must be populated from the ASPSP's system of record.
* Where the Initiation/DebtorAccount/SchemeName field is populated with "UK.OBIE.SortCodeAccountNumber", the Initiation/DebtorAccount/Identification field will be populated with a 14 digit field comprised of a 6 digit Sort Code (mapped to field 50K Ordering Customer).
* Where the Initiation/CreditorAccount/SchemeName field is populated with "UK.OBIE.SortCodeAccountNumber", the Initiation/CreditorAccount/Identification field will be populated with a 14 digit field comprised of a 6 digit Sort Code (mapped to field 57 Account With Institution) and 8 digit Account Number (mapped to field 59F Beneficiary Customer).
* Beneficiary Customer Address (59) - there are only 3 fields of length 35 available in the MT103 message for the CreditorPostalAddress these will be mapped from:
  * Initiation/CreditorPostalAddress/StreetName.
  * Initiation/CreditorPostalAddress/BuildingNumber.
  * Initiation/CreditorPostalAddress/PostCode.
* Beneficiary Reference (70) - this MT103 field has 4 fields of length 35 to be mapped with:
  * /ROC/ and EndToEndIndentification
  * /RFB/ and RemittanceInformation/Reference (only 16 chars supported)
  * RemittanceInformation/Unstructured
