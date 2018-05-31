import React from 'react'
import { Menu } from 'semantic-ui-react'

export default (props) => {
    return (
        <div>
            <Menu>
                <Menu.Item name='logo'>Smart Fantasy</Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item>Sign Up</Menu.Item>
                    <Menu.Item>Login</Menu.Item>
                </Menu.Menu>
            </Menu>
            { props.children }
        </div>
    )
}
