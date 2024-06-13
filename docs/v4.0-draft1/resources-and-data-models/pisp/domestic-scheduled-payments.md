# Domestic Scheduled Payments  - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /domestic-scheduled-payments](#post-domestic-scheduled-payments)
    - [StatusCode](#statuscode)
  - [GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}](#get-domestic-scheduled-payments-domesticscheduledpaymentid)
    - [StatusCode](#statuscode-2)
  - [GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details](#get-domestic-scheduled-payments-domesticscheduledpaymentid-payment-details)
    - [StatusCode](#statuscode-3)
  - [State Model](#state-model)
    - [Payment Order](#payment-order)
      - [Multiple Authorisation](#multiple-authorisation)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBDomesticScheduled2](#obdomesticscheduled2)
    - [OBRemittanceInformation1](#obremittanceinformation1)
  - [Domestic Scheduled Payment - Request](#domestic-scheduled-payment-request)
    - [UML Diagram](#uml-diagram)
    - [Notes](#notes)
    - [Data Dictionary](#data-dictionary)
  - [Domestic Scheduled Payment - Response](#domestic-scheduled-payment-response)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [Domestic Schedule Payment Order - Payment Details - Response](#domestic-schedule-payment-order-payment-details-response)
    - [UML Diagram](#uml-diagram-3)
    - [Data Dictionary](#data-dictionary-3)
  - [OBRegulatoryReporting1](#obregulatoryreporting1)
- [Usage Examples](#usage-examples)
    - [Create a Domestic Scheduled Payment](#create-a-domestic-scheduled-payment)
      - [POST /domestic-scheduled-payments Request](#post-domestic-scheduled-payments-request)
      - [POST /domestic-scheduled-payments Response](#post-domestic-scheduled-payments-response)

## Overview

The Domestic Scheduled Payments resource is used by a PISP to initiate a Domestic Scheduled Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-scheduled-payments |POST |POST /domestic-scheduled-payments |Conditional |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteDomesticScheduled2 |OBWriteDomesticScheduledResponse5 |
| domestic-scheduled-payments |GET |GET /domestic-scheduled-payments/{DomesticScheduledPaymentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticScheduledResponse5 |
| payment-details |GET |GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

### POST /domestic-scheduled-payments

Once the domestic-scheduled-payment-consent has been authorised by the PSU, the PISP can proceed to submitting the domestic-scheduled-payment for processing:

* This is done by making a POST request to the **domestic-scheduled-payments** endpoint.
* This request is an instruction to the ASPSP to begin the domestic scheduled payment journey. The PISP must submit the domestic scheduled payment immediately, however, there are some scenarios where the ASPSP may not warehouse the domestic scheduled payment immediately (e.g., busy periods at the ASPSP)
* The PISP **must** ensure that the Initiation and Risk sections of the domestic-scheduled-payment match the corresponding Initiation and Risk sections of the domestic-scheduled-payment-consent resource. If the two do not match, the ASPSP **must not** process the request and **must** respond with a 400 (Bad Request).
* Any operations on the domestic-scheduled-payment resource will not result in a Status change for the domestic-scheduled-payment resource.

#### StatusCode

A domestic-scheduled-payment can only be created if its corresponding domestic-scheduled-payment-consent resource has the StatusCode of "AUTH". 

The domestic-scheduled-payment resource that is created successfully must have one of the following initial StatusCodes:

| StatusCode |
| ------ |
| RCVD |
| RJCT |

### GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}

A PISP can retrieve the domestic-scheduled-payment to check its status.

#### StatusCode

The domestic-scheduled-payment resource must have one of the following StatusCodes:

| StatusCode |
| ------ |
| RCVD |
| CANC |
| PDNG |
| ACTC |
| PATC |
| ACCP |
| ACFC |
| ACSP |
| ACWC |
| ACSC |
| ACWP |
| ACCC |
| BLCK |
| RJCT |

### GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details

A PISP can retrieve the Details of the underlying payment transaction via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

#### StatusCode

The domestic-scheduled-payments - payment-details must have one of the following PaymentStatusCode code-set enumerations:

| StatusCode |
| ------ |
| RCVD |
| CANC |
| PDNG |
| ACTC |
| PATC |
| ACCP |
| ACFC |
| ACSP |
| ACWC |
| ACSC |
| ACWP |
| ACCC |
| BLCK |
| RJCT |

Refer to [External_Internal_CodeSets](https://github.com/OpenBankingUK/External_Internal_CodeSets) -> ISO_External_CodeSet -> `ExternalPaymentTransactionStatus1Code`.

### State Model

#### Payment Order

The state model for the domestic-scheduled-payment resource describes the initiation and subsequent execution of the domestic-scheduled-payment.

__Payment order state model key:__
| Colour (Style) | Description |
| --- | --- |
| Green (Bold) | Mandatory |
| Orange (Italic) | Optional, but recommended |

![Payment Order Status](./images/PIS_PO_FDPStatuses.png)


##### Multiple Authorisation
If the payment-order requires multiple authorisations the status of the multiple authorisations will be updated in the MultiAuthorisation object.

Once the payment is RCVD, the domestic-scheduled-payment StatusCode must be set to PATC and the MultiAuthorisation object status updated with the AWAF status. Once all authorisations have been successfully completed the MultiAuthorisation status must be set to AUTH and domestic-scheduled-payment StatusCode updated to ACSP if any intermediate status are not supported.

Any rejections in the multiple authorisation process should result in the MultiAuthorisation status and StatusCode being set to RJCT. 


![Multi Auth](./images/PO_MultiAuthFlow.png)

|  | Status |Status Description |
| ---| ------ |------------------ |
| 1 |AWAF |The consent resource is awaiting further authorisation. |
| 2 |RJCT |The consent resource has been rejected. |
| 3 |AUTH |The consent resource has been successfully authorised. |

Refer to [External_Internal_CodeSets](https://github.com/OpenBankingUK/External_Internal_CodeSets) -> OB_Internal_CodeSet -> `OBInternalStatus2Code`.


## Data Model

The data dictionary section gives the detail on the payload content for the Domestic Scheduled Payment API flows.

### Reused Classes

#### OBDomesticScheduled2

The OBDomesticScheduled2 class is defined in the [domestic-scheduled-payment-consents](./domestic-scheduled-payment-consents.md#obdomesticscheduled2) page.

#### OBRemittanceInformation1

The OBRemittanceInformation1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obremittanceinformation1) page.

### Domestic Scheduled Payment - Request

The OBWriteDomesticScheduled2 object will be used for a call to:

* POST /domestic-scheduled-payments

#### UML Diagram

![Domestic Scheduled Payment - Request](./images/OBWriteDomesticScheduled2.svg)

#### Notes

The domestic-scheduled-payment **request** object contains the: 

* ConsentId.
* The full Initiation and Risk objects from the domestic-scheduled-payment-consent request.
  
The **Initiation** and **Risk** sections of the domestic-scheduled-payment request **must** match the **Initiation** and **Risk** sections of the corresponding domestic-scheduled-payment-consent request.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticScheduled2 | |OBWriteDomesticScheduled2 | |OBWriteDomesticScheduled2 | | |
| Data |1..1 |OBWriteDomesticScheduled2/Data | |OBWriteDataDomesticScheduled2 | | |
| ConsentId |1..1 |OBWriteDomesticScheduled2/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteDomesticScheduled2/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| Risk |1..1 |OBWriteDomesticScheduled2/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### Domestic Scheduled Payment - Response

The OBWriteDomesticScheduledResponse5 object will be used for a response to a call to:

* POST /domestic-scheduled-payments
* GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}

#### UML Diagram

![Domestic Scheduled Payment - Response](./images/OBWriteDomesticScheduledResponse5.svg)

#### Notes

The domestic-scheduled-payment **response** object contains the: 

* DomesticScheduledPaymentId.
* ConsentId.
* CreationDateTime the domestic-scheduled-payment resource was created.
* Status and StatusUpdateDateTime of the domestic-scheduled-payment resource.
* ExpectedExecutionDateTime for the domestic-scheduled-payment resource.
* ExpectedSettlementDateTime for the domestic-scheduled-payment resource.
* Refund account details, if requested by PISP as part of the domestic-payment-consents resource.
* Charges array - for the breakdown of applicable ASPSP charges.
* The Initiation object from the domestic-scheduled-payment-consent.
* The MultiAuthorisation object if the domestic-scheduled-payment resource requires multiple authorisations.
* An ASPSP should conditionally provide `Debtor/Name` in the Payment Order Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticScheduledResponse5 | |OBWriteDomesticScheduledResponse5 | |OBWriteDomesticScheduledResponse5 | | |
| Data |1..1 |OBWriteDomesticScheduledResponse5/Data | |OBWriteDataDomesticScheduledResponse5 | | |
| DomesticScheduledPaymentId |1..1 |OBWriteDomesticScheduledResponse5/Data/DomesticScheduledPaymentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic schedule payment resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteDomesticScheduledResponse5/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticScheduledResponse5/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| StatusCode |1..1 |OBWriteDomesticScheduledResponse5/Data/StatusCode |Specifies the status of the payment order resource. |OBExternalStatus3Code |RCVD RJCT ACSP CANC | |
| StatusUpdateDateTime |1..1 |OBWriteDomesticScheduledResponse5/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| StatusReason |0..* |OBWriteDomesticScheduledResponse5/Data/StatusReason |Specifies the status reason. | OBStatusReason |
| StatusReasonCode |0..1 |OBWriteDomesticScheduledResponse5/Data/StatusReason/StatusReasonCode |Specifies the status reason in a code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)| OBInternalPermissions1Code |
| StatusReasonDescription |0..1 |OBWriteDomesticScheduledResponse5/Data/StatusReason/StatusReasonDescription |Description supporting the StatusReasonCode. |Max500Text|
|Path| 0..1 | OBWriteDomesticScheduledResponse5/Data/StatusReason/Path| Recommended but optional reference to JSON path if relevant to the StatusReasonCode| Max500Text| | |
| ExpectedExecutionDateTime |0..1 |OBWriteDomesticScheduledResponse5/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteDomesticScheduledResponse5/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Refund |0..1 |OBWriteDomesticScheduledResponse5/Data/Refund |Unambiguous identification of the refund account to which a refund will be made as a result of the transaction. |OBDomesticRefundAccount1 | | |
| Charges |0..n |OBWriteDomesticScheduledResponse5/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticScheduledResponse5/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single scheduled domestic payment. |OBDomesticScheduled2 | | |
| MultiAuthorisation |0..1 |OBWriteDomesticScheduledResponse5/Data/MultiAuthorisation |The multiple authorisation flow response from the ASPSP. |OBMultiAuthorisation1 | | |
| Debtor |0..1 |OBWriteDomesticScheduledResponse5/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteDomesticScheduledResponse5/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |0..1 |OBWriteDomesticScheduledResponse5/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteDomesticScheduledResponse5/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteDomesticScheduledResponse5/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| RegulatoryReporting |0..10 |OBWriteDomesticScheduledResponse5/Data/RegulatoryReporting |Information needed due to regulatory and statutory requirements. |OBRegulatoryReporting1 | | |


### Domestic Schedule Payment Order - Payment Details - Response

The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:

* GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details

#### UML Diagram

![Domestic Schedule Payment Order - Payment Details - Response](./images/OBWritePaymentDetailsResponse1.svg)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| StatusDetail |0..* |OBWritePaymentDetailsResponse1/Data/StatusDetail |Array of payment status details. |OBWritePaymentDetails1 | | |

#### OBRegulatoryReporting1

The OBRegulatoryReporting1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obregulatoryreporting1) page.

## Usage Examples

#### Create a Domestic Scheduled Payment

##### POST /domestic-scheduled-payments Request

```
POST /domestic-scheduled-payments HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESNO.1317.GFX.22
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
    "ConsentId": "7290",
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
        "SecondaryIdentification": "080801562314789",
        "Name": "Andrea Frost",
        "Proxy": {
          "Identification": "441234012345",
          "Code": "TELE",
        },
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "Tom Kirkman",
        "SecondaryIdentification": "0002",
        "Proxy": {
          "Identification": "+441632960540",
          "Code": "TELE"
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
              "Invoicee": "INVE5161856"
            }
          ]
        },
        "Unstructured": "Internal ops code 5120101"
    }
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
}
```

##### POST /domestic-scheduled-payments Response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DomesticScheduledPaymentId": "7290-003",
    "ConsentId": "7290",
    "StatusCode": "RCVD",
    "StatusReason": {
      "StatusReasonCode": "U030", 
      "StatusReasonDescription":"Payment order successfully received",
    },
    "CreationDateTime": "2018-05-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2018-05-05T15:15:13+00:00",
    "ExpectedExecutionDateTime": "2018-06-05T15:15:22+00:00",
    "ExpectedSettlementDateTime": "2018-06-06T15:15:22+00:00",
    "Charges": [{
       "ChargeBearer": "Shared",
       "Type": "UK.OBIE.CHAPSOut",
       "Amount"  {
        "Amount": "0.88",
        "Currency": "GBP"
      },
    }],
    "Debtor":{
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "08080021325698",
      "Name": "ACME Inc",
      "SecondaryIdentification": "0002",
      "LEI": "8200007YHFDMEODY1965",
    },
    "MultiAuthorisation": { 
      "StatusCode": "AUTH", 
      "NumberRequired": 2,
      "NumberReceived": 2,
      "LastUpdateDateTime": "2018-06-05T15:15:13+00:00",
      "ExpirationDateTime": "2018-06-06T15:15:13+00:00",
    },
    "Refund": {
      "Account": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325677",
        "SecondaryIdentification": "0002",
        "Name": "NTPC Inc"
      }
    },
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
        "Name": "Tom Kirkman",
          "Proxy": {
          "Identification": "+441632960540",
          "Code": "TELE"
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
              "Invoicee": "INVE5161856"
            }
          ]
        }
    },
  "Risk": {
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
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-scheduled-payments/7290-003"
  },
  "Meta": {}
}
```
