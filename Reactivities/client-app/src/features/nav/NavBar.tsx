import React from "react";
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";

const menuList = [
    {
        label: 'Activities',
        path: '/activities'
    }
];

const NavBar = () => {

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: 10}}/>
                    Reactivities
                </Menu.Item>
                {menuList.map(x => <Menu.Item key={x.label} as={NavLink} to={x.path} children={x.label} />)}
                <Menu.Item>
                    <Button positive content='Create Activity' as={NavLink} to='/createActivity' />
                </Menu.Item>
            </Container>
      </Menu>
    )
};

export default NavBar;
