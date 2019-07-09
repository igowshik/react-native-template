import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Card } from 'react-native-paper';
import { Grid, Row, Col } from 'native-base';

import { TextInput, NumberInput } from 'cnxapp/src/components/InputField';
import * as colors from 'cnxapp/src/utils/colorsConstants';

const Communication = () => (
  <View style={styles.parentView}>
    <Card elevation={4} style={styles.card}>
      <Card.Content>
        <Grid>
          <Row>
            <Col>
              <NumberInput label="Primary Mobile" name="ind_primary_mobile" />
            </Col>
            <Col>
              <NumberInput
                label="Secondary Mobile"
                name="ind_secondary_mobile"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <NumberInput label="Business Phone" name="ind_business_phone" />
            </Col>
            <Col>
              <NumberInput
                label="Business Phone 2"
                name="ind_business_phone_2"
              />
            </Col>
            <Col>
              <NumberInput label="Business Fax" name="ind_business_fax" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput label="Business Email" name="ind_business_email" />
            </Col>
            <Col>
              <TextInput
                label="Business Home Page"
                name="ind_business_home_page"
              />
            </Col>
          </Row>
          <Divider style={{ marginTop: 20, marginBottom: 10 }} />
          <Row>
            <Col>
              <NumberInput label="Home Phone" name="ind_home_phone" />
            </Col>
            <Col>
              <NumberInput label="Home Phone 2" name="ind_home_phone_2" />
            </Col>
            <Col>
              <NumberInput label="Home Fax" name="ind_hom_fax" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput label="Personal Email" name="ind_personal_email" />
            </Col>
            <Col>
              <TextInput
                label="Personal Home Page"
                name="ind_personal_home_page"
              />
            </Col>
          </Row>
        </Grid>
      </Card.Content>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  parentView: {
    margin: 10,
  },
  card: {
    borderTopColor: colors.ORANGE,
    borderTopWidth: 2,
  },
});

export default Communication;
