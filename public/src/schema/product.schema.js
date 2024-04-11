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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductInput = exports.CreateProductInput = exports.ProductModel = exports.Product = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const user_schema_1 = require("./user.schema");
const nanoid_1 = require("nanoid");
const class_validator_1 = require("class-validator");
const nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxz123456789', 10);
let Product = class Product {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, ref: () => user_schema_1.User }),
    __metadata("design:type", Object)
], Product.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({
        required: true,
        default: () => `product_${nanoid()}`,
        unique: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "productId", void 0);
Product = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typegoose_1.index)({ productId: 1 })
], Product);
exports.Product = Product;
exports.ProductModel = (0, typegoose_1.getModelForClass)(Product);
let CreateProductInput = class CreateProductInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MinLength)(50, {
        message: 'Description must be at least 50 characters long',
    }),
    (0, class_validator_1.MaxLength)(1000, {
        message: 'Description must not exceed 1000 characters',
    }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "price", void 0);
CreateProductInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateProductInput);
exports.CreateProductInput = CreateProductInput;
let GetProductInput = class GetProductInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetProductInput.prototype, "productId", void 0);
GetProductInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetProductInput);
exports.GetProductInput = GetProductInput;
