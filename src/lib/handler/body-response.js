export default class BodyResponse {
    constructor (props = {}) {
        let message = props?.message ?? null
        if (typeof (message) === 'string') {
            message = `${message}`.replace(/\//g, '')
        }
        try {
            return {
                ...props,
                code: props?.code ?? props?.status ?? 500,
                error: props?.error ?? null,
                message: message ?? null

                // data: props.data ?? null,
            }
        } catch (err) {
            return {
                ...props,
                code: err?.name ?? null,
                error: props?.error ?? null,
                message: message ?? null
            }
        }
    }
}
