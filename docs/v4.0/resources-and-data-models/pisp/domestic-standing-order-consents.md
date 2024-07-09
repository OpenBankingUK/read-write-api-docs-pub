# Domestic Standing Order Consents - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /domestic-standing-order-consents](#post-domestic-standing-order-consents)
    - [Status](#status)
  - [GET /domestic-standing-order-consents/{ConsentId}](#get-domestic-standing-order-consents-consentid)
    - [Status](#status-2)
  - [State Model](#state-model)
    - [Payment Order Consent](#payment-order-consent)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBRemittanceInformation2](#obremittanceinformation2)
    - [OBMandateRelatedInformation1](#obmandaterelatedinformation1)
    - [OBUltimateCreditor1](#obultimatecreditor1)
    - [OBUltimateDebtor1](#obultimatedebtor1)
    - [OBRegulatoryReporting1](#obregulatoryreporting1)
    - [OBDomesticStandingOrder3](#obdomesticstandingorder3)
      - [UML Diagram](#uml-diagram)
      - [Notes](#notes)
        - [Frequency Examples](#frequency-examples)
      - [Data Dictionary](#data-dictionary)
  - [Domestic Standing Order Consent - Request](#domestic-standing-order-consent-request)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [Domestic Standing Order Consent - Response](#domestic-standing-order-consent-response)
    - [UML Diagram](#uml-diagram-3)
    - [Notes](#notes-3)
    - [Data Dictionary](#data-dictionary-3)
- [Usage Examples](#usage-examples)
    - [Create Domestic Standing Order Consent](#create-domestic-standing-order-consent)
      - [POST /domestic-standing-order-consents](#post-domestic-standing-order-consents-2)
      - [POST /domestic-standing-order-consents response](#post-domestic-standing-order-consents-response)
  - [Get a Domestic Standing Order Consent](#get-a-domestic-standing-order-consent)
    - [GET /domestic-standing-order-consents/{ConsentId}](#get-domestic-standing-order-consents-consentid-2)
    - [GET /domestic-standing-order-consents response](#get-domestic-standing-order-consents-response)

## Overview

The Domestic Standing Order Consent resource is used by a PISP to register an intent to initiate a Domestic Standing Order.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-standing-order-consents |POST |POST /domestic-standing-order-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteDomesticStandingOrderConsent5 |OBWriteDomesticStandingOrderConsentResponse6 |
| domestic-standing-order-consents |GET |GET /domestic-standing-order-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticStandingOrderConsentResponse6 |

### POST /domestic-standing-order-consents

The API endpoint allows the PISP to ask an ASPSP to create a new **domestic-standing-order-consent** resource.

* The POST action indicates to the ASPSP that a domestic standing order consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **domestic-standing-order-consent** resource and responds with a unique ConsentId to refer to the resource.

#### Status

The default Status is "AWAU" immediately after the domestic-standing-order-consent has been created.

| Status |
| --- |
| AWAU |

### GET /domestic-standing-order-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status.

#### Status

Once the PSU authorises the payment-consent resource, the Status of the payment-consent resource will be updated with "AUTH".

If the PSU rejects the consent or the domestic-standing-order-consent has failed some other ASPSP validation, the Status will be set to "RJCT".

Once a domestic-standing-order has been successfully created using the domestic-standing-order-consent, the Status of the domestic-standing-order-consent will be set to "COND".

The available status codes for the domestic-standing-order-consent resource are:

| Status |
| --- |
| AWAU |
| RJCT |
| AUTH |
| COND |

Refer to [External_Internal_CodeSets](https://github.com/OpenBankingUK/External_Internal_CodeSets) -> OB_Internal_CodeSet -> `OBInternalPermissions1Code`.

### State Model

#### Payment Order Consent

The state model for the domestic-standing-order-consent resource follows the generic consent state model.

![State model](./images/PO_Consent.png)


The definitions for the Status:

|  |Status |Status Description |
| --- |------ |------------------ |
| 1 |AWAU |The consent resource is awaiting PSU authorisation. |
| 2 |RJCT |The consent resource has been rejected. |
| 3 |AUTH |The consent resource has been successfully authorised. |
| 4 |COND |The consented action has been successfully completed. This does not reflect the status of the consented action. |

Changes to the Status, such as being rejected, should be captured in `StatusReason`, an array of `StatusReasonCode`, `StatusReasonDescription` and `Path`.  

| Field | Description |
|---|---|
| StatusReasonCode | Specifies the status reason in a code form. For a full description see `OBExternalStatusReason1Code` in `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets) |
| StatusReasonDescription | Description of why the code was returned |
|Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path. |
## Data Model

The Data Dictionary section gives the detail on the payload content for the Domestic Standing Order API flows.

### Reused Classes

#### OBRemittanceInformation2

The OBRemittanceInformation2 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obremittanceinformation2) page.

#### OBMandateRelatedInformation1

The OBMandateRelatedInformation1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obmandaterelatedinformation1) page.

#### OBUltimateCreditor1

The OBUltimateCreditor1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obultimatecreditor1) page.


#### OBUltimateDebtor1 

The OBUltimateDebtor1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obultimatedebtor1) page.

#### OBRegulatoryReporting1

The OBRegulatoryReporting1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obregulatoryreporting1) page.



#### OBDomesticStandingOrder3

This section describes the OBDomesticStandingOrder3 class, which is reused as the Initiation object in the domestic-standing-order-consent resource.

##### UML Diagram

![Domestic Standing Order](./images/OBDomesticStandingOrder3.svg)

##### Notes

For the OBDomesticStandingOrder3 Initiation object: 

* All elements in the Initiation payload that are specified by the PISP must not be changed via the ASPSP, as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the domestic-standing-order-consent request immediately.
* If the ASPSP establishes a problem with the domestic-standing-order-consent after the API call, the ASPSP can set the Status of the domestic-standing-order-consent resource to Rejected
* DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the domestic-standing-order-consent will be set to Rejected after PSU authentication.
* Account Identification field usage:
  * Where "UK.OBIE.SortCodeAccountNumber" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * Where the "UK.OBIE.IBAN" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the full IBAN.
* The Permission field is restricted to "Create", however, may be extended to "Update" and "Delete" in a future iteration of the specification.
* Either the CountPerPeriod or FinalPaymentDateTime must be specified (not both) if the domestic standing order is not open ended.
* The structure allows a PISP to specify a domestic standing order with a different payment amount and date combinations: for the first payment, the recurring payment, and the final payment. The recurring payment (and date) must only be populated if different from the first payment (and date).
* If the PISP requests a Frequency that is not supported by the ASPSP, the ASPSP **must** respond with a 400 HTTP status code and an appropriate ISO reason code. Refer to CEG for more guidance on common errors.  

###### Frequency Examples

|Frequency|Detail|
|---|---|
|ADHO| Adhoc|
|INDA| Intra day|
|DAIL| Daily|
|WEEK| Weekly|
|FRTN| Fortnightly|
|MNTH| Monthy|
|QURT| Quarterly|
|MIAN| Semi Annual|
|YEAR| Annual|


##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBDomesticStandingOrder3 | |OBDomesticStandingOrder3 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| MandateRelatedInformation | 0..1 |OBDomesticStandingOrder3/MandateRelatedInformation |Provides further details of the mandate signed between the creditor and the debtor.|OBMandateRelatedInformation1| | |
| RemittanceInformation |0..1 |OBDomesticStandingOrder3/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation2 | | |
| Amount |1..1 |OBDomesticStandingOrder3/FirstPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBDomesticStandingOrder3/FirstPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| RecurringPaymentAmount |0..1 |OBDomesticStandingOrder3/RecurringPaymentAmount |The amount of the recurring Standing Order |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticStandingOrder3/RecurringPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBDomesticStandingOrder3/RecurringPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| FinalPaymentAmount |0..1 |OBDomesticStandingOrder3/FinalPaymentAmount |The amount of the final Standing Order |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticStandingOrder3/FinalPaymentAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBDomesticStandingOrder3/FinalPaymentAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DebtorAccount |0..1 |OBDomesticStandingOrder3/DebtorAccount |Provides the details to identify the debtor account. |OBCashAccountDebtor4 | | |
| UltimateDebtor |0..1 |OBDomesticStandingOrder3/UltimateDebtor|Ultimate party that owes an amount of money to the (ultimate) creditor.|OBUltimateDebtor1 | | |
| CreditorAccount |1..1 |OBDomesticStandingOrder3/CreditorAccount |Identification assigned by an institution to identify an account. This identification is known by the account owner. |OBCashAccountCreditor3 | | |
| UltimateCreditor |0..1 |OBDomesticStandingOrder3/UltimateCreditor|Ultimate party to which an amount of money is due. | OBUltimateCreditor1 | | |
| RegulatoryReporting |0..10 |OBDomesticStandingOrder3/RegulatoryReporting |Information needed due to regulatory and statutory requirements. |OBRegulatoryReporting1 | | |
| SupplementaryData |0..1 |OBDomesticStandingOrder3/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |


### Domestic Standing Order Consent - Request

The OBWriteDomesticStandingOrderConsent5 object will be used for the call to:

* POST /domestic-standing-order-consents

#### UML Diagram

![Domestic Standing Order Consent - Request](./images/OBWriteDomesticStandingOrderConsent5.svg)

#### Notes

The domestic-standing-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticStandingOrderConsent5 | |OBWriteDomesticStandingOrderConsent5 | |OBWriteDomesticStandingOrderConsent5 | | |
| Data |1..1 |OBWriteDomesticStandingOrderConsent5/Data | |OBWriteDataDomesticStandingOrderConsent5 | | |
| Permission |1..1 |OBWriteDomesticStandingOrderConsent5/Data/Permission |Specifies the Open Banking service request types.|For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets)  |OBInternalPermissions2Code||
| ReadRefundAccount |0..1 |OBWriteDomesticStandingOrderConsent5/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalReadRefundAccount1Code| |
| Initiation |1..1 |OBWriteDomesticStandingOrderConsent5/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| Authorisation |0..1 |OBWriteDomesticStandingOrderConsent5/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticStandingOrderConsent5/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteDomesticStandingOrderConsent5/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Standing Order Consent - Response

The OBWriteDomesticStandingOrderConsentResponse6 object will be used for a response to a call to:

* POST /domestic-standing-order-consents
* GET /domestic-standing-order-consents/{ConsentId}

#### UML Diagram

![Domestic Standing Order Consent - Response](./images/OBWriteDomesticStandingOrderConsentResponse6.svg)

#### Notes

The domestic-standing-order-consent **response** contains the full **original** payload from the domestic-standing-order-consent **request,** with the following additional elements:

* ConsentId.
* CreationDateTime the domestic-standing-order-consent resource was created.
* Status, StatusReason and StatusUpdateDateTime of the domestic-standing-order-consent resource.
* Permission field in the original request.
* ReadRefundAccount field in the original request.
* CutOffDateTime Behaviour is explained in Payment Initiation API Profile, Section - [Payment Restrictions -> CutOffDateTime Behaviour](../../profiles/payment-initiation-api-profile.md#cutoffdatetime-behaviour).
* Charges array - for the breakdown of applicable ASPSP charges.
* Post successful PSU Authentication, an ASPSP may provide `Debtor/Name` in the Payment Order Consent Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticStandingOrderConsentResponse6 | |OBWriteDomesticStandingOrderConsentResponse6 | |OBWriteDomesticStandingOrderConsentResponse6 | | |
| Data |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data | |OBWriteDataDomesticStandingOrderConsentResponse6 | | |
| ConsentId |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Status |Specifies the status of consent resource in code form |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBExternalStatusReason1Code |
| StatusUpdateDateTime |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| StatusReason |0..* |OBWriteDomesticStandingOrderConsentResponse6/Data/StatusReason |Specifies the status reason. | OBStatusReason |
| StatusReasonCode |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/StatusReason/StatusReasonCode |Specifies the status reason in a code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)| OBInternalPermissions1Code |
| StatusReasonDescription |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/StatusReason/StatusReasonDescription |Description supporting the StatusReasonCode. | Max500Text|
|Path| 0..1 | OBWriteDomesticStandingOrderConsentResponse6/Data/StatusReason/Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path.| Max500Text| | |
| Permission |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Permission |Specifies the Open Banking service request types. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets)  |OBInternalPermissions2Code | |
| ReadRefundAccount |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalReadRefundAccount1Code| | |
| CutOffDateTime |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| Charges |0..* |OBWriteDomesticStandingOrderConsentResponse6/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a domestic standing order. |OBDomesticStandingOrder3 | | |
| Authorisation |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteDomesticStandingOrderConsentResponse6/Data/Debtor |Set of elements used to identify a person or an organisation. | OBCashAccountDebtor6| | |
| Risk |1..1 |OBWriteDomesticStandingOrderConsentResponse6/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

## Usage Examples

#### Create Domestic Standing Order Consent

##### POST /domestic-standing-order-consents

```
POST /domestic-standing-order-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
	"Permission": "Create",
  "Authorisation": {
      "AuthorisationType": "Any", 
      "CompletionDateTime": "2025-05-30T10:35:27Z",
    },
  "ReadRefundAccount": "Yes",
  "Initiation": {
	  "Frequency": "EvryDay",
	  "Reference": "Pocket money for Damien",
	  "FirstPaymentDateTime": "1976-06-06T06:06:06+00:00",
    "MandateRelatedInformation": {
      "MandateIdentification": "Caravanners",
      "Classification": "FIXE",
      "CategoryPurposeCode": "BONU",
      "FirstPaymentDateTime": "2024-04-25T12:46:49.425Z",
      "RecurringPaymentDateTime": "2024-04-25T12:46:49.425Z",
      "FinalPaymentDateTime": "2024-04-25T12:46:49.425Z",
      "Reason": "Membership fees", 
      "Frequency": {
        "Type": "WEEK",
        "CountPerPeriod": 1
      }
    },
	  "FirstPaymentAmount": {
        "Amount": "6.66",
        "Currency": "GBP"
	  },
	  "RecurringPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
	  "FinalPaymentDateTime": "1981-03-20T06:06:06+00:00",
	  "FinalPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "SecondaryIdentification": "0002",
        "Identification": "11280001234567",
        "Name": "Andrea Smith",
        "Proxy": {
          "Identification": "07700900000",
          "Code": "TELE",
          "Type": "Telephone"
        },
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "SecondaryIdentification": "0002",
        "Identification": "08080021325698",
        "Name": "Bob Clements",
         "Proxy": {
          "Identification": "07700900999",
          "Code": "TELE",
          "Type": "Telephone"
        },
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
      "RemittanceInformation": {
        "Structured": [{
            "ReferredDocumentInformation": [{
                "Code": "CINV",
                "Issuer": "Issuer01",
                "Number": "Number_01",
                "RelatedDate": "2024-04-25T13:26:41.911Z",
                "LineDetails": [
                  "LineDetail"
                ]
              }],
            "ReferredDocumentAmount": 1,
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "Issuer01",
              "Reference": "REF_26518"
            },
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": ["Internal ops code 5120101"]
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
    }
  },
  "SCASupportData": {
        "RequestedSCAExemptionType": "EcommerceGoods",
        "AppliedAuthenticationApproach": "SCA",
        "ReferencePaymentOrderId": "O-611265",
    },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty",
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
}
```

##### POST /domestic-standing-order-consents response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
	"ConsentId": "SOC-100",
	"CreationDateTime": "1976-01-01T06:06:06+00:00",
	"Status": "AWAU",
  "StatusReason": {
      "StatusReasonCode": "U036", 
      "StatusReasonDescription":"Waiting for completion of consent authorisation to be completed by user",
    },
	"StatusUpdateDateTime": "1976-06-06T06:06:06+00:00",
  "CutOffTime": "2018-05-06T15:15:13+00:00",
  "Charges": [{
       "ChargeBearer": "Shared",
       "Type": "UK.OBIE.CHAPSOut",
       "Amount"  {
        "Amount": "0.88",
        "Currency": "GBP"
      }
    }],
	"Permission": "Create",
   "Authorisation": {
      "Type": "Any",
      "CompletionDateTime": "2024-05-30T10:35:27Z"
    },
  "Debtor":{
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "08080021325698",
      "Name": "ACME Inc",
      "SecondaryIdentification": "0002",
      "LEI": "8200007YHFDMEODY1965",
    },
  "ReadRefundAccount": "Yes",
    "Initiation": {
	  "MandateRelatedInformation": {
        "MandateIdentification": "Golfers",
        "Classification": "FIXE",
        "CategoryPurposeCode": "BONU",
        "FirstPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "RecurringPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "FinalPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "Reason": "Golf membership fees", 
        "Frequency": { 
          "Type": "MNTH",
          "CountPerPeriod": 1
        }
      },
	  "Reference": "Pocket money for Damien",
	  "FirstPaymentDateTime": "1976-06-06T06:06:06+00:00",
	  "FirstPaymentAmount": {
        "Amount": "6.66",
        "Currency": "GBP"
	  },
	  "RecurringPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
	  "FinalPaymentDateTime": "1981-03-20T06:06:06+00:00",
	  "FinalPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith",
        "SecondaryIdentification": "0002",
         "Proxy": {
          "Identification": "441234012345",
          "Code": "TELE",
          "Type": "Telephone"
        }
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Bob Clements",
        "SecondaryIdentification": "0002",
         "Proxy": {
          "Identification": "441234012346",
          "Code": "TELE",
          "Type": "Telephone"
        }
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
        "Unstructured": ["Internal ops code 5120101"]
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
    }
  },
  "SCASupportData": {
    "RequestedSCAExemptionType": "EcommerceGoods",
    "AppliedAuthenticationApproach": "SCA",
    "ReferencePaymentOrderId": "O-611265",
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty",
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
    "Self": "https://api.alphabank.com/open-banking/v4.0/pisp/domestic-standing-order-consents/SOC-100"
  },
  "Meta": {}
}

```

### Get a Domestic Standing Order Consent

#### GET /domestic-standing-order-consents/{ConsentId}

```
GET /domestic-standing-order-consents/SOC-100 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### GET /domestic-standing-order-consents response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
	"ConsentId": "SOC-100",
	"CreationDateTime": "1976-01-01T06:06:06+00:00",
	"Status": "AUTH",
	"StatusUpdateDateTime": "1976-06-06T06:06:06+00:00",
	"Permission": "Create",
  "CutOffTime": "2018-05-06T15:15:13+00:00",
  "Charges": [{
       "ChargeBearer": "Shared",
       "Type": "UK.OBIE.CHAPSOut",
       "Amount"  {
        "Amount": "0.88",
        "Currency": "GBP"
      }
    }],
    "Initiation": {
      "MandateRelatedInformation": {
        "MandateIdentification": "Golfers",
        "Classification": "FIXE",
        "CategoryPurposeCode": "BONU",
        "FirstPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "RecurringPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "FinalPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "Frequency": { 
          "Type": "MNTH",
          "CountPerPeriod": 1
        },
	  "Reference": "Pocket money for Damien",
	  "FirstPaymentAmount": {
        "Amount": "6.66",
        "Currency": "GBP"
	  },
	  "RecurringPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
	  "FinalPaymentAmount": {
        "Amount": "7.00",
        "Currency": "GBP"
	  },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "SecondaryIdentification": "002", 
        "Name": "Andrea Smith",
        "Proxy": {
          "Identification": "2360549017905188",
          "Code": "TELE",
          "Type": "Telephone"
        },
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "SecondaryIdentification": "002", 
        "Name": "Bob Clements",
        "Proxy": {
          "Identification": "2360549017905188",
          "Code": "TELE",
          "Type": "Telephone"
        },
      },
      "MandateRelatedInformation": {
        "MandateIdentification": "Golfers",
        "Classification": "FIXE",
        "CategoryPurposeCode": "BONU",
        "FirstPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "RecurringPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "FinalPaymentDateTime": "2024-04-25T12:46:49.425Z",
        "Frequency": { 
          "Type": "MNTH",
          "CountPerPeriod": 1
        }
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
                "Date": "2024-04-25T13:26:41.911Z",
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
        "Unstructured": ["Internal ops code 5120101"]
        }
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
    "Self": "https://api.alphabank.com/open-banking/v4.0/pisp/domestic-standing-order-consents/SOC-100"
  },
  "Meta": {}
}
```
