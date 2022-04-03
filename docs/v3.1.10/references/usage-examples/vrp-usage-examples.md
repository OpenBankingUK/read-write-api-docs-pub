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
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus"
      },
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus"
      },
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
    "Status": "Authorised",
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
      "Name": "Marcus Sweepimus"
    },

    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus"
      },
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus"
      },
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
    "Status": "Authorised",
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
      "Name": "Marcus Sweepimus"
    },

    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus"
      },
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus"
      },
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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

    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus"
      },
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus"
      },
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    },

    "Instruction": {
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus"
      },
      "InstructedAmount": {
        "Amount": "10.00",
        "Currency": "GBP"
      },
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
    "Status": "Pending",
    "StatusUpdateDateTime": "2017-06-05T15:15:15+00:00",

    "DebtorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "GB76LOYD30949301273801",
      "Name": "Marcus Sweepimus"
    },

    "Initiation": {
      "DebtorAccount": {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB76LOYD30949301273801",
        "Name": "Marcus Sweepimus"
      },
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus"
      },
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    },

    "Instruction": {
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus"
      },
      "InstructedAmount": {
        "Amount": "10.00",
        "Currency": "GBP"
      },
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
    "Status": "AwaitingAuthorisation",
    "StatusUpdateDateTime": "2017-06-05T15:15:15+00:00",
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

    "Initiation": {
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
    "Status": "Authorised",
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
      "Name": "Marcus Sweepimus"
    },

    "Initiation": {
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },

  
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-vrp-consents/fe615446-e53a-45ed-954c-ae5d1f97a93b"
  },
  
  "Meta": {}
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

    "Initiation": {
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    },

    "Instruction": {
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus"
      },
      "InstructedAmount": {
        "Amount": "10.00",
        "Currency": "GBP"
      },
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
    "Status": "Pending",
    "StatusUpdateDateTime": "2017-06-05T15:15:15+00:00",

    "DebtorAccount": {
      "SchemeName": "UK.OBIE.IBAN",
      "Identification": "GB76LOYD30949301273801",
      "Name": "Marcus Sweepimus"
    },

    "Initiation": {
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    },

    "Instruction": {
      "CreditorAccount": {
        "SchemeName": "SortCodeAccountNumber",
        "Identification": "30949330000010",
        "SecondaryIdentification": "Roll 90210",
        "Name": "Marcus Sweepimus"
      },
      "InstructedAmount": {
        "Amount": "10.00",
        "Currency": "GBP"
      },
      "RemittanceInformation": {
        "Reference": "Sweepco"
      }
    }
  },

  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },

  
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-vrps/OU90210"
  },
  
  "Meta": {}  
}
```
