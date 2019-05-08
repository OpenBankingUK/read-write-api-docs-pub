# Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-payment-consents |POST |POST /domestic-payment-consents |Mandatory |payments |Client Credentials |Signed Request Signed Response |Yes |OBWriteDomesticConsent3 |OBWriteDomesticConsentResponse3 |
| domestic-payment-consents |GET |GET /domestic-payment-consents/{ConsentId} |Mandatory |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticConsentResponse3 |
| domestic-payment-consents |GET |GET /domestic-payment-consents/{ConsentId}/funds-confirmation |Mandatory |payments |Authorization Code |Signed Response |No |NA |OBWriteFundsConfirmationResponse1 |
| domestic-payments |POST |POST /domestic-payments |Mandatory |payments |Authorization Code |Signed Request Signed Response |Yes |OBWriteDomestic2 |OBWriteDomesticResponse3 |
| domestic-payments |GET |GET /domestic-payments/{DomesticPaymentId} |Mandatory |payments |Client Credentials |Signed Response |No |NA |OBWriteDomesticResponse3 |
| payment-details |GET |GET /domestic-payments/{DomesticPaymentId}/payment-details |Optional |payments |Client Credentials |Signed Response |No |NA |OBWritePaymentDetailsResponse1 |

## POST /domestic-payment-consents

```POST /domestic-payment-consents```

The API endpoint allows the PISP to ask an ASPSP to create a new **domestic-payment-consent** resource.

* The POST action indicates to the ASPSP that a domestic payment consent has been staged. At this point, the PSU may not have been identified by the ASPSP, and the request payload may not contain any information of the account that should be debited.
* The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for the PSU to authorise.
* The ASPSP creates the **domestic-payment-consent** resource and responds with a unique ConsentId to refer to the resource.

### Status

The default Status is &quot;AwaitingAuthorisation&quot; immediately after the domestic-payment-consent has been created.

| Status |
| ------ |
| AwaitingAuthorisation |

## GET /domestic-payment-consents/{ConsentId}

```GET /domestic-payment-consents/{ConsentId}```

A PISP can optionally retrieve a payment consent resource that they have created to check its status. 

### Status

Once the PSU authorises the payment-consent resource - the Status of the payment-consent resource will be updated with &quot;Authorised&quot;.

If the PSU rejects the consent or the domestic-payment-consent has failed some other ASPSP validation, the Status will be set to &quot;Rejected&quot;.

Once a domestic-payment has been successfully created using the domestic-payment-consent, the Status of the domestic-payment-consent will be set to &quot;Consumed&quot;.

The available status codes for the domestic-payment-consent resource are:

| Status |
| ------ |
| AwaitingAuthorisation |
| Rejected |
| Authorised |
| Consumed |

## GET /domestic-payment-consents/{ConsentId}/funds-confirmation

```GET /domestic-payment-consents/{ConsentId}/funds-confirmation```

The API endpoint allows the PISP to ask an ASPSP to confirm funds on a **domestic-payment-consent** resource.

* An ASPSP can only respond to a funds confirmation request if the **domestic-payment-consent** resource has an Authorised status. If the status is not Authorised, an ASPSP must respond with a 400 (Bad Request) and a ```UK.OBIE.Resource.InvalidConsentStatus``` error code.
* Confirmation of funds requests do not affect the status of the **domestic-payment-consent** resource.

## POST&nbsp;/domestic-payments

```POST /domestic-payments```

Once the domestic-payment-consent has been authorised by the PSU, the PISP can proceed to submitting the domestic-payment for processing:

* This is done by making a POST request to the **domestic-payments** endpoint.
* This request is an instruction to the ASPSP to begin the domestic single immediate payment journey. The domestic payment must be submitted immediately, however, there are some scenarios where the domestic payment may not be executed immediately (e.g., busy periods at the ASPSP).
* The PISP **must** ensure that the Initiation and Risk sections of the domestic-payment match the corresponding Initiation and Risk sections of the domestic-payment-consent resource. If the two do not match, the ASPSP must not process the request and **must** respond with a 400 (Bad Request).
* Any operations on the domestic-payment resource will not result in a status change for the domestic-payment resource.

### Status

A domestic-payment can only be created if its corresponding domestic-payment-consent resource has the status of "Authorised". 

