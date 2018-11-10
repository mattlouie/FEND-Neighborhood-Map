import React, { Component } from 'react';
import '../App.css';

class MapNav extends Component {
    state = {
      hamburgerActive: false,
      query: ''
    }

    //Toggle Sidebar Menu (filter/query)
    onHamburgerClick = () => {
        const sidebar = document.querySelector('.map-sidebar');
        if (this.state.hamburgerActive) {
        sidebar.style.transform = 'translateX(-250px)'
        this.setState({ hamburgerActive: false });
        }
        else {
        sidebar.style.transform = 'translateX(0px)'
        this.setState({ hamburgerActive: true });
        }
    }

    render () {

      const {query, venues} = this.state

        return(
            <div>
        <div className="map-nav-container">
          <nav className="map-nav">
            <button aria-label='Hamburger Menu' tabIndex='0' className="hamburger-container" onClick={this.onHamburgerClick}>
              <div className="hamburger-bar"></div>
              <div className="hamburger-bar"></div>
              <div className="hamburger-bar"></div>
            </button>
            <div className="nav-title">
              <h1>Denver River North (RiNo) Neighborhood Breweries</h1>
              <h4>Powered by FourSquare & Google Maps</h4>
            </div>
          </nav>
        </div>
        <div className="map-sidebar">
            <input aria-label='Search Filter' className="sidebar-input" onChange={(e) => this.props.onQuery(e.target.value)}></input>
            <ol>
                {venues.map((place, index) => {
                    return <li
                    tabIndex='0'
                    role='button'
                    aria-label='Place Location'
                    key={index}
                    onClick={() => this.props.setActiveMarker(place.name)}>{place.name}
                </li>
              })}
            </ol>
          </div>
        </div>
        )
    }
}

export default MapNav
