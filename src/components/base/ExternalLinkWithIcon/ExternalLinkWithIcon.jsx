import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import { ExternalLinkIcon } from '../../../assets/svgIcons';

const externalLinkWithIconSchema = z.object({
    toLink: z.string().url(),
    className: z.string().default('').optional(),
    children: z.unknown(),
});

import './ExternalLinkWithIcon.scss';

const ExternalLinkWithIcon = ({ toLink, className = '', children }) => {
    return (
        <Link className={`externalLinkWithIcon ${className}`} to={toLink} target="_blank" rel="noopener noreferrer">
            {children}
            <ExternalLinkIcon></ExternalLinkIcon>
        </Link>
    );
};

export default ValidatedComponent(ExternalLinkWithIcon, externalLinkWithIconSchema);
