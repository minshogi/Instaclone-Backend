import client from "../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export default {
    Mutation: {
        createAccount: async (
            _,
            { firstName, lastName, username, email, password }
        ) => {
            //check if username or email are already on DB
            const existingUser = await client.user.findFirst({
                where: {
                    OR: [

                        {
                            username,
                        },
                        {
                            email,
                        },
                    ],

                }
            });
            console.log(existingUser);
            //hash password
            const uglyPassword = await bcrypt.hash(password, 10);

            return client.user.create({
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    password: uglyPassword,
                },
            });
            //save nd return the user
        },

        login: async (_, { username, password }) => {
            // find user with args.username
            const user = await client.user.findFirst({ where: { username } });
            if (!user) {
                return {
                    ok: false,
                    error: "User not found.",
                };
            }
            // check password with args.password
            const passwordOk = await bcrypt.compare(password, user.password);
            // issue a token and send it to the user
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect password.",
                }
            }
            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

            return {
                ok: true,
                token: token,
            };
        },
    },
};