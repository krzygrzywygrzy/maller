import Address from "./address";

export default interface User {
  uid?: string;
  name: string;
  surname: string;
  email: string;
  address?: Address;
}
