import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda, LocaleConfig} from 'react-native-calendars';




// Mise du calendrier en Français
LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};

LocaleConfig.defaultLocale = 'fr';

export default class Calendrier extends Component {

  constructor(props){

    
    super(props); 
    this.state = {
      // Exemple d'une journée....
      // Time: représente l'heure
      // Libre: Si il y a un rendez vous ou pas..
      // Message: Message quelconque...
      

      items: {
        '2020-01-04': [
          { time: '9h00', libre: true, message: 'Libre'},
          { time: '9h30', libre: true, message: 'Libre'},
          { time: '10h00', libre: false, message: 'Occupé'},
          { time: '11h00', libre: true, message: 'Libre'},
          { time: '12h00', libre: false, message: 'Pose'},
          { time: '13h00', libre: false, message: 'Pose'},
          { time: '14h00', libre: false, message: 'Ocuppé'},
          { time: '15h00', libre: true, message: 'Libre'},
          { time: '15h00', libre: true, message: 'Libre'},
          { time: '17h00', libre: true, message: 'Libre'},
        ]
      }
    }
  }

  renderItem(item){
   
    return(
         // Evenement clique sur une date
      <TouchableOpacity style={[styles.item, {height: item.height}]} activeOpacity={1}
              onPress={() => {                  
          }}>

          <View style={styles.container_left_calendar}>
              <View style={[styles.status, {backgroundColor: item.libre ? 'green' : 'red'}]}></View>
          </View>

          <View style={styles.container_right_calendar}>
            <Text style={styles.text_title}>{item.time}</Text>
                  <Text style={styles.text_date}>
                       {item.message}
                  </Text>
          </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
          
       <Agenda
          ref={(ref) => this.calandar = ref}
          displayLoadingIndicator={false}
          items={this.state.items}
          // loadItemsForMonth={(month) => { }}
          onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
          // onDayPress={(day)=>{console.log('day pressed')}}
          // onDayChange={(day)=>{console.log('day changed')}}
          selected={new Date()}
          minDate={'2020-01-01'}
          maxDate={'2020-05-30'}
          pastScrollRange={4}
          futureScrollRange={8}
          renderItem={this.renderItem.bind(this)}
          renderEmptyData = {() => {return (<View />);}}
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          hideKnob={false}
          onRefresh={() => console.log('refreshing...')}
          refreshing={false}
          refreshControl={null}
          theme={{
            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue'
          }}
          // agenda container style
          style={{
            flex: 1, 
            height: 800, 
            width: 400,
          }}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
   item: { 
        flexDirection: 'row', 
        padding: 5, 
        marginBottom: 5, 
        backgroundColor: 'white', 
        borderBottomColor: 'black'
    }, 
    container_left_calendar: {
        position: 'absolute', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: "100%", 
        width: 25, 
        top: 50, 
    }, 
    status: {
        height: 10, 
        width: 10,
        borderRadius: 5, 
    }, 
    container_right_calendar:{
        height: "100%", 
        width: "100%", 
        paddingRight: 5, 
        paddingLeft: 25 
    }, 
    text_title: {
        fontSize: 15, 
        color: 'black'
    }, 
     text_date: {
        paddingHorizontal: 5, 
        fontSize: 14
    },
});
