export class ContactInformation {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  constructor(name: string, email: string, phone: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  equals(contactInformation: ContactInformation): boolean {
    return contactInformation.email === this.email;
  }
}
