import { User } from "./User.js";

export class Admin extends User {
  constructor(user) {
    super({
      ...user,
      role: "admin"
    });
    this.permissions = ["VIEW_DASHBOARD", "SIMULATE_ATTACKS", "MANAGE_ALERTS", "DOWNLOAD_REPORTS"];
  }

  getAccessLevel() {
    return "administrator";
  }

  getProfile() {
    return {
      ...super.getProfile(),
      permissions: this.permissions
    };
  }
}
