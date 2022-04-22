import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DataObjectIcon from '@mui/icons-material/DataObject';
import axios from "axios";

function Search() {
  const location = useLocation();
  const searchitems = location.state.character;
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [ourData, setOurData] = useState([]);

  useEffect(() => {
    axios(`https://swapi.dev/api/people/`)
      .then((result) => {
        setOurData(result.data.results);
      })
      .catch((err) => {
        return err;
      });
  }, []);
  useEffect(() => {
    setList(ourData);
    setList(
      ourData.filter((each) => {
        return each.name.search(searchitems) > -1;
      })
    );
  }, [setList, ourData, searchitems]);

  const characters =
    list.length === 0 ? (
      <div className="App, App-header" style={{color : "grey"}}> No user Data found <DataObjectIcon /></div>
    ) : (
      list.map((each, index) => {
        return (
          <div key={index} style={{ marginLeft: "100px" }}>
            <div >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 460,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={each.name} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={each.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Height
                        </Typography>
                        {` - ${each.height}`}
                        <br />
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Skin Color
                        </Typography>
                        {` - ${each.skin_color}`}
                      </React.Fragment>
                    }
                  />
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label="Read More"
                      key={index}
                      onClick={() => {
                        navigate("/character", {
                          state: { id: index, character: each },
                        });
                      }}
                    />
                  </Stack>
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </div>
          </div>
        );
      })
    );
  return <div>{characters}</div>;
}

export default Search;
