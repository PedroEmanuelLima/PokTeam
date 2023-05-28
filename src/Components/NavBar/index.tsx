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

import './styles.css'
import { imageNav } from '../../base/Contants';

export default function NavBar(args: NavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar {...args} className='navBar'>
                <NavbarBrand className='imageLogocontainer' href="/">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img
                        src={imageNav}
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
                                <NavLink href="#" className='btnLink'>
                                    <h2 className='link-navigation'>
                                        Pókemons
                                    </h2>
                                </NavLink>
                            </NavItem>
                            <NavItem className='navItems'>
                                <NavLink className='btnLink' href="#">
                                    <h2 className='link-navigation'>
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