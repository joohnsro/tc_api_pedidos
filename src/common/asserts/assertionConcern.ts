export default class AssertionConcern {

    public static AssertArgumentNotNull(data: any, message: string): void {
        if ( data == null ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentNotEmpty(value: string|number, message: string): void {
        if ( value == null || typeof value == "string" && value.trim().length == 0 ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentNotBiggerThanZero(numberValue: number, message: string): void {
        if ( numberValue <= 0 ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentNotNumber(numberValue: number, message: string): void {
        if ( typeof(numberValue) !== "number" ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentMatches(pattern: any, stringValue: string, message: string): void {
        if ( ! stringValue.match(pattern) ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentEquals(value1: any, value2: any, message: string): void {
        if ( value1 === value2 ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentNotEquals(value1: any, value2: any, message: string): void {
        if ( value1 !== value2 ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentNotValidDate(value: string, message: string): void {
        const date: any = Date.parse(value)
        if ( isNaN( date ) ) {
            throw new Error(message)
        }
    }
}