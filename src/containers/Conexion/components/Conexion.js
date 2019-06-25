import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import {
  TouchableRipple,
  Searchbar,
  RadioButton,
  Paragraph,
} from 'react-native-paper';

// Absolute imports
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import Header from 'cnxapp/src/components/Header';
import { CNXH2, CNXH3 } from 'cnxapp/src/components/Typography';
// import Switch from 'cnxapp/src/components/Switch';
import Snackbar from 'cnxapp/src/components/Snackbar';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import ConexionList from './ConexionList';
import CreateConexions from './CreateConexions';
import {
  selectToken,
  selectIndConexion,
  selectOrgConexion,
  selectGlobalLoader,
  selectToastVisibility,
  selectToastData,
  selectIndividualModal,
} from '../selectors';

import {
  getIndConexions,
  getOrgConexions,
  saveselectedConexionId,
  getMetaData,
  setSelectedConexionType,
  setIndividualModalVisibility,
  getUserDDList,
  getOrgDDList,
} from '../actions';
import { conexionStyles as styles } from '../styles';
import { INDIVIDUAL, ORGANIZATION, ALL } from '../constants';
import FABUI from './UIComponents/FAB';

class Conexion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      indSelected: true,
      orgSelected: false,
      createConexionType: INDIVIDUAL,
      firstQuery: '',
      conexionList: [],
    };
    this.onLayout = this.onLayout.bind(this);
    this.getConexionTitle = this.getConexionTitle.bind(this);
    this.getConexionList = this.getConexionList.bind(this);
    this.setIndividualModalOpen = this.setIndividualModalOpen.bind(this);
  }

  setIndividualModalOpen = () => this.props.dispatchIndividualModalState(true);

  _onSwitchIndOrgPress = selected => {
    if (selected === INDIVIDUAL) {
      this.setState({
        indSelected: true,
        orgSelected: false,
        createConexionType: selected,
      });
      this.props.dispatchSetConexionType(INDIVIDUAL);
    } else if (selected === ORGANIZATION) {
      this.setState({
        indSelected: false,
        orgSelected: true,
        createConexionType: selected,
      });
      this.props.dispatchSetConexionType(ORGANIZATION);
    }
  };

  componentDidMount() {
    const {
      accessToken,
      setGlobalLoaderState,
      fetchOrgConexion,
      fetchIndConexion,
      fetchDropDownValues,
      dispatchGetUserDDList,
      dispatchGetOrgDDList,
    } = this.props;
    setGlobalLoaderState(true);
    fetchOrgConexion(accessToken);
    fetchIndConexion(accessToken);
    fetchDropDownValues();
    dispatchGetUserDDList();
    dispatchGetOrgDDList();
  }

  setModalOpenClose = value => {
    this.props.dispatchIndividualModalState(value);
  };

  handleConexionSelect = id => {
    const { indSelected } = this.state;
    const { navigation, dispatchSetConexionId } = this.props;
    dispatchSetConexionId(id);
    navigation.navigate('SecondScreen', {
      selectedValue: indSelected,
      selectedId: id,
    });
  };

  getIntialProfile = () => {
    const { indConexions, orgConexions } = this.props;
    const { selected } = this.state;
    if (selected === INDIVIDUAL) return indConexions[0];
    return orgConexions[0];
  };

  onLayout() {
    this.setState({
      height: Dimensions.get('window').height - 180,
    });
  }

  getConexionTitle = () => {
    const { indSelected, orgSelected } = this.state;
    if (indSelected && orgSelected) return ALL;
    if (indSelected) return INDIVIDUAL;
    return ORGANIZATION;
  };

  getConexionList = () => {
    const { indConexions, orgConexions } = this.props;
    const { indSelected, orgSelected, conexionList } = this.state;
    if (indSelected && conexionList.length === 0) return indConexions;
    if (orgSelected && conexionList.length === 0) return orgConexions;
    return conexionList;
  };

  createConexionTrigger = (modalState, conexionType) => {
    this.setState({
      createConexionType: conexionType,
    });
    this.props.dispatchIndividualModalState(modalState);
  };

  searchConexions = searchText => {
    this.setState({ firstQuery: searchText });
    const { indConexions, orgConexions } = this.props;
    const { indSelected, orgSelected } = this.state;
    if (searchText) {
      if (indSelected) {
        const filterData = indConexions.filter(report =>
          report.DisplayName.toLowerCase()
            .trim()
            .includes(searchText.toLowerCase()),
        );
        this.setState({ conexionList: filterData });
      } else if (orgSelected) {
        const filterData = orgConexions.filter(report =>
          report.Name.toLowerCase()
            .trim()
            .includes(searchText.toLowerCase()),
        );
        this.setState({ conexionList: filterData });
      }
    } else this.setState({ conexionList: [] });
  };

  render() {
    const initialIndividualValues = {
      //   ind_first_name: 'Test FN',
      //   ind_last_name: 'Test last name',
      //   ind_initial: 'FNLN',
      //   ind_title: 'DR',
      //   ind_suffix: 'I',
      //   ind_job_title: 'Tester',
      //   ind_primary_mobile: '123428732',
      ind_shared_type: 'PUBL',
      //   ind_business_phone: '9234231233',
      //   ind_business_email: 'conexus@cnxsi.com',
    };
    const { indSelected, createConexionType, firstQuery } = this.state;

    const { toastVisible, toast, loaderState, conexionModal } = this.props;
    return (
      <View>
        <View>
          <View style={styles.headerStyle}>
            <CNXH3 style={{ color: colors.DARK }}>Conexion type:</CNXH3>
            {/* <Switch
              label={INDIVIDUAL}
              selected={indSelected}
              onChange={this._onSwitchIndOrgPress}
            />
            <Switch
              label={ORGANIZATION}
              selected={orgSelected}
              onChange={this._onSwitchIndOrgPress}
            /> */}
            <View style={{ flex: 1, margin: 8, flexDirection: 'row' }}>
              <RadioButton.Group
                value={this.state.createConexionType}
                onValueChange={this._onSwitchIndOrgPress}
              >
                <TouchableRipple
                  onPress={() => {
                    this._onSwitchIndOrgPress(INDIVIDUAL);
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                    }}
                  >
                    <Paragraph>{INDIVIDUAL}</Paragraph>
                    <RadioButton value={INDIVIDUAL} />
                  </View>
                </TouchableRipple>
                <TouchableRipple
                  onPress={() => {
                    this._onSwitchIndOrgPress(ORGANIZATION);
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                    }}
                  >
                    <Paragraph>{ORGANIZATION}</Paragraph>
                    <RadioButton value={ORGANIZATION} />
                  </View>
                </TouchableRipple>
              </RadioButton.Group>
            </View>
            <CreateConexions
              modalOpen={conexionModal}
              setModalOpenClose={this.setModalOpenClose}
              conexionType={createConexionType}
              initialValues={initialIndividualValues}
            />
          </View>
          <View
            onLayout={this.onLayout}
            style={{
              height: this.state.height,
              backgroundColor: colors.BGCOLOR,
            }}
          >
            <Header>
              <CNXH2 style={{ color: '#fff' }}>
                {`${this.getConexionTitle()} Conexions`}
              </CNXH2>
            </Header>
            <Searchbar
              placeholder="Search conexions"
              onChangeText={query => this.searchConexions(query)}
              value={firstQuery}
              style={styles.searchbar}
            />
            <ConexionList
              conexioListData={this.getConexionList()}
              indSelected={indSelected}
              clickListItemHandler={this.handleConexionSelect}
              loader={loaderState}
            />
          </View>
        </View>
        <Snackbar toastVisible={toastVisible} toast={toast} />
        {this.props.isFocused ? (
          <TouchableRipple rippleColor="rgba(0, 0, 0, .3)">
            <FABUI handleConexionCreate={this.createConexionTrigger} />
          </TouchableRipple>
        ) : null}
      </View>
    );
  }
}

