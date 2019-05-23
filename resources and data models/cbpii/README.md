# CBPII Resources and Data Models

Resources accessed by CBPIIs are detailed here:

* [Funds Confirmation Consent](funds-confirmation-consent.md)
* [Funds Confirmation](funds-confirmation.md)

## Endpoints

The API endpoints for these resources, and their mandatory/conditional/optional status are given below.

| Resource |Endpoints |Mandatory? |
| --- |--- |--- |
| [funds-confirmation-consents](funds-confirmation-consent.md) |POST /funds-confirmation-consents<br>GET /funds-confirmation-consents/{ConsentId}<br>DELETE /funds-confirmation-consents/{ConsentId} |Mandatory<br>Mandatory<br>Mandatory |
| [funds-confirmations](funds-confirmation.md) |POST /funds-confirmations |Mandatory |

Definitions for Mandatory, Conditional and Optional are given in the [Read/Write Data API Profile](../../profiles/read-write-data-api-profile.md#categorisation-of-implementation-requirements).