The domestic-payment resource that is created successfully must have one of the following PaymentStatusCode code-set enumerations:

| Status |
| ------ |
| Pending |
| Rejected |
| AcceptedSettlementInProcess |
| AcceptedSettlementCompleted |
| AcceptedWithoutPosting |
| AcceptedCreditSettlementCompleted |

## GET&nbsp;/domestic-payments/{DomesticPaymentId}

```GET /domestic-payments/{DomesticPaymentId}```

A PISP can retrieve the domestic-payment to check its status.

### Status

The domestic-payment resource must have one of the following PaymentStatusCode code-set enumerations:

| Status |
| ------ |
| Pending |
| Rejected |
| AcceptedSettlementInProcess |
| AcceptedSettlementCompleted |
| AcceptedWithoutPosting |
| AcceptedCreditSettlementCompleted |

## GET&nbsp;/domestic-payments/{DomesticPaymentId}/payment-details

```GET /domestic-payments/{DomesticPaymentId}/payment-details```

A PISP can retrieve the Details of the underlying payment transaction via this endpoint. This resource allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related statuses.

### Status

The domestic-payment - payment-details must have one of the following PaymentStatusCode code-set enumerations:

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

## State&nbsp;Model

### Payment&nbsp;Order&nbsp;Consent

The state model for the domestic-payment-consent resource follows the generic consent state model. However, does not use the &nbsp;Revoked&nbsp; status, as the consent for a domestic-payment is not a long-lived consent.

!["Payment Order Consent Status"](images/dp/image2018-5-18_10-24-21.png "Payment Order Consent Status")

The definitions for the Status:

|  | Status |Status Description |
| ---| ------ |------------------ |
| 1 |AwaitingAuthorisation |The consent resource is awaiting PSU authorisation. |
| 2 |Rejected |The consent resource has been rejected. |
| 3 |Authorised |The consent resource has been successfully authorised. |
| 4 |Consumed |The consented action has been successfully completed. This does not reflect the status of the consented action. |

### Payment&nbsp;Order

The state model for the domestic-payment resource follows the behaviour and definitions for the ISO 20022 PaymentStatusCode code-set.

![Status](images/dp/PaymentStatusLifeCycle.png "Payment Order Status")

The definitions for the status:

|  |Status |Payment Status Description |
|--|------ |-------------------------- |
| 1 |Pending |Payment initiation or individual transaction included in the payment initiation is pending. Further checks and status update will be performed. |
| 2 |Rejected |Payment initiation or individual transaction included in the payment initiation has been rejected. |
| 3 |AcceptedSettlementInProcess |All preceding checks such as technical validation and customer profile were successful and therefore the payment initiation has been accepted for execution. |
| 4 |AcceptedSettlementCompleted |Settlement on the debtor's account has been completed. |
| 5 |AcceptedWithoutPosting |Payment instruction included in the credit transfer is accepted without being posted to the creditor customer’s account. |
| 6 |AcceptedCreditSettlementCompleted |Settlement on the creditor's account has been completed.|


#### Multiple&nbsp;Authorisation

If the payment-order requires multiple authorisations - the Status of the multiple authorisations will be updated in the MultiAuthorisation object.

![Status](images/dp/image2018-6-29_16-36-34.png "Multi Authorisation Status")

The definitions for the status:

|  |Status |Status Description |
|-- |------ |------------------ |
| 1 |AwaitingFurtherAuthorisation |The payment-order resource is awaiting further authorisation. |
| 2 |Rejected |The payment-order resource has been rejected by an authoriser. |
| 3 |Authorised |The payment-order resource has been successfully authorised by all required authorisers.|

# Data&nbsp;Model

The data dictionary section gives the detail on the payload content for the Domestic Payment API flows.

## Reused&nbsp;Classes

### OBDomestic2

This section describes the OBDomestic2 class which is reused as the Initiation object in the domestic-payment-consent and domestic-payment resources.

#### UML&nbsp;Diagram

![UML Diagram$](images/dp/OBDomestic2.gif "UML Diagram")

#### Notes

For the OBDomestic2 Initiation object:  

