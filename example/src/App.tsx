import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  type EventSubscription,
} from 'react-native';

import { Shake } from 'react-native-shake';
// import { multiply, } from 'react-native-shake';

export default function App() {
  const [shakeEvents, setShakeEvents] = useState<string[]>([]);
  const shakeCountRef = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);

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
    <View style={styles.container}>
      <Text>
        Result: {nA}*{nB}={result}
      </Text>
      <Text style={styles.title}>Shake it to test</Text>
      <ScrollView
        ref={scrollViewRef}
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
      >
        {shakeEvents.length === 0 ? (
          <Text style={styles.emptyText}>
            No shake events yet. Shake your device!
          </Text>
        ) : (
          shakeEvents.map((event, index) => (
            <Text key={index} style={styles.eventItem}>
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
    borderColor: '#ccc',
    borderRadius: 8,
  },
  listContent: {
    padding: 10,
    minHeight: 100,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    padding: 20,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
