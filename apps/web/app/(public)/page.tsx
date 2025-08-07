import NumberTile from '@/components/charts/NumberTile';

export default async function Home() {
  const stats = [
    { label: 'BEV Share', value: '—' },
    { label: 'Public Chargers', value: '—' },
    { label: 'Ultra-rapid', value: '—' },
  ];
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold">UK EV Snapshot</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (<NumberTile key={s.label} {...s} />))}
      </div>
    </main>
  );
}
