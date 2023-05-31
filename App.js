import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, View,Text, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

export default function App() {
  const downloadFromUrl = async () => {
    const filename = "MyVideo.mp4";
    const result = await FileSystem.downloadAsync(
      'http://techslides.com/demos/sample-videos/small.mp4',
      FileSystem.documentDirectory + filename
    );
    console.log(result);

    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const downloadFromAPI = async () => {
    const filename = "MissCoding.pdf";
    const localhost = Platform.OS === "android" ? "192.168.29.241" : "127.0.0.1";
    const result = await FileSystem.downloadAsync(
      `http://${localhost}:19000/generate-pdf?name=MissCoding&email=hello@tripwiretech.com`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          "MyHeader": "MyValue"
        }
      }
    );
    console.log(result);
    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  return (
    <View style={styles.container}>
      <View><Text style={styles.heading}>Download of File System</Text></View>
      <Pressable onPress={downloadFromUrl} style={styles.btn} ><Text>Download From URL</Text></Pressable>
      <View style={styles.button}>
      <Pressable onPress={downloadFromAPI} style={styles.btn}><Text>Download From API</Text></Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  button:{
    marginTop:20,
  },
  btn:{
    backgroundColor:'brown',
    padding:15,
    color:'white',
    borderRadius:15,
  },
  heading:{
    marginBottom:100,
    fontSize:30,
    fontWeight:'bold',

  }
});