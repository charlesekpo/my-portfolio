export interface Experience {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}