import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import PageLayout from './components/layout/PageLayout/PageLayout';
import LinkBtnLike from './components/base/LinkBtnLike/LinkBtnLike';

import './App.scss';

const App = () => {
    const [isBtmLinkHover, setIsBtmLinkHover] = useState(false);
    // const popoverRef = useRef(null);

    return (
        <PageLayout pageType="homePage" sideBarDelayMotion={1.36}>
            <div className="homePageWrapper">
                <motion.div
                    initial={{ opacity: 0, y: 500 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 500 }}
                    transition={{ duration: 1.66, ease: 'easeInOut' }}
                    className="homePageContentWrapper"
                >
                    <h1 className="homePageHeading">
                        Hello there, I'm <span>Bao</span>.
                        <br />
                        I'm a software developer.
                    </h1>

                    <LinkBtnLike
                        toDestination={'/profile'}
                        linkBtnClassName={'exploreMoreHomeBtn'}
                        linkBtnContent={'Get to know me ☺️'}
                        isOpenInNewTab={false}
                        isDisplayArrowIcon={true}
                    ></LinkBtnLike>

                    <p className="btmText">
                        Never mind -{' '}
                        <Link
                            to="/contact"
                            onMouseEnter={() => setIsBtmLinkHover(true)}
                            onMouseLeave={() => setIsBtmLinkHover(false)}
                        >
                            Just come to say hi{isBtmLinkHover && <span> 😉</span>}
                        </Link>
                    </p>

                    {/* <p
                        className="my-button"
                        onMouseEnter={() => popoverRef.current?.showPopover()}
                        onMouseLeave={() => popoverRef.current?.hidePopover()}
                    >
                        Hover me

                        <div ref={popoverRef} popover="manual" className="tooltip">
                            Hello!
                        </div>
                    </p> */}
                </motion.div>
            </div>
        </PageLayout>
    );
};

export default App;
