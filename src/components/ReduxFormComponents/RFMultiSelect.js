import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MultiSelect from 'react-native-multiple-select';

import * as Colors from 'cnxapp/src/utils/colorsConstants';
import * as fonts from 'cnxapp/src/utils/font-list';

export default class MultiSelector extends Component {
  constructor(props) {
    super(props);
    this.multiSelect = React.createRef();
  }

  render() {
    const {
      input,
      label,
      required,
      items,
      searchText,
      buttonText,
      ...inputProps
    } = this.props;

    return (
      <View style={styles.parentView}>
        <MultiSelect
          {...inputProps}
          items={items}
          uniqueKey="key"
          ref={component => {
            this.multiSelect = component;
          }}
          onSelectedItemsChange={input.onChange}
          selectedItems={typeof input.value !== 'string' ? input.value : []}
          selectText={required ? `${label}*` : label}
          searchInputPlaceholderText={searchText || 'Search list...'}
          altFontFamily={fonts.MONTSERRAT}
          itemFontFamily={fonts.MONTSERRAT}
          fontFamily={fonts.MONTSERRAT}
          selectedItemFontFamily={fonts.MONTSERRAT}
          tagRemoveIconColor={Colors.PURPLE}
          tagBorderColor={Colors.PURPLE}
          tagTextColor="rgba(0, 0, 0, 0.7)"
          selectedItemTextColor={Colors.PRIMARY}
          selectedItemIconColor={Colors.PRIMARY}
          itemTextColor="rgba(0, 0, 0, 0.5)"
          displayKey="label"
          submitButtonColor={Colors.PURPLE}
          submitButtonText={buttonText || 'Done'}
          styleTextDropdown={styles.label}
          searchInputStyle={styles.label}
          styleTextDropdownSelected={styles.label}
          styleListContainer={{ height: 200, overflow: 'scroll' }}
        />
      </View>
    );
  }
}

MultiSelector.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  items: PropTypes.array.isRequired,
  searchText: PropTypes.string,
  buttonText: PropTypes.string,
};

const styles = StyleSheet.create({
  dropDown: {
    margin: 8,
    marginTop: 0,
    marginBottom: 0,
    fontFamily: fonts.MONTSERRAT,
  },
  parentView: {
    flex: 1,
    margin: 10,
    marginBottom: 0,
    marginTop: 0,
  },
  picker: {
    fontFamily: fonts.MONTSERRAT,
  },
  label: {
    fontFamily: fonts.MONTSERRAT,
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  font: {
    fontFamily: fonts.MONTSERRAT,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
  listContainer: {
    maxHeight: 300,
  },
});
