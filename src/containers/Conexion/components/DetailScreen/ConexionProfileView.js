import React from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
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
import { HorizDivider } from 'cnxapp/src/components/CNXDividers';
import { CNXTextM, CNXTextBold } from 'cnxapp/src/components/CNXTexts';
import { CNXH2 } from 'cnxapp/src/components/CNXTypography';
// import { SecondaryButton } from 'cnxapp/src/components/CNXButtons/Secondary';

// Relative imports
import { INDIVIDUAL, ORGANIZATION } from '../../constants';
import { profileViewStyles } from '../../styles';

const selectListimage = require('cnxapp/src/assets/illustration/selectfromlist.png');
const profile = require('cnxapp/src/assets/pastel/indavatar.png');
const organization = require('cnxapp/src/assets/pastel/orgavatar.png');

class ConexionProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
    };
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    this.setState({
      height: Dimensions.get('window').height - 600,
    });
  }

  renderIndConexionProfile = () => {
    const { conexionProfile } = this.props;
    return (
      <Card transparent style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail style={profileViewStyles.avatarView} source={profile} />
            <Body style={profileViewStyles.cardBodyView}>
              <CNXTextBold>{conexionProfile.DisplayName}</CNXTextBold>
              <Text style={profileViewStyles.linkText}>
                {conexionProfile.BusinessEmailAddress}
              </Text>
              <Text style={profileViewStyles.extraText}>
                {conexionProfile.JobTitle}
              </Text>
            </Body>
          </Left>
          <Right>
            {/* <SecondaryButton buttonText="Edit" icon="edit" /> */}
          </Right>
        </CardItem>
        <HorizDivider />
        <CardItem>
          <Content>
            <ScrollView>
              <ListItem>
                <Left style={profileViewStyles.leftViewJustify}>
                  <CNXTextM>Name</CNXTextM>
                  <Text>{conexionProfile.DisplayName}</Text>
                </Left>
              </ListItem>
              <ListItem>
                <Left style={profileViewStyles.leftViewJustify}>
                  <CNXTextM>Primary Phone Number</CNXTextM>
                  <Text>{conexionProfile.BusinessTelephoneNumber}</Text>
                </Left>
              </ListItem>
              <ListItem>
                <Left style={profileViewStyles.leftViewJustify}>
                  <CNXTextM>Email</CNXTextM>
                  <Text>{conexionProfile.BusinessEmailAddress}</Text>
                </Left>
              </ListItem>
              <ListItem>
                <Left style={profileViewStyles.leftViewJustify}>
                  <CNXTextM>Organization</CNXTextM>
                  <Text>{conexionProfile.Organization}</Text>
                </Left>
              </ListItem>
            </ScrollView>
          </Content>
        </CardItem>
      </Card>
    );
  };

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
    const { conexionProfile, selectedValue } = this.props;
    if (!conexionProfile) {
      return (
        <View style={profileViewStyles.noConexion}>
          <Image
            style={profileViewStyles.noConexionImage}
            source={selectListimage}
          />
          <Text>Select any conexion from the list to view details</Text>
        </View>
      );
    }
    if (conexionProfile && selectedValue === INDIVIDUAL) {
      return this.renderIndConexionProfile();
    }
    if (conexionProfile && selectedValue === ORGANIZATION) {
      return this.renderOrgConexionProfile();
    }
    return null;
  };

  render() {
    return (
      <View onLayout={this.onLayout} style={{ height: this.state.height }}>
        <View>{this.getProfileViewContent()}</View>
      </View>
    );
  }
}

ConexionProfileView.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  conexionProfile: PropTypes.object,
};

export default ConexionProfileView;
