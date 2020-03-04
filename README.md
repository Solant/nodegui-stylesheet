# nodegui-stylesheet

`react-native` inspired implementation of [stylesheet](https://facebook.github.io/react-native/docs/stylesheet), written in typescript

Compatible with plain `nodegui` and `react-nodegui`, both JS and TS.

# Why 
Despite web nature of css styling of Qt widgets, sometimes it can fall flat due to some strange inconsistencies and differences between Qt and web browser 
Here is a list of inconsistencies that gets handled: 
1. font-size value requires unit and must be without quotes

# Example

1 Create a stylesheet

```javascript
import { create } from 'nodegui-stylesheet';

const style = create({
  wrapper: {
    flex: 1
  },
  logo: {
    fontSize: 14
  }
});
```

2 Use stylesheet properties instead of long css strings
```typescript jsx
// with nogegui-react
<View style={style.wrapper}>
  <Text style={style.logo}>Hello</Text>
</Text>
```

```javascript
// with plain nogegui
const label = new QLabel();
label.setText("Hello");
label.setInlineStyle(style.logo);
```
