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
      "PSUAuthenticationMethods": [ "UK.OBIE.SCA" ],
      "PSUInteractionTypes": [ "OffSession" ],
      "VRPType": ["UK.OBIE.VRPType.Sweeping"],
      "ValidFromDateTime": "2017-06-05T15:15:13+00:00",
      "ValidToDateTime": "2020-06-05T15:15:13+00:00",
      "MaximumIndividualAmount": {
        "Amount": "100.00",
        "Currency": "GBP"
      },
      "PeriodicLimits": [
        {
          "Amount": "200.00",
          "Currency": "GBP",
          "PeriodAlignment": "Consent",
          "PeriodType": "Week"
        }
      ]
    },
    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "SecondaryIdentification": "008419",
        "Name": "Marcus Sweepimus",
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
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus",
        "Proxy": {
          "Identification": "441234012346",
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
      "CreditorPostalAddress": {
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
      "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
            }
          }]
      }],
      "RemittanceInformation": {
        "Structured": [
          {
          "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
          "ReferredDocumentAmount": 1,
          "CreditorReferenceInformation": {
            "Reference": "SweepCo",
            "Code": "DISP",
            "Issuer": "Issuer01",
            },
          "Invoicer": "INVR51856",
          "Invoicee": "INVE5161856",
          "TaxRemittance": "Tax Remittance related information",
          "AdditionalRemittanceInformation": ["Free text for additional information"],
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
  },
  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
    "CreationDateTime": "2017-06-05T15:15:15+00:00",
    "Status": "AUTH",
    "StatusReason": {
      "StatusReasonCode": "U038", 
      "StatusReasonDescription":"Consent consumed successfully",
    },
    "StatusUpdateDateTime": "2017-06-05T15:15:15+05:00",
    "ReadRefundAccount": "Yes",
    "ControlParameters": {
      "PSUAuthenticationMethods": [ "UK.OBIE.SCA" ],
      "PSUInteractionTypes": [ "OffSession" ],
      "VRPType": "UK.OBIE.VRPType.Sweeping",
      "ValidFromDateTime": "2017-06-05T15:15:13+00:00",
      "ValidToDateTime": "2020-06-05T15:15:13+00:00",
      "MaximumIndividualAmount": {
        "Amount": "100.00",
        "Currency": "GBP"
      },
      "PeriodicLimits": [
        {
          "Amount": "200.00",
          "Currency": "GBP",
          "PeriodAlignment": "Consent",
          "PeriodType": "Week"
        }
      ]
    },
    "DebtorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "GB76LOYD30949301273801",
      "SecondaryIdentification": "008419",
      "Name": "Marcus Sweepimus",
      "Proxy": {
          "Identification": "441234012345",
          "Code": "TELE",
          "Type": "Telephone"
      }
    },
    "Initiation": {
      "DebtorAccount": {
       "SchemeName": "UK.OBIE.IBAN",
       "Identification": "GB76LOYD30949301273801",
       "SecondaryIdentification": "008419",
       "Name": "Marcus Sweepimus",
       "Proxy": {
          "Identification": "441234012345",
          "Code": "TELE",
          "Type": "Telephone"
        }
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus",
        "Proxy": {
          "Identification": "441234012348",
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
      "CreditorPostalAddress": {
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
      "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
              }
            }]
        }],
      "RemittanceInformation": {
        "Structured": [
          {
          "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "ReferredDocumentAmount": 1,
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"],
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    },
  },

  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-vrp-consents/fe615446-e53a-45ed-954c-ae5d1f97a93b"
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
    "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
    "CreationDateTime": "2017-06-05T15:15:15+00:00",
    "Status": "AUTH",
    "StatusUpdateDateTime": "2017-06-05T15:15:15+05:00",
    "ReadRefundAccount": "Yes",
    "StatusReason": {
      "StatusReasonCode": "U038", 
      "StatusReasonDescription":"Consent consumed successfully",
    },
    "ControlParameters": {
      "PSUAuthenticationMethods": [ "UK.OBIE.SCA" ],
      "PSUInteractionTypes": [ "OffSession" ],
      "VRPType": "UK.OBIE.VRPType.Sweeping",
      "ValidFromDateTime": "2017-06-05T15:15:13+00:00",
      "ValidToDateTime": "2020-06-05T15:15:13+00:00",
      "MaximumIndividualAmount": {
        "Amount": "100.00",
        "Currency": "GBP"
      },
      "PeriodicLimits": [
        {
          "Amount": "200.00",
          "Currency": "GBP",
          "PeriodAlignment": "Consent",
          "PeriodType": "Week"
        }
      ]
    },

    "DebtorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "GB76LOYD30949301273801",
      "Name": "Marcus Sweepimus",
      "SecondaryIdentification": "008419",
      "Name": "Marcus Sweepimus",
      "Proxy": {
          "Identification": "441234012345",
          "Code": "TELE",
          "Type": "Telephone"
      }
    },
    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus",
        "SecondaryIdentification": "008419",
        "Name": "Marcus Sweepimus",
        "Proxy": {
            "Identification": "441234012345",
            "Code": "TELE",
            "Type": "Telephone"
        }
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus",
        "Proxy": {
          "Identification": "441234012348",
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
      "CreditorPostalAddress": {
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
      "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
              }
            }]
        }],
      "RemittanceInformation": {
        "Structured": [{
          "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "ReferredDocumentAmount": 1,
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"],
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-vrp-consents/fe615446-e53a-45ed-954c-ae5d1f97a93b"
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
    "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
    "PSUAuthenticationMethod": "UK.OBIE.SCA",
    "PSUInteractionType": "OffSession",
    "VRPType": "UK.OBIE.VRPType.Sweeping" ,

    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus",
        "SecondaryIdentification": "008419",
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
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus",
        "Proxy": {
          "Identification": "441234012348",
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
      "CreditorPostalAddress": {
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
      "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
              }
            }]
        }],
     "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "ReferredDocumentAmount": 1,
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"],
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    },

    "Instruction": {
      "InstructionIdentification": "fe655556-e53a-45ed-954c-ae5d1f97a93b",
      "EndToEndIdentification": "fe699996-e53a-45ed-954c-ae5d1f97a93a",
      "LocalInstrument": "UK.OBIE.Paym",
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus",
        "Proxy":{
          "Identification": "441234012348",
          "Code": "TELE",
          "Type": "Telephone"
        }
      },
      "InstructedAmount": {
        "Amount": "10.00",
        "Currency": "GBP"
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
      "CreditorPostalAddress": {
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
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "ReferredDocumentAmount": 1,
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"],
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
    "CreationDateTime": "2017-06-05T15:15:15+00:00",
    "DomesticVRPId": "OU90210",
    "Status": "PDNG",
    "StatusReason": {
      "StatusReasonCode": "83",
      "StatusReasonDescription":"Pending completion next working day",
    },
    "StatusUpdateDateTime": "2017-06-05T15:15:15+00:00",
    "ExpectedExecutionDateTime": "2017-06-05T15:15:15+00:00",
    "ExpectedSettlementDateTime": "2017-06-06T15:15:15+00:00",
    "DebtorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "GB76LOYD30949301273801",
      "Name": "Marcus Sweepimus",
      "SecondaryIdentification": "008419",
      "Proxy":{
          "Identification": "441234012348",
          "Code": "TELE",
          "Type": "Telephone"
        }
    },
    "Refund" : "Yes", 
    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus",
        "SecondaryIdentification": "008419",
        "Proxy": {
          "Identification": "441234012345",
          "Code": "TELE",
          "Type": "Telephone"
        }
      },
      "Refund":{
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus",
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
      "CreditorAccount": {
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
      "CreditorPostalAddress": {
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
      "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
              }
            }]
      }],
      "RemittanceInformation": {
        "Structured": [
          {
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "ReferredDocumentAmount": 1,
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    },

    "Instruction": {
      "InstructionIdentification": "fe655556-e53a-45ed-954c-ae5d1f97a93b",
      "EndToEndIdentification": "fe699996-e53a-45ed-954c-ae5d1f97a93a",
      "LocalInstrument": "UK.OBIE.Paym",
      "CreditorAccount": {
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
      "CreditorPostalAddress": {
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
      "InstructedAmount": {
        "Amount": "10.00",
        "Currency": "GBP"
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
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-vrps/OU90210"
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
      "PSUAuthenticationMethods": [ "UK.OBIE.SCA" ],
      "PSUInteractionTypes": [ "OffSession" ],
      "VRPType": ["UK.OBIE.VRPType.Sweeping"],
      "ValidFromDateTime": "2017-06-05T15:15:13+00:00",
      "ValidToDateTime": "2020-06-05T15:15:13+00:00",
      "MaximumIndividualAmount": {
        "Amount": "100.00",
        "Currency": "GBP"
      },
      "PeriodicLimits": [
        {
          "Amount": "200.00",
          "Currency": "GBP",
          "PeriodAlignment": "Consent",
          "PeriodType": "Week"
        }
      ]
    },
    "Initiation": {
      "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
            }
          }]
      }],
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
      "CreditorAccount": {
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
      "CreditorPostalAddress": {
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
             "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "ReferredDocumentAmount": 1,
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
    "CreationDateTime": "2017-06-05T15:15:15+00:00",
    "Status": "AWAU",
    "StatusReason": {
      "StatusReasonCode": "U031", 
      "StatusReasonDescription":"All checks yet to start",
    },
    "StatusUpdateDateTime": "2017-06-05T15:15:15+00:00",
    "ReadRefundAccount": "Yes",
    "ExpectedExecutionDateTime": "2017-06-05T15:15:15+00:00",
    "ExpectedSettlementDateTime": "2017-06-06T15:15:15+00:00",
    "ControlParameters": {
      "PSUAuthenticationMethods": [ "UK.OBIE.SCA" ],
      "PSUInteractionTypes": [ "OffSession" ],
      "VRPType": "UK.OBIE.VRPType.Sweeping",
      "ValidFromDateTime": "2017-06-05T15:15:13+00:00",
      "ValidToDateTime": "2020-06-05T15:15:13+00:00",
      "MaximumIndividualAmount": {
        "Amount": "100.00",
        "Currency": "GBP"
      },
      "PeriodicLimits": [
        {
          "Amount": "200.00",
          "Currency": "GBP",
          "PeriodAlignment": "Consent",
          "PeriodType": "Week"
        }
      ]
    },
    "Initiation": {
      "CreditorAccount": {
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
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus",
        "SecondaryIdentification": "008419",
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
      "CreditorPostalAddress": {
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
      "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
              }
            }]
      }],
      "RemittanceInformation": {
        "Structured": [
          {
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "ReferredDocumentAmount": 1,
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-vrp-consents/fe615446-e53a-45ed-954c-ae5d1f97a93b"
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
    "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
    "CreationDateTime": "2017-06-05T15:15:15+00:00",
    "Status": "AUTH",
    "StatusUpdateDateTime": "2017-06-05T15:15:15+05:00",
    "ReadRefundAccount": "Yes",

    "ControlParameters": {
      "PSUAuthenticationMethods": [ "UK.OBIE.SCA" ],
      "PSUInteractionTypes": [ "OffSession" ],
      "VRPType": "UK.OBIE.VRPType.Sweeping",
      "ValidFromDateTime": "2017-06-05T15:15:13+00:00",
      "ValidToDateTime": "2020-06-05T15:15:13+00:00",
      "MaximumIndividualAmount": {
        "Amount": "100.00",
        "Currency": "GBP"
      },
      "PeriodicLimits": [
        {
          "Amount": "200.00",
          "Currency": "GBP",
          "PeriodAlignment": "Consent",
          "PeriodType": "Week"
        }
      ]
    },
    "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus",
        "SecondaryIdentification": "008419",
          "Proxy": {
            "Identification": "441234012345",
            "Code": "TELE",
            "Type": "Telephone"
          }
      },
    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus",
        "SecondaryIdentification": "008419",
          "Proxy": {
            "Identification": "441234012345",
            "Code": "TELE",
            "Type": "Telephone"
          }
      },
      "CreditorPostalAddress": {
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
      "CreditorAccount": {
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
        "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
            }
          }]
      }],
      "RemittanceInformation": {
        "Structured": [
          {
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "ReferredDocumentAmount": 1,
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-vrp-consents/fe615446-e53a-45ed-954c-ae5d1f97a93b"
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
  "Data" :{
     "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
     "Reference": "SweepCo",
     "InstructedAmount": {
        "Amount": "22.89",
        "Currency": "GBP"
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
    "FundsConfirmationId" : "1561818651681",
    "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
    "CreationDateTime": "2024-04-25T13:26:41.911Z",
    "Reference": "SweepCo",
    "FundsAvailableResult":{
      "FundsAvailableDateTime": "2024-04-25T13:26:41.911Z",
      "FundsAvailable" : "Available"
    },
    "InstructedAmount": {
        "Amount": "22.89",
        "Currency": "GBP"
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
    "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
    "PSUAuthenticationMethod": "UK.OBIE.SCA",
    "PSUInteractionType": "OffSession",
    "VRPType": "UK.OBIE.VRPType.Sweeping",
    "Refund" : "Yes", 
    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus",
        "SecondaryIdentification": "008419",
        "Proxy": {
          "Identification": "441234012345",
          "Code": "TELE",
          "Type": "Telephone"
        }
      },
      "CreditorAccount": {
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
      "CreditorPostalAddress": {
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
      "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
              }
            }]
      }],
      "RemittanceInformation": {
        "Structured": [
          {
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "ReferredDocumentAmount": 1,
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    },

    "Instruction": {
      "InstructionIdentification": "fe655556-e53a-45ed-954c-ae5d1f97a93b",
      "EndToEndIdentification": "fe699996-e53a-45ed-954c-ae5d1f97a93a",
      "LocalInstrument": "UK.OBIE.Paym",
      "CreditorAccount": {
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
      "CreditorPostalAddress": {
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
      "InstructedAmount": {
        "Amount": "10.00",
        "Currency": "GBP"
      },
      "RemittanceInformation": {
        "Structured": [
          {
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "ConsentId": "fe615446-e53a-45ed-954c-ae5d1f97a93b",
    "CreationDateTime": "2017-06-05T15:15:15+00:00",
    "DomesticVRPId": "OU90210",
    "StatusCode": "PDNG",
    "StatusReason": {
      "StatusReasonCode": "83",
      "StatusReasonDescription":"Pending completion next working day",
    },
    "StatusUpdateDateTime": "2017-06-05T15:15:15+00:00",
    "ExpectedExecutionDateTime": "2017-06-05T15:15:15+00:00",
    "ExpectedSettlementDateTime": "2017-06-06T15:15:15+00:00",
    "DebtorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "GB76LOYD30949301273801",
      "Name": "Marcus Sweepimus",
      "SecondaryIdentification": "008419",
      "Proxy":{
          "Identification": "441234012348",
          "Code": "TELE",
          "Type": "Telephone"
        }
    },
    "Refund" : "Yes", 
    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus",
        "SecondaryIdentification": "008419",
        "Proxy": {
          "Identification": "441234012345",
          "Code": "TELE",
          "Type": "Telephone"
        }
      },
      "Refund":{
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus",
      },
      "CreditorAccount": {
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
      "CreditorPostalAddress": {
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
      "RegulatoryReporting": [{
          "DebitCreditReportingIndicator": "CRED",
          "Authority": {
            "Name": "string",
            "CountryCode": "UG"
          },
          "Details": [{
              "Type": "CRED",
              "Date": "2024-04-25T13:26:41.911Z",
              "Information": ["Reg info1", "Reg info2"],
              "Country": "QG",
              "Amount": {
                "Amount": "4.68702",
                "Currency": "JGM"
              }
            }]
      }],
      "RemittanceInformation": {
        "Structured": [
          {
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "ReferredDocumentAmount": 1,
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    },

    "Instruction": {
      "InstructionIdentification": "fe655556-e53a-45ed-954c-ae5d1f97a93b",
      "EndToEndIdentification": "fe699996-e53a-45ed-954c-ae5d1f97a93a",
      "LocalInstrument": "UK.OBIE.Paym",
      "CreditorAccount": {
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
      "CreditorPostalAddress": {
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
      "InstructedAmount": {
        "Amount": "10.00",
        "Currency": "GBP"
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
            "ReferredDocumentInformation": [{
              "Code": "CINV",
              "Issuer": "Issuer01",
              "Number": "Number_01",
              "RelatedDate": "2024-04-25T13:26:41.911Z",
              "LineDetails": [
                "LineDetail"
              ]
            }],
            "CreditorReferenceInformation": {
              "Reference": "SweepCo",
              "Code": "DISP",
              "Issuer": "Issuer01",
            },
            "Invoicer": "INVR51856",
            "Invoicee": "INVE5161856",
            "TaxRemittance": "Tax Remittance related information",
            "AdditionalRemittanceInformation": ["Free text for additional information"]
          },
        ],
        "Unstructured": "Internal ops code 5120101"
      },
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToSell",
    "ContractPresentIndicator": true,
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
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-vrps/OU90210"
  },
  
  "Meta": {}  
}
```
