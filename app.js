// Property Management System JavaScript

// Global Data Storage
let properties = [];
let currentPropertyId = null;
let currentPaymentId = null;
let nextId = 1;
let nextReceiptId = 1;
let nextInvoiceId = 1;

// Table Column Configuration
// Default visible columns configuration
const defaultVisibleColumns = [
    'serialNo', 'name', 'address', 'type', 'rentAmount', 'status', 'actions'
];

let tableColumns = {
    // Basic Information
    serialNo: { label: 'Serial No', visible: defaultVisibleColumns.includes('serialNo'), category: 'basic' },
    name: { label: 'Property Name', visible: defaultVisibleColumns.includes('name'), category: 'basic' },
    address: { label: 'Address', visible: defaultVisibleColumns.includes('address'), category: 'basic' },
    type: { label: 'Property Type', visible: defaultVisibleColumns.includes('type'), category: 'basic' },
    status: { label: 'Status', visible: defaultVisibleColumns.includes('status'), category: 'basic' },
    actions: { label: 'Actions', visible: defaultVisibleColumns.includes('actions'), category: 'basic' },
    
    // Property Information
    projectName: { label: 'Project Name', visible: false, category: 'property' },
    officerNo: { label: 'Office No', visible: false, category: 'property' },
    floorNo: { label: 'Floor No', visible: false, category: 'property' },
    carpetArea: { label: 'Carpet Area', visible: false, category: 'property' },
    superBuiltupArea: { label: 'Super Built-up Area', visible: false, category: 'property' },
    terraceArea: { label: 'Terrace Area', visible: false, category: 'property' },
    furniture: { label: 'Furniture', visible: false, category: 'property' },
    shopFrontage: { label: 'Frontage', visible: false, category: 'property' },
    dimensions: { label: 'Dimensions', visible: false, category: 'property' },
    ceilingHeight: { label: 'Ceiling Height', visible: false, category: 'property' },
    electricityCharges: { label: 'Electricity Charges', visible: false, category: 'property' },
    lessorName: { label: 'Lessor Name', visible: false, category: 'property' },
    lessorGstin: { label: 'Lessor GSTIN', visible: false, category: 'property' },
    lessorPan: { label: 'Lessor PAN', visible: false, category: 'property' },
    
    // Rental Information
    lesseeName: { label: 'Lessee Name', visible: false, category: 'rental' },
    lesseeGstin: { label: 'Lessee GSTIN', visible: false, category: 'rental' },
    lesseePan: { label: 'Lessee PAN', visible: false, category: 'rental' },
    rentAmount: { label: 'Rent Amount', visible: defaultVisibleColumns.includes('rentAmount'), category: 'rental' },
    rentPeriod: { label: 'Rent Period', visible: false, category: 'rental' },
    securityDeposit: { label: 'Security Deposit', visible: false, category: 'rental' },
    agreementStartDate: { label: 'Agreement Start', visible: false, category: 'rental' },
    agreementTenure: { label: 'Agreement Tenure', visible: false, category: 'rental' },
    rentPayableDate: { label: 'Rent Due Date', visible: false, category: 'rental' },
    escalationPercentage: { label: 'Escalation %', visible: false, category: 'rental' },
    escalationPeriod: { label: 'Escalation Period', visible: false, category: 'rental' },
    gstIncludedInRent: { label: 'GST Included', visible: false, category: 'rental' },
    municipalTaxes: { label: 'Municipal Taxes', visible: false, category: 'rental' },
    municipalTaxesAmount: { label: 'Municipal Taxes Amount', visible: false, category: 'rental' },
    municipalTaxesBorneBy: { label: 'Municipal Taxes Borne By', visible: false, category: 'rental' },
    signageTax: { label: 'Signage Tax', visible: false, category: 'rental' },
    signageTaxAmount: { label: 'Signage Tax Amount', visible: false, category: 'rental' },
    signageTaxBorneBy: { label: 'Signage Tax Borne By', visible: false, category: 'rental' },
    legalCharges: { label: 'Legal Charges', visible: false, category: 'rental' },
    legalChargesAmount: { label: 'Legal Charges Amount', visible: false, category: 'rental' },
    legalChargesBorneBy: { label: 'Legal Charges Borne By', visible: false, category: 'rental' },
    legalChargesLessorPercentage: { label: 'Legal Charges Lessor %', visible: false, category: 'rental' },
    legalChargesLesseePercentage: { label: 'Legal Charges Lessee %', visible: false, category: 'rental' },
    maintenance: { label: 'Maintenance', visible: false, category: 'rental' },
    maintenanceAmount: { label: 'Maintenance Amount', visible: false, category: 'rental' },
    maintenanceBorneBy: { label: 'Maintenance Borne By', visible: false, category: 'rental' }
};

// Static Data
const billTypes = [
    { name: "Property Tax", key: "propertyTax" },
    { name: "Light Bill", key: "lightBill" },
    { name: "Gas Bill", key: "gasBill" },
    { name: "Internet Bill", key: "internetBill" }
];

const propertyTypes = [
    "Residential",
    "Commercial",
    "Industrial"
];

const agreementTypes = [
    "Notary",
    "Registry"
];

const paymentModes = ["Cash", "Cheque", "Online", "UPI", "NEFT", "RTGS", "Bank Transfer"];
const gstRate = 18;

// Initialize sample data from provided JSON
const sampleData = {
    properties: [
        {
            id: 1,
            name: "Sunrise Apartments A-101",
            address: "Sector 15, Gandhinagar",
            type: "2BHK Apartment",
            rentPerSqft: 25,
            monthlyRent: 18000,
            projectName: "Sunrise Complex",
            officerNo: "101",
            floorNo: "1st Floor",
            furniture: "Semi-Furnished",
            carpetArea: "850 sqft",
            superBuiltupArea: "1200 sqft",
            balconyArea: "100 sqft",
            terraceArea: "0 sqft",
            isRental: true,
            rentAmount: 18000,
            rentPeriod: "month",
            gstIncludedInRent: true,
            gstPercentage: 18,
            rentPayableDate: 7,
            agreementStartDate: "2024-01-15",
            agreementTenureAmount: 24,
            agreementTenureUnit: "months",
            securityDeposit: 36000,
            escalationPercentage: 5,
            escalationPeriod: 'months',
            lessorName: "Rajesh Patel",
            lessorAddress: "123 Main Street, Ahmedabad",
            lessorContact: "9876543210",
            lessorEmail: "rajesh@example.com",
            lesseeName: "Priya Sharma",
            lesseeAddress: "456 Garden Road, Gandhinagar",
            lesseeContact: "9123456789",
            lesseeEmail: "priya@example.com",
            gstin: "27XXXXX1234X1Z5",
            panNo: "ABCDE1234F",
            agreementType: "Notary",
            bankName: "HDFC Bank",
            accountNo: "12345678901",
            ifscCode: "HDFC0001234",
            maintenanceEnabled: true,
            maintenance: {
                amount: 2000,
                period: "month"
            },
            rentFreePeriodAmount: 15,
            rentFreePeriodUnit: "days",
            status: "Active",
            paymentHistory: [
                {
                    id: 1,
                    date: "2025-01-01",
                    dueDate: "2025-01-05",
                    base: 18000,
                    gst: 3240,
                    total: 21240,
                    status: "Paid",
                    paymentDate: "2025-01-03",
                    paymentMode: "Online",
                    receiptNo: "RCP001"
                },
                {
                    id: 2,
                    date: "2025-02-01",
                    dueDate: "2025-02-05",
                    base: 18000,
                    gst: 3240,
                    total: 21240,
                    status: "Paid",
                    paymentDate: "2025-02-07",
                    paymentMode: "UPI",
                    receiptNo: "RCP002"
                },
                {
                    id: 3,
                    date: "2025-03-01",
                    dueDate: "2025-03-05",
                    base: 18000,
                    gst: 3240,
                    total: 21240,
                    status: "Overdue"
                }
            ],
            bills: {
                propertyTax: { checked: true, billNo: "PT2024001", trackingDay: "365" },
                lightBill: { checked: true, billNo: "EB240301", trackingDay: "90" },
                gasBill: { checked: true, billNo: "GB240215", trackingDay: "60" },
                internetBill: { checked: true, billNo: "INT240220", trackingDay: "30" }
            },
            documents: [
                { name: "Rent Agreement.pdf", uploadDate: "2024-01-15" },
                { name: "Property Papers.pdf", uploadDate: "2024-01-15" }
            ]
        },
        {
            id: 2,
            name: "Green Valley B-205",
            address: "Sector 22, Ahmedabad",
            type: "3BHK Apartment",
            monthlyRent: 25000,
            isRental: true,
            rentAmount: 25000,
            rentPeriod: "month",
            status: "Active",
            lesseeName: "Amit Kumar",
            lesseeContact: "9876543211",
            paymentHistory: [
                {
                    id: 1,
                    date: "2025-01-01",
                    dueDate: "2025-01-10",
                    base: 25000,
                    gst: 4500,
                    total: 29500,
                    status: "Paid",
                    paymentDate: "2025-01-09",
                    paymentMode: "Cheque",
                    receiptNo: "RCP003"
                },
                {
                    id: 2,
                    date: "2025-02-01",
                    dueDate: "2025-02-10",
                    base: 25000,
                    gst: 4500,
                    total: 29500,
                    status: "Pending"
                }
            ]
        },
        {
            id: 3,
            name: "Premium Office Space",
            projectName: "Business Park Tower",
            address: "456 Corporate Avenue, Business District",
            type: "Commercial",
            carpetArea: "1200 sqft",
            superBuiltupArea: "1500 sqft",
            balconyArea: "0 sqft",
            terraceArea: "200 sqft",
            isRental: true,
            rentAmount: 45000,
            rentPeriod: "month",
            gstIncludedInRent: true,
            gstPercentage: 18,
            rentPayableDate: 7,
            agreementStartDate: "2025-01-15", // Today's date
            agreementTenureAmount: 36, // 3 years in months
            agreementTenureUnit: "months",
            securityDeposit: 135000, // 3 months rent
            escalationPercentage: 8,
            escalationPeriod: 'months',
            rentFreePeriodAmount: 30,
            rentFreePeriodUnit: "days",
            lesseeName: "TechCorp Solutions",
            lesseePhone: "+91 98765 43211",
            lesseeEmail: "contact@techcorp.com",
            lesseeAddress: "789 Tech Street, IT Hub",
            gstin: "27XXXXX5678X9Y0",
            panNo: "TECHC1234G",
            agreementType: "Registry",
            bankName: "ICICI Bank",
            accountNo: "98765432109",
            ifscCode: "ICIC0009876",
            maintenanceEnabled: true,
            maintenance: {
                amount: 5000,
                period: "month"
            },
            status: "Active",
            paymentHistory: [
                {
                    id: 4,
                    date: "2025-01-15",
                    dueDate: "2025-02-15",
                    base: 38136, // GST included calculation
                    gst: 6864,
                    total: 45000,
                    status: "Pending"
                }
            ],
            bills: {
                propertyTax: { 
                    checked: true, 
                    billNo: "PT2025001", 
                    trackingDay: "365",
                    documents: [
                        {
                            name: "Commercial Property Tax 2025.pdf",
                            uploadDate: "2025-01-15",
                            size: 320000,
                            type: "application/pdf"
                        }
                    ]
                },
                lightBill: { 
                    checked: true, 
                    billNo: "EB250115", 
                    trackingDay: "90",
                    documents: [
                        {
                            name: "Electricity Bill Jan 2025.pdf",
                            uploadDate: "2025-01-15",
                            size: 145000,
                            type: "application/pdf"
                        },
                        {
                            name: "Electricity Bill Feb 2025.pdf",
                            uploadDate: "2025-02-15",
                            size: 138000,
                            type: "application/pdf"
                        }
                    ]
                },
                gasBill: { checked: false },
                internetBill: { 
                    checked: true, 
                    billNo: "INT250120", 
                    trackingDay: "60",
                    documents: [
                        {
                            name: "Internet Bill February 2025.pdf",
                            uploadDate: "2025-02-20",
                            size: 75000,
                            type: "application/pdf"
                        },
                        {
                            name: "Broadband Service Agreement.pdf",
                            uploadDate: "2025-01-20",
                            size: 280000,
                            type: "application/pdf"
                        }
                    ]
                }
            },
            documents: [
                { name: "Commercial Lease Agreement.pdf", uploadDate: "2025-01-15" },
                { name: "Property Registration.pdf", uploadDate: "2025-01-15" }
            ]
        },
        {
            id: 4,
            name: "Residential Villa",
            projectName: "Garden Heights",
            address: "789 Garden Road, Suburb Area",
            type: "Residential",
            carpetArea: "1500 sqft",
            superBuiltupArea: "2000 sqft",
            balconyArea: "200 sqft",
            terraceArea: "300 sqft",
            isRental: true,
            rentAmount: 15000,
            rentPeriod: "month",
            gstIncludedInRent: false, // No GST for residential
            gstPercentage: 0,
            rentPayableDate: 7,
            agreementStartDate: "2024-10-14", // October 14th start date
            agreementTenureAmount: 2,
            agreementTenureUnit: "years",
            securityDeposit: 45000, // 3 months rent
            escalationPercentage: 5,
            escalationPeriod: 'months',
            rentFreePeriodAmount: 15,
            rentFreePeriodUnit: "days",
            lesseeName: "Mr. Sharma Family",
            lesseePhone: "+91 98765 43212",
            lesseeEmail: "sharma.family@email.com",
            lesseeAddress: "456 Family Street, Residential Area",
            gstin: "N/A", // Residential property
            panNo: "SHARM1234A",
            agreementType: "Notary",
            bankName: "SBI Bank",
            accountNo: "123456789012",
            ifscCode: "SBIN0001234",
            maintenanceEnabled: true,
            maintenance: {
                amount: 3000,
                period: "month"
            },
            status: "Active",
            paymentHistory: [],
            bills: {
                propertyTax: { checked: true, billNo: "PT2024004", dueDate: "2025-03-31", period: "yearly" },
                lightBill: { checked: true, billNo: "EB241014", dueDate: "2024-11-15", period: "monthly" },
                gasBill: { checked: true, billNo: "GB241020", dueDate: "2024-11-20", period: "monthly" },
                internetBill: { checked: false }
            },
            documents: [
                { name: "Residential Lease Agreement.pdf", uploadDate: "2024-10-14" },
                { name: "Property Registration.pdf", uploadDate: "2024-10-14" }
            ]
        },
        
        // Sample property with 15k rent, 2 years, 7th payable, 18/7/2025 start, 5% escalation
        {
            id: 5,
            name: "Modern Apartment",
            projectName: "Skyline Towers",
            address: "123 Skyline Avenue, City Center",
            type: "Residential",
            carpetArea: "1000 sqft",
            superBuiltupArea: "1300 sqft",
            balconyArea: "150 sqft",
            terraceArea: "0 sqft",
            isRental: true,
            rentAmount: 15000,
            rentPeriod: "month",
            gstIncludedInRent: false, // Residential - no GST
            gstPercentage: 0,
            rentPayableDate: 7, // 7th of every month
            agreementStartDate: "2025-09-26", // 26/9/2025 start date
            agreementTenureAmount: 2, // 2 years
            agreementTenureUnit: "years",
            securityDeposit: 45000, // 3 months rent
            escalationPercentage: 5, // 5% annual escalation
            escalationPeriod: 'months',
            rentFreePeriodAmount: 0,
            rentFreePeriodUnit: "days",
            lesseeName: "Mr. Kumar",
            lesseePhone: "+91 98765 12345",
            lesseeEmail: "kumar.tenant@email.com",
            lesseeAddress: "789 Tenant Street, City Area",
            gstin: "N/A", // Residential property
            panNo: "KUMAR1234B",
            agreementType: "Notary",
            bankName: "HDFC Bank",
            accountNo: "987654321098",
            ifscCode: "HDFC0000987",
            maintenanceEnabled: true,
            maintenance: {
                amount: 2000,
                period: "month"
            },
            status: "Active",
            paymentHistory: [], // Empty for dynamic generation
            bills: {
                propertyTax: { 
                    checked: true, 
                    billNo: "PT2025005", 
                    dueDate: "2026-03-31", 
                    period: "yearly",
                    documents: [
                        {
                            name: "Property Tax Receipt 2025.pdf",
                            uploadDate: "2025-09-26",
                            size: 245760,
                            type: "application/pdf"
                        },
                        {
                            name: "Property Registration Certificate.pdf",
                            uploadDate: "2025-09-26",
                            size: 512000,
                            type: "application/pdf"
                        }
                    ]
                },
                lightBill: { 
                    checked: true, 
                    billNo: "EB250926", 
                    dueDate: "2025-09-15", 
                    period: "monthly",
                    documents: [
                        {
                            name: "Electricity Bill Sep 2025.pdf",
                            uploadDate: "2025-09-15",
                            size: 128000,
                            type: "application/pdf"
                        }
                    ]
                },
                gasBill: { 
                    checked: true, 
                    billNo: "GB250930", 
                    dueDate: "2025-09-30", 
                    period: "monthly",
                    documents: [
                        {
                            name: "Gas Bill September 2025.pdf",
                            uploadDate: "2025-09-30",
                            size: 89000,
                            type: "application/pdf"
                        },
                        {
                            name: "Gas Connection Certificate.jpg",
                            uploadDate: "2025-09-30",
                            size: 156000,
                            type: "image/jpeg"
                        }
                    ]
                },
                internetBill: { 
                    checked: true, 
                    billNo: "IN251005", 
                    dueDate: "2025-10-05", 
                    period: "monthly",
                    documents: [
                        {
                            name: "Internet Bill October 2025.pdf",
                            uploadDate: "2025-10-05",
                            size: 67000,
                            type: "application/pdf"
                        },
                        {
                            name: "Broadband Installation Receipt.pdf",
                            uploadDate: "2025-10-05",
                            size: 98000,
                            type: "application/pdf"
                        },
                        {
                            name: "Router Warranty Card.pdf",
                            uploadDate: "2025-10-05",
                            size: 45000,
                            type: "application/pdf"
                        }
                    ]
                }
            },
            documents: [
                { name: "2-Year Lease Agreement.pdf", uploadDate: "2025-09-26" },
                { name: "Property Registration.pdf", uploadDate: "2025-09-26" }
            ]
        }
    ]
};

// DOM Elements
const mainDashboard = document.getElementById('mainDashboard');
const paymentDashboard = document.getElementById('paymentDashboard');
const addPropertyBtn = document.getElementById('addPropertyBtn');
const propertyModal = document.getElementById('propertyModal');
const paymentModal = document.getElementById('paymentModal');
const modalOverlay = document.getElementById('modalOverlay');
const paymentModalOverlay = document.getElementById('paymentModalOverlay');
const modalClose = document.getElementById('modalClose');
const paymentModalClose = document.getElementById('paymentModalClose');
const cancelBtn = document.getElementById('cancelBtn');
const paymentCancelBtn = document.getElementById('paymentCancelBtn');
const savePropertyBtn = document.getElementById('savePropertyBtn');
const submitPaymentBtn = document.getElementById('submitPaymentBtn');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const propertiesTableBody = document.getElementById('propertiesTableBody');
const paymentTableBody = document.getElementById('paymentTableBody');
const billTrackingTableBody = document.getElementById('billTrackingTableBody');
const modalTitle = document.getElementById('modalTitle');
const propertyTypeSelect = document.getElementById('propertyTypeSelect');
const agreementTypeSelect = document.getElementById('agreementTypeSelect');
const isRentalCheckbox = document.getElementById('isRentalToggle');
const billsSection = document.getElementById('billsSection');
const addCustomBillBtn = document.getElementById('addCustomBillBtn');
const customBillsList = document.getElementById('customBillsList');
const documentInput = document.getElementById('documentInput');
const uploadDocBtn = document.getElementById('uploadDocBtn');
const documentList = document.getElementById('documentList');
const backToPropertiesBtn = document.getElementById('backToPropertiesBtn');
const billButtons = document.getElementById('billButtons');
const individualBillSections = document.getElementById('individualBillSections');

