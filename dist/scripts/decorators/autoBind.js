export function autoBind(_1, _2, descriptor) {
    const method = descriptor.value;
    const createDescriptor = {
        configurable: true,
        get() {
            return method.bind(this);
        },
    };
    return createDescriptor;
}
//# sourceMappingURL=autoBind.js.map