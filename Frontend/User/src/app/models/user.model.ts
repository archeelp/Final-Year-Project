export class User {
    name: string;
    email: string;
    mobile: string;
    token: string;

    jsonObjectToUser(jsonObject: object): User{
        const user: User = new User();
        user.name = jsonObject['name'];
        user.email = jsonObject['email'];
        user.mobile = jsonObject['mobile'];
        user.token = jsonObject['token'];
        return user;
    }
}
