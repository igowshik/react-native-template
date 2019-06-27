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
import { Container, Tab, Tabs, TabHeading } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Searchbar, Text } from 'react-native-paper';
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
  selectConexionNoteFilter,
} from '../../selectors';

import {
  getConexionsNotesAction,
  getConexionDetails,
  setNoteFilter,
} from '../../actions';
import ProfileView from './ProfileView';
import Notes from './Notes';

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: INDIVIDUAL,
      firstQuery: '',
      fromDateVisible: false,
      toDateVisible: false,
    };
  }

  componentDidMount() {
    const {
      navigation,
      dispatchSetGlobalLoaderState,
      dispatchGetConexionNotes,
      dispatchGetConexionDetails,
      dispatchSetConexionNoteFilter,
    } = this.props;
    const selectedValue = navigation.getParam('selectedValue', 'NO-SELECT');
    // const selectedId = navigation.getParam('selectedId', 'NO-ID');
    this.setState({
      selected: selectedValue ? INDIVIDUAL : ORGANIZATION,
    });

    dispatchSetGlobalLoaderState(true);
    dispatchSetConexionNoteFilter({
      ConexionId: '',
      StartDate: getDateByFormat(getDateBefore(30), 'L'),
      EndDate: getDateByFormat(new Date(new Date().setHours(24, 0, 0, 0)), 'L'),
    });
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
    const { dispatchSetConexionNoteFilter, noteFilters } = this.props;
    if (fromDateVisible) {
      dispatchSetConexionNoteFilter({
        ...noteFilters,
        StartDate: getDateByFormat(date, 'L'),
      });
    }
    if (toDateVisible) {
      dispatchSetConexionNoteFilter({
        ...noteFilters,
        EndDate: getDateByFormat(date, 'L'),
      });
    }
    this.hideDateTimePicker();
  };

  hideDateTimePicker = () => {
    const { fromDateVisible, toDateVisible } = this.state;
    if (fromDateVisible) this.setState({ fromDateVisible: false });
    if (toDateVisible) this.setState({ toDateVisible: false });
  };

  getSelectedDate = () => {
    const { fromDateVisible, toDateVisible } = this.state;
    const { noteFilters } = this.props;
    if (fromDateVisible) return new Date(noteFilters.StartDate);
    if (toDateVisible) return new Date(noteFilters.EndDate);
    return new Date();
  };

  applyDateFilter = () => {
    const { dispatchGetConexionNotes } = this.props;
    this.noteRef.current._clearNoteList();
    dispatchGetConexionNotes();
  };

  render() {
    const { selected, firstQuery } = this.state;
    const { loaderState, toastVisible, toast, noteFilters } = this.props;
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
                  <FontAwesome5
                    name="calendar-alt"
                    color="#696969"
                    size={22}
                    style={{ paddingLeft: 5 }}
                    brand
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingLeft: 5,
                    }}
                  >
                    From:{' '}
                  </Text>
                  <Text style={{ color: colors.primaryColorSet[0] }}>
                    {getDateByFormat(noteFilters.StartDate, 'L')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.showToDatePicker}
                  style={Styles.dateField}
                >
                  <FontAwesome5
                    name="calendar-alt"
                    color="#696969"
                    size={22}
                    brand
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingLeft: 5,
                    }}
                  >
                    To:{' '}
                  </Text>
                  <Text style={{ color: colors.primaryColorSet[0] }}>
                    {getDateByFormat(noteFilters.EndDate, 'L')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.applyDateFilter}
                  style={{ alignSelf: 'center' }}
                >
                  <FontAwesome5
                    name="filter"
                    color="#2D2D2D"
                    size={28}
                    brand
                    style={{ paddingRight: 15 }}
                  />
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
                conexionNotes={this.props.conexionNotes}
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
  dispatchSetConexionNoteFilter: PropTypes.func.isRequired,
  noteFilters: PropTypes.object.isRequired,
  conexionNotes: PropTypes.array,
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
  noteFilters: selectConexionNoteFilter(),
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
  dispatchSetConexionNoteFilter: noteFilter =>
    dispatch(setNoteFilter(noteFilter)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(DetailScreen);
