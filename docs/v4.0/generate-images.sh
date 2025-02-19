#!/usr/bin/env bash
# install umldiagram from https://bitbucket.org/openbankingteam/uml-generator/src/master/

./umldiagram --src=https://raw.githubusercontent.com/OpenBankingUK/read-write-api-specs/Spec-alignment/dist/openapi/account-info-openapi.yaml --api-version=3 --dir=resources-and-data-models/aisp/images\
	--schema=OBReadConsent1\
	--schema=OBReadConsentResponse1\
	--schema=OBReadAccount6\
	--schema=OBReadBalance1\
	--schema=OBReadTransaction6\
	--schema=OBReadBeneficiary5\
	--schema=OBReadDirectDebit2\
	--schema=OBReadStandingOrder6\
	--schema=OBReadStatement2\
	--schema=OBReadProduct2\
	--schema=OBBCAData1\
	--schema=OBBCAData1\
	--schema=OBPCAData1\
	--schema=OBReadOffer1\
	--schema=OBParty2\
	--schema=OBReadParty2\
	--schema=OBReadParty3\
	--schema=OBReadScheduledPayment3\
	--schema=OBBCAData1.properties.Overdraft:Overdraft\
	--schema=OBBCAData1.properties.OtherFeesCharges:OtherFeesCharges\
	--schema=OBBCAData1.properties.Overdraft.properties.OverdraftTierBandSet:OverdraftTierBandSet\
	--schema=OBReadProduct2.properties.Data.properties.Product.items.properties.OtherProductType.properties.LoanInterest:LoanInterest\
	--schema=OBReadProduct2.properties.Data.properties.Product.items.properties.OtherProductType.properties.Repayment:Repayment\

echo "AISP done"

./umldiagram --src=https://raw.githubusercontent.com/OpenBankingUK/read-write-api-specs/Spec-alignment/dist/openapi/payment-initiation-openapi.yaml --api-version=3 --dir=resources-and-data-models/pisp/images\
	--schema=OBRisk1\
	--schema=OBSCASupportData1\
	--schema=OBWriteFundsConfirmationResponse1\
	--schema=OBWriteDomestic2\
	--schema=OBWriteDomesticConsent4\
	--schema=OBWriteDomesticConsentResponse5\
	--schema=OBWriteDomesticResponse5\
	--schema=OBWritePaymentDetailsResponse1\
	--schema=OBWriteDomesticScheduledConsent4\
	--schema=OBWriteDomesticScheduledConsentResponse5\
	--schema=OBWriteDomesticScheduled2\
	--schema=OBWriteDomesticScheduledResponse5\
	--schema=OBWritePaymentDetailsResponse1\
	--schema=OBWriteDomesticStandingOrderConsent5\
	--schema=OBWriteDomesticStandingOrderConsentResponse6\
	--schema=OBWriteDomesticStandingOrder3\
	--schema=OBWriteDomesticStandingOrderResponse6\
	--schema=OBWritePaymentDetailsResponse1\
	--schema=OBWriteInternationalConsent5\
	--schema=OBWriteInternationalConsentResponse6\
	--schema=OBWriteFundsConfirmationResponse1\
	--schema=OBWriteInternational3\
	--schema=OBWriteInternationalResponse5\
	--schema=OBWritePaymentDetailsResponse1\
	--schema=OBWriteInternationalScheduledConsent5\
	--schema=OBWriteInternationalScheduledConsentResponse6\
	--schema=OBWriteFundsConfirmationResponse1\
	--schema=OBWriteInternationalScheduled3\
	--schema=OBWriteInternationalScheduledResponse6\
	--schema=OBWritePaymentDetailsResponse1\
	--schema=OBWriteInternationalStandingOrderConsent6\
	--schema=OBWriteInternationalStandingOrderConsentResponse7\
	--schema=OBWriteInternationalStandingOrder4\
	--schema=OBWriteInternationalStandingOrderResponse7\
	--schema=OBWritePaymentDetailsResponse1\
	--schema=OBWriteFileConsent3\
	--schema=OBWriteFileConsentResponse4\
	--schema=OBWriteFile2\
	--schema=OBWriteFileResponse3\
	--schema=OBWritePaymentDetailsResponse1\
	--schema=OBWriteDomesticConsent4.properties.Data.properties.Initiation:OBDomestic2\
	--schema=OBWriteDomesticResponse5.properties.Data.properties.Refund:OBDomesticRefundAccount1\
	--schema=OBWriteInternationalResponse5.properties.Data.properties.Refund:OBInternationalRefundAccount1\
	--schema=OBWriteDomesticScheduledConsent4.properties.Data.properties.Initiation:OBDomesticScheduled2\
	--schema=OBWriteDomesticStandingOrderConsent5.properties.Data.properties.Initiation:OBDomesticStandingOrder3\
	--schema=OBWriteInternationalConsent5.properties.Data.properties.Initiation:OBInternational3\
	--schema=OBWriteInternationalConsent5.properties.Data.properties.Initiation.properties.ExchangeRateInformation:OBExchangeRate2\
	--schema=OBWriteInternationalScheduledConsent5.properties.Data.properties.Initiation:OBInternationalScheduled3\
	--schema=OBWriteInternationalStandingOrderConsent6.properties.Data.properties.Initiation:OBInternationalStandingOrder4\
	--schema=OBWriteFileConsent3.properties.Data.properties.Initiation:OBFile2\
	--schema=OBWriteDomesticStandingOrderConsent5.properties.Data.properties.Authorisation:OBAuthorisation1\
	--schema=OBWriteDomesticResponse5.properties.Data.properties.MultiAuthorisation:OBMultiAuthorisation1\

