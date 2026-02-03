
import { Request, Response } from 'express';
import { normalizeAndSaveData } from '../services/ingestionService';

export const ingestData = async (req: Request, res: Response) => {
  try {
    const { source, data } = req.body;

    if (!source || !data) {
      return res.status(400).json({ error: 'Source and data are required' });
    }

    await normalizeAndSaveData(source, data);

    res.status(200).json({ message: 'Data ingested successfully' });
  } catch (error) {
    console.error('Error ingesting data:', error);
    res.status(500).json({ error: 'Failed to ingest data' });
  }
};
