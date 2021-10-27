export default interface ICreateCustomer {
  name: string;
  email: string;
  type: string | null;
  document?: string | null;
}