echo "PISP done"

./umldiagram --src=https://raw.githubusercontent.com/OpenBankingUK/read-write-api-specs/Spec-alignment/dist/openapi/vrp-openapi.yaml --api-version=3 --dir=resources-and-data-models/vrp/images\
	--schema=OBCashAccountDebtorWithName \
	--schema=OBCashAccountCreditor3 \
	--schema=OBBranchAndFinancialInstitutionIdentification6_0 \
	--schema=OBDomesticVRPInitiation \
	--schema=OBDomesticVRPControlParameters \
	--schema=OBRisk1 \
	--schema=OBDomesticVRPConsentRequest \
	--schema=OBDomesticVRPConsentResponse \
	--schema=OBDomesticVRPInstruction \
	--schema=OBDomesticVRPRequest \
	--schema=OBDomesticVRPResponse \
	--schema=OBDomesticVRPDetails \
	--schema=OBVRPFundsConfirmationRequest \
	--schema=OBVRPFundsConfirmationResponse \

echo "VRP done"

./umldiagram --src=https://raw.githubusercontent.com/OpenBankingUK/read-write-api-specs/Spec-alignment/dist/openapi/confirmation-funds-openapi.yaml --api-version=3 --dir=resources-and-data-models/cbpii/images\
	--schema=OBFundsConfirmationConsent1 \
	--schema=OBFundsConfirmationConsentResponse1 \
	--schema=OBFundsConfirmation1 \
	--schema=OBFundsConfirmationResponse1 \

echo "CBPII done"


#./umldiagram --src=https://raw.githubusercontent.com/OpenBankingUK/read-write-api-specs/v4.0.0-rc/dist/openapi/event-notifications-openapi.yaml --api-version=3 --dir=resources-and-data-models/event-notifications/images\
#	--schema=OBEventsSubscription1.properties.Data.properties.CallbackUrl\
#	--schema=OBEventPolling1\
#	--schema=OBEventPollingResponse1\
#	--schema=OBEventSubscription1\
#	--schema=OBEventSubscriptionResponse1\
#	--schema=OBEventResourceUpdate1\
#	--schema=OBEventSubject1\ 


cp resources-and-data-models/pisp/images/OBMultiAuthorisation1.svg profiles/images
cp resources-and-data-models/pisp/images/OBAuthorisation1.svg profiles/images
cp resources-and-data-models/pisp/images/OBDomesticRefundAccount1.svg profiles/images
cp resources-and-data-models/pisp/images/OBInternationalRefundAccount1.svg profiles/images
cp resources-and-data-models/pisp/images/OBWritePaymentDetailsResponse1.svg profiles/images
cp resources-and-data-models/pisp/images/OBRisk1.svg profiles/images
cp resources-and-data-models/pisp/images/OBSCASupportData1.svg profiles/images

echo "Copying done"