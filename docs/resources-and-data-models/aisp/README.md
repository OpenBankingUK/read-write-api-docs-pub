# AISP Resources and Data Models - v3.1.7

Resources accessed using the aisp PSD2 role are detailed here:

* [Account Access Consents](../../accounts-and-transaction/account-access-consents.md)
* [Accounts](../../../docs/accounts-and-transaction/Accounts.md)
* [Balances](../../../docs/accounts-and-transaction/Balances.md)
* [Transactions](../../../docs/accounts-and-transaction/Transactions.md)
* [Beneficiaries](../../../docs/accounts-and-transaction/Beneficiaries.md)
* [Direct Debits](../../accounts-and-transaction/direct-debits.md)
* [Standing Orders](../../accounts-and-transaction/standing-orders.md)
* [Products](../../../docs/accounts-and-transaction/products/Products.md)
	* [BCA Product Data Model](../../accounts-and-transaction/products/bca-product-data-model.md)
	* [PCA Product Data Model](../../accounts-and-transaction/products/pca-product-data-model.md)
	* [Other Product Data Model](../../accounts-and-transaction/products/other-product-data-model.md)
* [Offers](Offers.md)
* [Parties](Parties.md)
* [Scheduled Payments](scheduled-payments.md)
* [Statements](Statements.md)

## Endpoints

The API endpoints for these resources, and their mandatory/conditional/optional status are given below.

| Resource |Endpoints |Mandatory? |
| --- |--- |---|
| [account-access-consents](./Account-Access-Consents.md) |POST /account-access-consents |Mandatory |
| [account-access-consents](./Account-Access-Consents.md) |GET /account-access-consents/{ConsentId} |Mandatory |
| [account-access-consents](./Account-Access-Consents.md) |DELETE /account-access-consents/{ConsentId} |Mandatory |
| [accounts](../../../docs/accounts-and-transaction/Accounts.md) |GET /accounts |Mandatory |
| [accounts](../../../docs/accounts-and-transaction/Accounts.md) |GET /accounts/{AccountId} |Mandatory |
| [balances](../../../docs/accounts-and-transaction/Balances.md) |GET /accounts/{AccountId}/balances |Mandatory |
| [balances](../../../docs/accounts-and-transaction/Balances.md) |GET /balances |Optional |
| [transactions](../../../docs/accounts-and-transaction/Transactions.md) |GET /accounts/{AccountId}/transactions |Mandatory |
| [transactions](../../../docs/accounts-and-transaction/Transactions.md) |GET /transactions |Optional |
| [beneficiaries](../../../docs/accounts-and-transaction/Beneficiaries.md) |GET /accounts/{AccountId}/beneficiaries |Conditional |
| [beneficiaries](../../../docs/accounts-and-transaction/Beneficiaries.md) |GET /beneficiaries |Optional |
| [direct-debits](./Direct-Debits.md) |GET /accounts/{AccountId}/direct-debits |Conditional |
| [direct-debits](./Direct-Debits.md) |GET /direct-debits |Optional |
| [standing-orders](./Standing-Orders.md) |GET /accounts/{AccountId}/standing-orders |Conditional |
| [standing-orders](./Standing-Orders.md) |GET /standing-orders |Optional |
| [products](../../../docs/accounts-and-transaction/products/Products.md) |GET /accounts/{AccountId}/product |Conditional |
| [products](../../../docs/accounts-and-transaction/products/Products.md) |GET /products |Optional |
| [offers](Offers.md) |GET /accounts/{AccountId}/offers |Conditional |
| [offers](Offers.md) |GET /offers |Optional |
| [parties](Parties.md) |GET /accounts/{AccountId}/parties |Conditional |
| [parties](Parties.md) |GET /accounts/{AccountId}/party |Conditional |
| [parties](Parties.md) |GET /party |Conditional |
| [scheduled-payments](./Scheduled-Payments.md) |GET /accounts/{AccountId}/scheduled-payments |Conditional |
| [scheduled-payments](./Scheduled-Payments.md) |GET /scheduled-payments |Optional |
| [statements](Statements.md) |GET /accounts/{AccountId}/statements |Conditional |
| [statements](Statements.md) |GET /accounts/{AccountId}/statements/{StatementId} |Conditional |
| [statements](Statements.md) |GET /accounts/{AccountId}/statements/{StatementId}/file |Optional |
| [statements](Statements.md) |GET /accounts/{AccountId}/statements/{StatementId}/transactions |Conditional |
| [statements](Statements.md) |GET /statements |Optional |

### Notes

Definitions for Mandatory, Conditional and Optional are given in the [Read/Write Data API Profile](../read-write-data-api-profile.md#categorisation-of-implementation-requirements).

## Account and Transactionns Resource Compatibility

|  | |Read-Write API Profile |Read-Write API Profile |Read-Write API Profile |Account and Transaction API Profile |Account and Transaction API Profile |Account and Transaction API Profile |
| --- |--- |--- |--- |--- |--- |--- |--- |
|  | |v3.1 |v3.1.1 |3.1.2 |v3.1 |v3.1.1 |3.1.2 |
| Account Access Consents |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Accounts |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Balances |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Beneficiaries |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Direct Debits |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Offers |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Parties |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Products |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Scheduled Payments |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Standing Orders |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Statements |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
| Transactions |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |
