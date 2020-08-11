import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    //const response = await axios.get(url); Whole response
    //const { data } = await axios.get(url);
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    /*const modifiedData = {
      confirmed: confirmed, //data.confirmed,
      recovered: recovered, //data.recovered,
      deaths: deaths, //data.deaths,
      lastUpdate: lastUpdate, //data.lastUpdate,
    };
    As the value and the key have the same name so we can just skip the
     above way and use below
    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };*/

    return { confirmed, recovered, deaths, lastUpdate };

    //return modifiedData;
    //return response; returning the whole response
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {}
};