// Data persistence functions
function saveData() {
    try {
        localStorage.setItem('propertyManagementData', JSON.stringify({
            properties: properties,
            nextId: nextId,
            nextReceiptId: nextReceiptId,
            nextInvoiceId: nextInvoiceId
        }));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

function loadData() {
    try {
        const savedData = localStorage.getItem('propertyManagementData');
        if (savedData) {
            const data = JSON.parse(savedData);
            properties = data.properties || [];
            nextId = data.nextId || 1;
            nextReceiptId = data.nextReceiptId || 1;
            nextInvoiceId = data.nextInvoiceId || 1;
        }
    } catch (error) {
        console.error('Error loading data:', error);
        // Reset to default data if loading fails
        properties = [];
        nextId = 1;
        nextReceiptId = 1;
        nextInvoiceId = 1;
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    loadTableSettings();
    initializeApp();
    setupEventListeners();
    populateSelectOptions();
    renderPropertiesTable();
    updateDashboardSummary();
});

function initializeApp() {
    // Only use sample data if no data is loaded from localStorage
    if (properties.length === 0) {
        properties = sampleData.properties;
        nextId = 5;
    }
    nextReceiptId = 8;
    nextInvoiceId = 1;
}

function setupEventListeners() {
    // Modal controls
    addPropertyBtn.addEventListener('click', () => openPropertyModal());
    modalClose.addEventListener('click', closePropertyModal);
    paymentModalClose.addEventListener('click', closePaymentModal);
    modalOverlay.addEventListener('click', closePropertyModal);
    paymentModalOverlay.addEventListener('click', closePaymentModal);
    cancelBtn.addEventListener('click', closePropertyModal);
    paymentCancelBtn.addEventListener('click', closePaymentModal);
    savePropertyBtn.addEventListener('click', saveProperty);
    submitPaymentBtn.addEventListener('click', submitPayment);

    // Navigation
    backToPropertiesBtn.addEventListener('click', showMainDashboard);

    // Bill tracking will be handled dynamically

    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = e.target.dataset.tab;
            switchTab(tabName);
        });
    });

    // Search and filter
    searchInput.addEventListener('input', filterProperties);
    typeFilter.addEventListener('change', filterProperties);

    // Rental checkbox
    isRentalCheckbox.addEventListener('change', toggleRentalFields);

    // Maintenance checkbox
    const maintenanceCheckbox = document.getElementById('maintenanceCheckbox');
    if (maintenanceCheckbox) {
        maintenanceCheckbox.addEventListener('change', toggleMaintenanceFields);
    }

    // Legal charges select
    const legalChargesSelect = document.getElementById('legalChargesSelect');
    if (legalChargesSelect) {
        legalChargesSelect.addEventListener('change', toggleLegalChargesCustom);
    }

    // Municipal taxes checkbox
    const municipalTaxesCheckbox = document.getElementById('municipalTaxesCheckbox');
    if (municipalTaxesCheckbox) {
        municipalTaxesCheckbox.addEventListener('change', toggleMunicipalTaxesFields);
    }

    // Signage tax checkbox
    const signageTaxCheckbox = document.getElementById('signageTaxCheckbox');
    if (signageTaxCheckbox) {
        signageTaxCheckbox.addEventListener('change', toggleSignageTaxFields);
    }

    // Legal charges checkbox
    const legalChargesCheckbox = document.getElementById('legalChargesCheckbox');
    if (legalChargesCheckbox) {
        legalChargesCheckbox.addEventListener('change', toggleLegalChargesFields);
    }


    // Legal charges borne by select
    const legalChargesBorneBySelect = document.getElementById('legalChargesBorneBySelect');
    if (legalChargesBorneBySelect) {
        legalChargesBorneBySelect.addEventListener('change', toggleLegalChargesCustom);
    }

    // GST checkbox
    const gstCheckbox = document.getElementById('gstCheckbox');
    if (gstCheckbox) {
        gstCheckbox.addEventListener('change', function(event) {
            event.stopPropagation();
            toggleGstFields();
        });
    }

    // Legal charges percentage auto-calculation
    const legalChargesLessorPercentage = document.querySelector('[name="legalChargesLessorPercentage"]');
    const legalChargesLesseePercentage = document.querySelector('[name="legalChargesLesseePercentage"]');
    
    if (legalChargesLessorPercentage && legalChargesLesseePercentage) {
        legalChargesLessorPercentage.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                const lessorPercentage = parseFloat(this.value);
                if (!isNaN(lessorPercentage)) {
                    const lesseePercentage = Math.max(0, 100 - lessorPercentage);
                    legalChargesLesseePercentage.value = lesseePercentage;
                }
            } else {
                legalChargesLesseePercentage.value = '';
            }
        });
        
        legalChargesLesseePercentage.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                const lesseePercentage = parseFloat(this.value);
                if (!isNaN(lesseePercentage)) {
                    const lessorPercentage = Math.max(0, 100 - lesseePercentage);
                    legalChargesLessorPercentage.value = lessorPercentage;
                }
            } else {
                legalChargesLessorPercentage.value = '';
            }
        });
    }

    // Auto-calculate rent per sqft
    document.addEventListener('input', function(e) {
        if (e.target.name === 'carpetArea' || e.target.name === 'rentAmount') {
            calculateRentPerSqft();
        }
    });

    // Custom bills
    addCustomBillBtn.addEventListener('click', addCustomBill);

    // Document upload
    uploadDocBtn.addEventListener('click', addDocument);

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!propertyModal.classList.contains('hidden')) {
                closePropertyModal();
            }
            if (!paymentModal.classList.contains('hidden')) {
                closePaymentModal();
            }
        }
    });

    // Close payment dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.payment-actions')) {
            document.querySelectorAll('.payment-dropdown').forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
        }
    });
}

function populateSelectOptions() {
    // Property types
    propertyTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        propertyTypeSelect.appendChild(option);
        
        // Also add to filter
        const filterOption = document.createElement('option');
        filterOption.value = type;
        filterOption.textContent = type;
        typeFilter.appendChild(filterOption);
    });

    // Agreement types
    agreementTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        agreementTypeSelect.appendChild(option);
    });

    // Payment modes
    const paymentModeSelect = document.getElementById('paymentMode');
    paymentModes.forEach(mode => {
        const option = document.createElement('option');
        option.value = mode;
        option.textContent = mode;
        paymentModeSelect.appendChild(option);
    });
}

function showMainDashboard() {
    mainDashboard.classList.remove('hidden');
    paymentDashboard.classList.add('hidden');
    currentPropertyId = null;
}

function showPaymentDashboard(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    currentPropertyId = propertyId;
    
    // Update property info
    document.getElementById('paymentPropertyName').textContent = property.name || 'Unnamed Property';
    document.getElementById('paymentPropertyAddress').textContent = property.address || 'No address';
    
    // Show payment dashboard
    mainDashboard.classList.add('hidden');
    paymentDashboard.classList.remove('hidden');
    
    // Render payment data
    renderPaymentTable();
    renderBillButtons();
    updatePaymentSummary();
    
    // Ensure payment history table is visible when entering payment dashboard
    const paymentHistoryTable = document.querySelector('#paymentDashboard .table-container');
    if (paymentHistoryTable) {
        paymentHistoryTable.style.display = 'block';
    }
    
    // Hide any open bill sections
    const billSections = document.querySelectorAll('#individualBillSections .table-container');
    billSections.forEach(section => {
        section.classList.add('hidden');
    });
}

function refreshPaymentDashboardIfOpen(propertyId) {
    // Check if payment dashboard is currently open and showing this property
    const isPaymentDashboardOpen = !paymentDashboard.classList.contains('hidden');
    const isCurrentProperty = currentPropertyId === propertyId;
    
    if (isPaymentDashboardOpen && isCurrentProperty) {
        // Refresh the payment dashboard data
        const property = properties.find(p => p.id === propertyId);
        if (property) {
            // Update property info in case name or address changed
            document.getElementById('paymentPropertyName').textContent = property.name || 'Unnamed Property';
            document.getElementById('paymentPropertyAddress').textContent = property.address || 'No address';
            
            // Re-render all payment data with updated rent amount
            renderPaymentTable();
            renderBillButtons();
            updatePaymentSummary();
            
            showNotification('Payment schedule updated with new rent amount', 'success');
        }
    }
}


function renderBillButtons() {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills || !billButtons) return;

    billButtons.innerHTML = '';

    // Create buttons for standard bills
    billTypes.forEach(bill => {
        const billData = property.bills[bill.key];
        if (billData && billData.checked) {
            const button = document.createElement('button');
            button.className = 'btn bill-button';
            button.textContent = bill.name;
            button.onclick = () => toggleIndividualBill(bill.key);
            billButtons.appendChild(button);
        }
    });

    // Create buttons for custom bills
    if (property.bills.customBills && property.bills.customBills.length > 0) {
        property.bills.customBills.forEach((customBill, index) => {
            const button = document.createElement('button');
            button.className = 'btn bill-button';
            button.textContent = customBill.name;
            button.onclick = () => toggleIndividualBill(`custom-${index}`);
            billButtons.appendChild(button);
        });
    }

    // Show message if no bill types are available
    if (billButtons.children.length === 0) {
        const noBillsMessage = document.createElement('div');
        noBillsMessage.className = 'no-bills-message';
        noBillsMessage.innerHTML = `
            <p style="color: var(--color-text-secondary); font-style: italic; margin: 0;">
                No bill types configured for this property.
            </p>
        `;
        billButtons.appendChild(noBillsMessage);
    }
}

function toggleIndividualBill(billKey) {
    const billSection = document.getElementById(`bill-section-${billKey}`);
    // Find the payment history table container specifically
    const paymentHistoryTable = document.querySelector('#paymentDashboard .table-container');
    
    if (!billSection) {
        // Create the bill section if it doesn't exist
        createIndividualBillSection(billKey);
        // Hide payment history table
        if (paymentHistoryTable) {
            paymentHistoryTable.style.display = 'none';
        }
        // Hide payment summary when viewing individual bills
        const paymentSummary = document.querySelector('.payment-summary');
        if (paymentSummary) {
            paymentSummary.style.display = 'none';
        }
        return;
    }
    
    if (billSection.classList.contains('hidden')) {
        billSection.classList.remove('hidden');
        // Hide payment history table
        if (paymentHistoryTable) {
            paymentHistoryTable.style.display = 'none';
        }
        // Hide payment summary when viewing individual bills
        const paymentSummary = document.querySelector('.payment-summary');
        if (paymentSummary) {
            paymentSummary.style.display = 'none';
        }
    } else {
        billSection.classList.add('hidden');
        // Show payment history table
        if (paymentHistoryTable) {
            paymentHistoryTable.style.display = 'block';
        }
        // Show payment summary when closing individual bills
        const paymentSummary = document.querySelector('.payment-summary');
        if (paymentSummary) {
            paymentSummary.style.display = 'block';
        }
    }
}

function getAllBillsForType(property, billKey) {
    const bills = [];
    
    // Add the main bill
    if (property.bills[billKey]) {
        bills.push({ key: billKey, data: property.bills[billKey], isMain: true });
    }
    
    // Add additional period bills
    let period = 2;
    while (property.bills[`${billKey}_period_${period}`]) {
        bills.push({ 
            key: `${billKey}_period_${period}`, 
            data: property.bills[`${billKey}_period_${period}`], 
            isMain: false,
            period: period
        });
        period++;
    }
    
    return bills;
}

function generateNextPeriodOnPayment(property, billKey, billData) {
    if (!billData.trackingDay) return;
    
    const trackingDays = parseInt(billData.trackingDay);
    const today = new Date();
    
    // Calculate when the current period should end
    const lastDueDate = billData.lastDueDate ? new Date(billData.lastDueDate) : today;
    const periodEndDate = new Date(lastDueDate.getTime() + (trackingDays * 24 * 60 * 60 * 1000));
    
    // Only generate next period if the current period has actually ended
    if (today >= periodEndDate) {
        // Find the next available period number
        let nextPeriod = 2;
        while (property.bills[`${billKey}_period_${nextPeriod}`]) {
            nextPeriod++;
        }
        
        const nextPeriodKey = `${billKey}_period_${nextPeriod}`;
        
        // Calculate the start date for the next period (after current period ends)
        const nextPeriodStartDate = new Date(periodEndDate.getTime() + (trackingDays * 24 * 60 * 60 * 1000));
        
        // Create the next period bill
        property.bills[nextPeriodKey] = {
            checked: true,
            billNo: billData.billNo, // Keep the same bill number
            trackingDay: billData.trackingDay,
            lastDueDate: nextPeriodStartDate.toISOString().split('T')[0],
            creationDate: today.toISOString().split('T')[0], // Created today
            paid: false
        };
    }
}

function generateAdditionalBillsIfNeeded(property, billKey, billData) {
    if (!billData.trackingDay) return;
    
    const trackingDays = parseInt(billData.trackingDay);
    const today = new Date();
    const lastDueDate = billData.lastDueDate ? new Date(billData.lastDueDate) : today;
    const nextDueDate = new Date(lastDueDate.getTime() + (trackingDays * 24 * 60 * 60 * 1000));
    const daysOverdue = Math.floor((today - nextDueDate) / (24 * 60 * 60 * 1000));
    
    // If bill is overdue, generate additional bills for each overdue period
    if (daysOverdue > 0) {
        const overduePeriods = Math.floor(daysOverdue / trackingDays);
        
        for (let i = 1; i <= overduePeriods; i++) {
            const additionalBillKey = `${billKey}_period_${i + 1}`;
            
            // Check if this additional bill already exists
            if (!property.bills[additionalBillKey]) {
                // Calculate when this period was created (when the previous period went overdue)
                const periodCreationDate = new Date(lastDueDate.getTime() + (i * trackingDays * 24 * 60 * 60 * 1000));
                
                // Create new bill for this period with same bill number
                property.bills[additionalBillKey] = {
                    checked: true,
                    billNo: billData.billNo, // Keep the same bill number
                    trackingDay: billData.trackingDay,
                    lastDueDate: periodCreationDate.toISOString().split('T')[0],
                    creationDate: periodCreationDate.toISOString().split('T')[0], // Store creation date
                    paid: false
                };
            }
        }
    }
}

function createIndividualBillSection(billKey) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills || !individualBillSections) return;

    let billData;
    let billName;
    let isCustom = false;

    if (billKey.startsWith('custom-')) {
        const index = parseInt(billKey.replace('custom-', ''));
        billData = property.bills.customBills[index];
        billName = billData.name;
        isCustom = true;
    } else {
        billData = property.bills[billKey];
        const billType = billTypes.find(b => b.key === billKey);
        billName = billType ? billType.name : billKey;
    }

    if (!billData) return;

    // Check if we need to generate additional bills for overdue periods
    if (!isCustom && billData.trackingDay && !billData.paid) {
        generateAdditionalBillsIfNeeded(property, billKey, billData);
    }
    
    // Check if we need to generate next period for paid bills whose period has ended
    if (!isCustom && billData.trackingDay && billData.paid) {
        generateNextPeriodOnPayment(property, billKey, billData);
    }

    // Determine status
    let status = 'Active';
    let statusClass = 'payment-status--paid';
    
    if (billData.paid) {
        status = 'Paid';
        statusClass = 'payment-status--paid';
    } else {
        // Check due date logic
        const today = new Date();
        let dueDate = null;
        
        if (billData.trackingDay) {
            // For any bill with tracking day - use tracking day for status
            const trackingDays = parseInt(billData.trackingDay);
            // Calculate next due date based on tracking days
            const lastDueDate = billData.lastDueDate ? new Date(billData.lastDueDate) : today;
            dueDate = new Date(lastDueDate.getTime() + (trackingDays * 24 * 60 * 60 * 1000));
            
            // Calculate remaining days
            const daysRemaining = Math.floor((dueDate - today) / (24 * 60 * 60 * 1000));
            
            // If the due date has passed, mark as overdue
            if (daysRemaining <= 0) {
                status = 'Overdue';
                statusClass = 'payment-status--overdue';
            } else if (daysRemaining <= 7) {
                status = 'Due Soon';
                statusClass = 'payment-status--pending';
            }
        }
        
        if (dueDate) {
            if (dueDate < today) {
                status = 'Overdue';
                statusClass = 'payment-status--overdue';
            } else if (dueDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) {
                status = 'Due Soon';
                statusClass = 'payment-status--pending';
            }
        }
    }

    const billSection = document.createElement('div');
    billSection.className = 'table-container';
    billSection.id = `bill-section-${billKey}`;
    
    // Get all bills for this type (including additional periods)
    const allBillsForType = getAllBillsForType(property, billKey);
    
    const paidDateDisplay = billData.paid && billData.paidDate ? 
        `<div class="bill-info-item">
            <label>Paid Date:</label>
            <span>${formatDate(billData.paidDate)}</span>
        </div>` : '';

    const actionButtons = `<div class="bill-actions">
        <div class="bill-dropdown">
            <button class="btn btn--outline bill-dropdown-toggle" onclick="toggleBillDropdown('${billKey}')">⋯</button>
            <div class="bill-dropdown-menu" id="bill-dropdown-${billKey}">
                <button class="dropdown-item" onclick="receiveBillPayment('${billKey}')">💰 Receive Payment</button>
            </div>
        </div>
    </div>`;

    // Generate serial number based on bill type and index
    const serialNumber = generateSerialNumber(billKey, billData);

    billSection.innerHTML = `
        <div class="table-header">
            <h3>${billName} Details</h3>
            <button class="btn btn--outline" onclick="closeIndividualBill('${billKey}')">Close</button>
        </div>
        <table class="individual-bill-table">
            <thead>
                <tr>
                    <th>Serial No</th>
                    <th>Date</th>
                    <th>Bill Number</th>
                    <th>Due Days</th>
                    <th>Status</th>
                    ${billData.paid ? '<th>Amount</th>' : ''}
                    ${billData.paid ? '<th>Paid Date</th>' : ''}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${allBillsForType.map((bill, index) => {
                    const currentBillData = bill.data;
                    const currentBillKey = bill.key;
                    
                    // Calculate status for this bill
                    let currentStatus = 'Active';
                    let currentStatusClass = 'payment-status--paid';
                    
                    if (currentBillData.paid) {
                        currentStatus = 'Paid';
                        currentStatusClass = 'payment-status--paid';
                    } else {
                        const today = new Date();
                        let dueDate = null;
                        
                        if (currentBillData.trackingDay) {
                            const trackingDays = parseInt(currentBillData.trackingDay);
                            const lastDueDate = currentBillData.lastDueDate ? new Date(currentBillData.lastDueDate) : today;
                            dueDate = new Date(lastDueDate.getTime() + (trackingDays * 24 * 60 * 60 * 1000));
                            
                            const daysRemaining = Math.floor((dueDate - today) / (24 * 60 * 60 * 1000));
                            
                            if (daysRemaining <= 0) {
                                currentStatus = 'Overdue';
                                currentStatusClass = 'payment-status--overdue';
                            } else if (daysRemaining <= 7) {
                                currentStatus = 'Due Soon';
                                currentStatusClass = 'payment-status--pending';
                            }
                        }
                    }
                    
                    // Calculate days display
                    const daysDisplay = currentBillData.trackingDay ? (() => {
                        // If bill is paid, show the status at the time of payment
                        if (currentBillData.paid && currentBillData.paidDate) {
                            const paidDate = new Date(currentBillData.paidDate);
                            const trackingDays = parseInt(currentBillData.trackingDay);
                            const lastDueDate = currentBillData.lastDueDate ? new Date(currentBillData.lastDueDate) : paidDate;
                            const nextDueDate = new Date(lastDueDate.getTime() + (trackingDays * 24 * 60 * 60 * 1000));
                            const daysDifference = Math.floor((nextDueDate - paidDate) / (24 * 60 * 60 * 1000));
                            
                            if (daysDifference <= 0) {
                                return `-${Math.abs(daysDifference)}`;
                            } else {
                                return daysDifference.toString();
                            }
                        } else {
                            // For unpaid bills, calculate current status
                            const trackingDays = parseInt(currentBillData.trackingDay);
                            const today = new Date();
                            const lastDueDate = currentBillData.lastDueDate ? new Date(currentBillData.lastDueDate) : today;
                            const nextDueDate = new Date(lastDueDate.getTime() + (trackingDays * 24 * 60 * 60 * 1000));
                            const daysDifference = Math.floor((nextDueDate - today) / (24 * 60 * 60 * 1000));
                            
                            if (daysDifference <= 0) {
                                return `-${Math.abs(daysDifference)}`;
                            } else {
                                return daysDifference.toString();
                            }
                        }
                    })() : 'Not set';
                    
                    const periodLabel = bill.isMain ? '' : ` (Period ${bill.period})`;
                    const serialNum = (index + 1).toString();
                    
                    // Use creation date if available, otherwise use today's date
                    const displayDate = currentBillData.creationDate || new Date().toISOString().split('T')[0];
                    
                    return `
                        <tr>
                            <td class="serial-number">${serialNum}</td>
                            <td>${displayDate}</td>
                            <td>${currentBillData.billNo || 'N/A'}${periodLabel}</td>
                            <td>${daysDisplay}</td>
                            <td>
                                <span class="payment-status ${currentStatusClass}">${currentStatus}</span>
                                <button class="btn btn--sm btn--outline" onclick="viewBillDocuments('${currentBillKey}')" style="margin-left: 10px;">📄 View Documents</button>
                            </td>
                            ${currentBillData.paid && currentBillData.amount ? `<td class="payment-amount">₹${currentBillData.amount.toLocaleString()}</td>` : ''}
                            ${currentBillData.paid && currentBillData.paidDate ? `<td>${formatDate(currentBillData.paidDate)}</td>` : ''}
                            <td class="bill-actions">
                                <div class="bill-actions">
                                    <div class="bill-dropdown">
                                        <button class="btn btn--outline bill-dropdown-toggle" onclick="toggleBillDropdown('${currentBillKey}')">⋯</button>
                                        <div class="bill-dropdown-menu" id="bill-dropdown-${currentBillKey}">
                                            <button class="dropdown-item" onclick="receiveBillPayment('${currentBillKey}')">💰 Receive Payment</button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;

    individualBillSections.appendChild(billSection);
}

function generateSerialNumber(billKey, billData) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return 'N/A';
    
    if (billKey.startsWith('custom-')) {
        // For custom bills, use the index + 1 (each custom bill gets its own number)
        const customIndex = parseInt(billKey.replace('custom-', ''));
        return (customIndex + 1).toString();
    } else {
        // For standard bills, each bill type gets its own serial number starting from 1
        // Since we're only showing one bill per type in the current implementation,
        // each standard bill type will always be serial number 1
        return '1';
    }
}

