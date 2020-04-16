import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  Button,
  Avatar,
  TextInput,
  Searchbar,
  Card,
  Title,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

var userData = null;
let userActive = false;

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const validarDatos = () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email) &&
      pwd !== ''
    ) {
      try {
        fetch('https://tranquil-stream-88616.herokuapp.com/api/Login', {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            pwd: pwd,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            userData = responseData;
            UserActive = true;
            setRefreshing(true);
            alert('bienvenido: ' + userData.Nombre);
          })
          .done();
      } catch (error) {
        console.log(error);
      }
    } else alert('Verifique que su Email y/o Password sean correctos');
  };

  return !userActive && !refreshing ? (
    <View style={styles.container_card}>
      <View style={styles.card1} />
      <View style={styles.card2}>
        <View style={styles.mainView}>
          <View style={styles.image}>
            <Avatar.Image
              size={150}
              source={require('./resources/tekio.jpeg')}
            />
          </View>
          <Text>{'\n'}</Text>
          <View style={styles.sectionDescription}>
            <TextInput
              label="Email"
              placeholder="Correo Electronico"
              value={email}
              onChangeText={(email) => setEmail(email)}
              mode="outlined"
              style={styles.input}
            />
            <Text>{'\n'}</Text>
            <TextInput
              label="Password"
              placeholder="Contraseña"
              value={pwd}
              secureTextEntry={true}
              onChangeText={(pwd) => setPwd(pwd)}
              mode="outlined"
              style={styles.input}
            />
            <Text>{'\n\n'}</Text>
            <Button
              style={(styles.btn, styles.btn_success)}
              mode="contained"
              onPress={validarDatos}>
              Iniciar Sesion
            </Button>
            <Text>{'\n'}</Text>
            <Button
              style={(styles.btn, styles.btn_def)}
              mode="outlined"
              onPress={() => console.log('Pressed')}>
              Registrar
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.card3} />
    </View>
  ) : (
    <Home />
  );
};
const Home = () => {
  const [search, setBusqueda] = useState('');
  return (
    <View>
      <Searchbar
        style={{marginTop: hp('5%')}}
        placeholder="Search"
        onChangeText={(search) => {
          setBusqueda(search);
        }}
        value={search}
      />
      <View style={{paddingTop: 20}}>
        <ScrollView scrollEventThrottle={16}>
          <View
            style={{
              height: wp('70%'),
              width: wp('100%'),
              paddingHorizontal: 40,
            }}>
            <ScrollView>
              <View style={{flex: 2, width: wp('100%')}}>
                <ScrollView horizontal={true}>
                  <Card>
                    <Card.Content>
                      <Title>Plomeria</Title>
                    </Card.Content>
                    <Card.Cover
                      source={{
                        uri:
                          'https://aningenieros.com/wp-content/uploads/2017/12/instalaciones-plomería.jpg',
                      }}
                    />
                    <Card.Actions>
                      <Button>Ver</Button>
                    </Card.Actions>
                  </Card>
                  <Card>
                    <Card.Content>
                      <Title>Herreria</Title>
                    </Card.Content>
                    <Card.Cover
                      source={{
                        uri:
                          'http://www.qualityrosario.com.ar/wp-content/uploads/2019/08/herreria-quality-rosario-03.jpg',
                      }}
                    />
                    <Card.Actions>
                      <Button>Ver</Button>
                    </Card.Actions>
                  </Card>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const Registro = () => {
  return (
    <View>
      <Text>Registro</Text>
    </View>
  );
};
const Servicio = () => {
  return (
    <View>
      <Text>Servicio</Text>
    </View>
  );
};
const Publicaciones = () => {
  return (
    <View>
      <Text>Publicaciones</Text>
    </View>
  );
};
const Usuario = () => {
  return (
    <View>
      <Text>Usuario</Text>
    </View>
  );
};
const Drawer = createDrawerNavigator();
const App = () => {
  return userActive ? (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Drawer.Screen name="Servicio" component={Servicio} />
        <Drawer.Screen name="Publicaciones" component={Publicaciones} />
        <Drawer.Screen name="Usuario" component={Usuario} />
      </Drawer.Navigator>
    </NavigationContainer>
  ) : (
    <Login />
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_card: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  card1: {
    flex: 1,
    backgroundColor: '#694fad',
    borderBottomLeftRadius: 80,
  },
  card2: {
    flex: 2,
    backgroundColor: '#694fad',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    marginRight: 15,
    borderBottomRightRadius: 80,
    borderTopRightRadius: 80,
  },
  card3: {
    backgroundColor: '#694fad',
    borderTopLeftRadius: 80,
  },
  input: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    width: wp('90%'),
    alignItems: 'center',
    padding: 0.75,
    backgroundColor: '#fff',
    borderRadius: 80,
    justifyContent: 'space-between',
    marginRight: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    marginTop: -160,
    marginLeft: wp('25%'),
  },
  btn: {
    flexDirection: 'column',
    width: wp('90%'),
    height: 50,
    alignItems: 'center',
    borderRadius: 40,
    padding: 0.75,
    justifyContent: 'space-between',
    marginRight: 15,
  },
  btn_success: {
    width: wp('90%'),
    height: 50,
    color: '#fff',
    backgroundColor: '#28a745',
    borderColor: '#28a745',
    borderRadius: 40,
  },
  btn_def: {
    width: wp('90%'),
    height: 50,
    color: '#fff',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 40,
  },
});

export default App;
