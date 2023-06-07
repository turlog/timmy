import { useState } from 'react';

import { StyleSheet, StatusBar, Text, View, FlatList, Vibration } from 'react-native';

import { Calendar } from 'react-native-calendars';


export default function App() {

  const SELECTIONS = [
    undefined, 'YES', 'NO'
  ]

  const SELECTION_COLORS = [
    null, 'green', 'red'
  ]

  const [selection, setSelection] = useState({});

  const toggleSelection = (day) => {
    Vibration.vibrate(100);
    setSelection((current) => {return {...current,
      [day.dateString]: SELECTIONS[(SELECTIONS.indexOf(selection[day.dateString])+1)%SELECTIONS.length]
    }});
  }

  let dates = [...Object.keys(selection)]

  dates.sort().reverse()

  let markers = {}

  dates.forEach(date => {
    if (selection[date]) {
      markers[date] = {color: SELECTION_COLORS[SELECTIONS.indexOf(selection[date])], textColor: 'white'}
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>TIMMY</Text>
      </View>
      <View style={styles.calendar}>
        <Calendar
          onDayPress={toggleSelection}
          markingType={'period'}
          markedDates={markers}
        />
      </View>
      <View style={styles.details}>
        <FlatList
          data={dates}
          renderItem={item => (
            (selection[item.item]) ? (
                <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 2}}>{item.item}</Text>
                <Text style={{flex: 2}}>{selection[item.item]}</Text>
              </View>
            ) : ''
          )}
          scrollsToTop={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 5,
  },
  calendar: {
    padding: 5,
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  details: {
    flex: 5,
    padding: 5,
  }
});