function closeIndividualBill(billKey) {
    const billSection = document.getElementById(`bill-section-${billKey}`);
    
    if (billSection) {
        // Remove the bill section from DOM
        billSection.remove();
        
        // Find and show the payment history table container (the one that contains the payment table)
        const paymentHistoryContainer = document.querySelector('#paymentDashboard .table-container');
        if (paymentHistoryContainer) {
            paymentHistoryContainer.style.display = 'block';
        }
        
        // Also ensure payment table body is visible
        const paymentTableBody = document.getElementById('paymentTableBody');
        if (paymentTableBody) {
            paymentTableBody.style.display = '';
        }
        
        // Show payment summary when closing individual bills
        const paymentSummary = document.querySelector('.payment-summary');
        if (paymentSummary) {
            paymentSummary.style.display = 'block';
        }
    }
}

function openPropertyModal(propertyId = null) {
    currentPropertyId = propertyId;
    
    if (propertyId) {
        modalTitle.textContent = 'Edit Property';
        loadPropertyData(propertyId);
    } else {
        modalTitle.textContent = 'Add Property';
        resetPropertyForm();
    }
    
    propertyModal.classList.remove('hidden');
    switchTab('information');
    renderDocuments();
    document.body.style.overflow = 'hidden';
}

function closePropertyModal() {
    propertyModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    resetPropertyForm();
    currentPropertyId = null;
}

function openPaymentModal(paymentId) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property) return;
    
    let payment = null;
    let baseAmount = 0;
    let gstAmount = 0;
    let totalAmount = 0;
    
    // Check if it's an existing payment history record
    if (property.paymentHistory) {
        payment = property.paymentHistory.find(p => p.id == paymentId);
        if (payment) {
            // Recalculate GST amounts using current GST settings
            if (property.gstIncludedInRent) {
                // GST is included in total, calculate base amount
                const gstPercentage = parseFloat(property.gstPercentage || 18) / 100;
                baseAmount = Math.round(payment.total / (1 + gstPercentage));
                gstAmount = payment.total - baseAmount;
                totalAmount = payment.total;
            } else {
                // GST is not included - no GST at all
                baseAmount = payment.base;
                gstAmount = 0;
                totalAmount = payment.base;
            }
        }
    }
    
    // If not found in payment history, check if it's a schedule payment
    if (!payment && paymentId.startsWith('schedule-')) {
        const scheduleIndex = parseInt(paymentId.replace('schedule-', ''));
        const schedule = generatePaymentSchedule(property);
        if (schedule[scheduleIndex]) {
            const schedulePayment = schedule[scheduleIndex];
            const rentAmount = schedulePayment.amount;
            
            // Calculate GST and total based on whether GST is included in rent
            if (property.gstIncludedInRent) {
                // GST is included in rent amount, so calculate base amount
                const gstPercentage = parseFloat(property.gstPercentage || 18) / 100;
                baseAmount = Math.round(rentAmount / (1 + gstPercentage)); // Remove GST from total
                gstAmount = rentAmount - baseAmount;
                totalAmount = rentAmount;
            } else {
                // GST is not included - no GST at all
                baseAmount = rentAmount;
                gstAmount = 0;
                totalAmount = rentAmount;
            }
        }
    }
    
    if (baseAmount === 0) return;
    
    currentPaymentId = paymentId;
    
    // Update GST label dynamically
    const gstInput = document.getElementById('gstAmount');
    const gstLabel = gstInput ? gstInput.previousElementSibling : null;
    if (gstLabel && gstLabel.classList.contains('form-label')) {
        if (property.gstIncludedInRent) {
            gstLabel.textContent = `GST (${property.gstPercentage || 18}%)`;
        } else {
            gstLabel.textContent = 'GST (0%)';
        }
    }
    
    // Populate payment form
    document.getElementById('baseAmount').value = baseAmount;
    document.getElementById('gstAmount').value = gstAmount;
    document.getElementById('totalAmount').value = totalAmount;
    document.getElementById('paymentDate').value = getCurrentDate();
    document.getElementById('paymentMode').value = '';
    document.getElementById('receiptNumber').value = `RCP${String(nextReceiptId).padStart(3, '0')}`;
    document.getElementById('paymentNotes').value = '';
    
    paymentModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    paymentModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    currentPaymentId = null;
}

function switchTab(tabName) {
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked tab button
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    const activeContent = document.getElementById(tabName);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

function resetPropertyForm() {
    const form = document.getElementById('propertyForm');
    form.reset();
    
    // Reset all form elements in modal
    document.querySelectorAll('.modal input, .modal select, .modal textarea').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    // Reset custom bills and documents
    customBillsList.innerHTML = '';
    documentList.innerHTML = '';
    
    // Hide GST percentage field initially
    const gstPercentageGroup = document.getElementById('gstPercentageGroup');
    if (gstPercentageGroup) {
        gstPercentageGroup.style.display = 'none';
    }
    
    // Reset rental fields visibility
    toggleRentalFields();
    
    // Reset maintenance fields visibility
    toggleMaintenanceFields();
    
    // Reset legal charges custom visibility
    toggleLegalChargesCustom();
    
    // Reset municipal taxes fields visibility
    toggleMunicipalTaxesFields();
    
    // Reset signage tax fields visibility
    toggleSignageTaxFields();
    
    // Reset legal charges fields visibility
    toggleLegalChargesFields();
    
    // Set default rent period to month
    const rentPeriodSelect = document.querySelector('[name="rentPeriod"]');
    if (rentPeriodSelect) {
        rentPeriodSelect.value = 'month';
    }
    
    // Set default rent free period unit to days
    const rentFreePeriodUnitSelect = document.querySelector('[name="rentFreePeriodUnit"]');
    if (rentFreePeriodUnitSelect) {
        rentFreePeriodUnitSelect.value = 'days';
    }
    
    // Set default agreement tenure unit to months
    const agreementTenureUnitSelect = document.querySelector('[name="agreementTenureUnit"]');
    if (agreementTenureUnitSelect) {
        agreementTenureUnitSelect.value = 'months';
    }

    // Set default escalation period to months
    const escalationPeriodSelect = document.querySelector('[name="escalationPeriod"]');
    if (escalationPeriodSelect) {
        escalationPeriodSelect.value = 'months';
    }
    
    // Reset GST fields visibility
    toggleGstFields();
    
    // Setup bills section for new property
    setupBillsSection();
}

function loadPropertyData(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    // Load basic property information
    Object.keys(property).forEach(key => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = property[key];
            } else {
                input.value = property[key] || '';
            }
        }
    });

    // Load maintenance data
    if (property.maintenance) {
        document.querySelector('[name="maintenanceAmount"]').value = property.maintenance.amount || '';
        document.querySelector('[name="maintenancePeriod"]').value = property.maintenance.period || 'month';
    }

    // Load GST data and show/hide percentage field
    const gstCheckbox = document.querySelector('[name="gstIncludedInRent"]');
    if (gstCheckbox) {
        gstCheckbox.checked = property.gstIncludedInRent || false;
    }
    
    if (property.gstIncludedInRent) {
        const gstPercentageGroup = document.getElementById('gstPercentageGroup');
        if (gstPercentageGroup) {
            gstPercentageGroup.style.display = 'block';
        }
        // Load GST percentage value
        const gstPercentageInput = document.querySelector('[name="gstPercentage"]');
        if (gstPercentageInput && property.gstPercentage) {
            gstPercentageInput.value = property.gstPercentage;
        }
    } else {
        const gstPercentageGroup = document.getElementById('gstPercentageGroup');
        if (gstPercentageGroup) {
            gstPercentageGroup.style.display = 'none';
        }
    }

    // Load bills
    setupBillsSection(property.bills);
    
    // Load custom bills
    if (property.bills && property.bills.customBills) {
        property.bills.customBills.forEach(bill => {
            addCustomBill(bill);
        });
    }

    // Toggle rental fields visibility
    toggleRentalFields();
    
    // Toggle maintenance fields visibility
    toggleMaintenanceFields();
    
    // Toggle legal charges custom visibility
    toggleLegalChargesCustom();
    
    // Toggle municipal taxes fields visibility
    toggleMunicipalTaxesFields();
    
    // Toggle signage tax fields visibility
    toggleSignageTaxFields();
    
    // Toggle legal charges fields visibility
    toggleLegalChargesFields();
    
    // Toggle GST fields visibility
    toggleGstFields();
    
    // Calculate rent per sqft for loaded data
    calculateRentPerSqft();
}

function saveProperty() {
    const formData = new FormData(document.getElementById('propertyForm'));
    const propertyData = {};


    // Collect form data
    for (let [key, value] of formData.entries()) {
        if (key === 'isRental' || key === 'maintenanceEnabled' || key === 'municipalTaxesEnabled' || key === 'signageTaxEnabled' || key === 'legalChargesEnabled' || key === 'gstEnabled') {
            propertyData[key] = true;
        } else {
            propertyData[key] = value;
        }
    }
    

    // Handle checkbox fields that aren't in FormData when unchecked
    if (!formData.has('isRental')) {
        propertyData.isRental = false;
    }
    if (!formData.has('maintenanceEnabled')) {
        propertyData.maintenanceEnabled = false;
    }
    if (!formData.has('municipalTaxesEnabled')) {
        propertyData.municipalTaxesEnabled = false;
    }
    if (!formData.has('signageTaxEnabled')) {
        propertyData.signageTaxEnabled = false;
    }
    if (!formData.has('legalChargesEnabled')) {
        propertyData.legalChargesEnabled = false;
    }
    if (!formData.has('gstEnabled')) {
        propertyData.gstEnabled = false;
    }
    
    // Handle GST data
    if (propertyData.gstEnabled) {
        propertyData.gst = {
            type: propertyData.gstType || '',
            percentage: propertyData.gstPercentage || null,
            borneBy: propertyData.gstBorneBy || ''
        };
        // For backward compatibility
        propertyData.gstIncludedInRent = propertyData.gstType === 'included';
    } else {
        propertyData.gst = null;
        propertyData.gstIncludedInRent = false;
    }

    // Handle maintenance data
    if (propertyData.maintenanceEnabled) {
        propertyData.maintenance = {
            amount: propertyData.maintenanceAmount || 0,
            period: propertyData.maintenancePeriod || 'month'
        };
    } else {
        propertyData.maintenance = null;
    }

    // Handle municipal taxes data
    if (propertyData.municipalTaxesEnabled) {
        propertyData.municipalTaxes = {
            amount: propertyData.municipalTaxesAmount || null,
            borneBy: propertyData.municipalTaxesBorneBy || ''
        };
    } else {
        propertyData.municipalTaxes = null;
    }

    // Handle signage tax data
    if (propertyData.signageTaxEnabled) {
        propertyData.signageTax = {
            amount: propertyData.signageTaxAmount || null,
            borneBy: propertyData.signageTaxBorneBy || ''
        };
    } else {
        propertyData.signageTax = null;
    }

    // Handle legal charges data
    if (propertyData.legalChargesEnabled) {
        propertyData.legalCharges = {
            amount: propertyData.legalChargesAmount || null,
            borneBy: propertyData.legalChargesBorneBy || '',
            lessorPercentage: propertyData.legalChargesLessorPercentage || null,
            lesseePercentage: propertyData.legalChargesLesseePercentage || null
        };
    } else {
        propertyData.legalCharges = null;
    }

    // Handle maintenance data
    if (propertyData.maintenanceEnabled) {
        propertyData.maintenance = {
            amount: propertyData.maintenanceAmount || null,
            borneBy: propertyData.maintenanceBorneBy || ''
        };
    } else {
        propertyData.maintenance = null;
    }

    // Handle GST percentage - explicitly get value from DOM since hidden fields might not be in FormData
    const gstPercentageInput = document.querySelector('[name="gstPercentage"]');
    
    if (propertyData.gstIncludedInRent) {
        if (gstPercentageInput && gstPercentageInput.value) {
            propertyData.gstPercentage = parseFloat(gstPercentageInput.value);
        } else {
            propertyData.gstPercentage = 18; // Default to 18% if GST is enabled but no percentage specified
        }
    } else {
        // If GST is not included, don't set gstPercentage
        delete propertyData.gstPercentage;
    }

    // Convert rent amount to number for proper comparison and calculation
    if (propertyData.rentAmount) {
        propertyData.rentAmount = parseFloat(propertyData.rentAmount);
        propertyData.monthlyRent = propertyData.rentPeriod === 'year' ? 
            Math.round(propertyData.rentAmount / 12) : 
            propertyData.rentAmount;
    }
    
    // Convert rent payable date to number
    if (propertyData.rentPayableDate) {
        propertyData.rentPayableDate = parseInt(propertyData.rentPayableDate);
    }
    

    // Set status
    propertyData.status = propertyData.isRental ? 'Active' : 'Vacant';

    // Collect bills data
    propertyData.bills = collectBillsData();

    // Collect documents data
    propertyData.documents = collectDocumentsData();

    // Initialize payment history if rental property
    if (propertyData.isRental && !currentPropertyId) {
        propertyData.paymentHistory = generateInitialPaymentHistory(propertyData.rentAmount);
    }

    // Validate required fields
    if (!propertyData.name || !propertyData.address) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (currentPropertyId) {
        // Update existing property
        const index = properties.findIndex(p => p.id === currentPropertyId);
        if (index !== -1) {
            const oldProperty = properties[index];
            
            // Store old rent amount for smart update
            const oldRentAmount = oldProperty.rentAmount;
            const newRentAmount = propertyData.rentAmount;
            
            properties[index] = { ...properties[index], ...propertyData };
            
            // Smart payment history update - only affects future payments
            if (oldRentAmount && newRentAmount && oldRentAmount !== newRentAmount) {
                // Additional protection: backup paid payments before update
                const paidPaymentsBackup = backupPaidPayments(properties[index]);
                smartUpdatePaymentHistory(properties[index], oldRentAmount, newRentAmount);
                // Restore paid payments if they were accidentally changed
                restorePaidPayments(properties[index], paidPaymentsBackup);
            }
            
            // Recalculate existing payment history if GST percentage changed (but preserve paid amounts)
            if (oldProperty.gstPercentage !== propertyData.gstPercentage && 
                propertyData.gstPercentage && propertyData.paymentHistory) {
                recalculatePaymentHistory(properties[index]);
            }
            
            // Handle GST enablement for future payments while preserving past payments
            if ((oldProperty.gstIncludedInRent !== propertyData.gstIncludedInRent || 
                 oldProperty.gstPercentage !== propertyData.gstPercentage) && 
                propertyData.paymentHistory) {
                enableGSTForFuturePayments(
                    properties[index], 
                    oldProperty.gstIncludedInRent, 
                    propertyData.gstIncludedInRent,
                    oldProperty.gstPercentage, 
                    propertyData.gstPercentage
                );
            }
            
            // Check if rent-related fields changed and refresh payment dashboard if it's currently open
            const rentFieldsChanged = (
                oldProperty.rentAmount !== propertyData.rentAmount ||
                oldProperty.rentPeriod !== propertyData.rentPeriod ||
                oldProperty.gstIncludedInRent !== propertyData.gstIncludedInRent ||
                oldProperty.gstPercentage !== propertyData.gstPercentage ||
                oldProperty.agreementStartDate !== propertyData.agreementStartDate ||
                oldProperty.rentPayableDate !== propertyData.rentPayableDate
            );
            
            if (rentFieldsChanged) {
                refreshPaymentDashboardIfOpen(currentPropertyId);
            }
        }
        showNotification('Property updated successfully');
    } else {
        // Add new property
        propertyData.id = nextId++;
        properties.push(propertyData);
        showNotification('Property added successfully');
    }

    closePropertyModal();
    saveData(); // Save data to localStorage
    renderPropertiesTable();
    updateDashboardSummary();
}

function generateInitialPaymentHistory(baseAmount) {
    const history = [];
    const base = parseInt(baseAmount);
    const gst = Math.round(base * gstRate / 100);
    const total = base + gst;
    
    // Generate 3 months of payment history (2 paid, 1 pending)
    for (let i = 0; i < 3; i++) {
        const date = new Date(2025, i, 1);
        const dueDate = new Date(2025, i, 5);
        
        history.push({
            id: i + 1,
            date: date.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0],
            base: base,
            gst: gst,
            total: total,
            status: i < 2 ? 'Paid' : 'Pending',
            paymentDate: i < 2 ? new Date(2025, i, 3 + i * 2).toISOString().split('T')[0] : null,
            paymentMode: i < 2 ? (i === 0 ? 'Online' : 'UPI') : null,
            receiptNo: i < 2 ? `RCP${String(nextReceiptId++).padStart(3, '0')}` : null,
            // Enhanced partial payment structure
            totalAmount: total,
            paidAmount: i < 2 ? total : 0,
            remainingAmount: i < 2 ? 0 : total,
            partialPayments: i < 2 ? [{
                amount: total,
                date: new Date(2025, i, 3 + i * 2).toISOString().split('T')[0],
                mode: i === 0 ? 'Online' : 'UPI',
                receiptNo: `RCP${String(nextReceiptId - 1).padStart(3, '0')}`,
                notes: 'Full payment'
            }] : []
        });
    }
    
    return history;
}

function submitPayment() {
    const paymentDate = document.getElementById('paymentDate').value;
    const paymentMode = document.getElementById('paymentMode').value;
    const receiptNumberInput = document.getElementById('receiptNumber').value;
    const notes = document.getElementById('paymentNotes').value;
    
    // Generate unique receipt number if not provided
    const receiptNumber = receiptNumberInput || `RENT${String(nextReceiptId).padStart(4, '0')}`;
    const baseAmount = parseFloat(document.getElementById('baseAmount').value);
    const gstAmount = parseFloat(document.getElementById('gstAmount').value);
    const totalAmount = parseFloat(document.getElementById('totalAmount').value);
    
    if (!paymentDate || !paymentMode || !baseAmount) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property) return;
    
    let payment = null;
    let isNewPayment = false;
    
    // Check if it's an existing payment history record
    if (property.paymentHistory) {
        payment = property.paymentHistory.find(p => p.id == currentPaymentId);
    }
    
    // If not found in payment history and it's a schedule payment, create new payment record
    if (!payment && currentPaymentId.startsWith('schedule-')) {
        const scheduleIndex = parseInt(currentPaymentId.replace('schedule-', ''));
        const schedule = generatePaymentSchedule(property);
        if (schedule[scheduleIndex]) {
            const schedulePayment = schedule[scheduleIndex];
            
            // Initialize payment history if it doesn't exist
            if (!property.paymentHistory) {
                property.paymentHistory = [];
            }
            
            // Create new payment record
            payment = {
                id: Date.now(), // Use timestamp as unique ID
                date: paymentDate,
                dueDate: schedulePayment.dueDate,
                base: baseAmount,
                gst: gstAmount,
                total: totalAmount,
                status: 'Paid',
                paymentDate: paymentDate,
                paymentMode: paymentMode,
                receiptNo: receiptNumber,
                notes: notes,
                invoiceNo: nextInvoiceId++
            };
            
            property.paymentHistory.push(payment);
            isNewPayment = true;
        }
    }
    
    if (!payment) return;
    
    // Update payment
    payment.status = 'Paid';
    payment.paymentDate = paymentDate;
    payment.paymentMode = paymentMode;
    payment.receiptNo = receiptNumber;
    payment.notes = notes;
    
    // Assign invoice number if not already assigned
    if (!payment.invoiceNo) {
        payment.invoiceNo = nextInvoiceId++;
    }
    
    // Increment receipt number for next payment
    nextReceiptId++;
    
    closePaymentModal();
    renderPaymentTable();
    updatePaymentSummary();
    saveData(); // Save data to localStorage
    showNotification('Payment recorded successfully');
}

function collectBillsData() {
    const bills = {};
    
    // Standard bills
    billTypes.forEach(bill => {
        const checkbox = document.querySelector(`#bill-${bill.key}`);
        const billNo = document.querySelector(`[name="bill-${bill.key}-no"]`);
        const trackingDay = document.querySelector(`[name="bill-${bill.key}-tracking-day"]`);
        
        bills[bill.key] = {
            checked: checkbox ? checkbox.checked : false,
            billNo: billNo ? billNo.value : '',
            trackingDay: trackingDay ? trackingDay.value : ''
        };
    });

    // Custom bills
    bills.customBills = [];
    document.querySelectorAll('.custom-bill-item').forEach(item => {
        const name = item.querySelector('[name="custom-bill-name"]').value;
        const billNo = item.querySelector('[name="custom-bill-no"]').value;
        const dueValue = item.querySelector('[name="custom-bill-value"]').value;
        const period = item.querySelector('[name="custom-bill-period"]').value;
        const trackingDay = item.querySelector('[name="custom-bill-tracking-day"]').value;
        
        // Calculate due date from value and period
        let dueDate = '';
        if (dueValue && period) {
            const value = parseInt(dueValue);
            const today = new Date();
            let calculatedDueDate;
            
            if (period === 'days') {
                calculatedDueDate = new Date(today.getTime() + (value * 24 * 60 * 60 * 1000));
            } else if (period === 'months') {
                calculatedDueDate = new Date(today.getFullYear(), today.getMonth() + value, today.getDate());
            } else if (period === 'years') {
                calculatedDueDate = new Date(today.getFullYear() + value, today.getMonth(), today.getDate());
            }
            
            if (calculatedDueDate) {
                dueDate = calculatedDueDate.toISOString().split('T')[0];
            }
        }
        
        if (name) {
            bills.customBills.push({ name, billNo, dueDate, dueValue, period, trackingDay });
        }
    });

    return bills;
}

