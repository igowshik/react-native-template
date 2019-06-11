import React from "react";
import {View} from 'react-native';
import {
  TextInput,
  NumberInput,
  RadioInput,
} from 'cnxapp/src/components/InputField';

const CreateAddress = () =>{
  return (
    <View>
      <TextInput label = "Address Type" name = "address_type" required />
      <TextInput label = "Street" name = "street" required />
      <TextInput label = "City" name = "city" required />
      <TextInput label = "State" name = "state" required />
      <TextInput label = "Country" name = "country" required />
      <TextInput label = "Postal Area" name = "postal_area" required />
      <TextInput label = "Postal Area Extn." name = "postal_area_extn" required />
    </View>
  )
}


export default CreateAddress;