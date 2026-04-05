export type Coordinates = {
  lat: number;
  lng: number;
};

export class GeolocationError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export function getCurrentPosition(timeoutMs = 10000): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new GeolocationError("Geolocation is not supported by this browser.", -1));
      return;
    }

    const onSuccess: PositionCallback = (position) => {
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    };

    const onError: PositionErrorCallback = (error) => {
      reject(new GeolocationError(error.message, error.code));
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: false,
      timeout: timeoutMs,
      maximumAge: 0
    });
  });
}

