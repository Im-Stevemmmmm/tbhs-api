import { camelCaseKeys } from "../camel-case-keys";

export const formatPitResponse = (o: any) =>
    camelCaseKeys(formatKeys(o, /Pit|Stats/g));

const formatKeys = (o: any, regex: RegExp) => {
    const formattedObject = {};

    Object.keys(o).forEach(k => (formattedObject[k.replace(regex, "")] = o[k]));

    return formattedObject;
};
