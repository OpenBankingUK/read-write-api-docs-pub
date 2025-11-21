# Domestic Payment Usage Examples - v4.0.1 <!-- omit in toc -->

- [Merchant Initiation via PISP](#merchant-initiation-via-pisp)
  - [Sequence Diagram](#sequence-diagram)
  - [Illustrative Interactions](#illustrative-interactions)
    - [Create Domestic Payment Order Consent](#create-domestic-payment-order-consent)
      - [POST /domestic-payment-consents request](#post-domestic-payment-consents-request)
      - [POST  /domestic-payment-consents response](#post--domestic-payment-consents-response)
    - [Confirm Funds on Domestic Payment Order Consent](#confirm-funds-on-domestic-payment-order-consent)
      - [GET /domestic-payment-consents/{ConsentId}/funds-confirmation Request](#get-domestic-payment-consents-consentidfunds-confirmation-request)
      - [GET /domestic-payment-consents/{ConsentId}/funds-confirmation Response](#get-domestic-payment-consents-consentidfunds-confirmation-response)
    - [Create Domestic Payment Order](#create-domestic-payment-order)
      - [POST /domestic-payments Request](#post-domestic-payments-request)
      - [POST /domestic-payments Response](#post-domestic-payments-response)
    - [Get Domestic Payment Order Consent](#get-domestic-payment-order-consent)
      - [GET /domestic-payment-consents/{ConsentId} Request](#get-domestic-payment-consents-consentid-request)
      - [GET /domestic-payment-consents/{ConsentId} Response](#get-domestic-payment-consents-consentid-response)
    - [Get Domestic Payment Order](#get-domestic-payment-order)
      - [GET /domestic-payments/{DomesticPaymentId} Request](#get-domestic-paymentsdomesticpaymentid-request)
      - [GET /domestic-payments/{DomesticPaymentId} Response](#get-domestic-paymentsdomesticpaymentid-response)
- [Person To Person Initiation via PISP](#person-to-person-initiation-via-pisp)
  - [Sequence Diagram](#sequence-diagram-1)
  - [Illustrative Interactions](#illustrative-interactions-1)
    - [Create Domestic Payment Order Consent](#create-domestic-payment-order-consent-1)
      - [POST /domestic-payment-consents request](#post-domestic-payment-consents-request-1)
      - [POST /domestic-payment-consents response](#post-domestic-payment-consents-response)
    - [Create Domestic Payment Order](#create-domestic-payment-order-1)
      - [POST /domestic-payments request](#post-domestic-payments-request-1)
      - [POST /domestic-payments response](#post-domestic-payments-response-1)
    - [Get Domestic Payment Order Consent](#get-domestic-payment-order-consent-1)
      - [GET /domestic-payment-consents/{ConsentId} request](#get-domestic-payment-consents-consentid-request-1)
      - [GET /domestic-payment-consents/{ConsentId} response](#get-domestic-payment-consents-consentid-response-1)
    - [Get Domestic Payment Order](#get-domestic-payment-order-1)
      - [GET /domestic-payments/{DomesticPaymentId} request](#get-domestic-paymentsdomesticpaymentid-request-1)
      - [GET /domestic-payments/{DomesticPaymentId} response](#get-domestic-paymentsdomesticpaymentid-response-1)
- [BACS Payment Order Consent](#bacs-payment-order-consent)
  - [POST /domestic-payment-consents request](#post-domestic-payment-consents-request-2)
  - [POST /domestic-payment-consents response](#post-domestic-payment-consents-response-1)
- [CHAPS Payment Order Consent](#chaps-payment-order-consent)
  - [POST /domestic-payment-consents request](#post-domestic-payment-consents-request-3)
  - [POST /domestic-payment-consents response](#post-domestic-payment-consents-response-2)
- [Balance Transfer](#balance-transfer)
  - [POST /domestic-payment-consents request](#post-domestic-payment-consents-request-4)
  - [POST /domestic-payment-consents response](#post-domestic-payment-consents-response-3)
- [Money Transfer](#money-transfer)
  - [POST /domestic-payment-consents request](#post-domestic-payment-consents-request-5)
  - [POST /domestic-payment-consents response](#post-domestic-payment-consents-response-4)

## Merchant Initiation via PISP

This example set of flows and payload examples are for a domestic payment initiated by a merchant via a PISP.

In this scenario:

* The merchant has **not** specified the Debtor Account details for the PSU. The PSU will select their account during the authorisation of consent.
* The merchant's account is a building society account with a roll number specified in the SecondaryIdentification field.

### Sequence Diagram

![Sequence Diagram](./images/MerchantDomesticPaymentUsageExample-3.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant Merchant
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server
note over PSU, ASPSP Resource Server
Step 1: Agree Domestic Payment-Order Initiation
end note
PSU -> Merchant: Check-out and pay
Merchant -> PISP: Send request to setup domestic payment consent
note over PSU, ASPSP Resource Server
Step 2: Setup Domestic Payment-Order Consent
end note
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> PISP: access-token
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-payment-consents
ASPSP Resource Server -> PISP: HTTP 201 (Created), ConsentId
PISP -> Merchant: HTTP 302 (Found), Redirect (ConsentId)
Merchant -> PSU: HTTP 302 (Found), Redirect (ConsentId)
note over PSU, ASPSP Resource Server
Step 3: Authorize consent
end note
PSU -> ASPSP Authorisation Server: Follow redirect (ConsentId)
PSU <-> ASPSP Authorisation Server: authenticate
PSU <-> ASPSP Authorisation Server: SCA if required
PSU <-> ASPSP Authorisation Server: Select debtor account
ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (authorization-code)
PSU -> PISP: Follow redirect (authorization-code)
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
ASPSP Authorisation Server -> PISP: access-token
PISP -> PSU: HTTP 302 (Found), Redirect back to merchant
PSU -> Merchant: Follow redirect
note over PSU, ASPSP Resource Server
Step 4: Create Domestic Payment-Order
end note
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-payments
ASPSP Resource Server -> PISP: HTTP 201 (Created), DomesticPaymentId
note over PSU, ASPSP Resource Server
Step 5: Get Domestic Payment-Order status
end note
opt
Merchant -> PISP: Check payment status
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: GET /domestic-payments/{DomesticPaymentId}
ASPSP Resource Server -> PISP: HTTP 200 (OK), domestic-payments resource
PISP -> Merchant: HTTP 200 (OK), Return domestic-payments Status
end opt
```

</details>

### Illustrative Interactions

Notes:

* As per the Security & Access Control section, examples are given where the call to GET must use a client credentials grant to obtain a token to make GET requests.

#### Create Domestic Payment Order Consent

##### POST /domestic-payment-consents request

```
POST /domestic-payment-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "ReadRefundAccount": "No",
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "082",
        "Currency": "ATU"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "OE",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "CJ",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "NV",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "TO",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "HP"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T15:46:46.296Z",
              "Country": "GI",
              "Amount": {
                "Amount": "99.201",
                "Currency": "ROG"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T15:46:46.296Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "61704.11",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T15:46:46.296Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "MZ",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

##### POST  /domestic-payment-consents response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T15:46:46.340Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T15:46:46.340Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T15:46:46.340Z",
    "ExpectedExecutionDateTime": "2025-11-21T15:46:46.340Z",
    "ExpectedSettlementDateTime": "2025-11-21T15:46:46.340Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "8931308599.312",
          "Currency": "ZCP"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "797663.6",
        "Currency": "YDK"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "MP",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "HN",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "GC",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "PJ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "MW"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T15:46:46.340Z",
              "Country": "NA",
              "Amount": {
                "Amount": "5.08",
                "Currency": "GYO"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T15:46:46.340Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "17299",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T15:46:46.340Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "LR",
      "AddressLine": [
        "string"
      ]
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T15:46:46.340Z",
    "LastAvailableDateTime": "2025-11-21T15:46:46.340Z"
  }
}
```

#### Confirm Funds on Domestic Payment Order Consent

##### GET /domestic-payment-consents/{ConsentId}/funds-confirmation Request

```
GET /domestic-payment-consents/58923/funds-confirmation HTTP/1.1
Authorization: Bearer Jhingapulaav
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

##### GET /domestic-payment-consents/{ConsentId}/funds-confirmation Response

```
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "FundsAvailableResult": {
      "FundsAvailableDateTime": "2025-11-21T15:55:57.348Z",
      "FundsAvailable": true
    },
    "SupplementaryData": {
      "additionalProp1": {}
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T15:55:57.348Z",
    "LastAvailableDateTime": "2025-11-21T15:55:57.348Z"
  }
}
```

#### Create Domestic Payment Order

##### POST /domestic-payments Request

```
POST /domestic-payments HTTP/1.1
Authorization: Bearer Jhingapulaav
x-idempotency-key: FRESNO.1317.GFX.22
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "21996956",
        "Currency": "ZFA"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "TG",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "GP",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "CX",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "XJ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "QO"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T15:56:47.954Z",
              "Country": "OC",
              "Amount": {
                "Amount": "94.65",
                "Currency": "EUM"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T15:56:47.955Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "33799714",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "DC",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

##### POST /domestic-payments Response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DomesticPaymentId": "string",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:03:21.196Z",
    "Status": "RCVD",
    "StatusUpdateDateTime": "2025-11-21T16:03:21.196Z",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "ExpectedExecutionDateTime": "2025-11-21T16:03:21.196Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:03:21.196Z",
    "Refund": {
      "Account": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string"
      }
    },
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "62913256.4071",
          "Currency": "XJJ"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "137669.09",
        "Currency": "UZR"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "MA",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "LT",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "EU",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "MO",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "EC"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:03:21.196Z",
              "Country": "GK",
              "Amount": {
                "Amount": "570435628.35836",
                "Currency": "BVV"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:03:21.197Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "84304690363.92",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "MultiAuthorisation": {
      "Status": "AUTH",
      "NumberRequired": 0,
      "NumberReceived": 0,
      "LastUpdateDateTime": "2025-11-21T16:03:21.197Z",
      "ExpirationDateTime": "2025-11-21T16:03:21.197Z"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T16:03:21.197Z",
    "LastAvailableDateTime": "2025-11-21T16:03:21.197Z"
  }
}
```

#### Get Domestic Payment Order Consent

##### GET /domestic-payment-consents/{ConsentId} Request

```
GET /domestic-payment-consents/58923 HTTP/1.1
Authorization: Bearer Jhingapulaav
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

##### GET /domestic-payment-consents/{ConsentId} Response

```
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T15:58:58.346Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T15:58:58.346Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T15:58:58.346Z",
    "ExpectedExecutionDateTime": "2025-11-21T15:58:58.346Z",
    "ExpectedSettlementDateTime": "2025-11-21T15:58:58.346Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "30314784",
          "Currency": "ONI"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "761201324.67328",
        "Currency": "LLV"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "HX",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "YQ",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "VN",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "XZ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "OI"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T15:58:58.346Z",
              "Country": "PX",
              "Amount": {
                "Amount": "473198390.7",
                "Currency": "USR"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T15:58:58.346Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "822",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T15:58:58.346Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "GW",
      "AddressLine": [
        "string"
      ]
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T15:58:58.346Z",
    "LastAvailableDateTime": "2025-11-21T15:58:58.346Z"
  }
}
```

#### Get Domestic Payment Order

##### GET /domestic-payments/{DomesticPaymentId} Request

```
GET /domestic-payments/58923-001 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

##### GET /domestic-payments/{DomesticPaymentId} Response

```
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DomesticPaymentId": "string",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T15:59:55.157Z",
    "Status": "RCVD",
    "StatusUpdateDateTime": "2025-11-21T15:59:55.157Z",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "ExpectedExecutionDateTime": "2025-11-21T15:59:55.157Z",
    "ExpectedSettlementDateTime": "2025-11-21T15:59:55.157Z",
    "Refund": {
      "Account": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string"
      }
    },
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "122154726557.2811",
          "Currency": "DFQ"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "375118.439",
        "Currency": "UKF"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "BM",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "HB",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "ZY",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "WN",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "GZ"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T15:59:55.157Z",
              "Country": "GG",
              "Amount": {
                "Amount": "6110764.6717",
                "Currency": "TOZ"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T15:59:55.157Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "210",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "MultiAuthorisation": {
      "Status": "AUTH",
      "NumberRequired": 0,
      "NumberReceived": 0,
      "LastUpdateDateTime": "2025-11-21T15:59:55.157Z",
      "ExpirationDateTime": "2025-11-21T15:59:55.157Z"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T15:59:55.157Z",
    "LastAvailableDateTime": "2025-11-21T15:59:55.157Z"
  }
}
```

## Person To Person Initiation via PISP

This example set of flows and payload examples are for a domestic payment initiated by a person to another person via a PISP.

In this scenario:

* The PSU has pre-specified the account from which funds will be transferred (i.e., the Debtor Account details)
* No building society accounts are involved in this interaction, and there only the sort code and account number are specified in the DebtorAccount and CreditorAccount sections.

### Sequence Diagram

![P2P Payment](./images/P2PDomesticPaymentExample.png)

<details>
<summary>Diagram source</summary>

```
participant PSU
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU, ASPSP Resource Server
Step 1: Agree Domestic Payment-Order initiation
end note
PSU <-> PISP: Initiate a funds transfer
PSU -> PISP: Select debtor and creditor accounts

note over PSU, ASPSP Resource Server
Step 2: Setup Domestic Payment-Order Consent
end note
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> PISP: access-token
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-payment-consents
ASPSP Resource Server -> PISP: HTTP 201 (Created), ConsentId
PISP -> PSU: HTTP 302 (Found), Redirect (ConsentId)

note over PSU, ASPSP Resource Server
Step 3: Authorize consent
end note
PSU -> ASPSP Authorisation Server: Follow redirect (ConsentId)
PSU <-> ASPSP Authorisation Server: authenticate
PSU <-> ASPSP Authorisation Server: SCA if required
ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (authorization-code)
PSU -> PISP: Follow redirect (authorization-code)
PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
ASPSP Authorisation Server -> PISP: access-token

note over PSU, ASPSP Resource Server
Step 4: Create Domestic Payment-Order
end note
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-payments
ASPSP Resource Server -> PISP: HTTP 201 (Created), DomesticPaymentId


note over PSU, ASPSP Resource Server
Step 5: Get Domestic Payment-Order status
end note
opt
PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: GET /domestic-payments/{DomesticPaymentId}
ASPSP Resource Server -> PISP: HTTP 200 (OK), domestic-payments resource

end opt
```

</details>

### Illustrative Interactions

#### Create Domestic Payment Order Consent

##### POST /domestic-payment-consents request

```
POST /domestic-payment-consents HTTP/1.1
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
    "ReadRefundAccount": "No",
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "85984329.1",
        "Currency": "XLW"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DM",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "HA",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "RP",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "YF",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "NI"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.351Z",
              "Country": "YC",
              "Amount": {
                "Amount": "83",
                "Currency": "VNY"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.351Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3385",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.351Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "FD",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

##### POST /domestic-payment-consents response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:04:46.400Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:04:46.400Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:04:46.400Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "50523885262",
          "Currency": "LEJ"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "5.0104",
        "Currency": "DKF"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "XR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "PS",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "HJ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "ZL"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.400Z",
              "Country": "LC",
              "Amount": {
                "Amount": "020.529",
                "Currency": "CHT"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.400Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.400Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "YJ",
      "AddressLine": [
        "string"
      ]
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T16:04:46.400Z",
    "LastAvailableDateTime": "2025-11-21T16:04:46.400Z"
  }
}
```

#### Create Domestic Payment Order

##### POST /domestic-payments request

```
POST /domestic-payments HTTP/1.1
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
    "ConsentId": "string",
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "1160938074.540",
        "Currency": "UYB"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "QH",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "MC",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "NV",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "VI",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "AC"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:05:16.098Z",
              "Country": "WT",
              "Amount": {
                "Amount": "509910436",
                "Currency": "VIJ"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:05:16.098Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "235065.4604",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "AW",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

##### POST /domestic-payments response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DomesticPaymentId": "string",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:05:16.134Z",
    "Status": "RCVD",
    "StatusUpdateDateTime": "2025-11-21T16:05:16.134Z",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "ExpectedExecutionDateTime": "2025-11-21T16:05:16.134Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:05:16.134Z",
    "Refund": {
      "Account": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string"
      }
    },
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "29891551",
          "Currency": "JUJ"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "464",
        "Currency": "NFR"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "FR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "TJ",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "EN",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "IL",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "YC"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:05:16.135Z",
              "Country": "BW",
              "Amount": {
                "Amount": "8847751",
                "Currency": "IDS"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:05:16.135Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "0773958910",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "MultiAuthorisation": {
      "Status": "AUTH",
      "NumberRequired": 0,
      "NumberReceived": 0,
      "LastUpdateDateTime": "2025-11-21T16:05:16.135Z",
      "ExpirationDateTime": "2025-11-21T16:05:16.135Z"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T16:05:16.135Z",
    "LastAvailableDateTime": "2025-11-21T16:05:16.135Z"
  }
}
```

#### Get Domestic Payment Order Consent

##### GET /domestic-payment-consents/{ConsentId} request

```
GET /domestic-payment-consents/7290 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

##### GET /domestic-payment-consents/{ConsentId} response

```
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:05:49.716Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:05:49.716Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:05:49.716Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:05:49.716Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:05:49.716Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "45.68580",
          "Currency": "PXJ"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "6355285",
        "Currency": "SQI"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "ZJ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "XO",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "QM",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "BK",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "LA"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:05:49.716Z",
              "Country": "CR",
              "Amount": {
                "Amount": "26",
                "Currency": "RNH"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:05:49.716Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "1015665.6413",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:05:49.716Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "DV",
      "AddressLine": [
        "string"
      ]
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T16:05:49.716Z",
    "LastAvailableDateTime": "2025-11-21T16:05:49.716Z"
  }
}
```

#### Get Domestic Payment Order

##### GET /domestic-payments/{DomesticPaymentId} request

```
GET /domestic-payments/7290-003 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

##### GET /domestic-payments/{DomesticPaymentId} response

```
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DomesticPaymentId": "string",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:06:23.537Z",
    "Status": "RCVD",
    "StatusUpdateDateTime": "2025-11-21T16:06:23.537Z",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "ExpectedExecutionDateTime": "2025-11-21T16:06:23.537Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:06:23.537Z",
    "Refund": {
      "Account": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string"
      }
    },
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "523845096894.84365",
          "Currency": "IIW"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "36480880.24",
        "Currency": "UGK"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "RN",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "QQ",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "EI",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "OJ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "ZL"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:06:23.537Z",
              "Country": "YW",
              "Amount": {
                "Amount": "7896157",
                "Currency": "EHL"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:06:23.537Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "8055585.636",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "MultiAuthorisation": {
      "Status": "AUTH",
      "NumberRequired": 0,
      "NumberReceived": 0,
      "LastUpdateDateTime": "2025-11-21T16:06:23.537Z",
      "ExpirationDateTime": "2025-11-21T16:06:23.537Z"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T16:06:23.537Z",
    "LastAvailableDateTime": "2025-11-21T16:06:23.537Z"
  }
}
```

## BACS Payment Order Consent

Use of LocalInstrument and CutOffDateTime.

### POST /domestic-payment-consents request

```
POST /domestic-payment-consents HTTP/1.1
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
    "ReadRefundAccount": "No",
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "85984329.1",
        "Currency": "XLW"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DM",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "HA",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "RP",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "YF",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "NI"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.351Z",
              "Country": "YC",
              "Amount": {
                "Amount": "83",
                "Currency": "VNY"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.351Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3385",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.351Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "FD",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

### POST /domestic-payment-consents response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:04:46.400Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:04:46.400Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:04:46.400Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "50523885262",
          "Currency": "LEJ"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "5.0104",
        "Currency": "DKF"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "XR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "PS",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "HJ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "ZL"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.400Z",
              "Country": "LC",
              "Amount": {
                "Amount": "020.529",
                "Currency": "CHT"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.400Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.400Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "YJ",
      "AddressLine": [
        "string"
      ]
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T16:04:46.400Z",
    "LastAvailableDateTime": "2025-11-21T16:04:46.400Z"
  }
}
```

## CHAPS Payment Order Consent

Use of LocalInstrument, CreditorPostalAddress, CutOffDateTime and Charges.

### POST /domestic-payment-consents request

```
POST /domestic-payment-consents HTTP/1.1
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
    "ReadRefundAccount": "No",
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "85984329.1",
        "Currency": "XLW"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DM",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "HA",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "RP",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "YF",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "NI"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.351Z",
              "Country": "YC",
              "Amount": {
                "Amount": "83",
                "Currency": "VNY"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.351Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3385",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.351Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "FD",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

### POST /domestic-payment-consents response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:04:46.400Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:04:46.400Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:04:46.400Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "50523885262",
          "Currency": "LEJ"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "5.0104",
        "Currency": "DKF"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "XR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "PS",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "HJ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "ZL"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.400Z",
              "Country": "LC",
              "Amount": {
                "Amount": "020.529",
                "Currency": "CHT"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.400Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.400Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "YJ",
      "AddressLine": [
        "string"
      ]
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T16:04:46.400Z",
    "LastAvailableDateTime": "2025-11-21T16:04:46.400Z"
  }
}
```

## Balance Transfer
Below in an example illustrating a balance transfer offer available on a Card A.

To facilitate a Balance Transfer, a PISP can initiate a Payment from Card B to Card A with LocalInstrument as UK.OBIE.BalanceTransfer, Account SchemeName as UK.OBIE.PAN and if there is an Offer Code/Id provided by Issuer of the Card A, then it can be supplied in the field: `RemittanceInformation.Structured.0.CreditorReferenceInformation.Reference`.
Example below:

### POST /domestic-payment-consents request

```
POST /domestic-payment-consents HTTP/1.1
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
    "ReadRefundAccount": "No",
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "85984329.1",
        "Currency": "XLW"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DM",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "HA",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "RP",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "YF",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "NI"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.351Z",
              "Country": "YC",
              "Amount": {
                "Amount": "83",
                "Currency": "VNY"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.351Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3385",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.351Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "FD",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

### POST /domestic-payment-consents response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:04:46.400Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:04:46.400Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:04:46.400Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "50523885262",
          "Currency": "LEJ"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "5.0104",
        "Currency": "DKF"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "XR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "PS",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "HJ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "ZL"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.400Z",
              "Country": "LC",
              "Amount": {
                "Amount": "020.529",
                "Currency": "CHT"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.400Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.400Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "YJ",
      "AddressLine": [
        "string"
      ]
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T16:04:46.400Z",
    "LastAvailableDateTime": "2025-11-21T16:04:46.400Z"
  }
}
```

## Money Transfer

Below in an example illustrating Money transfer from a card account to a bank account. 

### POST /domestic-payment-consents request

```
POST /domestic-payment-consents HTTP/1.1
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
    "ReadRefundAccount": "No",
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "85984329.1",
        "Currency": "XLW"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DM",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "HA",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "RP",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "YF",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "NI"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.351Z",
              "Country": "YC",
              "Amount": {
                "Amount": "83",
                "Currency": "VNY"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.351Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3385",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.351Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "FD",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

### POST /domestic-payment-consents response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:04:46.400Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:04:46.400Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:04:46.400Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:04:46.400Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "50523885262",
          "Currency": "LEJ"
        }
      }
    ],
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "5.0104",
        "Currency": "DKF"
      },
      "DebtorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorAgent": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "XR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "CreditorAccount": {
        "SchemeName": "string",
        "Identification": "string",
        "Name": "string",
        "SecondaryIdentification": "string",
        "Proxy": {
          "Identification": "string",
          "Code": "TELE",
          "Type": "string"
        }
      },
      "CreditorPostalAddress": {
        "AddressType": "BIZZ",
        "Department": "string",
        "SubDepartment": "string",
        "StreetName": "string",
        "BuildingNumber": "string",
        "BuildingName": "string",
        "Floor": "string",
        "UnitNumber": "string",
        "Room": "string",
        "PostBox": "string",
        "TownLocationName": "string",
        "DistrictName": "string",
        "CareOf": "string",
        "PostCode": "string",
        "TownName": "string",
        "CountrySubDivision": "string",
        "Country": "PS",
        "AddressLine": [
          "string"
        ]
      },
      "UltimateCreditor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "HJ",
          "AddressLine": [
            "string"
          ]
        }
      },
      "UltimateDebtor": {
        "Name": "string",
        "Identification": "string",
        "LEI": "IZ9Q00LZEVUKWCQY6X15",
        "SchemeName": "string",
        "PostalAddress": {
          "AddressType": "BIZZ",
          "Department": "string",
          "SubDepartment": "string",
          "StreetName": "string",
          "BuildingNumber": "string",
          "BuildingName": "string",
          "Floor": "string",
          "UnitNumber": "string",
          "Room": "string",
          "PostBox": "string",
          "TownLocationName": "string",
          "DistrictName": "string",
          "CareOf": "string",
          "PostCode": "string",
          "TownName": "string",
          "CountrySubDivision": "string",
          "Country": "DR",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "ZL"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:04:46.400Z",
              "Country": "LC",
              "Amount": {
                "Amount": "020.529",
                "Currency": "CHT"
              },
              "Information": [
                "string"
              ]
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
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:04:46.400Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "3",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "80200112344562",
            "Invoicee": "80200112344562",
            "TaxRemittance": "string",
            "AdditionalRemittanceInformation": [
              "string"
            ]
          }
        ],
        "Unstructured": [
          "string"
        ]
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:04:46.400Z"
    },
    "SCASupportData": {
      "RequestedSCAExemptionType": "BillPayment",
      "AppliedAuthenticationApproach": "CA",
      "ReferencePaymentOrderId": "string"
    },
    "Debtor": {
      "SchemeName": "string",
      "Identification": "string",
      "Name": "string",
      "SecondaryIdentification": "string",
      "LEI": "IZ9Q00LZEVUKWCQY6X15"
    }
  },
  "Risk": {
    "PaymentContextCode": "BillingGoodsAndServicesInAdvance",
    "MerchantCategoryCode": "stri",
    "MerchantCustomerIdentification": "string",
    "ContractPresentIndicator": true,
    "BeneficiaryPrepopulatedIndicator": true,
    "PaymentPurposeCode": "BKDF",
    "CategoryPurposeCode": "BONU",
    "BeneficiaryAccountType": "Business",
    "DeliveryAddress": {
      "AddressType": "BIZZ",
      "Department": "string",
      "SubDepartment": "string",
      "StreetName": "string",
      "BuildingNumber": "string",
      "BuildingName": "string",
      "Floor": "string",
      "UnitNumber": "string",
      "Room": "string",
      "PostBox": "string",
      "TownLocationName": "string",
      "DistrictName": "string",
      "CareOf": "string",
      "PostCode": "string",
      "TownName": "string",
      "CountrySubDivision": "string",
      "Country": "YJ",
      "AddressLine": [
        "string"
      ]
    }
  },
  "Links": {
    "Self": "string",
    "First": "string",
    "Prev": "string",
    "Next": "string",
    "Last": "string"
  },
  "Meta": {
    "TotalPages": 0,
    "FirstAvailableDateTime": "2025-11-21T16:04:46.400Z",
    "LastAvailableDateTime": "2025-11-21T16:04:46.400Z"
  }
}
```
