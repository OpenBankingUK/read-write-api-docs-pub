# International Scheduled Payment Usage Examples - v3.1.2

1. [Credit amount specified; Future Dated Payment, ASPSP provides actual (guaranteed) FX rate , for limited time](#credit-amount-specified-future-dated-payment-aspsp-provides-actual-guaranteed-fx-rate--for-limited-time)
	1. [POST /international-scheduled-payment-consents](#post-international-scheduled-payment-consents)
		1. [Request](#request)
		2. [Response](#response)
2. [Credit amount specified; Future Dated Payment, ASPSP doesn't provide Indicative rate on payment order setup](#credit-amount-specified-future-dated-payment-aspsp-doesnt-provide-indicative-rate-on-payment-order-setup)
	1. [POST /international-scheduled-payment-consents](#post-international-scheduled-payment-consents-1)
		1. [Request](#request-1)
		2. [Response](#response-1)
3. [Confirm Funds on International Payment Order Consent](#confirm-funds-on-international-payment-order-consent)
	1. [GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation](#get-international-scheduled-payment-consentsconsentidfunds-confirmation)
		1. [Request](#request-2)
		2. [Response](#response-2)

## Credit amount specified; Future Dated Payment, ASPSP provides actual (guaranteed) FX rate , for limited time

The example below shows a Scheduled (future dated) payment with final credit amount specified and requesting an Actual rate to be applied.

**Actual rate will be applied on the date of Payment Order setup**, and transfer happens on the RequestedExecutionDateTime.

### POST /international-scheduled-payment-consents

#### Request

```
POST /international-scheduled-payment-consents HTTP/1.1
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
    "Permission":"Create",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "RequestedExecutionDate": "2018-08-06T00:00:00+00:00",
      "InstructedAmount": {
        "Amount": {
           "Amount": "165.88",
           "Currency": "USD"
         }
      },
      "CurrencyOfTransfer":"USD",
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
		"Permission": "Create",
		"ConsentId": "58923",
		"Status": "AwaitingAuthorisation",
		"CutOffDateTime": "2017-06-05T16:00:13+00:00",
		"CreationDateTime": "2017-06-05T15:15:13+00:00",
		"StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
		"Initiation": {
			"InstructionIdentification": "ACME412",
			"EndToEndIdentification": "FRESCO.21302.GFX.20",
            "RequestedExecutionDate": "2018-08-06T00:00:00+00:00",	     
			"InstructedAmount": {
		        "Amount": {
    		       "Amount": "165.88",
		           "Currency": "USD"
        		 }
		      },
			"CurrencyOfTransfer":"USD",
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
			"ExchangeRate": "1.10",
			"RateType": "Actual",
			"ExpirationDateTime": "2017-06-05T15:45:13+00:00"
		}
	},
	"Risk": {
		"PaymentContextCode": "PartyToParty"

	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-scheduled-payment-consents/58923"
	},
	"Meta": {}
}
```

## Credit amount specified; Future Dated Payment, ASPSP doesn't provide Indicative rate on payment order setup

The example below shows a Scheduled (future dated) payment with final credit amount specified and requesting an Indicative rate to be applied.

**Indicative rate will be applied on RequestedExecutionDateTime, as per the prevailing Indicative rate** . So No Exchange Rate information will be returned in the ASPSP response

### POST /international-scheduled-payment-consents

#### Request

```
POST /international-scheduled-payment-consents HTTP/1.1
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
    "Permission":"Create",
    "Initiation": {
      "InstructionIdentification": "ACME412",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "RequestedExecutionDate": "2018-08-06T00:00:00+00:00",
      "InstructedAmount": {
        "Amount": {
           "Amount": "165.88",
           "Currency": "USD"
         }
      },
      "CurrencyOfTransfer":"USD",
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
		"Permission": "Create",
		"ConsentId": "58923",
		"Status": "AwaitingAuthorisation",
		"CutOffDateTime": "2017-06-05T16:00:13+00:00",
		"CreationDateTime": "2017-06-05T15:15:13+00:00",
		"StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
		"Initiation": {
			"InstructionIdentification": "ACME412",
			"EndToEndIdentification": "FRESCO.21302.GFX.20",
            "RequestedExecutionDate": "2018-08-06T00:00:00+00:00",	     
			"InstructedAmount": {
		        "Amount": {
    		       "Amount": "165.88",
		           "Currency": "USD"
        		 }
		      },
			"CurrencyOfTransfer":"USD",
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

	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-scheduled-payment-consents/58923"
	},
	"Meta": {}
}
```

## Confirm Funds on International Payment Order Consent

### GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation

#### Request

```
GET /international-scheduled-payment-consents/58923/funds-confirmation HTTP/1.1
Authorization: Bearer Jhingapulaav
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
		"FundsAvailableResult": {
			"FundsAvailableDateTime": "2017-06-05T15:15:23+00:00",
			"FundsAvailable": true
		}
	},
	"Links": {
		"Self": "https://api.alphabank.com/open-banking/v3.1/pisp/international-scheduled-payment-consents/58923/funds-confirmation"
	},
	"Meta": {}
}
```