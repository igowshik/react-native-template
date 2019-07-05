import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { View } from 'native-base';
import AnalyticCard from './AnalyticCard';

class index extends Component {
  render() {
    return (
      <View style={{ height: '100%' }}>
        <ScrollView
          style={{
            padding: 10,
            paddingBottom: 0,
            maxHeight: 120,
          }}
          alwaysBounceHorizontal
          horizontal
        >
          <AnalyticCard title="All" value={22} />
          <AnalyticCard title="Saved" subTitle="22/02/2019" value={7} />
          <AnalyticCard title="Submited" subTitle="22/02/2019" value={12} />
          <AnalyticCard title="Approved" subTitle="22/02/2019" value={2} />
          <AnalyticCard title="Rejected" subTitle="22/02/2019" value={1} />
        </ScrollView>
      </View>
    );
  }
}

export default connect()(index);
