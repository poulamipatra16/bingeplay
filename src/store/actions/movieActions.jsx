export {removemovie} from "../reducers/movieSlice";
//import removemovie and export it immediately from this file. Why? Because, no one should get hold of reducer files. If we export removemovie action from there, one will get to know the filepath of reducer files. Here, sole work of removemovie is to set the state to null hence we get the option not to bring it here as we have no argument to pass that we can access through action.payload. But for the sake of data privacy it's important to export it from here. So "export" keyword imports our action and exports it immediately.
import axios from "../../utils/axios";
import { loadmovie} from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async(dispatch, getState) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
          const translations = await axios.get(`/movie/${id}/translations`);
        const details = {
            detail: detail.data,
            externalid: externalid.data.results,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
            translations: translations.data.translations.map(t=>t.english_name)
        }
       dispatch(loadmovie(details))
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}