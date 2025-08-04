export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'venue';
  isActive: boolean;
  venueDetails?: {
    venueName: string;
    address: string;
    phone: string;
    capacity: number;
    amenities: string[];
    pricePerHour: number;
    commission: number;
  };
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  errors?: any[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'venue';
  venueDetails?: {
    venueName: string;
    address: string;
    phone: string;
    capacity: number;
    amenities: string[];
    pricePerHour: number;
  };
}