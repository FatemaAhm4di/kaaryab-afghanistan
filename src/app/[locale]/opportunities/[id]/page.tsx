import Link from 'next/link';
import { opportunities } from '@/features/opportunities/data';

export default function OpportunityPage({ params }: { params: { locale: string; id: string } }) {
  const opportunity = opportunities.find((o) => o.id === params.id);

  if (!opportunity) {
    return (
      <main className="container-custom">
        <h1>Opportunity not found</h1>
        <p>The opportunity with id {params.id} was not found.</p>
        <Link href={`/${params.locale}/opportunities`} className="text-cyan-700">Back to list</Link>
      </main>
    );
  }

  return (
    <main className="container-custom">
      <h1 className="text-2xl font-bold">{opportunity.title}</h1>
      <p className="text-sm text-[var(--color-text-secondary)]">{opportunity.organization} — {opportunity.location}</p>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Description</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">{opportunity.description}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Requirements</h2>
        <ul className="mt-2 list-disc pl-5 text-[var(--color-text-secondary)]">
          {opportunity.requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex items-center gap-4">
        <a href={opportunity.applyLink} className="rounded bg-cyan-700 px-4 py-2 text-white">Apply</a>
        <Link href={`/${params.locale}/opportunities`} className="text-cyan-700">Back</Link>
      </div>
    </main>
  );
}