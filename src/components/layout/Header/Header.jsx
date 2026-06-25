import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import './Header.scss';

const headerSchema = z.object({});

const Header = () => {
    return <div>Header</div>;
};

export default ValidatedComponent(Header, headerSchema);
