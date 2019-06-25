import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import Lo from 'lodash';
// Absolute imports
import LottieListLoader from 'cnxapp/src/components/Lotties/LottieListLoader';
import ScrollView from 'cnxapp/src/components/ScrollView';
// import * as Colors from 'cnxapp/src/utils/colorsConstants';

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

  getIndAvatarText = (firstName, lastName) => {
    if (firstName && lastName) {
      const fn = firstName.toUpperCase().split('')[0];
      const ln = lastName.toUpperCase().split('')[0];
      return fn + ln;
    }
    return '';
  };

  getOrgAvatarText = name => {
    const nameSplit = name.toUpperCase().split('')[0];
    return nameSplit;
  };

  renderIndList = () => {
    const { conexioListData, clickListItemHandler } = this.props;
    if (!Lo.isEmpty(conexioListData)) {
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
                label={this.getIndAvatarText(conexion.Name, conexion.LastName)}
                style={{ backgroundColor: '#A70594' }}
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
                style={{ backgroundColor: '#A70594' }}
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
    const { conexioListData } = this.props;
    if (conexioListData === false) {
      return (
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            paddingTop: 10,
          }}
        >
          No data to display
        </Text>
      );
    }
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
  conexioListData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  clickListItemHandler: PropTypes.func,
  loader: PropTypes.bool.isRequired,
};

export default ConexionList;