Conexion.propTypes = {
  accessToken: PropTypes.string.isRequired,
  fetchIndConexion: PropTypes.func.isRequired,
  fetchOrgConexion: PropTypes.func.isRequired,
  setGlobalLoaderState: PropTypes.func.isRequired,
  loaderState: PropTypes.bool.isRequired,
  indConexions: PropTypes.array.isRequired,
  orgConexions: PropTypes.array.isRequired,
  navigation: PropTypes.any,
  isFocused: PropTypes.bool.isRequired,
  toastVisible: PropTypes.bool.isRequired,
  toast: PropTypes.object.isRequired,
  dispatchSetConexionId: PropTypes.func.isRequired,
  fetchDropDownValues: PropTypes.func.isRequired,
  dispatchSetConexionType: PropTypes.func.isRequired,
  dispatchIndividualModalState: PropTypes.func.isRequired,
  conexionModal: PropTypes.bool.isRequired,
  dispatchGetUserDDList: PropTypes.func.isRequired,
  dispatchGetOrgDDList: PropTypes.func.isRequired,
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
  toastVisible: selectToastVisibility(),
  toast: selectToastData(),
  conexionModal: selectIndividualModal(),
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  fetchIndConexion: token => dispatch(getIndConexions(token)),
  fetchOrgConexion: token => dispatch(getOrgConexions(token)),
  setGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  dispatchSetConexionId: id => dispatch(saveselectedConexionId(id)),
  fetchDropDownValues: () => dispatch(getMetaData()),
  dispatchSetConexionType: type => dispatch(setSelectedConexionType(type)),
  dispatchIndividualModalState: visibility =>
    dispatch(setIndividualModalVisibility(visibility)),
  dispatchGetUserDDList: () => dispatch(getUserDDList()),
  dispatchGetOrgDDList: () => dispatch(getOrgDDList()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withNavigationFocus,
  withConnect,
)(Conexion);
