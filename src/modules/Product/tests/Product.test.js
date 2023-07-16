// Import necessary dependencies and components
import { mount } from '@vue/test-utils';
import Product from '../components/Product.vue';
// import Cart from '@/components/Cart.vue';
import store from "../../../store/index.js"
import Button from "../../Common/components/Button.vue"
// import axios from 'axios';

// jest.mock('axios');

// jest.setTimeout(30000);
// jest.setTimeout(30000);


describe('Product', () => {
    it('Product Can Be rendered', () => {
        const wrapper = mount(Product, {
            propsData: {
                id: 1,
                imageUrl: "https://www.shutterstock.com/shutterstock/photos/338250266/display_1500/stock-vector-sample-red-square-grunge-stamp-on-white-sample-stamp-sample-sample-sign-338250266.jpg",
                name: "Test product Name",
                price: 45,
                quantity: 5,
                quantityLeftPerUser: 2,
            },
            global: {
                plugins: [store],
              },
              stubs: {
                Button
              },
            // mocks: {
            //     $store: {
            //       state: {
            //         cartId: null,
            //         user:null
            //       }
            //     }
            // }
        })
  
      // Assert that the component is rendered
      expect(wrapper.exists()).toBe(true);
  
      // Assert that the component contains the expected text
      expect(wrapper.text()).toContain('Test product Name');
      expect(wrapper.text()).toContain('€45');
      expect(wrapper.text()).toContain('2 Left');
      expect(wrapper.text()).toContain('Add to cart');
    });
  });
  

