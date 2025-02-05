import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

// קומפוננטת TabPanel - ללא שינוי
const TabPanel = ({ children, value, index, ...other }) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`action-tabpanel-${index}`}
    aria-labelledby={`action-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </Typography>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => ({
  id: `action-tab-${index}`,
  'aria-controls': `action-tabpanel-${index}`,
});

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

// 1. קומפוננטת עורך הספר - Item One
const BookEditor = () => {
  const [text, setText] = React.useState('');
  return (
    <ReactQuill 
      theme="snow" 
      value={text} 
      onChange={setText}
      placeholder="הכנס את טקסט הספר כאן..."
    />
  );
};

// 2. קומפוננטת תכנון הספר - Item Two
const BookPlanner = () => {
  const [planText, setPlanText] = React.useState('');
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        תכנון הספר וכתיבת סקיצות
      </Typography>
      <ReactQuill 
        theme="snow" 
        value={planText} 
        onChange={setPlanText}
        placeholder="כתוב כאן את התכנון והסקיצות..."
      />
      {/* ניתן להוסיף כאן מרקרים, רשימות, או כל רכיב נוסף לפי הצורך */}
    </Box>
  );
};

// 3. קומפוננטת צ'אט לייעוץ - Item Three
const ChatConsultation = () => {
  const [messages, setMessages] = React.useState([
    { sender: 'system', text: 'ברוכים הבאים לצ\'אט הייעוץ. אם יש לך שאלות, שאל כאן.' }
  ]);
  const [newMessage, setNewMessage] = React.useState('');

  const handleSend = () => {
    if(newMessage.trim() !== ''){
      setMessages([...messages, { sender: 'user', text: newMessage }]);
      setNewMessage('');
      // כאן ניתן להוסיף אינטגרציה עם מערכת AI לניתוח השאלה
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        צ'אט ייעוץ
      </Typography>
      <Box sx={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', p: 2, mb: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={msg.text} 
                secondary={msg.sender === 'user' ? 'אתה' : 'מערכת'} 
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <TextField 
          fullWidth 
          variant="outlined" 
          placeholder="הקלד את הודעתך..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => { if(e.key === 'Enter') handleSend(); }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSend} 
          sx={{ ml: 1 }}
        >
          שלח
        </Button>
      </Box>
    </Box>
  );
};

const FloatingActionButtonZoom = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // רשימת FABs כפי שהוגדרה בדוגמא המקורית
  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: 1120,
        position: 'relative',
        minHeight: 700,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      
      {/* תוכן לכל Tab */}
      <TabPanel value={value} index={0} dir={theme.direction}>
        <BookEditor />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <BookPlanner />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <ChatConsultation />
      </TabPanel>
      
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
};

export default FloatingActionButtonZoom;
