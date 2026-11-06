import React from 'react';
import { Printer, Shield, FileCheck, Stamp, Award, CheckCircle } from 'lucide-react';
import { CODIS_LOCI_LIST } from '../../data/mockData';

export default function CourtReportTab({ currentCase }) {
  const handlePrint = () => {
    window.print();
  };

  const primaryDna = currentCase.dnaProfiles?.[0];

  return (
    <div className="space-y-6">
      {/* Print Trigger Banner (hidden when printing) */}
      <div className="no-print flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-xl p-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-amber-400" />
            <span>Official Court-Ready Forensic Dossier & Certificate</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Formatted for legal admissibility in Grand Jury, Preliminary Hearings, and Trial proceedings.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF Dossier</span>
        </button>
      </div>

      {/* Official Document Card */}
      <div className="print-card bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-300 max-w-4xl mx-auto font-serif">
        {/* Document Header */}
        <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full border-2 border-slate-900 flex items-center justify-center p-2">
              <Shield className="w-10 h-10 text-slate-900" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-slate-950 font-sans">
            Forensic Sciences & Molecular Biology Division
          </h1>
          <h2 className="text-xs uppercase tracking-widest text-slate-600 mt-1 font-sans">
            Bureau of Criminal Investigation • State Crime Laboratory
          </h2>
          <div className="mt-3 inline-block bg-slate-100 border border-slate-400 px-4 py-1 text-xs font-bold uppercase font-sans tracking-wider">
            CERTIFICATE OF FORENSIC DNA & PHYSICAL EVIDENCE ANALYSIS
          </div>
        </div>

        {/* Case Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-6 bg-slate-50 p-4 border border-slate-300 font-sans">
          <div>
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Official Case ID</span>
            <span className="font-mono font-bold text-sm text-slate-900">{currentCase.id}</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Incident Category</span>
            <span className="font-semibold text-slate-900">{currentCase.category}</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Lead Examiner</span>
            <span className="font-semibold text-slate-900">{currentCase.leadExaminer}</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Report Date</span>
            <span className="font-mono text-slate-900">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Section 1: Crime Scene Synopsis */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider font-sans border-b border-slate-300 pb-1 mb-2 text-slate-900">
            Section 1: Scene Incident & Environmental Parameters
          </h3>
          <p className="text-xs text-slate-800 leading-relaxed font-sans">
            <strong>Location:</strong> {currentCase.location?.address} ({currentCase.location?.type})<br />
            <strong>Environmental Conditions:</strong> {currentCase.location?.weather}<br />
            <strong>Executive Summary:</strong> {currentCase.synopsis}
          </p>
        </div>

        {/* Section 2: Evidentiary Inventory & Custody */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider font-sans border-b border-slate-300 pb-1 mb-2 text-slate-900">
            Section 2: Evidence Inventory & Tamper-Evident Packaging
          </h3>
          <table className="w-full text-left text-xs border border-slate-300 font-sans">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-[10px] uppercase text-slate-700">
                <th className="p-2 border-r border-slate-300">Barcode ID</th>
                <th className="p-2 border-r border-slate-300">Description of Evidence</th>
                <th className="p-2 border-r border-slate-300">Location Recovered</th>
                <th className="p-2">Storage / Vault</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(currentCase.evidence || []).map((e) => (
                <tr key={e.id}>
                  <td className="p-2 font-mono font-bold text-slate-900 border-r border-slate-200">{e.barcode}</td>
                  <td className="p-2 font-medium border-r border-slate-200">{e.name}</td>
                  <td className="p-2 border-r border-slate-200">{e.locationFound}</td>
                  <td className="p-2 font-mono text-[11px]">{e.storageCondition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Certified STR DNA Profiling Table */}
        {primaryDna && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans border-b border-slate-300 pb-1 mb-2 text-slate-900">
              Section 3: Molecular STR Multiplex Capillary Electrophoresis Results
            </h3>
            <p className="text-[11px] text-slate-700 mb-2 font-sans">
              Specimen: <strong>{primaryDna.sampleLabel}</strong> | Method: <strong>{primaryDna.method}</strong> | Yield: <strong>{primaryDna.quantitation}</strong>
            </p>

            <table className="w-full text-left text-xs border border-slate-300 font-sans">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-[10px] uppercase text-slate-700">
                  <th className="p-1.5 border-r border-slate-300 text-center">Locus</th>
                  <th className="p-1.5 border-r border-slate-300 text-center">Alleles</th>
                  <th className="p-1.5 border-r border-slate-300 text-center">Locus</th>
                  <th className="p-1.5 text-center">Alleles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {Array.from({ length: Math.ceil(CODIS_LOCI_LIST.length / 2) }).map((_, rowIdx) => {
                  const loc1 = CODIS_LOCI_LIST[rowIdx * 2];
                  const loc2 = CODIS_LOCI_LIST[rowIdx * 2 + 1];
                  return (
                    <tr key={rowIdx}>
                      <td className="p-1.5 font-bold font-mono text-center bg-slate-50 border-r border-slate-200">{loc1}</td>
                      <td className="p-1.5 font-mono text-center border-r border-slate-200">{primaryDna.loci?.[loc1] || '-'}</td>
                      <td className="p-1.5 font-bold font-mono text-center bg-slate-50 border-r border-slate-200">{loc2 || ''}</td>
                      <td className="p-1.5 font-mono text-center">{loc2 ? (primaryDna.loci?.[loc2] || '-') : ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-2 p-2 bg-slate-100 border border-slate-300 text-[10px] font-sans text-slate-800">
              <strong>Statistical Significance:</strong> The calculated Random Match Probability across the 16 standard STR loci is less than <strong>1 in 4.8 × 10¹⁸</strong> in the North American population database, indicating extreme statistical certitude.
            </div>
          </div>
        )}

        {/* Section 4: Legal Certification & Signatures */}
        <div className="pt-4 border-t-2 border-slate-900 mt-8 font-sans">
          <p className="text-[11px] text-slate-700 italic leading-snug mb-8">
            "I hereby certify that the forensic analysis described in this report was performed in accordance with accredited laboratory quality assurance standards (FBI QAS / ISO 17025). The chain of custody was uncompromised, and the findings represent my objective scientific conclusions."
          </p>

          <div className="grid grid-cols-2 gap-8 items-end">
            <div>
              <div className="border-b border-slate-900 pb-1 text-sm font-script font-bold text-slate-900">
                {currentCase.leadExaminer}
              </div>
              <span className="text-[10px] text-slate-500 uppercase block mt-1 font-bold">
                Forensic Examiner Signature
              </span>
              <span className="text-xs text-slate-800 font-mono">
                Badge #FX-4092 • Forensic Genetics Division
              </span>
            </div>

            <div className="text-right">
              <div className="inline-block p-3 border-2 border-dashed border-slate-400 rounded-lg text-center">
                <Stamp className="w-6 h-6 text-slate-700 mx-auto mb-1" />
                <span className="text-[9px] uppercase font-bold text-slate-700 block">
                  OFFICIAL CRIME LAB EMBOSS
                </span>
                <span className="text-[9px] font-mono text-slate-500">
                  REF: {currentCase.id}-CERT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