* All elements in the Initiation payload that are specified by the PISP must not be changed via the ASPSP as this is part of formal consent from the PSU.
* If the ASPSP is able to establish a problem with payload or any contextual error during the API call, the ASPSP must reject the domestic-payment-consent request immediately.

* If the ASPSP establishes a problem with the domestic-payment-consent after the API call, the ASPSP must set the status of the domestic-payment-consent resource to Rejected.

* DebtorAccount is **optional** as the PISP may not know the account identification details for the PSU.
* If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the domestic-payment-consent will be set to Rejected after PSU authentication.
* Account Identification field usage:
  * Where "UK.OBIE.SortCodeAccountNumber" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field **must** be populated with the 6 digit Sort Code and 8 digit Account Number (a 14 digit field).
  * Where the "UK.OBIE.IBAN" is specified as the SchemeName in the Account identification section (either DebtorAccount or CreditorAccount), the Identification field must be populated with the full IBAN.
* The element Reference has been renamed from CreditorReferenceInformation as this is the unique ISO 20022 element used in pain.001, rather than an ISO 20022 message component.
* As a merchant may be initiating a payment via a PISP two identifiers are included in the payload: 
  * InstructionIdentification is uniquely generated by the PISP. The expectation is that this is unique indefinitely across all time periods. The PISP can ensure that this is indefinitely unique by including a date or date-time element to the field, or by inserting a unique Id. 
  * EndToEndIdentification is uniquely generated by the merchant.
* Neither the InstructionIdentification nor EndToEndIdentification will be used as the domestic-payment-consent resource identifier (ConsentId) as the ConsentId must be uniquely generated by the ASPSP.
* LocalInstrument is the requested payment scheme for execution. This is a free-text field.
* Design decisions for the Initiation section of the payload and how this maps to the ISO 20022 messaging standard are articulated in the Mapping to Schemes and Standards section.

#### Data&nbsp;Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBDomestic2 | |OBDomestic2 |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment. |OBDomestic2 | | |
| InstructionIdentification |1..1 |OBDomestic2/InstructionIdentification |Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction. |Max35Text | | |
| EndToEndIdentification |1..1 |OBDomestic2/EndToEndIdentification |Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field. |Max35Text | | |
| LocalInstrument |0..1 |OBDomestic2/LocalInstrument |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code | | |
| InstructedAmount |1..1 |OBDomestic2/InstructedAmount |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBDomestic2/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |^\d{1,13}\.\d{1,5}$ |
| Currency |1..1 |OBDomestic2/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
| DebtorAccount |0..1 |OBDomestic2/DebtorAccount |Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction. |OBCashAccountDebtor4 | | |
| SchemeName |1..1 |OBDomestic2/DebtorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomestic2/DebtorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |0..1 |OBDomestic2/DebtorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account. |Max70Text | | |
| SecondaryIdentification |0..1 |OBDomestic2/DebtorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| CreditorAccount |1..1 |OBDomestic2/CreditorAccount |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction. |OBCashAccountCreditor3 | | |
| SchemeName |1..1 |OBDomestic2/CreditorAccount/SchemeName |Name of the identification scheme, in a coded form as published in an external list. |OBExternalAccountIdentification4Code | | |
| Identification |1..1 |OBDomestic2/CreditorAccount/Identification |Identification assigned by an institution to identify an account. This identification is known by the account owner. |Max256Text | | |
| Name |1..1 |OBDomestic2/CreditorAccount/Name |The account name is the name or names of the account owner(s) represented at an account level. Note, the account name is not the product name or the nickname of the account. OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory. |Max70Text | | |
| SecondaryIdentification |0..1 |OBDomestic2/CreditorAccount/SecondaryIdentification |This is secondary identification of the account, as assigned by the account servicing institution. This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination). |Max34Text | | |
| CreditorPostalAddress |0..1 |OBDomestic2/CreditorPostalAddress |Information that locates and identifies a specific address, as defined by postal services. |OBPostalAddress6 | | |
| AddressType |0..1 |OBDomestic2/CreditorPostalAddress/AddressType |Identifies the nature of the postal address. |OBAddressTypeCode |Business Correspondence DeliveryTo MailTo POBox Postal Residential Statement | |
| Department |0..1 |OBDomestic2/CreditorPostalAddress/Department |Identification of a division of a large organisation or building. |Max70Text | | |
| SubDepartment |0..1 |OBDomestic2/CreditorPostalAddress/SubDepartment |Identification of a sub-division of a large organisation or building. |Max70Text | | |
| StreetName |0..1 |OBDomestic2/CreditorPostalAddress/StreetName |Name of a street or thoroughfare. |Max70Text | | |
| BuildingNumber |0..1 |OBDomestic2/CreditorPostalAddress/BuildingNumber |Number that identifies the position of a building on a street. |Max16Text | | |
| PostCode |0..1 |OBDomestic2/CreditorPostalAddress/PostCode |Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. |Max16Text | | |
| TownName |0..1 |OBDomestic2/CreditorPostalAddress/TownName |Name of a built-up area, with defined boundaries, and a local government. |Max35Text | | |
| CountrySubDivision |0..1 |OBDomestic2/CreditorPostalAddress/CountrySubDivision |Identifies a subdivision of a country such as state, region, county. |Max35Text | | |
| Country |0..1 |OBDomestic2/CreditorPostalAddress/Country |Nation with its own government. |CountryCode | |^[A-Z]{2,2}$ |
| AddressLine |0..7 |OBDomestic2/CreditorPostalAddress/AddressLine |Information that locates and identifies a specific address, as defined by postal services, presented in free format text. |Max70Text | | |
| RemittanceInformation |0..1 |OBDomestic2/RemittanceInformation |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system. |OBRemittanceInformation1 | | |
| Unstructured |0..1 |OBDomestic2/RemittanceInformation/Unstructured |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. |Max140Text | | |
| Reference |0..1 |OBDomestic2/RemittanceInformation/Reference |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped. |Max35Text | | |
| SupplementaryData |0..1 |OBDomestic2/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

