import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container, chakra } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";



export function DefaultLayout() {

    const links = [
        { name: "Normal Solver", href: "/" },
        { name: "Step By Step Solve", href: "/stepbystep" },
    ];

    return (
        <chakra.div width={"100%"}>
            <chakra.div minHeight={"100vh"} width={"100%"}>
                <chakra.main marginBottom={"2rem"}>
                    <NavBar links={links} />
                    <Container marginX="0" maxW={"5xl"}>
                        <Outlet />
                    </Container>
                </chakra.main>
            </chakra.div>

            <ScrollRestoration />
        </chakra.div>
    );
}
