import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  picture?: string;
};

const AuthorBox = ({ name, picture }: Props) => {
  return (
    <section className="py-12 border-t border-primary/10">
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-6">
            {picture && (
              <div className="flex-shrink-0">
                <Image
                  src={picture}
                  alt={name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm text-charcoal/50 mb-1">Über den Autor</p>
              <h3 className="font-serif text-xl text-primary mb-2">{name}</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Ich baue Automatisierungen für mittelständische Unternehmen im
                Allgäu und ganz Bayern - keine PowerPoint-Strategien, sondern
                funktionierende Systeme. Von der Idee bis zur laufenden Lösung
                setze ich für Sie um.
              </p>
              <Link
                href="/ueber-mich"
                className="inline-block mt-3 text-accent hover:text-accent-600 font-medium text-sm"
              >
                Mehr erfahren →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorBox;
