






<!DOCTYPE html>
<html>
    <head>
        <title>View Source</title>
        
- 
        <script>
window.WRM=window.WRM||{};window.WRM._unparsedData=window.WRM._unparsedData||{};window.WRM._unparsedErrors=window.WRM._unparsedErrors||{};
WRM._unparsedData["com.atlassian.plugins.atlassian-plugins-webresource-plugin:context-path.context-path"]="\"/wiki\"";
WRM._unparsedData["com.atlassian.plugins.atlassian-plugins-webresource-rest:curl.cross-origin-resources"]="false";
if(window.WRM._dataArrived)window.WRM._dataArrived();</script>

- 

- 

- 

- 

- 
<!--[if lte IE 9]>

- 
<![endif]-->

- 

- 

    </head>

    
        
&nbsp;
         







```TABLE START

---
| 



```TABLE START


---
| Resource


offers



---

---
| Endpoints



GET /accounts/{AccountId}/offers

GET /offers




---

---
| Mandatory?



Conditional

Optional




---

---
| SortOrder


09



---


```TABLE END







---

```TABLE END

<img class="editor-inline-macro" src="/wiki/plugins/servlet/confluence/placeholder/macro?definition=e3RvYzpvdXRsaW5lPXRydWV8c3R5bGU9bm9uZX0&amp;locale=en_GB&amp;version=2" data-macro-name="toc" data-macro-id="e85f4a0a-4196-4efb-aa41-b5a73b7ff369" data-macro-parameters="outline=true|style=none" data-macro-schema-version="1">

## Version Control

```TABLE START


---
| Version


Date


Author


Comments



---

---
| 3.1


 03 Dec 2018  


OB R/W API Team


This is the baseline version.



---

---
| 4.0-draft1


 18 Dec 2018  


OB R/W API Team


No changes.



---

---
| 4.0-draft7


 18 Mar 2019  


OB R/W API Team



- Replace `x-fapi-customer-last-logged-time` with `x-fapi-auth-date`

- Removed all references to `x-fapi-financial-id`




---

---
| 3.1.2-RC1


 10 Apr 2019  


OB R/W API Team



- Fixed Usage examples, for incorrect naming of Data.Offer element

- Release version renamed to 3.1.2




---


```TABLE END

## Endpoints

Endpoints for the resource and available methods.

```TABLE START


---
| 



Resource


HTTP Operation


Endpoint


Mandatory?


Scope


Grant Type


Idempotency Key


Parameters


Request Object


Response Object



---

---
| 1


offers


GET


GET /accounts/{AccountId}/offers


Conditional


accounts


Authorization Code


No












OBReadOffer1



---

---
| 2


offers


GET


GET /offers


Optional


accounts


Authorization Code


No



Pagination







OBReadOffer1



---


```TABLE END

### GET /accounts/{AccountId}/offers


An AISP  **may**  retrieve the offers resource for a specific AccountId (which is retrieved in the call to GET /accounts).

### GET /offers


If an ASPSP has implemented the bulk retrieval endpoints, an AISP  **may**  optionally retrieve the offers in bulk. 

This will retrieve the resources for all authorised accounts linked to the account-request.

## Data Model

The OBReadOffer1 object will be used for the call to: 

- GET /accounts/{AccountId}/offers

- GET /offers

### Resource Definition

A resource that contains a set of elements that describes the list of offers available to a specific account (AccountId).

- Generic features (and pricing) for the account product will be not be available via the  **offers**  resources. These generic features will be available via the  **product ** resource.

- The outcome of any offer (or product feature) uptake will not be reported via the  **offers**  resource. The benefits, interest, cash-back for any account will be available via the  **statements**  resource (if this is available to PSUs in the existing ASPSP online channel).

An account (AccountId) may have no offers available, or may have multiple offers available.

### UML Diagram

<img class="confluence-embedded-image" src="https://openbanking.atlassian.net/wiki/download/attachments/1077805674/OBReadOffer1.gif?version=1&amp;modificationDate=1556635343067&amp;cacheVersion=1&amp;api=v2" data-image-src="https://openbanking.atlassian.net/wiki/download/attachments/1077805674/OBReadOffer1.gif?version=1&amp;modificationDate=1556635343067&amp;cacheVersion=1&amp;api=v2" data-unresolved-comment-count="0" data-linked-resource-id="1077805681" data-linked-resource-version="1" data-linked-resource-type="attachment" data-linked-resource-default-alias="OBReadOffer1.gif" data-base-url="https://openbanking.atlassian.net/wiki" data-linked-resource-content-type="image/gif" data-linked-resource-container-id="1077805674" data-linked-resource-container-version="1" data-media-id="0dfe86c8-45ba-4cf1-8d31-2919710fb4f3" data-media-type="file" title="Developer Zone > Offers v3.1.2 > OBReadOffer1.gif" data-location="Developer Zone > Offers v3.1.2 > OBReadOffer1.gif" data-image-height="194" data-image-width="495">

Notes:

- Offers (or promotions) for a specific AccountId, which may be viewable in the ASPSP online banking interface, may have a complicated offer structure (which cannot be expressed using a flat Amount, Fee, Rate, or Value structure). In this case, the ASPSP must use the Description field to describe the nature of the offer in free-text

### Permission Codes

The resource requires the ReadOffers permission. The resource response payload does not differ depending on the permissions granted.

### Data Dictionary

