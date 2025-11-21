# Domestic Standing Order Usage Examples - v4.0.1 <!-- omit in toc -->

- [Standing Order Initiation](#standing-order-initiation)
  - [Create Domestic Standing Order Consent](#create-domestic-standing-order-consent)
    - [POST /domestic-standing-order-consents](#post-domestic-standing-order-consents)
    - [POST /domestic-standing-order-consents response](#post-domestic-standing-order-consents-response)
  - [Create a Domestic Standing Order](#create-a-domestic-standing-order)
    - [POST /domestic-standing-orders request](#post-domestic-standing-orders-request)
    - [POST /domestic-standing-orders response](#post-domestic-standing-orders-response)
  - [Get a Domestic Standing Order Consent](#get-a-domestic-standing-order-consent)
    - [GET /domestic-standing-order-consents/{ConsentId}](#get-domestic-standing-order-consentsconsentid)
    - [GET /domestic-standing-order-consents response](#get-domestic-standing-order-consents-response)

## Standing Order Initiation

This set of flows and payload examples are for creating and retrieving a domestic standing order through a PISP:

![Domestic Standing Order - Sequence Diagram](./images/DomesticStandingOrder.png)

<details>
  <summary>Diagram source</summary>

```
participant PSU
participant PISP
participant ASPSP Authorisation Server
participant ASPSP Resource Server

note over PSU, ASPSP Resource Server
Step 1: Agree a Domestic Standing Order Initiation
end note
PSU -> PISP: Agree a standing order initiation

note over PSU, ASPSP Resource Server
Step 2: Setup a Domestic Standing Order consent
end note
PISP &lt;-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
ASPSP Authorisation Server -> PISP: access-token
PISP &lt;-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-standing-order-consents
ASPSP Resource Server -> PISP: HTTP 201 (Created), ConsentId
PISP -> PSU: HTTP 302 (Found), Redirect (ConsentId)

note over PSU, ASPSP Resource Server
Step 3: Authorize consent
end note
PSU -> ASPSP Authorisation Server: Follow redirect (ConsentId)
PSU &lt;-> ASPSP Authorisation Server: authenticate
PSU &lt;-> ASPSP Authorisation Server: SCA if required
ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (authorization-code)
PSU -> PISP: Follow redirect (authorization-code)
PISP &lt;-> ASPSP Authorisation Server: Establish TLS 1.2 MA
PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
ASPSP Authorisation Server -> PISP: access-token

opt
note over PSU, ASPSP Resource Server
Step 4: Get status of Domestic Standing Order consent
end note
PISP &lt;-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: GET /domestic-standing-order-consents/{ConsentId}
ASPSP Resource Server -> PISP: HTTP 200 (OK), consent resource
end opt

note over PSU, ASPSP Resource Server
Step 5: Create Domestic Standing Order
end note
PISP &lt;-> ASPSP Resource Server: Establish TLS 1.2 MA
PISP -> ASPSP Resource Server: POST /domestic-standing-orders
ASPSP Resource Server -> PISP: HTTP 201 (Created), DomesticStandingOrder resource
```
</details>

### Create Domestic Standing Order Consent

#### POST /domestic-standing-order-consents

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
    "ReadRefundAccount": "No",
    "Initiation": {
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:19:55.861Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "5993034146.75",
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
      "NumberOfPayments": "string",
      "FirstPaymentAmount": {
        "Amount": "2879006",
        "Currency": "QJH"
      },
      "RecurringPaymentAmount": {
        "Amount": "8998977754",
        "Currency": "NLB"
      },
      "FinalPaymentAmount": {
        "Amount": "1892",
        "Currency": "EWC"
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
          "Country": "PK",
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
          "Country": "FI",
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
            "CountryCode": "WG"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:19:55.861Z",
              "Country": "GR",
              "Amount": {
                "Amount": "0",
                "Currency": "TFS"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ],
      "MandateRelatedInformation": {
        "MandateIdentification": "string",
        "Classification": "FIXE",
        "CategoryPurposeCode": "BONU",
        "FirstPaymentDateTime": "2025-11-21T16:19:55.861Z",
        "RecurringPaymentDateTime": "2025-11-21T16:19:55.861Z",
        "FinalPaymentDateTime": "2025-11-21T16:19:55.861Z",
        "Frequency": {
          "Type": "ADHO",
          "CountPerPeriod": 1,
          "PointInTime": "00"
        },
        "Reason": "string"
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:19:55.861Z"
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
      "Country": "IJ",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

#### POST /domestic-standing-order-consents response

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
    "CreationDateTime": "2025-11-21T16:19:55.889Z",
    "Status": "AWAU",
    "StatusUpdateDateTime": "2025-11-21T16:19:55.889Z",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "Permission": "Create",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:19:55.889Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "76728271970.1190",
          "Currency": "BZR"
        }
      }
    ],
    "Initiation": {
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:19:55.889Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "0875145384",
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
      "NumberOfPayments": "string",
      "FirstPaymentAmount": {
        "Amount": "474285454031",
        "Currency": "HDK"
      },
      "RecurringPaymentAmount": {
        "Amount": "7975",
        "Currency": "WAF"
      },
      "FinalPaymentAmount": {
        "Amount": "2912.4",
        "Currency": "GRL"
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
          "Country": "AL",
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
          "Country": "OY",
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
            "CountryCode": "NM"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:19:55.890Z",
              "Country": "BY",
              "Amount": {
                "Amount": "5642208.20479",
                "Currency": "IYB"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ],
      "MandateRelatedInformation": {
        "MandateIdentification": "string",
        "Classification": "FIXE",
        "CategoryPurposeCode": "BONU",
        "FirstPaymentDateTime": "2025-11-21T16:19:55.890Z",
        "RecurringPaymentDateTime": "2025-11-21T16:19:55.890Z",
        "FinalPaymentDateTime": "2025-11-21T16:19:55.890Z",
        "Frequency": {
          "Type": "ADHO",
          "CountPerPeriod": 1,
          "PointInTime": "00"
        },
        "Reason": "string"
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:19:55.890Z"
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
      "Country": "AU",
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
    "FirstAvailableDateTime": "2025-11-21T16:19:55.890Z",
    "LastAvailableDateTime": "2025-11-21T16:19:55.890Z"
  }
}

```
### Create a Domestic Standing Order

#### POST /domestic-standing-orders request

```
POST /domestic-standing-orders HTTP/1.1
Authorization: Bearer eYJQLMQLMQLM
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
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:21:07.893Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "5.16959",
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
      "NumberOfPayments": "string",
      "FirstPaymentAmount": {
        "Amount": "0660976.96",
        "Currency": "BIK"
      },
      "RecurringPaymentAmount": {
        "Amount": "41.0493",
        "Currency": "EQK"
      },
      "FinalPaymentAmount": {
        "Amount": "5224.178",
        "Currency": "XUH"
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
          "Country": "BO",
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
          "Country": "VS",
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
            "CountryCode": "QI"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:21:07.893Z",
              "Country": "AR",
              "Amount": {
                "Amount": "06585786401",
                "Currency": "HRB"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ],
      "MandateRelatedInformation": {
        "MandateIdentification": "string",
        "Classification": "FIXE",
        "CategoryPurposeCode": "BONU",
        "FirstPaymentDateTime": "2025-11-21T16:21:07.894Z",
        "RecurringPaymentDateTime": "2025-11-21T16:21:07.894Z",
        "FinalPaymentDateTime": "2025-11-21T16:21:07.894Z",
        "Frequency": {
          "Type": "ADHO",
          "CountPerPeriod": 1,
          "PointInTime": "00"
        },
        "Reason": "string"
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
      "Country": "YH",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

#### POST /domestic-standing-orders response

```
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "DomesticStandingOrderId": "string",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:21:07.896Z",
    "Status": "CANC",
    "StatusUpdateDateTime": "2025-11-21T16:21:07.896Z",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
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
          "Amount": "66160671718",
          "Currency": "CSX"
        }
      }
    ],
    "Initiation": {
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:21:07.896Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "959579558.552",
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
      "NumberOfPayments": "string",
      "FirstPaymentAmount": {
        "Amount": "9441300021.4",
        "Currency": "ULF"
      },
      "RecurringPaymentAmount": {
        "Amount": "6.8",
        "Currency": "DMS"
      },
      "FinalPaymentAmount": {
        "Amount": "73667",
        "Currency": "PMF"
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
          "Country": "TV",
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
          "Country": "LQ",
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
            "CountryCode": "RQ"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:21:07.896Z",
              "Country": "EH",
              "Amount": {
                "Amount": "02119719",
                "Currency": "ERQ"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ],
      "MandateRelatedInformation": {
        "MandateIdentification": "string",
        "Classification": "FIXE",
        "CategoryPurposeCode": "BONU",
        "FirstPaymentDateTime": "2025-11-21T16:21:07.897Z",
        "RecurringPaymentDateTime": "2025-11-21T16:21:07.897Z",
        "FinalPaymentDateTime": "2025-11-21T16:21:07.897Z",
        "Frequency": {
          "Type": "ADHO",
          "CountPerPeriod": 1,
          "PointInTime": "00"
        },
        "Reason": "string"
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "MultiAuthorisation": {
      "Status": "AUTH",
      "NumberRequired": 0,
      "NumberReceived": 0,
      "LastUpdateDateTime": "2025-11-21T16:21:07.897Z",
      "ExpirationDateTime": "2025-11-21T16:21:07.897Z"
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
    "FirstAvailableDateTime": "2025-11-21T16:21:07.897Z",
    "LastAvailableDateTime": "2025-11-21T16:21:07.897Z"
  }
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
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T16:22:01.864Z",
    "Status": "AWAU",
    "StatusUpdateDateTime": "2025-11-21T16:22:01.864Z",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "Permission": "Create",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:22:01.864Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "489782067",
          "Currency": "BLA"
        }
      }
    ],
    "Initiation": {
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T16:22:01.864Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "696007901.18",
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
      "NumberOfPayments": "string",
      "FirstPaymentAmount": {
        "Amount": "0344254",
        "Currency": "KGT"
      },
      "RecurringPaymentAmount": {
        "Amount": "37012652708",
        "Currency": "NOC"
      },
      "FinalPaymentAmount": {
        "Amount": "3531",
        "Currency": "PIT"
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
          "Country": "YK",
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
          "Country": "BV",
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
            "CountryCode": "DB"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:22:01.864Z",
              "Country": "HY",
              "Amount": {
                "Amount": "5.150",
                "Currency": "TVY"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ],
      "MandateRelatedInformation": {
        "MandateIdentification": "string",
        "Classification": "FIXE",
        "CategoryPurposeCode": "BONU",
        "FirstPaymentDateTime": "2025-11-21T16:22:01.864Z",
        "RecurringPaymentDateTime": "2025-11-21T16:22:01.864Z",
        "FinalPaymentDateTime": "2025-11-21T16:22:01.864Z",
        "Frequency": {
          "Type": "ADHO",
          "CountPerPeriod": 1,
          "PointInTime": "00"
        },
        "Reason": "string"
      },
      "SupplementaryData": {
        "additionalProp1": {}
      }
    },
    "Authorisation": {
      "AuthorisationType": "Any",
      "CompletionDateTime": "2025-11-21T16:22:01.864Z"
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
      "Country": "LX",
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
    "FirstAvailableDateTime": "2025-11-21T16:22:01.864Z",
    "LastAvailableDateTime": "2025-11-21T16:22:01.864Z"
  }
}
```
