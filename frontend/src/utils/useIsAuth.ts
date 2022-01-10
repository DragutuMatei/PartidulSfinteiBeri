import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetLoggedUserQuery } from "../generated/graphql";

export const useIsAuth = () => {
    const [{ data, fetching }] = useGetLoggedUserQuery();
    const router = useRouter();

    useEffect(() => {
        if (!data?.getLoggedUser && !fetching) {
            router.replace("/login?next=" + router.pathname);
        }
    }, [fetching, data, router]);


}