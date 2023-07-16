import { mount } from '@vue/test-utils';
import Product from '../components/Product.vue';
import store from "../../../store/index.js"
import Button from "../../Common/components/Button.vue"

const ProductOptions = {
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
}

describe('Product TestSuite', () => {
  it('Product Can Be rendered', () => {
    //mount component
    const wrapper = mount(Product, ProductOptions)

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
describe('AddToCartButton TestSuite', () => {

  it('should call addToCart function when add to cart button is clicked', async () => {

    const addToCartSpy = jest.spyOn(Product.methods, 'addToCart'); // Create a spy function
    // mount component
    const wrapper = mount(Product, ProductOptions);

    // Simulate button click
    await wrapper.find('button').trigger('click');

    // Assert that the function was called
    expect(addToCartSpy).toHaveBeenCalled();

    // Clean up the spy
    addToCartSpy.mockRestore();


  });

  // Test case for check decrement in quanity
  it('Update Quanity Left to purcahse after add to cart button is clicked', async () => {

    // Mount the Product component
    const wrapper = mount(Product, ProductOptions)

    // Simulate button click
    await wrapper.find('#addToCartBtn').trigger('click');
    await wrapper.vm.$nextTick(function () {

    });

    await new Promise((res) => setTimeout(() => {
      expect(wrapper.text()).toContain('1 Left');
      expect(wrapper.find('#quantityLeftPerUser').text()).toBe('1 Left');
      res()
    }, 2000))

  });

});
