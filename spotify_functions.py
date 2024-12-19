import requests
from api_service import ApiService
def play_track(search):
    query_params = {
        'search': search
    }
    requests.get(ApiService.SEARCH_TRACK, params=query_params)

def play_artist(search):
    query_params = {
        'search': search
    }
    requests.get(ApiService.SEARCH_ARTIST, params=query_params)

def play_playlist(search):
    query_params = {
        'search': search
    }
    requests.get(ApiService.SEARCH_PLAYLIST, params=query_params)


    
