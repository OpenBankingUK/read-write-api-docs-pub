<ac:layout>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
<br/>

            <ac:structured-macro ac:name="details" ac:schema-version="1"
                                 ac:macro-id="74ab54c9-0540-477a-9f4f-2e5ede59029d">
                <ac:parameter ac:name="hidden">true</ac:parameter>
                <ac:rich-text-body>
<br/>

                    
```TABLE START

                        
                            
                            
                        

                        x
                        
---
| 
                            Resource



                            
domestic-payment-consents

                                
domestic-payment-consents

                                
domestic-payment-consents

                                
domestic-payments

                                
domestic-payments

                                
payment-details




                        
---

                        
---
| 
                            Endpoints



                            
POST /domestic-payment-consents

                                
GET /domestic-payment-consents/{ConsentId}

                                

                                    GET /domestic-payment-consents/{ConsentId}/funds-confirmation
                                

                                
POST /domestic-payments

                                
GET /domestic-payments/{DomesticPaymentId}

                                
GET /domestic-payments/{DomesticPaymentId}/payment-details
                                




                        
---

                        
---
| 
                            Mandatory?



                            
Mandatory

                                
Mandatory

                                
Mandatory

                                
Mandatory

                                
Mandatory

                                
Optional




                        
---

                        
---
| 
                            SortOrder



                            01



                        
---

                        

                    
```TABLE END

                    
<br/>
</ac:rich-text-body>
            </ac:structured-macro>
            

                <ac:structured-macro ac:name="toc" ac:schema-version="1"
                                     ac:macro-id="3181eb94-0159-4a16-a4b2-ed6cd8033318">
                    <ac:parameter ac:name="outline">true</ac:parameter>
                </ac:structured-macro>
            

            
# 
                <ac:inline-comment-marker ac:ref="19d03b39-edf8-426a-8f5a-f294705741c3">Version Control
                </ac:inline-comment-marker>
            

            
```TABLE START

                
                    
                    
                    
                    
                

                
                
---
| 
                    Version



                    Date



                    Author



                    Comments



                
---

                
---
| 
                    3.1



                    
                          
                    



                    OB R/W API Team



                    This is the baseline version.



                
---

                
---
| 
                    4.0-draft1



                    
                          
                    



                    OB R/W API Team



                    No changes.



                
---

                
---
| 
                    4.0-draft6



                    
                          
                    



                    OB R/W API Team



                    
v4.0-draft6 changes:

                        
                            
- Added AcceptedCreditSettlementCompleted enumeration value&nbsp; in&nbsp;OBTransactionIndividualStatus1Code

                            
- Added Payment Status details endpoint, Data Model, and underlying Status enumerations
                            

                            
- Updated Account Name definition.

                        
                    



                
---

                
---
| 
                    4.0-draft7



                    
                          
                    



                    OB R/W API Team



                    
v4.0-draft7 changes:

                        
                            
- Payment Status details Data Model: changed the cardinality between Data and
                                PaymentStatus from 1..unbounded to 0..Unbounded
                            

                            
- Deleted the "AcceptedCreditSettlementCompleted to Rejected&quot; flow from the
                                Payment Order Status diagram
                            

                            
- Added SCASupportData element to Domestic Payment Consent, to enable PISPs to provide
                                Supporting Data, when requesting SCA Exemption
                            

                            
- Changes for alignment with FAPI Implementer's Draft 2<br/>
                                
                                    
- Replace references of `x-fapi-customer-last-logged-time` to `x-fapi-auth-date`
                                    

                                    
- Remove references of x-fapi-financial-id

                                
                            

                        
                    



                
---

                
---
| 
                    v4.0-RC1



                    
                          
                    



                    OB R/W API Team



                    
v4.0-RC1 changes:

                        
                            
- Replaced reference to Mapping to Schemes and Standards section with Domestic
                                Payment Message Formats page.
                            

                        
                    



                
---

                

            
```TABLE END

            
# Endpoints

            
```TABLE START

                
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                

                
                
---
| 
                    Resource



                    HTTP Operation



                    Endpoint



                    Mandatory ?



                    Scope



                    Grant Type



                    Message Signing



                    Idempotency Key



                    Request Object



                    Response Object



                
---

                
---
| 
                    domestic-payment-consents



                    POST



                    POST /domestic-payment-consents



                    Mandatory



                    payments



                    Client Credentials



                    
Signed Request

                        
Signed Response




                    Yes



                    OBWriteDomesticConsent3



                    OBWriteDomesticConsentResponse3



                
---

                
---
| 
                    domestic-payment-consents



                    GET



                    GET /domestic-payment-consents/{ConsentId}



                    Mandatory



                    payments



                    
Client Credentials




                    Signed Response



                    No



                    NA



                    OBWriteDomesticConsentResponse3



                
---

                
---
| 
                    domestic-payment-consents



                    GET



                    GET /domestic-payment-consents/{ConsentId}/funds-confirmation



                    Mandatory



                    payments



                    Authorization Code



                    Signed Response



                    No



                    NA



                    OBWriteFundsConfirmationResponse1



                
---

                
---
| 
                    domestic-payments



                    POST



                    POST /domestic-payments



                    Mandatory



                    payments



                    Authorization Code



                    
Signed Request

                        
Signed Response




                    Yes



                    OBWriteDomestic2



                    OBWriteDomesticResponse2



                
---

                
---
| 
                    domestic-payments



                    GET



                    GET /domestic-payments/{DomesticPaymentId}



                    Mandatory



                    payments



                    
Client Credentials




                    Signed Response



                    No



                    NA



                    OBWriteDomesticResponse2



                
---

                
---
| 
                    payment-details



                    GET



                    GET /domestic-payments/{DomesticPaymentId}/payment-details
                    



                    Optional



                    payments



                    Client Credentials



                    Signed Response



                    No



                    NA



                    OBWritePaymentDetailsResponse1



                
---

                

            
```TABLE END

            
## POST /domestic-payment-consents 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="bbcbf706-e2c6-4d2a-a3d3-4a3f6ba2936b">
                <ac:parameter ac:name="language">text</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="firstline">1</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payment-consents]]></ac:plain-text-body>
            </ac:structured-macro>
            

                <ac:inline-comment-marker ac:ref="5f42a169-2eac-4ef3-aab9-76f103e2de49">The API endpoint allows the PISP
                    to ask an ASPSP to create a new
                </ac:inline-comment-marker>
                 **
                    <ac:inline-comment-marker ac:ref="5f42a169-2eac-4ef3-aab9-76f103e2de49">domestic-payment-consent
                    </ac:inline-comment-marker>
                ** 
                <ac:inline-comment-marker ac:ref="5f42a169-2eac-4ef3-aab9-76f103e2de49"> resource.
                </ac:inline-comment-marker>
            

            
                
- 
                    <ac:inline-comment-marker ac:ref="a5452acb-ddc8-41dc-bd2d-6969a92677ae">The POST action
                    </ac:inline-comment-marker>
                    indicates to the ASPSP that a domestic payment consent has been staged. At this point, the PSU may
                    not have been identified by the ASPSP, and the request payload may not contain any information of
                    the account that should be debited.
                

                
- The endpoint allows the PISP to send a copy of the consent (between PSU and PISP) to the ASPSP for
                    the PSU to authorise.
                

                
- The ASPSP creates the  **domestic-payment-consent**  resource and responds with a
                    unique ConsentId to refer to the resource.
                

            
            
### Status

            
The default Status is "AwaitingAuthorisation&quot; immediately after the domestic-payment-consent
                has been created.

            
```TABLE START

                
                    
                

                
                
---
| 
                    Status



                
---

                
---
| 
                    AwaitingAuthorisation



                
---

                

            
```TABLE END

            
## GET /domestic-payment-consents/{ConsentId}

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="8f7d84a3-9020-4ae0-9762-3b3c395e333e">
                <ac:parameter ac:name="language">text</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="firstline">1</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[GET /domestic-payment-consents/{ConsentId}]]></ac:plain-text-body>
            </ac:structured-macro>
            
A PISP can optionally retrieve a payment consent resource that they have created to check its
                status. 

            
### Status

            
Once the PSU authorises the payment-consent resource - the Status of the&nbsp;payment-consent
                resource will be updated with "Authorised&quot;.

            
If the PSU rejects the consent or the domestic-payment-consent has failed some other ASPSP validation,
                the Status will be set to "Rejected&quot;.

            
Once a domestic-payment has been successfully created using the domestic-payment-consent, the Status of
                the domestic-payment-consent will be set to "Consumed&quot;.

            
The available status codes for the domestic-payment-consent resource are:

            
```TABLE START

                
                    
                

                
                
---
| 
                    Status



                
---

                
---
| 
                    AwaitingAuthorisation



                
---

                
---
| 
                    Rejected



                
---

                
---
| 
                    Authorised



                
---

                
---
| 
                    Consumed



                
---

                

            
```TABLE END

            
## GET /domestic-payment-consents/{ConsentId}/funds-confirmation

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="c95a7dba-76e3-4308-8be6-8fb1a5f1623b">
                <ac:parameter ac:name="language">text</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="firstline">1</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[GET /domestic-payment-consents/{ConsentId}/funds-confirmation]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
The API endpoint allows the PISP to ask an ASPSP to confirm funds on a  **domestic-payment-consent** 
                resource.

            
                
