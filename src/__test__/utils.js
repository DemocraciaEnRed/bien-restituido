import { faker } from "@faker-js/faker";


export function generateRandomUsers(numUsers = 5) {
    const users = [];

    for (let i = 0; i < numUsers; i++) {
        const user = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        users.push(user);
    }

    return users;
}