function collectDocumentsData() {
    const documents = [];
    document.querySelectorAll('.document-item').forEach(item => {
        const name = item.querySelector('.document-name').textContent;
        const uploadDate = item.querySelector('.document-date').textContent.replace('Uploaded: ', '');
        documents.push({ name, uploadDate });
    });
    return documents;
}

function renderPropertiesTable() {
    const visibleColumns = getOptimalColumns();
    renderTableHeader(visibleColumns);
    const tbody = propertiesTableBody;
    tbody.innerHTML = '';

    const colspanCount = visibleColumns.length;

    if (properties.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="${colspanCount}" class="empty-state">
                    <h3>No properties found</h3>
                    <p>Click "Add Property" to get started</p>
                </td>
            </tr>
        `;
        return;
    }

    properties.forEach((property, index) => {
        const row = document.createElement('tr');
        
        visibleColumns.forEach(columnKey => {
            const cell = document.createElement('td');
            cell.innerHTML = getCellContent(property, columnKey, index);
            cell.className = `column-${columnKey}`;
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
}

function getOptimalColumns() {
    // Priority order for columns (most important first) - EXCLUDING actions which will be added at the end
    const columnPriority = [
        'serialNo',     // Always show
        'name',         // Always show  
        'address',      // Always show
        'type',         // Always show
        'rentAmount',   // Always show
        'status',       // Always show
        'projectName',  // Secondary priority
        'lessorName',   // Secondary priority
        'floorNo',      // Secondary priority
        'carpetArea',   // Secondary priority
        'lesseeName',   // Lower priority
        'rentPeriod',   // Lower priority
        'securityDeposit', // Lower priority
        'officerNo',
        'superBuiltupArea',
        'terraceArea',
        'furniture',
        'shopFrontage',
        'dimensions',
        'ceilingHeight',
        'electricityCharges',
        'agreementStartDate',
        'agreementTenure',
        'rentPayableDate',
        'escalationPercentage',
        'escalationPeriod',
        'gstIncludedInRent',
        'municipalTaxes',
        'municipalTaxesAmount',
        'municipalTaxesBorneBy',
        'signageTax',
        'signageTaxAmount',
        'signageTaxBorneBy',
        'legalCharges',
        'legalChargesAmount',
        'legalChargesBorneBy',
        'legalChargesLessorPercentage',
        'legalChargesLesseePercentage',
        'maintenance',
        'maintenanceAmount',
        'maintenanceBorneBy'
    ];
    
    // Get all user-selected visible columns (including actions)
    const userSelectedColumns = Object.keys(tableColumns).filter(key => 
        tableColumns[key].visible
    );
    
    // Start with user-selected columns in priority order
    let finalColumns = [];
    
    // Add user-selected columns in priority order (no limit since we have horizontal scroll)
    columnPriority.forEach(columnKey => {
        if (userSelectedColumns.includes(columnKey)) {
            finalColumns.push(columnKey);
        }
    });
    
    // Add any remaining user-selected columns that weren't in priority order
    userSelectedColumns.forEach(columnKey => {
        if (!finalColumns.includes(columnKey)) {
            finalColumns.push(columnKey);
        }
    });
    
    return finalColumns;
}

function renderTableHeader(visibleColumns) {
    const thead = document.getElementById('propertiesTableHeader');
    thead.innerHTML = '';
    
    visibleColumns.forEach(columnKey => {
        const th = document.createElement('th');
        th.textContent = tableColumns[columnKey].label;
        th.className = `header-${columnKey}`;
        thead.appendChild(th);
    });
}

function toggleActionMenu(event, propertyId) {
    event.stopPropagation();
    
    // Close any existing temp menu
    const existingTempMenu = document.getElementById('tempActionMenu');
    if (existingTempMenu) {
        existingTempMenu.remove();
        return;
    }
    
    // Close all other action menus
    document.querySelectorAll('.action-menu').forEach(menu => {
        if (menu.id !== `actionMenu${propertyId}`) {
            menu.classList.remove('show');
        }
    });
    
    // Toggle the clicked menu
    const menu = document.getElementById(`actionMenu${propertyId}`);
    
    if (menu) {
        const isCurrentlyShown = menu.style.display === 'block';
        if (isCurrentlyShown) {
            menu.style.display = 'none';
            console.log('Menu hidden');
        } else {
            // Create a new menu element instead of using the existing one
            const newMenu = document.createElement('div');
            newMenu.id = 'tempActionMenu';
            // Get the button position
            const button = event.target.closest('.action-menu-btn');
            const rect = button.getBoundingClientRect();
            
            // Check if there's enough space below the button
            const spaceBelow = window.innerHeight - rect.bottom;
            const menuHeight = 120; // Approximate menu height
            const showAbove = spaceBelow < menuHeight;
            
            const topPosition = showAbove ? rect.top - menuHeight - 4 : rect.bottom + 4;
            
            newMenu.innerHTML = `
                <div style="position: fixed; top: ${topPosition}px; left: ${rect.right - 160}px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); z-index: 99999; padding: 8px; min-width: 160px;">
                    <button onclick="viewProperty(${propertyId}); document.getElementById('tempActionMenu').remove();" style="display: flex; align-items: center; gap: 8px; width: 100%; padding: 12px 16px; margin: 0; background: none; border: none; text-align: left; cursor: pointer; font-size: 14px; color: #374151; border-radius: 4px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">
                        <span>👁️</span> Edit Property
                    </button>
                    <button onclick="showPaymentDashboard(${propertyId}); document.getElementById('tempActionMenu').remove();" style="display: flex; align-items: center; gap: 8px; width: 100%; padding: 12px 16px; margin: 0; background: none; border: none; text-align: left; cursor: pointer; font-size: 14px; color: #374151; border-radius: 4px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">
                        <span>💰</span> View Payments
                    </button>
                    <button onclick="deleteProperty(${propertyId}); document.getElementById('tempActionMenu').remove();" style="display: flex; align-items: center; gap: 8px; width: 100%; padding: 12px 16px; margin: 0; background: none; border: none; text-align: left; cursor: pointer; font-size: 14px; color: #dc2626; border-radius: 4px;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='none'">
                        <span>🗑️</span> Delete Property
                    </button>
                </div>
            `;
            document.body.appendChild(newMenu);
        }
        // Add click outside to close
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!e.target.closest('#tempActionMenu')) {
                    const tempMenu = document.getElementById('tempActionMenu');
                    if (tempMenu) {
                        tempMenu.remove();
                    }
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    } else {
        console.error('Menu element not found for property:', propertyId);
    }
}

function closeActionMenus() {
    document.querySelectorAll('.action-menu').forEach(menu => {
        menu.classList.remove('show');
    });
}

// Close action menus when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.action-dropdown')) {
        closeActionMenus();
    }
});

function getCellContent(property, columnKey, index) {
    switch (columnKey) {
        case 'serialNo':
            return `<span class="serial-no">${index + 1}</span>`;
        case 'name':
            return `
                <div class="property-name">
                    <strong>${property.name || 'Unnamed Property'}</strong>
                    ${property.projectName && !tableColumns.projectName.visible ? `<br><small style="color: var(--color-text-secondary);">${property.projectName}</small>` : ''}
                </div>
            `;
        case 'projectName':
            return `<span class="project-name">${property.projectName || 'N/A'}</span>`;
        case 'address':
            return `<span class="address" title="${property.address || 'No address'}">${property.address || 'No address'}</span>`;
        case 'type':
            return `<span class="property-type">${property.type || 'Not specified'}</span>`;
        case 'officerNo':
            return `<span class="officer-no">${property.officerNo || 'N/A'}</span>`;
        case 'floorNo':
            return `<span class="floor-no">${property.floorNo || 'N/A'}</span>`;
        case 'carpetArea':
            return `<span class="carpet-area">${property.carpetArea || 'N/A'}</span>`;
        case 'superBuiltupArea':
            return `<span class="super-builtup-area">${property.superBuiltupArea || 'N/A'}</span>`;
        case 'terraceArea':
            return `<span class="terrace-area">${property.terraceArea || 'N/A'}</span>`;
        case 'furniture':
            return `<span class="furniture">${property.furniture || 'N/A'}</span>`;
        case 'lessorName':
            return `<span class="lessor-name">${property.lessorName || 'N/A'}</span>`;
        case 'lessorGstin':
            return `<span class="lessor-gstin">${property.lessorGstin || 'N/A'}</span>`;
        case 'lessorPan':
            return `<span class="lessor-pan">${property.lessorPan || 'N/A'}</span>`;
        case 'lesseeName':
            return `<span class="lessee-name">${property.lesseeName || 'N/A'}</span>`;
        case 'lesseeGstin':
            return `<span class="lessee-gstin">${property.lesseeGstin || 'N/A'}</span>`;
        case 'lesseePan':
            return `<span class="lessee-pan">${property.lesseePan || 'N/A'}</span>`;
        case 'rentAmount':
            if (property.isRental && property.rentAmount) {
                const rentDisplay = `₹${property.rentAmount.toLocaleString()}${tableColumns.rentPeriod.visible ? '' : '/' + (property.rentPeriod || 'month')}`;
                return `<span class="rent-amount">${rentDisplay}</span>`;
            }
            return `<span class="rent-amount">N/A</span>`;
        case 'rentPeriod':
            return `<span class="rent-period">${property.rentPeriod || 'N/A'}</span>`;
        case 'securityDeposit':
            const deposit = property.securityDeposit ? `₹${property.securityDeposit.toLocaleString()}` : 'N/A';
            return `<span class="security-deposit">${deposit}</span>`;
        case 'agreementStartDate':
            const startDate = property.agreementStartDate ? formatDate(new Date(property.agreementStartDate)) : 'N/A';
            return `<span class="agreement-start">${startDate}</span>`;
        case 'agreementTenure':
            const tenure = property.agreementTenureAmount ? `${property.agreementTenureAmount} ${property.agreementTenureUnit || 'months'}` : 'N/A';
            return `<span class="agreement-tenure">${tenure}</span>`;
        case 'rentPayableDate':
            return `<span class="rent-due-date">${property.rentPayableDate || 'N/A'}</span>`;
        case 'escalationPercentage':
            const escalation = property.escalationPercentage ? `${property.escalationPercentage}%` : 'N/A';
            const escalationPeriod = property.escalationPeriod || 'months';
            return `<span class="escalation">${escalation} per ${escalationPeriod}</span>`;
        case 'escalationPeriod':
            return `<span class="escalation-period">${property.escalationPeriod || 'N/A'}</span>`;
        case 'gstIncludedInRent':
            return `<span class="gst-included">${property.gstIncludedInRent ? 'Yes' : 'No'}</span>`;
        case 'status':
            const status = property.isRental ? 'Active' : 'Vacant';
            const statusClass = property.isRental ? 'property-status--active' : 'property-status--vacant';
            return `<span class="property-status ${statusClass}">${status}</span>`;
        case 'actions':
            console.log('Generating actions for property ID:', property.id);
            return `
                <div class="action-dropdown">
                    <button class="btn btn--sm btn--outline action-menu-btn" onclick="toggleActionMenu(event, ${property.id})" title="Actions">
                        <span>⋮</span>
                    </button>
                    <div class="action-menu" id="actionMenu${property.id}" style="background: red; border: 2px solid black; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 99999; min-width: 160px; display: none;">
                        <button class="action-menu-item" onclick="closeActionMenus(); viewProperty(${property.id})" style="display: block !important; padding: 15px !important; background: yellow !important; border: 2px solid blue !important; width: 100% !important; font-size: 16px !important; color: black !important;">
                            <span>👁️</span> Edit Property
                        </button>
                        <button class="action-menu-item" onclick="closeActionMenus(); showPaymentDashboard(${property.id})" style="display: block !important; padding: 15px !important; background: yellow !important; border: 2px solid blue !important; width: 100% !important; font-size: 16px !important; color: black !important;">
                            <span>💰</span> View Payments
                        </button>
                        <button class="action-menu-item delete-action" onclick="closeActionMenus(); deleteProperty(${property.id})" style="display: block !important; padding: 15px !important; background: yellow !important; border: 2px solid blue !important; width: 100% !important; font-size: 16px !important; color: black !important;">
                            <span>🗑️</span> Delete Property
                        </button>
                </div>
                </div>
            `;
        case 'maintenance':
            return property.maintenance ? 'Yes' : 'No';
        case 'maintenanceAmount':
            return property.maintenance?.amount ? `₹${property.maintenance.amount.toLocaleString()}` : 'N/A';
        case 'maintenanceBorneBy':
            return property.maintenance?.borneBy ? property.maintenance.borneBy : 'N/A';
        default:
            return '<span class="unknown">N/A</span>';
    }
}

function renderPaymentSchedule() {
    const property = properties.find(p => p.id === currentPropertyId);
    const paymentScheduleBody = document.getElementById('paymentScheduleBody');
    
    if (!property || !paymentScheduleBody) return;

    paymentScheduleBody.innerHTML = '';

    // Check if property has agreement start date and rent amount
    if (!property.agreementStartDate || !property.rentAmount) {
        paymentScheduleBody.innerHTML = '<tr><td colspan="6" class="empty-state"><h3>No agreement data available</h3></td></tr>';
        return;
    }

    // Generate payment schedule based on agreement start date and tenure
    const schedule = generatePaymentSchedule(property);
    
    if (schedule.length === 0) {
        paymentScheduleBody.innerHTML = '<tr><td colspan="6" class="empty-state"><h3>No payment schedule available</h3></td></tr>';
        return;
    }

    schedule.forEach((payment, index) => {
        const row = document.createElement('tr');
        
        const statusClass = getPaymentStatusClass(payment.dueDate, payment.paid);
        const statusText = payment.paid ? 'Paid' : getPaymentStatusText(payment.dueDate);
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatDate(payment.dueDate)}</td>
            <td class="payment-amount">₹${payment.amount.toLocaleString()}</td>
            <td>${payment.period}</td>
            <td><span class="payment-status ${statusClass}">${statusText}</span></td>
            <td>${payment.notes || ''}</td>
        `;
        
        paymentScheduleBody.appendChild(row);
    });
}

function generatePaymentSchedule(property) {
    const schedule = [];
    const startDate = new Date(property.agreementStartDate);
    const rentAmount = property.rentAmount || 0;
    const rentPeriod = property.rentPeriod || 'month';
    
    // Use agreement tenure from property data
    const agreementTenureAmount = parseInt(property.agreementTenureAmount || property.agreementTenure || 12);
    const agreementTenureUnit = property.agreementTenureUnit || 'months';
    
    // Convert to appropriate units based on rent period
    let totalPayments, periodLabel;
    if (rentPeriod === 'week') {
        // For weekly rent, convert tenure to weeks
        const tenureWeeks = agreementTenureUnit === 'years' ? agreementTenureAmount * 52 : 
                           agreementTenureUnit === 'months' ? agreementTenureAmount * 4.33 : 
                           agreementTenureAmount; // assume weeks if no unit specified
        totalPayments = Math.ceil(tenureWeeks);
        periodLabel = 'week';
    } else if (rentPeriod === 'year') {
        // For yearly rent, convert tenure to years
        const tenureYears = agreementTenureUnit === 'months' ? Math.ceil(agreementTenureAmount / 12) : 
                           agreementTenureUnit === 'weeks' ? Math.ceil(agreementTenureAmount / 52) :
                           agreementTenureAmount; // assume years if no unit specified
        totalPayments = tenureYears;
        periodLabel = 'year';
    } else {
        // For monthly rent, convert to months
    const tenureMonths = agreementTenureUnit === 'years' ? agreementTenureAmount * 12 : agreementTenureAmount;
        totalPayments = tenureMonths;
        periodLabel = 'month';
    }
    
    // Determine if we need to skip the first period
    const rentPayableDay = parseInt(property.rentPayableDate || 7);
    const skipFirstPeriod = startDate.getDate() > rentPayableDay;
    
    // Generate payments for the entire agreement tenure
    for (let i = 0; i < totalPayments; i++) {
        let dueDate;
        
        if (rentPeriod === 'week') {
            // For weekly payments, add weeks to start date
            const weeksToAdd = skipFirstPeriod ? (i + 1) : i;
            dueDate = new Date(startDate);
            dueDate.setDate(startDate.getDate() + (weeksToAdd * 7));
        } else if (rentPeriod === 'year') {
            // For yearly payments, add years to start date
            const yearsToAdd = skipFirstPeriod ? (i + 1) : i;
            dueDate = new Date(startDate);
            dueDate.setFullYear(startDate.getFullYear() + yearsToAdd);
        } else {
            // For monthly/yearly payments, use existing logic
        let targetMonth = startDate.getMonth();
        let targetYear = startDate.getFullYear();
        
            if (skipFirstPeriod) {
            // Skip first month, so add 1 + payment number
            targetMonth += (i + 1);
        } else {
            // Don't skip, so just add payment number
            targetMonth += i;
        }
        
        // Handle year overflow
        if (targetMonth > 11) {
            targetYear += Math.floor(targetMonth / 12);
            targetMonth = targetMonth % 12;
        }
        
            // Create due date using string format to avoid timezone issues (IST safe)
            const monthStr = String(targetMonth + 1).padStart(2, '0');
            const dayStr = String(rentPayableDay).padStart(2, '0');
            const dateStr = `${targetYear}-${monthStr}-${dayStr}`;
            
            // Create date without time component to avoid timezone conversion
            dueDate = new Date(dateStr);
        }
        
        
        // Check if this payment is already paid (from payment history)
        const isPaid = property.paymentHistory && property.paymentHistory.some(p => {
            const paymentDueDate = new Date(p.dueDate);
            // Compare dates by date string (YYYY-MM-DD) to avoid timezone issues
            const paymentDateStr = paymentDueDate.toISOString().split('T')[0];
            const dueDateStr = dueDate.toISOString().split('T')[0];
            return paymentDateStr === dueDateStr && p.status === 'Paid';
        });
        
        // Generate period description based on rent period
        let periodDescription;
        if (rentPeriod === 'week') {
            periodDescription = `Week ${i + 1}`;
        } else if (rentPeriod === 'year') {
            periodDescription = `Year ${i + 1}`;
        } else if (agreementTenureUnit === 'years') {
            const yearNumber = Math.floor(i / 12) + 1;
            const monthInYear = (i % 12) + 1;
            periodDescription = `Year ${yearNumber}, Month ${monthInYear}`;
        } else {
            periodDescription = `Month ${i + 1}`;
        }
        
        // Calculate escalated rent for this payment period
        const escalatedRent = calculateEscalatedRent(rentAmount, dueDate, property);
        
        // Add escalation information to notes
        let notes = '';
        if (i === 0) {
            notes = 'First Payment';
        } else if (i === totalPayments - 1) {
            notes = 'Final Payment';
        }
        
        // Add escalation note if rent has increased
        if (escalatedRent > rentAmount && property.escalationPercentage > 0) {
            const escalationCycles = Math.floor(((new Date(dueDate) - new Date(property.agreementStartDate)) / (1000 * 60 * 60 * 24)) / (property.escalationDays || 365));
            if (escalationCycles > 0) {
                notes += notes ? ` | Escalated (Year ${escalationCycles})` : `Escalated (Year ${escalationCycles})`;
            }
        }
        
        schedule.push({
            id: `schedule-${i}`,
            dueDate: dueDate.toISOString().split('T')[0],
            amount: escalatedRent,
            period: periodDescription,
            paid: isPaid,
            notes: notes
        });
    }
    
    // Sort schedule: unpaid/upcoming payments first, then paid payments
    schedule.sort((a, b) => {
        // If one is paid and the other is not, unpaid comes first
        if (a.paid !== b.paid) {
            return a.paid ? 1 : -1; // unpaid payments (false) come before paid (true)
        }
        
        // If both have the same payment status, sort by due date (earliest first)
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
    
    return schedule;
}

function getPaymentStatusClass(dueDate, isPaid, isPartiallyPaid) {
    if (isPaid) {
        return 'payment-status--paid';
    }
    
    if (isPartiallyPaid) {
        return 'payment-status--partially-paid';
    }
    
    const due = new Date(dueDate);
    const today = new Date();
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
        return 'payment-status--overdue';
    } else if (diffDays <= 7) {
        return 'payment-status--pending';
    } else {
        return 'payment-status--active';
    }
}

function getPaymentStatusText(dueDate) {
    const due = new Date(dueDate);
    const today = new Date();
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
        return 'Overdue';
    } else if (diffDays <= 7) {
        return 'Due Soon';
    } else {
        return 'Pending';
    }
}

