import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Lo from 'lodash';
import { Card } from 'react-native-paper';

// Absolute imports
import { TextInput } from 'cnxapp/src/components/InputField';
import Dropdown from 'cnxapp/src/components/Dropdown';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import { Grid, Row, Col } from 'native-base';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative Imports
import {
  selectGlobalLoader,
  selectConexionMetaData,
  selectOrgDDList,
} from '../../selectors';

class Details extends React.Component {
  state = {
    title: [],
    suffix: [],
  };

  componentDidMount() {
    const { metaData } = this.props;
    if (!Lo.isEmpty(metaData)) {
      const mappedTitle = [];
      const mappedSuffix = [];
      metaData.title.forEach(data => {
        mappedTitle.push({ label: data.Description, value: data.Value });
      });
      metaData.suffix.forEach(data => {
        mappedSuffix.push({ label: data.Description, value: data.Value });
      });
      this.setState({ title: mappedTitle, suffix: mappedSuffix });
    }
  }

  render() {
    const { title, suffix } = this.state;
    const { organization } = this.props;
    return (
      <View style={styles.parentView}>
        <Card elevation={4} style={styles.card}>
          <Card.Content>
            <Grid>
              <Row>
                <Col>
                  <TextInput
                    label="First Name"
                    name="ind_first_name"
                    required
                    helperText="First name is required"
                  />
                </Col>
                <Col>
                  <TextInput label="Middle Name" name="ind_middle_name" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInput
                    label="Last Name"
                    name="ind_last_name"
                    required
                    helperText="Last name is required"
                  />
                </Col>
                <Col>
                  <TextInput
                    label="initial"
                    name="ind_initial"
                    required
                    helperText="Intial is required"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Dropdown label="Title" name="ind_title" data={title} />
                </Col>
                <Col>
                  <Dropdown label="Suffix" name="ind_suffix" data={suffix} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Dropdown
                    label="Select Organisation"
                    name="ind_select_oraganisation"
                    data={organization}
                  />
                </Col>
                <Col>
                  <TextInput label="Job Title" name="ind_job_title" />
                </Col>
              </Row>
            </Grid>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    margin: 10,
  },
  card: {
    borderTopColor: colors.ORANGE,
    borderTopWidth: 2,
  },
});

Details.propTypes = {
  metaData: PropTypes.object.isRequired,
  organization: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loaderState: selectGlobalLoader(),
  metaData: selectConexionMetaData(),
  organization: selectOrgDDList(),
});

const mapDispatchToProps = dispatch => ({
  setGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Details);
