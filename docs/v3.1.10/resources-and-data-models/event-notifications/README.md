# Event Notifications Resources and Data Models - v3.1.10 <!-- omit in toc -->

Resources for Event Notifications are detailed here:

* Event Subscriptions:
  * [Event Subscription](event-subscription.md)
  * [Callback URL](callback-url.md)
* Real Time Event Notification:
  * [Event Notifications](event-notifications.md)
* Aggregated Polling:
  * [Events](events.md)

## Endpoints

The API endpoints for these resources, and their mandatory/conditional/optional status are given below.

| Resource |Endpoints |Mandatory? |
| --- |--- |---|
| [event-subscription](event-subscription.md) |POST /event-subscriptions |Optional |
| [event-subscription](event-subscription.md) |GET /event-subscriptions |Mandatory (if resource POST implemented) |
| [event-subscription](event-subscription.md) |PUT /event-subscriptions/{EventSubscriptionId} |Mandatory (if resource POST implemented) |
| [event-subscription](event-subscription.md) |DELETE /event-subscriptions/{EventSubscriptionId} |Mandatory (if resource POST implemented) |
| [callback-url](callback-url.md) |POST /callback-urls |Optional |
| [callback-url](callback-url.md) |GET /callback-urls |Mandatory (if resource POST implemented) |
| [callback-url](callback-url.md) |PUT /callback-urls/{CallbackUrlId} |Mandatory (if resource POST implemented) |
| [callback-url](callback-url.md) |DELETE /callback-urls/{CallbackUrlId} |Mandatory (if resource POST implemented) |
| [event-notification](event-notifications.md) |POST /event-notifications |Optional |
| [events](events.md) |POST /events |Optional |

### Notes

Definitions for Mandatory, Conditional and Optional are given in the [Read/Write Data API Profile](../../profiles/read-write-data-api-profile.md#categorisation-of-implementation-requirements).

## Event Notification Resource Compatibility

|  | |Read-Write API Profile |Read-Write API Profile |Read-Write API Profile |Event Notification API Profile |Event Notification API Profile |Event Notification API Profile |Real Time Event Notification API Profile |Real Time Event Notification API Profile |Real Time Event Notification API Profile |Aggregated Polling API Profile |Aggregated Polling API Profile |Aggregated Polling API Profile |Event Notification Subscription API Profile |Event Notification Subscription API Profile |Event Notification Subscription API Profile |Callback URL API Profile |Callback URL API Profile |Callback URL API Profile |
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
|  | |v3.1 |v3.1.1 |3.1.2 |v3.1 |v3.1.1 |3.1.2 |v3.1 |v3.1.1 |3.1.2 |v3.1 |v3.1.1 |3.1.2 |v3.1 |v3.1.1 |3.1.2 |v3.1 |v3.1.1 |3.1.2 |
| Event Subscription |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |n/a | | |n/a | | |TRUE |TRUE |TRUE |n/a | | |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE | | | | | | |TRUE |TRUE |TRUE | | | |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE | | | | | | |TRUE |TRUE |TRUE | | | |
| Callback URL |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |n/a | | |n/a | | |n/a | | |TRUE |TRUE |TRUE |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE | | | | | | | | | |TRUE |TRUE |TRUE |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE | | | | | | | | | |TRUE |TRUE |TRUE |
| Event Notifications |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |n/a | | |n/a | | |n/a | | |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE | | | | | | | | | |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE | | | | | | | | | |
| Events |v3.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE |n/a | | |TRUE |TRUE |TRUE |n/a | | |n/a | | |
|  |v3.1.1 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE | | | |TRUE |TRUE |TRUE | | | | | | |
|  |v3.1.2 |TRUE |TRUE |TRUE |TRUE |TRUE |TRUE | | | |TRUE |TRUE |TRUE | | | | | | |
