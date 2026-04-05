export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: number;
  description?: string;
  isRecommended?: boolean;
}

export interface UserProfile {
  name: string;
  avatarUrl?: string;
  interests: string[];
  savedBusinesses: Business[];
}

export interface NearbyBusiness {
  name: string;
  rating?: number;
  category?: string;
  distance: string;
  distance_km?: number;
  address?: string;
  place_id: string;
  lat?: number;
  lng?: number;
  photo_url?: string;
  photo_reference?: string;
  map_preview_url?: string;
}

export interface Recommendation {
  id: string;
  name: string;
  category: string;
  reason: string;
  distance: string;
  lat?: number;
  lng?: number;
  isRecommended?: boolean;
}

