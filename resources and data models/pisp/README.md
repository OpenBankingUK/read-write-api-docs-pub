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
| [domestic-payment-consents](domestic-payment-consents.md) |POST /domestic-payment-consents<br>GET /domestic-payment-consents/{ConsentId}<br>GET /domestic-payment-consents/{ConsentId}/funds-confirmation |Mandatory<br>Mandatory<br>Mandatory |
| [domestic-payments](domestic-payments.md) |POST /domestic-payments<br>GET /domestic-payments/{DomesticPaymentId}<br>GET /domestic-payments/{DomesticPaymentId}/payment-details |Mandatory<br>Mandatory<br>Optional |
| [domestic-scheduled-payment-consents](domestic-scheduled-payment-consents.md) |POST /domestic-scheduled-payment-consents<br>GET /domestic-scheduled-payment-consents/{ConsentId} |Conditional<br>Mandatory (if resource POST implemented) |
| [domestic-scheduled-payments](domestic-scheduled-payments.md) |POST /domestic-scheduled-payments<br>GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}<br>GET /domestic-scheduled-payments/{DomesticScheduledPaymentId}/payment-details |Conditional<br>Mandatory (if resource POST implemented)<br>Optional |
| [domestic-standing-order-consents](domestic-standing-order-consents.md) |POST /domestic-standing-order-consents<br>GET /domestic-standing-order-consents/{ConsentId} |Conditional<br>Mandatory (if resource POST implemented) |
| [domestic-standing-orders](domestic-standing-orders.md) |POST /domestic-standing-orders<br>GET /domestic-standing-orders/{DomesticStandingOrderId}<br>GET /domestic-standing-orders/{DomesticStandingOrderId}/payment-details |Conditional<br>Mandatory (if resource POST implemented)<br>Optional |
| [international-payment-consents](international-payment-consents.md) |POST /international-payment-consents<br>GET /international-payment-consents/{ConsentId}<br>GET /international-payment-consents/{ConsentId}/funds-confirmation |Conditional<br>Mandatory (if resource POST implemented)<br>Mandatory (if resource POST implemented) |
| [international-payments](international-payments.md) |POST /international-payments<br>GET /international-payments/{InternationalPaymentId}<br>GET /international-payments/{InternationalPaymentId}/payment-details |Conditional<br>Mandatory (if resource POST implemented)<br>Optional |
| [international-scheduled-payment-consents](international-scheduled-payment-consents.md) |POST /international-scheduled-payment-consents<br>GET /international-scheduled-payment-consents/{ConsentId}<br>GET /international-scheduled-payment-consents/{ConsentId}/funds-confirmation |Conditional<br>Mandatory (if resource POST implemented)<br>Mandatory (if resource POST implemented) |
| [international-scheduled-payments](international-scheduled-payments.md) |POST /international-scheduled-payments<br>GET /international-scheduled-payments/{InternationalScheduledPaymentId}<br>GET /international-scheduled-payments/{InternationalScheduledPaymentId}/payment-details |Conditional<br>Mandatory (if resource POST implemented)<br>Optional |
| [international-standing-order-consents](international-standing-order-consents.md) |POST /international-standing-order-consents<br>GET /international-standing-order-consents/{ConsentId} |Conditional<br>Mandatory (if resource POST implemented) |
| [international-standing-orders](international-standing-orders.md) |POST /international-standing-orders<br>GET /international-standing-orders/{InternationalStandingOrderPaymentId}<br>GET /international-standing-orders/{InternationalStandingOrderPaymentId}/payment-details |Conditional<br>Mandatory (if resource POST implemented)<br>Optional |
| [file-payment-consents](file-payment-consents.md) |POST /file-payment-consents<br>GET /file-payment-consents/{ConsentId}<br>POST /file-payment-consents/{ConsentId}/file<br>GET /file-payment-consents/{ConsentId}/file |Conditional<br>Conditional<br>Mandatory (if resource POST implemented) |<br>Conditional
| [file-payments](file-payments.md) |POST /file-payments<br>GET /file-payments/{FilePaymentId}<br>GET /file-payments/{FilePaymentId}/report-file<br>GET /file-payments/{FilePaymentId}/payment-details |Conditional<br>Mandatory (if resource POST implemented)<br>Conditional<br>Optional |

### Notes

Definitions for Mandatory, Conditional and Optional are given in the [Read/Write Data API Profile](../../profiles/read-write-data-api-profile.md#categorisation-of-implementation-requirements).