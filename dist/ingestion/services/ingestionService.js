"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAndSaveData = void 0;
const axios_1 = __importDefault(require("axios"));
const admin = __importStar(require("firebase-admin"));
const pdf = require('pdf-parse');
// Get a reference to the Firebase Realtime Database
const db = admin.database();
const ref = db.ref('ingested_data');
const normalizeData = (source, data) => {
    const baseData = {
        source,
        ingestedAt: new Date().toISOString(),
    };
    switch (source) {
        case 'pdf':
            // For PDFs, we clean up the extracted text and store the original URL.
            return {
                ...baseData,
                // Remove extra whitespace and newlines for cleaner text
                textContent: data.content?.replace(/\s+/g, ' ').trim() || '',
                originalUrl: data.url,
            };
        case 'api':
            // Example for a generic API source. You can customize this as needed.
            return {
                ...baseData,
                ...data,
            };
        default:
            // For any other source, just add the timestamp and source.
            return {
                ...baseData,
                rawData: data,
            };
    }
};
const handlePdfSource = async (url) => {
    try {
        const response = await axios_1.default.get(url, { responseType: 'arraybuffer' });
        const data = await pdf(response.data);
        // Return both the content and the original URL for normalization
        return { content: data.text, url: url };
    }
    catch (error) {
        console.error('Error processing PDF from URL:', error);
        throw new Error('Failed to process PDF from URL');
    }
};
const normalizeAndSaveData = async (source, data) => {
    let processedData = data;
    if (source === 'pdf' && data.url) {
        processedData = await handlePdfSource(data.url);
    }
    const normalizedData = normalizeData(source, processedData);
    // Push the data to the Firebase Realtime Database
    const newRecordRef = ref.child(source).push();
    await newRecordRef.set(normalizedData);
    console.log(`Data from source '${source}' ingested and saved to Firebase:`, normalizedData);
};
exports.normalizeAndSaveData = normalizeAndSaveData;
//# sourceMappingURL=ingestionService.js.map