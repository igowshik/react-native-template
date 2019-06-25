/**
 * Details Screen main js file
 * Added by Selvam K
 */
// Native imports
import React from 'react';
import PropTypes from 'prop-types';

// Package imports
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { Container, Tab, Tabs, TabHeading, Text } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';

// Absolute imports
import { HorizDivider } from 'cnxapp/src/components/Dividers';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import Loader from 'cnxapp/src/components/Loader';
import Snackbar from 'cnxapp/src/components/Snackbar';

// import * as Colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import { Styles } from './styles';
// import Dashboard from './Dashboard';
import { INDIVIDUAL, ORGANIZATION } from '../../constants';
import {
  selectToken,
  selectIndConexion,
  selectOrgConexion,
  selectGlobalLoader,
  selectConexionNotesData,
  selectToastVisibility,
  selectToastData,
} from '../../selectors';
import { getConexionsNotesAction, getConexionDetails } from '../../actions';
import ProfileView from './ProfileView';
import Notes from './Notes';

class DetailScreen extends React.Component {
  state = {
    selected: INDIVIDUAL,
    firstQuery: '',
  };

  componentDidMount() {
    const {
      navigation,
      dispatchSetGlobalLoaderState,
      dispatchGetConexionNotes,
      dispatchGetConexionDetails,
    } = this.props;
    const selectedValue = navigation.getParam('selectedValue', 'NO-SELECT');
    // const selectedId = navigation.getParam('selectedId', 'NO-ID');
    this.setState({
      selected: selectedValue ? INDIVIDUAL : ORGANIZATION,
    });

    dispatchSetGlobalLoaderState(true);
    dispatchGetConexionNotes();
    dispatchGetConexionDetails();
  }

  searchConexions = searchText => {
    this.setState({ firstQuery: searchText });
  };

  render() {
    const { selected, firstQuery } = this.state;
    const { loaderState, toastVisible, toast } = this.props;
    return (
      <Container>
        {/* <Dashboard /> */}
        <HorizDivider />
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <FontAwesome5 name="info-circle" color="#fff" size={20} brand />
                <Text style={Styles.textColor}>Profile</Text>
              </TabHeading>
            }
          >
            {loaderState ? (
              <View>
                <Loader
                  showLoader={loaderState}
                  loaderTitle="Conexion"
                  loadingText="Loading conexion details..."
                />
              </View>
            ) : (
              <ProfileView selectedValue={selected} />
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <FontAwesome5 name="sticky-note" color="#fff" size={20} brand />
                <Text style={Styles.textColor}>Notes</Text>
              </TabHeading>
            }
          >
            <Searchbar
              placeholder="Search notes"
              onChangeText={query => this.searchConexions(query)}
              value={firstQuery}
              style={Styles.searchbar}
            />
            {loaderState ? (
              <View>
                <Loader
                  showLoader={loaderState}
                  loaderTitle="Conexion"
                  loadingText="Loading notes..."
                />
              </View>
            ) : (
              <Notes />
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <FontAwesome5 name="history" color="#fff" size={20} light />
                <Text style={Styles.textColor}>Timeline</Text>
              </TabHeading>
            }
          >
            <Searchbar
              placeholder="Search timeline"
              onChangeText={query => this.searchConexions(query)}
              value={firstQuery}
              style={Styles.searchbar}
            />
            {loaderState ? (
              <View>
                <Loader
                  showLoader={loaderState}
                  loaderTitle="Conexion"
                  loadingText="Loading timeline..."
                />
              </View>
            ) : (
              <Notes />
            )}
          </Tab>
        </Tabs>
        <Snackbar toastVisible={toastVisible} toast={toast} />
      </Container>
    );
  }
}

DetailScreen.propTypes = {
  navigation: PropTypes.object,
  dispatchSetGlobalLoaderState: PropTypes.func.isRequired,
  dispatchGetConexionNotes: PropTypes.func,
  dispatchGetConexionDetails: PropTypes.func.isRequired,
  loaderState: PropTypes.bool.isRequired,
  toastVisible: PropTypes.bool.isRequired,
  toast: PropTypes.object.isRequired,
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  accessToken: selectToken(),
  loaderState: selectGlobalLoader(),
  indConexions: selectIndConexion(),
  orgConexions: selectOrgConexion(),
  conexionNotes: selectConexionNotesData(),
  toastVisible: selectToastVisibility(),
  toast: selectToastData(),
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  dispatchSetGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  dispatchGetConexionNotes: () => dispatch(getConexionsNotesAction()),
  dispatchGetConexionDetails: () => dispatch(getConexionDetails()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(DetailScreen);
