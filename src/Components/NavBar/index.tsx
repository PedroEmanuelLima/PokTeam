import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    NavProps,
} from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';

import './styles.css'
import { IMAGE_NAV_BAR } from '../../base/Contants';

export default function NavBar(args: NavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar {...args} className='navBar'>
                <NavbarBrand tag={Link} className='imageLogocontainer' to="/">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img
                        src={IMAGE_NAV_BAR}
                        className='imageLogo'
                    />
                </NavbarBrand>
                <NavbarToggler
                    onClick={toggle}
                    className="custom-toggler"
                />
                <Collapse
                    isOpen={isOpen}
                    navbar
                    style={{
                        width: '100%',
                        flexDirection: 'row-reverse',
                    }}
                >
                    <NavbarText>
                        <Nav className="me-auto" navbar >
                            <NavItem className='navItems'>
                                <NavLink
                                    className={`
                                        btnLink
                                        ${location.pathname === '/' && 'bg-primary'}
                                    `}
                                    tag={Link} to="/"
                                >
                                    <h2 className={`
                                        link-navigation
                                        ${location.pathname === '/' && 'text-light'}
                                    `}>
                                        Pókemons
                                    </h2>
                                </NavLink>
                            </NavItem>
                            <NavItem className='navItems'>
                                <NavLink
                                    className={`
                                        btnLink
                                        ${location.pathname === '/team' && 'bg-primary'}
                                    `}
                                    tag={Link} to="/team"
                                >
                                    <h2 className={`
                                        link-navigation
                                        ${location.pathname === '/team' && 'text-light'}
                                    `}>
                                        Times
                                    </h2>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}