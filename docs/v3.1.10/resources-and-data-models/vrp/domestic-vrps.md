# Domestic VRPS - v3.1.10 <!-- omit in toc -->

- [Overview](#overview)
- [Endpoints](#endpoints)
  - [POST /domestic-vrps](#post-domestic-vrps)
    - [Status](#status)
  - [GET /domestic-vrps/{DomesticVRPId}](#get-domestic-vrpsdomesticvrpid)
  - [GET /domestic-vrps/{DomesticVRPId}/payment-details](#get-domestic-vrpsdomesticvrpidpayment-details)
- [State Model](#state-model)
  - [Payment Order](#payment-order)
- [Data Model](#data-model)
  - [OBDomesticVRPInstruction](#obdomesticvrpinstruction)
  - [OBDomesticVRPRequest](#obdomesticvrprequest)
  - [OBDomesticVRPResponse](#obdomesticvrpresponse)
  - [OBDomesticVRPDetails](#obdomesticvrpdetails)
- [Usage Examples](#usage-examples)

## Overview

The Domestic VRPs resource is used by a TPP to initiate a domestic payment, under an authorised VRP Consent.

This resource description should be read in conjunction with a compatible Payment Initiation API Profile.

## Endpoints

| Resource |HTTP Operation |Endpoint |Mandatory |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| -------- |-------------- |-------- |----------- |----- |---------- |--------------- |--------------- |-------------- |--------------- |
| domestic-vrps |POST |POST /domestic-vrps | Conditional |payments |Authorization Code |Signed Request Signed Response |Yes | OBDomesticVRPRequest |OBDomesticVRPResponse |
| domestic-vrps |GET |GET /domestic-vrps/{DomesticVRPId} | Conditional |payments |Client Credentials |Signed Response |No |NA |OBDomesticVRPResponse |
| domestic-vrps |GET |GET /domestic-vrps/{DomesticVRPId}/payment-details | Optional |payments |Client Credentials |Signed Response |No |NA |OBDomesticVRPDetails |

### POST /domestic-vrps

Once a `domestic-vrp-consents` has been authorised by the PSU, the TPP can proceed to submitting a `domestic-vrps` for processing.

This is done by making a POST request to the `domestic-vrps` endpoint.

This request is an instruction to the ASPSP to begin the domestic single immediate payment journey. The domestic payment must be executed immediately, however, there are some scenarios where the domestic payment may not be executed immediately (e.g., busy periods at the ASPSP).

The TPP **must** ensure that the `Initiation` and `Risk` section matches the values specified in the consent.

The ASPSP **must** ensure that the payment instruction adheres to the limitations set by the corresponding VRP consent's `ControlParameters`.

When a payment would breach a limitation set by one or more `ControlParameters`, the ASPSP **must** return an error with code `UK.OBIE.Rules.FailsControlParameters` and pass in the control parameter field that caused the error in the `Field` field of the error message.

If the `CreditorAccount` was not specified in the the consent, the `CreditorAccount` must be specified in the instruction.

The TPP **must** ensure that the end-point is called with the same scope as the one used for the corresponding consent.

The ASPSP **must** reject a payment that has `Data.Instruction.SupplementaryData` that it cannot process.

#### Status

A `domestic-vrps` can only be created if its corresponding `domestic-vrp-consents` resource has the status of `Authorised`.

The `domestic-vrps` resource that is created successfully must have one of the following `PaymentStatusCode` values

- Pending
- Rejected
- AcceptedSettlementInProcess
- AcceptedSettlementCompleted
- AcceptedWithoutPosting
- AcceptedCreditSettlementCompleted

### GET /domestic-vrps/{DomesticVRPId}

Once the domestic vrp is created, a TPP can retrieve the `domestic-vrps` to check its status by using this endpoint.

The domestic-vrp resource must have one of the following PaymentStatusCode code-set enumerations:

- Pending
- Rejected
- AcceptedSettlementInProcess
- AcceptedSettlementCompleted
- AcceptedWithoutPosting
- AcceptedCreditSettlementCompleted

### GET /domestic-vrps/{DomesticVRPId}/payment-details

A TPP can retrieve the details of the underlying payment transaction via this endpoint. This resource allows ASPSPs to return a richer list of Payment Statuses, and if available payment scheme related statuses.

The API must return one of the following status codes:

- Accepted
- AcceptedCancellationRequest
- AcceptedTechnicalValidation
- AcceptedCustomerProfile
- AcceptedFundsChecked
- AcceptedWithChange
- Pending
- Rejected
- AcceptedSettlementInProcess
- AcceptedSettlementCompleted
- AcceptedWithoutPosting
- AcceptedCreditSettlementCompleted
- Cancelled
- NoCancellationProcess
- PartiallyAcceptedCancellationRequest
- PartiallyAcceptedTechnicalCorrect
- PaymentCancelled
- PendingCancellationRequest
- Received
- RejectedCancellationRequest

## State Model

### Payment Order

The state model for the `domestic-vrps` resource follows the behaviour and definitions for the ISO 20022 PaymentStatusCode code-set.

![Domestic VRP Status](./images/PaymentStatusLifeCycle.png)

The definitions for the status:
|  |Status |Payment Status Description |
|--|------ |-------------------------- |
| 1 |Pending |Payment initiation or individual transaction included in the payment initiation is pending. Further checks and status update will be performed. |
| 2 |Rejected |Payment initiation or individual transaction included in the payment initiation has been rejected. |
| 3 |AcceptedSettlementInProcess |All preceding checks such as technical validation and customer profile were successful and therefore the payment initiation has been accepted for execution. |
| 4 |AcceptedSettlementCompleted |Settlement on the debtor's account has been completed. |
| 5 |AcceptedWithoutPosting |Payment instruction included in the credit transfer is accepted without being posted to the creditor customer’s account. |
| 6 |AcceptedCreditSettlementCompleted |Settlement on the creditor's account has been completed.|

## Data Model

### OBDomesticVRPInstruction

![OBDomesticVRPInstruction](./images/OBDomesticVRPInstruction.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __InstructionIdentification__ (1..1) | `Initiation. InstructionIdentification` |Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction. |Max35Text
| __EndToEndIdentification__ (1..1) | `EndToEndIdentification` |Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field. |Max35Text
| __RemittanceInformation__ (0..1) | `RemittanceInformation` |Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
| __Unstructured__ (0..1) | `RemittanceInformation. Unstructured` |Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form. | Max140Text
| __Reference__ (0..1) | `RemittanceInformation. Reference` |Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. The PISP must populate this with the same value as specified in the `Data.Initiation.RemittanceInformation.Reference` field of the consent. |Max35Text
| __LocalInstrument__ (0..1) | `LocalInstrument` |User community specific instrument. Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code
| __InstructedAmount__ (1..1) | `InstructedAmount` |Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain. | OBActiveOrHistoricCurrencyAndAmount
| __Amount__ (1..1) |`InstructedAmount. Amount` |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | `^\d{1,13}$\|^\d{1,13}\.\d{1,5}$`
| __Currency__ (1..1) | `InstructedAmount. Currency` |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | `^[A-Z]{3,3}$`
| __CreditorAgent__ (0..1) | `CreditorAgent` | Financial institution servicing an account for the creditor.     | OBBranchAndFinancialInstitutionIdentification6
| __CreditorAccount__ (1..1) | `CreditorAccount`   |Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.       |OBCashAccountCreditor3
| __SupplementaryData__ (0..1) | `SupplementaryData` | Additional information that can not be captured in the structured fields and/or any other specific block  | *

### OBDomesticVRPRequest

![OBDomesticVRPRequest](./images/OBDomesticVRPRequest.svg)

| Name                               | Path                            | Definition                                                                                                  | Type                                                  |
|------------------------------------|---------------------------------|-------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| __Data__ (1..1)                    | `Data`                          |                                                                                                             |                                                       |
| __PSUAuthenticationMethod__ (1..1) | `Data. PSUAuthenticationMethod` | The authentication method that was used to authenicate the PSU.                                             | OBVRPAuthenticationMethods - Namespaced Enumeration   |
| __PSUInteractionType__ (0..1)      | `Data. PSUInteractionType`      | Indicates interaction type, currently if customer is present or not present.                                | OBVRPInteractionTypes                                 |
| __ConsentId__ (1..1)               | `Data. ConsentId`               | Identifier for the Domestic VRP Consent that this payment is made under                                     | Max128Text                                            |
| __Initiation__ (1..1)              | `Data. Initiation`              | The parameters of the VRP consent that should remain unchanged for each payment under this VRP.             | OBDomesticVRPInitiation                               |
| __Instruction__ (1..1)             | `Data. Instruction`             | Specific instructions for this particular payment within the VRP consent                                    | [OBDomesticVRPInstruction](#OBDomesticVRPInstruction) |
| __Risk__ (1..1)                    | `Risk`                          | The risk block for this payment. This must match the risk block for the corresponding Domestic VRP consent. | OBRisk1                                               |

### OBDomesticVRPResponse

![OBDomesticVRPResponse](./images/OBDomesticVRPResponse.svg)

| Name                                  | Path                               | Definition                                                                                                                                                                                                   | Type                                                                                                                              |
|---------------------------------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| __Data__ (1..1)                       | `Data`                             |                                                                                                                                                                                                              |                                                                                                                                   |
| __DomesticVRPId__ (1..1)              | `Data. DomesticVRPId`              | OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource.                                                                                                       | Max40Text                                                                                                                         |
| __ConsentId__ (1..1)                  | `Data. ConsentId`                  | Identifier for the Domestic VRP Consent that this payment is made under                                                                                                                                      | Max128Text                                                                                                                        |
| __CreationDateTime__ (1..1)           | `Data. CreationDateTime`           | Date and time at which the message was created.                                                                                                                                                              | ISODateTime                                                                                                                       |
| __Status__ (1..1)                     | `Data. Status`                     | Specifies the status of the payment information group.                                                                                                                                                       | AcceptedCreditSettlementCompleted AcceptedWithoutPosting AcceptedSettlementCompleted AcceptedSettlementInProcess Pending Rejected |
| __StatusReason__ (0..1)               | `Data. StatusReason`               | Reason Code provided for the status of a VRP. To be documented in the Developer Portal.                                                                                                                      | OBVRPStatusReasonCode Namespaced enumeration                                                                                      |
| __StatusReasonDescription__ (0..1)    | `Data. StatusReasonDescription`    | Description related to provided Status/StatusReason.                                                                                                                                                         | Max256Text                                                                                                                        |
| __StatusUpdateDateTime__ (1..1)       | `Data. StatusUpdateDateTime`       | Date and time at which the resource status was updated.                                                                                                                                                      | ISODateTime                                                                                                                       |
| __ExpectedExecutionDateTime__ (0..1)  | `Data. ExpectedExecutionDateTime`  | Expected execution date and time for the payment resource.                                                                                                                                                   | ISODateTime                                                                                                                       |
| __ExpectedSettlementDateTime__ (0..1) | `Data. ExpectedSettlementDateTime` | Expected settlement date and time for the payment resource.                                                                                                                                                  | ISODateTime                                                                                                                       |
| __Refund__ (0..1)                     | `Data. Refund`                     | Unambiguous identification of the refund account to which a refund will be made as a result of the transaction. This object is populated only when `Data. ReadRefundAccount` is set to `Yes` in the consent. | OBDomesticRefundAccount1                                                                                                          |
| __Charges__ (0..n)                    | `Data. Charges`                    | Set of elements used to provide details of a charge for the payment initiation.                                                                                                                              | OBCharge2                                                                                                                         |
| __Initiation__ (1..1)                 | `Data. Initiation`                 | The parameters of the VRP consent that should remain unchanged for each payment under this VRP.                                                                                                              | OBDomesticVRPInitiation                                                                                                           |
| __Instruction__ (1..1)                | `Data. Instruction`                | Specific instructions for this particular payment within the VRP consent                                                                                                                                     | OBDomesticVRPInstruction                                                                                                          |
| __DebtorAccount__ (1..1)              | `Data.DebtorAccount`               | The approved DebtorAccount that the payment was made from.                                                                                                                                                   | OBCashAccountDebtorWithName                                                                                                       |

### OBDomesticVRPDetails

![OBDomesticVRPDetails](./images/OBDomesticVRPDetails.svg)

| Name |Path |Definition | Type |
| ---- |-----|---------- |------|
| __Data__ (1..1) | `Data`
| __PaymentStatus__ (0..*) | `Data. PaymentStatus`
| __PaymentTransactionId__ (1..1) | `Data. PaymentStatus. PaymentTransactionId` |Unique identifier for the transaction within an servicing institution. This identifier is both unique and immutable. |Max210Text|
| __Status__ (1..1) | `Data. PaymentStatus. Status` |Status of a transfer, as assigned by the transaction administrator. |Accepted AcceptedCancellationRequest AcceptedCreditSettlementCompleted AcceptedCustomerProfile AcceptedFundsChecked AcceptedSettlementCompleted AcceptedSettlementInProcess AcceptedTechnicalValidation AcceptedWithChange AcceptedWithoutPosting Cancelled NoCancellationProcess PartiallyAcceptedCancellationRequest PartiallyAcceptedTechnicalCorrect PaymentCancelled Pending PendingCancellationRequest Received Rejected RejectedCancellationRequest
| __StatusUpdateDateTime__ (1..1) | `Data. PaymentStatus. StatusUpdateDateTime` |Date and time at which the status was assigned to the transfer. |ISODateTime
| __StatusDetail__ (0..1) | `Data. PaymentStatus. StatusDetail` |Payment status details as per underlying Payment Rail.
| __LocalInstrument__ (0..1) | `Data. PaymentStatus. StatusDetail. LocalInstrument` |User community specific instrument.  Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level. |OBExternalLocalInstrument1Code|
| __Status__ (1..1) | `Data. PaymentStatus. StatusDetail. Status` |Status of a transfer, as assigned by the transaction administrator. |Max128Text|
| __StatusReason__ (0..1) | `Data. PaymentStatus. StatusDetail. StatusReason` |Reason Code provided for the status of a transfer. |Cancelled PendingFailingSettlement PendingSettlement Proprietary ProprietaryRejection Suspended Unmatched|
| __StatusReasonDescription__ (0..1) | `Data. PaymentStatus. StatusDetail. StatusReasonDescription` |Reason provided for the status of a transfer. |Max256Text

## Usage Examples

See [Usage Examples](../../references/usage-examples/vrp-usage-examples.md)
