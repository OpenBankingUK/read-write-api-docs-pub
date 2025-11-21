# International Payment Usage Examples - v4.0.1 <!-- omit in toc -->

- [Debit amount specified; ASPSP provides actual (guaranteed) FX rate, for limited time](#debit-amount-specified-aspsp-provides-actual-guaranteed-fx-rate-for-limited-time)
  - [POST /international-payment-consents request](#post-international-payment-consents-request)
  - [POST /international-payment-consents response](#post-international-payment-consents-response)
- [Confirm Funds on International Payment Order Consent](#confirm-funds-on-international-payment-order-consent)
  - [GET / international-payment-consents/{ConsentId}/funds-confirmation Request](#get--international-payment-consentsconsentidfunds-confirmation-request)
  - [GET /international-payment-consents/{ConsentId}/funds-confirmation Response](#get-international-payment-consentsconsentidfunds-confirmation-response)
- [Debit amount specified; ASPSP provides indicative FX rate](#debit-amount-specified-aspsp-provides-indicative-fx-rate)
  - [POST /international-payment-consents request](#post-international-payment-consents-request-1)
  - [POST /international-payment-consents response](#post-international-payment-consents-response-1)
- [Debit amount specified; ASPSP provides a pre-booked FX rate](#debit-amount-specified-aspsp-provides-a-pre-booked-fx-rate)
  - [POST /international-payment-consents request](#post-international-payment-consents-request-2)
  - [POST /international-payment-consents response](#post-international-payment-consents-response-2)
- [Credit amount specified; ASPSP provides actual (guaranteed) FX rate, for limited time](#credit-amount-specified-aspsp-provides-actual-guaranteed-fx-rate-for-limited-time)
  - [POST /international-payment-consents request](#post-international-payment-consents-request-3)
  - [POST /international-payment-consents response](#post-international-payment-consents-response-3)
- [International payment with all charges paid by payer](#international-payment-with-all-charges-paid-by-payer)
  - [POST /international-payment-consents request](#post-international-payment-consents-request-4)
  - [POST /international-payment-consents response](#post-international-payment-consents-response-4)

## Debit amount specified; ASPSP provides actual (guaranteed) FX rate, for limited time

The payee specifies the amount to be debited from the payment account and requests a payment to be credited in USD at a fixed rate.

### POST /international-payment-consents request

```
POST /international-payment-consents HTTP/1.1
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
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "KTV",
      "DestinationCountryCode": "IH",
      "InstructedAmount": {
        "Amount": "293",
        "Currency": "ALE"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "JTD",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MW",
          "AddressLine": [
            "string"
          ]
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
          "Country": "FE",
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
          "Country": "PY",
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
            "CountryCode": "HB"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.550Z",
              "Country": "NP",
              "Amount": {
                "Amount": "78030.03",
                "Currency": "YUY"
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
                "RelatedDate": "2025-11-21T16:45:02.550Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "67.34",
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
      "CompletionDateTime": "2025-11-21T16:45:02.550Z"
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
      "Country": "GP",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

### POST /international-payment-consents response

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
    "CreationDateTime": "2025-11-21T16:45:02.554Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:45:02.554Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:45:02.554Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "942860",
          "Currency": "BLB"
        }
      }
    ],
    "ExchangeRateInformation": {
      "UnitCurrency": "OAR",
      "ExchangeRate": 0,
      "RateType": "Actual",
      "ContractIdentification": "string",
      "ExpirationDateTime": "2025-11-21T16:45:02.554Z"
    },
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "ZZW",
      "DestinationCountryCode": "DF",
      "InstructedAmount": {
        "Amount": "672",
        "Currency": "IOH"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "HLV",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MN",
          "AddressLine": [
            "string"
          ]
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
          "Country": "WY",
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
          "Country": "FA",
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
          "Country": "TA",
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
            "CountryCode": "KK"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.554Z",
              "Country": "OQ",
              "Amount": {
                "Amount": "9.74",
                "Currency": "KJP"
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
                "RelatedDate": "2025-11-21T16:45:02.554Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "4811793047509.8",
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
      "CompletionDateTime": "2025-11-21T16:45:02.554Z"
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
      "Country": "GT",
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
    "FirstAvailableDateTime": "2025-11-21T16:45:02.554Z",
    "LastAvailableDateTime": "2025-11-21T16:45:02.554Z"
  }
}
```

## Confirm Funds on International Payment Order Consent

### GET / international-payment-consents/{ConsentId}/funds-confirmation Request

```
GET /international-payment-consents/58923/funds-confirmation HTTP/1.1
Authorization: Bearer Jhingapulaav
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

### GET /international-payment-consents/{ConsentId}/funds-confirmation Response

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
      "FundsAvailableDateTime": "2025-11-21T16:53:16.692Z",
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
    "FirstAvailableDateTime": "2025-11-21T16:53:16.692Z",
    "LastAvailableDateTime": "2025-11-21T16:53:16.692Z"
  }
}
```

## Debit amount specified; ASPSP provides indicative FX rate

The payee specifies the amount to be debited from the payment account and requests a payment to be credited in USD at an indicative rate.

### POST /international-payment-consents request

```
POST /international-payment-consents HTTP/1.1
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
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "KTV",
      "DestinationCountryCode": "IH",
      "InstructedAmount": {
        "Amount": "293",
        "Currency": "ALE"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "JTD",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MW",
          "AddressLine": [
            "string"
          ]
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
          "Country": "FE",
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
          "Country": "PY",
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
            "CountryCode": "HB"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.550Z",
              "Country": "NP",
              "Amount": {
                "Amount": "78030.03",
                "Currency": "YUY"
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
                "RelatedDate": "2025-11-21T16:45:02.550Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "67.34",
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
      "CompletionDateTime": "2025-11-21T16:45:02.550Z"
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
      "Country": "GP",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

### POST /international-payment-consents response

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
    "CreationDateTime": "2025-11-21T16:45:02.554Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:45:02.554Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:45:02.554Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "942860",
          "Currency": "BLB"
        }
      }
    ],
    "ExchangeRateInformation": {
      "UnitCurrency": "OAR",
      "ExchangeRate": 0,
      "RateType": "Actual",
      "ContractIdentification": "string",
      "ExpirationDateTime": "2025-11-21T16:45:02.554Z"
    },
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "ZZW",
      "DestinationCountryCode": "DF",
      "InstructedAmount": {
        "Amount": "672",
        "Currency": "IOH"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "HLV",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MN",
          "AddressLine": [
            "string"
          ]
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
          "Country": "WY",
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
          "Country": "FA",
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
          "Country": "TA",
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
            "CountryCode": "KK"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.554Z",
              "Country": "OQ",
              "Amount": {
                "Amount": "9.74",
                "Currency": "KJP"
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
                "RelatedDate": "2025-11-21T16:45:02.554Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "4811793047509.8",
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
      "CompletionDateTime": "2025-11-21T16:45:02.554Z"
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
      "Country": "GT",
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
    "FirstAvailableDateTime": "2025-11-21T16:45:02.554Z",
    "LastAvailableDateTime": "2025-11-21T16:45:02.554Z"
  }
}
```

## Debit amount specified; ASPSP provides a pre-booked FX rate

The payee specifies the amount to be debited from the payment account and requests a payment to be credited in USD. The payee specifies a contract reference number that has been pre-negotiated and pre-booked with the ASPSP.

### POST /international-payment-consents request

```
POST /international-payment-consents HTTP/1.1
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
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "KTV",
      "DestinationCountryCode": "IH",
      "InstructedAmount": {
        "Amount": "293",
        "Currency": "ALE"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "JTD",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MW",
          "AddressLine": [
            "string"
          ]
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
          "Country": "FE",
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
          "Country": "PY",
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
            "CountryCode": "HB"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.550Z",
              "Country": "NP",
              "Amount": {
                "Amount": "78030.03",
                "Currency": "YUY"
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
                "RelatedDate": "2025-11-21T16:45:02.550Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "67.34",
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
      "CompletionDateTime": "2025-11-21T16:45:02.550Z"
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
      "Country": "GP",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

### POST /international-payment-consents response

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
    "CreationDateTime": "2025-11-21T16:45:02.554Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:45:02.554Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:45:02.554Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "942860",
          "Currency": "BLB"
        }
      }
    ],
    "ExchangeRateInformation": {
      "UnitCurrency": "OAR",
      "ExchangeRate": 0,
      "RateType": "Actual",
      "ContractIdentification": "string",
      "ExpirationDateTime": "2025-11-21T16:45:02.554Z"
    },
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "ZZW",
      "DestinationCountryCode": "DF",
      "InstructedAmount": {
        "Amount": "672",
        "Currency": "IOH"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "HLV",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MN",
          "AddressLine": [
            "string"
          ]
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
          "Country": "WY",
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
          "Country": "FA",
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
          "Country": "TA",
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
            "CountryCode": "KK"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.554Z",
              "Country": "OQ",
              "Amount": {
                "Amount": "9.74",
                "Currency": "KJP"
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
                "RelatedDate": "2025-11-21T16:45:02.554Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "4811793047509.8",
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
      "CompletionDateTime": "2025-11-21T16:45:02.554Z"
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
      "Country": "GT",
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
    "FirstAvailableDateTime": "2025-11-21T16:45:02.554Z",
    "LastAvailableDateTime": "2025-11-21T16:45:02.554Z"
  }
}
```

## Credit amount specified; ASPSP provides actual (guaranteed) FX rate, for limited time

In this situation, the PSU specifies the amount that must be credited to the payee. The ASPSP will debit the appropriate amount in GBP depending on the exchange rate.

As in the situation where the PSU specifies the amount to be debited the exchange rate could be guaranteed, indicative or pre-booked. CurrencyOfTransfer specified.

### POST /international-payment-consents request

```
POST /international-payment-consents HTTP/1.1
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
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "KTV",
      "DestinationCountryCode": "IH",
      "InstructedAmount": {
        "Amount": "293",
        "Currency": "ALE"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "JTD",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MW",
          "AddressLine": [
            "string"
          ]
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
          "Country": "FE",
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
          "Country": "PY",
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
            "CountryCode": "HB"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.550Z",
              "Country": "NP",
              "Amount": {
                "Amount": "78030.03",
                "Currency": "YUY"
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
                "RelatedDate": "2025-11-21T16:45:02.550Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "67.34",
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
      "CompletionDateTime": "2025-11-21T16:45:02.550Z"
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
      "Country": "GP",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

### POST /international-payment-consents response

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
    "CreationDateTime": "2025-11-21T16:45:02.554Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:45:02.554Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:45:02.554Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "942860",
          "Currency": "BLB"
        }
      }
    ],
    "ExchangeRateInformation": {
      "UnitCurrency": "OAR",
      "ExchangeRate": 0,
      "RateType": "Actual",
      "ContractIdentification": "string",
      "ExpirationDateTime": "2025-11-21T16:45:02.554Z"
    },
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "ZZW",
      "DestinationCountryCode": "DF",
      "InstructedAmount": {
        "Amount": "672",
        "Currency": "IOH"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "HLV",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MN",
          "AddressLine": [
            "string"
          ]
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
          "Country": "WY",
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
          "Country": "FA",
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
          "Country": "TA",
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
            "CountryCode": "KK"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.554Z",
              "Country": "OQ",
              "Amount": {
                "Amount": "9.74",
                "Currency": "KJP"
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
                "RelatedDate": "2025-11-21T16:45:02.554Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "4811793047509.8",
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
      "CompletionDateTime": "2025-11-21T16:45:02.554Z"
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
      "Country": "GT",
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
    "FirstAvailableDateTime": "2025-11-21T16:45:02.554Z",
    "LastAvailableDateTime": "2025-11-21T16:45:02.554Z"
  }
}
```

## International payment with all charges paid by payer

Charge types are indicative only.

### POST /international-payment-consents request

```
POST /international-payment-consents HTTP/1.1
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
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "KTV",
      "DestinationCountryCode": "IH",
      "InstructedAmount": {
        "Amount": "293",
        "Currency": "ALE"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "JTD",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MW",
          "AddressLine": [
            "string"
          ]
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
          "Country": "FE",
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
          "Country": "PY",
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
            "CountryCode": "HB"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.550Z",
              "Country": "NP",
              "Amount": {
                "Amount": "78030.03",
                "Currency": "YUY"
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
                "RelatedDate": "2025-11-21T16:45:02.550Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "67.34",
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
      "CompletionDateTime": "2025-11-21T16:45:02.550Z"
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
      "Country": "GP",
      "AddressLine": [
        "string"
      ]
    }
  }
}
```

### POST /international-payment-consents response

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
    "CreationDateTime": "2025-11-21T16:45:02.554Z",
    "Status": "AWAU",
    "StatusReason": [
      {
        "StatusReasonCode": "ERIN",
        "StatusReasonDescription": "string",
        "Path": "string"
      }
    ],
    "StatusUpdateDateTime": "2025-11-21T16:45:02.554Z",
    "ReadRefundAccount": "No",
    "CutOffDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedExecutionDateTime": "2025-11-21T16:45:02.554Z",
    "ExpectedSettlementDateTime": "2025-11-21T16:45:02.554Z",
    "Charges": [
      {
        "ChargeBearer": "BorneByCreditor",
        "Type": "string",
        "Amount": {
          "Amount": "942860",
          "Currency": "BLB"
        }
      }
    ],
    "ExchangeRateInformation": {
      "UnitCurrency": "OAR",
      "ExchangeRate": 0,
      "RateType": "Actual",
      "ContractIdentification": "string",
      "ExpirationDateTime": "2025-11-21T16:45:02.554Z"
    },
    "Initiation": {
      "InstructionIdentification": "string",
      "EndToEndIdentification": "string",
      "LocalInstrument": "string",
      "InstructionPriority": "Normal",
      "ExtendedPurpose": "string",
      "ChargeBearer": "BorneByCreditor",
      "CurrencyOfTransfer": "ZZW",
      "DestinationCountryCode": "DF",
      "InstructedAmount": {
        "Amount": "672",
        "Currency": "IOH"
      },
      "ExchangeRateInformation": {
        "UnitCurrency": "HLV",
        "ExchangeRate": 0,
        "RateType": "Actual",
        "ContractIdentification": "string"
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
      "Creditor": {
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
          "Country": "MN",
          "AddressLine": [
            "string"
          ]
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
          "Country": "WY",
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
          "Country": "FA",
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
          "Country": "TA",
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
            "CountryCode": "KK"
          },
          "Details": [
            {
              "Type": "string",
              "Date": "2025-11-21T16:45:02.554Z",
              "Country": "OQ",
              "Amount": {
                "Amount": "9.74",
                "Currency": "KJP"
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
                "RelatedDate": "2025-11-21T16:45:02.554Z",
                "LineDetails": [
                  "string"
                ]
              }
            ],
            "ReferredDocumentAmount": "4811793047509.8",
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
      "CompletionDateTime": "2025-11-21T16:45:02.554Z"
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
      "Country": "GT",
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
    "FirstAvailableDateTime": "2025-11-21T16:45:02.554Z",
    "LastAvailableDateTime": "2025-11-21T16:45:02.554Z"
  }
}
```
