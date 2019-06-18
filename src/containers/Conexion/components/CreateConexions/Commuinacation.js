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
              <NumberInput label="Business Phone" name="business_phone" />
            </Col>
            <Col>
              <NumberInput label="Business Phone 2" name="business_phone_2" />
            </Col>
            <Col>
              <NumberInput label="Business Fax" name="business_fax" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput label="Business Email" name="business_email" />
            </Col>
            <Col>
              <TextInput label="Business Home Page" name="business_home_page" />
            </Col>
          </Row>
          <Divider style={{ marginTop: 20, marginBottom: 10 }} />
          <Row>
            <Col>
              <NumberInput label="Home Phone" name="home_phone" />
            </Col>
            <Col>
              <NumberInput label="Home Phone 2" name="home_phone_2" />
            </Col>
            <Col>
              <NumberInput label="Home Fax" name="hom_fax" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput label="Personal Email" name="personal_email" />
            </Col>
            <Col>
              <TextInput label="Personal Home Page" name="personal_home_page" />
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

export { Communication };
