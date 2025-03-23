export interface Route {
  id: string;
  number: string;
  name: string;
  startPoint: string;
  endPoint: string;
  stops: string[];
  schedule: Schedule[];
}

export interface Schedule {
  id: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  status: 'on-time' | 'delayed' | 'cancelled';
  delay?: number;
}

export interface BusStop {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  routes: string[];
}

export interface LiveTracking {
  busId: string;
  routeId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  speed: number;
  nextStop: string;
  estimatedArrival: string;
  occupancy: 'low' | 'medium' | 'high';
}