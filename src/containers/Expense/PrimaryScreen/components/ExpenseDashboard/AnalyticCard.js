import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Body, Text } from 'native-base';
import { CNXH1 } from 'cnxapp/src/components/Typography';
import PropTypes from 'prop-types';

class AnalyticsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: [
        { dark: '#3498DB', light: '#D6EAF8' },
        { dark: '#F1C40F', light: '#FCF3CF' },
        { dark: '#2ECC71', light: '#D5F5E3' },
        { dark: '#D35400', light: '#F6DDCC' },
        { dark: '#8E44AD', light: '#E8DAEF' },
        { dark: '#2E4053', light: '#D6DBDF' },
      ],
      selectedColor: {},
      isSelected: false,
    };
    this.cardClicked = this.cardClicked.bind(this);
  }

  componentDidMount() {
    this._getRandomColor();
  }

  _getRandomColor() {
    const { themeColor } = this.state;
    const item = themeColor[Math.floor(Math.random() * themeColor.length)];
    this.setState({ selectedColor: item });
  }

  cardClicked = () => {
    console.log('clicked');
    const { isSelected } = this.state;
    this.setState({ isSelected: !isSelected });
  };

  render() {
    const { selectedColor, isSelected } = this.state;
    return (
      <Card
        onPress={this.cardClicked}
        style={{
          borderTopColor: selectedColor.dark,
          borderRadius: 10,
          padding: 10,
          borderTopWidth: 3,
          marginRight: 15,
          backgroundColor: isSelected ? selectedColor.dark : '#fff',
        }}
      >
        {/* <CardItem > */}
        <Body style={styles.cardContentContainer}>
          <Text
            style={{
              color: isSelected ? '#fff' : selectedColor.dark,
              fontSize: 50,
              lineHeight: 50,
              fontWeight: 'bold',
            }}
          >
            {this.props.value}
          </Text>
          <View style={{ paddingLeft: 15 }}>
            <CNXH1 style={{ color: isSelected ? '#fff' : selectedColor.dark }}>
              {this.props.title}
            </CNXH1>
            {this.props.subTitle ? (
              <Text
                style={{
                  fontStyle: 'italic',
                  color: isSelected ? '#fff' : '#909497',
                }}
              >
                Last {this.props.title.toLowerCase()}: {this.props.subTitle}
              </Text>
            ) : null}
          </View>
        </Body>
        {/* </CardItem> */}
      </Card>
    );
  }
}
AnalyticsCard.propTypes = {
  // handleCardClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  value: PropTypes.number.isRequired,
};
const styles = StyleSheet.create({
  headerColCard: {
    borderRadius: 10,
    minWidth: 250,
    borderTopWidth: 15,
  },
  cardContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    flexGrow: 1,
    margin: 5,
  },
  iconRoundBackground: {
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});

export default AnalyticsCard;
