# nodegui-stylesheet

`react-native` inspired implementation of [stylesheet](https://facebook.github.io/react-native/docs/stylesheet), written in typescript

Compatible with plain `nodegui` and `react-nodegui`, both JS and TS.

# Why 
Despite web nature of css styling of Qt widgets, sometimes it can fall flat due to some strange inconsistencies and differences between Qt and web browser 
Here is a list of inconsistencies that gets handled: 
1. font-size value requires unit and must be without quotes
2. some string keywords should not be wrapped in quotes

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

3 Use specific units if you need them, [list of supported units from qt docs](https://doc.qt.io/qt-5/stylesheet-reference.html#length):

- px: pixels
- pt: the size of one point (i.e., 1/72 of an inch)
- em: the em width of the font (i.e., the width of 'M')
- ex: the ex width of the font (i.e., the height of 'x')

```javascript
import { create, units } from 'nodegui-stylesheet';

const style = create({
  wrapper: {
    flex: 1
  },
  logo: {
    marginTop: units(1, 'ex')
  }
});
```
