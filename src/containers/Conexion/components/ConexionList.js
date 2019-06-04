import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Left, Body, Thumbnail } from 'native-base';

import { View } from 'react-native';

// Absolute imports
import LottieListLoader from 'cnxapp/src/components/Lotties/LottieListLoader';
import { CNXTextBold, CNXTextLight } from 'cnxapp/src/components/Texts';
import ScrollView from 'cnxapp/src/components/ScrollView';

// Relative imports
import { listViewStyle } from '../styles';

const profile = require('cnxapp/src/assets/pastel/indavatar.png');
const organization = require('cnxapp/src/assets/pastel/orgavatar.png');

class ConexionList extends React.Component {
  renderIndList = () => {
    const { conexioListData, clickListItemHandler } = this.props;
    if (conexioListData) {
      return conexioListData.map(conexion => (
        <ListItem
          avatar
          key={conexion.ConexionId}
          onPress={() => {
            clickListItemHandler(conexion.ConexionId);
          }}
        >
          <Left>
            <Thumbnail source={profile} style={listViewStyle.avatar} />
          </Left>
          <Body style={listViewStyle.listBody}>
            <CNXTextBold>{conexion.DisplayName.trim()}</CNXTextBold>
            {conexion.Organization ? (
              <CNXTextLight>{conexion.Organization.Name.trim()}</CNXTextLight>
            ) : null}
            {conexion.BusinessEmailAddress ? (
              <CNXTextLight>
                {conexion.BusinessEmailAddress.trim()}
              </CNXTextLight>
            ) : null}
          </Body>
        </ListItem>
      ));
    }
    return null;
  };

  componentDidMount() {}

  renderOrgList = () => {
    const { conexioListData, clickListItemHandler } = this.props;
    if (conexioListData) {
      return conexioListData.map(conexion => (
        <ListItem
          avatar
          key={conexion.ConexionId}
          onPress={() => {
            clickListItemHandler(conexion.ConexionId);
          }}
        >
          <Left>
            <Thumbnail source={organization} style={listViewStyle.avatar} />
          </Left>
          <Body style={listViewStyle.listBody}>
            <CNXTextBold>{conexion.Name.trim()}</CNXTextBold>
            {conexion.BusinessHomePage ? (
              <CNXTextLight>{conexion.BusinessHomePage.trim()}</CNXTextLight>
            ) : null}
            {conexion.BusinessTelephoneNumber ? (
              <CNXTextLight>
                {conexion.BusinessTelephoneNumber.trim()}
              </CNXTextLight>
            ) : null}
          </Body>
        </ListItem>
      ));
    }
    return null;
  };

  getRenderPart = () => {
    const { indSelected } = this.props;
    if (indSelected) return this.renderIndList();
    return this.renderOrgList();
  };

  render() {
    const { loader } = this.props;
    return (
      <ScrollView>
        {loader ? (
          <View>
            <LottieListLoader />
          </View>
        ) : (
          <List>{this.getRenderPart()}</List>
        )}
      </ScrollView>
    );
  }
}

ConexionList.propTypes = {
  indSelected: PropTypes.bool.isRequired,
  conexioListData: PropTypes.array,
  clickListItemHandler: PropTypes.func,
  loader: PropTypes.bool.isRequired,
};

export default ConexionList;
