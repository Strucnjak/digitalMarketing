export interface Project {
  id: number;
  title: string;
  category: string | string[];
  categoryLabel: string;
  description: string;
  image: string;
  technologies: string[];
  results: string[];
  year: string;
  client: string;
  duration: string;
  link: string;
}
