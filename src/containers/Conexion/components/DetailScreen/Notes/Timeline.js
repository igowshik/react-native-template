import {
  StyleSheet,
  ListView,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { Component } from 'react';
import { IconButton, Card, Text, Avatar, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import * as colors from 'cnxapp/src/utils/colorsConstants';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

const defaultCircleSize = 16;
const defaultCircleColor = '#007AFF';
const defaultLineWidth = 2;
const defaultLineColor = '#007AFF';
const defaultTimeTextColor = 'black';
const defaultDotColor = 'white';
const defaultInnerCircle = 'white';

export default class CNXTimeline extends Component {
  constructor(props, context) {
    super(props, context);

    this._renderRow = this._renderRow.bind(this);
    this.renderTime = (this.props.renderTime
      ? this.props.renderTime
      : this._renderTime
    ).bind(this);
    this.renderDetail = (this.props.renderDetail
      ? this.props.renderDetail
      : this._renderDetail
    ).bind(this);
    this.renderCircle = (this.props.renderCircle
      ? this.props.renderCircle
      : this._renderCircle
    ).bind(this);
    this.renderEvent = this._renderEvent.bind(this);

    this.state = {
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data),
      x: 0,
      width: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      dataSource: ds.cloneWithRows(nextProps.data),
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ListView
          ref="listView" //eslint-disable-line
          style={[styles.listview, this.props.listViewStyle]}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          automaticallyAdjustContentInsets={false}
          enableEmptySections
          {...this.props.options}
        />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    let content = null;

    switch (this.props.columnFormat) {
      case 'single-column-left':
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderTime(rowData, sectionID, rowID)}
            {this.renderEvent(rowData, sectionID, rowID)}
            {this.renderCircle(rowData, sectionID, rowID)}
          </View>
        );
        break;
      case 'single-column-right':
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderEvent(rowData, sectionID, rowID)}
            {this.renderTime(rowData, sectionID, rowID)}
            {this.renderCircle(rowData, sectionID, rowID)}
          </View>
        );
        break;
      case 'two-column':
        content =
          rowID % 2 === 0 ? (
            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
              {this.renderTime(rowData, sectionID, rowID)}
              {this.renderEvent(rowData, sectionID, rowID)}
              {this.renderCircle(rowData, sectionID, rowID)}
            </View>
          ) : (
            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
              {this.renderEvent(rowData, sectionID, rowID)}
              {this.renderTime(rowData, sectionID, rowID)}
              {this.renderCircle(rowData, sectionID, rowID)}
            </View>
          );
        break;
      default:
        content = null;
    }
    return <View key={rowID}>{content}</View>;
  }

  _renderTime(rowData, sectionID, rowID) {
    if (!this.props.showTime) {
      return null;
    }
    let timeWrapper = null;
    switch (this.props.columnFormat) {
      case 'single-column-left':
        timeWrapper = {
          alignItems: 'flex-end',
        };
        break;
      case 'single-column-right':
        timeWrapper = {
          alignItems: 'flex-start',
        };
        break;
      case 'two-column':
        timeWrapper = {
          flex: 1,
          alignItems: rowID % 2 === 0 ? 'flex-end' : 'flex-start',
        };
        break;
      default:
        timeWrapper = null;
    }
    return (
      <View style={timeWrapper}>
        <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
          <Text style={[styles.time, this.props.timeStyle]}>
            {rowData.time}
          </Text>
        </View>
      </View>
    );
  }
