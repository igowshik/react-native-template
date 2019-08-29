import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { View } from 'native-base';

const loaderImage = require('cnxapp/src/assets/images/imgloader.png');
const pdfImage = require('cnxapp/src/assets/images/pdfIcon.png');

class ReportReceiptItem extends React.PureComponent {
  render() {
    const { item, onClick } = this.props;

    return (
      <Card
        elevation={2}
        style={{
          flexDirection: 'column',
          margin: 5,
          borderRadius: 10,
          width: 90,
          height: 90,
        }}
        onPress={() => onClick(item.BlobUrl)}
      >
        {item.BlobUrl.includes('.pdf') ? (
          <View
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
          >
            <Image
              resizeMethod="auto"
              style={styles.imageContainerPdf}
              defaultSource={pdfImage}
            />
          </View>
        ) : (
          <Image
            resizeMode="cover"
            source={{
              isStatic: false,
              uri: item.BlobUrl,
            }}
            style={styles.imageContainer}
            defaultSource={loaderImage}
          />
        )}
        <IconButton
          icon={() => (
            <FontAwesome5 name="trash" size={15} solid color={Colors.RED} />
          )}
          style={styles.close}
          onPress={() => this.props.deleteReceipt(item.ExpenseReceiptId)}
          color={Colors.RED}
        />
      </Card>
    );
  }
}
ReportReceiptItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  deleteReceipt: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 5,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  imageContainerPdf: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  close: {
    margin: 3,
    position: 'absolute',
    backgroundColor: 'rgba(253, 254, 254 ,0.8)',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
  },
});

export default ReportReceiptItem;
