# Domestic Scheduled Payment Consents  - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /domestic-scheduled-payment-consents](#post-domestic-scheduled-payment-consents)
    - [Status](#status)
  - [GET /domestic-scheduled-payment-consents/{ConsentId}](#get-domestic-scheduled-payment-consents-consentid)
    - [Status](#status-2)
  - [State Model](#state-model)
    - [Payment Order Consent](#payment-order-consent)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBRemittanceInformation2](#obremittanceinformation2)
    - [OBRegulatoryReporting1](#obregulatoryreporting1)
    - [OBUltimateCreditor1](#obultimatecreditor1)
    - [OBUltimateDebtor1](#obultimatedebtor1)
    - [OBPostalAddress7](#obpostaladdress7)
    - [OBDomesticScheduled2](#obdomesticscheduled2)
      - [UML Diagram](#uml-diagram)
      - [Notes](#notes)
      - [Data Dictionary](#data-dictionary)
  - [Domestic Scheduled Payment Consent - Request](#domestic-scheduled-payment-consent-request)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [Domestic Scheduled Payment Consent - Response](#domestic-scheduled-payment-consent-response)
    - [UML Diagram](#uml-diagram-3)
    - [Notes](#notes-3)
    - [Data Dictionary](#data-dictionary-3)
- [Usage Examples](#usage-examples)
    - [Create a Domestic Scheduled Payment Consent](#create-a-domestic-scheduled-payment-consent)
      - [POST /domestic-scheduled-payment-consents Request](#post-domestic-scheduled-payment-consents-request)
      - [POST /domestic-scheduled-payment-consents Response](#post-domestic-scheduled-payment-consents-response)

## Overview

The Domestic Scheduled Payment Consent resource is used by a PISP to register an intent to initiate a Domestic Scheduled Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-scheduled-payment-consents |POST |POST /domestic-scheduled-payment-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteDomesticScheduledConsent4 |OBWriteDomesticScheduledConsentResponse5 |
| domestic-scheduled-payment-consents |GET |GET /domestic-scheduled-payment-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticScheduledConsentResponse5 |

### POST /domestic-scheduled-payment-consents

The API endpoint allows the PISP to ask an ASPSP to create a new **domestic-scheduled-payment-consent** resource.

* The POST action indicates to the ASPSP that a domestic scheduled payment consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **domestic-scheduled-payment-consent** resource and responds with a unique ConsentId to refer to the resource.

#### Status

* The default Status is "AWAU" immediately after the domestic-scheduled-payment-consent has been created.

| Status |
| ------ |
| AWAU |

### GET /domestic-scheduled-payment-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status.

#### Status

Once the PSU authorises the payment-consent resource, the Status of the payment-consent resource will be updated with "AUTH".

If the PSU rejects the consent or the domestic-scheduled-payment-consent has failed some other ASPSP validation, the Status will be set to "RJCT".

Once a domestic-scheduled-payment has been successfully created using the domestic-scheduled-payment-consent, the Status of the domestic-scheduled-payment-consent will be set to "COND".

The available status codes for the domestic-scheduled-payment-consent resource are:

| Status |
| ------ |
| AWAU |
| RJCT |
| AUTH |
| COND |

Refer to [External_Internal_CodeSets](https://github.com/OpenBankingUK/External_Internal_CodeSets) -> OB_Internal_CodeSet -> `OBExternalConsentProprietaryCode`.


### State Model

#### Payment Order Consent

The state model for the domestic-scheduled-payment-consent resource follows the generic consent state model. 

![State model](./images/PO_Consent.png)

The definitions for the Status:
|  | Status |Status Description |
| ---| ------ |------------------ |
| 1 |AWAU |The consent resource is awaiting PSU authorisation. |
| 2 |RJCT |The consent resource has been rejected. |
| 3 |AUTH |The consent resource has been successfully authorised. |
|4 |COND|The consented action has been successfully completed. This does not reflect the status of the consented action.|

Changes to the Status, such as being rejected, should be captured in `StatusReason`, an array of `StatusReasonCode`, `StatusReasonDescription` and `Path`.  

| Field | Description |
|---|---|
| StatusReasonCode | Specifies the status reason in a code form. For a full description see `OBExternalStatusReason1Code` in  `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets) |
| StatusReasonDescription | Description of why the code was returned |
|Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path. |

## Data Model

The data dictionary section gives the detail on the payload content for the Domestic Scheduled Payment API flows.

### Reused Classes

#### OBRemittanceInformation2

The OBRemittanceInformation2 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obremittanceinformation2) page.

#### OBRegulatoryReporting1

The OBRegulatoryReporting1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obregulatoryreporting1) page

#### OBUltimateCreditor1

The OBUltimateCreditor1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obultimatecreditor1) page.


#### OBUltimateDebtor1 

The OBUltimateDebtor1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obultimatedebtor1) page.

#### OBPostalAddress7 

The OBPostalAddress7 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obpostaladdress7) page.


#### OBDomesticScheduled2

This section describes the OBDomesticScheduled2 class which is reused as the Initiation object in the domestic-scheduled-payment-consent resource.

##### UML Diagram

![OBDomesticScheduled2](./images/OBDomesticScheduled2.svg)

##### Notes

For the OBDomesticScheduled2 Initiation object:  

* All elements in the Initiation payload that are specified by the PISP must not be changed via the ASPSP, as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the domestic-scheduled-payment-consent consent request immediately.
* If the ASPSP establishes a problem with the domestic-scheduled-payment-consent after the API call, the ASPSP must set the Status of the domestic-scheduled-payment-consent resource to Rejected.
* DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the domestic-scheduled-payment-consent will be set to Rejected after PSU authentication.
Account Identification field usage:
  * Where "UK.OBIE.SortCodeAccountNumber" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * Where the "UK.OBIE.IBAN" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the full IBAN.
  * Neither the InstructionIdentification nor EndToEndIdentification will be used as the domestic-payment-consent resource identifier (ConsentId) as the ConsentId **must** be uniquely generated by the ASPSP.
* Permission field is restricted to "Create", however, may be extended to "Update" and "Delete" in a future iteration of the specification.
* LocalInstrument is the requested payment scheme for execution. This is a free-text field.
* RequestedExecutionDateTime allows a PISP to specify the date for an ASPSP to execute the domestic scheduled payment.

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBDomesticScheduled2 | |OBDomesticScheduled2 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| InstructionIdentification |1..1 |OBDomesticScheduled2/InstructionIdentification |Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction. |Max35Text | | |
| EndToEndIdentification |0..1 |OBDomesticScheduled2/EndToEndIdentification |Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field. |Max35Text | | |
| LocalInstrument |0..1 |OBDomesticScheduled2/LocalInstrument |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets) |OBInternalLocalInstrument1Code| |
| RequestedExecutionDateTime |1..1 |OBDomesticScheduled2/RequestedExecutionDateTime |Date at which the initiating party requests the clearing agent to process the payment. Usage: This is the date on which the debtor's account is to be debited. |ISODateTime | | |
| InstructedAmount |1..1 |OBDomesticScheduled2/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticScheduled2/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBDomesticScheduled2/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DebtorAccount |0..1 |OBDomesticScheduled2/DebtorAccount |Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. |OBCashAccountDebtor4 | | |
| UltimateDebtor |0..1 |OBDomesticScheduled2/UltimateDebtor|Ultimate party that owes an amount of money to the (ultimate) creditor. |OBUltimateDebtor1 | | |
| CreditorAccount |1..1 |OBDomesticScheduled2/CreditorAccount |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction. |OBCashAccountCreditor3 | | |
| CreditorPostalAddress |0..1 |OBDomesticScheduled2/CreditorPostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress7 | | |
| UltimateCreditor |0..1 |OBDomesticScheduled2/UltimateCreditor|Ultimate party to which an amount of money is due. | OBUltimateCreditor1 | | |
| RemittanceInformation |0..1 |OBDomesticScheduled2/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation2 | | |
| RegulatoryReporting |0..10 |OBDomesticScheduled2/RegulatoryReporting |Information needed due to regulatory and statutory requirements. |OBRegulatoryReporting1 | | |
| SupplementaryData |0..1 |OBDomesticScheduled2/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

### Domestic Scheduled Payment Consent - Request

The OBWriteDomesticScheduledConsent4 object will be used for the call to:

* POST /domestic-scheduled-payment-consents

#### UML Diagram

![Domestic Scheduled Payment Consent - Request](./images/OBWriteDomesticScheduledConsent4.svg)

#### Notes

The domestic-scheduled-payment-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticScheduledConsent4 | |OBWriteDomesticScheduledConsent4 | |OBWriteDomesticScheduledConsent4 | | |
| Data |1..1 |OBWriteDomesticScheduledConsent4/Data | |OBWriteDataDomesticScheduledConsent4 | | |
| Permission |1..1 |OBWriteDomesticScheduledConsent4/Data/Permission |Specifies the Open Banking service request types. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets)  |OBInternalPermissions2Code | |
| ReadRefundAccount |0..1 |OBWriteDomesticScheduledConsent4/Data/ReadRefundAccount | Specifies to share the refund account details with PISP For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalReadRefundAccount1Code | |
| Initiation |1..1 |OBWriteDomesticScheduledConsent4/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| Authorisation |0..1 |OBWriteDomesticScheduledConsent4/Data/Authorisation |Type of authorisation flow requested. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticScheduledConsent4/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteDomesticScheduledConsent4/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Scheduled Payment Consent - Response

The OBWriteDomesticScheduledConsentResponse5 object will be used for a response to a call to:

* POST /domestic-scheduled-payment-consents
* GET /domestic-scheduled-payment-consents/{ConsentId}

#### UML Diagram

![Domestic Scheduled Payment Consent - Response](./images/OBWriteDomesticScheduledConsentResponse5.svg)

#### Notes

The domestic-scheduled-payment-consent **response** contains the full **original** payload from the domestic-scheduled-payment-consent **request** with these additional elements:

* ConsentId.
* CreationDateTime the domestic-scheduled-payment-consent resource was created.
* Status, StatusReason and StatusUpdateDateTime of the domestic-scheduled-payment-consent resource.
* Permission field in the original request.
* ReadRefundAccount field in the original request.
* CutOffDateTime Behaviour is explained in the Payment Initiation API Profile, Section - [Payment Restrictions -> CutOffDateTime Behaviour](../../profiles/payment-initiation-api-profile.md#cutoffdatetime-behaviour).
* ExpectedExecutionDateTime for the domestic-scheduled-payment resource if created before CutOffDateTIme - the expected DateTime the payment is executed against the Debtor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* ExpectedSettlementDateTime for the domestic-scheduled-payment resource if created before CutOffDateTIme - the expected DateTime the payment will be received at the Creditor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* Charges array - for the breakdown of applicable ASPSP charges.
* Post successful PSU Authentication, an ASPSP may provide `Debtor/Name` in the Payment Order Consent Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticScheduledConsentResponse5 | |OBWriteDomesticScheduledConsentResponse5 | |OBWriteDomesticScheduledConsentResponse5 | | |
| Data |1..1 |OBWriteDomesticScheduledConsentResponse5/Data | |OBWriteDataDomesticScheduledConsentResponse5 | | |
| ConsentId |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/Status |Specifies the status of consent resource in code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBExternalStatusReason1Code |
| StatusReason |0..* |OBWriteDomesticScheduledConsentResponse5/Data/StatusReason |Specifies the status reason. | OBStatusReason |
| StatusReasonCode |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/StatusReason/StatusReasonCode |Specifies the status reason in a code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBInternalPermissions1Code
| StatusReasonDescription |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/StatusReason/StatusReasonDescription |Description supporting the StatusReasonCode. |Max500Text|
| StatusUpdateDateTime |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/StatusUpdateDateTime |Date and time at which the consent resource status was updated. |ISODateTime | | |
| Permission |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/Permission |Specifies the Open Banking service request types. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets)  |OBInternalPermissions2Code| |
| ReadRefundAccount |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalReadRefundAccount1Code| 
| CutOffDateTime |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..* |OBWriteDomesticScheduledConsentResponse5/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| Authorisation |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Authorisation |Type of authorisation flow requested. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor |Set of elements used to identify a person or an organisation. | OBCashAccountDebtor4| | |
| Risk |1..1 |OBWriteDomesticScheduledConsentResponse5/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

## Usage Examples

#### Create a Domestic Scheduled Payment Consent

##### POST /domestic-scheduled-payment-consents Request

```
POST /domestic-scheduled-payment-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature:
TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "Authorisation": {
      "AuthorisationType": "Any", 
      "CompletionDateTime": "2025-05-30T10:35:27Z",
    },
    "Permission": "Create",
    "ReadRefundAccount": "Yes",
    "Initiation": {
      "InstructionIdentification": "89f0a53a91ee47f6a383536f851d6b5a",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "LocalInstrument": "UK.OBIE.Paym",
      "RequestedExecutionDateTime": "2018-08-06T00:00:00+00:00",
      "InstructedAmount": {
        "Amount": "200.00",
        "Currency": "GBP"
      },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost",
        "Proxy": {
          "Identification": "+441632960540",
          "Code": "TELE",
          "Type": "Telephone"
        },
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "SecondaryIdentification": "08080021325641",
        "Name": "Tom Kirkman",
        "Proxy": {
          "Identification": "2360549017905188",
          "Code": "TELE",
          "Type": "Telephone"
        },
      },
      "CreditorPostalAddress":{
        "AddressType": "BIZZ",
        "Department": "Finance",
        "SubDepartment": "Payroll",
        "StreetName": "Bank Street",
        "BuildingNumber": "11",
        "BuildingName": "Tower Bridges",
        "Floor": "6",
        "UnitNumber": "UNIT591",
        "Room": "844",
        "PostBox": "PO Box 123456",
        "PostCode": "Z78 4TY",
        "TownLocationName":"Bank",
        "TownName": "London",
        "DistrictName": "Greater London",
        "CareOf": "Ms Jane Smith",
        "CountrySubDivision": "England",
        "Country": "UK"
      },
      "UltimateDebtor": {
        "SchemeName": "UK.OBIE.BICFI",
        "Identification": "2360549017905161589",
        "Name": "Ultimate Debtor",
        "LEI": "8200007YHFDMEODY1965",
        "PostalAddress": {
            "AddressType": "BIZZ",
            "StreetName": "Bank Street",
            "BuildingNumber": "11",
            "Floor": "6",
            "PostCode": "Z78 4TY",
            "TownName": "London",
            "Country": "UK"
        }
      },
      "UltimateCreditor": {
        "SchemeName": "UK.OBIE.BICFI",
        "Identification": "2360549017905161589",
        "Name": "Ultimate Creditor",
        "LEI": "60450004FECVJV7YN339",
        "PostalAddress": {
            "AddressType": "BIZZ",
            "StreetName": "Bank Street",
            "BuildingNumber": "11",
            "Floor": "6",
            "PostCode": "Z78 4TY",
            "TownName": "London",
            "Country": "UK"
            }
        },
      "RegulatoryReporting": [
          {
            "DebitCreditReportingIndicator": "CRED",
            "Authority": {
              "Name": "string",
              "CountryCode": "UG"
            },
            "Details": [
              {
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
              }
              }
          ]
        }
      ],
      "RemittanceInformation": {
          "Structured": [
            {
              "ReferredDocumentInformation": [
                {
                  "Code": "CINV",
                  "Issuer": "Issuer01",
                  "Number": "Number_01",
                  "RelatedDate": "2024-04-25T13:26:41.911Z",
                  "LineDetails": [
                    "string"
                  ]
                }
              ],
              "ReferredDocumentAmount": 1,
              "CreditorReferenceInformation": {
                "Code": "DISP",
                "Issuer": "Issuer01",
                "Reference": "REF_26518"
              },
              "Invoicer": "INVR51856",
              "Invoicee": "INVE5161856",
              "TaxRemittance": "Tax Remittance related information",
              "AdditionalRemittanceInformation": ["Free text for additional information"],  
            }
          ],
          "Unstructured": "Internal ops code 5120101"
      }
    },
  },
  "SCASupportData": {
        "RequestedSCAExemptionType": "EcommerceGoods",
        "AppliedAuthenticationApproach": "SCA",
        "ReferencePaymentOrderId": "O-611265",
    },
}
```

##### POST /domestic-scheduled-payment-consents Response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "7290",
    "Permission": "Create",
    "ReadRefundAccount": "Yes",
    "Status": "AWAU",
    "CreationDateTime": "2018-05-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2018-05-05T15:15:13+00:00",
    "CutOffTime": "2018-05-06T15:15:13+00:00",
    "ExpectedExecutionDateTime": "2018-06-05T15:15:22+00:00",
    "ExpectedSettlementDateTime": "2018-06-06T15:15:22+00:00",
    "Authorisation": {
      "AuthorisationType": "Any", 
      "CompletionDateTime": "2025-05-30T10:35:27Z",
    },
    "StatusReason": {
      "StatusReasonCode": "U036", 
      "StatusReasonDescription":"Waiting for completion of consent authorisation to be completed by user",
    },
    "Debtor":{
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "08080021325698",
      "Name": "ACME Inc",
      "SecondaryIdentification": "0002",
      "LEI": "8200007YHFDMEODY1965",
    },
    "Charges": [{
       "ChargeBearer": "Shared",
       "Type": "UK.OBIE.CHAPSOut",
       "Amount"  {
        "Amount": "0.88",
        "Currency": "GBP"
      }
    }],
    "Initiation": {
      "InstructionIdentification": "89f0a53a91ee47f6a383536f851d6b5a",
      "RequestedExecutionDateTime": "2018-08-06T00:00:00+00:00",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "LocalInstrument": "UK.OBIE.Paym",
      "InstructedAmount": {
        "Amount": "200.00",
        "Currency": "GBP"
      },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost",
        "SecondaryIdentification": "0002",
        "Proxy": {
          "Identification": "2360549017905188",
          "Code": "TELE",
          "Type": "Telephone"
        },
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Tom Kirkman"
      },
      "CreditorPostalAddress":{
        "AddressType": "BIZZ",
        "Department": "Finance",
        "SubDepartment": "Payroll",
        "StreetName": "Bank Street",
        "BuildingNumber": "11",
        "BuildingName": "Tower Bridges",
        "Floor": "6",
        "UnitNumber": "UNIT591",
        "Room": "844",
        "PostBox": "PO Box 123456",
        "PostCode": "Z78 4TY",
        "TownLocationName":"Bank",
        "TownName": "London",
        "DistrictName": "Greater London",
        "CareOf": "Ms Jane Smith",
        "CountrySubDivision": "England",
        "Country": "UK"
      },
      "UltimateDebtor": {
        "SchemeName": "UK.OBIE.BICFI",
        "Identification": "2360549017905161589",
        "Name": "Ultimate Debtor",
        "LEI": "8200007YHFDMEODY1965",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "StreetName": "Bank Street",
          "BuildingNumber": "11",
          "Floor": "6",
          "PostCode": "Z78 4TY",
          "TownName": "London",
          "Country": "UK"
        }
      },
      "UltimateCreditor": {
        "SchemeName": "UK.OBIE.BICFI",
        "Identification": "2360549017905161589",
        "Name": "Ultimate Creditor",
        "LEI": "60450004FECVJV7YN339",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "StreetName": "Bank Street",
          "BuildingNumber": "11",
          "Floor": "6",
          "PostCode": "Z78 4TY",
          "TownName": "London",
          "Country": "UK"
          }
        },
      "RegulatoryReporting": [{
            "DebitCreditReportingIndicator": "CRED",
            "Authority": {
              "Name": "string",
              "CountryCode": "UG"
            },
            "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
              }
          }]
      }],
      "Debtor": { 
        "Name": "D Jones",
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "SecondaryIdentification": "0002",
        "LEI": "8200007YHFDMEODY1965",
      },
     "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "Issuer01",
                "Number": "Number_01",
                "RelatedDate": "2024-04-25T13:26:41.911Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": 1,
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "Issuer01",
              "Reference": "REF_26518"
            },
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"],  
          }
        ],
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "SCASupportData": {
    "RequestedSCAExemptionType": "EcommerceGoods",
    "AppliedAuthenticationApproach": "SCA",
    "ReferencePaymentOrderId": "O-611265",
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty",
    "PaymentContextCode": "EcommerceMerchantInitiatedPayment",
    "ContractPresentIndicator": false,
    "PaymentPurposeCode": "EPAY",
    "CategoryPurposeCode": "CASH", 
    "BeneficiaryPaymentDetailsPrepopulatedIndicator": false,
    "BeneficiaryAccountType": "Business",
    "MerchantCategoryCode": "7300", 
    "MerchantCustomerIdentification": "053598653254",
    "DeliveryAddress": {
      "AddressLine": [
        "Flat 7",
        "Acacia Lodge"
      ],
      "StreetName": "Acacia Avenue",
      "BuildingNumber": "27",
      "PostCode": "GU31 2ZZ",
      "TownName": "Sparsholt",
      "CountrySubDivision": "Wessex",
      "Country": "UK"
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/pisp/domestic-scheduled-payment-consents/7290"
  },
  "Meta": {}
}
```
