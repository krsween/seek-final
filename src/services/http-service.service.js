// NG2
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
// Vendor
import 'rxjs';
// App


@Injectable()
export class HttpService {
    constructor(http: Http) {
        this.http = http;
        const API_KEY = '5b2ddbefc2dd5395532e6c5da59a71e5';

        this.baseUrl = `http://ws.audioscrobbler.com/2.0?api_key=${API_KEY}&format=json`;
    }

    getTopAlbums(artist) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.baseUrl}&method=artist.gettopalbums&artist=${artist}`)
                .map(data => data.json())
                .subscribe(
                    data => {
                        if (data && data.topalbums && data.topalbums.album) {
                            resolve(data.topalbums.album);
                        } else {
                            reject({ message: 'No top albums available.'})
                        }
                    },
                    error => {
                        reject({ message: error });
                    }
                );
        });
    }

    getSimilarArtists(artist) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.baseUrl}&method=artist.getsimilar&artist=${artist}`)
                .map(data => data.json())
                .subscribe(
                    data => {
                        if (data && data.similarartists && data.similarartists.artist) {
                            resolve(data.similarartists.artist);
                        } else {
                            reject({ message: 'No similar artists available.'})
                        }
                    },
                    error => {
                        reject({ message: error });
                    }
                );
        });
    }

    getArtistInfo(artist) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.baseUrl}&method=artist.getinfo&artist=${artist}`)
                .map(data => data.json())
                .subscribe(
                    data => {
                        if (data && data.artist) {
                            resolve(data.artist);
                        } else {
                            reject({ message: 'No artist info available.'})
                        }
                    },
                    error => {
                        reject({ message: error });
                    }
                );
        });
    }

    findArtists(query) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.baseUrl}&method=artist.search&artist=${query}`)
                .map(data => data.json())
                .subscribe(
                    data => {
                        if (data && data.results && data.results.artistmatches) {
                            resolve(data.results.artistmatches);
                        } else {
                            reject({ message: 'No artists match that query.'})
                        }
                    },
                    error => {
                        reject({ message: error });
                    }
                );
        });
    }
}

export class MockHttpService {
    getTopAlbums() {
        return new Promise((resolve, reject) => {
            resolve([]);
        })
    }
    getSimilarArtists() {
        return new Promise((resolve, reject) => {
            resolve([]);
        })
    }
    getArtistInfo() {
        return new Promise((resolve, reject) => {
            resolve([]);
        })
    }
    findArtists() {
        return new Promise((resolve, reject) => {
            resolve([]);
        })
    }
}