# File Payment Consents - v3.1.10 <!-- omit in toc -->

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

The default Status is "AwaitingUpload" immediately after the file-payment-consent has been created.

| Status |
| --- |
| AwaitingUpload |

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

The default Status is "AwaitingAuthorisation" immediately after the file has been uploaded.

| Status |
| --- |
| AwaitingAuthorisation |

### GET /file-payment-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status. 

#### Status

Once the PSU authorises the payment-consent resource, the Status of the payment-consent resource will be updated with "Authorised".

If the PSU rejects the consent or the file-payment-consent has failed some other ASPSP validation, the Status will be set to "Rejected".

Once a file-payment has been successfully created using the file-payment-consent, the Status of the file-payment-consent will be set to "Consumed".

The available Status codes for the file-payment-consent resource are:

| Status |
| --- |
| AwaitingUpload |
| AwaitingAuthorisation |
| Rejected |
| Authorised |
| Consumed |

### GET /file-payment-consents/{ConsentId}/file

The API endpoint allows the PISP to download a file (that had been uploaded against a **file-payment-consent** resource) from an ASPSP.

* The file is sent in the HTTP response body.
* HTTP headers (e.g. Content-Type) are used to describe the file.

### State Model

#### Payment Order Consent

The state model for the file-payment-consent resource follows the generic consent state model. However, does not use the "Revoked" status, as the consent for a file-payment is not a long-lived consent.

![ image2018-7-5_15-37-22.png ](./images/image2018-7-5_15-37-22.png )

The definitions for the Status:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AwaitingUpload |The file for the consent resource is awaiting upload. |
| 2 |AwaitingAuthorisation |The consent resource is awaiting PSU authorisation. |
| 3 |Rejected |The consent resource has been rejected. |
| 4 |Authorised |The consent resource has been successfully authorised. |
| 5 |Consumed |The consented action has been successfully completed. This does not reflect the status of the consented action. |

## Data Model

The data dictionary section gives the detail on the payload content for the File Payment API flows.

### Reused Classes

#### OBFile2

This section describes the OBFile2 class, which is reused as the Initiation object in the file-payment-consent resource.

##### UML Diagram

![OBFile2](./images/OBFile2.svg )

##### Notes 

For the OBFile2 Initiation object: 

* All elements in the Initiation payload that are specified by the PISP must not be changed via the ASPSP, as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the file-payment-consent request immediately.
* If the ASPSP establishes a problem with the file-payment-consent after the API call, the ASPSP must set the Status of the file-payment-consent resource to Rejected.
* The DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU - then the file-payment-consent will be set to Rejected after PSU authentication.
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
| LocalInstrument |0..1 |OBFile2/LocalInstrument |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code | | |
| DebtorAccount |0..1 |OBFile2/DebtorAccount |Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBFile2/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBFile2/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBFile2/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBFile2/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| RemittanceInformation |0..1 |OBFile2/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation1 | | |
| Unstructured |0..1 |OBFile2/RemittanceInformation/Unstructured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text | | |
| Reference |0..1 |OBFile2/RemittanceInformation/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped. |Max35Text | | |
| SupplementaryData |0..1 |OBFile2/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

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
* Status and StatusUpdateDateTime of the file-payment-consent resource.
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
| Status |1..1 |OBWriteFileConsentResponse4/Data/Status |Specifies the status of consent resource in code form. |OBExternalConsentStatus2Code |Authorised AwaitingAuthorisation AwaitingUpload Consumed Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteFileConsentResponse4/Data/StatusUpdateDateTime |Date and time at which the consent resource status was updated. |ISODateTime | | |
| CutOffDateTime |0..1 |OBWriteFileConsentResponse4/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| Charges |0..n |OBWriteFileConsentResponse4/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteFileConsentResponse4/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds using a payment file. |OBFile2 | | |
| Authorisation |0..1 |OBWriteFileConsentResponse4/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteFileConsentResponse4/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Debtor |0..1 |OBWriteFileConsentResponse4/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteFileConsentResponse4/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |0..1 |OBWriteFileConsentResponse4/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteFileConsentResponse4/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteFileConsentResponse4/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |

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
    "Initiation": {
      "FileType": "UK.OBIE.pain.001.001.08",
      "FileHash": "m5ah/h1UjLvJYMxqAoZmj9dKdjZnsGNm+yMkJp/KuqQ",
      "FileReference": "GB2OK238",
      "NumberOfTransactions": "100",
      "ControlSum": 3459.30
    }
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
    "Status": "AwaitingUpload",
    "CreationDateTime": "2018-06-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2018-06-05T15:15:13+00:00",
    "Initiation": {
      "FileType": "UK.OBIE.pain.001.001.08",
      "FileHash": "m5ah/h1UjLvJYMxqAoZmj9dKdjZnsGNm+yMkJp/KuqQ",
      "FileReference": "GB2OK238",
      "NumberOfTransactions": "100",
      "ControlSum": 3459.30
    }
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
