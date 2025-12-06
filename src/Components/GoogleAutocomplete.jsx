import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./GoogleAutocomplete.css";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", errorMessage: "" };
  }

  handleChange = (address) => {
    this.setState({ address, errorMessage: "" });
  };

  handleSelect = (address) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => {
        console.log("Geocoded:", results[0].formatted_address);
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        console.log("Coordinates:", latLng);
        if (this.props.placeholder === "Origin")
          this.props.setOrigin(JSON.stringify(latLng));
        else {
          this.props.setDestination(JSON.stringify(latLng));
        }
      })
      .catch((error) => {
        console.error("Geocoding Error", error);
        this.setState({
          errorMessage: "Address selection failed. Check API configuration.",
        });
      });
  };

  onError = (status, clearSuggestions) => {
    console.error("Google Maps API Error:", status);
    this.setState({ errorMessage: "Google Maps API Error: " + status });
    clearSuggestions();
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.onError}
        debounce={500}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="search-box-container">
            <input
              {...getInputProps({
                placeholder: `Search ${this.props.placeholder}...`,
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {this.state.errorMessage && (
                <div
                  className="error-message"
                  style={{ color: "red", padding: "5px" }}
                >
                  {this.state.errorMessage}
                </div>
              )}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                    key={suggestion.description}
                  >
                    <span className="suggestion-text">
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
