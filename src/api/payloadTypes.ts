export interface IUpdateAddress {
  number?: string | null;
  route?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  isPrimary?: boolean;
}

export interface ICreateAddress {
  number?: string | null;
  route?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  isPrimary?: boolean;
}
