import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// Relative imports
import { INDIVIDUAL, ORGANIZATION } from '../../../constants';
import Individual from './Individual';
import Organization from './Organization';

class ProfileView extends PureComponent {
  getProfileViewContent = () => {
    const { selectedValue } = this.props;
    if (selectedValue === INDIVIDUAL) {
      return <Individual />;
    }
    if (selectedValue === ORGANIZATION) {
      return <Organization />;
    }
    return null;
  };

  render() {
    return <View style={{ flex: 1 }}>{this.getProfileViewContent()}</View>;
  }
}

ProfileView.propTypes = {
  selectedValue: PropTypes.string.isRequired,
};

export default ProfileView;
