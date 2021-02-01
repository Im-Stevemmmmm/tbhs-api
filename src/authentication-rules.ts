import { rule } from "graphql-shield";
import { ServerContext } from "./server-context";

const baseError =
    "Unauthorized action. Please provide a valid API key through the x-api-key header using the bearer schema.";

const genericError = new Error(baseError);
const adminError = new Error(`${baseError} with admin level authentication.`);

export const isAuthenticated = rule({
    cache: "contextual",
})(async (_, __, { userRole }: ServerContext) => {
    return !userRole ? genericError : true;
});

export const isAdminAuthenticated = rule({
    cache: "contextual",
})(async (_, __, { userRole }: ServerContext) => {
    return userRole === "admin" ? true : adminError;
});
