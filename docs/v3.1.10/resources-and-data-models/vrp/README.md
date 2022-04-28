# VRP Resources and Data Models - v3.1.10 <!-- omit in toc -->

Resources accessed by VRPs are detailed here:
* [Domestic VRP Consents](domestic-vrp-consents.md)
* [Domestic VRPs](domestic-vrps.md)
* [Usage Examples](../../references/usage-examples/vrp-usage-examples.html)

  
## Endpoints

The API endpoints for these resources, and their mandatory/conditional/optional status are given below.

| Resource                                          |Endpoints                                                   |Mandatory?    |
| ------------------------------------------------- |------------------------------------------------------------|------------- |
|[domestic-vrp-consents.md](domestic-vrp-consents)  | POST /domestic-vrp-consents                                | Mandatory    |
|[domestic-vrp-consents.md](domestic-vrp-consents)  | GET /domestic-vrp-consents/{ConsentId}                     | Mandatory    |
|[domestic-vrp-consents.md](domestic-vrp-consents)  | DELETE /domestic-vrp-consents/{ConsentId}                  | Mandatory    |
|[domestic-vrp-consents.md](domestic-vrp-consents)  | POST /domestic-vrp-consents/{ConsentId}/funds-confirmation | Mandatory    |
|[domestic-vrps.md](domestic-vrps)                  | POST /domestic-vrps                                        | Conditional  |
|[domestic-vrps.md](domestic-vrp)                   | GET /domestic-vrps/{DomesticVRPId}                         | Conditional  |
|[domestic-vrps.md](domestic-vrp)                   | GET /domestic-vrps/{DomesticVRPId}/payment-details         | Optional     |


### Notes

Definitions for Mandatory, Conditional and Optional are given in the [Read/Write Data API Profile](../../profiles/read-write-data-api-profile.md#categorisation-of-implementation-requirements).


## VRP Resource Compatibility

New endpoints since v3.1.8. 