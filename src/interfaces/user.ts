import Address from "./address";

export default interface User {
  uid?: string;
  name: String;
  surname: String;
  email: string;
  address?: Address;
}
