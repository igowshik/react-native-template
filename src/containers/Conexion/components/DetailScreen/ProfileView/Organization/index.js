import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { Avatar, Surface, FAB } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

// Absolute imports
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import { CNXH1 as H1 } from 'cnxapp/src/components/Typography';
import ScrollView from 'cnxapp/src/components/ScrollView';
import * as Colors from 'cnxapp/src/utils/colorsConstants';

import { selectConexionDetails } from '../../../../selectors';
import { getEmail, getPhone, getHomePage } from '../util';
import Communication from './Communication';
import Address from './Address';
import Sharing from './Managers';

const profileBG = require('cnxapp/src/assets/images/newprofile.png');

class OrganiztionConexion extends React.Component {
  constructor(props) {
    super(props);
    this.surfaceRef = React.createRef();
  }

  render() {
    const { conexionDetails } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: Colors.BGCOLOR }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['rgba(3,0,187,1) 65%', 'rgba(7,133,244,1) 0%']}
          style={styles.linearGraident}
        >
          <ImageBackground source={profileBG} style={styles.imageBG}>
            <View style={styles.surface}>
              <Avatar.Icon
                style={{ backgroundColor: '#fff' }}
                size={120}
                icon={() => (
                  <FontAwesome5
                    name="city"
                    size={60}
                    color={Colors.PRIMARY}
                    light
                  />
                )}
              />
            </View>
            <View style={styles.headerView}>
              <H1 style={styles.headerText}>
                {`${
                  conexionDetails.DisplayName
                    ? conexionDetails.DisplayName.trim()
                    : ''
                } (${conexionDetails.ShortName})`}
              </H1>
              {getHomePage(conexionDetails.BusinessHomePage)}
              {getEmail(conexionDetails.BusinessEmailAddress)}
              {getPhone(conexionDetails.BusinessTelephoneNumber)}
            </View>
          </ImageBackground>
        </LinearGradient>
        <Surface ref={this.surfaceRef} style={styles.overlap}>
          <ScrollView>
            <Communication data={conexionDetails} />
            <Address data={conexionDetails} />
            <Sharing data={conexionDetails} />
          </ScrollView>
        </Surface>
        <FAB style={styles.fab} icon="edit" onPress={() => {}} />
      </View>
    );
  }
}

OrganiztionConexion.propTypes = {
  conexionDetails: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  surface: {
    height: 100,
    width: 100,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    margin: 10,
    marginTop: 10,
    marginLeft: 50,
  },
  overlap: {
    marginTop: -15,
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#F7F9F9',
    elevation: 4,
  },
  linearGraident: {
    height: 180,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerView: {
    flexDirection: 'column',
    alignContent: 'center',
    marginLeft: 25,
    marginTop: 20,
  },
  headerText: {
    color: '#fff',
    margin: 5,
  },
  iconRoundBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  imageBG: {
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.SECONDARY,
  },
});

const mapStateToProps = createStructuredSelector({
  conexionDetails: selectConexionDetails(),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(OrganiztionConexion);
