import React, { useEffect, useRef } from "react";
import { StyleSheet, SafeAreaView, View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const ref = useRef();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Where from"
          styles={{
            container: {
              flex: 0,
              width: "100%",
              borderRadius: 2,
              borderEndColor: "red",
              borderColor: "yellow",
            },
            textInputContainer: {
              backgroundColor: "white",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            textInput: {
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
            },
          }}
          minLength={2}
          returnKeyType={"search"}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
            // ref.current?.clear();
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          //currentLocation={true}
          // currentLocationLabel="current location"
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "navy",
    backgroundColor: "yellow",
    textAlign: "center",
  },
});
