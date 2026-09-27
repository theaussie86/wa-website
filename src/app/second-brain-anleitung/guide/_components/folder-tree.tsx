import { Folder } from "lucide-react";

const SECOND_BRAIN_FOLDERS = [
  { name: "identitaet/", description: "Wer du bist und was du anbietest" },
  { name: "zielgruppe/", description: "Wen du bedienst" },
  { name: "stimme/", description: "Wie du kommunizierst" },
  { name: "entscheidungen/", description: "Was du entschieden hast und warum" },
  { name: "prozesse/", description: "Wie du arbeitest" },
];

export function FolderTree() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-[2px] border border-primary/20">
      <div className="px-4 py-2.5 bg-primary font-mono text-white text-sm font-semibold">
        second-brain/
      </div>
      <div className="bg-white">
        {SECOND_BRAIN_FOLDERS.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-primary/10 last:border-0">
            <Folder className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
            <span className="font-mono text-sm font-medium text-charcoal">{item.name}</span>
            <span className="text-sm text-charcoal/75">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