## Domestic&nbsp;Payment&nbsp;Consent&nbsp;-&nbsp;Request

The OBWriteDomesticConsent3 object will be used for the call to:
* POST /domestic-payment-consents
  
### UML Diagram

![Domestic Payment Consent - Request](images/dp/OBWriteDomesticConsent3.gif)

### Notes

The domestic-payment-consent **request** contains these objects:

* Initiation
* Authorisation
* SCASupportData
* Risk.

### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticConsent3 |OBWriteDomesticConsent3 | | |OBWriteDomesticConsent3 | | |
| Data |1..1 |OBWriteDomesticConsent3/Data | |OBWriteDataDomesticConsent3 | | |
| Initiation |1..1 |OBWriteDomesticConsent3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment. |OBDomestic2 | | |
| Authorisation |0..1 |OBWriteDomesticConsent3/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticConsent3/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |

## Domestic Payment Consent - Response
The OBWriteDomesticConsentResponse3 object will be used for a response to a call to:

* POST /domestic-payment-consents
* GET /domestic-payment-consents/{ConsentId}

### UML Diagram

![Domestic Payment Consent - Response](images/dp/OBWriteDomesticConsentResponse3.gif)

### Notes

Them domestic-payment-consent&nbsp;**response**&nbsp;contains the full **original** payload from the&nbsp;domestic-payment-consent&nbsp;**request**,&nbsp;with the additional elements below:
* ConsentId
* CreationDateTime the&nbsp;domestic-payment-consent resource was created.
* Status and StatusUpdateDateTime of the&nbsp;domestic-payment-consent resource.
* CutOffDateTime Behaviour is explained in Payment Initiation API Specification, Section - Payment Restrictions -&gt; CutOffDateTime API Behaviour.
* ExpectedExecutionDateTime for the&nbsp;domestic-payment resource if created before CutOffDateTIme - the expected DateTime the payment is executed against the Debtor Account.&nbsp;If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* ExpectedSettlementDateTime for the&nbsp;domestic-payment resource if created before CutOffDateTIme - the expected DateTime the payment will be received&nbsp;at the Creditor Account.&nbsp;If populated, the ASPSP must update the value with any changes (e.g., after PSU authorisation).
* Charges array for the breakdown of applicable ASPSP charges.

### Data Dictionary

 | Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticConsentResponse3 | |OBWriteDomesticConsentResponse3 | |OBWriteDomesticConsentResponse3 | | |
