// Sabitov Kirill, 6/11/2022

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import { fallVariant } from "../theme"

interface LayoutProps { 
    children: JSX.Element | JSX.Element[],
    title?: string
}

const Layout = (props: LayoutProps) => {
    const title = props.title ? 
        `${props.title} - Exammy` :
        'Exammy';
    return (
        <motion.article
            initial="initial" animate="visible"
            exit="exit" variants={fallVariant}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative' }}
        >
        <>
            {props.title && (
            <Helmet>
                <title>{title}</title>
                <meta name="twitter:title" content={title} />
                <meta property="og:title" content={title} />
            </Helmet>
            )}
            {props.children}
        </>
        </motion.article>
  );
}

export default Layout