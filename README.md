# react-native-shake

React Native shake event detector

## Installation

```sh
npm install react-native-shake
```

## Usage


```TypeScript
import { Shake } from 'react-native-shake';
// ...
const result = Shake.multiply(3, 7);
// ...
const listenerSubscription = React.useRef<null | EventSubscription>(null);
// ...
useEffect(() => {
    // INIT
    listenerSubscription.current = Shake.onShake(() => {
        console.log('Shake event detected!');
    });

    // DE-INIT
    return () => {
        listenerSubscription.current?.remove();
        listenerSubscription.current = null;
    };
}, []);
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
