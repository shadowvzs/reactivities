import React, { useState, useContext } from "react";
import { Menu, Container, MenuItemProps, Button } from 'semantic-ui-react'
import ActivityStore from "@stores/activityStore";

const menuList = ['Activities'];

const NavBar = () => {

    const { openCreateForm } = useContext(ActivityStore);
    const [activeItem, setActiveItem] = useState('home');
    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { name }: MenuItemProps) => setActiveItem(name as string);

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: 10}}/>
                    Reactivities
                </Menu.Item>
                {menuList.map(x => <Menu.Item key={x} name={x} active={x === activeItem} onClick={onClick} />)}
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={() => openCreateForm()} />
                </Menu.Item>
            </Container>
      </Menu>
    )
};

export default NavBar;