// Test suite for Add To Cart Button 
describe('AddToCartButton', () => {

    it('should call addToCart function when add to cart button is clicked', async () => {
        const addToCartSpy = jest.spyOn(Product.methods, 'addToCart'); // Create a spy function
    
        const wrapper = mount(Product, {
        
          propsData: {
            id: 1,
            imageUrl: "https://www.shutterstock.com/shutterstock/photos/338250266/display_1500/stock-vector-sample-red-square-grunge-stamp-on-white-sample-stamp-sample-sample-sign-338250266.jpg",
            name: "Test product Name",
            price: 45,
            quantity: 5,
            quantityLeftPerUser: 2,
        },
        global: {
            plugins: [store],
          },
        });
    
        // Simulate button click
        await wrapper.find('button').trigger('click');
    
        // Assert that the function was called
        expect(addToCartSpy).toHaveBeenCalled();
    
        // Clean up the spy
        addToCartSpy.mockRestore();

        
      });


      // it('should show the API result when the button is clicked', async () => {
      //   const responseData = 'Mocked API response';
      //   axios.post.mockResolvedValueOnce({ data: responseData });
    
        
      //   const wrapper = mount(Product, {
        
      //       propsData: {
      //         id: 1,
      //         imageUrl: "https://www.shutterstock.com/shutterstock/photos/338250266/display_1500/stock-vector-sample-red-square-grunge-stamp-on-white-sample-stamp-sample-sample-sign-338250266.jpg",
      //         name: "Test product Name",
      //         price: 45,
      //         quantity: 5,
      //         quantityLeftPerUser: 2,
      //     },
      //     global: {
      //         plugins: [store],
      //       },
      //     });
    
      //   // Simulate button click
      //   await wrapper.find('#addToCartBtn').trigger('click');
    
      //   // Wait for the API call to complete
      //   await wrapper.vm.$nextTick();
    
      //   // Assert that the UI has changed
      //   expect(wrapper.find('p').text()).toBe(responseData);
      // });




    
// let createToaster;

// beforeAll(async () => {
//   const { createToaster: createToasterModule } = await import('@meforma/vue-toaster');
//   createToaster = createToasterModule;
// });

// it('calls handleClick when the button is clicked', async () => {
//     const wrapper = mount(Product, {
        
//         propsData: {
//           id: 1,
//           imageUrl: "https://www.shutterstock.com/shutterstock/photos/338250266/display_1500/stock-vector-sample-red-square-grunge-stamp-on-white-sample-stamp-sample-sample-sign-338250266.jpg",
//           name: "Test product Name",
//           price: 45,
//           quantity: 5,
//           quantityLeftPerUser: 2,
//       },
//       global: {
//           plugins: [store],
//         },
//       });

//     // Simulate button click
//     await wrapper.find('button').trigger('click');

//     // Assert that the handleClick function is called
//     expect(wrapper.vm.addToCart).toHaveBeenCalled();
//   });

  // Test case for clicking the add to cart button
  it('Update Quanity Left when add to cart button is clicked', async () => {
    // Mount the Product component
    const wrapper = mount(Product, {
        propsData: {
            id: 1,
            imageUrl: "https://www.shutterstock.com/shutterstock/photos/338250266/display_1500/stock-vector-sample-red-square-grunge-stamp-on-white-sample-stamp-sample-sample-sign-338250266.jpg",
            name: "Test product Name",
            price: 45,
            quantity: 5,
            quantityLeftPerUser: 2,
        },
        global: {
            plugins: [store],
          },
          stubs: {
            Button
          },
        // mocks: {
        //     $store: {
        //       state: {
        //         cartId: null,
        //         user:null
        //       }
        //     }
        // }
    })

    

       // Simulate button click
       await wrapper.find('#addToCartBtn').trigger('click');
       await wrapper.vm.$nextTick(function(){
           
       });
    

      await new Promise((res)=>setTimeout(()=>{
        expect(wrapper.text()).toContain('1 Left');
        expect(wrapper.find('#quantityLeftPerUser').text()).toBe('1 Left');
          res()
       },3000))
      
      //  Vue.nextTick(function () {})
    //    expect(wrapper.vm.addToCart).toHaveBeenCalled();
//       await wrapper.findComponent(Button).trigger('click');
//   await wrapper.vm.$nextTick();

        // Get the function reference
    // const handleClickFn = wrapper.vm.addToCart;

    // Call the function
    // await handleClickFn();
    //   await wrapper.vm.$nextTick();

    // expect(wrapper.text()).toContain('1 Left');

       // Assert that the handleClick function was called
    //    expect(wrapper.vm.addToCart).toHaveBeenCalled();

    // if async method
//   await wrapper.findComponent(Button).trigger('click');
//   await wrapper.vm.$nextTick();

 // Simulate button click
//  await wrapper.find('button').trigger('click');

 // Assert that the handleClick function was called
//  expect(wrapper.vm.addToCart).toHaveBeenCalled();
  

//   wrapper.find('#addToCartBtn').simulate('click');
    // expect(wrapper.vm.addToCart).toHaveBeenCalled();

    // const addToCartBtn = await wrapper.find('#addToCartBtn')
    // addToCartBtn.trigger('click')
    // await wrapper.vm.$nextTick()
    // expect(wrapper.emitted('addToCart')).toHaveLength(1)
    
    // Simulate a click on the add to cart button
    // wrapper.find('button').trigger('click');

    // Expect the addToCart method to be called
    // expect(wrapper.emitted().addToCart).toBeTruthy();
  });












//   it('should call handleClick when the button is clicked', async () => {
//     const addToCartMock = jest.fn(); // Mock the addToCart function

//     const wrapper = mount(Product, {
//       methods: {
//         addToCart: addToCartMock, // Provide the mock function to the component
//       },
//       propsData: {
//         id: 1,
//         imageUrl: "https://www.shutterstock.com/shutterstock/photos/338250266/display_1500/stock-vector-sample-red-square-grunge-stamp-on-white-sample-stamp-sample-sample-sign-338250266.jpg",
//         name: "Test product Name",
//         price: 45,
//         quantity: 5,
//         quantityLeftPerUser: 2,
//     },
//     global: {
//         plugins: [store],
//       },
//       stubs: {
//         Button
//       },
//     });

//     // Simulate button click
//     // await wrapper.find('button').trigger('click');
//     //    await wrapper.vm.$nextTick()
//      const addToCartBtn = await wrapper.find('#addToCartBtn')
//     addToCartBtn.trigger('click')
//     await wrapper.vm.$nextTick()

//     // Assert that the function was called
//     expect(addToCartMock).toHaveBeenCalled();
//   });


});

// // Test suite for Cart component
// describe('Cart', () => {
//   // Test case for displaying the correct number of items in the cart
//   it('should display the correct number of items in the cart', () => {
//     // Create a mock cartItems data
//     const cartItems = [
//       { id: 1, name: 'Item 1' },
//       { id: 2, name: 'Item 2' },
//       { id: 3, name: 'Item 3' },
//     ];

//     // Mount the Cart component with the mock cartItems data
//     const wrapper = mount(Cart, {
//       data() {
//         return {
//           cartItems: cartItems,
//         };
//       },
//     });

//     // Expect the correct number of items to be displayed
//     expect(wrapper.findAll('.cart-item')).toHaveLength(cartItems.length);
//   });

//   // Test case for removing an item from the cart
//   it('should remove item from cart when remove button is clicked', () => {
//     // Create a mock cartItems data
//     const cartItems = [
//       { id: 1, name: 'Item 1' },
//       { id: 2, name: 'Item 2' },
//     ];

//     // Mount the Cart component with the mock cartItems data
//     const wrapper = mount(Cart, {
//       data() {
//         return {
//           cartItems: cartItems,
//         };
//       },
//     });

//     // Simulate a click on the remove button of the first item
//     wrapper.find('.remove-button').trigger('click');

//     // Expect the removeItem method to be called with the correct item
//     expect(wrapper.emitted().removeItem[0][0]).toEqual(cartItems[0]);
//   });
// });