- An ASPSP can only respond to a funds confirmation request if the  **domestic-payment-consent ** resource
                    has an `Authorised` status. If the status is not `Authorised`, an ASPSP
                     **must**  respond with a 400 (Bad Request) and a `UK.OBIE.Resource.InvalidConsentStatus`&nbsp;error
                    code.
                

                
- Confirmation of funds requests do not affect the status of the  **domestic-payment-consent&nbsp;** resource.
                

            
            
## POST /domestic-payments

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="c4b9a325-e3b3-4b57-9df3-f6aee93d3240">
                <ac:parameter ac:name="language">text</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="firstline">1</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payments]]></ac:plain-text-body>
            </ac:structured-macro>
            
Once the domestic-payment-consent has been authorised by the PSU, the PISP can proceed to submitting the
                domestic-payment for processing:

            
                
- This is done by making a POST request to the  **domestic-payments**  endpoint.

                
- This request is an instruction to the ASPSP to begin the domestic single immediate payment
                    journey. The domestic payment must be submitted immediately, however, there are some scenarios where
                    the domestic payment may not be executed immediately (e.g., busy periods at the ASPSP).
                

                
- The PISP  **must&nbsp;** ensure that the Initiation and Risk sections of the
                    domestic-payment match the corresponding Initiation and Risk sections of the
                    domestic-payment-consent resource. If the two do not match, the ASPSP  **must not** 
                    process the request and  **must&nbsp;** respond with a 400 (Bad Request).
                

                
- Any operations on the domestic-payment resource will not result in a status change for the&nbsp;domestic-payment
                    resource.
                

            
            
### Status

            
A domestic-payment can only be created if its corresponding&nbsp;domestic-payment-consent resource
                has the status of "Authorised&quot;. 

            
The domestic-payment resource that is created successfully must have one of the following&nbsp;PaymentStatusCode
                code-set enumerations:

            
```TABLE START

                
                    
                

                
                
---
| 
                    Status



                
---

                
---
| 
                    Pending



                
---

                
---
| 
                    Rejected



                
---

                
---
| 
                    AcceptedSettlementInProcess 



                
---

                
---
| 
                    AcceptedSettlementCompleted



                
---

                
---
| 
                    AcceptedWithoutPosting



                
---

                
---
| 
                    AcceptedCreditSettlementCompleted



                
---

                

            
```TABLE END

            
## GET /domestic-payments/{DomesticPaymentId}

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="85e8e4a8-e792-42bd-b85f-b6c591bde75f">
                <ac:parameter ac:name="language">text</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="firstline">1</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[GET /domestic-payments/{DomesticPaymentId}]]></ac:plain-text-body>
            </ac:structured-macro>
            
A PISP can retrieve the domestic-payment to check its status.

            
### Status

            
The domestic-payment resource must have one of the following&nbsp;PaymentStatusCode code-set
                enumerations:

            
```TABLE START

                
                    
                

                
                
---
| 
                    Status



                
---

                
---
| 
                    Pending



                
---

                
---
| 
                    Rejected



                
---

                
---
| 
                    AcceptedSettlementInProcess 



                
---

                
---
| 
                    AcceptedSettlementCompleted



                
---

                
---
| 
                    AcceptedWithoutPosting



                
---

                
---
| 
                    AcceptedCreditSettlementCompleted



                
---

                

            
```TABLE END

            
## GET /domestic-payments/{DomesticPaymentId}/payment-details

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="6ab4f90b-d453-4388-8d38-d6cd0a01cd95">
                <ac:parameter ac:name="language">text</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="firstline">1</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[GET /domestic-payments/{DomesticPaymentId}/payment-details]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
A PISP can retrieve the Details of the underlying payment transaction via this endpoint. This resource
                allows ASPSPs to return richer list of Payment Statuses, and if available payment scheme related
                statuses.

            
### Status

            
The domestic-payment - payment-details must have one of the following&nbsp;PaymentStatusCode
                code-set enumerations:

            
```TABLE START

                
                    
                

                
                
---
| 
                    Status



                
---

                
---
| 
                    Accepted



                
---

                
---
| 
                    AcceptedCancellationRequest



                
---

                
---
| 
                    AcceptedTechnicalValidation



                
---

                
---
| 
                    AcceptedCustomerProfile



                
---

                
---
| 
                    AcceptedFundsChecked



                
---

                
---
| 
                    AcceptedWithChange



                
---

                
---
| 
                    Pending



                
---

                
---
| 
                    Rejected



                
---

                
---
| 
                    AcceptedSettlementInProcess 



                
---

                
---
| 
                    AcceptedSettlementCompleted



                
---

                
---
| 
                    AcceptedWithoutPosting



                
---

                
---
| 
                    AcceptedCreditSettlementCompleted



                
---

                
---
| 
                    Cancelled



                
---

                
---
| 
                    NoCancellationProcess



                
---

                
---
| 
                    PartiallyAcceptedCancellationRequest



                
---

                
---
| 
                    PartiallyAcceptedTechnicalCorrect



                
---

                
---
| 
                    PaymentCancelled



                
---

                
---
| 
                    PendingCancellationRequest



                
---

                
---
| 
                    Received



                
---

                
---
| 
                    RejectedCancellationRequest



                
---

                

            
```TABLE END

            
## State Model

            
### Payment Order Consent

            
The state model for the domestic-payment-consent resource follows the generic consent state model.
                However, does not use the "Revoked&quot; status, as the consent for a domestic-payment is not a
                long-lived consent.

            
<br/>

            

                <ac:image ac:width="1000">
                    <ri:attachment ri:filename="image2018-5-18_10-24-21.png" ri:version-at-save="1"/>
                </ac:image>
            

            
<br/>

            
The definitions for the Status:

            
```TABLE START

                
                    
                    
                    
                

                
                
---
| 
                    <br/>



                    Status



                    Status Description



                
---

                
---
| 
                    1



                    AwaitingAuthorisation



                    The consent resource is awaiting PSU authorisation.
                    



                
---

                
---
| 
                    2



                    Rejected



                    The consent resource has been rejected.
                    



                
---

                
---
| 
                    3



                    Authorised 



                    The consent resource has been successfully authorised.



                
---

                
---
| 
                    4



                    Consumed



                    The consented action has been successfully completed. This does not reflect the
                        status of the consented action.
                    



                
---

                

            
```TABLE END

            
### Payment Order

            
The state model for the domestic-payment resource follows the behaviour and definitions for the ISO 20022
                PaymentStatusCode code-set.

            

                <ac:image ac:width="1000">
                    <ri:attachment ri:filename="PaymentStatusLifeCycle.png" ri:version-at-save="1"/>
                </ac:image>
            

            
<br/>

            
The definitions for the status:

            
```TABLE START

                
                    
                    
                    
                

                
                
---
| 
                    <br/>



                    Status



                    Payment Status Description



                
---

                
---
| 
                    1



                    Pending



                    Payment initiation or individual transaction included in the payment initiation is
                        pending.  Further checks and status update will be performed.
                    



                
---

                
---
| 
                    2



                    Rejected



                    Payment initiation or individual transaction included in the payment initiation has
                        been rejected.
                    



                
---

                
---
| 
                    3



                    AcceptedSettlementInProcess 



                    All preceding checks such as technical validation and customer profile were
                        successful and therefore the payment initiation has been accepted for execution.
                    



                
---

                
---
| 
                    4



                    AcceptedSettlementCompleted



                    Settlement on the debtor's account has been completed. 



                
---

                
---
| 
                    5



                    AcceptedWithoutPosting



                    Payment instruction included in the credit transfer is accepted without being posted to the creditor customer&rsquo;s account.
                    



                
---

                
---
| 
                    6



                    AcceptedCreditSettlementCompleted



                    Settlement on the creditor's account has been completed.
                    



                
---

                

            
```TABLE END

            
#### Multiple Authorisation

            
If the payment-order requires multiple authorisations - the Status of the multiple authorisations will be
                updated in the MultiAuthorisation object.

            

                <ac:image ac:width="1000">
                    <ri:attachment ri:filename="image2018-6-29_16-36-34.png" ri:version-at-save="1"/>
                </ac:image>
            

            
<br/>

            
The definitions for the status:

            
```TABLE START

                
                    
                    
                    
                

                
                
---
| 
                    <br/>



                    Status



                    Status Description



                
---

                
---
| 
                    1



                    AwaitingFurtherAuthorisation



                    The payment-order resource is awaiting further authorisation.
                    



                
---

                
---
| 
                    2



                    Rejected



                    The payment-order resource has been rejected by an authoriser.
                    



                
---

                
---
| 
                    3



                    Authorised 



                    The payment-order
                        resource has been successfully authorised by all required authorisers.
                    



                
---

                

            
```TABLE END

            
# Data Model

            
The data dictionary section gives the detail on the payload content for the Domestic Payment API
                flows.

            
## Reused Classes

            
### OBDomestic2

            
This section describes the
                <ac:inline-comment-marker ac:ref="4ac4ccd0-0111-40be-8bde-981404f9184d">OBDomestic2
                </ac:inline-comment-marker>
                class which is reused as the Initiation object in the domestic-payment-consent and domestic-payment
                resources.
            

            
#### UML
                <ac:inline-comment-marker ac:ref="41e6f785-2fe1-475b-8cef-d655041ccc0e">Diagram
                </ac:inline-comment-marker>
            

            

                <ac:image ac:width="450">
                    <ri:attachment ri:filename="OBDomestic2.gif" ri:version-at-save="1"/>
                </ac:image>
            

            
####  **Notes** 

            
For the OBDomestic2 Initiation object:&nbsp;&nbsp;

            
                
