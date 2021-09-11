import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Categories from "../Database/Categories";

import FiberNewIcon from '@material-ui/icons/FiberNew';
import EngineeringIcon from '@material-ui/icons/Engineering';
import HealthAndSafetyIcon from '@material-ui/icons/HealthAndSafety';
import PsychologyIcon from '@material-ui/icons/Psychology';
import ScienceIcon from '@material-ui/icons/Science';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import GitHubIcon from '@material-ui/icons/GitHub';

import { useLocation, useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  MuiDrawer: {

  }
});

export default function TemporaryDrawer({setCategory, setLastDoc}) {
  const location=useLocation().pathname;
  const history=useHistory();

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function getIcon(index)
  {
    switch(index)
    {
      case 0:
        return <FiberNewIcon/>

      case 1:
        return <EngineeringIcon/>;

      case 2:
        return <HealthAndSafetyIcon/>;

      case 3:
        return <PsychologyIcon/>;

      case 4:
        return <ScienceIcon/>;

      case 5:
        return <ImportContactsIcon/>;

      case 6:
        return <SportsHandballIcon/>;
    }
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <List>
      <ListItem>
        <ListItemText primary={"Categories"}  />
      </ListItem>
    </List>
    <Divider />
    <List>
      {Categories.map((text, index) => (
        <ListItem button key={text} onClick={()=>{
          if(location=="/")
          {
            setCategory(text);
            setLastDoc("");
          }

          else
          {
            history.push({ pathname: "/", state: text});   
          }

        }}>
          <ListItemIcon>{getIcon(index)}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
      <Divider />
      <List>
        <ListItem button key={"Github"}>
          <ListItemIcon><GitHubIcon/></ListItemIcon>
          <ListItemText primary={"Github"} onClick={()=> window.open("https://github.com/andresrodriguez55?tab=repositories", "_blank")}/>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div> 
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}><MenuOpenIcon/></Button>
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)} 
            classes={{paper: classes.MuiDrawer}}>
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
