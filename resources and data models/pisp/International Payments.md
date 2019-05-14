# International Payments <!-- omit in toc -->

1. [Overview](#overview)
   1. [Profile Compatibility](#profile-compatibility)
2. [Endpoints](#endpoints)
   1. [POST /international-payment-consents](#post-international-payment-consents)
      1. [Status](#status)
3. [GET /international-payment-consents/{ConsentId}](#get-international-payment-consentsconsentid)
      1. [Status](#status-1)
   1. [GET /international-payment-consents/{ConsentId}/funds-confirmation](#get-international-payment-consentsconsentidfunds-confirmation)
   2. [POST /international-payments](#post-international-payments)
      1. [Status](#status-2)
   3. [GET /international-payments/{InternationalPaymentId}](#get-international-paymentsinternationalpaymentid)
      1. [Status](#status-3)
   4. [GET /international-payments/{InternationalPaymentId}/payment-details](#get-international-paymentsinternationalpaymentidpayment-details)
      1. [Status](#status-4)
   5. [State Model](#state-model)
      1. [Payment Order Consent](#payment-order-consent)
      2. [Payment Order](#payment-order)
         1. [Multiple Authorisation](#multiple-authorisation)
4. [Data Model](#data-model)
   1. [Reused Classes](#reused-classes)
      1. [OBInternational2](#obinternational2)
         1. [UML Diagram](#uml-diagram)
         2. [Notes](#notes)
         3. [Data Dictionary](#data-dictionary)
      2. [OBExchangeRate2](#obexchangerate2)
         1. [Data Dictionary](#data-dictionary-1)
   2. [International Payment Consent - Request](#international-payment-consent---request)
      1. [UML Diagram](#uml-diagram-1)
      2. [Notes](#notes-1)
      3. [Data Dictionary](#data-dictionary-2)
   3. [International Payment Consent - Response](#international-payment-consent---response)
      1. [UML Diagram](#uml-diagram-2)
      2. [Notes](#notes-2)
      3. [Data Dictionary](#data-dictionary-3)
   4. [International Payment Consent Confirmation of Funds - Response](#international-payment-consent-confirmation-of-funds---response)
      1. [UML Diagram](#uml-diagram-3)
      2. [Notes](#notes-3)
      3. [Data Dictionary](#data-dictionary-4)
   5. [International Payment - Request](#international-payment---request)
      1. [UML Diagram](#uml-diagram-4)
      2. [Notes](#notes-4)
      3. [Data Dictionary](#data-dictionary-5)
   6. [International Payment - Response](#international-payment---response)
      1. [UML Diagram](#uml-diagram-5)
      2. [Notes](#notes-5)
      3. [Data Dictionary](#data-dictionary-6)
   7. [International Payment Order - Payment Details - Response](#international-payment-order---payment-details---response)
      1. [UML Diagram](#uml-diagram-6)
      2. [Data Dictionary](#data-dictionary-7)
5. [Usage Examples](#usage-examples)
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

## Overview

The International Payments resources (international-payment-consents and international-payments) are used by a PISP to initiate an International Payment.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

### Profile Compatibility

For a list of profiles compatible with this resource, please see the [Compatibility Matrix]().

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| international-payment-consents |POST |POST /international-payment-consents |Conditional |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteInternationalConsent3 |OBWriteInternationalConsentResponse3 |
| international-payment-consents |GET |GET /international-payment-consents/{ConsentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteInternationalConsentResponse3 |
| international-payment-consents |GET |GET /international-payment-consents/{ConsentId}/funds-confirmation |Mandatory (if resource POST implemented) |payments |Authorization Code |Signed Response |No |NA |OBWriteFundsConfirmationResponse1 |
| international-payments |POST |POST /international-payments |Conditional |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteInternational2 |OBWriteInternationalResponse3 |
| international-payments |GET |GET /international-payments/{InternationalPaymentId} |Mandatory (if resource POST implemented) |payments |Client Credentials |Signed Response |No |NA |OBWriteInternationalResponse3 |
| payment-details |GET |GET /international-payments/{InternationalPaymentId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

### POST /international-payment-consents 

The API endpoint allows the PISP to ask an ASPSP to create a new **international-payment-consent** resource.

* The POST action indicates to the ASPSP that a payment consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **international-payment-consent** resource and responds with a unique ConsentId to refer to the resource.

#### Status

The default Status is "AwaitingAuthorisation" immediately after the international-payment-consent has been created.

| Status |
| --- |
| AwaitingAuthorisation |

## GET /international-payment-consents/{ConsentId}

A PISP can optionally retrieve a payment consent resource that they have created to check its status. 

#### Status

Once the PSU authorises the payment-consent resource, the Status of the payment-consent resource will be updated with "Authorised".

If the PSU rejects the consent or the international-payment-consent has failed some other ASPSP validation, the Status will be set to "Rejected".

Once an international-payment has been successfully created using the international-payment-consent, the Status of the international-payment-consent will be set to "Consumed".

The available Status codes for the international-payment-consent resource are:

| Status |
| --- |
| AwaitingAuthorisation |
| Rejected |
| Authorised |
| Consumed |

### GET /international-payment-consents/{ConsentId}/funds-confirmation

The API endpoint allows the PISP to ask an ASPSP to confirm funds on an **international-payment-consent** resource.

* An ASPSP can only respond to a funds confirmation request if the **international-payment-consent** resource has an `Authorised` status. If the status is not `Authorised`, an ASPSP **must** respond with a 400 (Bad Request) and a `UK.OBIE.Resource.InvalidConsentStatus` error code.
* Confirmation of funds requests do not affect the status of the **international-payment-consent** resource.

### POST /international-payments

Once the international-payment-consent has been authorised by the PSU, the PISP can proceed to submit the international-payment for processing:

* This is done by making a POST request to the **international-payments** endpoint.
* This request is an instruction to the ASPSP to begin the international single immediate payment journey. The international payment must be submitted immediately, however, there are some scenarios where the international payment may not be executed immediately (e.g. busy periods at the ASPSP).
* The PISP **must** ensure that the Initiation and Risk sections of the international-payment match the corresponding Initiation and Risk sections of the international-payment-consent resource. If the two do not match, the ASPSP **must not** process the request and **must** respond with a 400 (Bad Request).
* Any operations on the international-payment resource will not result in a Status change for the international-payment resource.

#### Status

An international-payment can only be created if its corresponding international-payment-consent resource has the status of "Authorised". 

The international-payment resource that is created successfully must have one of the following PaymentStatusCode code-set enumerations:

| Status |
| --- |
| Pending |
| Rejected |
| AcceptedSettlementInProcess |
| AcceptedSettlementCompleted |
| AcceptedWithoutPosting |
| AcceptedCreditSettlementCompleted |

### GET /international-payments/{InternationalPaymentId}

A PISP can retrieve the international-payment to check its status.

#### Status

The international-payment resource must have one of the following PaymentStatusCode code-set enumerations:

| Status |
| --- |
| Pending |
| Rejected |
| AcceptedSettlementInProcess |
| AcceptedSettlementCompleted|
| AcceptedWithoutPosting |
| AcceptedCreditSettlementCompleted |

### GET /international-payments/{InternationalPaymentId}/payment-details

A PISP can retrieve the Details of the underlying payment transaction via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

#### Status

The international-payments - payment-details must have one of the following PaymentStatusCode code-set enumerations:

| Status |
| ------ |
| Accepted |
| AcceptedCancellationRequest |
| AcceptedTechnicalValidation |
| AcceptedCustomerProfile |
| AcceptedFundsChecked |
| AcceptedWithChange |
| Pending |
| Rejected |
| AcceptedSettlementInProcess |
| AcceptedSettlementCompleted |
| AcceptedWithoutPosting |
| AcceptedCreditSettlementCompleted |
| Cancelled |
| NoCancellationProcess |
| PartiallyAcceptedCancellationRequest |
| PartiallyAcceptedTechnicalCorrect |
| PaymentCancelled |
| PendingCancellationRequest |
| Received |
| RejectedCancellationRequest |

### State Model

#### Payment Order Consent

The state model for the international-payment-consent resource follows the generic consent state model. However, does not use the "Revoked" status, as the consent for an international-payment is not a long-lived consent.

![Payment Order Consent State Model](images/image2018-5-18_10-24-21.png)

The definitions for the Status:

| | Status | Status Description |
| --- |------ |------------------ |
| 1 |AwaitingAuthorisation |The consent resource is awaiting PSU authorisation. |
| 2 |Rejected |The consent resource has been rejected. |
| 3 |Authorised |The consent resource has been successfully authorised. |
| 4 |Consumed |The consented action has been successfully completed. This does not reflect the status of the consented action. |

#### Payment Order

The state model for the international-payment resource follows the behaviour and definitions for the ISO 20022 PaymentStatusCode code-set.

![Payment Order Status Lifecycle](images/PaymentStatusLifeCycle.png)

The definitions for the Status:

| |Status |Payment Status Description |
| --- |------ |-------------------------- |
| 1 |Pending |Payment initiation or individual transaction included in the payment initiation is pending. Further checks and status update will be performed. |
| 2 |Rejected |Payment initiation or individual transaction included in the payment initiation has been rejected. |
| 3 |AcceptedSettlementInProcess |All preceding checks such as technical validation and customer profile were successful and therefore the payment initiation has been accepted for execution. |
| 4 |AcceptedSettlementCompleted |Settlement on the debtor's account has been completed. |
| 5 |AcceptedWithoutPosting |Payment instruction included in the credit transfer is accepted without being posted to the creditor customer’s account. |
| 6 |AcceptedCreditSettlementCompleted |Settlement on the creditor's account has been completed. |

##### Multiple Authorisation

If the payment-order requires multiple authorisations, the Status of the multiple authorisations will be updated in the MultiAuthorisation object.

![Multiple Authorisation Statss](images/image2018-6-29_16-36-34.png)

The definitions for the Status:

| |Status |Status Description |
| --- |------ |------------------ |
| 1 |AwaitingFurtherAuthorisation |The payment-order resource is awaiting further authorisation. |
| 2 |Rejected |The payment-order resource has been rejected by an authoriser. |
| 3 |Authorised |The payment-order resource has been successfully authorised by all required authorisers. |

## Data Model

The data dictionary section gives the detail on the payload content for the International Payment API flows.

### Reused Classes

#### OBInternational2

This section describes the OBInternational2 class which is reused as the Initiation object in the international-payment-consent and international-payment resources.

##### UML Diagram

![OB International Reusable class](images/OBInternational2.gif)

##### Notes

For the OBInternational2 Initiation object: 

* All elements in the Initiation payload that are specified by the PISP, must not be changed via the ASPSP as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the international-payment-consent request immediately.
* If the ASPSP establishes a problem with the international-payment-consent after the API call, the ASPSP must set the Status of the international-payment-consent resource to Rejected.
* DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the international-payment-consent will be set to Rejected after PSU authentication.
* CreditorAgent must at least have either of the pairs provided: Scheme Name and Identification or Name and Postal Address.
* Account Identification field usage:
  * Where "UK.OBIE.SortCodeAccountNumber" is specified as the SchemeName in the Account Identification Section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * Where the "UK.OBIE.IBAN" is specified as the SchemeName in the Account Identification Section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the full IBAN.
* LocalInstrument is the requested payment scheme for execution. This is a free-text field.
* InstructionPrioirty may be used by the ASPSP to determine the payment scheme for execution.
* The InstructedAmount object must be populated with the desired Amount and Currency of transfer, regardless of the currency of the DebtorAccount or CreditorAccount. I.e., a PSU may wish to transfer 100EUR from a GBP DebtorAccount (InstructedAmount will be 100EUR), or 100GBP to an EUR CreditorAccount (the InstructedAmount will be 100GBP).
* The CurrencyOfTransfer is used to specify the currency the funds will be transferred. I.e., a PSU may wish to transfer 100USD from a GBP DebtorAccount to a Rupee INR CreditorAccount in India.
* The ChargeBearer field is used by the PISP to indicate the bearer of charges. An ASPSP must reject the request if the requested charge allocation cannot be fulfilled.

The OBInternational2/ExchangeRateInformation object must conform to these behaviours:

* A PISP must specify the DebtorAccount currency in the UnitCurrency field if the PISP is requesting a specific RateType so the ASPSP can respond with an exchange rate quote prior to PSU authorisation.
* A PISP may indicate an exchange rate request using the RateType with these enumerations: 
  * Actual.
  * Agreed.
  * Indicative.
* A PISP must specify ExchangeRate and ContractIdentification when requesting an **Agreed** RateType. If an invalid ContractIdentification and ExchangeRate are requested together, an ASPSP must reject the request.
  * For an "Agreed" RateType a requested exchange rate is populated in the ExchangeRate field, against the UnitCurrency. I.e, if the UnitCurrency is GBP and CurrencyOfTransfer is USD, then ExchangeRate will be 1.34 (USD to 1 GBP).
  * For an "Agreed" RateType the exchange rate contract identifier is populated in the ContractIdentification field.
* A PISP must not specify ExchangeRate and/or ContractIdentification when requesting an **Actual** RateType.
* A PISP must not specify ExchangeRate and/or ContractIdentification when requesting an **Indicative** RateType.

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBInternational2 | |OBInternational2 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single international payment. |OBInternational2 | | |
| InstructionIdentification |1..1 |OBInternational2/InstructionIdentification |Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction. |Max35Text | | |
| EndToEndIdentification |1..1 |OBInternational2/EndToEndIdentification |Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field. |Max35Text | | |
| LocalInstrument |0..1 |OBInternational2/LocalInstrument |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code | | |
| InstructionPriority |0..1 |OBInternational2/InstructionPriority |Indicator of the urgency or order of importance that the instructing party would like the instructed party to apply to the processing of the instruction. |OBPriority2Code |Normal Urgent | |
| Purpose |0..1 |OBInternational2/Purpose |Specifies the external purpose code in the format of character string with a maximum length of 4 characters. The list of valid codes is an external code list published separately. External code sets can be downloaded from www.iso20022.org. |OBExternalPurpose1Code1 | | |
| ChargeBearer |0..1 |OBInternational2/ChargeBearer |Specifies which party/parties will bear the charges associated with the processing of the payment transaction. |OBChargeBearerType1Code |BorneByCreditor BorneByDebtor FollowingServiceLevel Shared | |
| CurrencyOfTransfer |1..1 |OBInternational2/CurrencyOfTransfer |Specifies the currency of the to be transferred amount, which is different from the currency of the debtor's account. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| InstructedAmount |1..1 |OBInternational2/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBInternational2/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |^\d{1,13}\.\d{1,5}$ |
| Currency |1..1 |OBInternational2/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| ExchangeRateInformation |0..1 |OBInternational2/ExchangeRateInformation |Provides details on the currency exchange rate and contract. |OBExchangeRate1 | | |
| UnitCurrency |1..1 |OBInternational2/ExchangeRateInformation/UnitCurrency |Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP. |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| ExchangeRate |0..1 |OBInternational2/ExchangeRateInformation/ExchangeRate |The factor used for conversion of an amount from one currency to another. This reflects the price at which one currency was bought with another currency. |BaseOneRate | | |
| RateType |1..1 |OBInternational2/ExchangeRateInformation/RateType |Specifies the type used to complete the currency exchange. |OBExchangeRateType2Code |Actual Agreed Indicative | |
| ContractIdentification |0..1 |OBInternational2/ExchangeRateInformation/ContractIdentification |Unique and unambiguous reference to the foreign exchange contract agreed between the initiating party/creditor and the debtor agent. |Max256Text | | |
| DebtorAccount |0..1 |OBInternational2/DebtorAccount |Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBInternational2/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternational2/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBInternational2/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max70Text | | |
| SecondaryIdentification |0..1 |OBInternational2/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| Creditor |0..1 |OBInternational2/Creditor |Party to which an amount of money is due. |OBPartyIdentification43 | | |
| Name |0..1 |OBInternational2/Creditor/Name |Name by which a party is known and which is usually used to identify that party. |Max140Text | | |
| PostalAddress |0..1 |OBInternational2/Creditor/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternational2/Creditor/PostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBInternational2/Creditor/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternational2/Creditor/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternational2/Creditor/PostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternational2/Creditor/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternational2/Creditor/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternational2/Creditor/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternational2/Creditor/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternational2/Creditor/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternational2/Creditor/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| CreditorAgent |0..1 |OBInternational2/CreditorAgent |Financial institution servicing an account for the creditor. |OBBranchAndFinancialInstitutionIdentification6 | | |
| SchemeName |0..1 |OBInternational2/CreditorAgent/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalFinancialInstitutionIdentification4Code | | |
| Identification |0..1 |OBInternational2/CreditorAgent/Identification |Unique and unambiguous identification of a financial institution or a branch of a financial institution. |Max35Text | | |
| Name |0..1 |OBInternational2/CreditorAgent/Name |Name by which an agent is known and which is usually used to identify that agent. |Max140Text | | |
| PostalAddress |0..1 |OBInternational2/CreditorAgent/PostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBInternational2/CreditorAgent/PostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBInternational2/CreditorAgent/PostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBInternational2/CreditorAgent/PostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBInternational2/CreditorAgent/PostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBInternational2/CreditorAgent/PostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBInternational2/CreditorAgent/PostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBInternational2/CreditorAgent/PostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBInternational2/CreditorAgent/PostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBInternational2/CreditorAgent/PostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBInternational2/CreditorAgent/PostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| CreditorAccount |1..1 |OBInternational2/CreditorAccount |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBInternational2/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBInternational2/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBInternational2/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max70Text | | |
| SecondaryIdentification |0..1 |OBInternational2/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| RemittanceInformation |0..1 |OBInternational2/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation1 | | |
| Unstructured |0..1 |OBInternational2/RemittanceInformation/Unstructured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text | | |
| Reference |0..1 |OBInternational2/RemittanceInformation/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped. |Max35Text | | |
| SupplementaryData |0..1 |OBInternational2/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

#### OBExchangeRate2

This section describes the OBExchangeRate2 class, which is reused in the response payloads in the international-payment-consent and international-payment resources.

![Exchange Rate Model](images/OBExchangeRate2.gif)

##### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBExchangeRate2 | |OBExchangeRate2 |Further detailed information on the exchange rate that has been used in the payment transaction. |OBExchangeRate2 | | |
| UnitCurrency |1..1 |OBExchangeRate2/UnitCurrency |Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP. |ActiveOrHistoricCurrencyCode |^[A-Z]{3,3}$ | |
| ExchangeRate |1..1 |OBExchangeRate2/ExchangeRate |The factor used for conversion of an amount from one currency to another. This reflects the price at which one currency was bought with another currency. |BaseOneRate | | |
| RateType |1..1 |OBExchangeRate2/RateType |Specifies the type used to complete the currency exchange. |OBExchangeRateType2Code |Actual Agreed Indicative | |
| ContractIdentification |0..1 |OBExchangeRate2/ContractIdentification |Unique and unambiguous reference to the foreign exchange contract agreed between the initiating party/creditor and the debtor agent. |Max256Text | | |
| ExpirationDateTime |0..1 |OBExchangeRate2/ExpirationDateTime |Specified date and time the exchange rate agreement will expire. |ISODateTime | | |

### International Payment Consent - Request

The OBWriteInternationalConsent3 object will be used for the call to:

* POST /international-payment-consents

#### UML Diagram

![International Payment Consent - Request](images/OBWriteInternationalConsent3.gif)

#### Notes 

The international-payment-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk

Exchange rate behaviour:

* An ASPSP **must** respond to an **Agreed** RateType request. 
* An ASPSP **may** respond to an **Actual** RateType request or **may** reject the request. 
* An ASPSP **may** respond to an **Indicative** RateType request or **may** reject the request. 
* An ASPSP **must** reject the international-payment-consent request if the specified Initiation/ExchangeRateInformation cannot be fulfilled.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteInternationalConsent3 | |OBWriteInternationalConsent3 | |OBWriteInternationalConsent3 | | |
| Data |1..1 |OBWriteInternationalConsent3/Data | |OBWriteDataInternationalConsent3 | | |
| Initiation |1..1 |OBWriteInternationalConsent3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single international payment. |OBInternational2 | | |
| Authorisation |0..1 |OBWriteInternationalConsent3/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteInternationalConsent3/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteInternationalConsent3/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### International Payment Consent - Response

The OBWriteInternationalConsentResponse3 object will be used for a response to a call to:

* POST /international-payment-consents
* GET /international-payment-consents/{ConsentId}

#### UML Diagram

![International Payment Consent - Response](images/OBWriteInternationalConsentResponse3.gif)

#### Notes 

The international-payment-consent **response** contains the full **original** payload from the international-payment-consent **request** with the additional elements below:

* ConsentId.
* CreationDateTime the international-payment-consent resource was created.
* Status and StatusUpdateDateTime of the international-payment-consent resource.
* CutOffDateTime Behaviour is explained in Payment Initiation API Specification, Section - Payment Restrictions -&gt; CutOffDateTime API Behaviour.
* ExpectedExecutionDateTime for the international-payment resource if created before CutOffDateTIme - the expected DateTime the payment is executed against the Debtor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* ExpectedSettlementDateTime for the international-payment resource if created before CutOffDateTIme - the expected DateTime the payment will be received at the Creditor Account. If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* Charges array which will be used by the ASPSP to indicate charges, and the ChargeBearer as relevant.
* ExchangeRateInformation (the ASPSP response) - this object will be used to communicate exchange rate information back to the PISP. It must be consistent with what is requested in the Initiation object from the PISP.

Exchange rate behaviour:

* For an **Agreed** RateType - if an ASPSP chooses to respond with Data/ExchangeRateInformation object:
  * An ASPSP may respond with the same requested exchange rate in the Data/ExchangeRateInformation object.
  * An ASPSP must not populate Data/ExchangeRateInformation/ExpirationDateTime.
* For an **Actual** RateType - if an ASPSP chooses to respond with Data/ExchangeRateInformation object:
  * An ASPSP must respond with an actual quote in the Data/ExchangeRateInformation object.
  * An ASPSP must respond with an actual ExchangeRate quote.
  * An ASPSP must respond with an ExpirationDateTime.
  * An ASPSP must reject the international-payment request if the PISP does not submit the international-payment within the ExchangeRateInformation/ExpirationDateTime.
* For an **Indicative** RateType - if an ASPSP chooses to respond with Data/ExchangeRateInformation object:
  * An ASPSP must respond with an indicative quote in the Data/ExchangeRateInformation object.
  * An ASPSP must respond with an indicative ExchangeRate quote.
  * An ASPSP must not populate Data/ExchangeRateInformation/ExpirationDateTime for the exchange rate, as it is the market rate on the date of execution (date on which the DebtorAccount is debited).

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteInternationalConsentResponse3 | |OBWriteInternationalConsentResponse3 | |OBWriteInternationalConsentResponse3 | | |
| Data |1..1 |OBWriteInternationalConsentResponse3/Data | |OBWriteDataInternationalConsentResponse3 | | |
| ConsentId |1..1 |OBWriteInternationalConsentResponse3/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteInternationalConsentResponse3/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteInternationalConsentResponse3/Data/Status |Specifies the status of consent resource in code form. |OBExternalConsentStatus1Code |Authorised AwaitingAuthorisation Consumed Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteInternationalConsentResponse3/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| CutOffDateTime |0..1 |OBWriteInternationalConsentResponse3/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteInternationalConsentResponse3/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteInternationalConsentResponse3/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..n |OBWriteInternationalConsentResponse3/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| ExchangeRateInformation |0..1 |OBWriteInternationalConsentResponse3/Data/ExchangeRateInformation |Further detailed information on the exchange rate that has been used in the payment transaction. |OBExchangeRate2 | | |
| Initiation |1..1 |OBWriteInternationalConsentResponse3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single international payment. |OBInternational2 | | |
| Authorisation |0..1 |OBWriteInternationalConsentResponse3/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteInternationalConsentResponse3/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteInternationalConsentResponse3/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### International Payment Consent Confirmation of Funds - Response

The OBWriteFundsConfirmationResponse1 object will be used for a response to a call to:

* GET /international-payment-consents/{ConsentId}/funds-confirmation

#### UML Diagram

![International Payment Consent Confirmation of Funds - Response](images/OBWriteConfirmFundsResponse1.gif)

#### Notes 

The confirmation of funds response contains the result of a funds availability check, or SupplementaryData.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteFundsConfirmationResponse1 | |OBWriteFundsConfirmationResponse1 | |OBWriteFundsConfirmationResponse1 | | |
| Data |1..1 |OBWriteFundsConfirmationResponse1/Data | |OBWriteDataFundsConfirmationResponse1 | | |
| FundsAvailableResult |0..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult |Result of a funds availability check. |OBFundsAvailableResult1 | | |
| FundsAvailableDateTime |1..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailableDateTime |Date and time at which the funds availability check was generated. |ISODateTime | | |
| FundsAvailable |1..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailable |Flag to indicate the availability of funds given the Amount in the consent request. |xs:boolean | | |
| SupplementaryData |0..1 |OBWriteFundsConfirmationResponse1/Data/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

### International Payment - Request

The OBWriteInternational2 object will be used for a call to:

* POST /international-payments

#### UML Diagram

![International Payment - Request](images/OBWriteInternational2.gif)

#### Notes 

The international-payment **request** object contains the: 

* ConsentId.
* The full Initiation and Risk objects from the international-payment request.
* The **Initiation** and **Risk** sections of the international-payment request **must** match the **Initiation** and **Risk** sections of the corresponding international-payment-consent request.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteInternational2 |OBWriteInternational2 | |OBWriteInternational2 | | | |
| Data |1..1 |OBWriteInternational2/Data | |OBWriteDataInternational2 | | |
| ConsentId |1..1 |OBWriteInternational2/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteInternational2/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single international payment. |OBInternational2 | | |
| Risk |1..1 |OBWriteInternational2/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

### International Payment - Response

The OBWriteInternationalResponse3 object will be used for a response to a call to:

* POST /international-payments
* GET /international-payments/{InternationalPaymentId}

#### UML Diagram

![International Payment - Response](images/OBWriteInternationalResponse3.png)

#### Notes 

The international-payment **response** object contains the: 

* InternationalPaymentId.
* ConsentId.
* CreationDateTime of the international-payment resource.
* Status and StatusUpdateDateTime of the international-payment resource.
* ExpectedExecutionDateTime for the international-payment resource.
* ExpectedSettlementDateTime for the international-payment resource.
* The Charges and ExchangeRateInformation in the international-payment-consent response from the ASPSP.
* The Initiation object from the international-payment-consent.
* The MultiAuthorisation object if the international-payment resource requires multiple authorisations.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteInternationalResponse3 | |OBWriteInternationalResponse3 | |OBWriteInternationalResponse3 | | |
| Data |1..1 |OBWriteInternationalResponse3/Data | |OBWriteDataInternationalResponse3 | | |
| InternationalPaymentId |1..1 |OBWriteInternationalResponse3/Data/InternationalPaymentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the international payment resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteInternationalResponse3/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteInternationalResponse3/Data/CreationDateTime |Date and time at which the message was created. |ISODateTime | | |
| Status |1..1 |OBWriteInternationalResponse3/Data/Status |Specifies the status of the payment information group. |OBTransactionIndividualStatus1Code |AcceptedCreditSettlementCompleted AcceptedWithoutPosting AcceptedSettlementCompleted AcceptedSettlementInProcess Pending Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteInternationalResponse3/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteInternationalResponse3/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteInternationalResponse3/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..n |OBWriteInternationalResponse3/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| ExchangeRateInformation |0..1 |OBWriteInternationalResponse3/Data/ExchangeRateInformation |Further detailed information on the exchange rate that has been used in the payment transaction. |OBExchangeRate2 | | |
| Initiation |1..1 |OBWriteInternationalResponse3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single international payment. |OBInternational2 | | |
| MultiAuthorisation |0..1 |OBWriteInternationalResponse3/Data/MultiAuthorisation |The multiple authorisation flow response from the ASPSP. |OBMultiAuthorisation1 | | |

### International Payment Order - Payment Details - Response

The OBWritePaymentDetailsResponse1 object will be used for a response to a call to:

* GET /international-payments/{InternationalPaymentId}/payment-details

#### UML Diagram

![International Payment Order - Payment Details - Response](images/OBWritePaymentDetailsResponse1.png)

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| PaymentStatus |0..unbounded |OBWritePaymentDetailsResponse1/Data/PaymentStatus |Payment status details. |OBWritePaymentDetails1 | | |

## Usage Examples

### Debit amount specified; ASPSP provides actual (guaranteed) FX rate, for limited time

The payee specifies the amount to be debited from the payment account and requests a payment to be credited in USD at a fixed rate.

#### POST /international-payment-consents request

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

#### POST /international-payment-consents response

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

### Confirm Funds on International Payment Order Consent

#### GET / international-payment-consents/{ConsentId}/funds-confirmation Request

```
GET /international-payment-consents/58923/funds-confirmation HTTP/1.1
Authorization: Bearer Jhingapulaav
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

#### GET /international-payment-consents/{ConsentId}/funds-confirmation Response

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

### Debit amount specified; ASPSP provides indicative FX rate

The payee specifies the amount to be debited from the payment account and requests a payment to be credited in USD at an indicative rate.

#### POST /international-payment-consents request

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

#### POST /international-payment-consents response

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

### Debit amount specified; ASPSP provides a pre-booked FX rate

The payee specifies the amount to be debited from the payment account and requests a payment to be credited in USD. The payee specifies a contract reference number that has been pre-negotiated and pre-booked with the ASPSP.

#### POST /international-payment-consents request

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

#### POST /international-payment-consents response

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

### Credit amount specified; ASPSP provides actual (guaranteed) FX rate, for limited time

In this situation, the PSU specifies the amount that must be credited to the payee. The ASPSP will debit the appropriate amount in GBP depending on the exchange rate.

As in the situation where the PSU specifies the amount to be debited the exchange rate could be guaranteed, indicative or pre-booked. CurrencyOfTransfer specified.

#### POST /international-payment-consents request

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

#### POST /international-payment-consents response

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

### International payment with all charges paid by payer

Charge types are indicative only.

#### POST /international-payment-consents request

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

#### POST /international-payment-consents response

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