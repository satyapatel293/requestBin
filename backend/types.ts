export interface JsonBody {
  [key:string] : string
}

export interface NewRequest {
  id: string,
  basket_id: string,
  method: string,
  path: string,
  headers: string,
  query_params: string,
};

export interface Baskets {
  basket_name: string,
}

export interface Requests {
id: string, 
basket_id: string,
path: string,
method: string, 
headers: string,
query_params: string,
body: string 
}

export interface Body {
  request_id: string,
  basket_id: string,
  body: string,
};