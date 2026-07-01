import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

import PageLayout from '../../layout/PageLayout/PageLayout';

import './ErrorPage.scss';

const ErrorPage = () => {
    return (
        <PageLayout pageType="errorPage">
            <div className="errorPageWrapper">
                <h1 className="errorPageHeading">Oops, something went wrong or you might have gone to the unknown.</h1>

                <Link
                    to="/"
                    className="btmText"
                    onMouseEnter={() => setIsBtmLinkHover(true)}
                    onMouseLeave={() => setIsBtmLinkHover(false)}
                >
                    <span>Click here to go back</span>
                </Link>
            </div>
        </PageLayout>
    );
};

export default ErrorPage;
