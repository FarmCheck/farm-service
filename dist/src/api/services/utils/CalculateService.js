"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
let CalculateService = class CalculateService {
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        const dLon = this.deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
};
CalculateService = tslib_1.__decorate([
    typedi_1.Service()
], CalculateService);
exports.CalculateService = CalculateService;
//# sourceMappingURL=CalculateService.js.map