
import axios from 'axios';
import * as admin from 'firebase-admin';
const pdf = require('pdf-parse');

// Get a reference to the Firebase Realtime Database
const db = admin.database();
const ref = db.ref('ingested_data');

const normalizeData = (source: string, data: any): any => {
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

const handlePdfSource = async (url: string) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const data = await pdf(response.data);
    // Return both the content and the original URL for normalization
    return { content: data.text, url: url };
  } catch (error) {
    console.error('Error processing PDF from URL:', error);
    throw new Error('Failed to process PDF from URL');
  }
};

export const normalizeAndSaveData = async (source: string, data: any) => {
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
