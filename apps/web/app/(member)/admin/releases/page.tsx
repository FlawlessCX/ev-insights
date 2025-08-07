'use client';
import { useState } from 'react';
export default function ReleasesAdmin(){
  const [version, setVersion] = useState(new Date().toISOString().slice(0,10));
  const publish = async () => {
    await fetch('/api/etl/promote', { method: 'POST', body: JSON.stringify({ version }) });
    alert('Published version ' + version);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Release QA</h1>
      <input className="border p-2 rounded" value={version} onChange={e=>setVersion(e.target.value)} />
      <button className="border px-4 py-2 rounded" onClick={publish}>Publish</button>
      <p className="text-sm text-gray-600">Upload staged CSVs via /api/etl/upload before publishing.</p>
    </div>
  );
}
