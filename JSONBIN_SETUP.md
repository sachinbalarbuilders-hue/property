# JSONBin Setup Guide for Property Management System

## Step 1: Create JSONBin Account

1. Go to [https://jsonbin.io/](https://jsonbin.io/)
2. Click "Sign Up" (free account)
3. Create your account (no billing required)

## Step 2: Create a New Bin

1. Click "Create Bin"
2. **Bin Name**: `property-management-data`
3. Click "Create"
4. Copy your credentials:
   - **API Key** (starts with `$2a$10$...`)
   - **Bin ID** (looks like `507f1f77bcf86cd799439011`)

## Step 3: Update Your App Configuration

Replace the configuration in `app.js` with your actual credentials:

```javascript
const JSONBIN_API_KEY = 'your-actual-api-key-here';
const JSONBIN_BIN_ID = 'your-actual-bin-id-here';
```

## Step 4: Test Your App

Once configured, test:
- ✅ Data saving to JSONBin
- ✅ Data loading from JSONBin
- ✅ Document uploads (stored locally)
- ✅ Document downloads

## Features You'll Get

✅ **Permanent Data Storage**: All property data stored in JSONBin
✅ **Document Storage**: Upload and store documents locally
✅ **Cross-Device Sync**: Access your data from any device
✅ **Automatic Backup**: Data is automatically backed up
✅ **Download Links**: Direct download links for all documents
✅ **Free Tier**: 10,000 requests/month free

## Free Tier Limits

- **API Requests**: 10,000 requests/month
- **Storage**: Unlimited (within reasonable limits)
- **Bandwidth**: 1GB/month

## Document Storage

Documents are stored locally in the browser and synced through JSONBin. This provides:
- ✅ Free storage
- ✅ No size limits (within browser limits)
- ✅ Direct download functionality
- ✅ Version control through JSONBin

## Security

JSONBin uses API keys for authentication. Keep your API key secure and don't share it publicly.

## Support

If you need help with setup, check:
- [JSONBin Documentation](https://jsonbin.io/api-reference)
- [JSONBin FAQ](https://jsonbin.io/faq)
