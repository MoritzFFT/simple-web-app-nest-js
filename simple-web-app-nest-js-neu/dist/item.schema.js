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
exports.ItemSchema = exports.Item = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_package_type_1 = require("./app.package-type");
let Address = class Address {
    street;
    city;
    postalCode;
    country;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "postalCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
Address = __decorate([
    (0, mongoose_1.Schema)()
], Address);
let Item = class Item extends mongoose_2.Document {
    name;
    packageType;
    expirationDate;
    address;
    shippingDate;
};
exports.Item = Item;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: app_package_type_1.PackageType, required: true }),
    __metadata("design:type", String)
], Item.prototype, "packageType", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Date)
], Item.prototype, "expirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Address, required: true }),
    __metadata("design:type", Address)
], Item.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Item.prototype, "shippingDate", void 0);
exports.Item = Item = __decorate([
    (0, mongoose_1.Schema)()
], Item);
exports.ItemSchema = mongoose_1.SchemaFactory.createForClass(Item);
//# sourceMappingURL=item.schema.js.map