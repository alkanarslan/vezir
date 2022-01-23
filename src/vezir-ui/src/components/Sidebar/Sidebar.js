import React from 'react';
import './Sidebar.css';
import { PhoneIcon } from '@chakra-ui/icons';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
            <li className="sidebarListItem">
              <PhoneIcon className="sidebarIcon" />
              Home
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
