export interface Headers {
  [key:string] : string
}

export interface NewRequest {
  id: string,
  basket_id: string,
  method: string,
  path: string,
  headers: string,
  time: string
};

export interface Baskets {
  basket_name: string,
  // created_at: string,
}

export interface Requests {
id: string | number, 
basket_id: string,
path: string,
method: string, 
headers: Headers
}