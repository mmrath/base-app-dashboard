export * from './core';

export interface Auth {
  error?: string;
  user?: any;
  success?: boolean;
  expired?: boolean;
}
