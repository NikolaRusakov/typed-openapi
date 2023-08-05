// <Schemas>
export type Order = Partial<
  {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    status: "placed" | "approved" | "delivered";
    complete: boolean;
  }
>;
export type Address = Partial<{ street: string; city: string; state: string; zip: string }>;
export type Customer = Partial<{ id: number; username: string; address: Array<Address> }>;
export type Category = Partial<{ id: number; name: string }>;
export type User = Partial<
  {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userStatus: number;
  }
>;
export type Tag = Partial<{ id: number; name: string }>;
export type Pet = {
  id?: number | undefined;
  name: string;
  category?: Category | undefined;
  photoUrls: Array<string>;
  tags?: Array<Tag> | undefined;
  status?: "available" | "pending" | "sold" | undefined;
};
export type ApiResponse = Partial<{ code: number; type: string; message: string }>;

// </Schemas>

// <Endpoints>

export type put_UpdatePet = {
  method: "PUT";
  path: "/pet";
  parameters: never;
  response: Pet;
};
export type post_AddPet = {
  method: "POST";
  path: "/pet";
  parameters: never;
  response: Pet;
};
export type get_FindPetsByStatus = {
  method: "GET";
  path: "/pet/findByStatus";
  parameters: {
    query: Partial<{ status: "available" | "pending" | "sold" }>;
  };
  response: Array<Pet>;
};
export type get_FindPetsByTags = {
  method: "GET";
  path: "/pet/findByTags";
  parameters: {
    query: Partial<{ tags: Array<string> }>;
  };
  response: Array<Pet>;
};
export type get_GetPetById = {
  method: "GET";
  path: "/pet/{petId}";
  parameters: {
    path: { petId: number };
  };
  response: Pet;
};
export type post_UpdatePetWithForm = {
  method: "POST";
  path: "/pet/{petId}";
  parameters: {
    query: { name: string; status: string };
    path: { petId: number };
  };
  response: unknown;
};
export type delete_DeletePet = {
  method: "DELETE";
  path: "/pet/{petId}";
  parameters: {
    path: { petId: number };
    header: { api_key: string };
  };
  response: unknown;
};
export type post_UploadFile = {
  method: "POST";
  path: "/pet/{petId}/uploadImage";
  parameters: {
    query: { additionalMetadata: string };
    path: { petId: number };
  };
  response: ApiResponse;
};
export type get_GetInventory = {
  method: "GET";
  path: "/store/inventory";
  parameters: never;
  response: unknown;
};
export type post_PlaceOrder = {
  method: "POST";
  path: "/store/order";
  parameters: never;
  response: Order;
};
export type get_GetOrderById = {
  method: "GET";
  path: "/store/order/{orderId}";
  parameters: {
    path: { orderId: number };
  };
  response: Order;
};
export type delete_DeleteOrder = {
  method: "DELETE";
  path: "/store/order/{orderId}";
  parameters: {
    path: { orderId: number };
  };
  response: unknown;
};
export type post_CreateUser = {
  method: "POST";
  path: "/user";
  parameters: never;
  response: User;
};
export type post_CreateUsersWithListInput = {
  method: "POST";
  path: "/user/createWithList";
  parameters: never;
  response: unknown;
};
export type get_LoginUser = {
  method: "GET";
  path: "/user/login";
  parameters: {
    query: Partial<{ username: string; password: string }>;
  };
  response: string;
};
export type get_LogoutUser = {
  method: "GET";
  path: "/user/logout";
  parameters: never;
  response: unknown;
};
export type get_GetUserByName = {
  method: "GET";
  path: "/user/{username}";
  parameters: {
    path: { username: string };
  };
  response: User;
};
export type put_UpdateUser = {
  method: "PUT";
  path: "/user/{username}";
  parameters: {
    path: { username: string };
  };
  response: unknown;
};
export type delete_DeleteUser = {
  method: "DELETE";
  path: "/user/{username}";
  parameters: {
    path: { username: string };
  };
  response: unknown;
};

// </Endpoints>

// <EndpointByMethod>
export type EndpointByMethod = {
  put: {
    "/pet": put_UpdatePet;
    "/user/{username}": put_UpdateUser;
  };
  post: {
    "/pet": post_AddPet;
    "/pet/{petId}": post_UpdatePetWithForm;
    "/pet/{petId}/uploadImage": post_UploadFile;
    "/store/order": post_PlaceOrder;
    "/user": post_CreateUser;
    "/user/createWithList": post_CreateUsersWithListInput;
  };
  get: {
    "/pet/findByStatus": get_FindPetsByStatus;
    "/pet/findByTags": get_FindPetsByTags;
    "/pet/{petId}": get_GetPetById;
    "/store/inventory": get_GetInventory;
    "/store/order/{orderId}": get_GetOrderById;
    "/user/login": get_LoginUser;
    "/user/logout": get_LogoutUser;
    "/user/{username}": get_GetUserByName;
  };
  delete: {
    "/pet/{petId}": delete_DeletePet;
    "/store/order/{orderId}": delete_DeleteOrder;
    "/user/{username}": delete_DeleteUser;
  };
};

// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type PutEndpoints = EndpointByMethod["put"];
export type PostEndpoints = EndpointByMethod["post"];
export type GetEndpoints = EndpointByMethod["get"];
export type DeleteEndpoints = EndpointByMethod["delete"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | MutationMethod;

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.put>
  put<Path extends keyof PutEndpoints, TEndpoint extends PutEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("put", this.baseUrl + path, params[0]);
  }
  // </ApiClient.put>

  // <ApiClient.post>
  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("post", this.baseUrl + path, params[0]);
  }
  // </ApiClient.post>

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("get", this.baseUrl + path, params[0]);
  }
  // </ApiClient.get>

  // <ApiClient.delete>
  delete<Path extends keyof DeleteEndpoints, TEndpoint extends DeleteEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("delete", this.baseUrl + path, params[0]);
  }
  // </ApiClient.delete>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 * Example usage:
 * const api = createApiClient((method, url, params) =>
 *   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 * );
 * api.get("/users").then((users) => console.log(users));
 * api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 * api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
 */

// </ApiClient