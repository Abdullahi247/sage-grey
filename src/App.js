import "./App.css";
import SearchAppBar from "./Header Component";
import Homepage from "./Pages/Homepage";
import CharacterDetails from "./Pages/CharacterDetails";
import Search from './Pages/SearchResults'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";
import React, { useState } from "react";
function App() {
  const favs = [
    // {
    //   name: "Luke Skywalker",
    //   height: "172",
    //   mass: "77",
    //   hair_color: "blond",
    //   skin_color: "fair",
    //   eye_color: "blue",
    //   birth_year: "19BBY",
    //   gender: "male",
    //   homeworld: "https://swapi.dev/api/planets/1/",
    //   films: [
    //     "https://swapi.dev/api/films/1/",
    //     "https://swapi.dev/api/films/2/",
    //     "https://swapi.dev/api/films/3/",
    //     "https://swapi.dev/api/films/6/",
    //   ],
    //   species: [],
    //   vehicles: [
    //     "https://swapi.dev/api/vehicles/14/",
    //     "https://swapi.dev/api/vehicles/30/",
    //   ],
    //   starships: [
    //     "https://swapi.dev/api/starships/12/",
    //     "https://swapi.dev/api/starships/22/",
    //   ],
    //   created: "2014-12-09T13:50:51.644000Z",
    //   edited: "2014-12-20T21:17:56.891000Z",
    //   url: "https://swapi.dev/api/people/1/",
    // },
  ];
  const [Fav, setAddFav] = useState(favs);

  const addNewFav = (newFav) => {
    setAddFav([...Fav, newFav]);
  };
  const remove = (rmv) => {
    setAddFav(Fav.splice(Fav.indexOf(rmv), 1));
  };
  return (
    <Router>
      <SearchAppBar allFav={Fav} deleted={remove} />
      <br />
      <br />
      <br />
      <Routes>
        <Route
          path="/character/"
          element={
            <CharacterDetails
              addnewFav={addNewFav}
              allFav={Fav}
              deleted={remove}
            />
          }
        ></Route>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
