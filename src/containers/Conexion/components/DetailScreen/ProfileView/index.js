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
  H3,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Surface } from 'react-native-paper';

// Absolute imports
import { HorizDivider } from 'cnxapp/src/components/Dividers';
import { CNXTextM, CNXTextBold } from 'cnxapp/src/components/Texts';
import { CNXH2 } from 'cnxapp/src/components/Typography';
// import * as Colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import { INDIVIDUAL, ORGANIZATION } from '../../../constants';
import { profileViewStyles } from '../../../styles';

const selectListimage = require('cnxapp/src/assets/illustration/selectfromlist.png');
const profile = require('cnxapp/src/assets/pastel/indavatar.png');
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

  renderIndConexionProfile = () => {
    const { conexionProfile } = this.props;
    return (
      <Card transparent style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail style={profileViewStyles.avatarView} source={profile} />
            <Body style={profileViewStyles.cardBodyView}>
              <H3 style={{ paddingLeft: 3 }}>{`${conexionProfile.Title}.${
                conexionProfile.Name
              }`}</H3>
              <Text style={profileViewStyles.extraText}>
                {conexionProfile.Organization
                  ? conexionProfile.Organization.Name.trim()
                  : null}
              </Text>
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
                  <Text>{conexionProfile.Name}</Text>
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
                  <Text>
                    {conexionProfile.Organization
                      ? conexionProfile.Organization.Name.trim()
                      : null}
                  </Text>
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
      <View onLayout={this.onLayout} style={{ flex: 1 }}>
        {/* <View>{this.getProfileViewContent()}</View> */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['rgba(79,172,254,1) 2%', 'rgba(195,0,242,1) 83%']}
          style={{
            height: 120,
            // borderBottomLeftRadius: 25,
            // borderBottomRightRadius: 25,
          }}
        />
        <View
          style={{
            height: 130,
            marginTop: -75,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <Surface
            style={{
              height: 130,
              width: 500,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text>Surface</Text>
            </View>
          </Surface>
        </View>
      </View>
    );
  }
}

ProfileView.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  conexionProfile: PropTypes.object,
};

export default ProfileView;
