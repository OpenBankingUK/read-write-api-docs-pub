# Funds Confirmation

## Endpoints
| Resource |HTTP Operation |Endpoint |Mandatory ? |Scope |Grant Type |Message Signing |Idempotency Key |Request Object |Response Object |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
| funds-confirmation |POST |POST /funds-confirmations |Mandatory |fundsconfirmations |Authorization Code |No |No |OBFundsConfirmation1 |OBFundsConfirmationResponse1 |


### POST /funds-confirmations

If the CBPII would like to confirm funds with the ASPSP, it should create a new  **funds-confirmation** resource, and check the funds available flag in the response.

* The ASPSP creates the  **funds-confirmation**  resource and responds with a unique FundsConfirmationId to refer to the resource, and a flag confirming if funds are available.
* The CBPII **must**  use a token issued via an authorization code grant and specify the ConsentId in the request payload.
* This CBPII  **must**  use a currency of the account.

## Data Model

This data dictionary section gives the detail on the payload content.

### Funds Confirmation - Request

The OBFundsConfirmation1 object will be used for the following:

* Request to POST /funds-confirmations

#### UML Diagram

![OBFundsConfirmation1](images/OBFundsConfirmation1.gif)

Notes:

* Funds can only be confirmed against the currency of the account, ASPSP must reject the request when Amount is in a different currency than the currency of the underlying account.

#### Data Dictionary

| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBFundsConfirmation1 | |OBFundsConfirmation1 | |OBFundsConfirmation1 | | |
| Data |1..1 |OBFundsConfirmation1/Data | |OBFundsConfirmationData1 | | |
| ConsentId |1..1 |OBFundsConfirmation1/Data/ConsentId |Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource. |Max128Text | | |
| Reference |1..1 |OBFundsConfirmation1/Data/Reference |Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction. |Max35Text | | |
| InstructedAmount |1..1 |OBFundsConfirmation1/Data/InstructedAmount |Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBFundsConfirmation1/Data/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |^\d{1,13}\.\d{1,5}$ |
| Currency |1..1 |OBFundsConfirmation1/Data/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |


### Funds Confirmation - Response

The OBFundsConfirmationResponse1 object will be used for the following:

* Response to POST /funds-confirmations

#### UML Diagram

![OBFundsConfirmationResponse1](images/OBFundsConfirmationResponse1.gif)

Notes:

The OBFundsConfirmationResponse1 object contains the same information as the OBFundsConfirmation1, but with additional fields:

* FundsConfirmationId - to uniquely identify the funds-confirmation resource.
* FundsAvailable - to indicate the result of a confirmation of funds check.
* CreationDateTime - to indicate when the resource was created.

#### Data Dictionary
| Name |Occurrence |XPath |EnhancedDefinition |Class |Codes |Pattern |
| --- |--- |--- |--- |--- |--- |--- |
| OBFundsConfirmationResponse1 | |OBFundsConfirmationResponse1 | |OBFundsConfirmationResponse1 | | |
| Data |1..1 |OBFundsConfirmationResponse1/Data | |OBFundsConfirmationDataResponse1 | | |
| FundsConfirmationId |1..1 |OBFundsConfirmationResponse1/Data/FundsConfirmationId |Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation resource. |Max40Text | | |
| ConsentId |1..1 |OBFundsConfirmationResponse1/Data/ConsentId |Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource. |Max128Text | | |
| CreationDateTime |1..1 |OBFundsConfirmationResponse1/Data/CreationDateTime |Date and time at which the resource was created. |ISODateTime | | |
| FundsAvailable |1..1 |OBFundsConfirmationResponse1/Data/FundsAvailable |Flag to indicate the result of a confirmation of funds check. |xs:boolean | | |
| Reference |1..1 |OBFundsConfirmationResponse1/Data/Reference |Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction. |Max35Text | | |
| InstructedAmount |1..1 |OBFundsConfirmationResponse1/Data/InstructedAmount |Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency. |OBActiveOrHistoricCurrencyAndAmount | | |
| Amount |1..1 |OBFundsConfirmationResponse1/Data/InstructedAmount/Amount |A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217. |OBActiveCurrencyAndAmount_SimpleType | |^\d{1,13}\.\d{1,5}$ |
| Currency |1..1 |OBFundsConfirmationResponse1/Data/InstructedAmount/Currency |A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds". |ActiveOrHistoricCurrencyCode | |^[A-Z]{3,3}$ |
