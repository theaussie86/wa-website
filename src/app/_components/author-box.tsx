import Image from "next/image";
import { Button } from "@/app/_components/button";

type Props = {
  name: string;
  picture?: string;
};

// Unter jedem Artikel: wer das geschrieben hat, in zwei Sätzen.
const AuthorBox = ({ name, picture }: Props) => {
  return (
    <section className="bg-white px-6 pb-[clamp(72px,9vw,120px)] lg:px-10">
      <div className="mx-auto flex max-w-[68ch] items-start gap-6 border-t-2 border-primary pt-8">
        <Image
          src={picture || "/images/author/christoph-weissteiner.webp"}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full object-cover object-[50%_25%]"
        />
        <div>
          <p className="type-display mb-2 text-[1.5rem] leading-[1.1] text-primary">{name}</p>
          <p className="mb-3 text-[16.5px] leading-[1.65] text-charcoal/85">
            Softwareentwickler aus Memmingen. Ich richte Inhabern einen KI-Arbeitsplatz ein, an dem
            sie ihre Arbeit so machen, wie sie gehört, und arbeite selbst genau so.
          </p>
          <Button href="/ueber-mich" variant="text">
            Mehr über mich
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AuthorBox;