- All elements in the Initiation payload that are specified by the PISP must not be changed via the
                    ASPSP as this is part of formal consent from the PSU.
                

                
- 
If the ASPSP is able to establish a problem with payload or any contextual error during the API
                    call, the ASPSP must reject the domestic-payment-consent request immediately.


                
- 
If the ASPSP establishes a problem with the domestic-payment-consent after the API call, the
                    ASPSP must set the status of the domestic-payment-consent resource to Rejected.


                
- DebtorAccount is  **optional** &nbsp;as the PISP may not know the account
                    identification details for the PSU.
                

                
- If the DebtorAccount is specified by the PISP and is invalid for the PSU, then the&nbsp;domestic-payment-consent
                    will be set to Rejected after PSU authentication.
                

                
- Account Identification field usage:
                    
                        
- Where "UK.OBIE.SortCodeAccountNumber&quot; is
                            specified as the SchemeName in the Account identification section (either DebtorAccount or
                            CreditorAccount), the Identification field  **must**  be populated with the 6
                            digit Sort Code and 8 digit Account Number (a 14 digit field).
                        

                        
- Where the "UK.OBIE.IBAN&quot; is specified as the SchemeName in the Account
                            identification section (either DebtorAccount or CreditorAccount), the Identification field
                             **must**  be populated with the full IBAN.
                        

                    
                

                
- The element Reference has been renamed from CreditorReferenceInformation as this is the unique ISO
                    20022 element used in pain.001, rather than an ISO 20022 message component.
                

                
- As a merchant may be initiating a payment via a PISP two identifiers are included in the payload: 
                    
- InstructionIdentification is uniquely generated by the PISP. The expectation is that this is
                        unique indefinitely across all time periods. The PISP can ensure that this is
                        indefinitely unique by including a date or date-time element to the field, or by inserting a
                        unique Id. 
                    

                    
- EndToEndIdentification is uniquely generated by the merchant.

                
                

                
- Neither the InstructionIdentification nor&nbsp;EndToEndIdentification will be used as the&nbsp;domestic-payment-consent
                    resource identifier (ConsentId) as the ConsentId  **must**  be uniquely generated by
                    the ASPSP.
                

                
- LocalInstrument is the requested payment scheme for execution. This is a free-text field.

                
- Design decisions for the Initiation section of the payload and how this maps to the ISO 20022
                    messaging standard are articulated in the Domestic Payment Message Formats page.
                

            
            
#### Data Dictionary

            
```TABLE START

                
                    
                    
                    
                    
                    
                    
                    
                

                
                
---
| 
                    Name



                    Occurrence



                    XPath



                    EnhancedDefinition



                    Class



                    Codes



                    Pattern



                
---

                
---
| 
                    
OBDomestic2




                    
<br/>




                    
OBDomestic2




                    
The Initiation payload is sent by the initiating party to the ASPSP. It is used
                        to request movement of funds from the debtor account to a creditor for a single domestic
                        payment.




                    
OBDomestic2




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
InstructionIdentification




                    
1..1




                    
OBDomestic2/InstructionIdentification




                    
Unique identification as assigned by an instructing party for an instructed party to
                        unambiguously identify the instruction.

                        
<br/>

                        
Usage: the  instruction identification is a point to point reference that can be used
                            between the instructing party and the instructed party to refer to the individual
                            instruction. It can be included in several messages related to the instruction.




                    
Max35Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
EndToEndIdentification




                    
1..1




                    
OBDomestic2/EndToEndIdentification




                    
Unique identification assigned by the initiating party to unambiguously identify the
                        transaction. This identification is passed on, unchanged, throughout the entire end-to-end
                        chain.

                        
<br/>

                        
Usage: The end-to-end identification can be used for reconciliation or to link tasks relating
                            to the transaction. It can be included in several messages related to the transaction.

                        
OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification
                            field.




                    
Max35Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
LocalInstrument




                    
0..1




                    
OBDomestic2/LocalInstrument




                    
User community specific instrument.

                        
<br/>

                        
Usage: This element is used to specify a local instrument, local clearing option and/or
                            further qualify the service or service level.




                    
OBExternalLocalInstrument1Code




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
InstructedAmount




                    
1..1




                    
OBDomestic2/InstructedAmount




                    
Amount of money to be moved between the debtor and creditor, before deduction of charges,
                        expressed in the currency as ordered by the initiating party.

                        
<br/>

                        
Usage: This amount has to be transported unchanged through the transaction chain.




                    
OBActiveOrHistoricCurrencyAndAmount




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
Amount




                    
1..1




                    
OBDomestic2/InstructedAmount/Amount




                    
A number of monetary units specified in an active currency where the unit of currency is
                        explicit and compliant with ISO 4217.




                    
OBActiveCurrencyAndAmount_SimpleType




                    
<br/>




                    
^\d{1,13}\.\d{1,5}$




                
---

                
---
| 
                    
Currency




                    
1..1




                    
OBDomestic2/InstructedAmount/Currency




                    
A code allocated to a currency by a Maintenance Agency under an international identification
                        scheme, as described in the latest edition of the international standard ISO 4217 "Codes
                        for the representation of currencies and funds".




                    
ActiveOrHistoricCurrencyCode




                    
<br/>




                    
^[A-Z]{3,3}$




                
---

                
---
| 
                    
DebtorAccount




                    
0..1




                    
OBDomestic2/DebtorAccount




                    
Unambiguous identification of the account of the debtor to which a debit entry will be made
                        as a result of the transaction.




                    
OBCashAccountDebtor4




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
SchemeName




                    
1..1




                    
OBDomestic2/DebtorAccount/SchemeName




                    
Name of the identification scheme, in a coded form as published in an external list.




                    
OBExternalAccountIdentification4Code




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
Identification




                    
1..1




                    
OBDomestic2/DebtorAccount/Identification




                    
Identification assigned by an institution to identify an account. This identification is
                        known by the account owner.




                    
Max256Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
Name




                    
0..1




                    
OBDomestic2/DebtorAccount/Name




                    
The account name is the name or names of the account owner(s) represented at an account
                        level, as displayed by the ASPSP's online channels.

                        
Note, the account name is not the product name or the nickname of the account.




                    
Max70Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
SecondaryIdentification




                    
0..1




                    
OBDomestic2/DebtorAccount/SecondaryIdentification




                    
This is secondary identification of the account, as assigned by the account servicing
                        institution.

                        
This can be used by building societies to additionally identify accounts with a roll number
                            (in addition to a sort code and account number combination).




                    
Max34Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
CreditorAccount




                    
1..1




                    
OBDomestic2/CreditorAccount




                    
Unambiguous identification of the account of the creditor to which a credit entry will be
                        posted as a result of the payment transaction.




                    
OBCashAccountCreditor3




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
SchemeName




                    
1..1




                    
OBDomestic2/CreditorAccount/SchemeName




                    
Name of the identification scheme, in a coded form as published in an external list.




                    
OBExternalAccountIdentification4Code




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
Identification




                    
1..1




                    
OBDomestic2/CreditorAccount/Identification




                    
Identification assigned by an institution to identify an account. This identification is
                        known by the account owner.




                    
Max256Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
Name




                    
1..1




                    
OBDomestic2/CreditorAccount/Name




                    
The account name is the name or names of the account owner(s) represented at an account
                        level.

                        
Note, the account name is not the product name or the nickname of the account.

                        
OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not
                            mandatory.




                    
Max70Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
SecondaryIdentification




                    
0..1




                    
OBDomestic2/CreditorAccount/SecondaryIdentification




                    
This is secondary identification of the account, as assigned by the account servicing
                        institution.

                        
This can be used by building societies to additionally identify accounts with a roll number
                            (in addition to a sort code and account number combination).




                    
Max34Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
CreditorPostalAddress




                    
0..1




                    
OBDomestic2/CreditorPostalAddress




                    
Information that locates and identifies a specific address, as defined by postal
                        services.




                    
OBPostalAddress6




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
AddressType




                    
0..1




                    
OBDomestic2/CreditorPostalAddress/AddressType




                    
Identifies the nature of the postal address.




                    
OBAddressTypeCode




                    
Business

                        
Correspondence

                        
DeliveryTo

                        
MailTo

                        
POBox

                        
Postal

                        
Residential

                        
Statement




                    
<br/>




                
---

                
---
| 
                    
Department




                    
0..1




                    
OBDomestic2/CreditorPostalAddress/Department




                    
Identification of a division of a large organisation or building.




                    
Max70Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
SubDepartment




                    
0..1




                    
OBDomestic2/CreditorPostalAddress/SubDepartment




                    
Identification of a sub-division of a large organisation or building.




                    
Max70Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
StreetName




                    
0..1




                    
OBDomestic2/CreditorPostalAddress/StreetName




                    
Name of a street or thoroughfare.




                    
Max70Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
BuildingNumber




                    
0..1




                    
OBDomestic2/CreditorPostalAddress/BuildingNumber




                    
Number that identifies the position of a building on a street.




                    
Max16Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
PostCode




                    
0..1




                    
OBDomestic2/CreditorPostalAddress/PostCode




                    
Identifier consisting of a group of letters and/or numbers that is added to a postal address
                        to assist the sorting of mail.




                    
Max16Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
TownName




                    
0..1




                    
OBDomestic2/CreditorPostalAddress/TownName




                    
Name of a built-up area, with defined boundaries, and a local government.




                    
Max35Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
CountrySubDivision




                    
0..1




                    
OBDomestic2/CreditorPostalAddress/CountrySubDivision




                    
Identifies a subdivision of a country such as state, region, county.




                    
Max35Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
Country




                    
0..1




                    
OBDomestic2/CreditorPostalAddress/Country




                    
Nation with its own government.




                    
CountryCode




                    
<br/>




                    
^[A-Z]{2,2}$




                
---

                
---
| 
                    
AddressLine




                    
0..7




                    
OBDomestic2/CreditorPostalAddress/AddressLine




                    
Information that locates and identifies a specific address, as defined by postal services,
                        presented in free format text.




                    
Max70Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
RemittanceInformation




                    
0..1




                    
OBDomestic2/RemittanceInformation




                    
Information supplied to enable the matching of an entry with the items that the transfer is
                        intended to settle, such as commercial invoices in an accounts' receivable system.




                    
OBRemittanceInformation1




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
Unstructured




                    
0..1




                    
OBDomestic2/RemittanceInformation/Unstructured




                    
Information supplied to enable the matching/reconciliation of an entry with the items that
                        the payment is intended to settle, such as commercial invoices in an accounts' receivable
                        system, in an unstructured form.




                    
Max140Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
Reference




                    
0..1




                    
OBDomestic2/RemittanceInformation/Reference




                    
Unique reference, as assigned by the creditor, to unambiguously refer to the payment
                        transaction.

                        
<br/>

                        
Usage: If available, the initiating party should provide this reference in the structured
                            remittance information, to enable reconciliation by the creditor upon receipt of the amount
                            of money.

                        
<br/>

                        
If the business context requires the use of a creditor reference or a payment remit
                            identification, and only one identifier can be passed through the end-to-end chain, the
                            creditor's reference or payment remittance identification should be quoted in the end-to-end
                            transaction identification.

                        
OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation
                            field - which is where this ISO field will be mapped.




                    
Max35Text




                    
<br/>




                    
<br/>




                
---

                
---
| 
                    
SupplementaryData




                    
0..1




                    
OBDomestic2/SupplementaryData




                    
Additional information that can not be captured in the structured fields and/or any other
                        specific block.




                    
OBSupplementaryData1




                    
<br/>




                    
<br/>




                
---

                

            
```TABLE END

            
## Domestic Payment Consent - Request

            
The OBWriteDomesticConsent3 object will be used for the call to:

            
                
