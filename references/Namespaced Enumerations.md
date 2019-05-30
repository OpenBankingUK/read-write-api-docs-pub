# Namespaced Enumerations - v3.1.2

1. [Overview](#overview)
2. [Basics](#basics)
   1. [Design Principles](#design-principles)
   2. [Release Management](#release-management)
3. [Common Namespaced Enumerations](#common-namespaced-enumerations)
   1. [OBExternalAccountIdentification4Code](#obexternalaccountidentification4code)
   2. [OBExternalFinancialInstitutionIdentification4Code](#obexternalfinancialinstitutionidentification4code)
   3. [OBErrorResponseError1Code](#oberrorresponseerror1code)
4. [Account and Transaction API Namespaced Enumerations](#account-and-transaction-api-namespaced-enumerations)
   1. [OBExternalStatementAmountType1Code](#obexternalstatementamounttype1code)
   2. [OBExternalStatementBenefitType1Code](#obexternalstatementbenefittype1code)
   3. [OBExternalStatementDateTimeType1Code](#obexternalstatementdatetimetype1code)
   4. [OBExternalStatementFeeType1Code](#obexternalstatementfeetype1code)
   5. [OBExternalStatementInterestType1Code](#obexternalstatementinteresttype1code)
   6. [OBExternalStatementRateType1Code](#obexternalstatementratetype1code)
   7. [OBExternalStatementValueType1Code](#obexternalstatementvaluetype1code)
   8. [OBExternalStatementFeeRateType1Code](#obexternalstatementfeeratetype1code)
   9. [OBExternalStatementFeeFrequency1Code](#obexternalstatementfeefrequency1code)
   10. [OBExternalStatementInterestRateType1Code](#obexternalstatementinterestratetype1code)
   11. [OBExternalStatementInterestFrequency1Code](#obexternalstatementinterestfrequency1code)
   12. [OBExternalLegalStructureType1Code](#obexternallegalstructuretype1code)
   13. [OBExternalAccountRole1Code](#obexternalaccountrole1code)
5. [Payment Initiation API Namespaced Enumerations](#payment-initiation-api-namespaced-enumerations)
   1. [OBExternalLocalInstrument1Code](#obexternallocalinstrument1code)
   2. [OBExternalPaymentChargeType1Code](#obexternalpaymentchargetype1code)
   3. [OBExternalFileType1Code](#obexternalfiletype1code)
6. [Confirmation of Funds API Namespaced Enumerations](#confirmation-of-funds-api-namespaced-enumerations)
7. [Event Notification API Namespaced Enumerations](#event-notification-api-namespaced-enumerations)
   1. [OBEventType1Code](#obeventtype1code)
   2. [OBExternalEventConsentAuthorizationRevokedReason1Code](#obexternaleventconsentauthorizationrevokedreason1code)
   3. [OBExternalEventAccountAccessConsentLinkedAccountUpdateReason1Code](#obexternaleventaccountaccessconsentlinkedaccountupdatereason1code)

## Overview

The specification defines certain fields with only a fixed set of possible values as enumerations, and further additions to possible values require a Specification change.

As part of Version 3 OBIE Specifications defined new custom Data Types, which are an extendable list of enumerated values. Any extensions to this standard list of values can be done by the ASPSPs, with relevant documentation on their Developer Portals.

The extendable Data Type values are namespaced, to help identify the issuer of the value, and the relevant value.

## Basics

These Data Types, in general, are called namespaced enumerations.

Specific API Data Dictionary will define a custom Data Type class, which will help lookup the OBIE defined standard set of namespaced enumerations in this specification page as well as respective swagger files.

The namespaced enumeration values specified by Open Banking are documented here and will be prefixed by `UK.OBIE.`

### Design Principles

When extending a namespaced enumeration:
* ASPSPs **must not** publish an ASPSP-specific enumerated value where a generic OBIE defined enumerated value may be used.
* ASPSPs **must** place such values in a namespace consisting of their two-letter country code (ISO 3166-1 Alpha-2 code), followed by a full-stop, followed by their name. e.g.
  *  UK.Barclays.PingIt
  *  KE.Safaricom.M-Pesa

### Release Management

Usage of non-namespaced values may be discontinued in a future version of this standard. 

As a special case and in order to minimise disruption between versions of the standard, a TPP **may** specify previous non-namespaces values, e.g. IBAN instead of UK.OBIE.IBAN.

In ASPSP generated responses, however, an ASPSP **must** always respond with fully namespaced values.

## Common Namespaced Enumerations

The following namespaced enumerations are used across all the standards.

### OBExternalAccountIdentification4Code

This is Data Type for Account/SchemeName and used to identify the type of Identification used to identify an account.

| Code |Description |
| --- |--- |
| UK.OBIE.BBAN |Basic Bank Account Number (BBAN) - identifier used nationally by financial institutions, ie, in individual countries, generally as part of a National Account Numbering Scheme(s), to uniquely identify the account of a customer. |
| UK.OBIE.IBAN |An identifier used internationally by financial institutions to uniquely identify the account of a customer at a financial institution, as described in the latest edition of the international standard ISO 13616. "Banking and related financial services - International Bank Account Number (IBAN)". |
| UK.OBIE.PAN |Primary Account Number - identifier scheme used to identify a card account. |
| UK.OBIE.Paym |Paym Scheme to make payments via mobile |
| UK.OBIE.SortCodeAccountNumber |Sort Code and Account Number - identifier scheme used in the UK by financial institutions to identify the account of a customer. The identifier is the concatenation of the 6 digit UK sort code and 8 digit account number.<br>The regular expression for this identifier is: ^[0-9]{6}[0-9]{8}$ |


### OBExternalFinancialInstitutionIdentification4Code

This is the Data Type for Agent/SchemeName and used to identify the type of Identification used to identify an agent. 

| Code |Description |
| --- |--- |
| UK.OBIE.BICFI |Valid BICs for financial institutions are registered by the ISO 9362 Registration Authority in the BIC directory, and consist of eight (8) or eleven (11) contiguous characters. |


### OBErrorResponseError1Code

This is Data Type gives a low level textual error code to help categorise an error response. The applicable HTTP response code is also given.

<details><summary>Show</summary>

| Code |HTTP Status Category |Description |
| --- |--- |--- |
| UK.OBIE.Field.Expected |400 |For the scenario, when a field-value is not provided in the payload, that is expected in combination with preceding field-value pairs.<br><br>The corresponding path must be populated with the path of the unexpected field.<br><br>E.g.<br><br>ExchangeRate must be specified with Agreed RateType. ExchangeRate should be specified in the path element.<br><br>InstructionPriority must be specified with Agreed RateType. InstructionPriority should be specified in the path element. |
| UK.OBIE.Field.Invalid |400 |An invalid value is supplied in one of the fields. Reference of the invalid field should be provided in the path field, and the URL field may have the link to a website explaining the valid behaviour. The error message should describe the problem in detail. |
| UK.OBIE.Field.InvalidDate |400 |An invalid date is supplied e.g. when a future date is expected, a date in past or current date is supplied. The message can specify the actual problem with the date. The reference of the invalid field should be provided in the path field, and URL field may have the link to a website explaining the valid behaviour |
| UK.OBIE.Field.Missing |400 |A mandatory field, required for the API, is missing from the payload. This error code can be used, if it is not already captured under the validation for UK.OBIE.Resource.InvalidFormat.<br><br>Reference of the missing field should be provided in the path field, and URL field may have the link to a website explaining the valid behaviour |
| UK.OBIE.Field.Unexpected |400 |For the scenario, when a field-value is provided in the payload, that is not expected in combination with preceding field-value pairs. E.g.<br><br>ContractIdentification must not be specified with [Actual/Indicative] RateType.<br><br>ContractIdentification should be specified in the path element ExchangeRate must not be specified with [Actual/Indicative] RateType.<br><br>ExchangeRate should be specified in the path element.<br><br>InstructionPriority must not be specified with LocalInstrument. InstructionPriority should be specified in the path element. |
| UK.OBIE.Header.Invalid |400 |An invalid value is supplied in the HTTP header. The HTTP Header should be specified in the path element. |
| UK.OBIE.Header.Missing |400 |A required HTTP header has not been provided. The HTTP Header should be specified in the path element. |
| UK.OBIE.Resource.ConsentMismatch |400 |{payment-order-consent} and {payment-order} resource mismatch. For example, if an element in the resource’s Initiation or Risk section does not match the consent section. The path element should be populated with the field of the resource that does not match the consent. |
| UK.OBIE.Resource.InvalidConsentStatus |400 |The resource’s associated consent is not in a status that would allow the resource to be created, or a request to be executed.<br><br>E.g., if a consent resource had a status of AwaitingAuthorisation or Rejected, a resource could not be created against this consent.<br><br>The path element should be populated with the field in the consent resource that is invalid. |
| UK.OBIE.Resource.InvalidFormat |400 |When the Payload schema does not match to the endpoint, e.g., /domestic-payments endpoint is called with a JSON Payload, which cannot be parsed into a class such as OBWriteDomestic1 |
| UK.OBIE.Resource.NotFound |400 |Returned when a resource with the specified Id does not exist (and hence could not be operated upon). |
| UK.OBIE.Rules.AfterCutOffDateTime |400 |{payment-order} consent / resource received after CutOffDateTime |
| UK.OBIE.Rules.DuplicateReference |400 |A duplicate reference has been used for a CBPII confirmation of funds request. |
| UK.OBIE.Signature.Invalid |400 |The signature header x-jws-signature was parsed and has a valid JOSE header that complies with the specification. However, the signature itself could not be verified. |
| UK.OBIE.Signature.InvalidClaim |400 |The JOSE header in the x-jws-signature has one or more claims with an invalid value. (e.g. a kid that does not resolve to a valid certificate). The name of the missing claim should be specified in the path field of the error response. |
| UK.OBIE.Signature.MissingClaim |400 |The JOSE header in the x-jws-signature has one or more mandatory claim(s) that are not specified. The name of the missing claim(s) should be specified in the path field of the error response. |
| UK.OBIE.Signature.Malformed |400 |The x-jws-signature in the request header was malformed and could not be parsed as a valid JWS. |
| UK.OBIE.Signature.Missing |400 |The API request expected an x-jws-signature in the header, but it was missing. |
| UK.OBIE.Signature.Unexpected |400 |The API request was not expecting to receive an x-jws-signature in the header, but the TPP made a request that included an x-jws-signature. |
| UK.OBIE.Unsupported.AccountIdentifier |400 |The account identifier is unsupported for the given scheme.<br><br>The path element should be populated with the path of the AccountIdentifier. |
| UK.OBIE.Unsupported.AccountSecondaryIdentifier |400 |The account secondary identifier is unsupported for the given scheme.<br><br>The path element should be populated with the path of the AccountSecondaryIdentifier. |
| UK.OBIE.Unsupported.Currency |400 |The currency is not supported. Use UK.OBIE.Field.Invalid for invalid Currency.<br><br>The path element should be populated with the path of the Currency.<br><br>The URL should be populated with a link to ASPSP documentation listing out the supported currencies. |
| UK.OBIE.Unsupported.EventType |400 |Event Type is not supported.<br><br>The path element should be populated with the path of the EventType.<br><br>The URL should be populated with a link to ASPSP documentation listing out the supported Event Types. |
| UK.OBIE.Unsupported.Frequency |400 |Frequency is not supported.<br><br>The path element should be populated with the path of the Frequency.<br><br>The URL should be populated with a link to ASPSP documentation listing out the supported frequencies. |
| UK.OBIE.Unsupported.LocalInstrument |400 |LocalInstrument is not supported by the ASPSP.<br><br>The path element should be populated with the path of the LocalInstrument.<br><br>The URL should be populated with a link to ASPSP documentation listing out the supported local instruments. |
| UK.OBIE.Unsupported.Scheme |400 |Identification scheme is not supported. The path element should be populated with the path of the scheme. The URL should be populated with a link to ASPSP documentation listing out the supported schemes. |
| UK.OBIE.Reauthenticate |403 |The ASPSP must use this error code in Error Response to indicate that re-authentication by the PSU is required to process the request. |
| UK.OBIE.UnexpectedError |5xx |An error code that can be used, when an unexpected error occurs.<br><br>The ASPSP must populate the message with a meaningful error description, without revealing sensitive information. |

</details>

## Account and Transaction API Namespaced Enumerations 

### OBExternalStatementAmountType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.ArrearsClosingBalance |The balance that is in arrears at the end of the statement period. |
| UK.OBIE.AvailableBalance |The available balance is the difference between the credit limit and the account balance – how much is available to spend. |
| UK.OBIE.AverageBalanceWhenInCredit |The average daily balance when the account is in credit during the statement period. |
| UK.OBIE.AverageBalanceWhenInDebit |The average daily balance when the account is in debit during the statement period. |
| UK.OBIE.AverageDailyBalance |The average daily balance during the statement period. An average daily balance adds the closing balances at the end of each day in a given period of time and divides the sum by the number of calendar days in that period. |
| UK.OBIE.BalanceTransferClosingBalance |The component of balance that relates to balance transfers at the end of the statement period. |
| UK.OBIE.CashClosingBalance |The component of balance that relates to cash at the end of the statement period. |
| UK.OBIE.ClosingBalance |The ending balance or closing balance at the end of the current statement period. |
| UK.OBIE.CreditLimit |The credit limit is the total amount of credit available to a borrower, including any amount already borrowed. |
| UK.OBIE.CurrentPayment |The total payments received since the last period. |
| UK.OBIE.DirectDebitPaymentDue |The total direct debit payments due for current statement period. |
| UK.OBIE.FSCSInsurance |The amount under which the FSCS scheme will protect consumers when authorised financial services firms fail. |
| UK.OBIE.MinimumPaymentDue |The minimum payment required for the current statement period. |
| UK.OBIE.PendingTransactionsBalance |The total pending transactions balance at the end of the statement period. |
| UK.OBIE.PreviousClosingBalance |The closing balance of the previous statement. |
| UK.OBIE.PreviousPayment |The previous payment amount in the last statement period. |
| UK.OBIE.PurchaseClosingBalance |The component of balance that relates to purchases at the end of the statement period. |
| UK.OBIE.StartingBalance |The new balance or starting balance carried forward since last statement period. |
| UK.OBIE.TotalAdjustments |Total adjustments to the account during the statement period. |
| UK.OBIE.TotalCashAdvances |A cash advance is a short-term loan from a bank or alternative lender. The term also refers to a service provided by many credit card issuers allowing cardholders to withdraw a certain amount of cash. |
| UK.OBIE.TotalCharges |The total charges including interest, late payment fee during the statement period. |
| UK.OBIE.TotalCredits |Total amount credited in the account during the statement period. |
| UK.OBIE.TotalDebits |Total amount debited (money taken out from account) from the account during the statement period. |
| UK.OBIE.TotalPurchases |The total transactions made during that statement period. |

</details>

### OBExternalStatementBenefitType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.Cashback |Cash back amount received during the statement period. |
| UK.OBIE.Insurance |Insurance amount during the statement period. |
| UK.OBIE.TravelDiscount |Travel discount amount received during the statement period. |
| UK.OBIE.TravelInsurance |Travel insurance amount during the statement period. |

</details>

### OBExternalStatementDateTimeType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.BalanceTransferPromoEnd |The date the balance transfer promo rate will end. |
| UK.OBIE.DirectDebitDue |The date that the direct debit payment is due for the current statement. |
| UK.OBIE.LastPayment |The date that an account holder must make the payment for the previous statement period. |
| UK.OBIE.LastStatement |The date on which the last statement was made available to account holder. |
| UK.OBIE.NextStatement |The date on which the next statement will be made available to account holder. |
| UK.OBIE.PaymentDue |The date that an account holder must make the payment for the current statement period. |
| UK.OBIE.PurchasePromoEnd |The date the purchase promo rate will end. |
| UK.OBIE.StatementAvailable |The date on which the current statement was made available to account holder. |

</details>

### OBExternalStatementFeeType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.Annual |Annual fees charged during the statement period. |
| UK.OBIE.BalanceTransfer |Balance transfer fees charged during the statement period. |
| UK.OBIE.CashAdvance |Cash advance fees charged during the statement period. |
| UK.OBIE.CashTransaction |Cash transaction fees charged during the statement period. |
| UK.OBIE.ForeignCashTransaction |Foreign cash transaction fees charged during the statement period. |
| UK.OBIE.ForeignTransaction |Foreign transaction fees charged during the statement period. |
| UK.OBIE.Gambling |Gambling transaction fees charged during the statement period. |
| UK.OBIE.LatePayment |Late payment fees charged during the statement period. |
| UK.OBIE.MoneyTransfer |Money transfer fees charged during the statement period. |
| UK.OBIE.Monthly |Monthly account fees charged during the statement period. |
| UK.OBIE.Overlimit |Over limit fees charged during the statement period.. |
| UK.OBIE.PostalOrder |Postal order fees charged during the statement period. |
| UK.OBIE.PrizeEntry |Prize entry fees charged during the statement period. |
| UK.OBIE.StatementCopy |Statement copy fees charged during the statement period. |
| UK.OBIE.Total |Total fees charges during the statement period. |

</details>

### OBExternalStatementInterestType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.BalanceTransfer |Interest on balance transfers. |
| UK.OBIE.Cash |Interest on cash advances. |
| UK.OBIE.EstimatedNext |The estimated interest that will be charged if the closing balance is not paid in full. |
| UK.OBIE.Purchase |Interest on purchases. |
| UK.OBIE.Total |Total interest charges during the statement period. |

</details>

### OBExternalStatementRateType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.AnnualBalanceTransfer |Annual interest rate charged on balance transfer from other service provider. |
| UK.OBIE.AnnualBalanceTransferAfterPromo |Annual interest rate charged on balance transfer from other service provider after promotional period. |
| UK.OBIE.AnnualBalanceTransferPromo |Annual interest rate charged on balance transfer from other service provider during promotional period. |
| UK.OBIE.AnnualCash |Annual interest rate charged on cash advance. |
| UK.OBIE.AnnualPurchase |Annual interest rate charged on purchases. |
| UK.OBIE.AnnualPurchaseAfterPromo |Annual interest rate charged on purchases from after promotional period. |
| UK.OBIE.AnnualPurchasePromo |Annual interest rate charged on purchases from during promotional period. |
| UK.OBIE.MonthlyBalanceTransfer |Monthly interest rate charged on balance transfer from other service provider. |
| UK.OBIE.MonthlyCash |Monthly interest rate charged on cash advance. |
| UK.OBIE.MonthlyPurchase |Monthly interest rate charged on purchases. |

</details>

### OBExternalStatementValueType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.AirMilesPoints |Air miles points at the end of the statement period. |
| UK.OBIE.AirMilesPointsBalance |Air miles points at the end of the statement period. |
| UK.OBIE.Credits |Total number of credits in statement period. |
| UK.OBIE.Debits |Total number of debits in statement period. |
| UK.OBIE.HotelPoints |Hotel points at the end of the statement period. |
| UK.OBIE.HotelPointsBalance |Hotel points at the end of the statement period. |
| UK.OBIE.RetailShoppingPoints |Retail shopping points at the end of the statement period. |
| UK.OBIE.RetailShoppingPointsBalance |Retail shopping points at the end of the statement period. |

</details>

### OBExternalStatementFeeRateType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.AER |The annual equivalent rate (AER) is interest that is calculated under the assumption that any interest paid is combined with the original balance and the next interest payment will be based on the slightly higher account balance. Overall, this means that interest can be compounded several times in a year depending on the number of times that interest payments are made. |
| UK.OBIE.EAR |EAR means Effective Annual Rate and/or Equivalent Annual Rate (frequently used interchangeably), being the actual annual interest rate of an Overdraft. |

</details>

### OBExternalStatementFeeFrequency1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.ChargingPeriod |This fee is triggered at the end of each charging period. |
| UK.OBIE.PerTransactionAmount |The amount stated is levied for each transaction processed. |
| UK.OBIE.PerTransactionPercentage |The fee amount is the given percentage of the transaction processed and is levied for each transaction. |
| UK.OBIE.StatementMonthly |This fee is triggered based on a monthly statement period. |
| UK.OBIE.Quarterly |This fee is triggered at the end of every quarter. |
| UK.OBIE.Weekly |The fee is triggered weekly. |

</details>

### OBExternalStatementInterestRateType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.BOEBaseRate |Interest rate shown is linked to the Bank of England Base Rate shown at http://www.bankofengland.co.uk/Pages/home.aspx. Typically defined as a % above the 'Current Bank Rate', but may also be below or equal to bank rate for certain Loan products. |
| UK.OBIE.FixedRate |Fixed rate. |
| UK.OBIE.Gross |Interest rate shown is before any tax deducted. |
| UK.OBIE.LoanProviderBaseRate |Loan provider base rate. |
| UK.OBIE.Net |Interest rate shown is after tax is deducted. |

</details>

### OBExternalStatementInterestFrequency1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.Daily |Calculated and/or applied daily. |
| UK.OBIE.HalfYearly |Calculated and/or applied half yearly. |
| UK.OBIE.Monthly |Calculated and/or applied monthly. |
| UK.OBIE.PerStatementDate |Calculated and/or applied on the statement date. |
| UK.OBIE.Quarterly |This fee is triggered at the end of every quarter. |
| UK.OBIE.Weekly |The fee is triggered weekly. |
| UK.OBIE.Yearly |Calculated and/or applied annually. |

</details>

### OBExternalLegalStructureType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.Individual |Individual |
| UK.OBIE.CIC |Community Interest Company |
| UK.OBIE.CIO |Charitable Incorporated Organisation |
| UK.OBIE.CoOp |Co-operative |
| UK.OBIE.Charity |Charity |
| UK.OBIE.GeneralPartnership |General Partnership |
| UK.OBIE.LimitedLiabilityPartnership |Limited Liability Partnership |
| UK.OBIE.ScottishLimitedPartnership |Scottish Limited Partnership |
| UK.OBIE.LimitedPartnership |Limited Partnership |
| UK.OBIE.PrivateLimitedCompany |Private Limited Company |
| UK.OBIE.PublicLimitedCompany |Public Limited Company |
| UK.OBIE.Sole |Sole (sole trader) |

</details>

### OBExternalAccountRole1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.Principal |Principal |
| UK.OBIE.SecondaryOwner |Secondary owner |
| UK.OBIE.Beneficiary |Beneficiary |
| UK.OBIE.PowerOfAttorney |Power of attorney |
| UK.OBIE.LegalGuardian |Legal guardian |
| UK.OBIE.CustodianForMinor |Custodian for minor |
| UK.OBIE.SuccessorOnDeath |Successor on death |
| UK.OBIE.Administrator |Administrator |
| UK.OBIE.OtherParty |Other party |
| UK.OBIE.Granter |Granter |
| UK.OBIE.Settlor |Settlor |
| UK.OBIE.SeniorManagingOfficial |Senior managing official |
| UK.OBIE.Protector |Protector |
| UK.OBIE.RegisteredShareholderName |Registered shareholder name |

</details>

## Payment Initiation API Namespaced Enumerations

### OBExternalLocalInstrument1Code

<details><summary>Show</summary>

This field is used to indicate the ASPSP's payment service to be used for making a payment.

| Code |Description |
| --- |--- |
| UK.OBIE.BACS |Back Payment Scheme |
| UK.OBIE.CHAPS |CHAPS Payment Scheme |
| UK.OBIE.FPS |Faster Payment Scheme |
| UK.OBIE.SWIFT |Swift Payment Service |
| UK.OBIE.BalanceTransfer |To indicate Balance Transfer |
| UK.OBIE.MoneyTransfer |To Indicate Money Transfer |
| UK.OBIE.Paym |Paym Payment |
| UK.OBIE.Euro1 |To use Euro1 Payment System |
| UK.OBIE.SEPACreditTransfer |To indicate SEPA Credit Transfer payment service |
| UK.OBIE.SEPAInstantCreditTransfer |To indicate SEPA Instant Credit Transfer payment service |
| UK.OBIE.Link |To indicate Link payment service |
| UK.OBIE.Target2 |To indicate Target2 payment service |

</details>

### OBExternalPaymentChargeType1Code

<details><summary>Show</summary>

This field is used to indicate the type of fee/charge to be applied to the payment-order.

The enumerated values specified by Open Banking align with the OBIE Open Data Standard.

This enumeration consists of a subset of the fees and charges identified in the Open Data Standard. The subset is limited to fees and charges associated with payments.

| Code |Description |
| --- |--- |
| UK.OBIE.CHAPSOut |CHAPS Payment Service fee |
| UK.OBIE.BalanceTransferOut |Balance Transfer Service fee |
| UK.OBIE.MoneyTransferOut |Money Transfer Service fee |

</details>

### OBExternalFileType1Code

<details><summary>Show</summary>

This field is used to indicate the file-type that is being submitted as part of a file-payment payload. 

| Code |Description |
| --- |--- |
| UK.OBIE.pain.001.001.08 |This is specified when a fully compliant pain.001 XML file is staged for the payment initiation. |
| UK.OBIE.PaymentInitiation.4.0 |This is specified when an array of payments, which are compliant with the OBIE Initiation objects in the v4.0 standard, are staged in a .json file for the payment initiation. |

</details>

## Confirmation of Funds API Namespaced Enumerations

None

## Event Notification API Namespaced Enumerations

### OBEventType1Code

<details><summary>Show</summary>

This field is used to indicate the event types a TPP would like to subscribe to as part of the callback-urls payload.

| Code |Description |
| --- |--- |
| UK.OBIE.Resource-Update |An event that indicates a resource has been updated. |
| UK.OBIE.Consent-Authorization-Revoked |An event that indicates a consent resource has had its authorisation revoked. |
| UK.OBIE.Acount-Access-Consent-Linked-Account-Update |An event that indicates an account linked to a consent has move in/out of scope of the consent. |

</details>

### OBExternalEventConsentAuthorizationRevokedReason1Code

<details><summary>Show</summary>

This field is used to indicate the reason associated with a Consent Authorization Revoked event.

No UK.OBIE codes have been defined for this event.

</details>

### OBExternalEventAccountAccessConsentLinkedAccountUpdateReason1Code

<details><summary>Show</summary>

This field is used to indicate the reason associated with an Account Access Consent Linked Account Update event.

| Code |Description |
| --- |--- |
| UK.OBIE.AccountClosure |An account is no longer associated with the consent as it has been closed. |
| UK.OBIE.CASS |An account is no longer associated with the consent as it has been switched (using the Current Account Switch Service) to another ASPSP. |

</details>