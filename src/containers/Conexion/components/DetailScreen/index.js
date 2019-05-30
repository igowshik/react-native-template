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

// Absolute imports
import { HorizDivider } from 'cnxapp/src/components/CNXDividers';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import { CNXText } from 'cnxapp/src/components/CNXTexts';
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
} from '../../selectors';
import { getConexionsNotesAction } from '../../actions';
import ConexionProfileView from './ConexionProfileView';
import Notes from './Notes';

class DetailScreen extends React.Component {
  state = {
    selected: INDIVIDUAL,
    conexionProfile: null,
    firstQuery: '',
  };

  componentDidMount() {
    const {
      indConexions,
      orgConexions,
      navigation,
      setGlobalLoaderState,
      getConexionNotes,
    } = this.props;
    setGlobalLoaderState(true);
    const selectedValue = navigation.getParam('selectedValue', 'NO-SELECT');
    const selectedId = navigation.getParam('selectedId', 'NO-ID');
    let conexionData;
    if (selectedValue)
      conexionData = indConexions.filter(d => d.ConexionId === selectedId);
    else conexionData = orgConexions.filter(d => d.ConexionId === selectedId);
    this.setState({
      conexionProfile: conexionData[0],
      selected: selectedValue ? INDIVIDUAL : ORGANIZATION,
    });
    getConexionNotes(selectedId);
  }

  searchConexions = searchText => {
    this.setState({ firstQuery: searchText });
  };

  render() {
    const { selected, conexionProfile, firstQuery } = this.state;
    return (
      <Container>
        {/* <Dashboard /> */}
        <HorizDivider />
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <FontAwesome5 name="info-circle" color="#fff" size={20} brand />
                <Text
                  style={
                    (Styles.textColor, { fontFamily: 'Montserrat-Regular' })
                  }
                >
                  Details
                </Text>
              </TabHeading>
            }
          >
            <ConexionProfileView
              conexionProfile={conexionProfile}
              selectedValue={selected}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: 'transparent' }}>
                <FontAwesome5 name="sticky-note" color="#fff" size={20} brand />
                <Text
                  style={
                    (Styles.textColor, { fontFamily: 'Montserrat-Regular' })
                  }
                >
                  Notes
                </Text>
              </TabHeading>
            }
          >
            <Searchbar
              placeholder="Search conexions"
              onChangeText={query => this.searchConexions(query)}
              value={firstQuery}
              style={Styles.searchbar}
            />
            <Notes conexionNotes={this.props.conexionNotes} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: 'transparent' }}>
                <FontAwesome5 name="share-alt" color="#fff" size={20} brand />
                <Text
                  style={
                    (Styles.textColor, { fontFamily: 'Montserrat-Regular' })
                  }
                >
                  Sharing
                </Text>
              </TabHeading>
            }
          >
            <CNXText>Tab 3</CNXText>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

DetailScreen.propTypes = {
  navigation: PropTypes.object,
  indConexions: PropTypes.array.isRequired,
  orgConexions: PropTypes.array.isRequired,
  setGlobalLoaderState: PropTypes.func.isRequired,
  conexionNotes: PropTypes.array,
  getConexionNotes: PropTypes.func,
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
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  setGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  getConexionNotes: conexionId => dispatch(getConexionsNotesAction(conexionId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(DetailScreen);
