import React from 'react';
import './LeftPanel.css';
import { Menu, Image } from 'semantic-ui-react';
import logo from '../img/logo.png'


const LeftPanel = () => {
    return (
        <div className='main-div'>
             <Menu vertical size='massive'>
                {/* <Menu.Item>
                    <Image size='tiny' src={logo} />
                </Menu.Item> */}
                <Menu.Item>
                    <Menu.Header>Phones</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item name='iphone' />
                        <Menu.Item name='samsung' />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Cars</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item name='Mercedes' />
                        <Menu.Item name='BMW' />
                        <Menu.Item name='Hundai' />
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default LeftPanel;