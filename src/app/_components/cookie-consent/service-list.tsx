import {
  getActiveServicesByCategory,
  type ConsentCategory,
  type ServiceConfig,
} from "@/lib/cookie-config";

function ServiceCard({ service }: { service: ServiceConfig }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-charcoal">{service.name}</h4>
          <p className="text-sm text-gray-600">
            Anbieter: {service.provider}
          </p>
        </div>
        {service.dataTransferToUSA && (
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
            USA
          </span>
        )}
      </div>

      <p className="text-charcoal/80">{service.purpose}</p>

      {service.cookies && service.cookies.length > 0 && (
        <div className="text-sm">
          <span className="font-medium">Cookies:</span>
          <ul className="mt-1 space-y-1">
            {service.cookies.map((cookie) => (
              <li key={cookie.name} className="text-gray-600">
                <code className="bg-gray-200 px-1 rounded text-xs">{cookie.name}</code>
                {" – "}{cookie.purpose} ({cookie.duration})
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.privacyPolicyUrl && (
        <p className="text-sm">
          <a
            href={service.privacyPolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent font-medium transition-colors"
          >
            Datenschutzerklärung →
          </a>
        </p>
      )}
    </div>
  );
}

interface ServiceListProps {
  category?: ConsentCategory;
  showInactive?: boolean;
  title?: string;
  emptyMessage?: string;
}

export function ServiceList({
  category,
  showInactive = false,
  title,
  emptyMessage = "Keine aktiven Dienste in dieser Kategorie.",
}: ServiceListProps) {
  const services = category
    ? getActiveServicesByCategory(category)
    : [];

  // If showInactive, get all services for the category
  const allServices = showInactive && category
    ? require("@/lib/cookie-config").getServicesByCategory(category)
    : services;

  const displayServices = showInactive ? allServices : services;

  if (displayServices.length === 0) {
    return (
      <p className="text-gray-500 italic">{emptyMessage}</p>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="font-sans font-semibold text-charcoal text-lg">{title}</h3>
      )}
      <div className="space-y-3">
        {displayServices.map((service: ServiceConfig) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export function CookieOverviewTable() {
  const essentialServices = getActiveServicesByCategory("essential");
  const analyticsServices = getActiveServicesByCategory("analytics");
  const marketingServices = getActiveServicesByCategory("marketing");

  const allCookies = [
    ...essentialServices,
    ...analyticsServices,
    ...marketingServices,
  ].flatMap((service) =>
    (service.cookies || []).map((cookie) => ({
      ...cookie,
      service: service.name,
      category: service.category,
    }))
  );

  if (allCookies.length === 0) {
    return (
      <p className="text-gray-500 italic">
        Derzeit werden keine Cookies verwendet, die einer Einwilligung bedürfen.
      </p>
    );
  }

  const categoryLabels: Record<ConsentCategory, string> = {
    essential: "Essenziell",
    analytics: "Analyse",
    marketing: "Marketing",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4 font-semibold text-charcoal">Cookie</th>
            <th className="text-left py-2 pr-4 font-semibold text-charcoal">Dienst</th>
            <th className="text-left py-2 pr-4 font-semibold text-charcoal">Kategorie</th>
            <th className="text-left py-2 pr-4 font-semibold text-charcoal">Zweck</th>
            <th className="text-left py-2 font-semibold text-charcoal">Dauer</th>
          </tr>
        </thead>
        <tbody>
          {allCookies.map((cookie, index) => (
            <tr key={`${cookie.service}-${cookie.name}-${index}`} className="border-b border-gray-100">
              <td className="py-2 pr-4">
                <code className="bg-gray-100 px-1 rounded text-xs">{cookie.name}</code>
              </td>
              <td className="py-2 pr-4 text-gray-700">{cookie.service}</td>
              <td className="py-2 pr-4">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  cookie.category === "essential"
                    ? "bg-green-100 text-green-800"
                    : cookie.category === "analytics"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}>
                  {categoryLabels[cookie.category]}
                </span>
              </td>
              <td className="py-2 pr-4 text-gray-700">{cookie.purpose}</td>
              <td className="py-2 text-gray-700">{cookie.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
