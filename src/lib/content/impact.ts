/** The big numbers — all verifiable from the resume. */
export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const metrics: Metric[] = [
  { value: 15, suffix: "+", label: "Client Analytics Platforms Delivered" },
  { value: 7, label: "Data Analysts & Interns Led" },
  { value: 1, label: "International Deployment (Indonesia)" },
  { value: 900, suffix: "M+ KG", label: "Supply Chain Material Analyzed" },
];
