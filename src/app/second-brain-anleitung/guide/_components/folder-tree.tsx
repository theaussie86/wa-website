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
    <div className="not-prose my-6 rounded-xs border border-primary/20 overflow-hidden">
      <div className="px-4 py-2.5 bg-primary/10 border-b border-primary/15 font-mono text-sm font-semibold text-primary">
        second-brain/
      </div>
      <div className="bg-primary/3">
        {SECOND_BRAIN_FOLDERS.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-primary/10 last:border-0">
            <Folder className="w-4 h-4 text-primary/50 shrink-0" />
            <span className="font-mono text-sm font-medium text-charcoal">{item.name}</span>
            <span className="text-sm text-charcoal/50">— {item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
