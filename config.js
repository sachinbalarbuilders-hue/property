// Configuration file for Property Management System
// This file contains configuration settings and constants

// Application Configuration
const APP_CONFIG = {
    name: 'Property Management System',
    version: '1.0.0',
    company: 'Balar Builders',
    
    // Chart Configuration
    charts: {
        defaultColors: {
            primary: '#667eea',
            secondary: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#06b6d4',
            purple: '#8b5cf6',
            pink: '#ec4899',
            indigo: '#6366f1'
        },
        
        // Animation settings
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    },
    
    // Data persistence settings
    storage: {
        key: 'propertyManagementData',
        autoSaveInterval: 30000, // 30 seconds
        changeSaveDelay: 1000    // 1 second after changes
    },
    
    // Form validation settings
    validation: {
        requiredFields: ['name', 'address'],
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedFileTypes: ['.pdf', '.doc', '.docx', '.jpg', '.png']
    }
};

// Property Types Configuration
const PROPERTY_TYPES = [
    { value: 'residential', label: 'Residential', rentPerSqft: 25 },
    { value: 'commercial', label: 'Commercial', rentPerSqft: 50 },
    { value: 'office', label: 'Office', rentPerSqft: 40 },
    { value: 'retail', label: 'Retail', rentPerSqft: 60 },
    { value: 'warehouse', label: 'Warehouse', rentPerSqft: 20 },
    { value: 'industrial', label: 'Industrial', rentPerSqft: 15 }
];

// Agreement Types Configuration
const AGREEMENT_TYPES = [
    { value: 'lease', label: 'Lease Agreement' },
    { value: 'rent', label: 'Rent Agreement' },
    { value: 'license', label: 'License Agreement' },
    { value: 'leave_license', label: 'Leave & License Agreement' }
];

// Bill Types Configuration
const BILL_TYPES = [
    { name: "Property Tax", key: "propertyTax" },
    { name: "Electricity Bill", key: "electricityBill" },
    { name: "Internet Bill", key: "internetBill" },
    { name: "Gas Bill", key: "gasBill" }
];

// Payment Status Configuration
const PAYMENT_STATUS = {
    PAID: 'Paid',
    OVERDUE: 'Overdue',
    PENDING: 'Pending',
    PARTIALLY_PAID: 'Partially Paid'
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_CONFIG,
        PROPERTY_TYPES,
        AGREEMENT_TYPES,
        BILL_TYPES,
        PAYMENT_STATUS
    };
}
