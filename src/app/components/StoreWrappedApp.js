import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Absolute imports
import Navigation from 'cnxapp/src/navigation';

// Relative imports
import { selectRootAccessToken } from '../rootSelector';

const StoreWrappedApp = () => <Navigation />;

const mapStateToProps = createStructuredSelector({
  accessToken: selectRootAccessToken(),
});

export default connect(mapStateToProps)(StoreWrappedApp);
