import { UserInput } from './../resolvers/UserInput';
export const validateRegister = (options: UserInput) => {
    if (options.username.length < 2) {
        return [
            {
                field: "username",
                message: "lenght must be at least 2",
            },
        ];
    }
    if (!options.email.includes('@')) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }
    if (options.password.length < 3) {
        return [
            {
                field: "password",
                message: "lenght must be at least 3",
            },
        ];
    }
    return null;

}