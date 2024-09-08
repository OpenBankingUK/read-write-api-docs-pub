# Transactions - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [GET /accounts/{AccountId}/transactions](#get-accountsaccountidtransactions)
  - [GET /transactions](#get-transactions)
- [Data Model](#data-model)
  - [Reused Classes](#reused-classes)
    - [OBProxy1](#obproxy1)
    - [OBPostalAddress7](#obpostaladdress7)
    - [OBUltimateCreditor1](#obultimatecreditor1)
    - [OBUltimateDebtor1](#obultimatedebtor1)
  - [Resource Definition](#resource-definition)
  - [UML Diagram](#uml-diagram)
    - [Notes](#notes)
  - [Filtering](#filtering)
    - [Filtering Examples](#filtering-examples)
  - [Mutability](#mutability)
    - [Examples to illustrate mutability](#examples-to-illustrate-mutability)
  - [Permission Codes](#permission-codes)
  - [Data Dictionary](#data-dictionary)
  - [Reused Classes](#reused-classes)
    - [OBUltimateCreditor1](#obultimatecreditor1)
    - [OBUltimateDebtor1](#obultimatedebtor1)
    - [OBPostalAddress7](#obpostaladdress7)
- [Usage Examples](#usage-examples)
  - [Specific Account](#specific-account)
    - [Get Account Transactions Request](#get-account-transactions-request)
    - [Get Account Transactions Response](#get-account-transactions-response)
  - [Bulk](#bulk)
    - [Get Transactions Request](#get-transactions-request)
    - [Get Transactions Response](#get-transactions-response)
  - [No Access](#no-access)
    - [GET Account Transactions Request](#get-account-transactions-request-1)
    - [GET Account Transactions Response](#get-account-transactions-response-1)

## Overview

The transactions resource is used by an AISP to retrieve the  transactions for a specific AccountId or to retrieve the transactions in bulk for account(s) that the PSU has authorised to access.

This resource description should be read in conjunction with a compatible Account Information Services API Profile.

## Endpoints

Endpoints for the resource - and available methods.

|  |Resource |HTTP Operation |Endpoint |Mandatory? |Scope |Grant Type |Idempotency Key |Parameters |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| 1 |transactions |GET |GET /accounts/{AccountId}/transactions |Mandatory |accounts |Authorization Code |No |Pagination Filtering | |OBReadTransaction6 |
| 2 |transactions |GET |GET /transactions |Optional |accounts |Authorization Code |No |Pagination Filtering | |OBReadTransaction6 |

### GET /accounts/{AccountId}/transactions

An AISP  **may**  retrieve the transaction resource for a specific AccountId (which is retrieved in the call to GET /accounts).

### GET /transactions

If an ASPSP has implemented the bulk retrieval endpoints, an AISP  **may**  optionally retrieve the transactions in bulk.
This will retrieve the resources for all authorised accounts linked to the account-request.

## Data Model

The OBReadTransaction6 object will be used for the call to:

* GET /accounts/{AccountId}/transactions
* GET /transactions
* GET /accounts/{AccountId}/statements/{StatementId}transactions

## Reused Classes

#### OBProxy1
The OBProxy1 class is defined in the [account-and-transaction-api-profile](../../profiles/account-and-transaction-api-profile.md#obproxy1) page.

#### OBPostalAddress7
The OBPostalAddress7 class is defined in the [account-and-transaction-api-profile](../../profiles/account-and-transaction-api-profile.md#obpostaladdress7) page.

#### OBUltimateCreditor1
The OBUltimateCreditor1 class is defined in the [account-and-transaction-api-profile](../../profiles/account-and-transaction-api-profile.md#obultimatecreditor1) page.

#### OBUltimateDebtor1
The OBUltimateDebtor1 class is defined in the [account-and-transaction-api-profile](../../profiles/account-and-transaction-api-profile.md#obultimatedebtor1) page.

### Resource Definition

A resource that describes a posting to an account that results in an increase or decrease to a balance.
For a specific date range, an account (AccountId) may have no transactions booked, or may have multiple transactions booked.

### UML Diagram

![ OBReadTransaction6 ](./images/OBReadTransaction6.svg )

#### Notes

* The use of the term "Transaction" has been made consistently in the Transaction endpoint payload (instead of "Entry" which is the ISO20022 element name).
* A DateTime element has been used instead of a complex choice element of Date and DateTime. Where time elements do not exist in ASPSP systems, the time portion of the DateTime element will be defaulted to 00:00:00+00:00.
* The BookingDateTime has been set to mandatory as all ASPSPs must provide this field for pagination and filtering. The BookingDateTime is the date the transaction is booked (or posted) and becomes immutable, which is not the date the transaction took place.
* For CreditCard transactions that are not yet booked, ASPSPs must populate the `BookingDateTime` field with an expected booking date.  
* Either the BankTransactionCode (which is the ISO transaction code list), **or** ProprietaryBankTransactionCode, **or** **both** may be populated. While the expectation is that at least one of BankTransactionCode. or ProprietaryBankTransactionCode are populated, we have decided not to enforce this behaviour in the payload structure as this would require nesting elements and introducing complex choice elements.
* The BankTransactionCode (ISO) code-list is documented on the ISO20022 website: [here](https://www.iso20022.org/external_code_list.page); and External Code Sets spreadsheet.
  * The ISO 20022 BankTransactionCode Code and SubCode are specified as 4 letter codes. 
* ASPSPs must have the ability to provide transactions through APIs for a period that at least equals the period provided through their online channels.
* ExtendedProprietaryBankTransactionCodes is a OB Proprietary field (introduced by TDA decision 264) to support multiple proprietry Bank Transaction Codes that may be associated with the transaction, in addition to a single default one. The expectation is to capture the default under ProprietaryBankTransactionCode. The ASPSP must publish all the proprietary and extended proprietary bank transaction codes along with usage on their developer portal.

### Filtering

Limited support for filtering is provided on the  **transactions**  resource.

| Name |Occurrence |Enhanced Definition |Class |
| --- |--- |--- |--- |
| fromBookingDateTime |0..1 |Specifies start date and time for filtering of the Transaction records on the Transaction/BookingDateTime field |ISODateTime |
| toBookingDateTime |0..1 |Specifies end date and time for filtering of the Transaction records on the Transaction/BookingDateTime field. |ISODateTime |

The ASPSP must treat the following as valid input:

* Non-working days (e.g. a Sunday or a Bank holiday) or any other days on which no transactions are recorded.
* Dates that fall outside the range for which transaction information is provided through APIs.
* Dates that fall outside the range for which a consent authorisation is available.
* Timezone may be included in the filter request, but must be ignored by the ASPSP.

In the above situations, the ASPSP must return data for the remaining valid period specified by the filter.

#### Filtering Examples

```
// All transactions from 1st Jan, 2015
GET /transactions?fromBookingDateTime=2015-01-01T00:00:00

// All transactions in 2016
GET /transactions?fromBookingDateTime=2016-01-01T00:00:00&amp;toBookingDateTime=2016-12-31T23:59:59

// All transactions in a specific account up to 31-Mar-2017
GET /accounts/1/transactions?toBookingDateTime=2017-03-31T23:59:59
```

### Mutability

Due to the way that ASPSPs and payment systems operate, some of the fields in a transaction may change for a short period of time before it settles into an eventual immutable state.

Prior to Version 3.1.5, there was no specific flag to indicate the mutability of a transaction record and TPPs inferred it from the `Status` field. As an "unstated" standard, a transaction with a status of `Pending` was considered to be mutable (ie some of its fields like date, description and amount may change or the transaction may be backed out completely) while a `Booked` transaction was considered to be immutable. There were however, some edge cases where a `Booked` transaction may suffer from changes to some fields.

Since Version 3.1.5, the mutability for a transaction has been made explicit:

* A transaction with a `Status` of `PDNG` is mutable
* A transaction with a `Status` of `BOOK` where the `TransactionMutability` flag is not specified is immutable.
* A transaction with a `Status` of `BOOK` with the `TransactionMutability` flag set to `Immutable` is immutable.
* A transaction with a `Status` of `BOOK` with the `TransactionMutability` flag set to `Mutable` is mutable.

#### Examples to illustrate mutability

```
// Mutable ( Status is PDNG )
{
  "Status": "PDNG",
  ...
}

// Immutable (Status is BOOK, TransactionMutability is not specified)
{
  "Status": "BOOK"
  ...
}

// Mutable
{
  "Status": "BOOK",
  "TransactionMutability": "Mutable"
}

// Immutable
{
  "Status": "BOOK",
  "TransactionMutability": "Immutable"
}
```

### Permission Codes

The resource differs depending on the permissions (ReadTransactionsBasic and ReadTransactionsDetail in addition to the appropriate ReadTransactionsCredits and/or ReadTransactionsDebits) used to access resource. In the event the resource is accessed with both ReadTransactionsBasic and ReadTransactionsDetail, the most detailed level (ReadTransactionsDetail) must be used.

* These objects **must not** be returned **without** the **ReadTransactionsDetail** permission:
  * OBReadTransaction6/Data/Transaction/TransactionInformation
  * OBReadTransaction6/Data/Transaction/Balance
  * OBReadTransaction6/Data/Transaction/MerchantDetails
  * OBReadTransaction6/Data/Transaction/CreditorAgent
  * OBReadTransaction6/Data/Transaction/CreditorAccount
  * OBReadTransaction6/Data/Transaction/UltimateCreditor
  * OBReadTransaction6/Data/Transaction/DebtorAgent
  * OBReadTransaction6/Data/Transaction/DebtorAccount
  * OBReadTransaction6/Data/Transaction/UltimateDebtor
* If the **ReadTransactionsDetail** is granted by the PSU:
  * OBReadTransaction6/Data/Transaction/TransactionInformation **may** be returned if applicable to the transaction and ASPSP (0..1)
  * OBReadTransaction6/Data/Transaction/Balance **may** be returned if applicable to the transaction and ASPSP (0..1)
  * OBReadTransaction6/Data/Transaction/MerchantDetails **may** be returned if applicable to the transaction and ASPSP (0..1)
  * OBReadTransaction6/Data/Transaction/CreditorAgent **may** be returned if applicable to the transaction and ASPSP (0..1)
  * OBReadTransaction6/Data/Transaction/CreditorAccount **may** be returned if applicable to the transaction and ASPSP (0..1)
  * OBReadTransaction6/Data/Transaction/UltimateCreditor **may** be returned if applicable to the transaction and ASPSP (0..1)
  * OBReadTransaction6/Data/Transaction/DebtorAgent **may** be returned if applicable to the transaction and ASPSP (0..1)
  * OBReadTransaction6/Data/Transaction/DebtorAccount **may** be returned if applicable to the transaction and ASPSP (0..1)
  * OBReadTransaction6/Data/Transaction/UltimateDebtor **may** be returned if applicable to the transaction and ASPSP (0..1)

* If the ReadPAN permission is granted by the PSU - the ASPSP may choose to populate the unmasked PAN - if the PAN is being populated in the response for these fields:

  * OBReadTransaction6/Data/Transaction/CreditorAccount/Identification
  * OBReadTransaction6/Data/Transaction/DebtorAccount/Identification
  * OBReadTransaction6/Data/Transaction/CardInstrument/Identification

* If the `ReadTransactionDebits` permission is granted by the PSU, the data returned should include debit transactions.
* If the `ReadTransactionCredits` permission is granted by the PSU, the data returned should include credit transactions.
* If the `ReadTransactionCredits` and `ReadTransactionDebits` permission is granted by the PSU, the data returned should include debit and credit transactions.



### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBReadTransaction6 | |OBReadTransaction6 | |OBReadTransaction6 | | |
| Data |1..1 |OBReadTransaction6/Data | |OBReadDataTransaction6 | | |
| Transaction |0..* |OBReadTransaction6/Data/Transaction |Provides further details on an entry in the report. |OBTransaction6 | | |
| AccountId |1..1 |OBReadTransaction6/Data/Transaction/AccountId |A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner. |Max40Text | | |
| TransactionId |0..1 |OBReadTransaction6/Data/Transaction/TransactionId |Unique identifier for the transaction within an servicing institution. This identifier is both unique and immutable. |Max210Text | | |
| TransactionReference |0..1 |OBReadTransaction6/Data/Transaction/TransactionReference |Unique reference for the transaction. This reference is optionally populated, and may as an example be the FPID in the Faster Payments context. |Max210Text | | |
| StatementReference |0..* |OBReadTransaction6/Data/Transaction/StatementReference |Unique reference for the statement. This reference may be optionally populated if available. |Max35Text | | |
| CreditDebitIndicator |1..1 |OBReadTransaction6/Data/Transaction/CreditDebitIndicator |Indicates whether the transaction is a credit or a debit entry. |For a full list of enumeration values refer to `External_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets). |OBInternalCreditDebitCode | |
| Status |1..1 |OBReadTransaction6/Data/Transaction/Status |Status of a transaction entry on the books of the account servicer. |For a full list of enumeration values refer to `External_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets) |ExternalEntryStatus1Code
| TransactionMutability |0..1 |OBReadTransaction6/Data/Transaction/TransactionMutability |Specifies the Mutability of the Transaction record. |For a full list of enumeration values refer to `Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets) |OBInternalTransactionMutability1Code
| BookingDateTime |1..1 |OBReadTransaction6/Data/Transaction/BookingDateTime |Date and time when a transaction entry is posted to an account on the account servicer's books. Usage: Booking date is the expected booking date, unless the status is booked, in which case it is the actual booking date. |ISODateTime | | |
| ValueDateTime |0..1 |OBReadTransaction6/Data/Transaction/ValueDateTime |Date and time at which assets become available to the account owner in case of a credit entry, or cease to be available to the account owner in case of a debit transaction entry. Usage: If transaction entry status is pending and value date is present, then the value date refers to an expected/requested value date. For transaction entries subject to availability/float and for which availability information is provided, the value date must not be used. In this case the availability component identifies the number of availability days. |ISODateTime | | |
| TransactionInformation |0..1 |OBReadTransaction6/Data/Transaction/TransactionInformation |Further details of the transaction. This is the transaction narrative, which is unstructured text. |Max500Text | | |
| AddressLine |0..1 |OBReadTransaction6/Data/Transaction/AddressLine |Information that locates and identifies a specific address for a transaction entry, that is presented in free format text. |Max70Text | | |
| Amount |1..1 |OBReadTransaction6/Data/Transaction/Amount |Amount of money in the cash transaction entry. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadTransaction6/Data/Transaction/Amount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadTransaction6/Data/Transaction/Amount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| ChargeAmount |0..1 |OBReadTransaction6/Data/Transaction/ChargeAmount |Transaction charges to be paid by the charge bearer. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadTransaction6/Data/Transaction/ChargeAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadTransaction6/Data/Transaction/ChargeAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| CurrencyExchange |0..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange |Set of elements used to provide details on the currency exchange. |OBCurrencyExchange5 | | |
| SourceCurrency |1..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange/SourceCurrency |Currency from which an amount is to be converted in a currency conversion. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| TargetCurrency |0..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange/TargetCurrency |Currency into which an amount is to be converted in a currency conversion. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| UnitCurrency |0..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange/UnitCurrency |Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| ExchangeRate |1..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange/ExchangeRate |Factor used to convert an amount from one currency into another. This reflects the price at which one currency was bought with another currency. Usage: ExchangeRate expresses the ratio between UnitCurrency and QuotedCurrency (ExchangeRate = UnitCurrency/QuotedCurrency). |BaseOneRate | | |
| ContractIdentification |0..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange/ContractIdentification |Unique identification to unambiguously identify the foreign exchange contract. |Max35Text | | |
| QuotationDate |0..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange/QuotationDate |Date and time at which an exchange rate is quoted. |ISODateTime | | |
| InstructedAmount |0..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadTransaction6/Data/Transaction/CurrencyExchange/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| BankTransactionCode |0..1 |OBReadTransaction6/Data/Transaction/BankTransactionCode |Set of elements used to fully identify the type of underlying transaction resulting in an entry. |OBBankTransactionCodeStructure1 | | |
| Code |1..1 |OBReadTransaction6/Data/Transaction/BankTransactionCode/Code |Specifies the family within a domain. For more information see `ExternalBankTransactionFamily1Code` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|ExternalBankTransactionFamily1Code | | |
| SubCode |1..1 |OBReadTransaction6/Data/Transaction/BankTransactionCode/SubCode |Specifies the sub-product family within a specific family. For more information see `ExternalBankTransactionSubFamily1Code` [here](https://github.com/OpenBankingUK/External_internal_CodeSets) |ExternalBankTransactionSubFamily1Code | | |
| ProprietaryBankTransactionCode |0..1 |OBReadTransaction6/Data/Transaction/ProprietaryBankTransactionCode |Set of elements to fully identify a proprietary bank transaction code. |ProprietaryBankTransactionCodeStructure1 | | |
| Code |1..1 |OBReadTransaction6/Data/Transaction/ProprietaryBankTransactionCode/Code |Proprietary bank transaction code to identify the underlying transaction. |Max35Text | | |
| Issuer |0..1 |OBReadTransaction6/Data/Transaction/ProprietaryBankTransactionCode/Issuer |Identification of the issuer of the proprietary bank transaction code. |Max35Text | | |
| ExtendedProprietaryBankTransactionCodes |0..* |OBReadTransaction6/Data/Transaction/ExtendedProprietaryBankTransactionCodes |Additional proprietary bank transaction codes used by the ASPSP for the underlying transaction. |OBExtendedProprietaryBankTransactionCode | | |
| Code |1..1 |OBReadTransaction6/Data/Transaction/ExtendedProprietaryBankTransactionCodes/Code |Proprietary bank transaction code to identify the underlying transaction.|Max35Text | | |
| Issuer |0..1 |OBReadTransaction6/Data/Transaction/ExtendedProprietaryBankTransactionCodes/Issuer | Identification of the issuer of the proprietary bank transaction code.|Max35Text | | |
| Description |0..1 |OBReadTransaction6/Data/Transaction/ExtendedProprietaryBankTransactionCodes/Description | Description of the code and its usage on the ASPSP channel|Max500Text | | |
| PaymentPurposeCode |0..1 |OBReadTransaction6/Data/Transaction/PaymentPurposeCode | Code related to the type of services or goods and corresponds to the underlying purpose of the transaction. | For a full list of enumeration values refer to `External_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)  |ExternalPurpose1Code | | |
| Balance |0..1 |OBReadTransaction6/Data/Transaction/Balance |Set of elements used to define the balance as a numerical representation of the net increases and decreases in an account after a transaction entry is applied to the account. |OBTransactionCashBalance | | |
| CreditDebitIndicator |1..1 |OBReadTransaction6/Data/Transaction/Balance/CreditDebitIndicator |Indicates whether the balance is a credit or a debit balance. Usage: A zero balance is considered to be a credit balance. |For a full list of enumeration values refer to `External_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets). |OBInternalCreditDebitCode | |
| Type |1..1 |OBReadTransaction6/Data/Transaction/Balance/Type |Balance type, in a coded form. For more information see `ExternalBalanceType1Code` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|ExternalBalanceType1Code |CLAV <br>CLBS <br> XPCH <br>FWAV  <br>INFO <br>ITAV  <br>ITBD <br>OPAV <br>OPBD <br>PRCD  | |
| Amount |1..1 |OBReadTransaction6/Data/Transaction/Balance/Amount |Amount of money of the cash balance after a transaction entry is applied to the account.. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBReadTransaction6/Data/Transaction/Balance/Amount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |`^\d{1,13}$|^\d{1,13}\.\d{1,5}$` |
| Currency |1..1 |OBReadTransaction6/Data/Transaction/Balance/Amount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| MerchantDetails |0..1 |OBReadTransaction6/Data/Transaction/MerchantDetails |Details of the merchant involved in the transaction. |OBMerchantDetails1 | | |
| MerchantName |0..1 |OBReadTransaction6/Data/Transaction/MerchantDetails/MerchantName |Name by which the merchant is known. |Max350Text | | |
| MerchantCategoryCode |0..1 |OBReadTransaction6/Data/Transaction/MerchantDetails/MerchantCategoryCode |Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction. |Min3Max4Text | | |
| CreditorAgent |0..1 |OBReadTransaction6/Data/Transaction/CreditorAgent |Financial institution servicing an account for the creditor. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBReadTransaction6/Data/Transaction/CreditorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |For a full list of enumeration values refer to `Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBInternalFinancialInstitutionIdentification4Code
| LEI |0..1 | OBReadTransaction6/Data/Transaction/CreditorAgent/LEI |Legal entity identification as an alternate identification for a party. Legal Entity Identifier is a code allocated to a party as described in ISO 17442 "Financial Services - Legal Entity Identifier (LEI)".|Max20Text | |[A-Z0-9]{18,18}[0-9]{2,2}|
| Identification |0..1 |OBReadTransaction6/Data/Transaction/CreditorAgent/Identification |Unique and unambiguous identification of a financial institution or a branch of a financial institution. |Max35Text | | |
| Name |0..1 |OBReadTransaction6/Data/Transaction/CreditorAgent/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| PostalAddress |0..1 |OBReadTransaction6/Data/Transaction/CreditorAgent/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress7 | | |
| CreditorAccount |0..1 |OBReadTransaction6/Data/Transaction/CreditorAccount |Unambiguous identification of the account of the creditor, in the case of a debit transaction. |OBCashAccount6 | | |
| SchemeName |0..1 |OBReadTransaction6/Data/Transaction/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |0..1 |OBReadTransaction6/Data/Transaction/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBReadTransaction6/Data/Transaction/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| Proxy |0..1 |OBReadTransaction6/Data/Transaction/CreditorAccount/Proxy |Specifies an alternate assumed name for the identification of the account.  |OBProxy1 | | |
| SecondaryIdentification |0..1 |OBReadTransaction6/Data/Transaction/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| UltimateCreditor |0..1 |OBReadTransaction6/Data/Transaction/UltimateCreditor|Ultimate party to which an amount of money is due. | OBUltimateCreditor1 | | |
| DebtorAgent |0..1 |OBReadTransaction6/Data/Transaction/DebtorAgent |Financial institution servicing an account for the debtor. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBReadTransaction6/Data/Transaction/DebtorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |For a full list of enumeration values refer to `Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_internal_CodeSets)|OBInternalFinancialInstitutionIdentification4Code
| LEI |0..1 | OBReadTransaction6/Data/Transaction/DebtorAgent/LEI |Legal entity identification as an alternate identification for a party. Legal Entity Identifier is a code allocated to a party as described in ISO 17442 "Financial Services - Legal Entity Identifier (LEI)".|Max20Text | |[A-Z0-9]{18,18}[0-9]{2,2}|
| Identification |0..1 |OBReadTransaction6/Data/Transaction/DebtorAgent/Identification |Unique and unambiguous identification of a financial institution or a branch of a financial institution. |Max35Text | | |
| Name |0..1 |OBReadTransaction6/Data/Transaction/DebtorAgent/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| PostalAddress |0..1 |OBReadTransaction6/Data/Transaction/DebtorAgent/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress7 | | |
| DebtorAccount |0..1 |OBReadTransaction6/Data/Transaction/DebtorAccount |Unambiguous identification of the account of the debtor, in the case of a credit transaction. |OBCashAccount6 | | |
| SchemeName |0..1 |OBReadTransaction6/Data/Transaction/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. | For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalAccountIdentification4Code | 
| Identification |0..1 |OBReadTransaction6/Data/Transaction/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBReadTransaction6/Data/Transaction/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max350Text | | |
| Proxy |0..1 |OBReadTransaction6/Data/Transaction/DebtorAccount/Proxy |Specifies an alternate assumed name for the identification of the account.  |OBProxy1 | | |
| SecondaryIdentification |0..1 |OBReadTransaction6/Data/Transaction/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| UltimateDebtor |0..1 |OBReadTransaction6/Data/Transaction/UltimateDebtor|Ultimate party that owes an amount of money to the (ultimate) creditor. | OBUltimateDebtor1| | |
| CardInstrument |0..1 |OBReadTransaction6/Data/Transaction/CardInstrument |Set of elements to describe the card instrument used in the transaction. |OBTransactionCardInstrument1 | | |
| CardSchemeName |1..1 |OBReadTransaction6/Data/Transaction/CardInstrument/CardSchemeName |Name of the card scheme. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalCardSchemeType1Code	 | |
| AuthorisationType |0..1 |OBReadTransaction6/Data/Transaction/CardInstrument/AuthorisationType |The card authorisation type. |For a full list of enumeration values refer to `OB_Internal_CodeSet` [here](https://github.com/OpenBankingUK/External_Internal_CodeSets). |OBInternalCardAuthorisationType1Code	 | |
| Name |0..1 |OBReadTransaction6/Data/Transaction/CardInstrument/Name |Name of the cardholder using the card instrument. |Max70Text | | |
| Identification |0..1 |OBReadTransaction6/Data/Transaction/CardInstrument/Identification |Identification assigned by an institution to identify the card instrument used in the transaction. This identification is known by the account owner, and may be masked. |Max34Text | | |
| SupplementaryData |0..1 |OBReadTransaction6/Data/Transaction/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |
| CategoryPurposeCode | 0..1 | OBReadTransaction6/Data/Transaction/CategoryPurposeCode |Enumeration to outline the purpose to the underlying purpose of the payment|  For a full list of enumeration values refer to `OB_EXternal_CodeSet`[here](https://github.com/OpenBankingUK/External_Internal_CodeSets/). |ExternalCategoryPurpose1Code | 


### Reused Classes 


#### OBUltimateCreditor1

The OBUltimateCreditor1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obultimatecreditor1) page.


#### OBUltimateDebtor1 

The OBUltimateDebtor1 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obultimatedebtor1) page.

#### OBPostalAddress7 

The OBPostalAddress7 class is defined in the [payment-initiation-api-profile](../../profiles/payment-initiation-api-profile.md#obpostaladdress7) page


## Usage Examples

### Specific Account

#### Get Account Transactions Request

```
GET /accounts/22289/transactions HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Account Transactions Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "Transaction": [
      {
        "AccountId": "22289",
        "TransactionId": "123",
        "TransactionReference": "Ref 1",
        "Amount": {
          "Amount": "10.00",
          "Currency": "GBP"
        },
        "ChargeAmount": {
          "Amount": "0.01",
          "Currency": "GBP"
        },
        "CurrencyExchange": {
          "SourceCurrency": "GBP", 
          "TargetCurrency": "GBP", 
          "UnitCurrency": "GBP"
        },
        "InstructedAmount": {
           "Amount": "10.00",
          "Currency": "GBP"
        },
        "PaymentPurposeCode":"RETL",
        "CategoryPurposeCode": "RETL",
        "MerchantDetails": {
          "MerchantName": "Merchant's Name",
          "MerchantCategoryCode": "5874"
        },
        "StatementReference": "003",
        "AddressLine": "Floor 5, 5 Dawson House",
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
        "DebtorAgent": {
         "LEI": "IZ9Q00LZEVUKWCQY8i14",
          "SchemeName": "UK.OBIE.BICFI",
          "Identification": "8020011234487",
          "Name": "The Debtor Agent", 
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
         "DebtorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "80200112345784",
          "Name": "Mr Juniper",
          "SecondaryIdentification": "80200112378745",
          "Proxy": {
            "Identification": "2360549017904577",
            "Code": "TELE"
          }
        },
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "80200112345678",
          "Name": "Mrs Juniper",
          "SecondaryIdentification": "80200112374165",
          "Proxy": {
            "Identification": "2360549017905188",
            "Code": "TELE"
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
        "CardInstrument": {
          "CardSchemeName": "	VISA", 
          "AuthorisationType": "Contactless",
          "Name": "Mr Juniper"
        },
        "CreditDebitIndicator": "Credit",
        "Status": "BOOK",
        "BookingDateTime": "2017-04-05T10:43:07+00:00",
        "ValueDateTime": "2017-04-05T10:45:22+00:00",
        "TransactionInformation": "Cash from Aubrey",
        "BankTransactionCode": {
          "Code": "ReceivedCreditTransfer",
          "SubCode": "DomesticCreditTransfer"
        },
        "ProprietaryBankTransactionCode": {
          "Code": "Transfer",
          "Issuer": "AlphaBank"
        },
        "ExtendedProprietaryBankTransactionCodes": [{
          "Code": "Transfer 2",
          "Issuer": "AlphaBank",
          "Description": "Local View"
          },
          {
          "Code": "Transfer 3",
          "Issuer": "AlphaBank",
          "Description": "SWIFT View"
          }
        ],
        "Balance": {
          "Amount": {
            "Amount": "230.00",
            "Currency": "GBP"
          },
          "CreditDebitIndicator": "Credit",
          "Type": "InterimBooked"
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/aisp/accounts/22289/transactions/"
  },
  "Meta": {
    "TotalPages": 1,
	"FirstAvailableDateTime": "2017-05-03T00:00:00+00:00",
	"LastAvailableDateTime": "2017-12-03T00:00:00+00:00"
  }
}
```

### Bulk

None of the transactions included in the payload are Ecommerce transactions, so MerchantDetails are not included in the examples.

#### Get Transactions Request

```
GET /transactions HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### Get Transactions Response

```
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```json
{
  "Data": {
    "Transaction": [
      {
        "AccountId": "22289",
        "TransactionId": "123",
        "TransactionReference": "Ref 123",
        "Amount": {
          "Amount": "10.00",
          "Currency": "GBP"
        },
         "ChargeAmount": {
          "Amount": "0.01",
          "Currency": "GBP"
        },
        "CreditDebitIndicator": "Credit",
        "Status": "BOOK",
        "BookingDateTime": "2017-04-05T10:43:07+00:00",
        "ValueDateTime": "2017-04-05T10:45:22+00:00",
        "TransactionInformation": "Cash from Aubrey",
        "BankTransactionCode": {
          "Code": "ReceivedCreditTransfer",
          "SubCode": "DomesticCreditTransfer"
        },
        "ProprietaryBankTransactionCode": {
          "Code": "Transfer",
          "Issuer": "AlphaBank"
        },
        "Balance": {
          "Amount": {
            "Amount": "230.00",
            "Currency": "GBP"
          },
          "CreditDebitIndicator": "Credit",
          "Type": "ITBD"
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
        "DebtorAgent": {
         "LEI": "IZ9Q00LZEVUKWCQY8i14",
          "SchemeName": "UK.OBIE.BICFI",
          "Identification": "8020011234487",
          "Name": "The Debtor Agent", 
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
        "ExtendedProprietaryBankTransactionCodes": [{
          "Code": "Transfer 2",
          "Issuer": "AlphaBank",
          "Description": "Local View"
          },
          {
          "Code": "Transfer 3",
          "Issuer": "AlphaBank",
          "Description": "SWIFT View"
          }
        ],
        "MerchantDetails": {
          "MerchantName": "Merchant's Name",
          "MerchantCategoryCode": "5874"
        },
         "DebtorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "80200112345784",
          "Name": "Mr Juniper",
          "SecondaryIdentification": "80200112378745",
          "Proxy": {
            "Identification": "2360549017904577",
            "Code": "TELE"
          }
        },
        "CreditorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "80200112345678",
          "Name": "Mrs Juniper",
          "SecondaryIdentification": "80200112374165",
          "Proxy": {
            "Identification": "2360549017905188",
            "Code": "TELE"
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
        "CardInstrument": {
          "CardSchemeName": "	VISA", 
          "AuthorisationType": "Contactless",
          "Name": "Mr Juniper"
        },
        "CurrencyExchange": {
          "SourceCurrency": "GBP", 
          "TargetCurrency": "GBP", 
          "UnitCurrency": "GBP"
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
        }
      },
      {
        "AccountId": "31820",
        "TransactionId": "567",
        "TransactionReference": "Ref 124",
        "Amount": {
          "Amount": "100.00",
          "Currency": "GBP"
        },
        "CreditDebitIndicator": "Debit",
        "Status": "BOOK",
        "BookingDateTime": "2017-05-02T14:22:09+00:00",
        "ValueDateTime": "2017-05-02T14:22:09+00:00",
        "TransactionInformation": "Paid the gas bill",
        "AddressLine": "Coventry",
        "BankTransactionCode": {
          "Code": "IssuedCreditTransfer",
          "SubCode": "AutomaticTransfer"
        },
        "ProprietaryBankTransactionCode": {
          "Code": "DirectDebit",
          "Issuer": "AlphaBank"
        },
        "Balance": {
          "Amount": {
            "Amount": "57.36",
            "Currency": "GBP"
          },
          "CreditDebitIndicator": "Debit",
          "Type": "InterimBooked"
        },
        "ExtendedProprietaryBankTransactionCodes": [{
          "Code": "Transfer 2",
          "Issuer": "AlphaBank",
          "Description": "Local View"
          },
          {
          "Code": "Transfer 3",
          "Issuer": "AlphaBank",
          "Description": "SWIFT View"
          }
        ],
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
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v4.0/aisp/transactions"
  },
  "Meta": {
    "TotalPages": 1,
	"FirstAvailableDateTime": "2017-05-03T00:00:00+00:00",
	"LastAvailableDateTime": "2017-12-03T00:00:00+00:00"
  }
}
```

### No Access

In this example, the AISP  **does not**  have access to call the transactions endpoint. This will result in a 403 error.

#### GET Account Transactions Request

```
GET /accounts/22289/transactions HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### GET Account Transactions Response

```
HTTP/1.1 403 Forbidden
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
```