function renderPaymentTable() {
    const property = properties.find(p => p.id === currentPropertyId);
    const paymentTableBody = document.getElementById('paymentTableBody');
    const paymentTableHeader = document.querySelector('#paymentDashboard .payment-table th:nth-child(5)');
    
    if (!property || !paymentTableBody) return;

    // Update GST header with dynamic percentage
    if (paymentTableHeader) {
        if (property.gstIncludedInRent) {
            paymentTableHeader.textContent = `GST (${property.gstPercentage || 18}%)`;
        } else {
            paymentTableHeader.textContent = 'GST (0%)';
        }
    }

    paymentTableBody.innerHTML = '';

    // Check if property is rental and has agreement data
    if (!property.isRental) {
        paymentTableBody.innerHTML = '<tr><td colspan="8" class="empty-state"><h3>This property is not set as rental</h3><p>Payment tracking is only available for rental properties.</p></td></tr>';
        return;
    }
    
    if (!property.agreementStartDate || !property.rentAmount) {
        paymentTableBody.innerHTML = '<tr><td colspan="8" class="empty-state"><h3>No agreement data available</h3><p>Please set agreement start date and rent amount in property details.</p></td></tr>';
        return;
    }

    // Generate payment schedule based on agreement start date and tenure
    const schedule = generatePaymentSchedule(property);
    
    if (schedule.length === 0) {
        paymentTableBody.innerHTML = '<tr><td colspan="8" class="empty-state"><h3>No payment schedule available</h3></td></tr>';
        return;
    }
    

    schedule.forEach((payment, index) => {
        const row = document.createElement('tr');
        
        // Find corresponding payment history record for actions
        const paymentHistory = property.paymentHistory?.find(p => {
            const historyDate = new Date(p.dueDate);
            const scheduleDate = new Date(payment.dueDate);
            return historyDate.getTime() === scheduleDate.getTime();
        });
        
        // Get payment status considering partial payments
        const paymentStatus = paymentHistory ? getPartialPaymentStatus(paymentHistory) : (payment.paid ? 'Paid' : 'Pending');
        const statusClass = getPaymentStatusClass(payment.dueDate, paymentStatus === 'Paid', paymentStatus === 'Partially Paid');
        const statusText = paymentStatus;
        
        // Calculate GST and total based on whether GST is included in rent
        const rentAmount = payment.amount;
        let baseAmount, gstAmount, totalAmount;
        
        // Handle partial payments and regular payments
        if (paymentHistory && (paymentStatus === 'Paid' || paymentStatus === 'Partially Paid')) {
            // For paid payments, always use original stored amounts (never recalculate)
            if (paymentStatus === 'Paid') {
                baseAmount = paymentHistory.base || 0;
                gstAmount = paymentHistory.gst || 0;
                totalAmount = paymentHistory.total || 0;
            } else {
                // For partial payments, use partial payment amounts
                const partialSummary = getPartialPaymentSummary(paymentHistory);
                if (partialSummary.paymentCount > 0) {
                    if (paymentStatus === 'Partially Paid') {
                        // For partial payments, show remaining amount
                        const remainingAmount = partialSummary.remainingAmount;
                        
                        // Check if this payment was created before GST was enabled
                        // If the original payment has GST = 0, it was created before GST enablement
                        const wasCreatedBeforeGst = (paymentHistory.gst || 0) === 0 && 
                                                   (paymentHistory.base || 0) === (paymentHistory.total || 0);
                        
                        if (wasCreatedBeforeGst) {
                            // Use original payment amounts (no GST calculation)
                            baseAmount = remainingAmount;
                            gstAmount = 0;
                        } else {
                            // Calculate GST based on current property settings
                            if (property.gstIncludedInRent && property.gstPercentage) {
                                const gstPercentage = parseFloat(property.gstPercentage || 18) / 100;
                                baseAmount = Math.round(remainingAmount / (1 + gstPercentage));
                                gstAmount = remainingAmount - baseAmount;
                            } else {
                                baseAmount = remainingAmount;
                                gstAmount = 0;
                            }
                        }
                        totalAmount = remainingAmount;
                    }
                } else {
                    // Use original payment history amounts
                    baseAmount = paymentHistory.base || 0;
                    gstAmount = paymentHistory.gst || 0;
                    totalAmount = paymentHistory.total || 0;
                }
            }
        } else {
            // For unpaid payments, calculate based on current rent amount
        if (property.gstIncludedInRent) {
            // GST is included in rent amount, so calculate base amount
            const gstPercentage = parseFloat(property.gstPercentage || 18) / 100;
            baseAmount = Math.round(rentAmount / (1 + gstPercentage)); // Remove GST from total
            gstAmount = rentAmount - baseAmount;
            totalAmount = rentAmount;
        } else {
            // GST is not included - no GST at all
            baseAmount = rentAmount;
            gstAmount = 0;
            totalAmount = rentAmount;
            }
        }
        
        // Fallback: If amounts are 0 or invalid, use calculated amounts
        if (baseAmount === 0 || totalAmount === 0) {
            if (property.gstIncludedInRent) {
                const gstPercentage = parseFloat(property.gstPercentage || 18) / 100;
                baseAmount = Math.round(rentAmount / (1 + gstPercentage));
                gstAmount = rentAmount - baseAmount;
                totalAmount = rentAmount;
            } else {
                baseAmount = rentAmount;
                gstAmount = 0;
                totalAmount = rentAmount;
            }
        }
        
        const paymentId = paymentHistory?.id || payment.id || `schedule-${index}`;
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${payment.paid && paymentHistory?.date ? formatDate(paymentHistory.date) : '-'}</td>
            <td>${formatDate(payment.dueDate)}</td>
            <td class="payment-amount">₹${baseAmount.toLocaleString()}</td>
            <td class="payment-amount">₹${gstAmount.toLocaleString()}</td>
                <td class="payment-amount">₹${totalAmount.toLocaleString()}${paymentStatus === 'Partially Paid' ? ' <small>(Remaining)</small>' : ''}</td>
            <td><span class="payment-status ${statusClass}">${statusText}</span></td>
            <td>
                <div class="payment-actions">
                    <button class="payment-action-btn" onclick="togglePaymentDropdown('${paymentId}')">
                        ⋯
                    </button>
                    <div class="payment-dropdown hidden" id="dropdown-${paymentId}">
                        ${paymentStatus === 'Pending' ? 
                            `<button class="dropdown-item" onclick="openPaymentModal('${paymentId}'); hidePaymentDropdown('${paymentId}')">
                                📝 Receive Full Payment
                            </button>
                            <button class="dropdown-item" onclick="openPartialPaymentModal('${paymentId}'); hidePaymentDropdown('${paymentId}')">
                                💰 Add Partial Payment
                            </button>` : 
                            paymentStatus === 'Partially Paid' ?
                            `<button class="dropdown-item" onclick="openPartialPaymentModal('${paymentId}'); hidePaymentDropdown('${paymentId}')">
                                💰 Add Partial Payment
                            </button>
                            <button class="dropdown-item" onclick="viewPaymentReceipt('${paymentId}'); hidePaymentDropdown('${paymentId}')">
                                📋 View Receipt
                            </button>` : 
                            `<button class="dropdown-item" onclick="viewPaymentReceipt('${paymentId}'); hidePaymentDropdown('${paymentId}')">
                                📋 View Receipt
                            </button>`
                        }
                        <button class="dropdown-item" onclick="generatePaymentInvoice('${paymentId}'); hidePaymentDropdown('${paymentId}')">
                            📄 Generate Invoice
                        </button>
                    </div>
                </div>
            </td>
        `;
        
        paymentTableBody.appendChild(row);
    });
}


function updatePaymentSummary() {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property) return;

    // Use the same payment schedule logic as the payment table
    let payments = [];
    
    if (property.paymentHistory && property.paymentHistory.length > 0) {
        // Use existing payment history
        payments = property.paymentHistory.map(p => ({
            ...p,
            status: p.status || (p.paid ? 'Paid' : 'Pending'),
            dueDate: p.dueDate
        }));
    } else if (property.agreementStartDate && property.rentAmount) {
        // Generate payment schedule and check against payment history
        const schedule = generatePaymentSchedule(property);
        payments = schedule.map(p => {
            const rentAmount = p.amount;
            let baseAmount, gstAmount, totalAmount;
            
            if (property.gstIncludedInRent && property.gstPercentage > 0) {
                // GST is included in rent amount, so calculate base amount
                const gstPercentage = parseFloat(property.gstPercentage) / 100;
                baseAmount = Math.round(rentAmount / (1 + gstPercentage));
                gstAmount = rentAmount - baseAmount;
                totalAmount = rentAmount;
            } else {
                // GST is not included - no GST at all
                baseAmount = rentAmount;
                gstAmount = 0;
                totalAmount = rentAmount;
            }
            
            // Check if this payment has been paid in payment history
            let paymentStatus = 'Pending';
            if (property.paymentHistory && property.paymentHistory.length > 0) {
                const paymentHistory = property.paymentHistory.find(ph => {
                    const phDueDate = new Date(ph.dueDate);
                    const scheduleDueDate = new Date(p.dueDate);
                    const phDateStr = phDueDate.toISOString().split('T')[0];
                    const scheduleDateStr = scheduleDueDate.toISOString().split('T')[0];
                    return phDateStr === scheduleDateStr;
                });
                
                if (paymentHistory) {
                    // Use the payment status from payment history (including partial payments)
                    paymentStatus = getPartialPaymentStatus(paymentHistory);
                    
                    if (paymentStatus === 'Paid') {
                    // Use actual payment amounts from payment history
                        baseAmount = paymentHistory.base || baseAmount;
                        gstAmount = paymentHistory.gst || gstAmount;
                        totalAmount = paymentHistory.total || totalAmount;
                    }
                }
            }
            
            return {
                total: totalAmount,
                base: baseAmount,
                gst: gstAmount,
                status: paymentStatus,
                dueDate: p.dueDate
            };
        });
    } else {
        // No payment data available
        payments = [];
    }

    // Calculate total collected including partial payments
    const totalCollected = payments.reduce((sum, p) => {
        if (p.status === 'Paid') {
            return sum + p.total;
        } else if (p.status === 'Partially Paid') {
            // For partial payments, add the paid amount
            const property = properties.find(prop => prop.id === currentPropertyId);
            if (property && property.paymentHistory) {
                const paymentHistory = property.paymentHistory.find(ph => {
                    const phDueDate = new Date(ph.dueDate);
                    const pDueDate = new Date(p.dueDate);
                    return phDueDate.toISOString().split('T')[0] === pDueDate.toISOString().split('T')[0];
                });
                if (paymentHistory) {
                    const partialSummary = getPartialPaymentSummary(paymentHistory);
                    return sum + partialSummary.paidAmount;
                }
            }
        }
        return sum;
    }, 0);
    const pendingAmount = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.total, 0);
    const overdueAmount = payments.filter(p => p.status === 'Pending' && new Date(p.dueDate) < new Date()).reduce((sum, p) => sum + p.total, 0);
    // Calculate GST collected including partial payments
    const gstCollected = payments.reduce((sum, p) => {
        if (p.status === 'Paid') {
            return sum + (p.gst || 0);
        } else if (p.status === 'Partially Paid') {
            // For partial payments, calculate GST for paid amount
            const property = properties.find(prop => prop.id === currentPropertyId);
            if (property && property.paymentHistory) {
                const paymentHistory = property.paymentHistory.find(ph => {
                    const phDueDate = new Date(ph.dueDate);
                    const pDueDate = new Date(p.dueDate);
                    return phDueDate.toISOString().split('T')[0] === pDueDate.toISOString().split('T')[0];
                });
                if (paymentHistory) {
                    const partialSummary = getPartialPaymentSummary(paymentHistory);
                    // Only calculate GST if GST is enabled for the property
                    if (property.gstIncludedInRent && property.gstPercentage) {
                        const gstPercentage = parseFloat(property.gstPercentage) / 100;
                        const baseAmount = Math.round(partialSummary.paidAmount / (1 + gstPercentage));
                        const gstAmount = partialSummary.paidAmount - baseAmount;
                        return sum + gstAmount;
                    }
                    // If GST is disabled, no GST amount to add
                }
            }
        }
        return sum;
    }, 0);

    document.getElementById('totalCollected').textContent = `₹${totalCollected.toLocaleString()}`;
    document.getElementById('pendingAmount').textContent = `₹${pendingAmount.toLocaleString()}`;
    document.getElementById('overdueAmount').textContent = `₹${overdueAmount.toLocaleString()}`;
    document.getElementById('gstCollected').textContent = `₹${gstCollected.toLocaleString()}`;
}

function viewProperty(propertyId) {
    openPropertyModal(propertyId);
}

function deleteProperty(propertyId) {
    if (confirm('Are you sure you want to delete this property?')) {
        properties = properties.filter(p => p.id !== propertyId);
        saveData(); // Save data to localStorage
        renderPropertiesTable();
        updateDashboardSummary();
        showNotification('Property deleted successfully');
    }
}

function filterProperties() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    
    const filteredProperties = properties.filter(property => {
        const matchesSearch = !searchTerm || 
            (property.name && property.name.toLowerCase().includes(searchTerm)) ||
            (property.address && property.address.toLowerCase().includes(searchTerm)) ||
            (property.projectName && property.projectName.toLowerCase().includes(searchTerm));
            
        const matchesType = !typeFilter || property.type === typeFilter;
        
        return matchesSearch && matchesType;
    });

    // Temporarily replace properties for rendering
    const originalProperties = properties;
    properties = filteredProperties;
    renderPropertiesTable();
    properties = originalProperties;
}

function updateDashboardSummary() {
    const totalProperties = properties.length;
    const activeRentals = properties.filter(p => p.isRental).length;
    const monthlyRevenue = properties
        .filter(p => p.isRental && p.rentAmount)
        .reduce((sum, p) => {
            const monthlyRent = p.rentPeriod === 'year' ? p.rentAmount / 12 : p.rentAmount;
            return sum + monthlyRent;
        }, 0);

    // Calculate pending bills (unpaid/overdue only)
    const pendingBills = properties.reduce((count, property) => {
        if (property.bills) {
            billTypes.forEach(bill => {
                const billData = property.bills[bill.key];
                if (billData && billData.checked && !billData.paid) {
                    // Check if bill is overdue (past due date)
                    const today = new Date();
                    let dueDate = null;
                    
                    // If we have a stored due date, use it
                    if (billData.dueDate) {
                        dueDate = new Date(billData.dueDate);
                    } else if (billData.dueValue && billData.period) {
                        // Calculate due date from value and period
                        const value = parseInt(billData.dueValue);
                        const periodType = billData.period;
                        
                        if (periodType === 'days') {
                            dueDate = new Date(today.getTime() + (value * 24 * 60 * 60 * 1000));
                        } else if (periodType === 'months') {
                            dueDate = new Date(today.getFullYear(), today.getMonth() + value, today.getDate());
                        } else if (periodType === 'years') {
                            dueDate = new Date(today.getFullYear() + value, today.getMonth(), today.getDate());
                        }
                    }
                    
                    if (!dueDate || dueDate < today) {
                        count++; // Bill is unpaid and overdue (or no due date set)
                    }
                }
            });
            // Check custom bills
            if (property.bills.customBills) {
                property.bills.customBills.forEach(customBill => {
                    if (!customBill.paid) {
                        const today = new Date();
                        let dueDate = null;
                        
                        // If we have a stored due date, use it
                        if (customBill.dueDate) {
                            dueDate = new Date(customBill.dueDate);
                        } else if (customBill.dueValue && customBill.period) {
                            // Calculate due date from value and period
                            const value = parseInt(customBill.dueValue);
                            const periodType = customBill.period;
                            
                            if (periodType === 'days') {
                                dueDate = new Date(today.getTime() + (value * 24 * 60 * 60 * 1000));
                            } else if (periodType === 'months') {
                                dueDate = new Date(today.getFullYear(), today.getMonth() + value, today.getDate());
                            } else if (periodType === 'years') {
                                dueDate = new Date(today.getFullYear() + value, today.getMonth(), today.getDate());
                            }
                        }
                        
                        if (!dueDate || dueDate < today) {
                            count++; // Custom bill is unpaid and overdue
                        }
                    }
                });
            }
        }
        return count;
    }, 0);

    document.getElementById('totalProperties').textContent = totalProperties;
    document.getElementById('activeRentals').textContent = activeRentals;
    document.getElementById('pendingBills').textContent = pendingBills;
    document.getElementById('monthlyRevenue').textContent = `₹${Math.round(monthlyRevenue).toLocaleString()}`;
}

// Table Settings Functions
function openTableSettings() {
    const modal = document.getElementById('tableSettingsModal');
    modal.classList.remove('hidden');
    populateColumnSettings();
    document.body.style.overflow = 'hidden';
}

function closeTableSettings() {
    const modal = document.getElementById('tableSettingsModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function populateColumnSettings() {
    const basicContainer = document.getElementById('basicColumns');
    const propertyContainer = document.getElementById('propertyColumns');
    const rentalContainer = document.getElementById('rentalColumns');
    
    basicContainer.innerHTML = '';
    propertyContainer.innerHTML = '';
    rentalContainer.innerHTML = '';
    
    Object.keys(tableColumns).forEach(columnKey => {
        const column = tableColumns[columnKey];
        const checkbox = document.createElement('label');
        checkbox.className = 'checkbox-label';
        checkbox.innerHTML = `
            <input type="checkbox" ${column.visible ? 'checked' : ''} 
                   onchange="toggleColumn('${columnKey}', this.checked)">
            ${column.label}
        `;
        
        if (column.category === 'basic') {
            basicContainer.appendChild(checkbox);
        } else if (column.category === 'property') {
            propertyContainer.appendChild(checkbox);
        } else if (column.category === 'rental') {
            rentalContainer.appendChild(checkbox);
        }
    });
}

function toggleColumn(columnKey, visible) {
    tableColumns[columnKey].visible = visible;
    // Save settings immediately when toggled
    saveTableSettings();
    // Re-render table to show changes immediately
    renderPropertiesTable();
}

function applyTableSettings() {
    // Settings are already saved and table re-rendered when toggled
    closeTableSettings();
    showNotification('Table settings applied successfully');
}

function resetTableColumns() {
    // Reset to default visibility using configuration
    Object.keys(tableColumns).forEach(key => {
        tableColumns[key].visible = defaultVisibleColumns.includes(key);
    });
    populateColumnSettings();
    saveTableSettings();
    renderPropertiesTable();
}

function saveTableSettings() {
    localStorage.setItem('tableColumns', JSON.stringify(tableColumns));
}

function loadTableSettings() {
    const saved = localStorage.getItem('tableColumns');
    if (saved) {
        const savedColumns = JSON.parse(saved);
        // Merge with default columns to handle new columns added later
        Object.keys(tableColumns).forEach(key => {
            if (savedColumns[key]) {
                tableColumns[key].visible = savedColumns[key].visible;
            }
        });
    }
}

function toggleRentalFields() {
    const isRental = isRentalCheckbox.checked;
    const rentalTab = document.querySelector('[data-tab="rental"]');
    
    if (isRental) {
        rentalTab.style.opacity = '1';
        rentalTab.style.pointerEvents = 'auto';
    } else {
        rentalTab.style.opacity = '0.5';
        rentalTab.style.pointerEvents = 'none';
    }
}

function toggleMaintenanceFields() {
    const maintenanceCheckbox = document.getElementById('maintenanceCheckbox');
    const maintenanceDetails = document.getElementById('maintenanceDetails');
    
    if (maintenanceCheckbox && maintenanceDetails) {
        if (maintenanceCheckbox.checked) {
            maintenanceDetails.classList.remove('hidden');
        } else {
            maintenanceDetails.classList.add('hidden');
        }
    }
}

function toggleLegalChargesCustom() {
    const legalChargesBorneBySelect = document.getElementById('legalChargesBorneBySelect');
    const legalChargesCustom = document.getElementById('legalChargesCustom');
    
    if (legalChargesBorneBySelect && legalChargesCustom) {
        if (legalChargesBorneBySelect.value === 'custom') {
            legalChargesCustom.classList.remove('hidden');
        } else {
            legalChargesCustom.classList.add('hidden');
        }
    }
}

function toggleMunicipalTaxesFields() {
    const municipalTaxesCheckbox = document.getElementById('municipalTaxesCheckbox');
    const municipalTaxesDetails = document.getElementById('municipalTaxesDetails');
    
    if (municipalTaxesCheckbox && municipalTaxesDetails) {
        if (municipalTaxesCheckbox.checked) {
            municipalTaxesDetails.classList.remove('hidden');
        } else {
            municipalTaxesDetails.classList.add('hidden');
        }
    }
}

function toggleSignageTaxFields() {
    const signageTaxCheckbox = document.getElementById('signageTaxCheckbox');
    const signageTaxDetails = document.getElementById('signageTaxDetails');
    
    if (signageTaxCheckbox && signageTaxDetails) {
        if (signageTaxCheckbox.checked) {
            signageTaxDetails.classList.remove('hidden');
        } else {
            signageTaxDetails.classList.add('hidden');
        }
    }
}

function toggleLegalChargesFields() {
    const legalChargesCheckbox = document.getElementById('legalChargesCheckbox');
    const legalChargesDetails = document.getElementById('legalChargesDetails');
    
    if (legalChargesCheckbox && legalChargesDetails) {
        if (legalChargesCheckbox.checked) {
            legalChargesDetails.classList.remove('hidden');
        } else {
            legalChargesDetails.classList.add('hidden');
        }
    }
}


function toggleGstFields() {
    const gstCheckbox = document.getElementById('gstCheckbox');
    const gstDetails = document.getElementById('gstDetails');
    
    if (gstCheckbox && gstDetails) {
        // Only toggle if the checkbox state actually changed
        if (gstCheckbox.checked && gstDetails.classList.contains('hidden')) {
            gstDetails.classList.remove('hidden');
            // Set default values when GST is enabled
            const gstBorneBySelect = document.querySelector('[name="gstBorneBy"]');
            if (gstBorneBySelect && !gstBorneBySelect.value) {
                gstBorneBySelect.value = 'lessee';
            }
        } else if (!gstCheckbox.checked && !gstDetails.classList.contains('hidden')) {
            gstDetails.classList.add('hidden');
        }
    }
}

function recalculatePaymentHistory(property) {
    if (!property.paymentHistory) return;
    
    property.paymentHistory.forEach(payment => {
        // Only recalculate GST for unpaid payments to preserve paid amounts
        if (payment.status !== 'Paid') {
            // PROTECTION: Never update payments that have partial payments
            if (payment.partialPayments && payment.partialPayments.length > 0) {
                return; // Skip payments with partial payments
            }
        if (property.gstIncludedInRent && property.gstPercentage) {
            // GST is included in total, calculate base amount
            const gstPercentage = parseFloat(property.gstPercentage) / 100;
            payment.base = Math.round(payment.total / (1 + gstPercentage));
            payment.gst = payment.total - payment.base;
        } else {
            // GST is not included - no GST at all
            payment.gst = 0;
            payment.total = payment.base;
        }
        }
        // For paid payments, preserve the original amounts
    });
}

/**
 * Enable GST for future payments while preserving past payment amounts
 * This function ensures that past payments (made without GST) remain unchanged
 * and only future payments will have GST applied
 */
function enableGSTForFuturePayments(property, oldGstIncluded, newGstIncluded, oldGstPercentage, newGstPercentage) {
    if (!property.paymentHistory) return;
    
    // Don't update if GST settings haven't changed
    if (oldGstIncluded === newGstIncluded && oldGstPercentage === newGstPercentage) return;
    
    const today = new Date();
    
    property.paymentHistory.forEach(payment => {
        // STRICT PROTECTION: Never update paid payments
        if (payment.status === 'Paid') {
            return; // Skip all paid payments completely
        }
        
        // PROTECTION: Never update payments that have partial payments
        if (payment.partialPayments && payment.partialPayments.length > 0) {
            return; // Skip payments with partial payments
        }
        
        // Only update payments that are due today or in the future
        const paymentDueDate = new Date(payment.dueDate);
        const isFuturePayment = paymentDueDate >= today;
        
        if (isFuturePayment) {
            // Recalculate GST based on new GST settings
            if (newGstIncluded && newGstPercentage) {
                // GST is now included - recalculate base amount
                const gstPercentage = parseFloat(newGstPercentage) / 100;
                payment.base = Math.round(payment.total / (1 + gstPercentage));
                payment.gst = payment.total - payment.base;
            } else {
                // GST is now disabled - no GST
                payment.gst = 0;
                payment.total = payment.base;
            }
            
            // Add a note about the GST change
            if (!payment.notes) {
                payment.notes = `GST ${newGstIncluded ? 'enabled' : 'disabled'} on ${today.toISOString().split('T')[0]}`;
            }
        }
    });
}

/**
 * Smart payment update function that preserves past payment amounts
 * and only updates future payments when rent amount changes
 * STRICT PROTECTION: Never changes paid payments
 */
function smartUpdatePaymentHistory(property, oldRentAmount, newRentAmount) {
    if (!property.paymentHistory || !oldRentAmount || !newRentAmount) return;
    
    // Don't update if rent amount hasn't changed
    if (oldRentAmount === newRentAmount) return;
    
    const today = new Date();
    const rentChangeDate = today.toISOString().split('T')[0];
    
    property.paymentHistory.forEach(payment => {
        // STRICT PROTECTION: Never update paid payments
        if (payment.status === 'Paid') {
            return; // Skip all paid payments completely
        }
        
        // Only update payments that are:
        // 1. Not yet paid (status !== 'Paid') - already checked above
        // 2. Due date is today or in the future
        const paymentDueDate = new Date(payment.dueDate);
        const isFuturePayment = paymentDueDate >= today;
        
        if (isFuturePayment) {
            // Calculate the ratio of rent change
            const rentRatio = newRentAmount / oldRentAmount;
            
            // Update base amount proportionally
            const newBaseAmount = Math.round(payment.base * rentRatio);
            
            // Recalculate GST and total based on current GST settings
            if (property.gstIncludedInRent && property.gstPercentage) {
                // GST is included in total
                const gstPercentage = parseFloat(property.gstPercentage) / 100;
                payment.total = Math.round(newBaseAmount * (1 + gstPercentage));
                payment.gst = payment.total - newBaseAmount;
            } else {
                // GST is not included
                payment.total = newBaseAmount;
                payment.gst = 0;
            }
            
            payment.base = newBaseAmount;
            
            // Add a note about the rent change
            if (!payment.notes) {
                payment.notes = `Rent updated from ₹${oldRentAmount.toLocaleString()} to ₹${newRentAmount.toLocaleString()} on ${rentChangeDate}`;
            }
        }
    });
}

/**
 * Update future payment schedule when rent amount changes
 * This function generates new payment schedule for future payments only
 */
function updateFuturePaymentSchedule(property, oldRentAmount, newRentAmount) {
    if (!property.paymentHistory || !oldRentAmount || !newRentAmount) return;
    
    // Don't update if rent amount hasn't changed
    if (oldRentAmount === newRentAmount) return;
    
    // Find the last paid payment to determine where to start updating
    const lastPaidPayment = property.paymentHistory
        .filter(p => p.status === 'Paid')
        .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))[0];
    
    if (!lastPaidPayment) return;
    
    const lastPaidDate = new Date(lastPaidPayment.dueDate);
    const today = new Date();
    
    // Update only future payments (due date after last paid date)
    property.paymentHistory.forEach(payment => {
        const paymentDueDate = new Date(payment.dueDate);
        
        // Only update payments that are due after the last paid payment
        if (paymentDueDate > lastPaidDate && payment.status !== 'Paid') {
            // Calculate the ratio of rent change
            const rentRatio = newRentAmount / oldRentAmount;
            
            // Update base amount proportionally
            const newBaseAmount = Math.round(payment.base * rentRatio);
            
            // Recalculate GST and total based on current GST settings
            if (property.gstIncludedInRent && property.gstPercentage) {
                // GST is included in total
                const gstPercentage = parseFloat(property.gstPercentage) / 100;
                payment.total = Math.round(newBaseAmount * (1 + gstPercentage));
                payment.gst = payment.total - newBaseAmount;
            } else {
                // GST is not included
                payment.total = newBaseAmount;
                payment.gst = 0;
            }
            
            payment.base = newBaseAmount;
        }
    });
}

/**
 * Backup paid payments to protect them from changes
 */
function backupPaidPayments(property) {
    if (!property.paymentHistory) return {};
    
    const backup = {};
    property.paymentHistory.forEach(payment => {
        if (payment.status === 'Paid') {
            backup[payment.id] = {
                base: payment.base,
                gst: payment.gst,
                total: payment.total,
                amount: payment.amount,
                status: payment.status,
                paymentDate: payment.paymentDate,
                paymentMode: payment.paymentMode,
                receiptNo: payment.receiptNo,
                notes: payment.notes
            };
        }
    });
    return backup;
}

/**
 * Restore paid payments from backup if they were accidentally changed
 */
function restorePaidPayments(property, backup) {
    if (!property.paymentHistory || !backup) return;
    
    property.paymentHistory.forEach(payment => {
        if (payment.status === 'Paid' && backup[payment.id]) {
            const originalPayment = backup[payment.id];
            // Restore original values
            payment.base = originalPayment.base;
            payment.gst = originalPayment.gst;
            payment.total = originalPayment.total;
            payment.amount = originalPayment.amount;
            payment.status = originalPayment.status;
            payment.paymentDate = originalPayment.paymentDate;
            payment.paymentMode = originalPayment.paymentMode;
            payment.receiptNo = originalPayment.receiptNo;
            payment.notes = originalPayment.notes;
        }
    });
}

/**
 * Add partial payment to a payment record
 */
function addPartialPayment(paymentId, amount, paymentDate, paymentMode, receiptNo, notes) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.paymentHistory) return;
    
    const payment = property.paymentHistory.find(p => p.id == paymentId);
    if (!payment) return;
    
    // Initialize partial payment structure if not exists
    if (!payment.partialPayments) {
        payment.partialPayments = [];
        payment.totalAmount = payment.total || payment.base + (payment.gst || 0);
        payment.paidAmount = 0;
        payment.remainingAmount = payment.totalAmount;
    }
    
    // Add partial payment
    const partialPayment = {
        amount: parseFloat(amount),
        date: paymentDate,
        mode: paymentMode,
        receiptNo: receiptNo || `RCP-${Date.now()}`,
        notes: notes || 'Partial payment'
    };
    
    payment.partialPayments.push(partialPayment);
    
    // Update payment amounts
    payment.paidAmount = payment.partialPayments.reduce((sum, p) => sum + p.amount, 0);
    payment.remainingAmount = payment.totalAmount - payment.paidAmount;
    
    // Update status
    if (payment.remainingAmount <= 0) {
        payment.status = 'Paid';
        payment.paymentDate = paymentDate;
        payment.paymentMode = paymentMode;
        payment.receiptNo = receiptNo;
    } else {
        payment.status = 'Partially Paid';
    }
    
    // Update legacy fields for compatibility
    payment.total = payment.paidAmount;
    
    // Calculate base and GST for paid amount based on property GST settings
    if (property.gstIncludedInRent && property.gstPercentage) {
        // GST is included in rent - calculate base amount
        const gstPercentage = parseFloat(property.gstPercentage || 18) / 100;
        payment.base = Math.round(payment.paidAmount / (1 + gstPercentage));
        payment.gst = payment.paidAmount - payment.base;
    } else {
        // GST is not included - no GST calculation
        payment.base = payment.paidAmount;
        payment.gst = 0;
    }
    
    saveData();
    renderPaymentTable();
    updatePaymentSummary();
    
    showNotification(`Partial payment of ₹${amount.toLocaleString()} recorded successfully`);
}

/**
 * Get payment status for partial payments
 */
function getPartialPaymentStatus(payment) {
    if (!payment.partialPayments || payment.partialPayments.length === 0) {
        return payment.status || 'Pending';
    }
    
    if (payment.remainingAmount <= 0) {
        return 'Paid';
    } else if (payment.paidAmount > 0) {
        return 'Partially Paid';
    } else {
        return 'Pending';
    }
}

/**
 * Calculate partial payment summary
 */
function getPartialPaymentSummary(payment) {
    if (!payment.partialPayments || payment.partialPayments.length === 0) {
        return {
            totalAmount: payment.totalAmount || payment.total || 0,
            paidAmount: payment.paidAmount || 0,
            remainingAmount: payment.remainingAmount || (payment.totalAmount || payment.total || 0),
            paymentCount: 0
        };
    }
    
    return {
        totalAmount: payment.totalAmount || 0,
        paidAmount: payment.paidAmount || 0,
        remainingAmount: payment.remainingAmount || 0,
        paymentCount: payment.partialPayments.length
    };
}

/**
 * Open partial payment modal
 */
function openPartialPaymentModal(paymentId) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property) {
        showNotification('Property not found', 'error');
        return;
    }
    
    let payment = null;
    
    // First try to find in payment history
    if (property.paymentHistory) {
        payment = property.paymentHistory.find(p => p.id == paymentId);
    }
    
    // If not found in payment history, create a new payment record
    if (!payment) {
        // Generate payment schedule to get the payment details
        const schedule = generatePaymentSchedule(property);
        const schedulePayment = schedule.find(p => p.id === paymentId);
        
        if (!schedulePayment) {
            showNotification('Payment not found for ID: ' + paymentId, 'error');
            return;
        }
        
        // Calculate GST and total based on current property settings
        let baseAmount, gstAmount, totalAmount;
        
        if (property.gstIncludedInRent && property.gstPercentage) {
            // GST is included in rent amount, so calculate base amount
            const gstPercentage = parseFloat(property.gstPercentage || 18) / 100;
            baseAmount = Math.round(schedulePayment.amount / (1 + gstPercentage));
            gstAmount = schedulePayment.amount - baseAmount;
            totalAmount = schedulePayment.amount;
        } else {
            // GST is not included - no GST at all
            baseAmount = schedulePayment.amount;
            gstAmount = 0;
            totalAmount = schedulePayment.amount;
        }
        
        // Create a new payment record
        payment = {
            id: paymentId,
            date: schedulePayment.dueDate,
            dueDate: schedulePayment.dueDate,
            base: baseAmount,
            gst: gstAmount,
            total: totalAmount,
            status: 'Pending',
            totalAmount: totalAmount,
            paidAmount: 0,
            remainingAmount: totalAmount,
            partialPayments: []
        };
        
        // Add to payment history if it doesn't exist
        if (!property.paymentHistory) {
            property.paymentHistory = [];
        }
        property.paymentHistory.push(payment);
        saveData();
    }
    
    const partialSummary = getPartialPaymentSummary(payment);
    
    // Remove any existing modal first
    const existingModal = document.getElementById('partialPaymentModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'partialPaymentModal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closePartialPaymentModal()"></div>
        <div class="modal-content payment-modal-content">
            <div class="modal-header">
                <h2>Add Partial Payment</h2>
                <button class="modal-close" onclick="closePartialPaymentModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="payment-summary-info">
                    <h4>Payment Summary</h4>
                    <div class="summary-grid">
                        <div class="summary-item">
                            <label>Total Amount:</label>
                            <span>₹${partialSummary.totalAmount.toLocaleString()}</span>
                        </div>
                        <div class="summary-item">
                            <label>Paid Amount:</label>
                            <span>₹${partialSummary.paidAmount.toLocaleString()}</span>
                        </div>
                        <div class="summary-item">
                            <label>Remaining:</label>
                            <span>₹${partialSummary.remainingAmount.toLocaleString()}</span>
                        </div>
                        <div class="summary-item">
                            <label>Payments Made:</label>
                            <span>${partialSummary.paymentCount}</span>
                        </div>
                    </div>
                </div>
                
                <form id="partialPaymentForm">
                    <div class="form-group">
                        <label class="form-label">Payment Amount *</label>
                        <input type="number" class="form-control" id="partialAmount" 
                               placeholder="Enter amount" min="1" max="${partialSummary.remainingAmount}" 
                               step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Payment Date *</label>
                        <input type="date" class="form-control" id="partialPaymentDate" 
                               value="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Payment Mode *</label>
                        <select class="form-control" id="partialPaymentMode" required>
                            <option value="">Select Mode</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Online">Online</option>
                            <option value="UPI">UPI</option>
                            <option value="NEFT">NEFT</option>
                            <option value="RTGS">RTGS</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Receipt Number</label>
                        <input type="text" class="form-control" id="partialReceiptNo" 
                               placeholder="Enter receipt number">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Notes</label>
                        <textarea class="form-control" id="partialNotes" rows="3" 
                                  placeholder="Enter notes (optional)"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn--outline" onclick="closePartialPaymentModal()">Cancel</button>
                <button class="btn btn--primary" onclick="submitPartialPayment('${paymentId}')">Add Payment</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show the modal
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
}

/**
 * Close partial payment modal
 */
function closePartialPaymentModal() {
    const modal = document.getElementById('partialPaymentModal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Submit partial payment
 */
function submitPartialPayment(paymentId) {
    const amount = document.getElementById('partialAmount').value;
    const paymentDate = document.getElementById('partialPaymentDate').value;
    const paymentMode = document.getElementById('partialPaymentMode').value;
    const receiptNo = document.getElementById('partialReceiptNo').value;
    const notes = document.getElementById('partialNotes').value;
    
    // Validate required fields
    if (!amount || !paymentDate || !paymentMode) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (parseFloat(amount) <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    // Add partial payment
    addPartialPayment(paymentId, amount, paymentDate, paymentMode, receiptNo, notes);
    
    // Close modal
    closePartialPaymentModal();
}

/**
 * Test function to open partial payment modal
 */
function testPartialPaymentModal() {
    console.log('Testing partial payment modal...');
    openPartialPaymentModal('1');
}

function calculateEscalatedRent(baseRent, paymentDate, property) {
    const agreementStartDate = new Date(property.agreementStartDate);
    const escalationPercentage = parseFloat(property.escalationPercentage || 0) / 100;
    
    // Convert escalation period to days
    let escalationDays = 365; // default to 1 year
    const escalationPeriod = property.escalationPeriod || 'months';
    if (escalationPeriod === 'days') {
        escalationDays = 1; // This would need a separate field for number of days
    } else if (escalationPeriod === 'months') {
        escalationDays = 30; // Approximate days per month
    } else if (escalationPeriod === 'years') {
        escalationDays = 365; // Days per year
    }
    
    // If no escalation, return base rent
    if (escalationPercentage === 0) {
        return baseRent;
    }
    
    const currentDate = new Date(paymentDate);
    const daysSinceStart = Math.floor((currentDate - agreementStartDate) / (1000 * 60 * 60 * 24));
    
    // Calculate how many escalation cycles have passed
    const escalationCycles = Math.floor(daysSinceStart / escalationDays);
    
    if (escalationCycles === 0) {
        return baseRent; // No escalation yet
    }
    
    // Calculate the new rate after escalations
    const escalatedRate = baseRent * Math.pow(1 + escalationPercentage, escalationCycles);
    
    // Calculate the next escalation date
    const nextEscalationDate = new Date(agreementStartDate);
    nextEscalationDate.setDate(nextEscalationDate.getDate() + (escalationCycles * escalationDays));
    
    // Calculate the previous escalation date
    const previousEscalationDate = new Date(agreementStartDate);
    previousEscalationDate.setDate(previousEscalationDate.getDate() + ((escalationCycles - 1) * escalationDays));
    
    // Check if escalation happens during this payment month
    const paymentStartDate = new Date(paymentDate);
    const paymentEndDate = new Date(paymentDate);
    paymentEndDate.setMonth(paymentEndDate.getMonth() + 1);
    
    if (nextEscalationDate >= paymentStartDate && nextEscalationDate < paymentEndDate) {
        // Pro-rated calculation needed
        const daysInMonth = Math.floor((paymentEndDate - paymentStartDate) / (1000 * 60 * 60 * 24));
        const daysAtOldRate = Math.floor((nextEscalationDate - paymentStartDate) / (1000 * 60 * 60 * 24));
        const daysAtNewRate = daysInMonth - daysAtOldRate;
        
        const oldRate = baseRent * Math.pow(1 + escalationPercentage, escalationCycles - 1);
        const newRate = escalatedRate;
        
        const oldRateAmount = (daysAtOldRate / daysInMonth) * oldRate;
        const newRateAmount = (daysAtNewRate / daysInMonth) * newRate;
        
        return Math.round(oldRateAmount + newRateAmount);
    }
    
    // No pro-rata needed, use the escalated rate
    return Math.round(escalatedRate);
}

function calculateRentPerSqft() {
    const carpetAreaInput = document.querySelector('[name="carpetArea"]');
    const rentAmountInput = document.querySelector('[name="rentAmount"]');
    const rentPerSqftInput = document.getElementById('rentPerSqft');
    
    if (!carpetAreaInput || !rentAmountInput || !rentPerSqftInput) return;
    
    const carpetArea = carpetAreaInput.value;
    const rentAmount = rentAmountInput.value;
    
    if (carpetArea && rentAmount) {
        // Extract numeric value from carpet area (e.g., "850 sqft" -> 850)
        const carpetAreaNumber = parseFloat(carpetArea.replace(/[^\d.]/g, ''));
        const rentAmountNumber = parseFloat(rentAmount);
        
        if (carpetAreaNumber > 0 && rentAmountNumber > 0) {
            const rentPerSqft = rentAmountNumber / carpetAreaNumber;
            rentPerSqftInput.value = rentPerSqft.toFixed(2);
        } else {
            rentPerSqftInput.value = '';
        }
    } else {
        rentPerSqftInput.value = '';
    }
}

function setupBillsSection(existingBills = null) {
    billsSection.innerHTML = '';
    
    billTypes.forEach(bill => {
        const billItem = document.createElement('div');
        billItem.className = 'bill-item';
        
        const existingBill = existingBills && existingBills[bill.key];
        const isChecked = existingBill ? existingBill.checked : false;
        
        billItem.innerHTML = `
            <div class="bill-header">
                <label>
                    <input type="checkbox" id="bill-${bill.key}" ${isChecked ? 'checked' : ''}>
                    ${bill.name}
                </label>
            </div>
            <div class="bill-details ${isChecked ? '' : 'hidden'}">
                <div class="form-group">
                    <label class="form-label">Bill No.</label>
                    <input type="text" class="form-control" name="bill-${bill.key}-no" 
                           value="${existingBill ? existingBill.billNo || '' : ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">Days to Track</label>
                    <input type="number" class="form-control" name="bill-${bill.key}-tracking-day" 
                           placeholder="Enter days" min="1" max="365"
                           value="${existingBill ? existingBill.trackingDay || '' : ''}">
                </div>
            </div>
        `;
        
        billsSection.appendChild(billItem);
        
        // Add event listener for checkbox
        const checkbox = billItem.querySelector(`#bill-${bill.key}`);
        const details = billItem.querySelector('.bill-details');
        
        checkbox.addEventListener('change', () => {
            details.classList.toggle('hidden', !checkbox.checked);
        });
    });
}

