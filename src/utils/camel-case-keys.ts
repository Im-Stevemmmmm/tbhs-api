export const camelCaseKeys = (o: any) => {
    const keys = Object.keys(o);
    const transformedObject = {};

    keys.forEach(
        k => (transformedObject[k.charAt(0).toLowerCase() + k.slice(1)] = o[k])
    );

    return transformedObject;
};
