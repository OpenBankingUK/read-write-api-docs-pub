// https://vuepress.vuejs.org/theme/default-theme-config.html#navbar
module.exports = [
    {
        text: 'Get Started',
        link: 'https://standards.openbanking.org.uk/get-started/',
        description: 'Here are some of the underlying principles, assets and resources to give you a headstart working with the Standard.',
        items: [
            {
                text: 'Using the Standard',
                link: 'https://standards.openbanking.org.uk/guidance-when-implementing-the-standard/',
                items: [
                    { text: 'Reading the Standard', link: 'https://standards.openbanking.org.uk/guidance-when-implementing-the-standard/' },
                    { text: 'Common Language', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/appendices/common-terminology/v3-1-9/' }
                ]
            },
            {
                text: 'Propositions',
                link: 'https://consultation.standards.openbanking.org.uk/get-started/propositions',
                items: [
                    { text: 'Core Propositions', link: 'https://consultation.standards.openbanking.org.uk/get-started/propositions#corep' },
                    { text: 'Variable Recurring Payments', link: 'https://consultation.standards.openbanking.org.uk/get-started/propositions#premiumapis' },
                    { text: 'Premium API', link: 'https://consultation.standards.openbanking.org.uk/get-started/propositions#pothers' }
                ]
            }
        ]
    },
    {
        text: 'Specifications',
        link: 'https://standards.openbanking.org.uk/specifications/',
        description: 'Our specifications consist of technical documentation, usage examples and swagger files.',
        items: [
            {
                text: 'API Specifications',
                link: 'https://standards.openbanking.org.uk/api-specifications/v3-1-10/',
                items: [
                    { text: 'Read/Write API Specifications', link: 'https://openbankinguk.github.io/read-write-api-site3/v3.1.10/profiles/read-write-data-api-profile.html' },
                    { text: 'Open Data API Specifications', link: 'https://openbankinguk.github.io/opendata-api-docs-pub/' },
                    { text: 'Directory Specifications', link: 'https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1150124033/Directory+2.0+Technical+Overview+v1.5' },
                    { text: 'Dynamic Client Registration (DCR) Specifications', link: 'https://openbankinguk.github.io/dcr-docs-pub/' },
                    { text: 'MI Reporting / ASPSP', link: 'https://openbankinguk.github.io/mi-docs-pub/v3.1.10-aspsp/specification/mi-data-reporting-api-specification.html' },
                    { text: 'MI Reporting / TPP', link: 'https://openbankinguk.github.io/mi-docs-pub/v3.1.10-TPP/logical-data-dictionary.html' },
                ]
            },
            {
                text: 'Security Profiles',
                link: 'https://standards.openbanking.org.uk/security-profiles/',
                items: [
                    { text: 'Financial Grade API', link: 'https://openid.net/specs/openid-financial-api-part-2-wd-06.html' },
                    { text: 'Client Initiated Backchannel Authentication', link: 'https://openid.net/specs/openid-financial-api-ciba.html' }
                ]
            }
        ]
    },
    {
        text: 'Guidelines',
        link: 'https://standards.openbanking.org.uk/guidelines/',
        description: 'Bringing together regulatory requirements and customer research to help account providers and third parties deliver great propositions and experiences.',
        items: [
            {
                text: 'Customer Experience Guidelines',
                link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/',
                items: [
                    { text: 'Get Started', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/introduction/latest/' },
                    { text: 'Authentication Methods', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/authentication-methods/latest/' },
                    { text: 'Account Information Services', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/account-information-services/latest/' },
                    { text: 'Payment Initiation Services', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/payment-initiation-services/latest/' },
                    { text: 'Card Based Payment Instrument Issuers', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/card-based-payment-instrument-issuers-cbpiis/latest/' },
                    { text: 'Dashboards', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/dashboards/latest/' },
                    { text: 'Customer Experience Checklist', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/customer-experience-checklist/latest/' },
                    { text: 'Appendices', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/appendices/v3-1-10/' },
                    { text: 'Change Log', link: 'https://standards.openbanking.org.uk/customer-experience-guidelines/change-log/latest/' }
                ]
            },
            {
                text: 'Operational Guidelines',
                link: 'https://standards.openbanking.org.uk/operational-guidelines/',
                items: [
                    { text: 'Overview', link: 'https://standards.openbanking.org.uk/operational-guidelines/introduction/latest/' },
                    { text: 'Availability and performance', link: 'https://standards.openbanking.org.uk/operational-guidelines/availability-and-performance/latest/' },
                    { text: 'Dedicated Interface Requirements', link: 'https://standards.openbanking.org.uk/operational-guidelines/dedicated-interface-requirements/latest/' },
                    { text: 'Problem Resolution', link: 'https://standards.openbanking.org.uk/operational-guidelines/problem-resolution/latest/' },
                    { text: 'Change and Communication Management', link: 'https://standards.openbanking.org.uk/operational-guidelines/change-and-communication-management/latest/' },
                    { text: 'Operational Guidelines Checklist', link: 'https://standards.openbanking.org.uk/operational-guidelines/the-operational-guidelines-checklist/latest/' },
                    { text: 'Change Log', link: 'https://standards.openbanking.org.uk/operational-guidelines/change-log/latest/' }
                ]
            }
        ]
    },
    {
        text: 'Good Practice',
        link: 'https://standards.openbanking.org.uk/good-practice/',
        items: [
            {
                text: 'Implementation',
                link: 'https://standards.openbanking.org.uk/other-guidelines/imp-guidelines/latest/',
                items: [
                    { text: 'Variable Recurring Payments', link: 'https://standards.openbanking.org.uk/good-practice/vrp-for-sweeping-guidelines/latest/' },
                    { text: 'Data Management', link: 'https://standards.openbanking.org.uk/good-practice/data-mgmt/latest/' }
                ]
            },
            {
                text: 'Third Party Providers',
                link: 'https://standards.openbanking.org.uk/good-practice/other-introduction/latest/',
                items: [
                    { text: 'Overview', link: 'https://standards.openbanking.org.uk/good-practice/other-introduction/latest/' },
                    { text: 'Change Management', link: 'https://standards.openbanking.org.uk/good-practice/change-management/latest/' },
                    { text: 'Testing', link: 'https://standards.openbanking.org.uk/good-practice/testing/latest/' },
                    { text: 'Issues & Disputes', link: 'https://standards.openbanking.org.uk/good-practice/issues-disputes/latest/' },
                    { text: 'Contract & Supplier Management', link: 'https://standards.openbanking.org.uk/good-practice/contract-supplier-management/latest/' },
                    { text: 'Business Continuity & Disaster Recovery', link: 'https://standards.openbanking.org.uk/good-practice/bc-and-dr/latest/' },
                    { text: 'Change Log', link: 'https://standards.openbanking.org.uk/good-practice/change-log/latest/' }
                ]
            }
        ]
    },
    {
        text: 'Reference',
        link: 'https://standards.openbanking.org.uk/reference/',
        description: 'Providing access to resources and drafts that are currently outside the standard, but useful',
        items: [
            {
                text: 'Reference Library',
                link: 'https://standards.openbanking.org.uk/reference/',
                items: [
                    { text: 'Security & Counter Fraud', link: 'https://www.openbanking.org.uk/wp-content/uploads/OBIE-Security-Counter-Fraud-GUIDE.pdf' },
                    { text: 'Confirmation of Payee / Contingent Liability Model', link: 'https://www.openbanking.org.uk/wp-content/uploads/CoP-CRM-Draft-Standards-070721.pdf' }
                ]
            }
        ]
    },
    {
        text: 'FAQs',
        link: 'https://openbankinguk.github.io/knowledge-base-pub/',
        items: [
            {
                text: 'FAQs',
                link: 'https://openbankinguk.github.io/knowledge-base-pub/',
                items: [
                    { text: 'Standards', link: 'https://openbankinguk.github.io/knowledge-base-pub/standards/' },
                    { text: 'Dynamic Client Registration', link: 'https://openbankinguk.github.io/knowledge-base-pub/conformance-tools/dynamic-client-registration-tool/' },
                    { text: 'Functional Conformance Tool', link: 'https://openbankinguk.github.io/knowledge-base-pub/conformance-tools/functional-conformance-tool/' },
                    { text: 'Security Conformance Tool', link: 'https://openbankinguk.github.io/knowledge-base-pub/conformance-tools/security-conformance-tool/' }
                ]
            }
        ]
    }
];
