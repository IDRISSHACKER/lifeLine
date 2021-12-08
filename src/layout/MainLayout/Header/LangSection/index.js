
import MenuPopover from './MenuPopover';
import Fr from "assets/images/icons/ic_flag_fr.svg"
import En from "assets/images/icons/ic_flag_en.svg"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSelector, useDispatch } from "react-redux"
import { setLanguage } from 'store/Action/language.action';
import { Avatar, Stack } from '@mui/material'

const optionsA = [
  {
    keys: 1,
    lang: 'Français',
    icon: Fr
  },
  {
    keys: 0,
    lang: 'English',
    icon: En
  }
];

const options = ["Français", "English"];

export default function LangSection() {
  const dispatch = useDispatch()
  const lang = useSelector(state => state.langReducer)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(localStorage.getItem("lang") ? parseInt(localStorage.getItem("lang")) : 0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Language"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            secondary={<div> 
              <Stack direction="row">
                <Avatar
                    alt="lang icon"
                    src={optionsA[selectedIndex].icon}
                    sx={{ width: 24, height: 18 }}
                    variant="square"
                  /> 
                  <div>{options[selectedIndex]}</div>
                </Stack>
              </div>}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => {
              handleMenuItemClick(event, index)
              dispatch(setLanguage(index, option))
              localStorage.setItem("lang", index)
            }}
          >
            <ListItemIcon>
              <Avatar
                alt="Remy Sharp"
                src={optionsA[index].icon}
                sx={{ width: 24, height: 18 }}
                variant="square"
              >
                B
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
