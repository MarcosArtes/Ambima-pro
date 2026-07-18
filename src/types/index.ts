export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'analyst' | 'user';
  mfaEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  cnpj: string;
  name: string;
  rating: number;
  score: number;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  founded: Date;
  createdAt: Date;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
}

export interface APIError {
  code: string;
  message: string;
  timestamp: Date;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface CompanyAlert {
  id: string;
  companyId: string;
  type: 'rating_change' | 'status_change' | 'new_data';
  message: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: Date;
}
