"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssertionConcern {
    static AssertArgumentNotNull(data, message) {
        if (data == null) {
            throw new Error(message);
        }
    }
    static AssertArgumentNotEmpty(value, message) {
        if (value == null || typeof value == "string" && value.trim().length == 0) {
            throw new Error(message);
        }
    }
    static AssertArgumentNotBiggerThanZero(numberValue, message) {
        if (numberValue <= 0) {
            throw new Error(message);
        }
    }
    static AssertArgumentNotNumber(numberValue, message) {
        if (typeof (numberValue) !== "number") {
            throw new Error(message);
        }
    }
    static AssertArgumentMatches(pattern, stringValue, message) {
        if (!stringValue.match(pattern)) {
            throw new Error(message);
        }
    }
    static AssertArgumentEquals(value1, value2, message) {
        if (value1 === value2) {
            throw new Error(message);
        }
    }
    static AssertArgumentNotEquals(value1, value2, message) {
        if (value1 !== value2) {
            throw new Error(message);
        }
    }
    static AssertArgumentNotValidDate(value, message) {
        const date = Date.parse(value);
        if (isNaN(date)) {
            throw new Error(message);
        }
    }
}
exports.default = AssertionConcern;
