# Domestic Payment Usage Examples - v3.1.10 <!-- omit in toc -->

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
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "EcommerceMerchantInitiatedPayment",
    "ContractPresentInidicator": false,
    "PaymentPurposeCode": "EPAY",
    "BeneficiaryPaymentDetailsPrepopulatedIndicator": false,
    "BeneficiaryAccountType": "Business",
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
    "ConsentId": "58923",
    "Status": "AwaitingAuthorisation",
    "CreationDateTime": "2017-06-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "EcommerceMerchantInitiatedPayment",
    "ContractPresentInidicator": false,
    "PaymentPurposeCode": "EPAY",
    "BeneficiaryPaymentDetailsPrepopulatedIndicator": false,
    "BeneficiaryAccountType": "Business",
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
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/58923"
  },
  "Meta": {}
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
            "FundsAvailableDateTime": "2017-06-05T15:15:23+00:00",
            "FundsAvailable": true
        }
    },
    "Links": {
        "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/58923/funds-confirmation"
    },
    "Meta": {}
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
    "ConsentId": "58923",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "EcommerceMerchantInitiatedPayment",
    "ContractPresentInidicator": false,
    "PaymentPurposeCode": "EPAY",
    "BeneficiaryPaymentDetailsPrepopulatedIndicator": false,
    "BeneficiaryAccountType": "Business",
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
    "DomesticPaymentId": "58923-001",
    "ConsentId": "58923",
    "Status": "AcceptedSettlementInProcess",
    "CreationDateTime": "2017-06-05T15:15:22+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/58923-001"
  },
  "Meta": {}
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
    "ConsentId": "58923",
    "Status": "Authorised",
    "CreationDateTime": "2017-06-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:22+00:00",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "EcommerceMerchantInitiatedPayment",
    "ContractPresentInidicator": false,
    "PaymentPurposeCode": "EPAY",
    "BeneficiaryPaymentDetailsPrepopulatedIndicator": false,
    "BeneficiaryAccountType": "Business",
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
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/58923"
  },
  "Meta": {}
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
    "DomesticPaymentId": "58923-001",
    "ConsentId": "58923",
    "Status": "AcceptedSettlementInProcess",
    "CreationDateTime": "2017-06-05T15:15:22+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:22+00:00",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructedAmount": {
        "Amount": "165.88",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "08080021325698",
        "Name": "ACME Inc",
        "SecondaryIdentification": "0002"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/58923-001"
  },
  "Meta": {}
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
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "InstructedAmount": {
        "Amount": "20.00",
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
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
    "ConsentId": "7290",
    "Status": "AwaitingAuthorisation",
    "CreationDateTime": "2017-06-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "InstructedAmount": {
        "Amount": "20.00",
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
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
  },
  "Meta": {}
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
    "ConsentId": "7290",
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "InstructedAmount": {
        "Amount": "20.00",
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
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
    "DomesticPaymentId": "7290-003",
    "ConsentId": "7290",
    "Status": "AcceptedSettlementInProcess",
    "CreationDateTime": "2017-06-05T15:15:22+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:22+00:00",
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "InstructedAmount": {
        "Amount": "20.00",
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
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/7290-003"
  },
  "Meta": {}
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
    "ConsentId": "7290",
    "Status": "Consumed",
    "CreationDateTime": "2017-06-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "InstructedAmount": {
        "Amount": "20.00",
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
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
  },
  "Meta": {}
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
    "DomesticPaymentId": "7290-003",
    "ConsentId": "7290",
    "Status": "AcceptedSettlementInProcess",
    "CreationDateTime": "2017-06-05T15:15:22+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:22+00:00",
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "InstructedAmount": {
        "Amount": "20.00",
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
    }
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/7290-003"
  },
  "Meta": {}
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
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "LocalInstrument": "UK.OBIE.BACS",
      "InstructedAmount": {
        "Amount": "20.00",
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
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
    "ConsentId": "7290",
    "Status": "AwaitingAuthorisation",
    "CreationDateTime": "2017-06-05T15:15:13+00:00",
    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
    "CutOffDateTime":"2017-06-05T17:30:00+00:00",
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "LocalInstrument": "UK.OBIE.BACS",
      "InstructedAmount": {
        "Amount": "20.00",
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
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
  },
  "Meta": {}
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
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "LocalInstrument": "UK.OBIE.CHAPS",
      "InstructedAmount": {
        "Amount": "20.00",
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
        "BuildingNumber":"1",
        "PostCode":"AB1 2CD",
        "TownName":"London",
        "Country":"UK"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-037",
        "Unstructured": "Internal ops code 5120103"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "TransferToThirdParty"
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
   "Data":{
      "ConsentId":"7290",
      "Status":"AwaitingAuthorisation",
      "CreationDateTime":"2017-06-05T15:15:13+00:00",
      "StatusUpdateDateTime":"2017-06-05T15:15:13+00:00",
      "CutOffDateTime":"2017-06-05T17:30:00+00:00",
      "Initiation":{
         "InstructionIdentification":"ANSM023",
         "EndToEndIdentification":"FRESCO.21302.GFX.37",
         "LocalInstrument":"UK.OBIE.CHAPS",
         "InstructedAmount":{
            "Amount":"20.00",
            "Currency":"GBP"
         },
         "DebtorAccount":{
            "SchemeName":"UK.OBIE.SortCodeAccountNumber",
            "Identification":"11280001234567",
            "Name":"Andrea Smith"
         },
         "CreditorAccount":{
            "SchemeName":"UK.OBIE.SortCodeAccountNumber",
            "Identification":"08080021325698",
            "Name":"Bob Clements"
         },
        "CreditorPostalAddress": {
            "AddressType": "Correspondence",
            "StreetName": "Liberty",
            "BuildingNumber":"1",
            "PostCode":"AB1 2CD",
            "TownName":"London",
            "Country":"UK"
         },
         "RemittanceInformation":{
            "Reference":"FRESCO-037",
            "Unstructured":"Internal ops code 5120103"
         }
      },
      "Charges":[
         {
            "ChargeBearer":"BorneByDebtor",
            "Type":"UK.OBIE.ChapsOut",
            "Amount":{
               "Amount":"30.00",
               "Currency":"GBP"
            }
         }
      ]
   },
   "Risk":{
      "PaymentContextCode":"TransferToThirdParty"
   },
   "Links":{
      "Self":"https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
   },
   "Meta":{}
}
```

## Balance Transfer
Below in an example illustrating a balance transfer offer available on a Card A.

To facilitate a Balance Transfer, a PISP can initiate a Payment from Card B to Card A with LocalInstrument as UK.OBIE.BalanceTransfer, Account SchemeName as UK.OBIE.PAN and if there is an Offer Code/Id provided by Issuer of the Card A, then it can be supplied in the field: RemittanceInformation.Reference.
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
        "Initiation": {
            "InstructionIdentification": "ANSM023",
            "EndToEndIdentification": "FRESCO.21302.GFX.37",
            "LocalInstrument": "UK.OBIE.BalanceTransfer",
            "InstructedAmount": {
                "Amount": "3000.00",
                "Currency": "GBP"
            },
            "DebtorAccount": {
                "SchemeName": "UK.OBIE.PAN",
                "Identification": "5555555555554444",
                "Name": "Andrea Smith"
            },
            "CreditorAccount": {
                "SchemeName": "UK.OBIE.PAN",
                "Identification": "4444333322221111",
                "Name": "Andrea Smith"
            },
            "RemittanceInformation": {
                "Reference": "BT-OfferCode-12",
                "Unstructured": "Internal ops code 5120103"
            }
        }
    },
    "Risk": {
        "PaymentContextCode": "TransferToThirdParty"
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
        "ConsentId": "7290",
        "Status": "AwaitingAuthorisation",
        "CreationDateTime": "2017-06-05T15:15:13+00:00",
        "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
        "CutOffDateTime": "2017-06-05T17:30:00+00:00",
        "Initiation": {
            "InstructionIdentification": "ANSM023",
            "EndToEndIdentification": "FRESCO.21302.GFX.37",
            "LocalInstrument": "UK.OBIE.BalanceTransfer",
            "InstructedAmount": {
                "Amount": "3000.00",
                "Currency": "GBP"
            },
            "DebtorAccount": {
                "SchemeName": "UK.OBIE.PAN",
                "Identification": "5555555555554444",
                "Name": "Andrea Smith"
            },
            "CreditorAccount": {
                "SchemeName": "UK.OBIE.PAN",
                "Identification": "4444333322221111",
                "Name": "Andrea Smith"
            },
            "RemittanceInformation": {
                "Reference": "BT-OfferCode-12",
                "Unstructured": "Internal ops code 5120103"
            }
        }
    },
    "Risk": {
        "PaymentContextCode": "TransferToThirdParty"
    },
    "Links": {
        "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
    },
    "Meta": {}
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
        "Initiation": {
            "InstructionIdentification": "ANSM023",
            "EndToEndIdentification": "FRESCO.21302.GFX.37",
            "LocalInstrument": "UK.OBIE.MoneyTransfer",
            "InstructedAmount": {
                "Amount": "3000.00",
                "Currency": "GBP"
            },
            "DebtorAccount": {
                "SchemeName": "UK.OBIE.PAN",
                "Identification": "5555555555554444",
                "Name": "Andrea Smith"
            },
            "CreditorAccount": {
                "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                "Identification": "11280001234567",
                "Name": "Andrea Smith"
            },
            "RemittanceInformation": {
                "Reference": "MT-OfferCode-24",
                "Unstructured": "Internal ops code 5120103"
            }
        }
    },
    "Risk": {
        "PaymentContextCode": "TransferToThirdParty"
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
        "ConsentId": "7290",
        "Status": "AwaitingAuthorisation",
        "CreationDateTime": "2017-06-05T15:15:13+00:00",
        "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
        "CutOffDateTime": "2017-06-05T17:30:00+00:00",
        "Initiation": {
            "InstructionIdentification": "ANSM023",
            "EndToEndIdentification": "FRESCO.21302.GFX.37",
            "LocalInstrument": "UK.OBIE.MoneyTransfer",
            "InstructedAmount": {
                "Amount": "3000.00",
                "Currency": "GBP"
            },
            "DebtorAccount": {
                "SchemeName": "UK.OBIE.PAN",
                "Identification": "5555555555554444",
                "Name": "Andrea Smith"
            },
            "CreditorAccount": {
                "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                "Identification": "11280001234567",
                "Name": "Andrea Smith"
            },
            "RemittanceInformation": {
                "Reference": "MT-OfferCode-24",
                "Unstructured": "Internal ops code 5120103"
            }
        }
    },
    "Risk": {
        "PaymentContextCode": "TransferToThirdParty"
    },
    "Links": {
        "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
    },
    "Meta": {}
}
```
