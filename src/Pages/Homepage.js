import React, { useState, useEffect } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Homepage () {
  const navigate = useNavigate()
  const [all, setAll] = useState()
  const [loadData, setData] = useState(false)
  useEffect(() => {
    axios(`https://swapi.dev/api/people/`)
      .then(result => {
        setAll(result.data.results)
      })
      .catch(err => {
        return err
      })
      .finally(() => {
        setData(true)
      })
    // }
  }, [])

  if (!loadData)
    return (
      <div className='App-logo App, App-header'>
      <HourglassBottomIcon />
      </div>
    )

  function handlePages (event, page) {

  }
  const characters = all.map((each, index) => {
    return (
      <div key={index}>
        <div>
          <List
            sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}
          >
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt={each.name} src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary={each.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Height
                    </Typography>
                    {` - ${each.height}`}
                    <br />
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Skin Color
                    </Typography>
                    {` - ${each.skin_color}`}
                  </React.Fragment>
                }
              />
              <Stack direction='row' spacing={1}>
                <Chip
                  label='Read More'
                  key={index}
                  onClick={() => {
                    navigate('/character', {
                      state: { id: index, character: each }
                    })
                  }}
                />
              </Stack>
            </ListItem>
            <Divider variant='inset' component='li' />
          </List>
        </div>
      </div>
    )
  })
  return (
    <div style={{ marginLeft: '100px' }}>
      <h2 >Characters</h2>
      {characters}
      <Stack spacing={2} >
        <Pagination count={10} color='primary' onChange={handlePages} />
      </Stack>
    </div>
  )
}

export default Homepage
