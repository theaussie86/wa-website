export function ProblemSection() {
  const problems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Excel-Chaos",
      description: "Daten werden manuell zwischen Systemen kopiert. Fehler passieren, Zeit geht verloren.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      title: "Build and Leave",
      description: "Agenturen bauen ein System und verschwinden. Ändern sich Anforderungen, passt nichts mehr.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Agentur-Overhead",
      description: "Projektmanager, große Büros, hohe Stundensätze — Sie zahlen für Strukturen, die Sie nicht brauchen.",
    },
  ];

  return (
    <section className="section bg-forest/5">
      <div className="container mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
            Kommt Ihnen das bekannt vor?
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Viele Unternehmen kämpfen mit denselben Herausforderungen bei der Digitalisierung.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-sm shadow-sm border border-forest/10"
            >
              <div className="text-copper mb-4">{problem.icon}</div>
              <h3 className="font-serif text-xl text-forest mb-3">{problem.title}</h3>
              <p className="text-charcoal/70">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
