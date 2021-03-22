# International Payment Usage Examples - v3.1.2

1. [Debit amount specified; ASPSP provides actual (guaranteed) FX rate, for limited time](#debit-amount-specified-aspsp-provides-actual-guaranteed-fx-rate-for-limited-time)
   1. [POST /international-payment-consents request](#post-international-payment-consents-request)
   2. [POST /international-payment-consents response](#post-international-payment-consents-response)
2. [Confirm Funds on International Payment Order Consent](#confirm-funds-on-international-payment-order-consent)
   1. [GET / international-payment-consents/{ConsentId}/funds-confirmation Request](#get--international-payment-consentsconsentidfunds-confirmation-request)
   2. [GET /international-payment-consents/{ConsentId}/funds-confirmation Response](#get-international-payment-consentsconsentidfunds-confirmation-response)
3. [Debit amount specified; ASPSP provides indicative FX rate](#debit-amount-specified-aspsp-provides-indicative-fx-rate)
   1. [POST /international-payment-consents request](#post-international-payment-consents-request-1)
   2. [POST /international-payment-consents response](#post-international-payment-consents-response-1)
4. [Debit amount specified; ASPSP provides a pre-booked FX rate](#debit-amount-specified-aspsp-provides-a-pre-booked-fx-rate)
   1. [POST /international-payment-consents request](#post-international-payment-consents-request-2)
   2. [POST /international-payment-consents response](#post-international-payment-consents-response-2)
5. [Credit amount specified; ASPSP provides actual (guaranteed) FX rate, for limited time](#credit-amount-specified-aspsp-provides-actual-guaranteed-fx-rate-for-limited-time)
   1. [POST /international-payment-consents request](#post-international-payment-consents-request-3)
   2. [POST /international-payment-consents response](#post-international-payment-consents-response-3)
6. [International payment with all charges paid by payer](#international-payment-with-all-charges-paid-by-payer)
   1. [POST /international-payment-consents request](#post-international-payment-consents-request-4)
   2. [POST /international-payment-consents response](#post-international-payment-consents-response-4)

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
  "Initiation": {
   "InstructionIdentification": "ACME412",
   "EndToEndIdentification": "FRESCO.21302.GFX.20",
   "InstructionPriority": "Normal",
   "CurrencyOfTransfer": "USD",
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
   },
   "ExchangeRateInformation": {
    "UnitCurrency": "GBP",
    "RateType": "Actual"
   }
  }
 },
 "Risk": {
  "PaymentContextCode": "PartyToParty"
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
  "ConsentId": "58923",
  "Status": "AwaitingAuthorisation",
  "CutOffDateTime": "2017-06-05T16:00:13+00:00",
  "CreationDateTime": "2017-06-05T15:15:13+00:00",
  "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
  "Initiation": {
   "InstructionIdentification": "ACME412",
   "EndToEndIdentification": "FRESCO.21302.GFX.20",
   "InstructionPriority": "Normal",
   "CurrencyOfTransfer": "USD",
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
   },
   "ExchangeRateInformation": {
    "UnitCurrency": "GBP",
    "RateType": "Actual"
   }
  },
  "ExchangeRateInformation": {
   "UnitCurrency": "GBP",
   "ExchangeRate": 1.1,
   "RateType": "Actual",
   "ExpirationDateTime": "2017-06-05T15:45:13+00:00"
  }
 },
 "Risk": {
  "PaymentContextCode": "PartyToParty"
 },
 "Links": {
  "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-payment-consents/58923"
 },
 "Meta": {}
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
			"FundsAvailableDateTime": "2017-06-05T15:15:23+00:00",
			"FundsAvailable": true
		}
	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-payment-consents/58923/funds-confirmation"
	},
	"Meta": {}
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
  "Initiation": {
   "InstructionIdentification": "ACME412",
   "EndToEndIdentification": "FRESCO.21302.GFX.20",
   "InstructionPriority": "Normal",
   "CurrencyOfTransfer": "USD",
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
   },
   "ExchangeRateInformation": {
    "UnitCurrency": "GBP",
    "RateType": "Indicative"
   }
  }
 },
 "Risk": {
  "PaymentContextCode": "PartyToParty"
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
		"ConsentId": "58923",
		"Status": "AwaitingAuthorisation",
		"CutOffDateTime": "2017-06-05T16:00:13+00:00",
		"CreationDateTime": "2017-06-05T15:15:13+00:00",
		"StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
		"Initiation": {},
		"ExchangeRateInformation": {
			"UnitCurrency": "GBP",
			"ExchangeRate": 1.10,
			"RateType": "Indicative"
		},
	},
	"Risk": {
		"PaymentContextCode": "PartyToParty"

	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-payment-consents/58923"
	},
	"Meta": {}
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
  "Initiation": {
   "InstructionIdentification": "ACME412",
   "EndToEndIdentification": "FRESCO.21302.GFX.20",
   "InstructionPriority": "Normal",
   "CurrencyOfTransfer": "USD",
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
   },
   "ExchangeRateInformation": {
    "UnitCurrency": "GBP",
    "RateType": "Agreed",
    "ExchangeRate": 1.09,
    "ContractIdentification": "/tbill/2018/T102993"
   }
  }
 },
 "Risk": {
  "PaymentContextCode": "PartyToParty"
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
		"ConsentId": "58923",
		"Status": "AwaitingAuthorisation",
		"CutOffDateTime": "2017-06-05T16:00:13+00:00",
		"CreationDateTime": "2017-06-05T15:15:13+00:00",
		"StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
		"Initiation": {},
		"ExchangeRateInformation": {
			"UnitCurrency": "GBP",
	 		"RateType": "Agreed",	
			"ExchangeRate": 1.09,
			"ContractIdentification": "/tbill/2018/T102993"
	 	}
	},
	"Risk": {
		"PaymentContextCode": "PartyToParty"

	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-payment-consents/58923"
	},
	"Meta": {}
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
  "Initiation": {
   "InstructionIdentification": "ACME412",
   "EndToEndIdentification": "FRESCO.21302.GFX.20",
   "InstructedAmount": {
    "Amount": "165.88",
    "Currency": "USD"
   },
   "CurrencyOfTransfer": "USD",
   "CreditorAccount": {
    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
    "Identification": "08080021325698",
    "Name": "ACME Inc",
    "SecondaryIdentification": "0002"
   },
   "RemittanceInformation": {
    "Reference": "FRESCO-101",
    "Unstructured": "Internal ops code 5120101"
   },
   "ExchangeRateInformation": {
    "UnitCurrency": "GBP",
    "RateType": "Actual"
   }
  }
 },
 "Risk": {
  "PaymentContextCode": "PartyToParty"
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
  "ConsentId": "58923",
  "Status": "AwaitingAuthorisation",
  "CutOffDateTime": "2017-06-05T16:00:13+00:00",
  "CreationDateTime": "2017-06-05T15:15:13+00:00",
  "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
  "Initiation": {
   "InstructionIdentification": "ACME412",
   "EndToEndIdentification": "FRESCO.21302.GFX.20",
   "InstructionPriority": "Normal",
   "CurrencyOfTransfer": "USD",
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
   },
   "ExchangeRateInformation": {
    "UnitCurrency": "GBP",
    "RateType": "Actual"
   }
  }
 },
 "Risk": {
  "PaymentContextCode": "PartyToParty"
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
  "Initiation": {
   "InstructionIdentification": "ACME412",
   "EndToEndIdentification": "FRESCO.21302.GFX.20",
   "ChargeBearer": "BorneByDebtor",
   "RemittanceInformation": {
    "Reference": "FRESCO-101",
    "Unstructured": "Internal ops code 5120101"
   },
	 "ExchangeRateInformation": {
		"UnitCurrency": "USD",
	 	"RateType": "Indicative"
	 }
  }
 },
 "Risk": {
  "PaymentContextCode": "PartyToParty"
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
		"ConsentId": "58923",
		"Status": "AwaitingAuthorisation",
		"CutOffDateTime": "2017-06-05T16:00:13+00:00",
		"CreationDateTime": "2017-06-05T15:15:13+00:00",
		"StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
		"Initiation": {},
    "Charges":[{
      "ChargeBearer": "BorneByDebtor",
      "Type":"UK.OBIE.MoneyTransferOut"
     }],
    "ExchangeRateInformation": {
			"UnitCurrency": "USD",
			"ExchangeRate": 0.9090,
			"RateType": "Indicative"
		}
	},
	"Risk": {
		"PaymentContextCode": "PartyToParty"

	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-payment-consents/58923"
	},
	"Meta": {}
}

```