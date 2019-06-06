import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Content,
  ListItem,
  Left,
  Body,
  Card,
  CardItem,
  Thumbnail,
  Right,
  Text,
} from 'native-base';

// Absolute imports
import { HorizDivider } from 'cnxapp/src/components/Dividers';
import { CNXTextBold } from 'cnxapp/src/components/Texts';
import { CNXH2 } from 'cnxapp/src/components/Typography';
// import * as Colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import { INDIVIDUAL, ORGANIZATION } from '../../../constants';
import { profileViewStyles } from '../../../styles';
import IndividualConexion from './IndividualConexion';

// const profile = require('cnxapp/src/assets/pastel/indavatar.png');
const organization = require('cnxapp/src/assets/pastel/orgavatar.png');

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // height: Dimensions.get('window').height,
    };
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    this.setState({
      // height: Dimensions.get('window').height - 600,
    });
  }

  renderOrgConexionProfile = () => {
    const { conexionProfile } = this.props;
    return (
      <Card transparent style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail
              style={profileViewStyles.avatarView}
              source={organization}
            />
            <Body style={profileViewStyles.cardBodyView}>
              <CNXTextBold>{conexionProfile.Name}</CNXTextBold>
              <Text style={profileViewStyles.linkText}>
                {conexionProfile.BusinessHomePage}
              </Text>
              <Text style={profileViewStyles.extraText}>
                {conexionProfile.BusinessTelephoneNumber}
              </Text>
            </Body>
          </Left>
          <Right>
            {/* <SecondaryButton
              handleButtonClick={() => {
                this.setModalOpenClose(true);
              }}
              buttonText="Edit"
              icon="edit"
            /> */}
          </Right>
        </CardItem>
        <HorizDivider />
        <CardItem>
          <Content>
            <ListItem itemHeader first>
              <CNXH2 style={profileViewStyles.headerText}>Profile</CNXH2>
            </ListItem>
            <ListItem>
              <Left style={profileViewStyles.leftViewJustify}>
                <Text>Name</Text>
                <Text>{conexionProfile.Name}</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left style={profileViewStyles.leftViewJustify}>
                <Text>Primary Phone Number</Text>
                <Text>{conexionProfile.BusinessTelephoneNumber}</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left style={profileViewStyles.leftViewJustify}>
                <Text>Web Address</Text>
                <Text>{conexionProfile.BusinessHomePage}</Text>
              </Left>
            </ListItem>
          </Content>
        </CardItem>
      </Card>
    );
  };

  getProfileViewContent = () => {
    const { selectedValue } = this.props;
    // if (!conexionProfile) {
    //   return (
    //     <View style={profileViewStyles.noConexion}>
    //       <Image
    //         style={profileViewStyles.noConexionImage}
    //         source={selectListimage}
    //       />
    //       <Text>Select any conexion from the list to view details</Text>
    //     </View>
    //   );
    // }
    if (selectedValue === INDIVIDUAL) {
      return <IndividualConexion />;
    }
    if (selectedValue === ORGANIZATION) {
      return this.renderOrgConexionProfile();
    }
    return null;
  };

  render() {
    return <View style={{ flex: 1 }}>{this.getProfileViewContent()}</View>;
  }
}

ProfileView.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  conexionProfile: PropTypes.object,
};

export default ProfileView;
