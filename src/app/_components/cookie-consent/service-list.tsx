import {
  getActiveServicesByCategory,
  type ConsentCategory,
  type ServiceConfig,
} from "@/lib/cookie-config";

function ServiceCard({ service }: { service: ServiceConfig }) {
  return (
    <div className="space-y-2 border-b border-primary/20 py-5 first:border-t">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-charcoal">{service.name}</h4>
          <p className="text-[15px] text-charcoal/75">
            Anbieter: {service.provider}
          </p>
        </div>
        {service.dataTransferToUSA && (
          <span className="type-label shrink-0 rounded-[2px] border border-primary/30 px-1.5 py-0.5 text-[11.5px] text-primary">
            USA
          </span>
        )}
      </div>

      <p>{service.purpose}</p>

      {service.cookies && service.cookies.length > 0 && (
        <div className="text-[15px]">
          <span className="font-medium text-charcoal">Cookies:</span>
          <ul className="mt-1 space-y-1">
            {service.cookies.map((cookie) => (
              <li key={cookie.name} className="text-charcoal/75">
                <code className="rounded-[2px] bg-pappe px-1 text-[13px] text-charcoal">{cookie.name}</code>
                {" – "}{cookie.purpose} ({cookie.duration})
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.privacyPolicyUrl && (
        <p className="text-[15px]">
          <a
            href={service.privacyPolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
          >
            Datenschutzerklärung
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
      <p className="text-charcoal/75">{emptyMessage}</p>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="type-display text-[1.45rem] leading-[1.15] text-primary">{title}</h3>
      )}
      <div>
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
      <p className="text-charcoal/75">
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
      <table className="w-full border-collapse text-[15px]">
        <thead>
          <tr className="border-b border-primary/20">
            <th className="text-left py-2 pr-4 type-label text-[12px] text-charcoal/75">Cookie</th>
            <th className="text-left py-2 pr-4 type-label text-[12px] text-charcoal/75">Dienst</th>
            <th className="text-left py-2 pr-4 type-label text-[12px] text-charcoal/75">Kategorie</th>
            <th className="text-left py-2 pr-4 type-label text-[12px] text-charcoal/75">Zweck</th>
            <th className="text-left py-2 type-label text-[12px] text-charcoal/75">Dauer</th>
          </tr>
        </thead>
        <tbody>
          {allCookies.map((cookie, index) => (
            <tr key={`${cookie.service}-${cookie.name}-${index}`} className="border-b border-charcoal/10 align-top">
              <td className="py-3 pr-4">
                <code className="rounded-[2px] bg-pappe px-1 text-[13px] text-charcoal">{cookie.name}</code>
              </td>
              <td className="py-3 pr-4 text-charcoal/85">{cookie.service}</td>
              <td className="py-3 pr-4">
                {categoryLabels[cookie.category]}
              </td>
              <td className="py-3 pr-4 text-charcoal/85">{cookie.purpose}</td>
              <td className="py-3 text-charcoal/85">{cookie.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
