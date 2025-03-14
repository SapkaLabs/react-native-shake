# react-native-shake

React Native shake event detector.

> **Important**: This package only supports React Native's New Architecture and is based on React Native 0.78.0.

This package is based on the source code from [Doko-Demo-Doa/react-native-shake](https://github.com/Doko-Demo-Doa/react-native-shake) with several improvements to support React Native's New Architecture and the latest version of React Native. It was created due to the original author's inactivity, which made it difficult to use the older package with newer RN versions.

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob).  
Special thanks to the authors of the RNBB library—this package wouldn't be possible without their contributions.

## Installation

```sh
npm install @sapkalabs/react-native-shake
```

```sh
yarn add @sapkalabs/react-native-shake
```

```sh
pnpm add @sapkalabs/react-native-shake
```

## Usage


```TypeScript
import { Shake } from '@sapkalabs/react-native-shake';

// ...
const listenerSubscription = React.useRef<null | EventSubscription>(null);
// ...
useEffect(() => {
    // Subscribe to shake events
    listenerSubscription.current = Shake.onShake(() => {
        console.log('Shake event detected!');
    });

    // Unsubscribe when the component unmounts
    return () => {
        listenerSubscription.current?.remove();
        listenerSubscription.current = null;
    };
}, []);
```

![Shake](.github-media\Screen_Recording_20250314_010000_ShakeExample.gif)



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---