| Data |1..1 |OBWriteDomesticConsentResponse3/Data | |OBWriteDataDomesticConsentResponse3 | | |
| ConsentId |1..1 |OBWriteDomesticConsentResponse3/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticConsentResponse3/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| Status |1..1 |OBWriteDomesticConsentResponse3/Data/Status |Specifies the status of consent resource in code form. |OBExternalConsentStatus1Code |Authorised AwaitingAuthorisation Consumed Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteDomesticConsentResponse3/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| CutOffDateTime |0..1 |OBWriteDomesticConsentResponse3/Data/CutOffDateTime |Specified cut-off date and time for the payment consent. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteDomesticConsentResponse3/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteDomesticConsentResponse3/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..n |OBWriteDomesticConsentResponse3/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticConsentResponse3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment. |OBDomestic2 | | |
| Authorisation |0..1 |OBWriteDomesticConsentResponse3/Data/Authorisation |The authorisation type request from the TPP. |OBAuthorisation1 | | |
| SCASupportData |0..1 |OBWriteDomesticConsentResponse3/Data/SCASupportData |Supporting Data provided by TPP, when requesting SCA Exemption. |OBSCASupportData1 | | |
| Risk |1..1 |OBWriteDomesticConsentResponse3/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

## Domestic Payment Consent Confirmation of Funds -&nbsp;Response

The&nbsp;OBWriteFundsConfirmationResponse1 object will be used for a response to a call to:

* GET&nbsp;/domestic-payment-consents/{ConsentId}/funds-confirmation

### UML Diagram

![Domestic Payment Consent Confirmation of Funds -&nbsp;Response](images/dp/OBWriteConfirmFundsResponse1.gif)

### Notes

The confirmation of funds&nbsp;response&nbsp;contains the result of a funds availability&nbsp;check, or SupplementaryData.

### Data Dictionary 

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteFundsConfirmationResponse1 | |OBWriteFundsConfirmationResponse1 | |OBWriteFundsConfirmationResponse1 | | |
| Data |1..1 |OBWriteFundsConfirmationResponse1/Data | |OBWriteDataFundsConfirmationResponse1 | | |
| FundsAvailableResult |0..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult |Result of a funds availability check. |OBFundsAvailableResult1 | | |
| FundsAvailableDateTime |1..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailableDateTime |Date and time at which the funds availability check was generated. |ISODateTime | | |
| FundsAvailable |1..1 |OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailable |Flag to indicate the availability of funds given the Amount in the consent request. |xs:boolean | | |
| SupplementaryData |0..1 |OBWriteFundsConfirmationResponse1/Data/SupplementaryData |Additional information that can not be captured in the structured fields and/or any other specific block. |OBSupplementaryData1 | | |

## Domestic Payment - Request

The&nbsp;OBWriteDomestic2 object will be used for a call to:
* POST /domestic-payments

### UML Diagram

![Domestic&nbsp;Payment&nbsp;Request](images/dp/OBWriteDomestic2.gif)

### Notes

The domestic-payment **request** object contains the:

* ConsentId.
* The full Initiation and Risk objects from the domestic-payment-consent &nbsp;request.

The&nbsp;**Initiation** and **Risk**&nbsp;sections of the&nbsp;domestic-payment request **must**&nbsp;match the&nbsp;**Initiation** and **Risk**&nbsp;sections of the corresponding&nbsp;domestic-payment-consent request.

### Data Dictionary

 | Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomestic2 | |OBWriteDomestic2 | |OBWriteDomestic2 | | |
| Data |1..1 |OBWriteDomestic2/Data | |OBWriteDataDomestic2 | | |
| ConsentId |1..1 |OBWriteDomestic2/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| Initiation |1..1 |OBWriteDomestic2/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment. |OBDomestic2 | | |
| Risk |1..1 |OBWriteDomestic2/Risk |The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments. |OBRisk1 | | |

 ## Domestic Payment - Response
 
 The&nbsp;OBWriteDomesticResponse3 object will be used for a response to a call to:
 
 * POST /domestic-payments
 * GET /domestic-payments/{DomesticPaymentId}

 ### UML Diagram

 ![Domestic Payment Response](images/dp/OBWriteDataDomesticResponse3.png)
 
 ### Notes
 
 The domestic-payment&nbsp;**response**&nbsp;object contains the:

