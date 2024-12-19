export class ApiService {
	static SPOTIFY_SEARCH = 'https://api.spotify.com/v1/search';
	static FLASK_SERVER = 'http://localhost:5000';
	static NODE_SERVER = 'http://localhost:8888';
	static SPOTIFY_LOGIN = `${this.NODE_SERVER}/api/spotify/login`;
}
