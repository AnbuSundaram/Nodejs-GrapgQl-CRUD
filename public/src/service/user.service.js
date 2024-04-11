"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const user_schema_1 = require("../schema/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
class UserService {
    async createUser(input) {
        /** Call user model to create a user */
        return user_schema_1.UserModel.create(input);
    }
    async login(input, context) {
        const e = 'Invalid email or password';
        /** Get our user by email */
        const user = await user_schema_1.UserModel.find()
            .findByEmail(input.email)
            .lean();
        /** Check if user exists */
        if (!user) {
            throw new apollo_server_1.ApolloError(e);
        }
        /** Validate password */
        const passwordIsValid = await bcrypt_1.default.compare(input.password, user.password);
        if (!passwordIsValid) {
            throw new apollo_server_1.ApolloError(e);
        }
        /** Sign a jwt */
        const token = (0, jwt_1.signJwt)(user);
        /** Set a cookie for the jwt */
        // context.res.cookie('accessToken', token, {
        //   maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year 3.154e10
        //   httpOnly: true,
        //   domain:
        //     process.env.NODE_ENV === 'production'
        //       ? '.ismaelbr.com'
        //       : 'localhost',
        //   path: '/',
        //   sameSite: 'strict',
        //   secure: process.env.NODE_ENV === 'production' ? true : false,
        // });
        context.res.cookie('accessToken', token, {
            //maxAge: 3.154e10, // 1 year
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production' ? true : false,
        });
        /** Return the jwt */
        return token;
    }
}
//export default new UserService();
exports.default = UserService;
