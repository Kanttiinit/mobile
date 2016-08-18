declare type Action = Object;

declare type State = {[key: string]: any};

declare type AsyncAction = any;

declare type Dispatch = (action: Action) => any;

declare type GetState = () => State;

declare type Lang = 'fi' | 'en';

declare type Restaurant = {
  id: number,
  name: string,
  url: string
};

declare type Course = {
  title: string,
  properties: string[]
};
