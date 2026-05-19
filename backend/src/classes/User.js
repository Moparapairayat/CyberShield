export class User {
  #passwordHash;

  constructor({ id, name, email, passwordHash, role = "user", department = "Cyber Operations" }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.department = department;
    this.#passwordHash = passwordHash;
  }

  getProfile() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      department: this.department,
      accessLevel: this.getAccessLevel()
    };
  }

  getAccessLevel() {
    return "standard";
  }

  hasPasswordHash() {
    return Boolean(this.#passwordHash);
  }
}
