# Domestic Scheduled Payment Consents  - v3.1.10 <!-- omit in toc -->

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

* The default Status is "AwaitingAuthorisation" immediately after the domestic-scheduled-payment-consent has been created.

| Status |
| ------ |
| AwaitingAuthorisation |

### GET /domestic-scheduled-payment-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status.

#### Status

Once the PSU authorises the payment-consent resource, the Status of the payment-consent resource will be updated with "Authorised".

If the PSU rejects the consent or the domestic-scheduled-payment-consent has failed some other ASPSP validation, the Status will be set to "Rejected".

Once a domestic-scheduled-payment has been successfully created using the domestic-scheduled-payment-consent, the Status of the domestic-scheduled-payment-consent will be set to "Consumed".

The available Status codes for the domestic-scheduled-payment-consent resource are:

| Status |
| ------ |
| AwaitingAuthorisation |
| Rejected |
| Authorised |
| Consumed |

### State Model

#### Payment Order Consent

The state model for the domestic-scheduled-payment-consent resource follows the generic consent state model. However, does not use the "Revoked" status, as the consent for a domestic-scheduled-payment is not a long-lived consent.

![Payment Order Consent](./images/image2018-5-18_10-24-21.png)

The definitions for the Status:

|  |Status |Status Description |
| --- |------ |------------------ |
| 1 |AwaitingAuthorisation |The consent resource is awaiting PSU authorisation. |
| 2 |Rejected |The consent resource has been rejected. |
| 3 |Authorised |The consent resource has been successfully authorised. |
| 4 |Consumed |The consented action has been successfully completed. This does not reflect the status of the consented action. |

## Data Model

The data dictionary section gives the detail on the payload content for the Domestic Scheduled Payment API flows.

### Reused Classes

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
| LocalInstrument |0..1 |OBDomesticScheduled2/LocalInstrument |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code | | |
| RequestedExecutionDateTime |1..1 |OBDomesticScheduled2/RequestedExecutionDateTime |Date at which the initiating party requests the clearing agent to process the payment. Usage: This is the date on which the debtor's account is to be debited. |ISODateTime | | |
| InstructedAmount |1..1 |OBDomesticScheduled2/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomesticScheduled2/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$\|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBDomesticScheduled2/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DebtorAccount |0..1 |OBDomesticScheduled2/DebtorAccount |Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBDomesticScheduled2/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomesticScheduled2/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBDomesticScheduled2/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBDomesticScheduled2/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| CreditorAccount |1..1 |OBDomesticScheduled2/CreditorAccount |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBDomesticScheduled2/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomesticScheduled2/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBDomesticScheduled2/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max350Text | | |
| SecondaryIdentification |0..1 |OBDomesticScheduled2/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| CreditorPostalAddress |0..1 |OBDomesticScheduled2/CreditorPostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBDomesticScheduled2/CreditorPostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBDomesticScheduled2/CreditorPostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBDomesticScheduled2/CreditorPostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBDomesticScheduled2/CreditorPostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBDomesticScheduled2/CreditorPostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBDomesticScheduled2/CreditorPostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBDomesticScheduled2/CreditorPostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBDomesticScheduled2/CreditorPostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBDomesticScheduled2/CreditorPostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBDomesticScheduled2/CreditorPostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| RemittanceInformation |0..1 |OBDomesticScheduled2/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation1 | | |
| Unstructured |0..1 |OBDomesticScheduled2/RemittanceInformation/Unstructured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text | | |
| Reference |0..1 |OBDomesticScheduled2/RemittanceInformation/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped. |Max35Text | | |
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
| Permission |1..1 |OBWriteDomesticScheduledConsent4/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| ReadRefundAccount |0..1 |OBWriteDomesticScheduledConsent4/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | |
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
* Status and StatusUpdateDateTime of the domestic-scheduled-payment-consent resource.
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
| Status |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/Status |Specifies the status of consent resource in code form. |OBExternalConsentStatus1Code |Authorised AwaitingAuthorisation Consumed Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/StatusUpdateDateTime |Date and time at which the consent resource status was updated. |ISODateTime | | |
| Permission |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/Permission |Specifies the Open Banking service request types. |OBExternalPermissions2Code |Create | |
| ReadRefundAccount |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/ReadRefundAccount | Specifies to share the refund account details with PISP |OBReadRefundAccount1Code |Yes No | 
| CutOffDateTime |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..n |OBWriteDomesticScheduledConsentResponse5/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticScheduledConsentResponse5/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| Authorisation |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Authorisation |Type of authorisation flow requested. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteDomesticScheduledConsentResponse5/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
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
    "Permission": "Create",
    "ReadRefundAccount": "Yes",
    "Initiation": {
      "InstructionIdentification": "89f0a53a91ee47f6a383536f851d6b5a",
      "RequestedExecutionDateTime": "2018-08-06T00:00:00+00:00",
      "InstructedAmount": {
        "Amount": "200.00",
        "Currency": "GBP"
      },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Tom Kirkman"
      },
      "RemittanceInformation": {
        "Reference": "DSR-037",
        "Unstructured": "Internal ops code 5120103"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  }
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
    "Status": "AwaitingAuthorisation",
    "CreationDateTime": "2018-05-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2018-05-05T15:15:13+00:00",
    "Initiation": {
      "InstructionIdentification": "89f0a53a91ee47f6a383536f851d6b5a",
      "RequestedExecutionDateTime": "2018-08-06T00:00:00+00:00",
      "InstructedAmount": {
        "Amount": "200.00",
        "Currency": "GBP"
      },
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Frost"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Tom Kirkman"
      },
      "RemittanceInformation": {
        "Reference": "DSR-037",
        "Unstructured": "Internal ops code 5120103"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-scheduled-payment-consents/7290"
  },
  "Meta": {}
}
```
