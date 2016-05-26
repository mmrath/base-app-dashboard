export * from './core';

export interface Auth {
  token: string;
  error?: string;
  user?: any;
}
