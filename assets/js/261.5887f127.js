(window.webpackJsonp=window.webpackJsonp||[]).push([[261],{1111:function(t,e,s){t.exports=s.p+"assets/img/VRP-ThreeCornerModel.553690ee.png"},1985:function(t,e,s){"use strict";s.r(e);var a=s(6),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"variable-recurring-payments-api-profile-v3-1-8"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#variable-recurring-payments-api-profile-v3-1-8"}},[t._v("#")]),t._v(" Variable Recurring Payments API Profile - v3.1.8 ")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#introduction"}},[t._v("Introduction")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#resources"}},[t._v("Resources")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#basics"}},[t._v("Basics")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#overview"}},[t._v("Overview")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#steps"}},[t._v("Steps")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#sequence-diagram"}},[t._v("Sequence Diagram")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#payment-restrictions"}},[t._v("Payment Restrictions")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#deferred-specification-of-vrp-consent-parameters"}},[t._v("Deferred specification of VRP Consent Parameters")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#deferred-specification-of-creditoraccount-and-creditoragent"}},[t._v("Deferred specification of CreditorAccount and CreditorAgent")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#security--access-control"}},[t._v("Security & Access Control")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#scopes"}},[t._v("Scopes")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#grants-types"}},[t._v("Grants Types")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#consent-authorisation"}},[t._v("Consent Authorisation")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#psu-authentication-methods"}},[t._v("PSU Authentication Methods")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#consent-revocation"}},[t._v("Consent Revocation")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#multiple-authorisation"}},[t._v("Multiple Authorisation")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#sca-through-the-pisp"}},[t._v("SCA through the PISP")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#error-condition"}},[t._v("Error Condition")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#consent-re-authentication"}},[t._v("Consent Re-authentication")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#risk-scoring-information"}},[t._v("Risk Scoring Information")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#event-notifications"}},[t._v("Event Notifications")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#event-notification-for-changes-to-debtoraccount"}},[t._v("Event Notification for changes to DebtorAccount")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#event-notifications-for-cancellation-of-a-vrp-consent"}},[t._v("Event notifications for cancellation of a VRP Consent")])])])])]),t._v(" "),a("h2",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[t._v("#")]),t._v(" Introduction")]),t._v(" "),a("p",[t._v("The Variable Recurring Payments API Profile describes the flows and common functionality for setting up VRP Consents and subsequently creating one or more payment orders that meet the limitations set by the VRP Consent.")]),t._v(" "),a("p",[t._v("The functionality includes the ability to:")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Stage")]),t._v(" a VRP Consent.")]),t._v(" "),a("li",[t._v("Optionally "),a("strong",[t._v("confirm available funds")]),t._v(" for a VRP of a specified amount")]),t._v(" "),a("li",[t._v("Subsequently "),a("strong",[t._v("submit")]),t._v(" the VRP for processing.")]),t._v(" "),a("li",[t._v("Optionally "),a("strong",[t._v("retrieve the status")]),t._v(" of VRP Consents and VRPs.")])]),t._v(" "),a("p",[t._v("This profile should be read in conjunction with a compatible Read/Write Data API Profile which provides a description of the elements that are common across all the Read/Write Data APIs.")]),t._v(" "),a("h3",{attrs:{id:"resources"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#resources"}},[t._v("#")]),t._v(" Resources")]),t._v(" "),a("p",[t._v("Each of the Payment Initiation API resources are documented in the  "),a("RouterLink",{attrs:{to:"/v3.1.8/resources-and-data-models/"}},[t._v("Resources and Data Models")]),t._v(" area of the specification. Each resource is documented with:")],1),t._v(" "),a("ul",[a("li",[t._v("Endpoints\n"),a("ul",[a("li",[t._v("The API endpoints available for the resource.")])])]),t._v(" "),a("li",[t._v("Data Model\n"),a("ul",[a("li",[t._v("Resource definition.")]),t._v(" "),a("li",[t._v("UML diagram.")]),t._v(" "),a("li",[t._v("Permissions as they relate to accessing the resource.")]),t._v(" "),a("li",[t._v("Data dictionary - which defines fields, re-usable classes, mandatory (1..1) or conditional (0..1) as defined in the Design Principles section, and enumerations.")])])]),t._v(" "),a("li",[t._v("Usage Examples")])]),t._v(" "),a("h2",{attrs:{id:"basics"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#basics"}},[t._v("#")]),t._v(" Basics")]),t._v(" "),a("h3",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[t._v("The figure below provides a "),a("strong",[t._v("general")]),t._v(" outline of a VRP flow.")]),t._v(" "),a("p",[t._v("The flow below is documented in terms of two abstract resources:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("domestic-vrp-consents")]),t._v(": A consent created between a PSU and TPP that allows the TPP to create "),a("code",[t._v("vrps")]),t._v(" on behalf of the PSU subject to "),a("em",[t._v("control parameters")])]),t._v(" "),a("li",[a("code",[t._v("vrps")]),t._v(": A payment order created by the TPP that meets the limitations set out by an approved "),a("code",[t._v("domestic-vrp-consents")]),t._v(" resource.")])]),t._v(" "),a("p",[t._v("These resources will be instantiated as specific resources for various types of payments.")]),t._v(" "),a("p",[t._v("This version of the specification is limited to "),a("code",[t._v("domestic-vrp-consents")]),t._v(" and "),a("code",[t._v("domestic-vrps")]),t._v(".")]),t._v(" "),a("p",[a("img",{attrs:{src:s(1111),alt:"Payments Flow"}})]),t._v(" "),a("h4",{attrs:{id:"steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#steps"}},[t._v("#")]),t._v(" Steps")]),t._v(" "),a("p",[t._v("Step 1: PSU and TPP agree upon a VRP Consent")]),t._v(" "),a("ul",[a("li",[t._v("This flow begins with a PSU agreeing to the setup of VRP Consent. The consent is between the PSU and the TPP.")]),t._v(" "),a("li",[t._v("At this stage, the control parameters are agreed between the PSU and TPP")]),t._v(" "),a("li",[t._v("The PSU may provide the debtor accounts to be used (or specify them at a later stage directly to the ASPSP)")])]),t._v(" "),a("p",[t._v("Step 2: Setup VRP Consent")]),t._v(" "),a("ul",[a("li",[t._v("The TPP connects to the ASPSP that services the PSU's payment account and creates a new "),a("code",[t._v("domestic-vrp-consents")]),t._v(" resource. This informs the ASPSP that one of its PSUs intends to setup a VRP Consent. The ASPSP responds with a consent id that is the identifier for the VRP Consent resource")]),t._v(" "),a("li",[t._v("This step is carried out by making a "),a("strong",[t._v("POST")]),t._v(" request to the "),a("code",[t._v("domestic-vrp-consents")]),t._v(" resource.")])]),t._v(" "),a("p",[t._v("Step 3: Authorise Consent")]),t._v(" "),a("ul",[a("li",[t._v("The TPP requests the PSU to authorise the consent. The ASPSP may carry this out by using a "),a("em",[a("strong",[t._v("redirection flow")])]),t._v(" or a "),a("em",[a("strong",[t._v("decoupled flow")])]),t._v(".\n"),a("ul",[a("li",[t._v("In a redirection flow, the TPP redirects the PSU to the ASPSP.\n"),a("ul",[a("li",[t._v("The redirect includes the ConsentId generated in the previous step.")]),t._v(" "),a("li",[t._v("This allows the ASPSP to correlate the VRP Consent that was setup.")]),t._v(" "),a("li",[t._v("The ASPSP authenticates the PSU.")]),t._v(" "),a("li",[t._v("The PSU reviews the debtor account(s) at this stage (and other control parameters, specified in Step 1).")]),t._v(" "),a("li",[t._v("The ASPSP provides an interface for the PSU to select the debtor accounts to be used.")]),t._v(" "),a("li",[t._v("The ASPSP updates the state of the VRP Consent resource internally to indicate that the consent has been authorised.")]),t._v(" "),a("li",[t._v("Once the consent has been authorised, the PSU is redirected back to the TPP.")])])]),t._v(" "),a("li",[t._v("In a decoupled flow, the ASPSP requests the PSU to authorise consent on an  "),a("em",[t._v("authentication device")]),t._v(" that is separate from the  "),a("em",[t._v("consumption device")]),t._v(" on which the PSU is interacting with the TPP.\n"),a("ul",[a("li",[t._v("The decoupled flow is initiated by the TPP calling a back-channel authorisation request.")]),t._v(" "),a("li",[t._v("The request contains a 'hint' that identifies the PSU paired with the consent to be authorised.")]),t._v(" "),a("li",[t._v("The ASPSP authenticates the PSU")]),t._v(" "),a("li",[t._v("The PSU reviews the debtor account(s) at this stage (and other control parameters, specified in Step 1).")]),t._v(" "),a("li",[t._v("The ASPSP provides an interface for the PSU to select the debtor accounts to be used.")]),t._v(" "),a("li",[t._v("The ASPSP updates the state of the VRP Consent resource internally to indicate that the consent has been authorised.")]),t._v(" "),a("li",[t._v("Once the consent has been authorised, the ASPSP can make a callback to the TPP to provide an access token.")])])])])])]),t._v(" "),a("p",[t._v("Step 4: Confirm Funds (TPP confirms the availability of specific amount in PSU's account)")]),t._v(" "),a("ul",[a("li",[t._v("Once the PSU is authenticated and authorised the VRP Consent, the TPP can check whether funds are available to make the payment.")]),t._v(" "),a("li",[t._v("This is carried out by making a "),a("strong",[t._v("POST")]),t._v(" request, calling the "),a("strong",[t._v("funds-confirmation")]),t._v(" operator on the "),a("code",[t._v("domestic-vrp-consents")]),t._v(" resource.")])]),t._v(" "),a("p",[t._v("Step 5: Create domestic-vrp")]),t._v(" "),a("ul",[a("li",[t._v("The TPP can then creates one or more VRPs for processing the payment. The payment orders must adhere to the control parameters specified by the VRP Consent.")]),t._v(" "),a("li",[t._v("This is carried out by making a "),a("strong",[t._v("POST")]),t._v(" request to the appropriate "),a("code",[t._v("vrps")]),t._v(" resource.")]),t._v(" "),a("li",[t._v("The ASPSP returns the identifier for the domestic-vrps resource to the TPP.")])]),t._v(" "),a("p",[t._v("Step 6: Check resource status")]),t._v(" "),a("ul",[a("li",[t._v("The TPP can check the status of the VRP Consent (with the ConsentId), VRPs and VRP details.")]),t._v(" "),a("li",[t._v("This is carried out by making a "),a("strong",[t._v("GET")]),t._v(" request to the "),a("code",[t._v("domestic-vrp-consents")]),t._v(", "),a("code",[t._v("vrps")]),t._v(" or "),a("code",[t._v("vrp-details")]),t._v(" resource.")])]),t._v(" "),a("h4",{attrs:{id:"sequence-diagram"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sequence-diagram"}},[t._v("#")]),t._v(" Sequence Diagram")]),t._v(" "),a("p",[a("img",{attrs:{src:s(243),alt:"Payments Flow"}})]),t._v(" "),a("p",[a("a",{attrs:{href:"./images/Payments-Flow.puml"}},[t._v("Diagram source")])]),t._v(" "),a("h3",{attrs:{id:"payment-restrictions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#payment-restrictions"}},[t._v("#")]),t._v(" Payment Restrictions")]),t._v(" "),a("p",[t._v("The standard provides a set of conrol parameters that may be specified as part of the VRP Consent. These control parameters set limits for the payment orders that can be created by the TPP for a given VRP.")]),t._v(" "),a("p",[t._v("In addition to the control parameters defined in this standard ASPSPs may implement additional control parameters, limits and restrictions.")]),t._v(" "),a("p",[t._v("These restrictions should be documented on ASPSP's developer portal.")]),t._v(" "),a("h3",{attrs:{id:"deferred-specification-of-vrp-consent-parameters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deferred-specification-of-vrp-consent-parameters"}},[t._v("#")]),t._v(" Deferred specification of VRP Consent Parameters")]),t._v(" "),a("p",[t._v("For non-sweeping VRPs a PISP may create a "),a("code",[t._v("vrp-consent")]),t._v(" without specifying VRP Consent Parameters in the "),a("code",[t._v("ControlParameters")]),t._v(" for the VRP Consent.")]),t._v(" "),a("p",[t._v("The PISP subsequently provides this information when initiating a VRP Payment based on the VRP Consent.")]),t._v(" "),a("p",[t._v("An ASPSP may permit these type of consents only when an appropriate contract is in place with the PISP.")]),t._v(" "),a("p",[t._v("As described in the section below, the ASPSP may also rely on the PISP to carry out SCA (with appropriate contracts in place).")]),t._v(" "),a("h3",{attrs:{id:"deferred-specification-of-creditoraccount-and-creditoragent"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deferred-specification-of-creditoraccount-and-creditoragent"}},[t._v("#")]),t._v(" Deferred specification of CreditorAccount and CreditorAgent")]),t._v(" "),a("p",[t._v("Similarly, for non-sweeping VRPs a PISP may create a "),a("code",[t._v("vrp-consent")]),t._v(" without specifying the "),a("code",[t._v("CreditorAccount")]),t._v(" and "),a("code",[t._v("CreditorAgent")]),t._v(" for the VRP Consent.")]),t._v(" "),a("p",[t._v("The PISP subsequently provides this information when initiating a VRP Payment based on the VRP Consent.")]),t._v(" "),a("p",[t._v("An ASPSP may permit these type of consents only when an appropriate contract is in place with the PISP.")]),t._v(" "),a("p",[t._v("As described in the section below, the ASPSP may also rely on the PISP to carry out SCA (with appropriate contracts in place).")]),t._v(" "),a("h2",{attrs:{id:"security-access-control"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#security-access-control"}},[t._v("#")]),t._v(" Security & Access Control")]),t._v(" "),a("h3",{attrs:{id:"scopes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scopes"}},[t._v("#")]),t._v(" Scopes")]),t._v(" "),a("p",[t._v("A PISP can call VRP APIs using the "),a("code",[t._v("payments")]),t._v(" scope.")]),t._v(" "),a("h3",{attrs:{id:"grants-types"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#grants-types"}},[t._v("#")]),t._v(" Grants Types")]),t._v(" "),a("p",[t._v("As defined in resources and data models.")]),t._v(" "),a("h3",{attrs:{id:"consent-authorisation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consent-authorisation"}},[t._v("#")]),t._v(" Consent Authorisation")]),t._v(" "),a("p",[t._v("OAuth 2.0 scopes are coarse-grained and the set of available scopes are defined at the point of client registration. There is no standard method for specifying and enforcing fine-grained scopes e.g., a scope to enforce payments of a specified amount on a specified date.")]),t._v(" "),a("p",[t._v("A "),a("em",[t._v("consent authorisation")]),t._v(" is used to define the fine-grained scope that is granted by the PSU to the TPP.")]),t._v(" "),a("p",[t._v("The TPP "),a("strong",[t._v("must")]),t._v(" begin setup of a Variable Recurring Payment, by creating a "),a("code",[t._v("domestic-vrp-consents")]),t._v(" resource through a "),a("strong",[t._v("POST")]),t._v(" operation. These resources indicate the  "),a("em",[t._v("consent")]),t._v(" that the TPP claims it has been given by the PSU. At this stage, the consent is not yet authorised as the ASPSP has not yet verified this claim with the PSU.")]),t._v(" "),a("p",[t._v("The ASPSP responds with a ConsentId. This is the intent-id that is used when initiating the authorization code grant (as described in the Trust Framework).")]),t._v(" "),a("p",[t._v("As part of the authorization code grant:")]),t._v(" "),a("ul",[a("li",[t._v("The ASPSP authenticates the PSU.")]),t._v(" "),a("li",[t._v("The ASPSP plays back the consent (registered by the TPP) back to the PSU to get consent authorisation. The PSU may accept or reject the consent in its entirety (but not selectively).")])]),t._v(" "),a("p",[t._v("Once these steps are complete, the consent is considered to have been authorised by the PSU.")]),t._v(" "),a("h3",{attrs:{id:"psu-authentication-methods"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#psu-authentication-methods"}},[t._v("#")]),t._v(" PSU Authentication Methods")]),t._v(" "),a("p",[t._v("The VRP Consent must specify the "),a("code",[t._v("PSUAuthenticationMethods")]),t._v(" that are acceptable for payments made under that consent.")]),t._v(" "),a("p",[t._v("One or more PSU Authentication methods can be specified:")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Authentication Not Required")]),t._v(": This indicates that the PSU does not need to authenticate for individual payments and the payments can be made without the PSU being present. This method is useful for sweeping use-cases, but may also be used in other situations.")]),t._v(" "),a("li",[a("strong",[t._v("SCA By TPP")]),t._v(": This indicuates that SCA is carried out by the TPP. The ASPSP and TPP must have a contract in place to accept this type of authentication.")])]),t._v(" "),a("h3",{attrs:{id:"consent-revocation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consent-revocation"}},[t._v("#")]),t._v(" Consent Revocation")]),t._v(" "),a("p",[t._v("A PSU may revoke consent for initiation of any future payment orders, by revoking the authorisation of VRP Consent, at any point in time.")]),t._v(" "),a("p",[t._v("The PSU may request the TPP to revoke consent that it has authorised. If consent is revoked with the TPP:")]),t._v(" "),a("ul",[a("li",[t._v("The TPP must cease to initiate any future payment orders or Funds Confirmations using the VRP Consent.")]),t._v(" "),a("li",[t._v("The TPP must call the DELETE operation on the VRP Consent resource to indicate to the ASPSP that the PSU has revoked consent.")])]),t._v(" "),a("p",[t._v("The PSU may revoke the VRP Consent via ASPSP's online channel. If the consent is revoked via ASPSP:")]),t._v(" "),a("ul",[a("li",[t._v("The ASPSP must immediately update the VRP Consent resource status to Revoked.")]),t._v(" "),a("li",[t._v("The ASPSP must fail any future payment order request using the ConsentId, with the Status Revoked.")]),t._v(" "),a("li",[t._v("The ASPSP must make a Notification Event available for the TPP to poll/deliver Real Time Event Notification for the event - consent-authorization-revoked.")])]),t._v(" "),a("h3",{attrs:{id:"multiple-authorisation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#multiple-authorisation"}},[t._v("#")]),t._v(" Multiple Authorisation")]),t._v(" "),a("ul",[a("li",[t._v("In the current version of the specification, VRP is not supported for accounts that require multiple PSUs to authorise a payment.")])]),t._v(" "),a("h3",{attrs:{id:"sca-through-the-pisp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sca-through-the-pisp"}},[t._v("#")]),t._v(" SCA through the PISP")]),t._v(" "),a("p",[t._v("An ASPSP may enter into a contractual arrangement with a PISP to carry out SCA on its behalf. The Read-Write API profile describes the use of a "),a("code",[t._v("jwt-bearer")]),t._v(" grant type.")]),t._v(" "),a("p",[t._v("This can also be used for vrp consents.")]),t._v(" "),a("h3",{attrs:{id:"error-condition"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#error-condition"}},[t._v("#")]),t._v(" Error Condition")]),t._v(" "),a("p",[t._v("If the PSU does not complete a successful consent authorisation (e.g., if the PSU has not authenticated successfully), the authorization code grant ends with a redirection to the TPP with an error response as described in "),a("a",{attrs:{href:"https://tools.ietf.org/html/rfc6749#section-4.1.2.1",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC 6749 Section 4.1.2.1"),a("OutboundLink")],1),t._v(". The PSU is redirected to the TPP with an error parameter indicating the error that occurred.")]),t._v(" "),a("h3",{attrs:{id:"consent-re-authentication"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consent-re-authentication"}},[t._v("#")]),t._v(" Consent Re-authentication")]),t._v(" "),a("p",[t._v("VRP Consents are long-lived and can be re-authenticated by the PSU. The access token issued by the ASPSP must be valid for the same length of time as the VRP consent.")]),t._v(" "),a("p",[t._v("ASPSPs may revoke access tokens associated with a VRP consent for fraud and risk reduction. In such situations, they would have to provide a event delivery mechanism.")]),t._v(" "),a("p",[t._v("A PSU may re-authenticate a VRP Consent where:")]),t._v(" "),a("ul",[a("li",[t._v("the resource has a status of "),a("code",[t._v("Authorised")]),t._v(" and")]),t._v(" "),a("li",[t._v("the consent has not expired as determined through the "),a("code",[t._v("ValidToDate")]),t._v(" in the control parameters.")])]),t._v(" "),a("p",[t._v("ASPSPs may revoke access tokens issued for a VRP consent if they suspect risk or fraud situations. However, unlike AIS consents, VRP access tokens should not be set to expire at 90 days.")]),t._v(" "),a("h3",{attrs:{id:"risk-scoring-information"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#risk-scoring-information"}},[t._v("#")]),t._v(" Risk Scoring Information")]),t._v(" "),a("p",[t._v("The same risk scoring information contained in the "),a("code",[t._v("Risk")]),t._v(" of other OBIE R/W payment resources will be available.")]),t._v(" "),a("h2",{attrs:{id:"event-notifications"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#event-notifications"}},[t._v("#")]),t._v(" Event Notifications")]),t._v(" "),a("h3",{attrs:{id:"event-notification-for-changes-to-debtoraccount"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#event-notification-for-changes-to-debtoraccount"}},[t._v("#")]),t._v(" Event Notification for changes to DebtorAccount")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("DebtorAccount")]),t._v(" that is associated with a "),a("code",[t._v("vrp-consent")]),t._v(" may change due to a number of factors:")]),t._v(" "),a("ul",[a("li",[t._v("The PSU may close the account")]),t._v(" "),a("li",[t._v("The PSU may close the account and switch to another ASPSP")]),t._v(" "),a("li",[t._v("The account may be blocked due to a fraud referal")]),t._v(" "),a("li",[t._v("The PSU may have ceased trading or may be deceased")])]),t._v(" "),a("p",[t._v("In any such situation where an account linked to a "),a("code",[t._v("vrp-consent")]),t._v(" can no longer be used, temporarily or permanently, to make payments, the ASPSP must inform the TPP using events.")]),t._v(" "),a("p",[t._v("The TPP may subscribe to these events using an aggregated polling mechanism or a push notification mechanism.")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("urn:uk:org:openbanking:events:domestic-vrp-consent-linked-account-update")]),t._v(" event should be used to indicate such a change for domestic VRP Consents")]),t._v(" "),a("p",[t._v("A custom claim, "),a("code",[t._v("reason")]),t._v(" should be used with the event to indicate the reason for the event. This should be a namespaced enumeration.")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("sub")]),t._v(" and "),a("code",[t._v("subject")]),t._v(" claim references the URL of the "),a("code",[t._v("vrp-consent")]),t._v(" that gives the TPP access to the account.\nThe TPP can then use the GET operation to retrieve the "),a("code",[t._v("vrp-consent")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"iss"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://examplebank.com/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"iat"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1516239022")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"jti"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"b460a07c-4962-43d1-85ee-9dc10fbb8f6c"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sub"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://examplebank.com/api/open-banking/v3.1/vrp/domestic-vrp-consents/aac-1234-007"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"aud"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"7umx5nTR33811QyQfi"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"events"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"urn:uk:org:openbanking:events:domestic-vrp-consent-linked-account-update"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"subject"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"subject_type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://openbanking.org.uk/rid_http://openbanking.org.uk/rty"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"http://openbanking.org.uk/rid"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"90200"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"http://openbanking.org.uk/rty"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"domestic-vrp-consents"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"http://openbanking.org.uk/rlk"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"v3.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"link"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://examplebank.com/api/open-banking/v3.1/vrp/domestic-vrp-consents/aac-1234-007"')]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"txn"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dfc51628-3479-4b81-ad60-210b43d02306"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"toe"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1516239022")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"event-notifications-for-cancellation-of-a-vrp-consent"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#event-notifications-for-cancellation-of-a-vrp-consent"}},[t._v("#")]),t._v(" Event notifications for cancellation of a VRP Consent")]),t._v(" "),a("p",[t._v("In the situation that a VRP Consent is cancelled by a PSU at the ASPSP, the ASPSP must inform the PISP through an event notification about the cancellation.")]),t._v(" "),a("p",[t._v("The TPP may subscribe to these events using an aggregated polling mechanism or a push notification mechanism.")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("urn:uk:org:openbanking:events:consent-authorization-revoked")]),t._v(" event should be used to indicate this.")]),t._v(" "),a("p",[t._v("The TPP can then use the GET operation to retrieve the consent.")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"iss"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://examplebank.com/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"iat"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1516239022")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"jti"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"b460a07c-4962-43d1-85ee-9dc10fbb8f6c"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sub"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://examplebank.com/api/open-banking/v3.1/vrp/domestic-vrp-consents/88379"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"aud"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"7umx5nTR33811QyQfi"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"events"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"urn:uk:org:openbanking:events:consent-authorization-revoked"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"subject"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"subject_type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://openbanking.org.uk/rid_http://openbanking.org.uk/rty"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"http://openbanking.org.uk/rid"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"88379"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"http://openbanking.org.uk/rty"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"domestic-vrp-consents"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"http://openbanking.org.uk/rlk"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"v3.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"link"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://examplebank.com/api/open-banking/v3.1/vtp/domestic-vrp-consents/88379"')]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"txn"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dfc51628-3479-4b81-ad60-210b43d02306"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"toe"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1516239022")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=n.exports},243:function(t,e,s){t.exports=s.p+"assets/img/Payments-Flow.afde0dfa.png"}}]);