import React, { useState, useEffect } from "react";

import { TextField, Autocomplete } from "@mui/material";
import axios from "axios";

function Filters({ setDiplome, setProfession, setYears, setSearch }) {
  const [diplomeData, setDiplomeData] = useState([]);
  const [professionData, setProfessionData] = useState([]);
  const [promotionData, setPromotionData] = useState([]);
  const [reset, setReset] = useState([]);

  const getDiplome = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/diplome`, {
        withCredentials: true,
      })
      .then((res) => {
        setDiplomeData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getProfession = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profession`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfessionData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPromotion = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/promotion`, {
        withCredentials: true,
      })
      .then((res) => {
        const years = res.data.map((el) => ({
          year: el.year.toString(),
          id: el.year,
        }));
        setPromotionData(years);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDiplome();
    getProfession();
    getPromotion();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-10 md:flex-row justify-center">
        <Autocomplete
          reset={reset}
          disablePortal
          id="combo-box-demo"
          options={diplomeData}
          getOptionLabel={(option) => option.title.replace("&apos;E", "'É")}
          sx={{
            width: 300,
            mb: 1,
            "@media screen and (min-width: 48em)": {
              mr: 1,
            },
          }}
          onChange={(e, diplome) => {
            if (diplome === null) {
              setDiplome([]);
              setReset([]);
            } else {
              setDiplome(diplome.id);
              setReset([]);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filtrer par diplôme"
              color="primary"
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={professionData}
          getOptionLabel={(option) => option.job.replace("&apos;", "'")}
          sx={{
            width: 300,
            mb: 1,
            "@media screen and (min-width: 48em)": {
              mr: 1,
            },
          }}
          onChange={(e, profession) => {
            if (profession === null) {
              setProfession([]);
              setReset([]);
            } else {
              setProfession(profession.id);
              setReset([]);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filtrer par secteur professionnel"
              color="primary"
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={promotionData}
          getOptionLabel={(option) => option.year}
          sx={{
            width: 300,
            mb: 1,
            "@media screen and (min-width: 48em)": {
              mr: 1,
            },
          }}
          onChange={(e, years) => {
            if (years === null) {
              setYears([]);
              setReset([]);
            } else {
              setYears(years.id);
              setReset([]);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filtrer par promotion"
              color="primary"
            />
          )}
        />
      </div>
      <div className="flex justify-center m-2">
        <TextField
          id="filled-basic"
          label="Recherche par nom"
          variant="filled"
          sx={{
            width: 300,
            "@media screen and (min-width: 48em)": {
              width: 400,
            },
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </>
  );
}

export default Filters;
