/** biome-ignore-all lint/correctness/useImageSize: Ignore */

import { useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";

const ErrorComp = () => {
    const router = useRouter();

    return (
        <div className="container h-screen">
            <div className="mt-20 flex flex-col items-center justify-center gap-5">
                <img
                    alt="error-icon"
                    className="size-10"
                    src="/images/icon-error.svg"
                />

                <div className="flex flex-col items-center justify-center gap-5">
                    <h1 className="text-center font-header font-semibold text-5xl">
                        Something went wrong
                    </h1>

                    <div className="flex w-full max-w-md flex-col items-center justify-center gap-5">
                        <p className="text-center text-lg">
                            We couldn't connect to the server (API error).
                            Please try again in a few moments
                        </p>

                        <Button
                            className="flex items-center gap-2 p-4"
                            onClick={() => router.invalidate()}
                            variant="secondary"
                        >
                            <img
                                alt="retry-icon"
                                className="size-3"
                                src="/images/icon-retry.svg"
                            />{" "}
                            <span className="text-base">Retry</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorComp;
