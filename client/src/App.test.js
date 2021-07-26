import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App.js';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import DogDetail from './components/DogDetail/DogDetail';
import CreatedBreed from './components/CreateBreed/CreateBreed';


configure({adapter: new Adapter()});

describe('App', () => {
  let store
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('El componente Nav debe renderizar en todas las rutas.', () => {
    it('Debería renderizarse en la ruta "/"', () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
        expect(wrapper.find(NavBar)).toHaveLength(1);
    });
    it('Debería renderizarse en la ruta "/otraRuta"', () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/otraRuta' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
        expect(wrapper.find(NavBar)).toHaveLength(1);
    });
  });

  it('El componente LandingPage debe renderizar en la ruta / (Sólo en la ruta "/")', () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );

      expect(wrapper.find(LandingPage)).toHaveLength(1);
      expect(wrapper.find(NavBar)).toHaveLength(1);
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(DogDetail)).toHaveLength(0);
      expect(wrapper.find(CreatedBreed)).toHaveLength(0);
  });

  it('El componente Home debe renderizar en la ruta /home - este test no pasará si Otro componente (que no sea Nav) se renderiza en esta ruta.', () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[  '/home' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(NavBar)).toHaveLength(1);
    expect(wrapper.find(DogDetail)).toHaveLength(0);
    expect(wrapper.find(CreatedBreed)).toHaveLength(0);
    expect(wrapper.find(LandingPage)).toHaveLength(0);
  });

  it('El componente DogDetail debe renderizar en la ruta /dogs/:id', () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/dog/2' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(NavBar)).toHaveLength(1);
    expect(wrapper.find(DogDetail)).toHaveLength(1);
    expect(wrapper.find(CreatedBreed)).toHaveLength(0);
    expect(wrapper.find(LandingPage)).toHaveLength(0);
  });

  it('El componente CreatedBreed debe renderizar en la ruta /createBreed', () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/createBreed' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(NavBar)).toHaveLength(1);
    expect(wrapper.find(DogDetail)).toHaveLength(0);
    expect(wrapper.find(CreatedBreed)).toHaveLength(1);
    expect(wrapper.find(LandingPage)).toHaveLength(0);
  });

});