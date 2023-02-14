import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import React from "react";

export default function TabsCustom({ tabs }) {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);

  const AntTabs = withStyles({
    root: {
      borderBottom: "1px solid #e8e8e8",
    },
    indicator: {
      backgroundColor: "#1890ff",
    },
  })(Tabs);

  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: "none",
      fontSize: 16,
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&$selected": {
        color: "#1890ff",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "#40a9ff",
      },
    },
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper>
      <AntTabs
        value={tabValue}
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        {tabs.title.map((item, index) => (
          <AntTab label={item} {...a11yProps(index)} key={"tab" + index} />
        ))}
      </AntTabs>
      {tabs.content.map((content, index) => {
        return (
          <TabPanel
            value={tabValue}
            index={index}
            dir={theme.direction}
            key={"content" + index}
          >
            {content}
          </TabPanel>
        );
      })}
    </Paper>
  );
}
