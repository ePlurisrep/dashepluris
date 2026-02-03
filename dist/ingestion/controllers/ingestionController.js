"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestData = void 0;
const ingestionService_1 = require("../services/ingestionService");
const ingestData = async (req, res) => {
    try {
        const { source, data } = req.body;
        if (!source || !data) {
            return res.status(400).json({ error: 'Source and data are required' });
        }
        await (0, ingestionService_1.normalizeAndSaveData)(source, data);
        res.status(200).json({ message: 'Data ingested successfully' });
    }
    catch (error) {
        console.error('Error ingesting data:', error);
        res.status(500).json({ error: 'Failed to ingest data' });
    }
};
exports.ingestData = ingestData;
//# sourceMappingURL=ingestionController.js.map