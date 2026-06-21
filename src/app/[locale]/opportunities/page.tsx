import {opportunities} from '@/features/opportunities/data';

export default function OpportunitiesPage() {
  return (
    <main className="min-h-screen bg-[#EBF4F6] px-6 py-10">
      
      <h1 className="text-3xl font-bold text-[#075A6B] mb-6">
        Opportunities
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#D7E6EA] rounded-lg p-5 hover:shadow-md transition"
          >
            <h2 className="font-bold text-[#075A6B]">
              {item.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {item.organization}
            </p>

            <p className="text-sm mt-3 text-gray-600">
              {item.description}
            </p>

            <div className="mt-4 text-xs text-gray-500">
              Deadline: {item.deadline}
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}