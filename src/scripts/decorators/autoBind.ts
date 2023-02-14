export function autoBind(_1: any, _2: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  const createDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return method.bind(this);
    },
  };
  return createDescriptor;
}
