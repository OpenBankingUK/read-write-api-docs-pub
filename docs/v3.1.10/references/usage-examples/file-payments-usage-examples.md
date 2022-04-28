# File Payment Usage Examples - v3.1.10 <!-- omit in toc -->

- [Setup File Payment Consent](#setup-file-payment-consent)
  - [POST /file-payment-consents](#post-file-payment-consents)
    - [Request](#request)
    - [Response](#response)
- [Upload File to for the File Payment Consent](#upload-file-to-for-the-file-payment-consent)
  - [POST /file-payment-consents/{ConsentId}/file](#post-file-payment-consentsconsentidfile)
    - [Request](#request-1)
    - [Response](#response-1)
- [Submit the File Payment after Authorisation](#submit-the-file-payment-after-authorisation)
  - [POST /file-payments](#post-file-payments)
    - [Request](#request-2)
    - [Response](#response-2)
- [Upload File in the UK.OBIE.PaymentInitiation.4.0 format to the File Payment Consent](#upload-file-in-the-ukobiepaymentinitiation40-format-to-the-file-payment-consent)
  - [POST /file-payment-consents/{ConsentId}/file](#post-file-payment-consentsconsentidfile-1)
    - [Request](#request-3)
    - [Response](#response-3)

## Setup File Payment Consent

This is an API call by the PISP to create the file-payment-consent metadata.

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

## Upload File to for the File Payment Consent

Once the metadata has been accepted by the ASPSP, the PISP may post the file to the file endpoint.

The file should conform to the XML ISO20022 pain.001.001.08 format.

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

## Submit the File Payment after Authorisation

Once the metadata and file are both attached to the consent, and the user is able to authorise the consent.

The PISP must POST the file-payment resource to submit the file-payment for execution. The JSON message is signed.

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
	"FilePaymentId":"FP1-512345",
    "Status": "InitiationPending",
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
     "Self":"https://api.alphabank.com/open-banking/v4.0/pisp/file-payments/FP1-512345"
  },
  "Meta":{}
}
```

## Upload File in the UK.OBIE.PaymentInitiation.4.0 format to the File Payment Consent

Steps:

* Stage the File Payment Consent with  "FileType": "UK.OBIE.PaymentInitiation.4.0".
* Upload the File with payments in UK.OBIE.PaymentInitiation.v4.0 format, as described below.

### POST /file-payment-consents/{ConsentId}/file

#### Request

```
POST /file-payment-consents/512346/file HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 UTC
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json

[ File Data ]
```

A sample file with 3 Domestic Payments - CHAPS, BACS and one unspecified is provided below:

<details>
  <summary>File Data Expand source</summary>

```json
{
	"Data": {
		"DomesticPayments": [{
			"InstructionIdentification": "ANSM020",
			"EndToEndIdentification": "FRESCO.21302.GFX.01",
			"LocalInstrument": "UK.OBIE.CHAPS",
			"InstructedAmount": {
				"Amount": "21.00",
				"Currency": "GBP"
			},
			"DebtorAccount": {
				"SchemeName": "UK.OBIE.SortCodeAccountNumber",
				"Identification": "11280001234567",
				"Name": "Andrea Smith"
			},
			"CreditorAccount": {
				"SchemeName": "UK.OBIE.SortCodeAccountNumber",
				"Identification": "08080021325698",
				"Name": "Bob Clements"
			},
			"CreditorPostalAddress": {
				"AddressType": "Correspondence",
				"StreetName": "Liberty",
				"BuildingNumber": "1",
				"PostCode": "AB1 2CD",
				"TownName": "London",
				"Country": "UK"
			},
			"RemittanceInformation": {
				"Reference": "FRESCO-037",
				"Unstructured": "Internal ops code 5120103"
			}
		}, {
			"InstructionIdentification": "ANSM021",
			"EndToEndIdentification": "FRESCO.21302.GFX.02",
			"LocalInstrument": "UK.OBIE.BACS",
			"InstructedAmount": {
				"Amount": "22.00",
				"Currency": "GBP"
			},
			"DebtorAccount": {
				"SchemeName": "UK.OBIE.SortCodeAccountNumber",
				"Identification": "11280001234567",
				"Name": "Andrea Smith"
			},
			"CreditorAccount": {
				"SchemeName": "UK.OBIE.SortCodeAccountNumber",
				"Identification": "08080021325698",
				"Name": "Bob Clements"
			},
			"RemittanceInformation": {
				"Reference": "FRESCO-037",
				"Unstructured": "Internal ops code 5120103"
			}
		}, {
			"InstructionIdentification": "ANSM022",
			"EndToEndIdentification": "FRESCO.21302.GFX.03",
			"InstructedAmount": {
				"Amount": "23.00",
				"Currency": "GBP"
			},
			"DebtorAccount": {
				"SchemeName": "UK.OBIE.SortCodeAccountNumber",
				"Identification": "11280001234567",
				"Name": "Andrea Smith"
			},
			"CreditorAccount": {
				"SchemeName": "UK.OBIE.SortCodeAccountNumber",
				"Identification": "08080021325698",
				"Name": "Bob Clements"
			},
			"RemittanceInformation": {
				"Reference": "FRESCO-037",
				"Unstructured": "Internal ops code 5120103"
			}
		}]
	}
}
```

</details>

#### Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
```