function addCustomBill(existingBill = null) {
    const customBillItem = document.createElement('div');
    customBillItem.className = 'custom-bill-item';
    
    customBillItem.innerHTML = `
        <div class="custom-bill-header">
            <h5>Custom Bill</h5>
            <button type="button" class="remove-bill-btn">Remove</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Bill Name</label>
                <input type="text" class="form-control" name="custom-bill-name" 
                       value="${existingBill ? existingBill.name || '' : ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Bill No.</label>
                <input type="text" class="form-control" name="custom-bill-no"
                       value="${existingBill ? existingBill.billNo || '' : ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Due in</label>
                <div class="form-row">
                    <div class="form-group" style="flex: 1; margin-right: 10px;">
                        <input type="number" class="form-control" name="custom-bill-value" 
                               placeholder="Enter number" min="1" max="999"
                               value="${existingBill ? existingBill.dueValue || '' : ''}">
                    </div>
                    <div class="form-group" style="flex: 1;">
                        <select class="form-control" name="custom-bill-period">
                            <option value="days" ${existingBill && existingBill.period === 'days' ? 'selected' : ''}>Days</option>
                            <option value="months" ${existingBill && existingBill.period === 'months' ? 'selected' : ''}>Months</option>
                            <option value="years" ${existingBill && existingBill.period === 'years' ? 'selected' : ''}>Years</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Days to Track</label>
                <input type="number" class="form-control" name="custom-bill-tracking-day" 
                       placeholder="Enter days" min="1" max="365"
                       value="${existingBill ? existingBill.trackingDay || '' : ''}">
            </div>
        </div>
    `;
    
    customBillsList.appendChild(customBillItem);
    
    // Add remove functionality
    const removeBtn = customBillItem.querySelector('.remove-bill-btn');
    removeBtn.addEventListener('click', () => {
        customBillItem.remove();
    });
}

