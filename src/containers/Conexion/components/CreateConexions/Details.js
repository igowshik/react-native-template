import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Lo from 'lodash';
import { Card } from 'react-native-paper';

// Absolute imports
import { TextInput, NumberInput } from 'cnxapp/src/components/InputField';
import Dropdown from 'cnxapp/src/components/Dropdown';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import { Grid, Row, Col } from 'native-base';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative Imports
import { selectGlobalLoader, selectConexionMetaData } from '../../selectors';

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
    return (
      <View style={styles.parentView}>
        <Card elevation={4} style={styles.card}>
          <Card.Content>
            <Grid>
              <Row>
                <Col>
                  <TextInput label="First Name" name="first_name" required />
                </Col>
                <Col>
                  <TextInput label="Middle Name" name="middle_name" required />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInput label="Last Name" name="last_name" required />
                </Col>
                <Col>
                  <TextInput label="initial" name="initial" required />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Dropdown label="Title" name="title" required data={title} />
                </Col>
                <Col>
                  <Dropdown
                    label="Suffix"
                    name="suffix"
                    required
                    data={suffix}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Dropdown
                    label="Select Oraganisation"
                    name="select_oraganisation"
                    required
                    data={title} // organisation data to be filled
                  />
                </Col>
                <Col>
                  <TextInput label="Job Title" name="job_title" required />
                </Col>
              </Row>
              <Row>
                <Col>
                  <NumberInput
                    label="Primary Mobile"
                    name="primary_mobile"
                    required
                  />
                </Col>
                <Col>
                  <NumberInput
                    label="Secondary Mobile"
                    name="secondary_mobile"
                    required
                  />
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
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  loaderState: selectGlobalLoader(),
  metaData: selectConexionMetaData(),
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  setGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Details);
