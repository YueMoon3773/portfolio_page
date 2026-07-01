import React from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';
import { ArrowRightIcons } from '../../../assets/svgIcons';

import './LinkBtnLike.scss';

const linkBtnSchema = z.object({
    toDestination: z.string(),
    linkBtnClassName: z.string(),
    linkBtnContent: z.string(),
    isOpenInNewTab: z.boolean().default(false),
    isDisplayArrowIcon: z.boolean().default(false),
});

const LinkBtnLike = ({ toDestination, linkBtnClassName, linkBtnContent, isOpenInNewTab, isDisplayArrowIcon }) => {
    return (
        <Link
            className={`linkBtnBaseStyle ${linkBtnClassName}`}
            to={toDestination}
            target={isOpenInNewTab ? '_blank' : undefined}
            rel={isOpenInNewTab ? 'noopener noreferrer' : undefined}
        >
            {linkBtnContent}
            {isDisplayArrowIcon && (
                <div className="arrowIconWrapper">
                    <ArrowRightIcons></ArrowRightIcons>
                    <ArrowRightIcons></ArrowRightIcons>
                </div>
            )}
        </Link>
    );
};

export default ValidatedComponent(LinkBtnLike, linkBtnSchema);
