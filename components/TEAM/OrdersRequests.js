import React from 'react';
import { View, ScrollView, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

const OrdersRequestComponent = () => {
  const orders = [
    {
      customerName: 'John Doe',
      fromAddress: '123 Main St',
      toAddress: '456 Elm St',
      fareAmount: 5000,
    },
    {
      customerName: 'Jane Smith',
      fromAddress: '789 Oak Ave',
      toAddress: '987 Pine St',
      fareAmount: 3500,
    },
    // Add more orders as needed
  ];
const navigation = useNavigation();
const makePhoneCall = () => {
  const phoneNumber = '1234567890'; // Replace with the desired phone number

  // Check if the Linking API is supported on the device
  Linking.canOpenURL(`tel:${phoneNumber}`).then((supported) => {
    if (supported) {
      // Open the phone dialer with the specified phone number
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.log('Phone call not available');
    }
  });
};
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {orders.map((order, index) => (
          <View style={styles.orderContainer} key={index}>
            <Text style={styles.customerName}>{order.customerName}</Text>
            <View style={styles.addressContainer}>
              <View style={[styles.dot, { backgroundColor: 'green' }]} />
              <Text style={styles.addressText}>From :<Text style={styles.addressTextFrom}> {order.fromAddress}</Text></Text>
            </View>
            <View style={styles.addressContainer}>
              <View style={[styles.dot, { backgroundColor: 'red' }]} />
              <Text style={styles.addressText}>To: <Text style={styles.addressTextTo}> {order.toAddress}</Text></Text>
            </View>
            <Text  style={styles.addressText}>Estimated Fare: <Text style={[styles.fareAmountText, { color: 'red' }]}>
              {order.fareAmount}/.Rupees
            </Text></Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Accept Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cancel Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}  onPress={() => {navigation.navigate('Details');}}>
                <Text style={styles.buttonText}>View Order Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {makePhoneCall}}>
                <Text style={styles.buttonText}>Contact Customer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BF9000',
  },
  scrollViewContent: {
    padding: 20,
  },
  orderContainer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  customerName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'yellow',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
  },
  addressTextFrom:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'green',
  },
  addressTextTo:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'red',
  },
  fareAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#BF9000',
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrdersRequestComponent;
