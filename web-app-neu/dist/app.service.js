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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const item_schema_1 = require("./item.schema");
const mongoose_2 = require("mongoose");
let AppService = class AppService {
    itemModel;
    constructor(itemModel) {
        this.itemModel = itemModel;
    }
    async getAllItems() {
        return this.itemModel.find().exec();
    }
    async getItem(name) {
        const result = await this.itemModel.findOne({ name }).exec();
        if (result == null) {
            throw new common_1.NotFoundException(`Item with name ${name} not found`);
        }
        return result;
    }
    async addItem(item) {
        const newItem = new this.itemModel(item);
        return newItem.save();
    }
    async deleteItem(_id) {
        return this.itemModel.deleteOne({ _id }).exec();
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppService);
//# sourceMappingURL=app.service.js.map