import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { HomeIcon, ProjectsIcon, ProfileIcon, ContactIcon, ResumeIcon } from '../../../assets/svgIcons';

import './SideBar.scss';

const SideBar = ({ delayMotion = 0.36 }) => {
    const homePopoverRef = useRef(null);
    const projectsPopoverRef = useRef(null);
    const profilePopoverRef = useRef(null);
    const resumePopoverRef = useRef(null);
    const contactPopoverRef = useRef(null);

    const [initialAndExitMotion, setInitialAndExitMotion] = useState(
        window.innerWidth <= 800 ? { opacity: 0, x: 0, y: 60 } : { opacity: 0, x: -60, y: '-50%' },
    );
    const [animateMotion, setAnimateMotion] = useState(
        window.innerWidth <= 800 ? { opacity: 1, x: 0, y: 0 } : { opacity: 1, x: 0, y: '-50%' },
    );

    useEffect(() => {
        const handleMotionProps = () => {
            if (window.innerWidth <= 800) {
                setInitialAndExitMotion((prev) => ({ ...prev, x: 0, y: 60 }));
                setAnimateMotion((prev) => ({ ...prev, x: 0, y: 0 }));
            } else {
                setInitialAndExitMotion((prev) => ({ ...prev, x: -60, y: '-50%' }));
                setAnimateMotion((prev) => ({ ...prev, x: 0, y: '-50%' }));
            }
        };

        window.addEventListener('resize', handleMotionProps);

        return () => window.removeEventListener('resize', handleMotionProps);
    }, []);

    return (
        <motion.aside
            className="sideBar"
            initial={initialAndExitMotion}
            animate={animateMotion}
            exit={initialAndExitMotion}
            transition={{ duration: 0.36, delay: delayMotion, ease: 'easeInOut' }}
        >
            <div className="sideBarLinkWrapper">
                <NavLink
                    to={'/'}
                    className={({ isActive }) => (isActive ? 'sideBarLink home active' : 'sideBarLink home')}
                    onMouseEnter={() => homePopoverRef.current.showPopover()}
                    onMouseLeave={() => homePopoverRef.current.hidePopover()}
                >
                    <HomeIcon></HomeIcon>
                    <div ref={homePopoverRef} popover="manual" className="sideBarToolTip home">
                        Home
                    </div>
                </NavLink>
            </div>

            <div className="sideBarLinkWrapper">
                <NavLink
                    to={'/projects'}
                    className={({ isActive }) => (isActive ? 'sideBarLink projects active' : 'sideBarLink projects')}
                    onMouseEnter={() => projectsPopoverRef.current.showPopover()}
                    onMouseLeave={() => projectsPopoverRef.current.hidePopover()}
                >
                    <ProjectsIcon></ProjectsIcon>
                    <div ref={projectsPopoverRef} popover="manual" className="sideBarToolTip projects">
                        Projects
                    </div>
                </NavLink>
            </div>

            <div className="sideBarLinkWrapper">
                <NavLink
                    to={'/profile'}
                    className={({ isActive }) => (isActive ? 'sideBarLink profile active' : 'sideBarLink profile')}
                    onMouseEnter={() => profilePopoverRef.current.showPopover()}
                    onMouseLeave={() => profilePopoverRef.current.hidePopover()}
                >
                    <ProfileIcon></ProfileIcon>
                    <div ref={profilePopoverRef} popover="manual" className="sideBarToolTip profile">
                        Profile
                    </div>
                </NavLink>
            </div>

            <div className="sideBarLinkWrapper">
                <Link
                    to={'https://drive.google.com/file/d/19zL0Pb5MAqRHD90CgQPvDWxzy_QY6L06/view?usp=sharing'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sideBarLink resume"
                    onMouseEnter={() => resumePopoverRef.current.showPopover()}
                    onMouseLeave={() => resumePopoverRef.current.hidePopover()}
                >
                    <ResumeIcon></ResumeIcon>
                    <div ref={resumePopoverRef} popover="manual" className="sideBarToolTip resume">
                        Resume
                    </div>
                </Link>
            </div>

            <div className="sideBarLinkWrapper">
                <NavLink
                    to={'/contact'}
                    className={({ isActive }) => (isActive ? 'sideBarLink contact active' : 'sideBarLink contact')}
                    onMouseEnter={() => contactPopoverRef.current.showPopover()}
                    onMouseLeave={() => contactPopoverRef.current.hidePopover()}
                >
                    <ContactIcon></ContactIcon>
                    <div ref={contactPopoverRef} popover="manual" className="sideBarToolTip contact">
                        Contact
                    </div>
                </NavLink>
            </div>
        </motion.aside>
    );
};

export default SideBar;
