import Link from 'next/link';
import { opportunities } from '@/features/opportunities/data';

type PageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function OpportunityPage({
  params
}: PageProps) {
  const { locale, id } = await params;

  const opportunity = opportunities.find(
    (o) => o.id === id
  );

  if (!opportunity) {
    return (
      <main className="container-custom py-10">
        <h1 className="text-2xl font-bold">
          Opportunity not found
        </h1>

        <p className="mt-2 text-gray-600">
          The opportunity with id {id} was not found.
        </p>

        <Link
          href={`/${locale}/opportunities`}
          className="mt-4 inline-block text-cyan-700"
        >
          Back to list
        </Link>
      </main>
    );
  }

  return (
    <main className="container-custom py-10">
      <h1 className="text-3xl font-bold">
        {opportunity.title}
      </h1>

      <p className="mt-2 text-gray-600">
        {opportunity.organization} • {opportunity.location}
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">
          Description
        </h2>

        <p className="mt-3 text-gray-600">
          {opportunity.description}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">
          Requirements
        </h2>

        <ul className="mt-3 list-disc pl-5">
          {opportunity.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex gap-4">
        <a
          href={opportunity.applyLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-cyan-700 px-4 py-2 text-white"
        >
          Apply Now
        </a>

        <Link
          href={`/${locale}/opportunities`}
          className="rounded-lg border px-4 py-2"
        >
          Back
        </Link>
      </div>
    </main>
  );
}