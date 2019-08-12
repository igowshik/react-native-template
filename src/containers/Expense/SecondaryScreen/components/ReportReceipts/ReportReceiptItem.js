import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';

class ReportReceiptItem extends React.PureComponent {
  render() {
    const { item, onClick } = this.props;

    return (
      <Card
        elevation={2}
        style={{ flex: 1, flexDirection: 'column', margin: 3 }}
        onPress={() => onClick(item.BlobUrl)}
      >
        <Card.Cover source={{ uri: item.BlobUrl }} />
        <View style={styles.overlay}>
          <Text style={{ color: 'white' }}>{item.ReceiptName}</Text>
        </View>
      </Card>
    );
  }
}
ReportReceiptItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 5,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
});
export default ReportReceiptItem;
