import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { Subheading, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// Absolute imports
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import RenderIndListItem from './RenderIndListItem';
import RenderOrgListItem from './RenderOrgListItem';
import { getIndConexions, getOrgConexions } from '../../actions';
import { selectIndConexion } from '../../selectors';
import { PAGE_CONFIG } from '../../constants';

const ITEM_HEIGHT = 70;

class ConexionList extends PureComponent {
  state = {
    pageSize: PAGE_CONFIG.pageSize,
    pageNumber: PAGE_CONFIG.pageNumber,
    refreshing: false,
  };

  handleLoadMoreIndList = () => {
    const { pageNumber } = this.state;
    const { searchText } = this.props;
    this.setState(
      {
        pageNumber: pageNumber + 1,
      },
      () => {
        if (!searchText) this.loadMoreIndConexion();
      },
    );
  };

  handleIndListRefresh = () => {
    this.setState(
      {
        pageNumber: 1,
        refreshing: true,
      },
      () => {
        this.loadMoreIndConexion();
      },
    );
  };

  loadMoreIndConexion = () => {
    const intialPage = {
      pageSize: this.state.pageSize,
      pageNumber: this.state.pageNumber,
    };
    this.props.fetchIndConexion(intialPage);
    this.setState({
      refreshing: false,
    });
  };

  renderListEmpty = () => (
    <Card style={Styles.footerCard}>
      <Card.Content style={Styles.nodataCard}>
        <FontAwesome5
          name="list-alt"
          color={colors.GREY}
          style={{ margin: 5 }}
          size={30}
          light
        />
        <Subheading style={{ color: colors.GREY }}>
          No data to display
        </Subheading>
      </Card.Content>
    </Card>
  );

  renderFooter = () => {
    const { conexioListData } = this.props;
    if (conexioListData && conexioListData.length > 0) {
      return (
        <Card style={Styles.footerCard}>
          <Card.Content style={Styles.nodataCard}>
            <Subheading>End of list</Subheading>
          </Card.Content>
        </Card>
      );
    }
    return null;
  };

  handleOrgListRefresh = () => {
    this.setState(
      {
        pageNumber: 1,
        refreshing: true,
      },
      () => {
        this.loadMoreOrgConexion();
      },
    );
  };

  loadMoreOrgConexion = () => {
    const initialPage = {
      pageSize: this.state.pageSize,
      pageNumber: this.state.pageNumber,
    };
    this.props.fetchOrgConexion(initialPage);
    this.setState({
      refreshing: false,
    });
  };

  handleLoadMoreOrgList = () => {
    const { pageNumber } = this.state;
    const { searchText } = this.props;
    this.setState(
      {
        pageNumber: pageNumber + 1,
      },
      () => {
        if (!searchText) this.loadMoreOrgConexion();
      },
    );
  };

  getRenderPart = () => {
    const { indSelected, onPressItem } = this.props;
    const { conexioListData } = this.props;
    if (indSelected) {
      return (
        <FlatList
          data={conexioListData}
          renderItem={({ item }) => (
            <RenderIndListItem item={item} onPressItem={onPressItem} />
          )}
          keyExtractor={item => item.ConexionId.toString()}
          // ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderListEmpty}
          onRefresh={this.handleIndListRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMoreIndList}
          onEndReachedThreshold={0}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
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
        // ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderListEmpty}
        onRefresh={this.handleOrgListRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMoreOrgList}
        onEndReachedThreshold={0}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    );
  };

  render() {
    return this.getRenderPart();
  }
}

ConexionList.propTypes = {
  indSelected: PropTypes.bool.isRequired,
  conexioListData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onPressItem: PropTypes.func,
  fetchIndConexion: PropTypes.func.isRequired,
  fetchOrgConexion: PropTypes.func.isRequired,
  searchText: PropTypes.string,
};

const Styles = StyleSheet.create({
  nodataCard: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeading: {
    textAlign: 'center',
    paddingTop: 10,
  },
  footerCard: {
    marginTop: 2,
    marginRight: 1,
    marginLeft: 1,
  },
});

const mapStateToProps = createStructuredSelector({
  indConexions: selectIndConexion(),
});

const mapDispatchToProps = dispatch => ({
  fetchIndConexion: intialPage => dispatch(getIndConexions(intialPage)),
  fetchOrgConexion: initialPage => dispatch(getOrgConexions(initialPage)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ConexionList);
