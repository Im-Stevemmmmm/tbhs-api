import { rule } from "graphql-shield";
import { ServerContext } from "./server-context";

export const isAuthenticated = rule({
    cache: "contextual",
})(async (_, __, { userRole }: ServerContext) => {
    return !userRole ? new Error("Not authorized!") : true;
});
