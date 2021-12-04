import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Card, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import DataObjectIcon from '@mui/icons-material/DataObject';

export default function OtherSettings() {

  return (
    <Card>
      <List
        sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}
        subheader={<ListSubheader>Liens utiles</ListSubheader>}
      >
        <ListItem>
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Ouvrir le deppôt github" />
          <Button href="https://github.com/idriss-coder/lifeLine" target="_blank" className="githubBtn" variant="contained" color="info" startIcon={<GitHubIcon />}>ouvrir github .</Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DataObjectIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Effectuer un rechargement" />
          <Button  href="https://github.com/idriss-coder/lifeLine" target="_blank" color="secondary" variant="contained" startIcon={<DataObjectIcon />} >ouvrir api sms</Button>
        </ListItem>
      </List>
    </Card>
  );
}
