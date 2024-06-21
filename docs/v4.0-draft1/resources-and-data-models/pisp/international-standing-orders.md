# International Standing Orders - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /international-standing-orders](#post-international-standing-orders)
    - [Status](#status)
  - [GET /international-standing-orders/{InternationalStandingOrderPaymentId}](#get-international-standing-orders-internationalstandingorderpaymentid)
    - [Status](#status-2)
  - [GET /international-standing-orders/{InternationalStandingOrderPaymentId}/payment-details](#get-international-standing-orders-internationalstandingorderpaymentid-payment-details)
    - [Status](#status-3)
  - [State Model](#state-model)
    - [Payment Order](#payment-order)
      - [Multiple Authorisation](#multiple-authorisation)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBInternationalStandingOrder4](#obinternationalstandingorder4)
  - [International Standing Order - Request](#international-standing-order-request)
    - [UML Diagram](#uml-diagram)
    - [Notes](#notes)
    - [Data Dictionary](#data-dictionary)
  - [International Standing Order - Response](#international-standing-order-response)
    - [UML Diagram](#uml-diagram-2)
    - [Notes](#notes-2)
    - [Data Dictionary](#data-dictionary-2)
  - [International Standing Order - Payment Details - Response](#international-standing-order-payment-details-response)
    - [UML Diagram](#uml-diagram-3)
    - [Data Dictionary](#data-dictionary-3)
- [Usage Examples](#usage-examples)
  - [POST /international-standing-orders](#post-international-standing-orders-2)
    - [Request](#request)
    - [Response](#response)

## Overview

The International Standing Orders resource is used by a PISP to initiate an International Standing Order.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| international-standing-orders |POST |POST /international-standing-orders |Conditional |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteInternationalStandingOrder4 |OBWriteInternationalStandingOrderResponse7 |
| international-standing-orders |GET |GET /international-standing-orders/{InternationalStandingOrderPaymentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteInternationalStandingOrderResponse7 |
| payment-details |GET |GET /international-standing-orders/{InternationalStandingOrderPaymentId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

### POST /international-standing-orders

Once the international-standing-order-consent has been authorised by the PSU, the PISP can proceed to submit the international-standing-orders for processing:

* This is done by making a POST request to the **international-standing-orders** endpoint.
* This request is an instruction to the ASPSP to begin the international standing order journey. The PISP must submit the international standing order immediately, however, there are some scenarios where the ASPSP may not warehouse the international standing order immediately (e.g. busy periods at the ASPSP).
* The PISP **must** ensure that the Initiation and Risk sections of the international-standing-orders match the corresponding Initiation and Risk sections of the international-standing-order-consent resource. If the two do not match, the ASPSP **must not** process the request and **must** respond with a 400 (Bad Request).
* Any operations on the international-standing-orders resource will not result in a Status change for the international-standing-orders resource.

#### Status

An international-standing-orders can only be created if its corresponding international-standing-order-consent resource has the Status of "AUTH". 

The international-standing-orders resource that is created successfully must have one of the following initial StatusCodes:

| Status |
| --- |
| RCVD |
| RJCT |

### GET /international-standing-orders/{InternationalStandingOrderPaymentId}

A PISP can retrieve the international-standing-orders to check its status.

#### Status

The international-standing-orders resource must have one of the following StatusCodes:

| Status |
| --- |
| RCVD |
| CANC |
| ACTC |
| PATC |
| PDNG |
| INFA |
| INCO |
| RJCT |

For full flow refer to state 1 diagram bellow.

Refer to [External_Internal_CodeSets](https://github.com/OpenBankingUK/External_Internal_CodeSets) -> ISO_External_CodeSet -> `ExternalPaymentTransactionStatus1Code`.

### GET /international-standing-orders/{InternationalStandingOrderPaymentId}/payment-details

A PISP can retrieve the Details of the underlying payment transaction via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

#### Status

The international-standing-orders - payment-details must have one of the following ExternalPaymentTransactionStatus1Code code-set enumerations (for more information see `ExternalPaymentTransactionStatus1Code` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)) :

| Status |
| ------ |
| INCO |
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

For full flow refer to state 2 diagram bellow.

Refer to [External_Internal_CodeSets](https://github.com/OpenBankingUK/External_Internal_CodeSets) -> ISO_External_CodeSet -> `ExternalPaymentTransactionStatus1Code`.

### State Model

#### Payment Order

The state model for the international-standing-orders resource describes the initiation status and the subsequent execution of the international-standing-orders.

__Payment order state model key:__
| Colour (Style) | Description |
| --- | --- |
| Green (Bold) | Mandatory |
| Orange (Italic) | Optional, but recommended |

![Payment Order Status](./images/PIS_PO_SOFlow1Statuses.png)

##### State 2
![Payment Order Status](./images/PIS_PO_SOFlow2Statuses.png)


##### Multiple Authorisation
If the payment-order requires multiple authorisations the status of the multiple authorisations will be updated in the MultiAuthorisation object.

Once the payment is RCVD, the international-standing-orders Status must be set to PATC and the MultiAuthorisation object status updated with the AWAF status. Once all authorisations have been successfully completed the MultiAuthorisation status must be set to AUTH and international-standing-orders Status updated to ACSP if any intermediate status are not supported.

Any rejections in the multiple authorisation process should result in the MultiAuthorisation status and Status being set to RJCT. 


![Multi Auth](./images/PO_MultiAuthFlow.png)

The definitions for the Status:

|  |Status |Status Description |
| --- |--- |--- |
| 1 |AWAU |The payment-order resource is awaiting further authorisation. |
| 2 |RJCT |The payment-order resource has been rejected by an authoriser. |
| 3 |AUTH |The payment-order resource has been successfully authorised by all required authorisers. |


## Data Model

The data dictionary section gives the detail on the payload content for the International Standing Order API flows.

### Reused Classes

#### OBInternationalStandingOrder4

The OBInternationalStandingOrder4 class is defined in the [international-standing-order-consents](./international-standing-order-consents.md#obinternationalstandingOrder4) page.


### International Standing Order - Request

The OBWriteInternationalStandingOrder4 object will be used for a call to:

* POST /international-standing-orders

#### UML Diagram

![ OBWriteInternationalStandingOrder4 ](./images/OBWriteInternationalStandingOrder4.svg )

#### Notes

The international-standing-orders **request** object contains the: 

* ConsentId.
* The full Initiation and Risk objects from the international-standing-order-consent request.

The **Initiation** and **Risk** sections of the international-standing-orders request **must** match the **Initiation** and **Risk** sections of the corresponding international-standing-order-consent request.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteInternationalStandingOrder4 | |OBWriteInternationalStandingOrder4 | |OBWriteInternationalStandingOrder4 | | |
| Data |1..1 |OBWriteInternationalStandingOrder4/Data | |OBWriteDataInternationalStandingOrder4 | | |
| ConsentId |1..1 |OBWriteInternationalStandingOrder4/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteInternationalStandingOrder4/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for an international standing order. |OBInternationalStandingOrder4 | | |
| Risk |1..1 |OBWriteInternationalStandingOrder4/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### International Standing Order - Response

The OBWriteInternationalStandingOrderResponse7 object will be used for a response to a call to:

* POST /international-standing-orders
* GET /international-standing-orders/{InternationalStandingOrderPaymentId}

#### UML Diagram

![ OBWriteInternationalStandingOrderResponse7 ](./images/OBWriteInternationalStandingOrderResponse7.svg )

#### Notes 

The international-standing-orders **response** object contains the:

* InternationalStandingOrderPaymentId.
* ConsentId.
* CreationDateTime the international-standing-orders resource was created.
* Status and StatusUpdateDateTime of the international-standing-orders resource.
* The Charges in the international-standing-order-consent response from the ASPSP.
* Refund account details, if requested by PISP as part of the international-scheduled-payment-consents resource.
* The Initiation object from the international-standing-order-consent.
* The MultiAuthorisation object if the international-standing-order resource requires multiple authorisations.
* An ASPSP should conditionally provide `Debtor/Name` in the Payment Order Response, even when the Payer didn't provide the Debtor Account via PISP.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWriteInternationalStandingOrderResponse7 | |OBWriteInternationalStandingOrderResponse7 | |OBWriteInternationalStandingOrderResponse7 | | |
| Data |1..1 |OBWriteInternationalStandingOrderResponse7/Data | |OBWriteDataInternationalStandingOrderResponse7 | | |
| InternationalStandingOrderId |1..1 |OBWriteInternationalStandingOrderResponse7/Data/InternationalStandingOrderId |OB: Unique identification as assigned by the ASPSP to uniquely identify the international standing order resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteInternationalStandingOrderResponse7/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteInternationalStandingOrderResponse7/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteInternationalStandingOrderResponse7/Data/Status |Specifies the status of resource in code form. |For a full list of enumeration values refer to `External_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |ExternalPaymentTransactionStatus1Code | |
| StatusUpdateDateTime |1..1 |OBWriteInternationalStandingOrderResponse7/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| StatusReason |0..* |OBWriteInternationalStandingOrderResponse7/Data/StatusReason |Specifies the status reason. | OBStatusReason |
| StatusReasonCode |0..1 |OBWriteInternationalStandingOrderResponse7/Data/StatusReason/StatusReasonCode |Specifies the status reason in a code form. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)| OBInternalPermissions1Code |
| StatusReasonDescription |0..1 |OBWriteInternationalStandingOrderResponse7/Data/StatusReason/StatusReasonDescription |Description supporting the StatusReasonCode. | Max500Text |
|Path| 0..1 | OBWriteInternationalStandingOrderResponse7/Data/StatusReason/Path| Path is optional but relevant when the status reason refers to an object/field and hence conditional to provide JSON path.| Max500Text| | |
| Refund |0..1 |OBWriteInternationalStandingOrderResponse7/Data/Refund |Unambiguous identification of the refund account to which a refund will be made as a result of the transaction. |OBInternationalRefundAccount1 | | |
| Charges |0..* |OBWriteInternationalStandingOrderResponse7/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteInternationalStandingOrderResponse7/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for an international standing order. |OBInternationalStandingOrder4 | | |
| MultiAuthorisation |0..1 |OBWriteInternationalStandingOrderResponse7/Data/MultiAuthorisation | |OBMultiAuthorisation1 | | |
| Debtor |0..1 |OBWriteInternationalStandingOrderResponse7/Data/Debtor |Set of elements used to identify a person or an organisation. | | | |
| SchemeName |0..1 |OBWriteInternationalStandingOrderResponse7/Data/Debtor/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here].(https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |0..1 |OBWriteInternationalStandingOrderResponse7/Data/Debtor/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBWriteInternationalStandingOrderResponse7/Data/Debtor/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| SecondaryIdentification |0..1 |OBWriteInternationalStandingOrderResponse7/Data/Debtor/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| LEI |0..1 | OBWriteInternationalStandingOrderResponse7/Data/Debtor/LEI |Legal Entity Identification Legal entity identification as an alternate identification for a party. Legal Entity Identifier is a code allocated to a party as described in ISO 17442 "Financial Services - Legal Entity Identifier (LEI)". |Max20Text | |^[A-Z0-9]{18,18}[0-9]{2,2}$ |

### International Standing Order - Payment Details - Response

The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:

* GET /international-standing-orders/{InternationalStandingOrderPaymentId}/payment-details

#### UML Diagram

![ OBWritePaymentDetailsResponse1 ](./images/OBWritePaymentDetailsResponse1.svg )

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| PaymentStatus |0..*|OBWritePaymentDetailsResponse1/Data/PaymentStatus |Payment status details. |OBWritePaymentDetails1 | | |

## Usage Examples

### POST /international-standing-orders

#### Request

```
POST /international-standing-orders HTTP/1.1
Authorization: Bearer eYJQLMQLMQLM
x-idempotency-key: FRESNO.1317.GFX.22
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date:  Mon, 01 Jan 2018 02:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
	"ConsentId": "ISOC-100",
    "Initiation": {
	  "Frequency": "EvryWorkgDay",
    "ChargeBearer": "Shared", 
    "Purpose": "CCRD",
    "DestinationCountryCode": "GB",  
	  "FirstPaymentDateTime": "2018-06-06T06:06:06+00:00",
	  "FinalPaymentDateTime": "2020-03-20T06:06:06+00:00",
	  "DebtorAccount":{
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "08080021325698",
      "Name": "ACME Inc",
      "SecondaryIdentification": "0002",
      "LEI": "8200007YHFDMEODY1965",
      "Proxy": {
        "Identification": "07700900000",
        "Code": "TELE",
        "Type": "Telephone"
      },
    },
    "CreditorAccount": {
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "08080021325698",
      "Name": "ACME Inc",
      "SecondaryIdentification": "0002",
      "Proxy": {
        "Identification": "+441632960540",
        "Code": "TELE",
        "Type": "Telephone"
      },
    },
	  "InstructedAmount": {
        "Amount": "20",
        "Currency": "EUR"
	  },
    "Creditor": {
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "LEI": "8200007YHFDMEODY8412",
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
	  "CurrencyOfTansfer":"EUR",
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
          "Unstructured": "Internal ops code 5120101"
        }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty",
    "PaymentPurposeCode": "EPAY",
    "CategoryPurposeCode": "CASH", 
    "ExtendedPurpose": "Required when no 4 character code fits the purpose",
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
    "InternationalStandingOrderId": "SO-ISOC-100",
    "ConsentId": "ISOC-100",
    "CreationDateTime": "2018-01-01T06:06:36+00:00",
    "Status": "ACSP",
    "StatusUpdateDateTime": "2018-01-01T06:36:06+00:00",
    "Refund": {
      "Creditor" : {
        "Name":"NTPC Ltd"
      },
      "Account": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325677",
        "Name": "NTPC Inc"
      }
    },
    "MultiAuthorisation": { 
      "StatusCode": "AUTH", 
      "NumberRequired": 2,
      "NumberReceived": 2,
      "LastUpdateDateTime": "2017-06-05T15:15:13+00:00",
      "ExpirationDateTime": "2017-06-06T15:15:13+00:00",
    },
    "Initiation": {
      "ChargeBearer": "Shared",   
      "Purpose": "CCRD",
      "Frequency": "EvryWorkgDay",
      "DestinationCountryCode": "GB",
      "FirstPaymentDateTime": "2018-06-06T06:06:06+00:00",
      "FinalPaymentDateTime": "2020-03-20T06:06:06+00:00",
      "DebtorAccount":{
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002",
        "LEI": "8200007YHFDMEODY1965",
        "Proxy": {
          "Identification": "07700900000",
          "Code": "TELE",
          "Type": "Telephone"
          },
      },
      "Refund":{
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus",
        "Proxy": {
          "Identification": "441234012385",
          "Code": "TELE",
          "Type": "Telephone"
        }
      },
      "Creditor": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "LEI": "8200007YHFDMEODY8412",
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
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002",
        "Proxy": {
          "Identification": "+441632960540",
          "Code": "TELE",
          "Type": "Telephone"
        },
      },
      "InstructedAmount": {
        "Amount": "20",
        "Currency": "EUR"
      },
      "CurrencyOfTansfer":"EUR",
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
          "Unstructured": "Internal ops code 5120101"
        }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty",
    "PaymentPurposeCode": "EPAY",
    "CategoryPurposeCode": "CASH", 
    "ExtendedPurpose": "Required when no 4 character code fits the purpose",
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
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-standing-orders/SO-ISOC-100"
  },
  "Meta": {}
}
```
