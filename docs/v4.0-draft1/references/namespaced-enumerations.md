# Namespaced Enumerations - v4.0-draft1 <!-- omit in toc -->

- [Overview](#overview)
- [Basics](#basics)
  - [Design Principles](#design-principles)
  - [Release Management](#release-management)
- [Common Namespaced Enumerations](#common-namespaced-enumerations)
  - [OBInternalAccountIdentification4Code](#obinternalaccountidentification4code)
  - [OBInternalFinancialInstitutionIdentification4Code	](#obinternalfinancialinstitutionidentification4code)
  - [ExternalBalanceSubType1Code](#externalbalancesubtype1code)
- [Account and Transaction API Namespaced Enumerations](#account-and-transaction-api-namespaced-enumerations)
  - [OBExternalStatementAmountType1Code](#obexternalstatementamounttype1code)
  - [OBInternalStatementBenefitType1Code](#obinternalstatementbenefittype1code)
  - [OBExternalStatementDateTimeType1Code](#obexternalstatementdatetimetype1code)
  - [OBInternalStatementFeeType1Code](#obinternalstatementfeetype1code)
  - [OBInternalStatementInterestType1Code](#obinternalstatementinteresttype1code)
  - [OBExternalStatementRateType1Code](#obexternalstatementratetype1code)
  - [OBExternalStatementValueType1Code](#obexternalstatementvaluetype1code)
  - [OBInternalStatementFeeRateType1Code](#obinternalstatementfeeratetype1code)
  - [OBinternalStatementFeeFrequency1Code](#obinternalstatementfeefrequency1code)
  - [OBExternalStatementInterestRateType1Code](#obexternalstatementinterestratetype1code)
  - [OBExternalStatementInterestFrequency1Code](#obexternalstatementinterestfrequency1code)
  - [OBInternalLegalStructureType1Code](#obinternallegalstructuretype1code)
  - [OBInternalAccountRole1Code](#obinternalaccountrole1code)
  - [OBInternalSwitchStatusCode](#obinternalswitchstatuscode)
  - [OBInternalCardSchemeType1Code	](#obinternalcardschemetype1code)
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

The namespaced enumeration values specified by Open Banking are documented here and will be prefixed by `UK.OBIE.`

### Design Principles

When extending a namespaced enumeration:
* ASPSPs **must not** publish an ASPSP-specific enumerated value where a generic OBL defined enumerated value may be used.
* ASPSPs **must** place such values in a namespace consisting of their two-letter country code (ISO 3166-1 Alpha-2 code), followed by a full-stop, followed by their name. e.g.
  *  UK.Barclays.PingIt
  *  KE.Safaricom.M-Pesa

### Release Management

Usage of non-namespaced values may be discontinued in a future version of this standard.

As a special case and in order to minimise disruption between versions of the standard, a TPP **may** specify previous non-namespaces values, e.g. IBAN instead of UK.OBIE.IBAN.

In ASPSP generated responses, however, an ASPSP **must** always respond with fully namespaced values.

A comprehesnive list of enumerations, from both OBL and ISO 20022, have been catalogued and made available [here](https://github.com/OpenBankingUK/External_Internal_CodeSets).  ASPSPs and TPPs should reference this repository for an up-to-date list of enums and values.

## Common Namespaced Enumerations

The following namespaced enumerations are used across all the standards.

### OBInternalAccountIdentification4Code

This is Data Type for Account/SchemeName and used to identify the type of Identification used to identify an account.

| Code |Description |
| --- |--- |
| UK.OBIE.BBAN |Basic Bank Account Number (BBAN) - identifier used nationally by financial institutions, ie, in individual countries, generally as part of a National Account Numbering Scheme(s), to uniquely identify the account of a customer. |
| UK.OBIE.IBAN |An identifier used internationally by financial institutions to uniquely identify the account of a customer at a financial institution, as described in the latest edition of the international standard ISO 13616. "Banking and related financial services - International Bank Account Number (IBAN)". |
| UK.OBIE.PAN |Primary Account Number - identifier scheme used to identify a card account. |
| UK.OBIE.Paym |Paym Scheme to make payments via mobile |
| UK.OBIE.SortCodeAccountNumber |Sort Code and Account Number - identifier scheme used in the UK by financial institutions to identify the account of a customer. The identifier is the concatenation of the 6 digit UK sort code and 8 digit account number.<br>The regular expression for this identifier is: ^[0-9]{6}[0-9]{8}$ |
| UK.OBIE.Wallet |A primary and unique account identifier used to identify a wallet.<br>An ASPSP must document on their developer portal, the payment methods that supports this account identifier. |


### OBInternalFinancialInstitutionIdentification4Code

This is the Data Type for Agent/SchemeName and used to identify the type of Identification used to identify an agent.

| Code |Description |
| --- |--- |
| UK.OBIE.BICFI |Valid BICs for financial institutions are registered by the ISO 9362 Registration Authority in the BIC directory, and consist of eight (8) or eleven (11) contiguous characters. |
| UK.OBIE.NCC.[ISO3166-aplha2-CountryCode] | Valid NCC (National Clearing Code) as an option for the accounts that don't have an IBAN, registered in the country identified by the 2 letter ISO-3166 Country code. For example, transfer to India may have Scheme Name as UK.OBIE.NCC.IN and Identification can be the IFSC code of the bank/branch in India. |


### ExternalBalanceSubType1Code

Default if not specified is BaseCurrency of the account.

| Code |Description |
| --- |--- |
| UK.OBIE.BaseCurrency |Balance representing the amount in the base accounting currency. |
| UK.OBIE.LocalCurrency | Balance representing the amount in the local market currency for which the asset is held.  |

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

### OBInternalStatementBenefitType1Code

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

### OOBInternalStatementFeeType1Code

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

### OBInternalStatementInterestType1Code

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

### OBInternalStatementFeeRateType1Code

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.AER |The annual equivalent rate (AER) is interest that is calculated under the assumption that any interest paid is combined with the original balance and the next interest payment will be based on the slightly higher account balance. Overall, this means that interest can be compounded several times in a year depending on the number of times that interest payments are made. |
| UK.OBIE.EAR |EAR means Effective Annual Rate and/or Equivalent Annual Rate (frequently used interchangeably), being the actual annual interest rate of an Overdraft. |

</details>

### OBInternalStatementFeeFrequency1Code

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

### OBInternalLegalStructureType1Code

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

### OBInternalAccountRole1Code

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

### OBInternalSwitchStatusCode

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.CASS.NotSwitched |Indicator to show that the account has not been switched to another ASPSP |
| UK.CASS.SwitchCompleted |Indicator to show that the account has been switched and the switching process is complete |

</details>

### OBInternalCardSchemeType1Code	

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| UK.OBIE.Monthly |Monthly |
| UK.OBIE.Quarterly |Quarterly |
| UK.OBIE.HalfYearly |Half-yearly |
| UK.OBIE.Weekly |Weekly |
| UK.OBIE.Annual |Annual |
| UK.OBIE.Fortnightly |Fortnightly |
| UK.OBIE.Daily |Daily |
| UK.OBIE.NotKnown |Not Known |

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

The enumerated values specified by Open Banking align with the OBL Open Data Standard.

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
| UK.OBIE.PaymentInitiation.4.0 |This is specified when an array of payments, which are compliant with the OBL Initiation objects in the v4.0 standard, are staged in a .json file for the payment initiation. |

</details>

## Confirmation of Funds API Namespaced Enumerations

None

## Event Notification API Namespaced Enumerations

### OBEventType1Code

<details><summary>Show</summary>

This field is used to indicate the event types a TPP would like to subscribe to as part of the callback-urls payload.

| Code                                                 | Description                                                                                                          |
|------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| UK.OBIE.Resource-Update                              | An event that indicates a resource has been updated.                                                                 |
| UK.OBIE.Consent-Authorization-Revoked                | An event that indicates a consent resource has had its authorisation revoked. (left for backward compatibility)      |
| UK.OBIE.Consent-Access-Revoked                       | An event that indicates a consent has its underlying access revoked. The consent itself remains in authorised state. |
| UK.OBIE.Account-Access-Consent-Linked-Account-Update | An event that indicates an account linked to a consent has move in/out of scope of the consent.                      |

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


## Variable Recurring Payments Namespaced Enumerations

### OBVRPConsentType

<details><summary>Show</summary>

The types of payments that can be made under a VRP consent. This can be used to indicate whether this include sweeping payment or other ecommerce payments.

| Code |Description |
| --- |--- |
| UK.OBIE.VRPType.Sweeping | Limited to sweeping payments as per definition of sweeping in proposition paper |
| UK.OBIE.VRPType.Other | Variable recurring payment that does not meet definition of sweeping |

</details>

### OBVRPAuthenticationMethods

<details><summary>Show</summary>

Indicates a PSU authentication methods supported or used

| Code |Description |
| --- |--- |
| UK.OBIE.SCA | Authentication method where the consent is authorised through SCA. |
| UK.OBIE.SCANotRequired | This indicates that the PSU does not need to authenticate for individual payments and the payments can be made without the PSU being present. |

</details>

### OBVRPInteractionTypes

<details><summary>Show</summary>

| Code |Description |
| --- |--- |
| InSession | Indicates the customer is present for interaction type. |
| OffSession | Indicates the customer is not present for interaction type.|

Note: ASPSPs may define enumerations that are more appropriate and document in the Developer Portal.

</details>