import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

class CameraForm extends Component {

  state = {
    hasCameraPermission: null
  };

  componentDidMount() {
    this.permissionCheck();
  }

  permissionCheck = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };

  handleBarCodeScanRead = data => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Scan your wallet code</Text>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this.handleBarCodeScanRead}
              style={{ height: 400, width: 400, marginTop: 20 }}
            />
        }
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
};

export default CameraForm;