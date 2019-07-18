import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import {
  TouchableRipple,
  Searchbar,
  Divider,
  Menu,
  IconButton,
  Headline,
  Text,
} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Col, Row } from 'react-native-easy-grid';

// Absolute imports
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import Header from 'cnxapp/src/components/Header';
import Snackbar from 'cnxapp/src/components/Snackbar';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import Loader from 'cnxapp/src/components/Loader';

// Relative imports
import ConexionList from './ConxionList';
import CreateIndividual from './CreateIndividual';
import {
  // selectToken,
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

class PrimaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      indSelected: true,
      orgSelected: false,
      createConexionType: INDIVIDUAL,
      firstQuery: '',
      conexionList: [],
      visible: false,
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
    this.setState({ visible: false });
  };

  componentDidMount() {
    const intialPage = {
      pageSize: 20,
      pageNumber: 1,
    };
    const {
      // accessToken,
      setGlobalLoaderState,
      fetchOrgConexion,
      fetchIndConexion,
      fetchDropDownValues,
      dispatchGetUserDDList,
      dispatchGetOrgDDList,
    } = this.props;
    setGlobalLoaderState(true);
    fetchOrgConexion(intialPage);
    fetchIndConexion(intialPage);
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
      height: Dimensions.get('window').height - 120,
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
    this._onSwitchIndOrgPress(conexionType);
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
        if (filterData.length === 0) this.setState({ conexionList: false });
        else this.setState({ conexionList: filterData });
      } else if (orgSelected) {
        const filterData = orgConexions.filter(report =>
          report.Name.toLowerCase()
            .trim()
            .includes(searchText.toLowerCase()),
        );
        if (filterData.length === 0) this.setState({ conexionList: false });
        else this.setState({ conexionList: filterData });
      }
    } else this.setState({ conexionList: [] });
  };

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  render() {
    const initialIndividualValues = {
      ind_shared_type: 'PUBL',
    };
    const { indSelected, createConexionType, firstQuery } = this.state;

    const { toastVisible, toast, loaderState, conexionModal } = this.props;
    return (
      <View>
        <StatusBar hidden={false} />
        <View>
          <View style={styles.headerStyle}>
            <CreateIndividual
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
            <Header
              gradientColors={[
                'rgba(255,88,88,1) 75%',
                'rgba(255,79,165,1) 100%',
              ]}
            >
              <Row>
                <Col
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Headline
                    style={{ color: '#fff' }}
                  >{`${this.getConexionTitle()} Conexions`}</Headline>
                </Col>
                <Col
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Menu
                    visible={this.state.visible}
                    onDismiss={this._closeMenu}
                    anchor={
                      <IconButton
                        icon="more-vert"
                        color="#fff"
                        size={30}
                        onPress={this._openMenu}
                      />
                    }
                  >
                    <Menu.Item
                      icon={() => (
                        <FontAwesome5
                          style={{
                            color:
                              createConexionType === INDIVIDUAL
                                ? colors.PRIMARY
                                : '#000',
                          }}
                          name="users"
                          size={20}
                          solid={createConexionType === INDIVIDUAL}
                          light={!createConexionType === INDIVIDUAL}
                        />
                      )}
                      onPress={() => {
                        this._onSwitchIndOrgPress(INDIVIDUAL);
                      }}
                      title={
                        <Text
                          style={{
                            color:
                              createConexionType === INDIVIDUAL
                                ? colors.PRIMARY
                                : '#000',
                          }}
                        >
                          {INDIVIDUAL}
                        </Text>
                      }
                    />
                    <Divider />
                    <Menu.Item
                      icon={() => (
                        <FontAwesome5
                          style={{
                            color:
                              createConexionType === ORGANIZATION
                                ? colors.PRIMARY
                                : '#000',
                          }}
                          name="building"
                          size={20}
                          solid={createConexionType === ORGANIZATION}
                          light={!createConexionType === ORGANIZATION}
                        />
                      )}
                      onPress={() => {
                        this._onSwitchIndOrgPress(ORGANIZATION);
                      }}
                      title={
                        <Text
                          style={{
                            color:
                              createConexionType === ORGANIZATION
                                ? colors.PRIMARY
                                : '#000',
                          }}
                        >
                          {ORGANIZATION}
                        </Text>
                      }
                    />
                  </Menu>
                </Col>
              </Row>
            </Header>
            <Searchbar
              placeholder="Search conexions"
              onChangeText={query => this.searchConexions(query)}
              value={firstQuery}
              style={styles.searchbar}
            />
            <ConexionList
              conexioListData={this.getConexionList()}
              onPressItem={this.handleConexionSelect}
              indSelected={indSelected}
              loader={loaderState}
              searchText={firstQuery}
            />
            <Loader
              showLoader={loaderState}
              loaderTitle="Conexion"
              loadingText="Loading conexion list..."
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

PrimaryScreen.propTypes = {
  // accessToken: PropTypes.string.isRequired,
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
  // accessToken: selectToken(),
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
  fetchIndConexion: intialPage => dispatch(getIndConexions(intialPage)),
  fetchOrgConexion: initialPage => dispatch(getOrgConexions(initialPage)),
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
)(PrimaryScreen);
