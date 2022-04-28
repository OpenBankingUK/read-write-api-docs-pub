# CBPII Resources and Data Models - v3.1.10 <!-- omit in toc -->

Resources accessed by CBPIIs are detailed here:

* [Funds Confirmation Consent](funds-confirmation-consent.md)
* [Funds Confirmation](funds-confirmation.md)

## Endpoints

The API endpoints for these resources, and their mandatory/conditional/optional status are given below.

| Resource |Endpoints |Mandatory? |
| --- |--- |---|
| [funds-confirmation-consents](funds-confirmation-consent.md) |POST /funds-confirmation-consents |Mandatory |
| [funds-confirmation-consents](funds-confirmation-consent.md) |GET /funds-confirmation-consents/{ConsentId} |Mandatory |
| [funds-confirmation-consents](funds-confirmation-consent.md) |DELETE /funds-confirmation-consents/{ConsentId} |Mandatory |
| [funds-confirmations](funds-confirmation.md) |POST /funds-confirmations |Mandatory |

### Notes

Definitions for Mandatory, Conditional and Optional are given in the [Read/Write Data API Profile](../../profiles/read-write-data-api-profile.md#categorisation-of-implementation-requirements).

## Confirmation of Funds Resource Compatibility

|  | |Read-Write API Profile |Read-Write API Profile |Read-Write API Profile |Confirmation of Funds API Profile |Confirmation of Funds API Profile |Confirmation of Funds API Profile |
| --- |--- |--- |--- |--- |--- |--- |--- |
|  | |v3.1 |v3.1.1 |3.1.2 |v3.1 |v3.1.1 |3.1.2 |
| Funds Confirmation Consent |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Funds Confirmation |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
