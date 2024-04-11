"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_schema_1 = require("../schema/product.schema");
class ProductService {
    /* constructor(private readonly productRepository: ProductRepository) {} */
    // async createProduct(
    //   product: CreateProductInput & { user: User['_id'] }
    // ): Promise<CreateProductInput> {
    //   return ProductModel.create(product);
    // }
    async createProduct(product) {
        return product_schema_1.ProductModel.create(product);
    }
    async findProducts() {
        return product_schema_1.ProductModel.find().lean();
    }
    async findSingleProduct(input) {
        return product_schema_1.ProductModel.findOne(input).lean();
    }
}
exports.default = ProductService;
