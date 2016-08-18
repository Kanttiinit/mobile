export type Lang = 'fi' | 'en';

export type Restaurant = {
  id: number,
  name: string,
  url: string
};

export type Course = {
  title: string,
  properties: string[]
};

export type State = {
  [key: string]: any
};