```TABLE START
      

---
| Name


Occurrence


XPath


EnhancedDefinition


Class


Codes


Pattern



---

---
| 
OBReadOffer1










OBReadOffer1










OBReadOffer1
















---

---
| 
Data




1..1




OBReadOffer1/Data










OBReadDataOffer1
















---

---
| 
Offer




0..n




OBReadOffer1/Data/Offer










OBOffer1
















---

---
| 
AccountId




1..1




OBReadOffer1/Data/Offer/AccountId




A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.




Max40Text
















---

---
| 
OfferId




0..1




OBReadOffer1/Data/Offer/OfferId




A unique and immutable identifier used to identify the offer resource. This identifier has no meaning to the account owner.




Max40Text
















---

---
| 
OfferType




0..1




OBReadOffer1/Data/Offer/OfferType




Offer type, in a coded form.




OBExternalOfferType1Code




BalanceTransfer

LimitIncrease

MoneyTransfer

Other

PromotionalRate










---

---
| 
Description




0..1




OBReadOffer1/Data/Offer/Description




Further details of the offer.




Max500Text
















---

---
| 
StartDateTime




0..1




OBReadOffer1/Data/Offer/StartDateTime




Date and time at which the offer starts.




ISODateTime
















---

---
| 
EndDateTime




0..1




OBReadOffer1/Data/Offer/EndDateTime




Date and time at which the offer ends.




ISODateTime
















---

---
| 
Rate




0..1




OBReadOffer1/Data/Offer/Rate




Rate associated with the offer type.




Max10Text










^(-?\d{1,3}){1}(\.\d{1,4}){0,1}$




---

---
| 
Value




0..1




OBReadOffer1/Data/Offer/Value




Value associated with the offer type.




Number
















---

---
| 
Term




0..1




OBReadOffer1/Data/Offer/Term




Further details of the term of the offer.




Max500Text
















---

---
| 
URL




0..1




OBReadOffer1/Data/Offer/URL




URL (Uniform Resource Locator) where documentation on the offer can be found




Max256Text
















---

---
| 
Amount




0..1




OBReadOffer1/Data/Offer/Amount




Amount of money associated with the offer type.




OBActiveOrHistoricCurrencyAndAmount
















---

---
| 
Amount




1..1




OBReadOffer1/Data/Offer/Amount/Amount




A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.




OBActiveCurrencyAndAmount_SimpleType










^\d{1,13}\.\d{1,5}$




---

---
| 
Currency




1..1




OBReadOffer1/Data/Offer/Amount/Currency




A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".




ActiveOrHistoricCurrencyCode










^[A-Z]{3,3}$




---

---
| 
Fee




0..1




OBReadOffer1/Data/Offer/Fee




Fee associated with the offer type.




OBActiveOrHistoricCurrencyAndAmount
















---

---
| 
Amount




1..1




OBReadOffer1/Data/Offer/Fee/Amount




A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.




OBActiveCurrencyAndAmount_SimpleType










^\d{1,13}\.\d{1,5}$




---

---
| 
Currency




1..1




OBReadOffer1/Data/Offer/Fee/Currency




A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".




ActiveOrHistoricCurrencyCode










^[A-Z]{3,3}$




---


```TABLE END

## Usage Examples

### Specific Account










 **Request** 

```TABLE START

---
| 
GET /accounts/22289/offers HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json




---

```TABLE END










 **Response** 

```TABLE START

---
| 
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json

{
  "Data": {
    "Offer": [
      {
        "AccountId": "22289",
        "OfferId": "Offer1",
        "OfferType": "LimitIncrease",
        "Description": "Credit limit increase for the account up to £10000.00",
        "Amount": {
          "Amount": "10000.00",
          "Currency": "GBP"
        }
      },
      {
        "AccountId": "22289",
        "OfferId": "Offer2",
        "OfferType": "BalanceTransfer",
        "Description": "Balance transfer offer up to £2000",
        "Amount": {
          "Amount": "2000.00",
          "Currency": "GBP"
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/accounts/22289/offers/"
  },
  "Meta": {
    "TotalPages": 1
  }
}




---

```TABLE END













### Bulk










 **Request** 

```TABLE START

---
| 
GET /offers HTTP/1.1
Authorization: Bearer Az90SAOJklae
x-fapi-auth-date:  Sun, 10 Sep 2017 19:43:31 GMT
x-fapi-customer-ip-address: 104.25.212.99
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Accept: application/json




---

```TABLE END










 **Response** 

```TABLE START

---
| 
HTTP/1.1 200 OK
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
Content-Type: application/json

{
  "Data": {
    "Offer": [
      {
        "AccountId": "22289",
        "OfferId": "Offer1",
        "OfferType": "LimitIncrease",
        "Description": "Credit limit increase for the account up to £10000.00",
        "Amount": {
          "Amount": "10000.00",
          "Currency": "GBP"
        }
      },
      {
        "AccountId": "22289",
        "OfferId": "Offer2",
        "OfferType": "BalanceTransfer",
        "Description": "Balance transfer offer up to £2000",
        "Amount": {
          "Amount": "2000.00",
          "Currency": "GBP"
        }
      },
      {
        "AccountId": "32515",
        "OfferId": "Offer3",
        "OfferType": "LimitIncrease",
        "Description": "Credit limit increase for the account up to £50000.00",
        "Amount": {
          "Amount": "50000.00",
          "Currency": "GBP"
        }
      }
    ]
  },
  "Links": {
    "Self": "https://api.alphabank.com/open-banking/v3.1/aisp/offers/"
  },
  "Meta": {
    "TotalPages": 1
  }
}




---

```TABLE END











        
&nbsp;

    


