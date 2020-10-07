import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Form,
  Item,
  Input,
  Label,
  Container,
  Header,
  Content,
  Left,
  Button,
  Icon,
  Body,
  Title,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  description: Yup.string().required().label("Description"),
  latitude: Yup.number().required().label("Latitude"),
  longitude: Yup.number().required().label("Longitude"),
  uri: Yup.string().required().url(),
});

const UserInput = ({ inputModal, setInputModal }) => {
  return (
    // <Container>
    <Modal animationType="slide" visible={inputModal}>
      {/* <SafeAreaView style={styles.centeredView}> */}
      <Container>
        <Header>
          <Left style={}>
            <Button
              transparent
              onPress={() => {
                setInputModal(!inputModal);
              }}
            >
              <Icon name="close" />
            </Button>
          </Left>
          <Body>
            <Title>Add a location</Title>
          </Body>
        </Header>
        <Content
          padder
          contentContainerStyle={{
            justifyContent: "center",
          }}
        >
          {/* <TouchableOpacity
            onPress={() => {
              setInputModal(!inputModal);
            }}
          >
            <Ionicons name="ios-close" size={50} color="grey" />
          </TouchableOpacity> */}
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Latitude</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Longitude</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        {/* </SafeAreaView> */}
      </Container>
    </Modal>
    // </Container>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // position: "absolute",
    // bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserInput;
