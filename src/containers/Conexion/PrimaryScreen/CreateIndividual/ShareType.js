import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';

import RadioButtonGroup from 'cnxapp/src/components/RadioButtonGroup';
import MultiSelect from 'cnxapp/src/components/MultiSelect';
import { CARD_BORDER_RADIUS } from 'cnxapp/src/utils/valueconstants';

import { shareTypes, shareTypeObj } from '../../constants';
import { selectUserDDList } from '../../selectors';

class ShareType extends React.Component {
  conexionShareForm = () => (
    <View style={styles.parentView}>
      <Card elevation={4} style={styles.card}>
        <Card.Content>
          <View>
            <Title>Sharing</Title>
            <Divider />
            <RadioButtonGroup
              defaultValue={shareTypeObj.PUBLIC}
              data={shareTypes}
              name="ind_shared_type"
            />
          </View>
          {this.props.ind_shared_type === shareTypeObj.SHARED ? (
            <MultiSelect
              label="Select users"
              items={this.props.userDDList}
              name="ind_shared_users"
              searchText="Search users"
            />
          ) : null}
        </Card.Content>
      </Card>
    </View>
  );

  render() {
    return this.conexionShareForm();
  }
}

const styles = StyleSheet.create({
  parentView: {
    margin: 10,
  },
  card: {
    borderRadius: CARD_BORDER_RADIUS,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

ShareType.propTypes = {
  userDDList: PropTypes.array,
  ind_shared_type: PropTypes.string,
};

const selectorCreate = formValueSelector('createConexion');
const selectorEdit = formValueSelector('editConexion');

const mapStateToProps = createStructuredSelector({
  userDDList: selectUserDDList(),
});
const withConnect = connect(
  mapStateToProps,
  {},
);

export default compose(
  connect(state =>
    selectorCreate(state, 'ind_shared_type', 'ind_shared_users'),
  ),
  connect(state => selectorEdit(state, 'ind_shared_type', 'ind_shared_users')),
  withConnect,
)(ShareType);
