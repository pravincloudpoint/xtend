import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CardComponent, CategoryComponent } from '../components';
import { useNavigation } from '@react-navigation/native';

const RenderSection = (props) => {
    const navigation = useNavigation();
  return (
    <View>
    return (
      <View style={{ marginBottom: 20 }}>
        <CategoryComponent
          title={"New Additions"}
          onPress={() =>
            navigation.navigate("TopRatedList", {
              name: "New Additions",
              props,
            })
          }
        />
        {props.slice(0, 5).map((item, index, array) => {
            const lastIndex = array.length - 1;
            return (
              <View
                key={index}
                style={{
                  marginHorizontal: 20,
                }}
              >
                <CardComponent
                  item={item}
                  lastComponent={index == lastIndex ? true : false}
                  onPress={() =>
                    navigation.navigate("CourseDetails", {
                      item: item,
                    })
                  }
                />
              </View>
            );
          })
        }
      </View>
    );
    </View>
  )
}

export default RenderSection

const styles = StyleSheet.create({})