* DomesticPaymentId.
* ConsentId.
* CreationDateTime the&nbsp;domestic-payment resource was created.
* Status and StatusUpdateDateTime of the&nbsp;domestic-payment resource.
* ExpectedExecutionDateTime for the&nbsp;domestic-payment resource.
* ExpectedSettlementDateTime for the&nbsp;domestic-payment resource.
* Charges array for the breakdown of applicable ASPSP charges.
* The Initiation object from the domestic-payment-consent.
* The MultiAuthorisation object if the&nbsp;domestic-payment resource requires multiple authorisations.

### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWriteDomesticResponse3 | |OBWriteDomesticResponse3 | |OBWriteDomesticResponse3 | | |
| Data |1..1 |OBWriteDomesticResponse3/Data | |OBWriteDataDomesticResponse3 | | |
| DomesticPaymentId |1..1 |OBWriteDomesticResponse3/Data/DomesticPaymentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource. |Max40Text | | |
| ConsentId |1..1 |OBWriteDomesticResponse3/Data/ConsentId |OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBWriteDomesticResponse3/Data/CreationDateTime |Date and time at which the message was created. |ISODateTime | | |
| Status |1..1 |OBWriteDomesticResponse3/Data/Status |Specifies the status of the payment information group. |OBTransactionIndividualStatus1Code |AcceptedCreditSettlementCompleted AcceptedWithoutPosting AcceptedSettlementCompleted AcceptedSettlementInProcess Pending Rejected | |
| StatusUpdateDateTime |1..1 |OBWriteDomesticResponse3/Data/StatusUpdateDateTime |Date and time at which the resource status was updated. |ISODateTime | | |
| ExpectedExecutionDateTime |0..1 |OBWriteDomesticResponse3/Data/ExpectedExecutionDateTime |Expected execution date and time for the payment resource. |ISODateTime | | |
| ExpectedSettlementDateTime |0..1 |OBWriteDomesticResponse3/Data/ExpectedSettlementDateTime |Expected settlement date and time for the payment resource. |ISODateTime | | |
| Charges |0..n |OBWriteDomesticResponse3/Data/Charges |Set of elements used to provide details of a charge for the payment initiation. |OBCharge2 | | |
| Initiation |1..1 |OBWriteDomesticResponse3/Data/Initiation |The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment. |OBDomestic2 | | |
| MultiAuthorisation |0..1 |OBWriteDomesticResponse3/Data/MultiAuthorisation |The multiple authorisation flow response from the ASPSP. |OBMultiAuthorisation1 | | |

## Domestic Payment Order - Payment Details - Response

The&nbsp;OBWritePaymentDetailsResponse1&nbsp;object will be used for a response to a call to:

* GET /domestic-payments/{DomesticPaymentId}/payment-details

### UML Diagram

![Domestic Payment Order-Payment Details](images/dp/OBWritePaymentDetailsResponse1.png)

### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| ---- |---------- |----- |------------------ |----- |----- |------- |
| OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | |OBWritePaymentDetailsResponse1 | | |
| Data |1..1 |OBWritePaymentDetailsResponse1/Data | |OBWriteDataPaymentOrderStatusResponse1 | | |
| PaymentStatus |0..unbounded |OBWritePaymentDetailsResponse1/Data/PaymentStatus |Payment status details. |OBWritePaymentDetails1 | | |

# Usage Examples

## Merchant Initiation via PISP

This example set of flows and payload examples are for a domestic payment initiated by a merchant via a PISP.

In this scenario:

* The merchant has **not** specified the Debtor Account details for the PSU. The PSU will select their account during the authorisation of consent.
* The merchant's account is a building society account with a roll number specified in the SecondaryIdentification field.

### Sequence Diagram

![Sequence Diagram](images/dp/MerchantDomesticPaymentUsageExample-3.png)

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

**POST /domestic-payment-consents request** 

```text
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
```javascript
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
    "PaymentContextCode": "EcommerceGoods",
    "MerchantCategoryCode": "5967",
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
      "CountySubDivision": [
        "Wessex"
      ],
      "Country": "UK"
    }
  }
}
```
**POST  /domestic-payment-consents response**

```text
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```
```javascript
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
    "PaymentContextCode": "EcommerceGoods",
    "MerchantCategoryCode": "5967",
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
      "CountySubDivision": [
        "Wessex"
      ],
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