function addDocument() {
    const files = documentInput.files;
    if (files.length === 0) {
        showNotification('Please select files to upload', 'warning');
        return;
    }
    
    // Get current property
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property) {
        showNotification('No property selected', 'error');
        return;
    }
    
    // Initialize documents array if it doesn't exist
    if (!property.documents) {
        property.documents = [];
    }
    
    Array.from(files).forEach(file => {
        const currentDate = new Date().toISOString().split('T')[0];
        
        // Create document object
        const document = {
            name: file.name,
            uploadDate: currentDate,
            size: file.size,
            type: file.type
        };
        
        // Add to property documents
        property.documents.push(document);
        
        // Create DOM element
        const documentItem = document.createElement('div');
        documentItem.className = 'document-item';
        
        documentItem.innerHTML = `
            <div class="document-info">
                <div class="document-name">${file.name}</div>
                <div class="document-date">Uploaded: ${currentDate}</div>
            </div>
            <button type="button" class="btn btn--sm btn--outline remove-doc-btn">Remove</button>
        `;
        
        documentList.appendChild(documentItem);
        
        // Add remove functionality
        const removeBtn = documentItem.querySelector('.remove-doc-btn');
        removeBtn.addEventListener('click', () => {
            // Remove from property documents
            const docIndex = property.documents.findIndex(doc => doc.name === file.name && doc.uploadDate === currentDate);
            if (docIndex > -1) {
                property.documents.splice(docIndex, 1);
            }
            documentItem.remove();
        });
    });
    
    // Clear file input
    documentInput.value = '';
    showNotification(`${files.length} document(s) added`);
}

function renderDocuments() {
    documentList.innerHTML = '';
    
    if (currentPropertyId) {
        const property = properties.find(p => p.id === currentPropertyId);
        if (property && property.documents) {
            property.documents.forEach(doc => {
                const documentItem = document.createElement('div');
                documentItem.className = 'document-item';
                
                documentItem.innerHTML = `
                    <div class="document-info">
                        <div class="document-name">${doc.name}</div>
                        <div class="document-date">Uploaded: ${doc.uploadDate}</div>
                    </div>
                    <button type="button" class="btn btn--sm btn--outline remove-doc-btn">Remove</button>
                `;
                
                documentList.appendChild(documentItem);
                
                // Add remove functionality
                const removeBtn = documentItem.querySelector('.remove-doc-btn');
                removeBtn.addEventListener('click', () => {
                    // Remove from property documents
                    const docIndex = property.documents.findIndex(d => d.name === doc.name && d.uploadDate === doc.uploadDate);
                    if (docIndex > -1) {
                        property.documents.splice(docIndex, 1);
                    }
                    documentItem.remove();
                });
            });
        }
    }
}

function generateInvoice() {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.paymentHistory) return;

    const paidPayments = property.paymentHistory.filter(p => p.status === 'Paid');
    if (paidPayments.length === 0) {
        showNotification('No paid payments to generate invoice', 'warning');
        return;
    }

    const latestPayment = paidPayments[paidPayments.length - 1];
    
    // Create invoice window
    const invoiceWindow = window.open('', '_blank', 'width=800,height=600');
    
    const invoiceHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice - ${property.name}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 2px solid #1e3a8a; padding-bottom: 15px; }
                .company-info h1 { color: #1e3a8a; margin: 0; }
                .invoice-details { text-align: right; }
                .invoice-number { font-size: 24px; font-weight: bold; color: #1e3a8a; }
                .property-details, .payment-details { margin: 20px 0; }
                .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .details-table th, .details-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                .details-table th { background-color: #1e3a8a; color: white; }
                .total-row { font-weight: bold; background-color: #f5f5f5; }
                .footer { margin-top: 40px; text-align: center; color: #666; }
            </style>
        </head>
        <body>
            <div class="invoice-header">
                <div class="company-info">
                    <h1>Balar Builders</h1>
                    <p>Business Address, City, State</p>
                    <p>GST No: 27XXXXX1234X1Z5</p>
                </div>
                <div class="invoice-details">
                    <div class="invoice-number">INV-${String(latestPayment.id).padStart(4, '0')}</div>
                    <p>Date: ${formatDate(latestPayment.paymentDate || latestPayment.date)}</p>
                </div>
            </div>
            
            <div class="property-details">
                <h3>Property Details</h3>
                <p><strong>Property:</strong> ${property.name}</p>
                <p><strong>Address:</strong> ${property.address}</p>
                <p><strong>Type:</strong> ${property.type}</p>
                ${property.lesseeName ? `<p><strong>Lessee:</strong> ${property.lesseeName}</p>` : ''}
            </div>
            
            <div class="payment-details">
                <h3>Payment Details</h3>
                <table class="details-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Period</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Monthly Rent</td>
                            <td>${formatDate(latestPayment.date)}</td>
                            <td>₹${latestPayment.base.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>GST (18%)</td>
                            <td>-</td>
                            <td>₹${latestPayment.gst.toLocaleString()}</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="2"><strong>Total Amount</strong></td>
                            <td><strong>₹${latestPayment.total.toLocaleString()}</strong></td>
                        </tr>
                    </tbody>
                </table>
                
                <p><strong>Payment Mode:</strong> ${latestPayment.paymentMode}</p>
                <p><strong>Receipt No:</strong> ${latestPayment.receiptNo}</p>
                <p><strong>Payment Date:</strong> ${formatDate(latestPayment.paymentDate)}</p>
            </div>
            
            <div class="footer">
                <p>Thank you for your payment!</p>
                <p>This is a computer generated invoice.</p>
            </div>
        </body>
        </html>
    `;
    
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
    
    showNotification('Invoice generated successfully');
}

// New functions for payment dropdown functionality
function togglePaymentDropdown(paymentId) {
    // Hide all other dropdowns first
    document.querySelectorAll('.payment-dropdown').forEach(dropdown => {
        if (dropdown.id !== `dropdown-${paymentId}`) {
            dropdown.classList.add('hidden');
        }
    });
    
    // Toggle current dropdown
    const dropdown = document.getElementById(`dropdown-${paymentId}`);
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

function hidePaymentDropdown(paymentId) {
    const dropdown = document.getElementById(`dropdown-${paymentId}`);
    if (dropdown) {
        dropdown.classList.add('hidden');
    }
}

function generatePaymentInvoice(paymentId) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property) return;
    
    let payment = null;
    let baseAmount = 0;
    let gstAmount = 0;
    let totalAmount = 0;
    let dueDate = '';
    
    // Check if it's an existing payment history record
    if (property.paymentHistory) {
        payment = property.paymentHistory.find(p => p.id == paymentId);
        if (payment) {
            // Recalculate GST amounts using current GST settings
            if (property.gstIncludedInRent) {
                // GST is included in total, calculate base amount
                const gstPercentage = parseFloat(property.gstPercentage || 18) / 100;
                baseAmount = Math.round(payment.total / (1 + gstPercentage));
                gstAmount = payment.total - baseAmount;
                totalAmount = payment.total;
            } else {
                // GST is not included - no GST at all
                baseAmount = payment.base;
                gstAmount = 0;
                totalAmount = payment.base;
            }
            
            dueDate = payment.dueDate;
        }
    }
    
    // If not found in payment history, check if it's a schedule payment
    if (!payment && paymentId.startsWith('schedule-')) {
        const scheduleIndex = parseInt(paymentId.replace('schedule-', ''));
        const schedule = generatePaymentSchedule(property);
        if (schedule[scheduleIndex]) {
            const schedulePayment = schedule[scheduleIndex];
            const rentAmount = schedulePayment.amount;
            
            // Calculate GST and total based on whether GST is included in rent
            if (property.gstIncludedInRent) {
                // GST is included in rent amount, so calculate base amount
                const gstPercentage = parseFloat(property.gstPercentage || 18) / 100;
                baseAmount = Math.round(rentAmount / (1 + gstPercentage)); // Remove GST from total
                gstAmount = rentAmount - baseAmount;
                totalAmount = rentAmount;
            } else {
                // GST is not included - no GST at all
                baseAmount = rentAmount;
                gstAmount = 0;
                totalAmount = rentAmount;
            }
            
            dueDate = schedulePayment.dueDate;
        }
    }
    
    if (baseAmount === 0) return;
    
    // Create invoice for specific payment (even if not paid yet - this could be for pending payments)
    const invoiceWindow = window.open('', '_blank', 'width=600,height=700');
    
    // Function to convert number to words (Indian format)
    function numberToWords(amount) {
        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        
        function convertHundreds(num) {
            let result = '';
            if (num > 99) {
                result += ones[Math.floor(num / 100)] + ' Hundred ';
                num %= 100;
            }
            if (num > 19) {
                result += tens[Math.floor(num / 10)] + ' ';
                num %= 10;
            } else if (num > 9) {
                result += teens[num - 10] + ' ';
                return result;
            }
            if (num > 0) {
                result += ones[num] + ' ';
            }
            return result;
        }
        
        if (amount === 0) return 'Zero';
        
        let result = '';
        let crores = Math.floor(amount / 10000000);
        let lakhs = Math.floor((amount % 10000000) / 100000);
        let thousands = Math.floor((amount % 100000) / 1000);
        let hundreds = amount % 1000;
        
        if (crores > 0) result += convertHundreds(crores) + 'Crore ';
        if (lakhs > 0) result += convertHundreds(lakhs) + 'Lakh ';
        if (thousands > 0) result += convertHundreds(thousands) + 'Thousand ';
        if (hundreds > 0) result += convertHundreds(hundreds);
        
        return result.trim() + ' Only';
    }

    const amountInWords = numberToWords(Math.floor(totalAmount));
    
    const invoiceHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice - ${property.name}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 0; 
                    padding: 20px;
                    font-size: 12px;
                    line-height: 1.4;
                }
                .header-section {
                    text-align: center;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #000;
                }
                .company-name {
                    font-size: 20px;
                    font-weight: bold;
                    margin: 0 0 5px 0;
                    text-transform: uppercase;
                    color: #000;
                    letter-spacing: 1px;
                }
                .company-address {
                    margin: 5px 0;
                    font-size: 11px;
                }
                .gstin-pan {
                    margin: 2px 0;
                    font-size: 10px;
                }
                .invoice-header {
                    display: flex;
                    justify-content: space-between;
                    margin: 20px 0;
                }
                .invoice-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #000;
                    letter-spacing: 1px;
                }
                .invoice-details {
                    text-align: right;
                    font-size: 11px;
                }
                .billing-section {
                    margin: 20px 0;
                }
                .billing-to {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .details-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    border: 1px solid #000;
                }
                .details-table th {
                    background-color: #f0f0f0;
                    padding: 8px;
                    text-align: center;
                    font-weight: bold;
                    border: 1px solid #000;
                    font-size: 11px;
                }
                .details-table td {
                    padding: 8px;
                    border: 1px solid #000;
                    font-size: 11px;
                }
                .amount-col {
                    text-align: right;
                    width: 100px;
                }
                .total-row {
                    font-weight: bold;
                    background-color: #f5f5f5;
                }
                .amount-words {
                    margin: 15px 0;
                    font-weight: bold;
                    border: 1px solid #000;
                    padding: 8px;
                    background-color: #f9f9f9;
                }
                .terms-section {
                    margin: 20px 0;
                    font-size: 10px;
                    border: 1px solid #000;
                    padding: 10px;
                }
                .terms-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                    text-decoration: underline;
                }
                .signature-section {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 40px;
                    padding-top: 20px;
                }
                .signature-box {
                    text-align: center;
                    width: 30%;
                }
                .signature-line {
                    border-top: 1px solid #000;
                    margin-top: 40px;
                    padding-top: 5px;
                    font-size: 11px;
                }
                .status-badge { 
                    padding: 4px 8px; 
                    border-radius: 4px; 
                    font-size: 12px; 
                    font-weight: bold; 
                    display: inline-block;
                    margin: 5px 0;
                }
                .status-pending { background-color: #fff3cd; color: #856404; }
                .status-paid { background-color: #d4edda; color: #155724; }
            </style>
        </head>
        <body>
            <div style="text-align: left; font-size: 10px; margin-bottom: 10px; color: #666;">
                Subject to SURAT Jurisdiction
            </div>
            
            <div class="header-section">
                <div class="company-name">${property.lessorName || 'LESSOR NAME'}</div>
                <div class="company-address">${property.lessorAddress || 'Lessor Address'}</div>
                <div class="gstin-pan">GSTIN: ${property.gstin || 'N/A'}</div>
                <div class="gstin-pan">PAN No.: ${property.panNo || 'N/A'}</div>
                <div class="gstin-pan">Reverse Charge: Y/N</div>
            </div>

            <div class="invoice-header">
                <div class="billing-section">
                    <div class="billing-to">To,</div>
                    <div><strong style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #000; font-weight: bold;">${property.lesseeName || 'TENANT NAME'}</strong></div>
                    <div>${property.name}</div>
                    <div>${property.address}</div>
                    ${property.officerNo ? `<div>Office No: ${property.officerNo}</div>` : ''}
                    ${property.lesseeGstin ? `<div>GSTIN: ${property.lesseeGstin}</div>` : ''}
                    ${property.lesseePan ? `<div>PAN No.: ${property.lesseePan}</div>` : ''}
                </div>
                <div class="invoice-details">
                    <div class="invoice-title">INVOICE</div>
                    <div>Invoice No. : ${payment && payment.invoiceNo ? payment.invoiceNo : nextInvoiceId}</div>
                    <div>Date : ${getCurrentDate()}</div>
                    ${payment ? `<div>Status: <span class="status-badge status-${payment.status.toLowerCase()}">${payment.status}</span></div>` : `<div>Status: <span class="status-badge status-pending">Pending</span></div>`}
                </div>
            </div>
            
                <table class="details-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>GST %</th>
                        <th>Rs.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>RENT INCOME<br/>${property.officerNo ? property.officerNo + ', ' : ''}${property.projectName || property.name} [${formatDate(dueDate).split('/')[1]}, ${formatDate(dueDate).split('/')[2]}]</td>
                        <td style="text-align: center;">1</td>
                        <td style="text-align: center;">Month</td>
                        <td class="amount-col">₹${baseAmount.toLocaleString()}</td>
                        <td style="text-align: center;">${gstAmount > 0 ? '18.00' : '0.00'}</td>
                        <td class="amount-col">₹${totalAmount.toLocaleString()}</td>
                               </tr>
                        <tr class="total-row">
                        <td colspan="5" style="text-align: right;"><strong>TOTAL Rs.</strong></td>
                        <td class="amount-col"><strong>₹${totalAmount.toLocaleString()}</strong></td>
                        </tr>
                    </tbody>
                </table>

            <div class="amount-words">
                <strong>Rupees:</strong> ${amountInWords}
            </div>
                
                ${payment && payment.status === 'Paid' ? `
                <div style="margin: 15px 0; padding: 10px; border: 1px solid #d4edda; background-color: #d4edda; color: #155724;">
                    <strong>Payment Information:</strong><br/>
                    Payment Mode: ${payment.paymentMode || 'N/A'}<br/>
                    Receipt No: ${payment.receiptNo || 'N/A'}<br/>
                    Payment Date: ${payment.paymentDate ? formatDate(payment.paymentDate) : 'N/A'}
                </div>
            ` : `
                <div style="margin: 15px 0; padding: 10px; border: 1px solid #fff3cd; background-color: #fff3cd; color: #856404;">
                    <strong>Payment Due:</strong> ${formatDate(dueDate)}<br/>
                    Please make payment by the due date.
                </div>
            `}

            <div class="terms-section">
                <div class="terms-title">TERMS (-)</div>
                <div>1. We reserve the right of recovery before due date at any time.</div>
                <div>2. The sale is understood to have been made after due consideration of the quality of goods and prevailing rates.</div>
                <div>3. Report shall have to be presented within 24 hours of delivery, where after no complaints or any change in quality or shortage in quantity shall be considered for goods already under process.</div>
                <div>4. The goods are despatched at buyers risk.</div>
                <div>5. The payment of this bill shall be made by the due date failing which interest @ the rate of 1.5% p.m. shall be charged from the due date.</div>
            </div>
            
            <div class="signature-section">
                <div class="signature-box">
                    <div class="signature-line"><strong style="color: #000; font-weight: bold;">Received</strong></div>
                </div>
                <div class="signature-box">
                    <div class="signature-line"><strong style="color: #000; font-weight: bold;">Prepared by</strong></div>
                </div>
                <div class="signature-box">
                    <div class="signature-line"><strong style="color: #000; font-weight: bold;">For ${property.lessorName || 'LESSOR NAME'}</strong><br/><br/><br/><strong style="color: #000; font-weight: bold;">Authorised Signatory</strong></div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 20px; font-size: 10px; color: #666;">
                This is a computer generated invoice.
            </div>
        </body>
        </html>
    `;
    
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
    
    showNotification('Invoice generated successfully');
}

function viewPaymentReceipt(paymentId) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.paymentHistory) {
        showNotification('No payment history found', 'error');
        return;
    }
    
    const payment = property.paymentHistory.find(p => p.id == paymentId);
    if (!payment) {
        console.log('Payment not found. PaymentId:', paymentId, 'Available payments:', property.paymentHistory);
        showNotification('Payment not found', 'error');
        return;
    }
    
    console.log('Found payment:', payment);
    
    // Check if payment is paid (handle different status field names)
    const isPaid = payment.status === 'Paid' || payment.paid === true || payment.paymentDate;
    if (!isPaid) {
        showNotification('Payment is not completed yet', 'error');
        return;
    }
    
    // Create receipt window
    const receiptWindow = window.open('', '_blank', 'width=600,height=700');
    
    if (!receiptWindow) {
        showNotification('Unable to open receipt window. Please check popup blockers.', 'error');
        return;
    }
    
    // Function to convert number to words (Indian format)
    function numberToWords(amount) {
        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        
        function convertHundreds(num) {
            let result = '';
            if (num > 99) {
                result += ones[Math.floor(num / 100)] + ' Hundred ';
                num %= 100;
            }
            if (num > 19) {
                result += tens[Math.floor(num / 10)] + ' ';
                num %= 10;
            } else if (num > 9) {
                result += teens[num - 10] + ' ';
                return result;
            }
            if (num > 0) {
                result += ones[num] + ' ';
            }
            return result;
        }
        
        if (amount === 0) return 'Zero';
        
        let result = '';
        let crores = Math.floor(amount / 10000000);
        let lakhs = Math.floor((amount % 10000000) / 100000);
        let thousands = Math.floor((amount % 100000) / 1000);
        let hundreds = amount % 1000;
        
        if (crores > 0) result += convertHundreds(crores) + 'Crore ';
        if (lakhs > 0) result += convertHundreds(lakhs) + 'Lakh ';
        if (thousands > 0) result += convertHundreds(thousands) + 'Thousand ';
        if (hundreds > 0) result += convertHundreds(hundreds);
        
        return result.trim() + ' Only';
    }

    const totalAmount = payment.total || payment.amount || 0;
    const amountInWords = numberToWords(Math.floor(totalAmount));
    
    const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt - ${property.name}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 0; 
                    padding: 20px;
                    font-size: 12px;
                    line-height: 1.4;
                }
                .header-section {
                    text-align: center;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #000;
                }
                .company-name {
                    font-size: 20px;
                    font-weight: bold;
                    margin: 0 0 5px 0;
                    text-transform: uppercase;
                    color: #000;
                    letter-spacing: 1px;
                }
                .company-address {
                    margin: 5px 0;
                    font-size: 11px;
                }
                .gstin-pan {
                    margin: 2px 0;
                    font-size: 10px;
                }
                .invoice-header {
                    display: flex;
                    justify-content: space-between;
                    margin: 20px 0;
                }
                .invoice-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #000;
                    letter-spacing: 1px;
                }
                .invoice-details {
                    text-align: right;
                    font-size: 11px;
                }
                .billing-section {
                    margin: 20px 0;
                }
                .billing-to {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .details-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    border: 1px solid #000;
                }
                .details-table th {
                    background-color: #f0f0f0;
                    padding: 8px;
                    text-align: center;
                    font-weight: bold;
                    border: 1px solid #000;
                    font-size: 11px;
                }
                .details-table td {
                    padding: 8px;
                    border: 1px solid #000;
                    font-size: 11px;
                }
                .amount-col {
                    text-align: right;
                    width: 100px;
                }
                .total-row {
                    font-weight: bold;
                    background-color: #f5f5f5;
                }
                .amount-words {
                    margin: 15px 0;
                    font-weight: bold;
                    border: 1px solid #000;
                    padding: 8px;
                    background-color: #f9f9f9;
                }
                .terms-section {
                    margin: 20px 0;
                    font-size: 10px;
                    border: 1px solid #000;
                    padding: 10px;
                }
                .terms-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                    text-decoration: underline;
                }
                .signature-section {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 40px;
                    padding-top: 20px;
                }
                .signature-box {
                    text-align: center;
                    width: 30%;
                }
                .signature-line {
                    border-top: 1px solid #000;
                    margin-top: 40px;
                    padding-top: 5px;
                    font-size: 11px;
                }
            </style>
        </head>
        <body>
            <div style="text-align: left; font-size: 10px; margin-bottom: 10px; color: #666;">
                Subject to SURAT Jurisdiction
                </div>
            
            <div class="header-section">
                <div class="company-name">${property.lessorName || 'LESSOR NAME'}</div>
                <div class="company-address">${property.lessorAddress || 'Lessor Address'}</div>
                <div class="gstin-pan">GSTIN: ${property.gstin || 'N/A'}</div>
                <div class="gstin-pan">PAN No.: ${property.panNo || 'N/A'}</div>
                <div class="gstin-pan">Reverse Charge: Y/N</div>
            </div>
            
            <div class="invoice-header">
                <div class="billing-section">
                    <div class="billing-to">To,</div>
                    <div><strong style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #000; font-weight: bold;">${property.lesseeName || 'TENANT NAME'}</strong></div>
                    <div>${property.name}</div>
                    <div>${property.address}</div>
                    ${property.officerNo ? `<div>Office No: ${property.officerNo}</div>` : ''}
                    ${property.lesseeGstin ? `<div>GSTIN: ${property.lesseeGstin}</div>` : ''}
                    ${property.lesseePan ? `<div>PAN No.: ${property.lesseePan}</div>` : ''}
                </div>
                <div class="invoice-details">
                    <div class="invoice-title">INVOICE</div>
                    <div>Invoice No. : ${payment.invoiceNo || nextInvoiceId}</div>
                    <div>Date : ${formatDate(payment.paymentDate || payment.date || new Date())}</div>
                </div>
            </div>
                
                <table class="details-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>GST %</th>
                        <th>Rs.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>RENT INCOME<br/>${property.officerNo ? property.officerNo + ', ' : ''}${property.projectName || property.name} [${formatDate(payment.date || payment.dueDate || new Date()).split('/')[1]}, ${formatDate(payment.date || payment.dueDate || new Date()).split('/')[2]}]</td>
                        <td style="text-align: center;">1</td>
                        <td style="text-align: center;">Month</td>
                        <td class="amount-col">₹${(payment.base || payment.amount || 0).toLocaleString()}</td>
                        <td style="text-align: center;">${payment.gst > 0 ? '18.00' : '0.00'}</td>
                        <td class="amount-col">₹${(payment.total || payment.amount || 0).toLocaleString()}</td>
                        </tr>
                        <tr class="total-row">
                        <td colspan="5" style="text-align: right;"><strong>TOTAL Rs.</strong></td>
                        <td class="amount-col"><strong>₹${(payment.total || payment.amount || 0).toLocaleString()}</strong></td>
                        </tr>
                    </tbody>
                </table>
                
            <div class="amount-words">
                <strong>Rupees:</strong> ${amountInWords}
            </div>
            
            <div class="terms-section">
                <div class="terms-title">TERMS (-)</div>
                <div>1. We reserve the right of recovery before due date at any time.</div>
                <div>2. The sale is understood to have been made after due consideration of the quality of goods and prevailing rates.</div>
                <div>3. Report shall have to be presented within 24 hours of delivery, where after no complaints or any change in quality or shortage in quantity shall be considered for goods already under process.</div>
                <div>4. The goods are despatched at buyers risk.</div>
                <div>5. The payment of this bill shall be made by the due date failing which interest @ the rate of 1.5% p.m. shall be charged from the due date.</div>
            </div>

            <div class="signature-section">
                <div class="signature-box">
                    <div class="signature-line"><strong style="color: #000; font-weight: bold;">Received</strong></div>
                </div>
                <div class="signature-box">
                    <div class="signature-line"><strong style="color: #000; font-weight: bold;">Prepared by</strong></div>
                </div>
                <div class="signature-box">
                    <div class="signature-line"><strong style="color: #000; font-weight: bold;">For ${property.lessorName || 'LESSOR NAME'}</strong><br/><br/><br/><strong style="color: #000; font-weight: bold;">Authorised Signatory</strong></div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 20px; font-size: 10px; color: #666;">
                This is a computer generated receipt.
            </div>
        </body>
        </html>
    `;
    
    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
    
    showNotification('Receipt generated successfully');
}

// Bill dropdown functions
function toggleBillDropdown(billKey) {
    // Hide all other bill dropdowns first
    document.querySelectorAll('.payment-dropdown').forEach(dropdown => {
        if (dropdown.id !== `bill-dropdown-${billKey}`) {
            dropdown.classList.add('hidden');
        }
    });
    
    // Toggle current dropdown
    const dropdown = document.getElementById(`bill-dropdown-${billKey}`);
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

function hideBillDropdown(billKey) {
    const dropdown = document.getElementById(`bill-dropdown-${billKey}`);
    if (dropdown) {
        dropdown.classList.add('hidden');
    }
}


function showBillReceipt(billKey, billData, billName, property) {
    // Create a receipt modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content receipt-modal">
            <div class="modal-header">
                <h3>Payment Receipt</h3>
                <button class="btn btn--outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
            <div class="modal-body">
                <div class="receipt-content">
                    <div class="receipt-header">
                        <h2>PAYMENT RECEIPT</h2>
                        <p class="receipt-date">Date: ${formatDate(billData.paidDate)}</p>
                    </div>
                    
                    <div class="receipt-details">
                        <div class="receipt-section">
                            <h4>Property Information</h4>
                            <p><strong>Property:</strong> ${property.name}</p>
                            <p><strong>Address:</strong> ${property.address}</p>
                            <p><strong>Project:</strong> ${property.projectName || 'N/A'}</p>
                        </div>
                        
                        <div class="receipt-section">
                            <h4>Bill Information</h4>
                            <p><strong>Bill Type:</strong> ${billName}</p>
                            <p><strong>Bill Number:</strong> ${billData.billNo || 'N/A'}</p>
                            <p><strong>Due Date:</strong> ${billData.dueDate ? formatDate(billData.dueDate) : 'Not set'}</p>
                            <p><strong>Period:</strong> ${billData.period || 'monthly'}</p>
                        </div>
                        
                        <div class="receipt-section">
                            <h4>Payment Information</h4>
                            <p><strong>Payment Date:</strong> ${formatDate(billData.paidDate)}</p>
                            <p><strong>Payment Mode:</strong> ${billData.paymentMode || 'Cash'}</p>
                            <p><strong>Receipt Number:</strong> ${billData.receiptNo || 'N/A'}</p>
                            <p><strong>Status:</strong> <span class="status-paid">✓ PAID</span></p>
                        </div>
                        
                        <div class="receipt-section">
                            <h4>Amount Details</h4>
                            <div class="amount-breakdown">
                                <div class="amount-row">
                                    <span>Bill Amount:</span>
                                    <span>₹${(billData.amount || 0).toLocaleString()}</span>
                                </div>
                                <div class="amount-row total">
                                    <span><strong>Total Paid:</strong></span>
                                    <span><strong>₹${(billData.amount || 0).toLocaleString()}</strong></span>
                                </div>
                            </div>
                        </div>
                        
                        ${billData.notes ? `
                        <div class="receipt-section">
                            <h4>Notes</h4>
                            <p>${billData.notes}</p>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="receipt-footer">
                        <p class="receipt-thank-you">Thank you for your payment!</p>
                        <p class="receipt-print">Print this receipt for your records</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}


