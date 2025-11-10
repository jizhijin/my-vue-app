import axios from "axios";
import type { CardEventData } from "@/composables/useFavorites";

const baseUrl = import.meta.env.VITE_API_URL;

export const getEvents = async (query:any) => {
    return await axios.post(`${baseUrl}/api/events/search`,query);
}
export const getSuggest = async (keyword:string) => {
    return await axios.get(`${baseUrl}/api/suggest?keyword=${keyword}`);
}

export const getEvent = async (id:string)=> {
    return await axios.get(`${baseUrl}/api/events/${id}`);
}

export const getSpotifyToken = async ()=> {
    return await axios.post(`https://accounts.spotify.com/api/token?json=true`,{grant_type: 'client_credentials'},{
        headers: {
            Authorization: `Basic MDYyYTZjNWRkYTRmNDRlNzllNjhmMTY5YWQwNjA1NTU6ZTk2YTM3MmQ3MDg4NDA3NGI4ODhjNDk1NWE0NDQ0YzM=`,
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        
        
    })
}

let token = ''
export const getArtistInfo = async (artistName:string)=> {
    const res = await getSpotifyToken()
    token = res.data.access_token
    return await axios.get(`https://api.spotify.com/v1/search?q=artist:${artistName}&type=artist&limit=1&offset=0`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getArtistAlbums = async (artistId:string):Promise<any>=> {
    try{
        return await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }catch(err){
        const res = await getSpotifyToken()
        token = res.data.access_token
        return await getArtistAlbums(artistId)
    }
    
}

export const addFavor = async (event:CardEventData) => {
    return await axios.post(`${baseUrl}/api/favorites`,event)
}

export const getFavor = async () => {
    return await axios.get(`${baseUrl}/api/favorites`)
}

export const deleteFavor = async (eventId:string) => {
    return await axios.delete(`${baseUrl}/api/favorites/${eventId}`)
}