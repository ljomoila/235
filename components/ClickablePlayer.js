import React, {Component} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    Modal
  } from 'react-native';

export default class ClickablePlayer extends Component {

    state = {
        modalIsVisble: false
    };

    constructor(props) {
        super(props);

        this.api = props.api;
    }

    // hide show modal
    setShowModal(show){
        this.setState({modalIsVisble: show})
    }

    render() {
        const {name, goals, assists, finnish} = this.props;

        return (
            <>
                <View style = { styles.container }>
                    <Modal
                        animationType = {"slide"}
                        transparent={false}
                        visible={this.state.modalIsVisble}
                        onRequestClose={() => {
                            console.log('Modal has been closed.');
                        }}>
                        <Text style = { styles.text }>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Maecenas eget tempus augue, a convallis velit.</Text>
                        <Button title="Close" onPress={() => { this.setShowModal(!this.state.modalIsVisble); }} />
                    </Modal>
                </View>
                <View>
                {/* <Button color={ finnish ? "blue" : "black" } title={`${name} ${goals} + ${assists}`} onPress={() => { this.setShowModal(true) }} />      */}
                     <TouchableOpacity
                         style={styles.button}
                         onPress={() => {
                             this.setShowModal(true);
                         }}>
                       
                         <Text style={{color: finnish ? 'blue'  : 'white', fontSize: 18}}>{name} {goals} + {assists}</Text>
                     </TouchableOpacity>          
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      padding: 25,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      display: 'flex',
      height: 60,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#2AC062',
      shadowColor: '#2AC062',
      shadowOpacity: 0.5,
      shadowOffset: { 
        height: 10, 
        width: 0 
      },
      shadowRadius: 25,
    },
    closeButton: {
      display: 'flex',
      height: 60,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF3974',
      shadowColor: '#2AC062',
      shadowOpacity: 0.5,
      shadowOffset: { 
        height: 10, 
        width: 0 
      },
      shadowRadius: 25,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 22,
    },
    image: {
      marginTop: 150,
      marginBottom: 10,
      width: '100%',
      height: 350,
    },
    text: {
      fontSize: 24,
      marginBottom: 30,
      padding: 40,
    },
    closeText: {
      fontSize: 24,
      color: '#00479e',
      textAlign: 'center',
    }
  });
  