/* eslint-disable */
  _renderEvent(rowData, sectionID, rowID) {
    const lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth;
    const isLast = this.props.renderFullLine
      ? !this.props.renderFullLine
      : this.state.data.slice(-1)[0] === rowData;
    const lineColor = isLast
      ? 'rgba(0,0,0,0)'
      : rowData.lineColor
      ? rowData.lineColor
      : this.props.lineColor;
    let opStyle = null;

    switch (this.props.columnFormat) {
      case 'single-column-left':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderRightWidth: 0,
          marginLeft: 20,
          paddingLeft: 20,
        };
        break;
      case 'single-column-right':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: 0,
          borderRightWidth: lineWidth,
          marginRight: 20,
          paddingRight: 20,
        };
        break;
      case 'two-column':
        opStyle =
          rowID % 2 === 0
            ? {
              borderColor: lineColor,
              borderLeftWidth: lineWidth,
              borderRightWidth: 0,
              marginLeft: 20,
              paddingLeft: 20,
            }
            : {
              borderColor: lineColor,
              borderLeftWidth: 0,
              borderRightWidth: lineWidth,
              marginRight: 20,
              paddingRight: 20,
            };
        break;
      default:
        opStyle = null;
    }
    /* eslint-enable */
    return (
      <View
        style={[styles.details, opStyle]}
        onLayout={evt => {
          if (!this.state.x && !this.state.width) {
            const { x, width } = evt.nativeEvent.layout;
            this.setState({ x, width });
          }
        }}
      >
        <TouchableOpacity
          disabled={this.props.onEventPress == null}
          style={[this.props.detailContainerStyle]}
          onPress={() =>
            this.props.onEventPress ? this.props.onEventPress(rowData) : null
          }
        >
          <View style={styles.detail}>
            {this.renderDetail(rowData, sectionID, rowID)}
          </View>
          {this._renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  }

  _renderDetail(rowData) {
    const getNoteState = privateNote => {
      if (privateNote) return colors.YELLOW;
      return colors.GREEN;
    };

    const title = rowData.description ? (
      <View style={{ paddingRight: 20 }}>
        <Card elevation={2} style={styles.card}>
          <Card.Content>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
              }}
            >
              <View style={styles.headerView}>
                <Avatar.Image
                  style={styles.avatar}
                  size={50}
                  source={{
                    uri:
                      'https://img.icons8.com/cotton/2x/gender-neutral-user--v1.png',
                  }}
                  color={colors.WHITE}
                />
                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                  <Text style={[styles.title, this.props.titleStyle]}>
                    {rowData.title}
                  </Text>
                  <Paragraph>Updated By: {rowData.userName}</Paragraph>
                </View>
              </View>
              <IconButton
                icon={() => (
                  <FontAwesome5
                    name="circle"
                    color={getNoteState(rowData.privateNote)}
                    size={15}
                    solid
                  />
                )}
                color={getNoteState(rowData.privateNote)}
                size={25}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.description, this.props.descriptionStyle]}>
              <HTMLView value={rowData.description} />
            </View>
          </Card.Content>
          <Card.Actions>
            <IconButton
              icon={() => (
                <FontAwesome5
                  name="pen-alt"
                  color={colors.PRIMARY}
                  size={15}
                  solid
                />
              )}
              color={colors.PRIMARY}
              size={25}
              onPress={() => {
                this.props.onClickEdit(rowData.noteId);
              }}
            />
            <IconButton
              icon={() => (
                <FontAwesome5
                  name="trash"
                  color={colors.SECONDARY}
                  size={15}
                  solid
                />
              )}
              color={colors.SECONDARY}
              size={25}
              onPress={() => {
                this.props.onClickDelete(rowData.noteId);
              }}
            />
          </Card.Actions>
        </Card>
      </View>
    ) : (
      <Text style={[styles.title, this.props.titleStyle]}>{rowData.title}</Text>
    );
    return <View style={styles.container}>{title}</View>;
  }

  /* eslint-disable */
  _renderCircle(rowData) {
    const circleSize = rowData.circleSize
      ? rowData.circleSize
      : this.props.circleSize
        ? this.props.circleSize
        : defaultCircleSize;
    const circleColor = rowData.circleColor
      ? rowData.circleColor
      : this.props.circleColor
        ? this.props.circleColor
        : defaultCircleColor;
    const lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth
        ? this.props.lineWidth
        : defaultLineWidth;
    /* eslint-enable */
    let circleStyle = null;

    switch (this.props.columnFormat) {
      case 'single-column-left':
        circleStyle = {
          width: this.state.x ? circleSize : 0,
          height: this.state.x ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.x - circleSize / 2 + (lineWidth - 1) / 2,
        };
        break;
      case 'single-column-right':
        circleStyle = {
          width: this.state.width ? circleSize : 0,
          height: this.state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.width - circleSize / 2 - (lineWidth - 1) / 2,
        };
        break;
      case 'two-column':
        circleStyle = {
          width: this.state.width ? circleSize : 0,
          height: this.state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.width - circleSize / 2 - (lineWidth - 1) / 2,
        };
        break;
      default:
        circleStyle = null;
    }

    let innerCircle = null;
    /* eslint-disable */
    switch (this.props.innerCircle) {
      case 'icon':
        const iconSource = rowData.icon ? rowData.icon : this.props.icon;
        const iconStyle = {
          height: 30,
          width: 30,
          marginTop: 8,
        };
        innerCircle = (
          <Image
            resizeMode = "contain"
            source={iconSource}
            style={[iconStyle, this.props.iconStyle]}
          />
        );
        break;
      case 'dot':
        const dotStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor
            ? rowData.dotColor
            : this.props.dotColor
              ? this.props.dotColor
              : defaultDotColor,
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
      default:
        const dotDefaultStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor
            ? rowData.dotColor
            : this.props.dotColor
              ? this.props.dotColor
              : defaultDotColor,
        };
        innerCircle = <View style={[styles.dot, dotDefaultStyle]} />;
        break;
    }
    return (
      <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
  }

  _renderSeparator() {
    if (!this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, this.props.separatorStyle]} />;
  }
}
    /* eslint-enable */


