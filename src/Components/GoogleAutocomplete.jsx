import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./GoogleAutocomplete.css";

let selectedOrigin = "";
let selectedDestination = "";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });

    if (this.props.placeholder === "Origin") {
      selectedOrigin = address;
    } else {
      selectedDestination = address;
    }
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        if (this.props.placeholder === "Origin") {
          selectedOrigin = results[0].formatted_address;
        }
        if (this.props.placeholder === "Destination") {
          selectedDestination = results[0].formatted_address;
        }

        console.log(results[0].formatted_address);
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        console.log("Success", latLng);
        if (this.props.placeholder === "Origin")
          this.props.setOrigin(JSON.stringify(latLng));
        else {
          this.props.setDestination(JSON.stringify(latLng));
        }
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: `Search ${this.props.placeholder}...`,
                className: "location-search-input",
              })}
              value={
                this.props.placeholder === "Origin"
                  ? selectedOrigin
                  : selectedDestination
              }
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#909090", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestion.description}
                  >
                    <span key={suggestion.description}>
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
