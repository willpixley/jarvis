import requests
from api_service import ApiService
def playTrack(search):
    query_params = {
        'search': search
    }
    requests.get(ApiService.SEARCH_TRACK, params=query_params)

def playArtist(search):
    query_params = {
        'search': search
    }
    requests.get(ApiService.SEARCH_ARTIST, params=query_params)

def playPlaylist(search):
    query_params = {
        'search': search
    }
    requests.get(ApiService.SEARCH_PLAYLIST, params=query_params)


playPlaylist("Gunna? I hardly know ha")



    
