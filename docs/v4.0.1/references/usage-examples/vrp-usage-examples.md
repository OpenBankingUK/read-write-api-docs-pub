# Usage Examples

- [Usage Examples](#usage-examples)
  - [VRP with Debtor Account specified by PISP](#vrp-with-debtor-account-specified-by-pisp)
    - [POST /domestic-vrp-consents](#post-domestic-vrp-consents)
      - [Request](#request)
      - [Response](#response)
    - [GET /domestic-vrp-consents/{ConsentId}](#get-domestic-vrp-consentsconsentid)
      - [Request](#request-1)
      - [Response](#response-1)
    - [POST /domestic-vrps](#post-domestic-vrps)
      - [Request](#request-2)
      - [Response](#response-2)
  - [VRP with Debtor Account specified during consent authorisation and CreditorAccount specified during payment initiation](#vrp-with-debtor-account-specified-during-consent-authorisation-and-creditoraccount-specified-during-payment-initiation)
    - [POST /domestic-vrp-consents](#post-domestic-vrp-consents-1)
      - [Request](#request-3)
      - [Response](#response-3)
    - [GET /domestic-vrp-consents/{ConsentId}](#get-domestic-vrp-consentsconsentid-1)
      - [Request](#request-4)
      - [Response](#response-4)
    - [POST /domestic-vrps](#post-domestic-vrps-1)
      - [Request](#request-5)
      - [Response](#response-5)
## VRP with Debtor Account specified by PISP

### POST /domestic-vrp-consents

#### Request

```
POST /domestic-vrp-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "ReadRefundAccount": "Yes",
    "ControlParameters": {
      "ValidFromDateTime": "2025-11-21T17:02:20.397Z",
      "ValidToDateTime": "2025-11-21T17:02:20.397Z",
      "MaximumIndividualAmount": {
        "Amount": "58805.79393",
        "Currency": "KNZ"
      },
      "PeriodicLimits": [
        {
          "PeriodType": "Day",
          "PeriodAlignment": "Consent",
          "Amount": "716269187",
          "Currency": "JNB"
        }
      ],
      "VRPType": [
        "string"
      ],
      "PSUAuthenticationMethods": [
        "string"
      ],
      "PSUInteractionTypes": [
        "InSession"
      ],
      "SupplementaryData": {}
    },
    "Initiation": {
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
        "Country": "AH",
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
          "Country": "DV",
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
          "Country": "VG",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:02:20.397Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "0272463200.64",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "CJ"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:02:20.397Z",
              "Country": "VV",
              "Amount": {
                "Amount": "067115392820.10",
                "Currency": "YSH"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
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
      "Country": "SD",
      "AddressLine": [
        "string"
      ]
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
    "ReadRefundAccount": "Yes",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T17:02:20.401Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T17:02:20.401Z",
    "ControlParameters": {
      "ValidFromDateTime": "2025-11-21T17:02:20.401Z",
      "ValidToDateTime": "2025-11-21T17:02:20.401Z",
      "MaximumIndividualAmount": {
        "Amount": "60667320819.66600",
        "Currency": "IQQ"
      },
      "PeriodicLimits": [
        {
          "PeriodType": "Day",
          "PeriodAlignment": "Consent",
          "Amount": "2327747854",
          "Currency": "QXE"
        }
      ],
      "VRPType": [
        "string"
      ],
      "PSUAuthenticationMethods": [
        "string"
      ],
      "PSUInteractionTypes": [
        "InSession"
      ],
      "SupplementaryData": {}
    },
    "Initiation": {
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
        "Country": "XA",
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
          "Country": "NO",
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
          "Country": "CN",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:02:20.401Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "756032288.8",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "YP"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:02:20.401Z",
              "Country": "ZF",
              "Amount": {
                "Amount": "7611531.95",
                "Currency": "HUN"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
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
      "Country": "GK",
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
  "Meta": {}
}
```

### GET /domestic-vrp-consents/{ConsentId}

After consent authorisation

#### Request

```
GET /domestic-vrp-consents/fe615446-e53a-45ed-954c-ae5d1f97a93b HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Response

```
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ReadRefundAccount": "Yes",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T17:03:46.889Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T17:03:46.889Z",
    "ControlParameters": {
      "ValidFromDateTime": "2025-11-21T17:03:46.889Z",
      "ValidToDateTime": "2025-11-21T17:03:46.889Z",
      "MaximumIndividualAmount": {
        "Amount": "6",
        "Currency": "UMN"
      },
      "PeriodicLimits": [
        {
          "PeriodType": "Day",
          "PeriodAlignment": "Consent",
          "Amount": "4",
          "Currency": "GIP"
        }
      ],
      "VRPType": [
        "string"
      ],
      "PSUAuthenticationMethods": [
        "string"
      ],
      "PSUInteractionTypes": [
        "InSession"
      ],
      "SupplementaryData": {}
    },
    "Initiation": {
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
        "Country": "EJ",
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
          "Country": "JN",
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
          "Country": "YE",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:03:46.889Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "5353666.1",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "LN"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:03:46.889Z",
              "Country": "FZ",
              "Amount": {
                "Amount": "5758357",
                "Currency": "IZC"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
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
      "Country": "HX",
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
  "Meta": {}
}
```

### POST /domestic-vrps

#### Request

```
POST /domestic-vrps HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIhTyU5cCI6IkpXVCJ9
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
    "PSUAuthenticationMethod": "string",
    "PSUInteractionType": "InSession",
    "VRPType": "string",
    "Initiation": {
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
        "Country": "PK",
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
          "Country": "LW",
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
          "Country": "AH",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:04:23.514Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "895843.7",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "ID"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:04:23.514Z",
              "Country": "KX",
              "Amount": {
                "Amount": "4102168.186",
                "Currency": "AMY"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
    },
    "Instruction": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:04:23.514Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "76930427487.04160",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "7540.64",
        "Currency": "LCN"
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
        "Country": "DE",
        "AddressLine": [
          "string"
        ]
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
          "Country": "DL",
          "AddressLine": [
            "string"
          ]
        }
      },
      "SupplementaryData": {}
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
      "Country": "UL",
      "AddressLine": [
        "string"
      ]
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
    "DomesticVRPId": "string",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T17:04:23.519Z",
    "Status": "RCVD",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T17:04:23.519Z",
    "ExpectedExecutionDateTime": "2025-11-21T17:04:23.519Z",
    "ExpectedSettlementDateTime": "2025-11-21T17:04:23.519Z",
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
        "Type": "UK.OBIE.CHAPSOut",
        "Amount": {
          "Amount": "221080213.5665",
          "Currency": "VZG"
        }
      }
    ],
    "Initiation": {
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
        "Country": "VI",
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
          "Country": "WQ",
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
          "Country": "OO",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:04:23.519Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "700.6",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "VW"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:04:23.519Z",
              "Country": "OA",
              "Amount": {
                "Amount": "39432190",
                "Currency": "JTY"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
    },
    "Instruction": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:04:23.519Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "9758555",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "8752024082856.13104",
        "Currency": "YZQ"
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
        "Country": "AU",
        "AddressLine": [
          "string"
        ]
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
          "Country": "BH",
          "AddressLine": [
            "string"
          ]
        }
      },
      "SupplementaryData": {}
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
      "Country": "HI",
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
  "Meta": {}
}
```

## VRP with Debtor Account specified during consent authorisation and CreditorAccount specified during payment initiation

In this scenario, the PISP creates a `domestic-vrp-consent` where the debtor account and creditor account are not specified.

The PSU selects the debtor account during consent authorisation.

The PISP specifies the creditor account during payment initiation.

### POST /domestic-vrp-consents

#### Request

```
POST /domestic-vrp-consents HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-idempotency-key: FRESCO.21302.GFX.20
x-jws-signature: TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
Accept: application/json
```

```json
{
  "Data": {
    "ReadRefundAccount": "Yes",
    "ControlParameters": {
      "ValidFromDateTime": "2025-11-21T17:02:20.397Z",
      "ValidToDateTime": "2025-11-21T17:02:20.397Z",
      "MaximumIndividualAmount": {
        "Amount": "58805.79393",
        "Currency": "KNZ"
      },
      "PeriodicLimits": [
        {
          "PeriodType": "Day",
          "PeriodAlignment": "Consent",
          "Amount": "716269187",
          "Currency": "JNB"
        }
      ],
      "VRPType": [
        "string"
      ],
      "PSUAuthenticationMethods": [
        "string"
      ],
      "PSUInteractionTypes": [
        "InSession"
      ],
      "SupplementaryData": {}
    },
    "Initiation": {
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
        "Country": "AH",
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
          "Country": "DV",
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
          "Country": "VG",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:02:20.397Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "0272463200.64",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "CJ"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:02:20.397Z",
              "Country": "VV",
              "Amount": {
                "Amount": "067115392820.10",
                "Currency": "YSH"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
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
      "Country": "SD",
      "AddressLine": [
        "string"
      ]
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
    "ReadRefundAccount": "Yes",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T17:02:20.401Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T17:02:20.401Z",
    "ControlParameters": {
      "ValidFromDateTime": "2025-11-21T17:02:20.401Z",
      "ValidToDateTime": "2025-11-21T17:02:20.401Z",
      "MaximumIndividualAmount": {
        "Amount": "60667320819.66600",
        "Currency": "IQQ"
      },
      "PeriodicLimits": [
        {
          "PeriodType": "Day",
          "PeriodAlignment": "Consent",
          "Amount": "2327747854",
          "Currency": "QXE"
        }
      ],
      "VRPType": [
        "string"
      ],
      "PSUAuthenticationMethods": [
        "string"
      ],
      "PSUInteractionTypes": [
        "InSession"
      ],
      "SupplementaryData": {}
    },
    "Initiation": {
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
        "Country": "XA",
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
          "Country": "NO",
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
          "Country": "CN",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:02:20.401Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "756032288.8",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "YP"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:02:20.401Z",
              "Country": "ZF",
              "Amount": {
                "Amount": "7611531.95",
                "Currency": "HUN"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
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
      "Country": "GK",
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
  "Meta": {}
}
```

### GET /domestic-vrp-consents/{ConsentId}

Once the consent has been authorised, the PSU would have selected the debtor account to use for the VRP.
This is returned as part of the GET response.

#### Request

```
GET /domestic-vrp-consents/fe615446-e53a-45ed-954c-ae5d1f97a93b HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Response

```
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "ReadRefundAccount": "Yes",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T17:03:46.889Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T17:03:46.889Z",
    "ControlParameters": {
      "ValidFromDateTime": "2025-11-21T17:03:46.889Z",
      "ValidToDateTime": "2025-11-21T17:03:46.889Z",
      "MaximumIndividualAmount": {
        "Amount": "6",
        "Currency": "UMN"
      },
      "PeriodicLimits": [
        {
          "PeriodType": "Day",
          "PeriodAlignment": "Consent",
          "Amount": "4",
          "Currency": "GIP"
        }
      ],
      "VRPType": [
        "string"
      ],
      "PSUAuthenticationMethods": [
        "string"
      ],
      "PSUInteractionTypes": [
        "InSession"
      ],
      "SupplementaryData": {}
    },
    "Initiation": {
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
        "Country": "EJ",
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
          "Country": "JN",
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
          "Country": "YE",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:03:46.889Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "5353666.1",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "LN"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:03:46.889Z",
              "Country": "FZ",
              "Amount": {
                "Amount": "5758357",
                "Currency": "IZC"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
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
      "Country": "HX",
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
  "Meta": {}
}
```

### POST /domestic-vrp-consents/{ConsentId}/funds-confirmation

The TPP connects to the ASPSP that services the PSU's account(s) and creates a **funds-confirmation-consent** resource

#### Request

```
POST /domestic-vrp-consents/fe615446-e53a-45ed-954c-ae5d1f97a93b/funds-confirmation HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

```json
{
  "Data": {
    "ConsentId": "string",
    "Reference": "string",
    "InstructedAmount": {
      "Amount": "019",
      "Currency": "KRC"
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
    "FundsConfirmationId": "string",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T17:09:01.954Z",
    "Reference": "string",
    "FundsAvailableResult": {
      "FundsAvailableDateTime": "2025-11-21T17:09:01.954Z",
      "FundsAvailable": "Available"
    },
    "InstructedAmount": {
      "Amount": "49718359",
      "Currency": "DJA"
    }
  }
}
```

### POST /domestic-vrps

Finally, when the PISP initiates the payment, it specifies the CreditorAccount to be used.

#### Request

```
POST /domestic-vrps HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIhTyU5cCI6IkpXVCJ9
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
    "PSUAuthenticationMethod": "string",
    "PSUInteractionType": "InSession",
    "VRPType": "string",
    "Initiation": {
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
        "Country": "PK",
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
          "Country": "LW",
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
          "Country": "AH",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:04:23.514Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "895843.7",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "ID"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:04:23.514Z",
              "Country": "KX",
              "Amount": {
                "Amount": "4102168.186",
                "Currency": "AMY"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
    },
    "Instruction": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:04:23.514Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "76930427487.04160",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "7540.64",
        "Currency": "LCN"
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
        "Country": "DE",
        "AddressLine": [
          "string"
        ]
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
          "Country": "DL",
          "AddressLine": [
            "string"
          ]
        }
      },
      "SupplementaryData": {}
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
      "Country": "UL",
      "AddressLine": [
        "string"
      ]
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
    "DomesticVRPId": "string",
    "ConsentId": "string",
    "CreationDateTime": "2025-11-21T17:04:23.519Z",
    "Status": "RCVD",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T17:04:23.519Z",
    "ExpectedExecutionDateTime": "2025-11-21T17:04:23.519Z",
    "ExpectedSettlementDateTime": "2025-11-21T17:04:23.519Z",
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
        "Type": "UK.OBIE.CHAPSOut",
        "Amount": {
          "Amount": "221080213.5665",
          "Currency": "VZG"
        }
      }
    ],
    "Initiation": {
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
        "Country": "VI",
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
          "Country": "WQ",
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
          "Country": "OO",
          "AddressLine": [
            "string"
          ]
        }
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:04:23.519Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "700.6",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "RegulatoryReporting": [
        {
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "VW"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T17:04:23.519Z",
              "Country": "OA",
              "Amount": {
                "Amount": "39432190",
                "Currency": "JTY"
              },
              "Information": [
                "string"
              ]
            }
          ]
        }
      ]
    },
    "Instruction": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [
              {
                "Code": "CINV",
                "Issuer": "string",
                "Number": "string",
                "RelatedDate": "2025-11-21T17:04:23.519Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "9758555",
            "CreditorReferenceInformation": {
              "Code": "DISP",
              "Issuer": "string",
              "Reference": "string"
            },
            "Invoicer": "string",
            "Invoicee": "string",
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
      "LocalInstrument": "string",
      "InstructedAmount": {
        "Amount": "8752024082856.13104",
        "Currency": "YZQ"
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
        "Country": "AU",
        "AddressLine": [
          "string"
        ]
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
          "Country": "BH",
          "AddressLine": [
            "string"
          ]
        }
      },
      "SupplementaryData": {}
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
      "Country": "HI",
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
  "Meta": {}
}
```
