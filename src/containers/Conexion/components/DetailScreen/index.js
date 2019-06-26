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
import { View, TouchableOpacity } from 'react-native';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Absolute imports
import { HorizDivider } from 'cnxapp/src/components/Dividers';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import Loader from 'cnxapp/src/components/Loader';
import Snackbar from 'cnxapp/src/components/Snackbar';
import DateTimePicker from 'cnxapp/src/components/DateTimePicker';
import { getDateByFormat, getDateBefore } from 'cnxapp/src/utils/DateFormatter';

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
    fromDateVisible: false,
    toDateVisible: false,
    fromDate: null,
    toDate: null,
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
      fromDate: getDateBefore(30),
      toDate: new Date(new Date().setHours(0, 0, 0, 0)),
    });

    dispatchSetGlobalLoaderState(true);
    dispatchGetConexionNotes();
    dispatchGetConexionDetails();
  }

  searchConexions = searchText => {
    this.setState({ firstQuery: searchText });
  };

  showFromDatePicker = () => this.setState({ fromDateVisible: true });

  showToDatePicker = () => this.setState({ toDateVisible: true });

  handleDatePicked = date => {
    const { fromDateVisible, toDateVisible } = this.state;
    if (fromDateVisible) this.setState({ fromDate: date });
    if (toDateVisible) this.setState({ toDate: date });
    this.hideDateTimePicker();
  };

  hideDateTimePicker = () => {
    const { fromDateVisible, toDateVisible } = this.state;
    if (fromDateVisible) this.setState({ fromDateVisible: false });
    if (toDateVisible) this.setState({ toDateVisible: false });
  };

  getSelectedDate = () => {
    const { fromDateVisible, toDateVisible, fromDate, toDate } = this.state;
    if (fromDateVisible) return fromDate;
    if (toDateVisible) return toDate;
    return new Date();
  };

  render() {
    const { selected, firstQuery, fromDate, toDate } = this.state;
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
            <View style={Styles.searchBarContainer}>
              <Searchbar
                placeholder="Search notes"
                onChangeText={query => this.searchConexions(query)}
                value={firstQuery}
                style={Styles.searchbar}
              />
              <View style={Styles.datePickerContainer}>
                <TouchableOpacity
                  onPress={this.showFromDatePicker}
                  style={Styles.dateField}
                >
                  <Text style={{ fontWeight: 'bold' }}>From: </Text>
                  <Text style={{ color: colors.primaryColorSet[0] }}>
                    {getDateByFormat(fromDate, 'L')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.showToDatePicker}
                  style={Styles.dateField}
                >
                  <Text style={{ fontWeight: 'bold' }}>To: </Text>
                  <Text style={{ color: colors.primaryColorSet[0] }}>
                    {getDateByFormat(toDate, 'L')}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  value={this.getSelectedDate()}
                  mode="date"
                  visible={
                    this.state.fromDateVisible || this.state.toDateVisible
                  }
                  onDateSelect={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                />
              </View>
            </View>
            {loaderState ? (
              <View>
                <Loader
                  showLoader={loaderState}
                  loaderTitle="Conexion"
                  loadingText="Loading notes..."
                />
              </View>
            ) : (
              <Notes
                searchString={firstQuery}
                dateRangeFrom={getDateByFormat(fromDate, 'L')}
                dateRangeTo={getDateByFormat(toDate, 'L')}
              />
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
