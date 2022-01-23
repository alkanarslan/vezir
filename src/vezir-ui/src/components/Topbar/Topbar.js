import React from 'react';
import './Topbar.css';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Button,
  Image,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import VezirLogo from '../../images/vezir-logo.svg';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Image src={VezirLogo} alt="Vezir Logo" ill="#F65314" />
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Menu closeOnSelect={false}>
              <MenuButton as={Button}>MenuItem</MenuButton>
              <MenuList minWidth="240px">
                <ColorModeSwitcher />
                <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
                  <MenuItemOption value="asc">Ascending</MenuItemOption>
                  <MenuItemOption value="desc">Descending</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup title="Country" type="checkbox">
                  <MenuItemOption value="email">Email</MenuItemOption>
                  <MenuItemOption value="phone">Phone</MenuItemOption>
                  <MenuItemOption value="country">Country</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
