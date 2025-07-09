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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const item_dto_1 = require("./item.dto");
const business_logic_1 = require("./business.logic");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    retrieveAll() {
        return this.appService.getAllItems();
    }
    retrieveSingleItem(item) {
        return this.appService.getItem(item);
    }
    async addItem(itemDto) {
        await business_logic_1.BusinessLogic.validateAddress(itemDto.address);
        return this.appService.addItem(itemDto);
    }
    deleteSingleItem(item) {
        return this.appService.deleteItem(item);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "retrieveAll", null);
__decorate([
    (0, common_1.Get)(':item'),
    __param(0, (0, common_1.Param)('item')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "retrieveSingleItem", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_dto_1.ItemDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addItem", null);
__decorate([
    (0, common_1.Delete)(':item'),
    __param(0, (0, common_1.Param)('item')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteSingleItem", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('/webapp'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map