**GET /domestic-payment-consents/{ConsentId}/funds-confirmation Request**

```text
GET /domestic-payment-consents/58923/funds-confirmation HTTP/1.1
Authorization: Bearer Jhingapulaav
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

**GET /domestic-payment-consents/{ConsentId}/funds-confirmation Response**

```text
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```
```javascript
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

**POST /domestic-payments Request**

```text
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
```javascript
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
    "PaymentContextCode": "EcommerceGoods",
    "MerchantCategoryCode": "5967",
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
      "CountySubDivision": [
        "Wessex"
      ],
      "Country": "UK"
    }
  }
}
```

**POST /domestic-payments Response**

```text
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```javascript
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

####Get Domestic Payment Order Consent

**GET /domestic-payment-consents/{ConsentId} Request**

```text
GET /domestic-payment-consents/58923 HTTP/1.1
Authorization: Bearer Jhingapulaav
x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

**GET /domestic-payment-consents/{ConsentId} Response**

```text
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```javascript
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
    "PaymentContextCode": "EcommerceGoods",
    "MerchantCategoryCode": "5967",
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
      "CountySubDivision": [
        "Wessex"
      ],
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

**GET /domestic-payments/{DomesticPaymentId} Request**

```text
GET /domestic-payments/58923-001 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

**GET /domestic-payments/{DomesticPaymentId} Response**

```text
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```
```javascript
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

![P2P Payment](images/dp/P2PDomesticPaymentExample.png)

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

**POST /domestic-payment-consents request**

```text
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

```javascript
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
    "PaymentContextCode": "PartyToParty"
  }
}
```

**POST /domestic-payment-consents response**

```text
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```javascript
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
    "PaymentContextCode": "PartyToParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
  },
  "Meta": {}
}
```

### Create Domestic Payment Order

**POST /domestic-payments request**

```text
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

```javascript 
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
    "PaymentContextCode": "PartyToParty"
  }
}
```

**POST /domestic-payments response**

```text
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```javascript
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

**GET /domestic-payment-consents/{ConsentId} request**

```text
GET /domestic-payment-consents/7290 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

**GET /domestic-payment-consents/{ConsentId} response**

```text
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```javascript
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
    "PaymentContextCode": "PartyToParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
  },
  "Meta": {}
}
```

### Get Domestic Payment Order

**GET /domestic-payments/{DomesticPaymentId} request**

```text
GET /domestic-payments/7290-003 HTTP/1.1
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json
```

**GET /domestic-payments/{DomesticPaymentId} response**

```text
HTTP/1.1 200 OK
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```javascript
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

**POST /domestic-payment-consents request**

```text
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

```javascript
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
    "PaymentContextCode": "PartyToParty"
  }
}
```

**POST /domestic-payment-consents response**

```text
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```javascript
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
    "PaymentContextCode": "PartyToParty"
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
  },
  "Meta": {}
}
```

## CHAPS Payment Order Consent

Use of LocalInstrument, CreditorPostalAddress, CutOffDateTime and Charges.

**POST /domestic-payment-consents request**

```text
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

```javascript
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
    "PaymentContextCode": "PartyToParty"
  }
}
```

**POST /domestic-payment-consents response**

```text
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```javascript
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
      "PaymentContextCode":"PartyToParty"
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

**POST /domestic-payment-consents request**

```text
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

```javascript
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
        "PaymentContextCode": "PartyToParty"
    }
}
```

**POST /domestic-payment-consents response**

```text
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
```

```javascript
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
        "PaymentContextCode": "PartyToParty"
    },
    "Links": {
        "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
    },
    "Meta": {}
}
```

## Money Transfer
Below in an example illustrating Money transfer from a card account to a bank account. 

**POST /domestic-payment-consents request**

```text
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
```javascript
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
        "PaymentContextCode": "PartyToParty"
    }
}
```

**POST /domestic-payment-consents response**

```text
HTTP/1.1 201 Created
x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json
``` 
```javascript
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
        "PaymentContextCode": "PartyToParty"
    },
    "Links": {
        "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
    },
    "Meta": {}
}
```