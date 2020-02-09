# nodegui-stylesheet

`react-native` inspired implementation of [stylesheet](https://facebook.github.io/react-native/docs/stylesheet), written in typescript

Compatible with plain `nodegui` and `react-nodegui`, both JS and TS.

# Why 
Despite web nature of css styling of Qt widgets, sometimes it can fall flat due to some strange inconsistencies and differences between Qt and web browser 
Here is a list of inconsistencies that gets handled: 
1. font-size value requires unit and must be without quotes

# Example

```
import { create, units } from 'nodegui-stylesheet';

const s = create({
  wrapper: {
    flex: 1
  },
  logo: {
    fontSize: units(12, 'px')
  }
});
```
