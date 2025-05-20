export { removepeople } from "../reducers/peopleSlice";
//import removepeople and export it immediately from this file. Why? Because, no one should get hold of reducer files. If we export removepeople action from there, one will get to know the filepath of reducer files. Here, sole work of removepeople is to set the state to null hence we get the option not to bring it here as we have no argument to pass that we can access through action.payload. But for the sake of data privacy it's important to export it from here. So "export" keyword imports our action and exports it immediately.
import axios from "../../utils/axios";
import { loadpeople } from "../reducers/peopleSlice";

export const asyncloadpeople = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const details = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };
    dispatch(loadpeople(details));
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
