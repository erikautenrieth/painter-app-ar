import Footer from "components/landingpage/Footer";
import Navbar from "components/landingpage/Navbar";
import NavbarSmall from "components/landingpage/NavbarSmall";
import ResourceHighlight from "components/landingpage/ResourceHighlight";
import Newsletter from "components/landingpage/Newsletter";
import ResourceList from "components/landingpage/ResourceList";

import * as React from 'react';
import Head from "next/head";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import {DropdownMenu} from "reactstrap";
import MenuList from "../../components/landingpage/MenuList";
import { isMobile } from 'is-mobile';

export default function Home() {

    const router = useRouter();
    const goToPage = (url: any) => {
        router.push(url);
    };

    if (isMobile()) {
        return (
            <>
                <Head>
                    <title>Real Chat App</title>
                    <link rel="icon" href="/message_draw_icon.ico"/>
                </Head>
                <MenuList/>
                <ResourceHighlight/>
                <ResourceList/>
                <Newsletter/>
                <Footer/>
            </>
        )
    } else {
        return (
            <>
                <Head>
                    <title>Real Chat App</title>
                    <link rel="icon" href="/message_draw_icon.ico"/>
                </Head>
                <Navbar/>
                <ResourceHighlight/>
                <ResourceList/>
                <Newsletter/>
                <Footer/>

            </>
        );
    }
}