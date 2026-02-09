import { createRouter } from "@tanstack/react-router";
import ErrorComp from "./components/error";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
    const router = createRouter({
        routeTree,
        context: {},

        scrollRestoration: true,
        defaultPreloadStaleTime: 0,
        defaultErrorComponent: () => <ErrorComp />,
    });

    return router;
};
