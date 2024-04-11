"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authChecker = ({ context }) => {
    // if (roles.length === 0) {
    //   return context.user !== undefined;
    // }
    // if (!context.user) {
    //   return false;
    // }
    // if (context.user.roles.some(role => roles.includes(role))) {
    //   return true;
    // }
    // return false;
    return !!context.user;
};
exports.default = authChecker;
