"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInput = exports.CreateUserInput = exports.UserModel = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const bcrypt_1 = __importDefault(require("bcrypt"));
function findByEmail(email) {
    return this.findOne({ email });
}
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, typegoose_1.pre)('save', async function () {
        /** Check that the password is being modified */
        const user = this;
        if (!user.isModified('password')) {
            return;
        }
        /** Hash the password */
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hashSync(user.password, salt);
        user.password = hash;
    }),
    (0, typegoose_1.index)({ email: 1 }),
    (0, typegoose_1.queryMethod)(findByEmail),
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
exports.UserModel = (0, typegoose_1.getModelForClass)(User);
let CreateUserInput = class CreateUserInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6, {
        message: 'Password must be at least 6 characters long',
    }),
    (0, class_validator_1.MaxLength)(50, {
        message: 'Password must not exceed 50 characters',
    }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
CreateUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
exports.LoginInput = LoginInput;
