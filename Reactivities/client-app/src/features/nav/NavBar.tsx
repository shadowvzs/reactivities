import React, { useState } from "react";
import { Menu, Container, MenuItem, Button } from 'semantic-ui-react'

const menuList = ['Activities'];

interface NavbarProps {
    openCreateForm: () => void;
}

const NavBar = ({ openCreateForm }: NavbarProps) => {

    const [activeItem, setActiveItem] = useState('home');
    const onClick = (e: React.MouseEvent, { name }) => setActiveItem(name);

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: 10}}/>
                    Reactivities
                </Menu.Item>
                {menuList.map(x => <Menu.Item key={x} name={x} active={x === activeItem} onClick={onClick} />)}
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={openCreateForm} />
                </Menu.Item>
            </Container>
      </Menu>
    )
};

export default NavBar;
