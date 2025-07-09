"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessLogic = void 0;
const axios_1 = __importDefault(require("axios"));
const common_1 = require("@nestjs/common");
class BusinessLogic {
    static isGermanOrAustrian(country) {
        const upper = country.toUpperCase();
        return (upper === 'GERMANY' ||
            upper === 'DEUTSCHLAND' ||
            upper === 'AUSTRIA' ||
            upper === 'ÖSTERREICH');
    }
    static async validateAddress(address) {
        if (!BusinessLogic.isGermanOrAustrian(address.country)) {
            throw new common_1.NotFoundException(`Currently only available in germany and austria, no shipping to ${address.country}`);
        }
        console.log(address);
        const response = await axios_1.default.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: `${address.street}, ${address.postalCode} ${address.city}`,
                format: 'json',
                addressdetails: 1,
            },
        });
        if (Array.isArray(response.data) && response.data.length === 0) {
            throw new common_1.NotFoundException(`Provided address does not exist: ${address.street}, ${address.postalCode} ${address.city}`);
        }
    }
}
exports.BusinessLogic = BusinessLogic;
//# sourceMappingURL=business.logic.js.map