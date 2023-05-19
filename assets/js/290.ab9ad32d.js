(window.webpackJsonp=window.webpackJsonp||[]).push([[290],{1455:function(e,t,i){"use strict";i.r(t);var n=i(6),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"real-time-event-notification-api-profile-v3-1-11-draft-1"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#real-time-event-notification-api-profile-v3-1-11-draft-1"}},[e._v("#")]),e._v(" Real Time Event Notification API Profile - v3.1.11 - DRAFT 1 ")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#overview"}},[e._v("Overview")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#basics"}},[e._v("Basics")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#overview-2"}},[e._v("Overview")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#steps"}},[e._v("Steps")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#sequence-diagram"}},[e._v("Sequence Diagram")])])])])])])]),e._v(" "),n("h2",{attrs:{id:"overview"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),n("p",[e._v("The Real Time Event Notification API Profile describes the flows common functionality for the Real Time Event Notification API, which allows ASPSPs to:")]),e._v(" "),n("ul",[n("li",[e._v("Notify a TPP that an event has occurred.")])]),e._v(" "),n("p",[e._v("This profile should be read in conjunction with a compatible Read/Write Data API Profile, a compatible Event Notification API Profile and compatible individual resources.")]),e._v(" "),n("p",[e._v("Implementation of the Real Time Event Notification API is "),n("strong",[e._v("optional")]),e._v(" for ASPSPs.")]),e._v(" "),n("h2",{attrs:{id:"basics"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#basics"}},[e._v("#")]),e._v(" Basics")]),e._v(" "),n("h3",{attrs:{id:"overview-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#overview-2"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),n("p",[e._v("The steps and sequence diagram below provide a general outline of an event notification flow for all resources in the R/W APIs.")]),e._v(" "),n("h4",{attrs:{id:"steps"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#steps"}},[e._v("#")]),e._v(" Steps")]),e._v(" "),n("p",[e._v("Step 1: Send Event Notification")]),e._v(" "),n("ul",[n("li",[e._v("When an event occurs on a resource that requires a notification, the ASPSP identifies the "),n("strong",[e._v("callback-url")]),e._v(" associated with the TPP owning the affected resource.")]),e._v(" "),n("li",[e._v("The ASPSP sends a signed event notification to the callback URL, detailing the nature of the event and identifying the affected resource.")]),e._v(" "),n("li",[e._v("The TPP may optionally initiate a client credential grant to retrieve the resource using the details contained in the event notification.")])]),e._v(" "),n("h4",{attrs:{id:"sequence-diagram"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sequence-diagram"}},[e._v("#")]),e._v(" Sequence Diagram")]),e._v(" "),n("p",[n("img",{attrs:{src:i(458),alt:"Real Time Event Notification"}})]),e._v(" "),n("details",[n("summary",[e._v("Diagram source")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("participant TPP\nparticipant ASPSP Authorisation Server\nparticipant ASPSP Resource Server\nparticipant ASPSP Notification Service\n\nnote over TPP, ASPSP Notification Service\nStep 1: Send Event Notification\nend note\n\nnote left of ASPSP Notification Service\n- Create EventNotification\n- Sign EventNotification\nend note\n\nloop Retry Until Successful (as per retry policy)\nASPSP Notification Service -> TPP: POST /event-notifications, EventNotification, signature\nalt success\nTPP -> ASPSP Notification Service: HTTP 202 Accepted\nelse failure\nTPP -> ASPSP Notification Service: HTTP 500/400\nend alt\nend loop\n\nnote right of TPP\nTPP verifies signature\nend note\n\nopt If TPP requires full resource\n\nnote right of TPP\nURL for resource contained in the\nEventNotification rlk (resource links) claim\nend note\n\nTPP <-> ASPSP Authorisation Server: Establish TLS 1.2 MA\nTPP -> ASPSP Authorisation Server: Initiate Client Credentials Grant\nASPSP Authorisation Server -> TPP: access-token\n\nTPP <-> ASPSP Resource Server: Establish TLS 1.2 MA\nTPP -> ASPSP Resource Server: GET Resource\nASPSP Resource Server -> TPP: HTTP 200 (OK),  Resource\n\nend opt\n\noption footer=bar\n")])])])])])}),[],!1,null,null,null);t.default=a.exports},458:function(e,t,i){e.exports=i.p+"assets/img/RealTimeEventNotification.a50c1706.png"}}]);