- POST /domestic-payment-consents

            
            
### UML Diagram

            

                <ac:image>
                    <ri:attachment ri:filename="OBWriteDomesticConsent3.gif" ri:version-at-save="1"/>
                </ac:image>
            

            
###  **Notes** 

            
The domestic-payment-consent  **request** &nbsp;contains these objects:

            
                
- Initiation

                
- Authorisation

                
- SCASupportData

                
- Risk.

            
            
### Data Dictionary

            
```TABLE START

                
                    
                    
                    
                    
                    
                    
                    
                

                
                
---
| 
                    Name



                    Occurrence



                    XPath



                    EnhancedDefinition



                    Class



                    Codes



                    Pattern



                
---

                
---
| 
                    OBWriteDomesticConsent3



                    OBWriteDomesticConsent3



                    <br/>



                    <br/>



                    OBWriteDomesticConsent3



                    <br/>



                    <br/>



                
---

                
---
| 
                    Data



                    1..1



                    OBWriteDomesticConsent3/Data



                    <br/>



                    OBWriteDataDomesticConsent3



                    <br/>



                    <br/>



                
---

                
---
| 
                    Initiation



                    1..1



                    OBWriteDomesticConsent3/Data/Initiation



                    The Initiation payload is sent by the initiating party to the ASPSP. It is used to request
                        movement of funds from the debtor account to a creditor for a single domestic payment.
                    



                    OBDomestic2



                    <br/>



                    <br/>



                
---

                
---
| 
                    Authorisation



                    0..1



                    OBWriteDomesticConsent3/Data/Authorisation



                    The authorisation type request from the TPP.



                    OBAuthorisation1



                    <br/>



                    <br/>



                
---

                
---
| 
                    SCASupportData



                    0..1



                    OBWriteDomesticConsent3/Data/SCASupportData



                    Supporting Data provided by TPP, when requesting SCA Exemption.



                    OBSCASupportData1



                    <br/>



                    <br/>



                
---

                

            
```TABLE END

            
## Domestic Payment Consent -&nbsp;Response

            
The OBWriteDomesticConsentResponse3 object will be used for a response to a call to:

            
                
- POST /domestic-payment-consents

                
- GET /domestic-payment-consents/{ConsentId}

            
            
### UML Diagram

            

                <ac:image>
                    <ri:attachment ri:filename="OBWriteDomesticConsentResponse3.gif" ri:version-at-save="1"/>
                </ac:image>
            

            
###  **Notes** 

            
The
                domestic-payment-consent  **response** &nbsp;contains the full&nbsp; **original** 
                payload from the domestic-payment-consent&nbsp; **request,** &nbsp;with the additional
                elements below:

            
                
- ConsentId.

                
- CreationDateTime the domestic-payment-consent resource was created.

                
- Status and StatusUpdateDateTime of the domestic-payment-consent resource.

                
- CutOffDateTime Behaviour is explained in Payment Initiation API Specification, Section - Payment
                    Restrictions -&gt; CutOffDateTime API Behaviour.
                

                
- ExpectedExecutionDateTime for the <span
                        style="color: rgb(0,0,0);">domestic<span
                        style="color: rgb(0,0,0);">-payment
                    resource if created before CutOffDateTIme - the expected DateTime the payment is executed against
                    the Debtor Account. If populated, the ASPSP must update the value with any changes (e.g., after
                    PSU authorisation).
                

                
- ExpectedSettlementDateTime for the <span
                        style="color: rgb(0,0,0);">domestic<span
                        style="color: rgb(0,0,0);">-payment
                    resource if created before CutOffDateTIme - the expected DateTime the payment will be received at
                    the Creditor Account. If populated, the ASPSP must update the value with any changes (e.g.,
                    after PSU authorisation).
                

                
- Charges array for the breakdown of applicable ASPSP charges.

            
            
### Data Dictionary

            
```TABLE START

                
                    
                    
                    
                    
                    
                    
                    
                

                
                
---
| 
                    Name



                    Occurrence



                    XPath



                    EnhancedDefinition



                    Class



                    Codes



                    Pattern



                
---

                
---
| 
                    OBWriteDomesticConsentResponse3



                    <br/>



                    OBWriteDomesticConsentResponse3



                    <br/>



                    OBWriteDomesticConsentResponse3



                    <br/>



                    <br/>



                
---

                
---
| 
                    Data



                    1..1



                    OBWriteDomesticConsentResponse3/Data



                    <br/>



                    OBWriteDataDomesticConsentResponse3



                    <br/>



                    <br/>



                
---

                
---
| 
                    ConsentId



                    1..1



                    OBWriteDomesticConsentResponse3/Data/ConsentId



                    OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
                    



                    Max128Text



                    <br/>



                    <br/>



                
---

                
---
| 
                    CreationDateTime



                    1..1



                    OBWriteDomesticConsentResponse3/Data/CreationDateTime



                    Date and time at which the resource was created.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    Status



                    1..1



                    OBWriteDomesticConsentResponse3/Data/Status



                    Specifies the status of consent resource in code form.



                    OBExternalConsentStatus1Code



                    Authorised<br/>AwaitingAuthorisation<br/>Consumed<br/>Rejected



                    <br/>



                
---

                
---
| 
                    StatusUpdateDateTime



                    1..1



                    OBWriteDomesticConsentResponse3/Data/StatusUpdateDateTime



                    Date and time at which the resource status was updated.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    CutOffDateTime



                    0..1



                    OBWriteDomesticConsentResponse3/Data/CutOffDateTime



                    Specified cut-off date and time for the payment consent.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    ExpectedExecutionDateTime



                    0..1



                    OBWriteDomesticConsentResponse3/Data/ExpectedExecutionDateTime



                    Expected execution date and time for the payment resource.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    ExpectedSettlementDateTime



                    0..1



                    OBWriteDomesticConsentResponse3/Data/ExpectedSettlementDateTime



                    Expected settlement date and time for the payment resource.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    Charges



                    0..n



                    OBWriteDomesticConsentResponse3/Data/Charges



                    Set of elements used to provide details of a charge for the payment initiation.



                    OBCharge2



                    <br/>



                    <br/>



                
---

                
---
| 
                    Initiation



                    1..1



                    OBWriteDomesticConsentResponse3/Data/Initiation



                    The Initiation payload is sent by the initiating party to the ASPSP. It is used to request
                        movement of funds from the debtor account to a creditor for a single domestic payment.
                    



                    OBDomestic2



                    <br/>



                    <br/>



                
---

                
---
| 
                    Authorisation



                    0..1



                    OBWriteDomesticConsentResponse3/Data/Authorisation



                    The authorisation type request from the TPP.



                    OBAuthorisation1



                    <br/>



                    <br/>



                
---

                
---
| 
                    SCASupportData



                    0..1



                    OBWriteDomesticConsentResponse3/Data/SCASupportData



                    Supporting Data provided by TPP, when requesting SCA Exemption.



                    OBSCASupportData1



                    <br/>



                    <br/>



                
---

                
---
| 
                    Risk



                    1..1



                    OBWriteDomesticConsentResponse3/Risk



                    The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional
                        details for risk scoring for Payments.
                    



                    OBRisk1



                    <br/>



                    <br/>



                
---

                

            
```TABLE END

            
## Domestic Payment Consent Confirmation of Funds - Response

            
The OBWriteFundsConfirmationResponse1 object will be used for a response to a call to:

            
                
