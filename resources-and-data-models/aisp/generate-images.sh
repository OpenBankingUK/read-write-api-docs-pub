#!/usr/bin/env bash

umldiagram --src=https://raw.githubusercontent.com/OpenBankingUK/read-write-api-specs/master/dist/openapi/account-info-openapi.yaml --api-version=3 --dir=images \
        --schema=OBReadConsent1 \
        --schema=OBReadConsentResponse1 \
        --schema=OBReadAccount6 \
        --schema=OBReadBalance1 \
        --schema=OBReadTransaction6 \
        --schema=OBReadBeneficiary5 \
        --schema=OBReadDirectDebit2 \
        --schema=OBReadStandingOrder6 \
        --schema=OBReadProduct2 \
        --schema=OBBCAData1 \
        --schema=OBPCAData1 \
        --schema=OBReadOffer1 \
        --schema=OBParty2 \
        --schema=OBReadParty2 \
        --schema=OBReadParty3 \
        --schema=OBReadScheduledPayment3 \
        --schema=OBBCAData1.properties.Overdraft \
        --schema=OBBCAData1.properties.OtherFeesCharges \
        --schema=OBBCAData1.properties.Overdraft.properties.OverdraftTierBandSet \
        --schema=LoanInterest \
        --schema=Repayment \