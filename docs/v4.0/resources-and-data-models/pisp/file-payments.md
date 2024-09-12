# File Payments - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /file-payments](#post-file-payments)
  - [GET /file-payments/{FilePaymentId}](#get-file-payments-filepaymentid)
    - [Status](#status)
  - [GET /file-payments/{FilePaymentId}/report-file](#get-file-payments-filepaymentid-report-file)
  - [GET /file-payments/{FilePaymentId}/payment-details](#get-file-payments-filepaymentid-payment-details)
    - [Status](#status-2)
  - [State Model](#state-model)
    - [Initiation](#initiation)
    - [Multiple Authorisation](#multiple-authorisation)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBFile2](#obfile2)
  - [File Payment - Request](#file-payment-request)
    - [UML Diagram](#uml-diagram)
    - [Notes](#notes)
    - [Data Dictionary](#data-dictionary)
  - [File Payment - Response](#file-payment-response)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [File Payment - Payment Details - Response](#file-payment-payment-details-response)
    - [UML Diagram](#uml-diagram-3)
    - [Data Dictionary](#data-dictionary-3)
- [Usage Examples](#usage-examples)
  - [POST /file-payments](#post-file-payments-2)
    - [Request](#request)
    - [Response](#response)

## Overview

The File Payment resource is used by a PISP to initiate a File Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| file-payments |POST |POST /file-payments |Conditional |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteFile2 |OBWriteFileResponse3 |
| file-payments |GET |GET /file-payments/{FilePaymentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteFileResponse3 |
| file-payments |GET |GET /file-payments/{FilePaymentId}/report-file |Conditional |payments |Client Credentials |Signed Response |No |NA |File |
| payment-details |GET |GET /file-payments/{FilePaymentId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

### POST /file-payments

Once the file-payment-consent has been authorised by the PSU, the PISP can proceed to submit the file-payment for processing:

- This is done by making a POST request to the **file-payments** endpoint.

### GET /file-payments/{FilePaymentId}

A PISP can retrieve the file-payment to check its status.

#### Status

The file-payments resource must have one of the following initial status codes:

| Status |
| --- |
| RCVD |
| RJCT |

### GET /file-payments/{FilePaymentId}/report-file

The API endpoint allows the PISP to download a payment report file from an ASPSP.

* This endpoint enables ASPSP to return a report on the processing results of Payments in the file
* The file is sent in the HTTP response body.
* The file structure may match a payment execution report for the corresponding FileType in the file-payment-consent request.
* HTTP headers (e.g. Content-Type) are used to describe the file.

### GET /file-payments/{FilePaymentId}/payment-details

A PISP can retrieve the Details of the underlying payment transaction(s) via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

#### Status

The file-payments - payment-details must have one of the following ExternalPaymentGroupStatus1Code code-set enumerations (for more information see `ExternalPaymentGroupStatus1Code` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)) :

| Status |
| ------ |
| RCVD |
| PDNG |
| ACTC |
| PART |
| ACCP |
| ACFC |
| ACSP |
| ACWC |
| ACSC |
| ACCC |
| RJCT |

Refer to [External_Internal_CodeSets](https://github.com/OpenBankingUK/External_Internal_CodeSets) -> ISO_External_CodeSet -> `ExternalPaymentGroupStatus1Code`.

### State Model

#### Initiation

The state model describes the initiation status only

![File Initiation Status](./images/FilePaymentInitiationModel.png)


##### Multiple Authorisation
If the payment-order requires multiple authorisations the status of the multiple authorisations will be updated in the MultiAuthorisation object.

Once the payment is RCVD, the file-payments Status must be set to PATC and the MultiAuthorisation object status updated with the AWAF status. Once all authorisations have been successfully completed the MultiAuthorisation status must be set to AUTH and file-payments Status updated to ACSP if any intermediate status are not supported.

Any rejections in the multiple authorisation process should result in the MultiAuthorisation status and Status being set to RJCT. 


![Multi Auth](./images/PO_MultiAuthFlow.png)

|  | Status |Status Description |
| ---| ------ |------------------ |
| 1 |AWAU |The payment-order resource is awaiting further authorisation. |
| 2 |RJCT |The payment-order resource has been rejected by an authoriser. |
| 3 |AUTH |The payment-order resource has been successfully authorised by all required authorisers. |

## Data Model

The data dictionary section gives the detail on the payload content for the File Payment API flows.

### Reused Classes

#### OBFile2

The OBFile2 class is defined in the [file-payment-consents](./file-payment-consents.md#OBFile2) page.


### File Payment - Request

The OBWriteFile2 object will be used for a call to:

* POST /file-payments

#### UML Diagram

![OBWriteFile2](./images/OBWriteFile2.svg )

#### Notes 

The file-payment **request** object contains the: 

* ConsentId.
* The full Initiation object from the file-payment-consent request.

The **Initiation** section of the file-payment request **must** match the **Initiation** section of the corresponding file-payment-consent request.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteFile2 | |OBWriteFile2 | |OBWriteFile2 | | |
| Data |1..1 |OBWriteFile2/Data | |OBWriteDataFile2 | | |
| ConsentId |1..1 |OBWriteFile2/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteFile2/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file. |OBFile2 | | |

### File Payment - Response

The OBWriteFileResponse3 object will be used for a response to a call to:

* POST /file-payments
* GET /file-payments/{FilePaymentId}

#### UML Diagram

![OBWriteFileResponse3](./images/OBWriteFileResponse3.svg)

#### Notes 

The file-payment **response** object contains the:

* FilePaymentId.
* ConsentId.
* CreationDateTime the file-payment resource was created.
* Status and StatusUpdateDateTime of the file-payment resource.
* Charges array is used for the breakdown of applicable ASPSP charges.
* The Initiation object from the file-payment-consent.
* The MultiAuthorisation object if the file-payment resource requires multiple authorisations.
* An ASPSP should conditionally provide `Debtor/Name` in the Payment Order Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteFileResponse3 | |OBWriteFileResponse3 | |OBWriteFileResponse3 | | |
| Data |1..1 |OBWriteFileResponse3/Data | |OBWriteDataFileResponse3 | | |
| FilePaymentId |1..1 |OBWriteFileResponse3/Data/FilePaymentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the file payment resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteFileResponse3/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteFileResponse3/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteFileResponse3/Data/Status |Specifies the status of the payment order resource. |For a full list of enumeration values refer to `External_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |ExternalPaymentTransactionStatus1Code | |
| StatusUpdateDateTime |1..1 |OBWriteFileResponse3/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| StatusReason |0..* |OBWriteFileResponse3/Data/StatusReason |Specifies the status reason. | OBStatusReason |
| StatusReasonCode |0..1 |OBWriteFileResponse3/Data/StatusReason/StatusReasonCode |Specifies the status reason in a code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)| OBExternalStatusReason1Code |
| StatusReasonDescription |0..1 |OBWriteFileResponse3/Data/StatusReason/StatusReasonDescription |Description supporting the StatusReasonCode. |Max500Text|
|Path| 0..1 | OBWriteFileResponse3/Data/StatusReason/Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path| Max500Text| | |
| Charges |0..* |OBWriteFileResponse3/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteFileResponse3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file. |OBFile2 | | |
| MultiAuthorisation |0..1 |OBWriteFileResponse3/Data/MultiAuthorisation |The multiple authorisation flow response from the ASPSP. |OBMultiAuthorisation1 | | |
| Debtor |0..1 |OBWriteFileResponse3/Data/Debtor |Set of elements used to identify a person or an organisation. | OBCashAccountDebtor4| | |

### File Payment - Payment Details - Response

The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:

* GET /file-payments/{FilePaymentId}/payment-details

#### UML Diagram

![OBWritePaymentDetailsResponse1](./images/OBWritePaymentDetailsResponse1.svg )

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| PaymentStatus |0..*|OBWritePaymentDetailsResponse1/Data/PaymentStatus |Payment status details. |OBWritePaymentDetails1 | | |

## Usage Examples

### POST /file-payments

#### Request

```
POST /file-payments HTTP/1.1
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
    "ConsentId":"512345",
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
		"Unstructured": "Internal ops code 5120101"
   	  }
    },
  },
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
	  "FilePaymentId":"FP1-512345",
    "Status": "RCVD",
    "CreationDateTime": "2018-06-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2018-06-05T15:15:13+00:00",
    "StatusReason": { 
      "StatusReasonCode": "U030",
      "StatusReasonDescription": "Payment order successfully received"
    },
    "Charges": [{
      "ChargeBearer": "Shared",
      "Type": "UK.OBIE.CHAPSOut",
      "Amount"  {
        "Amount": "0.88",
        "Currency": "GBP"
      },
    }],
    "Debtor": { 
	 	  "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "11280001234567",
        "Name": "Andrea Smith",
        "SecondaryIdentification": "0002",	
        "LEI": "8200007YHFDMEODY1965",
	  },
     "MultiAuthorisation": { 
      "Status": "AUTH", 
      "NumberRequired": 2,
      "NumberReceived": 2,
      "LastUpdateDateTime": "2017-06-05T15:15:13+00:00",
      "ExpirationDateTime": "2017-06-06T15:15:13+00:00",
    },
    "Initiation": {
      "FileType": "UK.OBIE.pain.001.001.08",
      "FileHash": "m5ah/h1UjLvJYMxqAoZmj9dKdjZnsGNm+yMkJp/KuqQ",
      "FileReference": "GB2OK238",
      "NumberOfTransactions": "100",
      "ControlSum": 3459.30,
      "LocalInstrument": "UK.OBIE.CHAPS",
      "RequestedExecutionDateTime": "2024-06-03T00:00:00Z",
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
	      "Unstructured": "Internal ops code 5120101",
   	  }
    }
  },
  "Links":{
     "Self":"https://api.alphabank.com/open-banking/v4.0/pisp/file-payments/FP1-512345"
  },
  "Meta":{}
}
```
