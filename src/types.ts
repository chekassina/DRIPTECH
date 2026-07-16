export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface Lead {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  location: string;
  serviceNeeded: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Archived';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'drip' | 'sprinkler' | 'pump' | 'tank' | 'solar' | 'consultancy';
  categoryLabel: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  content: string;
}
