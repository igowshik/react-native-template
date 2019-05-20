import React from 'react';
import PropTypes from 'prop-types';
import {
  Content,
  List,
  ListItem,
  Left,
  Container,
  Body,
  Thumbnail,
  View,
} from 'native-base';

// Absolute imports
import CNXLottieListLoader from 'cnxapp/src/components/CNXLotties/CNXLottieListLoader';
import { CNXTextBold, CNXTextLight } from 'cnxapp/src/components/CNXTexts';

// Relative imports
import { listViewStyle } from '../styles';

const profile = require('cnxapp/src/assets/pastel/indavatar.png');
const organization = require('cnxapp/src/assets/pastel/orgavatar.png');

class ConexionList extends React.Component {
  state = {
    loattieLoader: true,
  };

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
            <CNXTextLight>{conexion.Organization}</CNXTextLight>
          </Body>
        </ListItem>
      ));
    }
    return null;
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loattieLoader: false });
    }, 2000);
  }

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
            <CNXTextLight>{conexion.BusinessTelephoneNumber}</CNXTextLight>
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
    const { loattieLoader } = this.state;
    return (
      <Container>
        <Content>
          {loattieLoader ? (
            <View>
              <CNXLottieListLoader />
            </View>
          ) : (
            <List>{this.getRenderPart()}</List>
          )}
        </Content>
      </Container>
    );
  }
}

ConexionList.propTypes = {
  indSelected: PropTypes.bool.isRequired,
  conexioListData: PropTypes.array,
  clickListItemHandler: PropTypes.func,
};

export default ConexionList;
