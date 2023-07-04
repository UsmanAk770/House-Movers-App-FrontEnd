import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrdersRequestComponent = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://127.0.0.1:3000/viewrequestedorders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const orderslist = data.map((order) => ({
          id: order._id,
          userName: order.orderDetails.userDetails && order.orderDetails.userDetails.name ? order.orderDetails.userDetails.name : 'N/A',
          fromAddress: order.orderDetails.fromLocations,
          toAddress: order.orderDetails.toLocations,
          fareAmount: order.orderDetails.setfair,
          orderStatus: order.status,
        }));

        setOrders(orderslist);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleAcceptOrder = (order) => {
    const fdata = {
      id: order.id,
      statusChange: 'addEmployee',
    };
  
    fetch('http://127.0.0.1:3000/changeorderstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fdata),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          // Update the state with the updated list of orders
          fetch('http://127.0.0.1:3000/viewrequestedorders', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const orderslist = data.map((order) => ({
                id: order._id,
                userName: order.orderDetails.userDetails && order.orderDetails.userDetails.name ? order.orderDetails.userDetails.name : 'N/A',
                fromAddress: order.orderDetails.fromLocations,
                toAddress: order.orderDetails.toLocations,
                fareAmount: order.orderDetails.setfair,
                orderStatus: order.status,
              }));
  
              setOrders(orderslist);
            })
            .catch((error) => {
              console.error('Error fetching orders:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error canceling order:', error);
      });
  };

  const handleCancelOrder = (order) => {
    const fdata = {
      id: order.id,
      statusChange: 'Cancelled',
    };
  
    fetch('http://127.0.0.1:3000/changeorderstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fdata),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          // Update the state with the updated list of orders
          fetch('http://127.0.0.1:3000/viewrequestedorders', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const orderslist = data.map((order) => ({
                id: order._id,
                userName: order.orderDetails.userDetails && order.orderDetails.userDetails.name ? order.orderDetails.userDetails.name : 'N/A',
                fromAddress: order.orderDetails.fromLocations,
                toAddress: order.orderDetails.toLocations,
                fareAmount: order.orderDetails.setfair,
                orderStatus: order.status,
              }));
  
              setOrders(orderslist);
            })
            .catch((error) => {
              console.error('Error fetching orders:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error canceling order:', error);
      });
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {orders.map((order, index) => (
          <View style={styles.orderContainer} key={index}>
            <Text style={styles.customerName}>{order.userName}</Text>
            <View style={styles.addressContainer}>
              <View style={[styles.dot, { backgroundColor: 'green' }]} />
              <Text style={styles.addressText}>
                From: <Text style={styles.addressTextFrom}>{order.fromAddress}</Text>
              </Text>
            </View>
            <View style={styles.addressContainer}>
              <View style={[styles.dot, { backgroundColor: 'red' }]} />
              <Text style={styles.addressText}>
                To: <Text style={styles.addressTextTo}>{order.toAddress}</Text>
              </Text>
            </View>
            <Text style={styles.addressText}>
              Estimated Fare: <Text style={[styles.fareAmountText, { color: 'red' }]}>{order.fareAmount}/.Rupees</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => handleAcceptOrder(order)}>
                <Text style={styles.buttonText}>Accept Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleCancelOrder(order)}>
                <Text style={styles.buttonText}>Cancel Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
                <Text style={styles.buttonText}>View Order Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chats')}>
                <Text style={styles.buttonText}>Contact Customer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

OrdersRequestComponent.navigationOptions = {
  screenOptions: {
    tabBarActiveTintColor: '#bf9000',
    tabBarInactiveTintColor: 'grey',
    tabBarStyle: {
      display: 'flex',
    },
  },
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
    color: 'yellow',
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
    color: 'white',
  },
  addressTextFrom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  addressTextTo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
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
