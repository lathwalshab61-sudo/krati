/**
 * FORENSICA LIMS — Backend API Server
 * Lightweight, zero-dependency Node.js REST API server.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'cases-data.json');

// Default Seed Officers
const INITIAL_OFFICERS = [
  {
    id: "OFF-8402",
    name: "Dr. Elena Vance",
    role: "Senior Forensic Geneticist & CSI Lead",
    badgeNumber: "FX-4092",
    department: "DNA Analysis & Biological Evidence Unit",
    clearanceLevel: "Level 4 (Top Forensic Clearance)"
  },
  {
    id: "OFF-5190",
    name: "Det. Marcus Holloway",
    role: "Lead Crime Scene Investigator",
    badgeNumber: "CSI-1048",
    department: "Forensic Field Operations",
    clearanceLevel: "Level 3 (Field & Evidence)"
  },
  {
    id: "OFF-7311",
    name: "Dr. Sarah Chen",
    role: "Forensic Toxicologist & Trace Examiner",
    badgeNumber: "TOX-9921",
    department: "Toxicology & Chemical Pathology",
    clearanceLevel: "Level 3 (Laboratory)"
  }
];

// Default Seed Cases
const DEFAULT_CASES = [
  {
    id: "CR-2026-0941",
    title: "Cold Spring Harbor Marina Homicide",
    category: "Homicide",
    priority: "Critical",
    status: "Under Lab Analysis",
    incidentDate: "2026-10-24T21:45",
    firstResponseDate: "2026-10-24T22:18",
    location: {
      address: "Pier 14, Slip C-28, Cold Spring Harbor",
      type: "Outdoor Marine / Vessel",
      gps: "40.8712° N, 73.4549° W",
      weather: "Foggy, light mist, 11°C, 88% humidity"
    },
    leadExaminer: "Dr. Elena Vance",
    assignedOfficerId: "OFF-8402",
    investigatingAgency: "Metropolitan Major Crimes Bureau",
    synopsis: "Victim discovered aboard 42-foot pleasure craft with blunt force trauma to temporal bone. Primary crime scene secured.",
    evidence: [],
    chainOfCustody: [],
    dnaProfiles: [],
    fieldNotes: []
  }
];

// In-Memory Data Store with JSON file persistence
let casesStore = [];

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      casesStore = JSON.parse(content);
      console.log(`[Storage] Loaded ${casesStore.length} cases from ${DATA_FILE}`);
      return;
    }
  } catch (err) {
    console.error("[Storage] Failed to read data file, using defaults:", err.message);
  }
  casesStore = [...DEFAULT_CASES];
  saveData();
}

function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(casesStore, null, 2), 'utf-8');
  } catch (err) {
    console.error("[Storage] Failed to save data file:", err.message);
  }
}

// Helpers
function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Length': Buffer.byteLength(payload)
  });
  res.end(payload);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 10 * 1024 * 1024) { // 10MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Server Request Handler
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  console.log(`[HTTP] ${method} ${pathname}`);

  try {
    // Health Check
    if (pathname === '/api/health' || pathname === '/health') {
      return sendJson(res, 200, {
        status: 'online',
        service: 'FORENSICA LIMS Backend API',
        version: '1.0.0',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
      });
    }

    // Officers List
    if (pathname === '/api/officers' && method === 'GET') {
      return sendJson(res, 200, { success: true, count: INITIAL_OFFICERS.length, data: INITIAL_OFFICERS });
    }

    // System Metrics & Statistics
    if (pathname === '/api/stats' && method === 'GET') {
      const totalCases = casesStore.length;
      let totalEvidence = 0;
      let totalDnaProfiles = 0;
      let totalCustodyLogs = 0;

      casesStore.forEach(c => {
        totalEvidence += (c.evidence || []).length;
        totalDnaProfiles += (c.dnaProfiles || []).length;
        totalCustodyLogs += (c.chainOfCustody || []).length;
      });

      return sendJson(res, 200, {
        success: true,
        data: {
          totalCases,
          totalEvidence,
          totalDnaProfiles,
          totalCustodyLogs,
          activeCases: casesStore.filter(c => c.status !== 'Closed').length
        }
      });
    }

    // Cases List: GET /api/cases
    if (pathname === '/api/cases' && method === 'GET') {
      return sendJson(res, 200, {
        success: true,
        count: casesStore.length,
        data: casesStore
      });
    }

    // Create Case: POST /api/cases
    if (pathname === '/api/cases' && method === 'POST') {
      const body = await parseJsonBody(req);
      const newCase = {
        ...body,
        id: body.id || `CR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        evidence: body.evidence || [],
        chainOfCustody: body.chainOfCustody || [],
        dnaProfiles: body.dnaProfiles || [],
        fieldNotes: body.fieldNotes || [],
        status: body.status || 'Active Investigation',
        priority: body.priority || 'High'
      };

      casesStore.unshift(newCase);
      saveData();
      return sendJson(res, 201, { success: true, data: newCase });
    }

    // Single Case Operations: /api/cases/:id
    const caseMatch = pathname.match(/^\/api\/cases\/([^\/]+)$/);
    if (caseMatch) {
      const caseId = caseMatch[1];
      const foundIndex = casesStore.findIndex(c => c.id === caseId);

      if (method === 'GET') {
        if (foundIndex === -1) return sendJson(res, 404, { success: false, error: 'Case not found' });
        return sendJson(res, 200, { success: true, data: casesStore[foundIndex] });
      }

      if (method === 'PUT') {
        if (foundIndex === -1) return sendJson(res, 404, { success: false, error: 'Case not found' });
        const body = await parseJsonBody(req);
        casesStore[foundIndex] = { ...casesStore[foundIndex], ...body, updatedAt: new Date().toISOString() };
        saveData();
        return sendJson(res, 200, { success: true, data: casesStore[foundIndex] });
      }

      if (method === 'DELETE') {
        if (foundIndex === -1) return sendJson(res, 404, { success: false, error: 'Case not found' });
        const deleted = casesStore.splice(foundIndex, 1)[0];
        saveData();
        return sendJson(res, 200, { success: true, data: deleted });
      }
    }

    // Evidence sub-resource: POST /api/cases/:id/evidence
    const evidenceMatch = pathname.match(/^\/api\/cases\/([^\/]+)\/evidence$/);
    if (evidenceMatch && method === 'POST') {
      const caseId = evidenceMatch[1];
      const found = casesStore.find(c => c.id === caseId);
      if (!found) return sendJson(res, 404, { success: false, error: 'Case not found' });

      const body = await parseJsonBody(req);
      const newEvidence = {
        ...body,
        id: body.id || `EVD-${caseId.slice(-4)}-${Math.floor(10 + Math.random() * 90)}`,
        barcode: body.barcode || `BAR-${Math.floor(1000000 + Math.random() * 9000000)}`,
        collectionDate: body.collectionDate || new Date().toISOString().slice(0, 16)
      };

      if (!found.evidence) found.evidence = [];
      found.evidence.unshift(newEvidence);
      saveData();
      return sendJson(res, 201, { success: true, data: newEvidence });
    }

    // 404 Not Found
    return sendJson(res, 404, {
      success: false,
      error: `Route ${method} ${pathname} not found on FORENSICA LIMS API`
    });
  } catch (err) {
    console.error('[Error]', err);
    return sendJson(res, 500, { success: false, error: err.message || 'Internal server error' });
  }
});

// Start listening
loadData();
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` 🔬 FORENSICA LIMS API Backend Server is running!`);
  console.log(` 🚀 Listening at: http://localhost:${PORT}`);
  console.log(` 🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(` 📂 Cases API:   http://localhost:${PORT}/api/cases`);
  console.log(`=======================================================`);
});
