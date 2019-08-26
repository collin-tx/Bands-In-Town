import React, { Component } from 'react';


export class Bands extends Component { 
    state = {
        value: '',
        loading: false,
        artistData: {},
        eventData: {},
        error: false
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const artist = this.state.value;
        this.getArtistInfo(artist);
        this.getEventData(artist);
        this.setState({ value: '', loading: true});
    }

    getArtistInfo = (artist) => {
        const url = `https://rest.bandsintown.com/artists/${artist}?app_id=e05af0502aeaed5318fb524108b1c7df`;
        fetch(url).then(response => {
            if (response.ok){
                return response.json()
            } else {
                throw new Error('something went wrong...')
            }
        })
            .then(data => {
                this.setState({ artistData: data })
        })
            .catch(error => {
                this.setState({
                    error,
                    loading: false,
                })
        });
    }

    getEventData = (artist) => {
        const url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=e05af0502aeaed5318fb524108b1c7df&date=upcoming`;
        fetch(url).then(response => {
            if (response.ok){
                return response.json();
            } else {
                throw new Error('something went wrong...')
            }
        })
            .then(data => {
                this.setState({eventData: data[0], loading: false, error: false})
        })
            .catch(error => {
                this.setState({
                    error,
                    loading: false,
                })
        });
    } 

    render() {
        return (
            <div id="artist">
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' onChange={this.handleChange} value={this.state.value} 
                        placeholder="type an artist name..." className="p-2 rounded" id="userInput" />
                        <input type='submit' className="btn btn-primary" />
                    </form>
                </div>
                <h5>{this.state.loading ? "Loading..." : ''}</h5>
                <p>{this.state.error ? "No info found" : ''}</p>
                <h2>{this.state.artistData.name}</h2>
               {this.state.artistData.name && <img className="artist-img" src={this.state.artistData.image_url} alt={this.state.artistData.name && "photo of" + this.state.artistData.name} /> }
                {/*<p>{this.state.artistData.name && "upcoming events: " + this.state.artistData.upcoming_event_count}</p>
                {this.state.eventData.venue && <p>{this.state.artistData.upcoming_event_count > 0 ? 
                "next show: " + this.state.eventData.venue.name + " in " 
                + this.state.eventData.venue.city + ", " + this.state.eventData.venue.region + " "
                + this.state.eventData.venue.country : ''}</p>}
                {this.state.eventData.lineup && <p>{this.state.artistData.upcoming_event_count > 0 ?  "Lineup: " + this.state.eventData.lineup.join(', ') : ''}</p>}*/}
            </div>
        )
    }
}

export default Bands
