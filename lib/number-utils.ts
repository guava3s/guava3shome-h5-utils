export const BYTE_VALUE_OF = (() => {

    type BYTE_VALUE_UNIT = {
        B: number,
        K: number,
        M: number,
        G: number,
        T: number,
        P: number,
        E: number,
        Z: number,
        Y: number
    }
    const units: BYTE_VALUE_UNIT = {
        B: 1,
        K: 1024 ** 1,
        M: 1024 ** 2,
        G: 1024 ** 3,
        T: 1024 ** 4,
        P: 1024 ** 5,
        E: 1024 ** 6,
        Z: 1024 ** 7,
        Y: 1024 ** 8
    }
    const unitKeys = Object.keys(units).join('')
    const values: Record<string, number> = new Proxy(
        {},
        {
            get(target, prop) {
                if (typeof prop !== 'string') return undefined
                const str = String(prop).trim()

                const match = new RegExp(
                    `^(\\d+(?:\\.\\d+)?)\\s*([${unitKeys}])$`,
                    'i'
                ).exec(str)

                if (match) {
                    const num = parseFloat(match[1])
                    const unit = match[2].toUpperCase()

                    if (unit in units) {
                        return num * units[unit as keyof BYTE_VALUE_UNIT]
                    }
                }

                throw new Error(
                    `Invalid size format: "${str}". Use like "15G", "2.5T", "100M", "50B"`
                )
            }
        }
    )

    return values
})()
