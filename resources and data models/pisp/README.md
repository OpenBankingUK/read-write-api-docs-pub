Resources accessed using the pisp PSD2 role are detailed here:

* [Domestic Payment Consents](domestic-payment-consents.md)
* [Domestic Payments](domestic-payments.md)
* [Domestic Scheduled Payment Consents](domestic-scheduled-payment-consents.md)
* [Domestic Scheduled Payments](domestic-scheduled-payments.md)
* [Domestic Standing Order Consents](domestic-standing-order-consents.md)
* [Domestic Standing Orders](domestic-standing-orders.md)
* [International Payment Consents](international-payment-consents.md)
* [International Payments](international-payments.md)
* [International Scheduled Payment Consents](international-scheduled-payment-consents.md)
* [International Scheduled Payments](international-scheduled-payments.md)
* [International Standing Order Consents](international-standing-order-consents.md)
* [International Standing Orders](international-standing-orders.md)

---

* [File Payments](File%20Payments.md)

---

## Endpoints

The API endpoints for these resources, and their mandatory/conditional/optional status are given below.

| Resource |Endpoints |Mandatory? |
| --- |--- |---|
| [domestic-payment-consents](domestic-payment-consents.md) |POST /domestic-payment-consents |Mandatory |
| [domestic-payment-consents](domestic-payment-consents.md) |GET /domestic-payment-consents/{ConsentId} |Mandatory |
| [domestic-payment-consents](domestic-payment-consents.md) |GET /domestic-payment-consents/{ConsentId}/funds-confirmation |Mandatory |
| [domestic-payments](domestic-payments.md) |POST /domestic-payments |Mandatory |
| [domestic-payments](domestic-payments.md) |GET /domestic-payments/{DomesticPaymentId} |Mandatory |
| [payment-details](domestic-payments.md) |GET /domestic-payments/{DomesticPaymentId}/payment-details |Optional |
| [domestic-scheduled-payment-consents](domestic-scheduled-payment-consents.md) |POST /domestic-scheduled-payment-consents |Conditional |
| [domestic-scheduled-payment-consents](domestic-scheduled-payment-consents.md) |GET /domestic-scheduled-payment-consents/{ConsentId} |Mandatory (if resource POST implemented) |
| [domestic-scheduled-payments](domestic-scheduled-payments.md) |POST /domestic-scheduled-payments |Conditional |
| [domestic-scheduled-payments](domestic-scheduled-payments.md) |GET /domestic-scheduled-payments/{DomesticScheduledPaymentId} |Mandatory (if resource POST implemented) |
| [payment-details](domestic-scheduled-payments.md) |GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details |Optional |
| [domestic-standing-order-consents](domestic-standing-order-consents.md) |POST /domestic-standing-order-consents |Conditional |
| [domestic-standing-order-consents](domestic-standing-order-consents.md) |GET /domestic-standing-order-consents/{ConsentId} |Mandatory (if resource POST implemented) |
| [domestic-standing-orders](domestic-standing-orders.md) |POST /domestic-standing-orders |Conditional |
| [domestic-standing-orders](domestic-standing-orders.md) |GET /domestic-standing-orders/{DomesticStandingOrderId} |Mandatory (if resource POST implemented) |
| [payment-details](domestic-standing-orders.md) |GET /domestic-standing-orders/{DomesticStandingOrderId}/payment-details |Optional |
| [international-payment-consents](international-payment-consents.md) |POST /international-payment-consents |Conditional |
| [international-payment-consents](international-payment-consents.md) |GET /international-payment-consents/{ConsentId} |Mandatory (if resource POST implemented) |
| [international-payment-consents](international-payment-consents.md) |GET /international-payment-consents/{ConsentId}/funds-confirmation |Mandatory (if resource POST implemented) |
| [international-payments](international-payments.md) |POST /international-payments |Conditional |
| [international-payments](international-payments.md) |GET /international-payments/{InternationalPaymentId} |Mandatory (if resource POST implemented) |
| [payment-details](international-payments.md) |GET /international-payments/{InternationalPaymentId}/payment-details |Optional |
| [international-scheduled-payment-consents](international-scheduled-payment-consents.md) |POST /international-scheduled-payment-consents |Conditional |
| [international-scheduled-payment-consents](international-scheduled-payment-consents.md) |GET /international-scheduled-payment-consents/{ConsentId} |Mandatory (if resource POST implemented) |
| [international-scheduled-payment-consents](international-scheduled-payment-consents.md) |GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation |Mandatory (if resource POST implemented) |
| [international-scheduled-payments](international-scheduled-payments.md) |POST /international-scheduled-payments |Conditional |
| [international-scheduled-payments](international-scheduled-payments.md) |GET /international-scheduled-payments/{InternationalScheduledPaymentId} |Mandatory (if resource POST implemented) |
| [payment-details](international-scheduled-payments.md) |GET /international-scheduled-payments/{InternationalScheduledPaymentId}/payment-details |Optional |
| [international-standing-order-consents](international-standing-order-consents.md) |POST /international-standing-order-consents |Conditional |
| [international-standing-order-consents](international-standing-order-consents.md) |GET /international-standing-order-consents/{ConsentId} |Mandatory (if resource POST implemented) |
| [international-standing-orders](international-standing-orders.md) |POST /international-standing-orders |Conditional |
| [international-standing-orders](international-standing-orders.md) |GET /international-standing-orders/{InternationalStandingOrderPaymentId} |Mandatory (if resource POST implemented) |
| [payment-details](international-standing-orders.md) |GET /international-standing-orders/{InternationalStandingOrderPaymentId}/payment-details |Optional |
| [file-payment-consents](file-payment-consents.md) |POST /file-payment-consents |Conditional |
| [file-payment-consents](file-payment-consents.md) |GET /file-payment-consents/{ConsentId} |Conditional |
| [file-payment-consents](file-payment-consents.md) |POST /file-payment-consents/{ConsentId}/file |Mandatory (if resource POST implemented) |
| [file-payment-consents](file-payment-consents.md) |GET /file-payment-consents/{ConsentId}/file |Conditional |
| [file-payments](file-payments.md) |POST /file-payments |Conditional |
| [file-payments](file-payments.md) |GET /file-payments/{FilePaymentId} |Mandatory (if resource POST implemented) |
| [file-payments](file-payments.md) |GET /file-payments/{FilePaymentId}/report-file |Conditional |
| [payment-details](file-payments.md) |GET /file-payments/{FilePaymentId}/payment-details |Optional |

### Notes

Definitions for Mandatory, Conditional and Optional are given in the [Read/Write Data API Profile](../../profiles/read-write-data-api-profile.md#categorisation-of-implementation-requirements).