import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import CakeIcon from '@mui/icons-material/Cake'
import DateRangeIcon from '@mui/icons-material/DateRange'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import WcIcon from '@mui/icons-material/Wc'
import HailIcon from '@mui/icons-material/Hail'
import HeightIcon from '@mui/icons-material/Height'
import CottageIcon from '@mui/icons-material/Cottage'
import SpaIcon from '@mui/icons-material/Spa'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BoyIcon from '@mui/icons-material/Boy'
import GradeIcon from '@mui/icons-material/Grade'
import SailingIcon from '@mui/icons-material/Sailing'
import LanguageIcon from '@mui/icons-material/Language'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import axios from 'axios'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import Chip from '@mui/material/Chip'
import DeleteIcon from '@mui/icons-material/Delete'

function stringToColor (string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar (name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}

function CharacterDetails (props) {
  const location = useLocation()
  const short = location.state.character
  const [open, setOpen] = useState(false)
  const [films, setFilms] = useState([])
  const [addd, setaddd] = useState('')
  const [URI, setURI] = useState("")
  const [vehicles, setVehicle] = useState("")
  const [home, setHome] = useState("")
  const [spices, setSpicies] = useState("")
  useEffect(() => {
    for (let i = 0; i < short.films.length; i++) {
      const uri = short.films[i]
      axios(`${uri}`)
        .then(result => {
          setFilms(prev => [...prev, result.data])
        })
        .finally()
    }
    for (let i = 0; i < short.starships.length; i++) {

    const uuurrll = (short.starships[i])
    axios(`${uuurrll}`)
    .then(result => {
        setURI(result.data.name)
    })
    .catch(err =>
        err
        )
    .finally()
    }
    for (let i = 0; i < short.homeworld.length; i++) {

    const vehicle = (short.homeworld)
    axios(`${vehicle}`)
    .then(result => {

        setHome(result.data.name)
    })
    .catch(err =>
        err
        )
    .finally()
    }
    for (let i = 0; i < short.species.length; i++) {

    const vehicle = (short.species[i])
    axios(`${vehicle}`)
    .then(result => {

        setSpicies(result.data.name)
    })
    .catch(err =>
        err
        )
    .finally()
    }
    for (let i = 0; i < short.vehicles.length; i++) {

    const vehicle = (short.vehicles[i])
    axios(`${vehicle}`)
    .then(result => {

        setVehicle(result.data.name)
    })
    .catch(err =>
        err
        )
    .finally()
    }
  }, [short.films, short.vehicles, short.starships,  short.homeworld, short.species])
  function handleDelete () {
    props.deleted(short)
    setaddd('')
  }
  function handleFave () {
    if (props.allFav.indexOf(short) === -1) {
      props.addnewFav(short)
      setaddd(
        <Stack direction='row' spacing={1}>
          <Chip
            label='Added to Favorite'
            onDelete={handleDelete}
            deleteIcon={<DeleteIcon />}
          />
        </Stack>
      )
    } else {
      console.log('Added already')
    }
  }

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <div style={{ marginLeft: '100px', marginTop: '70px' }}>
      <div style={{ display: 'flex', width: '500px' }}>
        <div>
          <Stack direction='row' spacing={2}>
            <Avatar {...stringAvatar(`${short.name} ...`)} />
          </Stack>
          <h3>{short.name}</h3>
        </div>
        <div>
          <Stack>
            <Button
              variant='outlined'
              onClick={handleFave}
              startIcon={<FavoriteTwoToneIcon />}
            >
              Favorite
            </Button>
          </Stack>
          <br />
          {addd}
        </div>
      </div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <div style={{ display: 'flex' }}>
          <div>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CakeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Birthday' secondary={short.birth_year} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DateRangeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Date Created' secondary={short.created} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Edited' secondary={short.edited} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <RemoveRedEyeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Eye' secondary={short.eye_color} />
            </ListItem>
            <ListItemButton onClick={handleClick}>
              <ListItemAvatar>
                <Avatar>
                  <LiveTvIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Films' />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
              {films.map((eachfilm, index) => {
                return (
                  <List component='div' disablePadding key={index}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={eachfilm.title} />
                    </ListItemButton>
                  </List>
                )
              })}
            </Collapse>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WcIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Gender' secondary={short.gender} />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Hair Icon' secondary={short.hair_color} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HeightIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Height' secondary={short.height} />
            </ListItem>
          </div>
          <div>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CottageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Home World' secondary={home} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SpaIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Mass' secondary={short.mass} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Name' secondary={short.name} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BoyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Skin Color' secondary={short.skin_color} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GradeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Species' secondary={spices} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SailingIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Starships' secondary={URI} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LanguageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='URl' secondary={short.url} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DirectionsCarIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Vehicles' secondary={vehicles} />
            </ListItem>
          </div>
        </div>
      </List>
    </div>
  )
}

export default CharacterDetails