function receiveBillPayment(billKey) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return;
    
    let billData;
    let billName;
    
    if (billKey.startsWith('custom-')) {
        const index = parseInt(billKey.replace('custom-', ''));
        billData = property.bills.customBills[index];
        billName = billData.name;
    } else {
        billData = property.bills[billKey];
        const billType = billTypes.find(b => b.key === billKey);
        billName = billType ? billType.name : billKey;
    }
    
    if (!billData) return;
    
    // Show enhanced receive payment dialog
    showReceivePaymentDialog(billKey, billName, billData);
}

function showReceivePaymentDialog(billKey, billName, billData) {
    const currentAmount = billData.amount ? billData.amount : '';
    const currentRemarks = billData.notes || '';
    
    const dialogHTML = `
        <div class="modal-overlay" id="receive-payment-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Receive Payment - ${billName}</h3>
                    <button class="modal-close" onclick="closeReceivePaymentDialog()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Payment Amount *</label>
                        <input type="number" class="form-control" id="payment-amount" 
                               placeholder="Enter amount" min="0" step="0.01" 
                               value="${currentAmount}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Remarks</label>
                        <textarea class="form-control" id="payment-remarks" 
                                  placeholder="Enter remarks (optional)" rows="3">${currentRemarks}</textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Attach Document</label>
                        <input type="file" class="form-control" id="payment-document" 
                               accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" multiple>
                        <small class="form-text">Upload receipt or related documents</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn--outline" onclick="closeReceivePaymentDialog()">Cancel</button>
                    <button class="btn btn--success" onclick="processReceivePayment('${billKey}')">Receive Payment</button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('receive-payment-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', dialogHTML);
    
    // Focus on amount input
    setTimeout(() => {
        document.getElementById('payment-amount').focus();
    }, 100);
}

function closeReceivePaymentDialog() {
    const modal = document.getElementById('receive-payment-modal');
    if (modal) {
        modal.remove();
    }
}

function processReceivePayment(billKey) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return;
    
    let billData;
    let billName;
    
    if (billKey.startsWith('custom-')) {
        const index = parseInt(billKey.replace('custom-', ''));
        billData = property.bills.customBills[index];
        billName = billData.name;
    } else {
        billData = property.bills[billKey];
        const billType = billTypes.find(b => b.key === billKey);
        billName = billType ? billType.name : billKey;
    }
    
    if (!billData) return;
    
    // Get form values
    const amountInput = document.getElementById('payment-amount');
    const remarksInput = document.getElementById('payment-remarks');
    const documentInput = document.getElementById('payment-document');
    
    const amount = amountInput.value.trim();
    const remarks = remarksInput.value.trim();
    const files = documentInput.files;
    
    // Validate amount
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        showNotification('Please enter a valid amount', 'error');
        amountInput.focus();
        return;
    }
    
    const paymentAmount = parseFloat(amount);
    
    // Process payment
    billData.paid = true;
    billData.paidDate = new Date().toISOString().split('T')[0];
    billData.paymentMode = billData.paymentMode || 'Cash';
    billData.receiptNo = billData.receiptNo || `RCP-${Date.now()}`;
    billData.amount = paymentAmount;
    billData.notes = remarks || 'Payment received';
    
    // Generate next period when payment is made (regardless of early or overdue)
    if (!billKey.startsWith('custom-')) {
        generateNextPeriodOnPayment(property, billKey, billData);
    }
    
    // Handle document upload if files are selected
    if (files && files.length > 0) {
        if (!billData.documents) {
            billData.documents = [];
        }
        
        Array.from(files).forEach(file => {
            const currentDate = new Date().toISOString().split('T')[0];
            const document = {
                name: file.name,
                uploadDate: currentDate,
                size: file.size,
                type: file.type
            };
            billData.documents.push(document);
        });
    }
    
    // Close dialog
    closeReceivePaymentDialog();
    
    // Update the bill section if it's currently open
    updateBillSection(billKey);
    
    // Save data to localStorage
    saveData();
    
    const successText = billData.paid ? 'updated' : 'received';
    showNotification(`Payment of ₹${paymentAmount.toLocaleString()} ${successText} for ${billName}`);
}

function updateBillSection(billKey) {
    const billSection = document.getElementById(`bill-section-${billKey}`);
    if (billSection && !billSection.classList.contains('hidden')) {
        // Recreate the bill section with updated data
        billSection.remove();
        createIndividualBillSection(billKey);
    }
}

function renderBillDocuments(billKey, billData) {
    if (!billData.documents || billData.documents.length === 0) {
        return '<p class="no-documents">No documents uploaded yet.</p>';
    }
    
    return billData.documents.map((doc, index) => `
        <div class="bill-document-item">
            <div class="document-info">
                <span class="document-name">${doc.name}</span>
                <span class="document-date">Uploaded: ${formatDate(doc.uploadDate)}</span>
            </div>
            <div class="document-actions">
                <button class="btn btn--small btn--primary" onclick="viewBillDocument('${billKey}', ${index})">View</button>
                <button class="btn btn--small btn--info" onclick="downloadBillDocument('${billKey}', ${index})">Download</button>
                <button class="btn btn--small btn--danger" onclick="deleteBillDocumentFromView('${billKey}', ${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

function uploadBillDocument(billKey) {
    const fileInput = document.getElementById(`bill-document-${billKey}`);
    const files = fileInput.files;
    
    if (files.length === 0) {
        showNotification('Please select a file to upload', 'error');
        return;
    }
    
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return;
    
    let billData;
    if (property.bills[billKey]) {
        billData = property.bills[billKey];
    } else if (property.bills.customBills) {
        const customBill = property.bills.customBills.find(b => b.id === billKey);
        if (customBill) {
            billData = customBill;
        }
    }
    
    if (!billData) return;
    
    // Initialize documents array if it doesn't exist
    if (!billData.documents) {
        billData.documents = [];
    }
    
    // Process each file
    Array.from(files).forEach(file => {
        const document = {
            name: file.name,
            uploadDate: new Date().toISOString().split('T')[0],
            size: file.size,
            type: file.type
        };
        
        billData.documents.push(document);
    });
    
    // Clear the file input
    fileInput.value = '';
    
    // Update the bill section to show the new documents
    updateBillSection(billKey);
    
    showNotification(`Uploaded ${files.length} document(s) successfully`);
}

function viewBillDocuments(billKey) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return;
    
    let billData;
    if (property.bills[billKey]) {
        billData = property.bills[billKey];
    } else if (property.bills.customBills) {
        const customBill = property.bills.customBills.find(b => b.id === billKey);
        if (customBill) {
            billData = customBill;
        }
    }
    
    if (!billData) return;
    
    const billType = billTypes.find(b => b.key === billKey);
    const billName = billType ? billType.name : billKey;
    
    // Create a modal to show all documents for this bill
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${billName} Documents</h3>
                <button class="btn btn--outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
            <div class="modal-body">
                <div class="bill-documents-list" id="modal-bill-documents-${billKey}">
                    ${renderBillDocuments(billKey, billData)}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function uploadBillDocumentFromModal(billKey) {
    const fileInput = document.getElementById(`modal-bill-document-${billKey}`);
    const files = fileInput.files;
    
    if (files.length === 0) {
        showNotification('Please select a file to upload', 'error');
        return;
    }
    
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return;
    
    let billData;
    if (property.bills[billKey]) {
        billData = property.bills[billKey];
    } else if (property.bills.customBills) {
        const customBill = property.bills.customBills.find(b => b.id === billKey);
        if (customBill) {
            billData = customBill;
        }
    }
    
    if (!billData) return;
    
    // Initialize documents array if it doesn't exist
    if (!billData.documents) {
        billData.documents = [];
    }
    
    // Process each file
    Array.from(files).forEach(file => {
        const document = {
            name: file.name,
            uploadDate: new Date().toISOString().split('T')[0],
            size: file.size,
            type: file.type
        };
        
        billData.documents.push(document);
    });
    
    // Update the documents list display in the modal
    const documentsList = document.getElementById(`modal-bill-documents-${billKey}`);
    if (documentsList) {
        documentsList.innerHTML = renderBillDocuments(billKey, billData);
    }
    
    // Clear the file input
    fileInput.value = '';
    
    // Update the bill section to show the new documents
    updateBillSection(billKey);
    
    showNotification(`Uploaded ${files.length} document(s) successfully`);
}

function viewBillDocument(billKey, documentIndex) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return;
    
    let billData;
    if (property.bills[billKey]) {
        billData = property.bills[billKey];
    } else if (property.bills.customBills) {
        const customBill = property.bills.customBills.find(b => b.id === billKey);
        if (customBill) {
            billData = customBill;
        }
    }
    
    if (!billData || !billData.documents || !billData.documents[documentIndex]) {
        showNotification('Document not found', 'error');
        return;
    }
    
    const document = billData.documents[documentIndex];
    
    // Create a simple document viewer modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${document.name}</h3>
                <button class="btn btn--outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
            <div class="modal-body">
                <div class="document-viewer">
                    <div class="document-info">
                        <p><strong>File Name:</strong> ${document.name}</p>
                        <p><strong>Upload Date:</strong> ${formatDate(document.uploadDate)}</p>
                        <p><strong>File Size:</strong> ${(document.size / 1024).toFixed(2)} KB</p>
                        <p><strong>File Type:</strong> ${document.type}</p>
                    </div>
                    <div class="document-preview">
                        <p class="document-placeholder">
                            📄 Document Preview<br>
                            <small>File: ${document.name}</small><br>
                            <small>Click "Download" to view the actual document</small>
                        </p>
                        <button class="btn btn--primary" onclick="downloadBillDocument('${billKey}', ${documentIndex})">Download</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function downloadBillDocument(billKey, documentIndex) {
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return;
    
    let billData;
    if (property.bills[billKey]) {
        billData = property.bills[billKey];
    } else if (property.bills.customBills) {
        const customBill = property.bills.customBills.find(b => b.id === billKey);
        if (customBill) {
            billData = customBill;
        }
    }
    
    if (!billData || !billData.documents || !billData.documents[documentIndex]) {
        showNotification('Document not found', 'error');
        return;
    }
    
    const document = billData.documents[documentIndex];
    
    // Since we don't have actual file storage, we'll create a simple download
    // In a real application, this would download the actual file
    showNotification('Download functionality would be implemented here. In a real app, this would download the actual file.', 'info');
}

function deleteBillDocument(billKey, documentIndex) {
    if (!confirm('Are you sure you want to delete this document?')) {
        return;
    }
    
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return;
    
    let billData;
    if (property.bills[billKey]) {
        billData = property.bills[billKey];
    } else if (property.bills.customBills) {
        const customBill = property.bills.customBills.find(b => b.id === billKey);
        if (customBill) {
            billData = customBill;
        }
    }
    
    if (!billData || !billData.documents || !billData.documents[documentIndex]) {
        showNotification('Document not found', 'error');
        return;
    }
    
    // Remove the document
    billData.documents.splice(documentIndex, 1);
    
    // Update the documents list display
    const documentsList = document.getElementById(`bill-documents-${billKey}`);
    if (documentsList) {
        documentsList.innerHTML = renderBillDocuments(billKey, billData);
    }
    
    showNotification('Document deleted successfully');
}

function deleteBillDocumentFromView(billKey, documentIndex) {
    if (!confirm('Are you sure you want to delete this document?')) {
        return;
    }
    
    const property = properties.find(p => p.id === currentPropertyId);
    if (!property || !property.bills) return;
    
    let billData;
    if (property.bills[billKey]) {
        billData = property.bills[billKey];
    } else if (property.bills.customBills) {
        const customBill = property.bills.customBills.find(b => b.id === billKey);
        if (customBill) {
            billData = customBill;
        }
    }
    
    if (!billData || !billData.documents || !billData.documents[documentIndex]) {
        showNotification('Document not found', 'error');
        return;
    }
    
    // Remove the document
    billData.documents.splice(documentIndex, 1);
    
    // Update the documents list display in the modal
    const modalDocumentsList = document.getElementById(`modal-bill-documents-${billKey}`);
    if (modalDocumentsList) {
        modalDocumentsList.innerHTML = renderBillDocuments(billKey, billData);
    }
    
    showNotification('Document deleted successfully');
}

function toggleBillDropdown(billKey) {
    // Close all other dropdowns first
    document.querySelectorAll('.bill-dropdown-menu').forEach(menu => {
        if (menu.id !== `bill-dropdown-${billKey}`) {
            menu.style.display = 'none';
        }
    });
    
    // Toggle current dropdown
    const dropdown = document.getElementById(`bill-dropdown-${billKey}`);
    if (dropdown) {
        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.bill-dropdown')) {
        document.querySelectorAll('.bill-dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Global functions for button onclick handlers
window.viewProperty = viewProperty;
window.deleteProperty = deleteProperty;
window.showPaymentDashboard = showPaymentDashboard;
window.openPaymentModal = openPaymentModal;