/**
 * Certifications — real, verifiable credentials, grouped the way the resume
 * groups them. Add badge images to /public/images/certs/ and set `image`.
 */

export interface Certification {
  category: string;
  issuer: string;
  title: string;
  date: string;
  credentialId?: string;
  expires?: string;
  url?: string;
  image?: string;
  skills?: string[];
}

export const certifications: Certification[] = [
  // --- Data Engineering & Databases ---
  { category: "Data Engineering & Databases", issuer: "IBM", title: "Relational Database Administration (DBA)", date: "Jun 2026", credentialId: "O61FBXJYW16U", skills: ["SQL", "DBA", "MySQL", "PostgreSQL"] },
  { category: "Data Engineering & Databases", issuer: "IBM", title: "Introduction to Data Engineering", date: "Nov 2025", credentialId: "XFU6MP2VIYDY", skills: ["ETL", "Data Pipelines", "Architecture"] },
  { category: "Data Engineering & Databases", issuer: "IBM", title: "Data Engineering Essentials", date: "Oct 2025", skills: ["Data Engineering", "SQL", "Linux"] },

  // --- Data Science & Artificial Intelligence ---
  { category: "Data Science & AI", issuer: "DataCamp", title: "Data Scientist Associate", date: "May 2026", expires: "May 2028", credentialId: "DSA0014739622912", skills: ["Statistics", "ML", "Python", "SQL"] },
  { category: "Data Science & AI", issuer: "IBM", title: "Python for Data Science, AI & Development", date: "Nov 2025", credentialId: "EZDAQ2Z314EI", skills: ["Python", "Pandas", "APIs"] },
  { category: "Data Science & AI", issuer: "freeCodeCamp", title: "Machine Learning with Python", date: "—", skills: ["TensorFlow", "Neural Networks"] },
  { category: "Data Science & AI", issuer: "freeCodeCamp", title: "Data Analysis with Python", date: "—", skills: ["Pandas", "NumPy", "Matplotlib"] },
  { category: "Data Science & AI", issuer: "freeCodeCamp", title: "Scientific Computing with Python", date: "—", skills: ["Python", "OOP"] },

  // --- Software Engineering & CS Foundations ---
  { category: "Software Engineering & CS Foundations", issuer: "HarvardX", title: "CS50x: Introduction to Computer Science", date: "Jan 2022", credentialId: "09ac1fa5bd334e7398b922bd7a912c41", skills: ["C", "Python", "SQL", "JavaScript", "Algorithms"] },
  { category: "Software Engineering & CS Foundations", issuer: "freeCodeCamp", title: "Back End Development and APIs", date: "—", skills: ["Node.js", "Express", "MongoDB"] },
  { category: "Software Engineering & CS Foundations", issuer: "freeCodeCamp", title: "JavaScript Algorithms and Data Structures", date: "—", skills: ["JavaScript", "Algorithms"] },
  { category: "Software Engineering & CS Foundations", issuer: "freeCodeCamp", title: "Relational Database", date: "—", skills: ["PostgreSQL", "Bash", "SQL"] },
  { category: "Software Engineering & CS Foundations", issuer: "freeCodeCamp", title: "Front End Development Libraries", date: "—", skills: ["React", "Redux", "Bootstrap"] },
  { category: "Software Engineering & CS Foundations", issuer: "freeCodeCamp", title: "Responsive Web Design", date: "—", skills: ["HTML", "CSS", "Flexbox", "Grid"] },

  // --- Business & Strategy ---
  { category: "Business & Strategy", issuer: "McKinsey & Company", title: "Forward Program", date: "Apr 2026 – Jun 2026", credentialId: "1938128E1", skills: ["Structured Problem Solving", "Adaptability", "Business Communication"] },
];

/** Category display order. */
export const categoryOrder = [
  "Data Engineering & Databases",
  "Data Science & AI",
  "Software Engineering & CS Foundations",
  "Business & Strategy",
] as const;

export const issuers = ["IBM", "DataCamp", "HarvardX", "freeCodeCamp", "McKinsey & Company"];
export const certCount = certifications.length;
