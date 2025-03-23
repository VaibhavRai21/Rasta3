import { Route, Schedule, BusStop, LiveTracking } from '../types';

// These will be replaced with actual API calls to your backend
export const api = {
  routes: {
    getAll: async (): Promise<Route[]> => {
      // TODO: Implement API call
      return [];
    },
    getById: async (id: string): Promise<Route> => {
      // TODO: Implement API call
      throw new Error('Not implemented');
    },
    search: async (query: string): Promise<Route[]> => {
      // TODO: Implement API call
      return [];
    }
  },
  schedules: {
    getByRoute: async (routeId: string): Promise<Schedule[]> => {
      // TODO: Implement API call
      return [];
    }
  },
  stops: {
    getNearby: async (lat: number, lng: number, radius: number): Promise<BusStop[]> => {
      // TODO: Implement API call
      return [];
    }
  },
  tracking: {
    getLiveLocation: async (busId: string): Promise<LiveTracking> => {
      // TODO: Implement API call
      throw new Error('Not implemented');
    }
  }
};