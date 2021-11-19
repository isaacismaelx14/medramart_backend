export class Validator {
  constructor() {}

  isAuth(user: any): boolean {
    if (!user) return false;
    return true;
  }

  isAdmin(user: any): boolean {
    if (!user) return false;
    if (user.type !== "admin") return false;
    return true;
  }

  isTheUser(user: any, uuid: string): boolean {
    if (!user) return false;
    if (user.uuid !== uuid || !this.isAdmin(user)) return false;
    return true;
  }
}
