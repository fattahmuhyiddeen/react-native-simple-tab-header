import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';

export default ({ data, TouchableComponent, isScrollableTab, onSelectedIndexChanged, initialIndex, activeTabColor = 'black', TextComponent = Text }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex || 0);

  useEffect(() => {
    if (!!onSelectedIndexChanged && !!data[selectedIndex]) {
      onSelectedIndexChanged(selectedIndex);
    }
  }, [data, selectedIndex]);

  return (isScrollableTab ?
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ width: '100%' }}>
      <View style={{ flexDirection: 'row' }}>
        {data.map((item, index) => {
          const isActive = index == selectedIndex;
          return (
            <TouchableComponent key={item.id} onPress={() => setSelectedIndex(index)} style={{ padding: 10, borderBottomWidth: 5, borderBottomColor: isActive ? activeTabColor : 'transparent' }}>
              <TextComponent children={item.name} color={isActive ? 'black' : 'grey'} size={isActive ? 14 : 12} />
            </TouchableComponent>
          )
        })}
      </View>
    </ScrollView>
    :
    <View style={{ flexDirection: 'row' }}>
      {data.map((item, index) => {
        const isActive = index == selectedIndex;
        return (
          <TouchableComponent key={item.id} onPress={() => setSelectedIndex(index)} style={{ flex: 1, padding: 10, borderBottomWidth: 5, borderBottomColor: isActive ? activeTabColor : 'transparent' }}>
            <TextComponent center children={item.name} color={isActive ? 'black' : 'grey'} size={isActive ? 14 : 12} />
          </TouchableComponent>
        )
      })}
    </View>
  )
}