- GET /domestic-payment-consents/{ConsentId}/funds-confirmation

            
            
### UML Diagram

            

                <ac:image>
                    <ri:attachment ri:filename="OBWriteConfirmFundsResponse1.gif" ri:version-at-save="1"/>
                </ac:image>
            

            
###  **Notes** 

            
The confirmation of funds response&nbsp;contains the result of a funds availability&nbsp;check, or SupplementaryData.
            

            
### Data Dictionary

            
```TABLE START

                
                    
                    
                    
                    
                    
                    
                    
                

                
                
---
| 
                    Name



                    Occurrence



                    XPath



                    EnhancedDefinition



                    Class



                    Codes



                    Pattern



                
---

                
---
| 
                    OBWriteFundsConfirmationResponse1



                    <br/>



                    OBWriteFundsConfirmationResponse1



                    <br/>



                    OBWriteFundsConfirmationResponse1



                    <br/>



                    <br/>



                
---

                
---
| 
                    Data



                    1..1



                    OBWriteFundsConfirmationResponse1/Data



                    <br/>



                    OBWriteDataFundsConfirmationResponse1



                    <br/>



                    <br/>



                
---

                
---
| 
                    FundsAvailableResult



                    0..1



                    OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult



                    Result of a funds availability check.



                    OBFundsAvailableResult1



                    <br/>



                    <br/>



                
---

                
---
| 
                    FundsAvailableDateTime



                    1..1



                    OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailableDateTime



                    Date and time at which the funds availability check was generated.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    FundsAvailable



                    1..1



                    OBWriteFundsConfirmationResponse1/Data/FundsAvailableResult/FundsAvailable



                    Flag to indicate the availability of funds given the Amount in the consent request.



                    xs:boolean



                    <br/>



                    <br/>



                
---

                
---
| 
                    SupplementaryData



                    0..1



                    OBWriteFundsConfirmationResponse1/Data/SupplementaryData



                    Additional information that can not be captured in the structured fields and/or any
                        other specific block.
                    



                    OBSupplementaryData1



                    <br/>



                    <br/>



                
---

                

            
```TABLE END

            
## Domestic Payment -&nbsp;Request

            
The OBWriteDomestic2 object will be used for a call to:

            
                
- POST /domestic-payments

            
            
### UML Diagram

            

                <ac:image ac:width="900">
                    <ri:attachment ri:filename="OBWriteDomestic2.gif" ri:version-at-save="1"/>
                </ac:image>
            

            
###  **Notes** 

            
The domestic-payment  **request**  object contains the: 

            
                
- ConsentId.

                
- The full Initiation and Risk objects from the domestic-payment-consent<span
                        style="color: rgb(0,0,0);"> request.
                

            
            
The  **Initiation ** and ** Risk** &nbsp;sections of the&nbsp;<span
                    style="color: rgb(0,0,0);">domestic-payment request  **must**  match the&nbsp; **Initiation ** and ** Risk&nbsp;** sections of the corresponding&nbsp;<span
                    style="color: rgb(0,0,0);">domestic-payment-consent request.

            
### Data Dictionary

            
```TABLE START

                
                    
                    
                    
                    
                    
                    
                    
                

                
                
---
| 
                    Name



                    Occurrence



                    XPath



                    EnhancedDefinition



                    Class



                    Codes



                    Pattern



                
---

                
---
| 
                    OBWriteDomestic2



                    <br/>



                    OBWriteDomestic2



                    <br/>



                    OBWriteDomestic2



                    <br/>



                    <br/>



                
---

                
---
| 
                    Data



                    1..1



                    OBWriteDomestic2/Data



                    <br/>



                    OBWriteDataDomestic2



                    <br/>



                    <br/>



                
---

                
---
| 
                    ConsentId



                    1..1



                    OBWriteDomestic2/Data/ConsentId



                    OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
                    



                    Max128Text



                    <br/>



                    <br/>



                
---

                
---
| 
                    Initiation



                    1..1



                    OBWriteDomestic2/Data/Initiation



                    The Initiation payload is sent by the initiating party to the ASPSP. It is used to request
                        movement of funds from the debtor account to a creditor for a single domestic payment.
                    



                    OBDomestic2



                    <br/>



                    <br/>



                
---

                
---
| 
                    Risk



                    1..1



                    OBWriteDomestic2/Risk



                    The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional
                        details for risk scoring for Payments.
                    



                    OBRisk1



                    <br/>



                    <br/>



                
---

                

            
```TABLE END

            
## Domestic Payment -&nbsp;Response

            
The OBWriteDomesticResponse2 object will be used for a response to a call to:

            
                
- POST /domestic-payments

                
- GET /domestic-payments/{DomesticPaymentId}

            
            
### UML Diagram

            

                <ac:image>
                    <ri:attachment ri:filename="OBWriteDataDomesticResponse3.png" ri:version-at-save="1"/>
                </ac:image>
            

            
###  **Notes** 

            
The domestic-payment  **response** &nbsp;object contains the:&nbsp;

            
                
- DomesticPaymentId.

                
- ConsentId.

                
- CreationDateTime the domestic-payment resource was created.

                
- Status and StatusUpdateDateTime of the domestic-payment resource.

                
- ExpectedExecutionDateTime for the <span
                        style="color: rgb(0,0,0);">domestic<span
                        style="color: rgb(0,0,0);">-payment
                    resource.
                

                
- ExpectedSettlementDateTime for the <span
                        style="color: rgb(0,0,0);">domestic<span
                        style="color: rgb(0,0,0);">-payment
                    resource.
                

                
- Charges array for the breakdown of applicable ASPSP charges.

                
- The Initiation object from the domestic<span
                        style="color: rgb(0,0,0);">-payment-consent.
                

                
- <span
                        style="color: rgb(0,0,0);"><span
                        style="color: rgb(0,0,0);">The MultiAuthorisation object if the <span
                        style="color: rgb(0,0,0);">domestic<span
                        style="color: rgb(0,0,0);">-payment resource requires multiple authorisations.
                

            
            
### Data Dictionary

            
```TABLE START

                
                    
                    
                    
                    
                    
                    
                    
                

                
                
---
| 
                    Name



                    Occurrence



                    XPath



                    EnhancedDefinition



                    Class



                    Codes



                    Pattern



                
---

                
---
| 
                    OBWriteDomesticResponse3



                    <br/>



                    OBWriteDomesticResponse3



                    <br/>



                    OBWriteDomesticResponse3



                    <br/>



                    <br/>



                
---

                
---
| 
                    Data



                    1..1



                    OBWriteDomesticResponse3/Data



                    <br/>



                    OBWriteDataDomesticResponse3



                    <br/>



                    <br/>



                
---

                
---
| 
                    DomesticPaymentId



                    1..1



                    OBWriteDomesticResponse3/Data/DomesticPaymentId



                    OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment
                        resource.
                    



                    Max40Text



                    <br/>



                    <br/>



                
---

                
---
| 
                    ConsentId



                    1..1



                    OBWriteDomesticResponse3/Data/ConsentId



                    OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
                    



                    Max128Text



                    <br/>



                    <br/>



                
---

                
---
| 
                    CreationDateTime



                    1..1



                    OBWriteDomesticResponse3/Data/CreationDateTime



                    Date and time at which the message was created.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    Status



                    1..1



                    OBWriteDomesticResponse3/Data/Status



                    Specifies the status of the payment information group.



                    OBTransactionIndividualStatus1Code



                    
AcceptedCreditSettlementCompleted

                        
AcceptedWithoutPosting

                        
AcceptedSettlementCompleted<br/>AcceptedSettlementInProcess<br/>Pending<br/>Rejected




                    <br/>



                
---

                
---
| 
                    StatusUpdateDateTime



                    1..1



                    OBWriteDomesticResponse3/Data/StatusUpdateDateTime



                    Date and time at which the resource status was updated.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    ExpectedExecutionDateTime



                    0..1



                    OBWriteDomesticResponse3/Data/ExpectedExecutionDateTime



                    Expected execution date and time for the payment resource.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    ExpectedSettlementDateTime



                    0..1



                    OBWriteDomesticResponse3/Data/ExpectedSettlementDateTime



                    Expected settlement date and time for the payment resource.



                    ISODateTime



                    <br/>



                    <br/>



                
---

                
---
| 
                    Charges



                    0..n



                    OBWriteDomesticResponse3/Data/Charges



                    Set of elements used to provide details of a charge for the payment initiation.



                    OBCharge2



                    <br/>



                    <br/>



                
---

                
---
| 
                    Initiation



                    1..1



                    OBWriteDomesticResponse3/Data/Initiation



                    The Initiation payload is sent by the initiating party to the ASPSP. It is used to request
                        movement of funds from the debtor account to a creditor for a single domestic payment.
                    



                    OBDomestic2



                    <br/>



                    <br/>



                
---

                
---
| 
                    MultiAuthorisation



                    0..1



                    OBWriteDomesticResponse3/Data/MultiAuthorisation



                    The multiple authorisation flow response from the ASPSP.



                    OBMultiAuthorisation1



                    <br/>



                    <br/>



                
---

                

            
```TABLE END

            
## Domestic Payment Order - Payment Details - Response

            
The OBWritePaymentDetailsResponse1&nbsp;object will be used for a response to a call to:

            
                
