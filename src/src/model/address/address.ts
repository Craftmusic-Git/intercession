export class AddressResponse {
  type: string;
  version: string;
  features: Feature[];
  attribution: string;
  licence: string;
  query: string;
  limit: number;
}

export class Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export class Geometry {
  type: string;
  coordinates: number[];
}

export class Properties {
  label: string;
  score: number;
  housenumber: string;
  id: string;
  type: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  context: string;
  importance: number;
  street: string;
}
