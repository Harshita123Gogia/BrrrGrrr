class User {

    constructor({
        id,
        name,
        email,
        password,
        createdAt = new Date().toISOString()
    }) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
}

module.exports = User;