- GET /domestic-payments/{DomesticPaymentId}/payment-details

            
            
### UML Diagram

            

                <ac:image>
                    <ri:attachment ri:filename="OBWritePaymentDetailsResponse1.png" ri:version-at-save="1"/>
                </ac:image>
            

            
### Data Dictionary

            
```TABLE START

                
                    
                    
                    
                    
                    
                    
                    
                

                
                
---
| 
                    Name



                    Occurrence



                    XPath



                    EnhancedDefinition



                    Class



                    Codes



                    Pattern



                
---

                
---
| 
                    OBWritePaymentDetailsResponse1



                    <br/>



                    OBWritePaymentDetailsResponse1



                    <br/>



                    OBWritePaymentDetailsResponse1



                    <br/>



                    <br/>



                
---

                
---
| 
                    Data



                    1..1



                    OBWritePaymentDetailsResponse1/Data



                    <br/>



                    OBWriteDataPaymentOrderStatusResponse1



                    <br/>



                    <br/>



                
---

                
---
| 
                    PaymentStatus



                    0..unbounded



                    OBWritePaymentDetailsResponse1/Data/PaymentStatus



                    Payment status details.



                    OBWritePaymentDetails1



                    <br/>



                    <br/>



                
---

                

            
```TABLE END

            
# Usage Examples
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
## Merchant Initiation via PISP

            
This example set of flows and payload examples are for a domestic payment initiated by a merchant via a
                PISP.

            
In this scenario:

            
                
- The merchant has  **not ** specified the Debtor Account details for the PSU. The&nbsp;PSU
                    will select their account during the authorisation of consent.
                

                
- The merchant's account is a building society account with a roll number specified in the
                    SecondaryIdentification field.
                

            
            
### Sequence Diagram

            

                <ac:image>
                    <ri:url ri:value="https://openbanking.atlassian.net/wiki/download/thumbnails/352190840/MerchantDomesticPaymentUsageExample-3.png?version=1&amp;modificationDate=1528363757177&amp;cacheVersion=1&amp;api=v2&amp;width=1000"/>
                </ac:image>
            

            
