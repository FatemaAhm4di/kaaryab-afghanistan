import OpportunityCard from '@/features/opportunities/components/OpportunityCard';
import {opportunities} from '@/features/opportunities/data';

export default function OpportunitiesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] py-10">
      <section className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--color-primary-dark)] md:text-4xl">
            Opportunities
          </h1>

          <p className="mt-2 text-[var(--color-text-secondary)]">
            Discover jobs, internships, scholarships and remote work opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </div>
      </section>
    </main>
  );
}