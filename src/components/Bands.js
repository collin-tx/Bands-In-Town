import React, { Component } from 'react'

//const key = `e05af0502aeaed5318fb524108b1c7df`;

export class Bands extends Component {
    
    state = {
        value: '',
        loading: false,
        artistData: {},
        eventData: {},
        error: ''
    }
    
    componentDidMount() {

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
        this.setState({ value: '', loading: true})
    }

    getArtistInfo = (artist) => {
        const url = `https://rest.bandsintown.com/artists/${artist}?app_id=e05af0502aeaed5318fb524108b1c7df`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            this.setState({ artistData: data })
        })
    }

    getEventData = (artist) => {
        const url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=e05af0502aeaed5318fb524108b1c7df&date=upcoming`;
        //if (this.state.artistData.upcoming_event_count > 0){
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            this.setState({eventData: data[0], loading: false})
        })
    } 
    //}

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' onChange={this.handleChange} value={this.state.value} />
                    </form>
                </div>
                <h5>{this.state.loading ? "Loading..." : ''}</h5>
                <h2>{this.state.artistData.name}</h2>
                <img src={this.state.artistData.image_url} alt={this.state.artistData.name && "photo of" + this.state.artistData.name} />
                <p>upcoming events: {this.state.artistData.upcoming_event_count}</p>
                <p>next show: {this.state.artistData.upcoming_event_count > 0 ? 
                this.state.eventData.venue && this.state.eventData.venue.name + " in " 
                + this.state.eventData.venue.city + ", " + this.state.eventData.venue.region + " "
                + this.state.eventData.venue.country : ''}</p>
            </div>
        )
    }
}

export default Bands
