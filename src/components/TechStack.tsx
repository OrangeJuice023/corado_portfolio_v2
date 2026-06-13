import {
  SiTypescript, SiPython, SiJavascript, SiReact, SiHtml5, SiCss,
  SiC, SiSharp, SiGooglebigquery, SiGooglecloud,
  SiPandas, SiKubernetes, SiN8N, SiNodedotjs,
  SiNextdotjs, SiMongodb, SiLeaflet, SiVercel,
} from "react-icons/si";
import { BarChart3 } from "lucide-react";
import type { IconType } from "react-icons";

/**
 * Real brand marks (Simple Icons) — never AI-generated logos or emoji.
 * Tableau's mark was removed from Simple Icons for trademark reasons, so it
 * uses a neutral chart glyph rather than a wrong/fake logo.
 */
const STACK: { name: string; Icon: IconType }[] = [
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Python", Icon: SiPython },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "HTML5", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "C", Icon: SiC },
  { name: "C#", Icon: SiSharp },
  { name: "BigQuery", Icon: SiGooglebigquery },
  { name: "Google Cloud", Icon: SiGooglecloud },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Tableau", Icon: BarChart3 as unknown as IconType },
  { name: "Pandas", Icon: SiPandas },
  { name: "Leaflet", Icon: SiLeaflet },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "n8n", Icon: SiN8N },
  { name: "Vercel", Icon: SiVercel },
];

export function TechStack() {
  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5">
      {STACK.map(({ name, Icon }) => (
        <li
          key={name}
          className="group flex flex-col items-center gap-2 text-slate transition-colors duration-200 hover:text-forest"
        >
          <Icon size={30} aria-hidden="true" />
          <span className="font-mono text-[0.62rem] uppercase tracking-wider">
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}
