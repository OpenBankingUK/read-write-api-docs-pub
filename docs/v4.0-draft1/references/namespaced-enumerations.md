# Namespaced Enumerations - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Basics](#basics)
  - [Design Principles](#design-principles)
  - [Release Management](#release-management)
- [Common Namespaced Enumerations](#common-namespaced-enumerations)
  - [OBExternalAccountIdentification4Code](#obexternalaccountidentification4code)
  - [OBExternalFinancialInstitutionIdentification4Code](#obexternalfinancialinstitutionidentification4code)
  - [OBExternalBalanceSubType1Code](#obexternalbalancesubtype1code)
- [Account and Transaction API Namespaced Enumerations](#account-and-transaction-api-namespaced-enumerations)
  - [OBExternalStatementAmountType1Code](#obexternalstatementamounttype1code)
  - [OBExternalStatementBenefitType1Code](#obexternalstatementbenefittype1code)
  - [OBExternalStatementDateTimeType1Code](#obexternalstatementdatetimetype1code)
  - [OBExternalStatementFeeType1Code](#obexternalstatementfeetype1code)
  - [OBExternalStatementInterestType1Code](#obexternalstatementinteresttype1code)
  - [OBExternalStatementRateType1Code](#obexternalstatementratetype1code)
  - [OBExternalStatementValueType1Code](#obexternalstatementvaluetype1code)
  - [OBExternalStatementFeeRateType1Code](#obexternalstatementfeeratetype1code)
  - [OBExternalStatementFeeFrequency1Code](#obexternalstatementfeefrequency1code)
  - [OBExternalStatementInterestRateType1Code](#obexternalstatementinterestratetype1code)
  - [OBExternalStatementInterestFrequency1Code](#obexternalstatementinterestfrequency1code)
  - [OBExternalLegalStructureType1Code](#obexternallegalstructuretype1code)
  - [OBExternalAccountRole1Code](#obexternalaccountrole1code)
  - [OBExternalSwitchStatusCode](#obexternalswitchstatuscode)
  - [OBExternalDirectDebitFrequency1Code](#obexternaldirectdebitfrequency1code)
- [Payment Initiation API Namespaced Enumerations](#payment-initiation-api-namespaced-enumerations)
  - [OBExternalLocalInstrument1Code](#obexternallocalinstrument1code)
  - [OBExternalPaymentChargeType1Code](#obexternalpaymentchargetype1code)
  - [OBExternalFileType1Code](#obexternalfiletype1code)
- [Confirmation of Funds API Namespaced Enumerations](#confirmation-of-funds-api-namespaced-enumerations)
- [Event Notification API Namespaced Enumerations](#event-notification-api-namespaced-enumerations)
  - [OBEventType1Code](#obeventtype1code)
  - [OBExternalEventConsentAuthorizationRevokedReason1Code](#obexternaleventconsentauthorizationrevokedreason1code)
  - [OBExternalEventAccountAccessConsentLinkedAccountUpdateReason1Code](#obexternaleventaccountaccessconsentlinkedaccountupdatereason1code)
- [Variable Recurring Payments Namespaced Enumerations](#variable-recurring-payments-namespaced-enumerations)
  - [OBVRPConsentType](#obvrpconsenttype)
  - [OBVRPAuthenticationMethods](#obvrpauthenticationmethods)
  - [OBVRPInteractionTypes](#OBVRPInteractionTypes)

## Overview

The specification defines certain fields with only a fixed set of possible values as enumerations, and further additions to possible values require a Specification change.

As part of Version 3 Open Banking Specifications defined new custom Data Types, which are an extendable list of enumerated values. Any extensions to this standard list of values can be done by the ASPSPs, with relevant documentation on their Developer Portals.

The extendable Data Type values are namespaced, to help identify the issuer of the value, and the relevant value.

## Basics

These Data Types, in general, are called namespaced enumerations.

Specific API Data Dictionary will define a custom Data Type class, which will help lookup the OBL defined standard set of namespaced enumerations in this specification page as well as respective swagger files.

The namespaced enumeration values specified by Open Banking are documented here and will be prefixed by `UK.OB.`

### Design Principles

When extending a namespaced enumeration:
* ASPSPs **must not** publish an ASPSP-specific enumerated value where a generic OBL defined enumerated value may be used.
* ASPSPs **must** place such values in a namespace consisting of their two-letter country code (ISO 3166-1 Alpha-2 code), followed by a full-stop, followed by their name. e.g.
  *  UK.Barclays.PingIt
  *  KE.Safaricom.M-Pesa

### Release Management

Usage of non-namespaced values may be discontinued in a future version of this standard.

As a special case and in order to minimise disruption between versions of the standard, a TPP **may** specify previous non-namespaces values, e.g. IBAN instead of UK.OB.IBAN.

In ASPSP generated responses, however, an ASPSP **must** always respond with fully namespaced values.

## Common Namespaced Enumerations

The following namespaced enumerations are used across all the standards.

### OBExternalAccountIdentification4Code

This is Data Type for Account/SchemeName and used to identify the type of Identification used to identify an account.

| Code |Description |
| --- |--- |
| UK.OB.BBAN |Basic Bank Account Number (BBAN) - identifier used nationally by financial institutions, ie, in individual countries, generally as part of a National Account Numbering Scheme(s), to uniquely identify the account of a customer. |
| UK.OB.IBAN |An identifier used internationally by financial institutions to uniquely identify the account of a customer at a financial institution, as described in the latest edition of the international standard ISO 13616. "Banking and related financial services - International Bank Account Number (IBAN)". |
| UK.OB.PAN |Primary Account Number - identifier scheme used to identify a card account. |
| UK.OB.Paym |Paym Scheme to make payments via mobile |
| UK.OB.SortCodeAccountNumber |Sort Code and Account Number - identifier scheme used in the UK by financial institutions to identify the account of a customer. The identifier is the concatenation of the 6 digit UK sort code and 8 digit account number.<br>The regular expression for this identifier is: ^[0-9]{6}[0-9]{8}$ |
| UK.OB.Wallet |A primary and unique account identifier used to identify a wallet.<br>An ASPSP must document on their developer portal, the payment methods that supports this account identifier. |


### OBExternalFinancialInstitutionIdentification4Code

This is the Data Type for Agent/SchemeName and used to identify the type of Identification used to identify an agent.

| Code |Description |
| --- |--- |
| UK.OB.BICFI |Valid BICs for financial institutions are registered by the ISO 9362 Registration Authority in the BIC directory, and consist of eight (8) or eleven (11) contiguous characters. |
| UK.OB.NCC.[ISO3166-aplha2-CountryCode] | Valid NCC (National Clearing Code) as an option for the accounts that don't have an IBAN, registered in the country identified by the 2 letter ISO-3166 Country code. For example, transfer to India may have Scheme Name as UK.OB.NCC.IN and Identification can be the IFSC code of the bank/branch in India. |


### OBExternalBalanceSubType1Code

Default if not specified is BaseCurrency of the account.

| Code |Description |
| --- |--- |
| UK.OB.BaseCurrency |Balance representing the amount in the base accounting currency. |
| UK.OB.LocalCurrency | Balance representing the amount in the local market currency for which the asset is held.  |

## Account and Transaction API Namespaced Enumerations

### OBExternalStatementAmountType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.ArrearsClosingBalance |The balance that is in arrears at the end of the statement period. |
| UK.OB.AvailableBalance |The available balance is the difference between the credit limit and the account balance – how much is available to spend. |
| UK.OB.AverageBalanceWhenInCredit |The average daily balance when the account is in credit during the statement period. |
| UK.OB.AverageBalanceWhenInDebit |The average daily balance when the account is in debit during the statement period. |
| UK.OB.AverageDailyBalance |The average daily balance during the statement period. An average daily balance adds the closing balances at the end of each day in a given period of time and divides the sum by the number of calendar days in that period. |
| UK.OB.BalanceTransferClosingBalance |The component of balance that relates to balance transfers at the end of the statement period. |
| UK.OB.CashClosingBalance |The component of balance that relates to cash at the end of the statement period. |
| UK.OB.ClosingBalance |The ending balance or closing balance at the end of the current statement period. |
| UK.OB.CreditLimit |The credit limit is the total amount of credit available to a borrower, including any amount already borrowed. |
| UK.OB.CurrentPayment |The total payments received since the last period. |
| UK.OB.DirectDebitPaymentDue |The total direct debit payments due for current statement period. |
| UK.OB.FSCSInsurance |The amount under which the FSCS scheme will protect consumers when authorised financial services firms fail. |
| UK.OB.MinimumPaymentDue |The minimum payment required for the current statement period. |
| UK.OB.PendingTransactionsBalance |The total pending transactions balance at the end of the statement period. |
| UK.OB.PreviousClosingBalance |The closing balance of the previous statement. |
| UK.OB.PreviousPayment |The previous payment amount in the last statement period. |
| UK.OB.PurchaseClosingBalance |The component of balance that relates to purchases at the end of the statement period. |
| UK.OB.StartingBalance |The new balance or starting balance carried forward since last statement period. |
| UK.OB.TotalAdjustments |Total adjustments to the account during the statement period. |
| UK.OB.TotalCashAdvances |A cash advance is a short-term loan from a bank or alternative lender. The term also refers to a service provided by many credit card issuers allowing cardholders to withdraw a certain amount of cash. |
| UK.OB.TotalCharges |The total charges including interest, late payment fee during the statement period. |
| UK.OB.TotalCredits |Total amount credited in the account during the statement period. |
| UK.OB.TotalDebits |Total amount debited (money taken out from account) from the account during the statement period. |
| UK.OB.TotalPurchases |The total transactions made during that statement period. |

</details>

### OBExternalStatementBenefitType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.Cashback |Cash back amount received during the statement period. |
| UK.OB.Insurance |Insurance amount during the statement period. |
| UK.OB.TravelDiscount |Travel discount amount received during the statement period. |
| UK.OB.TravelInsurance |Travel insurance amount during the statement period. |

</details>

### OBExternalStatementDateTimeType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.BalanceTransferPromoEnd |The date the balance transfer promo rate will end. |
| UK.OB.DirectDebitDue |The date that the direct debit payment is due for the current statement. |
| UK.OB.LastPayment |The date that an account holder must make the payment for the previous statement period. |
| UK.OB.LastStatement |The date on which the last statement was made available to account holder. |
| UK.OB.NextStatement |The date on which the next statement will be made available to account holder. |
| UK.OB.PaymentDue |The date that an account holder must make the payment for the current statement period. |
| UK.OB.PurchasePromoEnd |The date the purchase promo rate will end. |
| UK.OB.StatementAvailable |The date on which the current statement was made available to account holder. |

</details>

### OBExternalStatementFeeType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.Annual |Annual fees charged during the statement period. |
| UK.OB.BalanceTransfer |Balance transfer fees charged during the statement period. |
| UK.OB.CashAdvance |Cash advance fees charged during the statement period. |
| UK.OB.CashTransaction |Cash transaction fees charged during the statement period. |
| UK.OB.ForeignCashTransaction |Foreign cash transaction fees charged during the statement period. |
| UK.OB.ForeignTransaction |Foreign transaction fees charged during the statement period. |
| UK.OB.Gambling |Gambling transaction fees charged during the statement period. |
| UK.OB.LatePayment |Late payment fees charged during the statement period. |
| UK.OB.MoneyTransfer |Money transfer fees charged during the statement period. |
| UK.OB.Monthly |Monthly account fees charged during the statement period. |
| UK.OB.Overlimit |Over limit fees charged during the statement period.. |
| UK.OB.PostalOrder |Postal order fees charged during the statement period. |
| UK.OB.PrizeEntry |Prize entry fees charged during the statement period. |
| UK.OB.StatementCopy |Statement copy fees charged during the statement period. |
| UK.OB.Total |Total fees charges during the statement period. |

</details>

### OBExternalStatementInterestType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.BalanceTransfer |Interest on balance transfers. |
| UK.OB.Cash |Interest on cash advances. |
| UK.OB.EstimatedNext |The estimated interest that will be charged if the closing balance is not paid in full. |
| UK.OB.Purchase |Interest on purchases. |
| UK.OB.Total |Total interest charges during the statement period. |

</details>

### OBExternalStatementRateType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.AnnualBalanceTransfer |Annual interest rate charged on balance transfer from other service provider. |
| UK.OB.AnnualBalanceTransferAfterPromo |Annual interest rate charged on balance transfer from other service provider after promotional period. |
| UK.OB.AnnualBalanceTransferPromo |Annual interest rate charged on balance transfer from other service provider during promotional period. |
| UK.OB.AnnualCash |Annual interest rate charged on cash advance. |
| UK.OB.AnnualPurchase |Annual interest rate charged on purchases. |
| UK.OB.AnnualPurchaseAfterPromo |Annual interest rate charged on purchases from after promotional period. |
| UK.OB.AnnualPurchasePromo |Annual interest rate charged on purchases from during promotional period. |
| UK.OB.MonthlyBalanceTransfer |Monthly interest rate charged on balance transfer from other service provider. |
| UK.OB.MonthlyCash |Monthly interest rate charged on cash advance. |
| UK.OB.MonthlyPurchase |Monthly interest rate charged on purchases. |

</details>

### OBExternalStatementValueType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.AirMilesPoints |Air miles points at the end of the statement period. |
| UK.OB.AirMilesPointsBalance |Air miles points at the end of the statement period. |
| UK.OB.Credits |Total number of credits in statement period. |
| UK.OB.Debits |Total number of debits in statement period. |
| UK.OB.HotelPoints |Hotel points at the end of the statement period. |
| UK.OB.HotelPointsBalance |Hotel points at the end of the statement period. |
| UK.OB.RetailShoppingPoints |Retail shopping points at the end of the statement period. |
| UK.OB.RetailShoppingPointsBalance |Retail shopping points at the end of the statement period. |

</details>

### OBExternalStatementFeeRateType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.AER |The annual equivalent rate (AER) is interest that is calculated under the assumption that any interest paid is combined with the original balance and the next interest payment will be based on the slightly higher account balance. Overall, this means that interest can be compounded several times in a year depending on the number of times that interest payments are made. |
| UK.OB.EAR |EAR means Effective Annual Rate and/or Equivalent Annual Rate (frequently used interchangeably), being the actual annual interest rate of an Overdraft. |

</details>

### OBExternalStatementFeeFrequency1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.ChargingPeriod |This fee is triggered at the end of each charging period. |
| UK.OB.PerTransactionAmount |The amount stated is levied for each transaction processed. |
| UK.OB.PerTransactionPercentage |The fee amount is the given percentage of the transaction processed and is levied for each transaction. |
| UK.OB.StatementMonthly |This fee is triggered based on a monthly statement period. |
| UK.OB.Quarterly |This fee is triggered at the end of every quarter. |
| UK.OB.Weekly |The fee is triggered weekly. |

</details>

### OBExternalStatementInterestRateType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.BOEBaseRate |Interest rate shown is linked to the Bank of England Base Rate shown at http://www.bankofengland.co.uk/Pages/home.aspx. Typically defined as a % above the 'Current Bank Rate', but may also be below or equal to bank rate for certain Loan products. |
| UK.OB.FixedRate |Fixed rate. |
| UK.OB.Gross |Interest rate shown is before any tax deducted. |
| UK.OB.LoanProviderBaseRate |Loan provider base rate. |
| UK.OB.Net |Interest rate shown is after tax is deducted. |

</details>

### OBExternalStatementInterestFrequency1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.Daily |Calculated and/or applied daily. |
| UK.OB.HalfYearly |Calculated and/or applied half yearly. |
| UK.OB.Monthly |Calculated and/or applied monthly. |
| UK.OB.PerStatementDate |Calculated and/or applied on the statement date. |
| UK.OB.Quarterly |This fee is triggered at the end of every quarter. |
| UK.OB.Weekly |The fee is triggered weekly. |
| UK.OB.Yearly |Calculated and/or applied annually. |

</details>

### OBExternalLegalStructureType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.Individual |Individual |
| UK.OB.CIC |Community Interest Company |
| UK.OB.CIO |Charitable Incorporated Organisation |
| UK.OB.CoOp |Co-operative |
| UK.OB.Charity |Charity |
| UK.OB.GeneralPartnership |General Partnership |
| UK.OB.LimitedLiabilityPartnership |Limited Liability Partnership |
| UK.OB.ScottishLimitedPartnership |Scottish Limited Partnership |
| UK.OB.LimitedPartnership |Limited Partnership |
| UK.OB.PrivateLimitedCompany |Private Limited Company |
| UK.OB.PublicLimitedCompany |Public Limited Company |
| UK.OB.Sole |Sole (sole trader) |

</details>

### OBExternalAccountRole1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.Principal |Principal |
| UK.OB.SecondaryOwner |Secondary owner |
| UK.OB.Beneficiary |Beneficiary |
| UK.OB.PowerOfAttorney |Power of attorney |
| UK.OB.LegalGuardian |Legal guardian |
| UK.OB.CustodianForMinor |Custodian for minor |
| UK.OB.SuccessorOnDeath |Successor on death |
| UK.OB.Administrator |Administrator |
| UK.OB.OtherParty |Other party |
| UK.OB.Granter |Granter |
| UK.OB.Settlor |Settlor |
| UK.OB.SeniorManagingOfficial |Senior managing official |
| UK.OB.Protector |Protector |
| UK.OB.RegisteredShareholderName |Registered shareholder name |

</details>

### OBExternalSwitchStatusCode

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.CASS.NotSwitched |Indicator to show that the account has not been switched to another ASPSP |
| UK.CASS.SwitchCompleted |Indicator to show that the account has been switched and the switching process is complete |

</details>

### OBExternalDirectDebitFrequency1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.Monthly |Monthly |
| UK.OB.Quarterly |Quarterly |
| UK.OB.HalfYearly |Half-yearly |
| UK.OB.Weekly |Weekly |
| UK.OB.Annual |Annual |
| UK.OB.Fortnightly |Fortnightly |
| UK.OB.Daily |Daily |
| UK.OB.NotKnown |Not Known |

</details>


## Payment Initiation API Namespaced Enumerations

### OBExternalLocalInstrument1Code

<details><summary>Show</summary>

This field is used to indicate the ASPSP's payment service to be used for making a payment.

| Code |Description |
| --- |--- |
| UK.OB.BACS |Back Payment Scheme |
| UK.OB.CHAPS |CHAPS Payment Scheme |
| UK.OB.FPS |Faster Payment Scheme |
| UK.OB.SWIFT |Swift Payment Service |
| UK.OB.BalanceTransfer |To indicate Balance Transfer |
| UK.OB.MoneyTransfer |To Indicate Money Transfer |
| UK.OB.Paym |Paym Payment |
| UK.OB.Euro1 |To use Euro1 Payment System |
| UK.OB.SEPACreditTransfer |To indicate SEPA Credit Transfer payment service |
| UK.OB.SEPAInstantCreditTransfer |To indicate SEPA Instant Credit Transfer payment service |
| UK.OB.Link |To indicate Link payment service |
| UK.OB.Target2 |To indicate Target2 payment service |

</details>

### OBExternalPaymentChargeType1Code

<details><summary>Show</summary>

This field is used to indicate the type of fee/charge to be applied to the payment-order.

The enumerated values specified by Open Banking align with the OBL Open Data Standard.

This enumeration consists of a subset of the fees and charges identified in the Open Data Standard. The subset is limited to fees and charges associated with payments.

| Code |Description |
| --- |--- |
| UK.OB.CHAPSOut |CHAPS Payment Service fee |
| UK.OB.BalanceTransferOut |Balance Transfer Service fee |
| UK.OB.MoneyTransferOut |Money Transfer Service fee |

</details>

### OBExternalFileType1Code

<details><summary>Show</summary>

This field is used to indicate the file-type that is being submitted as part of a file-payment payload.

| Code |Description |
| --- |--- |
| UK.OB.pain.001.001.08 |This is specified when a fully compliant pain.001 XML file is staged for the payment initiation. |
| UK.OB.PaymentInitiation.4.0 |This is specified when an array of payments, which are compliant with the OBL Initiation objects in the v4.0 standard, are staged in a .json file for the payment initiation. |

</details>

## Confirmation of Funds API Namespaced Enumerations

None

## Event Notification API Namespaced Enumerations

### OBEventType1Code

<details><summary>Show</summary>

This field is used to indicate the event types a TPP would like to subscribe to as part of the callback-urls payload.

| Code                                                 | Description                                                                                                          |
|------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| UK.OB.Resource-Update                              | An event that indicates a resource has been updated.                                                                 |
| UK.OB.Consent-Authorization-Revoked                | An event that indicates a consent resource has had its authorisation revoked. (left for backward compatibility)      |
| UK.OB.Consent-Access-Revoked                       | An event that indicates a consent has its underlying access revoked. The consent itself remains in authorised state. |
| UK.OB.Account-Access-Consent-Linked-Account-Update | An event that indicates an account linked to a consent has move in/out of scope of the consent.                      |

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
| UK.OB.AccountClosure |An account is no longer associated with the consent as it has been closed. |
| UK.OB.CASS |An account is no longer associated with the consent as it has been switched (using the Current Account Switch Service) to another ASPSP. |

</details>


## Variable Recurring Payments Namespaced Enumerations

### OBVRPConsentType

<details><summary>Show</summary>

The types of payments that can be made under a VRP consent. This can be used to indicate whether this include sweeping payment or other ecommerce payments.

| Code |Description |
| --- |--- |
| UK.OB.VRPType.Sweeping | Limited to sweeping payments as per definition of sweeping in proposition paper |
| UK.OB.VRPType.Other | Variable recurring payment that does not meet definition of sweeping |

</details>

### OBVRPAuthenticationMethods

<details><summary>Show</summary>

Indicates a PSU authentication methods supported or used

| Code |Description |
| --- |--- |
| UK.OB.SCA | Authentication method where the consent is authorised through SCA. |
| UK.OB.SCANotRequired | This indicates that the PSU does not need to authenticate for individual payments and the payments can be made without the PSU being present. |

</details>

### OBVRPInteractionTypes

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OB.InSeason | Indicates the customer is present for interaction type. |
| UK.OB.OffSeason | Indicates the customer is not present for interaction type.|

Note: ASPSPs may define enumerations that are more appropriate and document in the Developer Portal.

</details>