<br/>

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="b4680fc1-ace8-469d-b547-21aa00f0b1e1">
                <ac:parameter ac:name="title">Usage Examples - Merchant</ac:parameter>
                <ac:parameter ac:name="collapse">true</ac:parameter>
                <ac:plain-text-body><![CDATA[participant PSU
                    participant Merchant
                    participant PISP
                    participant ASPSP Authorisation Server
                    participant ASPSP Resource Server

                    note over PSU, ASPSP Resource Server
                    Step 1: Agree Domestic Payment-Order Initiation
                    end note
                    PSU -> Merchant: Check-out and pay
                    Merchant -> PISP: Send request to setup domestic payment consent

                    note over PSU, ASPSP Resource Server
                    Step 2: Setup Domestic Payment-Order Consent
                    end note
                    PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
                    ASPSP Authorisation Server -> PISP: access-token
                    PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Resource Server: POST /domestic-payment-consents
                    ASPSP Resource Server -> PISP: HTTP 201 (Created), ConsentId
                    PISP -> Merchant: HTTP 302 (Found), Redirect (ConsentId)
                    Merchant -> PSU: HTTP 302 (Found), Redirect (ConsentId)

                    note over PSU, ASPSP Resource Server
                    Step 3: Authorize consent
                    end note
                    PSU -> ASPSP Authorisation Server: Follow redirect (ConsentId)
                    PSU <-> ASPSP Authorisation Server: authenticate
                    PSU <-> ASPSP Authorisation Server: SCA if required
                    PSU <-> ASPSP Authorisation Server: Select debtor account
                    ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (authorization-code)
                    PSU -> PISP: Follow redirect (authorization-code)
                    PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
                    ASPSP Authorisation Server -> PISP: access-token
                    PISP -> PSU: HTTP 302 (Found), Redirect back to merchant
                    PSU -> Merchant: Follow redirect

                    note over PSU, ASPSP Resource Server
                    Step 4: Create Domestic Payment-Order
                    end note
                    PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Resource Server: POST /domestic-payments
                    ASPSP Resource Server -> PISP: HTTP 201 (Created), DomesticPaymentId

                    note over PSU, ASPSP Resource Server
                    Step 5: Get Domestic Payment-Order status
                    end note
                    opt
                    Merchant -> PISP: Check payment status
                    PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Resource Server: GET /domestic-payments/{DomesticPaymentId}
                    ASPSP Resource Server -> PISP: HTTP 200 (OK), domestic-payments resource
                    PISP -> Merchant: HTTP 200 (OK), Return domestic-payments Status

                    end opt

                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
### Illustrative Interactions

            
Notes:

            
                
- As per the Security &amp; Access Control section, examples are given where the call to GET  **must**  use
                    a client credentials grant to obtain a token to make GET requests.
                

            
        </ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
#### Create Domestic Payment Order Consent
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **POST /domestic-payment-consents request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="d38134cb-fc01-4b05-8cd8-45cc2f1ff2a0">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Request Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payment-consents HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-idempotency-key: FRESCO.21302.GFX.20
                    x-jws-signature:
                    TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json
                    Accept: application/json

                    {
                    "Data": {
                    "Initiation": {
                    "InstructionIdentification": "ACME412",
                    "EndToEndIdentification": "FRESCO.21302.GFX.20",
                    "InstructedAmount": {
                    "Amount": "165.88",
                    "Currency": "GBP"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "ACME Inc",
                    "SecondaryIdentification": "0002"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-101",
                    "Unstructured": "Internal ops code 5120101"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "EcommerceGoods",
                    "MerchantCategoryCode": "5967",
                    "MerchantCustomerIdentification": "053598653254",
                    "DeliveryAddress": {
                    "AddressLine": [
                    "Flat 7",
                    "Acacia Lodge"
                    ],
                    "StreetName": "Acacia Avenue",
                    "BuildingNumber": "27",
                    "PostCode": "GU31 2ZZ",
                    "TownName": "Sparsholt",
                    "CountySubDivision": [
                    "Wessex"
                    ],
                    "Country": "UK"
                    }
                    }
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **POST /domestic-payment-consents response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="b34a4050-2798-4986-8fdb-a6ff1d429405">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 201 Created
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "ConsentId": "58923",
                    "Status": "AwaitingAuthorisation",
                    "CreationDateTime": "2017-06-05T15:15:13+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ACME412",
                    "EndToEndIdentification": "FRESCO.21302.GFX.20",
                    "InstructedAmount": {
                    "Amount": "165.88",
                    "Currency": "GBP"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "ACME Inc",
                    "SecondaryIdentification": "0002"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-101",
                    "Unstructured": "Internal ops code 5120101"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "EcommerceGoods",
                    "MerchantCategoryCode": "5967",
                    "MerchantCustomerIdentification": "053598653254",
                    "DeliveryAddress": {
                    "AddressLine": [
                    "Flat 7",
                    "Acacia Lodge"
                    ],
                    "StreetName": "Acacia Avenue",
                    "BuildingNumber": "27",
                    "PostCode": "GU31 2ZZ",
                    "TownName": "Sparsholt",
                    "CountySubDivision": [
                    "Wessex"
                    ],
                    "Country": "UK"
                    }
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/58923"
                    },
                    "Meta": {}
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
#### Confirm Funds on Domestic Payment Order Consent
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **GET /domestic-payment-consents/{ConsentId}/funds-confirmation
            Request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="f49bae6c-bfe7-4ba8-86cc-535316243c10">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Request Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[GET /domestic-payment-consents/58923/funds-confirmation HTTP/1.1
                    Authorization: Bearer Jhingapulaav
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Accept: application/json

                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **GET
            /domestic-payment-consents/{ConsentId}/funds-confirmation Response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="555d1a54-8a57-4579-bef2-28f60be81ff1">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 200 OK
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "FundsAvailableResult": {
                    "FundsAvailableDateTime": "2017-06-05T15:15:23+00:00",
                    "FundsAvailable": true
                    }
                    },
                    "Links": {
                    "Self":
                    "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/58923/funds-confirmation"
                    },
                    "Meta": {}
                    }]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
#### Create Domestic Payment Order
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **POST /domestic-payments Request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="9318fea6-8597-4895-bcc2-5b8d1dddfcbe">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Request Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payments HTTP/1.1
                    Authorization: Bearer Jhingapulaav
                    x-idempotency-key: FRESNO.1317.GFX.22
                    x-jws-signature:
                    TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json
                    Accept: application/json

                    {
                    "Data": {
                    "ConsentId": "58923",
                    "Initiation": {
                    "InstructionIdentification": "ACME412",
                    "EndToEndIdentification": "FRESCO.21302.GFX.20",
                    "InstructedAmount": {
                    "Amount": "165.88",
                    "Currency": "GBP"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "ACME Inc",
                    "SecondaryIdentification": "0002"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-101",
                    "Unstructured": "Internal ops code 5120101"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "EcommerceGoods",
                    "MerchantCategoryCode": "5967",
                    "MerchantCustomerIdentification": "053598653254",
                    "DeliveryAddress": {
                    "AddressLine": [
                    "Flat 7",
                    "Acacia Lodge"
                    ],
                    "StreetName": "Acacia Avenue",
                    "BuildingNumber": "27",
                    "PostCode": "GU31 2ZZ",
                    "TownName": "Sparsholt",
                    "CountySubDivision": [
                    "Wessex"
                    ],
                    "Country": "UK"
                    }
                    }
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **POST /domestic-payments Response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="adf60e19-d737-4264-95fa-371c71b2740b">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 201 Created
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "DomesticPaymentId": "58923-001",
                    "ConsentId": "58923",
                    "Status": "AcceptedSettlementInProcess",
                    "CreationDateTime": "2017-06-05T15:15:22+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ACME412",
                    "EndToEndIdentification": "FRESCO.21302.GFX.20",
                    "InstructedAmount": {
                    "Amount": "165.88",
                    "Currency": "GBP"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "ACME Inc",
                    "SecondaryIdentification": "0002"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-101",
                    "Unstructured": "Internal ops code 5120101"
                    }
                    }
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/58923-001"
                    },
                    "Meta": {}
                    }

                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
#### Get Domestic Payment Order Consent
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **GET /domestic-payment-consents/{ConsentId}
            Request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="9e34a94a-d1ec-498c-aff1-f49c7df7d455">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Get Payment Order Consent Request</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[GET /domestic-payment-consents/58923 HTTP/1.1
                    Authorization: Bearer Jhingapulaav
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Accept: application/json

                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **GET /domestic-payment-consents/{ConsentId}
            Response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="2e18435c-334f-4750-8c09-5ae61cc03422">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Get Payment Order Consent Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 200 OK
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "ConsentId": "58923",
                    "Status": "Authorised",
                    "CreationDateTime": "2017-06-05T15:15:13+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:22+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ACME412",
                    "EndToEndIdentification": "FRESCO.21302.GFX.20",
                    "InstructedAmount": {
                    "Amount": "165.88",
                    "Currency": "GBP"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "ACME Inc",
                    "SecondaryIdentification": "0002"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-101",
                    "Unstructured": "Internal ops code 5120101"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "EcommerceGoods",
                    "MerchantCategoryCode": "5967",
                    "MerchantCustomerIdentification": "053598653254",
                    "DeliveryAddress": {
                    "AddressLine": [
                    "Flat 7",
                    "Acacia Lodge"
                    ],
                    "StreetName": "Acacia Avenue",
                    "BuildingNumber": "27",
                    "PostCode": "GU31 2ZZ",
                    "TownName": "Sparsholt",
                    "CountySubDivision": [
                    "Wessex"
                    ],
                    "Country": "UK"
                    }
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/58923"
                    },
                    "Meta": {}
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
#### Get Domestic Payment Order
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **GET /domestic-payments/{DomesticPaymentId}
            Request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="a7ed53fc-e9ed-43ac-aadf-727b1913be9e">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">GET Payment Order Request</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[GET /domestic-payments/58923-001 HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Accept: application/json

                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **GET /domestic-payments/{DomesticPaymentId}
            Response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="9abbbd0a-6c5f-4c6d-8bb4-10493a99ac34">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Get Payment Order Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 200 OK
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "DomesticPaymentId": "58923-001",
                    "ConsentId": "58923",
                    "Status": "AcceptedSettlementInProcess",
                    "CreationDateTime": "2017-06-05T15:15:22+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:22+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ACME412",
                    "EndToEndIdentification": "FRESCO.21302.GFX.20",
                    "InstructedAmount": {
                    "Amount": "165.88",
                    "Currency": "GBP"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "ACME Inc",
                    "SecondaryIdentification": "0002"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-101",
                    "Unstructured": "Internal ops code 5120101"
                    }
                    }
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/58923-001"
                    },
                    "Meta": {}
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
## Person To Person Initiation via PISP

            
This example set of flows and payload examples are for a domestic payment initiated by a person to
                another person via a PISP.

            
In this scenario:

            
                
- The PSU has pre-specified the account from which funds will be transferred (i.e., the Debtor Account
                    details)
                

                
- No building society accounts are involved in this interaction, and there only the sort code and
                    account number are specified in the DebtorAccount and CreditorAccount sections.
                

            
            
### Sequence Diagram

            

                <ac:image ac:width="1000">
                    <ri:attachment ri:filename="P2PDomesticPaymentExample.png" ri:version-at-save="1"/>
                </ac:image>
            

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="e8cf7a5b-c03f-4479-bb58-226e81acbc39">
                <ac:parameter ac:name="title">Usage Examples - Person to Person</ac:parameter>
                <ac:parameter ac:name="collapse">true</ac:parameter>
                <ac:plain-text-body><![CDATA[participant PSU
                    participant PISP
                    participant ASPSP Authorisation Server
                    participant ASPSP Resource Server

                    note over PSU, ASPSP Resource Server
                    Step 1: Agree Domestic Payment-Order initiation
                    end note
                    PSU <-> PISP: Initiate a funds transfer
                    PSU -> PISP: Select debtor and creditor accounts

                    note over PSU, ASPSP Resource Server
                    Step 2: Setup Domestic Payment-Order Consent
                    end note
                    PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Authorisation Server: Initiate Client Credentials Grant
                    ASPSP Authorisation Server -> PISP: access-token
                    PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Resource Server: POST /domestic-payment-consents
                    ASPSP Resource Server -> PISP: HTTP 201 (Created), ConsentId
                    PISP -> PSU: HTTP 302 (Found), Redirect (ConsentId)

                    note over PSU, ASPSP Resource Server
                    Step 3: Authorize consent
                    end note
                    PSU -> ASPSP Authorisation Server: Follow redirect (ConsentId)
                    PSU <-> ASPSP Authorisation Server: authenticate
                    PSU <-> ASPSP Authorisation Server: SCA if required
                    ASPSP Authorisation Server -> PSU: HTTP 302 (Found), Redirect (authorization-code)
                    PSU -> PISP: Follow redirect (authorization-code)
                    PISP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Authorisation Server: Exchange authorization-code for access token
                    ASPSP Authorisation Server -> PISP: access-token

                    note over PSU, ASPSP Resource Server
                    Step 4: Create Domestic Payment-Order
                    end note
                    PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Resource Server: POST /domestic-payments
                    ASPSP Resource Server -> PISP: HTTP 201 (Created), DomesticPaymentId


                    note over PSU, ASPSP Resource Server
                    Step 5: Get Domestic Payment-Order status
                    end note
                    opt
                    PISP <-> ASPSP Resource Server: Establish TLS 1.2 MA
                    PISP -> ASPSP Resource Server: GET /domestic-payments/{DomesticPaymentId}
                    ASPSP Resource Server -> PISP: HTTP 200 (OK), domestic-payments resource

                    end opt

                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
### Illustrative Interactions
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
#### Create Domestic Payment Order Consent
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **POST /domestic-payment-consents request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="fde75e39-a956-40fb-a516-fd30f6c485a5">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Request Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payment-consents HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-idempotency-key: FRESCO.21302.GFX.20
                    x-jws-signature:
                    TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json
                    Accept: application/json

                    {
                    "Data": {
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "Bob Clements"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    }
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **POST /domestic-payment-consents response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="28e1ff72-737b-46bc-87e7-6094f0155642">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 201 Created
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "ConsentId": "7290",
                    "Status": "AwaitingAuthorisation",
                    "CreationDateTime": "2017-06-05T15:15:13+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "Bob Clements"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
                    },
                    "Meta": {}
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
#### Create Domestic Payment Order
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **POST /domestic-payments request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="f937f883-ae7c-4ae4-9529-10386efdf478">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Request Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payments HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-idempotency-key: FRESNO.1317.GFX.22
                    x-jws-signature:
                    TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json
                    Accept: application/json

                    {
                    "Data": {
                    "ConsentId": "7290",
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "Bob Clements"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    }
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **POST /domestic-payments&nbsp;response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="225768fd-fb43-4091-9907-f3b1ac1b9455">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 201 Created
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "DomesticPaymentId": "7290-003",
                    "ConsentId": "7290",
                    "Status": "AcceptedSettlementInProcess",
                    "CreationDateTime": "2017-06-05T15:15:22+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:22+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "Bob Clements"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/7290-003"
                    },
                    "Meta": {}
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
#### Get Domestic Payment Order Consent
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **GET /domestic-payment-consents/{ConsentId}
            request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="95151e46-0707-4e91-8abe-df389369077d">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Get Payment Order Consent Request</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[GET /domestic-payment-consents/7290 HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Accept: application/json

                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **GET /domestic-payment-consents/{ConsentId}
            response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="b275bb45-edad-4b07-9b79-932bf68da851">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Get Payment Order Consent Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 200 OK
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "ConsentId": "7290",
                    "Status": "Consumed",
                    "CreationDateTime": "2017-06-05T15:15:13+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "Bob Clements"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
                    },
                    "Meta": {}
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
#### Get Domestic Payment Order
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **GET /domestic-payments/{DomesticPaymentId}
            request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="b58271d3-e9b8-401c-bd9c-18950b97ba8f">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Get Payment Order Request</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[GET /domestic-payments/7290-003 HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Accept: application/json

                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **GET /domestic-payments/{DomesticPaymentId}
            response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="e39beaca-a20c-4f37-b182-bed9d308dba3">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Get Payment Order Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 200 OK
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "DomesticPaymentId": "7290-003",
                    "ConsentId": "7290",
                    "Status": "AcceptedSettlementInProcess",
                    "CreationDateTime": "2017-06-05T15:15:22+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:22+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "Bob Clements"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payments/7290-003"
                    },
                    "Meta": {}
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
## BACS Payment Order Consent

            
Use of LocalInstrument and CutOffDateTime.
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **POST /domestic-payment-consents request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="56164547-320b-4a0a-87be-4bb9df79083f">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Request Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payment-consents HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-idempotency-key: FRESCO.21302.GFX.20
                    x-jws-signature:
                    TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json
                    Accept: application/json

                    {
                    "Data": {
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "LocalInstrument": "UK.OBIE.BACS",
                    "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "Bob Clements"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    }
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **POST /domestic-payment-consents response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="c2957a55-6581-4d8f-b4b8-1dd344e26d48">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 201 Created
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "ConsentId": "7290",
                    "Status": "AwaitingAuthorisation",
                    "CreationDateTime": "2017-06-05T15:15:13+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
                    "CutOffDateTime":"2017-06-05T17:30:00+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "LocalInstrument": "UK.OBIE.BACS",
                    "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "Bob Clements"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
                    },
                    "Meta": {}
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
## CHAPS Payment Order Consent

            
Use of LocalInstrument, CreditorPostalAddress, <span
                    style="color: rgb(0,0,0);text-decoration: none;">CutOffDateTime and Charges.

        </ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **POST /domestic-payment-consents request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="3c657da6-d59b-439c-becc-a0640cda8fe9">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Request Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payment-consents HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-idempotency-key: FRESCO.21302.GFX.20
                    x-jws-signature:
                    TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json
                    Accept: application/json

                    {
                    "Data": {
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "LocalInstrument": "UK.OBIE.CHAPS",
                    "InstructedAmount": {
                    "Amount": "20.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "08080021325698",
                    "Name": "Bob Clements"
                    },
                    "CreditorPostalAddress": {
                    "AddressType": "Correspondence",
                    "StreetName": "Liberty",
                    "BuildingNumber":"1",
                    "PostCode":"AB1 2CD",
                    "TownName":"London",
                    "Country":"UK"
                    },
                    "RemittanceInformation": {
                    "Reference": "FRESCO-037",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    }
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **POST /domestic-payment-consents response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="bebfdc32-c124-4864-bc87-67a5459edad1">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 201 Created
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data":{
                    "ConsentId":"7290",
                    "Status":"AwaitingAuthorisation",
                    "CreationDateTime":"2017-06-05T15:15:13+00:00",
                    "StatusUpdateDateTime":"2017-06-05T15:15:13+00:00",
                    "CutOffDateTime":"2017-06-05T17:30:00+00:00",
                    "Initiation":{
                    "InstructionIdentification":"ANSM023",
                    "EndToEndIdentification":"FRESCO.21302.GFX.37",
                    "LocalInstrument":"UK.OBIE.CHAPS",
                    "InstructedAmount":{
                    "Amount":"20.00",
                    "Currency":"GBP"
                    },
                    "DebtorAccount":{
                    "SchemeName":"UK.OBIE.SortCodeAccountNumber",
                    "Identification":"11280001234567",
                    "Name":"Andrea Smith"
                    },
                    "CreditorAccount":{
                    "SchemeName":"UK.OBIE.SortCodeAccountNumber",
                    "Identification":"08080021325698",
                    "Name":"Bob Clements"
                    },
                    "CreditorPostalAddress": {
                    "AddressType": "Correspondence",
                    "StreetName": "Liberty",
                    "BuildingNumber":"1",
                    "PostCode":"AB1 2CD",
                    "TownName":"London",
                    "Country":"UK"
                    },
                    "RemittanceInformation":{
                    "Reference":"FRESCO-037",
                    "Unstructured":"Internal ops code 5120103"
                    }
                    },
                    "Charges":[
                    {
                    "ChargeBearer":"BorneByDebtor",
                    "Type":"UK.OBIE.ChapsOut",
                    "Amount":{
                    "Amount":"30.00",
                    "Currency":"GBP"
                    }
                    }
                    ]
                    },
                    "Risk":{
                    "PaymentContextCode":"PartyToParty"
                    },
                    "Links":{
                    "Self":"https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
                    },
                    "Meta":{}
                    }

                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
## Balance Transfer

            
Below in an example illustrating a balance transfer offer available on a Card A.

            
To facilitate a Balance Transfer, a PISP can initiate a Payment from Card B to Card A with
                LocalInstrument as UK.OBIE.BalanceTransfer, Account SchemeName as UK.OBIE.PAN and if there is an
                Offer Code/Id provided by Issuer of the Card A, then it can be supplied in the field: RemittanceInformation.Reference.
                Example below:
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **POST /domestic-payment-consents request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="695515a4-cb89-413d-91ac-91a8ebfc8326">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Request Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payment-consents HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-idempotency-key: FRESCO.21302.GFX.20
                    x-jws-signature:
                    TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json
                    Accept: application/json

                    {
                    "Data": {
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "LocalInstrument": "UK.OBIE.BalanceTransfer",
                    "InstructedAmount": {
                    "Amount": "3000.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.PAN",
                    "Identification": "5555555555554444",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.PAN",
                    "Identification": "4444333322221111",
                    "Name": "Andrea Smith"
                    },
                    "RemittanceInformation": {
                    "Reference": "BT-OfferCode-12",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    }
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **POST /domestic-payment-consents response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="ef91b66c-caab-4a10-960e-a1884fc58f4b">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 201 Created
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "ConsentId": "7290",
                    "Status": "AwaitingAuthorisation",
                    "CreationDateTime": "2017-06-05T15:15:13+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
                    "CutOffDateTime": "2017-06-05T17:30:00+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "LocalInstrument": "UK.OBIE.BalanceTransfer",
                    "InstructedAmount": {
                    "Amount": "3000.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.PAN",
                    "Identification": "5555555555554444",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.PAN",
                    "Identification": "4444333322221111",
                    "Name": "Andrea Smith"
                    },
                    "RemittanceInformation": {
                    "Reference": "BT-OfferCode-12",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
                    },
                    "Meta": {}
                    }
                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="single">
        <ac:layout-cell>
## Money Transfer

            
Below in an example illustrating Money transfer from a card account to a bank account.&nbsp;

        </ac:layout-cell>
    </ac:layout-section>
    <ac:layout-section ac:type="two_equal">
        <ac:layout-cell>
 **POST /domestic-payment-consents request** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="c1b229f0-7c80-4e6f-a9fb-0bfdcc49f252">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Request Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[POST /domestic-payment-consents HTTP/1.1
                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                    x-idempotency-key: FRESCO.21302.GFX.20
                    x-jws-signature:
                    TGlmZSdzIGEgam91cm5leSBub3QgYSBkZXN0aW5hdGlvbiA=..T2ggZ29vZCBldmVuaW5nIG1yIHR5bGVyIGdvaW5nIGRvd24gPw==
                    x-fapi-auth-date: Sun, 10 Sep 2017 19:43:31 GMT
                    x-fapi-customer-ip-address: 104.25.212.99
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json
                    Accept: application/json

                    {
                    "Data": {
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "LocalInstrument": "UK.OBIE.MoneyTransfer",
                    "InstructedAmount": {
                    "Amount": "3000.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.PAN",
                    "Identification": "5555555555554444",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "RemittanceInformation": {
                    "Reference": "MT-OfferCode-24",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    }
                    }


                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
        <ac:layout-cell>
 **POST /domestic-payment-consents response** 

            <ac:structured-macro ac:name="code" ac:schema-version="1"
                                 ac:macro-id="c47dfd23-5c3b-4346-a754-8fed6183f80e">
                <ac:parameter ac:name="language">js</ac:parameter>
                <ac:parameter ac:name="theme">Midnight</ac:parameter>
                <ac:parameter ac:name="title">Payment Order Consent Response Payload</ac:parameter>
                <ac:parameter ac:name="linenumbers">true</ac:parameter>
                <ac:plain-text-body><![CDATA[HTTP/1.1 201 Created
                    x-jws-signature: V2hhdCB3ZSBnb3QgaGVyZQ0K..aXMgZmFpbHVyZSB0byBjb21tdW5pY2F0ZQ0K
                    x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
                    Content-Type: application/json

                    {
                    "Data": {
                    "ConsentId": "7290",
                    "Status": "AwaitingAuthorisation",
                    "CreationDateTime": "2017-06-05T15:15:13+00:00",
                    "StatusUpdateDateTime": "2017-06-05T15:15:13+00:00",
                    "CutOffDateTime": "2017-06-05T17:30:00+00:00",
                    "Initiation": {
                    "InstructionIdentification": "ANSM023",
                    "EndToEndIdentification": "FRESCO.21302.GFX.37",
                    "LocalInstrument": "UK.OBIE.MoneyTransfer",
                    "InstructedAmount": {
                    "Amount": "3000.00",
                    "Currency": "GBP"
                    },
                    "DebtorAccount": {
                    "SchemeName": "UK.OBIE.PAN",
                    "Identification": "5555555555554444",
                    "Name": "Andrea Smith"
                    },
                    "CreditorAccount": {
                    "SchemeName": "UK.OBIE.SortCodeAccountNumber",
                    "Identification": "11280001234567",
                    "Name": "Andrea Smith"
                    },
                    "RemittanceInformation": {
                    "Reference": "MT-OfferCode-24",
                    "Unstructured": "Internal ops code 5120103"
                    }
                    }
                    },
                    "Risk": {
                    "PaymentContextCode": "PartyToParty"
                    },
                    "Links": {
                    "Self": "https://api.alphabank.com/open-banking/v3.1/pisp/domestic-payment-consents/7290"
                    },
                    "Meta": {}
                    }
                    ]]>
                </ac:plain-text-body>
            </ac:structured-macro>
            
<br/>
</ac:layout-cell>
    </ac:layout-section>
</ac:layout>