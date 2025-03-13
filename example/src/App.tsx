import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  type EventSubscription,
  useColorScheme,
} from 'react-native';

import { Shake } from 'react-native-shake';
// import { multiply, } from 'react-native-shake';

export default function App() {
  const [shakeEvents, setShakeEvents] = useState<string[]>([]);
  const shakeCountRef = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const colorScheme = useColorScheme();

  // Theme-based colors
  const colors = {
    background: colorScheme === 'dark' ? '#121212' : '#ffffff',
    text: colorScheme === 'dark' ? '#ffffff' : '#000000',
    border: colorScheme === 'dark' ? '#444444' : '#cccccc',
    secondaryText: colorScheme === 'dark' ? '#aaaaaa' : '#888888',
    itemBorder: colorScheme === 'dark' ? '#333333' : '#eeeeee',
  };

  const listenerSubscription = React.useRef<null | EventSubscription>(null);

  const nA = 3;
  const nB = 7;
  const result = Shake.multiply(nA, nB);
  useEffect(() => {
    listenerSubscription.current = Shake.onShake(() => {
      const timeString = new Date().toISOString();
      shakeCountRef.current += 1;
      const newEvent = `[${timeString}]: shake detected #${shakeCountRef.current}`;
      console.log('Shake event detected!');
      setShakeEvents((prevEvents) => [newEvent, ...prevEvents]);
    });

    return () => {
      listenerSubscription.current?.remove();
      listenerSubscription.current = null;
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>
        Result: {nA}*{nB}={result}
      </Text>
      <Text style={[styles.title, { color: colors.text }]}>
        Shake it to test
      </Text>
      <ScrollView
        ref={scrollViewRef}
        style={[styles.listContainer, { borderColor: colors.border }]}
        contentContainerStyle={styles.listContent}
      >
        {shakeEvents.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            No shake events yet. Shake your device!
          </Text>
        ) : (
          shakeEvents.map((event, index) => (
            <Text
              key={index}
              style={[
                styles.eventItem,
                { borderBottomColor: colors.itemBorder, color: colors.text },
              ]}
            >
              {event}
            </Text>
          ))
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="emit the shake event"
          onPress={() => {
            Shake.emitShakeEvent();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    width: '100%',
    maxHeight: '50%',
    borderWidth: 1,
    borderRadius: 8,
  },
  listContent: {
    padding: 10,
    minHeight: 100,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    padding: 20,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
