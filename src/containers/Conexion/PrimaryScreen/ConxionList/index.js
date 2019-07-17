import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Subheading } from 'react-native-paper';

// Absolute imports
import Loader from 'cnxapp/src/components/Loader';
import ScrollView from 'cnxapp/src/components/ScrollView';

// Relative imports
import RenderIndListItem from './RenderIndListItem';
import RenderOrgListItem from './RenderOrgListItem';

class ConexionList extends React.Component {
  getRenderPart = () => {
    const { indSelected, onPressItem } = this.props;
    const { conexioListData } = this.props;
    if (conexioListData === false) {
      return (
        <Subheading
          style={{
            textAlign: 'center',
            paddingTop: 10,
          }}
        >
          No data to display
        </Subheading>
      );
    }
    if (indSelected) {
      return (
        <FlatList
          data={conexioListData}
          renderItem={({ item }) => (
            <RenderIndListItem item={item} onPressItem={onPressItem} />
          )}
          keyExtractor={item => item.ConexionId.toString()}
        />
      );
    }
    return (
      <FlatList
        data={conexioListData}
        renderItem={({ item }) => (
          <RenderOrgListItem item={item} onPressItem={onPressItem} />
        )}
        keyExtractor={item => item.ConexionId.toString()}
      />
    );
  };

  render() {
    const { loader } = this.props;
    return (
      <ScrollView>
        {loader ? (
          <View>
            <Loader
              showLoader={loader}
              loaderTitle="Conexion"
              loadingText="Loading conexion list..."
            />
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
  loader: PropTypes.bool.isRequired,
  onPressItem: PropTypes.func,
};

export default ConexionList;
