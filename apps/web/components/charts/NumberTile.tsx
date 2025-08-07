export default function NumberTile({ label, value }: { label: string; value: string; }) {
  return (<div className="border rounded-2xl p-6 shadow-sm"><div className="text-sm text-gray-500">{label}</div><div className="text-3xl font-semibold">{value}</div></div>);
}
