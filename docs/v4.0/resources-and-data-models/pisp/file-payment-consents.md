# File Payment Consents - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /file-payment-consents](#post-file-payment-consents)
    - [Status](#status)
  - [POST /file-payment-consents/{ConsentId}/file](#post-file-payment-consents-consentid-file)
    - [Status](#status-2)
  - [GET /file-payment-consents/{ConsentId}](#get-file-payment-consents-consentid)
    - [Status](#status-3)
  - [GET /file-payment-consents/{ConsentId}/file](#get-file-payment-consents-consentid-file)
  - [State Model](#state-model)
    - [Payment Order Consent](#payment-order-consent)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
	- [OBRemittanceInformation2](#obremittanceinformation2)
	- [OBUltimateDebtor1](#obultimatedebtor1)
	- [OBPostalAddress7](#obpostaladdress7)
    - [OBFile2](#obfile2)
      - [UML Diagram](#uml-diagram)
      - [Notes](#notes)
      - [Data Dictionary](#data-dictionary)
  - [File Payment Consent - Request](#file-payment-consent-request)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [File Payment Consent - Response](#file-payment-consent-response)
    - [UML Diagram](#uml-diagram-3)
    - [Notes](#notes-3)
    - [Data Dictionary](#data-dictionary-3)
- [Usage Examples](#usage-examples)
  - [POST /file-payment-consents](#post-file-payment-consents-2)
    - [Request](#request)
    - [Response](#response)
  - [POST /file-payment-consents/{ConsentId}/file](#post-file-payment-consents-consentid-file-2)
    - [Request](#request-2)
    - [Response](#response-2)

## Overview

The File Payment Consent resource is used by a PISP to register an intent to initiate a File Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| file-payment-consents |POST |POST /file-payment-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteFileConsent3 |OBWriteFileConsentResponse4 |
| file-payment-consents |POST |POST /file-payment-consents/{ConsentId}/file |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |File |NA |
| file-payment-consents |GET |GET /file-payment-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteFileConsentResponse4 |
| file-payment-consents |GET |GET /file-payment-consents/{ConsentId}/file |Conditional |payments |Client Credentials |Signed Response |No |NA |File |

### POST /file-payment-consents 

The API endpoint allows the PISP to ask an ASPSP to create a new **file-payment-consent** resource.

* The POST action indicates to the ASPSP that a file payment consent has been staged. At this point, the PSU may not have been identified by the ASPSP and the request payload may not contain any information of the account(s) that should be debited.
* The endpoint allows the PISP to send metadata of the consent (between PSU and PISP) to the ASPSP.
* The metadata of the consent must include the FileType of the request.
* The metadata of the consent must include the FileHash, which is a base64 encoding of a SHA256 hash of the file to be uploaded.
* The ASPSP creates the **file-payment-consent** resource and responds with a unique ConsentId to refer to the resource.

#### Status

The default Status is "AWUP" immediately after the file-payment-consent has been created.

| Status |
| --- |
| AWUP |

### POST /file-payment-consents/{ConsentId}/file

The API endpoint allows the PISP to upload a file to an ASPSP, against a **file-payment-consent** resource.

* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise. The PISP must upload the file against the ConsentId before redirecting the PSU to authorise the consent.
* The file structure must match the FileType in the file-payment-consent request.
* An ASPSP must confirm the hash of the file matches with the FileHash provided in the file-payment-consent Metadata.
* The metadata for the file-payment-consent must match the contents of the uploaded file:
    * If the content of the metadata does not match the content of the file, the ASPSP **must** reject the file-payment-consent.
* The file is sent in the HTTP request body.
* HTTP headers (e.g. Content-Type) are used to describe the file.

#### Status

The default Status is "AWAU" immediately after the file has been uploaded.

| Status |
| --- |
| AWAU |

### GET /file-payment-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status. 

#### Status

Once the PSU authorises the payment-consent resource, the Status of the payment-consent resource will be updated with "AUTH".

If the PSU rejects the consent or the file-payment-consent has failed some other ASPSP validation, the Status will be set to "RJCT".

Once a file-payment has been successfully created using the file-payment-consent, the Status of the file-payment-consent will be set to "COND".

The available Status codes for the file-payment-consent resource are:

| Status |
| --- |
| AUTH |
| AWAU |
| AWUP |
| RJCT |
| COND |


### GET /file-payment-consents/{ConsentId}/file

The API endpoint allows the PISP to download a file (that had been uploaded against a **file-payment-consent** resource) from an ASPSP.

* The file is sent in the HTTP response body.
* HTTP headers (e.g. Content-Type) are used to describe the file.

Refer to [External_Internal_CodeSets](https://github.com/OpenBankingUK/External_Internal_CodeSets) -> OB_Internal_CodeSet -> `OBInternalPermissions1Code`.

### State Model

#### Payment Order Consent

![File Upload Consent model](./images/PIS_FileUploadConsent.png)

The definitions for the Status:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AWUP |The file for the consent resource is awaiting upload. |
| 2 |AWAU |The consent resource is awaiting PSU authorisation. |
| 3 |RJCT |The consent resource has been rejected. |
| 4 |AUTH |The consent resource has been successfully authorised. |
| 5 |COND| The consented action has been successfully completed. This does not reflect the status of the consented action.|

Changes to the Status, such as being rejected, should be captured in `StatusReason`, an array of `StatusReasonCode`, `StatusReasonDescription` and `Path`.  

| Field | Description |
|---|---|
| StatusReasonCode | Specifies the status reason in a code form. For a full description see `OBExternalStatusReason1Code` in `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets) |
| StatusReasonDescription | Description of why the code was returned |
|Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path. |

## Data Model

The data dictionary section gives the detail on the payload content for the File Payment API flows.

### Reused Classes

#### OBRemittanceInformation2

The OBRemittanceInformation2 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obremittanceinformation2) page.

#### OBUltimateDebtor1 

The OBUltimateDebtor1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obultimatedebtor1) page.

#### OBPostalAddress7 

The OBPostalAddress7 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obpostaladdress7) page

#### OBFile2

This section describes the OBFile2 class, which is reused as the Initiation object in the file-payment-consent resource.

##### UML Diagram

![OBFile2](./images/OBFile2.svg )

##### Notes 

For the OBFile2 Initiation object: 

* All elements in the Initiation payload that are specified by the PISP must not be changed via the ASPSP, as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the file-payment-consent request immediately.
* If the ASPSP establishes a problem with the file-payment-consent after the API call, the ASPSP must set the Status of the file-payment-consent resource to RJCT.
* The DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU - then the file-payment-consent will be set to RJCT after PSU authentication.
* An ASPSP may choose which fields **must** be populated to process a specified FileType, and may reject the request if the fields are not populated. These ASPSP specific requirements must be documented.
* An ASPSP may choose which fields **must not** be populated to process a specified FileType, and may reject the request if the fields are populated. These ASPSP specific requirements must be documented.

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBFile2 | |OBFile2 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file. |OBFile2 | | |
| FileType |1..1 |OBFile2/FileType |Specifies the payment file type. |Max40Text | | |
| FileHash |1..1 |OBFile2/FileHash |A base64 encoding of a SHA256 hash of the file to be uploaded. |Max44Text | | |
| FileReference |0..1 |OBFile2/FileReference |Reference for the file. |Max40Text | | |
| NumberOfTransactions |0..1 |OBFile2/NumberOfTransactions |Number of individual transactions contained in the payment information group. |Max15NumericText | |[0-9]{1,15} |
| ControlSum |0..1 |OBFile2/ControlSum |Total of all individual amounts included in the group, irrespective of currencies. |DecimalNumber | | |
| RequestedExecutionDateTime |0..1 |OBFile2/RequestedExecutionDateTime |Date at which the initiating party requests the clearing agent to process the payment. Usage: This is the date on which the debtor's account is to be debited. |ISODateTime | | |
| LocalInstrument |0..1 |OBFile2/LocalInstrument |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets) |OBInternalLocalInstrument1Code | |
| DebtorAccount |0..1 |OBFile2/DebtorAccount |Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. | | | |
| UltimateDebtor |0..1 |OBFile2/UltimateDebtor|Ultimate party that owes an amount of money to the (ultimate) creditor.|OBUltimateDebtor1 | | |
| RemittanceInformation |0..1 |OBFile2/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation2 | | |
| SupplementaryData |0..1 |OBFile2/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |
| CreditorAgent |0..1 |OBFile2/CreditorAgent |Financial institution servicing an account for the creditor. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBFile2/CreditorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |0..1 |OBFile2/CreditorAgent/Identification |Unique and unambiguous identification of a financial institution or a branch of a financial institution. |Max35Text | | |
| Name |0..1 |OBFile2/CreditorAgent/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| PostalAddress |0..1 |OBFile2/CreditorAgent/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress7 | | |

### File Payment Consent - Request

The OBWriteFileConsent3 object will be used for the call to:

* POST /file-payment-consents

#### UML Diagram

![OBWriteFileConsent3](./images/OBWriteFileConsent3.svg )

#### Notes 

The file-payment-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData

For the file-payment-consent request object:

* There is no Risk section in the OBWriteFileConsent3 object - as this is not relevant for a file payment.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteFileConsent3 | |OBWriteFileConsent3 | |OBWriteFileConsent3 | | |
| Data |1..1 |OBWriteFileConsent3/Data | |OBWriteDataFileConsent3 | | |
| Initiation |1..1 |OBWriteFileConsent3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file. |OBFile2 | | |
| Authorisation |0..1 |OBWriteFileConsent3/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteFileConsent3/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |

### File Payment Consent - Response

The OBWriteFileConsentResponse4 object will be used for a response to a call to:

* POST /file-payment-consents
* GET /file-payment-consents/{ConsentId}

#### UML Diagram

![OBWriteFileConsentResponse4](./images/OBWriteFileConsentResponse4.svg)

#### Notes

The file-payment-consent **response** contains the full **original** payload from the file-payment-consent **request** with these additional elements:

* ConsentId.
* CreationDateTime the file-payment-consent resource was created.
* Status, StatusReason and StatusUpdateDateTime of the file-payment-consent resource.
* CutOffDateTime Behaviour is explained in Payment Initiation API Profile, Section - [Payment Restrictions -> CutOffDateTime Behaviour](../../profiles/payment-initiation-api-profile.md#cutoffdatetime-behaviour).
* Charges array - for the breakdown of applicable ASPSP charges.
* Post successful PSU Authentication, an ASPSP may provide `Debtor/Name` in the Payment Order Consent Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteFileConsentResponse4 | |OBWriteFileConsentResponse4 | |OBWriteFileConsentResponse4 | | |
| Data |1..1 |OBWriteFileConsentResponse4/Data | |OBWriteDataFileConsentResponse4 | | |
| ConsentId |1..1 |OBWriteFileConsentResponse4/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteFileConsentResponse4/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteFileConsentResponse4/Data/Status |Specifies the status of consent resource in code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBInternalConsentStatus1Code ||
| StatusUpdateDateTime |1..1 |OBWriteFileConsentResponse4/Data/StatusUpdateDateTime |Date and time at which the consent resource status was updated. |ISODateTime | | |
| StatusReason |0..* |OBWriteFileConsentResponse4/Data/StatusReason |An array of StatusReasonCode | OBStatusReason |
| StatusReasonCode |0..1 |OBWriteFileConsentResponse4/Data/StatusReason/StatusReasonCode |Specifies the status reason in a code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)| OBExternalStatusReason1Code ||
| StatusReasonDescription |0..1 |OBWriteFileConsentResponse4/Data/StatusReason/StatusReasonDescription |Description supporting the StatusReasonCode. |Max500Text|
|Path| 0..1 | OBWriteFileConsentResponse4/Data/StatusReason/Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path.| Max500Text| | |
| CutOffDateTime |0..1 |OBWriteFileConsentResponse4/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| Charges |0..* |OBWriteFileConsentResponse4/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteFileConsentResponse4/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file. |OBFile2 | | |
| Authorisation |0..1 |OBWriteFileConsentResponse4/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteFileConsentResponse4/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteFileConsentResponse4/Data/Debtor |Set of elements used to identify a person or an organisation. |OBCashAccountDebtor4 | | |


## Usage Examples

### POST /file-payment-consents

#### Request

```
POST /file-payment-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 UTC
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
    "Initiation": {
      "FileType": "UK.OBIE.pain.001.001.08",
      "FileHash": "m5ah/h1UjLvJYMxqAoZmj9dKdjZnsGNm+yMkJp/KuqQ",
      "FileReference": "GB2OK238",
      "NumberOfTransactions": "100",
      "ControlSum": 3459.30,
	  "RequestedExecutionDateTime": "2024-06-03T00:00:00Z",
	  "LocalInstrument": "UK.OBIE.CHAPS",
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
		 "CreditorAgent": {  
          "LEI": "IZ9Q00LZEVUKWCQY6X15",
          "SchemeName": "UK.OBIE.BICFI",
          "Identification": "80200112344562",
          "Name": "The Credit Agent", 
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
      }
	},
	"SCASupportData": {
	    "RequestedSCAExemptionType": "EcommerceGoods",
		"AppliedAuthenticationApproach": "SCA",
		"ReferencePaymentOrderId": "O-611265",
    },
  }
}
```

#### Response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId" : "512345",
    "Status": "AWUP",
    "CreationDateTime": "2018-06-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2018-06-05T15:15:13+00:00",
	"CutOffDateTime": "2018-07-05T15:15:22+00:00",
	"StatusReason": { 
		"StatusReasonCode": "U036",
		"StatusReasonDescription": "Authorisation not completed. Awaiting file upload"
	},
	"Charges": [{
		"ChargeBearer": "Shared",
		"Type": "UK.OBIE.CHAPSOut",
		"Amount"  {
			"Amount": "0.88",
			"Currency": "GBP"
		},
    }],
	"Authorisation": {
    	"Type": "Any",
    	"CompletionDateTime": "2019-05-30T10:35:27Z"
    },
	"Debtor": { 
	 	"SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
		"LEI": "8200007YHFDMEODY1965",
        "Name": "Andrea Smith",
        "SecondaryIdentification": "0002",	
	},
    "Initiation": {
	  "LocalInstrument": "UK.OBIE.Paym",
	  "RequestedExecutionDateTime": "2017-06-05T15:15:22+00:00",
      "FileType": "UK.OBIE.pain.001.001.08",
      "FileHash": "m5ah/h1UjLvJYMxqAoZmj9dKdjZnsGNm+yMkJp/KuqQ",
      "FileReference": "GB2OK238",
      "NumberOfTransactions": "100",
      "ControlSum": 3459.30,
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
	  "CreditorAgent": {  
		"LEI": "IZ9Q00LZEVUKWCQY6X15",
		"SchemeName": "UK.OBIE.BICFI",
		"Identification": "80200112344562",
		"Name": "The Credit Agent", 
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
    },
	"SCASupportData": {
	  	"RequestedSCAExemptionType": "EcommerceGoods",
		"AppliedAuthenticationApproach": "SCA",
		"ReferencePaymentOrderId": "O-611265",
    },
  },
  "Links":{
    "Self":"https://api.alphabank.com/open-banking/v4.0/pisp/file-payment-consents/512345"
  },
  "Meta":{}
}
```

### POST /file-payment-consents/{ConsentId}/file

#### Request

```
POST /file-payment-consents/512345/file HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 UTC
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: text/xml
Accept: application/json

[File-Data]
```

A sample file with 3 transactions is provided below:

<details>
 <summary>File Data Expand source </summary>
   
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.08" xmlns:xsi="http://www.w3.org/2001/XMLSchema- instance">
	<CstmrCdtTrfInitn>
	<GrpHdr>
		<MsgId>ABC/120928/CCT001</MsgId>
		<CreDtTm>2012-09-28T14:07:00</CreDtTm>
		<NbOfTxs>3</NbOfTxs>
		<CtrlSum>11500000</CtrlSum>
		<InitgPty>
			<Nm>ABC Corporation</Nm>
			<PstlAdr>
				<StrtNm>Times Square</StrtNm>
				<BldgNb>7</BldgNb>
				<PstCd>NY 10036</PstCd>
				<TwnNm>New York</TwnNm>
				<Ctry>US</Ctry>
			</PstlAdr>
		</InitgPty>
	</GrpHdr>
	<PmtInf>
		<PmtInfId>ABC/086</PmtInfId>
		<PmtMtd>TRF</PmtMtd>
		<BtchBookg>false</BtchBookg>
		<ReqdExctnDt>
			<Dt>2012-09-29</Dt>
		</ReqdExctnDt>
		<Dbtr>
			<Nm>ABC Corporation</Nm>
			<PstlAdr>
				<StrtNm>Times Square</StrtNm>
				<BldgNb>7</BldgNb>
				<PstCd>NY 10036</PstCd>
				<TwnNm>New York</TwnNm>
				<Ctry>US</Ctry>
			</PstlAdr>
		</Dbtr>
		<DbtrAcct>
			<Id>
				<Othr>
					<Id>00125574999</Id>
				</Othr>
			</Id>
		</DbtrAcct>
		<DbtrAgt>
			<FinInstnId>
				<BICFI>BBBBUS33</BICFI>
			</FinInstnId>
		</DbtrAgt>
		<CdtTrfTxInf>
			<PmtId>
				<InstrId>ABC/120928/CCT001/01</InstrId>
				<EndToEndId>ABC/4562/2012-09-08</EndToEndId>
			</PmtId>
			<Amt>
				<InstdAmt Ccy="JPY">10000000</InstdAmt>
			</Amt>
			<ChrgBr>SHAR</ChrgBr>
			<CdtrAgt>
				<FinInstnId>
					<BICFI>AAAAGB2L</BICFI>
				</FinInstnId>
			</CdtrAgt>
			<Cdtr>
				<Nm>DEF Electronics</Nm>
				<PstlAdr>
					<AdrLine>Corn Exchange 5th Floor</AdrLine>
					<AdrLine>Mark Lane 55</AdrLine>
					<AdrLine>EC3R7NE London</AdrLine>
					<AdrLine>GB</AdrLine>
				</PstlAdr>
			</Cdtr>
			<CdtrAcct>
				<Id>
					<Othr>
						<Id>23683707994125</Id>
					</Othr>
				</Id>
			</CdtrAcct>
			<Purp>
				<Cd>GDDS</Cd>
			</Purp>
			<RmtInf>
				<Strd>
					<RfrdDocInf>
						<Tp>
							<CdOrPrtry>
								<Cd>CINV</Cd>
							</CdOrPrtry>
						</Tp>
						<Nb>4562</Nb>
						<RltdDt>2012-09-08</RltdDt>
					</RfrdDocInf>
				</Strd>
			</RmtInf>
		</CdtTrfTxInf>
		<CdtTrfTxInf>
			<PmtId>
				<InstrId>ABC/120928/CCT001/2</InstrId>
				<EndToEndId>ABC/ABC-13679/2012-09-15</EndToEndId>
			</PmtId>
			<Amt>
				<InstdAmt Ccy="EUR">500000</InstdAmt>
			</Amt>
			<ChrgBr>CRED</ChrgBr>
			<CdtrAgt>
				<FinInstnId>
					<BICFI>DDDDBEBB</BICFI>
				</FinInstnId>
			</CdtrAgt>
			<Cdtr>
				<Nm>GHI Semiconductors</Nm>
				<PstlAdr>
					<StrtNm>Avenue Brugmann</StrtNm>
					<BldgNb>415</BldgNb>
					<PstCd>1180</PstCd>
					<TwnNm>Brussels</TwnNm>
					<Ctry>BE</Ctry>
				</PstlAdr>
			</Cdtr>
			<CdtrAcct>
				<Id>
					<IBAN>BE30001216371411</IBAN>
				</Id>
			</CdtrAcct>
			<InstrForCdtrAgt>
				<Cd>PHOB</Cd>
				<InstrInf>+32/2/2222222</InstrInf>
			</InstrForCdtrAgt>
			<Purp>
				<Cd>GDDS</Cd>
			</Purp>
			<RmtInf>
				<Strd>
					<RfrdDocInf>
						<Tp>
							<CdOrPrtry>
								<Cd>CINV</Cd>
							</CdOrPrtry>
						</Tp>
						<Nb>ABC-13679</Nb>
						<RltdDt>2012-09-15</RltdDt>
					</RfrdDocInf>
				</Strd>
			</RmtInf>
		</CdtTrfTxInf>
		<CdtTrfTxInf>
			<PmtId>
				<InstrId>ABC/120928/CCT001/3</InstrId>
				<EndToEndId>ABC/987-AC/2012-09-27</EndToEndId>
			</PmtId>
			<Amt>
				<InstdAmt Ccy="USD">1000000</InstdAmt>
			</Amt>
			<ChrgBr>SHAR</ChrgBr>
			<CdtrAgt>
				<FinInstnId>
					<BICFI>BBBBUS66</BICFI>
				</FinInstnId>
			</CdtrAgt>
			<Cdtr>
				<Nm>ABC Corporation</Nm>
				<PstlAdr>
					<Dept>Treasury department</Dept>
					<StrtNm>Bush Street</StrtNm>
					<BldgNb>13</BldgNb>
					<PstCd>CA 94108</PstCd>
					<TwnNm>San Francisco</TwnNm>
					<Ctry>US</Ctry>
				</PstlAdr>
			</Cdtr>
			<CdtrAcct>
				<Id>
					<Othr>
						<Id>4895623</Id>
					</Othr>
				</Id>
			</CdtrAcct>
			<Purp>
				<Cd>INTC</Cd>
			</Purp>
			<RmtInf>
				<Strd>
					<RfrdDocInf>
						<Tp>
							<CdOrPrtry>
								<Cd>CINV</Cd>
							</CdOrPrtry>
						</Tp>
						<Nb>987-AC</Nb>
						<RltdDt>2012-09-27</RltdDt>
					</RfrdDocInf>
				</Strd>
			</RmtInf>
		</CdtTrfTxInf>
	</PmtInf>
</CstmrCdtTrfInitn>
</Document>
``` 

</details> 

#### Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
```
