"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidExpirationConstraint = void 0;
exports.IsValidExpiration = IsValidExpiration;
const class_validator_1 = require("class-validator");
let IsValidExpirationConstraint = class IsValidExpirationConstraint {
    validate(_, args) {
        const obj = args.object;
        if (!obj.expirationDate)
            return false;
        const expiration = new Date(obj.expirationDate);
        const shipping = new Date(obj.shippingDate);
        if (!obj.expirationDate || !obj.shippingDate)
            return true;
        const diffMs = expiration.getTime() - shipping.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        return diffDays >= 7;
    }
    defaultMessage() {
        return 'expirationDate must be at least 7 days after shippingDate';
    }
};
exports.IsValidExpirationConstraint = IsValidExpirationConstraint;
exports.IsValidExpirationConstraint = IsValidExpirationConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsValidExpiration', async: false })
], IsValidExpirationConstraint);
function IsValidExpiration(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidExpirationConstraint,
        });
    };
}
//# sourceMappingURL=is-valid-expiration.js.map