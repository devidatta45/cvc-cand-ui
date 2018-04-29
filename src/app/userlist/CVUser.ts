export class CVUser {
  _id: string = "";
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
  country: string;
  postCode: string;
  clientRef:string;
  constructor(title: string, firstName: string, lastName: string, email: string,
    password: string, mobile: string, address: string, country: string, postCode: string) {
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.mobile = mobile;
    this.address = address;
    this.country = country;
    this.postCode = postCode;
  }
}