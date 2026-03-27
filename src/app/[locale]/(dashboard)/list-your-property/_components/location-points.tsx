"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import CustomInput from "./custom-input";

type LocationPointsProps = {
  latitude?: number;
  longitude?: number;
  address?: string;
  onLocationChange?: (lat: number, lng: number) => void;
  onAddressChange?: (address: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

const mapContainerStyle = {
  height: "384px",
  width: "100%",
};

const LocationPoints = ({
  latitude = 33.892_495_5,
  longitude = 35.484_094_3,
  address,
  onLocationChange,
  onAddressChange,
  error,
  disabled = false,
}: LocationPointsProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const autocompleteRef = useRef<google.maps.places.AutocompleteService | null>(null);
  
  const [lat, setLat] = useState(latitude);
  const [lng, setLng] = useState(longitude);
  const [searchInput, setSearchInput] = useState("");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [placesLoaded, setPlacesLoaded] = useState(false);

  // Load Places library dynamically
  useEffect(() => {
    if (!isLoaded) return;

    const loadPlacesLibrary = async () => {
      try {
        const google = (window as any).google;
        if (google?.maps?.importLibrary) {
          await google.maps.importLibrary("places");
          console.log("✅ Places library loaded successfully");
          setPlacesLoaded(true);
        }
      } catch (error) {
        console.error("❌ Failed to load Places library:", error);
      }
    };

    loadPlacesLibrary();
  }, [isLoaded]);

  const getAddressFromCoordinates = useCallback(
    async (newLatitude: number, newLongitude: number) => {
      if (!geocoderRef.current && typeof window !== "undefined" && window.google?.maps?.Geocoder) {
        geocoderRef.current = new window.google.maps.Geocoder();
      }

      try {
        if (!geocoderRef.current) return;
        
        const result = await geocoderRef.current.geocode({
          location: { lat: newLatitude, lng: newLongitude },
        });

        if (result.results && result.results.length > 0) {
          const address = result.results[0].formatted_address;
          onAddressChange?.(address);
          setSearchInput(address);
        }
      } catch (error) {
        console.error("Geocoding failed:", error);
      }
    },
    [onAddressChange],
  );

  const updateLocation = useCallback(
    (newLat: number, newLng: number) => {
      setLat(newLat);
      setLng(newLng);
      onLocationChange?.(newLat, newLng);
      getAddressFromCoordinates(newLat, newLng);
    },
    [onLocationChange, getAddressFromCoordinates],
  );

  const handleSearchInput = useCallback(
    async (value: string) => {
      setSearchInput(value);

      if (!value.trim()) {
        setPredictions([]);
        setShowPredictions(false);
        return;
      }

      // Wait for places to load
      if (!placesLoaded) {
        console.log("⏳ Waiting for Places library to load...");
        return;
      }

      // Create autocomplete service if needed
      if (!autocompleteRef.current) {
        try {
          const google = (window as any).google;
          autocompleteRef.current = new google.maps.places.AutocompleteService();
          console.log("✅ AutocompleteService created");
        } catch (e) {
          console.error("❌ Failed to create AutocompleteService:", e);
          return;
        }
      }

      try {
        if (!autocompleteRef.current) return;

        const result = await autocompleteRef.current.getPlacePredictions({
          input: value,
        });

        console.log(`✅ Found ${result.predictions?.length || 0} predictions for "${value}"`);
        setPredictions(result.predictions || []);
        setShowPredictions(true);
      } catch (error) {
        console.error("❌ Autocomplete error:", error);
        setPredictions([]);
      }
    },
    [placesLoaded],
  );

  const handleSelectPrediction = useCallback(
    async (placeId: string, description: string) => {
      setSearchInput(description);
      setPredictions([]);
      setShowPredictions(false);

      if (!geocoderRef.current && typeof window !== "undefined" && window.google?.maps?.Geocoder) {
        geocoderRef.current = new window.google.maps.Geocoder();
      }

      try {
        if (!geocoderRef.current) return;
        
        const result = await geocoderRef.current.geocode({ placeId });

        if (result.results && result.results.length > 0) {
          const geometry = result.results[0].geometry;
          const newLat = geometry.location.lat();
          const newLng = geometry.location.lng();
          updateLocation(newLat, newLng);

          if (mapRef.current) {
            mapRef.current.panTo(geometry.location);
            mapRef.current.setZoom(15);
          }
        }
      } catch (error) {
        console.error("❌ Place lookup error:", error);
      }
    },
    [updateLocation],
  );

  if (!isLoaded) {
    return (
      <div className="flex w-full items-center justify-center overflow-hidden rounded-[.375rem] bg-muted" style={{ height: "384px" }}>
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (disabled || !event.latLng) return;
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    updateLocation(newLat, newLng);
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (disabled || !event.latLng) return;
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    updateLocation(newLat, newLng);
  };

  return (
    <div className="w-full overflow-hidden rounded-[.375rem]">
      <div className="relative mb-4">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <CustomInput
            className="mt-0 pl-8"
            disabled={disabled}
            onChange={(e) => handleSearchInput(e.target.value)}
            onFocus={() => searchInput && setShowPredictions(true)}
            placeholder="Search for a location..."
            type="text"
            value={searchInput}
          />
        </div>

        {/* Predictions Dropdown */}
        {predictions.length > 0 && showPredictions && (
          <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-64 overflow-y-auto rounded-md border bg-background shadow-lg">
            {predictions.map((prediction) => (
              <button
                className="w-full px-4 py-2 text-left transition-colors first:rounded-t-md last:rounded-b-md hover:bg-muted"
                key={prediction.place_id}
                onClick={() => handleSelectPrediction(prediction.place_id, prediction.description)}
                type="button"
              >
                <p className="font-medium text-sm">{prediction.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <GoogleMap
        center={{ lat, lng }}
        mapContainerStyle={mapContainerStyle}
        onClick={handleMapClick}
        onLoad={(map) => { mapRef.current = map; }}
        options={{
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          zoom: 15,
          draggable: !disabled,
        }}
      >
        <Marker
          draggable={!disabled}
          onDragEnd={handleMarkerDragEnd}
          onLoad={(marker) => { markerRef.current = marker; }}
          position={{ lat, lng }}
        />
      </GoogleMap>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default LocationPoints;