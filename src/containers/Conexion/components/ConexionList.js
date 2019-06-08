import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, Avatar } from 'react-native-paper';

// Absolute imports
import LottieListLoader from 'cnxapp/src/components/Lotties/LottieListLoader';
import ScrollView from 'cnxapp/src/components/ScrollView';
import * as Colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import { listViewStyle } from '../styles';

class ConexionList extends React.Component {
  getIndSubDetails = conexion => {
    let sub = '';
    if (conexion.Organization) {
      sub += `${conexion.Organization.Name.trim()}, `;
    }
    if (conexion.BusinessEmailAddress) {
      sub += `${conexion.BusinessEmailAddress.trim()}, `;
    }
    if (conexion.BusinessTelephoneNumber) {
      sub += `${conexion.BusinessTelephoneNumber.trim()}`;
    }
    return sub;
  };

  getOrgSubDetails = conexion => {
    let sub = '';
    if (conexion.BusinessHomePage) {
      sub += `${conexion.BusinessHomePage.trim()}, `;
    }
    if (conexion.BusinessTelephoneNumber) {
      sub += `${conexion.BusinessTelephoneNumber.trim()}`;
    }
    return sub;
  };

  getIndAvatarText = name => {
    const nameSplit = name.toUpperCase().split(' ');
    const firstName = nameSplit[0].split('')[0];
    const lastName = nameSplit[1].split('')[0];
    return firstName + lastName;
  };

  getOrgAvatarText = name => {
    const nameSplit = name.toUpperCase().split('')[0];
    return nameSplit;
  };

  renderIndList = () => {
    const { conexioListData, clickListItemHandler } = this.props;
    if (conexioListData) {
      return conexioListData.map(conexion => (
        <Card
          key={conexion.ConexionId}
          onPress={() => {
            clickListItemHandler(conexion.ConexionId);
          }}
          style={listViewStyle.cardMargin}
          elevation={2}
        >
          <Card.Title
            title={conexion.DisplayName.trim()}
            subtitle={this.getIndSubDetails(conexion)}
            left={props => (
              <Avatar.Text
                {...props}
                size={50}
                label={this.getIndAvatarText(conexion.DisplayName.trim())}
                style={{ backgroundColor: Colors.PURPLE }}
              />
            )}
          />
        </Card>
      ));
    }
    return null;
  };

  renderOrgList = () => {
    const { conexioListData, clickListItemHandler } = this.props;
    if (conexioListData) {
      return conexioListData.map(conexion => (
        <Card
          key={conexion.ConexionId}
          onPress={() => {
            clickListItemHandler(conexion.ConexionId);
          }}
          style={listViewStyle.cardMargin}
          elevation={2}
        >
          <Card.Title
            title={conexion.Name.trim()}
            subtitle={this.getOrgSubDetails(conexion)}
            left={props => (
              <Avatar.Text
                {...props}
                size={50}
                label={this.getOrgAvatarText(conexion.Name.trim())}
                style={{ backgroundColor: Colors.PURPLE }}
              />
            )}
          />
        </Card>
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
          this.getRenderPart()
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
