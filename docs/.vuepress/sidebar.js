// https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar

const collapsable = true;
const sidebarDepth = 0;

module.exports = [
    {
        title: 'Version 3.1.7',
        path: '/v3.1.7/profiles/read-write-data-api-profile',
        collapsable: collapsable,
        sidebarDepth,
        children: [
            {
                title: 'Account and Transaction API',
                path: '/v3.1.7/profiles/account-and-transaction-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    ['/v3.1.7/resources-and-data-models/aisp/account-access-consents', 'Account Access Consents'],
                    {
                        title: 'Accounts',
                        path: '/v3.1.7/resources-and-data-models/aisp/Accounts',
                    },
                    {
                        title: 'Balances',
                        path: '/v3.1.7/resources-and-data-models/aisp/Balances',
                    },
                    {
                        title: 'Transactions',
                        path: '/v3.1.7/resources-and-data-models/aisp/Transactions',
                    },
                    {
                        title: 'Beneficiaries',
                        path: '/v3.1.7/resources-and-data-models/aisp/Beneficiaries',
                    },
                    {
                        title: 'Direct Debits',
                        path: '/v3.1.7/resources-and-data-models/aisp/direct-debits',
                    },
                    {
                        title: 'Standing Orders',
                        path: '/v3.1.7/resources-and-data-models/aisp/standing-orders',
                    },
                    {
                        title: 'Products',
                        path: '/v3.1.7/resources-and-data-models/aisp/Products',
                        collapsable: collapsable,
                        children: [
                            {
                                title: 'BCA Product Data Model',
                                path: '/v3.1.7/resources-and-data-models/aisp/bca-product-data-model',
                            },
                            {
                                title: 'PCA Product Data Model',
                                path: '/v3.1.7/resources-and-data-models/aisp/pca-product-data-model',
                            },
                            {
                                title: 'Other Product Data Model',
                                path: '/v3.1.7/resources-and-data-models/aisp/other-product-data-model',
                            },
                        ],
                    },
                    {
                        title: 'Offers',
                        path: '/v3.1.7/resources-and-data-models/aisp/Offers',
                    },
                    {
                        title: 'Parties',
                        path: '/v3.1.7/resources-and-data-models/aisp/Parties',
                    },
                    {
                        title: 'Scheduled Payments',
                        path: '/v3.1.7/resources-and-data-models/aisp/scheduled-payments',
                    },
                    {
                        title: 'Statements',
                        path: '/v3.1.7/resources-and-data-models/aisp/Statements',
                    },
                ],
            },
            {
                title: 'Payment Initiation API ',
                path: '/v3.1.7/profiles/payment-initiation-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Domestic Payments Consents',
                        path: '/v3.1.7/resources-and-data-models/pisp/domestic-payment-consents',
                    },
                    {
                        title: 'Domestic Payments',
                        path: '/v3.1.7/resources-and-data-models/pisp/domestic-payments',
                    },
                    {
                        title: 'Domestic Scheduled Payment Consents',
                        path: '/v3.1.7/resources-and-data-models/pisp/domestic-scheduled-payment-consents',
                    },
                    {
                        title: 'Domestic Scheduled Payment',
                        path: '/v3.1.7/resources-and-data-models/pisp/domestic-scheduled-payments',
                    },
                    {
                        title: 'Domestic Standing Order Consents',
                        path: '/v3.1.7/resources-and-data-models/pisp/domestic-standing-order-consents',
                    },
                    {
                        title: 'Domestic Standing Orders',
                        path: '/v3.1.7/resources-and-data-models/pisp/domestic-standing-orders',
                    },
                    {
                        title: 'International Payment Consents',
                        path: '/v3.1.7/resources-and-data-models/pisp/international-payment-consents',
                    },
                    {
                        title: 'International Payments',
                        path: '/v3.1.7/resources-and-data-models/pisp/international-payments',
                    },
                    {
                        title: 'International Scheduled Payment Consents',
                        path: '/v3.1.7/resources-and-data-models/pisp/international-scheduled-payment-consents',
                    },
                    {
                        title: 'International Scheduled Payments',
                        path: '/v3.1.7/resources-and-data-models/pisp/international-scheduled-payments',
                    },
                    {
                        title: 'International Standing Order Consents',
                        path: '/v3.1.7/resources-and-data-models/pisp/international-standing-order-consents',
                    },
                    {
                        title: 'International Standing Orders ',
                        path: '/v3.1.7/resources-and-data-models/pisp/international-standing-orders',
                    },
                    {
                        title: 'File Payment Consents',
                        path: '/v3.1.7/resources-and-data-models/pisp/file-payment-consents',
                    },
                    {
                        title: 'File Payments',
                        path: '/v3.1.7/resources-and-data-models/pisp/file-payments',
                    },
                ],
            },
            {
                title: 'Confirmation of Funds API Profile',
                path: '/v3.1.7/profiles/confirmation-of-funds-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Funds Confirmation Consent',
                        path: '/v3.1.7/resources-and-data-models/cbpii/funds-confirmation-consent',
                    },
                    {
                        title: 'Funds Confirmation',
                        path: '/v3.1.7/resources-and-data-models/cbpii/funds-confirmation',
                    },
                ],
            },
            {
                title: 'Event Notification API',
                path: '/v3.1.7/profiles/event-notification-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Event Notification Subscription API',
                        path: '/v3.1.7/profiles/event-notification-subscription-api-profile',
                    },
                    {
                        title: 'Callback URL API',
                        path: '/v3.1.7/profiles/callback-url-api-profile',
                    },
                    {
                        title: 'Real Time Event Notification API',
                        path: '/v3.1.7/profiles/real-time-event-notification-api-profile',
                    },
                    {
                        title: 'Aggregated Polling API',
                        path: '/v3.1.7/profiles/aggregated-polling-api-profile',
                    },
                ],
            },
            {
                title: 'Resources and Data Models',
                path: '/v3.1.7/resources-and-data-models/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {path: '/v3.1.7/resources-and-data-models/aisp/', title: 'AIS Resources'},
                    {path: '/v3.1.7/resources-and-data-models/pisp/', title: 'PIS Resources'},
                    {path: '/v3.1.7/resources-and-data-models/cbpii/', title: 'CBPII Resources'},
                    {
                        path: '/v3.1.7/resources-and-data-models/event-notifications/',
                        title: 'Event Notification Resources'
                    },
                ]
            },
            {
                title: 'References',
                path: '/v3.1.7/references/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        path: '/v3.1.7/references/domestic-payment-message-formats',
                        title: 'Domestic Payment Message Formats'
                    },
                    {path: '/v3.1.7/references/namespaced-enumerations', title: 'Namespaced Enumerations'},
                ]
            },
            {
                title: 'Version Control',
                path: '/v3.1.7/version-control'
            },
        ]
    },
    {
        title: 'Version 3.1.6',
        path: '/v3.1.6/profiles/read-write-data-api-profile',
        collapsable: collapsable,
        sidebarDepth,
        children: [
            {
                title: 'Account and Transaction API',
                path: '/v3.1.6/profiles/account-and-transaction-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Account Access Consents',
                        path: '/v3.1.6/resources-and-data-models/aisp/account-access-consents',
                    },
                    {
                        title: 'Accounts',
                        path: '/v3.1.6/resources-and-data-models/aisp/Accounts',
                    },
                    {
                        title: 'Balances',
                        path: '/v3.1.6/resources-and-data-models/aisp/Balances',
                    },
                    {
                        title: 'Transactions',
                        path: '/v3.1.6/resources-and-data-models/aisp/Transactions',
                    },
                    {
                        title: 'Beneficiaries',
                        path: '/v3.1.6/resources-and-data-models/aisp/Beneficiaries',
                    },
                    {
                        title: 'Direct Debits',
                        path: '/v3.1.6/resources-and-data-models/aisp/direct-debits',
                    },
                    {
                        title: 'Standing Orders',
                        path: '/v3.1.6/resources-and-data-models/aisp/standing-orders',
                    },
                    {
                        title: 'Products',
                        path: '/v3.1.6/resources-and-data-models/aisp/Products',
                        collapsable: collapsable,
                        children: [
                            {
                                title: 'BCA Product Data Model',
                                path: '/v3.1.6/resources-and-data-models/aisp/bca-product-data-model',
                            },
                            {
                                title: 'PCA Product Data Model',
                                path: '/v3.1.6/resources-and-data-models/aisp/pca-product-data-model',
                            },
                            {
                                title: 'Other Product Data Model',
                                path: '/v3.1.6/resources-and-data-models/aisp/other-product-data-model',
                            },
                        ],
                    },
                    {
                        title: 'Offers',
                        path: '/v3.1.6/resources-and-data-models/aisp/Offers',
                    },
                    {
                        title: 'Parties',
                        path: '/v3.1.6/resources-and-data-models/aisp/Parties',
                    },
                    {
                        title: 'Scheduled Payments',
                        path: '/v3.1.6/resources-and-data-models/aisp/scheduled-payments',
                    },
                    {
                        title: 'Statements',
                        path: '/v3.1.6/resources-and-data-models/aisp/Statements',
                    },
                ],
            },
            {
                title: 'Payment Initiation API ',
                path: '/v3.1.6/profiles/payment-initiation-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Domestic Payments Consents',
                        path: '/v3.1.6/resources-and-data-models/pisp/domestic-payment-consents',
                    },
                    {
                        title: 'Domestic Payments',
                        path: '/v3.1.6/resources-and-data-models/pisp/domestic-payments',
                    },
                    {
                        title: 'Domestic Scheduled Payment Consents',
                        path: '/v3.1.6/resources-and-data-models/pisp/domestic-scheduled-payment-consents',
                    },
                    {
                        title: 'Domestic Scheduled Payment',
                        path: '/v3.1.6/resources-and-data-models/pisp/domestic-scheduled-payments',
                    },
                    {
                        title: 'Domestic Standing Order Consents',
                        path: '/v3.1.6/resources-and-data-models/pisp/domestic-standing-order-consents',
                    },
                    {
                        title: 'Domestic Standing Orders',
                        path: '/v3.1.6/resources-and-data-models/pisp/domestic-standing-orders',
                    },
                    {
                        title: 'International Payment Consents',
                        path: '/v3.1.6/resources-and-data-models/pisp/international-payment-consents',
                    },
                    {
                        title: 'International Payments',
                        path: '/v3.1.6/resources-and-data-models/pisp/international-payments',
                    },
                    {
                        title: 'International Scheduled Payment Consents',
                        path: '/v3.1.6/resources-and-data-models/pisp/international-scheduled-payment-consents',
                    },
                    {
                        title: 'International Scheduled Payments',
                        path: '/v3.1.6/resources-and-data-models/pisp/international-scheduled-payments',
                    },
                    {
                        title: 'International Standing Order Consents',
                        path: '/v3.1.6/resources-and-data-models/pisp/international-standing-order-consents',
                    },
                    {
                        title: 'International Standing Orders ',
                        path: '/v3.1.6/resources-and-data-models/pisp/international-standing-orders',
                    },
                    {
                        title: 'File Payment Consents',
                        path: '/v3.1.6/resources-and-data-models/pisp/file-payment-consents',
                    },
                    {
                        title: 'File Payments',
                        path: '/v3.1.6/resources-and-data-models/pisp/file-payments',
                    },
                ],
            },
            {
                title: 'Confirmation of Funds API Profile',
                path: '/v3.1.6/profiles/confirmation-of-funds-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Funds Confirmation Consent',
                        path: '/v3.1.6/resources-and-data-models/cbpii/funds-confirmation-consent',
                    },
                    {
                        title: 'Funds Confirmation',
                        path: '/v3.1.6/resources-and-data-models/cbpii/funds-confirmation',
                    },
                ],
            },
            {
                title: 'Event Notification API',
                path: '/v3.1.6/profiles/event-notification-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Event Notification Subscription API',
                        path: '/v3.1.6/profiles/event-notification-subscription-api-profile',
                    },
                    {
                        title: 'Callback URL API',
                        path: '/v3.1.6/profiles/callback-url-api-profile',
                    },
                    {
                        title: 'Real Time Event Notification API',
                        path: '/v3.1.6/profiles/real-time-event-notification-api-profile',
                    },
                    {
                        title: 'Aggregated Polling API',
                        path: '/v3.1.6/profiles/aggregated-polling-api-profile',
                    },
                ],
            },
            {
                title: 'Resources and Data Models',
                path: '/v3.1.6/resources-and-data-models/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {path: '/v3.1.6/resources-and-data-models/aisp/', title: 'AIS Resources'},
                    {path: '/v3.1.6/resources-and-data-models/pisp/', title: 'PIS Resources'},
                    {path: '/v3.1.6/resources-and-data-models/cbpii/', title: 'CBPII Resources'},
                    {
                        path: '/v3.1.6/resources-and-data-models/event-notifications/',
                        title: 'Event Notification Resources'
                    },
                ]
            },
            {
                title: 'References',
                path: '/v3.1.6/references/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        path: '/v3.1.6/references/domestic-payment-message-formats',
                        title: 'Domestic Payment Message Formats'
                    },
                    {path: '/v3.1.6/references/namespaced-enumerations', title: 'Namespaced Enumerations'},
                ]
            },
            {
                title: 'Version Control',
                path: '/v3.1.6/version-control'
            },
        ]
    },
    {
        title: 'Version 3.1.5',
        path: '/v3.1.5/profiles/read-write-data-api-profile',
        collapsable: collapsable,
        sidebarDepth,
        children: [
            {
                title: 'Account and Transaction API',
                path: '/v3.1.5/profiles/account-and-transaction-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Account Access Consents',
                        path: '/v3.1.5/resources-and-data-models/aisp/account-access-consents',
                    },
                    {
                        title: 'Accounts',
                        path: '/v3.1.5/resources-and-data-models/aisp/Accounts',
                    },
                    {
                        title: 'Balances',
                        path: '/v3.1.5/resources-and-data-models/aisp/Balances',
                    },
                    {
                        title: 'Transactions',
                        path: '/v3.1.5/resources-and-data-models/aisp/Transactions',
                    },
                    {
                        title: 'Beneficiaries',
                        path: '/v3.1.5/resources-and-data-models/aisp/Beneficiaries',
                    },
                    {
                        title: 'Direct Debits',
                        path: '/v3.1.5/resources-and-data-models/aisp/direct-debits',
                    },
                    {
                        title: 'Standing Orders',
                        path: '/v3.1.5/resources-and-data-models/aisp/standing-orders',
                    },
                    {
                        title: 'Products',
                        path: '/v3.1.5/resources-and-data-models/aisp/Products',
                        collapsable: collapsable,
                        children: [
                            {
                                title: 'BCA Product Data Model',
                                path: '/v3.1.5/resources-and-data-models/aisp/bca-product-data-model',
                            },
                            {
                                title: 'PCA Product Data Model',
                                path: '/v3.1.5/resources-and-data-models/aisp/pca-product-data-model',
                            },
                            {
                                title: 'Other Product Data Model',
                                path: '/v3.1.5/resources-and-data-models/aisp/other-product-data-model',
                            },
                        ],
                    },
                    {
                        title: 'Offers',
                        path: '/v3.1.5/resources-and-data-models/aisp/Offers',
                    },
                    {
                        title: 'Parties',
                        path: '/v3.1.5/resources-and-data-models/aisp/Parties',
                    },
                    {
                        title: 'Scheduled Payments',
                        path: '/v3.1.5/resources-and-data-models/aisp/scheduled-payments',
                    },
                    {
                        title: 'Statements',
                        path: '/v3.1.5/resources-and-data-models/aisp/Statements',
                    },
                ],
            },
            {
                title: 'Payment Initiation API ',
                path: '/v3.1.5/profiles/payment-initiation-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Domestic Payments Consents',
                        path: '/v3.1.5/resources-and-data-models/pisp/domestic-payment-consents',
                    },
                    {
                        title: 'Domestic Payments',
                        path: '/v3.1.5/resources-and-data-models/pisp/domestic-payments',
                    },
                    {
                        title: 'Domestic Scheduled Payment Consents',
                        path: '/v3.1.5/resources-and-data-models/pisp/domestic-scheduled-payment-consents',
                    },
                    {
                        title: 'Domestic Scheduled Payment',
                        path: '/v3.1.5/resources-and-data-models/pisp/domestic-scheduled-payments',
                    },
                    {
                        title: 'Domestic Standing Order Consents',
                        path: '/v3.1.5/resources-and-data-models/pisp/domestic-standing-order-consents',
                    },
                    {
                        title: 'Domestic Standing Orders',
                        path: '/v3.1.5/resources-and-data-models/pisp/domestic-standing-orders',
                    },
                    {
                        title: 'International Payment Consents',
                        path: '/v3.1.5/resources-and-data-models/pisp/international-payment-consents',
                    },
                    {
                        title: 'International Payments',
                        path: '/v3.1.5/resources-and-data-models/pisp/international-payments',
                    },
                    {
                        title: 'International Scheduled Payment Consents',
                        path: '/v3.1.5/resources-and-data-models/pisp/international-scheduled-payment-consents',
                    },
                    {
                        title: 'International Scheduled Payments',
                        path: '/v3.1.5/resources-and-data-models/pisp/international-scheduled-payments',
                    },
                    {
                        title: 'International Standing Order Consents',
                        path: '/v3.1.5/resources-and-data-models/pisp/international-standing-order-consents',
                    },
                    {
                        title: 'International Standing Orders ',
                        path: '/v3.1.5/resources-and-data-models/pisp/international-standing-orders',
                    },
                    {
                        title: 'File Payment Consents',
                        path: '/v3.1.5/resources-and-data-models/pisp/file-payment-consents',
                    },
                    {
                        title: 'File Payments',
                        path: '/v3.1.5/resources-and-data-models/pisp/file-payments',
                    },
                ],
            },
            {
                title: 'Confirmation of Funds API Profile',
                path: '/v3.1.5/profiles/confirmation-of-funds-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Funds Confirmation Consent',
                        path: '/v3.1.5/resources-and-data-models/cbpii/funds-confirmation-consent',
                    },
                    {
                        title: 'Funds Confirmation',
                        path: '/v3.1.5/resources-and-data-models/cbpii/funds-confirmation',
                    },
                ],
            },
            {
                title: 'Event Notification API',
                path: '/v3.1.5/profiles/event-notification-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Event Notification Subscription API',
                        path: '/v3.1.5/profiles/event-notification-subscription-api-profile',
                    },
                    {
                        title: 'Callback URL API',
                        path: '/v3.1.5/profiles/callback-url-api-profile',
                    },
                    {
                        title: 'Real Time Event Notification API',
                        path: '/v3.1.5/profiles/real-time-event-notification-api-profile',
                    },
                    {
                        title: 'Aggregated Polling API',
                        path: '/v3.1.5/profiles/aggregated-polling-api-profile',
                    },
                ],
            },
            {
                title: 'Resources and Data Models',
                path: '/v3.1.5/resources-and-data-models/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {path: '/v3.1.5/resources-and-data-models/aisp/', title: 'AIS Resources'},
                    {path: '/v3.1.5/resources-and-data-models/pisp/', title: 'PIS Resources'},
                    {path: '/v3.1.5/resources-and-data-models/cbpii/', title: 'CBPII Resources'},
                    {
                        path: '/v3.1.5/resources-and-data-models/event-notifications/',
                        title: 'Event Notification Resources'
                    },
                ]
            },
            {
                title: 'References',
                path: '/v3.1.5/references/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        path: '/v3.1.5/references/domestic-payment-message-formats',
                        title: 'Domestic Payment Message Formats'
                    },
                    {path: '/v3.1.5/references/namespaced-enumerations', title: 'Namespaced Enumerations'},
                ]
            },
            {
                title: 'Version Control',
                path: '/v3.1.5/version-control'
            },
        ],
    },
    {
        title: 'Version 3.1.4',
        path: '/v3.1.4/profiles/read-write-data-api-profile',
        collapsable: collapsable,
        sidebarDepth,
        children: [
            {
                title: 'Account and Transaction API',
                path: '/v3.1.4/profiles/account-and-transaction-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Account Access Consents',
                        path: '/v3.1.4/resources-and-data-models/aisp/account-access-consents',
                    },
                    {
                        title: 'Accounts',
                        path: '/v3.1.4/resources-and-data-models/aisp/accounts',
                    },
                    {
                        title: 'Balances',
                        path: '/v3.1.4/resources-and-data-models/aisp/balances',
                    },
                    {
                        title: 'Transactions',
                        path: '/v3.1.4/resources-and-data-models/aisp/transactions',
                    },
                    {
                        title: 'Beneficiaries',
                        path: '/v3.1.4/resources-and-data-models/aisp/beneficiaries',
                    },
                    {
                        title: 'Direct Debits',
                        path: '/v3.1.4/resources-and-data-models/aisp/direct-debits',
                    },
                    {
                        title: 'Standing Orders',
                        path: '/v3.1.4/resources-and-data-models/aisp/standing-orders',
                    },
                    {
                        title: 'Products',
                        path: '/v3.1.4/resources-and-data-models/aisp/products',
                        collapsable: collapsable,
                        children: [
                            {
                                title: 'BCA Product Data Model',
                                path: '/v3.1.4/resources-and-data-models/aisp/bca-product-data-model',
                            },
                            {
                                title: 'PCA Product Data Model',
                                path: '/v3.1.4/resources-and-data-models/aisp/pca-product-data-model',
                            },
                            {
                                title: 'Other Product Data Model',
                                path: '/v3.1.4/resources-and-data-models/aisp/other-product-data-model',
                            },
                        ],
                    },
                    {
                        title: 'Offers',
                        path: '/v3.1.4/resources-and-data-models/aisp/offers',
                    },
                    {
                        title: 'Parties',
                        path: '/v3.1.4/resources-and-data-models/aisp/parties',
                    },
                    {
                        title: 'Scheduled Payments',
                        path: '/v3.1.4/resources-and-data-models/aisp/scheduled-payments',
                    },
                    {
                        title: 'Statements',
                        path: '/v3.1.4/resources-and-data-models/aisp/statements',
                    },
                ],
            },
            {
                title: 'Payment Initiation API ',
                path: '/v3.1.4/profiles/payment-initiation-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Domestic Payments Consents',
                        path: '/v3.1.4/resources-and-data-models/pisp/domestic-payment-consents',
                    },
                    {
                        title: 'Domestic Payments',
                        path: '/v3.1.4/resources-and-data-models/pisp/domestic-payments',
                    },
                    {
                        title: 'Domestic Scheduled Payment Consents',
                        path: '/v3.1.4/resources-and-data-models/pisp/domestic-scheduled-payment-consents',
                    },
                    {
                        title: 'Domestic Scheduled Payment',
                        path: '/v3.1.4/resources-and-data-models/pisp/domestic-scheduled-payments',
                    },
                    {
                        title: 'Domestic Standing Order Consents',
                        path: '/v3.1.4/resources-and-data-models/pisp/domestic-standing-order-consents',
                    },
                    {
                        title: 'Domestic Standing Orders',
                        path: '/v3.1.4/resources-and-data-models/pisp/domestic-standing-orders',
                    },
                    {
                        title: 'International Payment Consents',
                        path: '/v3.1.4/resources-and-data-models/pisp/international-payment-consents',
                    },
                    {
                        title: 'International Payments',
                        path: '/v3.1.4/resources-and-data-models/pisp/international-payments',
                    },
                    {
                        title: 'International Scheduled Payment Consents',
                        path: '/v3.1.4/resources-and-data-models/pisp/international-scheduled-payment-consents',
                    },
                    {
                        title: 'International Scheduled Payments',
                        path: '/v3.1.4/resources-and-data-models/pisp/international-scheduled-payments',
                    },
                    {
                        title: 'International Standing Order Consents',
                        path: '/v3.1.4/resources-and-data-models/pisp/international-standing-order-consents',
                    },
                    {
                        title: 'International Standing Orders ',
                        path: '/v3.1.4/resources-and-data-models/pisp/international-standing-orders',
                    },
                    {
                        title: 'File Payment Consents',
                        path: '/v3.1.4/resources-and-data-models/pisp/file-payment-consents',
                    },
                    {
                        title: 'File Payments',
                        path: '/v3.1.4/resources-and-data-models/pisp/file-payments',
                    },
                ],
            },
            {
                title: 'Confirmation of Funds API Profile',
                path: '/v3.1.4/profiles/confirmation-of-funds-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Funds Confirmation Consent',
                        path: '/v3.1.4/resources-and-data-models/cbpii/funds-confirmation-consent',
                    },
                    {
                        title: 'Funds Confirmation',
                        path: '/v3.1.4/resources-and-data-models/cbpii/funds-confirmation',
                    },
                ],
            },
            {
                title: 'Event Notification API',
                path: '/v3.1.4/profiles/event-notification-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Event Notification Subscription API',
                        path: '/v3.1.4/profiles/event-notification-subscription-api-profile',
                    },
                    {
                        title: 'Callback URL API',
                        path: '/v3.1.4/profiles/callback-url-api-profile',
                    },
                    {
                        title: 'Real Time Event Notification API',
                        path: '/v3.1.4/profiles/real-time-event-notification-api-profile',
                    },
                    {
                        title: 'Aggregated Polling API',
                        path: '/v3.1.4/profiles/aggregated-polling-api-profile',
                    },
                ],
            },
            {
                title: 'Resources and Data Models',
                path: '/v3.1.4/resources-and-data-models/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    '/v3.1.4/resources-and-data-models/aisp/',
                    '/v3.1.4/resources-and-data-models/pisp/',
                    '/v3.1.4/resources-and-data-models/cbpii/',
                    '/v3.1.4/resources-and-data-models/event-notifications/',
                ]
            },
            {
                title: 'References',
                path: '/v3.1.4/references/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    '/v3.1.4/references/domestic-payment-message-formats',
                    '/v3.1.4/references/namespaced-enumerations',
                ]
            },
            {
                title: 'Version Control',
                path: '/v3.1.4/version-control'
            },
        ],
    },
    {
        title: 'Version 3.1.3',
        path: '/v3.1.3/profiles/read-write-data-api-profile',
        collapsable: collapsable,
        sidebarDepth,
        children: [
            {
                title: 'Account and Transaction API',
                path: '/v3.1.3/profiles/account-and-transaction-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Account Access Consents',
                        path: '/v3.1.3/resources-and-data-models/aisp/account-access-consents',
                    },
                    {
                        title: 'Accounts',
                        path: '/v3.1.3/resources-and-data-models/aisp/accounts',
                    },
                    {
                        title: 'Balances',
                        path: '/v3.1.3/resources-and-data-models/aisp/balances',
                    },
                    {
                        title: 'Transactions',
                        path: '/v3.1.3/resources-and-data-models/aisp/transactions',
                    },
                    {
                        title: 'Beneficiaries',
                        path: '/v3.1.3/resources-and-data-models/aisp/beneficiaries',
                    },
                    {
                        title: 'Direct Debits',
                        path: '/v3.1.3/resources-and-data-models/aisp/direct-debits',
                    },
                    {
                        title: 'Standing Orders',
                        path: '/v3.1.3/resources-and-data-models/aisp/standing-orders',
                    },
                    {
                        title: 'Products',
                        path: '/v3.1.3/resources-and-data-models/aisp/products',
                        collapsable: collapsable,
                        children: [
                            {
                                title: 'BCA Product Data Model',
                                path: '/v3.1.3/resources-and-data-models/aisp/bca-product-data-model',
                            },
                            {
                                title: 'PCA Product Data Model',
                                path: '/v3.1.3/resources-and-data-models/aisp/pca-product-data-model',
                            },
                            {
                                title: 'Other Product Data Model',
                                path: '/v3.1.3/resources-and-data-models/aisp/other-product-data-model',
                            },
                        ],
                    },
                    {
                        title: 'Offers',
                        path: '/v3.1.3/resources-and-data-models/aisp/offers',
                    },
                    {
                        title: 'Parties',
                        path: '/v3.1.3/resources-and-data-models/aisp/parties',
                    },
                    {
                        title: 'Scheduled Payments',
                        path: '/v3.1.3/resources-and-data-models/aisp/scheduled-payments',
                    },
                    {
                        title: 'Statements',
                        path: '/v3.1.3/resources-and-data-models/aisp/statements',
                    },
                ],
            },
            {
                title: 'Payment Initiation API ',
                path: '/v3.1.3/profiles/payment-initiation-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Domestic Payments Consents',
                        path: '/v3.1.3/resources-and-data-models/pisp/domestic-payment-consents',
                    },
                    {
                        title: 'Domestic Payments',
                        path: '/v3.1.3/resources-and-data-models/pisp/domestic-payments',
                    },
                    {
                        title: 'Domestic Scheduled Payment Consents',
                        path: '/v3.1.3/resources-and-data-models/pisp/domestic-scheduled-payment-consents',
                    },
                    {
                        title: 'Domestic Scheduled Payment',
                        path: '/v3.1.3/resources-and-data-models/pisp/domestic-scheduled-payments',
                    },
                    {
                        title: 'Domestic Standing Order Consents',
                        path: '/v3.1.3/resources-and-data-models/pisp/domestic-standing-order-consents',
                    },
                    {
                        title: 'Domestic Standing Orders',
                        path: '/v3.1.3/resources-and-data-models/pisp/domestic-standing-orders',
                    },
                    {
                        title: 'International Payment Consents',
                        path: '/v3.1.3/resources-and-data-models/pisp/international-payment-consents',
                    },
                    {
                        title: 'International Payments',
                        path: '/v3.1.3/resources-and-data-models/pisp/international-payments',
                    },
                    {
                        title: 'International Scheduled Payment Consents',
                        path: '/v3.1.3/resources-and-data-models/pisp/international-scheduled-payment-consents',
                    },
                    {
                        title: 'International Scheduled Payments',
                        path: '/v3.1.3/resources-and-data-models/pisp/international-scheduled-payments',
                    },
                    {
                        title: 'International Standing Order Consents',
                        path: '/v3.1.3/resources-and-data-models/pisp/international-standing-order-consents',
                    },
                    {
                        title: 'International Standing Orders ',
                        path: '/v3.1.3/resources-and-data-models/pisp/international-standing-orders',
                    },
                    {
                        title: 'File Payment Consents',
                        path: '/v3.1.3/resources-and-data-models/pisp/file-payment-consents',
                    },
                    {
                        title: 'File Payments',
                        path: '/v3.1.3/resources-and-data-models/pisp/file-payments',
                    },
                ],
            },
            {
                title: 'Confirmation of Funds API Profile',
                path: '/v3.1.3/profiles/confirmation-of-funds-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Funds Confirmation Consent',
                        path: '/v3.1.3/resources-and-data-models/cbpii/funds-confirmation-consent',
                    },
                    {
                        title: 'Funds Confirmation',
                        path: '/v3.1.3/resources-and-data-models/cbpii/funds-confirmation',
                    },
                ],
            },
            {
                title: 'Event Notification API',
                path: '/v3.1.3/profiles/event-notification-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Event Notification Subscription API',
                        path: '/v3.1.3/profiles/event-notification-subscription-api-profile',
                    },
                    {
                        title: 'Callback URL API',
                        path: '/v3.1.3/profiles/callback-url-api-profile',
                    },
                    {
                        title: 'Real Time Event Notification API',
                        path: '/v3.1.3/profiles/real-time-event-notification-api-profile',
                    },
                    {
                        title: 'Aggregated Polling API',
                        path: '/v3.1.3/profiles/aggregated-polling-api-profile',
                    },
                ],
            },
            {
                title: 'Resources and Data Models',
                path: '/v3.1.3/resources-and-data-models/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    '/v3.1.3/resources-and-data-models/aisp/',
                    '/v3.1.3/resources-and-data-models/pisp/',
                    '/v3.1.3/resources-and-data-models/cbpii/',
                    '/v3.1.3/resources-and-data-models/event-notifications/',
                ]
            },
            {
                title: 'References',
                path: '/v3.1.3/references/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    '/v3.1.3/references/domestic-payment-message-formats',
                    '/v3.1.3/references/namespaced-enumerations',
                ]
            },
            {
                title: 'Version Control',
                path: '/v3.1.3/version-control'
            },

        ],
    },
    {
        title: 'Version 3.1.2',
        path: '/v3.1.2/profiles/read-write-data-api-profile',
        collapsable: collapsable,
        sidebarDepth,
        children: [
            {
                title: 'Account and Transaction API',
                path: '/v3.1.2/profiles/account-and-transaction-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Account Access Consents',
                        path: '/v3.1.2/resources-and-data-models/aisp/account-access-consents',
                    },
                    {
                        title: 'Accounts',
                        path: '/v3.1.2/resources-and-data-models/aisp/accounts',
                    },
                    {
                        title: 'Balances',
                        path: '/v3.1.2/resources-and-data-models/aisp/balances',
                    },
                    {
                        title: 'Transactions',
                        path: '/v3.1.2/resources-and-data-models/aisp/transactions',
                    },
                    {
                        title: 'Beneficiaries',
                        path: '/v3.1.2/resources-and-data-models/aisp/beneficiaries',
                    },
                    {
                        title: 'Direct Debits',
                        path: '/v3.1.2/resources-and-data-models/aisp/direct-debits',
                    },
                    {
                        title: 'Standing Orders',
                        path: '/v3.1.2/resources-and-data-models/aisp/standing-orders',
                    },
                    {
                        title: 'Products',
                        path: '/v3.1.2/resources-and-data-models/aisp/products',
                        collapsable: collapsable,
                        children: [
                            {
                                title: 'BCA Product Data Model',
                                path: '/v3.1.2/resources-and-data-models/aisp/bca-product-data-model',
                                sidebarDepth,
                            },
                            {
                                title: 'PCA Product Data Model',
                                path: '/v3.1.2/resources-and-data-models/aisp/pca-product-data-model',
                                sidebarDepth,
                            },
                            {
                                title: 'Other Product Data Model',
                                path: '/v3.1.2/resources-and-data-models/aisp/other-product-data-model',
                                sidebarDepth,
                            },
                        ],
                    },
                    {
                        title: 'Offers',
                        path: '/v3.1.2/resources-and-data-models/aisp/offers',
                    },
                    {
                        title: 'Parties',
                        path: '/v3.1.2/resources-and-data-models/aisp/parties',
                    },
                    {
                        title: 'Scheduled Payments',
                        path: '/v3.1.2/resources-and-data-models/aisp/scheduled-payments',
                    },
                    {
                        title: 'Statements',
                        path: '/v3.1.2/resources-and-data-models/aisp/statements',
                    },
                ],
            },
            {
                title: 'Payment Initiation API ',
                path: '/v3.1.2/profiles/payment-initiation-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Domestic Payments Consents',
                        path: '/v3.1.2/resources-and-data-models/pisp/domestic-payment-consents',
                    },
                    {
                        title: 'Domestic Payments',
                        path: '/v3.1.2/resources-and-data-models/pisp/domestic-payments',
                    },
                    {
                        title: 'Domestic Scheduled Payment Consents',
                        path: '/v3.1.2/resources-and-data-models/pisp/domestic-scheduled-payment-consents',
                    },
                    {
                        title: 'Domestic Scheduled Payment',
                        path: '/v3.1.2/resources-and-data-models/pisp/domestic-scheduled-payments',
                    },
                    {
                        title: 'Domestic Standing Order Consents',
                        path: '/v3.1.2/resources-and-data-models/pisp/domestic-standing-order-consents',
                    },
                    {
                        title: 'Domestic Standing Orders',
                        path: '/v3.1.2/resources-and-data-models/pisp/domestic-standing-orders',
                    },
                    {
                        title: 'International Payment Consents',
                        path: '/v3.1.2/resources-and-data-models/pisp/international-payment-consents',
                    },
                    {
                        title: 'International Payments',
                        path: '/v3.1.2/resources-and-data-models/pisp/international-payments',
                    },
                    {
                        title: 'International Scheduled Payment Consents',
                        path: '/v3.1.2/resources-and-data-models/pisp/international-scheduled-payment-consents',
                    },
                    {
                        title: 'International Scheduled Payments',
                        path: '/v3.1.2/resources-and-data-models/pisp/international-scheduled-payments',
                    },
                    {
                        title: 'International Standing Order Consents',
                        path: '/v3.1.2/resources-and-data-models/pisp/international-standing-order-consents',
                    },
                    {
                        title: 'International Standing Orders ',
                        path: '/v3.1.2/resources-and-data-models/pisp/international-standing-orders',
                    },
                    {
                        title: 'File Payment Consents',
                        path: '/v3.1.2/resources-and-data-models/pisp/file-payment-consents',
                    },
                    {
                        title: 'File Payments',
                        path: '/v3.1.2/resources-and-data-models/pisp/file-payments',
                    },
                ],
            },
            {
                title: 'Confirmation of Funds API Profile',
                path: '/v3.1.2/profiles/confirmation-of-funds-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Funds Confirmation Consent',
                        path: '/v3.1.2/resources-and-data-models/cbpii/funds-confirmation-consent',
                    },
                    {
                        title: 'Funds Confirmation',
                        path: '/v3.1.2/resources-and-data-models/cbpii/funds-confirmation',
                    },
                ],
            },
            {
                title: 'Event Notification API',
                path: '/v3.1.2/profiles/event-notification-api-profile',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    {
                        title: 'Event Notification Subscription API',
                        path: '/v3.1.2/profiles/event-notification-subscription-api-profile',
                    },
                    {
                        title: 'Callback URL API',
                        path: '/v3.1.2/profiles/callback-url-api-profile',
                    },
                    {
                        title: 'Real Time Event Notification API',
                        path: '/v3.1.2/profiles/real-time-event-notification-api-profile',
                    },
                    {
                        title: 'Aggregated Polling API',
                        path: '/v3.1.2/profiles/aggregated-polling-api-profile',
                    },
                ],
            },
            {
                title: 'Resources and Data Models',
                path: '/v3.1.2/resources-and-data-models/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    '/v3.1.2/resources-and-data-models/aisp/',
                    '/v3.1.2/resources-and-data-models/pisp/',
                    '/v3.1.2/resources-and-data-models/cbpii/',
                    '/v3.1.2/resources-and-data-models/event-notifications/',
                ]
            },
            {
                title: 'References',
                path: '/v3.1.2/references/',
                collapsable: collapsable,
                sidebarDepth,
                children: [
                    '/v3.1.2/references/domestic-payment-message-formats',
                    '/v3.1.2/references/namespaced-enumerations',
                ]
            },
            {
                title: 'Version Control',
                path: '/v3.1.2/version-control'
            },
        ],
    },
    ['https://standards.openbanking.org.uk/api-specifications/read-write-specs/v3-1-1/', 'Version 3.1.1'],
    ['https://standards.openbanking.org.uk/api-specifications/read-write-specs/v3-1/', 'Version 3.1']
];
