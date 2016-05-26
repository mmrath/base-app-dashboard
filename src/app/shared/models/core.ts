export class PageRequest {
  page: number = 0;
  size: number = 20;
  sort: Array<Order> = new Array<Order>();
}

export class Order {
  public static get ASC(): string { return 'asc'; }
  public static get DESC(): string { return 'desc'; }

  property: string;
  direction: string;
}

export interface Page<T>{
  content: Array<T>;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Page number
  first: boolean;
  numberOfElements: number; // Number of elements in current page
}

export interface AbsrtactAuditEntity {
  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  version?: number;
}

export interface Resource {
  id: number;
  name: string;
  description: string;
}

export interface Permission {
  id: number;
  name: string;
  resource: Resource;
  accessLevel: string;
  description: string;
  selected: boolean;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  version: number;
  permissions: Array<Permission>;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  version: number;
  roles: Array<Role>;
}