CNXTimeline.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: 'single-column-left',
  separator: false,
  showTime: true,
};

CNXTimeline.propTypes = {
  separator: PropTypes.bool,
  separatorStyle: PropTypes.object,
  circleStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  icon: PropTypes.string,
  titleStyle: PropTypes.object,
  descriptionStyle: PropTypes.object,
  detailContainerStyle: PropTypes.object,
  onEventPress: PropTypes.func,
  columnFormat: PropTypes.string,
  timeContainerStyle: PropTypes.object,
  rowContainerStyle: PropTypes.object,
  timeStyle: PropTypes.object,
  renderTime: PropTypes.any,
  renderCircle: PropTypes.any,
  data: PropTypes.array,
  renderDetail: PropTypes.any,
  listViewStyle: PropTypes.object,
  style: PropTypes.object,
  options: PropTypes.any,
  showTime: PropTypes.bool,
  lineWidth: PropTypes.number,
  lineColor: PropTypes.string,
  innerCircle: PropTypes.any,
  circleSize: PropTypes.number,
  circleColor: PropTypes.string,
  renderFullLine: PropTypes.any,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: '#007AFF',
    height: 30,
    justifyContent: 'center',
  },
  sectionHeaderText: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    // alignItems: 'stretch',
    justifyContent: 'center',
  },
  timeContainer: {
    minWidth: 45,
    borderRadius: 13,
  },
  time: {
    textAlign: 'right',
    color: defaultTimeTextColor,
    // ------------------ jy
    fontFamily: 'Montserrat-Regular',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    position: 'absolute',
    left: -8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: Platform.OS === 'ios' ? 'bold' : '900',
    fontFamily: 'Montserrat-Regular',
  },
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: 'column',
    flex: 1,
  },
  detail: { paddingBottom: 20 },
  description: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
  },
  separator: {
    height: 1,
    backgroundColor: '#aaa',
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    borderTopColor: '#85929E',
    borderTopWidth: 2,
  },
  headerView: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: { backgroundColor: 'transparent' },
});
