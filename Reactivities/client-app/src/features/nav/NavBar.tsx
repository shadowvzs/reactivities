import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { 
    Menu, 
    Container, 
    Button,
    Image,
    Dropdown
} from 'semantic-ui-react'
import { NavLink, Link } from "react-router-dom";
import RootStoreContext from "@stores/rootStore";

const menuList = [
    {
        label: 'Activities',
        path: '/activities'
    }
];

const NavBar = () => {

    const rootStore = useContext(RootStoreContext);
    const { user, logout } = rootStore.userStore;

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }}/>
                    Reactivities
                </Menu.Item>
                {menuList.map(x => <Menu.Item key={x.label} as={NavLink} to={x.path} children={x.label} />)}
                <Menu.Item>
                    <Button positive content='Create Activity' as={NavLink} to='/createActivity' />
                </Menu.Item>
                { user && (
                    <Menu.Item position='right'>
                        <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                        <Dropdown pointing='top left' text={user.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user.username}`} text='My profile' icon='user'/>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                )}
            </Container>
      </Menu>
    )
};

export default observer(NavBar);
